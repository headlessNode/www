// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function findProxyquireifyName() {
        var deps = Object.keys(modules)
            .map(function (k) { return modules[k][1]; });

        for (var i = 0; i < deps.length; i++) {
            var pq = deps[i]['proxyquireify'];
            if (pq) return pq;
        }
    }

    var proxyquireifyName = findProxyquireifyName();

    function newRequire(name, jumped){
        // Find the proxyquireify module, if present
        var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];

        // Proxyquireify provides a separate cache that is used when inside
        // a proxyquire call, and is set to null outside a proxyquire call.
        // This allows the regular caching semantics to work correctly both
        // inside and outside proxyquire calls while keeping the cached
        // modules isolated.
        // When switching from one proxyquire call to another, it clears
        // the cache to prevent contamination between different sets
        // of stubs.
        var currentCache = (pqify && pqify.exports._cache) || cache;

        if(!currentCache[name]) {
            if(!modules[name]) {
                // if we cannot find the the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = currentCache[name] = {exports:{}};

            // The normal browserify require function
            var req = function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            };

            // The require function substituted for proxyquireify
            var moduleRequire = function(x){
                var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];
                // Only try to use the proxyquireify version if it has been `require`d
                if (pqify && pqify.exports._proxy) {
                    return pqify.exports._proxy(req, x);
                } else {
                    return req(x);
                }
            };

            modules[name][0].call(m.exports,moduleRequire,m,m.exports,outer,modules,currentCache,entry);
        }
        return currentCache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})
({1:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":2}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
}


// EXPORTS //

module.exports = hasOwnProp;

},{}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test for native `Symbol` support.
*
* @module @stdlib/assert/has-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/assert/has-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":4}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
}


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/assert/has-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/assert/has-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":6}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var hasSymbols = require( '@stdlib/assert/has-symbol-support' );


// VARIABLES //

var FLG = hasSymbols();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( FLG && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/assert/has-symbol-support":3}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":8}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var f;


// FUNCTIONS //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
}


// MAIN //

if ( Array.isArray ) {
	f = Array.isArray;
} else {
	f = isArray;
}


// EXPORTS //

module.exports = f;

},{"@stdlib/utils/native-class":109}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":91}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":11,"./primitive.js":12}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var Boolean = require( '@stdlib/boolean/ctor' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Boolean ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":14,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/boolean/ctor":31,"@stdlib/utils/native-class":109}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

},{}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./tostring.js":13}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":16}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&

				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
}


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":27}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":18}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
}


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":99,"@stdlib/utils/native-class":109}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":20}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
}


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":120}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":22,"./object.js":23,"./primitive.js":24,"@stdlib/utils/define-nonenumerable-read-only-property":91}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNumber;

},{"./object.js":23,"./primitive.js":24}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var Number = require( '@stdlib/number/ctor' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Number ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
}


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":26,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/number/ctor":67,"@stdlib/utils/native-class":109}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );
}


// EXPORTS //

module.exports = isNumber;

},{}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var Number = require( '@stdlib/number/ctor' );


// MAIN //

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{"@stdlib/number/ctor":67}],26:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./tostring.js":25,"dup":14}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var main = require( './main.js' );


// VARIABLES //

var isObjectLikeArray = arrayfun( main );


// MAIN //

setReadOnly( main, 'isObjectLikeArray', isObjectLikeArray );


// EXPORTS //

module.exports = main;

},{"./main.js":28,"@stdlib/assert/tools/array-function":29,"@stdlib/utils/define-nonenumerable-read-only-property":91}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
}


// EXPORTS //

module.exports = isObjectLike;

},{}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":30}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isArray = require( '@stdlib/assert/is-array' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( format( 'invalid argument. Must provide a function. Value: `%s`.', predicate ) );
	}
	return every;

	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	}
}


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":7,"@stdlib/string/format":84}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Boolean constructor.
*
* @module @stdlib/boolean/ctor
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = new Boolean( false );
* // returns <Boolean>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":32}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// MAIN //

/**
* Returns a boolean.
*
* @name Boolean
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {(boolean|Boolean)} boolean
*
* @example
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var b = new Boolean( false );
* // returns <Boolean>
*/
var Bool = Boolean; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Bool;

},{}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* 128-bit complex number constructor.
*
* @module @stdlib/complex/float64/ctor
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
*
* var z = new Complex128( 5.0, 3.0 );
* // returns <Complex128>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":34}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var defineProperty = require( '@stdlib/utils/define-property' );
var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var format = require( '@stdlib/string/format' );
var toStr = require( './tostring.js' );
var toJSON = require( './tojson.js' );


// MAIN //

/**
* 128-bit complex number constructor.
*
* @constructor
* @param {number} real - real component
* @param {number} imag - imaginary component
* @throws {TypeError} must invoke using the `new` keyword
* @throws {TypeError} real component must be a number
* @throws {TypeError} imaginary component must be a number
* @returns {Complex128} 128-bit complex number
*
* @example
* var z = new Complex128( 5.0, 3.0 );
* // returns <Complex128>
*/
function Complex128( real, imag ) {
	if ( !( this instanceof Complex128 ) ) {
		throw new TypeError( 'invalid invocation. Constructor must be called with the `new` keyword.' );
	}
	if ( !isNumber( real ) ) {
		throw new TypeError( format( 'invalid argument. Real component must be a number. Value: `%s`.', real ) );
	}
	if ( !isNumber( imag ) ) {
		throw new TypeError( format( 'invalid argument. Imaginary component must be a number. Value: `%s`.', imag ) );
	}
	defineProperty( this, 're', {
		'configurable': false,
		'enumerable': true,
		'writable': false,
		'value': real
	});
	defineProperty( this, 'im', {
		'configurable': false,
		'enumerable': true,
		'writable': false,
		'value': imag
	});
	return this;
}

/**
* Size (in bytes) of each component.
*
* @name BYTES_PER_ELEMENT
* @memberof Complex128
* @type {integer}
* @returns {integer} size of each component
*
* @example
* var nbytes = Complex128.BYTES_PER_ELEMENT;
* // returns 8
*/
setReadOnly( Complex128, 'BYTES_PER_ELEMENT', 8 );

/**
* Size (in bytes) of each component.
*
* @name BYTES_PER_ELEMENT
* @memberof Complex128.prototype
* @type {integer}
* @returns {integer} size of each component
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var nbytes = z.BYTES_PER_ELEMENT;
* // returns 8
*/
setReadOnly( Complex128.prototype, 'BYTES_PER_ELEMENT', 8 );

/**
* Length (in bytes) of a complex number.
*
* @name byteLength
* @memberof Complex128.prototype
* @type {integer}
* @returns {integer} byte length
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var nbytes = z.byteLength;
* // returns 16
*/
setReadOnly( Complex128.prototype, 'byteLength', 16 );

/**
* Serializes a complex number as a string.
*
* @name toString
* @memberof Complex128.prototype
* @type {Function}
* @returns {string} serialized complex number
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var str = z.toString();
* // returns '5 + 3i'
*/
setReadOnly( Complex128.prototype, 'toString', toStr );

/**
* Serializes a complex number as a JSON object.
*
* ## Notes
*
* -   `JSON.stringify()` implicitly calls this method when stringifying a `Complex128` instance.
*
* @name toJSON
* @memberof Complex128.prototype
* @type {Function}
* @returns {Object} serialized complex number
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var obj = z.toJSON();
* // returns { 'type': 'Complex128', 're': 5.0, 'im': 3.0 }
*/
setReadOnly( Complex128.prototype, 'toJSON', toJSON );


// EXPORTS //

module.exports = Complex128;

},{"./tojson.js":35,"./tostring.js":36,"@stdlib/assert/is-number":21,"@stdlib/string/format":84,"@stdlib/utils/define-nonenumerable-read-only-property":91,"@stdlib/utils/define-property":96}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Serializes a complex number as a JSON object.
*
* @private
* @returns {Object} JSON representation
*/
function toJSON() {
	/* eslint-disable no-invalid-this */
	var out = {};
	out.type = 'Complex128';
	out.re = this.re;
	out.im = this.im;
	return out;
}


// EXPORTS //

module.exports = toJSON;

},{}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Serializes a complex number as a string.
*
* @private
* @returns {string} serialized complex number
*/
function toString() { // eslint-disable-line stdlib/no-redeclare
	/* eslint-disable no-invalid-this */
	var str = '' + this.re;
	if ( this.im < 0 ) {
		str += ' - ' + (-this.im);
	} else {
		str += ' + ' + this.im;
	}
	str += 'i';
	return str;
}


// EXPORTS //

module.exports = toString;

},{}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return the imaginary component of a double-precision complex floating-point number.
*
* @module @stdlib/complex/float64/imag
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
* var imag = require( '@stdlib/complex/float64/imag' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var im = imag( z );
* // returns 3.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":38}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Returns the imaginary component of a double-precision complex floating-point number.
*
* @param {Complex} z - complex number
* @returns {number} imaginary component
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var im = imag( z );
* // returns 3.0
*/
function imag( z ) {
	return z.im;
}


// EXPORTS //

module.exports = imag;

},{}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return the real component of a double-precision complex floating-point number.
*
* @module @stdlib/complex/float64/real
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
* var real = require( '@stdlib/complex/float64/real' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var re = real( z );
* // returns 5.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":40}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Returns the real component of a double-precision complex floating-point number.
*
* @param {Complex} z - complex number
* @returns {number} real component
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var re = real( z );
* // returns 5.0
*/
function real( z ) {
	return z.re;
}


// EXPORTS //

module.exports = real;

},{}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/float64/eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/float64/eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* ## Notes
*
* The difference is
*
* ```tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Maximum double-precision floating-point number.
*
* @module @stdlib/constants/float64/max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/constants/float64/max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* Maximum double-precision floating-point number.
*
* ## Notes
*
* The maximum is given by
*
* ```tex
* 2^{1023} (2 - 2^{-52})
* ```
*
* @constant
* @type {number}
* @default 1.7976931348623157e+308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX = 1.7976931348623157e+308;


// EXPORTS //

module.exports = FLOAT64_MAX;

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/float64/ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/float64/ninf' );
* // returns -Infinity
*/

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

/**
* Double-precision floating-point negative infinity.
*
* ## Notes
*
* Double-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;

},{"@stdlib/number/ctor":67}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants/float64/pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/float64/pinf' );
* // returns Infinity
*/


// MAIN //

/**
* Double-precision floating-point positive infinity.
*
* ## Notes
*
* Double-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/float64/smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

},{}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a double-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/math/base/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":47}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

/**
* Tests if a double-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnan;

},{}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a double-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":49}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/float64/pinf":44}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Compute an absolute value of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/abs
*
* @example
* var abs = require( '@stdlib/math/base/special/abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":51}],51:[function(require,module,exports){
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

// MAIN //

/**
* Computes the absolute value of a double-precision floating-point number `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	return Math.abs( x ); // eslint-disable-line stdlib/no-builtin-math
}


// EXPORTS //

module.exports = abs;

},{}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Compute the inverse of a double-precision complex floating-point number.
*
* @module @stdlib/math/base/special/cinv
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
* var real = require( '@stdlib/complex/float64/real' );
* var imag = require( '@stdlib/complex/float64/imag' );
* var cinv = require( '@stdlib/math/base/special/cinv' );
*
* var v = cinv( new Complex128( 2.0, 4.0 ) );
* // returns <Complex128>
*
* var re = real( v );
* // returns 0.1
*
* var im = imag( v );
* // returns -0.2
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":53}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var abs = require( '@stdlib/math/base/special/abs' );
var max = require( '@stdlib/math/base/special/max' );
var FLOAT64_BIGGEST = require( '@stdlib/constants/float64/max' );
var FLOAT64_SMALLEST = require( '@stdlib/constants/float64/smallest-normal' );
var EPS = require( '@stdlib/constants/float64/eps' );
var Complex128 = require( '@stdlib/complex/float64/ctor' );
var real = require( '@stdlib/complex/float64/real' );
var imag = require( '@stdlib/complex/float64/imag' );


// VARIABLES //

var LARGE_THRESHOLD = FLOAT64_BIGGEST * 0.5;
var SMALL_THRESHOLD = FLOAT64_SMALLEST * ( 2.0 / EPS );
var RECIP_EPS_SQR = 2.0 / ( EPS * EPS );


// MAIN //

/**
* Computes the inverse of a double-precision complex floating-point number.
*
* ## References
*
* -   Baudin, Michael, and Robert L. Smith. 2012. "A Robust Complex Division in Scilab." _arXiv_ abs/1210.4539 \[cs.MS\] (October): 1–25. <https://arxiv.org/abs/1210.4539>.
*
* @param {Complex128} z - complex number
* @returns {Complex128} result
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
* var real = require( '@stdlib/complex/float64/real' );
* var imag = require( '@stdlib/complex/float64/imag' );
*
* var v = cinv( new Complex128( 2.0, 4.0 ) );
* // returns <Complex128>
*
* var re = real( v );
* // returns 0.1
*
* var im = imag( v );
* // returns -0.2
*/
function cinv( z ) {
	var ab;
	var re;
	var im;
	var s;
	var r;
	var t;

	re = real( z );
	im = imag( z );
	ab = max( abs(re), abs(im) );
	s = 1.0;
	if ( ab >= LARGE_THRESHOLD ) {
		re *= 0.5;
		im *= 0.5;
		s *= 0.5;
	} else if ( ab <= SMALL_THRESHOLD ) {
		re *= RECIP_EPS_SQR;
		im *= RECIP_EPS_SQR;
		s *= RECIP_EPS_SQR;
	}
	if ( abs( im ) <= abs( re ) ) {
		r = im / re;
		t = 1.0 / ( re + (im*r) );
		re = t;
		im = -r * t;
	} else {
		r = re / im;
		t = 1.0 / ( im + (re*r) );
		re = r * t;
		im = -t;
	}
	re *= s;
	im *= s;
	return new Complex128( re, im );
}


// EXPORTS //

module.exports = cinv;

},{"@stdlib/complex/float64/ctor":33,"@stdlib/complex/float64/imag":37,"@stdlib/complex/float64/real":39,"@stdlib/constants/float64/eps":41,"@stdlib/constants/float64/max":42,"@stdlib/constants/float64/smallest-normal":45,"@stdlib/math/base/special/abs":50,"@stdlib/math/base/special/max":65}],54:[function(require,module,exports){
module.exports={"re":[-17.646025151048626,-7.04667474779459,-5.524284909364738,43.77617675363801,47.011590087870744,9.662838904742685,-31.763957032869428,-3.2006383614011185,-16.409769385207042,-13.779730840880532,28.184572035952854,-37.992769827591765,-21.452274353059874,-15.080983180402384,-18.263813467807786,-5.823394882796727,-8.290992154389286,32.81932154412965,13.233355752238005,7.687304336459633,31.861309282674895,-35.72333597888646,-19.15979406670225,23.58618826544128,7.277433862011293,-32.68587356357877,-28.016011456559674,40.8494986423587,44.630142823742915,-46.99184531464526,-48.942979398545525,24.72325414997414,12.136422032685367,33.46351964739141,-7.093948935966331,-29.002882323837675,11.056038583800529,-11.473262168606269,-36.990491777653524,-32.777876618693,-19.176918966735368,-21.554116774078793,-41.7938086664994,47.689955365262634,5.691811122679248,-5.41572000331081,-18.727279783732097,40.62970860073098,-15.988580798074196,10.212218732722377,23.019512647029686,11.672687444457594,17.720319634475956,6.512809295913534,-11.36409054721075,-33.45118827532192,49.80367287395569,49.69184328424518,-39.555675544208846,48.82817737669565,39.84299014148165,-48.49928775967165,-22.540999276925746,27.881226513130542,-28.351439614005415,-29.407345315346035,-47.30253331902807,6.7311143922942165,-30.116305031750002,32.76885557708533,8.163022538346823,6.613153471834842,-20.942107811423007,-32.818279000185214,-18.54318054578441,-32.273177336487315,17.747773273676742,46.28879028470634,7.727361868472357,0.22879428312998584,43.68979495775211,-26.765677467829295,-25.563653959864684,-32.716657957543234,-25.70169764062513,-29.98486077850757,-42.12069685118529,20.355726392866075,43.64865852452297,38.04389040202187,-6.393209685479292,-33.542498918679044,26.91479505642866,15.88040146446788,21.397495971747134,5.54037910808691,-12.636965935323666,30.307311155166644,11.047932460408802,-42.92676607220831,6.979816260762561,3.0363676880693617,-42.48795024707004,26.732971655236028,33.73841754763562,-31.250019116719496,34.65576897249059,-45.67966360154774,33.64089859080042,16.340767420468154,-45.60070982534772,35.854555463658016,-29.2631868098155,46.66613289620088,33.45734264521086,41.46490706413246,42.78956669648342,-31.42416144259217,25.441150039940936,45.30102896535615,13.284178552270156,0.05850553858648766,-19.96684925709731,39.16311344573977,-33.38354870529095,-4.138435184533783,-26.97933739760572,11.63963884203121,-34.28288369215156,-19.96176528541078,1.616955565795351,17.967895932276193,-46.62197580053444,15.24656011979802,-17.0463734590679,6.879058289548553,-36.85822416460371,-15.27868625458624,28.853500019334007,-38.5136293209577,-12.030733270081015,4.419478033741967,34.27049045210093,-9.003602473790792,-36.950453588178746,-31.735406450398074,6.359382574685249,-31.041877406879404,-27.61959775046343,29.680170397928805,10.570790923242448,-14.941529724158407,24.73963561980763,25.207579098392912,-20.2120407463773,-38.66000910012815,43.067009438484945,-49.24670885012341,-10.160247195769358,-12.773993803167308,-32.50002972631096,4.353566096218799,-16.977001064351406,-15.275775934563107,-1.2683122705199352,24.820514298360322,-21.35004484525713,35.60761242716404,38.11892199074005,17.093709361867752,-33.855698409833295,35.450832394706595,-38.21722659558948,-2.568044296390127,40.33909170509189,25.61648550566231,1.149109483207745,18.476579454083804,7.357230813525241,-6.791494016051303,-49.98222654842597,33.03577591898872,41.41707097125338,1.6721267500390695,-44.12883362687479,-0.8773784955735877,8.427222862728676,1.218174711547725,-1.5879469058682787,-9.744012957580608,-49.0749931621971,26.087154437281868,35.90899169146962,-6.730116996236177,-24.371397697428243,-45.10180962821675,-18.9587964642117,-27.958066287050443,-11.57014438596817,2.3644082641652417,-10.054177758971946,2.772511991383375,-35.68689850450022,-9.898249953305907,-8.943159138700011,25.642709571819026,-12.932313435008801,43.77636714980626,15.781538741043889,47.92776176283044,-2.7438285951118644,-47.658353712168044,-34.839270690266446,22.25516169454349,-23.548450434433676,-15.325218842621211,8.496131199156224,37.93929246331969,-16.184899948860895,-34.934381398767584,19.49731507306916,26.654042109031266,6.2107329634784065,20.001184877256534,-15.05599781185456,39.337017816962884,-43.001927640840634,47.39652879580085,29.04940844946286,-11.257589047516483,-47.32254221407728,-33.62930821157188,-35.89329075676475,-30.31214929807571,-37.400882023134145,44.02860107595423,28.70938925112148,14.105384842654672,-26.737601155258297,30.039152094242567,41.975112419160766,22.71673308106692,33.68194755353824,24.320418559705388,-35.61230758371208,-4.5500638822792325,-46.4889201635502,40.33230139093065,2.7131091236328473,48.48199144079419,-7.395607770079657,-46.43579415891972,-22.879431590967346,-32.690456942708245,-18.04115012451284,-24.388936486591128,-41.100260581685035,-23.60920509952482,-47.08801445781188,-33.50393063275207,34.30335817680172,-41.613339752373825,10.3725981962534,-30.832965898728215,-42.679157338695404,-30.668751063009324,17.68627825077364,36.6786425816031,46.360219767835204,15.522490197676404,37.52269117714478,-30.694683954922475,-11.993499529270224,-6.506983253815065,42.343453715852306,-41.734703096913094,30.385849133363223,-11.32289492462499,46.3672188986171,-47.22113528356946,17.15827696531082,2.67527285721836,-35.364229979096606,24.990633816613823,-12.680364730253181,43.26430213023565,19.557001358918896,-19.05145010433187,-46.78689657364774,-20.412134770389812,29.491596854040196,45.917506286991966,36.70226510606946,25.50865498572928,-19.15617846929958,23.27161228884711,-23.871891404371492,-35.34092855060811,23.74770057085074,21.13418482057712,48.35614783431252,-41.9405792306639,46.023063517327174,11.65471292710454,47.66664850739613,-11.876107407191583,7.969281501759106,-3.091861542056762,29.022093011771346,-25.079934085265254,37.31421603709846,49.67397181832392,-28.28794384377451,24.38874679162157,7.674208535741322,14.031646742221085,-48.64651444749526,-44.919639036532445,4.746584838751879,18.809178416789834,-10.004035124013285,-27.02511261799485,-34.737260641016206,37.29484450178717,28.949131664186865,-12.344871496020126,18.138006032664578,1.3337732324488556,-6.528257430071328,-47.42479953028502,-7.822316917565097,-34.73933060690129,-21.85817778329655,26.499488556628606,-30.594754576079897,38.96073351095839,-5.569647122806785,-24.941096370419814,-17.102509260769594,-35.1946125250376,-43.7172934529944,-39.40134007542689,-16.749154969045385,-47.341420121502594,-41.89943983867835,18.430506241722995,-33.220611868960816,23.64500747802252,-37.953609527366325,2.617771073321066,32.657539250773766,-13.214220196611763,-29.574494999726042,-37.8127809636603,-23.176814342429886,-7.012989462220375,-12.562372068643455,-38.7883909761495,-28.282115774717266,-43.33327716697086,-19.032124889731005,-25.882331760307743,-44.65273023854988,-15.739949737814783,-47.49268931009443,33.83670730920247,42.54146858315329,34.97901180865988,-20.7013951068403,-5.840678358255971,18.997721475022658,-13.398537328871107,42.74653900321306,22.2003886972485,45.95178112830179,10.411486936473494,-13.064024921599568,27.17337536459665,-45.32746367926828,-11.434851456686587,-47.98811881242165,46.23097878305941,-25.077975265714116,10.475261104246478,-29.032408276306022,-25.08698144467143,-22.07731138065214,17.168250833283125,-15.568036202964763,23.92784133443972,-12.48076337580548,46.199500932839314,-28.231469244146766,-22.827095386974005,40.4438965177645,22.832944566174135,42.021291771223574,-2.464788317978538,36.87089691542815,-23.76445231388238,-17.41934391505167,49.080707545143,40.19811578304606,35.10357600932301,-27.81189887211999,27.820010447472555,2.0077385990036305,-36.48402110460669,40.88794544968788,39.39471219137761,-30.84656359550233,41.57663253582187,13.8022094198339,28.321110119620812,-15.861298196315673,-23.130020028112973,18.96490215152255,10.066812479694654,-16.719596898784815,-27.75930062400327,-15.548218534804633,20.899742692037677,23.111228573794264,-47.82940123383182,-20.57828311497991,-41.30426595058381,-19.149273514722708,-1.855136770094859,13.894203146089865,14.544164071318662,-47.88684930496554,8.650764247723039,46.90261070454231,-34.62207420834529,-0.18598058202017143,-44.05557589641871,24.554043080403048,25.386642773084972,44.5161847433976,-16.67757084909134,-29.263640006003033,27.710377950977687,-9.60311039718458,33.15968344625068,39.395913772919585,34.569906026083586,36.761435018319744,-8.08626551515139,1.0947240441739226,-1.9843558986935932,29.34505829204521,26.68443239827245,-36.49694828665506,49.13232978445892,-30.199892940779204,-19.52013495676159,-6.709490040473007,16.874018597059106,-18.84847070186586,-2.8068902109586986,9.703711102678781,6.8926669126806885,37.30768612124197,10.21492915676405,32.40248598248638,18.126043988287208,-34.113995093499305,-43.740644760044404,27.01099867822893,18.53637394353042,-47.26981407912745,34.25797063291873,25.743466970585473,-0.14115326249986282,35.86723220298269,17.09630295312185,1.3277772034912871,-22.566734652022635,6.335148110728284,-47.158953620792296,1.8839162092235924,13.689148719731946,-13.784965054745626,40.6726152941836,-22.556210024727875,33.22307238092141,6.369447856585573,-30.803616665749622,41.936364392126805,-42.6529314642885,-16.857995946263607,10.36279436576337,-14.295786031865411,-15.380326396890595,32.23589223200203,-15.287210104257284,-26.299261912564063,46.97757918531569,-34.18818527961058,-35.436049649597194],"qim":[-0.02518919923625195,0.022334009850217853,0.07201696138338322,0.005767937372258766,0.010303950218771084,0.035415544309874904,0.015209002016629098,0.10555099865832614,0.027175453157262313,0.023014913189402287,-0.01657822503670994,-0.005311533857001358,-0.022127646228702277,0.023334757564139802,0.027011681735089395,-0.08500511880968294,0.05273394030658974,-0.006233160608396666,-0.027761156223778366,0.02736150495549551,-0.015263871161207879,-0.008344009179774178,-0.021984213987448615,0.017051222395030062,0.028587219678906498,0.012607521564368531,0.017790548393285147,0.011995017256942991,-0.011189012415991557,-0.010010120069643833,-0.0038385596721869303,0.01736981720400339,0.024078948279060947,-0.014889748498521893,-0.06666837322674399,-0.015290061378443022,-0.04148424627284334,-0.025921530921115505,-0.013011039142945819,0.01426462596758425,0.019882974094797588,-0.016615516464622254,0.001041890796384291,0.010133097281983458,-0.040174454966238164,-0.04842013683479835,0.025270613377081287,0.002957137834638754,0.02620250015362578,0.04831930852336118,0.019941180386916856,0.009711959883758487,0.018158915792403967,-0.02282769925040224,0.03682869309318951,0.014862153724365631,0.01002722771464068,-0.0008783864473480462,0.012580492926913933,0.0046617145366244376,0.005352106989980824,-0.00803545930696326,0.02079037588417239,-0.017216416978026446,-0.009006494064946757,-0.01530785743232976,-0.0069659095298744865,0.029693437256210705,-0.011802921472258717,-0.01491176744872934,-0.023033343340976002,0.027882661947577672,-0.0032461227998922394,-0.014783696861383961,-0.020654179230774613,-0.015425234172814604,0.02573213745832818,0.010801227392702072,0.05599649718055828,0.08547125055616914,-0.0008596351458196214,0.016023059290572714,0.013431450945223144,0.013489946846158951,-0.010732612577421401,-0.014876571759652126,-0.003931679154085427,-0.022808055869609236,0.007347175251584308,-0.010354889819711952,0.03667751744518754,0.014234565809528147,0.01602978717916536,-0.027140581550368234,-0.020248573130027085,0.06983900972633522,-0.029050299695825423,-9.59776288706922e-5,-0.026847769906507987,-0.0098256125939251,0.0663053474452026,-0.07077256180090559,0.011404245419506626,0.015836466021580717,-0.003652627255649574,0.012458216898212533,-0.003474149537070254,-0.010910764571906923,-0.0007202333396802362,0.01990317105926729,0.006368120561826205,0.008637248447380924,-0.01509812334451544,-0.010714406223946414,0.014927673372177732,-0.0013196097493743395,-0.00014092146683061538,-0.004177738416656475,0.005306717079769486,0.0013432117078902841,0.03760008329318096,0.023923395233040046,0.024970115079728773,0.0069110981726971344,0.0039049938568959342,-0.050100312393553136,-0.016841177820680734,-0.03670822541904275,-0.01081837656339878,-0.02324854385268418,-0.2499269006892006,0.02463353660899735,0.0061014908092546834,-0.0325879791142369,0.02746802939285022,0.04192531951964687,-0.01333563920198468,0.030668041522673706,-0.017263879667468833,0.012978909978217112,-0.04152341976286324,-0.02164476074327594,-0.014259475898099203,-0.039373082384539584,-0.013528368264570243,-0.006572633204361986,0.05077435211934412,-0.014812832004771376,-0.0174398263472073,0.007454797677367574,0.044729989568590076,-0.02985158560160968,0.018223929543683477,-0.01619870742618815,-0.02015298592597157,0.01286332218021152,0.007713041283205542,0.009357284640691809,0.030157246365536856,0.037805828536167534,-0.015210487961417336,0.062022744752334776,-0.0263806386114522,-0.023493101618466024,0.10122657414640156,0.020053293709309004,0.02115132924105041,0.006897998197184123,0.01309182328080521,-0.022746562908258227,-0.01462281520662908,0.013544882837339204,0.012660374389608936,-0.021128980392053846,-0.009632579264703492,0.001412375368313286,-0.03863218211709197,0.01842392164857833,-0.03592769016840527,0.019742825069583896,0.0016506455253901403,0.01474654878980487,0.001166623301243912,-0.025856906527094034,-0.010522258910372962,0.07031005105689521,-0.05439965456133181,-0.046800946169621854,-0.10620870435150857,-0.03427691271126792,-0.010179580403474064,0.018144012088843094,-0.0005494928288967598,-0.03459004780156673,-0.01840320226251844,0.005541784999143302,0.024955748513467962,0.014983500889711713,-0.03417577252646097,-0.0749281395164414,0.04800844229041876,-0.17388439888905252,0.013584325408982311,-0.027080886215842086,0.03880535485247502,-0.018885724902508144,0.02921043313091518,0.011421654547882343,0.03129539345479015,0.01015166553052165,0.09031555258922513,0.009426963481247476,0.013647741748185966,-0.022377254523568542,0.016831392787078448,-0.03233272319018926,-0.02086842744165522,-0.012165403390981242,0.029935300412061185,0.013970535801391357,-0.025644267351628548,0.01802085961369054,-0.022405954951504017,-0.024757047969063774,-0.028916365871342508,-0.010997514471651544,-0.0028767440974546486,-0.005975982862094957,-0.016481256180632797,-0.03482823147226194,0.008218744715350822,-0.013752353458235817,-0.008966741229043852,0.016466504798064927,-0.013360558302396904,-0.005406811202635999,-0.0012926732227562035,0.032995498661034385,-0.01865605158563583,0.013075547688146233,-0.0113057474569998,0.009898970172594937,0.014768529515688083,-0.01699618283727887,-0.013949657900439815,-0.049388747933531804,0.0019724583073406914,-0.008954660307122018,-0.10139875943486834,-0.010191393861826124,-0.064384638615575,0.010559945320253332,0.01853259287681305,0.013758825156558798,0.022005559692543405,0.01806013113915869,0.012109290732097941,-0.019201826909597028,-0.010488160099080114,-0.0103614237566307,-0.014522627748124437,-0.011902999337006738,0.02783540891007444,-0.016216251403331012,0.0034090266279527986,0.01602857873954752,-0.019462969308250203,0.0054249076624859815,0.00943980281273603,-0.0320017784185145,-0.008289197660116276,0.014913899391112297,-0.023382425944036625,0.023882001143923352,-0.011713862415003008,-0.0014826991110675018,-0.014736422606542125,-0.032736572076873596,-0.010772455419989786,-0.008188908331784093,0.0255298289445786,0.037872796940517185,-0.009912583808418774,-0.01143465727410161,-0.023532441202551473,0.010326627824302577,0.01988312769149523,0.023042076392488207,-0.008525942263790854,0.02148978101596491,0.016017537495635902,0.005394387388615159,-0.012550665888830559,-0.01764027045014441,-0.018587849226799215,-0.02064906537294566,0.007852318102990847,0.013785365913698019,0.01410424456107328,-0.023486255278637853,-0.004265931364768763,-0.011884891265902954,0.007512200507767116,0.0364624071817414,0.009563506572511489,-0.04087087109835165,-0.01825188503679836,-0.11375870020824644,0.014666637857550815,-0.006521666505815296,0.013397343823733306,-0.006315076409164931,-0.01732020364292748,0.019888265089687805,-0.024854796452664522,0.03562131475998205,-0.008436749716715184,-0.010516642674399217,0.02243429940957079,-0.02658244722033677,0.024915731816618988,0.017438346214001157,-0.013853770198215458,0.01307705304950312,0.004905588248261097,0.028053810205540663,0.027379074994923626,-0.02614695356169375,0.03531673406994959,-0.010269555150036625,-0.029098884621109083,-0.01369673442032073,-0.02142738862887454,-0.008363645345780343,-0.015030355712192066,-0.008442545842019724,-0.06545328763085329,-0.016089409490512428,-0.017971914867312463,0.0044443421933132825,0.011404453712806323,0.005183809413030176,-0.02236722033956762,0.004462225036874329,-0.009985489471856953,-0.02460356963862345,-0.01486444150731972,-0.02068554617558408,0.010677992702583931,0.09839772593207019,-0.014494778757914694,-0.019423725715801848,0.01674963137099863,-0.013172626657844277,0.01936588398619316,0.026723389346761453,0.014657361183689202,0.012621523187355283,0.017270112295022098,0.002481364000043873,-0.026166570616130994,-0.008883739165177386,-0.009530915283536088,-0.028860721334726336,-0.009825938508966164,0.012751894225817626,-0.011707486085267144,-0.013850302678224307,-0.023223294493551056,0.052301694606073694,-0.026084450703752808,0.01996230636423316,-0.011685337269230196,-0.01978465181127474,-0.010452267120597087,0.02755132738561837,0.02047586696323621,0.017275444183779357,0.007170323760483246,-0.02987404154710184,0.010413262108672496,-0.009498740899025663,-0.019339486557155366,-0.043647361802812576,0.015361040654732443,-0.018436737756320605,-0.005097149890418011,-0.020223389890296515,-0.02595471988053407,-0.020076482007380245,-0.03539746344125002,0.005470945123949113,-0.015633875754154977,0.021745759870013252,-0.012361624549825114,-0.01852575638393926,-0.009982829107883154,-0.04123443240585696,-0.013486490141235773,-0.017966018006795086,0.028430559099315723,-0.009186695690528357,-0.012102017449795385,-0.01403685455890791,-0.006717604512287892,0.016349366049420378,0.039142462484317006,-0.013262444537285993,0.003609055679677985,0.008686496479916126,-0.014530191612455789,0.011972024644443252,0.018318341526474404,-0.017475135151608368,0.03151370683903868,0.019686295952217787,-0.020939061708478427,0.03324627981457549,0.028469159362396534,-0.0033404878081898254,0.026832635482242535,0.011622560443056826,0.01804213777811851,0.003060446605432272,0.02129594446779957,0.009727623936345525,-0.02121279896938303,-0.021481489448163152,0.023734585083983076,0.026717841332381788,0.004390520183843813,-0.05441671001144917,-0.009758255341960636,-0.0016799243653171335,-0.18941098389380415,0.004612373566941166,-0.00889570769103189,0.01857956493925281,0.010802992609193223,-0.029682071856272006,0.005540332584437938,0.0018062447191605794,0.02579693769826963,0.0017725394978833715,-0.0126030850825091,-0.003118694828057798,0.013370894520248987,0.027794053368531663,-0.07355995274609495,0.030781385658799322,-0.01701939280332268,0.018609870031308408,-0.0035725882870284308,-0.009701823378198512,0.015334671822600086,0.019162026425969224,0.03114348760340112,-0.02529992252842419,0.02370384328412388,-0.04527434994602084,0.028959166741836316,-0.05225396775111904,0.013300381563752918,0.03476718930217259,-0.015383246777724359,-0.020552425691990214,-0.014321298987120975,0.00815875121482121,-0.018482220389002615,0.020399209544254678,-0.01050037998567776,-0.002921922355983549,0.018291667349288943,0.30478838635293976,-0.013876352533175264,-0.028091376795800628,0.021196323538385634,-0.02195952460542839,-0.019706725768173186,-0.010094356704272231,-0.020213361858049336,0.026533287410590058,-0.020469384347728537,-0.011957759838020637,0.01969947498614878,-0.015039884095061098,-0.03587536718789891,-0.006208336727809116,0.011283222229862099,0.01158927489711724,0.018321500712704136,0.00814369365769533,0.022654333360099577,-0.030714297688256766,0.015485086941161904,-0.025769186230323326,0.018434214801436026,-0.009528776052314664,-0.014587652623375457,-0.013302540610393456],"im":[28.939962460176787,-43.636833953210655,-11.148147355436699,-11.865472502379944,-36.50036690955236,-3.8248862380731765,-24.399760690843063,-8.229255739781124,-26.72008066344469,-38.520774084688505,40.89587979689581,8.007513515306151,15.497807831853109,-36.64868164814408,-21.522501086617176,5.053759034103919,-4.881622435001077,7.021050952754273,5.793314653872429,-1.6955828639458446,40.365237526415456,11.812557448083894,34.99811318565189,-46.74621625465183,-33.39475767241829,-17.198694604615362,-25.872434936437784,-33.3850452221387,46.934179337305764,33.01681634257588,9.544637498346084,-43.52901933604998,-37.614168572542624,36.37646637267906,5.066084781953585,17.595122533041348,7.253473395517233,34.794762660484196,28.013324710377702,-47.47090033986727,-41.414429494262635,9.093072686389839,-1.8233579428067443,-36.677357928174374,23.51365620269496,19.118442525828655,-26.170807356825865,-4.95414254445086,-29.498178342739777,-12.017614141844149,-35.0132858800825,-1.3407281381236231,-6.459839059880856,42.81575011694132,-21.004378442283933,-37.225205094816346,-47.40746270705649,2.173129635495499,-43.60925966990723,-11.75901313808194,-8.92234860321701,23.241255059807116,-15.665909023656297,37.170868607804536,7.785356743311269,46.87835291004198,17.791367796404913,-32.27360677595597,12.570103455978114,40.636967775087115,41.822023447147544,-34.60062151218204,1.430298949941644,41.995591589551225,39.77050929432086,29.391743065871538,-27.341615237850814,-45.835123362822074,-4.455066896518758,-11.695364652756979,1.6431910858085246,-47.24722862016648,-10.165403296960498,-19.64603609348825,7.731228390792147,18.426577531922206,7.177973892881418,30.059765638190015,-15.84172740215137,18.55026764206538,-25.672565097264453,-45.5526555578619,-46.95677400478888,9.08423889681307,37.017717773598065,-11.693647157933931,28.89671928174789,0.08815937583020172,33.61614272260587,23.55937744262168,-10.395144624684981,0.6857729045062868,-33.026162294999374,-48.3710233752205,4.222850907859986,-14.951091573809137,4.234835974833075,49.48940968157996,0.8155743861662827,-44.202384006212036,-14.599331741474565,-12.440321830053612,17.612453266223028,46.69494646736932,-31.91041692835408,2.2756898182734417,0.25802912189021043,4.199087747347427,-3.4997830820933302,-2.766799058397986,-13.900524820053839,-41.80000502570063,-21.5348851587037,-11.516512405602164,-4.428549564210947,19.061459339741546,42.08107113820189,20.69541593857484,15.22159828883261,29.51091435112734,3.178632036974882,-29.739169933460264,-14.554807683413593,13.62478637154274,-24.588091686954616,-21.668003216845875,44.3662913902521,-10.614181926730005,31.46915031295788,-37.62864008285894,12.548062053679956,45.773855091729956,27.64511696700987,21.65450629108237,36.14747072392419,6.935705700036834,-2.3287587591992036,47.01231961550461,20.98058195405177,-6.9244692547461,-7.543605802069031,24.31903448536336,-39.298554047985746,13.052938762842928,10.422016139253621,-42.90712615570775,-16.373764370320856,-32.698186557949114,-29.68159199563636,-9.799361973047027,37.803594657836896,-14.846482582359897,27.379965307658452,36.10209049313863,-9.713217808491748,-27.305158420453356,-33.78738985438379,-9.348882212936175,-40.549667162832435,35.80105848413611,29.401205243055472,-47.20531275086477,-49.45144332051923,47.18860528398403,19.24048575243941,-0.928023207700754,25.834041535077247,-47.01628798216084,25.72995606511425,-49.72369854648,-4.152138111069625,-41.53975124656684,-2.0058890226505284,38.601954857961715,29.893439767831808,-14.168385853380073,12.860119216718523,21.29741191982302,9.139526332681513,25.442355844088056,47.064431826713474,-18.676692537477923,0.708822733201032,1.662321125621304,39.177497063669335,-12.081897512864792,-26.514958759455954,-15.151751098695307,23.58434635004481,12.913197292518696,-13.131872890630333,2.1128952634190696,-45.818782616724654,34.0489261237455,-22.160512803897547,33.06124229371994,-28.331128964023367,-43.88217852255809,-13.486626411862844,-37.90452904465653,-10.344503064085366,-29.76159512805092,-25.30345139865682,20.35229501890872,-47.81551898877139,17.53288959474463,46.36231984354457,25.294049410047293,-12.576089596893738,-43.56682072799889,19.404930151807605,-20.039671656289592,43.74930492925837,22.996605449243532,25.79442927335552,22.669012899850614,5.40357366958861,14.719392302875619,21.59133007259328,23.2649460170137,-22.60485623330648,22.5396299791945,13.088093149095847,-32.1498452448834,38.726965338231366,11.153852107403914,1.0669302999938708,-20.691557501524272,24.959250358899794,-14.577223324478126,30.298106952882733,-5.396660207346905,-30.42942725039972,45.97003940192555,31.781573214500185,19.167407856433357,-4.2993759156957125,17.22261442952143,9.048558116111536,41.54578630801498,10.135017946503822,-38.0956626704138,-41.277214207267754,-20.467306478687174,-8.909041444446707,-40.78701522452568,-45.250792678654264,37.023031596083044,40.228670061870304,13.526676508315205,37.368042491501654,36.2745169682827,-32.627961972883426,30.697132028313305,-6.346904175491133,-36.896116223454236,44.32209312168433,-7.612637703904589,-27.349730531807246,17.40339804890712,13.091447834822588,-20.041937592793314,39.08706959021988,-40.83567923913447,37.29969049530861,2.592509101492624,49.02634724541896,25.523801540305442,44.316360232390494,22.350731017751784,-29.02755744153229,-26.130276018376453,14.473461157398077,7.845050789962848,38.295859477426845,-26.680234534931692,-40.95494539482163,-32.087294249082035,23.28681683086795,-34.4334353653444,-41.446665388635196,-12.172966469522727,24.344921637108683,40.70159361361725,45.78348685586886,30.90432338259197,-4.644137418680572,-28.11211070624944,-9.129759070462939,18.72589149788648,10.44006497802441,45.37041684542102,-18.476199474147247,-6.487293339312707,-30.80403520933144,9.297615937348901,1.1847877083310152,7.519172021398688,-16.204870677402553,4.218189204171786,-38.023455665366,17.52114062883652,34.62604666847342,-31.24220903007293,38.71237410706385,-13.665949122650666,25.41484598475205,31.967153388912806,-44.063291962514484,18.717200398210878,-37.46389383726296,-38.2511865992464,45.88419747884012,-46.6612555134303,-4.197573770088184,-30.678224065361203,-16.13660373322756,38.198802455548986,-26.720211142753048,37.67075688330131,32.48179576384631,25.28909362718754,31.503135108927836,6.194022099831685,46.32696858703942,14.619753600198962,12.867218654106402,12.537713233066697,5.877563318386002,-5.646743240810245,-47.15384841146513,-8.414740202555791,7.549633931946701,-10.491994020943409,22.655363756662112,11.760101499759479,28.359030795570177,29.18878176387409,-19.400284508766408,-9.436654865812088,45.60385043138125,47.832894654642516,-33.90794366152747,34.64607638301615,-14.441633595343674,-36.056371696392645,-2.3973661513621707,-47.66463077694474,-35.142538532748716,-4.71459232163609,17.40327648410252,6.304244149766916,24.924058269757765,24.56303744218502,32.61549131845808,-19.398489571847644,46.472358046081965,45.02777787873404,27.44599339229481,-17.128178455330122,16.615416703610705,-46.20947731138634,44.686925977166595,37.34781597697369,34.541186457782274,-33.01229529293268,-45.0495102735484,-38.90746646111172,-16.74173566980992,28.958611463958178,-46.38865337078193,27.468848987515855,19.567647411046792,16.091840146044404,-47.26768463070072,37.4214655710751,2.5166735328150835,42.51484990726664,30.611134740641717,31.811683146984365,20.740048016885353,-12.5370638779005,16.95446534165481,-25.750019636750032,41.00666148927037,41.37997336016046,22.83130258252588,23.99842754929675,40.95082338179898,42.31401341741136,-20.007211804063086,30.903530064719092,31.772057650108493,41.66701061956542,5.391335907805143,-43.28338839609132,-25.38893230893633,47.19988309723577,-6.171150212640498,-15.592999332279355,49.662793713447996,-45.71597334850177,-3.7468281977931923,24.54195200271181,-15.475308570091741,-35.89027151475268,38.388479453385955,-3.8661334610736944,-22.939602156360394,2.596632225645479,-28.904360303682285,-5.4178886525656935,-43.00590921211938,-7.158045634080466,-34.782683927742156,-20.80722031238229,37.31411262570397,46.477659848743855,-36.90108630833058,-30.490518012796365,-10.557493117898751,12.285147401543448,30.609897518222965,2.020563805796357,5.2729652249593,-9.355857733839379,5.646892264101801,-35.84077296915118,-33.615834521936236,19.21560672005755,-4.876260233451376,-1.3904442612758388,-36.218054596358314,-1.955801944456745,34.993606806342555,3.7714445051844976,-44.24718736830757,-34.05908829030921,13.505618509508288,-32.36550396117792,27.982111122711828,-23.73670435930788,4.8425635987502815,35.97887538089806,-20.31325482689368,-43.4086790616975,-30.640220684583674,30.05076155676612,-11.623873884605082,21.724907374541758,-31.546518111432718,2.9316165004868964,-32.970875267202175,-24.504575455734255,29.950078467618567,40.55453484017602,42.339694820491914,-18.35987439613669,25.545645046386213,-40.547582711123866,41.875002645542295,3.4642593259187393,-18.144204424129562,-3.2748809483934522,32.58514627011202,12.847002874601607,-47.14059423236434,19.739760485159792,49.94045775936415,34.38290113218075,49.4003813096854,-31.794663196721018,44.592030233271856,32.11145108205211,-37.01892117512517,32.0394076569839,26.333671099009678,6.123668120252248,-29.99454132817363,-49.62986376509486,-48.7512513603537,-0.8808496199840903,-38.8860684278054,21.613242438619594,-30.435693750413883,31.352007622838556,-33.75912490375781,29.095625946300345,31.829713899039575,25.05467447033209],"qre":[-0.015359012433734909,-0.0036065976600703,-0.035686845563133715,0.021280083524804316,0.013271238756888239,0.08947055627005827,-0.01979929609515933,-0.04105238506040426,-0.016689430128078112,-0.008232942265878646,0.011425360698826558,-0.025201316597815056,-0.030629385964505946,-0.009602285007744085,-0.022921886014828585,-0.09795052960525788,-0.08956380612665552,0.029136393343353165,0.06341330971159176,0.12404950543494071,0.012048161976004439,-0.02523381110737679,-0.012035306317327832,0.00860333463941194,0.006229768233469094,-0.023960414745224708,-0.01926452646723248,0.014676944059600475,0.010639734820832641,-0.01424710393070655,-0.01968336115315927,0.00986556581846804,0.007769207442516986,0.01369741047193166,-0.09335454412432687,-0.0252033397352298,0.06323197210537691,-0.008547393266382278,-0.017180564656703198,-0.009849489827025854,-0.009206795498328778,-0.039385232527189215,-0.023881533939760825,0.013175620720445634,0.009724791740308042,-0.013716070399824481,-0.018083119888759998,0.02425195630435516,-0.014202259744656703,0.04106034208040729,0.013110344904088484,0.08455455582134626,0.04981266391842065,0.003472377605817339,-0.019925588571757424,-0.013355378463173632,0.010534053931941253,0.02008561338066313,-0.011411106268942548,0.019357323748253514,0.02389997920066411,-0.016768201726055032,-0.029914373118373215,0.012913737006621257,-0.0327983779080664,-0.009602800047485807,-0.018520507889270094,0.006192983767183699,-0.028278238486198363,0.012024557457903156,0.004495758103705328,0.005329162153856122,-0.04752898241814076,-0.011553009968117133,-0.009630104851484387,-0.016937454740278374,0.01670304177294066,0.010908135790112294,0.09712653190891182,0.0016720584675923116,0.022856309034111337,-0.009077104616382128,-0.03377701347522997,-0.022464886796044685,-0.0356794999986531,-0.024208072947994347,-0.023071282821130308,0.015445048721375329,0.02024364739622259,0.021236367098705234,-0.009133760451342452,-0.01048156034871514,0.009187991421246338,0.04744517794993064,0.011704361804076415,0.03308929927432759,-0.012704128938919597,0.03299505962612165,0.008823509320723852,-0.017902925251858052,0.04452070259556983,0.3133566789269256,-0.014671490064794495,0.008752260500878763,0.02918262240033261,-0.026039537936572973,0.028430693525818944,-0.01007084260020783,0.029708261015637595,0.007357817830901893,-0.019890692465581096,0.024893624758313738,-0.025085613981756183,0.010707794795309764,0.01565132426912798,0.024044355772635174,0.023369333119230635,-0.03126439226064365,0.03857638667285048,0.02199251597294369,0.0359329037221856,3.348447259912642e-5,-0.023151947180354904,0.023501917267967434,-0.029436850762395075,-0.010877283416245795,-0.010797344418943288,0.02064565832731704,-0.024365716294917607,-0.015725774203168088,0.1271366702438412,0.014883159927620768,-0.019544301995857008,0.03646696316543245,-0.019042969791088007,0.013310258167184301,-0.011078861083102022,-0.04414540731467471,0.015828941911850174,-0.013284161393832504,-0.0398115012096321,0.002089807477626923,0.017676873395071343,-0.016370707195674888,-0.013828888541099173,-0.030074111447477098,0.13865477857385464,-0.00978080041362531,-0.022958418865725378,0.031953303163950064,0.06267975556181568,-0.018340709778102274,0.011472518198029856,0.03128262578690197,-0.039083893869893485,-0.01159005967307611,0.02028718712633629,-0.014092997833724032,-0.01032306750468835,-0.04928192475927557,-0.013076568918169763,0.018187480923530407,-0.016357366590951144,-0.009940569962280018,-0.013217752203634857,0.018228535999567336,-0.013365395485695784,0.026272792910872176,0.012307035427777587,0.010860660321188542,-0.01683827643954467,0.010172104436775574,-0.009784232053585333,-0.0011498572008604964,0.02019540999718138,0.038986194365322614,0.001718376382088073,0.007240279205473063,0.01027317374724034,-0.0026965668733328484,-0.019869989001869245,0.01172765042589635,0.024088132253942317,0.001120047552936202,-0.015533007122667026,-0.004353955874605446,0.03564803754290359,0.0026769322636463087,-0.01845323021261806,-0.013127506102469011,-0.010614445331750008,0.02534311921255605,0.02783733154023954,-0.14004217658181856,-0.011448198452217328,-0.020687522946269642,-0.017843925799438082,-0.02764761038892138,-0.016766147204771115,0.013719353021411583,-0.036756783799180334,0.22816870735668338,-0.010580430435650665,-0.007872594270587077,-0.015660398608572434,0.014648002468445562,-0.013333689501080659,0.011394113961076988,0.03662068252951358,0.012836107433746594,-0.023955756428552622,-0.015095748668307553,-0.01879100845116887,0.0244694476588162,-0.008289217123881426,-0.02826151707566042,0.0038242455956194344,0.018247248184838406,-0.038525476331527954,-0.011202378733991224,0.025766357129924904,0.023968893264450966,0.00318079117418054,0.021532321130492825,-0.016878246720326968,0.01908373446276149,-0.02289328305380137,0.01924269956111988,0.022174212563178714,-0.01685290466093386,-0.017205678714552197,-0.0205186213575107,-0.0245907365120621,-0.015525273856049453,-0.012903067939016903,0.021342790924746127,0.034783770530111204,0.022492951855117797,-0.01998529840664024,0.026944662709543016,0.015663025456613727,0.04166878301549272,0.016347098238063393,0.008991819147811934,-0.015631054651862507,-0.011724170521468315,-0.02132808541842858,0.02097022260111554,0.030403285895677666,0.01189288045520745,-0.04698201188517625,-0.012871792032155898,-0.010272379061221524,-0.021975645981121138,-0.0445621011488919,-0.010799206288269657,-0.01099859196021072,-0.012244806820255463,-0.01227648424921282,-0.025663984984434503,0.013331576076685536,-0.013654862886699143,0.008849020741551956,-0.01628800781984914,-0.022923677402919222,-0.013323258423187092,0.007766498974380998,0.026137885044557628,0.016001303283573996,0.028543120740768084,0.023758487818247426,-0.022840976638421946,-0.00717467739313894,-0.003805490306677099,0.013297842003968562,-0.023868771433370115,0.009133430068659926,-0.014522631561505881,0.011270979744613321,-0.017300979903198805,0.015090759075764832,0.0038774969545156556,-0.02422025317066661,0.03642542800629927,-0.007791963452797806,0.016745517944835732,0.009494686210259168,-0.013680959363042929,-0.01712996592819452,-0.012739138620061208,0.011397364636849542,0.02034810639225546,0.018921312361400953,0.011055576276432149,-0.007777305347448739,0.01554918506181987,-0.04036264824403785,-0.0173301690823125,0.03668698965978678,0.0265067679078462,0.019758881593170345,-0.010986436943784327,0.018712424143700716,0.06550634696278633,0.014798720466076616,-0.052205517872564264,0.12276833121512497,-0.04677724478802587,0.026267196853682895,-0.03877563527263456,0.013147447358852763,0.01790379600419038,-0.014149837915512524,0.015525466234802618,0.0049271297741552535,0.036574532856784636,-0.016148768606755372,-0.01477778728255642,0.0024166670419468192,0.026713075774409414,-0.006653282152589026,-0.012320487603232943,-0.010488186623686334,0.010452068952205244,0.03383204867087181,-0.011288811282663793,0.030774866609888107,0.0009129633530070096,-0.00862855201129398,-0.012928638406827031,-0.007007638959029735,-0.018815043048870345,-0.01486720824648956,0.03578164891246173,-0.009926184644301245,0.022498859262614652,-0.028331819403339748,-0.03200643571809176,-0.05229460301864983,-0.027700374313441002,-0.010573301362028836,-0.024272768101261746,-0.04962254369830111,-0.020134215643439743,-0.018467433137673385,0.03855887160519747,-0.017412648743999892,0.0167567765576986,-0.020889815579086427,0.027295977683653556,0.01037990875200631,-0.005365959775179202,-0.014609021831981496,-0.014376624961010265,-0.031079551683803372,-0.005197717880814955,-0.076805632977413,-0.010271108117813774,-0.013898691892021937,-0.02280698449208231,-0.028615613867715474,-0.036472553867327874,-0.017075124142146583,-0.018493897763047246,-0.014307932394148098,0.022243077790092224,0.010717202062142548,0.01075935619652085,-0.01751638529245133,-0.017834784742725873,0.029824417776483897,-0.005788113663117194,0.011177938836072057,0.011760445663564916,0.013905147456566562,0.008689195422872624,-0.005937850038208756,0.012065348173342903,-0.01941331509659349,-0.011796326212917846,-0.010772307945688507,0.015986694206525157,-0.024785563401870783,0.02841300356245251,-0.009434944980306226,-0.012359807157061063,-0.044714327789167306,0.008166563708756012,-0.013199903308435571,0.01510095752578459,-0.021301173698069015,0.02016061629891982,-0.026032509644279896,-0.019277365292047394,0.012191976764931216,0.010222277449994266,0.018373519124821314,-0.004235033611417186,0.012142832467916972,-0.010090098851676207,-0.024753158585925902,0.01459022718598107,0.015311513783988666,0.011825753362518888,-0.03465362584590051,0.010508408679610259,0.0030953579234268805,-0.010251451373305525,0.023912377218317467,0.02194587593352305,-0.009024995295564373,0.010888020814023276,0.06747936457864642,0.020166090575406168,-0.03229973083776137,-0.012687126634497252,0.010344438282015887,0.08656816116426597,-0.02074983102767363,-0.0357114898222863,-0.014433797391098478,0.044834535786834856,0.009695783156061693,-0.020449622163486364,-0.012599199514610797,-0.019310237508994677,-0.010886221348802076,-0.000857424859198655,0.008936678557090813,0.012744574159302104,-0.019914592987770166,0.038318313493464026,0.014952276504258968,-0.02878526571324671,-0.006680636704911118,-0.021719096155775358,0.03868067242310186,0.013160228949250698,0.014305996611762968,-0.025761604280445737,-0.033248901925352285,0.035996929351177966,-0.006839981975472669,0.03005255660593738,0.014188593245932732,0.02858665611592151,0.011108802599168272,-0.0065988288754101135,0.005962544322035612,-0.0018872322913700676,0.017848370043221994,0.0209209253009193,-0.026925525561468218,0.013248696094077982,-0.02279819020984165,-0.008616833084193006,-0.006819693697759461,0.014206340908943208,-0.038436514375311294,-0.0058495130717989945,0.00890784164656328,0.1228568588403713,0.015049841918113996,0.014492982191960053,0.016642875864891722,0.00918600530439229,-0.011538976023576009,-0.019437444443964613,0.01954240065543804,0.009325522040577862,-0.011853157691346835,0.028894814402038543,0.025952691186455632,-0.01313692796279853,0.015274025603940715,0.03738293614153161,0.0005970224951634568,-0.025104396034988315,0.002499877496526822,-0.013845233647342164,0.0007708499213510132,0.011423870576632411,-0.0063278067055815975,0.015145792210676133,-0.012003199473652481,0.015595517970881276,0.008677342394838998,-0.03122952141427429,0.01577544773136407,-0.009960062559252846,-0.00633550475373872,0.09580684470749083,-0.008328471236731088,-0.021856781778033976,0.016400992792605196,-0.012565031523905321,-0.014360746749139409,0.015385090266245726,-0.015668547077251797,-0.018814432815476026]}

},{}],55:[function(require,module,exports){
module.exports={"re":[0.5939753461302857,7.101713929397938,-5.338508614668402,-0.7568714075136462,-9.642363473215276,-9.983633344593708,6.594737439516869,-5.884573990522979,-0.33758901419222553,2.978695472665848,-8.89394742709792,1.9848441524506644,5.406126160049647,-5.482478384359664,-7.425571025847986,1.2317534167589361,7.258501421984388,1.3965140507352771,2.3629749143815246,-1.9220112131492773,-5.111906313678891,6.701263008624281,3.4018099825393513,-3.596177812792183,-5.420848590755134,8.965828163279674,3.378463323686173,-0.4626845211392272,3.0496352196231413,0.9233989764318729,-0.07710874970843307,-2.243434502925301,-8.650471834758973,5.3758811424745545,8.697013235379934,-1.0605762410163067,2.721253490004232,7.8892050790350545,5.329463779282225,4.355786819645928,9.695372207556822,6.254652538476805,-2.3916203542323755,4.578293799002505,-8.964681881553386,-4.109304387602517,-9.826662075918522,0.6187274063628898,-6.00860900924963,-8.42409312683374,0.8202863019413531,2.5339483004729946,5.291299785544737,-2.2954755439877372,-8.535106245097897,9.163110393566747,0.39999742089588786,-3.8509983989052765,-0.18246542968879176,2.7755606360048457,-9.680469667756984,-9.24341838081492,-1.1394950010380747,9.022591117981147,-4.702517298527638,-9.876467239208853,-2.236483084377041,7.51835044137421,3.545438132975466,9.463488406214932,8.04386153133461,5.14524434139236,9.567002564221557,1.0313729696885687,-0.6303638405824152,-4.958436107412547,4.833001580700579,-1.1224424357534666,6.742710850186114,-5.999765460894881,-0.6103253458221847,8.925957946188152,-9.468892403844912,-3.0435701261434644,3.723475578488319,2.5220039304895714,-3.786129308504349,-0.9273089616982855,-0.15822876450459766,4.199359880948821,-9.703795332359206,-2.4541917032628957,-1.1434001138540673,1.368619423197197,7.173190479908836,4.703772912345837,-0.6645526479180894,-8.31963961315354,9.68037833520438,-2.329723675500537,9.48632684833493,8.612162942465904,0.581625071325206,5.9297858938214265,8.531583362107988,2.6779806777103374,-0.5775599190053491,0.7925202721552935,3.050155889662509,3.0407784539884872,-4.118946691688525,9.032282921306557,1.8850467051543784,9.73028948130866,7.002049223235151,-1.3740742357336089,-3.702824493762469,-3.0614160174698934,1.768152817438299,1.4922440421665328,8.370301856592484,4.95038716237055,-1.278322482113424,7.403878073247249,9.662424265807932,4.71131487616776,-9.441540846521521,7.8657074996469944,4.688056122347067,1.0661803472433284,3.768497634227522,-4.773844563054794,-0.0446867395823034,-7.857381203192673,-0.13471372734530362,7.490835169255021,9.539940025435385,-7.960484265692944,5.0726782515442,-2.678237621625432,-7.903001872108781,0.5121373325008705,3.3286446455595797,3.24410779607463,-7.514940089349347,7.158691949851001,6.392272852663574,-9.898734244171695,8.42866842052263,-7.00842297665401,8.508474824329923,7.601432612013852,8.217149917988792,0.1948299442661714,-1.3082669382923395,8.154202795176943,7.602786476045505,-2.7410029389909596,5.067658581092967,3.2651159876003266,5.6902540723462955,2.1895135418649403,-5.5717874590094185,3.5323599823991145,-8.062630809131273,-5.765245435905744,-6.68800111298947,-5.206984989756744,-8.296558874550758,9.626453073668504,-6.969412578315364,7.53907563537507,2.790247566789578,-6.790681484446375,5.229531626518277,1.2063520220440935,1.499313621607893,-3.6114208398844294,-5.552745880258243,-8.231417491429646,3.660429224546604,-8.902726319756535,-2.243175375854447,4.587854718592768,6.799501065269695,-2.175399215499123,8.846798940219678,5.017132167877794,-9.73176377172081,6.446302902094271,1.13802718285271,8.753546435772023,-2.422473322538048,-1.5347344813161925,-9.008958773489644,7.505830581609224,2.7992955476599555,-1.695896574423795,-2.477457993627743,-2.898155726650957,2.491252021822019,4.802871396814679,-9.070117323270601,-8.004505730901892,-7.3732248277768875,0.5827424086050605,2.0958958205922293,8.715997126681497,4.6356274611239545,4.384676850378174,-9.631665932282019,8.376209070481554,-8.737308350723696,-1.2976190580264522,-0.39423398593509873,3.506796388613708,3.7215994093135194,-6.339451036485033,9.653785830666028,4.58975006588358,-0.7843619007142433,-4.294631711125163,-8.992890071924894,-0.39369954352449277,7.6288017001401265,-9.547973817397498,6.055711541431936,-9.319381475371515,5.86908464981795,-8.59944392948735,-2.7979302108934334,0.04740382811742805,0.061744389402340616,8.960716204988607,4.187756678452068,-8.84201187780803,1.9334786572208316,9.205335845268525,-8.905494122945544,-5.899281787297301,8.445567316191603,7.251398370990685,-0.613064423363344,-4.482071608781224,-1.7949409327657442,3.732463549466285,4.824330382778141,6.631704031669905,2.0511094172002977,-9.982958126338165,-3.4572825522342,-1.7140978769552362,-1.2117425567445075,-4.871109640094176,4.259201250695156,7.548347688874131,7.784631727895604,5.044977216860627,-4.653345484969109,7.5980258267548315,-9.265818178583768,7.174965182996871,8.4678320528031,0.5249793306392281,-4.826468668522801,-5.850354312366335,-0.7299568373535124,-5.459522662436109,5.756846548655329,-7.189178439588324,9.537619291904733,-9.870007650623558,9.53990389067203,-9.745824725326496,4.744359251810284,-3.462397059412803,-1.5463458770283012,-6.329950556926778,-6.123606826114143,1.3476368653914683,1.617502707939643,1.6493448356518314,1.9082739744116992,0.8655033171809414,-0.8080736317250938,2.120925264899469,-5.92260746690795,-3.717163442962139,-2.638859551368249,-8.393495439270886,2.3946487036728215,-0.6783403708683302,-4.506076658039548,-6.98401565636416,-4.24826582127853,-3.9762865020440152,-5.286736348215624,9.962148191185271,-6.607334352544716,-6.037884790964774,9.890865370364406,1.968885913655365,6.942951744201174,6.281566271486,-9.866828209510071,-5.286827444205264,4.694584834236508,-7.606347422838442,-6.335148554641377,1.3552245300600987,-5.839130515277482,-7.095345053966171,-0.3200862038800256,6.980043328732378,3.27882652541739,-0.22429642898339353,6.722871086524641,0.5756335011650862,3.374390389881082,2.8196380557697154,7.47411361246083,-6.903721435018655,4.58084345032821,5.352810232616378,3.151089572178897,0.8023898278671595,-0.44449031056157295,-0.47826958874782477,-6.514243606404153,7.57157698438375,1.605570075334871,-9.95418855010653,6.609299173142453,8.943735403028853,-7.643375472365914,7.255057425622418,-9.153134547082455,-4.424352240840639,-9.395717946528102,-1.3949068523428423,-6.948706361916388,-3.4400746600413035,-3.5238225725370187,-6.117272203848674,-0.715215385891895,-5.12051470589288,1.136940678900702,-9.568257725784083,3.963924164320156,-3.53608022538916,9.97514660666652,-9.619397222212832,6.870364802092727,3.2349313230221366,6.268499238661075,6.954664030733571,4.516747185807532,-4.543338331000322,7.076141439956572,-2.240316531313815,9.946234528294099,6.999377077449456,1.3492568985947493,-6.291853751706693,3.3443364053057536,-2.304675799855702,-2.071461546280289,-8.824851944363598,-1.9753296175989163,-9.414200104545799,-5.862264265128299,-6.08627923576857,-5.672949350096608,-7.853047629768706,-3.521606432770885,-3.92258628545179,4.2477026142843535,5.669947397152978,4.877833760532226,-5.314202500867946,-1.7880805085942306,-5.046509882087249,9.060497527792094,9.811276845130706,-1.1948521439169681,0.33229711076137036,-9.974219902942387,-0.7547295068544067,-3.4633428001850852,-9.021938812798478,6.977436553892215,9.47637673294382,-1.1901722989211194,1.1387814518326334,6.137581407306271,4.150104704237002,6.506211548368498,-6.1658118127945505,0.8234593524602509,0.24524663581769524,-8.293076905117061,-7.162310442929685,8.102458105037037,7.895750953872344,1.1044987396213344,5.265223391859157,2.7309065590226176,7.370594448895975,-8.437104872258377,-7.4204131868575285,-9.18383485986773,5.528108252374846,6.028090930527817,2.409230536360454,-7.455973560458098,9.819429726460328,5.750086409695072,2.806943820132677,1.3385769431072614,-2.363849098115254,2.1208948082170096,2.7189720769785417,-4.473913705735364,-1.5783698036270444,-9.922816695670015,-9.715188683579683,-5.010343250102913,0.7946094854762151,9.128046238957936,-4.496117825257686,7.693527751000527,2.7160717404085677,9.353296155211005,-4.615963720011265,-5.014102540634151,8.61829473100726,-8.091629803699298,7.7377160515173,0.2738623278777155,-3.6282735224176,-9.266956302969795,5.749446977738648,-3.202032453170429,8.571083382367824,-6.961609794525119,2.700836475242916,-9.21112245245392,-9.624614110327743,-8.321244154915695,4.791224487529252,-7.250198399768641,-5.7331548977284585,-1.5993291791678121,8.99503235865113,-3.676854856441425,1.2828905092555853,-2.8811218065800626,-0.9065472508897585,-7.209982491812359,-2.6978866715267547,-8.549140583136836,7.362694737266004,9.257692995713043,-9.3935849932235,9.700400896499982,2.2860546559897266,5.313525875053227,-1.4797298488344435,-4.578135563406489,-0.19593951410071497,-2.1584281858311094,7.72551090578084,4.038025549029435,-4.123548534768076,1.569269211926061,-5.798472371592442,-3.3768947072950395,7.634774990446175,-4.6340507598934355,-5.303134557624443,-3.9252258148084618,-1.818731719986273,-2.7696953893605425,-3.6193987874197253,0.5969428732641333,-9.95567114591629,-5.317041920373251,-1.258202546139744,-2.407136580148048,3.2448744707663657,9.920848525417554,3.8683303277573966,7.165768141116185,-6.3226397168518655,4.061910989321721,3.0059130675239345,8.710153436795622,-6.625119253664868,-4.572445629202,-0.031785073681081855],"qim":[1.87980755022119e-300,1.6154825355703544e-300,1.1294157825165264e-300,3.793275802127327e-300,2.0386609807776433e-300,1.908520762230104e-300,1.1517163676149807e-300,2.0508004890304786e-300,1.5221567925971978e-300,2.2177221629699238e-300,2.3516972417700743e-300,1.032541042363418e-300,1.8014075043580382e-300,1.890241258827222e-299,1.161523325391083e-300,1.7222991654690514e-300,8.889920154574095e-300,1.0143534622084257e-300,7.219533283400861e-300,1.9307699335552824e-300,1.913531354706275e-300,4.442359784174575e-300,1.8060719663604015e-300,1.5683008723992405e-300,2.489355608111423e-300,1.1453032440750986e-300,4.6951985484101055e-300,3.933746343611789e-300,1.2373852114435737e-300,1.2601274304656611e-300,1.145316384515885e-300,1.0025644164356777e-300,9.985495725403426e-300,1.9234447914891055e-300,3.195041368328154e-300,1.0570648917573898e-300,3.057274000705718e-300,2.2472224270541254e-300,2.5381542782848024e-299,1.0707313932648621e-300,2.8580079497131907e-300,2.2519470685360734e-300,1.3130638628709978e-300,2.5237640027163638e-300,4.056851165194372e-300,1.0196747957853468e-300,1.3247820406103095e-300,2.950801197787843e-300,2.8503506105767133e-300,4.497207725016647e-300,1.1502684055673364e-300,1.9124821767138377e-300,1.0538313190531452e-300,1.5589679420002232e-300,1.004717404732507e-300,2.528346673581427e-300,4.7715071059052335e-300,1.1968385205655819e-300,8.012074415945532e-300,3.9736158001085786e-300,2.8352321380248154e-300,4.671702116129455e-300,1.3586143931407045e-299,4.638857765376703e-300,4.7005950901808286e-300,1.2726076885882285e-299,2.1591734492601407e-300,6.652022342466262e-300,1.8374672097388397e-300,2.089014756463036e-300,2.2667335618032214e-300,1.061439477280369e-300,1.0437786518257874e-300,8.195295307758309e-300,2.78861863092552e-300,2.517209504163773e-300,6.795334112088447e-300,1.081365378121556e-300,1.7673227905096257e-300,1.2273465434445742e-300,1.8002128218361294e-300,1.4314067511256745e-300,1.5122499366480294e-299,1.1592203923959333e-300,3.3106002243317353e-300,2.9529370786237035e-300,4.145081499434389e-300,9.75752846171081e-300,2.2496218027721474e-300,2.9427998367619776e-300,3.0698367274658285e-300,2.241689066559436e-300,1.2454302268374488e-300,1.0376596511740962e-300,1.4361761796129634e-299,3.2155676099171424e-300,1.5383248915345e-300,2.260029021674344e-300,1.2431273312432048e-300,1.6823042323160504e-299,1.960514910919151e-299,1.4120504417189138e-300,1.1881428138496352e-300,1.011402156356626e-300,7.091443979430297e-300,1.4440967195226499e-300,1.8134589412329098e-300,1.0161766990187338e-300,1.9137758155371976e-300,3.225898260636956e-300,1.097687105455639e-300,2.828133754334985e-300,4.0295577572186566e-300,7.897778556899952e-300,2.752091530492303e-300,1.1078115283622868e-300,1.3988531857093857e-300,2.52678305120851e-300,1.3990445352211726e-300,1.0580570771725235e-300,6.787508150665656e-300,2.472279185060046e-300,5.331046545913542e-300,1.5311434376403787e-300,3.9114474957438944e-300,1.6841198457402362e-300,1.8259565829456463e-300,1.2138421814861584e-300,1.2661656582597437e-300,3.15034911406485e-300,2.4364752302617815e-300,4.120810323578068e-300,5.917120671087847e-300,1.6844499707829356e-300,1.1608763553464796e-300,1.7949940054196278e-300,2.5911876713580853e-300,1.3133846111146592e-300,1.7932167705622415e-300,2.957184383755017e-300,1.7988339374709973e-300,3.998556898361881e-300,2.5975047649297995e-300,1.1638359764812082e-300,1.94231333108416e-300,1.0272161440995555e-300,3.406080222429832e-300,4.219519104935049e-300,3.9718012205580927e-300,2.8754520527398402e-300,1.2942223267550144e-300,9.537162458106984e-300,1.3193497365415674e-300,2.4309298251934878e-300,2.056849935571979e-300,1.2392719390898696e-300,1.2228363186222162e-300,1.2345968237961036e-300,1.1611961010743619e-299,2.130861444107554e-300,1.6840585971311404e-300,1.3116847336456909e-300,2.1198097568179015e-300,1.2896482345610114e-300,2.0368316651363634e-300,1.4876086191011449e-300,1.1599120327397144e-300,4.157804040935908e-300,1.5358977594019974e-300,1.3332560583705946e-299,3.8992609872741174e-300,1.570531556843257e-300,1.1074243518411612e-300,1.1346369252057009e-299,1.2296760008710873e-300,2.9458380617015238e-300,4.006791840927427e-300,3.0947584031887075e-300,7.351916244462126e-300,1.7808037133887613e-300,1.4600526117233197e-300,2.1959231504385056e-300,1.4017535083806626e-300,1.008943009398218e-300,2.275281555876804e-300,8.328475273551418e-300,1.4927695989343156e-300,2.851446984006873e-300,2.866936056672348e-300,2.8428085190242678e-300,1.2182894148979284e-300,1.1100600240259228e-300,1.1446420807584039e-300,9.183218298747274e-300,1.139907780546461e-300,8.60676048521704e-300,4.2638234369674786e-300,1.283100419268815e-300,6.010109187113814e-300,6.660218920984956e-300,1.4262264431620795e-300,1.264576609622584e-300,1.4479240839584052e-300,1.6506608772903427e-300,8.721868261999471e-300,1.4730541281260825e-300,1.2593866102081067e-300,1.5245796038726332e-300,1.0419132186805712e-300,2.9020256156834818e-300,1.04167817138546e-300,1.738970959100013e-300,2.3453542450078629e-299,2.27766788322547e-300,7.413096455523443e-300,1.032188534102019e-300,1.0287969236911069e-300,1.2257843211122933e-299,1.959260382534452e-300,7.533819018065476e-300,1.2779221491898487e-299,1.066991715663326e-300,5.40316330425732e-300,1.955494833894749e-300,1.2188211898898988e-300,1.1109336414428635e-300,1.247815104082959e-300,1.2048522660443594e-300,3.307585550836264e-300,3.55890199232037e-299,1.2201172303391302e-300,1.6348882016966276e-300,2.128916668513232e-300,6.730344742285464e-300,1.2265887121419953e-299,2.244467112083899e-300,1.3102116580471981e-300,1.3311879158510586e-298,1.41334718086493e-300,2.317220345693925e-300,1.346339371887281e-299,1.532298099390912e-300,2.499913839548296e-300,4.67666444217635e-300,3.059719284941329e-300,4.6348737148784493e-299,2.5878422488948016e-299,3.16288921166823e-300,1.0511540542851792e-300,1.8104288605529662e-300,1.6877860183546135e-300,1.3376356657041211e-300,1.1392691799095229e-300,1.61213187851425e-300,1.5925166932861942e-300,1.4856619708423397e-300,2.2576082786223328e-300,1.7541736291264765e-300,1.5402804915846577e-300,1.6325127910064834e-300,5.013022543469913e-300,5.6565923842559525e-300,3.4917690462068154e-300,1.2872789644069592e-300,8.865787969061886e-300,1.2851529568679015e-300,2.1923630656693057e-300,3.1987495061287054e-300,1.964815127796013e-300,5.418036210251609e-300,4.4930939949896496e-300,1.4232923101339136e-300,2.5619228850331377e-298,6.105300978813848e-300,1.0800695179357709e-300,2.040220021338814e-300,1.0247715354519986e-300,2.8812769012635956e-300,1.4763395856973483e-300,3.0645211214371316e-300,1.2227881723694329e-300,1.843062700023234e-300,6.529428725126882e-300,1.3108450832684471e-300,6.068890812245884e-300,1.3449347428505733e-300,9.828955502569409e-300,2.317733058249134e-300,1.6342989007888046e-299,1.4187545112510567e-300,5.9694411269273044e-300,1.638531535569429e-300,1.5084124281699182e-300,4.48011199082243e-300,2.8414850197365726e-300,1.0283481110530088e-300,1.0282877893749059e-300,1.4943187977382443e-300,2.5257994783367763e-299,1.1770772663209145e-300,3.56706617045859e-300,4.76586049123197e-300,3.1196777112945016e-300,1.425008974601472e-299,4.130894787877496e-300,1.328506443907488e-300,1.2368224647700547e-300,1.6317498316423774e-300,1.010397049785079e-300,1.6959747634389793e-300,1.4303161301463615e-300,1.1026639073406967e-300,1.070790967743024e-300,1.4675978722555397e-300,2.0286006574346682e-299,1.9333314287074636e-300,1.2022552170300596e-300,1.5833790141354595e-299,2.613012517965867e-300,1.3100861325481024e-300,3.9226697379457525e-300,2.806724631435484e-300,1.708913544390262e-300,2.1629603235389305e-300,5.1164596971827367e-300,5.9380405277670625e-300,1.7763929672561484e-300,1.678971450245835e-300,1.7073071509043265e-300,3.925910489607496e-300,1.6425740552677327e-299,1.3764197456569676e-300,3.508376519068896e-300,4.000690712992809e-300,1.6643260281991942e-300,1.3809150835586478e-299,1.0723454020456072e-300,1.3809715588797585e-300,3.0728071090445166e-300,1.0979186060320053e-300,4.6370550716635136e-300,2.142412330565939e-300,5.240906190433127e-300,2.2206549952510014e-300,1.1408779708610443e-300,1.112600647855595e-300,1.1457883408144616e-300,8.088135504368727e-300,1.1814156253235623e-300,1.4214567969810608e-300,1.9480643407126566e-300,4.2079129058205823e-300,2.3835191606582073e-300,4.7139072189996566e-300,2.1084773202385792e-300,4.002127728601906e-300,1.0087333934575473e-300,1.4704216899351329e-300,3.480854550650042e-300,1.4960951384101164e-300,1.1440546233986677e-300,1.097738974519035e-300,7.467720696528679e-300,1.2319385758874045e-300,5.943140354963539e-300,1.1790743189157064e-300,1.7290638000980098e-300,1.3606284120632905e-300,4.647319198859147e-300,4.795387221092554e-300,2.8886849447067648e-300,1.8283560243157098e-300,2.2936681073061148e-300,3.290887224511058e-300,3.5835225766308794e-300,1.4477572448341861e-300,1.2140903478946976e-300,2.3685172775443015e-300,3.5634461887238694e-300,1.959363349723015e-300,5.5404583450131166e-300,1.8667691104371534e-299,9.329400124928411e-300,2.95417604017152e-300,2.553929395189212e-300,2.120028833636489e-300,4.0033655467803106e-300,1.5548191582282303e-300,1.7206031688174912e-300,1.6603854551775294e-300,2.689920083477947e-300,2.703443440472108e-300,1.598441810523888e-300,1.7397938680528792e-300,1.9892379492466323e-300,1.4321619190137902e-300,2.041285953431335e-299,2.9050699206715655e-300,1.1063655721025645e-300,2.0235126057432284e-300,4.843862912433473e-300,1.1963383213120364e-300,1.4154577611642736e-300,1.3417892140066885e-300,5.956512924856295e-300,1.0662150292540865e-300,1.3936183096081925e-300,1.555224682302777e-300,1.0062895535518622e-300,1.2092514029179093e-300,1.1518358358163396e-300,4.990147494400686e-300,1.4819771608679414e-300,2.6796968553785827e-300,1.3179340213087749e-300,2.989691943465972e-300,1.9507885510716447e-300,1.2923891150196852e-300,1.9696725058704345e-300,1.619914544170486e-300,1.0466169692068509e-299,2.8971238017640036e-300,1.3134671711158734e-299,1.2148573549264115e-300,2.6273581259206782e-300,1.514064095473971e-300,1.1997283335460073e-300,1.3415268822854022e-300,2.7147013031607632e-300,1.1164600412019573e-300,1.5420965904460144e-299,2.0242735338808975e-300,1.5529810764979462e-300,1.2408828577313814e-300,1.7036414074901596e-300,4.100961002995329e-300,1.5019613334602085e-300,3.038014131767973e-300,1.2586821061562972e-300,4.737564168211804e-300,2.580045083390171e-300,8.864509767161583e-300,3.6321075147952076e-300,6.92918578398457e-300,1.296398389268118e-300,4.6094019878179016e-300,1.2910533054945875e-299,1.5880922311783677e-300,5.8087778072056305e-300,5.4462982763918336e-300,1.2960673125799513e-299,3.0148472162240915e-300,1.629816515117004e-300,2.969759003147229e-300,1.522763386984355e-299,3.8811880715646465e-300,5.432883692821842e-300,5.5925173469028325e-300,1.7251140048423232e-300,1.331981440642711e-300,3.823755192619708e-300,1.6456165153098354e-300,9.759282880759255e-300,1.3302942922001032e-300,1.9161412514881554e-300,1.0598328509771843e-300,3.710127732202245e-300,4.181631739498535e-300,2.9723929380917836e-300,1.2689152863458392e-300,2.2197226311463308e-300,3.1708855698585353e-300,5.5550821119564005e-300,1.7025260889891706e-300,4.961963120426548e-300,1.3874852821377327e-300,4.1687149438851625e-299,1.0061170795692067e-300,1.0128924466168248e-300,1.3950226064154842e-300,1.8862875752759087e-300,1.0881685004604802e-300,1.1223987434072959e-300,1.2008759587863124e-300,9.589143607405045e-300,1.8292526986002074e-300,2.159358548719179e-300,1.7214661943776667e-300,2.2562353330223226e-300,2.3249272296325475e-300,1.1729858971358594e-300,1.1477596916343272e-300,3.608961790044926e-300,2.0196929536981575e-300,1.2691954870604984e-300,1.3687261330459345e-300,1.7072172808227193e-300,4.501318221882221e-300,3.666561453916071e-300,2.5033521464233102e-300],"im":[-5.3196934967216916e299,-6.1901009635300386e299,-8.854135168642973e299,-2.6362438487578067e299,-4.9051804563334116e299,-5.2396600539545674e299,-8.682693309906145e299,-4.876144731527506e299,-6.569625447676375e299,-4.509131110728597e299,-4.2522480455320876e299,-9.684845047041098e299,-5.551214800542128e299,-5.290329979467479e298,-8.609383713093335e299,-5.8061922112565134e299,-1.1248694955774985e299,-9.858496443861139e299,-1.3851310891511482e299,-5.179280983305035e299,-5.2259399750128416e299,-2.251055854508659e299,-5.536877924168222e299,-6.376327512144819e299,-4.017103851059114e299,-8.731312036119834e299,-2.129835383295178e299,-2.5421059535878587e299,-8.081557713408968e299,-7.935705356643693e299,-8.731211860054644e299,-9.974421429749175e299,-1.0014525342552273e299,-5.199005474057892e299,-3.129849929058235e299,-9.460157155891174e299,-3.270887724715441e299,-4.4499377896957705e299,-3.9398708287967655e298,-9.33941048418139e299,-3.498940582374352e299,-4.4406017085031734e299,-7.615775807076988e299,-3.962335618241981e299,-2.4649659533469428e299,-9.807048326910999e299,-7.548411507294538e299,-3.388910106006735e299,-3.5083403293943176e299,-2.2236019795956797e299,-8.693623115787302e299,-5.228806899096288e299,-9.489184672348588e299,-6.4145000872625825e299,-9.953047446871262e299,-3.955153818299333e299,-2.0957738882174073e299,-8.355346045575444e299,-1.2481162157078973e299,-2.5165996168343076e299,-3.527048055742826e299,-2.140547438903293e299,-7.360440203259611e298,-2.1557030859272188e299,-2.1273902151004687e299,-7.857881175536141e298,-4.6314018928986854e299,-1.503302226777017e299,-5.4422739883457876e299,-4.786945601538619e299,-4.41163450725318e299,-9.421168341714689e299,-9.580575328406945e299,-1.2202122833247042e299,-3.5860048732017114e299,-3.972653044356767e299,-1.4715979869497022e299,-9.247568122969721e299,-5.658275926559176e299,-8.147658094945856e299,-5.55489877569058e299,-6.986134438821032e299,-6.612663527145158e298,-8.626487306120894e299,-3.020600290697606e299,-3.386458882713739e299,-2.4124978004327625e299,-1.0248496880373615e299,-4.445191626289038e299,-3.3981244239170555e299,-3.2575022347377636e299,-4.4609219669113554e299,-8.02935386062794e299,-9.63707125808077e299,-6.962934034106394e298,-3.109870857374906e299,-6.5005773845503236e299,-4.424721941221575e299,-8.044228252949259e299,-5.944228046215439e298,-5.100700812987791e298,-7.081899983563494e299,-8.416496639490297e299,-9.887263871399088e299,-1.4101500384133848e299,-6.924743934953005e299,-5.5143239103066405e299,-9.840808207525771e299,-5.225272426798327e299,-3.099911774038866e299,-9.110064197983905e299,-3.5359006569869345e299,-2.4816619099417883e299,-1.2661788283824983e299,-3.633600078050881e299,-9.02680622468636e299,-7.148713033047e299,-3.957601344214019e299,-7.147735292371602e299,-9.451285961550666e299,-1.4732947317373448e299,-4.044850622223364e299,-1.875804293561345e299,-6.5310667532304126e299,-2.556598295357704e299,-5.937819701664171e299,-5.476581477018434e299,-8.238303259289091e299,-7.897860706271485e299,-3.1742513727620314e299,-4.1042896212515866e299,-2.426707180086143e299,-1.6900111652043637e299,-5.9366559847140966e299,-8.614181823881978e299,-5.571049245739532e299,-3.859234169155656e299,-7.613915920267316e299,-5.576570643416759e299,-3.381595024961566e299,-5.5591568469400365e299,-2.5009022640385027e299,-3.849848568139301e299,-8.592276061300691e299,-5.148499904708064e299,-9.735049490256865e299,-2.935926151752877e299,-2.3699383155545473e299,-2.517749364756694e299,-3.477714048638585e299,-7.726647727576189e299,-1.0485299001590966e299,-7.57949141386359e299,-4.1136522726253766e299,-4.861803395112123e299,-8.069253958371778e299,-8.177709353012279e299,-8.099810243519241e299,-8.611809831903327e298,-4.6929376978746706e299,-5.938035658043841e299,-7.623783172505212e299,-4.71740445945076e299,-7.754052409030701e299,-4.909585888301924e299,-6.722198212351231e299,-8.621343444795535e299,-2.4051157537835845e299,-6.5108500476577974e299,-7.500434696858794e298,-2.564588529117864e299,-6.3672709767767024e299,-9.029962167054016e299,-8.813392000429633e298,-8.132223441716455e299,-3.39461972808647e299,-2.4957622948751345e299,-3.2312700046945265e299,-1.3601895978524726e299,-5.6154420191378686e299,-6.849068259394342e299,-4.553893426554154e299,-7.133921863018718e299,-9.911362591197772e299,-4.395060459296165e299,-1.2006999686673515e299,-6.698957432639956e299,-3.5069913823009016e299,-3.488044310136096e299,-3.517648105062061e299,-8.208230226508064e299,-9.008521866891834e299,-8.736355379643491e299,-1.0889428601914154e299,-8.772639480718427e299,-1.1618773424886153e299,-2.3453128741916696e299,-7.793622268238818e299,-1.6638632824576383e299,-1.5014521472397992e299,-7.011509320938581e299,-7.90778504355266e299,-6.906439440292694e299,-6.0581795676987205e299,-1.1465433436514117e299,-6.788616798977583e299,-7.940373447632221e299,-6.559185217091113e299,-9.597728314324987e299,-3.4458689633739885e299,-9.599893973682612e299,-5.75052731482957e299,-4.263748225363062e298,-4.390455726073073e299,-1.3489639666767151e299,-9.688152570595814e299,-9.720091273331284e299,-8.158042020741352e298,-5.103966828066131e299,-1.3273480522986847e299,-7.825202815632859e298,-9.372143994373202e299,-1.8507676775419113e299,-5.113795151318836e299,-8.204648953390235e299,-9.001437733951556e299,-8.014007818369191e299,-8.299772745442824e299,-3.023353393677657e299,-2.8098554052847337e298,-8.195933760578491e299,-6.116626194758983e299,-4.697224718985212e299,-1.4858079909595002e299,-8.152692015677344e298,-4.455400547489152e299,-7.63235461887469e299,-7.512087422763881e297,-7.075402374864662e299,-4.315515362439715e299,-7.427547770501675e298,-6.526145274196318e299,-4.000137861474009e299,-2.1382761418192243e299,-3.2682736776592083e299,-2.1575560878603685e298,-3.864223178314186e298,-3.16166622691334e299,-9.513353403560187e299,-5.5235531303592136e299,-5.924921696974825e299,-7.475877218581846e299,-8.77755685517111e299,-6.2029664776656215e299,-6.279369027752402e299,-6.731006242510337e299,-4.429466393568653e299,-5.700689962475201e299,-6.492323998541259e299,-6.125526277705156e299,-1.9948045142997108e299,-1.7678487896411088e299,-2.8638778417671176e299,-7.768323942593852e299,-1.1279313282582516e299,-7.78117495396922e299,-4.56128829963987e299,-3.1262216628217713e299,-5.089537360808736e299,-1.8456871847919245e299,-2.225637836900636e299,-7.025963625883097e299,-3.9033181125085475e297,-1.6379208878810792e299,-9.258663293370229e299,-4.901432147223952e299,-9.758272604233953e299,-3.47068343053542e299,-6.773509358469518e299,-3.2631525787332217e299,-8.178031343419607e299,-5.4257513864688045e299,-1.5315275533244566e299,-7.628666520277214e299,-1.6477475554218036e299,-7.435304986474748e299,-1.0174021031416692e299,-4.3145607145778114e299,-6.118831748080744e298,-7.048435737611863e299,-1.6751986973942024e299,-6.1030256561554435e299,-6.62948661337437e299,-2.2320870595389432e299,-3.5192865457819926e299,-9.72433351363887e299,-9.724903964948355e299,-6.692012450847636e299,-3.9591424757855047e298,-8.495619010004422e299,-2.8034243050541385e299,-2.098256971306143e299,-3.2054593215818208e299,-7.01749966367522e298,-2.4207830297072566e299,-7.527249902219037e299,-8.08523477284928e299,-6.128390397892592e299,-9.897099365172429e299,-5.896314152530606e299,-6.991461390410747e299,-9.068946515277787e299,-9.338890877159388e299,-6.813855613343918e299,-4.929506437529119e298,-5.172418888718702e299,-8.317701481639712e299,-6.315607261891177e298,-3.827000418576115e299,-7.633085910580639e299,-2.5492842038842812e299,-3.562871785852948e299,-5.85167109993735e299,-4.62329331295291e299,-1.954476452830514e299,-1.6840572160527835e299,-5.629385042796132e299,-5.956027422941468e299,-5.857176896789309e299,-2.547179826557833e299,-6.08800557145659e298,-7.265225619984826e299,-2.850321208583948e299,-2.499568378911068e299,-6.008438148876414e299,-7.241574894112812e298,-9.325353548328728e299,-7.241278747342184e299,-3.25435331445503e299,-9.108143304120753e299,-2.156541133425134e299,-4.6676355701138085e299,-1.908066970985711e299,-4.503175874408936e299,-8.765179322774365e299,-8.987950905182203e299,-8.727615427550688e299,-1.2363788903633721e299,-8.464421652846543e299,-7.035036183469203e299,-5.133300677503146e299,-2.3764750420968864e299,-4.1954770765251605e299,-2.1213824403871297e299,-4.7427591010883986e299,-2.4986708766272625e299,-9.913422183560191e299,-6.800770192964949e299,-2.8728577579124994e299,-6.684066904078632e299,-8.74084138595829e299,-9.10963374000765e299,-1.3390966810861626e299,-8.11728782240355e299,-1.6826121213254353e299,-8.481229587967061e299,-5.78347658393702e299,-7.349545189076093e299,-2.1517781697574944e299,-2.0853373333471195e299,-3.461782849778765e299,-5.469394290284713e299,-4.359828681467293e299,-3.0386942237091533e299,-2.7905502996444633e299,-6.907235336366986e299,-8.236619307072637e299,-4.222050687495125e299,-2.8062722068440073e299,-5.1036986077205374e299,-1.8049048250675595e299,-5.356848870109188e298,-1.071880278055577e299,-3.385038624651291e299,-3.9155350256889675e299,-4.716916978363442e299,-2.497898301603374e299,-6.431616144603816e299,-5.811915368534768e299,-6.022697903560468e299,-3.7175825636687486e299,-3.6989862078467155e299,-6.256092611042568e299,-5.747807360185535e299,-5.027050687318336e299,-6.982450704237522e299,-4.898872685225863e298,-3.442257939763563e299,-9.03860374197631e299,-4.941901509097364e299,-2.06446800431356e299,-8.358839487004728e299,-7.064852286213457e299,-7.452735418955419e299,-1.6788346010751344e299,-9.378971150871792e299,-7.17556588562003e299,-6.429939103842722e299,-9.937497576819095e299,-8.269578993971079e299,-8.681792742550599e299,-2.003948783321683e299,-6.74774231617939e299,-3.731765397242002e299,-7.587633248946329e299,-3.3448262192548597e299,-5.126132196391356e299,-7.737607724936374e299,-5.076986133581032e299,-6.1731651437951165e299,-9.55459379526229e298,-3.451699231462318e299,-7.613437335859996e298,-8.231419071093937e299,-3.8061046575048854e299,-6.6047402021441795e299,-8.335220333125957e299,-7.454192779919678e299,-3.683646516969239e299,-8.956881241566166e299,-6.484678107684383e298,-4.9400438392474545e299,-6.439228495012009e299,-8.058778423518796e299,-5.8697798468823374e299,-2.4384528389067908e299,-6.6579610121933476e299,-3.29162392479738e299,-7.944817798782823e299,-2.1107893518568434e299,-3.875901264043042e299,-1.1280939682693814e299,-2.7532224636152705e299,-1.4431710033108081e299,-7.713678204772765e299,-2.1694788231594477e299,-7.745613567961174e298,-6.296863496763019e299,-1.721532537807742e299,-1.836109499060523e299,-7.715648641808582e298,-3.316917668724977e299,-6.135660000525951e299,-3.3672766003579445e299,-6.567008430511168e298,-2.5765306436100223e299,-1.840643121665282e299,-1.7881035282864266e299,-5.79671834552987e299,-7.50761211445617e299,-2.6152301850550377e299,-6.076749903131112e299,-1.0246654515687138e299,-7.5171336587948e299,-5.21882193822276e299,-9.435450119120036e299,-2.6953249919684663e299,-2.391410966571439e299,-3.364292746039088e299,-7.880746735109099e299,-4.505067371789466e299,-3.1536931181172e299,-1.800153408799601e299,-5.873625117802002e299,-2.0153313834263976e299,-7.207283658240147e299,-2.3988207720147426e298,-9.939201115919572e299,-9.872716529184446e299,-7.168342616106442e299,-5.30141858064102e299,-9.189753237452012e299,-8.90948966108313e299,-8.32725472338266e299,-1.0428459943260916e299,-5.46671326911381e299,-4.63100489074938e299,-5.809001671168533e299,-4.432161775697652e299,-4.301209892741671e299,-8.525251688377089e299,-8.712625188780345e299,-2.7708799875865454e299,-4.951247654594975e299,-7.87900690000116e299,-7.306063469210023e299,-5.857485226005288e299,-2.2215714390924603e299,-2.727350986936139e299,-3.9946437476995e299],"qre":[0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0]}

},{}],56:[function(require,module,exports){
module.exports={"re":[-7.890035118437545e299,-6.588499380274202e299,-8.337000137170032e299,-3.462945196212952e299,-8.9018716195024e297,-3.208740821406704e299,-4.1352024182471636e298,-5.089144535321726e299,-2.994329584371709e299,-3.957211942652155e299,-3.0857895954655715e298,-5.4493706869903826e299,-8.649566285792007e299,-9.84356476163019e299,-4.343230116823744e299,-6.784293923464312e299,-1.7641816573848293e299,-5.2568525952654044e299,-2.7151164695012864e299,-7.634417372142344e298,-3.408816327789175e299,-6.810906734866822e299,-7.993946604270137e299,-3.900713498749049e299,-7.818115743513088e299,-2.6327782946121194e299,-2.9659504411308735e299,-3.813272466051303e299,-5.3189084646033e299,-1.0784439872366148e299,-5.597277157037879e299,-5.912161629254651e299,-5.221305756139245e299,-2.7665138570607198e299,-1.2116435364432322e299,-4.876951147437723e299,-6.363491685574507e298,-9.388456701424084e299,-1.825260734020191e299,-8.107207490365236e299,-3.994452376854767e299,-8.89422762466724e299,-6.442867668970442e299,-3.4913753323976664e299,-5.8786745024341624e299,-5.2151377197905705e299,-7.575801043593513e299,-6.042452985301463e299,-6.391585049971074e299,-1.2769595158991788e299,-6.164975957122354e298,-8.58458353435144e299,-6.152403745994117e299,-1.9515191477009888e299,-8.426833628133761e299,-8.42176217472438e299,-1.3217833644051824e298,-3.4210557162473325e299,-2.3989146502532633e299,-6.585635711259306e299,-2.601786078227948e299,-8.894883570391207e299,-3.3472072200976702e299,-6.730679871741287e299,-3.4534679037017615e299,-1.6822417563565818e299,-3.6126605676382596e299,-7.784496084900494e299,-5.0045414731747996e299,-7.298538552494467e299,-1.4116814664285827e298,-4.080596316967431e299,-4.480165813264037e299,-3.1195449944865674e298,-2.0663912573536237e299,-7.002733974697216e299,-4.170869229492371e299,-1.5456607395900713e299,-6.1441400297590935e299,-7.794121259065671e299,-4.3706332133535144e297,-7.954193454325963e299,-7.653357012347235e299,-2.7284077172210707e298,-8.3471875181343695e298,-5.315029896522461e298,-2.0030660092817045e299,-1.5200230552877316e299,-1.9843985352483663e298,-1.81523681516953e299,-7.932337457813547e299,-7.788081745081594e299,-9.400892337883994e299,-7.024719464338887e299,-7.703991198017372e299,-1.8236184344962126e299,-7.7351475298118e299,-3.268926686352971e299,-7.923106412907436e299,-3.808920769030195e299,-1.6421011977159929e299,-9.145906633787005e298,-8.751747136679134e299,-8.748825396797584e299,-2.813819195053857e299,-6.661320961229549e299,-4.626938945847734e299,-3.343632021960834e299,-8.287974697473344e299,-4.235843280786334e299,-5.9459379442802466e299,-3.75712098847548e299,-9.176931926521643e299,-9.77661126658813e299,-3.5918686495211686e298,-5.148018109960042e299,-1.962442231626671e298,-6.463614653118704e299,-4.7082564843516944e299,-7.988970375507101e299,-1.0116375124020216e299,-3.0469457963385963e299,-1.2804722832148509e299,-3.147936738828288e299,-6.819991316664482e299,-2.236911537416375e299,-7.686193644177527e299,-3.0666159894400137e299,-5.509228420745079e299,-6.723159417565279e299,-2.108659716392154e299,-1.886571869179221e298,-8.28471663363537e298,-6.485487504273427e299,-5.684041914806697e299,-6.340410563072396e299,-4.424536265113575e299,-6.179891756134566e299,-2.4505748266777073e299,-3.22776465155586e299,-5.6070362744884974e299,-5.630292862766222e299,-5.646881105299302e299,-7.37498338454602e299,-6.737118600571323e299,-1.906880514637477e298,-8.90045240352717e298,-6.228450644111657e299,-4.889884692384515e299,-9.262981014703253e299,-7.16120519985536e299,-9.319573598241826e298,-8.714214585614707e299,-2.1367905385857044e299,-6.814738016905347e299,-5.634811145622421e299,-7.257927356339567e297,-6.251532239908955e299,-8.457846210337044e299,-9.7282991517195e299,-5.051300094372571e299,-4.249331211527252e299,-8.116693557063781e299,-3.4507631064609745e298,-8.819737673302786e299,-2.409537262825299e299,-7.060530936653465e298,-7.306766494265464e299,-5.015635112776331e299,-7.9474012623448115e298,-8.03648963371735e299,-5.6602656323041624e299,-2.8013662145110543e299,-4.7564153128773295e299,-5.8830035108611445e299,-2.0488046534567086e299,-1.766682318711377e299,-8.638992153701881e299,-2.224696378877815e299,-8.111673379720754e299,-2.6837122271660133e298,-8.398156822746103e299,-3.23661265396918e299,-5.959898714018208e299,-5.5145166530532585e299,-7.572338861464393e299,-8.730276229086367e299,-6.051426404980107e299,-8.337949748671953e299,-2.9435512279168208e299,-8.692947748151587e299,-6.627344608455393e299,-9.6538060524119e299,-7.532365769850218e299,-2.590232132697694e299,-1.318666179022563e299,-4.2474453843206255e298,-6.885536417152283e297,-2.0076269971242413e299,-5.198423498879803e299,-4.705584771326566e299,-5.480403869856297e299,-3.110340692974474e299,-8.731301940092152e298,-3.819636676989464e299,-5.37471794484778e299,-9.988638954587317e299,-2.3120602846756877e299,-1.1504465662652753e299,-1.0174175043176792e299,-7.457742940544944e299,-1.116190328931568e299,-3.125695082205391e299,-4.925607002622679e298,-3.466298118655915e299,-4.345638298058416e299,-4.816178095330553e299,-2.270322079185294e299,-5.825023254179929e299,-5.4651244129843636e299,-1.9364210192522546e299,-2.335923139991658e299,-1.644446744750292e299,-1.0969141034357777e299,-6.513038576848076e299,-3.074208922669097e299,-2.334064153318618e299,-7.215018592494523e299,-8.426375624956632e299,-3.218215542534808e298,-9.958514155657308e299,-6.281430025871648e299,-4.070071634657642e299,-9.291193556034592e299,-9.992237166905531e299,-9.391512586340046e299,-6.566737686920283e299,-2.5024294246595002e299,-5.774298431027432e299,-3.634722804669033e298,-4.824565466279418e299,-7.575201075185852e299,-4.255152194585059e299,-5.091305459670181e295,-6.030160196389951e299,-6.10094374171035e299,-8.519597554676942e299,-3.094153116333607e299,-4.705938326665939e299,-8.42125066088728e298,-7.98045101677788e299,-6.846613446991679e299,-8.310656707199537e299,-1.424141594256012e299,-5.216750438907541e299,-4.2227187366441065e299,-4.178500315535112e299,-8.13889770655628e299,-1.297119525162509e299,-5.895722409844555e299,-9.176198593916779e299,-1.8309658417883722e299,-5.8835977179454505e299,-4.0506469580403385e298,-4.817069548145965e299,-8.37260893599573e299,-9.951069437861941e299,-4.548556758847566e299,-8.22438448254462e299,-2.525888687966902e299,-3.744163411975501e299,-7.671654948848628e299,-7.042235032710043e298,-9.494537464837818e299,-9.956560223572553e299,-5.440754800805104e298,-5.718692787991975e297,-5.2695970900047455e299,-1.7029092150186533e299,-1.794091476813431e299,-7.576456678237182e299,-1.0239565342984891e299,-7.088147497857078e299,-2.104606785919392e299,-6.745249090413652e299,-6.911221564635697e299,-5.119590977821729e299,-2.1357382474225163e299,-3.678179872554848e299,-4.222308457347772e299,-1.4952239408386704e299,-1.3121189870388463e298,-9.896472250874165e299,-2.835545680813436e299,-9.812601351216988e299,-3.2344484795692478e299,-2.7624876896924857e299,-6.039254114018944e299,-3.397934609520766e299,-5.573428912865735e299,-5.114449915256281e299,-2.4036821969728384e299,-5.13012787458469e298,-3.128223140940967e299,-1.8636533186857032e299,-7.962748886258563e299,-5.922464886107593e298,-7.527079930745673e299,-4.3792519271649315e299,-5.4226458309332064e299,-2.73483626566579e299,-3.252516012403484e298,-7.71907962619907e299,-5.153978036084844e299,-9.075898794339761e299,-6.720725874068482e299,-6.543308437443587e299,-5.664517853323981e298,-5.701805998458438e299,-5.0440199471009086e297,-4.842523569043222e298,-8.355359448921756e299,-5.8106722526427304e299,-5.087321223670865e299,-4.493508687451093e299,-6.018926597853603e299,-1.3068510319349481e299,-5.0373726535184194e299,-6.696468747329219e299,-5.400253446722923e299,-5.403858442781664e299,-1.9859764999838392e299,-6.92457227567964e299,-5.093539509043228e299,-9.444922072628238e299,-8.182852210498904e298,-1.1857729760887016e299,-9.244421270529395e299,-7.403330564507529e299,-6.363700351923279e299,-7.050393847352888e298,-6.50679746606242e299,-2.3596053162590947e299,-6.4101730770295224e299,-4.642300482194244e299,-2.249324488717528e299,-6.4665428104990835e299,-8.887657321444776e299,-8.992170056609018e299,-9.850989326756171e299,-2.4074984785450472e299,-4.998076686773003e299,-3.573757537773246e299,-1.3663279246000282e299,-6.95514842250582e299,-1.1744136351246714e299,-4.963971141046837e299,-4.267958941797907e299,-2.9501726998947842e299,-6.424000547039708e299,-3.008942633808385e299,-7.829986363628825e299,-7.513096819247127e299,-7.936372191723271e299,-8.43725895558452e299,-9.292439800061512e299,-2.3473412217527745e299,-5.017753562065435e299,-2.631475832980146e299,-6.3842949594640925e299,-6.2254068788655294e299,-8.400639736002777e299,-7.964222932460414e299,-4.274889139381537e299,-3.0675714143296508e299,-1.4362030044540552e299,-7.54748577225044e298,-9.50450267203959e299,-8.281648923951869e299,-9.518701556842796e299,-6.299102732624724e299,-4.60336728115363e299,-2.2326776477127642e299,-2.739100034420041e299,-6.479287316062359e299,-2.7344488606620667e299,-3.066401396399727e299,-9.270461393499926e299,-4.488708946765696e299,-9.781068383039687e299,-3.307303543300302e299,-6.1126011264461155e299,-7.575740447715065e299,-4.3004103884041855e299,-8.067324861194132e299,-3.4648745168266995e299,-3.860854422507176e299,-5.261736612813808e299,-2.2955877377505908e299,-8.45286249720801e299,-9.794004798833141e299,-1.3706688480245477e298,-1.886476706566187e298,-5.68695336405019e299,-5.998820555039864e298,-8.593074379682952e299,-8.773412459820162e299,-9.254977010348664e299,-9.189063442600088e299,-4.010630024622306e299,-3.2365368801190344e299,-3.358460098735723e299,-3.6644869223509846e299,-9.50247867957255e299,-2.644064512009339e299,-2.15336896779889e299,-8.707772498845691e299,-6.2466661865146024e299,-7.977355480912718e299,-6.806553373399158e299,-5.5131458805040694e299,-7.571655722504849e299,-6.70516647873787e299,-1.9237759537295674e299,-3.7200873763505804e299,-6.355210196694763e299,-5.0676308231700776e296,-8.401643144563227e299,-4.5653108419751656e299,-5.925417422264854e299,-5.25982141171369e299,-4.077372849948886e299,-3.2321934285144297e299,-6.73985685273469e299,-7.808412186737046e299,-8.659589858128975e299,-1.3804010095846976e299,-1.780167201637759e299,-7.718100660910965e299,-4.5478246679739785e299,-8.284821585290721e299,-7.580067221415814e299,-8.271034093120416e299,-6.6555104731235364e299,-4.209154963447724e299,-5.240320794066047e299,-9.003362149761143e299,-5.229624556055335e299,-9.579794572598855e299,-4.747812127748872e299,-3.957244721872282e299,-9.985676461912899e299,-2.5132963899872297e299,-7.76782350771907e299,-9.576646846060553e299,-1.79149247048517e299,-6.6066078399327655e298,-3.852290357298141e299,-2.6151672664854034e299,-9.732220532155705e299,-3.3869746485188436e299,-2.37087905697047e299,-8.161978226946539e299,-3.8966724601454074e299,-9.007481378562184e299,-7.649647449825816e299,-9.604852291042417e299,-6.685004746202397e299,-3.95104394400732e299,-2.1269535873441382e298,-3.795216313879693e299,-2.651234625486281e299,-2.999701600264313e299,-9.73561418562256e299,-7.902857442299426e299,-3.54988398006709e299,-6.931062663902135e299,-4.211034203356572e299,-4.573039164651472e299,-7.817592940351441e299,-7.757245318820204e299,-7.020406226022382e299,-5.831266899353303e299,-8.218138827450738e299,-9.21979249341179e299,-2.4767762777590498e299,-7.35518748865532e299,-6.0806896401989086e299,-8.63890684631271e299,-5.754488797425752e299,-3.441942877551958e299,-3.83009132688283e299,-4.59818534868921e298,-8.572466357847064e299,-9.961006675678005e299,-4.226616273926958e299,-1.6194396282999569e299,-2.723558536813815e299,-5.90148622021951e299,-9.840560942565544e299],"qim":[-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0],"im":[7.875890297775655,-5.165516262789351,0.9342117914541337,-0.8542874111860286,-2.475568578517975,-1.6313255226619106,5.395387552360527,-8.996786190949155,7.270935379746398,-5.430497610164684,-5.016202074660949,-6.001421592714888,8.75181441786944,3.9243923098687006,6.504639868424412,4.699901623930046,-9.662905146181181,-8.324618830258705,-3.812460450708892,-3.7244567764602188,7.996730057124331,-6.692180304395432,7.790597711480224,7.195270541669618,7.173148830689961,-8.935178478952452,-2.0449867333053007,8.639042446505766,5.616975207318289,7.907968784603302,0.34975002253603193,-1.960252960231017,-3.0378687371542235,-0.14874963726760448,8.220286623873317,-2.800703807744238,-2.451231606772728,-7.523705755869843,8.270957575743868,-6.745096708527147,8.874155921978023,4.688154109264682,-4.009395826589577,4.524027915886556,4.269157570063351,1.4261655271712748,4.10913872468527,5.665261122243033,2.122189366881834,-8.101073874633098,-0.2253508334812473,-5.749793560979346,9.523356212413493,-0.8694170898269782,0.7304056437773276,-7.208565964609086,-2.0117941754443036,8.714110676585566,-4.679459150499534,-9.737638029056335,1.615524376682508,4.169837523089214,2.8808098874896526,1.6474190244688014,-7.720472975688306,-2.651895167985492,-1.420659865765188,2.766099727553595,-2.4677954423606607,-7.373293107923757,-1.9221273176810705,6.2301764368416634,3.3685738278456867,-4.8724061658396955,9.438382191008259,9.541782585402142,-2.217659997619683,-6.390490864896723,3.6430388769927404,-7.722536421922741,9.957994880207028,8.47397354442936,-9.226357329872101,2.284721116274726,9.130626968173402,-1.6128869412646587,-0.11344469687893621,-7.3312661959886904,-1.1833354138332641,-4.967152838417412,-5.197797519535188,-8.98256649150229,-4.46320982421486,-4.347825886761987,-9.711141287781007,7.478651201026665,-2.6844193514013037,1.8265225442432467,2.815330399884939,-0.10442994263156535,-0.37890090296775014,5.114945020133707,-4.632697517170787,7.1687803351078045,-9.964578519395513,-0.4296161107140417,-7.056329192794775,-4.617466766785285,-9.260174746835443,-4.972554213546796,5.784418728224896,9.729027415322122,7.6907043605629575,-3.76673309444433,-8.059100429570636,-5.669035228275328,5.873984839168379,6.165163736940208,-6.559368209828951,-9.996467908445425,8.770968978539095,-6.933917251937105,7.404224067075059,-0.8893012184286686,3.0757863873851488,-5.5176056189936595,1.2228506992363641,-3.9920863768792314,1.5659143419589263,7.23416434267601,7.008387257968749,8.719851120084105,5.259647378682724,-8.656110054987032,-8.386151613340086,-4.299886467721867,2.445579517043125,6.250869117116157,-8.366191903249627,-9.260877236647485,9.485734303871144,0.7199541292663714,-4.157195793689508,-6.6127710636772985,0.42612463384348764,1.7657977451414055,-6.241505823932458,-5.034585429399039,1.020907856027904,-2.376896257761816,8.003187255980396,5.612001029662075,-2.489893812004822,8.589151892918352,-1.071623576450854,-8.937723929679851,2.794061035565928,0.8829574869771051,-5.308741572918985,5.870534885597895,-0.05740742353970596,6.886416185115465,-4.592282741021885,-2.3080973760972556,3.956624068992273,8.215133636149314,-4.0131423741848105,-7.835411785000734,-0.8730412219298955,8.896723277413319,-7.4731636074235475,-6.777136456974935,7.0595890737179765,-0.903104321314526,1.8950396018700122,3.658880339509377,3.411929885351217,4.9955452000407305,-9.623311578881587,6.2046534807905545,-4.370925045174001,-9.955137538649046,-2.8936900205150495,-7.4876945768656356,-6.972692575927684,-9.861793208189354,0.9405842515519645,8.717757339978753,-2.0578634771489224,-0.8913250142976459,1.8507233159435046,8.591635854552106,-9.883446141741473,3.5853783942177486,2.608048773602647,8.51523800855422,-1.8808894784296104,6.697126431741207,7.8272973586615,8.595967996619862,-9.275925013033168,3.483535691442823,-0.6808605415368305,8.161013013816323,5.074165499567428,2.965128620597085,4.836926344700752,6.552686491891361,-2.8564163696104927,-2.174098685162096,0.6423749978019231,9.331378327317008,-2.154303487225868,-6.4527112675704545,-7.455133592865697,1.6990165528451762,0.9976126500138314,-1.206457340488969,0.5507493598018662,-6.860848759280405,-5.031676904373521,5.353948764758684,-8.922439801501302,8.587063252414389,8.419171774528152,-1.8659260956019352,7.406182821483554,-3.444694120092242,-0.3185504944158346,-1.6509495242249237,-6.652256382809769,-1.5182087696869004,-2.601430513814922,-3.6025584155676604,3.611673900894896,7.812740773957646,-8.004690792687036,3.4134017874497236,-9.034459172406532,-1.4676245796728473,5.561641465820109,5.819354330388409,0.19126856904785328,-3.214514657342442,-3.7790083473155667,4.751950947350462,-9.389788816559811,-0.5789476637926185,-7.630833817545093,-3.8456087936329197,9.819868734137604,-5.35230576973845,7.364466957690254,-0.5227850901506148,-1.449583977507105,7.349345508212082,4.896841380973109,-5.159935076423099,0.5501693088167237,1.2505254085761344,2.3143345607040153,3.351208628220821,9.236871120708091,-7.462618819711877,0.3209436450777492,8.698454536300225,0.040219990799318595,-7.023422406653985,9.728193917015076,-6.107152700415317,-5.647731996085095,-2.166807718196204,-4.124698065438954,-9.553763611046332,3.821042887320507,-2.4099201188925212,4.556729262594729,1.8951762259475444,1.6172874037310958,0.8452614775816336,-5.976017286979216,2.863053533631671,-4.058639853692574,0.4488995753038729,0.2494752573198653,3.2401004559804,7.538758104009425,-8.136535249050741,-7.232173795531316,7.649635050634089,3.5937434719464623,-3.6118871753411463,-9.254992269170383,8.57342945491095,5.043189012755022,9.565027690778397,-0.8826318368932107,-2.415253274636604,3.3319226561598647,-3.502363704588598,-8.820080564789077,-4.996883481996099,6.760926643341492,9.629541045905658,0.5993396071834987,1.6655413368551528,7.468091601291928,9.403406809487286,-7.858059477674737,1.405378453146806,7.587681229355702,-4.834285277473147,1.7461871098335635,-2.3176311686105544,-1.4619078045479803,9.725087375041099,-8.033298985029509,-2.7394202979751503,8.637318861216443,-9.72301991628505,6.89427442889756,0.7506775546561748,-7.703510951540622,-7.537831314455126,2.47089389182252,9.198872921342161,-9.916609045563757,8.152527665454304,-2.5086444279350095,-1.5470589088664166,-6.483024934743802,0.6932781789267306,-0.3608352700514139,-2.376532236497786,-1.802714396559736,-8.233636591575335,-4.155287361312494,-6.549227957541444,7.892185140475654,-5.243576359294542,8.92613845631438,-5.219249783590221,-9.8710644186378,-0.21198160030847646,-0.530423712151471,7.106366436211626,3.5534328020998096,-2.327313165313214,-8.736199523968597,-4.07285833270183,-5.377478426798765,0.3338620173435114,1.8299463044565556,-6.760818079490605,1.7285287361339243,4.207613684500519,1.6148343374741803,6.98305805449634,-5.123510037963959,4.506060792134154,6.913717450643517,-2.652037987045106,-8.736469971093875,1.0647395542716644,-8.67053425522145,-4.991522978508742,-8.13550392061947,-4.981796123815281,5.791034751346373,1.6293618943106924,-6.587933641594033,-9.490786963826082,-0.4913362117501876,-1.6001892450857689,-9.661293544468323,-7.088173902938615,0.9956697635637024,-5.965749358588512,-0.5722557709883382,-5.5457687867212835,-6.974443473334735,-4.658090853575754,-1.6572330110355296,1.573022573040145,-5.685149013780988,-5.927128150536984,4.484499110762332,-4.745604946630109,-8.238685962968528,-7.762641474029985,0.6660198850375068,2.5203274431394362,-9.27578503058955,-8.438497527222196,1.1695537958630275,9.548635960794986,3.6402016235882897,3.793242359958313,5.155390436320669,7.16216769043362,7.162886207392518,-7.53024234280586,5.8546208155229,-0.9944334408498392,-9.578053451684818,-4.2020704639260575,0.3844328870367608,5.689138860560172,9.282575922106755,-1.8847316119088564,5.973371146544695,-3.305835279287228,7.943482761072751,-8.472205675439707,-8.598870026616963,-3.0031805104102283,-1.986791628175176,8.418609036017486,8.082294979817966,-9.933201865139507,7.004318774129427,2.284346351715829,8.621104297071703,-5.734702893699621,6.683961537127999,8.621178499105024,-2.207696227904763,-9.244393040891158,3.546157692020513,-3.580945106189697,5.978793788460862,5.2388035286078285,-0.7906988120580607,6.760059762961692,9.441097695683656,9.742160772767747,4.946205037401565,8.953755096278005,4.753261312356161,-1.1365222181200139,0.3128833599829228,-7.793634562811107,-6.655093381286492,3.98744159125075,-8.141829287999819,3.8751899288687106,5.522533202963849,-3.304527490010698,-1.4881617037906167,6.631622916956598,5.936982794053161,6.178737247955958,-5.093772156041054,-7.085206749432946,1.2505190504401718,6.887913717857188,1.9293826294146221,-3.065611617802868,-2.0890184898263,-9.196811961761329,0.8844531200929886,-8.325589322102239,-5.680217758519861,5.087903362022921,-5.015710242841567,-1.9599912961003962,3.74685053836917,0.913383924527702,-9.286032785101854,0.10071643211510306,0.6715774437261857,-0.7441722959942219,-1.3092610434683305,-8.437505020526306,5.085457755001897,-6.978037351090891,-3.88425679070886,-3.5125903025310157,-5.801899754504913,-9.879336133556551,-7.354383255981465,-5.0704169154224354,-7.326114159710442,-0.6449917884526322,9.229782752372635,-8.05833957440452,-7.922818938137239,9.827530172466552,-1.6959755905010354,3.8940914538860483,5.188859235346403,-5.12065377353224,6.772617505986027,-1.4525054325950961,-2.5172295062315397,-4.117584716403013,-2.0256197636822737,-1.0203606106467653,2.168569273452782,-8.096655949568792],"qre":[-1.2674214816397788e-300,-1.517796302742282e-300,-1.1994722124827107e-300,-2.8877153501984138e-300,-1.123359269537408e-298,-3.1164872941081063e-300,-2.4182613058731033e-299,-1.96496678972153e-300,-3.339645726440054e-300,-2.527031694263492e-300,-3.240661649353718e-299,-1.8350742818567316e-300,-1.1561273328150855e-300,-1.0158921327951829e-300,-2.3024338409481097e-300,-1.4739927415900681e-300,-5.668350511490809e-300,-1.902278943298985e-300,-3.683083253454981e-300,-1.3098576502366197e-299,-2.933569614319939e-300,-1.4682332895277176e-300,-1.2509465593200593e-300,-2.563633551453338e-300,-1.279080577477672e-300,-3.7982689315179406e-300,-3.3716005032731246e-300,-2.6224194806502092e-300,-1.8800849961131693e-300,-9.27261880853341e-300,-1.7865829615791393e-300,-1.6914287238897265e-300,-1.9152297273994987e-300,-3.61465747748847e-300,-8.253252461821322e-300,-2.0504613841075382e-300,-1.571464298864277e-299,-1.0651377876071106e-300,-5.478669328504483e-300,-1.233470342517346e-300,-2.503472079913493e-300,-1.1243247218303714e-300,-1.552103894382481e-300,-2.8642007942275865e-300,-1.701063733986179e-300,-1.9174949037398728e-300,-1.3199924262077229e-300,-1.6549570223095567e-300,-1.564557135955698e-300,-7.831101828595122e-300,-1.6220663421155874e-299,-1.1648788738538955e-300,-1.625380975120673e-300,-5.1242131094540494e-300,-1.1866853484105913e-300,-1.1873999517597719e-300,-7.565536281734121e-299,-2.9230742874218155e-300,-4.168551806936632e-300,-1.5184562946449098e-300,-3.843513532369619e-300,-1.1242418094473371e-300,-2.987565257375432e-300,-1.4857340106138357e-300,-2.8956400577173547e-300,-5.9444488060135385e-300,-2.7680430565712958e-300,-1.284604666883563e-300,-1.9981850592310435e-300,-1.3701373128435744e-300,-7.083751000357773e-299,-2.4506222187230912e-300,-2.2320602443761948e-300,-3.205595693498198e-299,-4.8393545822521306e-300,-1.4280136923853915e-300,-2.397581762882813e-300,-6.469725046294523e-300,-1.627567072294101e-300,-1.2830182733388422e-300,-2.2879979883571988e-298,-1.257198490006728e-300,-1.3066161664570074e-300,-3.665141370507912e-299,-1.1980083085799708e-299,-1.8814569616142404e-299,-4.99234670932586e-300,-6.578847580773739e-300,-5.039310311095551e-299,-5.508923087297605e-300,-1.2606624533036922e-300,-1.2840132303844009e-300,-1.0637288079240844e-300,-1.4235443921661467e-300,-1.2980284819865199e-300,-5.483603264167797e-300,-1.29280016463284e-300,-3.059108068023592e-300,-1.2621312246556632e-300,-2.6254155983785773e-300,-6.089758666462854e-300,-1.0933853143719819e-299,-1.1426289909690556e-300,-1.1430105810158694e-300,-3.553888614299753e-300,-1.5012037489564527e-300,-2.1612560954525042e-300,-2.990759729037293e-300,-1.206567390106606e-300,-2.360805000827042e-300,-1.68182044510229e-300,-2.6616124502441647e-300,-1.089688806680549e-300,-1.022849300981753e-300,-2.7840661716104505e-299,-1.942495109069773e-300,-5.095691398625776e-299,-1.5471219335724146e-300,-2.1239284718740113e-300,-1.2517257581350399e-300,-9.884963613356036e-300,-3.281975022994054e-300,-7.809618475218567e-300,-3.176683913833084e-300,-1.4662775267125699e-300,-4.470449471394816e-300,-1.3010340960606991e-300,-3.2609234525729036e-300,-1.8151362107885845e-300,-1.4873959367783956e-300,-4.742348858975532e-300,-5.300619691923339e-299,-1.2070418871540758e-299,-1.541904134949113e-300,-1.7593114459536986e-300,-1.577184931562896e-300,-2.2601238640188447e-300,-1.6181513195717943e-300,-4.080675232250385e-300,-3.0981193115116863e-300,-1.7834733913706044e-300,-1.776106544320484e-300,-1.7708890648707875e-300,-1.3559352582345605e-300,-1.4843140803773259e-300,-5.244167069325333e-299,-1.1235383940750122e-299,-1.6055357217053564e-300,-2.0450379976390768e-300,-1.079566068863454e-300,-1.3964129948687933e-300,-1.0730104649730476e-299,-1.1475503502642509e-300,-4.679915892279635e-300,-1.467407840946044e-300,-1.7746823702811785e-300,-1.3778038149231848e-298,-1.599607842723952e-300,-1.182334101532629e-300,-1.0279289158405946e-300,-1.979688360060127e-300,-2.3533114982594874e-300,-1.2320287725162691e-300,-2.8979097351761643e-299,-1.1338205704541361e-300,-4.150174456432567e-300,-1.416324082384062e-299,-1.3685944402148685e-300,-1.9937654504664806e-300,-1.2582729460736435e-299,-1.2443243823826611e-300,-1.7667015383391526e-300,-3.569686800747464e-300,-2.1024236409563307e-300,-1.6998120061526558e-300,-4.8808948101168014e-300,-5.6603272099842085e-300,-1.1575424334324595e-300,-4.494995404741125e-300,-1.2327912542682102e-300,-3.726181927694964e-299,-1.1907374690736141e-300,-3.0896499115322384e-300,-1.6778808633910367e-300,-1.813395557426277e-300,-1.3205959457110361e-300,-1.1454391290258763e-300,-1.652502952323829e-300,-1.1993356042464485e-300,-3.397256995278147e-300,-1.1503577715771196e-300,-1.5088999577963185e-300,-1.0358608766023022e-300,-1.3276041426489107e-300,-3.8606578436601843e-300,-7.583420397884411e-300,-2.3543563472092742e-299,-1.4523196733212246e-298,-4.9810049448050703e-300,-1.92366012545051e-300,-2.1251343851958425e-300,-1.8246830411537194e-300,-3.2150818791612255e-300,-1.1453045683922893e-299,-2.6180500517870548e-300,-1.8605627500111014e-300,-1.0011373967428731e-300,-4.325146738724721e-300,-8.692276802097172e-300,-9.828806716576396e-300,-1.340888266023995e-300,-8.95904555056675e-300,-3.199288394101551e-300,-2.0302066313198394e-299,-2.8849220862392473e-300,-2.301157922984039e-300,-2.076335177408688e-300,-4.4046613877747704e-300,-1.7167313440035086e-300,-1.8297845107133175e-300,-5.1641662120882584e-300,-4.280962771761279e-300,-6.081072574666133e-300,-9.116484115463359e-300,-1.535381662799763e-300,-3.2528693564905066e-300,-4.284372383587574e-300,-1.3859978143926856e-300,-1.1867498489365606e-300,-3.1073120702547973e-299,-1.0041658668847827e-300,-1.591994173112251e-300,-2.4569592129159563e-300,-1.0762879860042352e-300,-1.0007768863933874e-300,-1.0647912046186255e-300,-1.522826169822214e-300,-3.9961166942243246e-300,-1.7318121187270676e-300,-2.751241439142034e-299,-2.072725527281889e-300,-1.3200969717829777e-300,-2.350092204157964e-300,-1.9641327905412707e-296,-1.6583307365510213e-300,-1.6390906756987372e-300,-1.1737643633777481e-300,-3.231902114737432e-300,-2.124974724665547e-300,-1.1874720754299908e-299,-1.2530620110287346e-300,-1.4605761048761825e-300,-1.2032743442930306e-300,-7.021773705882185e-300,-1.9169021246287827e-300,-2.368142569672361e-300,-2.3932031219002955e-300,-1.228667610841762e-300,-7.709389771730678e-300,-1.6961449852696945e-300,-1.0897758911440025e-300,-5.4615983388486536e-300,-1.699640335623081e-300,-2.4687414389818603e-299,-2.0759509282669347e-300,-1.1943708438367101e-300,-1.0049171159385028e-300,-2.1984995527534376e-300,-1.2158964626743722e-300,-3.959002646331593e-300,-2.6708235992092514e-300,-1.3034997098638819e-300,-1.4200037280141343e-299,-1.0532371942323802e-300,-1.0043629301136151e-300,-1.8379802740826025e-299,-1.7486513737891026e-298,-1.8976782909964364e-300,-5.872303650603278e-300,-5.5738517958746805e-300,-1.3198781996238781e-300,-9.766039538827674e-300,-1.4108058562583872e-300,-4.751481401135712e-300,-1.4825249395477477e-300,-1.4469222128790365e-300,-1.9532810420442563e-300,-4.682221715169614e-300,-2.7187359907589413e-300,-2.368372680730546e-300,-6.687961399541934e-300,-7.62126003722248e-299,-1.0104610760785683e-300,-3.52665804951211e-300,-1.0190977542117076e-300,-3.0917172009899395e-300,-3.619925633447141e-300,-1.6558336197158787e-300,-2.9429642265571347e-300,-1.794227603211363e-300,-1.9552444868352785e-300,-4.160283756560601e-300,-1.9492691497109226e-299,-3.196702904317755e-300,-5.365804841349066e-300,-1.2558477157627252e-300,-1.6884861611348912e-299,-1.3285364433494659e-300,-2.283495027534044e-300,-1.8441182241619968e-300,-3.656526032488282e-300,-3.074542895981129e-299,-1.2954912352580656e-300,-1.9402488582579173e-300,-1.1018192497074296e-300,-1.4879345159106101e-300,-1.5282788662040992e-300,-1.765375316829821e-299,-1.753830278109013e-300,-1.982545688731382e-298,-2.0650389941159922e-299,-1.1968366006432532e-300,-1.7209712689356962e-300,-1.965671039892442e-300,-2.225432439449098e-300,-1.6614258103041296e-300,-7.651981561504996e-300,-1.9851618468241312e-300,-1.4933243739826818e-300,-1.8517649400452448e-300,-1.850529599523049e-300,-5.035306309053191e-300,-1.4441325184981928e-300,-1.963271313051698e-300,-1.0587699848768896e-300,-1.2220677757285691e-299,-8.433317508200618e-300,-1.081733480913439e-300,-1.3507434137739602e-300,-1.5714127703982377e-300,-1.41836047978434e-299,-1.5368543514927457e-300,-4.237996893418576e-300,-1.560020280237738e-300,-2.154104422657572e-300,-4.445779188444966e-300,-1.5464213712099753e-300,-1.1251558918536703e-300,-1.112078612509141e-300,-1.0151264678400476e-300,-4.15368902166178e-300,-2.0007696213353775e-300,-2.7981752803047875e-300,-7.318887230477521e-300,-1.4377838390395086e-300,-8.514887515707732e-300,-2.014516143599322e-300,-2.343040347006579e-300,-3.389632071490812e-300,-1.5566623830080736e-300,-3.323426604296245e-300,-1.2771414323850083e-300,-1.3310090686415618e-300,-1.260021551210622e-300,-1.185219044791925e-300,-1.0761436409772387e-300,-4.2601390489504274e-300,-1.9929237010762533e-300,-3.8001489030112054e-300,-1.5663436704433556e-300,-1.606320710369749e-300,-1.1903855318473919e-300,-1.2556152790804245e-300,-2.339241948493367e-300,-3.259907806314357e-300,-6.962803983132807e-300,-1.324944531431464e-299,-1.0521329042726315e-300,-1.2074890027127789e-300,-1.0505634555598824e-300,-1.587527688381291e-300,-2.1723228648168918e-300,-4.4789269110318555e-300,-3.650834169741206e-300,-1.5433796206582293e-300,-3.657044073436719e-300,-3.261151658664464e-300,-1.0786949619370183e-300,-2.2278120766117886e-300,-1.022383200728863e-300,-3.023611189319856e-300,-1.6359647543064912e-300,-1.3200029843968744e-300,-2.3253594649860482e-300,-1.2395682797035388e-300,-2.8861074048818616e-300,-2.5901002487180448e-300,-1.900513221366343e-300,-4.3561828788120455e-300,-1.1830311924869251e-300,-1.0210327854026988e-300,-7.295708233547675e-299,-5.300887079704395e-299,-1.7584107622922555e-300,-1.6669943546817008e-299,-1.1637278531701662e-300,-1.1398073492836766e-300,-1.0804997126214654e-300,-1.088250185937388e-300,-2.493373843662314e-300,-3.0897222464624645e-300,-2.9775551014479685e-300,-2.7288949890928823e-300,-1.0523570046515306e-300,-3.7820559803212094e-300,-4.643885998887457e-300,-1.1483993181178776e-300,-1.6008539117374562e-300,-1.253548249658277e-300,-1.4691723477966428e-300,-1.8138464348209293e-300,-1.3207150940946121e-300,-1.4913872804963262e-300,-5.1981105079379415e-300,-2.6881089039930125e-300,-1.5735120775707514e-300,-1.9733087016280438e-297,-1.1902433640580275e-300,-2.1904313520245504e-300,-1.6876448167895877e-300,-1.9012052344077446e-300,-2.452559618168194e-300,-3.093874243966942e-300,-1.4837110369699483e-300,-1.2806700979471177e-300,-1.1547891024668735e-300,-7.244271722902146e-300,-5.6174498613388506e-300,-1.2956555556013833e-300,-2.1988534585382168e-300,-1.2070265964151227e-300,-1.3192495142717466e-300,-1.2090386628097305e-300,-1.5025143511353896e-300,-2.375773780447605e-300,-1.9082801211948025e-300,-1.110696185898209e-300,-1.912183158238595e-300,-1.0438637200637957e-300,-2.106233298818713e-300,-2.5270107619901564e-300,-1.0014344083890294e-300,-3.97883832557083e-300,-1.287361896168568e-300,-1.0442068252849479e-300,-5.581938057094826e-300,-1.5136360810696718e-299,-2.5958583264771462e-300,-3.8238471887265856e-300,-1.0275147348911319e-300,-2.9524874077144617e-300,-4.217844841388952e-300,-1.2251931727758456e-300,-2.5662921639625934e-300,-1.1101882512685523e-300,-1.307249787077142e-300,-1.0411404253791702e-300,-1.4958852505947402e-300,-2.530976658755551e-300,-4.7015600432008924e-299,-2.6348959250170942e-300,-3.7718276247111976e-300,-3.333664921577156e-300,-1.0271565624249863e-300,-1.2653651002833207e-300,-2.816993472505264e-300,-1.4427802033995862e-300,-2.3747135542212177e-300,-2.1867295774105047e-300,-1.2791661162585997e-300,-1.2891174107564379e-300,-1.4244189977117314e-300,-1.714893208045239e-300,-1.2168205246907461e-300,-1.0846231091584465e-300,-4.0375063705987406e-300,-1.3595846489874055e-300,-1.6445503046053974e-300,-1.157553863920669e-300,-1.737773823536412e-300,-2.9053358395977753e-300,-2.6109038000769114e-300,-2.174770967605877e-299,-1.1665254295044507e-300,-1.0039145967462511e-300,-2.3659588076844695e-300,-6.174975482412843e-300,-3.671666999196797e-300,-1.694488409671834e-300,-1.0162022326130617e-300]}

},{}],57:[function(require,module,exports){
module.exports={"re":[-0.9182649958686451,7.9795655481074235,-1.9745940077788546,-5.52087192154997,-0.41891056118927494,5.748660473157855,-5.757096903709167,-0.4233655369865019,-5.946279355276478,4.797648174985131,-3.3889057939474876,-2.2723448789957024,-0.4235052870731124,-7.319471522951448,-6.161707258531677,4.008373272285226,-1.3001022568511154,7.652739626626062,-3.4852388304616966,-6.479346120495819,-0.715993815764584,-9.19188463954541,-0.4630218976393117,6.361444865622573,-9.081123392262418,1.4994790295507432,7.35759763772808,9.98378518486533,-5.95014515369285,-7.420700296264164,-8.96897472449325,-2.1541343264910218,9.442463864749321,0.3688211062345772,0.7264980285195399,-9.285790304406953,-9.081705481188674,6.3106872860259955,9.79457764130867,-9.556329647561505,9.069255956605176,3.073154726539581,0.2809662093506926,6.398391298100634,5.496434749358524,-2.534995919245624,-5.257252537559025,-4.456961247210249,-8.076510269852978,6.176197756828266,4.159846094330867,-5.956999280788646,-6.183040127870503,8.966066162227285,2.43429230124657,3.7216507657932176,5.166231714707848,-2.7181600641455628,4.350500187901183,1.4690047776223203,-1.8925600466178505,5.557284187521038,8.695607798589439,-8.696277821913734,2.5885495048286344,8.485498149298024,-0.3157499086904636,5.8709826905695515,-5.989460473585844,-1.7489483390531113,7.460187106744769,-8.496886926683857,8.019457857539606,9.500437910540413,4.7389051518728955,-2.075465690100704,3.9488517360756745,-1.9081831543338659,5.871970980936059,-0.8830549119506514,-5.649903191151635,8.70763626683949,8.889919540628952,-1.3171936457108302,-9.04202699531821,9.222762206415354,-2.1518033004868853,-6.908560396627648,-7.969107032577458,6.640843329523761,-8.374656154924969,4.273154424604964,1.4800342624224996,-1.6532372432384257,-8.414479003023668,-0.12826664593004722,6.989748236331188,6.744928605852024,-7.4458124880690635,7.062822361619091,8.869996969925094,4.025525956965117,-5.463796881599352,0.8740472141839071,-7.874135088627989,1.277434582097765,-8.172841732353135,7.491237523674382,-3.440640571914062,-7.305128905526894,3.489193066030122,-5.483558176800525,3.7987090222725186,1.7243788083186793,-2.58301957518718,4.510040980307956,0.26643726641557564,-0.680775170652602,-8.756522499368913,-2.9883807847838373,3.7227946686197058,9.413064754096272,-5.958117367276725,6.877927617788462,-8.429459902627867,5.326035976913662,9.674306733976053,2.0706345449356967,9.986958530119292,2.540721578225309,5.330818089098447,-0.4092929110209642,-3.0911348064154787,4.06317674170317,-8.784540715344406,-4.073082461440589,-9.969284301178138,-0.9121134701371183,3.623918720182683,-7.013649817033789,-9.237301963075048,5.272487890648815,-4.045436697579947,-0.282360723350612,0.602738398675644,-2.1661566260672993,-0.033460644518466864,4.597289527206767,-4.3938956589571365,-7.608068478850956,-7.829410968502568,5.337247173470292,3.216581078228934,8.646064768789973,7.656158979217771,0.47430712857034507,9.284817251052417,7.6106605262655656,8.824606472863287,5.800297741813264,9.507758788171866,2.5170902684521543,-5.589162130627869,-5.177805295572453,8.684799588473354,1.840633702743638,1.6478097704235761,-3.9804914363520716,-7.968387096544891,5.167779348042103,3.233922684660193,9.178379993647894,-2.4960083674220668,-6.136090066599107,-9.253306414565001,-7.757337580950052,1.6864486717884475,-9.650710811138516,6.694083794960086,0.04363334826141951,-2.4628829775620753,6.715078366856865,9.828721275684607,5.192788097627199,3.876680148814451,-8.514995247116154,-9.970900031367504,-4.5379334825955375,3.008656078851594,-8.51744581399814,3.865370479695116,-7.042027837948623,5.496842971415878,-0.48078838149187675,2.577017925993834,-6.283591821570029,5.183417877560977,-9.801349747686547,-4.3033500452093865,3.260163341738984,-6.373105449545249,0.5082458293297663,7.016428530436734,0.8664420079022648,0.4459428526980034,4.959190534835871,-8.887204461953964,-4.278451530844727,-8.548466429968965,8.399703062927198,4.977949970148284,-5.905567389073596,-0.4231906191658972,-2.613498318249756,-1.0267195751030265,-0.47591911824257593,-2.628036466990391,-6.044941929497605,-4.4183710937166065,0.2528452810941815,0.42480386647519097,4.729950579763367,4.827947926360817,1.392238452357212,-2.532096404679516,1.9713488495722764,-9.476108992095469,-0.49179273136794066,8.781559365184975,-3.4080087856888275,8.84606729148921,8.979311350300833,2.3975028225111004,-0.9345785656457686,3.220235677262991,-3.3206794117382366,-6.245153093885167,2.6667208776874993,9.860916587887509,-2.1690364143912477,3.7872115101638357,2.9672199015671463,9.89762597010525,-8.74856797396002,1.966259312412756,8.732675261489213,-5.478735634137055,-8.740803016654404,-6.461190420008562,-9.296749574302092,6.230809324309856,5.5359879570188895,-8.051910368555394,-8.163411078451084,1.1620446401434457,2.344212353568915,-3.5069233679854417,-8.837419462430724,9.536399423099297,1.0482944099090084,-9.34593616742899,-0.7637520977988999,4.565525515254723,7.4099830384102425,-3.8427545576643407,9.498100268413797,4.72402343001419,8.378669556415606,-0.4270555901388704,-8.617282010573177,-9.909271737041344,-6.875156853572486,1.9088837990848049,-3.498794350577108,1.0252343359927085,6.5163755585878675,-7.959388666529894,3.1075859870230538,0.5438549853731836,-7.504659948487928,-7.6127124822917525,-8.280171476902947,1.0586279283666187,-7.701296831990572,0.9445841443215173,-5.338874004166159,6.480319002907557,-1.280388080602597,-1.4026491482129444,-0.4633917706613353,0.7968021223124708,9.848449074087444,-2.8306047492521103,-7.482617207237365,8.94815010296103,-3.6700142655977253,3.3911881794775454,-4.116645653582416,6.843450328928679,1.0366834520840982,3.516538548583167,-9.911151682041082,-8.814663099427499,-1.2477032054685644,5.467622794281382,0.313458363630307,-3.6367428675984614,1.954368563575212,-2.007114238139711,-5.937091705273092,6.326918387520806,-9.278563232965503,5.78596067418558,3.0127287327614205,8.415681346289247,-7.919577058489571,-8.723531228413673,5.533686373858696,2.9391456747735756,8.511551263144042,3.955044470896066,-2.397550476080381,-0.6757297446711377,-4.835453944122472,-5.861805277938261,3.8684003685667143,7.795411643504426,6.093838856947585,3.6168498832177107,9.08219832391346,-1.0561596654733485,-0.8832579557799747,4.454727171026045,3.877724074590411,-3.6382373185848493,5.901575803550724,-3.0241812927220213,8.436228052220383,-5.931409295608687,-9.569052732737893,-3.974876399455307,-2.625014592962853,5.931246760024189,-0.2608017389165074,6.773162981111909,0.12905510421554212,-8.272126311648247,-1.4115664226226166,5.965669591032201,-6.578479276587901,-1.5726793690750362,4.910353234773034,-9.804694548930861,9.768597621430434,-4.415535577362575,-1.3035040401633147,9.855642177632419,-8.943446335923987,-7.270307052621345,8.169277565877572,9.922554638806144,5.403771121927484,-2.073009201016185,-4.186942136823593,5.57597097198955,1.2241252857489968,7.9505048268210174,-5.389791087251208,1.3908192823771515,4.497700651872968,-1.1919788896017067,-1.3084609428922924,1.2425761178429475,-4.419231608547056,2.8158287696144946,-7.43740646322649,8.560108409860835,7.539261912146969,2.9822410700541635,0.9362027891959315,8.28768643643324,-8.377615287839863,-1.3500880509413662,-7.458607717261256,2.1557608112359716,4.9821994209958085,1.2391716290332297,-4.638089620966834,-4.226222568743583,7.907689543510497,-7.38772297411459,3.3784887768263907,1.6046173064676026,-1.85619895427266,-9.051516524270834,2.5370640225860797,-9.271355510461653,-3.35458297335975,-7.334979887181019,-2.177751344261938,-2.06500632606208,-0.11508691839200225,8.326343449874635,6.28247359520115,-9.16045383528533,-1.9178750057255165,-7.924168785343122,7.36852505655218,8.356550938705425,3.0574321150173347,3.109069082746508,-1.2364730879516106,4.591408851453892,-4.382628864049756,-1.5970704351522578,-2.4181209871748344,6.712606378113662,-8.22611729019172,1.878842343328163,6.535869670651703,-0.15981330895329293,1.3500739781382052,-0.016152216940557906,-3.515808826255533,9.358129831514006,-5.6893910922548985,-2.952932168622344,5.148730564596068,8.429898158393272,3.940246481129094,7.5561033618372875,9.889091501749732,-5.520641013257035,-0.8151073918739726,7.551623451693359,1.9841347527679698,-9.036705055353064,-5.767694119836038,-4.132989491677881,-7.86161338296564,1.279311919056525,9.664935947426123,-5.07975619527155,-7.473902907852374,2.182247453746795,4.9252678341685385,-0.09213588910234272,6.963674385026415,0.13036197300538177,-9.116510010087001,-8.945354982940831,-3.5758465190106614,-4.2104407786509634,2.170711878482706,-4.057764548436058,-7.386266524723619,-5.811669331423168,-5.684533091025381,-8.102237005923577,1.9014752901915877,1.2981433902108375,-2.236302348709085,-7.301469395711493,-8.069060359015246,-8.982847014177025,-4.487456621606696,-5.863534398178802,9.368418406872422,-9.996243026105365,5.4849706781163565,-6.898563592425915,-4.3332798444249,-6.867631352856889,1.6301515310159012,5.161062695074023,0.9362502671451001,-9.870794986507626,6.9231694518811615,-0.646788368936356,7.338377474102323,6.670575920996971,4.596214417888254,-0.5472623431644372,7.5880031225802504,2.4462143420922864,9.555920235034108,-2.6110559831440794,-3.6701175572354394,-6.342055154858817,4.118206290893118,6.2138374521645865,-9.758259272105349,-8.996836702027133,-7.716183768844629,1.073834947870651,9.396251893027241,-9.0103783022758,0.6874353541076417,-2.0570346359396874,-6.3440418865966075],"qim":[-4.172596707429285e-300,-1.4497929118514575e-299,-1.1443438153849517e-299,-1.1316914648818475e-299,-1.7639257369017655e-300,-3.8311510773569506e-300,-1.1767702440554214e-300,-2.300185775801099e-300,-1.9053164086155508e-300,-1.9326294833509342e-300,-1.2455543835860732e-299,-1.750396844344451e-298,-6.51770340357039e-300,-1.4866433184405285e-300,-1.3282995256815355e-300,-3.8082245692301646e-300,-1.8243094706988107e-300,-1.771818915362641e-300,-1.0001573614132178e-300,-1.1268862401417531e-299,-1.4655089482344116e-300,-1.6655342409903126e-300,-4.3033445245983695e-300,-5.507619249032182e-300,-2.629625802353953e-300,-3.6158784371266335e-300,-5.8196830404010635e-300,-2.7973138150485408e-300,-1.1273759553396363e-300,-1.3559915742899363e-300,-1.1090941591012265e-300,-1.1742783076478632e-300,-1.0131281974626202e-300,-1.5264129299707263e-300,-2.2644251593576335e-300,-7.414275224346119e-299,-3.057472349456407e-300,-1.4826555562069962e-300,-4.461948959001017e-300,-1.4516691457437724e-299,-2.3891669271698806e-300,-1.9550681825354562e-300,-1.0968171758339635e-300,-3.098445786995063e-300,-2.2432674323074884e-300,-2.8819240059764228e-300,-1.3098729400485596e-300,-1.1980211893694718e-300,-1.7816382411848103e-299,-1.905004550681517e-300,-1.8781448586523982e-300,-1.2992970092584872e-300,-3.508393018959274e-300,-1.652770056354604e-300,-3.323947530997502e-300,-1.3639299872105395e-300,-1.4696415319227124e-298,-1.885176099742963e-300,-4.345935726127483e-300,-2.357016411860691e-300,-1.330322448113399e-300,-2.5352693028728752e-300,-1.106234793990693e-300,-1.3994182967180899e-300,-2.0005092981200014e-300,-1.9238372217896597e-300,-5.53590575257895e-300,-2.8035938999907708e-300,-7.660009712991876e-300,-2.3992760191673974e-300,-1.9872430745884646e-298,-2.2312886775239127e-300,-1.7827564486419218e-300,-1.2270369207437916e-300,-4.58299350005041e-300,-1.478964995453971e-299,-1.3999057982499215e-300,-1.815507399208358e-300,-2.0101595099208546e-300,-2.935620327076274e-300,-2.112431024730043e-299,-1.1340466674491938e-300,-4.7497918907462786e-300,-1.5394809658899096e-300,-1.142122819914845e-298,-1.0311706346725494e-300,-1.2856882127484305e-299,-1.5902757442326107e-299,-4.31534559022762e-300,-1.0166749238923299e-300,-2.7380275292803224e-300,-1.127900682835265e-300,-1.688841591175666e-300,-3.915552604432858e-300,-1.2207316575059369e-300,-2.829330691755441e-300,-1.4207145555654388e-300,-9.76129793329825e-300,-1.701850794609722e-300,-1.1648449550880141e-300,-1.5041028353813012e-300,-6.931855771704042e-300,-6.756271801620596e-300,-4.8436900996943034e-300,-1.8124943523948605e-300,-1.8130081118046748e-300,-1.4931282754974385e-300,-8.331455066684952e-300,-2.0365729091348128e-300,-1.6505993723363143e-300,-2.0040258699473933e-300,-2.006756166308383e-299,-7.638180074976364e-300,-1.1064450337822818e-300,-5.681210602207765e-299,-1.0377469927733676e-300,-4.132333641941042e-298,-2.022231966346135e-300,-1.4002536961390454e-300,-2.0918893853468885e-300,-6.596859813953781e-300,-1.0406543131151862e-300,-3.291108259521163e-300,-6.15089196394487e-300,-2.1032056638912436e-300,-6.118063063618264e-300,-2.609913495533637e-300,-3.380942934355788e-300,-1.356469252606469e-300,-1.233836865649515e-300,-1.0871132038547045e-300,-8.694104871300449e-300,-1.7153859369941228e-300,-2.8587058128059638e-300,-1.5042478318157316e-300,-2.6830061647091218e-300,-1.3841822179112106e-300,-2.7815146858108947e-300,-4.0822903233114035e-300,-3.637931240602134e-300,-1.2661872326428576e-300,-1.4374156874384427e-300,-5.097900104045835e-300,-1.181200262109208e-300,-3.840007156048063e-300,-1.967037525389997e-300,-1.324749774000343e-300,-1.7570993668199666e-300,-1.1814474200160671e-299,-7.782315960726487e-300,-1.4400498468531963e-300,-1.2714679508301661e-300,-1.4977784303907547e-300,-2.3355186566261277e-299,-1.579375560030457e-300,-1.172512582733372e-300,-1.7582949793490613e-300,-2.1080916666094494e-300,-1.6082340099890056e-300,-3.0132642813006996e-300,-2.1720526281727156e-300,-1.8168080293292508e-300,-1.1357933248213807e-300,-1.6855312559119156e-300,-6.00647855731024e-300,-7.968505654861679e-300,-1.295597658154502e-300,-2.1663082051728557e-300,-1.4542279634983676e-300,-2.5664163874232943e-300,-2.078505496347603e-300,-1.9046400250979636e-300,-1.2155554469868838e-300,-3.5286430694720134e-300,-1.4764419417976232e-300,-6.125420873730928e-300,-6.902900343376405e-300,-2.7702039770658005e-300,-1.7186616748921347e-300,-2.4908872661300318e-300,-3.007832842065808e-300,-1.1217549197621714e-300,-1.7664994670159467e-300,-1.1356397202339312e-300,-1.4305069200718177e-300,-1.0632729436757901e-300,-7.102531015147176e-300,-1.3968102997147724e-300,-1.710558459005833e-300,-1.1590860498481436e-300,-1.289151553711209e-300,-1.6334798782885593e-300,-1.6440855945915036e-300,-3.303557255010093e-300,-1.0623608249451819e-300,-1.2948286074470563e-300,-1.594308222430322e-300,-2.2876396689442233e-300,-2.6443413068403253e-300,-2.8825328295905482e-300,-2.1254936189226377e-300,-7.244347926641526e-300,-3.977115448151375e-300,-4.411272675666249e-300,-1.2910041196901593e-300,-6.712662392114025e-300,-1.5460069948886183e-300,-1.014394564342537e-300,-2.7236268238902605e-300,-4.330324995513757e-300,-4.102311279738139e-300,-1.3434719442625356e-300,-1.1210161603085055e-300,-2.0015243957153235e-300,-7.845293219974487e-300,-1.5900137792871847e-300,-1.4245623029760934e-300,-7.344932679059745e-300,-2.158412711296671e-300,-1.2534226938327961e-300,-1.9218582273831939e-299,-2.6921545805427013e-300,-3.8414565967922645e-300,-1.305753752249648e-299,-1.5591871903922704e-300,-4.501792378970233e-300,-2.309567672499941e-300,-1.0162592486070837e-300,-2.4642574860931625e-300,-1.2692321425071e-299,-1.218704587104441e-300,-3.4953911603042756e-300,-1.7824352095633132e-300,-1.5928755944905836e-300,-1.0741495185204509e-300,-1.3864214714171673e-300,-1.0739658508893162e-300,-2.2700295814204583e-300,-1.9134901571608343e-300,-1.2139292273539677e-300,-1.2133407026405642e-300,-3.759991356394933e-300,-1.161778421690552e-300,-2.0942076555176765e-300,-1.1337443202417475e-300,-1.4413049759700371e-300,-4.1310100309016506e-300,-1.9075426089273227e-300,-6.135736033076244e-300,-1.1597007218623142e-299,-3.493897856088923e-300,-1.1587326976478283e-300,-1.9948032700496517e-300,-2.1432811593398608e-300,-1.669869822198375e-300,-1.2806757281597915e-300,-1.6957669080523676e-300,-1.3269440205423402e-300,-3.300458692185799e-299,-1.003898181922033e-300,-9.974065481370459e-300,-1.7297701164491618e-300,-1.2379196207466133e-300,-4.4172347414418114e-300,-1.1918091015593051e-300,-1.6913064791323067e-299,-2.4984683721212456e-299,-1.4409780313518458e-300,-1.962897230629233e-300,-2.149142262210895e-300,-2.1956615449240847e-300,-1.4145326695257737e-300,-1.930026269029203e-300,-2.1317308943308568e-300,-2.7548291071694224e-300,-3.4074681780346786e-300,-1.294469792313584e-300,-1.827871352167835e-300,-5.3750656649735964e-300,-1.558507127118681e-300,-1.1613655718873553e-300,-2.0477247324688712e-300,-1.6418490501909143e-300,-3.587305747210501e-299,-2.4549873712899038e-300,-3.9575365793736406e-300,-1.0545971765731584e-300,-1.2038066763073884e-300,-2.6181870895620574e-300,-2.333354663486377e-300,-1.0924908743751332e-300,-1.64356121388673e-300,-6.641622132340768e-300,-7.291616897474546e-300,-1.2035263361731297e-300,-3.047388803396493e-300,-2.6241449838639364e-300,-1.1856403865080746e-300,-2.0984738405230722e-300,-3.7205345056213066e-300,-7.391775014272565e-300,-1.729946752870746e-300,-4.934778536224915e-300,-1.3705436084052535e-300,-1.027271196544983e-300,-2.4944881937083477e-299,-1.7565675750662427e-300,-1.1553396899383114e-300,-1.5870618665509373e-298,-4.296835750239e-299,-1.1326814447189729e-300,-1.7091475573106558e-300,-1.5130707063705903e-299,-1.0173875026737304e-299,-2.3667892977336373e-300,-3.4811223841147345e-300,-1.0847208836373921e-300,-1.3100225983451278e-300,-1.0122873217926093e-300,-1.4474618780790503e-300,-1.2514823627986577e-300,-3.1453285203014943e-300,-3.8444040891546895e-299,-2.969552359577032e-300,-1.0122959422746393e-300,-1.0997783890814297e-300,-2.6225227691397407e-299,-2.4040657609682275e-300,-1.925440050682958e-300,-1.4175470263278782e-300,-1.3727704470639067e-300,-1.9940452172938354e-299,-1.296057718964986e-300,-4.43334350872926e-300,-3.240830722084341e-300,-1.1035337274719555e-300,-2.8299920383404343e-300,-1.0725160364580908e-300,-1.2439036420827267e-299,-9.462345268949224e-299,-1.6035110186872942e-300,-2.5700456507265415e-300,-1.275328452797466e-300,-1.2416633503220542e-300,-1.9679644843054446e-299,-3.441469382985413e-300,-7.66732080396873e-300,-1.4929869351688871e-300,-1.4921245583969013e-300,-3.7078045857548496e-300,-1.044781995866147e-300,-1.5473696119153064e-300,-2.5212981501860615e-300,-2.7526365220517876e-299,-1.3504233917348024e-300,-1.3944894317667598e-299,-2.3387092677676216e-300,-1.1949565082762856e-300,-7.609363640234368e-299,-1.5634250391312403e-300,-1.2787355072623115e-300,-3.673753943755109e-300,-1.3179805080443615e-299,-2.2020887829883513e-300,-1.1999040781833875e-300,-1.934287785403291e-300,-1.0574334300592772e-300,-1.2643230625290582e-299,-5.5786462963444024e-300,-3.048986860696873e-300,-1.9621737761380936e-299,-2.1779635195090757e-300,-5.987173836863316e-300,-1.4661319722424093e-300,-1.381577252071483e-300,-1.0350050452410929e-300,-1.2613587376866106e-300,-2.091631062056746e-300,-1.5061965232483e-300,-8.451756594031542e-300,-5.87855053617545e-300,-3.436600982663289e-300,-2.1819897932763744e-300,-1.96385363140363e-300,-1.3906839611807993e-300,-4.680702046327089e-300,-9.320538671731278e-300,-3.087029982902468e-300,-2.1866294081793703e-300,-1.7070416013730412e-300,-1.154573550530489e-300,-2.1415582835967164e-300,-2.6885738431557932e-300,-1.1786448014316901e-300,-1.2139272432372463e-300,-1.5738873183669864e-300,-1.600513619261561e-300,-1.114783964079459e-300,-2.903193920615115e-300,-1.2401159086751561e-300,-5.7846634589542534e-300,-4.212356128446264e-300,-1.0443934053984269e-300,-7.521213031006363e-300,-1.0928652914151092e-300,-1.6107310336093127e-299,-4.9222804133688764e-300,-1.2111969273730021e-300,-2.354801044242361e-300,-1.1148390342162535e-300,-1.9504239345246572e-300,-6.470565236290347e-300,-2.2489749851805333e-300,-1.1677223531327089e-300,-4.9052660893424915e-300,-2.17723709920189e-300,-6.681208359039899e-299,-1.7953650813015668e-299,-2.2583196887991276e-300,-2.3600736512727603e-300,-1.9928169593021614e-300,-5.186114549775053e-300,-1.7823460199318353e-299,-1.6296463912624706e-300,-1.6628712350282614e-300,-1.271053926433271e-300,-3.8699545867519183e-299,-1.0313915319850646e-300,-1.6316410942888235e-300,-2.0004367971793e-300,-1.5209674611035482e-300,-1.0678433921435998e-300,-1.1203382161472726e-300,-1.4665239355626046e-300,-1.534628818989462e-300,-2.03906503992254e-300,-2.4516131786392394e-300,-4.6948915911364384e-299,-2.0215117077131834e-299,-1.727983579098409e-300,-1.947775382887405e-300,-2.000347645371094e-300,-1.7035217572229343e-300,-9.40367228316503e-300,-1.3626793461826523e-299,-1.42925328152968e-300,-2.928320552135353e-300,-9.98315630280451e-300,-3.401755712705265e-300,-1.22668670393783e-300,-1.0578943021662423e-299,-1.496746256821104e-300,-1.2595160955844952e-300,-1.2833263447682855e-300,-2.5831120567931117e-300,-4.992085220290785e-300,-1.1392629081041242e-300,-1.0281960903084179e-299,-6.094607605751725e-300,-1.1002568791774632e-300,-4.18018735057877e-300,-1.2872599705275855e-300,-3.7422292397488516e-300,-1.8215850141771445e-300,-5.816216062950534e-300,-3.325136904782418e-300,-1.507789684591738e-300,-2.543264676203946e-300,-1.237892793160116e-300,-1.6997929219609052e-300,-3.702044829914117e-300,-1.658942507833538e-299,-1.8006278990231457e-300,-3.095870639207647e-300,-1.3659061007380341e-300,-5.6084129247972104e-298,-1.2213418108796223e-300,-2.3673746859637104e-300,-2.6242041662921e-299,-2.2055895250039908e-300,-1.1035231610662567e-300,-1.2048120578711457e-300,-1.4076656115403331e-300,-3.192526244342876e-300,-4.874886923516752e-300,-1.762450736723215e-300,-1.3611850758035748e-300,-4.0281116716190846e-300,-1.6760890286837052e-300,-1.3669232064091048e-300,-1.2531678442600982e-300,-1.903551631659206e-300,-1.856405046961231e-300,-1.200761890293727e-299,-4.041069789488532e-300,-1.3116455909419394e-300,-2.1464322729841008e-300,-3.221142621350788e-300,-3.3467060031960845e-300,-1.618487096950734e-300],"im":[2.3965891508745754e299,6.897536826297146e298,8.738632450804174e298,8.836330669900418e298,5.6691729083586175e299,2.610181587226479e299,8.49783553800417e299,4.3474749323311684e299,5.248472093549146e299,5.1742975496064926e299,8.028553495359248e298,5.71299018980187e297,1.5342827650797998e299,6.726563040346412e299,7.52842247298787e299,2.625895563197185e299,5.481526111997572e299,5.643917622334043e299,9.998426633455005e299,8.874010209532847e298,6.823568025325e299,6.0040795042761076e299,2.323773972276435e299,1.8156665426276942e299,3.802822436199225e299,2.7655796990638117e299,1.7183066381070214e299,3.5748581178856665e299,8.870155472658962e299,7.374677092102502e299,9.016367021627516e299,8.515868797772897e299,9.870419187862901e299,6.551307188017452e299,4.416131819890561e299,1.3487494997708184e298,3.2706755309750937e299,6.744654858059212e299,2.2411731043734065e299,6.888621990292721e298,4.185559362252529e299,5.114911126542588e299,9.117289754690897e299,3.227424550067151e299,4.457783256681847e299,3.469904126292847e299,7.634328257540216e299,8.347097771503591e299,5.612811719482336e298,5.249331292370137e299,5.324402936190542e299,7.696469651467166e299,2.8503078035899154e299,6.0504484344641865e299,3.0084710744513602e299,7.331754630933542e299,6.80438037629294e297,5.304544228713415e299,2.3010004358510527e299,4.2426518329186074e299,7.516974560702582e299,3.944354151516907e299,9.039672277822182e299,7.14582625041559e299,4.9987270788481714e299,5.197944964749901e299,1.8063891343058746e299,3.5668503915752275e299,1.3054813733511784e299,4.167923957106954e299,5.032097043322637e297,4.481715028956772e299,5.609291166843265e299,8.149714023224592e299,2.1819799656905484e299,6.7614852486285405e298,7.143337796372729e299,5.508102034924476e299,4.974729592674825e299,3.406435058296344e299,4.733882376717102e298,8.81797926578538e299,2.105355398724389e299,6.495695771216903e299,8.755625774770515e297,9.697716036275143e299,7.777935506325351e298,6.288217647956085e298,2.317311508641544e299,9.835985687258911e299,3.652264227828437e299,8.866028855362034e299,5.9212184566337124e299,2.5539179294076767e299,8.191808526069429e299,3.534404807871914e299,7.038711584129607e299,1.0244539269606225e299,5.875955772194035e299,8.5848335062278e299,6.648481583019506e299,1.4426151278017319e299,1.4801062321976666e299,2.0645416602170984e299,5.517258570647095e299,5.515695122867357e299,6.697348221249431e299,1.2002705313729735e299,4.9102096738821156e299,6.058405308761059e299,4.989955543968354e299,4.983166449362875e298,1.3092123911507736e299,9.03795461561783e299,1.7601882239876688e298,9.636260157473556e299,2.4199401274149768e297,4.945031117309691e299,7.141563009312706e299,4.7803674850339875e299,1.5158727458248912e299,9.609338926453993e299,3.038490141146235e299,1.625780465437814e299,4.7546467621709e299,1.634504237046215e299,3.8315446152192666e299,2.9577547430286402e299,7.372080112236161e299,8.104799166246189e299,9.198674033708569e299,1.1502046671889543e299,5.829591921176081e299,3.4980864261036e299,6.647840727102332e299,3.727162513278888e299,7.224482348205876e299,3.595163473704508e299,2.4496052970305083e299,2.748815010133299e299,7.897726135752794e299,6.956929778483616e299,1.9615919880547917e299,8.465964934805822e299,2.6041618136700252e299,5.083787101630071e299,7.548595362128675e299,5.691197771073242e299,8.464193861343406e298,1.284964533753843e299,6.944204064777374e299,7.864924942442164e299,6.6765549543874155e299,4.281704182336066e298,6.3316162748568554e299,8.528693122156445e299,5.687327847402546e299,4.743626739952683e299,6.218000575717437e299,3.3186601195443167e299,4.603940010612316e299,5.504158853641741e299,8.804418710219696e299,5.9328475606284406e299,1.6648690084524498e299,1.2549404409218036e299,7.718445566075178e299,4.6161483283502e299,6.876500968901377e299,3.8964838476737176e299,4.811149173082403e299,5.25033595232026e299,8.226691776823491e299,2.833950559214902e299,6.773039776846644e299,1.632540882682092e299,1.4486664304223052e299,3.609842481921493e299,5.818480824987042e299,4.014633715453733e299,3.3246528397940846e299,8.914603202382342e299,5.660913114733324e299,8.805609580070071e299,6.990528923479766e299,9.404922846460738e299,1.407948797220815e299,7.159168286518214e299,5.8460439906929246e299,8.627487149301933e299,7.757039869526592e299,6.121899714171728e299,6.082408381228255e299,3.027040014164806e299,9.412997698325334e299,7.72302986085275e299,6.27231288110417e299,4.371317797883412e299,3.781660095893149e299,3.4691712432015766e299,4.7047894714775774e299,1.3803864890619622e299,2.5143851443005396e299,2.26691948905418e299,7.745908667123384e299,1.4897218742518482e299,6.468276038246805e299,9.85809698860259e299,3.671574942751011e299,2.3092954940703204e299,2.437650221569321e299,7.443400692293015e299,8.920478003856771e299,4.996191913227271e299,1.2746496172430532e299,6.2892536720550154e299,7.019700001262646e299,1.3614828667538094e299,4.633034242090095e299,7.978154575629519e299,5.203297442817112e298,3.714496958040254e299,2.6031792233056364e299,7.658411842792923e298,6.413598098817202e299,2.221337449215608e299,4.329814674438926e299,9.840008849814954e299,4.0580174987533525e299,7.878779354143295e298,8.205433954884274e299,2.8609101360574177e299,5.610302100377576e299,6.277954182101769e299,9.309690902039545e299,7.212813856509475e299,9.311283027965298e299,4.405228937035506e299,5.226052489780051e299,8.237712524474967e299,8.24170818487935e299,2.6595805820117536e299,8.607493316538437e299,4.77507565864e299,8.820330846612495e299,6.938156855574394e299,2.420715496984005e299,5.242346856735927e299,1.6297963188266997e299,8.622914353231948e298,2.862132899097978e299,8.630118076670763e299,5.0130256703214116e299,4.665743435676932e299,5.9884907596180464e299,7.808377858748868e299,5.897036881964668e299,7.536112937087476e299,3.0298818838957466e298,9.96116954894201e299,1.0026001953444141e299,5.781115019218742e299,8.078068908843052e299,2.2638597641600412e299,8.39060549790775e299,5.9125889502476885e298,4.0024521068921183e298,6.939731059340686e299,5.09451021885357e299,4.653019102473311e299,4.554436007278959e299,7.069472636042072e299,5.181276628441938e299,4.691023630887972e299,3.629989233805855e299,2.9347302681980406e299,7.725170613774748e299,5.470844536263513e299,1.860442387739485e299,6.4163967081034046e299,8.610553164365658e299,4.88346887715877e299,6.090693903216742e299,2.7876073869020023e298,4.0733407091808306e299,2.5268244018562425e299,9.48229354500485e299,8.306981674727422e299,3.819436754488272e299,4.285675108240306e299,9.153394535876241e299,6.084348982872246e299,1.5056562690168597e299,1.371437932163373e299,8.308916638913899e299,3.2814979135102207e299,3.810765053566303e299,8.434260601945088e299,4.7653679578428144e299,2.6877858503640085e299,1.35285502882478e299,5.780524737773334e299,2.0264333903928257e299,7.296374911875929e299,9.734527779648605e299,4.008838376233737e298,5.692920751780862e299,8.655463053064457e299,6.300951595373139e297,2.3272939859159794e298,8.828607590089972e299,5.850869901329645e299,6.609076468070053e298,9.829096557329086e298,4.2251331834125176e299,2.8726367236132224e299,9.21896144053853e299,7.633456104217129e299,9.878618238833118e299,6.908644815759265e299,7.990524115447586e299,3.179318133369882e299,2.601183374091876e298,3.3675109205430375e299,9.878534114766773e299,9.09274095515945e299,3.813122279689596e298,4.1596199914151025e299,5.1936179453901855e299,7.054439686494749e299,7.284539102213401e299,5.0149314134266375e298,7.715705754205039e299,2.255633920608675e299,3.085628611163158e299,9.061798249618187e299,3.5335788456366846e299,9.323869909697855e299,8.039207911037649e298,1.0568204515655432e298,6.236315113186093e299,3.89098146843152e299,7.841117304381268e299,8.053712785680812e299,5.081392514829509e298,2.905735570230521e299,1.3042365456814897e299,6.697982255865352e299,6.701853369898108e299,2.6970137634597482e299,9.571374736133141e299,6.4625800603788375e299,3.966210818526972e299,3.632880665459637e298,7.405084998678556e299,7.171083388800171e298,4.275862817931766e299,8.368505406464469e299,1.314170339701626e298,6.396213281550596e299,7.820225483070647e299,2.7220113685073177e299,7.587365624123033e298,4.54114297173317e299,8.333999510310564e299,5.169861524982458e299,9.456860087579626e299,7.909370869180177e298,1.792549566469708e299,3.2797779908157465e299,5.09638856741923e298,4.5914451323105965e299,1.6702371223012637e299,6.820668390926139e299,7.238104119770639e299,9.661788651156392e299,7.927958717232542e299,4.7809578760829764e299,6.6392398638882514e299,1.1831859908343545e299,1.7010996058402418e299,2.9098519294056137e299,4.5829728584497476e299,5.092029181855409e299,7.190706356826909e299,2.1364316508560767e299,1.0728993626011652e299,3.2393595317781346e299,4.573248655027553e299,5.8580880465693414e299,8.661206551462508e299,4.669497009068156e299,3.719444055984047e299,8.48432028703905e299,8.23772598869472e299,6.353695009357894e299,6.2479943186073994e299,8.970347907953245e299,3.444482274846197e299,8.063762370957104e299,1.728709037432541e299,2.373968319646449e299,9.574935985147367e299,1.329572764230289e299,9.15025857125665e299,6.208361167284449e298,2.0315786912180125e299,8.256295713769082e299,4.246643267145918e299,8.969904796193409e299,5.127090486836712e299,1.5454600386245577e299,4.446470087881953e299,8.563679519512909e299,2.038625391133555e299,4.592977036660684e299,1.496735240485303e298,5.56989779078827e298,4.4280710342287934e299,4.237155901726675e299,5.018022329307037e299,1.9282258237882056e299,5.610582843157719e298,6.136300521153611e299,6.013694740368785e299,7.867486809203441e299,2.5840096507161017e298,9.695639037052719e299,6.128798811823662e299,4.9989082454893956e299,6.574762613754033e299,9.364669083100188e299,8.925876004113264e299,6.81884540545442e299,6.5162336822169814e299,4.904208450545491e299,4.078946910193422e299,2.129974634319387e298,4.9467930172476755e298,5.787092030826815e299,5.134062216751032e299,4.9991310376176395e299,5.870192122642395e299,1.0634143448302158e299,7.338483575034394e298,6.996660514431248e299,3.414926686461264e299,1.0016872116076914e299,2.9396584718446596e299,8.152040751643146e299,9.452740202421995e298,6.6811591840815494e299,7.939557132344043e299,7.792250225959147e299,3.871299339764154e299,2.003170931328273e299,8.777605176878136e299,9.725771274816264e298,1.6407947232833498e299,9.08878661815399e299,2.3922372758281863e299,7.768438566377143e299,2.6722040151316654e299,5.4897245652392735e299,1.7193309003254353e299,3.0073949693973147e299,6.632224707590891e299,3.931954111408456e299,8.07824397658202e299,5.8830695614756756e299,2.7012098608843662e299,6.027936443113568e298,5.553618271395815e299,3.2301091245076654e299,7.321147474630023e299,1.7830356170434048e297,8.187716093005857e299,4.224088421359968e299,3.810679111194926e298,4.533935207178637e299,9.061885017744172e299,8.30004973362368e299,7.103959859513465e299,3.132315675625188e299,2.0513296322340093e299,5.673917455753803e299,7.346539554216392e299,2.482552822568729e299,5.96627018545272e299,7.315699926018457e299,7.979777047267161e299,5.2533379361418376e299,5.3867554477774696e299,8.328045785625183e298,2.474592254261878e299,7.624010684790732e299,4.6588937959348664e299,3.104488430197634e299,2.9880126878339654e299,6.1786096527060514e299],"qre":[-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0]}

},{}],58:[function(require,module,exports){
module.exports={"re":[9.529356524316365e299,9.673378137849864e299,7.215471115741931e299,7.657603360607688e299,4.665893949280149e299,8.772591131615282e299,7.936906260873572e299,7.6663112216295e299,2.393271771141057e299,3.601744629663759e299,6.6843171345290856e299,8.768207341454737e298,8.269168562878946e299,5.777045650627429e299,1.1759551594618545e299,7.550311445042435e298,2.1681454404418e299,7.072147357643892e299,4.765093472851192e299,2.5935275927962032e299,3.933135386511171e299,6.55253839704169e299,4.070929993049499e299,6.659524016868797e299,7.934577640195952e299,4.379583080046934e298,8.487129603318371e299,6.750524627581434e299,6.494005501821465e298,4.1810382890934305e299,3.863744002451999e299,1.2821121696096284e298,9.868528601220224e299,6.47158771422893e299,7.028251524846505e299,9.007479033023243e299,9.318855462318639e299,6.02879443192405e299,6.913123137141892e299,7.175542375707567e299,8.925904316245907e299,2.0031000086207064e299,9.81841926367039e299,6.89393658074339e299,6.89883251719109e299,3.538160500662493e299,2.7734196685754544e299,1.6535812317030941e299,5.562624462499009e299,6.411934326259819e299,4.755408511215629e299,9.783022460331747e299,7.45315295504053e299,6.0275540459278524e299,2.446985444154797e299,7.341023306261398e299,7.765997635181617e299,7.5081623132946975e298,9.53953274186805e299,1.9990175701660952e298,3.1467227096243947e298,7.183139075475654e299,9.424473653559807e298,6.878805888107186e299,6.0051068407407686e299,7.361771638634043e299,7.289778982667079e299,8.892539777842941e299,8.549829251917185e299,8.813992914941515e298,7.0840671340911995e298,1.9052008111108765e299,2.750163686338021e299,3.2759405660290943e299,2.9769697288330767e299,4.153503469128963e299,2.5248341878362937e299,5.101620487030605e299,5.101244415102451e299,1.6884678574113044e299,8.210182918846923e299,9.588178156209737e298,5.884987213239202e298,1.2240979459603098e299,8.210371717970844e299,7.121166997954511e299,3.619777545013481e299,7.80613761204176e299,6.439093090567347e299,6.484096145297196e299,2.469191828110553e299,9.779131468875245e299,9.44332068307628e299,1.9292525945202076e299,5.5379701183575604e299,1.3298400491074093e299,9.334442497589479e299,4.17053764158829e299,9.482159867506104e299,1.686544628700919e299,8.923832620976748e299,3.2291887681555777e299,6.549140237714391e299,3.9557856065972396e298,6.172306467519873e297,3.2069434006870127e298,6.065639843879176e299,2.2823832704739845e299,5.337751431566178e299,3.979280104925449e299,8.106616496787045e299,7.311575988154565e299,1.9287127118723758e299,4.1853531607517704e299,5.545157461519488e299,4.168282254934057e299,5.178376391228046e298,8.726093334545042e299,5.070050571871736e299,4.621945704377395e298,3.558935729205439e299,1.20538180745982e299,2.4474387232097117e299,8.949550764396182e299,7.758191812141823e299,4.538666611000777e299,3.65407921648677e299,6.427614208896569e299,9.014619831057738e299,6.685961498365656e299,3.249017574418125e299,9.286456612037042e298,7.807409733896722e299,3.7016654314534e299,7.109162447662085e299,7.32030949935242e299,8.746807040596634e299,1.9287521187533807e299,7.284888382030051e299,9.748521637430188e299,9.398450600155185e298,2.8426228212315554e299,9.783373519613725e299,3.3470814414690024e298,2.0526941347580597e297,6.8604423859387475e298,7.75727746623034e298,7.965904837229126e299,4.405335596328386e298,5.067623282810554e299,1.787237403586306e299,1.0386906920762785e299,1.370577042411625e299,1.4196588918599384e299,5.35186867531738e299,4.226454640609758e299,2.347164993776181e299,2.851767656939086e299,2.304728879653162e299,3.2342329269176264e299,9.426021988561618e298,2.5897218109920406e297,9.507599075096908e298,9.164635682068879e299,7.674569790948485e299,3.3661699505202525e299,2.505963472606465e299,8.988459267207266e299,7.44668898853176e299,1.5803610631963828e299,6.253156687660828e299,4.797921803268823e299,3.495531689884719e299,3.480194848180049e299,5.478676481050091e299,3.8927369196204524e299,3.8556199364331344e299,6.0271779815211126e299,9.549549116652876e299,9.388344039736234e299,6.283618672380545e299,2.0573900479399667e298,6.668132401608815e299,2.746093141447097e299,6.066898321915937e299,2.9201704122877173e299,4.790134326414415e299,9.311447076094935e299,8.34946477227303e298,2.116217277326311e299,2.464967959002822e299,3.6692461354824514e298,2.7043941068350796e299,6.6935305719084644e299,2.5258925801255616e299,6.072512926573721e299,6.745670421005802e299,3.547714980371983e299,9.770804789730706e299,5.325496937857275e299,8.277959376510827e299,5.8204178712464284e299,4.112911400241775e299,6.701087274996388e298,4.262981827458543e299,9.529128073591768e299,5.2837145128213584e299,8.75473713291963e299,1.7694371307224556e299,2.194174899113277e299,1.1776607243787796e299,9.615738834206522e299,5.901022249222192e299,7.659343422516113e299,3.097926197979568e299,5.047495203970634e299,5.684642166404262e299,3.1067742874602235e299,7.422932501215156e299,9.435194599153474e299,9.76803617492581e299,5.0852609636840686e299,6.272036972480206e299,7.88692580466381e299,6.650546293754154e299,7.915662422013279e299,8.094523506421595e299,2.009643598178943e299,4.244029982878133e299,9.279629863932237e299,2.630699434334627e299,5.529060821093115e299,8.454843505951105e299,6.574205586548399e298,5.758859526581661e299,3.2756136148906867e299,2.8914883842412634e299,4.49554342487897e299,5.569140271864459e298,6.453413003222398e298,4.134913549773818e299,3.0756706478354913e299,1.3911017337551757e299,8.68542772973592e299,9.337374713311072e299,1.4836501883661636e299,2.3233998637661956e298,6.207654496331874e299,7.949877341366534e299,3.170389915346108e299,5.9647405606067895e299,7.32721052031905e299,2.5849481384203733e299,1.2117906029732395e299,6.013529645707914e299,9.162871643468991e299,8.751968513121366e299,3.86964449897746e299,2.4865830693556966e298,3.24618683656152e299,2.0309645232747343e299,5.891445805520979e299,9.390116533873334e299,7.065689647874067e299,5.231563741683765e297,2.001561523399118e299,4.783708941251526e299,9.251214419103828e299,7.226672660376412e299,4.7252560077177575e299,4.844001934125517e299,1.7337506452021367e298,1.6499200767905965e299,3.839175775605892e299,3.5330313121191306e299,3.5789399908875e299,7.418514532923815e298,9.892870847126087e299,1.920594185206375e299,6.647647471316683e299,2.577119504959009e299,4.241693930576167e299,9.079332718398588e299,7.405841374443319e299,7.9727732353450435e298,6.882273183913253e299,7.34791965467849e299,2.971287578444466e299,9.357131237411218e299,6.352395889278175e299,6.186844711449713e299,4.324337265148839e299,5.187336022953731e299,9.407949941753002e299,4.4924625674320766e299,4.887645594133734e299,5.533163957649743e299,9.763490223335372e299,9.597861235121227e299,4.7442882312941296e299,7.573477360919898e299,2.6613606841211638e299,7.336437223351126e299,2.275343551217788e299,5.595982731554086e299,9.6233223643227e299,2.500624011028374e298,2.097421646223441e298,4.113124827219568e299,2.241963163305456e299,3.192163671990869e299,8.693652775807743e299,1.8317429083403858e299,8.699205526614946e299,8.255488286598509e299,5.8980613656391894e299,6.346931906069913e299,1.503985905111156e299,2.455856783870729e299,9.429931331845254e299,9.558585888951592e299,2.086718663703653e299,1.1151698138544287e299,2.702632571018564e299,4.7608017720855595e299,8.905443205052733e298,5.665182515874028e299,6.315695341698957e299,6.820450233564586e299,7.394619622291403e299,5.0289900393161395e299,2.784988671526969e299,9.14928755714872e299,3.946467623165151e299,6.122812530987281e299,1.237330249208757e299,3.828462819271528e299,7.186005969756302e299,3.4929083991488065e299,8.554031106125144e299,8.720355255316182e299,7.895996255717805e299,7.787218180645679e299,5.01090307411338e299,7.977194233044218e299,5.796759587031069e299,9.133866367646178e299,3.301166502628521e299,9.01899965429882e298,8.074764510094137e299,4.161571474226718e299,9.884402224557088e299,8.081209363104212e299,8.030478164316e299,8.956386605516849e299,3.2086509656891395e299,7.18553413952753e299,2.830103675783318e299,5.3164073731265864e299,9.451959983675077e299,5.464802685530592e299,2.7873315359576403e299,9.270308675808514e298,9.396063894372752e298,3.893801835491717e299,1.8603672397169093e299,8.641679960105438e299,4.496352148023905e299,2.9829586407170375e299,9.317933080658949e299,6.169809868007273e299,7.360452391951222e299,1.516956379077339e299,8.441800095746253e299,4.505314287801785e299,8.1613268196686e299,6.204666497572409e299,2.5410758044413464e299,4.875109344097464e299,4.7868343265574366e299,7.861946216874498e299,8.238227979130964e299,2.1655797209590543e299,5.170457274922746e299,6.989399962942788e299,8.021194929409814e299,1.0087906282852077e299,6.544607163070739e299,7.256866879368808e299,7.250469396719919e299,2.6232995489147218e299,4.804545222104071e299,4.8833347304617796e299,1.5369843830148122e299,5.22844301281314e299,9.685159843645784e299,8.264637016783785e299,7.856960458283746e298,2.8316023163220594e299,6.682099899474752e299,6.225222311679324e298,3.057534750572908e299,1.9794861289752053e299,6.417193180743088e299,7.883785048241196e299,1.6863234807873286e299,9.811617391630621e299,2.317180082513253e299,4.1794200715443245e299,4.701142657091484e299,5.6887264605537664e299,7.454485510692009e299,6.910174243539094e299,7.321307284682846e299,6.240265346135961e299,7.002387478552397e299,9.483814510867762e299,5.4488625734961205e299,3.4879998883328316e299,7.861764409755339e299,7.832637803897503e299,4.287527288498663e299,2.542601569328298e299,5.2622519765778654e299,1.7470820810938514e299,6.319412487462804e299,7.1378731532936e299,7.42794595271411e299,8.923400901775501e299,5.245931592827655e299,3.2818647566283855e299,4.988077281512236e299,6.217102035716509e299,2.214437034906549e299,6.386941472460091e299,2.1346908840966927e299,1.4674994801656395e299,1.7190096552717038e299,9.256230300453101e299,4.59931059977476e299,7.619354365080315e299,7.605186537825321e299,6.22797929741723e299,6.4109756513583554e299,8.44139228700594e299,9.538336165982547e299,7.118571638676479e299,6.731480543434422e299,8.493198762840222e299,7.21656369044712e299,2.6509358326051037e299,1.0169507884639883e299,3.0646898760774003e299,8.220894644116532e299,5.266419599085506e299,5.300088434336512e299,9.733785172807963e299,8.225703032017593e299,1.2246897554286985e299,2.8652176897035144e298,1.08906574950284e299,8.092584320596887e299,6.248066117089237e299,7.847509068006177e299,9.47904241516313e299,8.617625468277236e299,6.308992484746692e299,2.5055557714691235e299,9.643234571510414e299,6.447143079127896e299,3.828673839855819e299,5.315007656171745e298,1.1034935544279435e299,8.076546770186313e299,2.3578176762021896e299,3.292601814593288e299,1.7108783560955753e299,3.213157525077255e299,2.9130111417141504e299,8.833952715396087e299,4.5086616096611314e299,5.9514293905575815e299,9.46867848369287e299,7.571598095141168e299,2.042167337652319e299,4.526211977001491e299,6.834085131517453e299,4.4576082850898026e299,4.606262542867737e299,7.690866816476973e299,4.9920318747037355e299,8.887280777020461e299,9.902112033641113e299,8.498856192589833e299,2.357312373609384e299,4.408713906134581e299,5.088035505470306e299,7.587544445023557e299,6.476211510182275e299,4.220514884745612e299],"qim":[0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,-0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,0.0,0.0,-0.0,-0.0,0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,-0.0,-0.0],"im":[-0.1784265352673522,-3.6783074493456214,-0.8057832025239442,-0.43898090446522176,6.380877157828007,9.954392078132553,0.10173902873901852,-9.627893011664238,1.6199970411888067,9.310965981820427,5.600048603852823,9.71667615107544,-6.8285691581032815,4.69061665827191,7.269419646418704,-0.35542033977540655,4.007302548063585,-6.358756583579113,1.2851295735284864,9.717486691378994,-2.386705436767005,-7.03947369189537,8.957666965321017,5.194760494768014,-1.1748344427575432,-7.150301188503683,9.827980775239517,-0.25907576502336127,-2.41310692817851,-9.938453166940135,-4.581536282406411,-5.027875031264233,1.117849060922179,3.0779497620223815,8.558018930738243,-7.146220302536221,3.469997791284584,-9.787161245645777,5.506456736747047,8.284981593646616,0.24138510471852115,-8.775187084159013,1.443674619438152,8.967229057645604,1.9433482013364944,7.64752026302892,6.673695701236806,1.8739852366750434,2.756181880966153,-0.07946781562204208,0.5812010808785661,9.02297454755276,9.200175520493694,2.5265566099989734,5.386065196755464,-4.53369330758977,-9.205398819381156,-8.285375424679287,6.793170467018253,-4.898074100552479,1.7984473640651863,-5.645097516605158,-2.6634732898477997,-8.093185433158684,-9.887698417807256,-7.723148110111171,4.449849440218902,-0.1290039899973383,7.72106757653734,-5.621288552410508,-8.941191590342662,8.345349796182209,-0.8323738145598938,-5.901450079481969,5.7564599439429855,-0.6004320795641327,0.6724301105913799,-4.131010465092992,-7.419317756780259,6.742569545079498,5.727885910367586,4.008699866023697,-6.948281418455831,-9.444991799937124,4.121063855433675,-8.527156668642624,9.739191196688985,3.099590848036634,7.589210998378807,0.03806813237403617,-7.180583686054347,-0.8613991007134523,-1.6815514809024066,-5.3702942532988285,2.5401844754314915,-4.2092747077375,-7.867501581865688,2.7888791477066466,-3.608546645939157,8.562003103995014,6.3390448079350925,-5.832148519654754,1.1525899460120357,4.4133139172515214,5.257150107274992,-1.4935352894117315,2.672454811779822,-1.5349692286433214,1.3653671619728733,-4.524405462678076,4.837645101902041,-8.507099103722231,-7.111794698068108,4.228603939058475,8.879035161030629,2.4001280567397476,6.86073924399555,1.1111923594037343,0.32891069276367446,4.6151876742691265,4.766162750841083,3.979940126840905,8.09632752010334,-1.0063733409940845,-7.874714036486559,-4.3541428813807315,-8.865492440949371,4.515371428597451,7.478832761599698,7.7234606008938975,-0.3828172585391876,8.457514280302082,-0.1591507210451759,-0.20476733180253248,-0.24950436666659748,6.5797530728050155,5.197209346992002,7.8297565180457624,5.742846162504893,-1.46413560744627,2.1205588540993823,-0.3788376946267835,-9.20629793860256,-9.53970313467519,-5.5628700160645295,1.3231573332564608,-7.46469601467195,-4.810554011496593,8.61481322184817,-0.5675510348848789,6.279983194223419,1.1846709679405176,-9.64997412515812,-8.959085862013039,-1.9679511311805697,-8.11651432359798,9.881002665638398,2.3955235322238355,2.89580146502869,5.223888590628508,9.029335317911599,5.130212846548963,-0.5259356433961315,-7.616631449936646,9.419090067722948,-7.303804421399076,9.904359125862467,-8.998284427196799,1.773223634914407,5.432139186973002,1.2888773314087523,4.703435669136828,-4.128377236286642,7.3164880203132086,5.330896611291912,-0.5288648717558466,9.111505700004358,-8.781741891952276,-6.2289160811752,-3.216467953117279,5.599684793366286,-8.49199528346337,-5.108864649708154,-1.4540186358064489,8.319887016095034,-4.532079150187682,4.093330861455762,-4.366136282046753,7.701010863446555,1.9466362232225887,3.805992018862847,5.170173032974642,0.8585118523485988,-7.2303218085435805,8.627682034024637,-5.629012458417346,-7.164186581898813,0.9171193174835288,7.916620356022875,1.3099688607484374,-8.840396689518272,4.907043563858053,6.1186651473542675,7.166140793925489,-0.786687948824131,2.7977515593786872,-4.2378573802637876,7.678171993074567,6.617475450286307,9.502603065251108,4.677349510710753,-1.473445014540605,6.3734324234443385,-8.460965377166264,-4.4101941166736935,1.2686622928704505,9.214784116125315,0.250582271384836,6.185021697663146,4.593973025950975,-0.80673656215418,-5.281116819576939,-0.2361779659921659,-4.947365615558086,-8.462235734787345,-8.85669683200836,4.839720608210056,1.7038366457764553,-8.421059608273334,9.610465946642265,-9.516525048015483,-2.8752184101615708,9.436041716509337,-3.4576669887227496,-4.232397449863385,7.717025143068081,3.3802725202629347,4.141944428049914,-4.52274409694529,-3.128818143064236,-7.440526966710341,-2.9639217715290345,6.791846610423725,-1.375941693304462,-6.166269752580398,-1.1351663515564212,-1.0279890908389397,-4.047528217091547,4.678010932700989,-3.7825860133720157,3.8735674768492956,-0.3060201820925723,0.5498674000989112,-1.1034054481236222,-1.8142197639651414,5.769929127703284,-4.465616380851696,-9.852837304413145,6.361272637378068,4.414004863922273,4.327917698837842,-4.781933852656692,-8.220079843892254,-4.745513805050736,4.606892803203451,-5.24905388009782,0.5019051801161734,5.866813081106068,-6.248622833743185,-8.30709562476815,5.390134034850709,-9.32103108826206,2.0247531694293066,6.46423950888493,-5.823259933236269,2.470927444386092,-1.3289402730467348,7.81414194929711,-0.1725822135790942,2.998570894604594,-8.907190527518548,-1.132276296111069,-7.875527043996047,9.31393238412928,5.383395780489305,-1.7359176825094238,6.674032918117252,7.829020045764427,7.512363419221412,-0.6907257390949653,5.139590305153332,-4.3406440576068706,2.358057408424031,4.053206429657781,0.7145301696760384,6.958905449619159,4.795149465438161,9.761646898241185,5.30901028728513,-2.889754094911159,-2.3570055434551263,3.958695395830727,3.0096258190408864,3.3886733620099676,-4.948866342974223,-1.7129758761869631,-7.339094661558683,-0.07577545449425926,8.562825295167698,-1.8278735725841688,-9.94590269408262,7.39789995534581,1.560274268548012,-9.642704543573766,-1.572435831325297,0.32646427267323475,-0.09712148957760292,-3.5688011212937587,9.035362884523078,3.515124772487109,-3.930937448900913,-8.618797271961238,8.386059645543082,-2.068720748109194,2.284875990840991,7.58832692672696,4.303129147715765,4.568903352139241,8.520996002575213,9.070671625305081,-9.729991845861754,-6.693264004760895,2.0997157392594836,8.951620239625289,1.1584709379210167,-7.708702755940995,3.4047830792412626,-9.464932022309767,5.261090498679938,-6.516996720944208,5.042188283795195,-8.707868401831602,-6.734683240235144,9.299593767787783,-6.460613064004508,2.4259122825985013,-8.40851802268698,-5.971382725037082,2.9580782698106134,-1.1568621954707403,-5.825393609444336,1.8238789657293974,-2.2165348883369473,-8.8758869521312,-6.473186726162736,7.565837466068878,4.832624236989741,2.5427612378079125,-8.782895161625879,-2.638691735040979,6.363336583799995,1.9087239977620953,3.4504867253876537,-1.2177636308732165,5.153179283654058,8.237890563038164,-3.450321251807349,9.077110880983412,-9.523760569478279,-9.896648712171864,-9.733000169635453,-6.708207959344792,8.418962596042778,-2.6628702831499496,-2.0257021956738175,9.412116131635663,1.8385636256923643,6.720204711773334,-2.4154334818534418,-4.338959364044199,-0.9484313566516747,-9.372515948144562,2.5234710898526913,-7.440800558569922,7.271482593883945,7.138632864994726,8.74183759208212,-7.283614897676931,-1.1966933356086393,-8.588090906910129,2.0269057267231627,-2.5391362347884705,4.597856838548665,3.8626243312995356,-7.02367671898656,3.3242731946267057,-0.9460881509559016,0.43765458840749005,5.220775381360792,2.422154711295157,7.440588176119427,5.0032315244008565,4.50837505322621,5.83666213599653,-2.022929011131702,7.551660444798195,-4.828514546329732,-4.777057798987889,2.6305185195269143,-1.3253106017104077,7.172202339500057,-8.640607708970464,3.063278156255782,6.333972752065172,-1.1561002212134532,1.6639003493572524,-1.1322143318704612,-4.039439954481496,-9.047255269425886,9.127218663923337,7.586357005116167,3.4870975393349433,-7.762080374826454,-1.8355192837993695,-2.8007104344953104,-4.648844558686949,3.3422501946448193,1.5967448174699364,-9.695758762816418,-5.786615897292582,7.146641392522959,-5.896050004723361,-1.50528447035256,-7.880318645971607,-5.098210534259602,3.267331869536104,-5.331021962649065,4.9481195406414,2.4384057584932215,-5.425236523264911,-5.033063327454164,8.18526773937695,1.4965353654551663,6.137856358049039,8.013520142478654,-8.367773429683965,-6.229193121125913,-8.197395669615052,-5.9372596138082345,9.245107568649061,-1.6464565232606176,1.2363085008845243,9.684605897962864,9.387058719872119,0.07582237642471235,0.39016155824249665,-9.958011612449344,-5.122659162630314,-8.071291918048917,-4.888719358940441,-5.781911294208961,6.873037940697952,3.7593689118346454,8.491064348837053,-0.47731293485128745,3.672445255213299,-9.544972641832267,6.380338374883117,-4.670314912277704,2.351381837512303,1.3665987893431506,0.056319502469461824,5.088845710313127,-0.5064029925773816,9.479749755275822,9.1365004023585,1.843166190123803,-2.241600214675228,0.04442186974232243,2.9412568826765693,7.873041299470366,9.196936234043154,3.8099187596421515,-1.857666054023408,3.8371384047006174,2.2755793566267677,6.982077110997725,-9.184135694723071,-6.525817018323585,3.179300433090951,8.286410879271713,-1.7655418744893847,0.718923817706445,4.899788979149227,4.463518205209924,2.811542041734061,8.081569347890923,-0.004635648016710903,3.4817346184079767,6.646916019214018],"qre":[1.0493887991789035e-300,1.0337650257744121e-300,1.3859108905838575e-300,1.3058916124387025e-300,2.1432120208267472e-300,1.1399140630139817e-300,1.2599367651973951e-300,1.3044083015813786e-300,4.178380458326398e-300,2.776432264975307e-300,1.496039131408523e-300,1.1404839792874807e-299,1.2093114227820817e-300,1.730988571799485e-300,8.50372560512957e-300,1.3244486764272538e-299,4.612236713217133e-300,1.4139976861754095e-300,2.098594719489627e-300,3.8557523073115e-300,2.5425008338882408e-300,1.5261261199956882e-300,2.4564411613743044e-300,1.5016088198900802e-300,1.2603065283955101e-300,2.2833223659026546e-299,1.178254659395105e-300,1.4813663458306326e-300,1.5398816642817994e-299,2.3917503999152058e-300,2.5881631892935523e-300,7.799629577687227e-299,1.0133222898866117e-300,1.5452158638000426e-300,1.422828987358758e-300,1.1101885403605131e-300,1.0730931540290125e-300,1.6587064151743794e-300,1.4465242122295426e-300,1.3936228756525069e-300,1.1203346625393628e-300,4.99226197242433e-300,1.0184938869947717e-300,1.4505500424724933e-300,1.4495206217981318e-300,2.8263274088689808e-300,3.60565698487904e-300,6.047480346460254e-300,1.797712584665027e-300,1.5595917692178168e-300,2.1028687601527825e-300,1.0221789881959337e-300,1.3417140450924263e-300,1.6590477536664956e-300,4.086661007276264e-300,1.362207907918052e-300,1.287664569288288e-300,1.331883832917811e-299,1.0482693723677897e-300,5.002457281638158e-299,3.1779095022940994e-299,1.3921490165965942e-300,1.0610672136817748e-299,1.4537406873610239e-300,1.665249306166622e-300,1.3583686768441343e-300,1.3717837020542074e-300,1.1245381240707471e-300,1.1696140010933709e-300,1.1345595686885522e-299,1.4116184687008728e-299,5.248790543065768e-300,3.6361472045016695e-300,3.052558432743919e-300,3.3591204852189866e-300,2.4076060305054024e-300,3.960656128697979e-300,1.960161487006356e-300,1.96030599325815e-300,5.922529088194563e-300,1.2179996595501488e-300,1.0429510003966237e-299,1.699239036153457e-299,8.169280924783319e-300,1.2179716514067227e-300,1.4042642172093993e-300,2.762600705608487e-300,1.2810432632617166e-300,1.5530137333546303e-300,1.5422349971249004e-300,4.049908106026775e-300,1.0225857001542243e-300,1.0589495301077051e-300,5.183354439125134e-300,1.8057157742421657e-300,7.519701340557472e-300,1.0713012590288488e-300,2.3977723879724156e-300,1.0546120440627092e-300,5.929282765379662e-300,1.1205947516870235e-300,3.09675299834259e-300,1.5269179826709495e-300,2.527942865084133e-299,1.620139902745003e-298,3.1182340161843e-299,1.6486306898176585e-300,4.38138507645269e-300,1.873448047966866e-300,2.5130173640257848e-300,1.2335602657364357e-300,1.3676941901719865e-300,5.1848053566734134e-300,2.38928463523107e-300,1.8033752998710685e-300,2.3990697818418733e-300,1.931107212859147e-299,1.1459882007463511e-300,1.9723669139474185e-300,2.1635909722022714e-299,2.8098287692968763e-300,8.296126536929949e-300,4.085904135277154e-300,1.1173745211639895e-300,1.2889601394425017e-300,2.2032902737914468e-300,2.7366675453781058e-300,1.5557872135758913e-300,1.109309120895744e-300,1.4956711914127e-300,3.0778534652250765e-300,1.076836991521402e-299,1.2808345329416886e-300,2.701486718661567e-300,1.4066354614373165e-300,1.3660624596384394e-300,1.1432743346900086e-300,5.1846994244461785e-300,1.3727046284837298e-300,1.0257965640250766e-300,1.0640051669617632e-299,3.517877899702338e-300,1.0221423090871448e-300,2.9876775258898674e-299,4.871646403948364e-298,1.4576319481227814e-299,1.2891120684457759e-299,1.2553501710520581e-300,2.269974620851694e-299,1.973311637808622e-300,5.5952275729759243e-300,9.62750516230257e-300,7.296196923307798e-300,7.043945596606446e-300,1.868506237105486e-300,2.366049289613879e-300,4.260458905324647e-300,3.50659703137716e-300,4.338905147708696e-300,3.091923255363819e-300,1.060892920909255e-299,3.86141861166521e-298,1.0517902491484764e-299,1.0911508484254927e-300,1.3030046337964334e-300,2.9707353303580134e-300,3.9904811499901676e-300,1.1125377222860824e-300,1.34287869620988e-300,6.327667918984507e-300,1.5991922959059556e-300,2.0842357191371903e-300,2.8607951199349004e-300,2.8734023341335187e-300,1.825258351097839e-300,2.568886674462197e-300,2.593616633607067e-300,1.6591512695757897e-300,1.0471698587906742e-300,1.0651505694374777e-300,1.5914396658019204e-300,4.860527059520312e-299,1.4996702821298673e-300,3.641537080104407e-300,1.6482887085607166e-300,3.4244576816206455e-300,2.0876241287966874e-300,1.073946929867944e-300,1.1976815607640002e-299,4.725412700833009e-300,4.056847864280313e-300,2.725355462883154e-299,3.697685915941771e-300,1.493979879910938e-300,3.9589965458875145e-300,1.6467647118937093e-300,1.482432341915241e-300,2.818715724156478e-300,1.0234571476149214e-300,1.8777590367038163e-300,1.208027189451492e-300,1.7180897009819888e-300,2.431367716652529e-300,1.4922951440004028e-299,2.3457758922612365e-300,1.0494139571607991e-300,1.8926079324941185e-300,1.1422387500817042e-300,5.6515147254296806e-300,4.557521829295039e-300,8.49140995618669e-300,1.0399616891035484e-300,1.6946216397198112e-300,1.3055949378902475e-300,3.227965858748309e-300,1.9811806838634452e-300,1.759125677091713e-300,3.218772615816569e-300,1.3471764694563732e-300,1.0598615529241124e-300,1.0237472323935116e-300,1.9664674185679154e-300,1.5943783564856143e-300,1.2679211454083486e-300,1.5036358756560312e-300,1.2633181491153823e-300,1.2354031700651362e-300,4.976006695446691e-300,2.3562510256391725e-300,1.0776291885162008e-300,3.801270441421319e-300,1.808625429087424e-300,1.1827540028341514e-300,1.5210963314656878e-299,1.736454927202538e-300,3.052863119917676e-300,3.458426481842511e-300,2.2244251817608062e-300,1.7956092882990284e-299,1.5495676466091162e-299,2.4184302476038478e-300,3.2513234169066564e-300,7.188546859909192e-300,1.1513537745255118e-300,1.0709648383013171e-300,6.740133272932937e-300,4.3040374392508367e-299,1.6109143970414327e-300,1.2578810427634928e-300,3.154186162274715e-300,1.676518852478423e-300,1.3647758546405965e-300,3.868549566379643e-300,8.252250822430939e-300,1.6629168872789017e-300,1.091360917090625e-300,1.1426000887694609e-300,2.5842167161976932e-300,4.021582919645278e-299,3.0805374131183296e-300,4.923768921318215e-300,1.6973762180123634e-300,1.064949509830534e-300,1.4152900139066837e-300,1.911474368614216e-298,4.9960992370685005e-300,2.090428185077618e-300,1.0809391661434118e-300,1.3837626899623727e-300,2.116287452715156e-300,2.064408754577694e-300,5.767842121745314e-299,6.060899640334017e-300,2.6047257496101014e-300,2.8304306179505518e-300,2.7941234067800663e-300,1.3479787571513673e-299,1.01082892463971e-300,5.206722001465116e-300,1.5042915622629015e-300,3.880301235840073e-300,2.3575486972115543e-300,1.1014025270530894e-300,1.3502854698601587e-300,1.254268709872221e-299,1.4530082914136825e-300,1.3609294153934993e-300,3.365544308987829e-300,1.0687036171961013e-300,1.5742091919803667e-300,1.616332794242185e-300,2.3124930797125995e-300,1.9277717803031163e-300,1.0629308257285092e-300,2.2259506562157223e-300,2.045974857915687e-300,1.8072842367475376e-300,1.0242238965016173e-300,1.0418987892226693e-300,2.1077977375063987e-300,1.3203974242533907e-300,3.757476414100634e-300,1.3630594381931092e-300,4.394940708908724e-300,1.786996222059973e-300,1.0391421612429598e-300,3.9990018315018617e-299,4.7677585563235324e-299,2.4312415547961627e-300,4.46037658587415e-300,3.132671450321738e-300,1.1502644812117978e-300,5.4592814059590385e-300,1.1495302610572097e-300,1.2113153883621193e-300,1.695472356096158e-300,1.5755644062348393e-300,6.648998481977744e-300,4.07189868142017e-300,1.0604531091578155e-300,1.0461798550723514e-300,4.792212852618717e-300,8.967244159377303e-300,3.700096012766995e-300,2.100486531204451e-300,1.1229087390424591e-299,1.7651681957253225e-300,1.5833569320508015e-300,1.4661788676044162e-300,1.352334604183637e-300,1.9884708304890254e-300,3.5906788786028146e-300,1.0929812772347048e-300,2.533911577356306e-300,1.6332363516587263e-300,8.081916696366844e-300,2.6120143963949426e-300,1.3915936115398368e-300,2.8629436725099687e-300,1.1690394710909416e-300,1.1467422722146222e-300,1.266464632978847e-300,1.2841556211759881e-300,1.9956482598237805e-300,1.2535735883898427e-300,1.725101731383293e-300,1.0948266153117616e-300,3.0292322401907325e-300,1.1087704161551436e-299,1.238426208900477e-300,2.402938424086096e-300,1.0116949687817963e-300,1.2374385504298738e-300,1.2452558609069769e-300,1.116521700150853e-300,3.116574568855371e-300,1.3916849890100902e-300,3.5334394586206083e-300,1.8809694777243878e-300,1.0579816268024271e-300,1.829892234989098e-300,3.587660768371535e-300,1.0787127321979756e-299,1.0642754362269654e-299,2.568184109640798e-300,5.375282786382377e-300,1.1571824050607388e-300,2.224025092072667e-300,3.352376349943699e-300,1.073199379458606e-300,1.6207954886671092e-300,1.3586121433154256e-300,6.592147366875715e-300,1.1845814739250826e-300,2.2196009781326842e-300,1.2252909632169419e-300,1.6116901696348263e-300,3.935341079759127e-300,2.0512360429633223e-300,2.0890633178006254e-300,1.2719496832141242e-300,1.2138532734626849e-300,4.61770116482776e-300,1.9340649130785853e-300,1.4307379822329757e-300,1.2466970430222151e-300,9.912859734827727e-300,1.5279755913276213e-300,1.3780051592829805e-300,1.3792210480226228e-300,3.8119931839797225e-300,2.08136244695823e-300,2.0477809840928878e-300,6.506246979806579e-300,1.912615280589918e-300,1.0325074816974524e-300,1.2099744949103086e-300,1.2727568190134908e-299,3.531569367053246e-300,1.496535542784395e-300,1.6063683350293698e-299,3.270608779876089e-300,5.051816152496645e-300,1.5583136923489087e-300,1.2684262621075536e-300,5.9300603436602173e-300,1.0191999545895533e-300,4.315590348573094e-300,2.3926764548232958e-300,2.1271424267279792e-300,1.7578626902420186e-300,1.3414742017617373e-300,1.4471415115689513e-300,1.365876285635673e-300,1.6024959589566342e-300,1.4280843541761987e-300,1.054428045649852e-300,1.8352454049109483e-300,2.8669725688494003e-300,1.2719790976681282e-300,1.2767091049485298e-300,2.3323466714311313e-300,3.932979559452483e-300,1.9003270927560513e-300,5.723829525936744e-300,1.582425584631353e-300,1.4009775440441583e-300,1.3462672000657306e-300,1.1206489666972474e-300,1.906239115598115e-300,3.047048169734292e-300,2.0047804866744766e-300,1.6084664434572883e-300,4.515820428564142e-300,1.5656946353930263e-300,4.684518997340245e-300,6.814312464949753e-300,5.8173029856655554e-300,1.0803534133663994e-300,2.1742388958227188e-300,1.3124471603303083e-300,1.3148921397606465e-300,1.6056572320571205e-300,1.559824985122382e-300,1.1846387017688144e-300,1.0484008768388692e-300,1.404776197751274e-300,1.485557290922209e-300,1.1774126897574084e-300,1.3857010661788291e-300,3.7722527558024254e-300,9.833317514905604e-300,3.262972895906628e-300,1.2164126208765764e-300,1.8988232539876736e-300,1.88676097085762e-300,1.0273495687921824e-300,1.2157015590127874e-300,8.16533326556613e-300,3.49013620707988e-299,9.182182071711478e-300,1.2356992035966117e-300,1.6004952272590006e-300,1.2742897030561453e-300,1.0549588831888252e-300,1.1604124635970188e-300,1.5850391364670493e-300,3.9911304764677166e-300,1.0369964482191069e-300,1.551074619760525e-300,2.6118704330208978e-300,1.881464834465117e-299,9.062128147349305e-300,1.2381529240830875e-300,4.2412100396614686e-300,3.0371118535130945e-300,5.8449509074515215e-300,3.1122034702483396e-300,3.432873927875036e-300,1.1319960975760816e-300,2.2179531013310165e-300,1.6802686117499436e-300,1.0561135872574174e-300,1.3207251460450842e-300,4.8967583682422554e-300,2.2093529977853058e-300,1.4632536480826046e-300,2.2433554858215947e-300,2.1709574534529822e-300,1.3002435536363628e-300,2.0031923375075554e-300,1.1252035634855444e-300,1.0098855644155838e-300,1.1766289219858805e-300,4.2421191658569045e-300,2.268235184434474e-300,1.9653950899612803e-300,1.3179494462874218e-300,1.5441126319419032e-300,2.369379157065274e-300]}

},{}],59:[function(require,module,exports){
module.exports={"re":[4.535174348644354,-3.561285277384374,-9.178441881450636,8.791308291121016,-4.740111176849604,8.296460759416103,4.410975588389201,-5.856719195083557,-4.313029484342845,4.442775027942023,8.547443950277916,6.59737099830285,8.833697563335143,6.567146557472622,-0.023995132457400814,2.9655921160317646,3.041495851663502,3.95126014098504,-0.3152675185534992,8.931891311387758,-3.422400178575238,-7.42561151399054,-4.8755729870183195,4.500200753275374,-5.827891785998687,3.7218046772039806,-9.055440432595443,-6.720133877532697,-6.5579011423995315,2.985582802505151,-4.3764040133115145,-5.723462385445046,8.176715835336864,6.241712427805286,0.3065693601913857,-5.812985534053308,7.5754820406983825,9.509514625889985,-3.6137082845799995,-7.935284670909053,8.324699956925585,9.299065742289567,-4.831921448547805,-3.6041824956861612,-1.409256250551012,-1.5125227065319002,-1.0257117324370526,9.710564625888573,-8.56409819165545,9.976183367967142,9.29490027110645,-5.397766628669096,8.436220530504556,-6.791237272905586,-4.34923906982791,-1.4240235689643157,3.95203841378914,-8.531852716746737,-4.175417387169245,-0.3362979158308441,-0.08984600355860017,8.007273193250604,-5.617956849704662,-9.009057377029492,6.539493196435284,-7.048592179669018,6.213768387206834,5.873670197103568,-3.7917804662663723,4.336410343547685,4.8766168183408976,0.6774638580701478,-9.223592021456103,-7.629025464309711,9.819524723876004,-9.29057681472003,-4.012393057200252,2.901605825435581,9.204866175732391,0.7936478706506378,9.971065241931768,-4.669035080601516,5.848498154664048,-6.930528215639762,-9.066742504208559,5.979483267102946,7.379248374766117,3.438384948941664,-4.222163452210879,7.650577909781315,5.698025843144627,8.082102435095273,-8.265399808624423,7.747988140058602,3.7888534069406212,-1.4409813716743258,-6.107124710097751,3.336388946657154,-1.2568266439993323,8.02762331572432,-4.586322885286145,-8.265152972600966,-6.159504202000541,1.776020643498688,1.008491049903494,7.242114149060335,-2.368341550934492,4.274045110457735,-2.8540729958084388,8.789965540962651,0.5091091597877586,9.089678376022935,-2.759045191088787,-8.093794516623799,2.63022835340616,5.071496979024683,5.354464042288551,2.2775332779052793,4.75385476719433,7.669187950942479,9.53551018044611,-6.4057782491067305,-0.6840033170079352,2.362120052996879,-4.408309158026857,6.934375585874474,8.985548385435532,-8.61132090098224,5.031566577936278,1.7713057131995846,-7.191818273166173,-4.159732341924429,8.629137683517335,8.71639813988649,6.333964637167469,4.53486916459029,-9.507598443974011,-5.899073793904668,-4.297993138461003,-3.0250301917325206,0.6919792052708686,-7.731549565808029,1.408584387858788,4.802187040820547,-2.8011976352865364,5.4730579838595705,6.695392972737956,1.9625979375325429,-2.0469449055698163,5.834632851656494,7.250721989074304,-7.740910004581925,7.893277866569779,-2.9028876122975955,-0.5869133435604503,-7.718569984336283,-1.4693372282902715,1.7185805726758687,-8.062111439912126,2.156530816796147,8.197348478780775,5.834320225812615,-5.0483690142636695,-9.66029160881594,-7.657759760083205,7.907043304362567,2.4523363580890045,-2.0143555003518454,-5.829358863632215,8.847532705702179,-0.7816808228890828,8.726695879171945,-1.2594086789907344,-3.704355385701663,3.8106023603309183,9.73429650609922,0.4767417542343786,-3.1693403052321845,1.731423972924361,1.3043057336946582,-4.690836507361151,4.0613027292657975,-0.2703106033422884,-4.456690936476706,-1.8333589560615806,3.8148811192639407,6.655983948051851,7.9384610188389715,5.357575108484616,-6.309851214859146,8.994687217828993,0.2613706079885034,4.450661041428621,4.332928802209569,6.743527380876895,-4.495033530390371,5.91481643333319,-6.123769516354924,6.516962254912787,6.106481697707508,2.1514327721979853,6.95823322496372,0.19866371598575938,1.4904493785623671,-4.045655726183712,5.059133022826732,-8.947059128315686,3.050430428668589,-4.309127419606678,6.078301000707398,-0.6894237386194,-5.751158502806755,-2.874863267466412,-6.248215491512137,-4.100769103372546,8.733803640028025,3.3750603391865663,2.4551324355652504,-5.951056947673199,1.385627826801631,-7.995767976103303,7.597666066936082,9.624055291412947,6.583546190694015,1.682953316939674,-0.44751307597112344,5.3035525989275545,-0.44926605150588017,3.2847318152605745,-7.782805923920866,-8.188302957338847,0.6035729524623648,-3.0262406648568074,-8.956147033685573,-8.139086161505507,4.752037462480988,-8.504359133646346,-3.5235985968356642,-8.326358635139561,-8.507035544703676,4.303088435989956,-7.854410215377712,-1.0974139569901666,3.7525934050136645,2.138238450147396,-0.05982467887227472,8.575848254844939,-7.670927727958916,-2.388964218862384,-8.200664663913614,-6.348807095032618,-7.611761119775506,4.598071097456167,-3.586747782376074,8.594479730926452,-1.146546798071082,4.723922884139249,-6.913766998664435,-9.359281226547548,2.2995046397774956,6.502599250929709,8.261495653817349,3.913061122769644,3.481854637812841,-6.094318470713342,9.151166421490036,-6.5131046946955085,3.7918036541522184,2.850026727025327,-3.9964690846117756,6.492927426928219,-0.26918511774522,-9.342315027865698,-0.5167112825638398,-8.103232362495199,-0.3720319463616484,6.33970018703387,-7.802351560488305,-4.8636430387115,-1.6561723953864274,-0.04362671539625218,5.84227599178082,2.615581983080201,3.9414707101197735,-2.5494203795330073,3.491903791168731,-1.7221973565389437,8.214179751455998,0.535261235846388,-3.8294165910814337,-1.5626890475298616,4.564868884872798,-0.026901581723311807,-9.581190581207185,5.620509874249461,-0.009466031023670496,3.1756679594309603,-6.003288323509386,-4.482298411495016,-6.128113004780067,-5.095124470881465,6.63318711336181,-6.1228227326413265,3.6618224161927238,-9.987994166073225,-6.877013187755723,6.247941533400944,-7.361238890483426,0.9579963530205013,-7.030937789179927,3.568199652062889,1.8610261428755326,-5.230427484352416,9.069463250500824,-7.84293284893363,-4.702955357707301,0.6762912833781964,0.0012455638396069446,3.2659025020048524,-5.860438347769872,-3.785092904157974,-2.386736962781262,2.094804365200318,-0.4564990816330763,-9.741880203611867,-0.05404301559096325,3.584956351143603,2.1469860553993527,3.340428634276588,-4.790713676488867,9.894354523246498,4.25036368982877,-9.821698046882643,-6.156093963958313,1.709423192253201,-9.005373681544619,8.196712979544216,-3.5242921858385534,2.2880816135571713,8.315851551089011,9.334959488785305,-8.806701059509102,4.150269078902053,7.2665770726551635,1.7712951111527744,1.4796314703170843,5.898124810018128,7.360151318326334,5.171674484530598,-0.11053426045782189,6.4255996609058315,1.9823749961078327,8.759547511265279,-4.862180008456587,-4.394275386963766,7.95645900485049,-9.459599407297375,-1.84676342715521,3.6477092733528913,8.82984474920817,-9.892877128744297,-0.7895298563443021,3.082458740159577,2.6483231257642146,6.356703767301951,2.0977277022810235,1.3029484456678162,-7.288029087905539,5.203367455110278,6.242516360178627,-2.477020461146191,3.8367020171846136,-9.139170878349265,5.087964811431398,-1.5647776673852967,-6.666627864921644,6.750718906958738,0.35001908307955887,-2.5059213742929787,-1.6724597305596198,9.657368709824716,0.849952394170991,5.267688145156853,-9.108855260326703,-6.38425426124877,-9.403967669408262,5.009411219354213,-9.566996823774986,4.088321864196871,-6.110868943235053,-5.316570896447139,-6.443860548234794,-9.373932721878084,8.820072396018666,-8.28659488584103,1.14171186009143,4.626175775586304,-7.796280714511004,8.788553148626143,3.4815340845015097,-8.759657300416208,1.1476611299351624,-4.472229790007343,-0.698746840629223,2.9324699053830106,-7.53994037032736,-6.187902992870091,3.625467822313313,1.734220938919444,4.878185929649526,2.277683266238494,-5.744813976900089,1.6162993753799384,3.718047015063881,2.1452029092825953,0.12768619466244857,-0.567087291350461,-2.1126425165542306,-7.6913557402492305,8.247805931101514,-8.68506051020204,-4.055949357564361,8.323935014428567,-1.9906283361090615,-0.18323249330986258,-6.906635134130847,3.2038073358310903,5.957948603253001,-5.547759691675953,1.397520383446027,-7.615320632366567,-3.0710188425227525,-4.20925333937022,0.9086263970027009,4.227061566973219,6.978508426531015,3.6061688757372767,0.28881089678765903,8.7190721540663,0.8757617450054198,6.31754026676294,8.351831529147308,-3.52816061108419,-7.29643285223136,-9.310406101993745,-9.768432417744478,-5.723221979636239,-3.6118050158560377,-8.128812232621755,9.40229878044919,4.941829889152993,2.656651672527275,-2.086862002236254,-1.6240508265061813,1.0034878865541828,0.8100772124088351,-5.582484508818308,9.08574906089602,-6.845747471906183,7.713154055906482,-5.003838761610346,6.094512891658212,-6.691294565533985,-2.0382165653154516,-7.509050294847266,6.0241082206967,2.9399761078601294,6.8121460923394075,-1.5859445052913443,-2.5574912254827797,-4.778530875726088,-7.367395553644589,5.331410206128538,2.1593713519631272,7.190037716983401,3.9669512596497203,6.17483804784775,-2.4140708701729574,-3.8327812267246975,-7.265514722798803,-4.599363905246574,6.3232859003752,3.28908920927522,2.578435480222506,-9.33954643569292,-2.9826815126956374,3.9060333095990174,3.675397855792246,6.863454956688287,3.548274301951121,-4.724880153746374,0.8441472932213898,4.956704819940008,-5.508461630903501,-6.6500810500234575,4.059512874860257,6.813011776076458,5.082004883601417,7.852759997189512,-8.351002640632172],"qim":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"im":[-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0],"qre":[0.2204986893831145,-0.2807974992484908,-0.10895095408524304,0.11374871257898815,-0.2109655159321864,0.12053332487169854,0.22670721702297603,-0.17074405766959996,-0.23185559097849873,0.2250845459674826,0.11699404006825753,0.1515755291399023,0.11320287940924845,0.15227313586631022,-41.67511897570585,0.3372007885353068,0.3287855873461292,0.2530838173946963,-3.171909382191256,0.11195837086878174,-0.29219259812460185,-0.13466904350111872,-0.2051040980542381,0.22221230892247898,-0.17158863560275198,0.2686868567082498,-0.11043085175630525,-0.14880655924776767,-0.1524878125311448,0.3349429796959298,-0.22849809957178183,-0.17471941504202648,0.12229849002191746,0.16021244355078698,3.261904579687018,-0.17202864072890872,0.13200480109749033,0.10515783815900184,-0.2767240522061742,-0.1260194235584294,0.12012444955064933,0.10753768472162509,-0.20695700678257964,-0.27745542885159064,-0.7095941562146736,-0.6611470992676362,-0.9749327889854955,0.1029806235297563,-0.11676652668162588,0.10023873490647066,0.10758587729107089,-0.18526180711272536,0.11853649349066882,-0.14724857339171668,-0.22992527748987773,-0.7022355681425233,0.25303397773434566,-0.11720783670317599,-0.23949701485483285,-2.9735539619073768,-11.130155603947047,0.12488645958063578,-0.17800065517636904,-0.11099940406081914,0.15291704876229642,-0.14187230222857883,0.16093293758081517,0.17025130224252655,-0.2637283484359166,0.23060548259413208,0.20506019587985916,1.4760935038640177,-0.10841763140366358,-0.1310783408284877,0.10183792272232049,-0.10763594338035026,-0.24922782632312077,0.3446367494971109,0.10863818994309651,1.2600046405721386,0.10029018723041297,-0.21417701575100806,0.17098406694418158,-0.14428914635155113,-0.11029319510682305,0.1672385313797356,0.13551515672240733,0.2908342186373868,-0.23684540196480636,0.13070907999270137,0.17549937952687836,0.12373018135202736,-0.12098628295712485,0.12906576286943522,0.26393209042296206,-0.693971497242928,-0.1637431766124838,0.2997252466628435,-0.7956546790080075,0.1245698708908306,-0.21803959839116496,-0.12098989617191676,-0.1623507294102033,0.5630565183240444,0.9915804409922065,0.1380812259262373,-0.4222363955931202,0.23397038967913553,-0.3503764625041561,0.11376608876790692,1.9642152979861682,0.11001489366640675,-0.36244422644102303,-0.12355144400393482,0.3801951259117842,0.19718043885975328,0.18676005518053493,0.4390715207989111,0.21035560591813965,0.13039190151508914,0.10487115855118471,-0.15610905671601222,-1.461981214322677,0.42334850793518125,-0.22684434420375277,0.14420909101563945,0.11128981305368929,-0.1161262031108301,0.1987452584618596,0.5645552840190741,-0.13904689495995198,-0.2404000829383573,0.11588643462140108,0.11472628761919113,0.1578789995340418,0.2205135283302813,-0.10517903189672548,-0.16951813707319094,-0.23266672788548784,-0.33057521301209614,1.4451301316324376,-0.1293401783805921,0.7099326164761177,0.20823845291730464,-0.3569901628514367,0.18271321132519877,0.14935643121647402,0.5095287123644083,-0.4885329337780227,0.17139039000818926,0.13791730002982358,-0.12918377805814688,0.12669007944535657,-0.34448457314147063,-1.7038290421778475,-0.1295576773974136,-0.6805789581494545,0.5818755407219444,-0.12403698552830965,0.4637077254873878,0.12199066595601582,0.1713995737799459,-0.19808377659687684,-0.10351654385747572,-0.1305864941353468,0.12646952362689962,0.4077744052937563,-0.49643670137933993,-0.17154545180581146,0.1130258607979495,-1.2792945288129396,0.11459090746896608,-0.7940234307432124,-0.2699525007400402,0.26242570214362604,0.10272956031012923,2.0975716750590596,-0.3155230753696992,0.5775592897163184,0.7666914084379107,-0.21318159318295107,0.24622641222827044,-3.699447922631884,-0.2243817249734088,-0.5454469222700385,0.26213136628303224,0.15024074694361175,0.12596900049353063,0.18665160632397534,-0.15848234228488428,0.11117673975564495,3.825984902036061,0.22468572436579204,0.23079077585813362,0.14829034472904667,-0.2224677509609489,0.16906695436302285,-0.16329811194383978,0.15344572530647294,0.16376041876542746,0.46480652936152966,0.14371464244865317,5.033631808597006,0.6709385869680212,-0.24717871902147864,0.1976623258348842,-0.11176856949957961,0.327822588773633,-0.23206554427932805,0.1645196576944148,-1.4504867528967629,-0.17387801075417536,-0.347842630053599,-0.16004569646460592,-0.24385669487647627,0.11449765087651904,0.29629099912359286,0.40731000312403426,-0.16803737702274713,0.7216945132433182,-0.12506616037242052,0.13161936720960296,0.10390630245986314,0.15189382303013557,0.5941935465081265,-2.2345715772214145,0.18855285798470495,-2.22585258033215,0.30443885718587077,-0.12848836393651383,-0.12212542760203324,1.6568005506548176,-0.3304429854547992,-0.11165515664703048,-0.12286391618872204,0.210436051461158,-0.11758675571962093,-0.28380077143237625,-0.12010051978541021,-0.11754976157617933,0.23239122664462342,-0.12731700695262335,-0.9112331710657845,0.26648237420658116,0.46767468798022344,-16.715509700185656,0.11660654086726038,-0.1303623284515132,-0.4185914515187659,-0.1219413353652201,-0.1575099046216748,-0.13137564149273945,0.2174825005540343,-0.2788041035150626,0.11635375628400067,-0.8721841983967613,0.21168846836122962,-0.14463895011115863,-0.10684581174497734,0.4348762697416266,0.1537846577054591,0.12104345773491207,0.2555544032218452,0.28720325918837303,-0.1640872568123191,0.10927568726667035,-0.1535366076357461,0.2637267356670615,0.3508739025208143,-0.25022087718642816,0.15401373436774982,-3.7149156252630804,-0.10703985008183302,-1.9353167498843027,-0.12340754346726812,-2.68794120983339,0.15773616582771968,-0.12816648830130586,-0.205607194450875,-0.6038018764143659,-22.92173478835646,0.17116616904214138,0.38232408942592766,0.2537124016759754,-0.39224602110663914,0.28637673309587447,-0.5806535448467268,0.12174070086824504,1.868246629925925,-0.2611363836279819,-0.6399225754993915,0.21906434231086694,-37.1725354399307,-0.104371162594493,0.17791980129445745,-105.64089611574562,0.31489438215045235,-0.16657537438005687,-0.22309982696276176,-0.1631823693884198,-0.19626605899718058,0.15075709201472884,-0.16332336304118503,0.2730880655429822,-0.10012020265257619,-0.14541196486004482,0.16005271410657226,-0.13584669848071296,1.043845309898168,-0.1422285376410133,0.2802533763551791,0.5373379647718797,-0.19118896170373176,0.11026010827540197,-0.1275033229611249,-0.21263225438897249,1.4786528003212172,802.8492544513529,0.30619407633452805,-0.17063570003778633,-0.2641943078600493,-0.4189820728442154,0.4773715467718027,-2.1905849107573396,-0.10264958910388196,-18.503778685644146,0.27894342414545703,0.46576921051030945,0.2993627792969038,-0.20873716684586,0.10106773490383117,0.23527398429292667,-0.10181538825838725,-0.16244066543731067,0.5849926481235428,-0.11104480895105712,0.12200012401258994,-0.2837449187721264,0.4370473474699828,0.12025226687326374,0.10712419279391251,-0.11354989720245386,0.24094823275038071,0.13761637563345985,0.5645586631519528,0.6758439652447379,0.1695454118402975,0.1358667718569943,0.1933609709952122,-9.046968748495713,0.15562749825267322,0.5044454263009703,0.11416114801751379,-0.20566906166796411,-0.22756880530670429,0.12568405108231825,-0.1057127217489331,-0.5414878729434334,0.2741446549222446,0.11325227434940761,-0.10108282828000008,-1.2665765480107634,0.32441634561772936,0.3775974276973602,0.1573142365299243,0.47670629458371633,0.7674900747799409,-0.13721130746575871,0.19218323684172836,0.16019181085035802,-0.4037108355323275,0.2606405176948831,-0.10941911616610696,0.19654223978775315,-0.6390684254019131,-0.15000087304434437,0.14813237134924778,2.8569870853947164,-0.3990548188217359,-0.5979217207611875,0.10354787417225476,1.17653648234659,0.189836598607191,-0.10978327917399947,-0.15663536555393998,-0.1063380942124107,0.19962425846303644,-0.10452600940714181,0.24459913705851158,-0.1636428483885316,-0.18809116241979615,-0.15518647439909855,-0.10667881130254668,0.1133777541838993,-0.12067682972033056,0.875877736717142,0.2161612633219203,-0.12826628960893205,0.11378437190839809,0.28722970269101394,-0.11415971717894555,0.8713373433292939,-0.22360210609803172,-1.431133483336394,0.3410094671949889,-0.13262704356859298,-0.16160563621508506,0.2758264723370037,0.5766277972765561,0.20499423646852372,0.43904260738213235,-0.17407004021731642,0.6186972631632263,0.26895840637529395,0.46615636948507716,7.831700229172007,-1.7633969500861169,-0.4733408478548578,-0.13001608998098377,0.12124436587785324,-0.11514024557748728,-0.2465514018647684,0.12013548859603265,-0.5023539461688907,-5.457547304718003,-0.1447883058217818,0.31212863171142996,0.16784300546903114,-0.18025294093045052,0.7155530694544754,-0.13131423459043984,-0.32562483373710893,-0.23757182554130085,1.1005623469653916,0.23657095695344896,0.14329709715591696,0.2773025985355584,3.4624732346412292,0.11469110271482633,1.1418630760056907,0.15828945408723014,0.11973421596329738,-0.28343380878363805,-0.13705327250345142,-0.10740670052897676,-0.10237057055167702,-0.1747267541881293,-0.2768698740961765,-0.12301920273012307,0.10635696900840515,0.20235419316940417,0.3764136677537026,-0.47918836939309506,-0.6157442757818725,0.9965242365145437,1.2344502285484773,-0.17913171069626102,0.11006247182237078,-0.14607608651996512,0.12964864862698192,-0.19984656733387185,0.16408202226772503,-0.14944791179137054,-0.4906249988431585,-0.13317263312062289,0.16599967387112247,0.3401388185864725,0.14679661687299236,-0.6305390867483702,-0.3910081841282678,-0.20926933946995832,-0.1357331763604451,0.1875676343288094,0.46309774328110825,0.13908132882779267,0.2520827543740226,0.1619475672481081,-0.41423804593125074,-0.26090714310207314,-0.13763649764029143,-0.21742136969403153,0.15814562487846132,0.3040355357890578,0.38783208176832296,-0.10707158071170379,-0.33526878271902283,0.2560142018099321,0.2720793882012118,0.14569921509072073,0.2818271404355974,-0.2116455798793323,1.1846273843796304,0.20174693396652643,-0.18153888816975922,-0.1503741070939989,0.24633497437409252,0.14677796441090105,0.1967727349548195,0.12734376198405378,-0.11974610032266735]}

},{}],60:[function(require,module,exports){
module.exports={"re":[-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0],"qim":[-0.13193416238192884,0.1356572753514832,-0.5917469696121339,0.8293911786511352,-0.12679512479342311,0.16837754660590826,0.8522905660146038,0.5097785090068558,0.17396762959325074,0.19061188578450028,0.21566171096001333,-0.11894296370579849,-0.1506746435640874,-0.422642610517992,0.22823681462079468,0.13450134459985225,-0.5027438928707224,-0.2709740132847876,1.8233994033323453,0.11359277897502855,-0.11782384701785373,-4.2056551587180495,-0.11525645934706058,0.12628559603074477,0.13406310437449837,-0.10540262624337256,-1.9331206356536617,4.538781026597133,-0.17252593188961726,-0.6820210387075617,0.10167572596290239,-0.12039083105937326,0.12105488353068951,0.10910686692857706,1.8628147693071333,0.13978500294676044,-0.17010218233578597,-1.7152894710684994,0.32914958306374936,0.20000013316412063,0.51026921554924,-0.10056748263309234,-0.22533144012220951,0.3846541918789243,0.11231138188069037,-0.15205874741166317,0.16808747467348772,-0.16433016692913457,0.9500972093706987,-1.1824815348304107,0.9101656546921865,-1.0260598836864272,-0.13399203849915806,0.12739495361267658,-0.17124399951237906,-1.078497768733767,-0.15830770215257498,1.8102140652636545,0.19428204178667732,-1.5736861625793226,-0.15867761156881227,-0.2627635306709038,0.1200549463746113,0.5393500311723597,1.7585870852596932,1.4735620629728823,-0.7653828967067006,-0.7176777873146195,-0.1906924150150924,-0.15195058529047734,-0.10858425890008004,0.14288576264677694,0.12353636493595284,-0.23531240554206118,-0.26283987187836544,0.6593243857476135,0.29989848983690726,0.268502797878807,-0.1346130485936196,-5.682702917638249,0.1098338244360872,0.2793084762661018,-0.24250440546009625,-0.12214042069669882,0.23106568859312057,1.7752844000593284,0.23773125197147743,-0.10938107278279299,-0.11900058888796816,0.10651619926327041,0.2724738207981458,0.2384513933304842,-0.11691717535407535,0.11599275166956954,-3.911327513635303,0.15536584543797238,0.43861331980863827,-0.44227246193016745,0.2118924639723213,0.10144854343021893,0.7708044921248031,0.2665994559292894,-2.809397536670813,0.13185707027650462,-0.19733515050255798,0.16405650920476325,-5.964164507978691,-0.39546945016758306,0.1205754086296825,-0.35237022069340074,0.5068421961655528,-0.14688875395317166,17.04483138773905,0.12047167124243928,-0.11913170110173989,0.23233097045190682,-0.11335233248451174,0.1102336677944148,-0.14029566759838985,0.17851694664776638,-0.21008946429823142,-0.1791336412158463,0.24767161054794798,0.4762879405979386,-0.16012659553124053,0.11109403327170436,0.12247513909933636,0.2361730631483327,0.10679448414859713,0.17920629565558624,-0.20606395335938363,-0.12717498766278726,-0.13673344046632369,-0.10189991432385168,-0.15352426713704537,-0.34773990437121766,0.31633950609562855,-0.10251507225446317,-0.12803125368534835,-6.572138420140834,4.849360796297692,1.6350284378949769,0.10008471415339162,-0.4666785250379588,-1.641708585218007,0.10552318974021785,0.43240754113118385,-0.3115185273848525,0.10099472158305699,0.6123846952087577,0.14668588403180743,0.17163616957084435,0.11245297876394621,0.11773372647996432,-1.0513585123177356,-0.22170121658437242,0.10337354300217255,0.20083430201354255,0.12523075639892725,0.1416170643240368,-0.3128351353029693,-0.33619093051143106,-0.3173275772134836,0.4252045715853024,0.24336320072319778,-1.7557849149484306,0.38610427723804436,-0.11632746784381447,0.10742563712819532,0.19104212240097218,-0.66422616880947,0.11856860098789983,0.17782138350708704,0.10330157283482139,0.10595100026082895,-0.13166561506538058,1.098362204438496,0.14122324378746487,0.2516619299886596,0.9734207409937434,1.0987647024088083,-0.1816912914319272,0.16000080630814525,0.6237327651678265,-0.17547926531159228,0.14401892707465358,1.225728558226975,-0.19354986967621635,0.9534632840853986,-0.13323513028028533,0.2738237056597915,-0.11027775097696858,-0.287174308689532,0.34569236147437626,-1.4749119400697617,0.11519597751119376,-0.18806846601965466,-0.16204150336603354,0.1544418579124883,2.6047832693833053,1.155532537544519,-0.11499325700044363,0.14630299678496878,0.2197444686104348,-0.1067283524681205,-0.8960718340095768,-0.1260568504905936,0.48412627604372027,0.1165964515530456,-0.10690191789853079,0.17025725036458103,0.2353239625683393,-0.1190945997095883,0.13973793611474478,0.10442306491271344,-0.6448628447188854,0.1973792465694674,-0.11140482696938446,0.6402914351173293,-0.9195256738284172,0.21036739071676766,-4.482347083250993,0.11752183922043082,0.14437205797883376,0.21420980886981913,-0.28918083210961604,0.11322505825585333,0.39164015783987177,0.7321154015935015,1.089664570897168,-0.19011172751185662,0.1298921788952243,-0.1577867780677411,-0.10890526103473093,-0.39646122192199323,0.8344405785112698,-0.25304202863672565,7.076460723533412,-0.13707083527183708,-0.14020823240975838,-0.1683444831355888,-0.10858767336814973,0.17353629630692674,0.12264219671205963,0.185499473962516,0.15897049893626772,0.19280866473084177,-0.2748920447717088,-0.11844206386993518,-0.20905581016783015,-68.7962570489393,1.6399263155895716,0.12431528560869183,0.21460810843532813,3.5433044858083305,-0.21010115269301996,0.11015779152372655,-1.097754424332232,0.20175654169874535,0.1905027196943473,0.19307214346610374,0.26215853385834764,0.13653221921195333,-0.1723228223470371,-0.4429938505276399,-0.14917018210833724,-0.3624306086242703,0.6521841349370471,0.10862798847673551,0.13375234715347142,0.11034503920112304,-0.10206319181803453,-2.380487927547336,-0.14908905676766404,-0.4821192101198411,1.0691753497403031,2.8695418033372726,0.1517847947100451,0.11029000451178804,-0.1909105772552252,-0.5534140878472695,0.19076108064893965,0.19558437445706423,-0.15028890114629406,0.12491412061028798,-0.16455508805893213,-0.13372739320117485,-0.10466790203220186,-0.12471857371743404,0.20115280054911994,-0.1982434629742807,-0.23709276747459995,-0.26010661213935876,1.5267207054688872,-0.23314040848292633,0.2143027449034083,0.39022418676355114,0.1092107631694988,0.11633670544631414,0.1212535468000952,1.3413199338963875,-0.37759755419097074,-0.12738645560747142,-1.5435810942612607,0.1073076893261308,0.1591197286693383,0.1276921897140074,0.13764861699950764,-1.1479563094787812,-0.10486002548763186,0.25796878228101017,-0.9947649657270191,-0.2516624451067025,0.37175482639534596,-0.12089420704433235,0.19724991898773628,-0.1161323398020293,-0.10197538396242457,-0.17378308872038972,1.794495401595222,0.13721431066756834,-0.49425501139814354,0.1864424357601343,0.10719271258478481,0.17246806257919586,0.11399860098078217,0.14697619602382692,-0.10820782069127524,-0.10559273643235643,0.32349321866128083,-0.12497483756293892,-1.7649218360731418,-0.10532959924430695,-0.5499885438607277,0.1397776179054329,0.10151063548561604,0.14606685939367198,-0.10347887957841567,-0.12518445803057762,-0.8115765679821666,0.14504095280083604,0.3680293167918571,-2.6857032218276,0.5778363630258587,0.10787980709821547,-0.28395504795569126,0.1204719145636188,0.36757304615202163,0.14804646286543624,-0.3127829456457513,-0.16935335346993638,-0.12667473631995635,-0.38064974750885616,-0.4518344400751287,0.1041716930776858,-0.10948033315755934,-0.22500585303606294,-0.7543561621220994,-0.5564184679448638,0.4082101252592232,0.2096615921545605,0.1372742667890898,-0.25029988682260684,0.1363482722330068,1.1685529702558648,-0.10554323616451641,0.11036307951169441,-0.14666204760836,-0.10593673588189528,-2.8980891846905847,0.12203824208094287,-0.12508961676312377,-0.1369235362902396,-0.249675765241842,0.3889287211457573,0.21731077317131622,-0.3409936246898695,0.14559637170328718,-0.13375324197890387,-0.1746326134534275,-0.8716368521606641,0.2618033056572029,0.7853211705983507,0.11756255713426159,-0.7581665673973932,-0.2571165309490826,2.2832399578073086,-0.11973092744229259,0.1024596739520411,-0.23263090721980828,-0.10698040709673218,-0.19696986858483145,-0.15578318016514098,0.1481160827621463,-0.5102289314020433,-0.1227273631459808,0.15431604063258972,0.10855864892794209,-0.19356876691685787,-0.1973946675812277,0.11247776042947485,-0.15133822670112437,-0.12173699511935666,0.10583957024887436,-0.4690385518705476,-0.16853979383431353,-0.2331797788323484,-0.1348352777166298,0.3921175420118737,-0.4881815729773846,0.7372756807488512,0.12856269970109205,-0.10688565489557898,0.1479493911364232,-0.22370953921227488,0.40656186663301924,0.14941444485341612,-0.18765314113045187,0.24600363227282512,-0.12070039344862975,0.12351883370996616,1.7539730873818913,0.27404831141724667,0.3246474374145674,-0.1485139114716862,0.27051486087399623,-0.2867242544518733,0.21737559464473571,0.15779251418907558,0.18489230655757494,0.12410254358486285,-0.1617017344885684,0.32846209978581403,-0.36828946088109377,0.18513741678204715,-1.333332114634998,-0.15230404034287942,0.9344182863437746,0.13063572914740879,2.803075849703665,-0.6311328760128523,-0.3418564014116437,2.267307348649071,0.1215104178615236,0.17989141139689413,-0.16424790232379266,0.22083491489422444,-0.6024868524917704,0.11424306445574761,-0.12758124242277213,0.15296902692199074,-0.10265174691770632,-0.5209615968425791,1.1383231551828628,0.5918146434301299,0.1906617628732137,0.4052227209463665,0.13383774105070875,-0.13624278277357993,0.49951446521701665,-0.1909317431225493,-0.12618257483211404,-0.12836019711168958,0.11179417159055283,0.13676332696492885,1.387994514612291,-0.1560708883884456,-0.23791202429423686,0.23410344312194128,-0.18417489591618866,0.16487875145724012,-1.186901494513359,0.3238779521615587,0.15151536646724845,0.5288429502788117,-0.4625291477863718,-0.4080194563814099,-0.15259919394521843,-0.10771471902925765,0.4323022568858973,0.2750698992571029,67.95109765216962,-0.13944376388766494,0.3607217122848532,1.5950854700262584,-0.10519738535656026,-0.3976332876292009,0.2536233390829602,-1.29168752277095,0.15028488528008888,0.42874568311044275,0.15727715681481383,-0.10605062563538765,-0.206401136702589,1.7618952508258197,-1.1029734570270517,0.17300096954426666,0.14503966926334597,1.022176442420187,0.12995470823980282],"im":[7.579538020676978,-7.371517652916406,1.6899114847270944,-1.2057036845102829,7.886738560565462,-5.939034153648315,-1.1733087750532079,-1.9616362446274707,-5.748195812853658,-5.246262560617905,-4.636891711321969,8.407390978363942,6.636816761903695,2.366065264395365,-4.3814141099956005,-7.4348699113384065,1.9890843313677884,3.6903907790929846,-0.5484261967907056,-8.803376491210177,8.487246218063742,0.23777508194580932,8.67630331232714,-7.91855945120254,-7.459173832097394,9.487429636629926,0.5172982904203813,-0.2203234732277295,5.7962301031928565,1.4662304287489611,-9.835189181386932,8.306280396941766,-8.260715890462054,-9.165325961147932,-0.5368220267933275,-7.153843251560166,5.878819344163233,0.5829919770784073,-3.038132361256314,-4.9999966708992005,-1.9597498134854696,9.94357195604043,4.437907109001946,-2.5997376893653223,-8.903817077616507,6.576405613106466,-5.949283264220098,6.085309950614473,-1.0525238787537905,0.8456791675342465,-1.0987010934160057,0.9746019856143295,7.463129982952559,-7.8496044909309015,5.839620674870485,0.9272156410430696,6.31681204642976,-0.5524208540796813,-5.147156118000886,0.6354507167813992,6.3020862874932995,3.805703163779004,-8.329519359241292,-1.8540835120123145,-0.5686383167384221,-0.6786276771963848,1.3065355971538075,1.3933829605368775,5.244047068787999,6.581086858522745,9.209437998929538,-6.998597911200335,-8.09478245954904,4.249669700568566,3.804597806465111,-1.5167041013750637,-3.3344616058047727,-3.7243559765487655,7.428700341070783,0.1759725986899916,-9.104663387023407,-3.5802708652754367,4.12363642673926,8.187297819148807,-4.327773656437941,-0.5632900283281828,-4.206430545866886,9.142349535973032,8.403319759547067,-9.388243355626624,-3.670077356682353,-4.193726805420841,8.553063285796728,-8.621228357860812,0.2556676720407314,-6.4364210626925455,-2.2799125216632454,2.261049660735818,-4.71937501340598,-9.857213974568761,-1.297345838298627,-3.7509453892705302,0.3559482013303885,-7.583969505032968,5.067520902653566,-6.095460672955522,0.16766807801197103,2.528640327530338,-8.29356509229218,2.837924266222558,-1.9730006845629013,6.807873122259593,-0.058668811515456554,-8.300706628262695,8.394071357597657,-4.30420446337783,8.822050487021414,-9.07163863825156,7.127803852522362,-5.6017090745625975,4.759876956897063,5.582424346497007,-4.0376044625688134,-2.099570269918205,6.245058771669825,-9.001383517639375,-8.164922345496798,-4.234183131087783,-9.363779487043256,-5.580161100600418,4.852862345390223,7.863181419380712,7.313499876764176,9.813550940012227,6.5136282273038795,2.875712529478598,-3.161160654078099,9.754663173019061,7.810592892088803,0.15215747692340464,-0.2062127447319373,-0.6116101572443924,-9.991535755074267,2.142802692535856,0.6091215024420471,-9.476589955836712,-2.3126331177851034,3.2100819440655357,-9.901507567181227,-1.6329604704753553,-6.817288565975166,-5.826277774086779,-8.892605700549145,-8.493742871293367,0.951150333862314,4.510575157892433,-9.673655085798728,-4.979229095697848,-7.985258803472068,-7.061295930495213,3.1965718909148,2.974500229612822,3.1513176660572597,-2.351809145117305,-4.109084680955539,0.5695458432785152,-2.5899738981225306,8.596421967532525,-9.308764897588272,-5.234447709396424,1.5055112956364791,-8.433936064591435,-5.623620625807049,-9.68039471769703,-9.438325240330073,7.594997368929121,-0.9104464774543288,-7.080987330279416,-3.9735847215550724,-1.0273050058283353,-0.9101129639564434,5.503841114887237,-6.249968503746799,-1.603250712235603,5.698678976255888,-6.943531800383713,-0.8158413159978153,5.166627090335268,-1.0488080838469216,7.505527993227542,-3.651984760013569,9.068012279365846,3.482205649117148,-2.8927454333529523,0.6780065798048263,-8.680858668896043,5.3172125086376365,6.171258469141158,-6.474928581645476,-0.38390909975276166,-0.8654018536985362,8.696162071452086,-6.83512998349423,-4.550740259008794,9.369581529881646,1.115981958193446,7.932928643767919,-2.065576791600736,-8.576590339415686,9.354369123191788,-5.873464994052506,-4.249460994477325,8.39668635218134,-7.156252824421689,-9.576428357431315,1.550717347401104,-5.066388778863087,8.97627173977671,-1.5617888123347399,1.0875172150838708,-4.753588455857067,0.2230974044238252,-8.509056756032738,-6.926548073080796,-4.668320303706195,3.4580438568658067,-8.831967193519228,-2.553364306448027,-1.3659048803281948,-0.9177136035327429,5.260064768690471,-7.6986929352123346,6.337666642579389,9.1822928525105,2.522314780628804,-1.198407682646625,3.951912673904573,-0.1413135802018104,7.295497966557313,7.132248818867506,5.94020060161149,9.209148414200335,-5.762483245760528,-8.15380046027558,-5.39085086679044,-6.290475318951514,-5.186488902850845,3.637791704123252,8.44294642736157,4.783411660250913,0.0145356745104408,-0.6097834948398209,-8.044063086077022,-4.659656185830223,-0.28222242937495423,4.759612154346939,-9.077887148678112,0.9109505530877762,-4.956468779550947,-5.249268890252345,-5.179411084621655,-3.814485781875523,-7.324278516615883,5.8030618717822655,2.2573676786007812,6.70375262580114,2.7591488583037815,-1.5333093009024612,-9.205730622676187,-7.476504310257601,-9.062482620331721,9.797851528912311,0.4200819455658067,6.707400406713756,2.0741758034313307,-0.9353002762763793,-0.34848769195033213,-6.588275208398198,-9.067004797276237,5.238054456580038,1.8069652037408535,-5.242159441528402,-5.112882881242262,6.65385129821783,-8.005500059675716,6.076992281404692,7.477899449484031,9.554027362584783,8.018051924371974,-4.9713451528894215,5.044302520732984,4.217758351094076,3.8445773899212696,-0.6549986493389959,4.289260735653354,-4.66629580713362,-2.5626294676755412,-9.156606647350007,-8.595739377040118,-8.247181434194673,-0.7455342865852366,2.64832223858698,7.850128141420306,0.6478441616820838,-9.318996674700433,-6.284575824523109,-7.8313325367800735,-7.264875025977027,0.8711132921548561,9.536522572350023,-3.876438037028378,1.0052625840810094,3.973576588179494,-2.6899449018492128,8.271694934342854,-5.06971057393526,8.610865859627896,9.806288156448378,5.754299842195586,-0.5572597171946203,-7.287869575227606,2.023247062627064,-5.363585794848444,-9.328992390308652,-5.7981749492942125,-8.772037475868494,-6.803822843788159,9.241476203952693,9.470348376098844,-3.0912549083357055,8.001610720209076,0.5665973300126126,9.494007450655424,1.8182196905054582,-7.154221219283863,-9.851184511022977,-6.8461799216538965,9.663807765160485,7.98821208105354,1.2321696306317875,-6.894604459563616,-2.717174840083625,0.3723419594066346,-1.7305937528117266,-9.269575344064013,3.5216841792368534,-8.300689863046212,-2.7205476856059185,-6.754636217880661,3.1971052575627645,5.904813689901452,7.894233917915486,2.6270869915045303,2.2132000381239756,-9.599536788312083,9.13406062220183,4.444328831924761,1.3256337658684636,1.7972084997349356,-2.449718755420327,-4.769590794974072,-7.284686514016605,3.9952075595971905,-7.334159675240262,-0.8557592385230439,9.474790013461796,-9.061001237230219,6.8183965538948215,9.439596110596241,0.3450549435409336,-8.194152774969847,7.9942686361702755,7.303346284310681,4.005194493071347,-2.5711652177655298,-4.6017046711791565,2.932606147430148,-6.868303023635187,7.476454291535784,5.726307247109306,1.1472667745990108,-3.819661472530713,-1.2733643729966957,-8.506109635382941,1.3189713751593715,3.889287072708804,-0.43797411506425377,8.352060919948823,-9.75993736294804,4.29865494637443,9.347506025994043,5.076918653521453,6.419178238240679,-6.751461295434473,1.9599045417752556,8.148142145044929,-6.480207734080574,-9.211610589072174,5.166122695969451,5.065992978703445,-8.89064643696399,6.607715854731701,8.214429796131842,-9.448262097517684,2.132020909607437,5.933316857994203,4.288536531801842,7.416456708767292,-2.5502557087071587,2.0484181610974606,-1.356344751510452,-7.77830585640312,9.35579242113398,-6.7590680321077246,4.470082069460229,-2.459650257614161,-6.692793330531432,5.328980873839061,-4.06498062959888,8.284977135767178,-8.095931364994055,-0.5701341754865084,-3.648991649787874,-3.080264572435305,6.733375951724547,-3.696654582188712,3.4876714629939,-4.600332441341144,-6.337436253799376,-5.408553869106516,-8.057852571862782,6.1842255629651,-3.0444912842367122,2.715255542766837,-5.40139328603277,0.7500006855184402,6.565813997768657,-1.0701845357851845,-7.6548736438834775,-0.35675095988063177,1.5844523998138804,2.9252048400166064,-0.4410518056124282,-8.229747025803382,-5.5589090787314,6.088357816763068,-4.5282694562994275,1.6597872565420992,-8.753266596655003,7.838142825778821,-6.537271107241649,9.741675422257337,1.9195272858129186,-0.8784851607796362,-1.6897182438813054,-5.244890139114995,-2.467778701215413,-7.471733997819925,7.339838335964458,-2.0019440269173083,5.237473788515885,7.925024523635695,7.790577005190119,-8.945010153682333,-7.3119016785577085,-0.7204639423804426,6.407344831094285,4.203234380298717,-4.27161594320983,5.429621637766875,-6.065062909330323,0.8425299021213295,-3.0875828173113007,-6.599990636699942,-1.8909205454526514,2.162025906444862,2.4508635173152538,6.553114562053256,9.283782281680356,-2.313196343696031,-3.635439583541338,-0.01471646573126506,7.171349740714071,-2.772220151833622,-0.6269256530708276,9.50593968291664,2.514879993982081,-3.942854800412907,0.7741810479478684,-6.654029100373471,-2.3323849997631463,-6.3582024259088765,9.42945875150324,4.844934557898956,-0.5675706314159648,0.9066401313911889,-5.780314426180859,-6.894665473790607,-0.9783046825382904,-7.694988612145703],"qre":[-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0]}

},{}],61:[function(require,module,exports){
module.exports={"re":[3.818383845932395,3.922281987339842,1.5233209755245838,-2.3592850725563785,-7.17419057319352,-6.312854798331999,-6.408015011550461,7.1907652407693305,7.049187807863774,-4.546350988705572,-0.5289078143053452,-0.03586798880459874,-1.353737468028875,-6.712431375548564,-7.305219099916034,-0.9249159817630925,-7.164124132287646,-8.883377226729907,5.562194414232966,3.859036039972672,9.111920186172288,-1.0831136574423041,3.985630562120468,5.189923925514401,1.108717319792195,-3.8668053988394213,-9.18391018016715,-4.618986820671003,-4.472320588351373,7.488796260661687,6.48352026789027,-2.9108111184575414,-8.203178396006594,-7.573369979896518,9.047651932805792,-5.19600518437592,3.567655738171025,-9.165765663894291,-6.164947440419892,7.9538731208210045,-3.1549558544020284,-8.315158730926267,4.644130314259982,-3.8145857723663656,-0.17198441312231338,-3.6624379913225935,-4.848608405370447,-8.29499179298681,6.6346406313349995,-5.919510294502763,-4.717346707039427,-1.9123524831844705,9.608134699963166,1.6190303972775908,-2.435941963826438,9.999830083808536,6.275462989855388,5.3295561804305525,0.2174955178426785,3.032484942262027,8.357264007492748,-0.26136938816569,9.357749571539426,3.546282246713556,8.783915583372952,-3.7057012831927105,5.265932171792379,4.072750858153693,-0.0766878424669315,5.730074257270154,-3.687696034222996,-9.836927485101574,8.792641316163948,6.7689725704092965,2.47517135829764,9.393301628972743,-9.383600305237927,-0.10881052174353556,-2.4773731885760597,1.548306569902497,7.389183561460719,-9.901635077993113,-1.015176443197813,7.595181268190338,-9.264786897057252,-1.9898458594586454,2.6917162945837667,-2.79408322358778,-9.608089879932988,-5.037779425082833,-5.383289019137023,-8.29342822560501,-4.170749284539963,2.1822499104526827,-8.528717260632327,3.9156669836966387,-7.994740608654158,-5.265922513326906,-0.5520248573544393,-6.299222400136815,-1.8760872278579512,5.243497197589683,1.6400953390806663,-0.3764399174089341,4.471043122203472,9.78036202991531,-1.09736731354233,-0.27922646442987364,-5.94153274959889,-6.469430559464704,1.0177861885907191,6.246727499524379,2.741055734561865,-3.0940747825637382,-8.997328881912793,-7.139255891790737,-5.460361119786898,-6.487679532948127,4.266525161330987,5.182458345780443,-0.011348106731293939,-5.039904687509598,4.226919485595948,7.07951087935756,0.361785093365139,9.474883674810041,7.382025561193842,7.049457012919799,4.415519244255073,7.290114597879025,4.593793364469478,-6.600016383110607,7.960764740052927,-5.652434293449375,3.04689788013504,-1.9085369923977158,-9.579362562307029,7.400832339230135,6.004433600327374,4.881279271241619,-2.9967172777823414,4.654885768202854,-9.333954260916922,-2.0599763507567914,8.886266092546265,6.818891759176662,-5.581984459023537,-4.417847498932361,5.977132738468702,-4.423970151547274,-4.649564974063982,-3.2296228489645085,-9.160183954688112,4.754387360433681,-7.626098342533925,8.564050669429498,-4.781397425753351,-2.9143716911371165,-8.571780622968044,-7.05325816474403,-9.056064485377098,-1.7769616100553698,9.958009253403318,-4.431800885696133,3.4312580477652297,-2.263400525319894,2.764025595641053,-4.987320475683026,-4.297953281434608,8.393563146698938,0.11154283233438811,-6.330008262707825,-0.3848142164474986,-9.386024091483982,8.59654373627113,6.756606237865128,5.152466241015134,-1.6541056111898342,-1.5572573178781646,9.814972499441595,-4.1718177904805565,-9.676112815777236,1.6278413594527983,-3.82297616155443,-8.293737924723583,7.049781758734905,5.051556153266233,-5.630285968767352,3.1817822345135927,-8.441941343486947,3.276722535042884,8.812788270865045,1.4777962541501477,-2.253070874172187,9.073123164347535,1.2099853154593543,0.5901151502997379,-4.130518930102838,-7.363411352597868,-3.3671641281861664,2.5299686464998494,0.7520619232243142,-3.208625485638401,-7.992521925548681,0.2472795157327532,4.975112087488753,1.1143483490570905,3.420551920778717,-3.2686966021837716,-9.189235913045923,-1.9335958296241387,9.294681122633289,0.431258353324111,-8.43207563347843,-3.2927601364284698,-2.9050508566297273,2.539205785795936,2.6150223291194727,2.9531063402946067,7.08284231979318,-2.6564784487865323,-6.016410484223869,-8.331947328127693,-1.166444292165938,-9.852556165165986,7.461299464727354,1.529214652479407,2.4396774410463564,3.2499807626787014,-6.416407300165199,8.677668571865667,-0.08395137730179414,-2.6217193172649145,1.4782373530451878,-7.151704984132037,-2.8829068120974544,9.571447644154073,-0.41479628465998175,3.415558153935475,0.4380817198977418,8.798254425823302,-3.898149397897388,6.383173320587844,8.192692996390612,-2.322220016393519,-4.966232421213728,-6.99199068357601,2.44699603171021,4.086514062557525,-5.207134741676711,-3.1654891937360308,-1.5707283950304394,1.2853436847765423,-7.835539147663351,1.7648466211551828,7.859355693343275,3.671286137709803,-2.0384392209055013,6.556824492927458,9.810332002747877,1.3580264209654658,-6.078120422259565,-2.76827689188738,-4.969688368555225,-2.091932694555929,3.7941497592692777,8.128758292663942,-3.219966880951124,5.975036780267221,-6.84285548472253,-4.290162987920221,-7.970956124881963,4.174690230981897,-5.998514130754091,-4.561800788129089,-2.738081653186275,-5.203589856299247,-4.860008388270289,-6.234816284451923,-6.134038383415121,-9.126669228354771,4.49090334107526,2.3583737891315604,3.3474307037505557,-1.3890268143814986,3.47717368974315,2.7438145290660074,-6.558476379759561,4.615362859832786,9.071542101843804,-3.179811011084692,-8.676110904178437,8.679919235429207,-9.156646696626103,-0.5677340677407727,7.649475298889854,-6.905033835686707,-5.63203634224116,9.340116425166975,5.649207557882772,-6.261946051499878,9.814655458370112,4.896394940304232,-7.375330612323934,2.953609838165523,-9.688447160419722,7.993499731767773,-1.8291795103165054,2.1582151199861688,-2.7096070715640996,-8.12790075505944,-1.8113707267563548,-0.21088620684242443,-5.085991719274867,-7.826059359153228,-0.8745133840762378,7.813708220662903,-1.060701590702994,6.6076942221302915,7.7835846132086,-1.089129931825239,6.121572178271606,-6.916513680828715,-3.2352863967037226,4.8301526433910436,7.546734605844961,-4.570065725385906,1.2362703336518788,3.6369603948831575,-6.9570644220023015,-8.955818017997714,5.67238858454154,5.710983429552034,6.1924684022481635,5.356927315422858,6.36830600353408,1.205181690840904,-8.714135653554802,9.32304834250936,-1.0105309404960483,-5.969621222143591,-8.96173207614535,-0.42511447204252484,9.059326578866553,7.007574662076657,-6.929002242715403,-4.87736695354041,-1.66393996705132,-1.8619077338691348,-2.5743942473162207,7.0024547183244366,-0.2467867260812504,-1.328616223956253,5.911960396447334,-4.367027014926856,-4.858247896691754,-2.4877239270438967,2.9862192684742883,-1.7454572595263418,8.20805534932138,9.138252880480742,3.319396557431883,-6.957669018758823,-4.982687618974473,-7.902602229098337,-1.1350326413199507,-9.916139127002378,3.2229106187693812,-7.687181565672421,5.128525188599383,2.354820280270257,-3.3300864204219494,6.833180071254166,5.904326285836724,7.191297327984859,9.81243058082423,-4.365170240788054,-1.3653620267078423,-5.677329389674548,-2.2378451069791128,4.127162071128595,8.919371486421323,6.7737456320323375,-1.1931634049865725,-1.538557896631092,-8.06514432566738,2.356979376602011,-4.700894175326891,8.932093953611805,-1.6572431572345359,5.490627638199012,-5.626297175332873,-1.2560143927754286,1.5936287057671485,0.26952104300236,-2.4827214028431133,-7.629643888647797,2.4263277410734183,8.243422667251515,5.471322262832379,-2.2100085132646763,-8.786366008328756,-8.992865377536887,7.024084359677399,0.5839001686815379,-0.6893248015401721,-5.283369493523091,-3.780603026249141,-8.965691562022924,7.779037063879034,-5.2927458053642695,1.773019176103169,1.1623666978145195,-1.6782619570010695,1.3988383113376237,-2.660776701380896,-5.11177203602184,8.955884533621159,9.772296882052235,-3.1162647042137204,-8.821286713384966,-5.001993238423501,6.368331980423161,-1.452553942739062,7.489929884769833,-4.394191149619435,7.72037147738159,-1.4808456267056869,4.119777832047289,-3.277500786455483,-4.0836323258416085,0.919520093601438,-3.9112998021933842,8.441736089387813,5.288886337852343,-0.4916153194679005,-6.695816038437625,-1.040889850111082,-8.06096358997538,6.700242253474933,-6.531423184038778,-9.518010726292164,-5.579875821433333,-8.959364450582656,-9.289253880623317,9.902312964619028,4.257726231761655,8.97726095027522,3.377335464412411,5.449768824984126,1.4418003427550161,-3.01679455877923,-3.6873573607518306,-6.327210612624898,-3.1926876022814143,5.243088114935057,3.5348954829150117,4.983043574593982,5.643555000424847,0.47339575605599293,-9.413957324875998,-8.372581969852497,3.3137030887239494,1.7370783365509048,-3.71353396886128,1.4120521102585304,8.27366978916329,5.23628448463883,2.639047237839014,5.6045015759030505,-2.4245198627162656,-9.472017530670245,5.65835415324627,0.564238850979045,5.988819883405959,4.481249214109866,-9.571115118238097,-3.42695361279731,-2.1711810264428832,9.700551668058669,-7.459664611284897,-1.0211982139999911,-6.694418455547577,5.703258731565835,8.752051580088335,7.800662873970499,-5.4481561804868495,-6.561242159762211,-1.6571225621617902,-6.9047028782221975,6.642970686579588,8.686118988339473,-6.144879415934206,7.380681095779494,7.829845108264198,3.7314053520402535,-7.820941131084118,5.80383289371596,-7.553051810962845,-2.8533440091936058],"qim":[-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0],"im":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"qre":[0.2618909047253771,0.2549536222096609,0.6564604676671189,-0.42385721489623146,-0.1393885470141421,-0.1584069382150565,-0.1560545657582727,0.13906725731085212,0.1418603145860921,-0.21995662070180771,-1.8906886473465627,-27.880013162928922,-0.7386956656049873,-0.148977314485882,-0.1368884336421195,-1.0811792851646707,-0.13958440439259673,-0.11256980025468463,0.17978515771421508,0.25913207071449934,0.1097463519838048,-0.9232641404978946,0.25090132776078766,0.19268105165932362,0.9019431573301555,-0.2586114109337229,-0.10888608233119716,-0.21649769501934396,-0.22359756646350548,0.13353280890454391,0.15423719810864397,-0.3435468531980553,-0.121903968404102,-0.1320416145856463,0.1105259140633063,-0.19245554315591154,0.28029610292854507,-0.10910163282257933,-0.1622073845177649,0.12572491222952514,-0.3169616457880784,-0.12026228630858679,0.21532556847715087,-0.2621516619823319,-5.814480404621384,-0.2730421654562611,-0.2062447441398595,-0.12055467021021923,0.15072406413047626,-0.16893289313622178,-0.21198357087210848,-0.522916151072102,0.10407847425409571,0.6176536287901117,-0.4105188115521337,0.10000169919078664,0.15935079238241895,0.18763288464279107,4.59779589905541,0.32976256075127225,0.11965638504460847,-3.826002758081484,0.10686330002262412,0.2819854513629673,0.1138444456243292,-0.26985445495445676,0.18989990136155274,0.24553429238078453,-13.039876567543404,0.17451780816474213,-0.2711720246787373,-0.10165775863597049,0.11373146748993962,0.14773290770471145,0.4040124319666395,0.10645884051200862,-0.10656890398899449,-9.190287703582397,-0.40365335534077457,0.6458669228943297,0.13533294871921095,-0.10099342099796738,-0.9850504379810006,0.13166242709547135,-0.10793556409998238,-0.502551489225431,0.3715101781016765,-0.35789914615210944,-0.10407895976166436,-0.198500155648152,-0.18576004306012658,-0.12057739848915729,-0.23976507140018627,0.4582426582813155,-0.11725092642194813,0.2553843327748818,-0.125082232051096,-0.18990024966550823,-1.8115126278777856,-0.15874975298193642,-0.5330242566289223,0.19071241240668105,0.6097206523131373,-2.6564664206789743,0.2236614527455437,0.10224570388512083,-0.9112719029073083,-3.5813224295978046,-0.16830673870601984,-0.1545731097672903,0.9825246316072074,0.16008381990028206,0.3648229356999345,-0.32319839379299165,-0.11114409766772962,-0.14007062012581403,-0.18313807055292838,-0.15413831631501387,0.23438277337805258,0.19295861795284855,-88.12042604801775,-0.19841645070755035,0.23657890892118832,0.14125269627253492,2.7640718712275123,0.10554219284597693,0.13546417466458585,0.14185489721651798,0.22647393085220413,0.13717205492091145,0.217685019908484,-0.15151477541161754,0.1256160724068014,-0.1769149269296068,0.3282026636073801,-0.5239615495970498,-0.10439107962515272,0.13511993707778336,0.16654360203857996,0.2048643284746207,-0.3336984798045511,0.2148280430061074,-0.10713572962181678,-0.4854424661878382,0.11253320456370226,0.1466513966370312,-0.17914775781638975,-0.22635457657641303,0.16730429852494672,-0.22604130808844905,-0.215073884455462,-0.3096336776043751,-0.10916811332027974,0.21033204158375163,-0.1311286525670124,0.11676717462329259,-0.20914387802483106,-0.3431271320130839,-0.11666187505085057,-0.14177844857551603,-0.11042324197389587,-0.5627583591796562,0.10042167812389138,-0.22564190625701433,0.291438296414721,-0.4418130988366129,0.36179115040650434,-0.20050847040525255,-0.2326688855180416,0.1191389142516054,8.965165928386641,-0.15797767688414108,-2.5986565913071797,-0.10654138432345474,0.11632582008287018,0.1480032970392497,0.19408181504222355,-0.6045563192792014,-0.6421546320697639,0.10188515556787278,-0.23970366162248158,-0.10334728615084618,0.6143104757678302,-0.2615763106389337,-0.12057289596998308,0.14184836271860018,0.1979588011415889,-0.1776108719072633,0.314289265039181,-0.11845616539038277,0.30518299590688797,0.11347146547319037,0.6766832688820699,-0.4438386787843127,0.11021563158422217,0.8264563108523046,1.6945845221768476,-0.24210033095650355,-0.1358066189860753,-0.29698582009386126,0.39526181535232696,1.3296777421102524,-0.31165993179195733,-0.12511695423736366,4.044006625606416,0.20100049655459357,0.8973854547782597,0.29235048119729806,-0.3059323399216414,-0.10882297608447551,-0.5171711609423488,0.10758841393331077,2.3187956645756906,-0.11859476165389618,-0.30369658237075886,-0.3442280529161346,0.3938239293537768,0.38240591250963385,0.3386264782798978,0.14118625755729095,-0.37643821294947666,-0.16621206325967675,-0.12001996179501943,-0.8573062654737912,-0.10149650336788037,0.13402491144168832,0.653930433100834,0.4098902515453472,0.30769412898794496,-0.1558504554369941,0.11523832602251641,-11.911656867821618,-0.3814290848813065,0.6764813498589974,-0.1398267968573601,-0.34687212080658675,0.10447740375101641,-2.4108219793234733,0.29277791650181095,2.282679131723238,0.11365890909734909,-0.2565319842639657,0.15666189053251453,0.12205998692256159,-0.4306224186083072,-0.20135988717088757,-0.14302078553236233,0.40866433252901446,0.24470734339628208,-0.1920441950534196,-0.31590693848484186,-0.6366473052654154,0.7780020331090284,-0.1276236365047339,0.5666214774774301,0.12723689307597835,0.27238410804552904,-0.49057140862693316,0.15251285146928267,0.10193334942384209,0.736362698517358,-0.16452454550550777,-0.36123554075481634,-0.20121986044986506,-0.47802685172539827,0.2635636607534943,0.12302001904798694,-0.31056220047350824,0.1673629865011939,-0.14613782246791798,-0.23309137737090466,-0.12545546410403913,0.23953873094071407,-0.16670795103624886,-0.21921167680146014,-0.36521920331934266,-0.19217502293910466,-0.20576096173280617,-0.16038964973093925,-0.16302473794486605,-0.10956899773393738,0.22267234987083231,0.42402099472460497,0.29873657993265457,-0.7199285065243876,0.2875898903036585,0.36445612099750757,-0.15247443797863625,0.21666768797377503,0.1102348408653418,-0.31448409874487526,-0.11525901536348475,0.11520844524892077,-0.10921028550424079,-1.7613880456027167,0.13072792066471894,-0.14482188267228813,-0.177555672448319,0.10706504656681758,0.17701597786128842,-0.15969476449904535,0.10188844674595096,0.20423189146132606,-0.13558714213150433,0.3385687530825319,-0.10321571490685387,0.12510164928458045,-0.5466932000714182,0.4633458410792751,-0.36905720039428364,-0.12303299832709227,-0.5520681024754734,-4.741893815498359,-0.19661848764130008,-0.1277782283660316,-1.1434930765025577,0.12798020757360218,-0.9427722261991112,0.15133872215981636,0.12847550963896742,-0.9181640966602865,0.16335672779445112,-0.14458151116968268,-0.3090916467299006,0.20703279457809076,0.13250764101675155,-0.21881523376024486,0.8088845722327184,0.2749548775419443,-0.14373878684196395,-0.11165925859484735,0.17629257676831445,0.17510119094820056,0.16148649214535385,0.1866741774003449,0.15702763018062446,0.8297504082577454,-0.1147560744698833,0.10726105488913977,-0.9895788044937259,-0.16751481589663017,-0.11158557201925673,-2.352307591871322,0.11038348063671569,0.1427027250115171,-0.1443209231244397,-0.2050286577830923,-0.6009832204295851,-0.5370835416865428,-0.38844089285954925,0.14280706412611865,-4.052081794993977,-0.7526627945444438,0.16914862971695963,-0.22898873686421403,-0.2058355236835392,-0.40197386419331355,0.33487159183421833,-0.5729157758187481,0.1218315371231844,0.1094301080391411,0.3012595761603337,-0.14372629645127755,-0.20069490132030754,-0.12654059650350097,-0.8810319312377495,-0.10084570085114339,0.31027853958352547,-0.13008668930958533,0.1949878304630309,0.42466085772169093,-0.30029250708553434,0.14634474572195189,0.16936733364461856,0.13905696766402778,0.10191154900542505,-0.2290861397926757,-0.7324064829979179,-0.17613915476151804,-0.4468584518567994,0.2422972451204332,0.11211552310859353,0.14762880898141556,-0.8381081717899769,-0.6499592912230687,-0.12399034160089273,0.4242718497781984,-0.21272548640822403,0.11195583087162192,-0.6034117538121042,0.18212854083253974,-0.17773679008358392,-0.7961692204738906,0.6274987369273166,3.7102854339697835,-0.40278381571723676,-0.13106771621253613,0.41214547526773754,0.12130883497854363,0.1827711752227007,-0.4524869447325235,-0.11381269560727175,-0.11119926275087823,0.14236731064060396,1.7126215295639091,-1.4506949376631744,-0.18927315252622495,-0.26450806737890503,-0.11153629288741343,0.12855061517104377,-0.18893784753208562,0.5640096923248458,0.8603137046856202,-0.5958545361934595,0.714878904799055,-0.37583010986266446,-0.19562687712854954,0.11165842929817978,0.10233008800997404,-0.32089700167249263,-0.11336214687168614,-0.1999203022343897,0.15702698965350614,-0.6884425910643381,0.13351259829994125,-0.22757316783695364,0.12952744604708527,-0.6752898357302889,0.24273153572047318,-0.30511052938036654,-0.24488002841781475,1.0875238148231763,-0.2556694834385282,0.11845904555783371,0.1890757214506655,-2.034110737400025,-0.14934699434086243,-0.9607164484246645,-0.12405464791375571,0.1492483349361543,-0.1531059880553688,-0.10506397069270376,-0.17921545783488863,-0.11161505992034589,-0.10765127241122396,0.10098650725067979,0.234867144002879,0.11139255119562305,0.29609140416674007,0.18349402187769182,0.6935773077215277,-0.3314776596536484,-0.27119693107155357,-0.15804752855937276,-0.3132157368874503,0.19072729240454248,0.2828937955402747,0.20068056500619302,0.1771932762106013,2.112397475489241,-0.10622525315231043,-0.11943746906279824,0.3017771880054236,0.5756792764945607,-0.2692852706842589,0.7081891615295356,0.12086535062225746,0.1909751089601035,0.37892463070075655,0.17842799871795387,-0.4124527975116973,-0.10557412892892308,0.1767298357290498,1.7722990862200279,0.16697780522183284,0.22315206145004263,-0.10448103357303318,-0.29180435832737545,-0.46057882222669044,0.10308692064315615,-0.13405428422173446,-0.9792418222932857,-0.14937817327079592,0.17533835427547734,0.11425892441894259,0.12819423376657282,-0.18354833578038865,-0.15241016497343265,-0.603455666366316,-0.14482882430090563,0.1505350613725035,0.11512621475050391,-0.16273712343433674,0.13548885082866288,0.12771644728253,0.2679955420692156,-0.12786184977477036,0.17229992977274375,-0.13239681456289684,-0.350465978437214]}

},{}],62:[function(require,module,exports){
module.exports={"re":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"qim":[0.4576907902365636,-0.1020547713846564,-0.30883219951829805,0.43190913975086653,-0.16590458083576365,-0.8148285547186509,1.2107001321635014,0.3352046078451106,-0.26802362595605406,0.5761543523274492,0.12145310381524389,-52.588357639366706,0.34907072336396916,0.24548954946231152,-0.34227272151032245,0.1607114910664648,0.15863606302802077,-0.11681740851319801,-0.1702856035097756,0.3483092463683852,-0.1580290718900084,-2.1985257747796285,-0.1411440902923258,0.13141119916324162,-0.10540661219942658,0.23629584046481236,0.16699730226631082,0.1797493172550402,26.105890808558822,0.10638902134066948,0.8158276671568492,0.5862795293018581,-0.4251848772250665,0.139637125299002,-3.6815946237702035,0.12552811484084722,0.11055151507059749,0.3224860716153039,-0.18533351803535245,-0.1120651341597751,0.21524720883154813,0.11698736225951732,-0.17604672618596862,-0.3090470055756697,0.49499479164347804,0.11165218969981387,0.11323283302006303,6.957780697052643,0.23885360726905333,-0.17507886805231893,-0.9985023890765934,-0.12169729617524386,0.1883165074036617,0.7632433186503174,0.3828040900362861,0.12205961050185868,-0.11473428623286518,-0.49901374780878116,0.1123560758010748,0.3238969439304416,0.556128537477809,0.22117004282171565,-0.5440642374332723,0.6771844847222779,0.12424424755304528,-0.2227145132951905,-0.2520565003932793,0.4207122377868457,-0.146380445360078,-0.2564169364308642,-1.2915479621972739,0.13916981915032295,0.6116156814522318,-0.19482353173628433,-0.22157497820951805,-0.1577971144762768,-0.5430608087641717,-0.5858551162030975,-0.14782206997594854,0.15043997262761344,0.19282875458430962,-0.3021860631525998,-0.15605658358011573,0.7823709076890257,0.2117891149076967,-0.40428642073396176,0.2599167018033513,-0.2084551512438982,-0.21995714547464398,0.12307528832782576,-0.33959433915692044,-0.578227961875464,-0.3651947966643613,0.1529868031201862,0.5261689285371913,-0.1751224617774233,0.11271425453406857,0.23495481562403103,-0.1184699952584226,0.44978210988197914,-0.26024793339249847,-0.4381950151499878,0.15607430425765767,0.12484083008969149,-0.12643507393255324,-0.4151778501208534,0.1091595721166483,1.9578665268628639,-1.3992605822028914,0.8279047271624635,-0.2372600192033912,-0.11716476167281992,0.15957997212466615,0.15205884290534297,0.13397330868493268,-0.13578177134711178,0.10685046106938448,0.12059459551519829,0.1935824504841107,-0.2580368679672368,-0.646225443472348,-0.1768683955361632,-0.11930621492996707,0.26579288059406125,0.5968499674339786,-13.70136346178529,-0.8532403570708903,0.20070923287916753,-0.21292482031680984,-7.063229002328101,-0.4386815419090181,-2.9858426648510794,2.240337372199552,-0.5215322468038021,0.1627341194561262,-0.7585883430370631,-0.8135953670483611,0.14628362000966863,0.10839684703954104,0.6038220415568717,0.4293360976641476,0.10848602547642254,0.8556067818613137,-0.44172114764004367,-0.11225939902534726,-0.35961602054824193,0.13809245735785503,-0.11354796059437278,0.11659387832777092,-0.15742573595797885,0.10553863555625001,-0.5908913885915336,-0.1432229698943817,0.10765836047864712,-0.29768603452847453,-0.736714970656697,-0.112534041681292,0.10907742096843769,-0.8371486617082057,0.1367693099026706,-0.14441873523924595,0.3607555082360487,-0.10809615756269393,0.39134898560447334,0.1431233217541935,0.36162771009346223,-0.2766132949489599,-0.14754070473077008,-0.19910135767204107,-0.12800489862445005,-0.15226503902060634,0.1474523516342054,0.31128155410946506,-1.692643047005413,-0.283028606720534,0.3317436885837388,-0.27572862646629126,0.14301948252509186,-0.12397809737364802,0.33241999657212956,0.22421805096175212,0.3283102573128722,0.12031323452805948,-0.17887476643396907,-0.11606114017548814,-0.37133424083180266,-22.853164207561356,0.11131025875269564,1.032783768936358,0.14260706704184423,-0.3678667577383133,0.10089015233755495,0.3391866568084548,-0.3391789647617223,0.14128566648253027,0.4798985114545482,0.10795250622296315,0.10000486834993069,-0.1914309365626845,-0.17470594903236794,0.20023023625922168,0.16136326297297315,0.3820715677969921,0.8323934824662638,0.4964817904091048,0.1086280879096746,-0.27091838759487596,0.11317713497868019,-0.1061003151821934,0.5242451341134949,-0.16031113196403501,-0.37724207817842903,0.1465221457912265,0.11704193197046227,2.377123956315366,-0.26509045562205424,-0.10626389369151905,-0.14090082811859558,-0.13299692335331295,0.11332560709385192,-0.149479578940424,-0.18736814155960232,0.1363603779566759,-0.23658227171624469,-0.11209050665960094,-0.3237361054506881,-0.935396378677282,0.10740252541433674,-0.38382032502382923,-0.4690012928954559,-0.22062616153711734,-0.2014236302793715,-0.39690130576080285,-0.27993331828107454,-0.23691898616872822,-0.20798198482063382,3.509348182775784,0.1103390331580814,-0.1174713302072341,-0.12730469771805605,0.16318434834963683,0.15882512948489547,0.30738206942262747,0.12801270509253404,-0.3348858910782563,0.12749792409202415,0.10530696708839325,0.12322207630089756,0.2974408212759298,0.6271756414837486,0.2624844323671894,-0.2225469273405108,0.41677727647778057,-1.6126954172054158,0.12429205310899347,0.12259138784666032,1.887313900672903,0.13098724994465658,0.1657735667278716,-0.10686672662207813,0.3193084173094682,1.1962525100353611,-0.5213015322811385,-0.5108782025638042,0.10827801556139977,-1.4065691115140322,-0.16891693928459153,-0.2268932527065616,-0.6084798041655695,-0.14990181464809577,-0.12981941189107626,-0.8549803399395901,0.26667587161663936,-0.18386079012054704,0.10208352044799718,-0.1577802972416906,0.12342120838759178,2.922840723185105,-0.40373409909510904,-3.1075097280663986,-0.151632748968699,0.1557841858508306,0.293522085490228,-0.31570955215470947,0.5836348797588162,0.5642965916222117,0.22439902354115426,0.3589058198598515,-0.3366221899776676,0.11846877131012715,0.8666098970773342,0.12278917874236872,0.511434750982581,0.11468725392472943,0.17201211234950822,-0.38411874878872515,0.18806169468195713,0.14377644607997964,0.11124521447372367,0.2900892137762008,0.13276404291296498,-0.1358430531682257,-0.2127845459155886,0.11493863839643507,0.607908117476968,-0.8675398897858574,-0.27735549282944516,0.21622632903813102,0.1473679078873445,-0.3026844522219774,0.23936025078116369,0.15345591437176243,-0.20063507798797708,0.11011333673171265,-0.33998454858735805,-0.2409850757865298,-0.80654819792687,0.29432723539381334,-0.2892297728103202,-0.3673445281307209,-0.25280461931536224,0.2227037317330756,0.2183370778092338,0.14095807373903807,-0.1408974190124504,0.22758203834817806,0.21602150916682714,-0.40781410500788595,-0.5182026544884719,-0.8289515900732957,-0.1679889438226032,0.1354674067140807,-0.8285023198942152,-2.9842452800027557,0.6774367207206954,0.5176487726639655,0.1875672433377745,-0.33827364708218727,0.4198951778006448,-0.37073630423966586,-1.0257598585774959,-0.6358257968903991,0.37789244385433396,0.18866160051943112,0.21324488320178078,0.43046631001104046,-0.583032175425759,-0.21457551908835376,-0.12624377759470565,0.43034242253507876,0.180664489889858,0.26311922775855107,3.242463704368581,0.1376144427857628,-0.13849902379137663,-1.1775621641151224,0.1278345256836951,-0.1515627444506145,0.2600905837742174,0.6986004624509932,-0.15631491235169087,-0.10466037380156944,-0.10632925228967444,-0.4345658152498649,0.9031108903848367,-0.2639561352308689,2.193409874399718,-0.2016881747241721,-0.10897436504269775,0.46727016455219866,0.10201434420115288,-0.20652745649360943,0.14073795008426565,-0.5980152705661542,-3.1675039790784787,0.5040076036641195,-0.11796903319564142,0.16208922403792334,-0.14328792448066843,0.452099461143575,-0.5261459608707968,0.1274679596661826,-0.159497733228782,0.19160151315845464,-0.2521196576686352,-0.1561749529252398,-0.15884332261403503,-0.11952200294412986,-0.38182704202427725,0.18713301351215966,-0.1579429449698669,0.1587446558211471,-0.45008701950427527,0.12274313278743924,0.14088661901000774,0.16064480968186026,9.38827969089673,0.19710008073120178,-0.7012130920430931,8.991879100229337,0.7796787688970267,-0.17436535036270515,-0.10675385243155419,0.23026473486056442,-0.11475617525513031,-0.124409209717146,0.11408964346901683,8.135648248580111,0.20769393511737003,0.27351042534331915,-0.396687333425262,-0.11015499516292965,0.2609241911806781,-0.13461618704403377,0.12752699232229192,195.7205584829486,-0.40286125234445347,0.1283610709801271,-0.21022034874620257,0.312933377668642,0.200173359142664,-0.5591175256382964,0.2602841188944274,-0.3949498102573434,0.5088368818138348,-0.4247064583932337,-0.21696324866665972,0.2586659578325132,1.0026573335183617,0.1324001815535163,-0.13644805427489215,-1.919832862782501,-0.19234804609766015,0.3144831004994091,0.20111687762276217,0.15305960657523354,0.22763418742105443,0.15035135393136848,-0.41452436725894504,0.10911051175306406,-0.10131863709017569,-0.1961277544331878,-0.17654406100091052,0.27546682117494603,5.088664071659052,0.164128535550806,-3.5529252592248577,-0.2625590606295072,0.17853621353188934,0.3429422096142067,-0.13401869229551752,0.2496918850840169,-0.149011088855513,1.1714501099459904,-0.14820415871528575,-0.2488975379901287,-0.1480057146258892,-0.2513292678439913,1.3959990219099654,1.3868434684274857,-0.26171234773779706,-0.22528558848210756,0.24002803810169945,0.18021005361336515,0.1537770525134975,0.2933760260574102,0.23630065828707525,-0.3462559246946066,-0.19952462019709363,-0.16568771917840908,1.035101802195459,0.12099782274378755,-0.397139602476006,0.12732621555011558,-0.1368256020220048,0.14690979978804897,0.49147712788551645,0.3022991574857151,0.13757737967946337,0.7458679139140774,0.10178787627509867,0.12019842916284533,0.23655780098032028,0.5945079326236262,-1.6519392609760388,0.15461576396003296,-0.22808929888722598,-0.25335054689519154,-0.14993189432038553,10.29603001826424,-0.10239285799311744,0.11387187669027597,-0.363926986316509,-0.27224158638276597,0.29292584490850604,-0.15661637710299947,0.16074598399267465,0.17148523269963542,-0.2289989057603645,-0.32767828762099954],"im":[-2.1848811934431467,9.798659939483699,3.23800433231947,-2.315301779853094,6.027561113517081,1.2272520326012462,-0.8259683578401997,-2.9832525466418236,3.731014370218105,-1.7356460052074105,-8.233630665554777,0.019015615715890277,-2.8647489837104434,-4.073493157612087,2.9216467955359438,-6.222330421826738,-6.303736873647479,8.560367951383036,5.872487041704574,-2.871011925254381,6.327949585732057,0.45485025077781316,7.084958342420741,-7.609701504647104,9.487070869026944,-4.231983085410738,-5.988120684759917,-5.5633034676906945,-0.0383055306303568,-9.399466104664022,-1.2257490647320033,-1.7056710153103936,2.3519180797925276,-7.1614192705465785,0.2716214309808862,-7.966342848913692,-9.045556719520365,-3.100909118310411,5.395678075939019,8.923381991175468,-4.645820986150846,-8.547931850806787,5.680310118028782,3.2357537266451573,-2.020223276854707,-8.956385026469992,-8.831360775216286,-0.1437239895220621,-4.186664842258647,5.7117115910366145,1.0014998571258218,8.217109429941665,-5.310208933816258,-1.3101981708380386,-2.612302287327206,-8.192718261908368,8.715790482806472,2.0039528056914246,-8.900275244308897,-3.0874017762105055,-1.7981454512930881,-4.521407995594124,1.8380182544577686,-1.4767024681761765,-8.04866237024822,4.490053141146571,3.9673644537622224,-2.376921587212424,6.831513577787813,3.899898399533459,0.7742647034948114,-7.185465973192504,-1.6350136700641507,5.132850180303748,4.513144977292583,6.337251497398832,1.841414412274883,1.7069066606108318,6.76488970938308,-6.647169515746434,-5.1859485487823065,3.3092194575995837,6.407932155496816,-1.2781661360003902,-4.721677978756493,2.4734939110360177,-3.847386462900655,4.79719495552294,4.546340142040428,-8.125107920416813,2.9446898393024092,1.7294217262626521,2.738264644331906,-6.536511513443428,-1.900530315957866,5.7102897586660095,-8.871992314847311,-4.256137493262431,8.440955854000553,-2.223298744057196,3.8424896865245373,2.2820889453927595,-6.407204598837324,-8.010199862349147,7.909197732058509,2.408606335113763,-9.160900694365095,-0.5107600473676435,0.7146631676179105,-1.2078684505490997,4.214785126282695,8.534989409123526,-6.266450524372731,-6.576401483092322,-7.46417334778017,7.364758833817284,-9.358873981373272,-8.292245566460497,-5.165757523469723,3.8754151989124708,1.5474475821111646,5.653921363217975,8.381793023833684,-3.762328011814864,-1.675462938029927,0.07298543701793747,1.1720026973793463,-4.982331832248232,4.696493337470496,0.14157830641911673,2.2795579582589287,0.3349138291082312,-0.4463613437909153,1.917426978156147,-6.144992846872559,1.3182380261690128,1.2291122104442351,-6.836035367007631,-9.225360582999427,-1.656117086122988,-2.3291775498044887,-9.217777087956197,-1.168761189368519,2.2638716876985363,8.907940080582545,2.7807437457193362,-7.241525128404254,8.806851261488514,-8.57677962464531,6.3522015248315356,-9.475203035641101,1.692358391588055,6.98212026141784,-9.288642289869715,3.3592439147639865,1.35737705874039,8.886199989440556,-9.167800183773661,1.194530966530479,-7.311581821328423,6.92430935877805,-2.7719604473667037,9.251022631586299,-2.5552640655383607,-6.986981490811437,-2.765274817412502,3.615155230281024,6.777790588873653,5.022567458566485,7.812201023133277,6.567495772057484,-6.781851824789915,-3.2125257240534744,0.5907920171173586,3.533211754059238,-3.014375357882897,3.626754366479439,-6.992054385489448,8.065940849101572,-3.008242615702623,-4.459944218186891,-3.0458993519871136,-8.311637567742224,5.590503456333771,8.616148337746537,2.692991623287856,0.04375761670977418,-8.983897901286504,-0.9682568898520536,-7.012275203069542,2.718375550289224,-9.911770146349198,-2.9482291827438223,2.9482960439557715,-7.077858815378475,-2.0837739149660006,-9.263332876539412,-9.999513188706608,5.223816055836657,5.723903539282048,-4.9942507119922785,-6.1971974387224105,-2.617310693297479,-1.2013549133483625,-2.0141725624538864,-9.205722196192117,3.6911485000249336,-8.835706966679936,9.425042689862131,-1.9075045907503032,6.237869995355936,2.650817758264541,-6.824906873974257,-8.54394645717544,-0.42067642175044107,3.772297262281384,9.410534145332285,7.097190366818175,7.51897092644354,-8.824130976610064,6.689877019245259,5.3370866128908965,-7.3335085674059775,4.226859403900702,8.921362118888652,3.088935658282086,1.0690655029198126,-9.31076803028799,2.6053857359896604,2.1321902842236042,4.532554040884964,4.964660792842505,2.519518040090958,3.572279306159345,4.220852098733122,4.808108744910825,-0.28495320153984594,-9.062975915035544,8.512715385412552,7.855169667145493,-6.128038688228923,-6.296232864680911,-3.2532801990641635,-7.8117246196551315,2.986091760331341,-7.843264956049247,-9.49604786510102,-8.115428907057915,-3.3620133097747207,-1.5944496786167228,-3.8097497477530418,4.4934343149565805,-2.399363056573245,0.6200798919196195,-8.045566671290608,-8.157179860389698,-0.5298535657706225,-7.634330825500268,-6.032324813530536,9.35744952249155,-3.1317683649749117,-0.8359439095099077,1.9182755815509456,1.9574137142308565,-9.235485105773327,0.7109497797257891,5.9200693798695845,4.407358914693194,1.6434399188833169,6.67103331835952,7.703008243782836,1.1696175377209919,-3.7498705598590965,5.438897544954294,-9.79590041185359,6.337926962250442,-8.102335190720233,-0.3421329092850023,2.476877732748619,0.321801084311403,6.594881427668547,-6.419136798375278,-3.4068986608957985,3.167468304886647,-1.7133999948962,-1.7721177388742504,-4.456347377182781,-2.786246264801413,2.9706894844524143,-8.44104306089411,-1.1539217396114765,-8.144040136453388,-1.955283637020706,-8.719364757449956,-5.8135440948955885,2.603361598863337,-5.317403959860951,-6.95524216423963,-8.989150721950399,-3.447215382408131,-7.532159898562005,7.361436427386664,4.699589416595597,-8.700294469740438,-1.6449854365333216,1.1526847488786238,3.605481145509284,-4.624783690535912,-6.7857379149634856,3.303770618738744,-4.177803109482263,-6.516529545921568,4.984173306224768,-9.081552059733378,2.941310139401976,4.1496345644483945,1.2398515086517747,-3.3975788841355037,3.4574587197003748,2.7222400864077834,3.955623922965369,-4.49027051418502,-4.580074122241955,-7.0943080695848915,7.097362088028277,-4.394019876340587,-4.629168659439968,2.452097629091723,1.9297469654745782,1.2063430627011407,5.9527727078039305,-7.381849437116732,1.2069972237708182,0.3350930993175858,-1.4761526345016307,-1.9318117859214077,-5.331421319655383,2.9561865330793538,-2.381546759450459,2.697334975194501,0.9748870475266802,1.5727578290950905,-2.6462556112539515,-5.300495687764535,-4.689444290458122,-2.3230621694282005,1.7151712069231007,4.660363886097553,7.9211824856066215,-2.323730935261179,-5.535122040914899,-3.8005584332196385,-0.30840746147834963,-7.266679134520735,7.220267498103933,0.8492120675017176,-7.822612824287631,6.597927502730343,-3.8448143161849035,-1.4314333496023846,6.397342294189521,9.554714584680802,9.404749666401155,2.3011474094551687,-1.107283735194331,3.7885082653045785,-0.4559111416755499,4.958148891810815,9.176470077235003,-2.1400895581645685,-9.802543042654769,4.841971217666853,-7.105404046323387,1.6721981013181786,0.31570599645811015,-1.9840970507786615,8.476800842654924,-6.169441589565721,6.978955160557959,-2.211902658478122,1.9006132791458707,-7.84510870511173,6.269681579521947,-5.219165462294648,3.966370608492241,6.403075405303277,6.295511725285721,8.366660325023556,2.6189868446677966,-5.343792531482006,6.331400241972091,-6.299424663005162,2.221792579358093,-8.147095298046146,-7.097906153379734,-6.2249132230315585,-0.10651578701576625,-5.073564639294923,1.4261000134585977,-0.11121145967971202,-1.2825794928527436,5.735084395608734,9.36734344684334,-4.3428274008416645,8.714128000316862,8.037990131707915,-8.765037470483188,-0.12291583527772687,-4.814777087423807,-3.6561677630560796,2.520877062963759,9.078117597126717,-3.8325308032000205,7.428527147874824,-7.841477178986196,-0.00510932529393493,2.4822441825330532,-7.790523967775402,4.756913429000598,-3.195568358511367,-4.995669774853995,1.7885327397998942,-3.8419554917432563,2.5319672880673494,-1.965266347115664,2.3545674435544015,4.6090755284384155,-3.8659899755633953,-0.9973497091882457,-7.552859733774602,7.328796334357186,0.5208786761523889,5.198909062441288,-3.1798211045743585,-4.97223312046299,-6.533402393847583,-4.393013243438264,-6.651087428560665,2.4124034169873543,-9.165019794455485,9.869852464655434,5.098717429820248,5.664308356398591,-3.630201255217269,-0.19651523187970454,-6.0927857343274106,0.2814582145806721,3.8086668866136897,-5.601104561464134,-2.915943187993544,7.461645706816427,-4.004935921980475,6.710909957645093,-0.8536428410477548,6.747448983001178,4.017717523745294,6.7564958726605795,3.9788442013873784,-0.7163328801132174,-0.7210619098447211,3.8209889928536143,4.438810341742837,-4.16617995092849,-5.54907997611203,-6.502920843226767,-3.4085948106895136,-4.231896801510926,2.888037225303762,5.011912810620483,6.035450333667885,-0.9660885507869779,-8.264611522122149,2.5180062470864186,-7.853842161879068,7.308573726130408,-6.806897847813618,-2.034682680559934,-3.307981432423457,-7.268636765214342,-1.3407199603912687,-9.824352728387158,-8.31957627869825,-4.227296651625503,-1.6820633420094069,0.6053491333629033,-6.467645823348858,4.384247769968503,3.9471002224190563,6.669694960720808,-0.0971248139550962,9.766306162361609,-8.781799589726042,2.747803921114812,3.673208099052218,-3.4138332870981225,6.3850282997055,-6.220995232114608,-5.831405913251713,4.366833093283198,3.051773760355534],"qre":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}

},{}],63:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/* eslint-disable id-length */

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var Complex128 = require( '@stdlib/complex/float64/ctor' );
var real = require( '@stdlib/complex/float64/real' );
var imag = require( '@stdlib/complex/float64/imag' );
var cinv = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var largeNegativeImaginaryComponents = require( './fixtures/julia/large_negative_imaginary_components.json' );
var largeNegativeRealComponents = require( './fixtures/julia/large_negative_real_components.json' );
var largePositiveImaginaryComponents = require( './fixtures/julia/large_positive_imaginary_components.json' );
var largePositiveRealComponents = require( './fixtures/julia/large_positive_real_components.json' );
var tinyNegativeImaginaryComponents = require( './fixtures/julia/tiny_negative_imaginary_components.json' );
var tinyNegativeRealComponents = require( './fixtures/julia/tiny_negative_real_components.json' );
var tinyPositiveImaginaryComponents = require( './fixtures/julia/tiny_positive_imaginary_components.json' );
var tinyPositiveRealComponents = require( './fixtures/julia/tiny_positive_real_components.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cinv, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse of a double-precision complex floating-point number', function test( t ) {
	var v;

	v = cinv( new Complex128( 2.0, 4.0 ) );
	t.strictEqual( real( v ), 0.1, 'returns expected value' );
	t.strictEqual( imag( v ), -0.2, 'returns expected value' );
	t.end();
});

tape( 'the function computes a complex inverse', function test( t ) {
	var delta;
	var qre;
	var qim;
	var tol;
	var re;
	var im;
	var i;
	var q;

	re = data.re;
	im = data.im;
	qre = data.qre;
	qim = data.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large negative imaginary components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largeNegativeImaginaryComponents.re;
	im = largeNegativeImaginaryComponents.im;
	qre = largeNegativeImaginaryComponents.qre;
	qim = largeNegativeImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large negative real components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largeNegativeRealComponents.re;
	im = largeNegativeRealComponents.im;
	qre = largeNegativeRealComponents.qre;
	qim = largeNegativeRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large positive imaginary components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largePositiveImaginaryComponents.re;
	im = largePositiveImaginaryComponents.im;
	qre = largePositiveImaginaryComponents.qre;
	qim = largePositiveImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large positive real components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largePositiveRealComponents.re;
	im = largePositiveRealComponents.im;
	qre = largePositiveRealComponents.qre;
	qim = largePositiveRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny negative imaginary components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyNegativeImaginaryComponents.re;
	im = tinyNegativeImaginaryComponents.im;
	qre = tinyNegativeImaginaryComponents.qre;
	qim = tinyNegativeImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny negative real components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyNegativeRealComponents.re;
	im = tinyNegativeRealComponents.im;
	qre = tinyNegativeRealComponents.qre;
	qim = tinyNegativeRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny positive imaginary components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyPositiveImaginaryComponents.re;
	im = tinyPositiveImaginaryComponents.im;
	qre = tinyPositiveImaginaryComponents.qre;
	qim = tinyPositiveImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny positive real components)', function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyPositiveRealComponents.re;
	im = tinyPositiveRealComponents.im;
	qre = tinyPositiveRealComponents.qre;
	qim = tinyPositiveRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function may overflow', function test( t ) {
	var v;

	v = cinv( new Complex128( 5.0e-324, 5.0e-324 ) );
	t.strictEqual( real( v ), PINF, 'real component is +infinity' );
	t.strictEqual( imag( v ), NINF, 'imaginary component is -infinity' );

	v = cinv( new Complex128( -5.0e-324, 5.0e-324 ) );
	t.strictEqual( real( v ), NINF, 'real component is -infinity' );
	t.strictEqual( imag( v ), NINF, 'imaginary component is -infinity' );

	v = cinv( new Complex128( -5.0e-324, -5.0e-324 ) );
	t.strictEqual( real( v ), NINF, 'real component is -infinity' );
	t.strictEqual( imag( v ), PINF, 'imaginary component is +infinity' );

	v = cinv( new Complex128( 5.0e-324, -5.0e-324 ) );
	t.strictEqual( real( v ), PINF, 'real component is +infinity' );
	t.strictEqual( imag( v ), PINF, 'imaginary component is +infinity' );

	v = cinv( new Complex128( 0.0, 5.0e-324 ) );
	t.strictEqual( real( v ), 0.0, 'real component is 0' );
	t.strictEqual( imag( v ), NINF, 'imaginary component is -infinity' );

	v = cinv( new Complex128( 0.0, -5.0e-324 ) );
	t.strictEqual( real( v ), 0.0, 'real component is 0' );
	t.strictEqual( imag( v ), PINF, 'imaginary component is +infinity' );

	v = cinv( new Complex128( 5.0e-324, 0.0 ) );
	t.strictEqual( real( v ), PINF, 'real component is +infinity' );
	t.strictEqual( imag( v ), 0.0, 'imaginary component is 0' );

	v = cinv( new Complex128( -5.0e-324, 0.0 ) );
	t.strictEqual( real( v ), NINF, 'real component is -infinity' );
	t.strictEqual( imag( v ), 0.0, 'imaginary component is 0' );

	t.end();
});

tape( 'if a real or imaginary component is `NaN`, all components are `NaN`', function test( t ) {
	var v;

	v = cinv( new Complex128( NaN, 3.0 ) );
	t.strictEqual( isnan( real( v ) ), true, 'returns NaN' );
	t.strictEqual( isnan( imag( v ) ), true, 'returns NaN' );

	v = cinv( new Complex128( 5.0, NaN ) );
	t.strictEqual( isnan( real( v ) ), true, 'returns NaN' );
	t.strictEqual( isnan( imag( v ) ), true, 'returns NaN' );

	v = cinv( new Complex128( NaN, NaN ) );
	t.strictEqual( isnan( real( v ) ), true, 'returns NaN' );
	t.strictEqual( isnan( imag( v ) ), true, 'returns NaN' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cinv/test/test.js")
},{"./../lib":52,"./fixtures/julia/data.json":54,"./fixtures/julia/large_negative_imaginary_components.json":55,"./fixtures/julia/large_negative_real_components.json":56,"./fixtures/julia/large_positive_imaginary_components.json":57,"./fixtures/julia/large_positive_real_components.json":58,"./fixtures/julia/tiny_negative_imaginary_components.json":59,"./fixtures/julia/tiny_negative_real_components.json":60,"./fixtures/julia/tiny_positive_imaginary_components.json":61,"./fixtures/julia/tiny_positive_real_components.json":62,"@stdlib/complex/float64/ctor":33,"@stdlib/complex/float64/imag":37,"@stdlib/complex/float64/real":39,"@stdlib/constants/float64/eps":41,"@stdlib/constants/float64/ninf":43,"@stdlib/constants/float64/pinf":44,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/abs":50,"tape":246}],64:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
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

/* eslint-disable id-length */

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var Complex128 = require( '@stdlib/complex/float64/ctor' );
var real = require( '@stdlib/complex/float64/real' );
var imag = require( '@stdlib/complex/float64/imag' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var cinv = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( cinv instanceof Error )
};


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var largeNegativeImaginaryComponents = require( './fixtures/julia/large_negative_imaginary_components.json' );
var largeNegativeRealComponents = require( './fixtures/julia/large_negative_real_components.json' );
var largePositiveImaginaryComponents = require( './fixtures/julia/large_positive_imaginary_components.json' );
var largePositiveRealComponents = require( './fixtures/julia/large_positive_real_components.json' );
var tinyNegativeImaginaryComponents = require( './fixtures/julia/tiny_negative_imaginary_components.json' );
var tinyNegativeRealComponents = require( './fixtures/julia/tiny_negative_real_components.json' );
var tinyPositiveImaginaryComponents = require( './fixtures/julia/tiny_positive_imaginary_components.json' );
var tinyPositiveRealComponents = require( './fixtures/julia/tiny_positive_real_components.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cinv, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse of a double-precision complex floating-point number', opts, function test( t ) {
	var v;

	v = cinv( new Complex128( 2.0, 4.0 ) );
	t.strictEqual( real( v ), 0.1, 'returns expected value' );
	t.strictEqual( imag( v ), -0.2, 'returns expected value' );
	t.end();
});

tape( 'the function computes a complex inverse', opts, function test( t ) {
	var delta;
	var qre;
	var qim;
	var tol;
	var re;
	var im;
	var i;
	var q;

	re = data.re;
	im = data.im;
	qre = data.qre;
	qim = data.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large negative imaginary components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largeNegativeImaginaryComponents.re;
	im = largeNegativeImaginaryComponents.im;
	qre = largeNegativeImaginaryComponents.qre;
	qim = largeNegativeImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large negative real components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largeNegativeRealComponents.re;
	im = largeNegativeRealComponents.im;
	qre = largeNegativeRealComponents.qre;
	qim = largeNegativeRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large positive imaginary components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largePositiveImaginaryComponents.re;
	im = largePositiveImaginaryComponents.im;
	qre = largePositiveImaginaryComponents.qre;
	qim = largePositiveImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (large positive real components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = largePositiveRealComponents.re;
	im = largePositiveRealComponents.im;
	qre = largePositiveRealComponents.qre;
	qim = largePositiveRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny negative imaginary components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyNegativeImaginaryComponents.re;
	im = tinyNegativeImaginaryComponents.im;
	qre = tinyNegativeImaginaryComponents.qre;
	qim = tinyNegativeImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny negative real components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyNegativeRealComponents.re;
	im = tinyNegativeRealComponents.im;
	qre = tinyNegativeRealComponents.qre;
	qim = tinyNegativeRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny positive imaginary components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyPositiveImaginaryComponents.re;
	im = tinyPositiveImaginaryComponents.im;
	qre = tinyPositiveImaginaryComponents.qre;
	qim = tinyPositiveImaginaryComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes a complex inverse (tiny positive real components)', opts, function test( t ) {
	var delta;
	var tol;
	var qre;
	var qim;
	var re;
	var im;
	var i;
	var q;

	re = tinyPositiveRealComponents.re;
	im = tinyPositiveRealComponents.im;
	qre = tinyPositiveRealComponents.qre;
	qim = tinyPositiveRealComponents.qim;

	for ( i = 0; i < re.length; i++ ) {
		q = cinv( new Complex128( re[ i ], im[ i ] ) );

		if ( real( q ) === qre[ i ] ) {
			t.strictEqual( real( q ), qre[ i ], 'returns expected real component' );
		} else {
			delta = abs( real( q ) - qre[ i ] );
			tol = EPS * abs( qre[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. real: '+real( q )+'. expected: '+qre[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
		if ( imag( q ) === qim[ i ] ) {
			t.strictEqual( imag( q ), qim[ i ], 'returns expected imaginary component' );
		} else {
			delta = abs( imag( q ) - qim[ i ] );
			tol = EPS * abs( qim[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+re[i]+'+ '+im[i]+'i. imag: '+imag( q )+'. expected: '+qim[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function may overflow', opts, function test( t ) {
	var v;

	v = cinv( new Complex128( 5.0e-324, 5.0e-324 ) );
	t.strictEqual( real( v ), PINF, 'real component is +infinity' );
	t.strictEqual( imag( v ), NINF, 'imaginary component is -infinity' );

	v = cinv( new Complex128( -5.0e-324, 5.0e-324 ) );
	t.strictEqual( real( v ), NINF, 'real component is -infinity' );
	t.strictEqual( imag( v ), NINF, 'imaginary component is -infinity' );

	v = cinv( new Complex128( -5.0e-324, -5.0e-324 ) );
	t.strictEqual( real( v ), NINF, 'real component is -infinity' );
	t.strictEqual( imag( v ), PINF, 'imaginary component is +infinity' );

	v = cinv( new Complex128( 5.0e-324, -5.0e-324 ) );
	t.strictEqual( real( v ), PINF, 'real component is +infinity' );
	t.strictEqual( imag( v ), PINF, 'imaginary component is +infinity' );

	v = cinv( new Complex128( 0.0, 5.0e-324 ) );
	t.strictEqual( real( v ), 0.0, 'real component is 0' );
	t.strictEqual( imag( v ), NINF, 'imaginary component is -infinity' );

	v = cinv( new Complex128( 0.0, -5.0e-324 ) );
	t.strictEqual( real( v ), 0.0, 'real component is 0' );
	t.strictEqual( imag( v ), PINF, 'imaginary component is +infinity' );

	v = cinv( new Complex128( 5.0e-324, 0.0 ) );
	t.strictEqual( real( v ), PINF, 'real component is +infinity' );
	t.strictEqual( imag( v ), 0.0, 'imaginary component is 0' );

	v = cinv( new Complex128( -5.0e-324, 0.0 ) );
	t.strictEqual( real( v ), NINF, 'real component is -infinity' );
	t.strictEqual( imag( v ), 0.0, 'imaginary component is 0' );

	t.end();
});

tape( 'if a real or imaginary component is `NaN`, all components are `NaN`', opts, function test( t ) {
	var v;

	v = cinv( new Complex128( NaN, 3.0 ) );
	t.strictEqual( isnan( real( v ) ), true, 'returns NaN' );
	t.strictEqual( isnan( imag( v ) ), true, 'returns NaN' );

	v = cinv( new Complex128( 5.0, NaN ) );
	t.strictEqual( isnan( real( v ) ), true, 'returns NaN' );
	t.strictEqual( isnan( imag( v ) ), true, 'returns NaN' );

	v = cinv( new Complex128( NaN, NaN ) );
	t.strictEqual( isnan( real( v ) ), true, 'returns NaN' );
	t.strictEqual( isnan( imag( v ) ), true, 'returns NaN' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cinv/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/cinv/test")
},{"./fixtures/julia/data.json":54,"./fixtures/julia/large_negative_imaginary_components.json":55,"./fixtures/julia/large_negative_real_components.json":56,"./fixtures/julia/large_positive_imaginary_components.json":57,"./fixtures/julia/large_positive_real_components.json":58,"./fixtures/julia/tiny_negative_imaginary_components.json":59,"./fixtures/julia/tiny_negative_real_components.json":60,"./fixtures/julia/tiny_positive_imaginary_components.json":61,"./fixtures/julia/tiny_positive_real_components.json":62,"@stdlib/complex/float64/ctor":33,"@stdlib/complex/float64/imag":37,"@stdlib/complex/float64/real":39,"@stdlib/constants/float64/eps":41,"@stdlib/constants/float64/ninf":43,"@stdlib/constants/float64/pinf":44,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/abs":50,"@stdlib/utils/try-require":114,"path":128,"tape":246}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './main.js' );


// EXPORTS //

module.exports = max;

},{"./main.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} x - first number
* @param {number} y - second number
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	if ( x === PINF || y === PINF ) {
		return PINF;
	}
	if ( x === y && x === 0.0 ) {
		if ( isPositiveZero( x ) ) {
			return x;
		}
		return y;
	}
	if ( x > y ) {
		return x;
	}
	return y;
}


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/float64/pinf":44,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/assert/is-positive-zero":48}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Constructor which returns a `Number` object.
*
* @module @stdlib/number/ctor
*
* @example
* var Number = require( '@stdlib/number/ctor' );
*
* var v = new Number( 10.0 );
* // returns <Number>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Object constructor.
*
* @module @stdlib/object/ctor
*
* @example
* var Object = require( '@stdlib/object/ctor' );
*
* var o = new Object( null );
* // returns {}
*
* o = new Object( 5.0 );
* // returns <Number>
*
* o = new Object( 'beep' );
* // returns <String>
*
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":70}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// MAIN //

/**
* Returns an object.
*
* @name Object
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {Object} object
*
* @example
* var o = new Object( null );
* // returns {}
*
* @example
* var o = new Object( 5.0 );
* // returns <Number>
*
* @example
* var o = new Object( 'beep' );
* // returns <String>
*
* @example
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/
var Obj = Object; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Obj;

},{}],71:[function(require,module,exports){
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

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
*
* @example
* var reFunctionName = require( '@stdlib/regexp/function-name' );
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( main, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = main;

},{"./main.js":72,"./regexp.js":73,"@stdlib/utils/define-nonenumerable-read-only-property":91}],72:[function(require,module,exports){
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

// MAIN //

/**
* Returns a regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @returns {RegExp} regular expression
*
* @example
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/
function reFunctionName() {
	return /^\s*function\s*([^(]*)/i;
}


// EXPORTS //

module.exports = reFunctionName;

},{}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var reFunctionName = require( './main.js' );


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* -   `/^\s*`
*     -   Match zero or more spaces at beginning
*
* -   `function`
*     -   Match the word `function`
*
* -   `\s*`
*     -   Match zero or more spaces after the word `function`
*
* -   `()`
*     -   Capture
*
* -   `[^(]*`
*     -   Match anything except a left parenthesis `(` zero or more times
*
* -   `/i`
*     -   ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = reFunctionName();


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{"./main.js":72}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var isNumber = require( './is_number.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var abs = Math.abs; // eslint-disable-line stdlib/no-builtin-math
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;
var replace = String.prototype.replace;


// VARIABLES //

var RE_EXP_POS_DIGITS = /e\+(\d)$/;
var RE_EXP_NEG_DIGITS = /e-(\d)$/;
var RE_ONLY_DIGITS = /^(\d+)$/;
var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
var RE_TRAILING_PERIOD_ZERO = /\.0$/;
var RE_PERIOD_ZERO_EXP = /\.0*e/;
var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;


// MAIN //

/**
* Formats a token object argument as a floating-point number.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid floating-point number
* @returns {string} formatted token argument
*/
function formatDouble( token ) {
	var digits;
	var out;
	var f = parseFloat( token.arg );
	if ( !isFinite( f ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( token.arg ) ) {
			throw new Error( 'invalid floating-point number. Value: ' + out );
		}
		// Case: NaN, Infinity, or -Infinity
		f = token.arg;
	}
	switch ( token.specifier ) {
	case 'e':
	case 'E':
		out = f.toExponential( token.precision );
		break;
	case 'f':
	case 'F':
		out = f.toFixed( token.precision );
		break;
	case 'g':
	case 'G':
		if ( abs( f ) < 0.0001 ) {
			digits = token.precision;
			if ( digits > 0 ) {
				digits -= 1;
			}
			out = f.toExponential( digits );
		} else {
			out = f.toPrecision( token.precision );
		}
		if ( !token.alternate ) {
			out = replace.call( out, RE_ZERO_BEFORE_EXP, '$1e' );
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e' );
			out = replace.call( out, RE_TRAILING_PERIOD_ZERO, '' );
		}
		break;
	default:
		throw new Error( 'invalid double notation. Value: ' + token.specifier );
	}
	out = replace.call( out, RE_EXP_POS_DIGITS, 'e+0$1' );
	out = replace.call( out, RE_EXP_NEG_DIGITS, 'e-0$1' );
	if ( token.alternate ) {
		out = replace.call( out, RE_ONLY_DIGITS, '$1.' );
		out = replace.call( out, RE_DIGITS_BEFORE_EXP, '$1.e' );
	}
	if ( f >= 0 && token.sign ) {
		out = token.sign + out;
	}
	out = ( token.specifier === uppercase.call( token.specifier ) ) ?
		uppercase.call( out ) :
		lowercase.call( out );
	return out;
}


// EXPORTS //

module.exports = formatDouble;

},{"./is_number.js":77}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var isNumber = require( './is_number.js' );
var zeroPad = require( './zero_pad.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;


// MAIN //

/**
* Formats a token object argument as an integer.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid integer
* @returns {string} formatted token argument
*/
function formatInteger( token ) {
	var base;
	var out;
	var i;

	switch ( token.specifier ) {
	case 'b':
		// Case: %b (binary)
		base = 2;
		break;
	case 'o':
		// Case: %o (octal)
		base = 8;
		break;
	case 'x':
	case 'X':
		// Case: %x, %X (hexadecimal)
		base = 16;
		break;
	case 'd':
	case 'i':
	case 'u':
	default:
		// Case: %d, %i, %u (decimal)
		base = 10;
		break;
	}
	out = token.arg;
	i = parseInt( out, 10 );
	if ( !isFinite( i ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( out ) ) {
			throw new Error( 'invalid integer. Value: ' + out );
		}
		i = 0;
	}
	if ( i < 0 && ( token.specifier === 'u' || base !== 10 ) ) {
		i = 0xffffffff + i + 1;
	}
	if ( i < 0 ) {
		out = ( -i ).toString( base );
		if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		out = '-' + out;
	} else {
		out = i.toString( base );
		if ( !i && !token.precision ) {
			out = '';
		} else if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		if ( token.sign ) {
			out = token.sign + out;
		}
	}
	if ( base === 16 ) {
		if ( token.alternate ) {
			out = '0x' + out;
		}
		out = ( token.specifier === uppercase.call( token.specifier ) ) ?
			uppercase.call( out ) :
			lowercase.call( out );
	}
	if ( base === 8 ) {
		if ( token.alternate && out.charAt( 0 ) !== '0' ) {
			out = '0' + out;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInteger;

},{"./is_number.js":77,"./zero_pad.js":81}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Generate string from a token array by interpolating values.
*
* @module @stdlib/string/base/format-interpolate
*
* @example
* var formatInterpolate = require( '@stdlib/string/base/format-interpolate' );
*
* var tokens = ['Hello ', { 'specifier': 's' }, '!' ];
* var out = formatInterpolate( tokens, 'World' );
* // returns 'Hello World!'
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":79}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );  // NOTE: we inline the `isNumber.isPrimitive` function from `@stdlib/assert/is-number` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isNumber;

},{}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' ); // NOTE: we inline the `isString.isPrimitive` function from `@stdlib/assert/is-string` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isString;

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var formatInteger = require( './format_integer.js' );
var isString = require( './is_string.js' );
var formatDouble = require( './format_double.js' );
var spacePad = require( './space_pad.js' );
var zeroPad = require( './zero_pad.js' );


// VARIABLES //

var fromCharCode = String.fromCharCode;
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Returns a boolean indicating whether a value is `NaN`.
*
* @private
* @param {*} value - input value
* @returns {boolean} boolean indicating whether a value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 4 );
* // returns false
*/
function isnan( value ) { // explicitly define a function here instead of `@stdlib/math/base/assert/is-nan` in order to avoid circular dependencies
	return ( value !== value );
}

/**
* Initializes token object with properties of supplied format identifier object or default values if not present.
*
* @private
* @param {Object} token - format identifier object
* @returns {Object} token object
*/
function initialize( token ) {
	var out = {};
	out.specifier = token.specifier;
	out.precision = ( token.precision === void 0 ) ? 1 : token.precision;
	out.width = token.width;
	out.flags = token.flags || '';
	out.mapping = token.mapping;
	return out;
}


// MAIN //

/**
* Generates string from a token array by interpolating values.
*
* @param {Array} tokens - string parts and format identifier objects
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be an array
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var tokens = [ 'beep ', { 'specifier': 's' } ];
* var out = formatInterpolate( tokens, 'boop' );
* // returns 'beep boop'
*/
function formatInterpolate( tokens ) {
	var hasPeriod;
	var flags;
	var token;
	var flag;
	var num;
	var out;
	var pos;
	var i;
	var j;

	if ( !isArray( tokens ) ) {
		throw new TypeError( 'invalid argument. First argument must be an array. Value: `' + tokens + '`.' );
	}
	out = '';
	pos = 1;
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		if ( isString( token ) ) {
			out += token;
		} else {
			hasPeriod = token.precision !== void 0;
			token = initialize( token );
			if ( !token.specifier ) {
				throw new TypeError( 'invalid argument. Token is missing `specifier` property. Index: `'+ i +'`. Value: `' + token + '`.' );
			}
			if ( token.mapping ) {
				pos = token.mapping;
			}
			flags = token.flags;
			for ( j = 0; j < flags.length; j++ ) {
				flag = flags.charAt( j );
				switch ( flag ) {
				case ' ':
					token.sign = ' ';
					break;
				case '+':
					token.sign = '+';
					break;
				case '-':
					token.padRight = true;
					token.padZeros = false;
					break;
				case '0':
					token.padZeros = flags.indexOf( '-' ) < 0; // NOTE: We use built-in `Array.prototype.indexOf` here instead of `@stdlib/assert/contains` in order to avoid circular dependencies.
					break;
				case '#':
					token.alternate = true;
					break;
				default:
					throw new Error( 'invalid flag: ' + flag );
				}
			}
			if ( token.width === '*' ) {
				token.width = parseInt( arguments[ pos ], 10 );
				pos += 1;
				if ( isnan( token.width ) ) {
					throw new TypeError( 'the argument for * width at position ' + pos + ' is not a number. Value: `' + token.width + '`.' );
				}
				if ( token.width < 0 ) {
					token.padRight = true;
					token.width = -token.width;
				}
			}
			if ( hasPeriod ) {
				if ( token.precision === '*' ) {
					token.precision = parseInt( arguments[ pos ], 10 );
					pos += 1;
					if ( isnan( token.precision ) ) {
						throw new TypeError( 'the argument for * precision at position ' + pos + ' is not a number. Value: `' + token.precision + '`.' );
					}
					if ( token.precision < 0 ) {
						token.precision = 1;
						hasPeriod = false;
					}
				}
			}
			token.arg = arguments[ pos ];
			switch ( token.specifier ) {
			case 'b':
			case 'o':
			case 'x':
			case 'X':
			case 'd':
			case 'i':
			case 'u':
				// Case: %b (binary), %o (octal), %x, %X (hexadecimal), %d, %i (decimal), %u (unsigned decimal)
				if ( hasPeriod ) {
					token.padZeros = false;
				}
				token.arg = formatInteger( token );
				break;
			case 's':
				// Case: %s (string)
				token.maxWidth = ( hasPeriod ) ? token.precision : -1;
				token.arg = String( token.arg );
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ? String( token.arg ) : fromCharCode( num ); // eslint-disable-line max-len
				}
				break;
			case 'e':
			case 'E':
			case 'f':
			case 'F':
			case 'g':
			case 'G':
				// Case: %e, %E (scientific notation), %f, %F (decimal floating point), %g, %G (uses the shorter of %e/E or %f/F)
				if ( !hasPeriod ) {
					token.precision = 6;
				}
				token.arg = formatDouble( token );
				break;
			default:
				throw new Error( 'invalid specifier: ' + token.specifier );
			}
			// Fit argument into field width...
			if ( token.maxWidth >= 0 && token.arg.length > token.maxWidth ) {
				token.arg = token.arg.substring( 0, token.maxWidth );
			}
			if ( token.padZeros ) {
				token.arg = zeroPad( token.arg, token.width || token.precision, token.padRight ); // eslint-disable-line max-len
			} else if ( token.width ) {
				token.arg = spacePad( token.arg, token.width, token.padRight );
			}
			out += token.arg || '';
			pos += 1;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInterpolate;

},{"./format_double.js":74,"./format_integer.js":75,"./is_string.js":78,"./space_pad.js":80,"./zero_pad.js":81}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// FUNCTIONS //

/**
* Returns `n` spaces.
*
* @private
* @param {number} n - number of spaces
* @returns {string} string of spaces
*/
function spaces( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += ' ';
	}
	return out;
}


// MAIN //

/**
* Pads a token with spaces to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function spacePad( str, width, right ) {
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	str = ( right ) ?
		str + spaces( pad ) :
		spaces( pad ) + str;
	return str;
}


// EXPORTS //

module.exports = spacePad;

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// FUNCTIONS //

/**
* Tests if a string starts with a minus sign (`-`).
*
* @private
* @param {string} str - input string
* @returns {boolean} boolean indicating if a string starts with a minus sign (`-`)
*/
function startsWithMinus( str ) {
	return str[ 0 ] === '-';
}

/**
* Returns a string of `n` zeros.
*
* @private
* @param {number} n - number of zeros
* @returns {string} string of zeros
*/
function zeros( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += '0';
	}
	return out;
}


// MAIN //

/**
* Pads a token with zeros to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function zeroPad( str, width, right ) {
	var negative = false;
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	if ( startsWithMinus( str ) ) {
		negative = true;
		str = str.substr( 1 );
	}
	str = ( right ) ?
		str + zeros( pad ) :
		zeros( pad ) + str;
	if ( negative ) {
		str = '-' + str;
	}
	return str;
}


// EXPORTS //

module.exports = zeroPad;

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Tokenize a string into an array of string parts and format identifier objects.
*
* @module @stdlib/string/base/format-tokenize
*
* @example
* var formatTokenize = require( '@stdlib/string/base/format-tokenize' );
*
* var str = 'Hello %s!';
* var tokens = formatTokenize( str );
* // returns [ 'Hello ', {...}, '!' ]
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// VARIABLES //

var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;


// FUNCTIONS //

/**
* Parses a delimiter.
*
* @private
* @param {Array} match - regular expression match
* @returns {Object} delimiter token object
*/
function parse( match ) {
	var token = {
		'mapping': ( match[ 1 ] ) ? parseInt( match[ 1 ], 10 ) : void 0,
		'flags': match[ 2 ],
		'width': match[ 3 ],
		'precision': match[ 5 ],
		'specifier': match[ 6 ]
	};
	if ( match[ 4 ] === '.' && match[ 5 ] === void 0 ) {
		token.precision = '1';
	}
	return token;
}


// MAIN //

/**
* Tokenizes a string into an array of string parts and format identifier objects.
*
* @param {string} str - input string
* @returns {Array} tokens
*
* @example
* var tokens = formatTokenize( 'Hello %s!' );
* // returns [ 'Hello ', {...}, '!' ]
*/
function formatTokenize( str ) {
	var content;
	var tokens;
	var match;
	var prev;

	tokens = [];
	prev = 0;
	match = RE.exec( str );
	while ( match ) {
		content = str.slice( prev, RE.lastIndex - match[ 0 ].length );
		if ( content.length ) {
			tokens.push( content );
		}
		tokens.push( parse( match ) );
		prev = RE.lastIndex;
		match = RE.exec( str );
	}
	content = str.slice( prev );
	if ( content.length ) {
		tokens.push( content );
	}
	return tokens;
}


// EXPORTS //

module.exports = formatTokenize;

},{}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Insert supplied variable values into a format string.
*
* @module @stdlib/string/format
*
* @example
* var format = require( '@stdlib/string/format' );
*
* var out = format( '%s %s!', 'Hello', 'World' );
* // returns 'Hello World!'
*
* out = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":86}],85:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var interpolate = require( '@stdlib/string/base/format-interpolate' );
var tokenize = require( '@stdlib/string/base/format-tokenize' );
var isString = require( './is_string.js' );


// MAIN //

/**
* Inserts supplied variable values into a format string.
*
* @param {string} str - input string
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be a string
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var str = format( 'Hello %s!', 'world' );
* // returns 'Hello world!'
*
* @example
* var str = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/
function format( str ) {
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	args = [ tokenize( str ) ];
	for ( i = 1; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":85,"@stdlib/string/base/format-interpolate":76,"@stdlib/string/base/format-tokenize":82}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Symbol factory.
*
* @module @stdlib/symbol/ctor
*
* @example
* var Symbol = require( '@stdlib/symbol/ctor' );
*
* var s = Symbol( 'beep' );
* // returns <symbol>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":88}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Determine the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' ).REGEXP;
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
*
* @example
* var v = constructorName( 5 );
* // returns 'Number'
*
* @example
* var v = constructorName( null );
* // returns 'Null'
*
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
*
* @example
* var v = constructorName( function noop() {} );
* // returns 'Function'
*/
function constructorName( v ) {
	var match;
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		match = RE.exec( ctor.toString() );
		if ( match ) {
			return match[ 1 ];
		}
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":15,"@stdlib/regexp/function-name":71,"@stdlib/utils/native-class":109}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Define a non-enumerable read-only property.
*
* @module @stdlib/utils/define-nonenumerable-read-only-property
*
* @example
* var setNonEnumerableReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
*
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var defineProperty = require( '@stdlib/utils/define-property' );


// MAIN //

/**
* Defines a non-enumerable read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnly( obj, prop, value ) {
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': value
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"@stdlib/utils/define-property":96}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @name defineProperty
* @type {Function}
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
var defineProperty = Object.defineProperty;


// EXPORTS //

module.exports = defineProperty;

},{}],94:[function(require,module,exports){
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

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],95:[function(require,module,exports){
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

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @private
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":94}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Define (or modify) an object property.
*
* @module @stdlib/utils/define-property
*
* @example
* var defineProperty = require( '@stdlib/utils/define-property' );
*
* var obj = {};
* defineProperty( obj, 'foo', {
*     'value': 'bar',
*     'writable': false,
*     'configurable': false,
*     'enumerable': false
* });
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var hasDefinePropertySupport = require( './has_define_property_support.js' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var defineProperty;
if ( hasDefinePropertySupport() ) {
	defineProperty = builtin;
} else {
	defineProperty = polyfill;
}


// EXPORTS //

module.exports = defineProperty;

},{"./builtin.js":93,"./has_define_property_support.js":95,"./polyfill.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/* eslint-disable no-underscore-dangle, no-proto */

'use strict';

// MODULES //

var format = require( '@stdlib/string/format' );


// VARIABLES //

var objectProtoype = Object.prototype;
var toStr = objectProtoype.toString;
var defineGetter = objectProtoype.__defineGetter__;
var defineSetter = objectProtoype.__defineSetter__;
var lookupGetter = objectProtoype.__lookupGetter__;
var lookupSetter = objectProtoype.__lookupSetter__;


// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
function defineProperty( obj, prop, descriptor ) {
	var prototype;
	var hasValue;
	var hasGet;
	var hasSet;

	if ( typeof obj !== 'object' || obj === null || toStr.call( obj ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. First argument must be an object. Value: `%s`.', obj ) );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. Property descriptor must be an object. Value: `%s`.', descriptor ) );
	}
	hasValue = ( 'value' in descriptor );
	if ( hasValue ) {
		if (
			lookupGetter.call( obj, prop ) ||
			lookupSetter.call( obj, prop )
		) {
			// Override `__proto__` to avoid touching inherited accessors:
			prototype = obj.__proto__;
			obj.__proto__ = objectProtoype;

			// Delete property as existing getters/setters prevent assigning value to specified property:
			delete obj[ prop ];
			obj[ prop ] = descriptor.value;

			// Restore original prototype:
			obj.__proto__ = prototype;
		} else {
			obj[ prop ] = descriptor.value;
		}
	}
	hasGet = ( 'get' in descriptor );
	hasSet = ( 'set' in descriptor );

	if ( hasValue && ( hasGet || hasSet ) ) {
		throw new Error( 'invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.' );
	}

	if ( hasGet && defineGetter ) {
		defineGetter.call( obj, prop, descriptor.get );
	}
	if ( hasSet && defineSetter ) {
		defineSetter.call( obj, prop, descriptor.set );
	}
	return obj;
}


// EXPORTS //

module.exports = defineProperty;

},{"@stdlib/string/format":84}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isFunction = require( '@stdlib/assert/is-function' );
var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = builtin;
} else {
	getProto = polyfill;
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":101,"./polyfill.js":102,"@stdlib/assert/is-function":19}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":100}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var Object = require( '@stdlib/object/ctor' );
var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":98,"@stdlib/object/ctor":69}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var nativeClass = require( '@stdlib/utils/native-class' );
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":103,"@stdlib/utils/native-class":109}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
}


// EXPORTS //

module.exports = getProto;

},{}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var GlobalThis = require( './global_this.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @private
* @param {boolean} [codegen=false] - boolean indicating whether to use code generation to resolve the global object
* @throws {TypeError} must provide a boolean
* @throws {Error} unable to resolve global object
* @returns {Object} global object
*
* @example
* var g = getGlobal();
* // returns {...}
*/
function getGlobal( codegen ) {
	if ( arguments.length ) {
		if ( !isBoolean( codegen ) ) {
			throw new TypeError( format( 'invalid argument. Must provide a boolean. Value: `%s`.', codegen ) );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: 2020 revision of ECMAScript standard
	if ( GlobalThis ) {
		return GlobalThis;
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":105,"./global_this.js":106,"./self.js":107,"./window.js":108,"@stdlib/assert/is-boolean":9,"@stdlib/string/format":84}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

/**
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func, stdlib/require-globals
}


// EXPORTS //

module.exports = getGlobal;

},{}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// MAIN //

var obj = ( typeof globalThis === 'object' ) ? globalThis : null; // eslint-disable-line no-undef


// EXPORTS //

module.exports = obj;

},{}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main;
if ( hasToStringTag() ) {
	main = polyfill;
} else {
	main = builtin;
}


// EXPORTS //

module.exports = main;

},{"./main.js":110,"./polyfill.js":111,"@stdlib/assert/has-tostringtag-support":5}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":112}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":112,"./tostringtag.js":113,"@stdlib/assert/has-own-property":1}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":87}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Wrap `require` in a try/catch block.
*
* @module @stdlib/utils/try-require
*
* @example
* var tryRequire = require( '@stdlib/utils/try-require' );
*
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.log( out.message );
* }
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":115}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Wraps `require` in a try/catch block.
*
* @param {string} id - module id
* @returns {*|Error} `module.exports` of the resolved module or an error
*
* @example
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.error( out.message );
* }
*/
function tryRequire( id ) {
	try {
		return require( id ); // eslint-disable-line stdlib/no-dynamic-require
	} catch ( error ) {
		if ( isError( error ) ) {
			return error;
		}
		// Handle case where a literal is thrown...
		if ( typeof error === 'object' ) {
			return new Error( JSON.stringify( error ) );
		}
		return new Error( error.toString() );
	}
}


// EXPORTS //

module.exports = tryRequire;

},{"@stdlib/assert/is-error":17}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||

		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||

		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
}


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":117,"./fixtures/re.js":118,"./fixtures/typedarray.js":119}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var getGlobal = require( '@stdlib/utils/global' );


// MAIN //

var root = getGlobal();
var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"@stdlib/utils/global":104}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : builtin;


// EXPORTS //

module.exports = main;

},{"./check.js":116,"./main.js":121,"./polyfill.js":122}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ```text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":89}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":89}],123:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],124:[function(require,module,exports){

},{}],125:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124}],126:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":123,"buffer":126,"ieee754":229}],127:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],128:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":236}],129:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/lib/_stream_readable.js');
Stream.Writable = require('readable-stream/lib/_stream_writable.js');
Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
Stream.Transform = require('readable-stream/lib/_stream_transform.js');
Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js')
Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js')

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":127,"inherits":230,"readable-stream/lib/_stream_duplex.js":131,"readable-stream/lib/_stream_passthrough.js":132,"readable-stream/lib/_stream_readable.js":133,"readable-stream/lib/_stream_transform.js":134,"readable-stream/lib/_stream_writable.js":135,"readable-stream/lib/internal/streams/end-of-stream.js":139,"readable-stream/lib/internal/streams/pipeline.js":141}],130:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],131:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":133,"./_stream_writable":135,"_process":236,"inherits":230}],132:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":134,"inherits":230}],133:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":130,"./_stream_duplex":131,"./internal/streams/async_iterator":136,"./internal/streams/buffer_list":137,"./internal/streams/destroy":138,"./internal/streams/from":140,"./internal/streams/state":142,"./internal/streams/stream":143,"_process":236,"buffer":126,"events":127,"inherits":230,"string_decoder/":245,"util":124}],134:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';

module.exports = Transform;

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":130,"./_stream_duplex":131,"inherits":230}],135:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":130,"./_stream_duplex":131,"./internal/streams/destroy":138,"./internal/streams/state":142,"./internal/streams/stream":143,"_process":236,"buffer":126,"inherits":230,"util-deprecate":254}],136:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":139,"_process":236}],137:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":126,"util":124}],138:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":236}],139:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":130}],140:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],141:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":130,"./end-of-stream":139}],142:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":130}],143:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":127}],144:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":145,"get-intrinsic":220}],145:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');
var setFunctionLength = require('set-function-length');

var $TypeError = require('es-errors/type');
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = require('es-define-property');
var $max = GetIntrinsic('%Math.max%');

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"es-define-property":205,"es-errors/type":211,"function-bind":219,"get-intrinsic":220,"set-function-length":240}],146:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":147,"./lib/keys.js":148}],147:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],148:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],149:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');

var gopd = require('gopd');

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};

},{"es-define-property":205,"es-errors/syntax":210,"es-errors/type":211,"gopd":221}],150:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = require('define-data-property');

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = require('has-property-descriptors')();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"define-data-property":149,"has-property-descriptors":222,"object-keys":234}],151:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],152:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.3

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

},{"./ToNumber":183,"./ToPrimitive":185,"./Type":190}],153:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = require('es-errors/type');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (typeof LeftFirst !== 'boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = typeof px === 'string' && typeof py === 'string';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

},{"../helpers/isFinite":198,"../helpers/isNaN":199,"../helpers/isPrefixOf":200,"./ToNumber":183,"./ToPrimitive":185,"es-errors/type":211,"get-intrinsic":220}],154:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var callBound = require('call-bind/callBound');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $toUpperCase = callBound('String.prototype.toUpperCase');

// https://262.ecma-international.org/5.1/#sec-15.10.2.8

module.exports = function Canonicalize(ch, IgnoreCase) {
	if (typeof ch !== 'string' || ch.length !== 1) {
		throw new $TypeError('Assertion failed: `ch` must be a character');
	}

	if (typeof IgnoreCase !== 'boolean') {
		throw new $TypeError('Assertion failed: `IgnoreCase` must be a Boolean');
	}

	if (!IgnoreCase) {
		return ch; // step 1
	}

	var u = $toUpperCase(ch); // step 2

	if (u.length !== 1) {
		return ch; // step 3
	}

	var cu = u; // step 4

	if ($charCodeAt(ch, 0) >= 128 && $charCodeAt(cu, 0) < 128) {
		return ch; // step 5
	}

	return cu;
};

},{"call-bind/callBound":144,"es-errors/type":211}],155:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":213}],156:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

},{"./DayWithinYear":159,"./InLeapYear":163,"./MonthFromTime":173,"es-errors/eval":206}],157:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":204,"./floor":194}],158:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":194}],159:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":157,"./DayFromYear":158,"./YearFromTime":192}],160:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

},{"./modulo":195}],161:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (IsDataDescriptor(Desc)) {
		return {
			value: Desc['[[Value]]'],
			writable: !!Desc['[[Writable]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else if (IsAccessorDescriptor(Desc)) {
		return {
			get: Desc['[[Get]]'],
			set: Desc['[[Set]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	}
	throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');

};

},{"../helpers/records/property-descriptor":202,"./IsAccessorDescriptor":164,"./IsDataDescriptor":166,"es-errors/type":211}],162:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

},{"../helpers/timeConstants":204,"./floor":194,"./modulo":195}],163:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

},{"./DaysInYear":160,"./YearFromTime":192,"es-errors/eval":206}],164:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Get]]') && !hasOwn(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":202,"es-errors/type":211,"hasown":228}],165:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":231}],166:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Value]]') && !hasOwn(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":202,"es-errors/type":211,"hasown":228}],167:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');

var isPropertyDescriptor = require('./IsPropertyDescriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"./IsAccessorDescriptor":164,"./IsDataDescriptor":166,"./IsPropertyDescriptor":168,"es-errors/type":211}],168:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":202}],169:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

},{"../helpers/isFinite":198,"../helpers/timeConstants":204}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

},{"../helpers/isFinite":198,"./DateFromTime":156,"./Day":157,"./MonthFromTime":173,"./ToInteger":182,"./YearFromTime":192,"./floor":194,"./modulo":195,"get-intrinsic":220}],171:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

},{"../helpers/isFinite":198,"../helpers/timeConstants":204,"./ToInteger":182}],172:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

},{"../helpers/timeConstants":204,"./floor":194,"./modulo":195}],173:[function(require,module,exports){
'use strict';

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

},{"./DayWithinYear":159,"./InLeapYear":163}],174:[function(require,module,exports){
'use strict';

var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

},{"../helpers/isNaN":199}],175:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

},{"../helpers/timeConstants":204,"./floor":194,"./modulo":195}],176:[function(require,module,exports){
'use strict';

var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

},{"./Type":190}],177:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


},{"../helpers/isFinite":198,"./ToNumber":183,"./abs":193,"get-intrinsic":220}],178:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":204,"./DayFromYear":158}],179:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":204,"./modulo":195}],180:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],181:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":183}],182:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.4

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	if ($isNaN(number)) { return 0; }
	if (number === 0 || !$isFinite(number)) { return number; }
	return $sign(number) * floor(abs(number));
};

},{"../helpers/isFinite":198,"../helpers/isNaN":199,"../helpers/sign":203,"./ToNumber":183,"./abs":193,"./floor":194}],183:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var safeRegexTester = require('safe-regex-test');

var isNonDecimal = safeRegexTester(/^0[ob]|^[+-]0x/);

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	var trimmed = $replace(
		prim,
		// eslint-disable-next-line no-control-regex
		/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g,
		''
	);
	if (isNonDecimal(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":185,"call-bind/callBound":144,"safe-regex-test":239}],184:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":214}],185:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":216}],186:[function(require,module,exports){
'use strict';

var hasOwn = require('hasown');

var $TypeError = require('es-errors/type');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (hasOwn(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (hasOwn(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (hasOwn(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (hasOwn(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (hasOwn(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (hasOwn(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((hasOwn(desc, '[[Get]]') || hasOwn(desc, '[[Set]]')) && (hasOwn(desc, '[[Value]]') || hasOwn(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":165,"./ToBoolean":180,"./Type":190,"es-errors/type":211,"hasown":228}],187:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":220}],188:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

},{"../helpers/isFinite":198,"../helpers/isNaN":199,"../helpers/sign":203,"./ToNumber":183,"./abs":193,"./floor":194,"./modulo":195}],189:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":183}],190:[function(require,module,exports){
'use strict';

// https://262.ecma-international.org/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

},{}],191:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":157,"./modulo":195}],192:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

},{"call-bind/callBound":144,"get-intrinsic":220}],193:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":220}],194:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],195:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":201}],196:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":204,"./modulo":195}],197:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	Canonicalize: require('./5/Canonicalize'),
	CheckObjectCoercible: require('./5/CheckObjectCoercible'),
	DateFromTime: require('./5/DateFromTime'),
	Day: require('./5/Day'),
	DayFromYear: require('./5/DayFromYear'),
	DaysInYear: require('./5/DaysInYear'),
	DayWithinYear: require('./5/DayWithinYear'),
	floor: require('./5/floor'),
	FromPropertyDescriptor: require('./5/FromPropertyDescriptor'),
	HourFromTime: require('./5/HourFromTime'),
	InLeapYear: require('./5/InLeapYear'),
	IsAccessorDescriptor: require('./5/IsAccessorDescriptor'),
	IsCallable: require('./5/IsCallable'),
	IsDataDescriptor: require('./5/IsDataDescriptor'),
	IsGenericDescriptor: require('./5/IsGenericDescriptor'),
	IsPropertyDescriptor: require('./5/IsPropertyDescriptor'),
	MakeDate: require('./5/MakeDate'),
	MakeDay: require('./5/MakeDay'),
	MakeTime: require('./5/MakeTime'),
	MinFromTime: require('./5/MinFromTime'),
	modulo: require('./5/modulo'),
	MonthFromTime: require('./5/MonthFromTime'),
	msFromTime: require('./5/msFromTime'),
	SameValue: require('./5/SameValue'),
	SecFromTime: require('./5/SecFromTime'),
	TimeClip: require('./5/TimeClip'),
	TimeFromYear: require('./5/TimeFromYear'),
	TimeWithinDay: require('./5/TimeWithinDay'),
	ToBoolean: require('./5/ToBoolean'),
	ToInt32: require('./5/ToInt32'),
	ToInteger: require('./5/ToInteger'),
	ToNumber: require('./5/ToNumber'),
	ToObject: require('./5/ToObject'),
	ToPrimitive: require('./5/ToPrimitive'),
	ToPropertyDescriptor: require('./5/ToPropertyDescriptor'),
	ToString: require('./5/ToString'),
	ToUint16: require('./5/ToUint16'),
	ToUint32: require('./5/ToUint32'),
	Type: require('./5/Type'),
	WeekDay: require('./5/WeekDay'),
	YearFromTime: require('./5/YearFromTime')
};

},{"./5/AbstractEqualityComparison":152,"./5/AbstractRelationalComparison":153,"./5/Canonicalize":154,"./5/CheckObjectCoercible":155,"./5/DateFromTime":156,"./5/Day":157,"./5/DayFromYear":158,"./5/DayWithinYear":159,"./5/DaysInYear":160,"./5/FromPropertyDescriptor":161,"./5/HourFromTime":162,"./5/InLeapYear":163,"./5/IsAccessorDescriptor":164,"./5/IsCallable":165,"./5/IsDataDescriptor":166,"./5/IsGenericDescriptor":167,"./5/IsPropertyDescriptor":168,"./5/MakeDate":169,"./5/MakeDay":170,"./5/MakeTime":171,"./5/MinFromTime":172,"./5/MonthFromTime":173,"./5/SameValue":174,"./5/SecFromTime":175,"./5/StrictEqualityComparison":176,"./5/TimeClip":177,"./5/TimeFromYear":178,"./5/TimeWithinDay":179,"./5/ToBoolean":180,"./5/ToInt32":181,"./5/ToInteger":182,"./5/ToNumber":183,"./5/ToObject":184,"./5/ToPrimitive":185,"./5/ToPropertyDescriptor":186,"./5/ToString":187,"./5/ToUint16":188,"./5/ToUint32":189,"./5/Type":190,"./5/WeekDay":191,"./5/YearFromTime":192,"./5/abs":193,"./5/floor":194,"./5/modulo":195,"./5/msFromTime":196}],198:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":199}],199:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],200:[function(require,module,exports){
'use strict';

var $strSlice = require('call-bind/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"call-bind/callBound":144}],201:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],202:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var allowed = {
	__proto__: null,
	'[[Configurable]]': true,
	'[[Enumerable]]': true,
	'[[Get]]': true,
	'[[Set]]': true,
	'[[Value]]': true,
	'[[Writable]]': true
};

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function isPropertyDescriptor(Desc) {
	if (!Desc || typeof Desc !== 'object') {
		return false;
	}

	for (var key in Desc) { // eslint-disable-line
		if (hasOwn(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	var isData = hasOwn(Desc, '[[Value]]') || hasOwn(Desc, '[[Writable]]');
	var IsAccessor = hasOwn(Desc, '[[Get]]') || hasOwn(Desc, '[[Set]]');
	if (isData && IsAccessor) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"es-errors/type":211,"hasown":228}],203:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],204:[function(require,module,exports){
'use strict';

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

module.exports = {
	HoursPerDay: HoursPerDay,
	MinutesPerHour: MinutesPerHour,
	SecondsPerMinute: SecondsPerMinute,
	msPerSecond: msPerSecond,
	msPerMinute: msPerMinute,
	msPerHour: msPerHour,
	msPerDay: msPerDay
};

},{}],205:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

/** @type {import('.')} */
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;

},{"get-intrinsic":220}],206:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],207:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],208:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],209:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],210:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],211:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],212:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],213:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":211}],214:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":215,"./RequireObjectCoercible":213}],215:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],216:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};

},{"./helpers/isPrimitive":217,"is-callable":231}],217:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],218:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],219:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":218}],220:[function(require,module,exports){
'use strict';

var undefined;

var $Error = require('es-errors');
var $EvalError = require('es-errors/eval');
var $RangeError = require('es-errors/range');
var $ReferenceError = require('es-errors/ref');
var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');
var $URIError = require('es-errors/uri');

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();
var hasProto = require('has-proto')();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('hasown');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"es-errors":207,"es-errors/eval":206,"es-errors/range":208,"es-errors/ref":209,"es-errors/syntax":210,"es-errors/type":211,"es-errors/uri":212,"function-bind":219,"has-proto":223,"has-symbols":224,"hasown":228}],221:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":220}],222:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;

},{"es-define-property":205}],223:[function(require,module,exports){
'use strict';

var test = {
	__proto__: null,
	foo: {}
};

var $Object = Object;

/** @type {import('.')} */
module.exports = function hasProto() {
	// @ts-expect-error: TS errors on an inherited property for some reason
	return { __proto__: test }.foo === test.foo
		&& !(test instanceof $Object);
};

},{}],224:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":225}],225:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],226:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":225}],227:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":219}],228:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":219}],229:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],230:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],231:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

},{}],232:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var hasToStringTag = require('has-tostringtag/shams')();
var has;
var $exec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag) {
	has = callBound('Object.prototype.hasOwnProperty');
	$exec = callBound('RegExp.prototype.exec');
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var $toString = callBound('Object.prototype.toString');
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';

module.exports = hasToStringTag
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		var descriptor = gOPD(value, 'lastIndex');
		var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			$exec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};

},{"call-bind/callBound":144,"has-tostringtag/shams":226}],233:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":235}],234:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":233,"./isArguments":235}],235:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],236:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],237:[function(require,module,exports){
(function (process,setImmediate){(function (){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":236,"through":252,"timers":253}],238:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":126}],239:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var isRegex = require('is-regex');

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = require('es-errors/type');

module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};

},{"call-bind/callBound":144,"es-errors/type":211,"is-regex":232}],240:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');
var define = require('define-data-property');
var hasDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

var $TypeError = require('es-errors/type');
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};

},{"define-data-property":149,"es-errors/type":211,"get-intrinsic":220,"gopd":221,"has-property-descriptors":222}],241:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":197,"function-bind":219}],242:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":241,"./polyfill":243,"./shim":244,"define-properties":150,"function-bind":219}],243:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":241}],244:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":243,"define-properties":150}],245:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":238}],246:[function(require,module,exports){
(function (process,setImmediate){(function (){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":247,"./lib/results":249,"./lib/test":250,"_process":236,"defined":151,"through":252,"timers":253}],247:[function(require,module,exports){
(function (process){(function (){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this)}).call(this,require('_process'))
},{"_process":236,"fs":125,"through":252}],248:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":236,"timers":253}],249:[function(require,module,exports){
(function (process,setImmediate){(function (){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":236,"events":127,"function-bind":219,"has":227,"inherits":230,"object-inspect":251,"resumer":237,"through":252,"timers":253}],250:[function(require,module,exports){
(function (__dirname){(function (){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

var nextTick = require('./next_tick');

module.exports = Test;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this)}).call(this,"/node_modules/tape/lib")
},{"./next_tick":248,"deep-equal":146,"defined":151,"events":127,"has":227,"inherits":230,"path":128,"string.prototype.trim":242}],251:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],252:[function(require,module,exports){
(function (process){(function (){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this)}).call(this,require('_process'))
},{"_process":236,"stream":129}],253:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":236,"timers":253}],254:[function(require,module,exports){
(function (global){(function (){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[63,64]);
