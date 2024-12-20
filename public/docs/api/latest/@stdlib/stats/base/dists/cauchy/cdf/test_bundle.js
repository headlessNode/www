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
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float64
*
* @example
* var ctor = require( '@stdlib/array/float64' );
*
* var arr = new ctor( 10 );
* // returns <Float64Array>
*/

// MODULES //

var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat64ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./main.js":2,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":14}],2:[function(require,module,exports){
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

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],4:[function(require,module,exports){
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
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint16
*
* @example
* var ctor = require( '@stdlib/array/uint16' );
*
* var arr = new ctor( 10 );
* // returns <Uint16Array>
*/

// MODULES //

var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./main.js":5,"./polyfill.js":6,"@stdlib/assert/has-uint16array-support":22}],5:[function(require,module,exports){
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

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],6:[function(require,module,exports){
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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],7:[function(require,module,exports){
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
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint32
*
* @example
* var ctor = require( '@stdlib/array/uint32' );
*
* var arr = new ctor( 10 );
* // returns <Uint32Array>
*/

// MODULES //

var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./main.js":8,"./polyfill.js":9,"@stdlib/assert/has-uint32array-support":25}],8:[function(require,module,exports){
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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],9:[function(require,module,exports){
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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 32-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],10:[function(require,module,exports){
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
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint8
*
* @example
* var ctor = require( '@stdlib/array/uint8' );
*
* var arr = new ctor( 10 );
* // returns <Uint8Array>
*/

// MODULES //

var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./main.js":11,"./polyfill.js":12,"@stdlib/assert/has-uint8array-support":28}],11:[function(require,module,exports){
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

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],12:[function(require,module,exports){
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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

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

// MAIN //

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

/**
* Test for native `Float64Array` support.
*
* @module @stdlib/assert/has-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./main.js":15}],15:[function(require,module,exports){
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

var isFloat64Array = require( '@stdlib/assert/is-float64array' );
var GlobalFloat64Array = require( './float64array.js' );


// MAIN //

/**
* Tests for native `Float64Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float64Array` support
*
* @example
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/
function hasFloat64ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat64Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat64Array( [ 1.0, 3.14, -3.14, NaN ] );
		bool = (
			isFloat64Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.14 &&
			arr[ 2 ] === -3.14 &&
			arr[ 3 ] !== arr[ 3 ]
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./float64array.js":13,"@stdlib/assert/is-float64array":31}],16:[function(require,module,exports){
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

},{"./main.js":17}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./main.js":19}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./main.js":21}],21:[function(require,module,exports){
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

},{"@stdlib/assert/has-symbol-support":18}],22:[function(require,module,exports){
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
* Test for native `Uint16Array` support.
*
* @module @stdlib/assert/has-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./main.js":23}],23:[function(require,module,exports){
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

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
var GlobalUint16Array = require( './uint16array.js' );


// MAIN //

/**
* Tests for native `Uint16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint16Array` support
*
* @example
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/
function hasUint16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT16_MAX+1, UINT16_MAX+2 ];
		arr = new GlobalUint16Array( arr );
		bool = (
			isUint16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT16_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":50}],24:[function(require,module,exports){
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

var main = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

/**
* Test for native `Uint32Array` support.
*
* @module @stdlib/assert/has-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./main.js":26}],26:[function(require,module,exports){
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

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
var GlobalUint32Array = require( './uint32array.js' );


// MAIN //

/**
* Tests for native `Uint32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint32Array` support
*
* @example
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/
function hasUint32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT32_MAX+1, UINT32_MAX+2 ];
		arr = new GlobalUint32Array( arr );
		bool = (
			isUint32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT32_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":51}],27:[function(require,module,exports){
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

var main = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],28:[function(require,module,exports){
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
* Test for native `Uint8Array` support.
*
* @module @stdlib/assert/has-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./main.js":29}],29:[function(require,module,exports){
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

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
var GlobalUint8Array = require( './uint8array.js' );


// MAIN //

/**
* Tests for native `Uint8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8Array` support
*
* @example
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/
function hasUint8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT8_MAX+1, UINT8_MAX+2 ];
		arr = new GlobalUint8Array( arr );
		bool = (
			isUint8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&           // truncation
			arr[ 2 ] === UINT8_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&           // wrap around
			arr[ 4 ] === 1              // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":52}],30:[function(require,module,exports){
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

var main = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],31:[function(require,module,exports){
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
* Test if a value is a Float64Array.
*
* @module @stdlib/assert/is-float64array
*
* @example
* var isFloat64Array = require( '@stdlib/assert/is-float64array' );
*
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* bool = isFloat64Array( [] );
* // returns false
*/

// MODULES //

var isFloat64Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat64Array;

},{"./main.js":32}],32:[function(require,module,exports){
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

var hasFloat64Array = ( typeof Float64Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float64Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float64Array
*
* @example
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat64Array( [] );
* // returns false
*/
function isFloat64Array( value ) {
	return (
		( hasFloat64Array && value instanceof Float64Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float64Array]'
	);
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":114}],33:[function(require,module,exports){
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

var Uint8Array = require( '@stdlib/array/uint8' );
var Uint16Array = require( '@stdlib/array/uint16' );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],34:[function(require,module,exports){
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
* Return a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert/is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert/is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = require( './main.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./main.js":35}],35:[function(require,module,exports){
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

var ctors = require( './ctors.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @private
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	/*
	* Set the uint16 view to a value having distinguishable lower and higher order words.
	*
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// MAIN //

bool = isLittleEndian();


// EXPORTS //

module.exports = bool;

},{"./ctors.js":33}],36:[function(require,module,exports){
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
* Test if a value is a Uint16Array.
*
* @module @stdlib/assert/is-uint16array
*
* @example
* var isUint16Array = require( '@stdlib/assert/is-uint16array' );
*
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* bool = isUint16Array( [] );
* // returns false
*/

// MODULES //

var isUint16Array = require( './main.js' );


// EXPORTS //

module.exports = isUint16Array;

},{"./main.js":37}],37:[function(require,module,exports){
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

var hasUint16Array = ( typeof Uint16Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint16Array
*
* @example
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint16Array( [] );
* // returns false
*/
function isUint16Array( value ) {
	return (
		( hasUint16Array && value instanceof Uint16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint16Array]'
	);
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":114}],38:[function(require,module,exports){
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
* Test if a value is a Uint32Array.
*
* @module @stdlib/assert/is-uint32array
*
* @example
* var isUint32Array = require( '@stdlib/assert/is-uint32array' );
*
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* bool = isUint32Array( [] );
* // returns false
*/

// MODULES //

var isUint32Array = require( './main.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./main.js":39}],39:[function(require,module,exports){
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

var hasUint32Array = ( typeof Uint32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint32Array
*
* @example
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint32Array( [] );
* // returns false
*/
function isUint32Array( value ) {
	return (
		( hasUint32Array && value instanceof Uint32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint32Array]'
	);
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":114}],40:[function(require,module,exports){
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
* Test if a value is a Uint8Array.
*
* @module @stdlib/assert/is-uint8array
*
* @example
* var isUint8Array = require( '@stdlib/assert/is-uint8array' );
*
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* bool = isUint8Array( [] );
* // returns false
*/

// MODULES //

var isUint8Array = require( './main.js' );


// EXPORTS //

module.exports = isUint8Array;

},{"./main.js":41}],41:[function(require,module,exports){
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

var hasUint8Array = ( typeof Uint8Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8Array
*
* @example
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint8Array( [] );
* // returns false
*/
function isUint8Array( value ) {
	return (
		( hasUint8Array && value instanceof Uint8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8Array]'
	);
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":114}],42:[function(require,module,exports){
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
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/constants/float64/fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

},{}],44:[function(require,module,exports){
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
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
* // returns 1.5707963267948966
*/


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963267948966
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var HALF_PI = 1.5707963267948966;


// EXPORTS //

module.exports = HALF_PI;

},{}],45:[function(require,module,exports){
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
* High word mask for excluding the sign bit of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-abs-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
* // returns 2147483647
*/


// MAIN //

/**
* High word mask for excluding the sign bit of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for excluding the sign bit of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2147483647 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7fffffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_ABS_MASK = 0x7fffffff>>>0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_ABS_MASK;

},{}],46:[function(require,module,exports){
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
* High word mask for the sign bit of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-sign-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGN_MASK = require( '@stdlib/constants/float64/high-word-sign-mask' );
* // returns 2147483648
*/


// MAIN //

/**
* High word mask for the sign bit of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the sign bit of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2147483648 \\), which corresponds to the bit sequence
*
* ```binarystring
* 1 00000000000 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x80000000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGN_MASK = 0x80000000>>>0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGN_MASK;

},{}],47:[function(require,module,exports){
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

},{"@stdlib/number/ctor":67}],48:[function(require,module,exports){
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
* The mathematical constant `π`.
*
* @module @stdlib/constants/float64/pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/uint16/max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
* // returns 65535
*/


// MAIN //

/**
* Maximum unsigned 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{16} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 1111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 65535
*/
var UINT16_MAX = 65535|0; // asm type annotation


// EXPORTS //

module.exports = UINT16_MAX;

},{}],51:[function(require,module,exports){
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
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/uint32/max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
* // returns 4294967295
*/


// MAIN //

/**
* Maximum unsigned 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

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
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/uint8/max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
* // returns 255
*/


// MAIN //

/**
* Maximum unsigned 8-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{8} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111
* ```
*
* @constant
* @type {integer32}
* @default 255
*/
var UINT8_MAX = 255|0; // asm type annotation


// EXPORTS //

module.exports = UINT8_MAX;

},{}],53:[function(require,module,exports){
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
* Test if a double-precision floating-point numeric value is infinite.
*
* @module @stdlib/math/base/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":54}],54:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
}


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/constants/float64/ninf":47,"@stdlib/constants/float64/pinf":49}],55:[function(require,module,exports){
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

},{"./main.js":56}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"./main.js":58}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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
* Compute the arctangent of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/atan
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* var atan = require( '@stdlib/math/base/special/atan' );
*
* var v = atan( 0.0 );
* // returns ~0.0
*
* v = atan( -PI/4.0 );
* // returns ~-0.666
*
* v = atan( PI/4.0 );
* // returns ~0.666
*
* v = atan( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":60}],60:[function(require,module,exports){
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
*
*
* ## Notice
*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1995, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var PIO2 = require( '@stdlib/constants/float64/half-pi' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.
var T3P8 = 2.41421356237309504880; // tan( 3*pi/8 )


// MAIN //

/**
* Computes the arctangent of a double-precision floating-point number.
*
* ## Method
*
* -   Range reduction is from three intervals into the interval from 0 to 0.66. The approximant uses a rational function of degree 4/5 of the form
*
*     ```tex
*     x + x^3 \frac{P(x)}{Q(x)}
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain  | # trials | peak    | rms     |
*     |:-----------|:--------|:---------|:--------|:--------|
*     | DEC        | -10, 10 | 50000    | 2.4e-17 | 8.3e-18 |
*     | IEEE       | -10, 10 | 10^6     | 1.8e-16 | 5.0e-17 |
*
* @param {number} x - input value
* @returns {number} arctangent (in radians)
*
* @example
* var v = atan( 0.0 );
* // returns ~0.0
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( -PI/4.0 );
* // returns ~-0.666
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( PI/4.0 );
* // returns ~0.666
*
* @example
* var v = atan( NaN );
* // returns NaN
*/
function atan( x ) {
	var flg;
	var sgn;
	var y;
	var z;
	if ( isnan( x ) || x === 0.0 ) {
		return x;
	}
	if ( x === PINF ) {
		return PIO2;
	}
	if ( x === NINF ) {
		return -PIO2;
	}
	if ( x < 0.0 ) {
		sgn = true;
		x = -x;
	}
	// Range reduction:
	flg = 0;
	if ( x > T3P8 ) {
		y = PIO2;
		flg = 1;
		x = -( 1.0/x );
	} else if ( x <= 0.66 ) {
		y = 0.0;
	} else {
		y = PIO4;
		flg = 2;
		x = (x-1.0) / (x+1.0);
	}
	z = x * x;
	z = z*polyvalP( z ) / polyvalQ( z );
	z = ( x*z ) + x;
	if ( flg === 2 ) {
		z += 0.5 * MOREBITS;
	} else if ( flg === 1 ) {
		z += MOREBITS;
	}
	y += z;
	return ( sgn ) ? -y : y;
}


// EXPORTS //

module.exports = atan;

},{"./polyval_p.js":61,"./polyval_q.js":62,"@stdlib/constants/float64/fourth-pi":43,"@stdlib/constants/float64/half-pi":44,"@stdlib/constants/float64/ninf":47,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":55}],61:[function(require,module,exports){
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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -64.85021904942025;
	}
	return -64.85021904942025 + (x * (-122.88666844901361 + (x * (-75.00855792314705 + (x * (-16.157537187333652 + (x * -0.8750608600031904))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],62:[function(require,module,exports){
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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 194.5506571482614;
	}
	return 194.5506571482614 + (x * (485.3903996359137 + (x * (432.88106049129027 + (x * (165.02700983169885 + (x * (24.858464901423062 + (x * 1.0))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],63:[function(require,module,exports){
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
* Compute the angle in the plane (in radians) between the positive x-axis and the ray from `(0,0)` to the point `(x,y)`.
*
* @module @stdlib/math/base/special/atan2
*
* @example
* var atan2 = require( '@stdlib/math/base/special/atan2' );
*
* var v = atan2( 2.0, 2.0 ); // => atan(1.0)
* // returns ~0.785
*
* v = atan2( 6.0, 2.0 ); // => atan(3.0)
* // returns ~1.249
*
* v = atan2( -1.0, -1.0 ); // => atan(1.0) - π
* // returns ~-2.356
*
* v = atan2( 3.0, 0.0 ); // => π/2
* // returns ~1.571
*
* v = atan2( -2.0, 0.0 ); // => -π/2
* // returns ~-1.571
*
* v = atan2( 0.0, 0.0 );
* // returns 0.0
*
* v = atan2( 3.0, NaN );
* // returns NaN
*
* v = atan2( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var atan2 = require( './main.js' );


// EXPORTS //

module.exports = atan2;

},{"./main.js":64}],64:[function(require,module,exports){
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
*
*
* ## Notice
*
* The original code, copyright and license are from [Go]{@link https://golang.org/src/math/atan2.go}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2009 The Go Authors. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are
* met:
*
*    * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above
* copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the
* distribution.
*    * Neither the name of Google Inc. nor the names of its
* contributors may be used to endorse or promote products derived from
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
*/

'use strict';

// MODULES //

var isinfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var signbit = require( '@stdlib/number/float64/base/signbit' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var atan = require( '@stdlib/math/base/special/atan' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Computes the angle in the plane (in radians) between the positive x-axis and the ray from `(0,0)` to the point `(x,y)`.
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{atan2}(y,\mathrm{NaN}) &= \mathrm{NaN}\\
* \operatorname{atan2}(\mathrm{NaN},x) &= \mathrm{NaN}\\
* \operatorname{atan2}( +0,x \ge 0 ) &= +0 \\
* \operatorname{atan2}( -0, x \ge 0 ) &= -0 \\
* \operatorname{atan2}( +0,x \le -0 ) &= +\Pi \\
* \operatorname{atan2}( -0, x \le -0 ) &= -\Pi \\
* \operatorname{atan2}(+\infty, +\infty) &= +\tfrac{\Pi}{4} \\
* \operatorname{atan2}(-\infty, +\infty) &= -\tfrac{\Pi}{4} \\
* \operatorname{atan2}(+\infty, -\infty) &= +\tfrac{3\Pi}{4} \\
* \operatorname{atan2}(-\infty, -\infty) &= -\tfrac{3\Pi}{4} \\
* \operatorname{atan2}(y, +\infty) &= 0.0 \\
* \operatorname{atan2}(y>0, -\infty) &= +\Pi \\
* \operatorname{atan2}(y<0, -\infty) &= -\Pi \\
* \operatorname{atan2}(+\infty, x ) &= +\tfrac{\Pi}{2} \\
* \operatorname{atan2}(-\infty, x ) &= -\tfrac{\Pi}{2} \\
* \end{align*}
* ```
*
* @param {number} y - `y` coordinate
* @param {number} x - `x` coordinate
* @returns {number} angle (in radians)
*
* @example
* var v = atan2( 2.0, 2.0 ); // => atan(1.0)
* // returns ~0.785
*
* @example
* var v = atan2( 6.0, 2.0 ); // => atan(3.0)
* // returns ~1.249
*
* @example
* var v = atan2( -1.0, -1.0 ); // => atan(1.0) - π
* // returns ~-2.356
*
* @example
* var v = atan2( 3.0, 0.0 ); // => π/2
* // returns ~1.571
*
* @example
* var v = atan2( -2.0, 0.0 ); // => -π/2
* // returns ~-1.571
*
* @example
* var v = atan2( 0.0, 0.0 );
* // returns 0.0
*
* @example
* var v = atan2( 3.0, NaN );
* // returns NaN
*
* @example
* var v = atan2( NaN, 2.0 );
* // returns NaN
*/
function atan2( y, x ) {
	var q;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	if ( isinfinite( x ) ) {
		if ( x === PINF ) {
			if ( isinfinite( y ) ) {
				return copysign( PI / 4.0, y );
			}
			return copysign( 0.0, y );
		}
		// Case: x is -Infinity
		if ( isinfinite( y ) ) {
			return copysign( 3.0*PI/4.0, y );
		}
		return copysign( PI, y );
	}
	if ( isinfinite( y ) ) {
		return copysign( PI / 2.0, y );
	}
	if ( y === 0.0 ) {
		if ( x >= 0.0 && !signbit( x ) ) {
			return copysign( 0.0, y );
		}
		return copysign( PI, y );
	}
	if ( x === 0.0 ) {
		return copysign( PI / 2.0, y );
	}
	q = atan( y / x );
	if ( x < 0.0 ) {
		if ( q <= 0.0 ) {
			return q + PI;
		}
		return q - PI;
	}
	return q;
}


// EXPORTS //

module.exports = atan2;

},{"@stdlib/constants/float64/pi":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":53,"@stdlib/math/base/assert/is-nan":55,"@stdlib/math/base/special/atan":59,"@stdlib/math/base/special/copysign":65,"@stdlib/number/float64/base/signbit":75}],65:[function(require,module,exports){
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
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var SIGN_MASK = require( '@stdlib/constants/float64/high-word-sign-mask' );
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// High/low words workspace:
var WORDS = [ 0, 0 ];


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords.assign( x, WORDS, 1, 0 );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= ABS_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;

},{"@stdlib/constants/float64/high-word-abs-mask":45,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":69,"@stdlib/number/float64/base/get-high-word":73,"@stdlib/number/float64/base/to-words":78}],67:[function(require,module,exports){
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
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/from-words
*
* @example
* var fromWords = require( '@stdlib/number/float64/base/from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":71}],70:[function(require,module,exports){
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

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;

},{"@stdlib/assert/is-little-endian":34}],71:[function(require,module,exports){
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
*
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
*
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":70,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],72:[function(require,module,exports){
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

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":34}],73:[function(require,module,exports){
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
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":74}],74:[function(require,module,exports){
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
}


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":72,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],75:[function(require,module,exports){
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
* Return a boolean indicating if the sign bit is on (true) or off (false).
*
* @module @stdlib/number/float64/base/signbit
*
* @example
* var signbit = require( '@stdlib/number/float64/base/signbit' );
*
* var bool = signbit( 4.0 );
* // returns false
*
* bool = signbit( -9.14e-307 );
* // returns true
*
* bool = signbit( 0.0 );
* // returns false
*
* bool = signbit( -0.0 );
* // returns true
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":76}],76:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// MAIN //

/**
* Returns a boolean indicating if the sign bit is on (true) or off (false).
*
* @param {number} x - input value
* @returns {boolean} boolean indicating if sign bit is on or off
*
* @example
* var bool = signbit( 4.0 );
* // returns false
*
* @example
* var bool = signbit( -9.14e-307 );
* // returns true
*
* @example
* var bool = signbit( 0.0 );
* // returns false
*
* @example
* var bool = signbit( -0.0 );
* // returns true
*/
function signbit( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) containing the exponent and sign:
	var high = getHighWord( x );

	// Shift off all bits which are not the sign bit and check if the sign bit is on:
	return ( high >>> 31 ) ? true : false; // eslint-disable-line no-unneeded-ternary
}


// EXPORTS //

module.exports = signbit;

},{"@stdlib/number/float64/base/get-high-word":73}],77:[function(require,module,exports){
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @private
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( 3.14e201, out, 1, 0 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( x, out, stride, offset ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ offset ] = UINT32_VIEW[ HIGH ];
	out[ offset + stride ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":79,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],78:[function(require,module,exports){
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
* Split a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/to-words
*
* @example
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords.assign( 3.14e201, out, 1, 0 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var assign = require( './assign.js' );


// MAIN //

setReadOnly( main, 'assign', assign );


// EXPORTS //

module.exports = main;

},{"./assign.js":77,"./main.js":80,"@stdlib/utils/define-nonenumerable-read-only-property":107}],79:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":70}],80:[function(require,module,exports){
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

var fcn = require( './assign.js' );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {number} x - input value
* @returns {Array<number>} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/
function toWords( x ) {
	return fcn( x, [ 0>>>0, 0>>>0 ], 1, 0 );
}


// EXPORTS //

module.exports = toWords;

},{"./assign.js":77}],81:[function(require,module,exports){
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

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var atan2 = require( '@stdlib/math/base/special/atan2' );


// VARIABLES //

var ONE_OVER_PI = 0.3183098861837907;


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma`.
*
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 10.0, 2.0 );
*
* var y = cdf( 10.0 );
* // returns 0.5
*
* y = cdf( 12.0 );
* // returns 0.75
*/
function factory( x0, gamma ) {
	if (
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Cauchy distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( ONE_OVER_PI * atan2( x-x0, gamma ) ) + 0.5;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":55,"@stdlib/math/base/special/atan2":63,"@stdlib/utils/constant-function":105}],82:[function(require,module,exports){
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
* Cauchy distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/cauchy/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/cauchy/cdf' );
*
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.852
*
* @example
* var factory = require( '@stdlib/stats/base/dists/cauchy/cdf' ).factory;
*
* var cdf = factory( 1.5, 3.0 );
*
* var y = cdf( 1.0 );
* // returns ~0.447
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":81,"./main.js":83,"@stdlib/utils/define-nonenumerable-read-only-property":107}],83:[function(require,module,exports){
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var atan2 = require( '@stdlib/math/base/special/atan2' );


// VARIABLES //

var ONE_OVER_PI = 0.3183098861837907;


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma` at a value `x`.
*
* @param {number} x - input value
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 4.0, 0.0, 2.0 );
* // returns ~0.852
*
* @example
* var y = cdf( 1.0, 0.0, 2.0 );
* // returns ~0.648
*
* @example
* var y = cdf( 1.0, 3.0, 2.0 );
* // returns 0.25
*
* @example
* var y = cdf( NaN, 0.0, 2.0 );
* // returns NaN
*
* @example
* var y = cdf( 1.0, 2.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 1.0, NaN, 3.0 );
* // returns NaN
*/
function cdf( x, x0, gamma ) {
	if (
		isnan( x ) ||
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return NaN;
	}
	return ( ONE_OVER_PI * atan2( x-x0, gamma ) ) + 0.5;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":55,"@stdlib/math/base/special/atan2":63}],84:[function(require,module,exports){
module.exports={"expected":[0.5125017917538817,0.5053814852271024,0.5051517554278051,0.5100241835440257,0.500573169826176,0.5144062929887466,0.4998388226763806,0.508392921282252,0.5000843881670268,0.5077990006782903,0.5071120515589556,0.5172548608092029,0.522051514653967,0.8308334941995986,0.979318769677018,0.5802556614974806,0.49541344610416305,0.49834727067225926,0.5076642294456994,0.5006086676424021,0.5016347488673067,0.5121874304486385,0.6438929062236006,0.510974177628296,0.5089820627858177,0.4966099737172791,0.5050059666603254,0.506536348899384,0.5283548726336758,0.5753377151202724,0.5137976336742598,0.5410617302053188,0.5026535734789637,0.5216023714292087,0.4989715620549953,0.5211951767562694,0.5509555371542749,0.5846703887743799,0.504409104674709,0.5026722887499577,0.5032062977653128,0.5020188879257744,0.49179810281865494,0.4903036509899063,0.5238736292899859,0.48674963939578747,0.494660520582563,0.49819096310185634,0.5071912361941198,0.6026511992273704,0.5098140081254986,0.531777947253652,0.5076601461981811,0.5364582303952286,0.5014294250464477,0.5027574146108548,0.498602281065018,0.509988401446314,0.5034065875154149,0.5214268783877036,0.4978527268802372,0.5023001461160727,0.48345957213558827,0.5188563801238929,0.5032587726709046,0.49875212166402105,0.5105115438489033,0.48258817628373696,0.5097541072625021,0.5006644357975263,0.5111479330607852,0.5074144125631128,0.5053425221594924,0.5314400223999788,0.49805969796360683,0.4953391327823432,0.5204580013211396,0.5350322616850478,0.5135484182170985,0.5170909600054362,0.49827859335499575,0.5044736547053279,0.510087462331006,0.5092564193074752,0.5185132442855376,0.5114346423426922,0.5016684597045947,0.4994260487273873,0.5336713233472439,0.5359157578280445,0.49412660116521856,0.49076176766423096,0.5175620828665625,0.522383715711458,0.4986219979616391,0.5110444714048811,0.4585908116781058,0.6621542820068824,0.5083126698282917,0.5138768075942017,0.46797954916505,0.5016272084588957,0.5142466206093039,0.5108343924399678,0.507682329433455,0.5010376837117162,0.6272840733852552,0.5244628024356663,0.5158046431807153,0.5084531582226381,0.7585472798356283,0.5082236867895628,0.5152966547008382,0.6555915854457266,0.6227798099925347,0.49574807635541285,0.5745226330182324,0.5023283091689839,0.5085114751075703,0.5151634374249912,0.5062107220856529,0.511711509237778,0.5072842311169434,0.5110380897317158,0.4999581626078236,0.5060794738459389,0.5040073606547617,0.4993928516782287,0.5051017483083936,0.504988303763951,0.5125088490047012,0.6160260769834861,0.5324866790113132,0.48842747776438233,0.5489101487080977,0.5190199123282133,0.551420125562394,0.5116570804812997,0.5126604579590616,0.662560303110266,0.4965550870374896,0.5212299972800772,0.817613409687437,0.5097244924996065,0.5009514247516815,0.5025778185672813,0.606208635348928,0.5239350801174375,0.5213835441750261,0.5003079302248482,0.5267362056459671,0.5106210443491318,0.5060263697693262,0.4974578215562531,0.5076392653102442,0.5020140863005937,0.5101821980885478,0.4990209659494693,0.5008070236497852,0.5143769958392879,0.5167057029346899,0.4975248265317634,0.5138355307081796,0.5215756826321926,0.49095616900150374,0.5059548308352525,0.50850848564905,0.5258723634928104,0.5114531544758935,0.5002502522033402,0.5075377600124968,0.6573033557905049,0.5077862909684009,0.5052137140180191,0.49905644470867516,0.49209085498019167,0.55296378964878,0.42304315242798407,0.5208697621415252,0.5006146254951109,0.4996837355811524,0.500018451641544,0.5387346537455996,0.5075598668776597,0.5130486185888331,0.5187032630764385,0.5280547953989917,0.5051067124239208,0.4942444655668093,0.49886849374290304,0.5006477371782347,0.5017411956687224,0.49853821092666445,0.4959647117587215,0.4906434823362657,0.5117135259019766,0.5090653263402295,0.5039808554737385,0.509792196826435,0.5278794769014109,0.5062799877487277,0.5403272434802973,0.5008121789926587,0.5192602257981445,0.5075184652403253,0.5458714886220429,0.5121446038462261,0.5165710597381719,0.4961988897969917,0.5099468846346665,0.5123531898194683,0.4972603825217602,0.4971827360164842,0.5083443955356924,0.5141708728761539,0.5153409634764191,0.5002730392527516,0.5008308821780222,0.5073003129800305,0.499062076358932,0.507319890744935,0.5170259675188834,0.5803735912905834,0.4973505274973921,0.6737386958787899,0.5048642906672939,0.503291824235547,0.5257133382433091,0.4883711914191259,0.5311144314178458,0.7772951808991504,0.5065699008561817,0.5086542439569918,0.5118800205401619,0.5917773414413536,0.4833119235125317,0.502670738453447,0.49327037567696513,0.5137335219883584,0.5370680285820796,0.5064629313325543,0.5212682737387893,0.5075212883482929,0.5022882265001617,0.4930347639008407,0.50344541713352,0.4959213756660395,0.5006085525015986,0.500062972989689,0.5343110777996054,0.5354184872950338,0.5102709345474328,0.5023832292895617,0.35824196765847394,0.49924803171447674,0.4988438854801639,0.7738843621823762,0.4993182644071352,0.5184574697029111,0.5435859134062417,0.5108125424392251,0.5079246722375094,0.6521120125908779,0.6450696684505528,0.5060256124610194,0.5362863763575573,0.5074721724245086,0.6279755282322793,0.5008110740734878,0.8194147242224677,0.506499450192796,0.49778166272677166,0.49856235035495666,0.4958552211380663,0.5138996482138035,0.5151012875873057,0.5051222428774622,0.5264926269898376,0.5187547849937211,0.5144288849828628,0.5128990248172217,0.5273884298638135,0.47978707494140316,0.5073248088031973,0.506323027797369,0.5513744559242763,0.862382185648802,0.5208269098497152,0.5001880386072675,0.4913810776665545,0.5206008208058718,0.5141198106381906,0.49333742162023375,0.5029563024708802,0.5223520076068242,0.8716761248827898,0.5044055590496238,0.5090028434170308,0.5031158080815453,0.5094987173110551,0.49533223857654113,0.5042743204516255,0.5052033743028455,0.49930334415286914,0.5106840831439139,0.5008916884165019,0.4830810167519739,0.5016718536225035,0.5062974908889374,0.5048898895774613,0.5165116650186009,0.4960606969924636,0.5048109456504626,0.5037090801678453,0.5147970765992458,0.5102061830071524,0.5257871762545611,0.4920496597750067,0.5000470797824699,0.5153243053008753,0.49624384294493495,0.4976669842255592,0.5096585211070553,0.4967144431977167,0.5013040221144519,0.5044632818970312,0.5054015224693885,0.5067007566152045,0.5086899020715132,0.6315464596508003,0.6284985045811444,0.5076782676553175,0.508010587435503,0.5004583832865184,0.5238009234760145,0.4920337796343877,0.5004587373282995,0.5053132923641761,0.710449258443912,0.5054112550120555,0.5104649303559748,0.5024928761412163,0.5085154497278931,0.5905916266104774,0.518166075961305,0.5003481596290544,0.517760575998434,0.5076808448743882,0.5079491922543589,0.5119518999763244,0.5316443835120088,0.5066215318025984,0.5648376678880949,0.5014924740877175,0.5090243096648364,0.0226520410539911,0.5013161686837025,0.5080612268337675,0.48059402566201165,0.4976934275410327,0.5172680554449155,0.49912428206346204,0.5078591260336396,0.5146057211680991,0.4996324722824827,0.622612527813547,0.4998473720824698,0.5798798275095398,0.5045146175434332,0.4960253539841438,0.5392281198866299,0.5064254181518875,0.5229146755450549,0.5617591968048712,0.5122560337612782,0.5022002936953943,0.5094177208654868,0.5030126639372532,0.5100605110702751,0.49492857942027657,0.546340943697723,0.5065685579153731,0.5016034778847546,0.49045642872656264,0.4974267895390154,0.5170378680357864,0.5203118740063996,0.50334642558923,0.5233293434021585,0.511771627242026,0.5728251968551935,0.5118729500341344,0.51535286648797,0.5038628397647729,0.5006541826596955,0.5030956109214073,0.5082066434976185,0.4885766948828108,0.503346482466186,0.4998708467586106,0.49735038360752215,0.5197796840416335,0.5015737890399539,0.5023255651209224,0.5332110910709359,0.5057982752657106,0.49778476662821863,0.5026470846666974,0.5048415775357844,0.5079977442240644,0.5251811251770958,0.5022795179534156,0.5118035453919992,0.4996049539296948,0.5100004708095403,0.5033281296537291,0.5134701839421426,0.453603975375228,0.5063996717233167,0.500823918963973,0.5023597360761515,0.4993095174116991,0.6155768430276612,0.5312844288723202,0.4922439933825206,0.515772892071983,0.4994295861398266,0.5102462012521696,0.5171275260475635,0.5141361265302102,0.5033000867646417,0.5000556561582039,0.5122811891458792,0.5002253410207776,0.5056614420362631,0.5094338356652054,0.4917831895240877,0.5638479494210346,0.6170586714009022,0.5130301843015513,0.5037723450877408,0.53692591777167,0.5002905853908557,0.5151393124843213,0.5237796919983864,0.500211412836791,0.5074527114072108,0.5028455254824817,0.48727502506337467,0.5135799494199902,0.4903698896254366,0.5183282505599518,0.5189171840637806,0.5084596761383477,0.5066999662705334,0.5112293671251903,0.6383089607784859,0.49872677604316246,0.5123308076316216,0.5124157942447867,0.5132996508818297,0.5237458687365141,0.5499988243433876,0.5131908682287395,0.509857994996163,0.5613922076586894,0.4698160623783156,0.5174647243394243,0.6625240234618983,0.5140325579279388,0.48913706704694165,0.5380882169568915,0.49804060432461084,0.5882410378313518,0.5052127326496476,0.5978641851136249,0.5010610335995761,0.8579127225357622,0.5193701017505432,0.496946310398033,0.5043297548099409,0.4968968640377452,0.506527669945095,0.5110600340669069,0.5071713916655897,0.5102135330271464,0.5028036195329714,0.5114601931088144,0.49651005052776964,0.5082892379316442,0.5021807172613674,0.5260317007570795,0.507905159948123,0.49508771533614176,0.4954508969396784,0.4973805625935622,0.5054171620238697,0.5085127389792045,0.5499696106799452,0.5264247215387386,0.4993264711455751,0.4977359630350642,0.8111216962968204,0.5090242336104053,0.5139663609339099,0.6050543097589693,0.5506127613786097,0.4998034470594058,0.5084755117429035,0.5076851895596177,0.5096375247251361,0.5222157420482062,0.4946867383737989,0.4943873757308823,0.5824221131801786,0.4987711199551856,0.5132570320446342,0.5082544459030347,0.502393246279741,0.5293640561966629,0.515927092620876,0.49474519347276624,0.51023735978908,0.518420039707455,0.501592537216532,0.5111634556718971,0.5044775080689287,0.5221241655745453,0.4980749961482984,0.5129108258590973,0.49204555201323563,0.5076210446406386,0.5168404151860188,0.5098463614528308,0.5246808373631474,0.5231608394297839,0.5048302422099278,0.4966904298752477,0.513989725864979,0.5082872142491888,0.5067577299783607,0.5016243514253292,0.5014286282203502,0.5290202770677606,0.7615504444438261,0.49941776490341055,0.5009533595999289,0.5076361063333543,0.5140813837350888,0.5029733652239479,0.4863956591107658,0.5169426055254591,0.509546923473571,0.49349771195737785,0.50754370750906,0.49809616643815463,0.5022567395594857,0.5292539773589434,0.5007251277565313,0.5076505740591086,0.5018542931844122,0.5039833893802503,0.5108398637487394,0.4634999163165284,0.4954775050793235,0.506901128103961,0.511490538896391,0.5126470613485927,0.5045528924015491,0.5025912059494331,0.5144015573451729,0.5006035851905682,0.5190976990111118,0.5121303264711823,0.48176495127439506,0.507099959675455,0.4982768264739908,0.5024803316523736,0.5000583021237749,0.5199141490424001,0.4927831106945386,0.4997647588946932,0.49667371068704536,0.5161893427374806,0.5057073841582869,0.49985879561895125,0.5026621676127323,0.4993980090532356,0.5072038883036285,0.5075743048671395,0.50137750152701,0.5127285728567823,0.5069603547642698,0.5263838265512272,0.5050283179222789,0.5037687769934318,0.5741278881220032,0.5181828081696594,0.5025747477067054,0.4990864764025065,0.5234369021775438,0.5090944539803633,0.5084341434369474,0.4983836917724467,0.5109459446920689,0.5028187714874404,0.5080300761261474,0.4995886251308959,0.49973177001010743,0.520788548984203,0.5129726876468834,0.6432971804684964,0.5011436549928023,0.5049371006977428,0.4968461374096742,0.4935762627511084,0.506128510081989,0.5058063456489557,0.498083171390771,0.504007259646618,0.5069580776156427,0.5116680074113387,0.5108466595333663,0.5123656953893752,0.4997948133041877,0.5022467689805383,0.5110261051971422,0.519512197783282,0.5014008088326479,0.5684136719039847,0.5055082496783481,0.5583994392927429,0.5961429020671952,0.5067749354143172,0.49880662530920633,0.5110751496844744,0.5267499971462354,0.5030766578694966,0.509085289342083,0.5140871379935636,0.5039606803278516,0.5148914111713246,0.5087998624089521,0.49248596958360896,0.5003288104801641,0.5402522866990316,0.507566434614636,0.4730196640801166,0.49705787291280085,0.5026221897720069,0.5076177001430164,0.49564478399023804,0.4994398002865223,0.5046579373635985,0.5283890033029641,0.5110631777019531,0.5101185040543079,0.49845127501711683,0.4957708898029573,0.4893145547461504,0.5293579874527544,0.501352465103112,0.4996356816230692,0.49889718361089275,0.5026538534851319,0.5011412963822579,0.49733921867182246,0.513383833225447,0.5059518035051755,0.519114706429379,0.4977198450601871,0.5089493502637378,0.5103342126199814,0.5133115257174672,0.7334088272292937,0.5114060106301077,0.5067652549212255,0.533465259127278,0.49734015906924917,0.5133019706543588,0.4796308847453387,0.5216805859402524,0.5129893004224672,0.5336631838761836,0.5088756703215087,0.5624867687927764,0.5273666323599705,0.49146386622083116,0.4957185840857081,0.4969308295757013,0.53968414093169,0.6098372123378979,0.5445800396047993,0.5040313367092368,0.4998854751510465,0.507784409086856,0.4964462301407231,0.4931406805742981,0.5062122974271954,0.5090396837950312,0.5263500609740982,0.6055971898350352,0.5688781468200007,0.5061260087334353,0.5000964697949418,0.49967787316911644,0.5037359611326165,0.48083669333317447,0.49761010493698105,0.5088507903931843,0.519236422858654,0.5117102791862788,0.5042282847421456,0.5143496379362068,0.5494192784965658,0.5262317214452269,0.5002927362423748,0.5108060487837623,0.5118985043878028,0.5063515703942345,0.5156984831330226,0.5009142758470625,0.5001196515278784,0.5762490708960085,0.5279483841358181,0.4920678614008494,0.504861290633337,0.5094863468783968,0.5063352189738394,0.5008996093389941,0.5148634277518744,0.49957352470658706,0.5048454844590535,0.4946340032565786,0.5020620841008996,0.5059430420457559,0.4983663790629975,0.5096421238442436,0.6005088572739291,0.7995303778628146,0.6057913404284916,0.5037742464681426,0.561983493224142,0.5061909770545431,0.49989867092363455,0.5133788701802581,0.448812900002251,0.6863618223440922,0.5076720008563819,0.4964077781678694,0.461412788831379,0.5369091753725587,0.5144108963592794,0.5097222568736404,0.4947451048826535,0.5306388137162554,0.5228382042884886,0.5079096113033543,0.5509666962934309,0.5020244337270585,0.5155655074838931,0.5022878791813935,0.5030838226619317,0.5012924810057753,0.50193649542456,0.5085429611421094,0.49708156343017795,0.5532152467129162,0.5033300310619769,0.5379346203167916,0.5017670181209498,0.6074407778962001,0.5061181224467977,0.5162313857696677,0.5064708759064777,0.5078915474682888,0.51043694289855,0.5048786353561203,0.5032962194603436,0.503665008213331,0.52077289738469,0.4894850517061228,0.5032120365768513,0.5040754974641253,0.5086495679725,0.5268179853677707,0.4986481108295808,0.520036223167779,0.5129532743131013,0.527947869188709,0.5093961497826416,0.5025674220724333,0.6028951178982981,0.5112885733173005,0.4983228871404004,0.5146437364795945,0.5140908992867126,0.5389818159548654,0.5101197523069068,0.5046314782214426,0.5019933201340931,0.5089013693725785,0.5312247254443684,0.5066688647225054,0.511251453732347,0.4785559977672124,0.4964803145724559,0.504324069328952,0.5093420054170985,0.58440684026903,0.7445198478282499,0.5005545247148064,0.5148134810294649,0.5197470681605446,0.5008526940907833,0.516761161995446,0.5016726231654859,0.5009730499770203,0.5151882046793961,0.5050342735684133,0.504318716188848,0.5166473266685719,0.968177602312672,0.5001021742752775,0.4935985531256417,0.5174111495665061,0.49667929499739377,0.4990846144765571,0.5220373851916625,0.49675141922662863,0.5018780778450016,0.5069618375781854,0.5193062265126515,0.5116882470802918,0.38073032420165553,0.5029413329337814,0.5319842007607695,0.5111081977371398,0.521018328016643,0.49981459736987627,0.5306446691862846,0.5012874688244875,0.5057205883611122,0.4987118667577986,0.5105306970770882,0.5103207743781338,0.5109506960559017,0.5054363323508064,0.4937735053178002,0.5047948698013923,0.5126813981490259,0.49785133268953513,0.5034357820752939,0.5066692364423513,0.5110082641449708,0.5096902803412982,0.5086224319031789,0.5229910465790303,0.5556921092461109,0.5008456920347042,0.5049415002278049,0.5004679134924136,0.5135161617064551,0.5093270446232605,0.5224021289822701,0.5660096106583131,0.5041357412273249,0.5052072669326388,0.5496127676042769,0.5303974845465653,0.501879832432918,0.5097627761980851,0.6412370216439702,0.49626445851657186,0.5021905016749507,0.5285229444019018,0.5086388081873289,0.8293239865289899,0.48795278103089523,0.5045671151841588,0.5003954628784874,0.490228061837912,0.5065758485800907,0.5268747211398696,0.5097351781455457,0.5016462336490783,0.5002074900988535,0.49937657443614586,0.5051891250929788,0.5423642223193261,0.4974084147157664,0.5339195899247683,0.49584249369657907,0.5030099858072358,0.49866552026585226,0.5059099103369702,0.5047215871551375,0.5047681931895724,0.5200346990532133,0.5531033506729479,0.5019074374503871,0.5187849984003171,0.4987299543826799,0.4966032026182702,0.7532130390721574,0.4985038270860895,0.4999301526203043,0.5167158826582429,0.5120955083880657,0.5021932529641898,0.49968976491635503,0.4945076256660563,0.4980795285865602,0.5056236497175224,0.478355272071742,0.5002845780211559,0.6025309129289318,0.5314992742260135,0.5106326941286153,0.5063034188901568,0.5156546289903091,0.5317273207718239,0.5087796814645014,0.4997422589311541,0.5096265432513823,0.4869673591474344,0.49716950519143244,0.49970344805281897,0.5136266642270709,0.5027694332648932,0.5061122818884773,0.49570544709443715,0.5140120728048377,0.5722311951711693,0.49921414378586154,0.5028428630521122,0.5009249073628859,0.5228582075941774,0.5047694040674148,0.5097089615938579,0.5055272714010945,0.5011295780388388,0.5096326680567868,0.5352450023021254,0.5096066954712933,0.5015111776311716,0.4779643544149254,0.49784801110514126,0.4673504266853098,0.5086934866461436,0.506181498984075,0.49768336262490626,0.5122067415380257,0.518338238190004,0.5190190232094384,0.4937720269089891,0.5040891522703147,0.5066920778838329,0.4970722078353963,0.5126847879552057,0.5046825984996618,0.5112820606395989,0.5008759390577702,0.5135622289171335,0.5066879786926705,0.501332042222123,0.4992671249191186,0.504175697506692,0.4844473507144321,0.5009793127803767,0.5133230413223385,0.5011938335921599,0.5095270560934579,0.5026982314901305,0.5118627434229941,0.5127034676066615,0.5164412554124602,0.5064654292873186,0.508492861584227,0.5185420954821582,0.48544701031436766,0.4939239941951684,0.5044733891618312,0.5116390409440377,0.5542446226140357,0.5034646892657875,0.4943869471009006,0.5009703287664733,0.5478104941580763,0.5301871737177504,0.494647371251614,0.5369097066965609,0.5274360910162265,0.4979589751592799,0.5011362048881008,0.5042731472679759,0.5121004371871364,0.4983820452633636,0.5032417857736774,0.5084924490227699],"x0":[0.36050483437541603,0.6914936011707469,0.7280512116556859,0.07393466612195398,0.90183502721048,0.015064204739412945,0.8667481504145498,0.311352708186184,0.34373924506769615,0.15437160929579297,0.6251771527897141,0.7344692726969713,0.4786273956849916,0.10300602711541607,0.12218025038922731,0.3006682190243324,0.8595354734436227,0.834344445974422,0.9436259047726376,0.3430155759071818,0.4470788560972012,0.1569559338322566,0.18726664480102184,0.5791522090863206,0.07855061124871021,0.4892592965965217,0.007974504400540594,0.05096804991277937,0.14948412018068247,0.3507055085505879,0.5793842131292022,0.07799873593290085,0.17939839616161324,0.3345682112406547,0.4831951082074184,0.4167900821458135,0.06399410812985029,0.4290427923201072,0.7351200883156572,0.10943412622260928,0.30716593538426307,0.7116912167710228,0.7428395634906739,0.9873015360282271,0.8771637625873545,0.9987289770891843,0.549802345549177,0.9792376006852024,0.2475894482448302,0.2241895134182379,0.652140827001326,0.15556111163555797,0.8222181240846724,0.4049816637460839,0.39173556709504,0.12798000816442356,0.10127880389146027,0.15678486481992593,0.5976072043505709,0.04613087971530172,0.43673943660543135,0.8665265562067643,0.9169332857759727,0.312579666421529,0.38810995714803265,0.2046912248290096,0.87112100595674,0.7257792686142486,0.6450097107558941,0.706636463789521,0.7523094249288402,0.4135626909987933,0.02344764570171809,0.43953594116947303,0.6661086930756259,0.9912756549724882,0.4380831554407345,0.3267390443940914,0.5530353380235098,0.7750616613601717,0.329186033549993,0.8489193826907768,0.6385448976681145,0.8180781906422343,0.4861244218803684,0.3394566106158141,0.510060110129511,0.812201175559361,0.18486580688901255,0.07240901535085564,0.5828883947683889,0.8239510133917896,0.04403434834548681,0.05892173645258758,0.18684892204476933,0.9586855140529429,0.8302499381455377,0.34885985328806335,0.5838519241009947,0.4352485682190097,0.6028226688557459,0.4379561081388472,0.28296934607066926,0.8115438028057831,0.14743533907531248,0.15535941194335345,0.1321962491873836,0.38534882245771573,0.027183006903893858,0.5262082814969447,0.01360618911102729,0.47600916240626656,0.1503287580576309,0.29058668296543133,0.720155743714775,0.7594314851836712,0.36256740480081073,0.03341156418395008,0.2838128504866446,0.6975539089079879,0.538804797629683,0.1325039492636979,0.6614303265362476,0.7614011224360171,0.3534346368060035,0.8029230527933773,0.9649708178383611,0.6819850077943819,0.14930815480066761,0.742821506977517,0.7431818998667508,0.30692545521176684,0.6176668631064743,0.5799196861587785,0.0418161567241484,0.07671467306278257,0.08047178729957882,0.5465055842984265,0.9893356750565807,0.8359783900221083,0.6435413389057971,0.3992741986047097,0.4731450390787222,0.528431042356786,0.5979131789530037,0.14396563323216727,0.7293750651829898,0.22555607427150615,0.6366365732285775,0.6858739414212711,0.3168156512223226,0.6589665902311723,0.6671498520773651,0.14996505776142532,0.18197068204646594,0.8846724526333885,0.6169129363900727,0.128935689944899,0.33437929811590195,0.26858876575153,0.2799579226773743,0.3536504697733809,0.22222249088396762,0.22237884499361105,0.7591692978593636,0.8825680474656601,0.6950333063073697,0.6012881484579993,0.6433060716173085,0.4311781769352405,0.47891594585870023,0.6042250553261999,0.3287349292578894,0.9472505471457833,0.6312814052287277,0.4824521986872159,0.6799139447533038,0.822826677520188,0.11876789344449956,0.38744516199471657,0.9336998759704613,0.4589096872641403,0.9651206034815665,0.9364617296378728,0.5892422324891595,0.15412460577761866,0.3861792299209845,0.5402573568438533,0.6662152171231874,0.9753421771778983,0.8663416229728833,0.6896980340162338,0.7033432595023774,0.8410421470858038,0.6522041292517169,0.4545410204979923,0.1680196644650922,0.8194664255260626,0.055053481970654294,0.19026418292250336,0.8934357375187163,0.2079315580324046,0.6251456083939615,0.3090887991404576,0.10407673996658184,0.10625348326977191,0.837787521117211,0.015914566520684348,0.9631760627392616,0.13190649261891618,0.8480399797750635,0.8863295795467734,0.8700985760719808,0.034278285074255344,0.23969516517482914,0.2530296689926954,0.7424348373693077,0.21860890786212606,0.6706980678957435,0.9324377545684226,0.5606217126595705,0.5320671111775106,0.173614085912013,0.7840007936699211,0.3679652463917926,0.10418238484701536,0.7150683223609293,0.8876298259233817,0.6950741542038514,0.5658688613111935,0.4363117638356251,0.3310827226864481,0.04635957325355755,0.6999060082192086,0.9102554376886758,0.9688742250751532,0.8903120686885222,0.9340535589573586,0.835414794748861,0.5483059250105002,0.10815305190066704,0.2517184867050035,0.7212712145008291,0.7343424755434298,0.6701020251847598,0.9891531102201112,0.14223926176163504,0.6431484666527381,0.8015152706945958,0.0723574023048863,0.6739261828487397,0.04181188792781043,0.44998375572702365,0.8679795194722248,0.5365182090330021,0.5779714868638597,0.4378630351514541,0.12728445909332886,0.6969427220559798,0.06850264068990675,0.22110563274833117,0.93969856844545,0.8529185873417977,0.5286616141482858,0.04143386233823887,0.36324683494666066,0.8641896031682144,0.35693750832640014,0.7318913262279447,0.3551003366557597,0.5113757307110278,0.9816946529801849,0.48646701066650144,0.5547543536012305,0.4751478504122384,0.5574841229256631,0.30726380673680564,0.36018778911459703,0.0664039332817099,0.08947634255917825,0.01678323926146774,0.28553656129036176,0.4716586402184002,0.05402670959804445,0.8612319974346676,0.029379117373960595,0.3795208423703562,0.5009518124145169,0.972592286072794,0.5559872795055283,0.1989186472434452,0.13062664991539963,0.9329212726023834,0.03929935063212153,0.5271819858220841,0.4382408079107951,0.4424160468798759,0.3246064105456654,0.0025151594366354946,0.6469459835799913,0.7939467722114821,0.5442231501515675,0.8269550353795396,0.5743660428255335,0.8769106605822989,0.28370577128994046,0.969266621877169,0.5389306797983071,0.588881288156903,0.22678735784398119,0.14632683209086217,0.8984709856449469,0.5484370116181843,0.052063496696439504,0.13435372259220202,0.8317385860262816,0.05616182931728031,0.9676923639538113,0.40517090351206586,0.23775820640050926,0.4779204244413475,0.5451632890886613,0.3547528917916789,0.6977379675727882,0.9589105444479893,0.18984761954348284,0.6817957236021988,0.838063204347826,0.3586981512657983,0.7418149894114945,0.5054436300734801,0.25285474703697597,0.6282986529394208,0.37222759509421977,0.4038397668618092,0.2788409825744196,0.3819111282225376,0.18276126004173032,0.8596801039829145,0.7004152261260896,0.21603225579751317,0.49194032942359756,0.6065414634553787,0.09295751344493075,0.9570308014173754,0.9508806408287689,0.5842156487145014,0.5254984233450444,0.7768502484117075,0.19294924946491965,0.6233672344053773,0.37701639065976855,0.00990652291058769,0.926589441076384,0.26937136153941243,0.8812045560868462,0.4082166029857359,0.45288129735859517,0.5198558839621952,0.8324954442177857,0.04794719464304875,0.8048853965197269,0.7607336714637116,0.34717677062406027,0.6992825548498187,0.6975919836888542,0.15416742556089402,0.7692207971973422,0.19694963259923948,0.7630125351949804,0.08948588574112426,0.3752033296183235,0.4578803395916311,0.1443284223784742,0.5412441106396175,0.1371914434745758,0.3675514026740909,0.9387927627164985,0.3537855899106095,0.9288021014577923,0.7474963976364235,0.5649691683147837,0.06581805158439269,0.665563806006854,0.6144930213198556,0.007133884129804979,0.2693890717221621,0.2857975840042164,0.4366825133154393,0.14333448131955118,0.7077059393172764,0.7722645331543794,0.1004344146401801,0.4661888021688292,0.555322370278895,0.28669009645157617,0.33226269937016695,0.8553761912342619,0.8725650773108855,0.21312751094790316,0.8201347144506925,0.23946535734408037,0.19576599426646268,0.77628105614696,0.004928383157176031,0.5310393137805745,0.30285197103058215,0.2589146977853618,0.23360963623149056,0.8300490849721509,0.8469161018342888,0.5519169744744408,0.19233115760934916,0.8801901844700499,0.240432043983414,0.1303823556683792,0.6823186617500847,0.9636999793776702,0.3219833186394099,0.2628828928882907,0.4073999592768065,0.7181749623384179,0.30412243375114056,0.7313719215828627,0.7996758386865472,0.5104458503249554,0.09409055320468429,0.31140019256523654,0.36855613766339346,0.1988311831718903,0.20775948216960738,0.011102737162666854,0.36999653003847466,0.45933661608327747,0.8351689631206909,0.4595606516236155,0.9471883579590146,0.6976167658014816,0.4107128745418285,0.5187687434806911,0.16233780048144664,0.3029841596035694,0.8658875442584821,0.4509264230730714,0.6340209542884125,0.46987893208890075,0.43468888982560117,0.10211878096755989,0.9780855141864591,0.2207539639872138,0.46436246194499153,0.007031714210159246,0.6074175793168497,0.7579705016365286,0.44976548838274777,0.29505911798112283,0.7307021413733792,0.9696765316582892,0.6334464793124459,0.013220961410304488,0.32803371787698166,0.6437229051850317,0.16725198677744713,0.711244335880757,0.24362007871744296,0.22032795441684838,0.8846867775089573,0.12280400942355318,0.8771242163414368,0.5005327806485007,0.7727508437980282,0.2576911781613611,0.3839551380476598,0.6506690461014952,0.9618494476901474,0.1761861122498698,0.554633351535271,0.017694463883877187,0.35111633575057977,0.9271591730144897,0.897343413706382,0.8318001653222822,0.4635743920245734,0.7255026396401001,0.6278486243432027,0.581929083891171,0.9090304318222322,0.10385127646129244,0.6031869902681055,0.5789359068863886,0.051528801885618813,0.12765652655266235,0.10020257372470498,0.9491360422061916,0.7312363449569086,0.5027563363823822,0.06203857934236923,0.5816775635713409,0.1595595350144552,0.29947187528526653,0.17180577822371856,0.6105185988357036,0.1690356415143115,0.5434868251762859,0.06928971133722261,0.08265633039616138,0.6871851444780173,0.12618217136094012,0.47190338899220974,0.08000759080433517,0.21708742823763094,0.03603620174137423,0.8143026405205154,0.6155648619614007,0.4806749719631749,0.27486061889391755,0.28325148790922094,0.877966313034231,0.0009953950800398736,0.9691290950687605,0.4345750030271309,0.37278463984524013,0.5880958861150927,0.255299524691325,0.5766641228618414,0.09801071548697093,0.38235397733358867,0.5151848781712416,0.7791954413748474,0.2877417185728992,0.8313930573790735,0.08421916772146743,0.1877464403760618,0.42923005786764934,0.5574061359271454,0.018365564431427117,0.8296970327050717,0.6987070674200369,0.22961061395866333,0.011167650112230199,0.852422640109908,0.19853785821163994,0.5280380136295542,0.6274950236499488,0.5971969009485798,0.5892889007516642,0.6665958897999382,0.8498104122484622,0.07125831167215613,0.4889493086634602,0.9861762802033949,0.1530717676962423,0.026156626635915226,0.9895790885380702,0.8046289065540726,0.6851902044599207,0.38091445945227065,0.5733439337531037,0.7348626305331665,0.9742982611880187,0.2047013996360807,0.05105822418216266,0.7602840706643912,0.7846774684210094,0.761345672623257,0.8761522660748391,0.17758655668200296,0.21683556084944744,0.18009069422349655,0.538231517942735,0.6500882773069039,0.4421388322144857,0.3545139359093188,0.05239711204669817,0.7225125059409627,0.18704080158605185,0.4950782346865408,0.6696845457951237,0.4723749406058786,0.8844839103977218,0.7149262235797313,0.712797924774007,0.37144615654780555,0.17300302857668726,0.5971511180085636,0.9980218900357327,0.35454676192684076,0.5129957612966338,0.2765138988243059,0.6292761493853813,0.14290918938287334,0.09335269055730122,0.020033885066719437,0.32791722097176845,0.6255805762202515,0.024895414946887184,0.71013152697291,0.16157277988491225,0.7823623020913077,0.680831456682014,0.6114682210476583,0.339483968188816,0.5776148494809294,0.41946988454507506,0.4682619677461488,0.09692283789594036,0.4991077577435459,0.5734518344447836,0.15997114963280046,0.6805875515351942,0.6492770076765302,0.23513685198326972,0.503210962619048,0.106574845146862,0.827561251701276,0.6892673126334499,0.3785020724679524,0.9051943572398551,0.31176538220610395,0.3528989611369473,0.9140779470733587,0.8344759604859551,0.27817030183426117,0.21585276928061625,0.5093704084600275,0.4542456814083644,0.5054553290998471,0.5995166179632385,0.8207137846398778,0.17551528056332866,0.452689360783161,0.8398438248547355,0.32787854316053155,0.6731712662135323,0.36698458527549893,0.446376152654159,0.09956574822950115,0.19388191514350894,0.08976541277257688,0.1876343441746544,0.10752226606039095,0.20772932987594372,0.09963439675965224,0.5681675070538132,0.6738344616223453,0.2890565453831282,0.6309320371041987,0.971603219819543,0.6307102473499309,0.661914406341527,0.38067985699937745,0.9905875384817759,0.8360268813043032,0.6822136212829208,0.08761573260056044,0.028527159951525327,0.8206255246817533,0.5231405153580027,0.5201035704831127,0.8694835015981002,0.5829374924658413,0.4534419565680219,0.5141149339431359,0.8667033487971365,0.941014940661369,0.6360662932258845,0.6142693801282861,0.6943731676904992,0.7566058082916665,0.17205868033892235,0.5921912310770778,0.11410365183019433,0.25273508250056387,0.1947553668212587,0.4222317675324674,0.0076221726034235715,0.5735371780746743,0.0326211488375745,0.7581492969138923,0.19016277868578446,0.5835153217073252,0.08147163951375291,0.42132163334530826,0.27765711588549746,0.005907059948233595,0.6039557912399913,0.07076936766205066,0.8179717341075661,0.61605376850504,0.5016245018811893,0.38449028148944375,0.11843618690119162,0.49724319511967985,0.7382553019232236,0.9983716617227838,0.42209442417793164,0.9901269208031334,0.8981918885390512,0.5305071780673976,0.31419636472916546,0.07006692211944343,0.4481819682844934,0.9274428113591839,0.6503875452193306,0.3117257863947389,0.3359457676830455,0.9816534254924794,0.891471398182363,0.4159475799905932,0.579836166255155,0.31575266333160834,0.5597720379408815,0.5249008817027168,0.028860332609409234,0.26557378037599677,0.1613971081125143,0.9146149895931579,0.6494396457263178,0.054789349191108894,0.28380853883193935,0.718262948865878,0.16738097830446375,0.4017226436755472,0.11466943796942997,0.7846249236540253,0.7853688978101987,0.27227998903297146,0.3548174492303935,0.5275471292399547,0.8231560772862863,0.08464507193122062,0.299605059684819,0.20914357254158888,0.681154339120793,0.25152236176515164,0.3945543179333806,0.4460625713584956,0.34483321277718293,0.16542456570507147,0.15365719102019204,0.736388213510375,0.2644564017249973,0.6845820992008256,0.3711190249901737,0.35485026884372095,0.19006433562090064,0.7149941836811844,0.2374201560870537,0.58351332805117,0.8758676494418787,0.4078635494095646,0.29638408646673686,0.4321907169756529,0.8256743938136764,0.5962031122583964,0.89733267594388,0.6255705791522166,0.020731581643109953,0.07575055589834201,0.5449455236860354,0.3311948440289785,0.7858064677881582,0.18647103763519035,0.010073791779239283,0.4145546662217783,0.6735233240983727,0.4375490204371568,0.3808552531646634,0.5726623632167778,0.08038412201390766,0.4250901520655337,0.6252188112576067,0.24996305798719165,0.7710900718078859,0.5606858777797088,0.5086314441446811,0.37352699312315796,0.891671508224094,0.8988407101633682,0.5037546812548834,0.718482906642216,0.8686413183371522,0.8903031551631293,0.42169096046747145,0.5781110464339876,0.31450513917891265,0.5315518556497356,0.07680321040647486,0.8224775858918696,0.927440332022488,0.5309888729975911,0.5078090838212694,0.15067658024977093,0.6007739738176974,0.9684413032613077,0.05195344545026548,0.21504163226274664,0.5833604205526235,0.45717263761683546,0.19880620698172602,0.18382276551368548,0.7148338746174483,0.7533761320541206,0.6731162702435127,0.7112599459667002,0.6538097184001497,0.32567961432192116,0.5266133988977821,0.14625513281650293,0.30655000069268845,0.0340501674666418,0.8734234703849124,0.3487772405387488,0.29717815048622764,0.3253039934988222,0.4577758856652083,0.153991422840982,0.8966133349805883,0.23581829808026056,0.036098308138914126,0.590306221186526,0.31249225114378687,0.1653235282863128,0.8946266069117847,0.2591677864407156,0.39246375267740685,0.9011346603500245,0.8564869711680327,0.9612081068058351,0.36990819386951945,0.755777093094631,0.4819890530705262,0.4237402770899785,0.06766358090633484,0.7191073440894897,0.4259583410777412,0.22965665097369437,0.7797643718632605,0.8006908307662319,0.2801624735656463,0.036878801713011944,0.6858988741217211,0.17427914066511385,0.5599388889329986,0.9690022302345069,0.45702495441685453,0.6336747126668387,0.8308417046110583,0.9380152905099921,0.7817032324157169,0.16162346250898252,0.14761208471656828,0.055174970921125555,0.7243628035212166,0.271621454603699,0.45897833694173507,0.17069566692455584,0.16370107230168873,0.26902874736896143,0.5424039722212235,0.7472045808633674,0.6645070119511014,0.8341171753055068,0.4808192286933284,0.1405427285639851,0.4410534453162771,0.445940155962967,0.17653260094361056,0.15969501258950491,0.05584671872214675,0.22540472014924262,0.3252354686825518,0.4369657443691024,0.7364357381036475,0.6004854047667343,0.15168069568656684,0.4760902107810603,0.029094635646022216,0.7225442060658009,0.4940860325074068,0.016938739434808836,0.627913054709903,0.708377694342762,0.24378217711470862,0.15824426203636732,0.2089934265316109,0.5692174648378139,0.19224728457951645,0.3660678405139981,0.3446467088867915,0.9588307147209527,0.5285557379594459,0.6556229531464679,0.4546596765383124,0.941399759591877,0.9502383715996874,0.9593876754196442,0.3334922020749864,0.3608786094911449,0.30058069161155143,0.5670817253351981,0.32743330663710246,0.8181468468752318,0.5963164505468175,0.1177094002246466,0.6364699810863113,0.6503700245996298,0.32205120564843837,0.2235126099505076,0.22134216462598766,0.6982948087995093,0.9702935490671702,0.8495089735697063,0.4981560558461682,0.8973272648866732,0.35248844720200045,0.37811221326511824,0.5404376436157201,0.15000387550525285,0.6789891585190932,0.18669112781959774,0.10183485514156643,0.9849611535238461,0.3396565575351207,0.7915028578329506,0.6470709696253112,0.6694679547817812,0.8634713761753587,0.7625407114218825,0.7546342909879635,0.3892979205715792,0.7806950109326507,0.6218468056381354,0.11480006501778561,0.6445131765588623,0.8043089538905341,0.8607731281176889,0.09903533952647159,0.5113555701913757,0.5540677403620997,0.7871275331485954,0.48204074084243675,0.2323825823308434,0.08908622843376235,0.44621193123635416,0.30388789722075726,0.4916347691776861,0.2676778318000297,0.6837383314887053,0.8454958942666284,0.5540769190873998,0.2772911734780712,0.6293232434775404,0.587698967570885,0.4786724749825737,0.9962488886977339,0.17541600661782275,0.6825078393968635,0.9750509335768884,0.033437383747490834,0.0652657008459061,0.7451391474741385,0.3975152232124368,0.31474990879613185,0.19680093781735608,0.7036490705080356,0.5930447381808723,0.712492174147296,0.9537402256785388,0.8120561122360606,0.3734434094338466,0.3255951214187882,0.6605370442695555,0.2165020769599164,0.16466004050562488,0.01378125226753979,0.11760209382590658,0.8309212593923196,0.6821300281902105,0.3919549860000531,0.23861240859264687,0.8821582999810682,0.521202101040317,0.40309320507231505,0.76799512349422,0.2766300008535414,0.8144889107773672,0.6761800930210207,0.22712002156876276,0.3686356553504091,0.9885497593014088,0.7146630492750599,0.11631211522265228,0.3252681317929942,0.5512145413849336,0.7372209797442484,0.28676290166720797,0.8382020372673895,0.46327886514118677,0.37487183787960565],"x":[1.3117498632116011,1.1452670088023487,0.9480744346402914,0.9422710045452822,0.9905534903745408,1.7559232540578815,0.8571254082892108,1.4999045695368625,0.3515070173247983,1.0981561651288394,1.6008217862455973,1.8838873275107222,1.56493898480106,0.34060302359044137,0.8162683868001621,1.3377009014326178,0.4415057923620962,0.6960032981292885,1.5613930280093884,0.4244587417500503,0.6615236780316764,1.3017414716124192,1.3668661075442938,1.735648456195098,0.8809250961876707,0.2721175744650388,0.46269701096538407,0.40177559601766344,1.813547682715058,1.546833809171079,1.212555424682321,0.7185346059398046,0.4170788219014896,1.5518392641406025,0.3911216994790774,0.7796410284968434,1.845987785455729,0.6762333998686083,1.3788750544612474,0.4976898613315166,0.7532281448013656,0.8515142556957267,0.19893690599126224,0.04227502001681582,1.4310425617148228,0.6218274783643114,0.19769796635372128,0.8111841766400469,1.245256104675026,1.7266671018858801,1.4323293865889006,1.6533739918043509,1.4472981311465927,1.1757123390268687,0.5421713627476938,0.36646893856264784,0.04784351140404075,1.541171472910829,1.130610594212929,1.517459275745126,0.16368955445306632,1.2097181329081383,0.21773505017345895,1.2162031353645544,0.8841704356370328,0.028697652867945234,1.7861456150548718,0.17079445399465554,1.339174478799245,0.8092228429650823,1.6277201344229515,1.0757516646148177,0.6271043972231762,1.912022031263818,0.3687393355419939,0.5720984455637019,1.2695325569457157,1.5930094697350228,1.856273986137709,1.7815548123170495,0.09619110095423888,1.3938350516275824,1.994674606030121,1.789290599419585,1.8179568358057923,0.7488077535644058,0.5531196011141231,0.7316091292235098,1.245716810266321,1.1223772571324213,0.006827889436579415,0.29150145805920724,1.3703910484989503,1.7452125458470924,0.07770337591495613,1.5075059456763245,0.2393942399354394,1.9816395727854044,1.7509109822562734,1.4216999293863068,0.15257284592303755,0.6115984039959033,1.2028649797470137,1.2514081599229083,0.9285632931721097,0.28684630375322584,0.8632410673378965,1.5292949021779396,0.691376377399616,1.7441835410422581,0.6325753274608696,1.7335558696543898,1.3493205434761766,1.007779825017895,1.9660348750533285,0.2234566839768859,1.7037963199812514,0.35690899285407474,1.0857643095834923,1.7412438419602698,1.027994436740085,1.4931961715592497,1.4936757359835369,1.6296238002962142,0.35035229274041324,1.7175050606739726,1.5092229138708073,0.6575157029530585,0.6514187292230251,1.437780852888928,1.824063775604746,0.8335298373137787,1.674828372949098,0.27546599726609955,1.2100634112773778,0.6007958647487079,1.761194007460451,1.995707814137707,1.3047088778260507,1.764280180594369,0.3685966890934931,1.0564195248653343,1.1302552650857596,1.6547158956760302,0.7242751524803954,0.4593931412134231,1.8647351059410533,0.8670448510467419,1.378086457894267,0.7258851549680831,1.668408186563037,1.9231177165646058,1.3494999145972857,0.045462395779928944,1.3209835445518596,1.0199279598258322,1.8505993319895473,0.03659107593417854,0.42330850850051904,1.2747133903897985,1.0910409055543693,0.13373312703164064,1.9902573156022152,0.5788818526933142,0.4353220574646315,1.181963496563431,1.8418683329857886,1.7658318735134726,1.682192518230634,0.4415338226374983,1.415394336390647,1.906034191631294,1.488717231910118,1.2905105981472387,0.5043465975410775,0.06460015465620339,1.6556985316465487,0.16137572852492044,1.9990836015221363,0.40444855074260744,0.8943522846756711,0.4602971978810255,1.606327243453436,1.6331785372472787,1.4561788012969967,1.9645940093664778,1.2807501097823097,0.7759103137638985,0.14329177006171978,0.8684573324026426,0.9230086731482534,0.7596627637917384,0.49554569242980584,0.5985116674544373,0.21370890990573255,1.9864229759404273,1.34231008325894,0.9666661750155994,1.3792304465763343,1.8229426206078352,1.6380691574289221,1.7377167712949375,0.7086856595714188,1.940019210844126,0.9621357867954146,0.9505774828913616,1.8547112858197639,1.0521924493543668,0.4535619629008676,1.500116927151554,1.5899914129169646,0.5756678857060198,0.48894506107534896,1.034044586875961,1.1119921468239564,1.3451274416235424,0.7571895316311075,0.3451655893263563,1.169197111743121,0.7918965232829671,1.4396912622733997,0.6781026828058252,1.9132936790874968,0.5169846647659568,1.3060619101885984,0.8332039017172619,1.1908962475822205,1.8641475938048861,0.013309827884325998,1.2652441293305983,0.7453727351966095,1.0454661465387676,0.607062429501739,1.7372201157664007,1.5119728790775464,0.4102848980210747,1.1489695372656676,0.35607371853570724,1.3249757207366035,1.757731926386819,0.9880354362338353,1.3418975247320484,1.2384271018414283,1.0627145536737235,0.061162346391983924,1.4490241690477403,0.0908318504776795,0.732800954871418,0.810545394389989,0.8253651107177458,1.6593528032360494,0.87591483361919,0.7051067325628639,0.6490557421428957,0.5192137533433483,0.41815573980748777,1.3758976541620234,0.02571330708672548,1.39429992534175,0.8830959561675185,1.5095619747393,1.6040054053774941,1.7431414855288039,1.9449725314782285,0.44932157161346975,1.2465062565914318,1.8370438283568111,1.1474480267157277,0.7965629553636622,1.7606155275411628,1.3761823666457658,0.8354071428726368,0.386252260518245,0.022321918380313388,1.902818011229166,1.9900691992553616,0.9635532753315519,1.487737541287924,0.9199362360201011,0.9146111270135773,1.4810791312533,1.4135885158979482,0.145020310466617,1.0010716275949196,1.4672644884405948,0.5953774078460001,1.808430361037435,1.7436170962894266,0.9932304631043247,0.10433081481941997,0.9157662471899735,1.979539471348895,0.03194509418725522,0.08850926110579405,1.490473565480007,0.8841853946721177,1.0734544062101365,0.8369128382610884,0.46154848761102274,1.2313733730855323,0.08588678266658611,1.13231814355792,1.5518092967211232,0.46579240649060205,1.8773875465226801,0.34386873567383125,0.7406922442667141,0.6665538546576002,1.5242388525527772,0.9281018315001037,0.8285707786462515,0.44252668945164597,1.027434698458788,0.45032165371568755,1.4875830497398255,1.7902985158457216,1.3165207325074362,0.4315599498435754,0.40644244231364723,1.0871589033994793,0.38222220571550736,0.4306270883664869,1.5876685861003939,0.2630960827621025,1.1187737457047815,0.7902679507285724,1.2459689497288355,1.7454374884340829,1.6547540242663605,1.536104319121359,1.0025040137022585,1.0727445370912836,1.2954009029455409,0.418211359046325,1.7736270494713158,0.06609798996184724,0.4064215601123369,0.5892423979830359,1.998107396008777,1.2531962840605453,0.6359594993559536,0.868057885156682,1.8999880517003551,1.7005651082321784,1.63132776916785,0.9869989949530207,1.4363099490852727,1.2060964354157937,1.765850200796054,1.8185175545020265,1.3503831155284542,1.2803309310111914,0.47103207857913487,1.127713548564374,1.3020286250333122,0.42515988282143,0.537377718377475,1.4478342229536225,0.390250454187024,0.6961390043891567,0.3761564628156506,0.6818627561573916,1.8358366920120464,1.9978957833610838,0.6571044856770643,1.2375286100441665,0.1397388890076665,1.1684011838053099,0.6867594732722582,0.4896276320700643,1.1071086736771178,1.2683610241181893,1.6011029038951317,1.403529877911207,1.917833260677662,0.43384663583537053,1.2320215681013722,1.3088613538073064,1.1983695923558977,0.15110968881468878,1.4485584387382593,1.2889891973498857,0.2568505549807196,0.05222544522039341,0.36915095464891357,1.7055949143841933,1.7887203514349936,0.7092573939538389,1.8217221402025094,1.3690005716733933,1.9329310979599574,1.25893747005235,1.86649836441596,0.8501928300533339,0.574738837244642,0.5391813965511854,1.5706155419370464,0.01823457326588951,1.1067682429590997,0.2025214834551301,0.551741388200484,0.5471544999105182,0.35857152615290744,1.0126741832755042,1.8105077590579937,0.9464528831617467,0.10735512694457139,0.31744989771390486,0.8664657681869072,1.8892612405477593,1.6271145151060198,0.8987686182518861,1.3797850790094395,0.8443020783645698,1.2556584247938445,0.5110656743077384,1.9154445863922263,0.3551661174240275,0.9072621685044209,0.35149420404031595,0.7137926017982879,0.6463501795687696,1.192785214902178,1.8987538899175473,0.27088564885796984,1.3469945004008137,0.07390417160853291,0.758507183994003,0.9299168016120563,1.542988692099553,0.29866303643895886,0.01788964391592973,0.8117761975408451,0.4818852406487295,1.318261051560273,1.1646337282098065,0.6090222229266149,1.2831206303612888,1.0941468396042628,1.1663135727445688,0.4347843343836826,1.690183305111101,0.8909631720563618,1.598408244760516,1.7941819427042036,0.4735653821859933,0.8558689181999495,0.4651489011892269,0.3716734199293681,1.6270100737699993,0.06697594333092338,1.432591348915925,1.948780016257167,1.105769704825716,0.782420132070146,1.2288090077518459,1.9994015530934734,0.8531389793561823,1.687486610107769,1.2374926592635105,1.861952951166395,1.5670445988763957,1.0041361567984932,1.339236407582188,0.9821448987988335,1.6529992603847279,0.15148274278887985,1.6718824085591848,1.8092964608590774,1.564684657979011,0.4325019691464411,1.7641288322721072,0.1035394101498559,1.8602568551693786,1.1560437451198937,1.2766868475611952,0.6988728172526315,1.7719224696974227,0.5695609928869039,0.5907801171032494,1.4517143373958086,0.4148461001128414,1.43136588992693,1.8097134183741237,1.3801692554408866,1.4072898396909501,1.2786936372791962,1.274889247837932,0.32975970037124513,1.6636727780512928,0.3224031525339819,1.8359872574181777,1.2664002519817479,0.2394928803067109,0.3127103995302205,0.19173248469289472,0.7740441151202253,1.692107412455894,1.0071412926563967,0.9141716727430307,0.0706390724050947,0.46603637630718264,0.42805998909288645,1.526143173456315,1.7732781677298148,1.678812646939193,1.7692454575691885,0.10455011819919946,1.121662568754437,0.4799828841743121,1.035332650065952,1.2749565866605224,0.12197016272615357,0.09191554062668716,0.780296951354746,0.1290764645714817,0.44394637141913984,1.4547705411429526,0.018776462432652963,1.9682900442126332,0.7702720823942264,0.017595966096325633,1.973828402101545,1.7697934142846723,0.7970881708361293,1.036772463315112,0.9137094603024742,0.7786716413384727,0.6006362817788653,1.1072718983648544,0.38575270051054833,0.44921287691955314,1.9461158053976026,1.2337536175472041,0.7513414586209475,1.690980755634543,1.0935376641749426,0.5784617487229862,1.714985877032439,1.1737314726058337,1.017563730064556,0.21602794037474826,0.6667512383543697,1.4856117745581923,0.8073096410334726,0.5014469665230266,0.778161786406177,1.7116528132108382,0.5292446608370671,0.8204732906584207,0.0268074239690006,1.2405929782008553,0.7449772000870003,0.07882288379070568,1.565502020388752,0.42884148608730843,0.7072579201722888,1.6986233021132704,0.8363739599777773,1.997283892831561,0.3778978555904282,0.62630389612639,1.7874863765599063,0.3244385492090127,0.09142778668027729,1.948744203218383,1.1375329222824493,1.2731368672947942,0.6934090072698638,0.8570277381797449,1.356428898243779,0.5351129375752093,0.7720216375309863,1.713886436537952,0.06782136474809919,1.1386621233687073,0.32891702409807166,0.7853492759613605,0.47988307951909714,1.2489418343305307,0.3533273275878459,0.6910547171717902,0.12737861627353553,1.985128138831997,1.184967004962998,0.9843447733414799,0.7309692764954616,0.45095479947593375,0.8734837724062414,1.7743067031739748,0.24481332274829892,1.1417824640962762,0.9657788856933225,1.4523865794847701,1.2056496983960412,0.18252569238794525,1.7893617269206965,1.3414598697060307,1.0903098227029178,0.5976495420293126,1.1759020196165904,1.080587686787248,1.7415854310641934,0.20133290780467705,1.121946760495431,0.5304634130940156,1.6535917071681125,0.5141659297831089,0.14402910519261836,1.4369785517028504,1.3376719182598573,1.9809864622295108,0.6241890884700694,0.5868723641524243,0.6042213813057842,0.10209366394802766,1.1451896837952549,1.4054480155687736,0.021423255668908237,0.8300037853197382,1.7599979911226682,1.5566169374039225,0.9676320766999718,1.0080324866154582,0.4871415724251169,0.7675292779539116,1.0676900442122879,1.9293927299402056,1.0005352511103935,0.45840810660264664,1.042611993645603,0.9863041104938497,1.3822326504950535,1.735440028527416,0.2316786935734796,1.5726469383327806,1.8276189339073174,0.6770688717884594,1.0704936682261397,1.3470262744426922,0.6589976079527022,1.915474241263909,1.224079392948593,0.16139507112253293,0.6923198822869208,1.6588543920932803,1.665073439649241,0.05079832654510197,0.33218523317576176,1.0231287838476968,0.656745871799242,0.37224841760649996,0.7486281396919514,1.3028040870872655,1.4865335148569372,1.3860399008668463,1.061984872582861,0.49019053679815405,0.06973867889965168,0.2041289899315828,1.23293625239998,0.5754449465016456,0.4969954785985782,0.722916515794648,1.2841328972344663,0.6766573734359396,0.31906032114548744,1.9847093117561294,1.5552378471566364,1.7666532539448143,0.3343531863549525,1.1703635551337466,1.1598290812844763,1.99378160990425,1.4657738387265469,0.7904510640295421,1.5781775322595282,1.018885348879802,0.4471764383381993,1.5129353245324584,0.25516672781549277,1.96051273476631,1.231745836113383,1.8809118039122588,1.075993075242434,1.985974574396728,1.2812404533671162,0.6253813961360071,0.12273410003401386,0.1324626759165657,0.923106277656081,1.7648328823721426,1.6701453513466782,1.0265646333622471,0.9835759830772663,1.055029987313989,0.4353628262497744,0.6147253370506047,1.4183887379122564,1.7140478589250026,1.8827639762243158,0.9440204911918695,1.9274469765833895,1.4638839899404985,0.3205356482548667,0.3297862611550264,1.3657498061541027,0.1613712061789192,0.07179475044632033,1.480085557731897,1.5246473965383105,1.9299088631945942,0.723595099067285,1.9510276320396516,1.1584946225094184,1.1078038101160943,0.9407887835160027,1.7283306371051106,1.525538997739008,0.8456594120845216,1.4188662027861434,0.22478229060788602,0.40515048950299537,1.3368189067692358,1.4043303126739075,0.28048117906132175,0.8604276364667895,1.2382103130902173,1.411585519199928,0.9206762227441159,1.0301100225300384,0.23638568444695984,0.5040383768596204,0.029560888180252487,0.47214005236236467,1.074511555314127,0.2132280893710501,1.3636997177301158,1.9294871621238197,1.9638139189358395,1.7754970457096082,0.6813280633784147,1.6385177061408176,1.2556203041170253,0.3417504498632673,1.5895214674216782,0.13949033269799083,1.6637456348515842,1.4462492481767182,0.4535585407207692,0.18908960967866406,1.9591685774548453,1.5855261447285387,1.9145919194997636,0.061309331686778545,1.884720994396174,1.6833246550698306,1.156948317433904,0.6918744301774575,0.8421023742367795,1.1245573260478445,1.1112926435365096,0.6421674380909628,0.16554742987313187,0.6724444923596815,1.0284447414320388,0.009822975976497617,1.1578368523967142,0.9751528268468208,1.7474346834492822,0.6849316585460281,1.4700316601575119,0.6870091733364689,0.9447163046839995,1.3867480297540067,0.8693334083020843,1.9558560963562992,1.4553144296450218,1.355923810679346,0.7664252430914433,1.6124238332130565,0.00015496167983863884,1.128888849029754,0.8245441294370237,1.4949055758657002,1.9339399358508809,0.38457293615820065,1.9788436073038271,1.5897496411136243,1.7386781389952235,1.769027275056521,0.7202015117840168,1.5742020299064854,0.8005901165273177,0.7750481830708926,1.3077518119315825,1.2055213656041084,1.7971548389919785,1.1219590839799976,0.8141504568257014,0.43639696754886437,1.3476969749328065,1.8538016457846989,1.5412670292407973,0.9102001475038239,0.2377750180952818,0.0018954793970746842,1.0451950687989342,1.2606893378147364,1.780288028142818,1.0522684326619376,0.9596363294500301,1.701106595576341,1.7771398122801494,0.4176075612440977,1.9602158239675251,0.40293537051636363,0.9979909716869431,0.6776993405629788,0.3146228913889546,1.138200045207863,1.918004713113055,0.3765721349145883,0.9057919009806343,0.1698228337159713,0.8107812459690589,0.54789027510959,0.738682300789673,1.7598672033476501,0.0672574294841195,0.9256235940298989,1.3682505135459437,1.6935111064023776,0.39911285572749655,0.135880587330806,0.8300726479862739,0.4670511378014255,1.6854039537797387,1.7740635420323745,0.2561081630769859,1.6201121076973877,0.7309111181102139,0.9749475860815546,0.4109460024380156,1.9673846018051329,1.188639801223128,1.9011804091309208,1.0630077119598056,0.03078995729192613,1.5233781123123613,1.5635858771463642,0.060649333683720386,0.5329828354625761,1.2869823034544132,1.956856133668174,0.6026427703194055,1.1345675857107151,1.8320974597854534,1.8756093533984095,0.5980464042245432,1.036314520229304,0.6688905894749313,1.8045612375789126,1.5217440803885558,1.8715719765361287,1.567116330046121,0.8876885354512352,0.29883847418208154,1.2063329131542777,0.817412740867475,0.4531639922505253,0.49426574537531076,1.5261847277408047,0.1703751422954789,0.6439174944131336,1.9074861314872802,1.4171202497060382,1.1174776178265562,0.2578591086772679,1.116826741893437,0.02960598707734885,0.035498580666341706,1.687873580676011,1.8202545757314237,1.299703534770746,0.45603208288581243,0.5708770443451585,0.13841448874704465,0.8867827607730345,1.5872984223509339,0.7523910907760283,1.526260397444274,0.2507353367866223,0.7021082307975091,0.7505867664360641,1.771306217074419,1.1756170490377666,0.7898735471992864,1.1016832224330844,1.468733847833569,0.8229567461325185,1.7566139850624936,0.626242112820274,0.24653109259445394,0.5394182791002988,0.49317409354636954,0.6409889174650156,1.1320636294528126,0.951666002142904,0.39303094031088914,0.6657442531712916,0.29361339007360465,0.6057877463410288,1.2816206695186723,0.14946238400534995,0.3896258312615135,1.987767908833666,1.7873923839111288,0.7936582383285637,1.5351061991882329,1.5242855831314523,1.54934082217433,1.6720127184408304,0.310509038103306,1.4964026983740486,0.22243677979980747,0.45159695177228576,0.8202009090275557,1.9578435375799454,0.9673135506531154,1.0362016843536725,0.23627437150617014,1.9699474471668776,1.8732877756842394,0.5354590427293422,1.2039071520894211,0.986149444561788,1.2776629854142882,0.864633396107473,1.944708922650611,1.2930830238747433,0.6484041206208304,0.7891643978544796,1.984638316232275,0.8971785382074784,0.3356063715376587,0.15159713678095432,0.023906306703354918,0.21496034524112417,1.923144641142735,1.3888896551749288,0.16745545358627023,1.8511468239244486,1.7365540044521484,1.0812714576580205,0.1345383570014791,0.4501056614861283,1.5212095171956652,0.7831170791920616,1.7108405990538613,0.6258124400876532,1.893539389562632,0.51847206327886,1.0936142275752032,1.1198773848009567,0.81762261218651,0.5083616244801514,1.337205391821664,0.5351811609247692,0.9052990498479789,0.9151646884076987,0.5082063017524017,0.8834531696667813,0.31987718581038926,1.7798766553345593,1.11243659620507,1.5429001317249407,1.6920695713657077,1.248246213296584,1.275236439438796,0.16855017968297847,0.1476307918475661,0.6255429036213744,0.7280991526488436,1.02980297662045,0.5428878859084465,0.22929386439632937,0.6915416796928224,1.1688015173253716,0.49603401253343105,0.4873529533115568,1.374536901403078,1.7761234202728033,0.15035057546059738,0.6686454735108058,0.7932355304111551,1.757663543415791,0.6787524267524043,0.7823044773513503,1.6623337017858582],"gamma":[24.20732924353374,26.837721127748516,13.593318390896393,27.564206250366297,49.26974886102943,38.43835759932354,19.003998950535884,45.066564605491024,29.299826412205,38.51209276812057,43.65908337655211,21.18317242607891,15.655630691671806,0.13967602358068154,0.04515985851115678,4.025549988543908,29.009529633780495,26.64378163406861,25.65207396437259,42.591607384829175,41.75522497395852,29.884763157036033,2.429211186599678,33.53128919604747,28.427316160510884,20.387966889105424,28.91164602104198,17.081373119641285,18.631227772793068,4.959048700025647,14.598040234034448,4.937850499174667,28.510337946584595,17.90888390900266,28.49736769652579,5.441251813502602,11.036536419094212,0.9072668030199793,46.472125195698986,46.24602614455575,44.28197858223222,22.04503688992656,21.103809476356727,31.013552887690278,7.371078294589628,9.048973997337406,20.988524087226736,29.569596066702463,44.15278836117258,4.496373476855842,25.2968036274954,14.953252119833083,25.969574183234357,6.699651694217135,33.49939839403744,27.529949644734884,12.169022057880019,44.103082960863205,49.80167695403698,21.824493830339076,40.47606134151774,47.492361262496594,13.443506868155207,15.235996699452325,48.45242481036216,44.89236270271763,27.698642599528057,10.135694227237057,22.64587996028029,49.14577356319606,24.985613459215628,28.42344861050933,35.96276490548641,14.859457447872638,48.783350326903374,28.62529816742291,12.918859929147153,11.459085734107655,30.600118489224183,18.72737327227787,43.08329335403792,38.7693363464387,42.77834808011172,33.388652117706044,22.873208650795995,11.390339789085079,8.214843973659125,44.695810461454386,9.991258822524829,9.266009249672358,31.21615752626452,18.340777965641664,24.01560081782481,23.940528496727065,25.211783699400513,15.811065295418846,4.516220861608245,2.922980119601115,44.67902481957054,22.613145774372523,4.460749485688897,33.967115679933954,20.539350102592557,12.91803855464001,32.35899655759674,40.33351283071083,1.7296877606489236,14.855705300192145,13.366043642957248,45.852971466311445,0.586589606079746,48.66436367064425,24.93075188440833,1.3484758771269423,3.068174110751687,40.122058852140505,5.623761730463162,44.22548113839725,29.984019449283817,21.892495399456713,25.068604834804674,36.96588711339398,36.36151743897788,25.027254091859476,23.45128441350918,47.8799815543441,43.22837022855231,12.82851638375444,31.3251584029279,44.342592491909095,27.490799441439627,1.380146756699241,10.322254764375682,8.370510376598862,7.543085782905412,8.760378915893707,10.313641939012353,39.5544284084125,7.924947650682079,1.6568657647568208,25.403888060166203,9.838230136483904,0.42395904611529645,36.85498874641322,42.27569816494336,38.94824113605551,3.27547825318637,8.515000867294908,11.020422327083978,41.35989204525801,16.053625704343823,37.87221309685095,36.037088302044715,13.08465315566647,47.45082531197974,21.375742697913736,38.553622873098035,30.023583826147394,35.07578271266997,22.260673186675106,15.440155284962632,28.28102931788741,40.651025021764795,5.251495029581665,11.395175213667441,16.002035332580068,42.89388204062667,14.295914947477906,28.860617169838708,13.171926886977358,39.538882551514966,2.416246319100257,47.41155816504497,20.95498449849741,42.82153490720483,16.81332974481551,5.810198866119087,2.6823872128767023,28.637854619779933,8.805915234060002,39.60206219486675,23.935992089921086,5.243210954980404,29.329901167160966,21.136328286261772,30.7768189639944,10.123511724902068,14.687380848857801,28.91713435504828,30.068202678998613,27.847185556463117,12.790201264288259,45.248357745644086,19.13016098350122,14.91336482649852,41.60942234189785,41.221592250340336,11.769503561870298,43.03075741956028,18.59317842854915,37.73788018964711,12.010185491932202,32.74101733194139,26.921156888516904,36.32096097799851,5.818289968206869,26.640622460503206,19.887650743962304,42.673715501802434,43.769798666458584,19.10857852841059,36.09418010349019,43.06368330468347,38.12889679354166,19.580818658509138,22.642406125119553,17.20105754734843,48.483590627173925,21.731856177263474,47.69634958143227,38.220133603216574,2.727611592872281,6.742740763032373,32.078804617795285,1.5445392348868214,47.70206138909114,46.009544363791846,12.062177198499203,18.6533099436881,7.13201472876186,0.2601324568928143,34.6067649552396,20.618009461814424,27.780592564348172,2.028773452288679,10.644820007736222,30.827165882512976,27.334257708332043,11.339798838896996,10.338571032036747,43.32968420965122,16.2917879667286,21.882580044777445,45.67829203232153,27.82397888035422,42.48419913733327,4.011791808184584,46.89363444799983,45.644610846645215,6.958707665951458,8.819558853380283,25.84098475611969,34.07420705819776,0.4586444030807435,7.3250018389694915,44.00144422646983,0.8068602679457637,47.42462142003333,12.012851841191353,5.911784534050724,37.916210487165934,26.67766410209673,1.7188704189321724,2.8894493743216065,21.544562020695757,7.714500558463366,41.43537068331109,1.8591140131751782,25.380634187150697,0.8955964328569266,42.34792736491245,20.990499231744188,22.18838847134892,40.88732714797659,32.673679087166065,30.17383913588214,40.780064264328644,13.51625559566032,14.469550278606302,18.19050051371507,36.114721980320475,13.077914086868347,5.136931985323489,41.14790658145544,30.50449335043891,3.4763533613919373,0.6593776950873487,18.96527270191861,34.93609697089811,16.676282180270118,11.060773097488475,41.653615647448184,43.03855434295107,5.298358599589803,13.69546241987598,0.1901958241439683,45.590791100908426,18.108580588923395,46.89318977461176,19.57883231972439,48.28146056992163,43.792972685124866,44.338099059068966,49.60843547879198,29.795919425222984,21.4765784743536,4.29629559568866,24.298386031704467,47.27195617133436,45.648836414239504,13.140417712732521,36.84006214805188,31.689838199950803,34.1766058710214,29.08925603511464,29.885269802561254,15.523477347303217,21.46081226457426,8.596967679638057,17.629753436185947,8.109425337340358,15.626706245576806,40.61996646440855,42.10729073338564,39.02215473132449,42.817640941511705,33.24334548553103,43.09715399299758,47.46254892067141,1.8112998006392766,1.1636681800325621,33.98271808841351,26.50247725882767,31.931959524885723,18.285170546910877,8.49889358438073,17.00735236145071,24.349299577875815,1.4633821611580666,32.51347877750086,12.76824845654778,48.024643781305635,48.337859594271535,5.495277494099193,11.802346094886351,33.0217051211094,15.255615160544567,28.19989603352495,39.59433931500006,43.27272413493897,7.28892283569933,43.4178194830267,2.232423833003472,42.89476322925132,36.41463519942084,0.03250862432708779,31.236897019718292,39.27884044946042,2.123241236526807,18.817029994989454,6.044093881618373,44.71670868121262,43.53491431661348,35.94970490503266,36.529735831504716,1.331686441358504,30.091123238763227,1.5571452795445695,34.5324623009056,21.892916823332165,8.215480581765854,44.24028148820324,15.853168346085521,6.4083423698051645,35.73467448171481,42.9155329262103,29.209732119159504,39.09927433656767,26.713346032558572,48.80806735852812,4.781434148299657,35.08076234699852,37.92195741337983,20.450746940208752,30.348510279633523,31.701180129659857,23.777302350090334,40.2777454088053,18.863888189592615,33.12743016110111,5.261540655694919,13.041489879835567,36.58727967452193,31.64156046522254,9.447582562456446,25.961900654867954,48.02116851211869,23.316898612913807,22.2760576560464,26.139515992820538,32.24250732532177,4.945195416008064,32.92829390598151,32.35554656994572,17.242635693801176,22.802577358502564,28.090753031702597,7.038650308924977,41.603966216238256,42.1477280598078,9.841759869000931,48.4332311161048,32.00776082941913,28.916964281839164,32.303505366188844,36.40809126157104,29.122233267058505,4.145369118797404,29.10695259834548,34.23369846854587,41.32920690622218,33.11090381726308,2.338950070887913,11.839499839759238,21.697484423176594,16.86841740345789,11.264659572434887,13.885089104412918,10.422647531307206,30.247133489770718,8.767788652957853,38.815821355133984,11.444579968730672,31.851497322737053,27.15858813363252,23.78311682321108,13.097261278469263,2.8797392074888073,1.7738737113548786,15.809812841909887,22.987919471828768,11.9042855982342,27.46806365422555,24.108053284040466,15.500766467432637,5.550435612591997,17.98557075315168,40.60866744939734,15.161061373764461,32.94221507998836,13.131050176608195,24.730572616309775,22.543848454033167,13.083462809633794,15.801814446457673,26.45727988948491,2.7337269935697517,29.13458938197945,27.195586663548234,31.37134249362742,36.69100049496018,12.354023416554295,5.2840050070163125,15.145450703403373,23.838984444199795,7.335862114708425,7.708939364241985,28.204972767113155,1.6642186815188698,24.12322836980938,9.966234005880438,12.529419736535363,45.55382670111664,4.250968759301932,11.857204840000058,3.4659531857471393,43.271653118365094,0.8395710107983789,3.5852802782791238,35.062337090381405,40.753084194841364,42.768476176625306,47.18596659088511,31.191234252591503,33.38690551861728,25.713954139762464,41.96875098732673,32.51183357001616,24.937645296882682,41.64489156202319,39.53774122861597,20.84250034638293,46.9485668078121,45.980336437942015,29.283107958345678,37.79427283884061,41.83307038176416,41.51149571181112,5.354729245528977,7.387602302781005,47.81133628308435,20.31298294498729,0.17470159621152392,34.65174307897308,38.810987582798475,4.659396814118821,6.747762716162797,35.03226908670698,24.396861992299712,16.56320248152552,27.016890624321,17.722571807246446,41.47279388569408,29.69475118931445,1.1311470171269988,37.76146192558383,3.8561566109273193,22.237874296444527,2.3648978054010117,10.80028274888245,6.703452446210778,21.513598039286286,43.07167803902119,26.14218793280306,44.05709799092663,26.756466015666767,37.772025224855334,3.784790866498988,29.52537098080278,20.194020961665306,17.829295299342686,15.241861341982377,33.2048847873331,26.000073034753846,2.496178303467478,22.94692478989988,17.385595040739922,11.564612023778464,33.77515537102368,44.64370442009823,7.777485051210176,3.4273480786434884,30.906217357421184,9.38618987820189,0.1953918190006232,48.023427420620926,37.249765634883246,35.91887233623863,10.346033806932331,35.48985197075434,22.433327186338957,20.412549979488183,23.95945492224022,44.57852019064782,32.09934760146081,42.85950200194417,46.02950700565448,12.209571185822988,44.5604288843144,42.55415768177333,29.730746474176193,45.96508358476812,30.151877476912325,3.99604395754255,47.148120910764,49.46482905844631,26.58079690468682,26.571722323819667,35.885572631075,39.16081894460566,15.601213361159283,49.03125836636701,6.950435723392112,43.57775826196224,11.415743671858081,42.65661384283811,30.693507390653174,14.843370602164562,40.99189980490894,5.8179319925939605,15.946036534638196,29.42120454706385,23.355239358658963,35.598720475355336,32.779913018044674,30.831629587986853,45.00701365081166,32.80485870701102,26.373114191977432,48.110784831951015,23.547625876602496,26.20463948037002,43.24377299726404,13.53517250610744,36.71732380074653,13.312788508015661,4.550202029372674,20.632739117919396,38.06998337521305,28.983983735623863,7.652038204858447,25.931897428343586,43.91870204362866,42.95873663513152,19.00176864006353,48.95630755379686,45.75370000643607,45.87367988671447,18.918500322059817,11.565228676262585,16.88174261937634,3.612510413578285,33.67131522305794,30.963757473103183,22.54028522042233,29.09175709065449,39.81621755714796,27.421382208175572,48.21383177965621,37.8960118832518,38.691983386834835,19.69159263138294,20.225355852856662,20.381528516376125,34.48399644147947,44.38356178631412,16.22452166393602,21.667593289957388,40.861093733620734,1.2958921700814474,34.08695560369729,0.7893141196241182,3.3839509109590327,49.90152193179801,36.09009100833608,32.35698448725611,20.514428798186536,49.98878719575277,34.35121442436832,26.180260642900134,44.31839466826133,36.47709750811742,40.66322329713849,17.228521726720402,17.895080631131975,10.774383015573752,43.496765207279175,10.837486969887244,32.296618883435514,43.84713407022921,11.533371414680616,45.18976152608879,49.66060157403787,42.40631954775373,15.643665927692762,39.04264493108073,7.590172096856529,6.772165025209132,33.89534807211757,19.8128718988147,7.027526286991503,28.713882564688554,14.957492808046624,41.50154801100017,41.15348028453399,11.320886454120327,35.31510549483489,30.67018788395336,42.70686129280031,26.522246309248555,35.99360439699073,37.55908144067824,27.93009441704999,42.99386746829305,1.1584182526779618,21.83721581109982,47.261900374611365,9.346412610038557,37.214041701031306,31.6348952743013,5.124125488491071,27.54501869798488,19.84886187150561,15.103378967692327,38.36675579466202,6.9493872794348155,14.044661821361771,7.1799146898489985,36.67456302934045,38.285334790739014,4.297878374599618,4.580391193242972,8.3199148628056,22.76336867595784,41.12304557029687,25.876014349587017,49.68795554505814,13.152360030490795,45.48809803616919,49.279021746494855,21.84741757928731,1.4394079966758677,4.549011759126886,42.26438476301726,29.068850429571903,6.086519235894061,32.72412554792955,12.112589667484508,45.83681988895694,32.368230852046445,19.979524310509277,37.226381765460545,14.95703755379979,42.60945974132532,5.705024164459371,11.45820107640947,28.46034692588717,31.768293524753155,39.327302798869276,28.153502133951523,14.194244337082418,19.9845101436097,9.119124370133125,5.004032070619413,7.03980539016883,20.256515016994182,38.5080155472738,29.63305383416589,44.41219853329849,34.505581932100284,20.233023108497484,47.185242395683034,19.370752655017764,38.64873560377076,34.05477476199916,36.41434120413639,45.36723611010546,33.62496531333983,5.399838821112713,1.3192405945505192,3.010544981970309,35.1561970453789,4.836762622556179,45.47101317182256,41.15108809249087,33.27625472452902,3.5479013071179732,2.1512593476475828,35.787821016718325,37.41958705790902,1.7958398158137712,14.27575951783111,25.457626157233914,35.64043067340263,32.39769903750721,10.226382161569369,14.71725318321454,45.715846707730776,3.8150298108618363,46.72254106570218,16.21108706958755,45.28372138696031,47.035172590211026,38.28955616899001,42.38991088097536,13.221161524467007,46.65018760866989,4.60417795149104,38.47171913263867,13.921956225670806,46.80725667846488,2.4071072308396446,22.73556448844222,3.4019914711008292,40.62935695098676,14.546130170272276,48.241184306064675,36.77238661400094,44.13810147782555,22.812211310700402,13.678696856346594,26.28136846551612,23.6428214672319,31.46245098723952,33.7303472753628,19.17600615636834,34.60680273253415,30.177266068368812,18.844304931900947,9.215769551320818,41.92838587937685,26.3319164368758,4.249262789114616,5.631959405631659,36.70496716505711,27.277941921747527,22.36007175166219,9.861760045537004,20.90335743992896,42.28808300303215,40.33261551919715,22.62506576823533,11.18190981166498,41.4314200963773,5.625784780884269,6.166179009570627,29.280881150162585,38.17226454612045,37.96118207414764,5.426790827222661,1.0538961529897084,49.48810551158098,29.037671644164476,23.825406638357236,34.45675088006571,28.50634056508261,47.375040565354674,33.16315117027607,9.253782541502598,17.6092409363073,40.37989804421659,30.670657986958073,0.021189800861431962,34.78393512017192,4.442050080662252,7.640033720075623,33.85940661453485,40.964475500819994,11.517463704178343,29.653991191182428,28.786449491559583,40.51528034992289,20.909568546492697,9.022410103311485,1.4829946720249398,43.731845639778776,2.3546164968201166,25.940931784149722,14.71971145845059,41.29781741981123,16.394396888994965,11.128629956373103,44.54668408301122,36.8173480026111,30.166951584498925,22.556313684538644,36.82874669124752,13.592537258655902,46.37311583349779,49.232742417253114,35.17138762045279,12.882721681047226,44.26504855703698,26.84882206196243,48.71003967431812,4.717684105504594,35.5740605438769,23.058681695057548,9.0885700587924,20.94319657476129,18.62170489280239,2.982036381209774,22.84052741617508,35.514125977356194,24.555420366294655,5.352008860169654,33.997524540744806,7.475648186484207,6.660644299784724,7.9505473589223,38.56576994450263,5.509409928748865,2.2915500320987103,48.23247520446644,6.311177678340185,19.54193612300269,34.66515423737779,0.646791731511942,12.27197983922137,43.3995889339471,10.195920527963253,19.291172014049586,47.40663730740297,18.62768482113345,37.31051168607984,47.76609051546379,2.545955166989944,27.48602270706979,31.93872198113449,9.28165464617342,25.355260983169526,9.32724336168227,30.997524202809124,26.16722419094052,45.51384688315837,44.217926478738235,14.576221293985414,30.464333600400472,11.754305066084447,6.937013351204879,42.699472968316634,24.189200344578843,48.096579419367835,32.776730121064546,0.4132801631627214,30.48588924218847,42.751769778330384,15.410367936866331,19.15313085398941,24.9170390614036,33.397771311951686,39.213024201104886,40.395256203094974,44.341059125185076,10.98123135257948,41.53937572418576,4.823181654563458,12.559703558720836,19.26184808324901,43.226525150381,27.175745367486336,14.474231451827247,24.90293572305132,35.99714087767587,23.301009675060193,10.365491203317912,24.500545293250664,46.4451965968325,27.904426592931586,24.444063556105135,33.68472815100605,40.34970827020339,30.604790303122055,7.615867614554894,44.17212433438299,44.741048975290965,43.148546874082896,16.384649259929763,23.575987161698407,45.57825771103805,29.1345287393578,46.88023701949885,18.39314412027271,17.049371636899824,14.937867420218598,6.681033313693618,4.904071430029521,36.056740064165815,4.554209590135816,39.44803397339616,42.982412895212875,15.091346873122957,31.84534177343852,19.91942946509636,10.073330014575266,44.03615351624756,21.381356581616284,39.88711816918619,20.86648129278731,42.07018353234398,38.10164325141396,32.38717430685541,43.95472546452578,18.269133697794683,43.926742885451006,27.235392921343394,36.78038093587206,47.618627995145836,8.559663848670818,30.30702325932111,12.935074428073634,48.689090222454034,7.445659672858884,12.194851001355268,43.32061712660635,27.514311966998406,27.569848504053006,42.39073871682283,21.21282846545769,15.14602995471741,1.531366381913668,38.47576472015516,7.424018172818059,8.884451640066516,1.5213994367224148,24.46082852717496,33.18230987497394,5.039250538461437,6.22225322227794,1.339327455264605,29.802339773733678,5.66523421822377,19.209198756148627,27.279052794933946,32.89835158857345,4.172314462471838,38.674359597612984,31.369202809591933,31.323937620293297,48.24457553398063]}

},{}],85:[function(require,module,exports){
module.exports={"expected":[0.04208400168383303,0.007702450954195306,0.0013374914287073159,0.02144659688981132,0.031034605892636125,0.000517615942864813,0.018948129203277098,0.00856807475109922,0.009626103492325344,0.04400517435242929,0.04510615997262685,0.03723689901632171,0.06231450816290657,0.038149485415248596,0.02270839616294701,0.049639170174308744,0.05213408388559687,0.022330197726325718,0.055587868818739505,0.0037832928053211923,0.0006738502472275476,0.021030043506313933,0.06008425691143354,0.024872273578404547,0.01444617425446626,0.0173415555268005,0.030831940303766014,0.03240695609718369,0.026650245188893695,0.012408454182428807,0.005176457882190455,0.02150702873485477,0.031058161426922526,0.019231203593905455,0.0006964333945064793,0.010736090477230786,0.02934470446045695,0.028515559494317444,0.06762722184332981,0.03011889471379925,0.01716503859823898,0.07429574327281252,0.017436138524493938,0.01675660037854343,0.011675142633997437,0.028156501662881306,0.06419319350872854,0.01875367042480086,0.00532913742276947,0.02446293931652027,0.035270214109859366,0.03796303059267203,0.003258031707183251,0.02002932110635075,0.054718194452971936,0.04942928246376965,0.007798282110215271,0.03846388091635916,0.009468875865208282,0.0073872831954408524,0.003630820005883384,0.0015825040215418085,0.03352656924287217,0.005046719327292837,0.01498967211015495,0.023982305964198647,0.028561879792074252,0.004767692059710671,0.015005028035954548,0.038193552256031715,0.04492257529553012,0.011669591211016128,0.018598552610362418,0.042388543074976415,0.04909986963255136,0.05227236596250673,0.05479824510355846,0.04031927109110406,0.013099805650653051,0.008565312390416524,0.03322877692593845,0.030629879456482156,0.014210638270007125,0.018057295658523875,0.017506412588132236,0.00036741843183268896,0.0332876600941322,0.015415640342331838,0.0015118350415120885,0.004357785102072742,0.08186859533801072,0.04040574520325124,0.06046937046133749,0.019486599612499655,0.03456210331742726,0.04064518055183142,0.0206592621302088,0.03706051249969594,0.013637616233682981,0.0028680937970135822,0.03306715470514632,0.003923005616835562,0.07305772091683815,0.035300209237861646,0.006084174639203022,0.03501950494987133,0.03128573930344153,0.03258953255164598,0.0692938327075851,0.043550973779989344,0.037110920370320155,0.025133392873206206,0.03922244298685684,0.008801530342505304,0.023955182611423098,0.029681126014440173,0.01967819843898616,0.006713762469508888,0.023474904366264704,0.04801447201929909,0.014812379676576115,0.00575281033561903,0.013908859647159877,0.047992813262874745,0.021184066498158516,0.019721909746504396,0.026607768730450787,0.02898534762075483,0.0076970004760097965,0.00700583420530676,0.027704315999339535,0.024900525061635315,0.028204972952017793,0.0375749283288031,0.04313221568509129,0.01748151154835348,0.03843408788774827,0.07510948753341673,0.02711447907536013,0.04888629904061803,0.006338533596548346,0.02215685293406644,0.010483285873596704,0.030780593510170817,0.008474417324771777,0.045863613992652486,0.05302294946849173,0.010551897099461138,0.03325114753334879,0.08227302257180968,0.007362004761684027,0.014950489020406299,0.011015570146560683,0.002972313133623561,0.021450496394540886,0.0194547046621521,0.030008094159638732,0.08471879955629152,0.037511588088782744,0.029939964529088092,0.009766823346678777,0.0646654334169442,0.03310906862006946,0.0110460422912797,0.028366859734448746,0.040700131974897025,0.025864261586747206,0.03429234685539401,0.014324940052382107,0.07163797963813939,0.002252478024294069,0.07015267686296589,0.037367684447305705,0.02146690605466539,0.0238192940407011,0.00584356323084162,0.016959109575301834,0.0020842813626268386,0.022126850509829432,0.038823970411261954,0.04134773210734205,0.016555851103862984,0.048295179872421656,0.03216338013575293,0.03476491231578149,0.05535902877817922,0.0053055814598496065,0.021207335070767164,0.0248740778139101,0.03708301511779949,0.05247485598653734,0.013829144085320322,0.03610271777242974,0.027911277909843324,0.03634248928782108,0.020138070482759562,0.00012171277893924248,0.003098704597999047,0.05682449250441596,0.03531778367382726,0.010641861350020099,0.00704980912668024,0.021717324839336583,0.002136019813456791,0.034054317780796095,0.036847891600270466,0.011032014633530651,0.00948238175191074,0.0352079150362653,0.06648821677389527,0.014206066480617896,0.041994869902638454,0.021648553339736032,0.006768562404070311,0.000652306214526277,0.04245660586118416,0.03417699490659809,0.02571772158754332,0.04416179537785975,0.04753744924188963,0.021713730037247914,0.08620883194443618,0.030958019317938013,0.0004905733215280761,0.0251882031431942,0.06869328664980578,0.034838586510586855,0.04302204015247413,0.009122152946428153,0.004170208636223416,0.015549673696127142,0.005696591907278725,0.03381748754889369,0.00606379173709598,0.015828484542374177,0.05403065766038134,0.04085971168510727,0.01438755931190977,0.02224035163171617,0.011862987409602455,0.01932029019417275,0.05727954264241908,0.04014373995479914,0.011268906842441473,0.03718749500325197,0.03082367457459717,0.024157544516161034,0.0528538781153593,0.012405836117501845,0.05069903897242822,0.03513350613748567,0.025803399792526216,0.002869525884190316,0.04079353674143954,0.02321085476481005,0.014058931867525826,0.028251733714732163,0.04129849095151594,0.02682276023171376,0.003933163897131164,0.006401108776919018,0.019481794937445396,0.008307019136212679,0.06329507534484341,0.034715982720518845,0.014995088282265145,0.010557963834856743,0.01333610518454309,0.041459721276054684,0.03512119452218765,0.04575456903464081,0.042034010015751355,0.04210940578953293,0.02167832505592454,0.061246606545095894,0.028404705883092796,0.029352596524801544,0.01945684759800831,0.019038374684838544,0.0229741031492095,0.00935521758993918,0.04600387617693852,0.030399636814881115,0.02240078599180756,0.034205069793960985,0.03415892837665707,0.02317143691517798,0.019225655260378227,0.0472801918082103,0.031810216150306325,0.034792090488988736,0.02752641500059394,0.005582695050611264,0.045949859157436324,0.05009256929054684,0.04279916065116768,0.04623082886859253,0.030905371463850584,0.039474252470039606,0.04176523566362045,0.04510187077539901,0.02393715662958995,0.027070415206726317,0.0034013418701545617,0.04536986767167683,0.02150962940474821,0.006510585337197505,0.009735542065471336,0.04398721635355324,0.06194542305449152,0.029424145841142557,0.04525921561910645,0.020885106329498637,0.020911364764786555,0.01286734294002434,0.00045066976506180634,0.033841456185455976,0.03719884988140021,0.02921910187622745,0.04274994094788037,0.0198235833305756,0.05743360444564566,0.025034657969808027,0.07087125554869145,0.025073623828734237,0.008569789998212451,0.013377016400039299,0.03131091187148122,0.050967468129861526,0.01654289758253913,0.029202238931469948,0.022310558338624886,0.014216865659722133,0.01048023654263941,0.028067884696700185,0.04023616887691894,0.016812624535746723,0.031972867276590156,0.01811238249981789,0.021044051455390345,0.01768826007414681,0.0326385975570373,0.058166943150293804,0.030157978698041488,0.022966982593846774,0.03480076199039017,0.06726569003676469,0.020777370090375558,0.06606238124857466,0.04503481090964634,0.040874909386460545,0.05024443102654963,0.046475365348348396,0.03625863123575662,0.026588862833611726,0.012842667493892512,0.01953138822176681,0.03838298733976264,0.015378964033663067,0.028357555370874088,0.028037138877994083,0.03714490109811347,0.03207127301018692,0.008708374890444293,0.0026554173472959075,0.005511259839323324,0.025326682072435547,0.035835973754297035,0.0257313849029282,0.003254259160752948,0.007427009608581503,0.010812425506040724,0.0022167019614079964,0.0013442504191548132,0.0395294117815036,0.012653989963322898,0.004925206229890788,0.027274876193947972,0.05009275117706091,0.0012744562598021592,0.010791292964263732,0.016653330340628547,0.08297972993934455,0.05075660301146068,0.01345110065942734,0.0028422584270869633,0.04963614415012485,0.013404930222876144,0.02034951719985878,0.008380838275277191,0.015003466759141215,0.017265782405642194,0.013658778246534109,0.01705998573492773,0.0007394941336440475,0.06054744912261811,0.04139864535499699,0.049772426375324474,0.01461708232522313,0.043901524413213544,0.024768249024482658,0.039878395601815664,0.037808842061973935,0.022058011966408553,0.008959304862138251,0.019505813754794488,0.0220017196506469,0.001462751001257978,0.026314253629826423,0.00035692287799987676,0.011686103174988416,0.014790243962019334,0.020058150558920462,0.016241876215664197,0.04045999682279117,0.010282188766410572,0.04758145487559967,0.011023964623148252,0.013130435468574009,0.034847567760788845,0.039239864488676446,0.035348354994320264,0.005907990166484134,0.04094562951433117,0.023461840851630056,0.028828742780038552,0.03365805114126036,0.03934938890909889,0.026303953871736785,0.03205833756883836,0.020031580094600543,0.046885822422570944,0.024362279218493488,0.03807888863406278,0.02677071060048175,0.03169203375617735,0.056370737136169025,0.03187125921966827,0.03286385125906621,0.03719491592729113,0.037452641676946175,0.048020970480755765,0.03601812381205671,0.03303990626870018,0.011597348535616891,0.022696328871612548,0.028579649539515306,0.008378175096797946,0.01133203412046141,0.0249164620912925,0.020757790042022217,0.049872596198732744,0.02850588006914312,0.06873259637966128,0.0778695801179648,0.020763388053622378,0.038728882650874874,0.03194446324716127,0.01492330567872635,0.021181453493414992,0.021901496853691083,0.02581504140427343,0.054945854863767074,0.03032583637607844,0.011202163509281993,0.005494713571020937,0.024949218800508266,0.0030101056502979118,0.004365848883442491,0.011489445968303647,0.045033854309349364,0.005496849282597693,0.02570692948787162,0.04418780409348522,0.028885963654277924,0.005034317461305393,0.025769676714727963,0.009186593200406878,0.04049216991052795,0.026550900374039232,0.05956820515233252,0.061116294600785936,0.020807495825068245,0.0877174493333217,0.003979710948715909,0.03720889493703555,0.028996007755949238,0.011575045300122766,0.04004693512929852,0.03339658507473764,0.02102548768912288,0.035833623985781826,0.01289680053785236,0.04565396766311042,0.033210010222591124,0.011890355008535858,0.010133833534059888,0.043572566963367254,0.016981102607171727,0.05326835624894266,0.03797108666300386,0.015490146069003063,0.013638279126499675,0.00600242149990976,0.0006798903653588151,0.014338398974393707,0.028942148344024865,0.0077331161226594225,0.004364023620258228,0.011397395110463171,0.0057201312504314705,0.02361760455962869,0.003945015711863675,0.06815230711868459,0.006765244642720936,0.04694481919382398,0.031052782530465728,0.0027148921765773326,0.04016509796892076,0.0038373726784166062,0.033941451819661794,0.004984669689367283,0.01969920115642776,0.045916642833492505,0.014704127270407819,0.04015847857011462,0.02266009283112591,0.02547049690114439,0.06135712662957471,0.0222275299198032,0.028565031519042106,0.008298286838058944,0.02001214791426814,0.01044999642053207,0.07162072114703799,0.014933793072135715,0.04130336194792289,0.008617236201918066,0.03172545125512638,0.005100936173955406,0.03642605815908434,0.03280182520486613,0.0853930037003296,0.02461980552397297,0.017096247367882955,0.00948689107015932,0.03264781063683919,0.013133716365952897,0.02254699344196026,0.04159576339100174,0.027131359224825735,0.05471680610020896,0.001945452805815373,0.0014619454181277747,0.033682637225347145,0.004157955412797176,0.013048920815526999,0.036863803021398134,0.0077056471966959195,0.04519192465068367,0.008381988761420711,0.009236890940295173,0.07154172851163504,0.0634976152563747,0.029107558691310265,0.03309096203471046,0.00787377973505865,0.018827273753281137,0.012025797097902857,0.04203353409732263,0.038487914023634606,0.03938924034162361,0.04136544247821966,0.02715836013339923,0.029577860239189235,0.005907863829992033,0.031027959021889595,0.04439975262853524,0.004518645630983142,0.027502797870734508,0.0053182779687621085,0.008695488944592544,0.013017987994588587,0.0064944201947863545,0.033016714417008486,0.02491575615091257,0.02528388300184581,0.028615298497796038,0.050942320849733824,0.06077945343151098,0.05506654937607536,0.005971283792548632,0.032806777721286706,0.014083895528589241,0.025156346468123647,0.032489728144460495,0.009821562745636003,0.03738794328276002,0.023880231453035583,0.00669323886080786,0.009125094334623218,0.029212184444300404,0.017227087013620357,0.011970391142182568,0.07254378264508998,0.011098453812815101,0.029095199121356108,0.040922204916909566,0.038949733123874286,0.03864892808436632,0.027131223821647343,0.04853649689757189,0.03401137819453809,0.01576265139641353,0.023632191016480675,0.0001325728380741631,0.03855692819979134,0.018811437414884502,0.021728244735287006,0.02107211881350063,0.009047928264411587,0.010807422729430693,0.020430781059791958,0.02271758877730118,0.041526851687337385,0.04031973518749221,0.021341970444790304,0.005388091898069158,0.003754254247546107,0.012445970942133955,0.011661506674324917,0.025914694795491133,0.030948570811823117,0.03905630523659953,0.021035681046687293,0.013583272711602923,0.0352794915329564,0.06676869613602698,0.0014284560295325655,0.012440506763959192,0.003977753321553534,0.005150892951117592,0.0057162747054981256,0.050282649640383814,0.007983275173652216,0.06272170914600089,0.06118358051943329,0.062018418739845316,0.007016195341819853,0.04564228546698207,0.023166410398521353,0.05832869103121435,0.039931744741459385,0.025814443236225393,0.04524630432389448,0.02931495358009134,0.011633556582374305,0.026221561485947398,0.017313995355806855,0.0499297540634579,0.016460989227784106,0.011314936977815826,0.028232922024854945,0.009031966807196756,0.03172084193103181,0.04034775627345821,0.021192953075082732,0.06406618895267951,0.017868124524713924,0.02232168681519031,0.02770213873941413,0.010340240184944227,0.04833611516213654,0.06119077247670479,0.027826255201422068,0.04473463237428088,0.03948224559708463,0.008622308143349744,0.0765628455340801,0.025110443440082286,0.02943572554064,0.03673985403103597,0.048297267522382836,0.006195125744367702,0.014122697165795839,0.004975632129979868,0.009346774800302604,0.023852994406887873,0.04465068155907287,0.06319374566736263,0.041170622248304034,0.033360081364837424,0.008365218356101767,0.04542743211735961,0.01644001118375643,0.04586898365779646,0.061695196547988995,0.0020047955817425467,0.03222852774014412,0.01117054963122599,0.035841014385333214,0.024051969574261034,0.003114264535493072,0.01542812762384893,0.036340262660933265,0.020036501434582743,0.06321524569919035,0.06099472944924511,0.03436912053207325,0.01782282974546967,0.057132954876888686,0.018241437911668545,0.038081997958515745,0.0011578349175608849,0.010503124689344445,0.026200812858528433,0.035056478648504696,0.008842870375262213,0.014532614823166201,0.012001153661786557,0.01105270022793009,0.03236555101958388,0.0013729481299111779,0.054791283632377674,0.006266802429909457,0.03815766526093839,0.02355220070615588,0.00025753110156728765,0.02917072943995319,0.008185375235149284,0.026310190607288564,0.03707156043317994,0.033530887760440886,0.013474224642413435,0.005932285156061479,0.010392077508152076,0.0022193705762207916,0.039581628985278505,0.10235365218595677,0.028421321834124436,0.04882547647624769,0.03901739722591879,0.01818595615498919,0.038356078761309864,0.0047320860565440714,0.022893817634882463,0.0419383004075356,0.022537156729607932,0.01859446750836219,0.019576698573582463,0.017192463725374252,0.027885553710042366,0.010746432056769617,0.030567738172223746,0.021599266984686172,0.00034921700390477817,0.009320340818711415,0.022643625031034453,0.02745862885078104,0.009580226325909769,0.007233572634443908,0.03648845058906469,0.03791009463311623,0.03172533667435823,0.018057021020468245,0.004086895953998304,0.039486776325327766,0.021777305786601198,0.031007999530713037,0.013246507639038174,0.042309514638679824,0.02751218219150936,0.06004546596348975,0.044949491124807506,0.04638367752879424,0.024011523953544556,0.038939489472779254,0.01882497573249481,0.02279131714189836,0.0018524469731815985,0.03838088701500214,0.01821852921295758,0.011544555775031995,0.002990719650195872,0.02247338646026059,0.034441841258709416,0.011346068177472413,0.014453420867787892,0.010585994428869039,0.025147892396946703,0.03459380596978601,0.030518723288833427,0.002342189390868943,0.023681020319104962,0.03304905855446205,0.0038075174314378124,0.016473310984639333,0.0063134598764980066,0.042539871083679015,0.0007187268571550165,0.0331980398338908,0.022471305255364837,0.0015451066826374094,0.04919563318579956,0.0043987620172886155,0.02333398799948161,0.004704979323854885,0.009631286097209757,0.001193601270047473,0.017332216208396645,0.06492517234438089,0.038013686576504724,0.023262678810959336,0.04822646054308727,0.0422310113908656,0.019642899777473743,0.04520535327452263,0.033136881791411055,0.01162207918217778,0.03177232812252573,0.00448472672768524,0.031188810252842147,0.01687560036432728,0.02859205197403375,0.038174011068948466,0.032312351746719814,0.037175674949386506,0.028015721029503005,0.010450666426997213,0.03582163340259892,0.005466433099772794,0.033257617298118436,0.0338443773273005,0.040409981573085674,0.011359684193731456,0.08833177729607533,0.02770887543369499,0.03971636826697322,0.015212081362300456,0.011937408566349561,0.028953969545223168,0.059482591715878774,0.022110107278035418,0.04107781455381315,0.0203926629319518,0.01464174033319432,0.03683274202801834,0.0031715637838099497,0.0089873141457531,0.008765238475828607,0.030176207436063862,0.03812348416112288,0.049664770634283595,0.011621292625817792,0.03053568687303365,0.020585059293360186,0.05478748143151835,0.017413441227253523,0.039803425406460924,0.07036281408089318,0.011583742937267993,0.047857296466260746,0.012562249058003183,0.013496765135425581,0.03380342196396846,0.0667157025351508,0.028056634419579674,0.03642936122272172,0.025867132347161315,0.05303944325266807,0.029870850964721085,0.003817327823982697,0.054939108511466994,0.019606682194396208,0.03184353518176686,0.02168184404655943,0.02802270646039995,0.014042580811200078,0.051905628840025475,0.018405649595646556,0.03506878650094075,0.06760594798830694,0.027119508169950846,0.04082216020474305,0.0024268714132108515,0.0002447084367833696,0.056252949150525755,0.037758508774607014,0.0359943874247739,0.03963449672377328,0.006090115242901095,0.028263666421947387,0.03974044783526959,0.02839456736923096,0.022748646766482084,0.07231472581998744,0.012205676956737077,0.055089170867653414,0.022583476795344948,0.02353870832734095,0.018442813079433296,0.01086647513855904,0.014178708626910841,0.027895847119025707,0.0608326860558725,0.033299404402717336,0.022639048470196432,0.0032981595719785983,0.022272584395369777,0.024718219788144757,0.011400399859914978,0.02314918376914965,0.00047844886181108714,0.0200819497576446,0.013894587001563985,0.060551182175401175,0.0008276157633929637,0.03550273477102012,0.01583223172829823,0.02669809331779016,0.005581914667707466,0.03967427829914438,0.024221865887886995,0.020726060449419825,0.038859324583363664,0.03915387376763313,0.03751723232225318,0.057260372988365116,0.00220488888619802,0.055427782837196016,0.02737890374755292,0.017209400576440992,0.006362280270341747,0.008735409689072438,0.0363471052420169,0.019521439253685158,0.012340023453417781,0.04679268626798316,0.029373026140800562,0.03329318821651511,0.03168733871377538,0.04331176508392731,0.026414814307516188,0.028744591971991806,0.0020529494455467368,0.00850057090374523,0.030443835511286266,0.007470143272960583,0.009505785878898276,0.018180629174322227,0.025492056796661722,0.02183942852200471,0.03221854168781402,0.02136203484069632,0.028397879088907063,0.010426832262147523,0.013567628759143247,0.052625401131018046,0.016716233629972377,0.01774169058819486,0.010830175767311101,0.0132722545112956,0.024107084710794202,0.025871937499604147,0.0036037522968689895,0.06538728597845733,0.007609265722023029,0.04236679231620566,0.01850502773794832,0.048645676448437924,0.047024570060032245,0.034096711991077944,0.07356029302566136,0.05076709396832024,0.029958561176690546,0.024198982677298808,0.05816937434182923,0.015043979574621391,0.08632957161220789,0.0315286041345097,0.02814862296814402,0.03087111185675928,0.015441381717396008,0.05069590371193955,0.05401393703320595,0.036285805646667724,0.008999792308736487,0.0010126528349001518,0.004174602099484281,0.02318638408968593,0.0376723118753185,0.05867594108552743,0.00987693838368503,0.046251532573621745,0.029787399987655228,0.05524509047792869,0.0251428561870356,0.027175999394009442,0.008495885576476903,0.03153038055275448],"x0":[-14.225390375920133,-18.0869103656198,-10.243789963432459,-6.6880275971432095,-14.150259600077597,-16.121099122571803,-29.362621151713043,-16.026511706747705,-46.639670432929506,-25.555315966188317,-25.216743741519863,-7.655275579536392,-42.552575943180635,-31.394196669782247,-40.19259663128588,-31.96773399978704,-17.571637838383968,-0.16143336795969576,-19.11043588994279,-35.2305804319468,-29.037098618519586,-40.05936988690081,-48.48013174762734,-45.87116226956491,-26.05676010934933,-29.584655658650927,-44.54077212218633,-20.76040924425506,-33.74163786839943,-36.32727633868911,-8.256736643808715,-11.616431836538332,-46.45156774508028,-20.76828210172931,-1.0750779183727688,-35.35469755288352,-23.872417290423787,-4.989209073442602,-42.82955281687023,-5.090428061704766,-0.062213671802391346,-47.00051086946721,-22.939805089480025,-39.53091874957185,-14.910632209783047,-49.170039099553485,-27.43887499272549,-9.795557346307572,-11.224893057335894,-40.88541612989454,-40.42625596268178,-35.07983850657938,-48.504179052136465,-28.558869841471335,-24.137164406322466,-36.50651044534921,-49.261450738537334,-10.570878654886595,-26.555117672251637,-14.246881386370037,-45.72212618950825,-19.473865855764405,-5.495722096626099,-5.5902222153696,-40.78482215787034,-10.54483666608228,-44.11874636044432,-7.5275507041713485,-0.3077710654145527,-11.250481887944442,-10.484986140327068,-12.398393552979126,-34.265849856968636,-28.089141047215314,-16.043722852231223,-4.188858806561613,-26.604334339460422,-29.403322138768907,-0.9243774530338644,-19.78902757011982,-20.218103982398116,-28.54199237958709,-47.63002769041138,-46.61389336849718,-43.612635407085264,-1.9747871762274105,-1.7383519858524155,-36.66432321569572,-33.3491914830338,-16.97699472862091,-47.146576880978984,-3.574739543435679,-47.56961619773119,-35.948291942846865,-36.46572217829651,-30.275669056954314,-20.08886704433105,-36.655539733889384,-47.13275722780469,-44.576293146487714,-11.275761633257808,-26.44607078414807,-18.994206075840413,-15.572836063504491,-33.952074953578915,-1.047211971517037,-23.169522591634184,-8.456610284082666,-47.270199615935645,-32.26042109377799,-36.6147492042311,-40.22097429891459,-43.23949219842772,-5.907548698840259,-17.568157675143723,-34.62928852496622,-7.33183736857157,-37.12446737483326,-31.20205806369263,-10.863756731155528,-27.453099535734328,-30.818720385633224,-29.87246035040625,-23.323381048784807,-18.358393444141175,-25.534786866990554,-32.57046505385562,-18.31126477455143,-1.425081363241365,-3.2180182630488607,-2.60132803940083,-30.554358498558678,-6.294765705299243,-33.49976224564553,-42.65415278169967,-6.944285115026306,-39.26679978411626,-34.575713483770386,-27.530987736669687,-23.14356419976432,-35.51183370202337,-16.014129333883677,-15.092775499744215,-7.320026780654976,-33.20963133313156,-15.607132447216255,-49.022250823825885,-10.259080084279404,-32.38664704175329,-49.72597346412323,-18.61888921122722,-15.629412592541648,-31.279364975899547,-10.141982031478047,-34.46546476772069,-11.215014623355158,-35.5583587053117,-45.79087001841371,-11.440471275688713,-43.385104640469805,-26.9797592663404,-49.37015265013576,-10.970277874416457,-43.7077103707747,-2.9759391052070483,-3.1288478081299864,-14.441823689308542,-38.14520066554541,-44.084055916890065,-39.22557817454514,-2.6467398513405294,-42.83617324738916,-21.783613221503316,-30.24504259809412,-26.325373016054165,-48.423265230573634,-13.244845925279702,-27.322848499628815,-40.18385697283979,-23.137117815717765,-47.48780087517511,-24.240789415805118,-31.83543785690951,-26.322202341370403,-42.98477133195186,-47.51898452339949,-23.890567654868843,-32.00394370796591,-9.216164657879345,-35.341684707287925,-42.6167348210311,-48.46425208492414,-18.907383885937467,-47.77685251220532,-24.39480545621845,-9.347075513551273,-22.424613914614,-1.5903215911061586,-28.256623056717945,-23.25257992873202,-21.943166733735843,-29.975468243502547,-42.38533842606289,-5.235002211952411,-22.152191167586853,-42.09139234293065,-14.77579138565911,-10.005404594618161,-33.83548380560156,-21.246966259953204,-49.309571529093034,-19.295939321946566,-21.791169608407834,-45.706751222932105,-18.81253277473156,-36.220732862656,-6.468937653735707,-16.05114411160944,-43.36503281967021,-19.35934393875751,-21.977208313056394,-35.31328123166053,-31.819920694040015,-2.4316195325162604,-24.98523498280929,-49.36304129420278,-0.713687219328063,-13.271148597210946,-20.97017374814024,-4.070385381519436,-28.163313997713136,-29.167060419877743,-6.064994956297065,-32.42917931793179,-38.826990431229,-38.78239018115101,-19.944999832134258,-33.63084434854494,-21.75964344246263,-1.8653529263773838,-37.3666287197028,-22.387703797934357,-29.13291557866904,-40.27913167797489,-12.900531658530056,-0.9717103237307567,-33.78783783602848,-13.515975766632815,-31.33570305531068,-9.565843319967692,-16.462405711926586,-36.54364630878899,-45.315328048458866,-13.685479732373551,-11.123725644185656,-7.2324909615517186,-13.755121030034445,-41.44410912679618,-42.32993599802922,-12.707156258396468,-21.311232787673006,-7.602340885736647,-13.29166255811922,-27.719421096185435,-2.137288823917427,-36.14937430554534,-32.44500215069377,-16.030561688945568,-12.522454824198526,-11.452094629466902,-22.882582070020796,-21.415660276747495,-22.68300916738788,-32.08285469295199,-19.77057087562688,-36.36643191539536,-9.492386918579,-25.205354668713664,-11.724398782473411,-0.215814040239104,-14.334904620954003,-43.90991308684562,-3.1120535316452425,-34.66254907267678,-1.4028760191097334,-22.008999812328945,-41.050866101393815,-48.14404842682546,-10.823099706208517,-27.19061149764117,-44.25707383433378,-49.00573955275943,-22.04482422076507,-17.84774283603253,-46.4144721094041,-31.925839864799443,-12.415806357991876,-5.427971008759358,-25.01267095843316,-29.959160007231745,-16.142527594012112,-19.75646458461332,-44.46189822198464,-39.027048693514466,-7.955246965842977,-30.85657513107609,-14.931532047614482,-21.79123078195029,-22.429569975947405,-16.37208081610667,-33.18275015997537,-46.77464956159996,-10.205888180575752,-11.44038780502228,-49.06246584236632,-22.175293976635125,-37.81054190009082,-30.239064397664084,-42.73645014113095,-11.14530062438014,-17.719180331692808,-32.37635199800829,-17.091199062072793,-25.541281619523026,-48.10262967230797,-16.13880276535329,-37.79305217739961,-16.39700494853198,-22.11811607516484,-4.749829562618424,-44.44954897504788,-19.97715014067225,-0.23481931012199198,-8.983190833086896,-11.267797965058623,-40.27336241002456,-23.021681524847292,-40.36627163535904,-23.15392312067135,-6.295621445430388,-24.324946368529886,-21.218528712049476,-38.05435544656236,-16.54856974789538,-35.85286776278198,-25.75629415806806,-43.360971569540126,-21.99599382429436,-32.54497386859374,-35.0259972858121,-22.585555443571437,-16.028428857792864,-31.966664798486764,-25.26849952711945,-29.719989277022542,-5.490036174373369,-41.27675022590813,-14.831720932337134,-10.597855379539823,-23.53195051424528,-38.216407213386816,-13.453086963566562,-17.676296425859206,-26.10537521841231,-49.1588596250272,-4.378663250904136,-8.338285536959178,-35.98217906209995,-13.685832640859076,-21.347709952077278,-14.539634709766558,-26.232904148786908,-49.03462525993337,-21.50083558908532,-12.402379935501495,-16.830775213533588,-47.885565726615035,-28.928413608306236,-40.54929337423424,-10.83238381389744,-42.257807613057096,-46.34757111543516,-45.07820430798702,-41.070413883244484,-23.84900514086662,-15.97516739747402,-45.683230418874956,-9.523167399559252,-46.646305588898905,-24.85379923852683,-12.451944391808334,-10.61439526370781,-15.784486293959377,-14.389229705112495,-32.116106144744464,-22.541944677407066,-39.29549927159621,-20.375515339833306,-49.000266761666275,-18.446918151099112,-38.88891510701353,-6.43876213104474,-25.24890130926417,-31.441413825064156,-16.391401677738106,-25.802996989633577,-11.89533885581967,-7.167024576522674,-18.835513005652103,-44.542444647846665,-44.10635958230797,-36.91152470317215,-34.648232500548474,-12.23304714343081,-17.139280345716468,-6.697935494050444,-26.386419226677514,-28.82045511629525,-42.868917368977144,-29.29824693164954,-28.985803471381654,-1.0788625283117192,-45.419887422856775,-6.133831032010539,-27.39361377230195,-8.052909664791786,-17.73199100013003,-38.47748290672387,-38.87427428961754,-47.66933688288817,-11.65612329641248,-21.17520830933556,-5.313318049699367,-15.450277338313011,-19.785844616297588,-6.563318778754191,-30.244655677943943,-3.0447561030550574,-24.1549272411687,-43.07347926374214,-44.724154874705455,-22.965270922849,-3.3757663229519563,-0.43112708442661907,-8.510926701288323,-3.8980311945968737,-10.957766322827055,-20.45939006838715,-31.312337405795397,-5.7458962624357675,-13.705377852029322,-29.834427291715148,-2.6588717616889634,-28.39751533535413,-45.59072558199514,-28.880759503438846,-40.68399069161788,-1.546426078830665,-34.887630563339776,-43.27909504781271,-33.54425300736344,-13.612220093804538,-45.22974031080829,-30.137817377279642,-2.273677316868683,-1.3420736701583946,-18.240200105952198,-37.15524388307927,-10.705108342754166,-20.966858995463777,-13.651293436853917,-5.011278321468837,-21.96211338930707,-46.79351861609084,-11.248395771569985,-31.760705482036645,-7.8469705658057105,-11.371057915644911,-33.09942890620926,-29.30439163525297,-37.817319405987604,-30.40038030117276,-29.96464716835411,-39.41381996642047,-7.227446798487847,-3.450602606899378,-24.662963549300276,-44.25481818219925,-22.74727505523152,-16.581739685815087,-20.7383848109053,-0.4987912552173235,-2.730470628457393,-39.18446572993696,-5.135896271979579,-40.49680928055427,-1.2877984715847113,-14.109216652949275,-23.551653686990015,-33.11004539038045,-13.269779462062658,-33.166333696239946,-19.316404955113818,-31.93864588424875,-24.71949336430074,-19.768240186339913,-42.827765972357014,-17.1775370226827,-1.6828048251195882,-25.43680693775151,-8.870337300368957,-21.326990520930032,-6.992117866999237,-45.93798898343899,-4.990107787378584,-43.161215492370076,-21.87323514233136,-19.287458232603814,-10.332309765487956,-21.927291657855985,-45.957866896247744,-32.39314414523312,-19.92751859994072,-40.339962277991134,-0.7212330144101275,-43.705111104998636,-28.878389076570908,-33.68914519821081,-48.97372217231748,-37.707421819312756,-24.833282135409707,-16.524607275992064,-46.60041899864624,-21.806308428647647,-33.61821232525776,-12.001708037350145,-27.98252035328126,-36.705630782360124,-0.7639153622402084,-6.802460859168624,-4.512367860184652,-12.858093016200378,-37.56320049472116,-19.8557278953148,-6.185211814111524,-38.577173008786446,-14.209352979037904,-45.24833768789392,-18.438653309712084,-21.08245887070501,-1.9258634469295988,-49.23214413495627,-11.583073886128304,-35.0642249954089,-3.7147287063407863,-8.905794981859671,-21.799173589148758,-38.14448837293371,-30.97221651004688,-44.61104611362229,-29.62653685390615,-6.813959599300223,-42.33424492232628,-16.598298006433033,-28.684813397025856,-25.10159326869552,-7.193314322192901,-2.811547557982741,-5.481972984949223,-22.072810387634522,-47.705270926146945,-23.199941628615672,-36.81307678321419,-1.1351208107454158,-9.086136054680061,-24.77042637487441,-2.457979251588327,-46.227163286521986,-46.10857648129213,-26.07377371045625,-10.555261629463175,-35.249506274113365,-19.935286226651016,-8.95628285236645,-16.864209822844867,-48.78603912988396,-9.84016612779689,-28.43531765406554,-45.58731954961879,-13.239002123661825,-38.90932210553486,-17.0845489050919,-30.508736438664684,-23.870072322911838,-27.260165104190158,-32.33619220179992,-25.625081258860483,-44.84429445383036,-5.365770763605459,-33.025546448604715,-21.435983112201118,-30.90206727814968,-33.777329378485824,-29.37095966143991,-35.70619197145896,-42.404102167514445,-22.76620155810877,-11.908204442190263,-1.7468510682378313,-29.363892648934087,-26.42542477170413,-35.49127304748158,-3.668002432062656,-27.043296193986542,-31.315585963982862,-18.13715223995126,-32.82701836981731,-32.55281325318392,-10.064432272513645,-1.7950842863609595,-23.04320028904239,-2.527413486139729,-27.500095961758753,-11.428983708921614,-0.035344377953805406,-0.0730782051316714,-2.059024168530721,-40.43483311877631,-26.46990103082044,-2.392050869176243,-44.82247158751046,-34.35055747633551,-3.2218147896060256,-23.49446577347374,-32.38538954049967,-38.01802510050095,-49.96008579478013,-25.08658309573152,-44.21127728440383,-46.38510504202134,-39.805478984207774,-25.41610724087795,-1.0379785018056364,-7.032470814092651,-37.38225626132482,-20.684773864920757,-41.06493779342099,-12.136774528569505,-0.4080733479533527,-44.84362570991581,-0.235393549996743,-34.126803533762796,-16.746331166357354,-40.757904961129285,-48.96587071479429,-26.90734349299393,-32.83629100211335,-26.531831086020595,-11.324034727163745,-9.90130252812712,-37.0951419068967,-5.155748740578114,-12.08884730591684,-25.10530374160527,-25.345511375348686,-11.206377615603003,-25.176430750501044,-28.05286874658275,-40.489536302063634,-43.71058440311655,-30.271404002393098,-32.191466993865106,-11.499724893613617,-23.260297952615804,-40.44596565901827,-22.13114003694142,-33.100786330946875,-5.581284123030539,-42.00204206376795,-43.01390102405625,-45.31493525234007,-17.36953252900809,-14.667740216161572,-43.82095884958176,-36.791251756433695,-27.38805136712599,-48.11247049994346,-3.0212410007722235,-20.569879421932,-9.469797763299992,-11.482852483429905,-41.30911582100097,-15.028698744132129,-36.103794644794505,-0.16465430620830057,-10.4908702103657,-1.7364992358550935,-7.049743229495609,-0.9480907635168401,-11.362930968996022,-3.967509331085861,-31.941021286184345,-28.105756215973233,-29.283772915040895,-34.058861372210735,-28.537556506269024,-48.992292454094255,-26.86057671095665,-46.66590877276029,-35.92866137782556,-48.86094056356103,-38.508925873817375,-38.31288057976351,-38.188485715587525,-23.566231660706862,-3.1056080052327073,-37.01746533801988,-5.347949610656788,-19.96881981720282,-41.874906266024446,-20.870502367071165,-26.363730924595032,-45.452766893194585,-39.88179188772396,-4.376429880973543,-23.40661529832868,-49.85772469201712,-49.78545857214184,-17.179256475103045,-10.378906911409258,-19.72685084980541,-44.76411547287318,-40.61213550725429,-30.180624457747108,-46.76185864443081,-12.535678502629665,-9.267878132786079,-37.19245825564329,-49.55794113909455,-3.122233270299446,-24.085891410863248,-25.82453468348066,-8.25370486831889,-9.210647604244182,-25.491986743589145,-32.986573522794146,-13.81297571604888,-4.052749631050279,-31.135280632893338,-36.677756520948165,-16.58893511011137,-14.62520920635847,-22.719843800956653,-45.127515474612146,-8.879246432308852,-20.60743605298908,-19.999221959126356,-6.13394117657583,-45.048778684977734,-2.2170969619735525,-49.82391993827741,-30.310981022842086,-47.54530588490435,-8.314409453814942,-27.45620547768477,-1.112509245458282,-4.279079785058604,-47.029998880371735,-0.784739469979201,-5.309655915657396,-47.374795078006684,-21.298409514906414,-8.105214170583874,-38.52942894126335,-43.03745830542556,-4.308044614852758,-13.761538066335921,-35.36608241324809,-7.644371707902142,-26.236171738488057,-31.785007814451227,-24.65090769455225,-13.926867892345317,-6.087827554808789,-48.11790536691019,-46.37099244583373,-48.46951722290977,-47.77070892433717,-22.487915301383964,-7.689430669470642,-35.99395040921052,-41.20256008368368,-2.4581693340967936,-27.706733966708175,-8.4892157912712,-17.262664188909362,-17.249894571220015,-43.85602458190304,-41.697709652510184,-12.990857585430348,-30.94968250042205,-7.456720041689624,-30.230377874116765,-37.101935600877226,-46.60012301927726,-28.23020441140347,-19.569945473928374,-6.008652499298773,-13.085940799797168,-15.080166256939332,-49.49416177114323,-39.91103065136188,-47.51066080141963,-3.3844593729312256,-41.25444123498339,-30.119000331193234,-40.47796940840206,-8.792992385844355,-7.615263238670367,-28.37975140144965,-12.775159150491277,-25.190459086263004,-16.674566442614736,-21.79238097621148,-5.222581547183203,-46.55802337948287,-49.51243428708627,-9.200007417811218,-26.73858380122165,-41.43719907846477,-8.003844036190145,-42.89594589202746,-4.99852251282965,-0.001268715527191766,-19.646021751913135,-46.283318212980575,-18.4327867620935,-29.865421450533592,-28.33343780645755,-35.771012921768786,-31.885127523685387,-14.752122668369495,-18.561853428647655,-7.204758655668453,-31.608699064569812,-21.32576115831156,-11.397632545236213,-4.344123826313629,-24.331440448848586,-9.790705846028757,-17.653126535474527,-14.764297086518818,-46.72490652481015,-5.812056528029541,-35.119120192428035,-31.22892476149567,-31.168148310713693,-37.4674812762684,-19.507163680190175,-47.476442869127034,-42.91571865779337,-15.646421200403193,-24.204662831241073,-16.752256610477346,-13.788048731554381,-41.95099114901437,-40.236671828569015,-46.125487834243806,-42.02665354732799,-39.94415788652257,-25.103574799965813,-14.381822177918924,-43.714084041488455,-5.898063557526923,-32.185836924285596,-35.775952360841,-11.379494109815191,-5.151930464395827,-11.420455607812563,-38.80810610873983,-28.524941417806694,-25.090401837343013,-11.49367418480496,-12.370854880866078,-15.700167634812656,-44.31630432349709,-29.23557879242621,-14.484521858092158,-30.616952240597474,-11.265087734027935,-20.532414945363374,-23.05268526587393,-33.135777165229094,-45.64068849762436,-21.85169841399488,-42.50176518951041,-30.08486874988927,-18.24807019580279,-44.340651435779485,-20.745292536668536,-43.89870471327373,-11.512211511212245,-16.74381590592312,-27.135131056535087,-5.184058828367588,-12.665746753863083,-27.351661307686324,-18.283014093372707,-38.177497709938024,-20.822062489712025,-7.843809400276802,-20.672820953707117,-37.10004932708804,-46.162579937591055,-15.330061668486772,-22.829567173305477,-4.590466916564228,-3.067793741196523,-19.36796685444725,-16.77831218490934,-0.06878883918229883,-17.24462659038367,-24.997884891614863,-43.090999392728925,-44.73984799034865,-22.09805991157272,-6.10071298065451,-25.22592936067133,-10.005390374971224,-42.97419277130452,-8.576943613404108,-3.8835743916426524,-48.44992933302594,-38.625837038302976,-38.24334555653339,-14.17612645957348,-37.396871222111514,-20.355468504001408,-38.350576342873985,-9.59425350324562,-42.643487674653834,-37.2631896071129,-23.663783607971546,-17.370073508430572,-25.80833040842355,-23.502686256457437,-27.929467695694687,-22.229806124984965,-10.374757351990949,-13.248821584360526,-48.62414380430076,-30.362152435684386,-46.08193092716576,-40.52456231910807,-30.590108871208564,-23.522475836848145,-45.57133138113786,-26.753806323257535,-42.20628800914737,-45.03514928721783,-42.9963431623809,-2.421501999697917,-31.373952712001607,-19.148643155668065,-27.863979920587724,-31.79321653957723,-14.109402727366815,-22.110130675519525,-31.580006727086605,-32.86819379185383,-37.23922337130613,-4.451981280679496,-33.04497176889291,-45.30265123004011,-46.62693259672268,-12.923726915636625,-44.96796728646982,-36.01270925801365,-40.96108779367984,-3.8255373309809437,-33.44760584689897,-1.3781873262064814,-31.251235312483892,-42.62655029269607,-30.95413892576516,-6.569975078636436,-8.898037257012714,-16.681440799043344,-39.6894236907409,-17.831369799564122,-23.236120552573112,-1.753752881580084,-33.954016299192205,-38.52057163090898,-29.146733844236415,-44.33388748955842,-36.33198688312581,-37.46914156330845,-37.348765929191906,-9.287395847659585],"x":[-157.47682495524495,-172.3829985419522,-156.4899020447484,-153.18372270849358,-192.07232553897512,-111.72835665489396,-121.08023268867143,-121.92934977960516,-143.80486568086548,-123.58234068535377,-164.13727650629338,-120.39301071019193,-118.55094756743594,-140.01572419350327,-143.29705983616594,-119.09208786358289,-132.29715372854116,-124.6362980286204,-120.43862941426251,-195.87968190872098,-120.73543037216037,-115.63275515327223,-143.4238130271688,-119.20389736603005,-150.94954931583814,-132.86713401072439,-105.47111183696163,-192.53917378666426,-151.46457833687808,-147.54321585448082,-195.45995440422658,-107.4179394413466,-101.43356624016782,-184.6136915858301,-182.7961042272683,-185.6817131873234,-161.1430369622014,-117.70729309356074,-110.34406526763681,-177.35765904354275,-184.7082118848168,-126.35191298033482,-184.1161148735839,-167.7239608383313,-187.20251252253058,-120.85971617275881,-109.65911148061916,-160.04037389934217,-106.63236360328246,-179.11272347711008,-185.39183595522334,-187.2752093040229,-103.909933420919,-106.49954478525115,-138.20372200206634,-124.23019638512156,-135.3631422093021,-136.20521650994172,-189.0799971274594,-109.34948297432265,-184.43674189112141,-185.9245468616872,-170.98478880453158,-127.36940429733818,-165.57506092379808,-165.1634556165546,-193.98984794397535,-153.83037484099341,-111.66790556250787,-111.268534016427,-135.63556198097444,-188.17497200300545,-109.80818502264972,-103.33172989028976,-110.28819378011046,-114.84702064460768,-103.17324631805866,-145.11101185776832,-170.37893661372604,-175.27576826286085,-125.74225021684269,-198.57501439641192,-167.0246066859609,-134.12900311841668,-193.55537624284977,-166.62150840459176,-178.95566582180018,-142.77128490956196,-182.45308321386574,-110.92262569952172,-122.30112089866213,-142.1893137184702,-129.21184250822984,-181.23932308530553,-142.04823576077993,-123.74549696486221,-149.43503998011926,-104.541024509724,-109.10387417154229,-149.03079534051224,-174.56401093281028,-147.81379634701852,-103.74225423077684,-169.17268506865136,-188.47927582098595,-137.16473194075675,-137.36145054258844,-105.93367806292892,-114.37297378916884,-103.15034181848701,-149.64196123895556,-128.89764791746302,-146.57818113931492,-175.71517997959538,-163.75952210362814,-169.97525592568854,-192.59657519531078,-148.61131730792755,-146.8219158534878,-137.9774193076459,-139.36539113946765,-148.97600135347741,-166.29244190924462,-124.054109591378,-124.17381421170197,-198.2836642146409,-154.7596979148379,-199.80223702934526,-122.22690871047766,-145.6855155217911,-110.135629727255,-187.50558402220736,-176.9181469425062,-157.4812861379998,-171.42467489862412,-182.84100895055326,-136.43972099360948,-101.56191614970102,-197.8697357156357,-124.6657065201949,-183.79092552985435,-112.8567501283789,-188.74998348980796,-155.2699078027811,-199.97090727721007,-146.17445307290876,-119.41585449106402,-126.60763277376263,-193.46488726729592,-112.7977421827457,-189.35040085244339,-146.09922742989568,-109.26499942223519,-120.13444188496769,-190.09795500021926,-141.04728883886685,-136.0655588122507,-110.58034279068426,-119.57919118636586,-146.45478072750532,-158.71233326878848,-116.89417812335611,-195.70457649971496,-114.94670186682067,-177.15331485407663,-100.45413351054613,-190.70708589444564,-134.24052252936036,-192.21238218350706,-112.479218922602,-122.85974823444793,-118.6964936993372,-152.83709497786185,-172.47900089518083,-196.61797633466628,-181.62542711164292,-192.38097472148016,-143.01220187734532,-191.91537831392208,-135.0099229207775,-154.7273921753853,-181.8128018425013,-130.7355348940198,-150.19642596268778,-154.80773647409234,-158.70326002905506,-172.6553112744367,-123.87542876876924,-119.4030263091334,-101.2513145838111,-103.65227757211524,-164.02338437726576,-128.6185466797853,-106.07129976932632,-122.63597823899504,-108.93311441541589,-169.59829988642204,-191.0124294990659,-106.38231265094664,-100.07973011804697,-180.03950719868027,-194.2681430049424,-185.8879582143276,-157.979432766548,-152.1636470927927,-131.8386079480765,-120.13737172406829,-163.41838593682616,-126.87489500293798,-102.21192619825135,-105.12123481023197,-136.01648758982319,-176.38446650150252,-198.854857335686,-130.02435598002228,-136.49183551650916,-147.11397325942866,-132.63513289236852,-165.82529811857412,-116.99232909633928,-148.89811356265255,-103.15595033588781,-168.43889288265737,-123.16689081326162,-139.81434801449427,-133.20302405424098,-171.47959640935048,-112.61727080135637,-175.32699650310076,-157.09621252588258,-123.91458579568405,-106.79442229193387,-135.61514455278243,-172.91869788555326,-193.99818510049337,-115.4690151452088,-146.52326672937014,-167.08063827295985,-174.8336553793759,-179.4255941430226,-178.16322824417128,-123.46119015416181,-145.2416063672723,-192.45138513357918,-138.7041446728081,-153.82309898164164,-151.66976713842985,-121.41082649858834,-167.58321633020387,-117.53585033862635,-131.19921449258769,-114.10098084076323,-108.03104968117394,-127.22231535617018,-189.2982972576022,-156.7395631018797,-198.05239441758462,-133.8729011004819,-166.50118691948936,-120.9785029698901,-126.76519917054863,-128.00099478614464,-112.90186845553056,-108.6127129032353,-104.13408439759013,-155.11347031327404,-102.69047918910434,-199.69366072747061,-164.39608274598297,-188.9086777462341,-149.19434871614982,-130.5176093317661,-100.88196222007369,-192.29550597041072,-120.16789033596542,-178.8916500171451,-194.60901445357177,-183.10909609733255,-199.23563256597856,-167.42869890608313,-141.6004725188333,-133.83461002033334,-137.40318224908697,-197.47430660605247,-170.4593525024914,-199.36637883071683,-198.44499879366757,-174.38602252168243,-104.29095575009211,-170.88453746609457,-112.73297796423884,-174.3816863428599,-107.35107814342865,-121.77235831138817,-120.82857600828501,-104.81459863048732,-126.33296171808436,-191.84916977105084,-176.263464401968,-138.0146029003044,-112.31915398675609,-161.8163742249946,-126.36394080170716,-141.07041809766753,-119.06664081776219,-135.80006119020067,-127.32241472477332,-190.5632946038575,-136.95622825847101,-102.48934668983085,-193.94271834809214,-120.77736588206982,-143.89425743140413,-107.67703303877232,-174.27078742439184,-163.9270793323152,-195.12111194899765,-173.36508396209302,-124.46776567329039,-114.57733546558377,-195.307797214371,-130.46452139772728,-160.92276868834153,-111.00758954763785,-128.9808274693445,-193.75216553000627,-149.82388960063628,-198.2505996800623,-100.77077864823511,-110.95197536168038,-139.3070295811546,-142.4404473155065,-195.34774635913737,-126.92826337153767,-192.38070696974538,-184.78197193787167,-134.0111300958801,-147.46788521470407,-145.2975397301921,-164.1724191115151,-193.3809463662096,-175.93389477104705,-108.72688066369662,-164.39225699766195,-149.6562791975741,-150.05126425122273,-125.98459273851033,-161.31635933238812,-123.41897168878766,-154.97139743912697,-133.3097634556452,-103.60923301242929,-146.66897497881322,-188.87535572052602,-158.19797050779567,-144.37244506745955,-182.2434844277418,-137.7521658526669,-190.6025414966021,-197.62250473589188,-157.72994207634133,-156.02194762947977,-135.24703029412882,-150.22009512583605,-189.33393488209734,-190.24694603821803,-177.56061467833894,-181.08798542775858,-124.13329926316925,-187.0160043677461,-118.46199717866435,-193.201225298758,-124.44166672640064,-148.38444606464566,-153.04296007486025,-173.7949972751589,-193.04478121999963,-134.0005919313257,-124.57716587307446,-136.0620106886965,-135.36111291425212,-139.60274759984307,-105.63207714065406,-121.41471929040361,-136.9080231946453,-180.23094772307445,-169.92979248739965,-185.01393807646483,-121.04829697703028,-178.40784806364388,-132.8105823930074,-124.61866227566966,-183.74398626617176,-109.71543229905816,-108.32236861480744,-103.67326187072126,-115.41001666201676,-146.28044478514553,-184.99954601303386,-157.15883130134466,-167.42691029426112,-129.87579276982802,-185.6921298620271,-107.73155629423263,-188.62695961837375,-145.01232149756692,-112.7606537538418,-199.1228023635641,-147.0627750173095,-121.99590654187185,-178.29358247212295,-162.59820982068504,-143.63379709231776,-187.55119691440905,-139.28266014251733,-166.32981540522437,-136.73048353016227,-157.9022455623441,-178.14618594552854,-160.62380242310965,-168.20516064264092,-113.64039033225097,-102.07077882151543,-150.76892039878766,-177.02937719434973,-186.3552915354379,-105.99097536459925,-164.28695969288032,-130.58478807466224,-106.26952365213786,-179.61535283728415,-125.89295456712631,-195.5454981521875,-140.13230631368324,-191.72967180535593,-174.5674025329819,-133.08856186282236,-121.20797649172279,-183.9639768701857,-150.11344632689435,-175.06532841803414,-139.4497188951578,-101.23888809997268,-117.38377950749927,-114.8179587097483,-134.2999976582872,-191.49020846231724,-154.83456178804164,-187.70683775022331,-149.75517884577079,-111.69202466152448,-119.31950771069073,-130.34313613882327,-106.67266590441042,-115.21605076946955,-185.41641156769256,-149.24028990898705,-151.47584021573272,-138.40162170878023,-160.73184361297052,-193.96318119021544,-154.48948071848005,-140.03089987455306,-197.57217923132913,-172.78034306039314,-124.22818381705044,-189.49681081996746,-165.94177803296193,-163.89401103603316,-100.32828658703967,-125.43491357591148,-126.55983560560512,-122.06247464999439,-157.485551518717,-107.88386223553599,-184.30339343051364,-119.5301277746391,-166.62746342633014,-143.2183471754585,-180.25019717953887,-131.09843926449264,-130.92762314125343,-164.8180588054083,-100.13934637143971,-126.60866987187109,-116.58961169338112,-186.40115804529063,-117.98900177536062,-128.37147260948444,-129.84917726716716,-168.32234376441568,-136.24263510192847,-195.56685233072625,-117.74237711511604,-171.06773002550193,-178.46823151393136,-143.53415099609202,-117.1494708964063,-178.80879346601287,-143.80466669793577,-135.18275967514296,-170.9791480930866,-164.74169371632874,-158.047348033042,-163.68851232039123,-103.03089602123285,-191.82135919374653,-172.75340697834375,-128.29511577197124,-164.01103646809912,-158.9610151218851,-195.27202656623717,-117.79396147691547,-134.81012657399788,-141.45134864819718,-142.2122754918595,-193.56605640692217,-133.4295698120628,-139.9056042877006,-186.13914461876985,-154.09142981520256,-125.1715170302705,-187.74226371328234,-139.9302771333486,-114.20335623579689,-111.98655952437049,-198.17428405497273,-172.4470995215408,-119.0877821695317,-138.86723328450302,-163.00843861044922,-165.16442823074124,-117.11737419008246,-160.7198680098871,-103.34046431060173,-153.6196695566538,-160.6870931886529,-142.83159711632712,-177.32746389004282,-187.07362077771722,-143.9966966193457,-194.99878388772157,-105.30411532512997,-100.89674831057674,-196.7340644443454,-137.7206184240187,-139.2186445118067,-172.5569846508002,-183.96340071311167,-155.89326960293792,-160.36201280604087,-134.3155580053691,-181.57088876866635,-158.3269788082496,-159.28303303053048,-175.00207365819045,-122.97288503095083,-178.94457074115422,-137.70845732430917,-146.63075301009206,-105.01554412790928,-161.89145498616057,-119.66819856829257,-113.30297259653392,-183.72493194878825,-159.54064153259569,-186.39151156372466,-195.97284430957802,-131.51551438607578,-125.77782759606393,-177.91373949435126,-163.11699403265706,-186.6113857673626,-156.44435697172173,-184.55271740958207,-167.50167910836524,-139.5129835009954,-145.51265188233793,-155.86921372277692,-137.16656455349084,-164.7128110648548,-188.31011599910013,-179.4490050428995,-119.28055083070407,-189.0092908352376,-190.2198424538565,-127.2000900647547,-158.92477039808782,-137.3964312504478,-111.01651590111086,-102.85868554083083,-113.24088443580209,-171.89548912093667,-191.4980950998123,-119.53375391403007,-133.25960361770095,-194.50658879970848,-122.05978786503901,-134.93144677821584,-186.16282290926173,-156.15347119299258,-196.31567754748295,-161.63737214941364,-173.85456728966227,-100.2857752010881,-192.06134176587491,-187.1666417696821,-140.72683675021455,-143.0886419130955,-178.99084095176008,-136.14771365633325,-126.81908980952005,-185.95497910056662,-112.09455290857306,-183.06356393041693,-123.98968055415189,-192.05330851099689,-134.44031644407585,-170.33769162118384,-175.377933552399,-138.56809978226784,-101.3114229742919,-155.82840448830066,-173.46263837783283,-118.16151091500429,-140.58448943318672,-175.18562910364483,-152.4095993629576,-120.89238353435572,-108.36759917971506,-115.77301582774393,-137.9936103702114,-168.33793466251728,-156.93406432149948,-184.65581990947751,-169.5642398247258,-148.69051977750524,-108.00724915521944,-111.20204922019083,-170.48032341752443,-144.7785687555145,-159.2225111215197,-111.03383735031926,-130.0972172198645,-184.68703276674466,-120.84376518487039,-114.24487577572529,-105.20345488316947,-141.78001383963942,-177.732328772208,-175.84758642111095,-109.23202640168424,-101.52213355904077,-199.86090195645937,-179.2925835736234,-168.40931327232227,-163.5149159597611,-142.40953336769803,-167.92631094500413,-121.14319036171591,-197.45336521884738,-127.94323282772515,-100.7412966865164,-178.34219586078018,-112.12828780356861,-133.32123755782874,-148.68893403523845,-116.4907950278792,-152.81879622482847,-158.06624827428138,-181.1698739909006,-195.58852108485584,-133.03287849163496,-118.39855472838683,-170.93376074778308,-121.15887900139757,-100.00940276734202,-101.46394942663505,-118.15174042509346,-124.75763742697453,-184.27809844782303,-165.38528035445364,-125.66197781655828,-178.04718096992082,-130.52626127718483,-128.5871097266542,-124.72660778668299,-118.11438949037421,-150.85486562967486,-104.6202550528258,-140.49527618485746,-138.83498910277484,-121.12021372553532,-115.646810430426,-190.75686718595057,-115.47676928306882,-101.56961908222839,-123.7460684596017,-135.75167091375363,-154.64560474845973,-118.67063724151592,-166.0368468068823,-140.6449968479715,-165.4334576002451,-131.69372251603932,-153.89637832100226,-109.89255911280512,-108.06823867573843,-123.24519017720323,-121.56857962319079,-156.37240089030527,-193.72078241010072,-133.54668221019807,-163.48262494009003,-107.66689621712553,-197.4899188981376,-146.78062098037174,-182.83736988804856,-157.42110208183826,-139.22610502767037,-115.8030513380143,-143.012307383013,-133.600763113212,-113.16953109883201,-169.40208135546604,-140.83457144791205,-157.8264419012408,-128.48144237248198,-162.2326186089561,-147.54879434737163,-182.4121052120943,-198.6553700419072,-189.66753086305005,-167.84760325715084,-142.80789311201835,-186.3517665557035,-168.47851832886144,-194.83560800948777,-102.13216775498495,-198.81834730573672,-129.04147416019921,-169.5434883500119,-130.46219771035564,-111.47709092600213,-111.00528043770525,-174.49442785381333,-122.60597931559435,-177.79967322628752,-111.21022718015566,-125.45586203570028,-111.19794750413845,-153.8977412530541,-168.73116661705106,-169.77695155777755,-194.45071108958166,-173.03448886233542,-175.22519757602225,-180.98807490080344,-136.8832917797345,-139.53135726446374,-143.67930762721284,-178.69301693787887,-176.920121336727,-137.53683346563218,-179.3527656427522,-133.54928766575534,-140.30913655017858,-181.9029312837169,-169.66528455578515,-177.28024111332837,-187.86206868544045,-119.06909513518298,-109.01392175593962,-155.1212101006477,-176.58596813776884,-100.11819616617719,-137.12885523268903,-174.76946737734212,-176.39723416296408,-190.17509593793312,-117.33436670117312,-165.1771501267644,-179.16336528675578,-198.09121683000834,-181.17566772882822,-106.40043362571588,-183.2890458491804,-123.16637935505663,-130.80562606714045,-192.5413553829198,-180.72463869620475,-189.85702081223005,-178.65739317400843,-183.66555526089843,-109.30295716375487,-190.6723697547501,-156.56351653568424,-166.41103667236175,-161.78886919589553,-141.76091532302553,-175.55269814611847,-168.6129873203501,-135.9675222120961,-114.17846926539343,-167.91789444361473,-145.4770630693573,-129.70870688840762,-160.08206831773464,-154.67254244210457,-162.01305098189582,-111.13145533226354,-110.88195634100538,-179.12877445346317,-109.97522942770641,-186.758286849621,-148.17447392955515,-104.56725089340449,-176.8271849286428,-150.5572693592792,-119.44803417850514,-105.3178237896598,-150.62876122596455,-140.45195140879252,-166.14401091261058,-111.34874439912123,-109.21058956817417,-183.09845675828683,-126.00209463775663,-117.93870542147486,-140.21295928517162,-175.33465851820324,-192.16987619466448,-185.8402557653465,-154.84151840941658,-195.25545171365272,-108.84237603119935,-127.93374290179105,-177.62190612505074,-195.74199542855652,-100.34545241173653,-173.1820303383305,-119.22110021403411,-151.35843844261268,-105.83075684244267,-116.79863213782065,-139.50136459704382,-107.66432026721174,-158.47895234571052,-162.15447252175963,-175.71357923483174,-179.7947744926481,-127.99584055651565,-152.29180888576457,-154.29955629153352,-167.82213023618183,-194.81971031992097,-123.48979365857029,-164.36150597612885,-151.1583834146561,-114.04752695805685,-105.87183923320663,-116.98645087342658,-164.4990652338516,-150.8259361996928,-166.11753028391325,-133.87647954862413,-173.10328074118394,-187.5271391652842,-157.75649092208977,-142.5910671841931,-163.81939002155974,-123.62093590379781,-153.56885623286774,-128.38986714784855,-136.213352584059,-171.4963516542481,-185.75545407188966,-166.45803686104148,-129.54065420878666,-104.94031128507098,-107.78331932447554,-102.08178448395053,-186.6565571794686,-143.08991070857172,-177.72070046068583,-199.7309137813421,-127.68061477542629,-172.61395993380592,-178.47447697707094,-113.16667296266172,-194.66841697933995,-148.91274288838162,-146.63560169498112,-156.37512616849403,-160.20194115168843,-128.8833466319296,-175.89085125042692,-111.41013360768154,-112.27126640167945,-101.19251194036298,-130.91801900528617,-179.17630953070937,-118.5040269991746,-153.27708801294918,-102.3880640074432,-136.37206567510196,-174.3520909799473,-160.34782670374605,-122.48619739959139,-125.7801768362746,-153.46458273525928,-142.88158087151783,-112.13599238208194,-178.02536950234176,-114.2736194020306,-110.90744899781757,-125.42985399660506,-144.04853706181453,-189.8541879215498,-161.3751521238275,-157.77468806187827,-139.72702058350248,-171.37964255202724,-192.17381906794282,-180.34776726387204,-131.53698508878222,-117.71718779256106,-113.17185487512265,-193.0568754318629,-112.32313499418444,-155.09378777311719,-127.63940529353115,-123.04544354206253,-196.2021781566892,-115.07686573346993,-198.63336493124305,-155.5271261918437,-110.60467619163295,-169.50451227970703,-192.2295026275022,-190.0969875011222,-106.71555856019972,-104.64118191685725,-179.41721332055417,-169.04334635350136,-182.96896954843865,-144.67746214223104,-174.45687510037044,-151.90824202307596,-114.07472865061384,-123.64716341157893,-166.78428913956336,-170.7210993908404,-195.83752787625716,-128.18482443164106,-138.1915684798431,-149.68815996617786,-120.62472254405017,-176.15788135253962,-165.27201258858207,-161.99702188427935,-163.84572462448477,-170.61366005150117,-152.95580232626122,-124.9570835532405,-120.15454193264688,-173.06709005116255,-156.27512345820878,-195.1169252740772,-116.96244846906299,-166.33526269101083,-156.8063788997806,-103.67942932871388,-100.90621247965304,-198.4975007946351,-170.80958865236227,-123.98382801960337,-196.69786191997954,-112.01070501843392,-144.45600163230537,-193.5311316338541,-151.01982873199194,-127.33017577605833,-152.62911006347272,-120.45890032083695,-135.3837168613038,-161.2324495788066,-139.22225636500258,-164.050843883097,-180.00913013993866,-125.38702427805153,-106.16955728943358,-166.40581701992764,-168.23712493559867,-193.60062926870413,-108.35554711999629,-120.32322927594142,-185.86857698095133,-122.24322024807192,-190.73660865723656],"gamma":[19.050514020048684,3.7343799905337693,0.614508317363831,9.885325955055183,17.40223773266408,0.15547077398800457,5.466160070210302,2.85131779765313,2.9392975175202185,13.638876516442476,19.818591945394104,13.24891004795434,15.070981796171186,13.080997743253002,7.368031145739131,13.697920183283587,18.960049978987918,8.746561672372897,17.877500772191766,1.9094952359373085,0.19412226421730683,5.000246991864863,18.13752336146889,5.741804274287001,5.672028483431806,5.632413695561436,5.920324510184707,17.549378441941418,9.8793554320594,4.337651481686957,3.044627418775301,6.482823802363886,5.381798254016612,9.911045790643191,0.3975898916091536,5.072216708848312,12.69082876829621,10.12486719869948,14.563731562535471,16.348970021495006,9.966801613367329,18.865001293723267,8.837635174045943,6.754631704951364,6.322250419657469,6.357992006650348,16.809768349468737,8.862138979582541,1.5974591216119371,10.644090699806629,16.12892232402146,18.23804092754991,0.5671203325686802,4.910819592826736,19.803756030045705,13.73288166452674,2.109829684814861,15.255708642874893,4.836111195597654,2.2075217898959787,1.5823248599134487,0.8275301953502412,17.49518130372173,1.9309386242285553,5.880900325597138,11.67146713549053,13.484110987498186,2.1915089982970093,5.25337359374372,12.058951946181754,17.78050782102252,6.44705169131544,4.418898649487186,10.079522731490126,14.65378526104708,18.33725023093578,13.313409833389077,14.735204767493641,6.9777155995102635,4.1849596845622195,11.055991093495043,16.412388785550686,5.333800029566822,4.9699480286101805,8.25487818367575,0.1900483447501644,18.600581400078617,5.142745620965714,0.708184675334067,1.2862322783846825,19.767391704462234,17.690631902121957,15.698890865373961,8.905693811198159,11.50942077428573,12.000511812024804,8.406760390961828,7.939750209222787,2.6567060510740026,0.9412004796475459,17.024244577006176,1.4958705273014328,19.800073991830523,17.10422760551943,2.9539924131755635,15.035956646415404,11.259869032037454,10.015016043837797,14.84301949160999,9.760095468778434,13.237580416711786,7.016398366000356,12.798329974136093,4.696517764292962,11.022803486827382,12.657176312221491,11.467842875693703,2.351819014465688,8.542293533785031,19.320828160010617,5.211540743389884,2.1356874996344377,5.964800353665876,15.303702990112962,7.052612338970112,10.716927623437202,10.237748408963569,16.572427355956112,2.9216591431804195,3.1361415594103637,9.383025365353195,12.30297795697945,15.1583806394488,14.703774565197314,17.55648679552936,9.66993488127201,11.790425299216603,16.10633537811069,14.545102846042823,15.715612188660302,2.953085327354499,6.751910815263633,5.7213323518257075,14.351527460467475,4.440762577210227,18.944042610857856,11.835594063387425,3.8583403005810446,16.887957477730136,16.67504911572115,3.9494543654582692,6.132461586718181,2.699882614683009,1.0271171263115253,10.503779477580885,7.945082673513761,9.503306239775341,17.662889224818507,12.803052906678388,9.723339925171768,4.043269640831051,13.90955315671128,19.2847748553436,2.4731400910110635,15.563408411207359,12.512589847835507,14.354033462043434,10.392836063528733,6.670741779638547,16.7703754119071,0.8506857348206642,16.99499901904266,15.455964795515339,9.606866208022375,12.766922733030675,2.4456127302494135,9.553165619601849,0.7575404341130154,10.564418560458929,13.713093684643972,14.009062005285413,8.202992877645467,15.121709711814741,12.559549824840829,12.261783663116464,19.53401505346217,2.4798367920570774,6.1299928138867354,8.628035947819331,7.71338137657164,10.15414498337412,5.023689771910984,12.497077611922268,5.124740193154236,11.265511909808072,6.3087912310524,0.05627509529827268,1.8440573938279403,14.097024541486153,8.559439923427359,5.2875091959182985,3.639288200256243,9.805971610677187,1.0250075214233556,13.962560236094879,10.435890824757902,3.653094575734799,4.57149146827323,10.333163667096695,17.162198077183564,2.4925114304628826,15.48900261260882,10.530275736409859,3.25704234127854,0.2279045298481419,13.454176841130444,15.159384151610315,9.439906799313352,17.099793066388518,14.69020903081625,8.67145243063912,18.836868653275815,13.329271585294485,0.18607511900655904,9.105564492955462,18.37941263823462,18.76508672845548,13.509759930087291,4.4247829189134835,2.004920885365644,4.681244904281989,1.3893964252248825,13.81552593984316,2.6766440047935403,7.722510106917988,13.143440143648606,16.33799980048884,6.036021897176358,10.712738675729373,6.620500236357363,8.556368213102076,18.38696831768509,14.721210020464301,5.389501828829033,14.764613761288444,14.847868910310428,8.963648775495589,18.08192434120371,5.312812263349667,17.34391468109932,12.715773549892862,6.3008978437648855,0.5653901108990889,14.63069002497491,13.015397260347083,6.607641405864397,16.400473117774478,12.05973633125581,10.488274559330776,1.3379120308372539,2.1209310379588286,7.3780776685626925,2.6001447852898396,16.300831079523626,11.168442535504344,5.608364582653382,2.330814524866991,7.6993667389402765,19.894100802665847,19.659781058764946,18.28242335496576,14.491654256068625,10.405760404360262,10.928098041689784,19.55961667426932,12.7522495338915,17.118876913592143,9.663982411835384,11.228592955386475,12.089635747607254,3.7414483736853876,13.087656740848828,12.864377955233017,11.476690623827977,18.236787149375758,19.10623010384117,11.477821257440928,7.634196975715382,13.986267420953254,14.408011334122719,7.514542113827756,10.869216260584128,1.4963017447207871,15.107198359264737,11.808220830159758,9.859932783558909,16.662474690625196,18.15711425432574,18.853665955628045,14.25981112113913,13.719365844497027,10.703201917430274,6.982136058630997,1.0904392572754373,15.945238574191368,7.1023166970870655,2.2991195732682312,5.16352187397167,15.927947672720979,16.97386844802354,14.902911533944131,10.593638102432017,8.784236672836645,6.331376445538073,5.064173686440059,0.20069526352121336,16.78794127744205,16.802788936935748,7.523630369758538,13.975349200616485,11.074117766921336,17.892938970891006,11.335547718043024,19.349754816515162,6.384075233778539,4.783002830446255,4.71088487274498,17.946153544654,12.702529772065825,5.5244112412749535,8.726868291263514,8.597620332171218,8.720245128948253,3.884702175465824,16.011669024704478,18.36462179480575,5.867744655759242,10.794225878665632,6.957693668491816,10.452758509749597,9.40400660452459,15.91990952475635,13.060170362075286,14.049377755793522,8.225525695807733,13.643550346004636,17.72477141534495,9.106939821811979,19.135625781592324,17.084141713810375,14.297023055808676,13.940385683519905,16.86733158000292,18.717458323934636,10.756973115919436,5.606451823225185,8.660543428644324,14.89446413276982,8.703598965564797,15.550521205596745,10.554212287692986,16.712883443833938,11.886072587793851,3.3963985912753314,1.1694011955052197,3.2184698638806086,13.49284925289503,16.405677580035807,8.947799281393536,1.69377820903295,2.4252230721212165,5.673801816830557,0.5251412104943798,0.5358437420417683,17.555835565347195,6.243194923135165,2.2462265996801145,9.025372002482985,13.333807508294981,0.5013998673685505,3.1575837836234877,4.883378843070525,16.153285172163812,12.921126100981649,4.780480191531047,1.4667146832288536,19.53316109535558,7.394785090423395,4.763002018254197,4.043886669838197,5.677283043413546,6.189897571278822,7.2116222391039875,5.113955472686276,0.177041894941814,15.621286348795426,9.955473232674233,19.84911920781046,6.249605341082773,19.25348085178959,10.022001041083728,15.5458162544334,19.147577403163204,5.295178733053483,4.849106373083347,7.314224127624267,6.982979282471438,0.8821136095120963,10.624590917057684,0.08684909051349887,4.928626814567156,5.8442284726508875,6.876779638895938,8.953443237190717,15.609659261210043,5.15829487297621,16.618364081792972,4.472252838250528,5.583419487336632,14.434823965019543,17.24982944780686,12.551611072274804,1.0515895426221356,18.708362847319442,11.049301853300463,16.192818409027524,9.367433198658318,15.632247302136273,7.595916391437836,5.921909379564654,10.583828638101004,15.537049029052024,14.588174195858086,14.987067576477834,14.495126623895258,16.78255913957932,18.40584754513702,11.870967938124327,16.558335102913134,12.564997126097758,15.407230959111438,17.7076580867906,11.121135576284251,12.18322838898338,3.874920550064558,9.313791189451447,16.252914258843344,3.537680800354508,5.570096933979962,11.295748931697855,6.399029799682001,14.13633174680912,11.465285698516162,17.169620783115093,17.380873424194334,10.225344341375093,13.273649794632458,15.097107101041631,4.856599818846772,7.827273384539195,11.055168988196012,11.450309282743842,16.528834419520262,16.0001487480945,6.003057291715916,2.121489412019777,13.450697461282015,1.2179094869853513,2.101227672685515,2.865808042002027,15.92129497005021,2.099213855386446,8.101797084192395,15.465751721673072,8.793620963709468,2.412781972795006,9.061431100686622,4.482027199605647,14.084271303255797,12.619990459021366,17.66321645087515,19.542215425493758,8.827766429108594,17.171161856916083,1.4926571182956172,13.285976619698872,14.77421001085089,2.6824580339159,13.359262473960332,11.927644030416179,9.762642125548403,15.346198251350614,7.817332144972604,11.345161224324611,17.37514382997038,5.156272981707737,4.530139121798298,14.193662824449342,8.290478766022794,18.69935189121012,14.612338417637162,6.711784491958324,6.234695554524721,2.3783343011555047,0.29682974000655005,3.753139204472258,13.584615590227443,3.7803507486878463,1.7359615936214245,4.963906622383307,2.697468229724924,12.929917105627045,1.373307631624967,19.324320934023692,2.9007352627134075,14.715041781345,16.80286462256031,0.9735514151591751,16.437196640237843,1.979745632191019,11.57420467080161,1.453009694767009,10.398807729523183,14.466522636751256,5.2459681442615125,8.660493287407135,12.072368935397847,11.12688184391705,13.685038402375556,7.075478164390789,12.43318978487709,3.8758940052198287,4.4392526253839115,4.562120151013902,15.957936000206923,6.649012455935925,17.316823237055253,2.873727882990047,17.656317778814934,2.889104118950505,16.032049938222407,18.836316690723155,18.62174388068769,6.2806794775850605,10.244125465684203,2.9557412438970676,12.866868930545458,5.255837889859958,11.744340571262523,17.717631354374372,13.537211790203333,14.771442214451845,1.0389479044428018,0.5661297153320044,16.52350959451217,2.16977302372813,4.149879906812033,16.379499702746504,2.584376269446862,14.582318466844534,1.9856622067553875,4.501387429897679,17.679896514754393,19.55102731918749,14.217153107884716,14.02662461205943,4.433588294208475,11.438373866920344,4.763833584941333,13.774639700782561,15.821118904380587,17.402948561481075,19.57712474616791,13.283310408553813,16.35172312692739,2.6494107808609835,13.402214500951724,13.939450353710082,1.5582385716498193,9.622662231833994,2.575882908500642,4.182301805562925,6.527306483522004,2.2512388741087275,17.920072979485543,11.093418806350023,9.341748881546401,11.76239346123426,14.819874938672442,18.9003177596662,11.174728305225855,1.8040411426534053,14.623918448951642,7.4216902558064035,7.307694084180372,10.337124227141725,5.212552229988754,9.111493578559644,9.73854825576729,3.2205580399405154,3.863048892794847,15.223229466440525,6.926612233471778,5.436026784753842,14.978103928331246,5.220187736320239,15.06905593296652,16.652886113194818,17.38201485491977,18.257391542839137,9.37492119024359,14.034781162014252,19.551808185683697,4.215169821419842,11.286927689419457,0.04408650662914404,19.381993438437235,6.028354545496275,10.957484552241276,11.508002957276918,3.284668980636618,3.355255425500716,8.248106875475916,11.583920942418725,15.498822657442295,17.894130551208857,11.625179281717788,1.8955991868772903,1.1137022737749946,4.145774982475028,2.6004866559749873,8.456627030704631,16.10465662788031,16.455568292290632,10.077548603500892,5.616895918887206,10.987696644444398,17.65311338706003,0.30063161289227036,4.85248494252263,1.311862469603322,2.1654452409724634,1.97554073396355,19.60357587902277,3.6952078695185886,19.995395102728253,14.242030070757256,18.3657830135879,3.1166289896993504,19.1865161674469,12.803568528627348,13.918797301580895,10.691206317061358,12.9313710154095,18.651137196060176,13.068683588624133,4.778156442115029,9.567362676287331,8.526559848652013,17.593819871273467,8.300121063009392,4.366556553012693,7.883832825494905,4.349227413729202,8.676990187502987,15.562253777392513,8.235588868222914,18.044204632255205,6.312163507473105,8.032436058005636,13.165774196726172,5.309792190793949,18.598272820863457,18.517714220770433,11.436227988253682,14.009514941424621,8.341977908895522,2.597883964216252,18.677826272804626,6.461910518905838,12.887383765521246,17.160495370451798,16.97163470553808,2.6127160061924037,4.16154358428757,1.5820127589692268,2.250325870509422,8.640845464935136,18.39644920787461,19.142278886881687,16.78031590433912,10.258668172618087,2.788738566341844,11.429643731764916,9.852433996410168,15.234236593532945,19.595771961067587,0.734992474004672,13.695546266069814,5.030329430882072,12.9701872029817,10.1518085758559,1.1010909945050562,6.60419682788131,11.195292989413641,7.90134079367391,12.256137982897922,15.754359320556098,8.300837304695591,4.800173791973825,19.506998838828334,8.904501761633593,11.448266408128678,0.45575263435824187,2.7760384523105364,16.036449742315785,12.137678557500529,4.932048598686984,6.279824256279127,3.6721467094879756,3.297676101271514,11.901799277543862,0.3802061523340239,12.741245074365374,3.2494020393073386,14.144593609608002,8.003369542531855,0.063669614733044,13.33039861713559,3.52811709980811,13.477603339708729,18.00422698857799,15.759890468515291,5.830998728193997,1.7902002578402731,5.676708062592306,1.1100916169185382,19.704490766711842,17.513230805070137,17.519940213494642,16.226573393404394,17.705368627637878,6.989728339748762,12.383014173496774,1.271358809426415,10.195262223850094,14.417330291744936,12.322325532092947,4.683005561966573,5.466926765798608,5.114970149305473,12.232286067604035,4.931349145820012,12.007190493657788,12.611517893818668,0.16722741693838916,4.546426818222562,12.459630891174216,7.941705562522676,4.134018777687487,2.133225155013996,17.08420410719965,15.481559385699168,12.922168286832981,8.626013330615345,1.7004972235637927,16.961810782345346,9.241812633399276,16.503651782982146,7.1607126093880025,18.784218595150037,8.471628979807285,19.2643037150771,16.574592817157054,19.599425595304414,7.241123970680339,15.167509178169958,8.253997981455363,12.103570423511334,0.9540752756948656,10.365577937584662,8.051841421271755,5.995474496654398,1.8040445236598446,9.409814334698696,6.520787474038112,4.80764122900684,3.4258279251708235,3.603638024529734,14.634582592250762,15.791501619740744,14.296436144042515,1.296533406542828,11.624184796373548,10.504930822725242,2.074368398665345,7.216262478226256,2.43111403390992,16.14557338809011,0.29075646153343015,15.136251546879222,11.39587517931722,0.5132622597821079,12.00814527418939,1.676611379748132,8.610313530400248,1.6280937543208207,4.66331154931928,0.5309251989302544,8.008524050092234,12.749359620847613,8.516121778937077,9.636058041105295,16.27405578932841,19.418447228564197,7.294463808522602,9.163443167488232,17.556260682171366,5.221395899028831,9.120354914998,1.3039369605519857,12.330247545845378,6.568369398462934,13.001310246801134,12.788783348104197,6.381939240495291,15.67294714079614,10.306844574105058,2.995334719770084,11.16309087614134,2.87390582363368,15.653423305561134,19.300829195624154,19.763521851587118,6.269723531597879,17.820085766134206,9.55620841478494,18.532239517171764,8.00657860106635,2.4228372675647103,12.888154438356011,19.752585416895876,9.239040726537677,12.798790117048572,5.465209697482143,5.439723860881647,11.189337567021301,1.5358134914385868,3.892396031813732,4.57014164155102,15.417462172987975,13.626786129364245,16.60620651893329,5.423594682337645,12.769486551730932,10.594168075507131,16.049198118863792,6.94879013586966,16.548823511677824,14.960090491904957,2.2920733871460586,15.352134840240815,5.539660787319787,5.688312795772452,16.237958590323252,19.55416722351257,11.741620326224375,16.25390985621534,9.425425819355983,17.263957039255203,13.055722756835042,1.3101116822552727,19.151072773636596,7.554587389676457,10.44170833503343,9.258989991899682,15.391132237706845,7.120811446325339,19.433988877875073,3.8282335662506295,8.76754322582315,16.602626964806024,14.959819900840312,16.85679139051536,1.2353075903469701,0.119478769830339,17.58099404436446,18.846085442649965,16.791316379975328,12.754303982684405,3.3320917385482174,11.204945656193086,14.244346386153893,9.904257569636531,9.90434223095884,19.969202466837643,5.593710903385372,16.2862774645252,4.827649952552262,5.959861811926532,5.0475316834450235,5.725947951082606,4.535779324186491,11.083140201830517,18.806322866296256,12.988726567716897,10.472727299057972,1.472053525705328,5.908843067888356,8.166900754703,5.217699239178639,8.903371512612551,0.11278596784023431,8.330186896677493,4.321743606523998,16.959871632309355,0.314186933192544,15.789835638397944,8.48671537313444,12.156512690677275,2.765830269728342,15.345806507785298,11.16050428258674,9.720947464468868,16.63777395533218,13.52989847361485,13.216807623541648,15.993372446666946,1.2679927890367093,12.19938878338306,12.633577521280014,6.697376677835627,1.4911908201202984,4.325469040018901,8.81178238919464,11.326673266792277,4.581889838838298,13.363354636188722,12.137103511994782,19.172450161993773,14.72748747400605,9.508996863110827,6.735343873978872,14.673380081276601,0.9238114699004951,4.25961255913236,11.200198667892366,3.5731432650634165,4.22791483235863,5.765056107993183,6.02114605825256,9.374717884115324,12.658929008095182,10.438855615349091,8.730044221939552,3.7575434312057743,4.440561365252633,15.662412842057666,7.041021835777954,6.708610365973389,4.050442262858365,6.7346504865086265,10.565477130663542,10.89973682285327,1.0992886518863276,18.410898529471197,3.800641417914865,17.963455756758737,9.517986237149373,12.952692050699683,19.211588263377443,16.382602709228678,16.620305397326543,8.944151932256347,14.336047908866124,12.02618910971954,14.60262962731305,7.599970169392165,19.75632530579937,13.975184874450633,14.193444956157308,14.558588121660074,4.664499974190441,17.66930521499742,15.335520820906039,14.748089671273675,4.3082026955078945,0.3898456450836507,1.6310810177620105,11.834318927850775,12.146432165505567,19.468595515921372,4.111208454455744,18.98204429794118,15.434656383558387,11.2243717058859,6.648183886960801,12.700611794542578,2.2664231338075336,18.032580065570322]}

},{}],86:[function(require,module,exports){
module.exports={"expected":[0.018705864631197444,0.024661987703612442,0.008623608341697009,0.005541016735906512,0.015739545953337597,0.01570371634536638,0.021466586191888293,0.006981309911379463,0.03051418827380764,0.010984093759405456,0.01199940552784301,0.01823267146320351,0.03746152037596778,0.01747436607950703,0.0012716903002388258,0.0016216807519508492,0.027907842787018078,0.02905213638133286,0.03043467726445226,0.023788218707404107,0.0072465434047875865,0.0286597828373924,0.00046533405027759933,0.02180515769342356,0.04386035880242761,0.01931609048758981,0.027752344622204994,0.02341605136158853,0.014060856004129041,0.0037950043500754593,0.013366747877732399,0.05855066660959818,0.008481602749307926,0.0035770927759125604,0.018314911814164614,0.01716315020600656,0.0270246940002678,0.01850111705110824,0.016117838473017176,0.02780767630605624,0.01575050472337941,0.031857241266860736,0.01988080645188761,0.029171754570194608,0.03208646155500838,0.03327515910747003,0.015841349333441335,0.007195210329291213,0.024356956675252284,0.03236419586356998,0.025359668741753327,0.023005943244967464,0.0025680892133400635,0.013804245335387877,0.012435045062252126,0.02205776985749114,0.0271135571735997,0.024128889760934136,0.035104246158499774,0.01617076202159634,0.004826491967483748,0.021384775143163615,0.009734269772725568,0.036183572679006404,0.007977821492236636,0.00962421738710778,0.01844217426659578,0.03296786670364499,0.020329509634978038,0.017053610428179045,0.022024394268722214,0.015461806522095889,0.006545149662049887,0.03941665875113198,0.02655764778602482,0.02758425021159111,0.0012772955554608,0.01755597263632619,0.04492609428383654,0.02465138365140135,0.00167400868849088,0.03072155618294653,0.010060720703100823,0.014234256999199668,0.02151620677111743,0.02488959714527944,0.011783277197042308,0.029090957161819753,0.037796990052895996,0.016553336154020104,0.0346897443841746,0.028164647660396336,0.008675268247641199,0.014598471489735365,0.02799946467276543,0.003968852893927399,0.022044929617177966,0.04887402361567844,0.0027738456866819305,0.015272013467239276,0.024859811182164626,0.010017810724722964,0.006291962201125267,0.0028494206509409037,0.0019963524769959773,0.03211768717156782,0.033406987669133525,0.013895221566844196,0.025972003323198156,0.004606752916584744,0.003278858103430482,0.03188787377668073,0.004259178623989668,0.010447966770587458,0.0065757298811530696,0.016502203863179632,0.0005077211510317037,0.030271039155131296,0.017966491264324425,0.02219297265291076,0.007867171001222695,0.033597573096433075,0.04203148505996296,0.0014109599481060275,0.00838559875418382,0.03320514401005159,0.00120134692641638,0.009674098074489823,0.004158739283586788,0.013925510253305018,0.029393551639709303,0.0012395339434434494,0.04749103281823236,0.02484704344377553,0.03887107326881156,0.0250957559771407,0.006384749919243371,0.015310994661451638,0.036448960954249876,0.030364982915915883,0.0383303887450841,0.007888816096087381,0.003422154429310098,0.029035814724767683,0.01639781018544867,0.03278642492896505,0.041994442547923394,0.005811785046104245,0.003937170213698715,0.020780013718652512,0.009922483007046679,0.007507591065112507,0.042071975681799434,0.03825431811608515,0.007985914828699814,0.009493139431320352,0.04542726025715449,0.009292787037927297,0.01642537741177691,0.03783780829856814,0.007310340831783557,0.043994260965248166,0.03476918135796875,0.028417236861440265,0.001827770116496652,0.03990902280167524,0.016226521981398123,0.0005459088104070586,0.03247344306316746,0.034160796883966726,0.027761014331489753,0.0048577455254139035,0.01126308892939093,0.007476311193154728,0.02508392495166395,0.0006796558685816523,0.008399457124671661,0.0031438155148835745,0.03532031971872024,0.004962531284382565,0.018181597010147488,0.014891082821360813,0.03250628751239437,0.02975214675363852,0.02405435423733715,0.020472553655077552,0.03488719408591484,0.022660322537435995,0.011609337283196353,0.0014894009711399758,0.00454410602099814,0.040888226577722064,0.017850994082443783,0.005791581656884315,0.006232376396979933,0.011985483529207974,0.020442620864812133,0.010269589443204774,0.02708810371983733,0.028633227635748215,0.026136214677838276,0.002023933317412685,0.041741602734780725,0.003773076733379843,0.011938014354643256,0.006357637808549976,0.018755656896078332,0.013643345329098444,0.011307297796663007,0.03327812222291743,0.02900352277152901,0.005402941274163686,0.01875601995957621,0.010360244116769224,0.00296087723866717,0.013265140786150542,0.002001795141439666,0.021647583592791952,0.01090070518675429,0.033993912736355436,0.03552330522255376,8.78479491380757e-5,0.03460014211183099,0.030291165026916866,0.013340852928694635,0.022829991083966827,0.014262546514935581,0.0019815323012133956,0.02173878405822871,0.021534606431190095,0.020827858215747674,0.019203613725478796,0.006669462769975987,0.010001950262393033,0.0037496943643154923,0.02739610464599951,0.012155323883227598,0.005104396562729097,0.0392206552894237,0.01014075385100549,0.02213538297504336,0.004063928536660155,0.014529011218611942,0.022733075213302534,0.05175121554867612,0.019763994011985142,0.011426026330958516,0.010236366691204035,0.012207322465612236,0.035555089296867626,0.024802094767739813,0.005957445900782898,0.006768976751748423,0.027446750237419992,0.046828783319708966,0.025124149866793344,0.01880776041455301,0.011282162675140484,0.010897372145591833,1.290513644541802e-5,0.019100683176922817,0.02014970094138918,0.03796707039636904,0.00850483371924593,0.009383975014866652,0.00019230449176094178,0.004638924772890907,0.01838276673914635,0.004119507477123752,0.011966190901645357,0.02582546562834781,0.005288080473685286,0.0035803617909672125,0.02335926117447884,0.02895707429154054,0.03258735771910798,0.02940241047101899,0.018503218707160318,0.022313226241948925,0.0062416252685083,0.024752248361888884,0.053021433755215286,0.023068629398837304,0.01577242086125752,0.02809154133366981,0.0022423130731820673,0.027568224222783155,0.011369151970283431,0.01885205056218442,0.011789483109675813,0.03614036232217305,0.009428918050434831,0.01007882100364449,0.02558670941758573,0.010271366189373299,0.011977928090712575,0.012824877399269852,0.016316721112743626,0.03605343912852754,0.0016366901720604177,0.033049746847433226,0.0016382854109576184,0.0031129492481314913,0.014021701353005234,0.01489718608237428,0.0045288065369809005,0.02064228973449017,0.003429221782648817,0.033660063032357634,0.03280002700703827,0.008131754299075866,0.004795835092987755,0.01699663170357557,0.0032211482086619836,0.017174465709414777,0.020743717101083525,0.0007644918874361029,0.023654070411119943,0.0029602725400728613,0.009436404949039745,0.0037245978208385044,0.04640176555513753,0.0011425749646548633,0.0030061073012920825,0.022342822009182528,0.03233209045517654,0.012481568812671484,0.0385084512502577,0.017280306799111578,0.011612143374541306,0.03077604127361855,0.012039577522493294,0.030274297881151824,0.006416695436670838,0.02009850522018225,0.017408315085224224,0.006993290727818069,0.006563291589277265,0.012691345464805492,0.0037664276472119673,0.04119443983351839,0.013060460743549884,0.02811771358897236,0.016147784670423826,0.02143274194574324,0.013087539797922543,0.0240969475554772,0.03210133477638172,0.0300497831879033,0.029408916269310748,0.012321919859372366,0.028585470768492494,0.0075332379836788865,0.003981975862355436,0.010165152264842325,0.027847311079814696,0.012183525249791216,0.025104040145405238,0.027066896564303056,0.0038095355315389545,0.005057726789501948,0.0035860041071160698,0.028554876258703454,0.02570784108547647,0.009982336121564572,0.027082795038794183,0.014653063529330212,0.019256676004610118,0.007724939589615343,0.03363538814542805,0.021085257436710636,0.0029588148582610496,0.023447473767153948,0.007200431360369297,0.024395203422595713,0.02311552256887689,0.011130382576475695,0.004674091056813823,0.0064562317261628865,0.02772399982396795,0.02110017329742242,0.0047497354900587485,0.013268125297497768,0.013994027197833159,0.04908069382893221,0.029331521502109548,0.02990999470697503,0.027125083653990245,0.0009913387473020063,0.029964785847545194,0.02216211595672346,0.024164774341023598,0.019234425249027243,0.012617668010061034,0.03141183142782972,0.022137890853967,0.015536873561179887,0.03129110094704779,0.022683930794841545,0.03059108742893829,0.02097114251704968,0.016401939311875557,0.029349355998201987,0.027564653874655565,0.011771818318326466,0.0032051263215924775,0.00531203673113867,0.03482241660402102,0.016348504848004097,0.0509711022772763,0.03767143211354068,0.0004232350680627439,0.00440428196753756,0.005757744296892353,0.019886284850372693,0.005484974684532906,0.007071101847122507,0.03211007965354018,0.014582163567327,0.0031662621639116373,0.04814021827688536,0.037382257235080596,0.011147638640045365,0.0036011666432821943,0.0022495343522328515,0.01848628822089804,0.010563399893122993,0.005790176386974766,0.008709620381438465,0.03280263682888057,0.00888187951532371,0.008700896198135022,0.025091178898359767,0.02388874643547101,0.01873328417761333,0.009727225570113296,0.01974464089952277,0.014427919680577717,0.02390039988344106,0.0478530376335044,0.021113551251259466,0.020611646438159714,0.005743969893283352,0.006662430492552718,0.016903745769398848,0.028761297170942834,0.013059911571094707,0.00418323238568058,0.008443215294366424,0.025957899489859104,0.03507133384651495,0.004986345765158107,0.001087242211335493,0.009756504435553093,0.02806300921810434,0.00421262676680767,0.042274453620486374,0.020619535709652526,0.019353762016012965,0.012310917503962793,0.0038334740943749,0.015091615565259509,0.006342502007433692,0.009007536159336638,0.021054841791480372,0.01016358420831065,0.007560060643184097,0.00906681591968489,0.017515380552115545,0.01537277125383174,0.008110626150757916,0.005838211714907671,0.013127450757827619,0.009121225138573053,0.01274548135799125,0.008432781817651502,0.010482246995051292,0.032383849045595436,0.018611276509389596,0.03898183864145638,0.008733482218658495,0.02337511129230846,0.02608075649747371,0.019612801802959323,0.01635241412529781,0.003060683248125917,0.026070569706306168,0.01924819138442524,0.007141971679028081,0.003349842563028227,0.026020487469555653,0.012711290228199001,0.02639702252862597,0.015622786443070913,0.014225168076711925,0.028343839846496355,0.036195198026453324,0.027288984982281994,0.013814281959152297,0.0014546283593779297,0.009434333258763195,0.004625116161301901,0.018902157764554894,0.03216421866673341,0.025452445013670444,0.010479449582812217,0.005796391663891731,0.027700439980630043,0.018982467629772515,0.0006929570685655362,0.02722424100354287,0.016715762028836234,0.004602383225489892,0.0010685257471540477,0.009880288029622875,0.014012937764834643,0.0023541513795817814,0.004840178064919265,0.048505984988557016,0.01003740070765613,0.010030430230416831,0.0067280723923787145,0.00018811910432664503,0.009663353842187139,0.015505027225424295,0.023493521510791426,0.020376124930106043,0.028826851928443642,0.006002607814316052,0.008118359631643035,0.01940690683107238,0.0285160059227465,0.0028692125297454796,0.028955126267279085,0.03449105962727744,0.021918167134447608,0.024768655507058313,0.010311776539817963,0.0018142869017522267,0.0380349455862079,0.015743410320426532,0.02896513832565839,0.026474933533900236,0.018627934933538093,0.010478929851740981,0.0009914521238729712,0.025684599592391166,0.03545390717776459,0.01951109435482684,0.02031245114706237,0.021360112260093378,0.03275274662868427,0.023647352081933803,0.0045342055849962315,0.021987214651748632,0.005063111987067326,0.01530210861625797,0.03254146966011823,0.036559469187936566,0.016727556594960058,0.01517995170330605,0.021079974138309088,0.002906119801829199,0.008431407478032338,0.013980791583031005,0.020810708454479576,0.027660444662958916,0.001948777046187733,0.002626944952572763,0.02441753869113711,0.01470244989881947,0.024125761037808724,0.006428242852295207,0.01615657167058937,0.031074445212843804,0.03441818951448378,0.02483610588133639,0.02982020220223547,0.023442009071646952,0.004277671411484163,0.02000835869419071,0.0006729868181103993,0.038653371265890135,0.01584300570485836,0.008353565290557308,0.03652771136237598,0.016822786591270122,0.023508870058649933,0.015443730939944722,0.022990061137134588,0.02536597315105299,0.0036153456783944993,0.004382605155641817,0.0070873266651581,0.019865885259734595,0.015229244818343923,9.846639714994332e-5,0.04009290256251513,0.024882864720851827,0.019797256406866304,0.001179351474781154,0.025481392208042908,0.01455939334399331,0.012194525458401606,0.008438843684074882,0.004673537561840746,0.03164903067380953,0.004678332536708962,0.03036046822421673,0.01770356791280825,0.03368306823021944,0.03933295074315002,0.015929102330725642,0.03462156944886685,0.0012786639760070106,0.013007261456606023,0.02194894514773671,0.020653539098067886,0.02706034218471265,0.005976926573805663,0.006767940741176315,0.004185914334529528,0.02279920487705267,0.006509571858575647,0.027952252564542257,0.020226011861898097,0.03541508988157627,0.01461530525154947,0.03082526419745113,0.02903804044687658,0.01463787284538548,0.024691166179328372,0.012526194467118168,0.010473542106129385,0.001335231584775609,0.03614531810677818,0.027644150523181032,0.003673075082366528,0.01984577794905651,0.017338947604185972,0.032821456067724186,0.02824699904520267,0.02694404856865068,0.0043365725151933154,0.010098647503276381,0.0011006131859762625,0.03298056618364653,0.0034364628470471836,0.023932936493625767,0.03042681170060596,0.003773698412123383,0.01658101415229657,0.02625210213989093,0.03663864917552506,0.03179473724744508,0.041736359689182434,0.036693201963368005,0.022379641082903245,0.02770439915464562,0.01725725150577434,0.026913249644363035,0.00815252729834326,0.01774039157035273,0.03147144481214886,0.01932666381901299,0.016644263608853405,0.028826568186962054,0.002435232180943492,0.026079514711299656,0.02224230281289752,0.01278652138500147,0.026867415500319958,0.01085648648699089,0.01743408749957831,0.014835107857104124,0.007918324628340356,0.007092420262528987,0.03136350245656744,0.00735368212963089,0.03308756249000733,0.008819910476677073,0.02156866393668344,0.033255299585971954,0.003981355095151906,0.010608400181111088,0.02049426297486806,0.01219530357930565,0.022988685834075318,0.03785439883320085,0.02030570866181136,0.0056741435505485716,0.003536308000968602,0.008251746474512434,0.007538491204618469,0.021719762854980784,0.007025854131377018,0.016259809549618642,0.0077547932928748176,0.011753944701412555,0.0010403973164982983,0.02839229903139101,0.033053094968298224,0.01767232109007527,0.0006027959988959553,0.035633891969429676,0.01512861525870135,0.027417188073472154,0.01849339935204769,0.013110724371157123,0.016127481906418384,0.007454896672100753,0.016180566480457237,0.050617796299889106,0.02803105012572027,0.028177136795617785,0.007891527289093925,0.03457692369939386,0.02590766366963132,0.011336249766818296,0.03950239977561587,0.01842028891463343,0.043032257412269626,0.009978835945765152,0.02794895607136738,0.008535116204392845,0.028048209801694424,0.013722152245202512,0.013038822177430354,0.02852208619169755,0.017158518249470234,0.02758783474343046,0.023499750386312634,0.006267452026293474,0.015381677193820942,0.010501149775203389,0.018103320330120742,0.00021173463601381615,0.0045031552667482155,0.00817512614249749,0.021132811026838116,0.0014202636295818083,0.007130424988689266,0.035497577180118145,0.029885473293999987,0.013353019727227189,0.02104088770901902,0.02276378167511134,0.033512986049548665,0.020224769148900423,0.003809592710801557,0.006993579708722608,0.001327364662642272,0.0045432032455431925,0.03176006980796103,0.009344007173751334,0.0020948211577145326,0.0203568564453549,0.004028600072838673,0.009894037960214375,0.001473026863394289,0.00860281566010479,0.011093515770686235,0.008675392222268263,0.0026026017304185967,0.017510344110264975,0.025646826575093262,0.01298844144741873,0.011117843028053687,0.014369988747500284,0.008071871540863973,0.020737397112708,0.011179522991054458,0.003468098290003385,0.03601402522685149,0.02321935303623479,0.010477072486487493,0.016361706272177534,0.016153462386625295,0.025016253746272255,0.008890150509938632,0.03565012663151712,0.031012839395383074,0.001706445731422035,0.02201797978290221,0.029548575842344604,0.04408823868854367,0.0013579428208747024,0.007538230762275611,0.009399963715173876,0.021082232887874308,0.03761692032636754,0.01456731137127898,0.02722217157615886,0.016032177141935722,0.0402409745222535,0.004076613564575893,0.01593370438590147,0.028146200045987446,0.010647860205362736,0.004839515050110821,0.013667331819361805,0.028378786774047204,0.04268035021937144,0.01770813203817495,0.035348902112883385,0.013818010566704675,0.0005471706441446123,0.022817620251544324,0.002641441252108967,0.011434226141623649,0.0196737884419822,0.006131582124354107,0.01519370807018533,0.028116568827735833,0.014335486415489984,0.028649612729288787,0.020360591198323563,0.025587394941748165,0.02131734821243919,0.006828102327349317,0.02667670301124908,0.005420938271404885,0.007049305395515848,0.03562357742999733,0.020949346113574685,0.03155654259124807,0.036700975920451906,0.028387096951678126,0.033809629486699855,0.007143399431533193,0.023817165331262102,0.0018200945397553459,0.007965419517051653,0.017387576554930062,0.018045389120951716,0.006207400502999338,0.007920129908999707,0.00018897733394257488,0.037701676491846914,0.029078469060436207,0.01964805638164613,0.009614021034746678,0.03681122755763838,0.008389134723834735,0.010130473142331065,0.02757559668395304,0.0019896078322749755,0.03080091411594571,0.005375476813099189,0.022424080355233356,0.0005644982511823771,0.013154226612850761,0.024118436810042554,0.02375640228680892,0.00704192002867543,0.017233496400863746,0.0011882159917729895,0.0352253063986257,0.03662711046441103,0.008505084416907116,0.008205391376607862,0.03228804759450332,0.005679457531857279,0.011606612103320146,0.009292771784392695,0.004769144105622958,0.009869224282201605,0.019147610233133217,0.02355619896287442,0.03768096181205799,0.03540791038399055,0.02559671417489784,0.035213432837005954,0.02396684446104469,0.011966300005227082,0.013984848820570439,0.02322630856353708,0.012202481866420034,0.002674743072079433,0.009962044217066202,0.011111116138297128,0.002612637260872075,0.010803118765055186,0.010703535866040892,0.04729994169927526,0.003931607217008581,0.009577730443587229,0.006556020118258177,0.015483957949763316,0.013436024427864346,0.04026107347843261,0.017402083991642947,0.030363852781687295,0.004897136359852672,0.020339760243729632,0.0247842558066923,0.005329133677608511,0.03523412009528809,0.02362619345630057,0.022721364981367898,0.0207438146664502,0.03566912734001387,0.012805099724779556,0.03673130687691134,0.036062036818700904,0.02336391348811606,0.010646584295973871,0.015711096135333558,0.02371041511742783,0.030279675640237147,0.02772373757570107,0.026163722475405216,0.026521810098334486,0.010597999341007303,0.01469879735109142,0.00261386658078544,0.005204839325002708,0.005298011780434597,0.028523787524838362,0.0013876934864141544,0.02209965832919536,0.025910228509186117,0.044632386932210666,0.03624522343935016,0.008318064655329527,0.021183825375657994,0.015498139285993418,0.009162376486780588,0.021335722630669685,0.002701767887937634,0.013573888206451501,0.03940962660656505,0.014104291712328021,0.029747696117025046,0.008817586289956492,0.03169463986770282,0.026956242062409375,0.025381525753937095,0.026792136931475974,0.00793131392311891,0.028342766675835518,0.007054421023093893,0.018031581981936606,0.013535141140758045,0.02301360240396183,0.022116323423325035,0.03126922499586682,0.019686098871133983,0.027220259440459027,0.0254982168036742,0.008227044587731436,0.002910213152369834,0.0023891273087482956,0.012006065602795435,0.03263852833417741,0.0027277272085643456,0.02515678326772125,0.02085123343464218,0.0082538613856869,0.007748941288370781,0.015897962785963726,0.006114834734171792,0.028828260001806494,0.010470871080333677,0.0007002251713362218,0.021342219268637164,0.0024031292629915213,0.007323073513737177,0.03000103974902274,0.016367869270200397,0.014405994521405452,0.017606869951803272,0.03147109797110287,0.001143726137699752,0.021126849655590696,0.046612531389442824,0.0038983215993195763,0.0035795909714463336,0.033490101909022685,0.03182628961304251,0.028158105696097835,0.03570708364814773,0.020600742773120184,0.023919259965198836,0.015651385759755276,0.019767344534503184,0.007363287368678473,0.007565675065472288,0.028694941959820974,0.017474078324181685,0.0274509681524443,0.047519534497763416,0.02190056326697143,0.019169972869215235,0.039559005068142195,0.017239657973508515,0.02013642361215423,0.050048881986560156,0.013579040390721553,0.013058065103605243],"x0":[39.098508154083156,47.76759800706656,49.07238702899595,3.6937083482060706,8.984150988995577,27.90188579582795,24.45877355139129,24.99152284504187,49.36759699249128,32.988372282079325,33.88642044605442,41.55623611663882,30.262072994190838,26.207542846727417,41.54691894843201,46.09439261021105,16.80301002831697,40.642681028183205,14.287900171265932,38.438877343768475,29.447056567212236,24.777543435760997,15.784343470086238,21.766910982571698,28.139903090661335,26.856793071749184,20.005843055494054,6.685352262689559,30.314093711495637,34.93841017444607,30.444685297575358,1.9669614848077166,28.76157362248868,46.51975379696482,19.117918371055108,7.786295270077892,14.731428927102785,49.76444779947974,44.30836603311285,5.5818312506703,41.4469670093585,17.024022142694385,36.12827013605987,16.080839569474403,8.952968054974598,23.43756266256124,34.60894349133028,48.679409800111294,32.22848104864019,22.605435200475775,6.072457408890952,40.15358452317109,12.768648777971048,40.24053722421501,24.66625782948678,45.85252569119817,42.373546091888755,11.817572895883089,8.89278133443655,12.471462918949406,1.3698112087526804,8.77628724281757,7.997017841891774,7.996528209242637,24.646888366523733,7.2295723541672015,15.4494605860802,37.157201016321274,44.56676626454604,26.345512370611168,30.535159241096633,35.58206403285759,33.3273677562957,44.76883928263167,47.15893949052031,30.783298368735,38.67366082280721,34.938309860679375,8.047926677788775,18.802123697434137,45.93348304668313,34.810791332212396,32.47113100818109,9.034868584324151,16.974673566878728,13.749201203592776,15.888952690463487,35.72672633450158,49.48247192276518,47.32793081138429,8.175944138459768,20.13628395100643,20.572103331158697,12.15456353482951,18.742193899731717,40.89102577912378,36.9073449504336,3.376776703363371,22.137482958366796,38.48344181403078,11.958762577648285,4.211471129929711,37.66606680926301,7.1604649553311805,20.519368061116026,10.385321630197042,5.973331131472149,48.692257266974856,48.55162374754352,22.585526485571194,45.486692374956405,36.09262756947312,43.947829835787964,13.776005387258738,0.8769778685240426,43.088837439389295,20.153287399427278,11.148685377855605,33.03832108495869,49.843791384269196,39.655085408631926,32.137155455115085,10.196768358918519,27.12883198782755,22.69112842638126,14.575092561061542,20.378280806034844,33.82632529355762,18.678823316447247,30.51652317038679,5.278473520929905,46.32764585725815,25.010952747332794,23.121243543275515,21.02591886301607,36.13794802831668,48.066690368009105,40.43456093123221,20.141886211724234,2.5343298791924096,16.408046018799638,40.34835375004076,30.558995443437876,37.07795806157874,25.710239752783316,39.37660435931354,33.702903346132715,27.09913890349006,9.857977709052834,16.13070862966647,30.014549569378733,44.58749002933216,37.047151400615654,38.79607516804394,46.23253612660544,31.962240688062227,8.331636895438255,36.25602875543863,4.5106136290260945,24.775238349408646,35.12261312265132,1.4621239908586214,23.58922168673453,32.7757394559694,43.15571181935955,23.231355406896704,29.72907666490624,9.396529501359375,25.734664012189402,6.066893973891386,34.22592354905611,27.434137956240832,28.584211531601355,41.61574786232257,30.766483874065475,39.48526689283168,13.354590071298777,22.50316318866409,28.805107776783256,49.57450671487565,35.100222571185256,34.07385623058278,1.7089859420501785,49.85457935291002,43.6693469760695,21.801542820868967,36.01894946231666,14.985299432534383,9.406787915332316,30.467268579520066,34.46746840534707,26.740778695473843,45.33668335583195,33.48971621753133,26.448456671585497,42.62224908671699,19.3515387413425,23.786312105911,15.67930399716504,23.87794245745133,19.505587718566318,1.098475803812382,43.39124761619312,34.44466984411745,3.2430349942949466,7.921304789715444,45.866619831660216,33.530558503004926,30.401229331379408,24.194487396874376,26.309621641508972,45.2106942062823,11.009977264671777,9.780555171216744,25.212925615417447,1.6710983953077574,24.22456968696092,3.669756676406566,49.046659226705536,7.718127110392869,42.64048547489122,3.1920557386215798,27.45275831571462,15.678402756944653,45.32392680248041,32.94654316568604,34.45404365063225,21.96608563443566,19.461438787458807,45.518192013277904,25.08885945584616,41.37340058546527,35.11787063219195,32.52870249964065,10.222573643399224,6.006815368900542,1.7972847775816092,1.5776458429550333,19.187493676695244,39.649378439073224,31.518783990089496,46.65959008930612,2.315352934633952,12.299977344931811,4.2602176371489,5.33799305707986,10.348048212632966,12.723295440457417,13.154990136032186,0.17572451876589623,31.000483252972778,7.336021187725028,2.8739924597123823,33.80420665654087,10.383735256705362,33.22410190505918,10.976873221073935,45.56676517400702,9.109963625819539,11.935806197690301,35.27202665708725,35.54721358791012,36.9718716919281,23.775284677152484,13.383213965462392,7.560257377958135,12.264135402054366,48.952638887262545,44.703897405422545,8.859550532135497,32.705612900707415,44.95304984735326,35.41093895656684,14.486681799993795,17.55489894306971,35.06830211316188,46.35874143332489,11.554600251819592,10.579465054665816,38.24558594069282,18.01822067452329,3.5773289678018405,39.223792677642855,20.9005811633591,20.19819214203841,8.768945482807112,49.37967562382666,29.706775435087106,7.153731093391203,2.258961250574476,30.126409530855792,36.37221757305845,10.141941711984048,40.12755603497025,13.975043853495794,46.77559615068271,2.781778862316908,1.4692844619406231,25.16771064168476,19.037008339129137,23.084120011180765,27.059448260745768,24.362899321325294,3.6994345106572957,42.967806948955264,45.5956116199002,22.38464834298882,23.95385285123034,45.01896582511773,0.4180714342311931,47.02715077341566,16.725798141546655,11.944692766784526,31.124068290207717,2.3488702915137827,22.48451908151314,36.103258909582735,21.567932373282684,6.287140792153867,27.15371166246343,23.257034492077644,17.60094076958374,27.69019739066081,10.485237351362553,0.6475933934847911,18.34593612828308,46.34061639578562,12.25730623825967,44.40571582295411,21.831708806939744,4.592494406291192,28.99278656875255,23.322762801513463,17.919062978504886,27.25434576908896,46.78352851366143,3.0776689219718434,48.54527627480925,43.73912474721714,44.833440485271346,31.227485965733337,41.591317746863034,4.164487678168194,46.9974834252464,32.81848320633518,24.798088526793638,41.35044230075644,7.457663211282561,6.36771686626445,43.76218554223426,49.95741517877772,21.905609943395653,26.24494886428733,34.522836419854805,31.485755484055446,29.594140984712737,45.77329669462765,20.986756684009734,32.596886015983614,9.216119109067733,46.074743561959345,49.70044249127463,41.277198810928695,46.18365261155757,3.1650792573804654,7.082203317100899,40.00455769749629,43.14083813188413,26.640300728053123,5.161938195679882,35.12478834714613,15.338478664569323,23.650109440871702,32.38260712093638,1.4947852639205061,45.756424750754555,49.55866890700151,22.854840845406553,44.25684545811593,17.52790581581455,2.0705883501310973,30.916622003153236,35.31635741123649,22.017206210373562,16.68372982056212,0.7284114444735423,42.98104224407434,49.30217406416945,17.721717457595865,20.417071106878847,2.913019049561616,38.13800417538316,38.48629274692064,20.944150233486937,38.35124336923451,41.59020535194657,8.663090693268439,34.23188334510966,26.61458951174923,11.775658701492752,27.29425601676585,47.01406948013533,3.5126872928748387,32.047628976881384,43.24197424477377,6.227899992299546,36.829863371417126,29.69137390222546,32.74439716783145,4.925042442367989,27.717378876096298,0.8026797243411155,46.25157553798152,45.167994020821986,40.77151498631927,22.51972197707206,48.65228012889382,15.977293044541485,0.0740349151827635,35.702895308024985,0.5317937183016763,4.904964478916618,47.29315576917092,4.440946147013913,9.17854574426249,38.95552050174226,43.31813594842691,8.04124816115105,42.29820825588257,17.010649007835198,35.56762949234822,47.879434341592244,42.96600875119646,28.03996252533517,0.1936366683604973,48.52050018150462,15.443476875541329,14.980469529789953,29.82618826125193,14.858424125990366,24.478288095910617,28.742737542981487,37.397150933951885,7.580872408800133,35.59247115526395,19.94543920537003,17.31984941599687,22.218857029355554,42.13500671821948,26.575672416269068,12.1741719929919,7.287928899263396,19.63437842257204,10.98917345564031,21.230241044948393,6.831792749688703,12.820443902759216,41.61966827252901,45.161545534187574,9.450059985905678,26.13397388128561,22.14311605214916,47.27346004241383,20.716919027356727,10.503199867547263,32.296027368882754,48.322263760831454,12.52163177843083,39.478358308959216,34.824858621357734,14.703689301889266,14.188736614275953,24.787121187642203,36.563247266955656,41.676446038036,22.46460411851349,4.779908527583521,44.35595273841224,15.440539393250063,2.009080863932333,46.75480020507826,21.396370139354616,17.505313620317676,11.084949602847171,13.837329227018124,9.271777102226098,14.09847005289956,9.035064418537786,26.74449233295011,38.72691408359997,32.39407018662441,22.005158780144697,46.3365988246317,40.237636652256434,3.585693667668377,42.638490574601576,20.775986454317408,37.32297886009094,14.330400868044958,25.571348318792865,17.101184593767137,1.6760317168211691,32.70313710492252,13.966176328767599,3.3135719236146666,5.9332100677429995,13.360416746589143,30.295593822418752,20.58976145153204,27.57923887356315,38.901021239834265,38.142038999307225,13.960297474842987,28.817235416676112,14.113165732084154,24.421696618387024,18.214709691348617,8.91988497825148,0.8107643021553645,1.653055541041093,46.33432516049068,41.22358369099843,26.447683387957543,35.637069000274536,11.959021358822863,13.503659702319537,35.44936865481618,49.564843001073356,40.43573244675345,45.64160650898814,47.8190267910019,5.272979289753977,22.20813293304128,45.514582000985506,24.928613210197305,5.4171086934247,33.67566143367364,35.374332349424535,41.65059540910503,24.499627916614074,23.89095486487818,19.143565477300562,31.524460588489656,2.1511712467706334,14.510178574288524,21.4206912544913,14.837199402281243,23.144603449210432,47.883539797856464,12.40608417819029,5.937423307448397,17.11455419568477,9.910497017343856,40.490022321781616,11.042003865030559,28.539796510409175,29.464579645987953,19.417429818330078,10.404711492626495,23.451615403054383,44.843060339066824,11.280237226297773,39.00360561587548,30.506890947142885,18.422996574237438,23.6118508490483,5.664833036570327,28.383209716291237,24.683234037960755,6.08972556060825,40.16655468673238,37.11798428463394,24.229699600294698,10.619856373760328,28.34276401270572,9.260533691235718,5.739979198154699,9.728346860171333,39.90854464011129,37.73304830484724,26.481362563473667,46.1121547424089,2.676857484235662,38.40341461827912,2.962352961375969,34.18693813301586,11.966097606734182,43.11872283452702,18.302534529445847,43.41810322689747,43.09009652299085,42.998352172200306,46.4795062186365,9.472152946080126,20.253864823303847,15.104186922165175,20.362778691047,14.336392372362749,29.043089056231285,45.63739806073986,45.47906620265862,34.266124548181466,37.51049470783821,48.68768641414135,8.994910732078898,45.20019779479,19.64111213775871,0.08123565462130333,4.27703561023256,0.5803667082582842,5.562889112896863,20.796643634997093,29.5195049188409,29.60814010174352,24.89630153703445,49.670878276166306,1.4026043295971569,13.852165218519385,11.2033166382267,15.503613770802115,42.152744726547894,30.246207518488532,26.416031521808247,25.386059465818356,26.14444893536758,22.897658553071153,34.46681654101871,11.493356944957478,31.27823914842274,37.179536825591256,39.97174512891508,27.618919478671522,46.55619027556084,33.86398643481719,33.655155872961785,20.6377988369028,39.40969681779731,27.79976083343606,28.102964103545382,19.789265769041187,29.155678279176822,36.49337192162781,31.344277717121116,1.2586850146753203,25.22548218389966,45.345863944618216,8.321029886065478,3.4050496894915128,16.333634603040803,21.065747232722178,39.35776218024954,15.555314918573071,36.37234966291698,8.655239207113496,6.283089575321332,34.038594855410956,24.32855883596652,6.983076182261538,44.12139859399332,17.4087489402482,6.214263259224517,2.879798557091051,23.7952899751545,15.09541436353452,10.349058924882248,37.636210012598404,4.321905110325785,21.382756538884273,35.14741335867326,36.03453367679519,17.302513376038174,11.102539393701317,31.607448318935017,27.611082138204,10.753754803149818,2.944181897259035,6.034192910906611,26.175323908214267,0.716804402370419,22.74970146845462,31.64331303600808,6.134335819565839,25.713351384105167,46.49754125253277,47.70416711723979,41.90229089738893,33.85224168078745,42.98911168510173,32.026610860869745,45.56723564099594,36.69271724882097,17.339030650923092,15.3977062546932,27.84329138664219,4.16546605118352,44.032418868742106,41.283920363366775,20.16347678660927,6.760922782625989,28.52520487259912,8.21465627496969,27.210519049857908,33.305831417241414,49.61052621481924,25.5542078050643,45.41590258332066,1.8683084525320082,15.215482673770154,12.325280361221047,28.77534468942684,43.96771897905373,25.556309694340374,20.181855743229082,7.3129533557774735,10.096664470462324,36.670431069863405,44.408732913180856,31.132814559915033,37.63848208963804,14.119731701018601,6.20709764686127,7.985883086706858,10.729674350973283,7.284131960144125,27.954961059364493,23.844203073247893,22.16898916182576,32.80373345635006,7.435380985243012,28.371567741568594,6.095118119666198,35.506715880892855,42.23097165600731,5.3550100162676255,43.84144201872052,23.94743655658481,13.610467790400993,1.5468465942797716,0.08571480045695967,4.250398006033274,35.26746547623299,16.514794993383752,28.009208953303645,11.154324636078993,38.91864368508371,32.439715957265925,21.02126569775511,24.11632304249395,20.08028957036273,19.160652107752274,10.360362508385867,37.659793137262184,48.742483438171305,4.958471888722427,23.17240018319423,0.12092116929682817,15.096794584722883,43.15014117768969,15.754066972712778,44.53599344828994,11.794310262124974,1.6654770475704406,2.6104455130073423,22.019320180301495,11.43185207257721,32.393184006113486,31.38307117466377,2.049219591844864,39.29517433598726,20.103632914947266,4.822360701225714,46.11452064198588,17.022251680350287,48.36053104429195,49.16695594986612,39.27736874559529,26.10064324327076,44.65260007988703,37.70333760606128,49.44349492667992,12.177721882751635,18.507845517630884,35.41963960207263,36.19746103005597,1.6381718397658895,5.6652178931869575,8.330241670230087,30.543116846697917,22.496076088054718,37.35669689298914,4.005270504157177,11.83469992377325,2.8213344218821934,31.615438725791776,30.532436455143408,34.87379338870821,6.3019113779175235,14.76433479383006,14.727974820265622,43.50978480001686,28.693495826254534,18.96009136319168,22.97926952398994,8.17687959619593,20.406132093391726,31.88832553443589,20.2196036956664,31.56777820572524,21.259570809332107,37.70692124268857,12.723083780082945,13.040096862665163,6.000332162736422,41.881079449917,0.08752270947781637,0.3284061212638023,43.797217775190134,44.17739523481242,47.8761113126063,31.27241116878452,18.658404467246058,27.579766091916625,4.051845814317434,2.676819531063024,29.514627791515313,17.956934811704382,18.25148907719969,4.338743115253507,7.860394006193195,3.053335138595581,33.12923960965387,38.35403762563408,34.802513372949704,11.046462250475397,37.88366474432113,19.642510680858315,38.22014689769722,31.01247375667914,1.780730339786285,44.84856593499944,42.83249555949865,21.004733664683716,37.38550956909843,42.04065328192472,26.293994090097893,47.187105473073906,46.91246404636139,10.013649181272633,9.976863380685908,26.960677566635972,40.24530451400945,31.152223128284717,3.4696525339746986,38.302375391559465,14.200827188842624,32.12992867868921,44.65083580711002,19.96373546971618,29.18214405436871,24.942280310567845,35.8706909399904,14.557727881957428,7.7572699070504125,44.85978703807597,35.77368120720945,48.5954102344787,10.914254285437696,25.091067580344774,43.214970636752945,9.338299649349235,28.6313030762132,23.93540219877113,10.620566421150956,48.6483800717076,13.827756173385819,9.483561299475218,17.426626125550804,15.133667153023078,49.20145941567865,2.5281107316728724,42.19749777763538,27.40910811056143,23.320474375101487,33.14070272832053,21.108041735055682,3.9080903929658573,15.035126465303728,17.72763794835025,15.101600896799216,48.7542162290844,25.288242726169074,48.2953616716941,42.2087542455706,14.651331467965633,1.3051236834727309,17.659683054438158,9.552602565106804,29.76502162690039,23.58366180006397,40.78624300043919,34.08043568045503,0.9192652191219564,20.08685215360906,6.29163721033178,7.044358138184615,41.97137572489279,34.873351934735,15.22662610408071,45.32456608532247,28.066038170746854,36.17601092967788,46.92934561444579,27.677251456574247,46.730552344840184,43.52127444785552,36.030771185227714,26.07795432564216,36.91607606901209,34.69806861469418,42.48367611010888,41.98013457525225,4.95521976032296,1.8850990229728803,10.866073988287772,11.216163668702572,32.55698639519131,7.738101410658372,29.098579045222074,39.83975731815881,48.065816711982,25.60940780033797,27.878825802381634,33.435764814798716,10.193937579036605,9.86657404561031,0.2889991862381813,10.66248989982368,5.5961824226085195,12.08770872946462,35.85279875445162,4.598146063092434,0.07265437968790867,5.064566674881865,23.52173387786458,34.19787457812431,28.102383640505945,29.50993846464329,8.073882138278254,26.305363274274985,11.961660802557683,40.76303147935077,5.762765469831599,44.147153476577486,32.56574074511636,2.980242420649648,20.58027376841107,43.27450480037937,38.218121433839514,49.776260616879775,33.587766427552154,2.556761198496982,44.218113392353196,39.2453368700328,26.82333712665015,18.19288799249268,23.885159635335118,32.33436150783321,13.355381547083756,16.786239463899044,6.221128679228483,33.213046217206056,37.644323979383756,29.75630683374647,5.831069051681381,32.573325517320725,20.66221488926948,29.95677483349677,27.274229611369073,39.35651887995591,13.423678805554228,38.24477704454444,6.768267741103495,29.911254225815796,25.350908436644282,20.3664864903353,44.92529831134979,35.62393432709505,17.73759655288486,35.97133080415422,1.1481545575753649,13.608126224849126,10.325724522679035,12.882545001525159,26.655185478029775,33.4114596090066,42.65762346589295,41.85910945011029,13.929148757584608,38.8410714725596,24.799262807743027],"x":[-131.7003800501482,-144.94612102679469,-191.5450778898095,-150.26332476866722,-175.54852733680494,-145.70273207701845,-182.91022959526197,-137.5643202788271,-121.3082355935916,-108.86422372220687,-188.7512516060714,-115.46465371004568,-133.21103338761586,-180.82806167004742,-187.40565507105836,-132.09239580651268,-160.450960296779,-157.35241768316925,-150.75959746357205,-152.3389739011186,-194.44529796469757,-161.69100492774604,-117.63613206511172,-196.0694482783427,-106.51201630590678,-143.40411937577008,-120.48439979244161,-151.66377162695187,-102.91453685880505,-165.8478130244136,-179.17346391899724,-103.24541789896597,-192.0488100529434,-160.19932885501782,-146.92504369041103,-141.82221088871117,-103.27424304455965,-154.545797707825,-149.14939002154009,-154.0243758606549,-139.96354668194965,-127.27705487959426,-149.38320610771535,-167.1321237727115,-112.83640813304547,-147.6420459415196,-174.95171170606608,-178.65643975931118,-101.5481367225285,-121.94301203582967,-103.28554483074663,-186.10867183834458,-141.58629280134085,-164.58900464940595,-154.60239832814392,-186.99392317152586,-168.39645915309418,-157.63189320365765,-160.39862349216185,-109.11090026180726,-145.53008312552257,-197.9356221258951,-198.24888069202123,-144.05238302393772,-184.7836350992472,-154.12015123217571,-158.49833428800275,-128.68670418003182,-116.94318060787204,-154.96121662469028,-156.5512934867878,-154.5177793520313,-199.6646231164976,-113.41460574643475,-150.7853705473466,-143.60521108172136,-156.4158030496872,-139.86129234080659,-113.6707423506464,-147.3763740295475,-176.3439312597846,-164.89761547959534,-196.58396710459428,-186.2387206348654,-147.6090699898238,-171.9863736522768,-185.8305195158529,-153.79252294095267,-114.75525216826166,-146.71800028713898,-164.39336119890487,-169.09777547873966,-183.9902165885509,-144.55207529013268,-132.58876102639198,-134.43727935187601,-109.9105196105083,-124.77919642950768,-150.17558436515748,-113.7868665566155,-138.24328660054402,-109.49466463886219,-197.72712815848283,-182.083342630669,-188.01070270765462,-176.91844527479276,-174.24504276121428,-188.53937147577744,-176.45547864310387,-168.59802241076738,-190.41149751942555,-119.83433913721517,-144.0647387710286,-110.20438325514334,-164.34199572733823,-142.15161048338211,-180.63376736987271,-133.75220655882143,-127.22118210546583,-138.7550799038372,-177.7735907031095,-139.18992796346294,-130.27599868398244,-115.955316119225,-160.1760279777222,-128.97252286218998,-178.89534442645515,-193.6006196557439,-164.66161544444475,-192.0477105171645,-176.94708225297126,-159.59450350251302,-106.39389589074221,-126.55612038611872,-117.59474106229963,-189.9901305282445,-192.030649634119,-181.37607132806153,-108.8271984507434,-122.35878210017721,-126.98092472325766,-156.44000853559004,-195.438880174915,-174.35837111092118,-151.3452422878169,-148.72703367970126,-108.93648179057216,-194.91242179141523,-133.19605398954675,-120.42149876856314,-194.31309460920176,-158.67165676637495,-102.21453400155825,-119.61683139668453,-111.64988764859729,-193.6612212522303,-122.35875557300868,-180.14921191840622,-140.8340618861427,-113.06570545168506,-151.1418506456547,-107.0135349632611,-158.75051969637911,-182.388193498627,-192.67337289325835,-104.90615846992242,-166.634207434834,-172.10059364815632,-144.33700812606108,-118.66516854716775,-168.89271745373108,-154.86363633249985,-187.11419599854472,-199.9531711971809,-180.88968858940655,-164.7060222215292,-131.41217009298776,-180.39774156847494,-113.72683494070183,-127.14803201833989,-124.93107629073614,-102.55007185683202,-186.2331671459715,-139.766118848322,-131.95181023301825,-182.15173103954908,-141.06898580984125,-126.27860697127207,-167.99639052087088,-159.29529594633223,-165.0373087580664,-100.86302145462412,-186.76192903243006,-110.05693072088829,-149.157902689609,-199.27596794141823,-106.3470137437478,-167.7028994153237,-130.57165603749831,-194.95178469061185,-109.06799815046526,-188.8538225755274,-101.46682443900286,-126.56457442520662,-192.6050129601246,-158.98153447497356,-133.64803212467615,-176.87670386839181,-134.19899067518145,-124.35864857304657,-184.98070473195344,-173.50923568454849,-197.6737923939514,-124.82545484228562,-137.05927357840625,-147.81655508010707,-177.15610133506942,-146.68562526860546,-132.74416883946344,-127.38615904606621,-118.73096119578415,-121.23941076454545,-134.6207847265834,-136.809468253969,-152.76452810185896,-151.71480827106524,-172.93508188317676,-135.1150696910433,-100.98684089014381,-150.916392302029,-198.17429114291957,-110.44164304914712,-199.2355849701664,-189.59688006228419,-107.92485825331369,-137.02997262607101,-165.9702936880894,-123.22887285452542,-103.90298781838796,-147.81581574458073,-149.30074712661425,-176.32366296010926,-184.78006429144898,-196.566214457813,-104.82203798103708,-186.18601037253137,-179.50759031739875,-183.56048569805492,-177.28974514871638,-163.5859294578383,-189.62588175511215,-100.11071553764077,-188.38070543135706,-191.10070955773543,-101.02443511793405,-160.49075977533988,-192.916094087037,-165.87572481333683,-190.9056082418735,-157.97952978936485,-105.9342693523789,-125.79783982361926,-105.1151663405711,-127.13386778462525,-125.68757706827208,-151.05186599874838,-187.54860960783935,-100.85405262611302,-174.9805867638169,-186.05939562257728,-144.28373550574253,-150.47724673650387,-151.2995467050072,-110.20737265821982,-179.44626098663267,-144.5730755162438,-142.76724851295012,-143.61188347871533,-186.37350085253235,-183.65282164279967,-180.11009232350395,-109.00179213854437,-112.16710049705614,-175.04740990698372,-187.0478672905483,-167.70038871532034,-166.60560775391002,-194.4168293028982,-147.70093883916775,-185.15363368550655,-125.8670535069558,-155.5925826977446,-160.4366342817649,-112.37830051514146,-147.45517206806028,-171.3886466821471,-189.45287448872102,-113.93604918142326,-148.6642432068594,-141.49167739248801,-160.84858494932715,-114.89937449177789,-132.51860902634002,-133.05688811972416,-150.9630406239936,-180.96450311950443,-184.72833499997742,-100.77696208229253,-139.35456627826875,-146.3761020907358,-142.75390868225946,-187.41404927375467,-149.32853105665995,-128.85286944309905,-127.30772016679357,-122.85453517320042,-138.0520196520514,-182.71803945151905,-106.63563437626631,-192.49645418359805,-152.71459846720222,-110.50895812441537,-193.23950397783767,-157.87270034242277,-147.5984373517236,-136.51898843449712,-123.1583390127583,-100.99966512662823,-148.96448081031355,-120.70508848128306,-119.18364439820881,-140.01082816150637,-114.00212708183268,-154.21270259558148,-149.87245608390327,-172.69929124324295,-157.7115060673941,-195.19324406522657,-170.4249559782543,-127.13512798031901,-108.01892723356828,-185.86793662122582,-171.9245590343649,-139.96672119672422,-176.80668899483888,-138.7212920905573,-128.6078645408325,-165.24778671723948,-198.03545516116137,-154.94839468408014,-156.77116290885684,-140.53441953541463,-175.78779592934492,-183.18100697981114,-151.75988137938646,-105.58522636880762,-195.14258373551016,-133.44463384951794,-172.4797517779999,-178.75691660553426,-177.05196611104873,-161.1955715266838,-153.28066607781489,-120.92835521678444,-139.15398540108023,-126.84151693176646,-127.89378892678774,-145.78835024391807,-142.3079995052093,-143.6643206674497,-142.09164680103763,-153.0817268985466,-151.17666448365264,-160.23820508102497,-159.83981959075763,-187.117120911678,-139.662687184768,-194.11532422295926,-191.7815418919191,-108.90941104222354,-166.1663309988129,-174.32377915606102,-119.36902913976117,-128.95217060587356,-111.91782920862838,-149.7899677237853,-141.10521812604284,-181.87925545908783,-107.47333123896456,-150.0935784447769,-177.29773138545983,-195.13465580047998,-168.49666667583728,-121.03165040912187,-132.2044010053745,-167.12239242379914,-191.42647311683518,-108.13602365133342,-162.35300742711206,-152.03865419459922,-117.16983399709729,-141.83042171205489,-155.8758423509144,-193.45988018319983,-154.52537541282646,-157.8225471814185,-119.76532443415427,-135.15746681557718,-171.14291368532767,-106.36228674518004,-128.9268378560513,-162.8546996055338,-105.44466337579144,-149.45769355953493,-128.63381505238783,-173.9263907031132,-192.18196637906811,-107.55663742266823,-115.01296547477715,-187.50422281082706,-119.49839734421562,-161.99297487327217,-183.07940789542855,-197.13028444836155,-174.2133853171761,-186.18483296686793,-195.05127793581926,-172.2694016424885,-129.83578923461093,-148.28910159033765,-186.11673210632262,-104.03646403889668,-164.51155450603267,-131.25653453779714,-145.28293129917938,-154.51473986915678,-189.91637271910758,-172.55457633468072,-165.18038808519066,-105.75065495897462,-182.00720591986192,-168.6260626425104,-188.77376735526278,-177.71241886809983,-147.73525287588086,-191.9193351111312,-153.6551683222892,-183.5589017428315,-189.9244582191885,-120.64943369480596,-126.04147097567862,-156.61338166891798,-150.0980501018668,-168.70232075796548,-114.09199460442447,-158.0346750895204,-112.67750890267381,-199.39142155555317,-185.53997259563275,-198.66444838986504,-162.3672938085312,-181.20410122118585,-131.45321493032577,-129.21206043583862,-118.60934767633992,-120.32989340583875,-104.68115203599129,-173.18097672053275,-178.04447623528347,-179.731337618576,-148.45682105970957,-163.76930772600537,-175.47772428662626,-115.46407790581834,-175.1065925050164,-119.00503632225907,-104.25112721083364,-134.10618143232705,-121.94571575592768,-137.27014589635826,-154.40330411537067,-160.4980207959088,-186.3495500846202,-160.86342009638264,-151.14664820293092,-189.4604187732659,-181.9648608885415,-194.5544144755454,-184.83656457390302,-197.12783926229972,-152.35198734979187,-196.0055783487291,-187.12452479332848,-124.9504478923396,-132.02688669253624,-179.25017158355013,-119.51479182601916,-106.73259937523238,-147.65868850343196,-186.28946545748465,-162.4798935610326,-116.56524225662987,-175.4097898000214,-157.44409494980857,-198.3825794913076,-139.3727783762267,-146.15338571937974,-123.66657740864535,-141.8690175814858,-164.47046201058896,-119.06009294423842,-170.06477236389597,-191.03071952663166,-138.52781912172316,-170.1285614556381,-150.2926497746575,-149.739385584481,-179.99628468589643,-123.90810079346986,-112.55756889342801,-163.62726274078685,-167.38717149590474,-154.41996113234205,-107.06212492370358,-102.55319954067757,-151.52139246472154,-168.80999646458457,-137.92325686666948,-126.37409875441598,-134.49911815188042,-189.67732440698865,-165.10036482098945,-174.58622388042173,-109.69716411720091,-147.8490353856187,-123.98498010689308,-108.50821829653073,-164.82937270833787,-187.7998455418526,-107.54943192675846,-159.808810910492,-181.99849106416528,-148.50914071357482,-152.82803846133123,-136.28339974281565,-187.6998604486916,-142.62386539208515,-154.80305685023336,-182.9893485577732,-164.31385127600902,-156.8052241949563,-115.56741547881617,-147.2084427092592,-103.9214267056388,-125.43279715836329,-128.41095026885054,-157.2270918188087,-140.9874732419392,-114.71022458570692,-113.37217846801497,-191.03245640973626,-194.17712655791163,-170.18104813958684,-144.2698667493692,-191.66754246094578,-101.07717321526148,-155.61550818471198,-197.01671620757537,-156.9054310878995,-187.20555280903693,-179.13545479864024,-186.91942031798055,-191.97191909631368,-176.219681751365,-105.9791739888151,-107.51415762646968,-150.00769086949438,-160.2050363101928,-167.25768062092453,-136.61763935198232,-145.37870881221872,-110.98974780103501,-135.57866371970619,-155.38063976163164,-128.77297071061173,-121.47799920791502,-141.23940273108215,-183.92873641485818,-128.89037825061874,-186.49622810794392,-140.24412310722207,-138.69191940597756,-167.77332576809823,-156.77872196982293,-187.41550868970853,-105.7887915951313,-101.25695246317323,-100.09836031394308,-165.93372418394063,-167.55147600834144,-198.0722967312269,-196.07396119815962,-147.97773159634633,-191.29488586074282,-127.38428588598578,-110.70751494980875,-160.71459057388046,-166.422077895545,-167.97855954788406,-142.58900202173578,-127.42378487662458,-126.15065312656044,-168.3649049033019,-126.18217315471689,-113.80251857876196,-163.77144499804305,-150.28211004079847,-103.64609928480431,-167.91749229255754,-108.08079462225824,-155.89342058642188,-198.62291935696632,-101.65593111839554,-186.2526805680136,-173.53135074153207,-183.90679930485516,-120.69792030686088,-152.1487178701355,-162.74316486011136,-154.6703842905349,-138.0107834451546,-119.01949206185567,-193.36807693994987,-183.75927809408836,-124.38530246642013,-105.30251479548357,-175.3009894787275,-169.71523461278642,-141.4550522125192,-168.06896058423638,-107.77922519009941,-122.48659163964462,-189.31184331238057,-129.8813256924168,-132.35363608551458,-198.39761354648581,-147.0416869912671,-155.5400257289903,-180.52457396803322,-172.14893870824483,-127.31893696811072,-133.05883301052364,-141.38091114653793,-113.95743082771781,-104.10129839189818,-111.50573328991761,-101.10880749200028,-105.69756886690318,-126.19039172698656,-148.47452170852685,-155.61699435815376,-154.2265007897871,-156.1487557798306,-121.4982861321193,-176.52165092528833,-161.8568140209891,-138.00592908267836,-127.91293090349289,-163.4887751879452,-102.37380213888237,-106.38584998547773,-111.52735049501827,-111.71341589244533,-167.3740393782598,-175.2843074792812,-182.8387540156093,-105.51282217380707,-112.83444707329838,-133.03738916372095,-149.2055948283928,-180.23277702099253,-185.93816696074458,-134.5127668039362,-127.05975996649133,-121.22949295341996,-165.0310274977389,-164.28093261164798,-117.9454080251696,-133.91893304954482,-153.4619764963926,-108.21722703753105,-116.91065259733868,-197.22090377030622,-152.43758291901733,-133.1157389484856,-168.55841048225727,-198.14829553953095,-135.4754128926964,-176.20436444521397,-140.37679685230373,-117.39312689654156,-101.0047576947397,-181.08008966144976,-146.7341926396811,-128.05030375581242,-132.89837588794884,-167.79949638546208,-185.94078352261027,-124.018266713175,-135.01778274255793,-114.89884251801672,-181.01497993542534,-103.57770803891096,-174.60849249511708,-140.64729170108328,-127.1364760924034,-120.19510516276752,-168.1193304889947,-189.24740202216947,-133.38928141721658,-160.6824583119655,-123.32903040798966,-153.6668462936141,-123.8431567002792,-119.08374181979309,-161.10132056675332,-163.47749268604542,-116.70944182337179,-107.1534356029328,-196.9648059398696,-129.9352501938937,-194.51485016751076,-163.4058827261503,-105.61309857064516,-170.94595953993658,-110.04925047601193,-162.9500538964503,-104.09309783971818,-182.7506597724497,-106.9264280325664,-117.01629391119555,-121.40429395229604,-146.81116104367305,-138.76595973127627,-137.88602894725986,-121.77419953486873,-168.4221925729117,-151.0546077355292,-161.8990487549483,-118.96854658788727,-125.39855177484283,-189.41726242549055,-124.39980292475454,-152.59379167654757,-137.4261981289718,-187.2958426154041,-158.37892884356106,-142.16199569912754,-145.0577363489811,-163.6223326078915,-182.72574933342275,-177.61633585836728,-190.08337475167062,-137.886870079441,-194.45724364141327,-165.05580276983792,-144.3455108650514,-176.31224463342681,-177.830879035681,-123.98091157607773,-139.1719003478862,-168.72824589134638,-168.4022791677367,-124.28518767039678,-102.83469751107104,-153.09789094951145,-181.85436526338952,-121.03309918822333,-196.70551094931915,-184.59543067469005,-142.42525769992142,-158.88948126059418,-198.47774164383,-165.7327250840911,-151.15829089986875,-131.51368785955606,-187.56444321901913,-133.45052148709368,-101.96977440713404,-192.3791413509516,-136.50524801643522,-199.23621355199117,-180.3193156054778,-187.16146577713204,-120.18858017993503,-169.15025511421518,-189.44033140219182,-129.40024891220003,-185.81489310042915,-156.2730506782739,-153.57137902014634,-116.30058538547352,-117.10443095757117,-101.282854102063,-156.5916632058333,-193.6396642154467,-199.1976050885907,-168.47881982251977,-167.42631023654133,-190.1281645925027,-188.09560631921642,-199.1552292444618,-106.53100589549078,-144.70525950433208,-149.49439070068487,-150.65726949846882,-174.00693388271256,-141.34146236114796,-178.60338495568658,-164.73805465725275,-124.03556996896938,-167.647093126468,-185.68095368462565,-138.8939602465864,-191.90009968025913,-151.83239764147987,-141.91738382094883,-188.4319035057941,-127.62271257306588,-166.52769995738353,-176.4209284885732,-109.8193949348097,-194.61680307378592,-184.29076834569537,-104.77471845622395,-194.9560297058506,-136.83509212704314,-164.96911986015644,-158.69933279997696,-171.0250625347439,-132.7167767950582,-178.01733100488403,-113.8787928072295,-131.65121158120039,-106.95518932658442,-173.28583319304403,-164.18984883544138,-159.38170748719062,-185.55134996499436,-163.05775608855265,-192.70430714715417,-192.7998679093368,-174.88249746671542,-117.38429902313545,-168.6994750083463,-107.46388522417926,-178.4998978063221,-114.44839858061171,-105.06669217376987,-145.37914696895362,-104.89936525814763,-176.13829485759794,-128.6321104679241,-171.6763947606207,-199.73534652400272,-198.07140402283954,-157.7700104343064,-142.5942066129734,-102.87457139988061,-112.74709187671613,-146.86703791399822,-108.41318076591449,-121.99653313786327,-155.3327982309679,-189.88648173091445,-194.6743126549532,-151.08498153256667,-183.02427586666641,-193.32897835593806,-116.39646269302789,-135.93054083779876,-191.66589791859627,-173.49396212658996,-197.95514633460536,-100.67602752528285,-148.366491240808,-109.59965363181558,-192.1156859583843,-103.36411083350512,-162.47678542081175,-127.23723012536836,-185.802645206454,-139.5590373231912,-166.95506428598307,-138.88244821343073,-189.79557471898946,-176.47323364299373,-113.0923269639585,-185.8264969411573,-188.79033662142854,-183.15932326108313,-137.05663835370314,-179.22004483810042,-165.6136685899961,-151.0739587843983,-180.7445692524924,-193.70247492203174,-177.88945243549898,-138.70758701767187,-180.95907812617966,-100.99047311022649,-161.76373596778512,-154.90281570140803,-177.9438903373574,-195.05655898887582,-163.74543964826242,-174.5080792092939,-158.6051559821458,-160.78740699187745,-102.78128792503706,-168.5807682973071,-167.7258460467909,-101.7877888444264,-111.56479455800712,-190.21453217524495,-146.49118244540946,-167.66212215787218,-148.63013849722955,-173.71794336208492,-152.98940925069405,-196.7413298764771,-111.59476678491436,-162.8342522638439,-111.05064116554647,-161.6027685847405,-196.12355675015195,-132.68673351496597,-149.85370235087353,-161.9986214631681,-171.3516859468807,-149.86125965157478,-135.7132765334153,-184.25874304395848,-113.83513071197619,-178.90709541125858,-150.00368381764844,-139.51492781939567,-197.58571085981833,-171.1391385109842,-137.7977960760332,-151.42458993425313,-102.37895251039843,-193.1765936042437,-174.67855859091793,-180.84437559112922,-146.41757087324555,-143.42689276097153,-151.4010712203816,-189.1316552509324,-180.01448882214564,-156.61582317254522,-193.66073109896348,-160.03873131377418,-153.8215784105021,-192.95560578351433,-176.49403772810118,-145.0120126381915,-157.1488682502044,-182.00122274988968,-157.1568947865673,-110.05044759902106,-163.21106228758768,-163.36303092724762,-125.9793691848994,-124.70082983978136,-103.32794359632219,-112.29254864516389,-168.59954156244874,-143.05220209329278,-170.53344790974467,-138.67599967605065,-162.90139145256973,-186.19077753312,-175.01344842981194,-196.6957680526252,-128.2177659148481,-198.6957050067247,-196.97497380940462,-153.96522088624278,-175.34551785345664,-125.75259133185924,-119.63712725628208,-156.3185769837373,-168.96070483599465,-125.46910066005725,-164.45852661659893,-122.69748967242444,-105.0632075986616,-115.43086382543348,-135.66084542533434],"gamma":[10.04877316980056,14.96100609148693,6.5203711117046526,2.6802958772789642,9.132075936480103,8.571683618713447,14.006053960352812,3.5658167392867934,16.41182721230657,4.896929163763133,8.396804596888646,9.003947295592795,19.3282788004094,11.377135450333773,0.914700828665338,0.9078090177331521,15.580697935832788,18.12135453775496,15.82901080595252,14.28398271544129,5.097944127735752,16.834652330895644,0.1950462024379629,14.945813202605045,18.672196779308518,10.344693076608378,12.279992486375871,11.669805080696204,5.889003400117452,2.3939586205057717,8.807646892009394,19.574275069273742,5.885049120846686,2.3231589679010067,9.56433564925577,8.074661530158206,10.042891697633953,11.888509554814624,9.804246302487316,13.978840275800803,8.983828465927077,14.490422404287312,11.601653296917313,16.837859585769223,12.318436287977033,17.94958017979551,10.437837868782992,5.139670422530296,10.25656420167104,14.747835979812596,8.731005091903178,16.381707393743184,1.2453457417985492,8.88848037254165,7.006846592350837,16.161327633433963,17.996883854767667,12.869461333949367,18.746065642149645,6.181939901163047,2.2275949717178722,13.908302819698907,6.309195512116017,17.358848560499457,5.250070240559714,4.879955834745471,10.089444313679298,17.23840326931052,10.329210031912694,9.722902598176585,12.965522445399538,9.24131187989397,4.791501846365955,19.688767502505165,16.553577518660635,15.150186188039658,0.7828479523375043,9.650634893505332,17.294299587959387,12.895419370045058,1.1689795680574422,19.334852527477505,7.242084352915952,8.738116059069053,11.142038893521121,14.552888832070456,7.470716093433727,17.368916174210362,19.59421685555336,10.100240078103155,18.881594079823458,16.78761286408987,5.576554794655486,7.191993679271751,13.345950633744138,2.1861976132008643,10.184333755640388,19.83346448984467,1.5016246070408412,7.311303563552909,11.754598792750869,3.5797278860170634,4.653572128647143,1.6941026365401468,1.3078606721976183,18.96347845945041,18.983877138200608,10.362485250494391,18.399957504227878,2.767104969646441,2.4300346404935835,15.673027811664827,2.5158719288468,4.070902047824063,3.4136229052862355,9.612071093304642,0.32026627333825,13.82166191525159,9.055208999797157,13.17070278167304,5.374941316648427,18.151010187401123,18.65740323387965,0.6342477353444798,4.8185919103671,15.029016900461283,0.7520906646460856,6.914105802346624,2.3954910112117744,9.743019125064034,16.875168375592295,0.8018877047949813,19.75204967839101,11.707497207323296,17.01260142922361,17.8651139790723,4.8165864766063615,10.67752902028519,14.832850954174969,11.95037624319037,17.350626198071893,4.878092666845828,2.429800215563378,19.340620811131828,9.129132773733879,19.443784634032973,18.928278660119062,4.053995561258263,1.7695234168011353,8.927132859186857,6.99509689447225,4.794917302632595,18.51457660159818,19.130170000444494,3.9618631010178396,6.73089441887607,18.779007581639476,6.319562866035757,7.5067174402324355,16.462903273833376,4.27852298373069,15.088844024663368,19.99667248059754,19.26003773906001,1.3541712331791445,16.150325943627454,10.018715077569187,0.31127206547426844,17.410872561435752,13.437787968897306,17.75979958652034,2.7822728442753286,7.635467404913827,5.674899445364141,16.713853697789137,0.4359902877259936,3.820944793369989,2.004033748385212,15.880869256251078,2.7553721223695904,9.150809195246904,6.396168604369152,19.259936520137266,17.775476059731716,13.29683308789459,13.135662605808655,19.48716939449083,10.073530381443806,6.473085195652701,0.8879228161579711,2.848269842731117,16.481991379434415,13.029880916974097,2.612089402421258,3.4387395860672276,9.11262320148602,8.083778094859056,6.1801353498724465,12.476057286047592,19.73786205067059,10.580881544037162,1.2078040398896395,19.105621416141393,1.9086076606611035,7.348605045367949,3.3340118251882167,10.58973437534906,9.023967802364567,5.8495417312039955,15.587512922254394,19.305651395724176,3.712873809662449,12.310686300962018,4.382659264326083,1.5094784669348993,6.233307835688358,1.2664644763638266,10.241145766351632,6.227966323289977,14.483570299313563,18.08415266845661,0.03434090454785377,17.687037441240363,14.555090293924344,8.307053899683975,13.267136798246582,9.298731424667999,0.9778691064985612,8.23875635853077,13.309693356142066,14.62958325835932,9.170119426157113,4.9110646096837,6.981939944870792,1.3918425791782418,12.341292772813519,6.409669247320182,2.001560760129255,15.243855722974518,5.97430956443433,12.594563064076834,2.847028271847676,8.545762735074135,14.942231777563162,17.89265690146528,11.90711095051081,6.817971493769042,6.314367733247952,7.3072210919055935,18.368569735107208,17.225656884334185,2.011193806214493,4.067714642870666,19.4409709373885,16.509309607081967,15.321714849145973,12.061324916897473,7.497498926923862,6.850230422275985,0.006888823412234402,8.483489774737883,10.227153440710675,17.028557403854442,4.033059628983784,4.1010822750842335,0.09582431714485029,2.912199592950193,8.661141964099187,2.843274568831635,7.331021738347365,14.391284401349296,3.2469812132730125,2.100215266357641,9.167170716529593,17.97106013645586,18.45552410422782,17.519498237329756,9.029935054231117,13.828877848214125,4.351684652095074,15.437880558643045,18.92788414130683,10.990885579118789,9.717279244674991,18.337548263320294,1.2431471902008528,18.75299365110914,8.008483366728697,9.182077976724052,6.944517274662609,17.78773142276639,5.688010448005496,5.402929017917564,12.285352782693483,5.210911369822542,8.213347540393979,7.74943185246292,5.920921008123683,19.773746013231182,0.8254158891178331,19.166443450951988,0.7306437278857958,1.5342902135712233,6.028080384896386,9.082768702437098,3.223639012836199,13.450067697217154,1.3438042443006282,19.569800949760058,15.18007243984114,4.84932710575479,3.075918069150476,8.619618215707106,1.6189475714779045,7.002440463436055,9.484931449440047,0.4182733851207221,15.208793168228564,1.050208751338122,6.513512186499795,2.0591678225910615,18.808698042631754,0.7930316991018582,1.5900136765813544,10.42281522826016,15.784612171304516,6.649802421270623,13.768824385176806,10.507945170842476,5.202139289449201,12.00482409571061,6.395349531902719,13.100428448244363,3.4704129575421083,11.198906082648197,12.015460866063151,3.5331180325121236,5.026402876611269,8.543471796095968,2.034927060133178,18.122020240289626,9.338041321588735,15.595305050473716,9.492794205825628,14.136049564475957,6.72700798686344,12.890953649813754,17.47651576186943,19.35404301752811,18.411453456688925,8.006556559221991,14.627091363400421,4.782273580686347,2.723561884347099,5.853896968575341,11.8564180792314,9.225723312810112,12.204804149181143,17.480467223328336,2.2497703680034897,3.5456294877080508,2.376005275615327,17.50032574069973,13.525983135843948,4.4646513322700665,11.422222262109148,7.734489447036861,11.443543487965812,4.100946130800516,15.785070696969825,11.756245390765487,1.5655767578337532,12.901505349784014,4.357984511822068,12.388916122732656,16.940963893915992,6.619225399803823,3.1862384701111113,4.7881878714276604,11.040307298437458,11.168477380606191,3.062770017478922,6.451494795000272,6.641426569529192,19.98792955918809,13.909312523918537,17.348759006780163,19.748173594787488,0.38990653258794694,16.098970199186965,12.567368224678734,17.74319777979453,12.522548487929445,5.6308096631042215,16.88582223726593,14.539041990833649,9.774240728636144,14.040576404104058,13.489367567370607,15.791980055542783,9.531491514612608,9.739440425519149,14.738004415670671,19.577215564648554,7.317219332550606,1.6519128057604915,2.613543141728405,18.10639793465031,10.480939621459196,17.97438390957651,18.625615952576283,0.21760424638014975,2.09907287857944,3.5208682655048262,10.597322290281404,3.3854073048687594,5.350897799693297,12.50414981146454,5.275967006849704,2.2203380843721643,18.29268102531271,19.691075262526702,8.07125585237955,2.2805529914022626,1.296074470159314,13.090058675673069,7.9134086492948175,3.2802802563658906,4.711119878873191,17.095114913522362,6.1873194751398986,4.15360574385272,16.388639137744093,11.977492087322599,8.571536003205221,6.206482016718615,12.754756097253246,8.506160839940712,14.669710012541803,18.269577844717425,13.716341266767703,12.798192899600277,4.081745590504293,3.8788741235195223,9.744722877540863,19.19558052375299,7.018859602900034,2.7044895035891026,6.156854545708406,12.03276724648141,15.290501734561538,2.5677350874795657,0.5797525826352112,5.509442727294447,11.961358992725692,2.1820291369766487,16.7659620283924,15.634134390077143,14.044340683512901,8.053029120960954,2.270270876315168,9.648269443855417,3.561700054012973,4.243824520592869,8.55272161777191,4.874978273271706,3.6346111114840163,5.291029133258065,11.981548356997518,10.370051972799548,4.1582760171625255,3.264344912344641,8.263828741662804,4.357562196065214,8.684875578461174,3.7487424622671472,3.591794067556351,18.21907916511559,8.042010068197225,17.142624302703446,5.520569022802286,13.381491593304453,16.740349418689853,10.608101250679969,8.483123901419876,1.910952425872634,16.09419998905826,12.326078618897114,4.748076040976015,2.482189508849526,15.135938831974961,8.710605260884074,19.40513014825153,8.114018707615527,6.064521124869038,19.810417805315165,16.021657554297978,12.380356583695544,7.034556649296051,0.9681788302554795,5.32413252053312,1.7181939402665725,12.3728919975154,17.379663743599572,16.162330085316103,4.78551634754095,2.9050517384351116,13.432251827335321,9.699759991859128,0.4180907152380575,13.54305369337537,10.943858402315838,2.964133409964158,0.5617581446656894,5.720671139422686,7.696412171410323,1.2421749727977804,2.87285573326042,19.15390560821965,3.6026462671325765,6.61840080357829,4.410033683162182,0.10689163210750863,4.333439352679931,5.582361010960604,12.202181448377143,13.093242742463392,17.02591128746053,3.146030796530437,4.595409795298537,14.49778710231227,15.30397406407307,1.7739321079443249,14.15794170841294,18.7952607384919,8.924472273272466,11.08614203160419,6.4879491692920865,1.3078244055891286,15.854109075959979,9.093092736169037,18.35394376983192,15.008641960586209,9.079965683808746,4.965998489167895,0.6513579835897243,12.733267113190605,19.902489878975715,14.169313986876038,11.292440644355914,10.937230112301961,13.700802625559794,11.69394173504417,2.0572263649289813,9.442001186794041,2.4967060940942742,8.981747274419213,16.45588975051361,14.433594541895399,7.196876548419664,11.257255809762906,13.62627673859329,1.9098764512658706,4.630578125136311,9.233524942854508,8.163649714595635,14.050298382931977,1.3799750151019108,1.4986473185100024,14.856825800979383,10.13657392566721,17.013127778184206,4.366768162099328,9.491635515061478,13.154760145294766,12.67604564653833,12.176921327102793,15.966594506218556,15.28444945572291,2.3431878352305757,10.817050054637235,0.3321532620792267,16.871815347726773,9.65304475228212,3.457989781050439,17.942187387747527,8.104510340209705,16.799212199626467,7.147101683530259,16.634591093740454,14.640827315473413,2.0637165677288882,2.9500965729484507,3.702269578644519,12.977607373207519,5.788431131602998,0.03762200814640959,14.490404609179404,15.272815888307655,13.276386985991863,0.902372140636154,18.4787096844233,8.490094290358808,9.198288391868532,3.6164520245945075,2.289256306094396,17.991800231091794,2.4473445422719076,16.479781893681242,7.970928397042285,14.125209645324022,18.250986202071303,9.910954859951811,17.011962595640163,0.5571618929842925,8.726862004020575,10.475974393117419,7.634592729570366,15.26431085737045,2.3208256801863136,4.211514591468393,3.0099027062954375,9.188977962568412,4.328705251078562,17.579659934848717,13.158460348219577,17.33518379080803,7.5189654003931405,18.848071306989613,17.55035476336349,8.190520574569856,11.397549931422786,9.446424606250572,7.163174736079565,0.6629446916938386,14.362796207994148,18.693928332091968,2.279287079262824,10.585212164037836,10.243129581684851,14.169836776509687,14.145121663504408,18.72266663016631,1.7867285247734666,5.001007388940315,0.842789891439244,16.155216847990022,1.7160323691951485,14.829238517789092,18.525588964500432,1.9761153899527706,7.748438308241408,14.69324671112501,14.175833276989938,11.062683607432401,19.19369407419145,14.524195409231657,7.935398457808733,14.86078994692662,9.002225534870053,13.715607346626104,4.024674010614815,10.039233283702433,13.549260443439364,11.360099480627497,10.440907285719877,12.924751477269734,1.1422100655968581,16.31101709938973,9.687227898488437,4.971240913521955,10.37540816805761,4.890092030630262,10.690183083357049,8.676748159690945,4.622517816503806,2.4858456948133156,13.741317913727649,3.0905758441952624,17.939005373843557,5.872285537747786,13.034779825835638,16.800731255252167,2.1709325154351644,5.6321834415878325,13.341764971367041,7.5947285038787005,11.643115969142922,19.828322342020464,12.713774992435516,2.583416238141454,1.4915269124784958,5.513080397500207,4.270366670172128,9.381899748079881,4.693145986002087,12.24125324867881,3.7924874847908363,6.75926810065695,0.5520589298051037,11.233650087449645,13.361852105423573,11.91478664625889,0.37182619061411515,17.267785475257654,8.48129861049487,14.650353322734464,11.700090471069142,5.618971620140227,8.305847470103433,3.7213747936223296,10.50964022445731,19.847891370530725,16.061933303801318,13.378982796678237,4.061927214802901,17.9510182260163,16.2533023858734,8.083704360667635,18.40049339625171,9.668534269757721,17.861386104476225,5.155427488602897,11.543210985854735,3.943620130462664,16.338978551158508,8.008072205302636,6.127886347578739,10.295273692264054,12.158552978764785,11.819325530021407,17.012639727949356,4.049468001068046,5.366485684211435,7.088480126517833,7.629055512755976,0.1174452473208909,1.494596403472892,4.696804027354813,7.391969288196352,0.6794778595354201,3.0900273211548868,19.577003848350728,14.117218434006539,7.4212653611650214,10.208705730933296,13.571103325968679,18.511170532309407,11.578185548760294,1.6532352195388933,2.9832362471866736,0.9469256830057571,2.471409313522659,15.77249978493397,4.715736804429556,1.2334215404518467,11.109434299922887,2.3454764799039918,5.000129632007648,0.9632908314778943,5.258485041245322,6.250736565473045,5.2530838109518285,1.3074724342004007,11.337473579615054,15.943351895820879,7.1744802628944715,6.232296337255057,9.808744361893837,3.654555974179581,9.394298121427923,7.548705875531119,2.0203454982117064,19.61715558122187,11.1075828953545,6.334260426729834,10.69868929266966,8.415376720532066,18.460420200292887,6.538227459495358,17.388015295217464,17.338667282474418,1.2539259032287964,13.990138611915386,14.224916576698824,19.12271985203531,0.8357120100119353,3.884431813746776,3.6766520563137073,15.238103251779895,16.68285285017136,9.666316446885128,15.70066285278109,11.028369394685962,19.15642684263871,2.613090941325993,9.806502452352719,12.780921858167261,6.7109108081619295,3.0376893257004545,7.830754279586509,12.091162601994977,18.8964009053673,6.095725005206458,19.737135776026488,9.796450941069232,0.377175761522488,14.364686927195528,1.5658141082702315,8.187741272690584,12.427835910870563,4.0880100710832545,5.375478620070284,16.52432016645941,6.741168005966753,13.626343513313737,13.95080535188975,14.94516992751052,15.1901442642577,4.205288302584722,11.986878710999855,3.3251090401461036,4.202518374131108,15.910341897514195,14.593334466300863,16.88790405573331,18.549666140246558,17.237141325089546,14.444847442412634,3.8063174460803184,15.708673000070696,0.8472642745163439,5.742211357300393,10.680859750443954,8.096159035214878,4.1854432868054925,4.35659238656696,0.11635228757389537,19.09717708880762,19.775681923812478,10.849770820343139,6.012959194740239,17.57149716319834,4.578751663505356,4.242196906256015,19.147780744623315,1.3195200754626013,16.44271084803949,3.3023080685197703,13.408479219754476,0.4131187624421351,9.260141820107348,13.539717662717973,11.640975794344893,4.04693513385157,7.565089487091732,0.8330011518717306,14.93554461299996,15.51621419057307,4.551988524472379,3.6295741166806916,19.41003860871019,2.4337915321106474,7.899113464213179,6.877428925787208,3.6960134389584143,5.231746104054049,10.099122756237598,10.830987294473363,14.52014189767127,19.60286978193696,10.665738260258015,14.731076882638918,15.387661136546335,7.661888007277606,8.975390283139607,12.317756429233583,7.6001532045463405,2.0380198828138907,3.723160574136739,6.220370993179518,1.798173421533913,6.682250734419823,7.773793813005905,18.231151518034935,1.8809164181960059,3.7513089015448386,4.322616668496551,5.767229916586145,8.92146866984556,19.395557192656476,12.81096456004092,17.39176905556406,2.794199918421585,8.970091449007045,16.185610372432695,3.114729468512474,15.877960446200085,15.57184016364085,16.415358365758745,14.177290137366562,15.52632797182099,8.022126950518086,19.925500047037474,17.990613277740096,16.376748587339268,7.648080710226464,9.539545180297274,13.73368276090905,19.94400249398781,11.977047402341574,17.192421698262915,15.248005310122208,7.483210322515119,11.024797263286285,1.640539994303114,3.2801718620785714,3.254594035780425,17.56451657980035,0.6332964517938766,14.642382810490782,14.087259458771868,14.632700925857067,14.001490959830406,5.264979568825048,11.93344883117545,8.546788262182496,5.117237576916711,14.335853159849524,1.7065684164344797,9.487593719035011,17.356861719882886,8.7024086259677,11.364032766303179,4.751132920121033,19.622012304889587,12.168709032967321,12.42166510413957,14.687544476218278,5.163974087230532,13.789748700413998,3.009796502814508,10.73625177612453,5.844197602592978,15.434255861361104,12.394846863211942,16.657803985854336,12.735403548186692,16.925738434072283,12.022208640180638,4.968392024701109,0.9887352949456574,1.781305945146161,7.820584224661236,18.915154397872975,1.4311076568612968,14.786251460080315,12.43900755325846,6.196335657671246,5.200964396758341,7.956479386037563,4.57029091012644,18.097999349251626,5.944497057156606,0.4644899047904172,13.455305352203354,1.3389290663896647,3.923332406771043,18.7916028038886,8.40850278809203,6.48821622717485,11.121381789108815,19.156045764686517,0.473612975139055,10.453948482899689,18.28772724972297,1.7422058198943713,2.202814211564448,19.262763094965347,18.45453501088762,15.69159392635398,19.113291648456556,14.005497899567946,15.084697365387377,10.681621276763625,10.766191396250392,5.421354266474294,5.104307403483688,17.168899499506104,9.698618211724535,12.048318610491524,19.54719674148413,11.65988970529055,11.79508303372483,19.847691210071442,11.228388039432794,10.423831643137177,18.865269951931506,6.585207195835867,6.586269584405993]}

},{}],87:[function(require,module,exports){
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

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var cdf = require( './../lib' );


// FIXTURES //

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `x0` and `gamma`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `x0` and `gamma`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `gamma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 0.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given `x0` and `gamma` (large `gamma`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = largeGamma.expected;
	x = largeGamma.x;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = negativeMedian.expected;
	x = negativeMedian.x;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = positiveMedian.expected;
	x = positiveMedian.x;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/cdf/test/test.cdf.js")
},{"./../lib":82,"./fixtures/julia/large_gamma.json":84,"./fixtures/julia/negative_median.json":85,"./fixtures/julia/positive_median.json":86,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":47,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":55,"@stdlib/math/base/special/abs":57,"tape":242}],88:[function(require,module,exports){
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

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `gamma`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 0.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, -1.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given `x0` and `gamma` (large gamma)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var cdf;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = largeGamma.expected;
	x = largeGamma.x;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( x0[i], gamma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var cdf;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = negativeMedian.expected;
	x = negativeMedian.x;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( x0[i], gamma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var cdf;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = positiveMedian.expected;
	x = positiveMedian.x;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( x0[i], gamma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/cdf/test/test.factory.js")
},{"./../lib/factory.js":81,"./fixtures/julia/large_gamma.json":84,"./fixtures/julia/negative_median.json":85,"./fixtures/julia/positive_median.json":86,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":47,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":55,"@stdlib/math/base/special/abs":57,"tape":242}],89:[function(require,module,exports){
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

'use strict';

// MODULES //

var tape = require( 'tape' );
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/cdf/test/test.js")
},{"./../lib":82,"tape":242}],90:[function(require,module,exports){
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

},{"./is_number.js":93}],91:[function(require,module,exports){
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

},{"./is_number.js":93,"./zero_pad.js":97}],92:[function(require,module,exports){
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

},{"./main.js":95}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./format_double.js":90,"./format_integer.js":91,"./is_string.js":94,"./space_pad.js":96,"./zero_pad.js":97}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./main.js":99}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{"./main.js":102}],101:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"dup":94}],102:[function(require,module,exports){
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

},{"./is_string.js":101,"@stdlib/string/base/format-interpolate":92,"@stdlib/string/base/format-tokenize":98}],103:[function(require,module,exports){
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

},{"./main.js":104}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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
* Create a constant function.
*
* @module @stdlib/utils/constant-function
*
* @example
* var constantFunction = require( '@stdlib/utils/constant-function' );
*
* var fcn = constantFunction( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":106}],106:[function(require,module,exports){
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
* Creates a function which always returns the same value.
*
* @param {*} [value] - value to always return
* @returns {Function} constant function
*
* @example
* var fcn = wrap( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/
function wrap( value ) {
	return constantFunction;

	/**
	* Constant function.
	*
	* @private
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	}
}


// EXPORTS //

module.exports = wrap;

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

},{"./main.js":108}],108:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":112}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{"./define_property.js":110}],112:[function(require,module,exports){
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

},{"./builtin.js":109,"./has_define_property_support.js":111,"./polyfill.js":113}],113:[function(require,module,exports){
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

},{"@stdlib/string/format":100}],114:[function(require,module,exports){
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

},{"./main.js":115,"./polyfill.js":116,"@stdlib/assert/has-tostringtag-support":20}],115:[function(require,module,exports){
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

},{"./tostring.js":117}],116:[function(require,module,exports){
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

},{"./tostring.js":117,"./tostringtag.js":118,"@stdlib/assert/has-own-property":16}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"@stdlib/symbol/ctor":103}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){

},{}],121:[function(require,module,exports){
arguments[4][120][0].apply(exports,arguments)
},{"dup":120}],122:[function(require,module,exports){
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
},{"base64-js":119,"buffer":122,"ieee754":225}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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
},{"_process":232}],125:[function(require,module,exports){
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

},{"events":123,"inherits":226,"readable-stream/lib/_stream_duplex.js":127,"readable-stream/lib/_stream_passthrough.js":128,"readable-stream/lib/_stream_readable.js":129,"readable-stream/lib/_stream_transform.js":130,"readable-stream/lib/_stream_writable.js":131,"readable-stream/lib/internal/streams/end-of-stream.js":135,"readable-stream/lib/internal/streams/pipeline.js":137}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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
},{"./_stream_readable":129,"./_stream_writable":131,"_process":232,"inherits":226}],128:[function(require,module,exports){
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
},{"./_stream_transform":130,"inherits":226}],129:[function(require,module,exports){
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
},{"../errors":126,"./_stream_duplex":127,"./internal/streams/async_iterator":132,"./internal/streams/buffer_list":133,"./internal/streams/destroy":134,"./internal/streams/from":136,"./internal/streams/state":138,"./internal/streams/stream":139,"_process":232,"buffer":122,"events":123,"inherits":226,"string_decoder/":241,"util":120}],130:[function(require,module,exports){
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
},{"../errors":126,"./_stream_duplex":127,"inherits":226}],131:[function(require,module,exports){
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
},{"../errors":126,"./_stream_duplex":127,"./internal/streams/destroy":134,"./internal/streams/state":138,"./internal/streams/stream":139,"_process":232,"buffer":122,"inherits":226,"util-deprecate":250}],132:[function(require,module,exports){
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
},{"./end-of-stream":135,"_process":232}],133:[function(require,module,exports){
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
},{"buffer":122,"util":120}],134:[function(require,module,exports){
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
},{"_process":232}],135:[function(require,module,exports){
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
},{"../../../errors":126}],136:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],137:[function(require,module,exports){
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
},{"../../../errors":126,"./end-of-stream":135}],138:[function(require,module,exports){
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
},{"../../../errors":126}],139:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":123}],140:[function(require,module,exports){
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

},{"./":141,"get-intrinsic":216}],141:[function(require,module,exports){
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

},{"es-define-property":201,"es-errors/type":207,"function-bind":215,"get-intrinsic":216,"set-function-length":236}],142:[function(require,module,exports){
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

},{"./lib/is_arguments.js":143,"./lib/keys.js":144}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],145:[function(require,module,exports){
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

},{"es-define-property":201,"es-errors/syntax":206,"es-errors/type":207,"gopd":217}],146:[function(require,module,exports){
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

},{"define-data-property":145,"has-property-descriptors":218,"object-keys":230}],147:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],148:[function(require,module,exports){
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

},{"./ToNumber":179,"./ToPrimitive":181,"./Type":186}],149:[function(require,module,exports){
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

},{"../helpers/isFinite":194,"../helpers/isNaN":195,"../helpers/isPrefixOf":196,"./ToNumber":179,"./ToPrimitive":181,"es-errors/type":207,"get-intrinsic":216}],150:[function(require,module,exports){
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

},{"call-bind/callBound":140,"es-errors/type":207}],151:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":209}],152:[function(require,module,exports){
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

},{"./DayWithinYear":155,"./InLeapYear":159,"./MonthFromTime":169,"es-errors/eval":202}],153:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":200,"./floor":190}],154:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":190}],155:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":153,"./DayFromYear":154,"./YearFromTime":188}],156:[function(require,module,exports){
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

},{"./modulo":191}],157:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":198,"./IsAccessorDescriptor":160,"./IsDataDescriptor":162,"es-errors/type":207}],158:[function(require,module,exports){
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

},{"../helpers/timeConstants":200,"./floor":190,"./modulo":191}],159:[function(require,module,exports){
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

},{"./DaysInYear":156,"./YearFromTime":188,"es-errors/eval":202}],160:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":198,"es-errors/type":207,"hasown":224}],161:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":227}],162:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":198,"es-errors/type":207,"hasown":224}],163:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":160,"./IsDataDescriptor":162,"./IsPropertyDescriptor":164,"es-errors/type":207}],164:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":198}],165:[function(require,module,exports){
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

},{"../helpers/isFinite":194,"../helpers/timeConstants":200}],166:[function(require,module,exports){
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

},{"../helpers/isFinite":194,"./DateFromTime":152,"./Day":153,"./MonthFromTime":169,"./ToInteger":178,"./YearFromTime":188,"./floor":190,"./modulo":191,"get-intrinsic":216}],167:[function(require,module,exports){
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

},{"../helpers/isFinite":194,"../helpers/timeConstants":200,"./ToInteger":178}],168:[function(require,module,exports){
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

},{"../helpers/timeConstants":200,"./floor":190,"./modulo":191}],169:[function(require,module,exports){
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

},{"./DayWithinYear":155,"./InLeapYear":159}],170:[function(require,module,exports){
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

},{"../helpers/isNaN":195}],171:[function(require,module,exports){
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

},{"../helpers/timeConstants":200,"./floor":190,"./modulo":191}],172:[function(require,module,exports){
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

},{"./Type":186}],173:[function(require,module,exports){
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


},{"../helpers/isFinite":194,"./ToNumber":179,"./abs":189,"get-intrinsic":216}],174:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":200,"./DayFromYear":154}],175:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":200,"./modulo":191}],176:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],177:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":179}],178:[function(require,module,exports){
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

},{"../helpers/isFinite":194,"../helpers/isNaN":195,"../helpers/sign":199,"./ToNumber":179,"./abs":189,"./floor":190}],179:[function(require,module,exports){
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

},{"./ToPrimitive":181,"call-bind/callBound":140,"safe-regex-test":235}],180:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":210}],181:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":212}],182:[function(require,module,exports){
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

},{"./IsCallable":161,"./ToBoolean":176,"./Type":186,"es-errors/type":207,"hasown":224}],183:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":216}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":194,"../helpers/isNaN":195,"../helpers/sign":199,"./ToNumber":179,"./abs":189,"./floor":190,"./modulo":191}],185:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":179}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":153,"./modulo":191}],188:[function(require,module,exports){
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

},{"call-bind/callBound":140,"get-intrinsic":216}],189:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":216}],190:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],191:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":197}],192:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":200,"./modulo":191}],193:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":148,"./5/AbstractRelationalComparison":149,"./5/Canonicalize":150,"./5/CheckObjectCoercible":151,"./5/DateFromTime":152,"./5/Day":153,"./5/DayFromYear":154,"./5/DayWithinYear":155,"./5/DaysInYear":156,"./5/FromPropertyDescriptor":157,"./5/HourFromTime":158,"./5/InLeapYear":159,"./5/IsAccessorDescriptor":160,"./5/IsCallable":161,"./5/IsDataDescriptor":162,"./5/IsGenericDescriptor":163,"./5/IsPropertyDescriptor":164,"./5/MakeDate":165,"./5/MakeDay":166,"./5/MakeTime":167,"./5/MinFromTime":168,"./5/MonthFromTime":169,"./5/SameValue":170,"./5/SecFromTime":171,"./5/StrictEqualityComparison":172,"./5/TimeClip":173,"./5/TimeFromYear":174,"./5/TimeWithinDay":175,"./5/ToBoolean":176,"./5/ToInt32":177,"./5/ToInteger":178,"./5/ToNumber":179,"./5/ToObject":180,"./5/ToPrimitive":181,"./5/ToPropertyDescriptor":182,"./5/ToString":183,"./5/ToUint16":184,"./5/ToUint32":185,"./5/Type":186,"./5/WeekDay":187,"./5/YearFromTime":188,"./5/abs":189,"./5/floor":190,"./5/modulo":191,"./5/msFromTime":192}],194:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":195}],195:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],196:[function(require,module,exports){
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

},{"call-bind/callBound":140}],197:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],198:[function(require,module,exports){
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

},{"es-errors/type":207,"hasown":224}],199:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
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

},{"get-intrinsic":216}],202:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],203:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],204:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],205:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],206:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],207:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],208:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],209:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":207}],210:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":211,"./RequireObjectCoercible":209}],211:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],212:[function(require,module,exports){
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

},{"./helpers/isPrimitive":213,"is-callable":227}],213:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":214}],216:[function(require,module,exports){
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

},{"es-errors":203,"es-errors/eval":202,"es-errors/range":204,"es-errors/ref":205,"es-errors/syntax":206,"es-errors/type":207,"es-errors/uri":208,"function-bind":215,"has-proto":219,"has-symbols":220,"hasown":224}],217:[function(require,module,exports){
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

},{"get-intrinsic":216}],218:[function(require,module,exports){
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

},{"es-define-property":201}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{"./shams":221}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":221}],223:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":215}],224:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":215}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
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

},{"call-bind/callBound":140,"has-tostringtag/shams":222}],229:[function(require,module,exports){
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

},{"./isArguments":231}],230:[function(require,module,exports){
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

},{"./implementation":229,"./isArguments":231}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
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
},{"_process":232,"through":248,"timers":249}],234:[function(require,module,exports){
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

},{"buffer":122}],235:[function(require,module,exports){
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

},{"call-bind/callBound":140,"es-errors/type":207,"is-regex":228}],236:[function(require,module,exports){
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

},{"define-data-property":145,"es-errors/type":207,"get-intrinsic":216,"gopd":217,"has-property-descriptors":218}],237:[function(require,module,exports){
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

},{"es-abstract/es5":193,"function-bind":215}],238:[function(require,module,exports){
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

},{"./implementation":237,"./polyfill":239,"./shim":240,"define-properties":146,"function-bind":215}],239:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":237}],240:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":239,"define-properties":146}],241:[function(require,module,exports){
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
},{"safe-buffer":234}],242:[function(require,module,exports){
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
},{"./lib/default_stream":243,"./lib/results":245,"./lib/test":246,"_process":232,"defined":147,"through":248,"timers":249}],243:[function(require,module,exports){
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
},{"_process":232,"fs":121,"through":248}],244:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":232,"timers":249}],245:[function(require,module,exports){
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
},{"_process":232,"events":123,"function-bind":215,"has":223,"inherits":226,"object-inspect":247,"resumer":233,"through":248,"timers":249}],246:[function(require,module,exports){
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
},{"./next_tick":244,"deep-equal":142,"defined":147,"events":123,"has":223,"inherits":226,"path":124,"string.prototype.trim":238}],247:[function(require,module,exports){
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

},{}],248:[function(require,module,exports){
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
},{"_process":232,"stream":125}],249:[function(require,module,exports){
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
},{"process/browser.js":232,"timers":249}],250:[function(require,module,exports){
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
},{}]},{},[87,88,89]);
