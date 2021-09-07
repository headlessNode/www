/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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


// VARIABLES //

var FOPTS = {
	'encoding': 'utf8'
};


// MAIN //

/**
* Defines a route handler for searching documentation.
*
* @private
* @param {Options} opts - options
* @param {string} options.root - root documentation directory
* @returns {Object} route declaration
*/
function route( opts ) {
	var schema = {
		'method': 'GET',
		'url': '/docs/api/:version/search',
		'schema': {
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

		p = resolve( opts.root, 'index.html' );
		request.log.info( 'Resolved path: %s', p );

		request.log.info( 'Returning main application.' );
		reply.type( 'text/html' );
		reply.send( fs.createReadStream( p, FOPTS ) );
	}
}


// EXPORTS //

module.exports = route;
