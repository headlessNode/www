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

var status = require( './status.js' ); // eslint-disable-line stdlib/no-redeclare
var ping = require( './ping.js' );
var versions = require( './versions.js' );
var pkgs = require( './pkgs.js' );


// MAIN //

/**
* Registers routes on a Fastify instance.
*
* @private
* @param {Object} fastify - Fastify instance
* @param {Object} options - options
* @param {Function} done - callback to invoke upon registering route handlers
*/
function register( fastify, options, done ) {
	fastify.route( status() );
	fastify.route( ping() );
	fastify.route( versions( options ) );
	fastify.route( pkgs( options ) );
	done();
}


// EXPORTS //

module.exports = register;
