/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var fastify = require( 'fastify' );
var helmet = require( 'fastify-helmet' );
var fastifyStatic = require( 'fastify-static' );
var isFunction = require( '@stdlib/assert/is-function' );
var cwd = require( '@stdlib/process/cwd' );
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var routes = require( './routes' );


// MAIN //

/**
* Returns a function which creates an HTTP server for serving API documentation.
*
* @param {Options} [options] - server options
* @param {string} [options.address="127.0.0.1"] - server address
* @param {string} [options.hostname] - server hostname
* @param {string} [options.latest=""] - path to the "latest" documentation (e.g., this could simply be a version, such as `v0.0.90`, or an arbitrary path, such as `foo/bar/beep/boop`)
* @param {boolean} [options.logger=false] - boolean indicating whether to enable logging
* @param {NonNegativeInteger} [options.port=0] - server port
* @param {string} [options.prefix="/"] - URL path prefix used to create a virtual mount path for a static directory
* @param {string} [options.root] - root documentation directory
* @param {string} [options.static] - path of the directory that contains static files to serve
* @param {string} [options.template=""] - application shell template
* @param {boolean} [options.trustProxy=false] - boolean indicating whether to trust `X-forwarded-by` headers when the server is sitting behind a proxy
* @param {boolean} [options.ignoreTrailingSlash=true] - boolean indicating whether to ignore trailing slashes in routes
* @throws {TypeError} must provide valid options
* @returns {Function} function which creates an HTTP server
*
* @example
* var opts = {
*     'port': 7331,
*     'address': '0.0.0.0'
* };
* var createServer = httpServer( opts );
*
* function done( error, fastify ) {
*     if ( error ) {
*         return console.error( error.message );
*     }
*     console.log( 'Success!' );
*     fastify.server.close();
* }
*
* createServer( done );
*/
function httpServer( options ) {
	var opts;
	var err;
	var dir;

	opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.hostname === void 0 ) {
		opts.hostname = opts.address;
	}
	dir = cwd();
	opts.root = resolve( dir, opts.root );
	if ( opts.static ) {
		opts.static = resolve( dir, opts.static );
	}
	return createServer;

	/**
	* Creates an HTTP server.
	*
	* @private
	* @param {Callback} done - function to invoke after creating a server
	* @throws {TypeError} must provide a function
	*/
	function createServer( done ) {
		var f;
		if ( !isFunction( done ) ) {
			throw new TypeError( 'invalid argument. Must provide a function. Value: `' + done + '`.' );
		}
		f = fastify( opts );

		// Set basic security headers:
		f.register( helmet, {
			'contentSecurityPolicy': false
		});

		// Register a plugin for serving static files:
		if ( opts.static ) {
			f.register( fastifyStatic, {
				'root': opts.static,
				'prefix': opts.prefix
			});
		}
		// Register routes:
		f.register( routes, {
			'latest': opts.latest,
			'root': opts.root,
			'template': opts.template
		});

		// Start listening for HTTP requests:
		f.listen( opts.port, opts.hostname, onListen );

		/**
		* Callback invoked once a server is listening and ready to accept HTTP requests.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {string} address - server address
		* @returns {void}
		*/
		function onListen( error, address ) {
			if ( error ) {
				f.log.error( error.message );
				return done( error );
			}
			f.log.info( 'HTTP server initialized. Server is listening for requests on %s.', address );
			done( null, f );
		}
	}
}


// EXPORTS //

module.exports = httpServer;
