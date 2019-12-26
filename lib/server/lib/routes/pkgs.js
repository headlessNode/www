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
var fs = require( 'fs' );
var replace = require( '@stdlib/string/replace' );
var readFile = require( '@stdlib/fs/read-file' );
var extname = require( '@stdlib/utils/extname' );


// VARIABLES //

var FOPTS = {
	'encoding': 'utf8'
};
var RE_FRAGMENT = /{{\s*FRAGMENT\s*}}/;


// MAIN //

/**
* Defines a route handler for package documentation and resources (including, e.g., benchmark and test pages).
*
* @private
* @param {Options} opts - options
* @param {string} options.latest - path to the "latest" documentation
* @param {string} options.root - root documentation directory
* @param {string} options.template - application shell template
* @returns {Object} route declaration
*/
function route( opts ) {
	var schema = {
		'method': 'GET',
		'url': '/docs/api/:version/*',
		'schema': {
			'querystring': {
				'fragment': {
					'type': 'boolean'
				}
			},
			'response': {
				'200': {
					'type': 'string'
				}
			}
		},
		'handler': onRequest
	};

	return schema;

	/**
	* Callback invoked upon receiving an HTTP request.
	*
	* @private
	* @param {Object} request - request object
	* @param {Object} reply - reply object
	* @returns {void}
	*/
	function onRequest( request, reply ) {
		var p;
		var v;

		v = request.params.version;
		request.log.info( 'Version: %s', v );
		if ( v === 'latest' ) {
			v = opts.latest;
			request.log.info( 'Resolved version: %s', v );
		}
		p = request.params[ '*' ];
		request.log.info( 'Path: %s', p );

		p = resolve( opts.root, v, p );
		request.log.info( 'Resolved path: %s', p );

		// Ensure we have not received a request for an asset above the root directory:
		if ( p.length < opts.root.length ) {
			reply.callNotFound();
			return;
		}
		// Stat the path:
		fs.stat( p, onStat );

		/**
		* Callback invoked upon receiving path stats.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} stats - stats
		* @returns {void}
		*/
		function onStat( error, stats ) {
			var ext;
			if ( error ) {
				request.log.error( error.message );
				return reply.callNotFound();
			}
			if ( stats.isDirectory() ) {
				request.log.info( 'Path is a directory. Serving `index.html`...' );
				p = resolve( p, 'index.html' );
				return fs.stat( p, onStat );
			}
			ext = extname( p );
			if ( ext !== '.html' ) {
				reply.callNotFound();
				return;
			}
			if ( request.query.fragment ) {
				request.log.info( 'Requested a fragment.' );
				reply.type( 'text/html' );
				return reply.send( fs.createReadStream( p, FOPTS ) );
			}
			request.log.info( 'Requested an application.' );
			readFile( p, FOPTS, onRead );
		}

		/**
		* Callback invoked upon reading a file.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {string} file - file contents
		* @returns {void}
		*/
		function onRead( error, file ) {
			if ( error ) {
				request.log.error( error.message );
				return reply.callNotFound();
			}
			reply.type( 'text/html' );
			reply.send( replace( opts.template, RE_FRAGMENT, file ) );
		}
	}
}


// EXPORTS //

module.exports = route;
