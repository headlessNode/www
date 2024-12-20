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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":47}],24:[function(require,module,exports){
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":48}],27:[function(require,module,exports){
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":49}],30:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":99}],33:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":99}],38:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":99}],40:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":99}],42:[function(require,module,exports){
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
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants/float64/exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* Bias of a double-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;

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
* Natural logarithm of `2π`.
*
* @module @stdlib/constants/float64/ln-two-pi
* @type {number}
*
* @example
* var LN_TWO_PI = require( '@stdlib/constants/float64/ln-two-pi' );
* // returns 1.8378770664093456
*/


// MAIN //

/**
* Natural logarithm of `2π`.
*
* ```tex
* \ln 2\pi
* ```
*
* @constant
* @type {number}
* @default 1.8378770664093456
*/
var LN_TWO_PI = 1.837877066409345483560659472811235279722794947275566825634;


// EXPORTS //

module.exports = LN_TWO_PI;

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

},{"@stdlib/number/ctor":58}],46:[function(require,module,exports){
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

},{"./main.js":51}],51:[function(require,module,exports){
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

},{"./main.js":53}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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
* Evaluate the natural logarithm of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns -Infinity
*
* v = ln( Infinity );
* // returns Infinity
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":55}],55:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3FE62E42 FEE00000
var LN2_LO = 1.90821492927058770002e-10; // 3DEA39EF 35793C76
var TWO54 = 1.80143985094819840000e+16;  // 0x43500000, 0x00000000
var ONE_THIRD = 0.33333333333333333;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation


// MAIN //

/**
* Evaluates the natural logarithm of a double-precision floating-point number.
*
* @param {NonNegativeNumber} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
*
* @example
* var v = ln( 0.0 );
* // returns -Infinity
*
* @example
* var v = ln( Infinity );
* // returns Infinity
*
* @example
* var v = ln( NaN );
* // returns NaN
*
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var hfsq;
	var hx;
	var t2;
	var t1;
	var k;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}
	hx = getHighWord( x );
	k = 0|0; // asm type annotation
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54|0; // asm type annotation

		// Subnormal number, scale up `x`:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( ( hx>>20 ) - BIAS )|0; // asm type annotation
	hx &= HIGH_SIGNIFICAND_MASK;
	i = ( (hx+0x95f64) & 0x100000 )|0; // asm type annotation

	// Normalize `x` or `x/2`...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 )|0; // asm type annotation
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (ONE_THIRD*f) );
		if ( k === 0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;
	i = ( hx - 0x6147a )|0; // asm type annotation
	w = z * z;
	j = ( 0x6b851 - hx )|0; // asm type annotation
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - (s*(f-R));
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
}


// EXPORTS //

module.exports = ln;

},{"./polyval_p.js":56,"./polyval_q.js":57,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":45,"@stdlib/math/base/assert/is-nan":50,"@stdlib/number/float64/base/get-high-word":61,"@stdlib/number/float64/base/set-high-word":64}],56:[function(require,module,exports){
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
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],57:[function(require,module,exports){
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],58:[function(require,module,exports){
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

},{"./main.js":59}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":34}],61:[function(require,module,exports){
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

},{"./main.js":62}],62:[function(require,module,exports){
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

},{"./high.js":60,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],63:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":60}],64:[function(require,module,exports){
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
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-high-word
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); // => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":65}],65:[function(require,module,exports){
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
* Sets the more significant 32 bits of a double-precision floating-point number.
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
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); // => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":63,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],66:[function(require,module,exports){
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
var ln = require( '@stdlib/math/base/special/ln' );
var LN_TWO_PI = require( '@stdlib/constants/float64/ln-two-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for a Lévy distribution.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 10.0, 2.0 );
* var y = logpdf( 11.0 );
* // returns ~-1.572
*
* y = logpdf( 10.0 );
* // returns -Infinity
*/
function factory( mu, c ) {
	if (
		isnan( mu ) ||
		isnan( c ) ||
		c <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for a Lévy distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( -1.2 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= mu ) {
			return NINF;
		}
		z = x - mu;
		return 0.5 * ( ln( c ) - LN_TWO_PI - ( c/z ) - ( 3.0*ln( z ) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ln-two-pi":44,"@stdlib/constants/float64/ninf":45,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/ln":54,"@stdlib/utils/constant-function":90}],67:[function(require,module,exports){
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
* Lévy distribution logarithm of probability density function (PDF).
*
* @module @stdlib/stats/base/dists/levy/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/levy/logpdf' );
*
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.209
*
* @example
* var factory = require( '@stdlib/stats/base/dists/levy/logpdf' ).factory;
*
* var logpdf = factory( 10.0, 2.0 );
* var y = logpdf( 11.0 );
* // returns ~-1.572
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":66,"./main.js":68,"@stdlib/utils/define-nonenumerable-read-only-property":92}],68:[function(require,module,exports){
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
var ln = require( '@stdlib/math/base/special/ln' );
var LN_TWO_PI = require( '@stdlib/constants/float64/ln-two-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for a Lévy distribution with location parameter `mu` and scale parameter `c` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.209
*
* @example
* var y = logpdf( -1.0, 4.0, 2.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logpdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function logpdf( x, mu, c ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( c ) ||
		c <= 0.0
	) {
		return NaN;
	}
	if ( x <= mu ) {
		return NINF;
	}
	z = x - mu;
	return 0.5 * ( ln( c ) - LN_TWO_PI - ( c/z ) - ( 3.0*ln( z ) ) );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ln-two-pi":44,"@stdlib/constants/float64/ninf":45,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/ln":54}],69:[function(require,module,exports){
module.exports={"expected":[-1.7635548847698064,-2.506756689852695,-3.2342701065247645,-4.051149744286327,-14.191959968663694,-20.9536020551257,-2.5914031217930917,-4.179525964960458,-2.6658325316400884,-4.384818192513762,-9.848077571981584,-3.3857506278804874,-2.7906627997584907,-2.840397211483851,-3.986101248976949,-2.747066850601919,-3.03662252351488,-4.092844346852936,-3.7280247570998344,-2.80048707141754,-4.021218615507064,-2.547012917192413,-1907.8591614401685,-3.138915678890712,-2.9908901683449174,-2.9988132017252243,-2.7332189410054584,-3.1574756054053617,-2.741862836094819,-12.302068690760626,-17.37460174034809,-3.40043396238721,-2.8755879879607464,-2.7931048839565955,-3.3902858419054986,-3.930962804309256,-3.9889582707747984,-3.5872636367448147,-3.120042731991291,-11.936025778323947,-4.848947313341057,-2.8254361707188496,-3.047772697077139,-3.463699124074026,-2.969636812829373,-3.818843176483786,-4.648083662709078,-2.791652113483543,-2.6556771315938583,-2.9472004491467345,-3.0352998948765366,-3.696837001198951,-4.571204620698666,-3.0901531154872357,-3.1343894091295423,-7.5051238506463775,-6.834069335424321,-8.06400561673356,-3.2643875144034986,-3.857497418648102,-1.7582088071192856,-3.8867284277884897,-3.201324977541958,-2.982947351449196,-7.7930093933877185,-3.346433706438063,-2.310241363188274,-3.4038562524846916,-3.9905905552647494,-5.927327734606357,-2.9016199475833027,-2.980816485413001,-2.640898204541222,-2.689556948713311,-3.1447598349487866,-3.3761884069316963,-4.68864821631911,-3.881412872646275,-3.1033877550474913,-71.15417750202973,-3.186320046725812,-38.537113229070115,-3.5965872043130744,-2.713156896370491,-4.439851101973344,-3.7004839036628545,-3.426944703969488,-2.8668329493067475,-2.9242348729439964,-2.5743883224715063,-1.6126303057578977,-3.7509201151984954,-4.234536963787124,-6.533672694574006,-2.912039953394931,-3.328987443964408,-9.428788283495997,-4.312627414338788,-4.005929107283863,-3.778666152978983,-11.233808947228106,-5.553752222234298,-27.34437734408136,-3.092983935379454,-2.98556466225194,-1.0626849725530094,-1.9714827660863383,-3.8841540274465096,-11.570303483443308,-11.77830902668577,-2.9395318295793436,-4.6101617956212975,-3.897304672602106,-2.856595676725242,-3.7188215899109,-3.302639383567477,-2.8284250210616655,-4.428326392154436,-2.048399119370038,-4.195821609322229,-13.307317944023636,-5.078070470025422,-3.6119697144173277,-2.8607484582918317,-6.2850147313431215,-7.864601016130335,-2.2403759914568857,-2.885663755028782,-3.7555673895110777,-4.580305855828702,-6.454759661924644,-2.9500554168540183,-4.255376600523842,-4.399434374153687,-2.7662637683513958,-13.464047786091246,-25.87879929721412,-2.892393756914761,-4.422713701106481,-3.3327644935986656,-3.4020847248249932,-3.746559521778453,-2.287064093712347,-5.466038730655821,-2.2759854235918797,-3.4719741374987123,-3.779361734144352,-12.417423767595347,-3.9592364081204248,-2.4809800144129506,-46.02029238529192,-3.367676395444156,-2.4484461415056264,-3.142116662786991,-3.1157425665717566,-2.925482808422004,-2.5388407480464177,-3.1457964860676473,-2.823935656903944,-4.034746481781982,-21.88930812974572,-2.8978917507362145,-3.9493370031458324,-3.8284226717176315,-3.486919612906513,-3.831645698198883,-8.364348485210686,-3.113585092057199,-2.3991928818946326,-1.9110087042504018,-2.9529203312276353,-5.028815808167904,-3.1538267601207934,-3.4535634765447574,-3.000761034934932,-3.072555344984555,-2.19926716688287,-3.601426158902351,-2.360666154614042,-3.454390336960044,-2.6228367955331637,-2.6251065302017276,-3.0205550507869123,-3.0134818181099545,-7.426214352543733,-4.313332683658585,-3.967841065228828,-4.299777858125866,-19.90484744474194,-2.7356456004403182,-2.9883686245923897,-3.048570166004489,-3.1944309648889306,-3.46943896840609,-4.518322717239046,-3.208382817788755,-3.883609799852624,-2.6307024172673947,-3.9432092059857604,-4.392417125461971,-7.683183115271376,-4.045634188911291,-3.0744950904467006,-10.947392855315915,-3.272003405458938,-3.014328985944001,-3.1111950057656506,-5.344106923175544,-1.521480380924758,-3.019357082832871,-10.100645891183913,-265.20052829091003,-2.821104005221856,-3.7555643288919383,-2.678511746345994,-2.7576133500941307,-6.128176004256048,-2.346345446551218,-3.6874256810047097,-4.116371563714318,-7.488255239173591,-20.025315063165223,-3.4650471758637895,-20.294533394604688,-3.173475712152471,-2.5955088735312817,-2.4421453642795887,-3.2311632144683946,-3.128737522432842,-3.166113755609251,-361.39022820626326,-16.701568093520013,-2.9068420497555683,-4.120548826391593,-2.646811103024989,-2.9937199066381504,-2.994887493851966,-2.6533692761736165,-5.460506159985154,-3.831062114938654,-36.86140731758878,-5.056891896265526,-3.6905560262668513,-3.503977158736721,-9.731691924836605,-3.39973313216382,-3.294148157770305,-4.191358342465195,-2.1742997495509213,-3.525237594195492,-4.557740479904714,-3.8041974028285983,-1380.375150321258,-3.0306841098963115,-1.968454438496754,-4.593006853283368,-4.451059207702013,-2.9000207710985393,-2.818408601553229,-6.731912298102192,-2.994245355169035,-4.691789395287126,-4.82130871497336,-1.9898935870298133,-5.793361960773776,-105.1621511144942,-3.046558758199388,-4.178094484434887,-9.111526721732924,-29.016282404120084,-3.7696471424728033,-4.735647112218842,-2.963913683991645,-46.914732498949505,-4.773556858999945,-2.965904773918328,-2.6813416627238,-3.3923025214460454,-2.883546065933288,-3.1038694246069234,-3.836939168805805,-7.3626025365317505,-3.0195851662585707,-3.2419739983862033,-2.221804953797345,-2.9721096997465404,-2.0317912201163337,-3.1740448410209288,-3.8296034361278255,-10.585256142708555,-4.901889026179434,-3.597809506279216,-3.378309208453087,-6.243553250122646,-2.9012444397894983,-4.023926349765156,-7.945914170358421,-1.9567620605853957,-3.0891322098119804,-2.790654331571495,-4.058674912404959,-2.361310674007923,-3.9616463981288983,-3.5106556894136407,-4.360698590361337,-3.5811984692950105,-4.7551931579205196,-33.7402001529109,-4.0050283664527235,-8.285328752011111,-3.118049345060066,-25.84453970258661,-2.2322399275399483,-3.37107318969867,-4.002625347811382,-1.8063367044736942,-2.5974804546202277,-3.561368298931579,-3.0364240867348946,-11.393911056905846,-9.450251312853535,-2.4849110167726414,-2.497634902085257,-3.1121532297499828,-2.7382541509391713,-2.6145423420854463,-3.8951805096341694,-10.423863574586981,-3.0933616457518935,-2.9306673836825836,-3.0213711858213816,-3.8343223678410663,-3.4643032611599645,-3.0647601862201705,-2.736237007715431,-2.953870441614566,-2.2114306075384667,-3.0353696617200248,-2.0512474533673863,-3.3264382757891573,-3.6289824906570867,-5.298008652959728,-3.362671692749866,-2.843878616419632,-2.7589096714668355,-2.8296693965141886,-3.094181138427448,-2.309583272648948,-2.3380144861038428,-2.92369916922167,-3.352104333452693,-4.394628305925828,-3.7729036225014125,-3.3427568903206972,-3.780067283680008,-3.8898404530533672,-3.2059111033671748,-3.848751465826263,-3.414632129723493,-3.0019378002268136,-2.3259121196374455,-7.18960273678892,-3.7226789024426585,-7.525596290712623,-2.6908877729295995,-4.010204598128299,-2.751682078572033,-4.928396399282231,-2.459741377650224,-3.968094849841643,-3.1740491838882927,-2.7040495253773384,-40.0898386929709,-3.233844141345222,-7.3569433810488825,-3.397700369816921,-2.4960462118271622,-3.517085371155391,-4.2811110564236206,-3.0119854183408177,-3.4980219382964943,-3.5142561658108233,-106.10418794686737,-7.434574453895229,-4.251420959759592,-5.054022593111393,-3.54130611164867,-1.3059642022362932,-2.9729558778504117,-5.326804030169525,-4.140759934126597,-2.7759969144619605,-2.9723840619269786,-3.591800990973272,-94.63620482753556,-2.909102887688205,-3.3144241220300525,-3.743779298399046,-3.4559161809827,-2.3312338278792777,-17.985999868874934,-3.885178085220562,-2.8281563984947256,-3.521813690153194,-2.750364219355248,-3.1167375399886192,-2.9270431219141275,-3.2613826228348213,-2.537108926062646,-9.48012840584726,-3.168070386753783,-3.1054504158642593,-2.2462887248343537,-2.7742627114974576,-7.401354228067813,-6.619002490205031,-4.366146553344122,-3.6793333965376354,-2.7241842926663122,-9.067863392256928,-3.1549488567912976,-3.3957641939712024,-2.8048552807338836,-13.215690789776778,-8.167064940071105,-2.645626961820807,-2.778012068927403,-5.629815816303663,-2.90578277441699,-5.715059341383173,-2.8409925811036674,-11.918453790115745,-2.817230786069687,-2.3590097621968287,-3.1909442654152076,-2.550562727149292,-3.3059632878818723,-3.9065810316378493,-2.71014192191602,-2.526788148825376,-2.8417635561348713,-2.489064398900328,-2.988828424301055,-3.4925187239789532,-3.2575173514400286,-3.031039509574726,-1.789578682980754,-2.4951977239345227,-6.592428747059334,-4.549468971928366,-4.263619252752278,-4.000219495380857,-6.359396446959925,-30.61772051218543,-23.692139659393913,-2.336162749128392,-12.516686130379892,-3.1357564873038717,-12.908023914395804,-4.453549950921037,-3.2157569008771776,-3.8264657814275695,-3.6670462139027844,-2.527356218922332,-5.496159772902995,-2.588198858404009,-4.590307793895367,-3.059549080003955,-2.757476577543316,-28.217801964776104,-2.129732101405085,-2.6003123355956412,-2.2413005092179374,-2.097159257125943,-2.7021263537251534,-3.214856178051555,-2.7842318816811615,-4.144159996453514,-2.1986906379215614,-7.291062127080192,-4.096125090984088,-3.0952447360167494,-4.880369916526414,-2.92295401824767,-3.4358276181783087,-3.3360238284614243,-3.758923419941964,-52.4438260467402,-2.520739913812933,-4.956653480928708,-2.7698830459593555,-3.00280013525474,-7.02107896462077,-3.7425235911421764,-3.3589712245613477,-6.631309794976249,-2.8559136354936725,-2.7426129545217615,-3.893260780724164,-30.101985818831807,-2.4162965640177427,-45.613781759783166,-3.0051467359923834,-2.5616871646499213,-2.8834593371019475,-2.8075925695301707,-2.989103993487247,-5.253201561744151,-2.422497020945321,-2.185262566674905,-3.351412658743406,-3.301404672774685,-3.460711609626113,-3.1618941447910958,-3.3989820506633017,-2.1369571485028556,-2.6538788808971185,-2.970703781534903,-26.41194303593853,-3.4706759496299777,-4.3859234774159805,-2.8352490632725993,-3.5338114526921665,-4.459539668671002,-2.471536539155842,-4.088063898501789,-4.035026154312652,-3.993950078025265,-3.296071845482067,-3.8205750155414275,-2.988036336287343,-3.2906112300956307,-8.274212733009858,-2.669815408750818,-2.6184229969935497,-3.249076632291952,-9.349679625850834,-7.114148337515444,-2.2359132875493217,-3.1539321650108123,-3.2374803047570766,-2.9758680546064316,-5.754899392979671,-4.931192378831757,-3.0102710356588345,-2.453204991033447,-3.549779246247784,-101946.9615565731,-4.851148029767506,-3.5268482917363055,-2.6265314232451917,-7.35300941756248,-2.455343575891886,-1.9859797187411656,-3.2036604866580123,-7.037582411171086,-3.6399831632346746,-7.072850548567662,-2.769511830119696,-3.5095134189157355,-2.4925673351642894,-3.2888588018125606,-6.59632752418253,-4.420155494579778,-3.1452130216382637,-2.258037563065864,-2.757281637857402,-3.7424370747573428,-3.000595016498325,-2.95050342879263,-2.964641927230365,-4.082155103328684,-3.3174479279370708,-2.6849518475461602,-4.172494777340189,-3.7814284279318615,-5.965490828653334,-4.149901763435883,-4.963928592217896,-105.53947654553791,-3.3168081655757775,-5.289400475684335,-3.512371994741022,-3.0450545508087985,-4.740886487633956,-3.6994052446280357,-15.7037878591385,-3.418413948707061,-3.4978145718305758,-3.90668441040783,-3.6258133340765433,-3.993190020781163,-66.09758891582996,-2.916889277192028,-2.879240560507569,-20.453518143659373,-6.957983714508243,-2.789686387595263,-3.7096586556327544,-3.009781807782929,-4.557334728551311,-4.225673624419389,-2.5135758406725555,-3.97541807381222,-3.7097550511950175,-3.4074189900666267,-3.036799509205606,-16.427137331617416,-4.3662821222803165,-2.910107016013415,-22.361386116591653,-2.5909724564388945,-6.904306379978983,-3.6618009011148436,-4.163836780371021,-13.630654232484208,-3.847444392532485,-3.614264763164573,-3.214920166877212,-3.0467884973182664,-4.463993555123132,-3.601896154721148,-3.969622961325096,-2.238228827784488,-2.545572679109896,-2.971210676689065,-2.1615935511501854,-1.7625011701201998,-3.072657780943531,-3.990856515340448,-13.143649818226192,-6.504617199479141,-2.914877758180196,-3.9932746298732384,-7.681558863259657,-5.46375772555106,-1.7858860583985854,-3.7888066577928106,-2.5929466062540367,-2.9960911280249656,-3.2150195560340933,-250.83491844852443,-4.9126053335336355,-2.1514608992266724,-7.026430816365826,-5.124201691371752,-4.375022817723079,-2.565387982034164,-2.727526720806436,-2.9215007637608053,-2.8735381759504177,-4.26939666693226,-3.5692979128161966,-3.069683619439337,-2.8917413085065236,-2.3724495660047564,-3.6353434519842063,-3.149948041138252,-2.693973412138587,-2.7252745335461106,-3.8976776769522967,-3.5254064197478105,-2.508808062328858,-83.19075871106698,-2.7663850119480546,-15714.563389230318,-1.9703825108102535,-2.4863694638193783,-3.823084550108183,-2.916478191424652,-3.5544243762075554,-2.446454029657099,-3.132910267517894,-3.6303309231437133,-10.281524201898508,-3.409450806489266,-3.590850213778069,-3.4863232159153634,-4.312533345968102,-5.637572587662908,-3.3624209621345598,-2.7920820785680296,-72.20130593572779,-3.272025626484122,-3.0731850775159852,-3.9717882517342478,-10.315357336861757,-3.6458340228795465,-3.189482793498927,-5.854599725807604,-2.6859420138052297,-2.996025098633787,-3.5135830047535896,-2.7340615241379354,-4.581280482984334,-9.422538705155256,-3.8702063636842334,-4.351344740189178,-3.173578594550381,-84.86879865078896,-3.7731898666333374,-3.4910314944606924,-3.2314896293879625,-2.4695938180781862,-22.078783670238963,-3.330749598836939,-2.340178656225885,-14.462532585471395,-3.5200208258797,-5.504507601531886,-2.915339053699233,-3.251970845465172,-3.489059562177952,-5.362006742711722,-3.4749728885818842,-5.535294687419522,-6.6152525677154905,-11.621011174655775,-2.2205503172841587,-32.3387687326256,-6.700130392897078,-110.18985541856134,-3.464387798387643,-13.619289193646543,-5.006857147144215,-2.7252260456757202,-3.5150693771855965,-3.124831253667783,-7.779719241639383,-2.962478008961612,-5.6365755614307504,-3.331458096331865,-3.0461217869343806,-2.7466965501182443,-3.2570932666721677,-2.9954931538923564,-3.975382447355341,-3.029650077616933,-3.735845996070515,-3.5171084755749544,-3.830005003512571,-2.2454943615669385,-2.784435996613617,-3.640309727525492,-3.094204699701646,-2.3241166809393015,-6.076225178433885,-3.1545367467042453,-2.6026821599887047,-2.7979294620250093,-2.825387826112247,-2.986435428463672,-7.499362056397944,-50.07037116438686,-4.705710155940016,-7.328129251919552,-8.00006196007859,-4.148958384188479,-2.925391618876497,-4.002362179428055,-4.131355161951614,-8.513699302604238,-2.6158248296912636,-1.858612118984521,-2.9399888769492346,-3.2075855769641186,-3.1884922673463914,-12.152083377076822,-15.002467212251778,-3.9694880074931986,-3.947750436267942,-2.9726323565938393,-3.2659712964630736,-4.228380403469512,-2.8000038880406852,-3.456968425889878,-3.9899141761454997,-3.216628462307064,-3.3970282303458155,-4.057098833478268,-3.5839560297682604,-5.1362632591864745,-2.4266918503008514,-3.6295051851937785,-3.4688829810639645,-2.8721680480801055,-3.9952587497794125,-46.56710017670929,-7.227321559556901,-2.9646247416760136,-4.165560221250784,-3.1949332660450986,-9.05803032710646,-2.883934985196448,-4.28308021170271,-6.306083752594074,-3.794913646329979,-734.7341453142972,-2.816899672006838,-3.1474469167698205,-85.76214653833988,-4.228098589048903,-3.722982171195029,-3.5099782223002918,-2.7899691933629827,-2.640600424281786,-3.871487454678655,-3.7095452975444534,-3.091110639633257,-3.772958956968055,-2.5634239703278663,-8.991811415601555,-3.810438620794243,-3.4083454499903882,-16.38826906570411,-24.42044263130654,-4.063617380046553,-10.28331594098142,-4.551408723935766,-4.1728460795784965,-3.890967502929724,-2.6520632542045375,-2.6966324882412627,-4.623927187849942,-29.346244261637892,-2.42627758925445,-2.6453692528510926,-3.474968987861951,-3.316991681165775,-11.960712317654604,-2.098317251351804,-24.936949858513277,-13.675430231095758,-3.6719205838572035,-3.9278998793581614,-4.916259219370831,-10.041349458371396,-3.1119228789697417,-3.3151700310609176,-3.0829945345237277,-2.604305251372311,-1.4721791673955504,-4.286475762302031,-3.2097797152894607,-3.3303268472968384,-7.109185331273739,-6.119751517111055,-3.122048896189233,-3.7133077946854645,-4.122411428321815,-1.4573501200617056,-6.353764462814497,-4.386028138944848,-2.0779119215506,-3.068035620962638,-3.937867834320749,-3.2052156303292185,-106.96184936408568,-3.863500708120324,-4.177063056145162,-4.208716583675519,-13.636767377394722,-3.916982134141926,-2.6739602036483645,-3.380740720919892,-3.3848979040423255,-3.094976889209156,-3.578449303311534,-3.345919023327183,-3.9072669818993035,-2.967100434241668,-2.687099575773173,-5.6519970031245,-3.919529412787939,-2.913092263080211,-9.785634546923852,-2.5633383089136412,-2.538048657060095,-1.718827004066804,-2.9282011540859445,-6.246216327750932,-3.441967273486959,-3.487829419815873,-2.830181728788175,-3.5707457568283862,-10.92246128621616,-2.9945700444762524,-11.384228501297004,-3.870245163820804,-3.891969373566077,-3.666453989353643,-2.4491864140088913,-7.376606476379755,-3.437996513360517,-3.807310536728796,-2.6081800401876993,-6.649012022802069,-3.731229935504259,-6.086942601189206,-64.14293060048247,-6.260844811198487,-5.938682470814939,-2.109966361240375,-2.576391045715062,-3.606331808542248,-2.530193286804633,-6.058742540730684,-4.292398866315447,-3.8893248651520036,-2.7368306530486883,-5.434404113932899,-2.847848063675549,-4.552324085385887,-14.958442498523413,-4.518022581913293,-4.528666723444782,-3.134157474322283,-2.740193201791741,-11.730729592967988,-2.978400095971626,-3.1184991437108183,-4.617408245167114,-5.603302241010019,-3.531019654284165,-16.996222612143367,-3.8409739785970842,-3.4835692682647235,-3.4482629659910176,-2.784659692557563,-3.4133881935276786,-3.1468649886746216,-2.789833884396247,-5.046559848043002,-2.870483442583142,-3.132797903347851,-3.23661644365876,-2.9032228818378405,-4.358703312909906,-2.366560323377371,-7.203849690730209,-3.0248882446153877,-3.557625960383951,-2.4955702182537847,-2.1025293120693416,-2.9713163528992963,-3.997952015456212,-2.8710562266387334,-6.053781954481366,-5.426676264399114,-3.4197951807468856,-2.9507678103858033,-43.169484460999584,-2.0599635903877047,-2.7806786983644147,-3.379015932763006,-2.659957677981577,-2.666050829776925,-3.144792416933238,-3.712921051274946,-2.1825851299539876,-3.048963979676865,-3.0478811786514957,-9.345189509740386,-3.7892715552608447,-1.7446865101610656,-3.8704232357741555,-7.8768300721528925,-3.917573192964464,-3.1006817632641943,-6.187862804079353,-3.7089095465897,-2.9057863912859525,-3.22624681690373,-3.0628225936290012,-2.9094130809411385,-262.22850660683935,-3.9869928001104826,-3.0208024611221136,-2.930053839459262,-13.026015941459306,-2.4816880648603985,-51.03258012541923,-4.086084425093365,-3.2170565490982796,-3.4459296696108686,-3.41642312101504,-4.0222180716601414,-3.5063785161397725,-3.441189830192651,-2.610214017697691,-2.5724067315928902,-2.443015813146389,-2.804878547769695,-3.1826693082931405,-2.1174279332643,-2.4796623232683244,-3.5240675257716276,-3.0441161595904194,-2.990643765405973,-3.054675374099577],"c":[2.697786022316592,3.3305017544690587,11.742210014243563,12.65550504654516,14.466264092882096,6.125726824292016,3.851206490264988,7.000590597276436,5.175677308180834,8.509798385754664,12.478550126829536,13.65462349449177,7.535385157678459,4.075496337486903,20.230910350024452,1.848215472513334,6.288205980260212,17.62498890606843,15.88196527489225,7.538224013409946,11.27069634703957,4.645721102197985,19.976014206120986,10.650906996537664,4.333449521696403,8.198246479761345,6.451737875167444,2.1458544039550933,4.793625084320995,4.8767776090031525,18.17925448524447,13.81849288662588,8.03077600715568,4.224733144948444,7.649914783187221,17.914042632802058,20.50808749999767,16.119955890528225,9.815360110562565,8.535498157315352,4.8869899320206125,2.0926810182283697,9.084066037412331,13.371369481893485,8.580234508765828,19.258808074102365,19.29904934195227,6.89900488441804,3.2223735565926273,7.6947992923600586,2.4639427424125007,17.150673451345945,19.447234022483766,10.143887857993281,10.011689357055745,20.22947726909937,19.685079881019977,18.492489393387753,11.70075488450204,14.18338930085433,2.5397733384316137,7.611757337026711,11.33718145379364,9.056573198342022,20.29578059918206,12.943703238525565,3.0676875771952785,13.53028262868131,20.43065452588592,19.746739816625166,6.158731027832153,5.475693478465517,2.0994011104861157,2.501202697168722,10.73348939069513,8.883099942762835,14.844088791194253,20.30915057973046,9.69445768057827,14.382782819437132,9.967130936507775,13.642155057721354,16.343826899624823,3.6424016673281425,18.136927232756932,16.178829986902347,8.489891653799049,7.600272336009785,6.702206660491069,2.8188568887622303,1.5866266345538973,17.03384300620208,15.852912193481714,12.13523842875491,7.703079922627202,12.871432532550212,11.016332768740831,17.013980479146163,14.82522122587105,18.938801894397468,15.32179772189186,18.769719401256822,10.294157338719096,10.075927623129957,1.0941008680600763,1.300037172484,1.1568614749777408,15.831770617651848,20.03982181069599,18.4397821825304,7.972075741956316,10.355836872340086,19.391178883157878,7.38985114968289,18.189411454790793,12.295199962817408,4.574832370008223,5.799289793612114,2.1882817355819064,18.927014341366274,18.980322358321285,19.06184471611902,16.453442764278407,6.665807499413402,10.213740368137096,16.500518907397787,3.732567157271615,5.701956226571213,13.601700420844404,17.77893327957362,13.460588660587902,8.308918607535805,7.9443146078174856,17.57136181633647,3.8833672787883113,1.9207044357177319,14.97488297680129,1.366814004815077,10.850089881306165,11.222496293729275,1.1726348118405152,14.876578984957288,3.1066046737704447,8.004178548245857,2.461377898169589,14.394261651220582,18.90221493062449,7.704805984706681,17.48414452732046,3.095345337825747,6.068543174101814,13.396147968669485,5.2606479233024075,1.7571684144712654,9.070972681843983,6.680939275224568,3.380624809175891,10.419016143274458,2.620840906967489,17.881122952105972,11.715946004980541,5.546176389619205,19.528373777686316,11.2596820347005,12.426110186972487,17.761195584374548,9.495153202575692,9.555622085908059,2.3886625017029175,1.8162595086574553,7.242163830439513,20.791493035699098,10.554598300185862,11.339505722104626,8.656231024031781,9.603764137352554,4.093529230140262,11.839806665588663,4.14582782666859,14.339333466106936,3.8442997202932263,1.434445236736618,3.576943650789749,5.808360800580589,19.403765414184782,10.731385504739102,17.89068076558454,13.985164629403382,10.258585431126818,6.720425788884307,7.123489898342878,9.552485185995963,1.1319613243092732,14.79877893314752,18.086094768659578,11.197081551944581,19.607475392336678,6.400156023531388,17.635696173947156,11.687920692863777,16.152098722324943,18.598138484180147,8.233830159173454,8.642740009438999,11.008214560678894,5.008205334539423,2.0316114012086963,13.617263111604418,1.8607143039150822,9.383749642474427,19.64918965589469,14.783816942542511,7.642530768238912,18.529028837003374,6.7342480336146995,5.599494448542911,12.802699784075168,4.603389557185803,15.267023080468437,19.89105531315954,10.055644778668533,18.132634298676383,8.174801825530896,19.093958862079713,11.005749010892373,6.1935938438727725,3.6766679059155374,11.680144512286223,9.903697254225257,9.712589866901839,13.925844401105255,3.9984787169957006,6.519528731584145,20.797005489585775,1.0774848510146864,9.004239139810117,3.7556253623954685,5.5205073625596714,20.105362272583317,18.335797780555605,16.870846460661635,17.55862802166009,17.06837838808238,12.010570675527811,20.962234696507302,7.698856663288191,5.522424682881456,18.275234489751274,2.8261887839512836,15.062840692891996,18.89167948280458,15.109748117748984,19.3643639217679,5.834711112814465,2.517953200622939,13.985816716000524,20.836947083072648,7.474135851458387,1.2585777297238767,18.81544357917742,1.904044871212366,13.032068415761943,9.030142206625221,3.012430692285694,15.943824635357963,15.743962418356094,8.084321340298402,18.175894526907808,20.01223037799822,10.237408471772195,15.368472250618414,19.145729558788517,8.582685279438168,17.919290408146388,13.03277624597051,8.901596774950725,2.4997733067643004,12.966981284535528,8.213777146195387,10.082011674040071,19.825012630512518,17.719447683750328,9.471304794447999,9.746830367642048,4.264947356528958,6.190639223067315,3.4618225539473437,1.2977354604524507,18.269526798431215,10.709476709485667,18.412169689364923,15.099188609363335,12.201688272982068,15.311516907214399,3.2867859944139735,17.085073754110578,18.572594749265782,2.412759190552624,8.13496696221116,7.535232033985969,18.30208434663453,3.5472397376359623,20.266036883993433,11.434015277555089,3.7667875879408177,9.747520251407636,11.701987962991865,16.1837345869259,19.984991565549528,14.078852436276915,9.503212628159144,10.30846942786082,4.306776618240259,12.54547414171033,19.205519774919892,2.7171137767663547,1.9184318570885308,14.624573715071735,2.2912418063657416,15.21207580971998,20.25299657529,4.1594741621319855,5.225076952871634,10.227381801619675,6.812929733618222,6.284385548631367,13.60155944589938,20.570782691791674,7.223755432259037,8.036826011777503,5.496052488828819,15.698503695671983,14.55849547944386,7.745175926047251,7.12630442624424,8.156973409338484,2.6107212922900205,7.5296740904399675,3.582304542385878,12.689323628229209,16.866017001761797,5.230193010157053,12.147911859316144,6.868328292808838,7.142482629823736,2.2292710638777926,1.4565889127136558,4.483439688871162,1.7920944537782315,5.420682033544363,12.156411864296087,17.456970324541448,17.903837490778052,12.462506978151335,15.050011737160059,13.974467537593984,10.449895416249268,19.81834417565608,13.969748075004457,8.559900454064898,4.468220759582343,19.665075611223063,17.713138133441866,12.166223660491017,6.298758149044187,20.272333858705466,2.0476011760594783,9.442413685527654,2.3462514476599274,8.973527166969006,6.491167279582041,1.3497692133503438,8.6532864280578,11.335821220915506,10.912338982449867,13.388039603705039,5.512921806503853,9.702921856168082,19.90386678720761,9.402336038318756,11.59228413795898,10.658547809043414,19.817311138603383,17.09058100295733,15.736026853059979,20.491028846597168,15.606358070889094,1.4982904214688677,6.9671677245463695,14.049320967173529,15.086402801478064,4.756570090958133,7.462402569524022,5.9234347974072445,17.111253014397192,8.444558948380205,12.714523957488154,17.475492598658615,14.353683898979014,4.564325582170591,19.274643919316418,15.327842107593067,5.112052549405161,15.118149935136746,5.214701487347634,10.416979356484404,8.22367071592128,11.666539460191085,5.847872870513927,19.18736135197178,10.138869098225758,2.233680310560268,4.343631432868626,6.462640147998656,19.494858768338176,13.190393146332372,9.326387570101726,14.60666997831569,5.921698413363922,13.62926489533768,10.192835582942305,13.340088706255292,7.60453047982724,16.102465525067885,16.83505323767609,4.080375749894748,7.059954668660428,20.707276515349843,6.658411374232251,19.185390230376363,4.732676764706957,12.842535782678993,1.2941524302059717,2.5811553600263917,10.9378322627256,5.925571939095792,12.384882127132023,19.399978647344856,6.295837602337898,1.6024163641278157,7.930247007440413,3.378384042115913,7.877013235372331,14.031988512716094,11.567108380797649,9.19473941678082,1.6678532928493564,3.5487799910643005,17.475852317726407,20.964257103233926,19.251969724647118,17.5289267603333,3.4055623067817677,11.155187480674135,14.520714901181794,4.770946950126128,10.080182050343119,10.636539445143825,15.733816873389642,19.858405357489435,9.647331303858806,18.7002066894215,9.485082905555217,5.386315809992447,15.138226256054857,2.9592953133339774,9.438904421663342,8.014397000896029,7.152552025799598,20.746825477469496,3.643350318751989,1.832672966074166,4.268956981668603,3.683603012938005,6.507282868642496,10.897966929469423,7.031152636457531,19.307689004476984,2.521459778952674,18.03885005715778,12.706175779337261,9.563476457972868,15.573206886118474,8.13864530626665,13.793021430749185,12.920829184754655,15.497098940335524,15.75709210461054,2.300863616411343,18.69586294116297,5.161487683764498,9.16378755347138,14.366380445199496,17.743444054175956,4.097085057697213,11.360280027923565,7.953175324335978,2.2763531863129796,20.524735454832673,5.718796878970557,1.1554006993348311,19.131570664396932,9.034197140139492,5.631716692620413,3.9149636024199577,4.633786717291625,7.281236273173776,8.061682443101551,2.9632642325090632,3.9118660985342126,12.832472815544426,12.151790379714,13.847871280580566,1.5240362736413662,13.616261657266925,3.7537804349348116,4.344296063412124,9.007619753024935,5.480962101486359,12.44336799077128,17.479316601612155,6.19976026899962,13.757376920893817,20.805961099919465,2.1479128559436935,19.024876893708438,16.489460192390002,11.759491599774877,12.330113814028202,11.003155961067556,4.246320061352339,12.266161255883457,20.50187433210632,2.0763773623037887,2.4267607448096076,11.888252587720316,14.433421539895058,12.071842048318752,3.322119062307566,10.806167492557876,11.724670107038063,4.249929091214083,14.416086949275673,17.677249821283027,6.627873885824912,4.30238180573962,9.992983048686266,7.176302980775534,13.146565092246844,12.835856020915895,3.0112293141251936,20.77181700195758,3.9313942996261266,1.0740352792705146,11.3592003502648,18.84456031649908,17.080109926492504,15.481368665342922,2.103472504333025,12.841016797487844,5.435135380303024,8.065638607822656,5.787061106861024,20.31643270875246,7.717534722802756,4.397515018884452,6.167075459853958,17.117013013273223,9.283159573321402,6.354734312493008,6.512786847878113,17.804863031984375,6.607927496989924,4.5624070998784685,19.322709414626704,18.955068282350947,19.546497977258987,14.363716325439,16.996509580115674,15.551399794399078,12.733349157416995,19.79225886236384,13.946463961743673,8.619410629638352,15.46911066925983,18.022190940422295,10.771236727971528,14.095088784227382,14.715077971489201,13.949532075820485,16.595982721623574,8.304044492472954,18.48572111880155,2.6002906495881275,5.778831139589119,16.599833062331786,10.317238832372352,2.6058082866595047,18.229920457659414,8.224472961974357,15.931844691997437,5.274695424107149,3.3528143293049597,18.331296292349915,14.326707407151662,13.554901111864805,3.7014920647938467,7.446861479233816,7.70586097561046,6.331085656264194,9.769675007304624,1.3546225438842576,18.0624221571046,16.310302842027994,5.054115058773857,15.9030624928439,15.817595225376987,16.857407675196082,8.999496798432908,9.12167053990279,18.594958133114737,11.597395900225855,17.336284427126447,4.251656773976883,5.779087399230573,9.011531569088328,2.6200053448817497,1.123415185480713,8.073163908945176,20.631993374376044,8.491800399360113,16.208176228728917,3.8429261584404486,16.858135013652532,15.879650055293197,19.906676930888906,2.571621835329071,18.902595761729717,4.956712078676539,9.253826447836126,11.480140977731818,10.112532959288666,17.649981804024243,3.7314021361971452,6.5268242025882985,19.728906355236514,19.256929760431383,4.909701204142375,5.411213891902088,5.627505451469069,7.1680254300089565,19.195762530725737,15.373345001115748,9.960860861052819,2.6167968260538856,4.956294993723413,15.097806613365327,9.024188005424847,2.489297839135313,4.319496528984289,17.819754333255116,15.63159156758865,4.312649171437547,16.915603745089754,1.3015357017696907,3.58210381813202,3.084578679759508,3.45290191310914,8.647043417284873,7.480985803291999,13.961864059601611,1.6702272714938173,7.1593911409865365,17.119511313839062,15.103584620098228,13.145662837643641,16.179235121519525,9.60389444388118,16.84965227704795,13.918340741578099,13.342920373240966,1.8406933296658448,19.95741527369699,12.099909442954434,7.509360804183109,7.057747157260316,20.575494021667282,15.71895791812253,11.016634747659507,11.673019078120657,6.5969421772995,7.213475523795422,10.855407919621605,1.4528643605963945,16.297588505938183,20.332108055557594,19.590158840868078,17.642671039608906,10.682056483268164,17.642273319678434,17.592506967375236,13.999766433340945,10.938299763625245,3.8734209618993933,15.079246366640623,12.555629220804114,4.754138859202643,17.85910318387775,11.029266834413061,7.217723915888875,7.866788728565663,11.832384866735403,7.9753424025152855,17.451532997945172,14.843538279243056,19.31793205474972,12.707743897945836,20.24440381594898,3.6038366282987635,7.648259492801127,15.886504817457592,8.069217494096861,14.359473257553187,16.035141384961562,20.66164997341314,6.599681011422493,15.532984393072837,10.408762036439695,11.583142565323298,8.679597138598533,9.824935529641893,12.867033020068426,5.768518895291907,5.87506471497952,11.56411247892549,6.347747179327489,6.490261712897797,6.000996762347483,11.011493267293812,15.292839602454528,18.5623391502219,2.898983994168657,1.6223770732570832,16.862791853355116,10.033590442284272,4.623149538904702,19.218026762216503,10.722086073817975,6.045928368534787,6.749166676401378,1.5715199014677985,5.374126565306984,19.158333233899498,19.740484108769383,14.478420896061376,17.116249016275127,20.57974462172459,19.54724615215126,8.56054026966071,8.335479521893177,20.938997299298986,18.782207232507883,5.056197184653132,2.787154754476137,5.304538437218901,11.410559287651884,10.760007130903663,17.33902157426002,8.83225834855202,10.366773252529779,16.053097261018134,6.707838933009746,12.088515224513586,20.33188036060106,6.981790454027576,9.619050899789702,5.4932678864786935,10.061890174290141,13.815095184529955,20.663252754441658,15.086928520486182,8.074337271282797,2.4042157041562664,11.626595662964275,12.798137911250928,7.549310603101999,16.64089961228185,16.6422915417087,10.452473995247676,7.50496972978134,19.408263118952295,11.175320303481353,15.475970260560329,3.791954677610584,14.468794847399712,16.53891675481159,18.109768297829014,15.235544286256552,1.0360128543253024,10.462164386835754,14.317619047936034,9.729810618715437,17.59752115779726,14.90705453584513,6.034604597895509,5.726702372701621,12.167083601015841,15.324518474022012,9.384654317447978,13.333424729269868,4.366071489577691,14.08241378888654,15.084962402036577,9.709975701838019,14.776937098744831,15.312392171154556,15.588338969301313,15.246368529909748,19.702573402680702,13.944853644602619,14.529561216773246,4.6197051821958315,2.440999763153581,19.83608532251058,7.802001605705801,1.0694664199049555,6.268489449153324,13.294972724377104,12.74485852737261,15.808763014539634,3.2785856836830387,12.337346314711375,19.03507474075524,16.555268339023428,15.629804818437018,20.50834715810497,18.986116042083175,9.561817995375094,9.124186153799515,9.22966158571706,6.199676838299139,2.0143833556659487,17.748628959643813,10.982835232626638,12.47845468932168,15.495354335120956,18.044259505883367,9.044929377247175,16.453578434315407,13.951632092884612,1.9044586077181949,20.576129726926226,6.6432394729678625,3.3028770570027834,6.000101836176576,12.97596366814306,11.391582032086832,7.95131497008215,10.563925186503294,20.56473023322922,18.681305748258605,7.781472693073436,12.446020870897225,6.593907373866869,13.559334881217733,13.624799126675864,10.147565265554704,16.236607176505657,12.087193320721731,7.012497196992679,1.981884854326669,4.695957244021915,8.87690620595184,10.179952684077444,7.818089088684265,15.95048674756628,5.139756028056416,4.4788460981469305,2.0867455548371563,5.794347264163528,20.981266677919166,14.127604258672099,15.090651570697839,1.2515448681439247,12.923111192692337,12.919138171458243,7.930477653574378,16.710553172262994,11.155061772895806,20.52610024292583,15.440516478017237,3.180030680678895,5.0216964751233375,13.651548965149392,15.258905148262805,5.427944100366004,18.1899983879451,15.910880082966349,17.536066920496765,17.487283920920362,13.226761292678576,2.9018544822473826,1.570987931232434,2.0529528635084695,13.524713336110818,5.169289869790851,9.42330180354946,19.194287072288645,19.47327767231549,4.470993555072055,18.811600895055108,6.324464149766079,12.36405995651922,15.489766768194272,19.892661799469522,10.593639770009466,1.4612066465288889,2.499758848898911,19.996596514094772,7.290493699537882,10.348439460018664,17.03961620017253,17.980834624211575,15.74335547328986,20.552182747786787,16.059711666337357,13.38281497951534,5.7897398018768245,5.847269539952479,12.116886844835697,10.565402829238367,7.255321476565716,18.398975704543393,2.1588282664062977,9.620466691698795,11.692331175471907,5.661587689348723,10.546974470134089,3.174063448245689,15.751166663009428,4.53882320768367,13.087893445638818,1.590909295936668,3.7749732212256495,5.276039726685368,20.145680996661483,4.338100844915832,16.595055335161227,7.135438493672805,13.918517913402425,4.2144085123299915,15.688386152970327,3.0342147358667706,7.4267120887272355,13.559528352808167,1.9263251607680179,6.612485716187874,9.788095641877547,16.570622364991,1.4942041276535836,8.62040155419976,7.5238406313761566,12.507934492770481,16.2706140565717,2.2640060547729615,17.0937852126821,20.07989451658193,17.354311917778187,8.210732297659433,5.2827584917753825,17.042733667175014,5.078774150714204,10.945425826401678,9.887319242869513,4.149171333278704,15.73512264466562,8.83038939800524,1.609641737297233,3.2633391510490686,14.26144670266499,4.69006243691266,15.86984943898737,18.07041539019263,11.371051299391269,12.402088474569307,8.587962744607983,14.7177287141553,7.131621761304564,13.186756825270857,6.0160505276801,5.589755450908695,4.91517777624065,3.0555326275042285,1.9838375457164172,3.8133328084270914,4.163400560552163,14.056018743237981,9.622052128403785,9.035837813746936,3.1865144450386342],"x":[1.7470032780459401,3.3506679304158054,4.723026970666134,2.243910626960268,0.9058950579475005,0.9626266858455603,1.5045487669098807,1.626530104179971,3.6503942583753863,1.4025741315499691,1.4139939952276983,5.2941442094804065,2.8515566805887036,4.369696598830386,4.648017945487588,3.8552162745675957,5.294582023403064,3.2672995520346415,3.3910180020350396,3.371335356965062,1.8704707818727262,3.799467620275969,0.7948713017372264,4.741238818642912,5.745731479359108,5.11869030262601,3.9649185265238023,5.816301920181943,1.7652977423725325,0.9346709956860375,0.5065253511414303,4.757049732359663,2.848500790147194,4.244582489349762,1.5625150502173544,3.541907742982213,5.228376704764282,5.25776473765768,2.8148658593951947,0.4372198009942114,0.7417407187303506,4.455180008338391,5.000220763678508,3.174181153829065,4.324079796057892,5.4360572602302835,2.7685138867455112,3.4082412056975855,1.0517570814916128,2.082487862633602,5.513501227112133,4.62174254682325,3.1871058835082757,4.541052006289723,3.4178182003587843,1.9599223375666552,1.9293614394246439,1.9523482705208164,4.0503499340879525,3.346818135334977,1.46510540862597,1.271937891765014,3.8923674813161733,4.171093706458936,2.081715287137955,4.605112340255796,3.2619012636908185,3.8996255678926572,4.924709623637152,2.459493428766147,4.992048125542677,5.739903818407173,3.990329887592787,3.8418833605589877,4.452219744467282,1.7218177607480585,2.0883316462006025,5.7672995422790905,4.537800157097759,0.821650332454988,2.397090602615236,0.8584382586605659,5.329237365641644,4.094783685717501,3.315103417983954,3.710436787708626,2.0539088338484848,4.388385363262453,5.121190802864432,4.068840772913337,1.9265817897541533,4.35124523076337,2.6105305270203587,1.426352691199356,4.250577250127454,4.76518380433316,1.5063268216825847,3.0113076552704277,2.643635231087634,5.026927774091596,1.4304383637300304,1.8648064420014556,0.7089851279325503,4.081765416887137,3.961258848160033,0.7557515546485034,2.103624620071848,3.013413580313831,1.2234373656254136,1.1438808983427742,3.86025574034457,1.9787197310713118,4.715617231434938,2.193088180168945,5.073371345403564,5.749938715597624,4.47457157036083,1.43970134919531,1.8833028283420958,3.189924421469364,0.9067654795964837,2.7208745379117287,5.327045403019869,4.354246373392604,1.194927682798029,1.603422130687144,2.5309787554548313,4.6378264646640455,3.067650059664731,2.494317515257703,1.0073526008731535,4.359019482465403,0.9688043315704522,3.4128124371389097,4.641986612822707,0.5229383142390673,0.6301615145300208,4.50161567008071,1.3123673954224095,2.6918747970383246,0.5882386103624391,3.016779583594155,0.7496874220970982,0.7660295266403658,2.8865620658688957,4.310536791941426,5.3709305946814405,0.5601415144713886,3.3204067567841244,3.6788173721080284,0.07230930293687021,4.570489667272291,2.173202100295053,5.089529022820833,5.1639634337409595,4.597882847633221,3.069660602034415,2.9870895744058164,4.539611376258161,3.7818983686284104,0.4737051704520234,5.278280977210851,4.773170533792508,2.6426759775653763,3.1073396176599575,4.271623436306606,1.4553161657191733,3.1990662448991216,2.961373980578034,1.6981485252352395,4.464102833621098,3.068690569049955,3.2822623009723486,2.846341260161087,2.517434606389073,4.751256994355507,1.6322638262471059,2.501363003567116,1.768171736299308,4.699015417529212,3.781737259943159,3.2418909880609914,5.439471432024839,5.045138185483163,2.0269230155970845,1.4402017721121931,3.645365997367918,2.1382002784943785,1.1178845461416613,3.3693242401905548,4.996984674779247,2.7565464753559112,4.853677040380273,5.51639197185606,3.2299774405135184,3.221469886046438,4.401121070064039,2.5416617626833746,3.853820508694696,1.90367006934438,1.3583698179538375,4.065490883492233,4.96526760734778,0.48555850223521646,3.1046697016873006,5.436452595242297,4.753852689374501,1.5720282936693513,1.2434492920007911,3.2370332805767443,1.4986290785518157,0.1036987994207128,3.6478213348930923,5.063225911088776,2.3903957061000174,3.863747282978081,1.2454856828239003,1.622752125163103,3.6221672984557145,3.9988217209645605,0.6971112465944374,1.021645156646192,1.907759526116484,1.1430261633837266,4.571614367546599,2.79234502536523,3.375540184384571,4.417109961574499,4.951845753136393,2.3327701716122564,0.7320771746521528,0.39761872830892897,4.739088287477479,4.526942670091238,2.884573004785564,4.491142582847894,5.0046918016649595,3.402425909479941,2.5936366321608646,4.367402153840645,1.0307101780655972,2.2612050758169087,4.726510598858564,3.139175178917607,1.6996557798649152,1.6485310413786247,0.8006325664823104,3.2294019795904534,2.328949483584747,4.876901368084292,3.0433840434351414,2.82009143126791,0.9534677358959525,5.269223046029467,1.9835267914999888,1.8859527431645324,3.6841961574260194,4.471246801852396,3.3986889796410096,1.4861509220289113,4.871500769279753,1.7917109560509918,1.0987191020476474,1.3265555239259603,1.587767949753057,0.23257275741473094,2.2737895272361817,3.6533077885180143,1.921830500153799,0.3928449134779477,3.110688350240263,3.0110811037208585,3.8779114959996965,0.2631912930114322,2.381629980499909,3.5954358316506667,3.8095166605235664,4.004757588967305,3.3685462669470447,3.5441617249577826,5.775437077339906,2.0332465074169837,3.779140110203568,2.429743504631098,1.4066699459384264,5.420770468661568,2.282974199165041,5.068172826382476,4.039624646995497,1.134317909511746,2.3953098328353644,3.6516561933467,3.6456815939111844,1.402009116445347,4.4719162846883025,3.456627593917201,1.1922999850576956,0.9712388299716508,5.329797067530787,3.130050817018567,4.195200070031592,2.5303773388102124,4.346150671491245,2.1593817730698275,1.0115805909843427,2.1054475952986023,1.5330685906149053,1.1150376957524044,4.3999274928978505,0.8980751735893582,2.816704480159341,0.6147742100078664,1.8677324231494725,3.195617993065186,4.1249695400894595,1.9383332744266595,0.2665280890411883,4.277642993320596,5.0870838754528025,0.7986805482634411,1.9122627310996543,3.07792499716773,2.6143886884360104,4.483943390167926,3.3149472271692533,2.095856190994575,2.375714005388631,0.9426815375331901,1.6155805480605228,4.392336528471069,5.2368710276533355,3.3097206396725283,4.5032687604199815,2.0564984929937182,2.7772481698323066,4.38757213764771,2.61824977189573,5.198599085423858,1.227135188178884,5.324301065436002,4.838529164078581,1.195675309665018,3.5329377588362694,4.481698264778729,3.17851077972282,4.8235367596574115,4.859860749878662,1.6986928160432537,3.210165800787241,5.342772553750584,3.6255825473001533,2.8247562704381144,4.513585917949077,4.0865315338244,2.955738235217277,2.4709466285241595,3.2523810938268243,5.506348527466674,4.616104532096183,2.5274203292091393,2.638397074965524,2.2013908714092936,4.468522335643748,1.416705742355867,3.7238978603324155,4.814279590532258,4.095404248835798,1.0989291011120896,3.067454594392596,2.119711664972643,1.8235647674865374,3.4527296632480406,0.27694560482314157,3.966964177308902,1.4984842721427967,4.394306300225739,2.147146093166612,2.5928910836965926,4.080666306134872,3.5051872151841454,3.152332489922517,2.29945653816742,0.2116138522490647,1.6775909280338994,2.372061798336412,2.667689435502311,4.84496163183552,1.1787166010796086,4.532953191311834,2.1383816107461295,2.6613388204432384,4.778276820937451,4.852901102468616,1.3190541447629307,0.4790755857512339,3.214901188309577,4.6437482906695795,4.484440356385587,4.542999141838775,2.4044755109747893,1.3749305697630385,2.716612770054464,4.892543083499302,4.278025088344853,4.442457759359218,4.253895935788975,4.069894491509562,4.851140103739802,2.1244773321715806,1.2866352070993265,2.5968636040318778,4.948220467183761,1.6640944075346997,4.148864254704468,1.6277250038822213,1.675821263614246,1.9809217337065768,3.084928239338657,3.838237786856757,1.5989565559228842,2.9065208577824384,4.368856798879932,2.9025677024722283,1.0812329451743705,1.7882687615800705,3.7051285659061097,3.8930392411732275,2.548872925855056,4.206265694886769,2.25507873542563,4.294462064358877,0.8919583532878235,3.510264160645896,3.1102372518666583,4.869398682836011,2.4446399450350738,5.152855476414417,5.143794638577605,3.2005082350997274,3.0894077093013204,2.6821955386683043,3.564733324361304,4.589096666475772,3.6396219966921137,5.6896893294636355,4.778604705405954,1.9264134816762184,1.3202333001570428,1.7444527429486536,3.3414888899667954,3.401952732611731,3.436578079989447,0.2337906465714361,0.29776599909935886,0.7734984412504866,1.7612943923924804,0.6409850992304151,3.9085728431709725,1.0100360275695408,3.1692146339931444,2.0656012934985113,4.4458955428129965,1.7720332126697564,2.5119981635524002,1.4420755698555883,3.9175590098671664,1.0146952992404397,4.753096676572488,2.721251411817377,0.9108053153824918,2.52215774219236,3.1511997563697927,1.9833356656020964,1.7539371474826924,3.411504841906708,3.3483743504919596,1.852211162544077,3.418201781134523,2.971234540020194,2.09292358505557,2.535843694871961,3.22189469775284,2.221188165560306,3.6861491143115552,4.323694540310314,4.544321388104384,3.9980049658414325,0.4697458559536971,3.854507349764816,2.2658128574270413,4.621755618334561,3.7471875197843483,1.635430022995443,4.736127787587753,0.645982269489662,1.3537122864948608,2.8800479839913278,4.536933280229182,5.269335063437529,0.7866881897187255,2.5231328725830684,0.7024942073438509,4.466666145120081,2.706122084952463,5.153173740732804,4.886888352189459,5.045306508991302,0.867163729853673,3.654840831962353,2.3612011943956004,3.8284949106065307,3.832527526218238,4.484408709882103,5.1402522099967705,4.20589091942861,2.209706328255619,3.405521038396353,3.7478685019445637,0.8670937730395463,2.642444892609155,2.6419196543323995,4.28067204897571,3.4678431680603263,3.728212729913884,1.2496172155504595,3.56684049704538,3.7197135462555897,2.145012934226767,4.524871707877592,2.039335822592147,5.57859885124032,5.051588872104277,1.3447224913104499,4.282759762598384,3.452100433207982,4.333079908653908,1.297900295436874,0.9266729369701154,2.1530497048039474,4.0045621196571455,4.478318143789597,4.787623288982502,1.7440935780465092,2.072685632494457,4.873226792378047,2.9848255209151375,2.344462112959669,0.7603702855401335,2.09088151626562,2.668273255380372,1.2687967434944742,1.5489168358781202,3.690590961700085,1.9055891854978293,4.469021446779622,1.815153556568433,5.172015817881842,1.558961287932164,3.8755391308851435,3.081264923635084,2.5571038603279224,1.6353476204712605,1.083216649246997,3.4351369601765995,2.2307679591310734,1.651853021518458,3.9230022846861035,4.326011968274969,3.5777593017408726,4.647490477950701,4.6914438920120265,3.746705050715585,1.4042995063780264,4.202612496939446,3.367939708831193,5.458906292915229,1.837974544576846,2.850001049780943,2.4598454479929526,0.4253394224088982,4.566719371416685,2.760944222233596,3.726600910584249,4.970306539395175,2.516413642762282,5.735944552548144,0.7360989584118585,5.4092341031126425,4.216070971231988,2.348214553235768,4.971900131153935,1.817801456711845,1.0955140010803284,5.2081660956612295,5.0129091834418675,0.9891311800744131,0.9348586628764131,0.6756217226081995,5.839752111075578,2.1956210835637116,2.0944620478372045,0.5270059770842044,3.4143978686539613,3.5201976631203777,3.2305300931931544,4.285083094865086,4.97187385978369,0.5642106318401854,1.0261751353383064,1.3145223631611402,0.2897978935296104,2.890603044422692,1.4262311898923394,4.217967209087942,0.6334188454009972,1.0260122229130695,3.0027224873469924,4.998540216670586,2.254162699939354,4.225694435516663,2.6969886294430543,2.9050565017446908,3.258919409710729,2.2836912136100724,1.8201793339835795,3.5513876967511875,2.221084155371206,2.1150360183345303,5.020844416775446,4.610977384427554,0.28952881086187054,2.1749271186210017,5.402068017877658,3.2893936921901323,1.818827923270804,2.8883827643222713,1.5031068942245807,5.402968349958249,3.3202088983960287,4.04021954216872,4.483742899187728,0.0993342963649857,2.262121517078376,1.6680455980043125,1.1976268253468292,2.5168410036935223,3.1256956141075234,1.8096825670674073,1.8329811358633963,4.519964086495396,1.7907431520535653,3.5257785539127697,4.270020567907089,3.6950655132512624,4.198620334312416,1.9301573199380664,4.0174331466266775,2.4530251866017863,4.190011082487922,4.353599188767305,3.6101821933966822,5.6515247471723695,2.918930552840613,1.0032944321697095,4.128068862365545,0.9258059316068743,1.1546753541725976,3.7920718269694356,1.3858719865063156,4.846492998082594,4.080805180471642,3.207006035215878,2.0889151944956277,5.863994805286585,1.3935206896107628,3.907745337668006,5.120955811471225,2.6081017188728697,3.4151370602744877,1.977227481430317,4.805410952296392,3.835369261737503,0.3189933565145677,5.011276962513824,5.863652824581351,1.7666998930245124,1.6312781290442855,4.402338599863941,5.101579758231546,1.6392137871925483,1.8937320185098365,5.165092038126827,2.885371290125551,3.349235184319809,2.878482281989018,1.2493109743940607,5.146047587516736,3.004404421978487,3.7168072194774724,0.12084640269259661,4.679743393478413,3.8839891506861726,3.470270964495824,3.5259659442918885,0.3292723959926087,4.31892651018062,1.9525844369815692,0.8449750845375525,2.778423450865816,1.4819795404988594,2.2505429799703727,4.321358685363504,1.8210228645539697,1.7768632012923598,5.345739682818892,2.596472590288761,0.9444125747426892,1.2043949676965977,2.2925785123608233,1.0508778456440382,1.9456523327976325,0.571130063101958,4.087848892213759,1.0616678850060384,2.9334137784606904,1.8423636701724664,5.093256385980002,4.833390083459051,1.1650116384237548,2.5540762126973595,0.8220078235390691,4.612292683760098,1.553194319497902,3.856545044760679,3.848448128050565,5.480405815980244,1.0847680641946171,5.622959853234715,1.9155000146188212,4.475004609433674,4.781675561199877,3.004044767244743,0.5745709843644478,4.926128184595756,4.004536443266494,1.9961145288653566,2.0819479466980306,4.7953260604647685,2.508928949958191,4.196312822863063,4.25461350585061,5.385862103139287,1.6666467409570895,0.7752801660718902,1.970033365387912,1.852997358445563,1.9989098928277185,3.7302868236449136,2.976155081407723,1.8432302992928766,4.187690661350969,1.373229266228092,2.0051939105886403,2.2450726971424895,0.9510173374950772,4.99636952862648,3.227834284608395,1.649593597563491,0.47095103527925386,2.380113384251838,3.6494053879471946,5.0980831394862,4.727529536571741,3.65447732236145,3.772338838444729,2.6142718380624492,1.5302660465245117,2.382141499352989,5.449742598427189,4.291047860302618,3.6861629968472003,1.272123883239327,3.7145486816868987,2.82683301197786,3.2246377219295224,1.8789037061668237,3.8472835996508965,0.290104640851361,1.0767571385644237,4.625169956528132,3.7296225193838506,3.570793495374393,0.9720177470793738,4.683933410874357,2.9034366707859465,2.0473516315569213,4.7946820375224455,0.7972881382747623,3.2268907754716336,4.6275969509312285,1.0567236465188925,1.3798308071449161,4.401762058039922,4.927220185319609,1.2768635361805036,1.336638933680332,2.425245794996686,3.7691667281713492,3.021350879155748,2.549209087647399,3.056592063425594,1.6797991277291093,3.404360009236817,2.1546650191719707,1.1706686409934712,1.253251048213975,3.106297613841517,1.583841825112267,3.6227102910513107,2.7125615498073654,2.536638627456359,3.8992403397981534,4.064949221486803,2.913776365386834,0.3986710322245368,2.63088155102315,3.4852582306777453,4.030922289574293,4.3601931246559715,1.4493918014272844,2.172019763676296,0.9170411193231041,1.3174219412732517,4.208853622608105,3.671254758438535,3.11928938625279,1.6370550315879697,5.00048302421637,2.4800755692187364,3.0202138703087007,3.144205855583178,1.478246989654757,2.984846193969582,5.080194129144333,3.9495295128157673,1.9868139811093608,1.7963241670295333,5.349550936218323,4.608682402359165,2.2419307572488174,0.9271611996067775,1.8273665710394893,0.6852517325819139,1.186853030146974,1.8973133260099686,2.584780634804596,4.208087884720754,0.727573544665008,1.8501838149284195,3.6457156402184125,3.6818213811427465,0.4202748725269665,2.4484209662506453,3.2922760272162153,4.530884332335987,4.921682388487371,3.2329373110311366,4.7116952042716,3.7209181676883514,1.3802286356832043,4.818379197896822,4.419975436577064,1.2933224847840123,1.9325259611379761,4.258635453520822,0.837229177638223,3.08798554229214,2.8988007321840796,0.5496327682069595,4.5361826094708535,1.9729427351476438,4.708417800508302,5.291698772091722,3.750970302579714,3.046824925650485,1.4186811710916027,4.926420131641109,1.3579838007434124,2.5950971198459465,5.428701789841154,3.786919922455273,3.6048077861498697,0.41940898569058316,3.843367515186241,3.4998475616323566,1.7901000484652427,1.4880798585867228,4.020433460101446,1.9861376596641784,0.36210555700326696,1.6712311321618527,0.8684160583774163,2.58589887712827,3.320515397295905,3.6304193730696372,3.592655812801718,0.7818601372234963,3.641277598240981,5.216593119441493,4.698864736562816,2.208524262658713,4.503043980017693,2.0102431063038493,0.9952879472606746,2.9663842738228983,1.2760169106051267,4.60082178088888,3.9032465874050466,1.1014178473430318,5.178718917709471,3.300606156813001,2.398532204863298,1.889953410860276,5.779006723125779,0.8447852469398309,3.9630870462522623,3.3779137844732183,1.5002600017488075,4.383726815908252,3.2885257600896387,3.2039649588866093,3.436214311698169,2.5074167388566715,4.773021348191412,5.353380741883264,5.090778905826441,4.972305121371235,1.5603469798957028,0.686453972717207,1.1221678898272238,5.684914370960998,2.9111526362894136,3.5972275006749506,2.281245575452272,5.516575767520142,4.761795879911068,4.709055506036599,2.0490991730221846,0.9153666616365614,4.294339442236728,5.508224853390075,1.009725798304541,1.860411214423865,3.1636808665790572,5.43563782543437,3.3497348206483806,2.023467326635421,5.124342835477879,4.285361708765207,2.113673075370901,4.671439522510212,5.335261064899765,0.7182314698653964,4.127515453253041,1.6146658463260424,3.6972115649938972,1.9992993681264013,3.8465232019366873,5.689195042793187,1.0824636614430962,4.407262548848653,5.008658709278371,5.593195986544699,3.414812242006179,4.791537615089184,0.7521637327222614,1.8927908567094356,5.17516052704773,4.56107325641591,0.722399893083405,3.2598609682487143,0.6887004994334338,3.4403935876225678,3.8740967521756255,3.461653387360676,2.286667779399971,2.6189990097531775,1.9617444511406286,3.5294002397900037,3.4423549077556315,3.527131228127364,1.7171778353177432,4.308391762085487,5.75797953631635,1.5696598360549285,2.881073759130455,3.964170886164271,3.769830915819564,4.032410451333149,5.664429509300478],"mu":[0.8371023873019814,0.393790210391916,0.7737495866033113,0.4476148733166163,0.4474907849155978,0.8351714621911068,0.8676371001271705,0.8760673509968744,0.37898147505596924,0.49321584591135625,0.8492646771806736,0.6056856998918232,0.3562876453809438,0.2268140628395603,0.4920126156131963,0.37763448919359033,0.32873089850464066,0.3144603860683093,0.07052988976901031,0.5535506096480232,0.3350117540349917,0.9077867813343863,0.7896592321154758,0.9891371054029001,0.9420287805204561,0.8928989678070913,0.8065510386781336,0.8490280203075107,0.9343007678121895,0.7709035083427471,0.028445215244523592,0.4478443378243733,0.5761863031365722,0.29746839569197414,0.3817918375500171,0.09510437416918771,0.9658996326246381,0.9104941603846448,0.34403437929208414,0.12920382652076579,0.3407829811782661,0.6617963151323283,0.8200441114117214,0.012832361866498054,0.5871526607691573,0.8082008345419138,0.2415732690509902,0.0922179082492065,0.5880434869986291,0.35823607258520296,0.8747784825813356,0.456283374395162,0.5431823896979808,0.9670698336941006,0.8684299663210784,0.6421942389402424,0.49553887426967647,0.86104931774896,0.8723352666704798,0.9410544680416044,0.34057538428749634,0.3416329391643149,0.3115445577935181,0.808050650491154,0.8176109570439116,0.8439946469458828,0.8634060775151111,0.15833022857767753,0.7034433780366005,0.717283087508904,0.7602322529223582,0.9979667734963964,0.7353059285043588,0.36466621935009735,0.9528022827974316,0.20094835435384883,0.3621214592246209,0.9637825117296723,0.18040046125863718,0.7258760802486048,0.10017467473445096,0.6946207137818576,0.8636178634844778,0.44664260924351384,0.7767952470086854,0.13391687491975213,0.6896393447521845,0.9131256936280445,0.885282049679865,0.9036340551265603,0.7409825523049525,0.5804491745356297,0.31244992574067276,0.5715269559064904,0.46743880595366805,0.7332042651758239,0.9918556622751722,0.5542405975388929,0.29254085663547347,0.27267412560467785,0.8127293109769422,0.06744096398415245,0.5388209076875377,0.26375791484985944,0.2578591913437227,0.39784438535427746,0.41939814263412,0.15836366804814217,0.4205273764823645,0.4241341160449521,0.0009770748882274027,0.8820800692564907,0.5139265552948549,0.4036692112650584,0.3049711459037432,0.853132528018254,0.39463753653572,0.8915788577169288,0.019412281244270746,0.08458177961911328,0.2520661456527358,0.6080159810257204,0.9409824428933968,0.48904397797294186,0.4654979088714437,0.6175805663456875,0.5059454646925188,0.4086622416922785,0.658299890835035,0.18062001772378555,0.02705324522380903,0.6158007574850206,0.10327678441952615,0.943230202755655,0.79495024272522,0.4671021121651895,0.3656616293925927,0.8505842400275421,0.07157253286303167,0.20467326897929916,0.491617448721988,0.15803115228975861,0.20275896890070566,0.12646653557409104,0.5315357661764895,0.40563326298301927,0.6508956289821544,0.2946134633703925,0.10554519526259276,0.7900769818884392,0.011880509254715621,0.3104829177689046,0.12518999374171647,0.4011376607171593,0.3507728419982634,0.34906000251883484,0.013145863800317459,0.1353320070000763,0.6084480547451538,0.627897431786651,0.23300426057748735,0.9647947400596035,0.7553652817419352,0.9542783733601135,0.5217380749636311,0.5234446988523038,0.9624190496521408,0.8850818024238387,0.30356208151064634,0.06736200134601567,0.20397932097882743,0.6536417954425229,0.34775659141114357,0.6233174153410639,0.3661061641627874,0.688823299938137,0.02652200759166523,0.3792105486420707,0.8765158366592121,0.6274822547177632,0.4679133953556207,0.24292711067734762,0.5824121737318151,0.15782495024683607,0.7553084772166998,0.16903534967745903,0.3161955648709964,0.28599376205466687,0.8884713092777812,0.3591445272000686,0.4746719924141376,0.04817636522668267,0.4970228361023945,0.9216571845016668,0.7930599899115975,0.058232279059840186,0.013723805722245075,0.5449210797663846,0.5432757063934603,0.515984759355679,0.37025721206097506,0.7127153156200678,0.17223651934384376,0.14601634269289,0.5136786654032568,0.5065062037714176,0.020078347708766486,0.30569457880419804,0.2742031124406574,0.43398035053934003,0.5901858948591148,0.07642551709252432,0.6838990614633955,0.4001533532678343,0.10127457658424599,0.2592386292988662,0.2620402265395261,0.4205654729178223,0.4262635238543828,0.4228579931240093,0.10653084631447762,0.6072134332273764,0.6520734951424414,0.7112312878472968,0.6201424784171392,0.651620683317816,0.6641043655700432,0.7295379703808491,0.4549314581613062,0.11311127795153109,0.713142726445636,0.2972772200714653,0.5591477308538955,0.6640338520597704,0.02330066824696475,0.8677783476420204,0.23302956135122832,0.2965394082127737,0.579911137712315,0.3425316133704044,0.8181120656017085,0.3534050677547058,0.5700552838047579,0.7685366903098252,0.6829919893753682,0.4623457649104534,0.04350342851022915,0.28857117401443255,0.2568002663328386,0.8781314974722205,0.49312003783727265,0.020863407207262208,0.9464940415774563,0.2908640053838547,0.34010946650181895,0.23823917428696784,0.5717709675606026,0.6648812787219966,0.014911764551024831,0.1009372549763019,0.611788133897712,0.34431824129556743,0.23382547914297414,0.6324670463124622,0.20747292304729026,0.16072932465966439,0.5716532210067322,0.7141410902968197,0.8831942046126424,0.23293584254268307,0.13173762563543123,0.6022163566853853,0.20505216481397692,0.08406365541869354,0.9722690570824326,0.28528217994036953,0.35752755835195904,0.6975387337319394,0.3543755190015756,0.6999995250596374,0.9181788123356511,0.8771388059751828,0.6841821088301909,0.3969319902149975,0.015507840385061256,0.8056922027915807,0.9242073495480732,0.6173591650254744,0.040388674112639134,0.6907193268278209,0.25250894494232745,0.15176315349672276,0.7891195511928406,0.21069934638516097,0.14433809732961733,0.5184064298347988,0.0766496463185864,0.5193691748762626,0.39816335700797056,0.5988363598549706,0.9685397961265114,0.05701276995791593,0.05983757151767444,0.014441697892721095,0.6862554895291133,0.5545255114081429,0.3025800629803841,0.8931711899364547,0.4237823689113174,0.12183995518502289,0.5544407429407872,0.43497063840020456,0.3775957160661165,0.07299974215163796,0.4365484648098257,0.8023312582893676,0.0397678760364919,0.8641813131410676,0.509470879217502,0.19465391798266163,0.901587354144856,0.30944746273484514,0.193131724036552,0.5230542341091684,0.354014135959414,0.16999460770542396,0.18585452480309717,0.01906988624984307,0.3065290809625125,0.6464064699430403,0.2857732922202392,0.3815513270899302,0.27872944417878953,0.5270203517998866,0.29522301683028185,0.5122490413920506,0.42728560669916527,0.47517975955180436,0.11831102945398797,0.4436472968079319,0.24330497697814013,0.7990555587155295,0.636722571731116,0.7962824902291332,0.34066967777818946,0.9737188562591013,0.5404399138854297,0.496258302039724,0.7582150988245537,0.8855287074508853,0.6701776834667388,0.3733062749643876,0.39295539949108615,0.8356698877552942,0.1193425266111583,0.1742692023378669,0.734522722198782,0.7543896449292053,0.3737897891585955,0.44862464860521256,0.6452469408825146,0.8575606122467208,0.11557174121638325,0.6861738936030992,0.7614406909642621,0.7441620897709136,0.5387716351993419,0.20942879572685835,0.2575762880867256,0.9862132793766796,0.7903949460283055,0.30340322669146724,0.17798161347012664,0.8982762950549068,0.8374389889720419,0.7429267858856468,0.5666433845726726,0.9899505640249118,0.8864629038944669,0.3807288759103198,0.9265471757997925,0.4150328707420281,0.12177456795442532,0.5816955217665585,0.11886532805506222,0.3206931964887787,0.45056958137835346,0.39664065191639075,0.067829348994634,0.8152616447605587,0.4231406702547069,0.9414674183335077,0.5342784872415618,0.5824808458635073,0.3924863136754406,0.16863966408249742,0.2774150299000442,0.43257178556087905,0.4755373654381836,0.4583495903628796,0.883536863769466,0.022058318785761033,0.8619886548097084,0.18592038161587854,0.7890513754289565,0.9662009882463971,0.489778778354393,0.00763977288832729,0.18257924612860488,0.3384702764809462,0.12052161747382883,0.13784011046506528,0.3435755340092683,0.7347084352668469,0.3439494204633422,0.7469930064599921,0.9481638658735727,0.14311014892704388,0.5030333128363618,0.9199134570047969,0.32550505524228646,0.7483046683725489,0.14687673690988645,0.5288945253586517,0.8219940940702128,0.3275282239132069,0.7888640009368566,0.554067642749472,0.06873455114401539,0.4837789827776855,0.16927189351152094,0.4119263836293514,0.10704229143956923,0.5501164535354581,0.422793994391905,0.43182148701255385,0.30279033312941217,0.9851825459555235,0.10956351187477398,0.25922520268242244,0.01514031204038746,0.6670134268627064,0.30376178650716534,0.20918316183430097,0.8129591595999885,0.8648370406917052,0.48589988355480607,0.7277002753143675,0.44167546438389405,0.35639901590837675,0.3421727585520866,0.31020579433555806,0.03245241447858582,0.13175784472388563,0.49453277243909044,0.26101667540346574,0.28900648957333863,0.44768054400541035,0.4583240262833088,0.28119853538705963,0.01654185626409843,0.20431054115438307,0.3575328671252094,0.0200063202835441,0.05083131275274,0.7032938750367803,0.03714847766364171,0.0002553858014648913,0.6794026063642067,0.5699031988093122,0.8637079429029193,0.07285065011675496,0.3082504979563063,0.2878458565700224,0.506623593257411,0.546557874209437,0.07410105178760462,0.09286240034364801,0.8033619816114872,0.8986210809725108,0.7679126813547013,0.8203706453885014,0.4975568403936148,0.08071142674788301,0.6490771054387683,0.6053185359921935,0.9394363396285084,0.328657150283308,0.8891763915477535,0.12017222740876266,0.8684071923320873,0.19050938303444465,0.6775635567637559,0.5128755061829078,0.16218589768119052,0.5761177150727219,0.529714850433525,0.9448308768271736,0.4249698332665257,0.7019849194103471,0.09311750976457311,0.5057035288258214,0.7227313083418279,0.16544720579406524,0.8376294031446556,0.9013171582862805,0.5604627470357764,0.19152471155057604,0.9318826274603533,0.6523026327401076,0.2859662581899409,0.5241446818599096,0.9727992969280843,0.5440561648387539,0.2820735006613262,0.6031900354024029,0.02587070528147062,0.6016775554651057,0.7755299093344776,0.0007926121636259165,0.17535897998337968,0.42351180027025426,0.40825517671217115,0.637059821627634,0.9706594092852174,0.18903602956910182,0.9733104316695698,0.4891447014299237,0.9117654891073461,0.4029171635672175,0.7927674136557319,0.38002042806219616,0.1531091772339026,0.9528651120454947,0.19796544992642318,0.5908261465349782,0.5971795874260215,0.15592339840290736,0.01342994471427561,0.17335860075537224,0.24128191305553637,0.05654140300137711,0.5139282500446827,0.06536258185323174,0.11087100262186134,0.37245269284765814,0.6970932479829277,0.760335094615487,0.6997412740918725,0.0192267928862353,0.8437225576733782,0.15542427822606952,0.9801373564595801,0.21859217245944773,0.8975691503526404,0.5026478551933666,0.495705081367827,0.5227837640301374,0.24918315102818034,0.3783480033055706,0.33967903486941275,0.2632997196858302,0.7259517490420015,0.39121275714728454,0.8160948883506491,0.3094534552179251,0.49229186527162905,0.46764953829587563,0.6120773646501412,0.1816707501192265,0.17504961729258905,0.7209357485426902,0.42511387039367543,0.7272610083312743,0.10347626658589215,0.7188122454800046,0.13317267218587414,0.7826201389520011,0.5762504213030268,0.3546296236226223,0.5103129199560172,0.6852753914538012,0.4636743536114727,0.5598434312455682,0.7245497780676038,0.8838109119510962,0.4329127426300319,0.9192714223769862,0.2668428554480029,0.08284132921091003,0.6068881469138498,0.8104171050875641,0.9628419236167469,0.9600616465894569,0.829352382600798,0.6191037357849807,0.2762281661122987,0.35401801260241617,0.9149272870778489,0.34251720856146406,0.09436071862894391,0.013778456718392285,0.4372593529008648,0.05974675568460164,0.47958865929700845,0.5577982696730359,0.02512802542051973,0.3677554135261032,0.22299615340162338,0.11711734633753634,0.09466344532211468,0.006200274126608951,0.14769481951417895,0.3581344868211611,0.13905346164979426,0.49774892673924076,0.0661394124786241,0.17595087971696421,0.47709352897264545,0.08069317452174718,0.09357541667105074,0.8596002092575175,0.11940806230777334,0.6081572843947831,0.17889675537810867,0.40052332598075346,0.15092003011983546,0.7203539350285166,0.19090967907947287,0.3030492077275533,0.010341504529348233,0.9637414328288052,0.9607667631922416,0.35391780413033924,0.849616763000556,0.902049854376787,0.3194525809230686,0.767525347449548,0.31868522895292606,0.9762537446958441,0.3881739134968982,0.07965745380028921,0.24604129652267015,0.7259770303617514,0.8126723685811121,0.33852556768135056,0.25366033629124396,0.7959515646939626,0.7857683142833449,0.09694253255260343,0.17844962611937776,0.49093678151124887,0.40458284664489197,0.37531446827511683,0.035156448140734486,0.329915806238106,0.6972890786787955,0.5384778669509307,0.7013854306613587,0.6870987692528208,0.09013567776109133,0.8477708338984478,0.0955318132356846,0.9062850035005436,0.8504647501015241,0.9256920542572953,0.39027631618706615,0.9092223138277116,0.24270245225982467,0.9237853392098496,0.9996788339557778,0.541274269063815,0.8386515179310929,0.9788965226033361,0.7268920708996147,0.5796857059634661,0.7566619017114926,0.9997734635755797,0.993640055253588,0.7666370728509764,0.25149650748024954,0.23200601972111978,0.1873846877294374,0.5368406267114456,0.8821509494503998,0.95366869902449,0.6969019020677067,0.8009667673909009,0.7760097542490298,0.7086955818667584,0.0720080992423171,0.6171407113475562,0.9380912619954891,0.07268897005657493,0.8334932904789396,0.23090778184615646,0.685100363046893,0.45969799776193976,0.8178478200135983,0.021564847058796577,0.732537276283542,0.46650545087362905,0.7341749497186896,0.7549978081369362,0.018617785144958265,0.8654379644904342,0.16834138513881047,0.28142189634546955,0.7852593624255282,0.9218855492924098,0.33261923352507883,0.8018348762606302,0.6286918319156267,0.05017713937597934,0.8277827655682166,0.7227611697047409,0.0548918432378811,0.3962721493578232,0.28613552301542144,0.9440336424350471,0.8055729302470536,0.5361512825918104,0.13066742235341366,0.5282442837539352,0.5199210143042019,0.18815133188487132,0.10750468838595473,0.9036679084067203,0.4989377323390194,0.17357199733980222,0.031231509260426282,0.6784699958824592,0.6294579534965823,0.38477392208654804,0.7469638644797032,0.7577788772138121,0.35926291253939135,0.6650292793218915,0.19739326498550103,0.10439139216525972,0.634741901762407,0.7589810177057117,0.4042418965583996,0.47470741802693306,0.09703620050663786,0.1577994934839595,0.4546281398623695,0.746212841760098,0.010526258632382213,0.7595637685459764,0.6747793100318855,0.6084765714197724,0.42843478211224695,0.5896400318819641,0.31113760717703887,0.7362746486460494,0.7538392391472184,0.3454647815124068,0.3850316501361575,0.8341074916466988,0.31139601401915695,0.3294126101958139,0.9841095213121516,0.9866644443493555,0.0896743779986322,0.9881013733237749,0.36872853869797884,0.997836409995587,0.21439873632313966,0.9881401434404473,0.8610275209981411,0.5748232254011565,0.9302371473843114,0.23117204882390174,0.4427612266784984,0.9687729725684942,0.9510270703673536,0.13121296478446998,0.7602443333732105,0.2534848106739631,0.11656041039011233,0.5768914527939841,0.9856300101237359,0.8136840707485433,0.40579376695059866,0.0317178755164107,0.9807080963327395,0.12279844810530816,0.43533631579027565,0.3741173681357479,0.42489699491838073,0.24845045627706352,0.18838066766457318,0.3734110476671695,0.9431709381633095,0.756722659269353,0.6901119227671197,0.7870222272952967,0.005189609142442153,0.3592673553611718,0.9771553822070624,0.23266990726419245,0.13101724103449475,0.9176127268631047,0.05473959120317118,0.03311769638868589,0.5655922487617888,0.6251151513788269,0.7306460668846289,0.25121791413473327,0.03397866783802672,0.9691133847176117,0.6279050217572508,0.42127808523059196,0.7639322147650245,0.966951529650685,0.64531917478199,0.9103891432024596,0.9028390109931004,0.7570114743796321,0.08793013247937309,0.5684875502247655,0.5769762550806465,0.25695026795785547,0.2791587375251403,0.22163972027247958,0.8383946501862576,0.9696464468684569,0.2512609622274504,0.8501271072466432,0.43159938386042396,0.6928669602761004,0.6787549830539801,0.25989610339526514,0.9698308368406443,0.6492168827311919,0.7569080509023864,0.4663889563293222,0.8109806227227885,0.8011863873697349,0.836808882477829,0.8288407805181133,0.32772997616661326,0.390462588699821,0.5758553726965534,0.9558143749786205,0.30433948256131615,0.471593200154127,0.9520506375610511,0.23550610980093567,0.11467360293869744,0.16348167836001126,0.02607353015286784,0.4212089090184259,0.9259941578077393,0.6037489280526303,0.24697873247497304,0.6921045421763241,0.34554735146850435,0.02509398911765648,0.6669710127871626,0.17481209695807998,0.5702096223064193,0.7297324422068197,0.26924069049370236,0.13811829517293917,0.15144524980543195,0.09784814443782541,0.7798285124670341,0.5554490374656689,0.6129917148611954,0.9557516402350978,0.5960791733207853,0.5457256779364692,0.5306146826837213,0.09125437497718503,0.284812911790302,0.0007457134748691807,0.12292759472095782,0.10034254283671795,0.22876866707764143,0.7334148569372654,0.5533463870136204,0.34135073035645824,0.4799428190955446,0.8910170915480711,0.61959926910141,0.688195313477195,0.9672857031935138,0.5733245071906807,0.4286266296883168,0.815608839776204,0.1469303510514337,0.3165385657091606,0.657019794290038,0.5899361768444975,0.13635437242641157,0.6990577865238907,0.5348188894759494,0.2330012933953416,0.6750564997592816,0.6901506744711565,0.6139270331476188,0.2499395832342286,0.9174051162491879,0.965749326253041,0.09049905432788896,0.6479663918975846,0.9314043025740497,0.9988238462265517,0.3458819414809524,0.6096737918048765,0.5958161339184151,0.5272763819643378,0.16306263518357067,0.11639546701603609,0.14644405579240516,0.2695280932518813,0.3119189986830222,0.7664363320904211,0.23140881972607397,0.2531784154518639,0.20968612839172107,0.8777462621566445,0.2883615596566602,0.9257627944984239,0.30559971774780537,0.7435274611121432,0.7043868209656654,0.6169688688534021,0.17902184087489315,0.38962121602099775,0.4706579906587427,0.8150136766076155,0.6434502923596952,0.8016599927510208,0.6473076191193992,0.3389954251512419,0.15033641153229582,0.08759241387879002,0.7123809180899312,0.24254727339304805,0.8423932606685898,0.9382040503412199,0.8098591031143487,0.6923992256599627,0.4371573331370977,0.6822746554082386,0.35410738941081,0.2635199403951378,0.8909372529404829,0.8402671787425402,0.13908716767010443,0.8718085979663392,0.7549621726935865,0.087604978657287,0.006277354805795943,0.38553842614604306,0.565251836583136,0.021418127107308838,0.22855620957507616,0.5263909308922992,0.12040098580672187,0.8574058772784903,0.3773220062784468,0.3664286052210317,0.766462170916272,0.5616883864482596,0.6948355746619828,0.7397605045358537,0.39480190929328707,0.6094092142461147,0.6546515226287191,0.02820096415713813,0.3571320493261687,0.7228049434555202,0.7929550018119516,0.9892040343914883,0.12492963123248746,0.23064331829281004,0.6586863275419894,0.542792368029648,0.34607027565053183,0.5723625144327782,0.7594907541163203,0.8874064098290044,0.31755777880182734,0.9636267326911003,0.36663417527187137,0.8553848547986431,0.8925119129828043,0.514465865140445,0.368788696532377,0.7821049653558956,0.15860430516875246,0.13289992682403207,0.6953335536897132,0.18299779479707046,0.4945305024165101,0.7385492751002669]}

},{}],70:[function(require,module,exports){
module.exports={"expected":[-3.156769543445745,-3.02704962378846,-1.8038691909563722,-3.2473776086117594,-3.2174985249838697,-3.6593122171610912,-3.895402747221706,-3.1658594845277817,-2.145030986323191,-4.041129161617257,-2.4148339375742625,-1.4577403879834032,-2.8895804479521945,-3.0405547922960974,-3.340233792178536,-3.844471941396163,-3.321147013027809,-3.415462254902255,-4.101548733068387,-2.999904925672868,-3.791539636558622,-2.6157681614030857,-2.835008343430193,-3.030871743073853,-4.033831588801606,-3.0608929190010947,-3.803463302175486,-3.1522760769472478,-2.483463867769165,-1.3062102035046734,-3.6297214992911995,-1.215565661113322,-4.084597285565575,-2.968122288168799,-3.754110099289711,-2.5310946365589335,-3.430031096858966,-2.557518841738875,-4.118001413916332,-3.8191730560064436,-3.678482100897294,-3.4972129219029267,-3.858682554886843,-2.213747949875191,-4.321598461385653,-4.251561952924723,-3.620623327212493,-3.4824562530059873,-3.849187229277486,-3.848001205838875,-3.633869820755814,-3.6455840855791877,-3.8851958030000504,-2.364245071767079,-3.7800951117053287,-2.185620550678058,-2.707449276750693,-3.1991531313246053,-2.2603572898284803,-3.7992394425012104,-2.7073450427546057,-3.843847072951639,-2.525860194227187,-2.726153762905822,-3.5532495394413255,-1.6484414485347578,-3.643388512072667,-3.896193287761479,-1.1580969480362895,-2.7724928773723754,-2.351232061933203,-2.9473498546115433,-3.7598848536647136,-3.202337975931405,-3.727731860470013,-2.799917773803234,-2.5415388545613284,-2.6254444977522153,-2.8348878688274435,-2.86854843050879,-3.9820730589718667,-3.76298528881276,-2.5444091302070158,-2.789011386927288,-1.6378259766772751,-3.269675957571028,-3.435755868004428,-3.795420589267937,-2.5874324694281183,-2.1863830040069523,-2.5283467567216773,-3.2595584096897134,-1.7445742385755014,-3.206037480694796,-7.774210497746733,-2.686505790593528,-5.319308996403723,-3.3465368026414675,-2.1005706018882555,-2.3310442731851557,-3.171058983973685,-3.2671897921150466,-2.4844207034456924,-3.0445736588828476,-3.9435999160012942,-2.814410427831763,-2.5244929205504767,-11.383517579575749,-2.8903854449117334,-3.439155991236075,-2.7963357904306605,-2.9530733867592454,-1.3768417784262292,-3.7745048677482886,-54.82970311671083,-3.58730200985979,-3.47942970398241,-3.165968400017648,-3.0126998211520677,-3.5507187803913336,-3.4756985404721634,-3.229605290723134,-2.4704565905723372,-2.161218781858169,-3.940800526852987,-20.112689638873245,-3.5467347632854844,-2.5029139411347803,-2.8261489793915837,-2.3048327691362567,-4.016822872976987,-3.395190637520438,-3.555582846998298,-2.3834846690407274,-2.084765144510127,-2.8689032288210656,-1.276304348162805,-4.02548893575986,-3.528054435215675,-2.9988142312843746,-4.038015659312938,-56.42913176420572,-4.007189757066087,-6.627319736691881,-3.8533039931319357,-4.132722312605283,-3.4444382233621154,-2.992440601960793,-3.2315393030080104,-2.8901038191436994,-3.328918327302164,-3.317770290099934,-2.454107704034321,-2.8210276833157373,-3.7896320274731297,-2.97841749707425,-3.0432436958788904,-3.6858058293095177,-3.012959355866617,-3.953652724762229,-2.4670987493375804,-2.9049476102964102,-3.098030170875399,-2.468582973946951,-3.2310793340044652,-2.2730304223224853,-80.40059784472605,-3.583070919050761,-4.124450757208252,-2.809707353166143,-3.1702774090858803,-2.846082710773108,-2.953074657387784,-4.365006996703265,-3.7371525242484416,-2.606776733037811,-3.003071153130351,-3.954778870847844,-3.46262967061311,-3.9254819351102097,-2.593051917926613,-3.887064506668072,-3.8083831489905227,-2.441626321669454,-2.8025421200633405,-2.453863918542173,-3.714301407495451,-3.2241806958661985,-2.5362157356729735,-3.792643475954846,-2.6478936232206953,-3.0880850078519058,-3.4055212316922,-2.447724643814376,-2.9731287073187955,-1.4038342400544606,-3.5991242058171693,-2.5056332699693797,-3.6561254353738564,-1.899149240598459,-3.6873541033890915,-3.3907488725155277,-3.2203526816173556,-2.0722173188885167,-3.4450203973948557,-3.473840513591579,-3.3684142742488867,-3.6546663964211263,-3.7363817192261606,-2.9299980124645133,-3.2213932023241565,-2.9295022140591214,-2.643894175299543,-3.7592627686096267,-2.3546453176778064,-3.32842410801932,-1.6554465985855726,-2.8214275478374393,-3.116537897746061,-3.4880585818942893,-2.7471704743456504,-3.8014419021771784,-3.519477518347015,-3.5936445569066304,-2.289630641478627,-1.5527513340017012,-3.502599934564539,-3.381852346373298,-3.467737473812173,-3.9829988663586917,-3.7401037676051203,-3.334292729817046,-3.3676486351068555,-2.5717291327705376,-2.9236956010397934,-3.151032909475842,-1.7775712052082482,-2.98584599215984,-3.0991968219137167,-2.588005521566741,-3.8902465710137153,-3.9276188493554276,-2.784746984724039,-3.729095865826264,-1.9456262855593331,-1.9503832288332679,-3.61005757431666,-5.721770184552399,-2.4471260712525735,-2.1039268744094164,-2.4318325490553283,-3.6292339363233914,-3.5260479157940634,-3.186702796097105,-2.4875002129758146,-3.7109815551085092,-3.378540190435429,-3.9214312222917256,-1.6936206103293834,-3.607297665415104,-2.131953188428649,-3.7817514806129315,-3.4961532522246785,-3.7998658953015303,-3.128089097645349,-3.7287572281356223,-3.4626216748546232,-3.5447346516748364,-3.6237853959125683,-3.9387233000301576,-6.72321029146122,-2.774057088076235,-4.016883820202661,-3.7265921510470257,-3.9285092895435714,-2.806370583837544,-2.627339887027891,-2.5637785153699912,-1.792013664446089,-3.4038417875041227,-2.4724330758455055,-2.6555252885402716,-3.3208913873649353,-3.4713294088994253,-3.0835478149984015,-2.6230798405292095,-3.347074775043956,-3.1175013592189416,-2.3448056141846525,-2.434351332650562,-2.5591286624115286,-3.6034570156743917,-2.19558942896379,-2.8310616649401337,-1.721228176366982,-35.90243084527218,-3.1731803792097866,-2.3709526387410884,-2.808057789558328,-3.1968814344197853,-3.422094290796905,-3.8376799693086276,-2.7163770000654957,-3.734913422348711,-4.008212218718582,-2.2436037219111844,-3.8819552887461795,-3.4553222165006945,-2.7293415849099,-3.3615688048208536,-3.41213062155693,-2.0438051324149624,-3.889906708139061,-4.091940354058434,-2.8854785999602655,-1.2226231937865717,-3.6065921267584415,-2.88243627575636,-3.3910675145519287,-1.9426358154008816,-3.7301636064648562,-2.756374097147859,-2.097580078078037,-2.21180360755609,-3.6755998068108022,-1.9750051630061813,-2.447573407891368,-3.9037129417967775,-3.1217103841247393,-6.132491953879726,-2.401941123152031,-2.209744298747266,-3.945301619537136,-3.7455614931336716,-3.6525266066951234,-3.560757018312957,-3.7967748277725994,-4.0930952256955395,-1.992374181304764,-3.7494247558035307,-2.391181716680972,-4.267153508582603,-2.235618109021096,-2.7380891361945165,-2.209908936576003,-1.8594394733003534,-3.3276337321241187,-3.543690210755658,-2.9278498691317827,-3.2296342798914557,-3.470581302778479,-3.788885295985905,-2.3702049199941317,-3.1972397547590568,-1.9073037878424457,-2.2793674025685435,-3.408738856079271,-2.3317040230586743,-3.754038269504133,-3.7007124386517445,-1.7908910973947993,-2.247280766946833,-2.296820480774382,-4.036715918348939,-3.4437293583980386,-1.472180425202735,-3.631223752633469,-3.5332824272665184,-2.707872179740092,-2.711749568353933,-3.3052268937252234,-3.38886131099603,-1.9176530078517209,-2.130623628574461,-3.133536535973069,-2.977009108709888,-3.0567575406445044,-3.3664901777259173,-2.5847581768749572,-2.7054722318503988,-2.7819013984038277,-3.242583758678241,-3.7480503303797033,-3.842589106774744,-3.980397648035222,-2.535466075614946,-2.3669460175735475,-2.133055259906363,-2.6770326987681283,-2.651513318482522,-3.1084525242793526,-3.4651050482800585,-2.2031265839264718,-2.306552733034595,-3.066555677584251,-3.748642628860268,-2.58283726002225,-3.761147241528391,-2.893982019618865,-2.974727509114501,-3.455639192010381,-3.482182933240377,-2.121759202814248,-3.4240530648355505,-4.026784714921717,-2.1122306006887026,-1.8275952764132728,-4.0726039346119,-1.175074382020303,-3.8900911890463195,-3.3119713606516177,-3.896535491894933,-3.5938623291309457,-3.749254851823601,-2.3121369747777663,-2.953063716738205,-1.7757778450162471,-2.9722075686146012,-3.7788765692547144,-3.4311231757642777,-2.5635578347054406,-3.2506989821855843,-3.4486362739473715,-3.666038562051869,-3.3100630850596477,-3.0806762945555226,-3.906430693428236,-3.0275517069083846,-2.9894858921849496,-2.1031166144525257,-3.2435177795075143,-2.185190254202557,-2.7492105029186025,-3.6890411893799184,-3.7996655662648666,-3.597908244665384,-2.0531026341052323,-3.750667709516561,-1.9163074126815538,-3.783397613689091,-3.6354786803777595,-3.0285693668663365,-3.5832112682280504,-3.6993078048445973,-3.535742658600867,-3.11992551221178,-3.3373198745250714,-4.0151531702352035,-3.106881510153854,-3.45352131234135,-3.1565832673926755,-3.5733546545899744,-3.290846991810695,-3.371852155842536,-1.9014687704328246,-3.255304202070501,-3.573737340255302,-2.2995810882673946,-3.2718126014380484,-3.9830513227762845,-3.1264324100545267,-1.6273081924330095,-2.710290369809127,-3.645456400131015,-2.319513243138462,-2.2988935334900296,-2.765467550179479,-2.1977186629757446,-3.409724776948278,-2.0602386755938094,-3.7566638301307504,-2.296356703047499,-3.5273617220773583,-4.194644965008887,-2.865076098074362,-3.3920059488417134,-3.960485458620935,-3.3179231238854845,-2.469871948938466,-2.6250221920900234,-2.4610362515226,-3.322842725979925,-3.6428875580200195,-3.9758347151304365,-3.3376711127385033,-2.2614953900078705,-3.969704163953412,-3.3140276993080855,-3.326757361363469,-2.6737210418944777,-2.845622672009524,-3.9135467415244114,-3.248172521004954,-3.869496012610898,-2.719794318326195,-3.910886588670333,-3.1879702767896476,-3.277143260723519,-3.3950001053595207,-3.323590482928174,-3.725818341237673,-1.9044840463155772,-4.166575838640534,-3.4134654826336925,-3.4755485392779364,-2.8153423476397412,-14.395877560035705,-3.5061213876466004,-3.617850313293374,-3.392173227636754,-3.1266038830413385,-3.7399737980250984,-3.7367020451306123,-2.6672098981789802,-3.6080095937397236,-2.3787780416248667,-2.246629319656816,-3.69529821457098,-2.931038149639768,-3.5719876692810844,-2.24052377040365,-4.306173112391516,-2.7948151231688105,-3.739693339078077,-3.5714668395362734,-4.03557807715928,-2.5063614963059773,-4.142583067231577,-3.3315453111309803,-2.5763759671378357,-2.8478659847835246,-3.0689267647652594,-4.141615637634472,-3.6942223323639496,-1.8761334744208749,-4.017261547067036,-3.3720559574083735,-2.5035685209486602,-2.682567049596312,-2.878134668716152,-3.9122634874311513,-2.5026488268344513,-3.9826789427452853,-2.567334759813198,-2.1994417490887908,-3.0617404767771492,-2.8090110963658144,-3.106325895054946,-2.5525065512283533,-3.802691805569393,-3.624834503325377,-3.684670930795124,-4.07773120959337,-3.0123562382946796,-3.1655077904807105,-3.059863949909487,-3.2013440224873437,-3.7824048700417063,-4.184474978337605,-2.839853843407866,-2.973318116707733,-3.2452495339761764,-2.3008524746859482,-3.709397369630526,-3.6803714897364346,-29.42866060004918,-3.8810949943688433,-3.4706567642760207,-5.146033370410859,-2.41761361861073,-3.886329968618452,-3.038379213102508,-2.607306782372865,-3.4738768036791874,-2.820084421500143,-3.4620728612399554,-2.388965876898964,-2.707655506426607,-5.6149113039422,-2.759019506944977,-2.5657463075828124,-2.7153668031108533,-4.009178607398234,-3.0667227233412135,-3.5278893412039904,-3.0699562809582925,-2.8476336767320607,-3.1809013435535247,-3.6356813806713943,-2.8662384775075287,-3.4675464848644353,-3.468969856247933,-3.1143651547509648,-2.779277027900189,-4.365195382432082,-3.10718958298815,-3.6513376888402327,-3.0153266091764723,-3.430164714818911,-4.038493300256944,-2.944916802291581,-2.7205524157788687,-3.898834572579983,-2.0551285053061816,-3.6408980888274463,-3.3619320082739947,-3.2827596774217653,-3.6444479975744732,-2.6352792566605054,-2.6083948447924303,-2.9836440183456077,-3.235172453798361,-1.4314358156999236,-3.852832708148948,-2.5820247942590298,-3.513583148683149,-3.7677457052728847,-2.667798843038226,-3.8006579175501587,-2.5204701041498243,-2.680761989622965,-3.0387792216070544,-3.4337017180808598,-11.512386928194196,-2.6432146793767037,-3.5403713474087515,-3.1902755182961435,-3.591521453188194,-3.3257748535990306,-3.9304487422196726,-3.6277011667028463,-3.0701042551009246,-3.6738221230175023,-3.17931628359822,-2.376947182193714,-2.7822734655046863,-3.6513048679498183,-3.4984393956278717,-3.5045487663264256,-3.554507520502683,-3.066662740133281,-2.3238756460221364,-3.3949410859798568,-1.8616904350072834,-2.755696890498669,-3.512137619458432,-3.771125479145785,-3.1793460371720124,-2.88299158329735,-3.832437307321936,-2.2298902875824176,-2.57916238528625,-3.2783116644338715,-4.138545182423269,-3.1635354123355324,-2.8395739208177275,-2.631251758512543,-2.8083644646919685,-4.0253842889456894,-3.043930942567405,-3.627405915269618,-2.4857376220061056,-3.4841734725216633,-1.0677801407363563,-2.2709327237893664,-4.04128440174085,-2.787370737200347,-4.207716380660556,-3.4098237442051262,-2.574884499585161,-2.483912286149887,-2.1357320188414053,-3.3641575353929247,-2.6801413258356344,-3.6899154888842287,-2.66683077475998,-3.2089987979015016,-4.109428751017085,-1.3916957017663458,-3.287692375338307,-3.3487480331495005,-2.6398189910561736,-2.667965531445943,-3.4938657918704163,-2.8533675296803707,-3.387038412319778,-3.041738171580357,-3.0739576063565472,-3.9420934507283945,-2.1164910465600766,-3.7291271260788843,-2.545012663652967,-2.6609123383443594,-3.1824527609574154,-2.325085373016185,-2.6094311010924627,-3.5989050447798503,-3.2720423734142097,-2.73228267337341,-2.365027328299235,-3.4246775229359314,-3.7705240295368516,-2.5012551981728075,-3.660869420654108,-3.202879155596852,-3.4572005578715816,-3.5720202514064066,-3.423537019066727,-3.712965314900339,-23.637451487762362,-3.689234481824553,-3.7294709723323596,-2.793240234836439,-1.173538529319102,-3.5744795243502243,-3.032468669365187,-3.767051241773186,-3.655385761155524,-2.70659312769387,-3.2357275412683735,-2.553471092275662,-4.237157913921032,-2.3751166582091576,-2.875981368736897,-1.245955585161029,-1.8926481688941885,-3.7995255270444908,-3.6372877552181158,-2.713794299360604,-3.833986011631556,-3.1989501401530434,-2.0329864883234925,-3.4112943910121514,-2.232723964019712,-4.04035413249011,-1.8444530577431486,-3.182929597891012,-3.260178780015877,-2.935159522357858,-1.8717558967793266,-4.569433541666493,-2.2379203042372438,-3.133131022507089,-2.9316593989788187,-2.0947783939327573,-2.715855055925589,-1.488653056925955,-3.5032471192522783,-3.3111710975245208,-3.730957802262717,-3.875726468008412,-1.7202125647791155,-3.850744003476849,-3.7299081543243497,-3.1237496156043996,-3.648375069082511,-2.301796031566477,-3.1487264453448702,-3.1925481380080685,-42.151805588721494,-3.3896873449247122,-2.051335822695137,-3.6349002924184344,-2.0776943107863497,-3.185553005191273,-1.640649068971711,-2.8788949459842015,-2.7913439664539323,-3.321340916102188,-20.627127275369205,-3.64908640983701,-2.9605736612867144,-2.4284043750063953,-2.3720546087836523,-5.190474427938319,-2.292144933745965,-3.5525594052112113,-3.4830297455614585,-2.726192630518259,-3.739258085287793,-2.973211976913219,-1.8669159975449192,-2.9270870354733582,-4.159130222243032,-4.038224846242593,-1.8401347024532975,-1.7561804353868182,-3.522034663031235,-1.554947841753988,-2.9356761750181617,-2.8705931713331085,-3.6166962788863017,-3.2255488305954296,-2.3916696489911176,-3.7293160395893725,-3.370983104829228,-2.5128435351347176,-2.483247890999441,-2.893111249929262,-3.548027413641483,-2.8148404701395235,-2.4034395673663793,-2.5438014769584805,-3.169800047922033,-3.6175595189139074,-3.5658182515370678,-3.2193643231336635,-3.7980769859601757,-3.636428913627608,-2.1480075599455724,-2.6184721407529588,-3.204514380108596,-3.8637857138055383,-2.525610804249041,-3.020352261111377,-3.990466889318939,-2.376004038021852,-2.880108978940756,-3.6390528654141945,-2.503596704856211,-2.666556705979651,-3.8729786375868596,-3.628457605274456,-3.2286407850353815,-2.9648398432493437,-2.555632479120233,-1.772380569946926,-3.795194399216085,-3.461392357521731,-3.360582000645982,-2.68915345781754,-3.006099934014789,-2.5159269230012145,-2.5984785655245966,-3.3236811280332597,-3.4457332008648107,-2.8011340386273815,-3.3876082428272314,-2.8115377003917246,-3.6940031714520285,-3.941032369433099,-2.9818071890908593,-2.959858837036758,-2.6948257742624007,-2.3132616060332585,-2.3314357615077186,-3.017594542618492,-3.591883665986182,-2.687640018234672,-2.5999015654865936,-3.33941600906417,-3.7871168579784675,-2.817746945824624,-2.7803716499423423,-2.802892580920116,-4.104247987479626,-2.5453499984365626,-2.7370442580889893,-2.079333753528646,-1.4864064370952863,-1.1919613503346886,-3.9720532466082936,-3.6488249456015978,-3.602786624648474,-3.398766270105578,-3.2015948825205527,-3.717651716512007,-2.5738385603967586,-3.5127723517063494,-3.227779516058412,-3.3605668214050075,-2.51498218602413,-2.9544324050539723,-3.571296023584827,-3.7178891447358007,-2.995273274073487,-1.9043741965241592,-3.780436930228791,-3.3950978509506204,-1.4179696820984895,-2.8478232991369756,-3.140090407420156,-4.982212233310406,-3.7599098525597765,-3.0462119550498548,-4.335071283759398,-2.5375661918847925,-3.7340763112408215,-3.4707020046086985,-2.6374998073495215,-4.0470474371686525,-3.6532800748734875,-3.7775761411038067,-3.5483063445460705,-4.031975662346332,-3.1557102875726537,-2.488464334605344,-3.2277804498801594,-3.9850838921833853,-1.9974639251502824,-2.9298811888321,-2.8366668462866573,-3.736328256811551,-3.335697144782289,-3.311219176816027,-3.787836920905287,-1.9760779572742984,-3.280339856785386,-3.4099410321102157,-3.062991356766993,-2.9951955707915503,-2.472296597040639,-3.17407567700791,-2.5646059902898686,-26.836571711815377,-2.7578597498207222,-3.5040217242911647,-2.530247356377196,-3.136726977459991,-3.380007523234787,-11.500074160129504,-2.6565716388818124,-3.436089650269982,-3.8177408181565013,-3.669688618911459,-1.8604284643989926,-3.374754191529429,-2.111069428103341,-2.9226191322519695,-3.633682762145181,-2.573195758301405,-4.97377050348413,-2.9727717447322544,-25.3174460500416,-1.7235716969907275,-3.4203890647833535,-3.3242917533646894,-2.5423209575990624,-3.7482489189618056,-2.962012708296042,-3.858029593197224,-3.299448975914083,-3.4610487850378693,-2.720788814309538,-2.1512981847035,-3.6567447615930284,-3.7791546844310764,-6.555350870810237,-3.078275160431825,-3.7626975056658036,-3.816143313411462,-3.7949561706847206,-2.513089042031275,-1.8776224892270164,-3.9015261760731352,-2.3281927336435158,-3.2004507604286445,-2.455188068871282,-4.115682949578732,-2.2403085080326286,-3.836210029935068,-1.9885716200602648,-3.2709749165823663,-3.08504588376083,-3.008030349337424,-2.6582896274009915,-2.9642287829618783,-3.32720614791572,-3.31503900216081,-3.670596128263732,-1.8967791985468405,-9.983567818343646,-3.3673320048313427,-2.5439165594883346,-3.1068138925802486,-3.2532900035564194,-3.265266920036489,-2.0674608017290823,-2.4140136433035586,-2.4778116548837987,-3.609869099627727,-3.374772401839069,-3.221023045523621,-4.02788718509215,-3.924583589600152,-3.5907570988451605,-3.4391185165944433,-3.073237073471168,-3.0155382055233497,-3.6965743018973534,-2.4599713604230367,-2.5937761063671427,-3.607411834403808,-2.7144697619029206,-2.487347016058865,-3.260502369325316,-2.322344150124037,-3.6486210203502876,-2.135826073689658,-3.1425738465172706],"c":[3.6414008287348034,1.4085727887468904,1.6931636632435112,3.673384459265354,3.4472468290108598,3.0605281294780897,1.1988773016873924,2.942287561267071,2.7098987017404,1.1091624953938763,4.76698384365898,1.3347789610487684,1.6661191577279035,4.289208091694183,3.031404445841649,1.537169521258044,3.444606366480987,1.98644723207565,1.580026830836743,3.7985107912255414,2.4323583991859614,4.547929544019026,1.464846855362141,2.16965505489544,1.638226897243176,4.355976591887825,4.913464104754748,5.103900941551469,4.3063582849550945,1.390406863935826,1.324719899959549,1.534677100491684,1.5738799033972264,4.724308183359192,1.2121846291479423,4.028545623307436,2.173713248489827,4.122656682461098,1.1731402780463365,2.3852464695311717,4.8081293769009585,5.313299353362484,3.9037472106871953,3.626678622744322,2.616328160334705,1.3411757131169524,1.8395281609582217,3.2548481814635246,1.112635862525966,2.793149967881943,3.2385188598490013,2.716151370600497,1.5263800410605879,2.5482075934683994,5.760839499052948,3.5886943717200452,4.9653102930667785,3.9680443425873184,1.5484054693698548,2.62115711655326,2.6421062725073146,1.3071134304410317,1.0731921807660196,5.376152470110309,2.5008578482510293,2.3338180143171052,2.9181454290954116,1.1902554292245473,1.130937279334038,3.3970700912277465,3.9152709170512328,1.7288203192542497,1.7320466847757368,3.7009681125696994,5.194921340945589,1.536508057990669,1.495334788573606,5.895171988767936,5.607012338193521,3.0015576984272987,1.1842195022495763,3.4652799894527666,3.625008014958797,4.917160907576648,2.0932493857940253,3.730567243568589,2.4628787851711653,5.053872252007165,2.1293211893461006,2.459040353920915,2.410174464286259,3.8993468339795383,1.5869060135656956,3.4277703418851915,1.3773614320024343,2.7105556481454665,3.040565715953433,5.197044496267456,3.7180784749528444,4.57204091521853,3.6679384362837033,5.810152400578749,3.157227853004622,2.3742149458800323,2.788780485892474,5.114052064877635,5.527431551773145,5.367793462652888,2.969499777993965,5.008538407822829,4.713128711008902,4.3202984292546525,1.006818299258372,5.422109259579656,3.7188204569475536,4.22763827067231,3.3634079943668986,2.160232971297177,4.868404814537072,4.355376487479313,5.20547192519805,2.229919711213027,4.122470208919782,2.2560841339625672,2.0955991624074746,3.1228318768608103,4.30057514242506,4.31878999611301,5.542583479186691,3.8168331326186857,2.563196599141994,4.6449106486934415,2.8207753628798384,3.8296556788616787,1.3299505668230573,2.599141991033768,1.2689773146795793,2.028929520849502,3.622017295736958,4.561390201419394,1.0288212668976562,4.577817183443681,2.3452849505906417,3.3729404103749197,1.2591440569037662,1.5335182429670204,4.189212147749117,4.596397657054304,1.5317717290914603,3.5248414741585523,1.3935956298458965,4.517745084058252,2.4659962528773827,5.427273480584627,3.90965515474093,4.679212205223309,5.078609628246284,4.323457794791194,5.7652142188688265,1.87819912204959,5.086044146104867,3.254020134939514,1.7701811033205153,5.00920055349159,1.452922404286068,4.004384599557147,5.332903737404309,4.813432669184273,2.002812814072316,1.998872163201845,1.267111837785975,4.722170817336057,1.1301363277955359,3.9580968527463494,3.222588770088685,4.007800434655925,1.879913740026993,1.481910174588619,1.2179984501988652,2.6550918586482966,4.975308991182275,3.571887491129382,3.625696132004088,5.229269272618018,4.030827427305781,5.380608045094614,3.1799309775030853,4.747998007129645,5.82660584581439,5.211315059829898,4.933479613463236,4.270225569445261,1.2057376433912061,3.8732993357573022,5.087745457510625,1.6217057347936794,5.100762413223268,2.1639543614844907,3.5496900807264056,3.0247557151243347,5.444973002663936,2.074319173362225,5.708993154359398,3.6734517302348735,5.6703780066428635,3.063733044738769,5.537625985763621,4.392571798595473,3.5358506871338635,2.2290031238840515,1.5543157734234072,4.105894150136263,1.9588047873586125,1.344116261352042,4.177056401791819,5.130707163310704,1.4036573109509278,5.192211121829885,1.632131444811439,5.717782479877567,5.05555669024786,1.3510654657873291,1.4863458103755125,5.920960698644271,4.50168464482817,2.1830165343390164,4.319647420196752,3.7062054102157305,3.371827775106168,1.1892979398542805,4.922775512413208,3.3996039604344888,5.530581906901473,5.740582142639389,2.585098189201365,5.876571550430998,1.5236908841367227,1.0399135596489197,3.725342416528841,1.2203032600181154,2.0537608717905425,1.7462942963659325,5.044527818944955,4.773691986671743,3.2036410480254354,1.755383895935876,5.78711812425761,5.471064648742802,2.110746766113062,1.171394342360719,4.654420235113642,4.465211168901991,1.0690340264512812,5.711249275862323,4.470358496732752,5.3070997856673,1.792890212447318,1.7390253604826902,1.8749291240762536,2.1444165464417386,1.750940894472154,5.7586267266493305,1.7450463814972341,4.633447143985739,5.322385724772646,4.730678172481206,5.57019589266123,5.557647804281718,5.308483548599575,2.7834153159431376,1.5064529145305419,5.781698431009977,2.3620520117020227,5.072538000222505,2.528699910887984,3.465917877807237,2.0373932658057106,2.7773092011593317,2.2029953149990913,2.3475465703937193,5.355747121783386,5.598274407003432,3.5000846699137504,4.659855414225025,5.859347899379288,4.8916091840517275,4.606342542502188,2.6320670658213876,4.624977299937542,4.5547965585021934,5.392538145927302,1.2946355021269942,4.034448236399575,4.8725023773711715,2.045203810324349,4.677041516140777,4.5179213062861825,1.4691492267216468,4.826413126455467,1.0727694001600276,3.1031382006529364,1.9550307631308474,4.937363629571457,2.7122592727699883,1.4036488839835994,1.967412627814055,3.668346097527756,5.202653371757291,1.2163816236060179,2.0462751651450066,4.872205956084533,2.2029409626683716,2.1293981475609094,1.9482713695699685,4.3615019444722725,1.4622151492165172,2.52856929711184,5.353399916078471,3.4063545121391074,2.1793754581460636,3.584822091441824,4.24774218232026,3.0889502424484374,2.7492566293760325,4.517286212559439,3.0548879640939797,4.658053356033339,1.282236703705151,3.998926139537538,5.882895478572388,4.634420283542451,3.5781611948068095,1.2582742113437397,5.249830552796441,4.091026179438371,4.764545084597172,4.796434070255375,1.416686922920676,3.2424077804960385,5.125468045376643,3.920129994785521,1.3805885281117316,4.22698983378363,5.196810450113243,3.3031762610441584,2.609194635219743,5.154092644402026,3.495657630807928,2.637609233821753,4.019983376613783,5.9983645853946035,3.833091421185332,1.295630632301589,5.320743663469523,2.26268665233619,4.495719755613759,2.9589263132300774,1.0252314931203113,4.2951587013765415,5.723006117797896,1.7068764880425826,2.9666926662713644,2.917670106247633,2.448296792739534,4.542925884258258,1.9503422886880308,4.662560167929842,5.0301601910199025,4.787418302998326,5.673993697313747,4.244112144358221,1.9462810065945304,2.821491814895272,3.7195358999408192,4.814145064635202,2.5909373306679244,1.2411639785407316,4.095986937009011,3.4388934017613337,5.493316345796142,5.859354083424927,2.7791281464363697,5.205873596970864,1.1410060978882655,1.894134322087432,3.184607173423495,4.9319727623637934,2.7753634150139397,2.7105585525798395,5.570361382328029,4.5808206391028,5.368280660055984,4.026739856376592,4.634535541130308,2.8003079731198266,5.972305963608071,1.4757703058606488,2.873916556532056,5.542715538586764,4.252730666817476,5.514988184867612,2.310436848877785,3.791587354765058,1.4327793700428062,1.159726997974684,2.541420664102736,1.898868894614182,1.8632321500563345,1.4963910670104266,2.024328075101434,2.688878747879091,2.2638112059567086,1.7005515946405616,4.077468218508526,2.6373751846223183,4.61319540012428,2.659096436228782,4.834288445841912,3.8529952268324212,4.1053767677601885,2.4628894256680836,5.190012038416474,2.180522386293965,4.480103994358191,3.112696715476808,1.7366943282087923,5.01178963607814,5.776323077194372,1.484487295005448,2.8587883816381643,3.8413164377955855,2.0190477916725027,5.418267514422837,3.3672832367589116,4.166145628245422,5.085266848423369,3.5982733131453295,5.179390300867221,2.9434700029287324,3.9216772689280956,3.0974954151571845,2.674459403890646,5.421585232244967,1.0412061847371803,1.4640961897624052,4.559977103301363,4.0620198751921555,2.5842173726145314,5.482883520293645,1.2891325280540158,3.056227009132958,2.903910461778948,2.1252276389564555,1.639213447741206,1.4835301672961323,2.2024075988271745,5.228065328026439,2.7619423405215717,2.9334999761589735,2.085407858037304,4.441668067211027,2.2673684182731093,5.475265736198563,3.879467673474132,2.7626437794496406,3.9613002576096914,3.264351672385687,3.918833803195031,5.557257143365558,3.544189743876651,1.0233337126683975,1.4434915981927612,2.805140025308989,1.066045815127035,3.6190936992137925,4.936141114588969,2.2377632018022924,5.449526522128547,3.878390772016506,4.231348485407626,4.9863019105310995,4.732255177010849,3.150182297183443,2.1522510079472212,3.862757854352566,4.389250565118457,1.54053533099925,2.766072680194223,5.607339204104067,5.644619323461687,2.2108508984773705,2.7794095106572594,4.296114045250986,2.7059528157728843,3.2898965675044702,1.5530678009231704,5.487930127431563,1.2332646604393618,5.612988071411089,3.9297020846608826,3.3956058733409638,2.0458410048670066,1.2992154772826305,4.1028636839377555,3.80056339167663,5.1892135974993305,5.137256029633949,3.201755932733196,5.106774082866206,2.4509615313828483,5.787961370022745,5.021058950047239,2.939578441139307,5.102030862756529,3.267672022425203,2.9939938265337522,4.3736762035490315,5.93176378803741,3.3664254972238963,5.781652581283748,1.4210354900585,4.947211876735157,5.317263957805771,5.4339972687946805,2.0403290929809073,1.391708842549825,3.6773228775821813,1.0738067684956578,4.791914329579638,4.473695860353114,3.7515179243169143,5.142214002727499,1.1929420432754014,3.0442667156277636,1.6267274446168292,1.6706567759118487,2.8272938983424467,4.972291348829251,5.448503467349422,2.6643198459034334,2.023999415615866,5.642461432141704,1.5389866612117433,4.305090187990615,2.828151994864251,2.101495518782553,5.266316218006833,2.294797418286521,4.8787823380810105,4.415538107233229,5.583814296885487,1.2136206463659018,2.057190072762765,2.270031231722508,4.154658208923068,5.902784191362896,1.9291650206099777,4.931354415593563,1.6040766034469969,1.15587776554976,2.067915155638853,2.1916882949187277,2.6984776946070825,2.762187124464355,5.915191247421951,4.043133404086792,1.6444476530739862,1.3566506188615615,4.0510045949434,3.420808381164604,2.424058800011844,5.133443632753293,2.0247314813020214,1.0567445424754842,3.7420901762767134,3.8315936502149364,4.876101954260472,1.1869371666339603,3.3585101055494286,3.794052235939235,4.987339852291926,2.8072254572822644,1.4724393942374006,2.0093133227295614,4.432424623498446,4.55479509843475,4.524209329943595,4.833223874075248,1.2099389004680652,1.135739982881078,3.4861677564257265,2.8831304572199317,2.224819051310152,5.690809940790213,5.132576602839268,5.697205680132344,1.8460545369280248,5.1009527500115786,2.0614461644739914,1.4510982342794778,2.542941647719247,2.249523787151452,2.7501578567815246,1.8840566746000555,3.6250534420100124,3.9726778602916837,2.343382517888317,3.5545436233862153,4.3320890615602226,3.5309985134553434,5.330046885500847,4.606611600846225,1.917255944457256,3.7397068286007533,1.8181915361858638,4.491837211295015,1.9412492115443605,3.90049081188934,2.280585667468459,3.901393595767235,1.2762560457672592,4.701417792482792,4.5254820027016205,5.571685638649358,3.304796127941222,3.3892037418655243,5.771864543047784,5.419062144758622,1.7031020262129872,1.2606525137125515,1.3557667661652597,1.5485195885416938,4.813807039360505,5.482364497263163,4.100412952190792,1.3702802486233336,3.64417561230216,3.6437330592874786,4.613154671630836,5.740667357366043,5.839556772158425,3.5531178145322353,5.526143242768516,2.281470165490658,4.089199613368059,3.1503397993660354,1.1927750399225558,5.531711705927427,5.132659253854819,3.952059175973795,1.2500896428340915,5.320214191136618,4.611538497443416,1.7527948806092477,2.492323691813282,2.7852760006090285,5.204140098067281,3.24998472471444,1.6559658173104288,5.754370619612619,4.767293641693563,5.364330808789242,4.791819658075369,1.3307260730474415,3.2416678600970217,1.718261016915176,5.029796596848083,1.075704070117446,2.8750097993622807,5.0871064591282344,4.6179098217185865,2.0848259793283264,5.922979045744392,5.261955661957458,5.993082454683876,1.7669077629055343,3.3683498603501296,1.7220570496412637,1.250981799561416,3.960274399256988,2.1854004467832837,4.8238773382802265,5.934047612795334,5.519795651016728,1.1860376953492404,5.718489060963881,3.925819976394186,2.1856373544221324,2.2400112692265153,1.428524131143594,3.3761092173797236,4.692765985015104,4.204769702776481,2.2037554549036744,4.399910779957707,2.889938130409136,1.9296210888679302,5.222894115629647,5.73690097250771,2.0223116104156684,5.27545406591465,3.1381450746175537,5.608170047363691,5.982751311538375,5.821069632291603,4.073119692321919,4.06388202446633,5.73696480661118,3.6594430078674214,5.43807277542435,5.082835032088346,5.048568146147346,5.800745642071074,1.4930105168534271,1.5488444552431926,3.1529170459047933,4.207500996283742,5.515047254994682,5.977132006795907,5.6128473637745255,5.820347329073551,1.4023470943229812,3.856699848986012,3.0814218151071664,1.005297140748498,2.5193598195431313,1.362848575907887,5.84641261166238,5.906428075368807,4.31455292902033,3.9969112231235453,2.746884155835674,5.257796972051801,2.7126250718101224,3.9999520763524368,2.879457240667671,3.900405694337903,4.801802354431824,2.426333402865516,2.7788112391899515,3.492717805001392,3.132181063929343,5.420303934140355,5.950018408966029,2.959919103325487,5.719508458509787,1.7140786628704887,4.326650105517084,1.7971323735183344,5.0270852030886175,3.818151734453167,2.5191806389494045,1.4204795683522533,1.0986534725322141,3.783708629983778,4.480654619677193,4.283552234323714,1.1830384052418321,5.268029390786104,2.6655975324133223,2.4063543918823096,3.466563680346442,4.859445670823952,3.410853301930793,2.287514988639751,2.37732191728455,1.7239753307875563,2.795841874205346,2.508673230548566,2.9996813603796193,3.686502444124099,4.0584821924752195,2.0159184876040284,4.649621146481366,5.739651606591943,4.133329709687246,2.3205487643698954,2.093649224233256,5.019902635369989,4.466554711517067,4.506013358765334,1.1811533908815277,2.0257834553169696,1.2300846847650384,2.281875563758501,1.1744729622794872,2.4926794079952987,1.5526379114079738,1.8401766782374631,2.7552961337810014,2.233534649353082,5.632786627785297,2.1551765261459535,4.8994055193750885,5.99456277459954,3.7604881440066578,3.8274480672498283,4.7758852690822975,1.9455974107967546,2.8815195462376657,5.964597003434284,4.366374647663877,5.645853734029758,1.374243351962168,2.6975025836834243,3.24610967120502,3.545980437498355,5.114979565110501,5.454919569738877,2.3625319228769217,4.969190310951408,2.4472947059770904,1.2137358229660857,4.945570025875471,4.2713250487960375,1.1062455075004431,2.533510612360894,5.294715770312278,1.9450130456494699,5.33276277978914,1.9440322381825783,3.768313864959835,3.984296078672065,1.8991945456139383,1.8857594546699499,3.0395438284836267,2.7182366388378023,4.3643076675715475,5.056888460706571,3.2788582915074276,5.103656423039937,4.892488868603906,3.670518457629276,1.3670963765116708,3.603831705219386,4.176670031966373,4.477945845682585,1.3379775644680527,2.0938122757544133,1.7041465167690653,2.1612898579841255,1.3276126679998181,1.6242673606732208,3.653814292590014,3.7900614652712385,2.076131686360151,3.1840599598663,3.365003732077098,3.1804437172080258,5.447115452198593,1.5775744644798009,1.4320374809491545,4.456407440525485,4.199749695831353,4.020668024402101,1.8412914530298643,5.720938092552645,2.714493712285201,2.333053482370196,2.044203856637691,1.0941623956601845,2.0394875500256253,1.7503534850843785,5.412099095109245,5.348967648949924,3.9562338923131506,5.44939054266632,5.8034426831863595,3.8352517815482114,5.2560504372486925,4.783174363760951,4.731352041854069,4.617632278833366,5.517492980113191,5.639311307451422,4.5643358186239436,2.033122088529356,1.3270713022437366,2.2396828456075006,1.7464021348293604,4.789601237399893,3.13650297749731,5.9863941104443885,4.094600844996292,3.117888887095253,1.0694915254753925,5.131114790046255,5.33395430303248,1.9670920127474025,5.7726465392924755,1.2985741330831848,5.6368855894881165,4.750793955253032,4.035959651197967,1.7520163112740974,4.879683001399342,5.545291586069503,5.528352227752133,2.6280701269991624,3.123175405544803,2.011591507171069,2.2989900106000754,5.691230748796889,4.274257641796494,5.226056776171134,4.8588420003549695,2.831597406466149,2.4646724537919176,2.683222394140506,5.083077822026429,4.833410526270744,3.5251854233551176,4.218234203280525,4.496403698666652,5.3838375469138295,4.312135401620205,5.51511834286727,5.804805478241306,5.1024681635345575,4.104090419266502,5.222712053854803,2.9884277587191868,2.5919605032037767,1.033752300866442,1.3893634795122125,2.8348523139400896,5.285094936771246,1.5824786729034737,1.6482295192032483,4.582427515560616,2.101794467627235,5.412606947743191,3.7291973253197255,5.77660420784156,2.2372014791194585,5.575361971301558,3.844024275330226,5.144336819796166,2.077918765711602,5.796321832630426,2.8984991143762517,3.631035051228794,1.3465563043896591,1.6626542737077035,2.39484929172888,1.420341994995751,2.8950118643412517,5.393972269291488,1.837161252287304,5.765758561428292,1.1375247432826066,2.504375196281514,3.697016438129584,2.4823138279391834,2.5570566133636676,3.658201122580656,4.901188477924552,1.9096406073117347,1.4203752844883268,1.8697093060414263,2.7318192928436735,2.545182869023005,4.192376041317862,3.364154638865582,4.540690327227805,2.7188969511879337,1.8164511117077,4.674856229958211,4.136770238121906,3.778382358516379,2.711681968822807,5.8901510037900735,4.099830194449181,4.414960808572708,2.3515455385886845,5.753612084013047,5.219058760253567,3.501129727912206,5.113707492051313,4.592813400717517,3.0292958870480895,2.263431029256741,4.914914859938876,1.559212219483366,1.0714518015479682,5.992659705652226,2.8421503578508105,5.39089911332225,5.594773911077667,2.9853776735804027,3.581419971438752,3.8713037213188852,3.308706867965599,5.81588712368652,4.327938691746332,4.035947754833836,4.5692843463136645,4.879980475629247,3.3972479722041973,2.1578917045124895],"x":[-4.317107888377191,-5.057812032235523,0.31333959331482086,-0.139752460603904,4.798331897852927,6.241210880402474,0.5274723012368128,0.25485728345053626,-2.3944811819094425,1.942287959999307,0.26421923583249907,-8.65618663707673,0.7390806499159042,-3.421352928650972,0.13467495751956005,-1.4737296226249557,-0.7824508912972927,-1.1480540187391837,6.483909317685306,-4.273701724082784,4.403564022078602,-0.5123579293043967,-4.561390831117645,-4.530244502487764,1.8738392180431074,-2.061091791811303,7.586823628906181,-3.691691628156386,-2.1598212286788177,0.48259913049232717,-1.2572025777291822,-9.553608328217258,0.15271441477807457,3.9600919944388258,-1.8463194956710325,-3.9846751523093187,2.589109542584178,-0.49798560284394,6.63578805654714,6.736847649672036,8.451125786856178,3.9231333161540145,0.27441771108693125,-0.5692431115992447,-5.99063692046081,1.8974740773818315,3.305751263596817,2.0351846354680827,-1.7287725871114166,8.157317585316418,3.3111585929796163,-1.774617015117065,-1.6923674367465287,-4.4464681930796495,5.311219547590682,-0.815195950797265,-2.366814583312839,-2.3449726264235338,0.40557793765793715,7.106776624376672,-3.0790316768888726,-1.6718992456897679,2.1458760282439915,-0.9974160914461194,-0.2877782336711441,-4.034743584372425,0.5554764372415537,3.3938586490538496,-7.610090077062274,-5.304488256909938,-6.5747784499788375,-2.96800906623063,3.070415815799456,2.143297622332609,-0.4992157209129644,1.5062001257108282,-5.6440626678087344,-3.3009822826032287,-2.566280964842247,2.1425459205839914,6.716703136592373,3.4969699531573504,-2.2781006540338673,-0.6653852297860889,-7.410747544897357,-1.4324828447067413,6.089402104839186,7.027710217318303,-2.6050818347672378,-4.437274841723529,-2.9008421228031,2.94502949944081,0.7828380851602668,-3.393267451902533,-6.149298324823089,-1.1179719375191244,-8.356427055825197,-1.9688759739984913,-2.6215661172435567,-7.434033856081684,-0.020470959426363677,4.63409943051203,-1.8017675337598664,3.876176404103384,6.9053441548532035,-0.8659555480685777,-1.5893897074930652,-4.8139716319341375,3.30528687429744,6.627812740503045,2.762052871119438,1.34964896887726,-5.804522335667491,7.7647319933157295,-4.978252232076399,6.374806552221081,1.653038287133497,-2.533375463613293,2.87439405988523,4.1778364997293576,0.8531005362300181,-1.9781033099958245,0.2598191667027061,-6.007248260924083,-3.7413665882321645,-4.50189331842269,7.024769254040919,-5.933423844459043,-3.803805740723847,-2.033605420806253,5.298051335276346,1.1656037415130527,2.1216078277512755,-5.067913662449188,-7.714971440349221,2.7510901059388204,-8.51484393635822,9.125423328667992,-0.5226021556950968,-1.0736111284044991,3.7231974294095105,-2.3290415485759186,0.48921599826899254,-2.599109282307346,4.644464044235832,6.493620959426424,3.0688089781515338,-3.098746377263648,3.586076111859442,0.9452598073793612,-0.13989935480469384,5.456826290486254,0.5318275377223469,2.5131453172837093,0.6345759232929087,-3.7778062039643707,0.7664982573998973,0.6671548516257175,2.8711362629400927,-0.7764241310002031,-1.601859470446061,1.3146332581564129,-1.7277201120601262,-5.313840119066986,3.060670380890187,-7.638232026232392,-6.542025436620863,1.2521695106582813,8.89689622830403,-5.036480246978801,2.0525960521577824,-5.0767788192361785,1.3532854931809246,-5.878846158078366,1.117867448976928,-0.8050958200587517,-1.017723510104478,4.145411253886971,-1.0770331278088463,2.1551505261525357,1.1736766332834625,7.413997166802815,6.278030821506402,0.3539564100741499,1.0643562525302142,-7.933317611174891,2.969062934398421,0.6015678269178144,0.7615041282568713,6.846216922957054,-0.965005186903507,-2.230736750478739,-3.4892269712103756,-3.679139227707484,-3.280021143285339,-8.64273081942281,-1.1428233768499236,-3.382060232046178,0.9407547027717538,-0.4164070008743126,7.542633845287945,5.302094035888958,-1.600464511988493,-8.4707337293967,5.5764970336317,4.834569691898274,1.7894417130836748,3.9992322350473914,0.1875323329010996,0.7651750542702707,1.706216759816967,-1.4577373370835227,-2.6413333822739893,0.3327241771983278,-4.584280107510326,5.8516523969403655,-4.131498983548156,0.8098116074820871,-5.06554521401527,3.2157314463501097,-4.265205850535317,4.157876215979865,-1.6511146876199092,7.263097040027491,-8.20866925311435,-0.21446894463058586,5.776334724055534,0.0677796214109394,1.9007492517685103,1.7977481657758076,4.0994323499795,-3.5292804596025373,3.6154761882850917,-5.829571609467566,3.6017579639998747,2.48609790274481,-7.018015937712281,-5.73150213992824,-4.2801156959552475,-1.4003963102279249,3.62116496193567,3.4632249416611245,-2.953891173419161,9.189287213233147,-6.36552163729515,1.2779810252102686,4.465730597311242,-4.081011461526723,-2.8470855170676286,-0.3277799194682074,-1.1591532242578295,2.529809652731311,-3.8809803563302676,-3.207232198055361,-7.298346166269413,0.4804504576232933,2.9117693557296636,5.063594404572527,-4.24428392378325,1.6695074915648496,-2.078074517897039,3.4502033887173074,-1.9287422773622165,8.009568942603767,3.5381725031941498,5.554113220117721,3.928619517792888,3.519458448500723,0.5247156202841587,6.679088848793965,-6.700016397723907,-0.4303056817234885,4.993538797917749,4.026778464892634,7.761538953301086,-3.370686347968372,-5.312865406552108,2.6521364985931517,-4.737787606739849,3.794607681834883,-0.8213806199683438,-4.561066421189112,-0.5423564316024816,-0.19383682414603953,-0.5945142252707543,1.4270933328574387,-2.8442413688449637,-0.7842849776191194,0.9968601452659165,-3.2210051972933806,-0.9955444636711497,-2.4733600989573628,-7.272882906428829,-1.3078355823782672,-8.343286082156107,-4.082310977625696,2.7374008349794487,-2.7600899430463333,2.1923435479214093,-3.5642395156042133,2.248606428574944,2.9011524426790327,-0.9111367898414673,6.290212260925335,3.491377912963511,-3.390842560448968,7.214866518738921,3.1161206441594436,1.3388978068724366,-2.408357108902158,5.013319449922717,1.098869846293653,0.8677762828967195,5.833391950181411,-1.6864669652606423,-6.7267673250522115,7.2704911440971225,-0.64808015974186,-3.3081944141301944,-2.5449008414108776,8.097104955980226,-3.2728136517254343,-0.7449959916277349,1.6639155530933647,5.60791134747106,-5.443689117914978,-7.169469936435551,2.1622183117165283,2.7559228717853563,-8.566799011947863,0.02494204910776565,-6.781335654085142,1.5741077891252413,7.022754041215882,5.754659125737302,-0.6989468095174143,4.921896307102995,1.9719494598374991,1.0435776630001525,4.649547287389944,-5.512362077057393,7.143110573921061,0.15016675731611917,-7.001770558826269,-2.2055898017884408,-3.8359762864869773,1.2865665826214974,4.973131648756501,-4.969323021389663,5.807796172229789,4.996217873043223,1.1883056859040408,-0.5802269689976458,1.4900309912168659,-2.877582949344377,-4.487344816034738,0.06913181436885463,1.2643785548869957,5.333095398720388,5.772003982093541,-8.496801799130303,0.09966882415162859,-6.872436046466817,7.542878648544738,2.3786461168979667,-5.357703994739009,1.5159138264460026,6.5831048982804745,1.3344500583576036,-0.18585283207472436,-3.415112581463351,0.20485321168339965,-2.1675051658438482,-2.4829990066592473,-3.864250361551468,-4.404913478344182,-4.466019665163666,-0.395554625894472,-1.0413036864962621,-2.113614947602469,2.958184873180003,-3.7218351604362336,4.5959817014629945,2.012656670429527,4.576138413342651,-0.3341563641885692,-5.426380636210744,1.3313278771358017,-1.942486573607567,-4.371673276097612,2.2339338284845107,1.9261847066798854,-7.017370946698575,-1.3568121089233864,4.533541925914666,7.914788862031639,-5.351383119653456,2.6403862523696144,-4.66976699167908,-7.307286942465485,7.019532897162293,4.098048078050223,-1.258023792016083,-1.9087344515042943,0.6069757209002908,1.6241090816606585,-1.7143369149534093,6.532457892479982,-2.090580395382946,1.078147696159272,-1.5552730497867913,3.4711221994299724,-1.6115663170394257,-0.46682633754538294,1.3551690542154393,-0.9267027313365857,-1.3488723376159473,-1.2975483492419366,8.362254118156654,5.5921178768503115,-3.5131492920900365,4.142299347718465,3.4956317466905524,-1.1929537031864346,-2.5542662623844175,4.29376292951309,-8.608198923059705,-2.734827542349727,-5.179541282416409,-6.502013892844085,-0.15118244117677548,-2.9184842988743043,0.28133471510923824,0.4736603893710889,1.1315396182842914,6.582336954419983,-2.483255884579707,1.4574544074310403,-2.1036480182867634,4.099838791573378,-1.6674370925076722,0.6460211559151512,7.462217318439083,-2.7811734241416417,-1.6461115413211385,2.5353007883860457,-0.5663873329453795,8.42464822873848,4.536375146067931,-0.38509012575165524,-2.1358053494653735,6.762335288089618,5.301100110630999,-2.027758251877115,1.142647382690829,3.1033505797363707,-1.2994527046281075,-2.126032161526785,3.3766253136623914,8.104627807035762,2.9967548204361028,-6.402263521772489,-4.904852689508349,6.987426727258342,-6.649520460028574,-6.4892365313550915,-4.979937674670786,-8.859684956618729,-2.257062151387494,-5.34368973553244,5.9080430198299405,-3.8947155890209784,5.239977000143536,0.054115170319407824,-9.306731001161122,1.0257847696508637,5.242782887585028,6.555085360173818,-0.4680823316857641,-4.00311396665032,1.0402321684246374,-3.1014409497277695,6.679839807115123,4.640763403579033,5.593974947059994,-5.366121927720318,6.967859534622497,-1.7190779995066547,6.407723046746362,-3.4622592245635397,3.640612939753407,3.801765221308653,5.186071386738584,-0.8931229286338738,-2.766696102921786,5.093520647562804,2.691653498883617,2.340453611856255,6.983629008216377,0.6630362970840409,4.445696795133353,-0.6522789107659932,4.540739049039862,-0.26552911407671864,4.054329671953935,-3.8533264067013224,-1.3858056024666676,-2.695905587230472,8.044867976428732,3.576069059237474,-2.3910216610757207,2.3298340019707737,1.8978346088775826,-2.19375432362962,2.487725811823325,-1.3576104762491514,-1.3239932102857677,2.859616893932526,1.4264622559169666,-0.3770700472129427,-3.0679902067896263,-1.496054721957869,-1.9999095147149353,4.148622322165352,-2.680718971900701,7.111925062707451,-6.60088758485025,0.8760596028985344,6.153426317344723,-2.3223123820702263,-4.713714933188468,-1.9312715137563279,3.3845602940640678,4.817142678557467,-3.131319963708002,7.9503922938449865,3.737755949620321,-7.17641408152784,-4.629905404751979,2.6153422296827005,1.3736098094932716,-2.3527353650934346,0.6336318084005867,-5.597840194828459,-4.928202772706481,-2.796618303321792,-0.8116788853490564,-0.6699380366375722,-4.24464581991828,4.097301205734137,0.41600318070810793,-2.4277517126982335,4.689914990688468,2.102167934964183,4.8444367486342585,-0.05832745897775382,0.09254225109733571,2.4050544061653616,3.485484857002225,2.1018999168273123,-3.564055107929187,-2.3177286546597546,-3.1202607966830365,0.21984635656191465,3.1631687692985553,-0.7856078975880343,3.375814416479268,4.701997117191499,-9.320649804027077,-3.098109574401227,2.5932269509959056,3.663832492114034,1.6266850114179965,3.0481256816758555,1.5246692648303033,5.161226194806101,-2.5006088511574283,-6.366347667744121,-4.609347149568188,-0.7139272461042907,1.8648618885083934,-5.3824943893409865,7.53710725485335,-2.4928001483768787,-1.4797521576389272,-1.9103653066101733,1.567233462597435,-1.9036551688231818,1.426335842422886,2.6605524342955333,0.25599901691890015,-2.2771976021195695,1.589996186756406,1.0878442194928484,-1.339100166824958,-1.6368421018712853,6.922302888882599,2.802148482125051,5.207546796553515,2.6930890689998135,-0.963403210833726,-0.9838528870710794,5.342568402951691,-4.744871205893439,2.8580747300932874,5.076492248013055,5.384391632857077,7.042408102731448,1.5693374949852434,-0.14565482327027146,-1.5791305348211626,1.2239410443571508,-3.348978187039297,-0.03291947997213995,-4.342226676692828,0.9859372923887051,-2.1118902011649503,-3.517631674045796,2.9321546901755546,-5.471443179580906,-1.0236069634283136,-0.9952520649624041,6.331916167087828,-8.607964618915428,-1.3335168518209395,2.276013551242526,1.759821370664353,3.741356518598547,-1.738647366939773,3.8479043588051858,-1.3275156509299029,1.0026656262273637,8.177353834986056,-0.10604285309857531,-5.994807695110724,-2.9638278289272817,0.37727889068605336,4.187719157924286,1.9920320866266223,3.16521888865152,0.3630836008388427,1.508629352524704,-1.2350762324057243,-2.826540880855135,-3.095444865565593,-1.7088326918389098,-0.8557403471055869,-1.4173090984905357,-6.38181332027054,2.592096343085906,-6.869546659037319,-3.3373281441169915,5.171455829096313,9.338903035236687,2.6081389078722013,-0.936469203058925,-8.242026558270453,-4.398341792553175,7.174691031177829,-0.20611918274045404,5.489469717273133,-0.5554583665099178,-0.03454757908355255,-8.85188118458425,-1.2497753469431516,4.414086675318989,-7.458296519476201,8.232742416221438,2.4084767241851175,-7.803447537129089,-0.2860293554455695,0.5053939854257017,-1.9002809965712624,-2.39173665535342,7.001535639860945,0.7372609948284259,-3.103571176517578,3.0665539810034836,-0.28426096881652985,-0.2325162575416284,-3.574946807566775,-0.3269896326905597,-5.681630594209101,4.070352396697972,-0.6928939624394204,2.5131926077364337,-2.2655681275659756,2.0485870896502156,6.811965702410536,-0.5439634319708797,1.334394437620638,-8.949713601769222,3.2619131426155668,-1.9840699051677646,-0.8179683631032408,-6.117750679286749,2.752737071487183,-0.6320865191894232,0.5536699108180843,1.545990528434853,2.710160474127144,4.742620763362318,-4.087774751781377,6.656084417656089,3.537357311331168,1.5287723294084135,-8.880883764462663,0.3461490038671826,7.831069941435035,-0.1207154350759998,5.225095540505559,8.492203817575255,-2.1167342894590084,-8.730536737431958,2.5040827186385983,4.353427265794336,2.80824864184122,7.632774931486571,-6.046726105499278,0.18598875353272426,-1.401833047906933,3.685333207278692,-4.265727872991473,2.8155613241064015,-3.0517640468781693,-0.6206285608944495,-2.1749551304573194,8.569765656879362,-6.558366977010912,4.548682570953703,1.9662727712877088,-3.2063200666652554,3.0939808064475782,-0.5303082338559806,0.057719435382310724,-0.6523179505440346,1.2165044960144087,-1.4310750858162713,-5.368248948406005,-7.203989094105816,-6.208922241761288,-2.510523125066131,0.9567423089297185,-3.006481504405018,-4.852882972372425,-3.817259078212703,-5.73781365958455,0.7830634607310722,-0.08650143284515366,7.435123783647148,6.502964216996361,-5.804822856014189,3.532475209865793,2.2039151378241835,2.8161401990735384,6.578451808032357,-6.33131580657407,-1.5185778356437218,5.443412268312038,-8.083585354994728,4.595441192253558,-6.251189955674212,0.8820110728147004,-4.956661799280631,-0.023309852998321112,-3.755163838654261,-3.9336931327591924,-3.3005136363450034,2.6510652332082674,-6.511813167850507,2.3653151529286696,1.481735839391229,2.649756111345154,-8.007818575295996,-5.635676971022441,-3.2755932630132722,5.3685897436571235,-0.1497106245889679,1.3247270798666833,7.844447367784977,2.572034272835082,0.20393805892797712,0.2435307708763439,3.631843440763488,5.6141871611365755,-7.558272396346165,-8.616289409157556,3.6369284076838864,-3.8175435217639038,-5.409599041781913,-5.599905184795689,4.41833796652505,-1.2400344001497743,-4.70081452195469,0.3045382755618409,2.6928670073846384,-1.7129995925844348,-6.861604618901342,3.6731000391989554,-0.9228360720862732,-4.276880163444026,0.057944125764874954,2.130300798814655,3.9537623129687294,6.740623975484262,3.0349928653588405,-2.3489690468899056,6.122380695763669,4.99065096421571,-6.9402256028156035,1.4163919794140445,3.2078611888953468,6.499414349996922,0.6843800600276806,-1.3051560396238244,7.047990791048173,-0.2511320999268585,-4.0880756347132685,-2.373617544609308,-2.4773596444772843,-0.429923679493065,6.79387252416244,1.4090563175001174,2.7940326716090547,0.001128330601805061,-2.562511668305876,-6.0854259930948755,7.324523416271216,1.2186049385520619,2.8114162837938945,-3.664431095981613,-3.1211503974001378,-5.0226353885345425,-3.6097078675207577,1.696335830505939,0.13005560076456302,-4.439262605012436,0.8386175619079648,-2.350259592402018,-1.2382435796537798,6.188214483859071,-1.0829483667649549,-1.2603240745299509,-5.630913446648485,-7.169467664297015,-3.9206376240517065,2.9110998659821297,-0.4096996636949122,0.46597408700918663,0.105212165335975,-2.889518989484616,6.283098825798319,2.7099893051535835,0.37815278607277625,-2.141603942549943,1.687857629457076,1.8874200755844006,-2.662388884374231,-4.676113163345534,0.528660745948113,-3.5352817127109644,3.466934370225145,-2.715273408835208,5.552225735190159,5.203120067482419,-7.319870670894801,7.103559409532965,-4.335899254850792,-2.1811822040988877,3.5392663376717897,5.848099168834651,-0.8712507548824577,4.142745231398901,5.9096409213171714,6.606456854322431,-0.7862427212155563,1.1705252018959933,4.230813095637423,-3.092924905160597,-1.9572708792656623,-4.922925531506804,3.6413863813299647,-6.378290509366995,3.010485431409756,2.2694152551160522,0.9812231093608137,0.7182229699223841,4.365736401461195,-1.9770681090411681,-6.457909067415262,4.916364955769188,3.377243618816763,3.0221481150141027,1.2990658183714388,3.3798885348527055,-1.1706034902725149,1.301083873514386,5.907444998221045,0.7823792168158832,-1.6011302080468526,3.0009891059423928,-5.462255070473519,3.3127284896781113,0.20640711942081502,3.2447689571124,2.5703070655959124,-4.530934070607449,3.544788032842234,-0.8986763516125951,-0.11767274643872838,-4.124772424290541,-6.510813713498642,-1.5659153728481572,-4.340079591791972,-1.6556277795598207,-3.7394409006366653,3.0116955514556247,-2.962250612957891,3.1765319978166207,3.0008357171307054,-5.220951921386741,0.5009507513844214,5.578123319274351,4.893158864231181,-0.5411917946656191,-1.4494293790727664,-1.2310667605023546,1.380583887724025,-1.2484164340922521,-0.30314703488941674,-4.423439805366758,-6.385162618475205,3.05569691109888,-9.781501656503478,-7.106250669523389,1.0399268615891089,-3.5757644332450997,-5.790813220153144,3.6945809446167277,2.6207386792092553,7.413748062754996,3.1047756266607633,2.2554951482409358,-2.5990215166956965,-1.5844769524714053,1.6039774964537274,3.673872872624001,-4.085173297443672,4.288274084537829,6.156131144928559,2.6348755046948673,1.8051391885774546,2.833705029146538,-2.135461203679838,-0.78624978555899,-6.5107988114117,-3.960014963618031,-1.274036593639278,5.6275070242194065,-7.033876508005768,4.968864996916732,-7.553085912576483,-1.8022414749443838,2.7406019165868885,1.3229242866400552,-4.004419819259139,-5.58713832179033,-3.391636269436394,-1.560512661232627,4.238728749654683,-3.1806599150561032,-6.7502496582162035,-2.0206808376286345,-6.470030991698346,-4.588657961588874,3.9975015383686157,-2.0875661239113903,-4.838974667853182,-0.6506509334805322,-0.6545009036109373,6.870506312980062,4.3850532316239015,1.650251286948425,5.977198541902235,1.7707033980754474,4.220967594515795,0.17358657867120542,1.6254752840357471,4.788511010453005,6.1267100161375065,-1.0533041064166193,-5.209181563593624,5.793170056617932,-6.089055657742996,-6.283099892381083,1.4693965356871148,0.45254790415824253,7.0250496284512,-7.178775283091179,-1.608741487359178],"mu":[-9.797638109126165,-9.130547960488755,-1.147810643886833,-6.065920167872609,-0.9219638020978205,-1.6931364805035676,-6.789178228206607,-5.077214991065646,-4.4123737958679365,-5.977067077577674,-1.9910171394277665,-9.675194548161903,-3.0732863779662667,-8.452171488948919,-6.038292961282828,-9.058275722428826,-7.012937876476615,-7.08771764900423,-2.6943521545032656,-9.072262519545632,-3.8726781161528967,-3.7075969664356268,-8.111959714154665,-9.03749978582362,-6.966852362936773,-7.193530591914334,-2.2623318336815945,-9.337295521478808,-4.887552474835797,-0.33983546595409475,-7.491679502871098,-9.996753189162712,-8.90580009384867,-0.747519272870032,-8.488378474404751,-6.946760602703346,-3.551175470838137,-3.541589872206903,-1.8630089476337197,-1.6666121372867448,-0.41636428381038426,-3.8204935779684512,-9.510284958690498,-1.3620582067821352,-6.200851878547713,-7.8166032031259665,-3.4733308112608574,-4.9771737432806855,-8.65656730438263,-0.786860190685934,-4.57193239870972,-9.405368407729377,-9.485006924929353,-7.0200076097526765,-4.645768505107995,-1.6180618765465082,-5.872455216744294,-8.097483020730277,-1.8435387839303274,-1.3794891321610914,-6.634214004288883,-8.907366102013786,-0.459334233211397,-4.502367123824187,-7.262020191499053,-4.675956736004561,-7.195217276136381,-3.9113041236378843,-8.338211360368526,-5.7781642010523,-8.925047758023155,-6.988574427662762,-4.310066758341846,-3.5681124124413266,-9.862735543772876,-1.9858529085650511,-8.472155346302706,-4.74184331333293,-6.5544714428116135,-2.0179610583141505,-1.0318595546672649,-5.346509401976505,-5.336263189365955,-4.541046237689857,-8.498268787791034,-7.485625107842308,-0.2648440511962691,-2.812870791618034,-5.720799244119785,-6.58092766078102,-5.899868762706251,-3.0981767172851327,-0.594831839822354,-9.053794818154701,-6.210795956193107,-4.617271825268179,-8.56433165116904,-8.733192460739176,-3.6946322318350378,-9.37217717200555,-5.574237536726445,-1.7029955985027478,-4.698471646043421,-0.7640282161708645,-2.6916088729905074,-1.747520733303296,-3.0501139670623356,-5.009077462925751,-0.9296334815034268,-0.678040703780729,-1.167857216853283,-3.282174141730303,-6.762702041798785,-2.040051141323007,-5.009360142060551,-1.6627811127032088,-5.3907466823232175,-7.541004026855454,-2.0476866009376415,-3.6676889415054537,-6.726745654489486,-7.276950778383751,-2.463807074071842,-8.105125818280177,-3.9156366263078257,-4.567354439272475,-0.7771875565399466,-8.732737726423307,-7.760112220288473,-4.252554426247082,-4.603793719597846,-5.795487486366975,-5.068137592249253,-7.5528119145123895,-9.607760522167863,-1.3285217692055684,-9.33527437398145,-0.21612149477752807,-7.956151055954328,-5.923493151954302,-4.001807375606434,-2.36644207057799,-9.10841377567337,-2.790899588507463,-2.560733967095441,-2.807017159773557,-4.07015362049056,-3.7664292654361065,-1.2618666968939518,-3.367750254771853,-5.22285073318435,-1.0297384093103013,-2.272617753095305,-1.4380090069794704,-8.645253051740491,-8.533835011746191,-4.308392649412742,-8.070698898690917,-2.0170556580275445,-9.457343477099885,-3.9385851616522527,-3.022497633303727,-6.2687227398233,-6.525043544084208,-1.7203549887434733,-9.665984433442453,-6.573204488568772,-6.948744005481804,-1.0943224963894194,-8.749866362197894,-2.358163052133131,-9.225351428276696,-2.292378942373199,-6.2243442478180855,-7.405791902655321,-4.045506635453171,-5.29504987329164,-3.973208019642145,-6.476719858727005,-7.1930250375257465,-1.8228367684341817,-2.3775303508587875,-2.975863245385302,-1.1553083854495494,-2.924786975361735,-9.713430710216695,-5.380843230052566,-5.4027687532637225,-1.3034666411903473,-3.030760733487061,-4.214996429983486,-7.48529759598518,-8.656276761437354,-6.374600481850656,-8.00463036284656,-8.99956080320342,-9.535217214233349,-6.288502910987264,-7.24629346748139,-1.272225340058153,-1.5890538038710145,-0.5908189651978857,-7.653586283631249,-9.683847844506692,-1.879004269604847,-2.040778199697846,-5.152711748543939,-4.55016829852902,-8.517338093375388,-3.413952903096733,-3.123063455286137,-5.976940521459644,-5.869118477282491,-6.535421053094803,-6.857347433655314,-0.794854315961202,-4.353195571414061,-3.1789151974624352,-9.582905579893488,-4.537572337836129,-7.932584312339688,-2.9303194164151924,-7.59553295439985,-1.2780389316348284,-9.93579416522915,-0.9159078708018109,-1.7541404379044878,-6.567698948455241,-5.081570061603675,-5.965732997065583,-5.264084863429215,-9.81162861417773,-3.3210406388960045,-8.357767453945959,-0.6665067843093553,-3.164174467177252,-8.447912090760124,-9.386698871936215,-9.51043336056927,-4.214131165924981,-4.880287603138549,-4.883589157099806,-6.793492083638659,-0.036492112731074666,-7.569109439102226,-0.422981211265101,-4.17004108251803,-4.467456029557835,-5.598403613200011,-2.2167126378006485,-3.554301009500369,-5.872366560825524,-9.32704434130563,-4.046807933426737,-9.9966354615642,-8.790614017831926,-2.7187576094031596,-3.236472592947719,-5.501417948493548,-5.318833234395866,-4.107640302668438,-6.519746047899256,-8.029351606642896,-1.6946744127584745,-1.9842379488578166,-3.6528888598701226,-3.629324777031324,-4.598218069867757,-8.098579754278195,-2.8785568404098982,-6.776344955698397,-1.5702041604547268,-4.690754061808871,-5.28713900124218,-1.4871149899500669,-7.356600535886663,-8.516029648933756,-0.478966261756697,-6.0915421628577455,-2.336874564447746,-2.961622571713427,-5.773232677537727,-6.78962872326041,-7.62390250664861,-5.862658504593538,-1.7244407679681184,-9.514937431029953,-5.804871414724893,-0.9773586624722519,-4.226065576768576,-3.664138168693778,-8.551873780991631,-8.382092068866132,-5.377270919365403,-8.751939281459071,-4.140752947735811,-2.9691072374467598,-5.210901353901578,-1.778374267269054,-7.865495057511489,-4.370575892558448,-5.172269880599421,-4.461266899043508,-1.8686086769205645,-4.807864783405478,-5.66085168747994,-2.6012172208175577,-4.33048544543889,-1.7970608608776328,-8.153592427676838,-2.0971818927173413,-0.7543937056314398,-7.716254161232343,-3.8517722692597767,-6.020637136483651,-7.090036759763101,-0.010160130470091566,-4.908698926341362,-9.888494833084787,-2.9257391625048235,-0.593289658027436,-7.069641679215703,-2.552940598683513,-0.5135263156099557,-3.134381734691105,-6.181109860324135,-9.633615403768836,-5.344361303767267,-2.6245768740060993,-8.958758214940605,-2.241696486869038,-8.76136538946023,-6.11339881238494,-2.4964854262186487,-2.6595566485735955,-8.735429583178389,-4.82733212456576,-6.863429078680432,-0.3518301327870299,-4.857388900283026,-6.28103026056829,-2.763405425858445,-1.5380891010356867,-7.963578833496465,-4.273293255347765,-5.194798729317585,-5.358292113377954,-2.4979905446392636,-9.266536462815633,-0.10865573618099589,-2.6764355195776357,-8.044915249651421,-2.975623892385506,-4.414293333325983,-3.296107313918817,-5.8675319327738755,-0.23931230696535577,-0.9522228289279355,-3.878577814789832,-3.538225258731109,-9.936254280068592,-2.1407165330770606,-9.251545334936786,-2.3788671515647497,-4.851634304112807,-6.166087406857472,-6.968148637575977,-1.3397245972861227,-2.203617091303436,-3.5381729928768,-9.777051321567523,-5.587807313249138,-3.5815469421591772,-4.088304573362953,-9.393316523988332,-8.868208904705133,-8.499624987055148,-7.060413384073634,-4.2457633201206635,-5.488035236159177,-0.7035396514263192,-9.332702699648967,-4.927865112842696,-4.934434930327134,-4.294217674481764,-3.387004092025163,-7.096595976082956,-0.6462267920317211,-2.2986496157313385,-7.449764699827,-3.1495408494740706,-5.614476386899785,-8.719462154638126,-2.984186145911407,-0.33780369781434505,-1.844179249039024,-8.267669640086519,-5.801628534133936,-8.964045074694582,-7.906739909086815,-0.4832162176522492,-2.3849308720540607,-2.7394275012768676,-7.39889604804824,-7.338801491090807,-0.34030004401111924,-3.1938422378237386,-2.89878591761757,-2.5716157985009946,-7.388637401930962,-7.442740166826214,-5.299204055256535,-8.120521585206369,-9.54264810965362,-1.0839352620282794,-5.563938463136666,-2.4261605813736997,-6.023837936901564,-0.8103803649931596,-1.4440733989795018,-6.615802364298116,-2.0562970797090574,-2.7363136068923666,-9.854241352913666,-8.611738812021946,-0.16729532248946688,-9.13532813572944,-3.671380614988231,-9.18892242269811,-8.38748657844959,-6.099162366430129,-5.068102421756473,-3.32455127569524,-7.825854127670155,-8.353739591450147,-1.7973459149490911,-3.7403505043881724,-8.077701837367632,-3.4431452513629623,-5.141553243300265,-9.479996178445887,-4.0371572852323485,-0.8979371908325051,-8.893177326753861,-7.636434848581295,-2.904002916315269,-7.061217399683168,-1.4869809124665467,-0.8717127623384524,-5.8345974739279916,-7.46364426280736,-0.5755395243190486,-0.19268766709030105,-7.50289453728058,-0.47459245011232776,-2.286725056411769,-9.546992981774775,-4.526037052266378,-2.429410989045675,-1.025636574338411,-2.463692330479923,-7.3561679370243604,-8.3079008489138,-1.28822410114114,-9.101436060586657,-8.634801242380385,-8.801407861770274,-9.854827539303255,-9.465443649793032,-6.763776966888644,-0.4240791877323602,-6.1904225855111905,-1.7865520251947298,-8.654554562343822,-9.804415247457513,-5.97368217801092,-3.9163356829758578,-0.06497692943560063,-3.2391283245331692,-7.28524813834559,-1.3252531756526476,-3.7005103625071056,-1.2080590076436537,-4.521907734199086,-0.8499267010529721,-6.663276256549184,-1.3300410073956792,-7.651606571749805,-0.2813642421913687,-6.628192066539396,-0.2544705672535974,-5.576164870857612,-0.8795373031975262,-9.907249214271772,-6.4289599815170835,-2.8827625013450087,-3.16737812138028,-2.3957079301333706,-0.1368286494790394,-5.723448909157705,-4.1085779948812,-2.2506417729602823,-4.525690649019074,-7.198740980053957,-3.1406338253232513,-7.813912923762116,-1.535645532210257,-9.81494832486624,-0.48136529562898156,-2.5622695320704025,-7.903764196827076,-7.06798230147605,-6.436295766843314,-5.489995625245417,-5.254781712201224,-3.955102756773541,-2.7857777694440955,-6.460768515712352,-3.02916995723165,-8.732823865072195,-5.252385181740465,-1.959159871210825,-5.843691552575947,-5.383932751322915,-9.398931912576709,-1.3279860000004606,-9.525792071207155,-7.541417371245942,-0.4607681682006315,-5.374061879214604,-8.877012889089645,-7.137988620756095,-5.299311083432574,-3.321210174083704,-4.710607432555676,-0.8363405045805461,-2.5010739204454735,-9.762487925546292,-7.904854484479578,-1.5118437815472108,-7.229781440320617,-4.157139295797063,-7.738668879406212,-8.647188898211603,-7.06392744153618,-7.384399532933181,-1.7429099113619673,-5.5109794376797065,-5.259261947156095,-5.530681488283202,-8.283543919053734,-8.751999614019166,-5.046566950357725,-2.3797306532559626,-0.7733527229862358,-5.191983437482646,-4.922302476847856,-7.286312457560604,-6.289642438459511,-1.2667837389161374,-7.827557213316547,-7.66018032717092,-5.527614843246793,-7.8204490841739265,-6.036143194693877,-0.8461049133804632,-4.560969053221791,-0.8937329249794068,-9.621747619383878,-5.767783370336204,-6.273242407178834,-1.3860907343279338,-1.519567352297655,-2.181465527052977,-2.5288676410785427,-1.9665312415064418,-4.524719390920772,-9.433004724270495,-4.831525724869421,-4.533238059775037,-1.0047585139651782,-8.986495608139363,-0.8849706318260697,-7.054144879673149,-9.203753241685744,-7.101355986242011,-2.5987232020651074,-7.683736332481937,-4.675490296487044,-0.7605692965661515,-6.772766292546675,-2.570126873494718,-3.250215892782964,-2.6032322675891617,-1.8167947821204877,-2.510355462760072,-0.01754879848885338,-2.131641309293255,-0.8537248328485192,-5.868752308175265,-5.295720596094475,-4.503098654324256,-3.9083398842289574,-6.634136590905597,-5.269440661871176,-1.5298332249634927,-0.19930844675011716,-1.0728503966566727,-1.7388982763637562,-3.4264036598800085,-6.344879281567493,-4.821633678146049,-4.065825687427422,-9.676964516830214,-7.370035255826128,-6.664905541275674,-9.770449262347245,-6.9918843085578875,-5.259860481262731,-8.415245833362953,-4.077990877997941,-6.041364627259789,-0.833134616195006,-8.808979935198678,-4.734526068310525,-5.126956636289597,-4.118399496820329,-4.677446653856354,-7.0816636733774025,-3.763714805121323,-7.59376120585316,-3.3033075904641107,-0.6584941389705246,-5.91587877710869,-8.380286075483934,-6.321289005096203,-7.826086650447444,-3.0809435656477513,-5.635615651412776,-5.05701269854039,-0.5672790402303707,-0.84530089581204,-8.344286770105494,-3.2689580848543076,-6.896941396999106,-8.836413495380103,-7.546979477314371,-2.2201630654617355,-7.228237152235131,-7.023759983893683,-8.990607222022138,-6.1450249004378925,-1.1109737908440098,-0.37261801648211357,-2.544876314690512,-4.954583022753665,-9.307795311851741,-8.373017036822239,-1.6404774756410156,-5.262364729070241,-3.0023682402709473,-2.792312002740811,-7.578354858353514,-9.353916624186985,-3.5092204701013596,-4.59685394839263,-8.331867715406286,-0.5796102265289527,-4.041139857429988,-8.885072325880499,-2.9225345898090427,-1.542295835578349,-8.852952111060873,-5.707249450480669,-2.290961765706785,-2.4934485373236948,-8.761587413889071,-6.397633753573686,-1.2379311547767613,-6.436243483279838,-9.355189464770246,-3.566492055339452,-8.696005388173237,-3.689425460890876,-0.8046346206327182,-4.568055527580386,-7.264883648368627,-2.6222463621675374,-2.228114283222691,-2.507481933185529,-7.230190366574394,-9.893757970327988,-0.16152693640218319,-7.07883062699042,-2.8536292175104805,-9.394054234705605,-4.00412857158657,-6.95701449922489,-2.8850112888840407,-0.9983233653055135,-4.552256278423168,-3.9446221563855377,-5.7993365680151925,-2.4069640308714746,-2.4151757685300312,-5.650484675565728,-9.32551942114169,-6.97569386860744,-0.784178167796914,-0.2213866758945926,-3.8120235878542674,-0.8353423382936676,-5.85242763292017,-9.252849343364547,-3.752805304802298,-0.4726046807034101,-6.457603601949473,-1.2767730210271555,-7.364810078583616,-5.954062495625165,-3.049914860973184,-6.061095916829167,-6.715282538137883,-1.3854605376150508,-3.8850627050515762,-1.143970330048616,-9.271204301541259,-0.28274168214725837,-9.842419737944745,-5.2692523098489,-3.7907915673691606,-4.94416378758663,-4.080454438393724,-2.7641341042032574,-0.3219942411618981,-1.485200573284533,-4.442695634978826,-7.640383626513745,-9.63079787780611,-8.50852665391858,-6.492018120632304,-3.087275685687647,-4.594661477205564,-7.43786655670168,-6.691419261006548,-7.176374438629043,-6.709851209412405,-6.753574335377646,-5.44344391496508,-1.8962604249066306,-3.3594789832095606,-6.507575950968089,-3.915655392805264,-4.140794462437601,-2.5380654807818304,-1.960486967548405,-7.386678071404827,-5.78193696955196,-0.4317875564463458,-8.111900844147266,-1.5051672732109989,-7.707184994704567,-7.691564283522778,-5.791207917989068,-5.172357236122855,-4.494769513619133,-7.742453701468703,-7.154802424607791,-3.190750461862668,-6.573171454007037,-5.844328476124538,-3.169763409819293,-0.04260033228560278,-9.180268205830977,-6.088876293771763,-5.316650131124603,-1.4750633936480129,-6.480754204620858,-2.2544279863568684,-1.334172282401025,-2.156899718418246,-1.3361421963317421,-3.8486203074808767,-5.240521467964456,-4.127814007404281,-9.06086824113075,-9.767681767170854,-2.3896008030159677,-4.853159536815658,-9.765246958885136,-9.582940809800567,-4.232592335279883,-6.481725838470265,-6.040214108313915,-9.303081298973417,-3.900775057931769,-4.640759081431545,-7.913397122341745,-0.27723310621693864,-8.10635001043594,-8.084879551085589,-2.3363730676983363,-0.27635377700337305,-0.5495900100695428,-0.7174156367497719,-4.446600138453225,-8.104699807661015,-3.7624055808923162,-3.762729944819032,-9.003443432590327,-1.6950397978594745,-2.0947718141113647,-0.6817404537973126,-2.016518507100169,-6.240564828858705,-0.5894387664204781,-2.8546959011559614,-8.34407994302894,-9.347708790836656,-4.861201572967138,-3.7150737905222853,-3.0175195731558513,-6.801081094648409,-2.3073682031346388,-4.152799494260537,-5.6784833423811225,-6.953763244185598,-2.223044344866787,-6.238586644889841,-3.5617866493775274,-7.059861305071871,-8.010998929353438,-7.980452368519133,-6.516853657098068,-4.5979502748533,-7.012893953844848,-8.407801773968549,-4.409396709149355,-6.1011310085261155,-8.24335897471105,-2.7567493195991988,-4.962139662011788,-5.2633282538413155,-9.212431412682465,-9.425906197912632,-6.393277534649345,-1.8607662656249735,-8.10562935735361,-3.080114983286766,-2.754687474498043,-8.181811226442061,-0.8511674311392015,-1.330339823733051,-3.518000260018046,-6.132197253442435,-7.925810708036556,-0.4595317767080065,-6.323624807301924,-6.5916622050235985,-0.1682683772948912,-4.304861829285455,-5.535157473914067,-9.54363626586165,-2.9456782013197547,-1.906045487992718,-7.809223957676061,-2.2618399976215486,-6.828512561040354,-9.608611536538591,-2.5338055689221006,-0.9346987393636641,-3.601891792752594,-0.5008366954365462,-2.3872098590596913,-2.815523929573731,-5.619547996946366,-0.42922658216722365,-2.7162204786454147,-9.116019903489985,-2.796933359483864,-9.074658861998394,-1.6377342719022403,-6.877029852460788,-6.149746049573905,-2.6051215416017603,-8.627934318887228,-1.963092349283,-5.09157796806538,-8.152066268641944,-9.373820941892113,-3.4195035905894433,-5.547236336111567,-6.560326174405624,-6.420136209531339,-5.621713600381105,-6.820594032986822,-0.6981533316167909,-0.1821299866050463,-8.957602070923528,-3.096855172500037,-1.0944683194993687,-9.354999391167363,-6.269656874837118,-6.330137272613017,-3.3110384228610212,-7.134769763601991,-6.098738935270445,-2.091275690343599,-7.251397503929824,-5.293358365981591,-8.961589684268215,-9.34108870869678,-7.236334819510837,-7.340029061108333,-1.744191172575169,-4.42880576663635,-4.81630785403069,-4.950105295629246,-2.3855958985715886,-3.7420592425115506,-5.408582126479191,-2.930775360933744,-0.8535825677162845,-1.7369925299164057,-7.043971103193643,-2.677957542386118,-8.180606259757228,-0.5946801777504218,-5.150702295983525,-8.776961534307336,-7.495627653532928,-6.827066366145118,-1.6182050272188198,-9.882066312179408,-8.309621360332907,-6.240136010553277,-9.943028035035864,-8.489816784167486,-3.995460516078968,-1.9928374771175594,-1.6829794544102117,-3.0727595938822683,-3.28998664737163,-5.934222573173908,-3.652749580016492,-4.878726189683745,-4.898737009819085,-4.416696289274178,-0.22285768771094894,-3.6599902292889963,-4.177649973554544,-6.555272138867176,-0.11154321989297111,-2.6512280419098833,-9.88027296554198,-8.85355671571001,-9.851683035610304,-4.012360917130177,-3.356410019147018,-9.288807552150454,-3.846923371429758,-9.235458784479796,-7.968962151142636,-2.355109998539884,-3.569718297430504,-7.416682251649087,-9.705559995018282,-9.960620851146565,-7.951956660915005,-4.155043193270815,-4.589746514817481,-6.994315025730787,-8.691256115053525,-9.40618293010142,-9.456101041817256,-2.253125041814268,-8.372789625977187,-6.338182200677358,-2.5802403970484544,-3.2739417025823503,-0.7504214549519328,-1.5603313757750148,-4.355287343112407,-2.700895625830635,-5.452688297114186,-4.312244934880669,-6.408665749557024,-3.602694401107709,-0.126095709237235,-1.9882015577850942,-3.8368641546028703,-8.41639071372948,-1.9673645174422716,-7.317458478203369,-7.134006718607,-4.609426021580585,-0.7949705444895239,-1.652215715976244,-7.9336810788781165,-6.524672359388893]}

},{}],71:[function(require,module,exports){
module.exports={"expected":[-3.60991641064723,-3.745624369236354,-3.1250034030757305,-2.319509859613619,-3.629029674564241,-3.9204555994741384,-2.8532036249015325,-2.676678122748681,-3.2426588452763143,-3.66702444264355,-3.6029665906740735,-2.6542667126721073,-3.232741419694359,-2.2739104322734676,-1.7885193514175177,-3.689380352573119,-2.569948774189953,-2.9233028414777302,-2.8909833359498913,-3.6569874819846238,-3.265986139249887,-3.4204254075995477,-3.0709345233655094,-2.502358941418009,-3.9159516758017268,-3.6365683873255157,-2.5473542700650635,-3.153975538618067,-4.261029937194059,-3.1915829873805874,-4.397669269652044,-1.8908984052713067,-1.9063939987301566,-3.6193733927111014,-3.6139256249626235,-2.6651637282504432,-2.111126195078233,-2.5099081124071536,-2.801173258688616,-3.426503640398559,-3.843472538461946,-3.1645245244212816,-4.3345530825989735,-3.0548664400438126,-3.2482915631735056,-3.219369556068568,-3.893313643348171,-3.3699130871322893,-3.629299284040546,-2.179369306744907,-2.2455452620353755,-3.7718984522486476,-1.7625308365873558,-3.0644925727828243,-3.9278471295737725,-3.7242195541299625,-2.6794475147174,-3.9415258634353454,-3.7817949719342585,-2.781741926900323,-2.710382293591188,-3.8848051366450207,-3.5745936923955792,-20.760585965282647,-2.885332413223243,-3.763730201899735,-2.2488503968264757,-3.37887778772198,-2.533758291219269,-3.015320623783786,-3.5493760825013876,-3.2647716880346334,-2.7842902427950538,-3.413110978627934,-3.4874915770333565,-2.3122491972582018,-2.0910879313277295,-3.6643176623724507,-3.7647073649057528,-3.558244017644091,-3.3157055141298346,-3.5689035675314567,-3.9850724299050437,-2.7185817625503432,-2.4216806699742865,-4.002265809277231,-3.3199245163558526,-4.028870369981907,-3.2069033740139616,-3.6427209056002683,-3.6861328963916793,-3.442089243611536,-3.6886362754618083,-3.576446329015051,-2.326944016583261,-2.3736494570842046,-4.366307024050438,-3.4735613670924543,-3.5514065826040953,-3.5139651737852384,-1.6381768302092903,-3.4432962345649036,-2.7974483007330004,-2.316707970716497,-1.9111203722993548,-3.8464055421419214,-2.748353518247384,-2.8917593051282227,-3.638564456009909,-1.458192572012059,-3.970885526738646,-3.565648001150655,-16.84045594659667,-3.8374742471777266,-3.7630421098019124,-2.9161098933332257,-3.1300136216777856,-2.720559073213485,-3.851598516088724,-2.7472421314626643,-2.4148866313583253,-2.8317765114226394,-2.346023713561733,-2.8211263595055494,-3.6602510823216754,-3.6063563842002484,-3.1739937363442423,-1.4645565954787365,-3.040954073691024,-3.558590155671079,-3.063452688255243,-3.1111508205391782,-2.338416373354404,-2.088237697430812,-3.601135222570875,-3.8472486429578048,-3.801038678431019,-3.3921032283512313,-4.150202176478258,-3.9647818310941156,-3.6857998282911772,-3.0033031116501974,-4.251283021624443,-1.2762385754037722,-3.2047167922935658,-3.2564449705480696,-2.7346790235192486,-2.4835557087174314,-3.6829473254118708,-2.8985830866708184,-4.055783487237975,-3.1055346529560213,-2.173706953213758,-2.4235508606950606,-2.876656953146737,-2.4690143726747507,-4.039205664363635,-3.787639625783083,-3.6635605029624134,-2.4034762736388933,-2.515688816391454,-3.235224684792491,-3.879902001684173,-4.34518611281881,-2.063458309390449,-3.734995574218578,-3.7802757948177805,-3.3167504053000068,-3.644757102128507,-3.9139032295680773,-2.908829405383233,-3.15829256681445,-3.489376409978083,-2.9900702614770753,-2.834805341852226,-3.09575210129195,-3.3982240707230735,-2.7069548051218906,-2.6139818459094464,-3.499457559526263,-2.3517819450912016,-2.128473948810349,-3.2215862079554247,-2.605491757066167,-3.8330347082193654,-2.308591508523502,-3.3933058927618736,-2.688956219306284,-2.6570485275709674,-3.7121950693853254,-3.9461824071253258,-3.1949332721536745,-2.861830798837535,-3.722778866315415,-3.565177057401461,-3.771884350304787,-3.630710764389054,-2.87725801592707,-2.9921003351488826,-4.01141424467534,-2.3195827650925187,-3.827453961242102,-3.391219037352336,-3.814827472738288,-3.802170482268074,-3.356506172140531,-3.7262888591145362,-1.577176544278804,-3.0692880516411605,-2.188659985914655,-2.4392995478965047,-1.9391206264650647,-1.8396509877751206,-3.461420380507459,-3.3687350607247817,-3.131705398095739,-4.050520735459224,-2.6598797377075023,-2.9159380237295465,-2.7431482602716954,-2.6521041863328607,-2.139896833635669,-4.395562986785012,-2.629405288131878,-3.1600655045114765,-3.2279268801044156,-3.3054234748648668,-3.1990074688935586,-2.867435258874001,-2.523850199679102,-3.138543417590439,-2.4910763263710094,-3.5697657560975786,-3.898229581160465,-3.3177094422183235,-2.569605081203731,-3.4057284188318664,-4.359129193260612,-3.6901683652565453,-2.3231843075411964,-2.9272623390650643,-2.970983656871519,-3.582418950241764,-2.4400012490047374,-2.79391129162616,-2.5040299870917457,-2.283084061696237,-164.46043571782468,-3.8566088071625764,-2.158471838309222,-2.431933621655835,-4.088207738307026,-2.8453117318077688,-3.866751054172521,-3.59967079732943,-2.364220007601137,-2.38247969867819,-3.2451071260070883,-3.1494789218379764,-3.0914080610258527,-3.200713377488621,-2.29539091064726,-1.6752380847919917,-2.7446539610452496,-3.0544302083749404,-2.754497332265009,-3.095343697132702,-3.389231964480383,-3.024284159626067,-3.366890478931095,-3.6249946588610498,-3.3309482386644627,-2.2305387169835726,-2.5152357862692183,-3.8740694630642807,-3.4482429867118847,-3.1016626003149046,-2.9057072695376194,-2.518149751354756,-3.7403499055631335,-3.4352734644915737,-2.620466485104107,-2.374701225616478,-3.1330080383058014,-2.7877101870030447,-3.4929467816083903,-1.837010992030513,-3.4303760790852,-3.793804969389675,-2.0665786154961165,-3.9817398399639243,-3.6680142162803038,-2.9873774777267688,-2.4429370703496804,-3.387328735615238,-2.676078208470767,-3.424751808210157,-3.1598193050254415,-1.4947083606622713,-3.166059205660155,-3.6987592919091368,-1.8316293184515877,-5.76835101505883,-3.050197945918199,-3.766912103053522,-2.847248205734367,-3.7373107059514057,-3.409330344703858,-2.1352889180215566,-3.524207933443659,-2.7156367556393772,-3.8173245725182463,-3.745107980004419,-3.5487048641803494,-3.181541500286029,-2.7311580248424505,-1.469430627282909,-3.6978466109228263,-3.2177537614382468,-2.155269925908077,-1.8656162443806412,-2.828241222683848,-2.312154472870164,-4.0967609295982745,-3.425193736539953,-2.9819643220092473,-2.923198365754846,-2.450732822783216,-3.583545019203981,-1.7301613214183398,-3.4050748613513835,-2.932867081394562,-4.050444805139542,-3.785417603949314,-3.7071770285377554,-2.9006169661403987,-3.229743916606552,-2.3924606680043086,-3.68329734095268,-2.7650753948198794,-3.5173982311642575,-3.0642381736607023,-2.576882665593683,-4.043661899408191,-3.904234973585075,-3.0717939837509514,-2.5116169915283075,-3.219354480765587,-3.8622484371149604,-3.916222986773742,-3.942421368498622,-3.513590383250618,-3.3865672642688702,-1.9258465760634578,-2.87835921891036,-2.5418883376229204,-2.530588431933356,-3.4159205376329718,-2.5219879557729863,-3.1927747546453276,-3.7694851289859908,-3.885202191297943,-3.0846424871467333,-3.622334995010833,-3.4332922926276255,-2.4875504111111892,-2.5451575878892356,-3.880394300294919,-2.9602715876312296,-3.9631248336655287,-3.6682686744220674,-2.515913486771752,-3.6910028501873446,-2.7789154696709555,-3.6411700970861167,-3.5808344475591847,-2.6422800403028024,-2.38102031055313,-3.6770296786549626,-2.383010566357539,-3.207536638520634,-3.4939299372039296,-2.334303891793929,-3.528333581866384,-2.5602890751784395,-2.2337612665229933,-2.4703365616464312,-2.1350778520824925,-2.9678005907768843,-2.1027656912548203,-3.1264552241662424,-3.5454026968900605,-2.8757868064486525,-2.3327849410212855,-3.743283965504932,-3.5193546581552813,-3.0775594599996836,-4.044889552632379,-2.0984548603752713,-3.4903701550944417,-3.8148378392247064,-2.951761926068346,-3.2061076114184797,-3.2267613315700667,-3.148317959984768,-4.989243104655217,-3.4779106600759553,-4.099697308491847,-3.090866075699406,-3.6575434464055547,-3.0317263180109255,-3.484144190747583,-2.625139347785811,-2.3048764860797735,-29.211445143435533,-4.11320319734457,-4.812516472675222,-3.376160736363892,-3.005662119500405,-2.44336542510468,-3.6097838182079274,-3.7427104931130697,-2.204018753111516,-4.302424679350384,-3.7274046432319707,-1.9803288141557425,-3.4656035041928672,-160.310762825499,-2.563163595651636,-3.1034324763608483,-2.8853793474986995,-3.5828145534280016,-3.8459485040192463,-4.03033409781978,-2.6537089571082637,-3.4669195174503087,-2.2617044336294105,-2.9021810265332215,-3.173378356251794,-1.5914798166271806,-3.044813417700397,-3.519945163952409,-2.465929376294175,-2.8234144010051843,-3.9671982302685374,-3.9368796619892925,-2.4621368060089965,-3.357650739221546,-3.8909856745714233,-3.6816070488321118,-3.9019634390507565,-2.542088950935585,-2.346669939363497,-3.503198372453884,-3.8484901342961026,-3.2652252647216793,-3.360153976661716,-2.401622193765392,-2.3550728738758435,-1.9322882863001862,-2.815364929550687,-3.161682541101843,-2.8715227166958552,-3.556049166604016,-3.2159777956708124,-2.5937975821233854,-2.4746049876738465,-2.5427774470111926,-2.701605932516788,-2.9832683769249058,-3.244691268007769,-3.432135615101335,-4.10597783534471,-2.18562711162388,-3.386772536249083,-2.5918228473916924,-2.8020003205900985,-3.301485325842547,-1.0918709757807592,-1.9209334120947057,-3.452347254080399,-3.1133491030123306,-3.641266975018072,-3.485767594063894,-3.3354690074450906,-2.9920427961723925,-1.2349518264647092,-3.312976591301311,-3.5113211122888517,-3.3853070205903766,-1.981752946754317,-3.77671046292925,-2.508941718542427,-3.0011091746537746,-4.122777458338887,-2.003972904385104,-3.99522147049385,-2.840203394041044,-3.8536189194047994,-2.922178802137824,-3.765273866564773,-2.8817991283855857,-3.543547408345154,-3.3357838640469906,-4.001561480457887,-3.5646419822257847,-3.0078670346745495,-3.5464191949108184,-3.139129522604385,-8.811348245407377,-3.5113326861683745,-3.924580387517798,-3.7885473372740788,-2.69541139429195,-3.6374849442711437,-3.064744366709665,-2.689086242377952,-2.4158391789620755,-2.314927468329073,-2.952721367885071,-3.2899985245756955,-2.632642072526888,-1.3706168831956713,-3.978161343686897,-3.91098594558202,-1.4931537600351115,-3.7684506707086487,-3.0285974295490248,-2.8303370651008186,-3.2558210655152866,-3.528490438382491,-2.9044280561129296,-1.9489717286085804,-3.510070835297265,-3.787753717740677,-3.829542802535874,-2.0632319323049826,-3.746626346084606,-3.6755242789989833,-1.795093881871507,-3.505166637921441,-2.306286163462174,-3.753793369090382,-3.6786366914407314,-1.703186859804733,-3.9201469377322393,-3.3341841670140955,-3.962113566183746,-2.116563129678945,-2.971806060133944,-2.178773581242963,-2.4374250965617623,-3.2255737413052135,-3.7765369455767512,-4.136419114300173,-2.6473158508776713,-3.6458826510340714,-2.6490396100311715,-2.152823119220004,-3.6551796746943346,-3.737543436995977,-3.246682297454079,-3.115386563911482,-3.2130469575313683,-1.4495046487701486,-3.3790172219525982,-2.456311193616896,-3.165603775484107,-3.8685517739671957,-3.121896615331793,-3.900892122977269,-3.2968322247683925,-3.871113458437726,-2.6114036424602207,-2.672276833322183,-2.0028146848503754,-2.51388540960657,-3.540531216392634,-3.1052207972881867,-2.7689678543239515,-3.680578625366916,-3.501189375932252,-2.9714421503911446,-1.6786213018289122,-2.9360659505991737,-3.6837887865354917,-3.85686338533145,-3.574450863626818,-2.840621791177897,-2.7874779485973322,-1.5339799763767303,-3.5816367937627565,-3.2051435346981383,-3.03279344302107,-3.6470963201700974,-3.846119895392059,-1.517208680568084,-3.9771386042374814,-2.603932907416641,-2.1659867452959998,-2.614053843116439,-2.8120597682000366,-3.22784956821557,-3.83884373042817,-3.286273519385794,-2.0818061213446835,-3.0379396910680208,-3.753471048350869,-2.2184291049876816,-3.66635772415062,-1.4269314775074569,-2.9702012643638,-3.155595450103529,-1.5219989046417293,-3.501253205463801,-3.0945931773289246,-2.8997335185394664,-3.3188831273800643,-2.827617717567265,-3.7157370063699187,-4.026103070091705,-2.6679294197967542,-3.335286276432487,-2.57447136657075,-1.8972151108479234,-4.332168268665251,-3.2181184112195074,-3.6796267648698153,-3.7412970751529047,-3.1133915317866916,-3.083898494140324,-3.7956426810734936,-3.8679244622302797,-2.9386974238424597,-3.0519884404452258,-2.605739656050784,-4.071878867255462,-3.8282265055252918,-3.022327082476714,-3.827727239819122,-3.2512915234146913,-3.5296457448011287,-3.878896034155177,-3.3593904289080125,-3.603176841467055,-3.6651484327895076,-1.864733218266657,-2.478840717592497,-3.152054861909744,-2.6936536010325787,-4.07083550548871,-2.4064116975434007,-3.133143939753865,-3.659261701744933,-2.1979984051124757,-2.552482544982323,-2.856202581752413,-9.308322352486417,-3.3898640193973546,-1.5618892288641302,-2.631245228162018,-2.923638753399713,-6.33127472943642,-2.712718501868299,-2.3124780618979113,-3.4935292719700377,-3.735598808327357,-3.3838768804841965,-3.7940794199235386,-2.0290816347345544,-1.9046236636239031,-2.998485162148582,-2.1239596471338116,-1.3657072830944963,-3.8665370715416207,-4.761578246912805,-11.724809241946208,-1.8231556539529572,-2.8977680444758542,-2.6483570397365743,-3.668565118898551,-3.9556837982090736,-3.1686749324064354,-2.7114230000066493,-2.1696772605313184,-2.2307724619976055,-2.5033506785728807,-3.3442244143478566,-3.421556492810277,-3.4543066031925975,-1.5862615464692933,-3.3777911471804094,-3.3732717164208834,-3.1671872087406685,-3.800806041767852,-2.609318618018576,-2.0893570286743737,-2.527661497289838,-3.4324839381829597,-3.922723031727366,-3.1719769461028564,-2.969126193049096,-3.6623382021451665,-2.352219601059944,-2.986304185732227,-2.254075317386618,-1.9827797479453966,-3.4572313507818015,-6.20833815214242,-2.913050072202856,-34.47619672957418,-2.419404412731591,-3.506781092277081,-2.4482159538131563,-3.1513161631451525,-3.435971797483877,-1.9257233727073244,-4.213047936232496,-3.1623238513629843,-2.7210582377747503,-2.052554028196323,-1.9410446316270604,-2.76196312681223,-3.566057589963126,-2.7089741393132862,-3.0709037244959827,-3.7489932029437294,-2.294429993159522,-2.720876966051949,-2.771018639071539,-3.4622876742804656,-2.4433833043264976,-3.83358894064851,-6.076715744102065,-2.725471188014046,-3.7866438414997043,-3.361757244796027,-3.179660930388528,-4.058921364995452,-3.6630618386475264,-3.6174310298144396,-2.0302244076195124,-2.550297346694527,-3.1080020256332763,-3.336457334416786,-3.2419292985485684,-3.416128155351711,-2.6400710422674485,-3.241125591546385,-3.0550097244053855,-2.694235854787004,-2.5244879654056134,-3.945833270266047,-3.0785957936775286,-2.6785479554355063,-3.1919365606812744,-3.3604828206421624,-2.9456752757842066,-2.6467481048568517,-2.3734907195375294,-3.8301615595815743,-3.4096091252000456,-2.521218165214816,-3.4466465851713624,-2.1373518061956016,-3.3966805477372053,-1.4283211003522738,-2.8988576436444595,-2.478337677457514,-2.908559219383192,-2.7401731393495337,-3.341867340195809,-2.6781894958088315,-3.588079893082309,-3.6452777168450132,-2.468774191203006,-3.969371835058305,-2.5790091855590465,-3.1390436310572607,-2.6713665300387395,-3.1488547887107448,-3.677147966572653,-2.65864510957202,-2.302949307358367,-2.9275405589175296,-3.397056149615458,-3.0150817845444817,-3.4619489578737843,-2.831543509725024,-2.285013915880009,-3.1711403499504778,-3.09124621319393,-2.1115321053915963,-3.71743894862008,-2.7754418566165633,-2.866865541532537,-2.6523290919133293,-3.190360596008321,-3.4068642391761004,-6.722992534442049,-3.069283061742228,-3.381579441484729,-3.072599317188141,-3.902749379600497,-3.0964530494533093,-3.4654918197563394,-2.2162417496410765,-2.6806650256384934,-3.0687714421516534,-3.5950791233045494,-3.604124638528064,-3.7018658028872835,-3.8739785164735827,-1.9187320160961991,-3.6972681848604294,-3.7692649199979846,-4.012358553150478,-3.0585823118584843,-3.2234637233617303,-3.985915557383121,-3.91516248998936,-3.732210583811136,-3.5017774954969547,-3.5555358969899036,-3.1246854381943083,-3.6835266665605637,-3.9564071157642107,-3.1702151276316766,-3.2054853730230266,-3.3536548645250566,-2.708421157248127,-3.400570401551836,-3.7897875976435627,-2.480116586787809,-2.5982371629687373,-2.835409730512585,-3.116130800863939,-3.1882772930450205,-2.555724883988149,-2.8461754254442706,-2.1608231492899512,-3.577457437171699,-3.793781609390375,-3.594478880000191,-2.8717968807046925,-3.6984029499414746,-2.85647744330438,-2.823477751782879,-2.217533880444477,-3.662173310029958,-3.580767931112046,-3.3679099799277403,-3.737188477093071,-2.767303604061834,-4.237665908490522,-3.3652167398946986,-2.9208208968359486,-3.684413384283491,-2.482745673201227,-2.4036940513010325,-2.264922667330106,-2.233756760639727,-2.483720667827521,-2.7350121063002804,-2.054042214639959,-2.9568359305683343,-2.79780777361854,-3.4159816608254907,-3.8035182910726473,-3.186236335386822,-3.127056123291972,-3.430229423737865,-1.4308408715536958,-3.4254442035846493,-3.4278715212329596,-3.953314878576583,-1.7527487067817629,-1.8037372080614018,-2.9465443360291057,-3.3675777604316295,-4.01254210108888,-2.48211337332032,-3.4425159054094294,-1.6145139865270302,-1.848985388921367,-3.2277613901046456,-2.948430400449624,-3.8219824624732524,-2.292036242872016,-1.921304649683369,-3.6975214539124535,-3.5357938977174124,-3.06695133000852,-2.4244020580685444,-3.6041346570822546,-2.8418779008393384,-3.5612685128011083,-3.2003647846259407,-2.0777623079771015,-3.7772955240374917,-3.292014559878459,-2.7196373251442285,-3.155100128775274,-3.571281527175687,-3.903921512291888,-2.701084832128173,-4.066971846963282,-2.2959790913077365,-2.966537108377875,-3.979333151321841,-2.8072770092783954,-2.9765643105789428,-2.7085963723027877,-2.75794399236256,-2.8332502142313363,-2.5005326491951108,-3.9831637565512334,-5.252191210863637,-2.992435081239737,-3.5715460668255874,-2.959361463186582,-2.8126224597157097,-3.445638215307733,-2.321647081678911,-2.8565263508572576,-3.772287202547184,-1.3362954335768906,-2.2719597531074225,-2.5754502644120407,-2.9585354675925695,-2.1583852079516874,-2.4068620439767483,-2.544948179315309,-3.2106438315631953,-1.8943495816967875,-2.453794849277062,-3.5784612660131723,-4.002294876910175,-3.730514787155494,-3.1991802333478443,-3.0931840916193707,-3.9008878679875587,-3.09513501189185,-5.239892194155416,-2.8709602042193665,-3.9671700511808363,-1.4272277633011305,-2.9758052890077678,-2.3597833557206584,-3.2760361193552994,-2.84165472187687,-3.6237313785677054,-3.1907042307895455,-2.685982855692835,-12.440529659869112,-2.5879077737987544,-3.818973550643957,-4.123640301867752,-2.472934886811443,-3.2485928249711744,-3.026412536628938,-3.745402352595184,-3.2903725549988723,-3.5498064685098956,-3.189695119041547,-2.983094370277515,-2.7258961859618474,-3.0106985899920495,-2.222222358546347,-2.4420093334466126,-3.5797420361762966,-1.1590217782504184,-2.286419046074043,-2.6111740959692407,-3.3356923653202277,-1.4952757412675082,-2.647111029337244,-2.8686463591969455,-2.8883163836473447,-1.5331004039037244,-3.6080834580444296,-2.8023744345697867,-1.6327877224924658,-3.56856113454101,-3.1467628381946353,-2.1246371727308047,-2.7822622688653436,-3.5553210588727495,-3.4221165818647243,-1.8106901136002715,-2.858215357836359,-2.9314451005811097,-3.6968022800422844,-2.227615449665241,-3.254094690790851,-2.465618989048632,-3.2186297091412417,-2.1948110614090126,-3.461087530405102,-2.7233369909196625],"c":[1.043886869146853,3.2363806529489247,5.519021886992406,1.8031492013686081,5.991975830821915,2.0143437364927186,3.631292308505669,1.8661604946012302,4.440696055074266,4.95745223829217,2.4617062198783124,5.772368847801807,4.9926257059681625,3.222153593878211,2.4992752406128274,3.6495392470394985,5.170322093160951,4.747422674392035,5.420010967400784,5.746161969798479,4.4548639762772035,5.872522784488281,2.136768731453789,4.127534171427417,1.962014624155444,3.802412790403447,5.277765833069212,4.7280202807667395,1.3706979142067113,3.582767908193253,5.177123269671873,1.7815089237143258,1.5356264984735193,1.4761968180780252,4.182964731097483,4.435703007921424,3.3904004288760303,5.371673035602682,4.0737174671035685,5.789393868932116,3.3521054570022226,4.370821259463074,1.042535771387785,3.48072309868701,5.625690528777241,3.958881343618075,1.8770860658266755,3.3312594409456358,5.188583365368331,3.8228347683497867,3.991887685306219,4.806970627033959,1.9244299221496433,4.968613979365166,1.8454642363453613,2.561929230762058,3.412939526273327,2.727281312774335,4.507101428933432,4.618412432270075,4.864915608008621,3.4553174794216446,5.791694072409616,3.241233782913279,5.524509604176186,5.850392723135247,1.2734090293190428,3.6487089650192877,4.526306009680296,5.79706465671923,5.845068324021986,5.654237257072894,3.6081257064345342,3.655707541373795,4.006913094511122,4.082065962496527,2.16645471367503,1.746810328701002,5.619676935646062,5.189501451172432,4.059835492511177,5.799815781054115,1.7382843755764634,1.9657658473269848,2.8873282153775675,1.742563625216246,4.328112513626815,2.331662239870315,2.847250686613978,3.354886347834145,2.4238871961446886,2.304985576953428,5.9335157893981165,1.5518223924049126,2.010815648709923,1.542876649430497,1.0511790438447635,3.063899984499619,2.136630137035887,3.5288488347678117,2.003337906223609,2.736062237998266,3.2206689809555447,2.5491411969612425,1.9818257561506472,4.2308305815062255,4.077579371401416,5.597406511248803,1.4935070361499483,1.62824255217934,1.424969546462859,3.4713896681822014,4.475220487290363,2.3890930644822763,3.5331267309410297,3.777893753730739,2.7162008838840705,5.214547941341937,3.8704148436466834,3.250770804317347,1.2917791087444244,4.541026978509071,4.784809090047771,4.56872920928245,2.945445294688737,3.4160503177822337,2.271907958045052,1.1007493692449546,4.729080914517365,4.167017823307195,5.9639542748765155,4.213962448523358,4.77002378826548,3.3624014206965227,4.15958055261253,1.2428633761128696,2.2308230638860405,5.036313490523225,1.510282464268248,1.3832465113454953,5.879000265235351,5.855399528823821,1.209527909356516,1.3874221362107733,5.16825955774482,1.7424820706703883,4.00385873600024,2.7297090919002347,5.136623525937041,2.69140457801522,1.3162791810002952,4.653801378707817,3.7812165955619172,2.6832680656568266,4.379311032263274,5.245520118502656,1.6127076352262595,1.5267292517209021,5.304000601551289,2.6137139233568876,5.597207368260481,2.371157655044639,3.8127269503249943,1.1460684242833554,2.7240422014288628,4.708096368174305,2.702112953645739,3.63972951129672,1.4767874204200173,2.5243422966616826,5.1857220193678115,2.960346451432823,5.378339373221398,5.807110347704508,4.340451649049598,5.045679326519709,3.233345314816214,4.478118401947744,4.996280976044435,3.061144659366705,4.233227801332415,3.883528073911499,5.438905559298819,5.556247337955411,1.8481859400881164,2.854834269399044,3.0961303557017805,5.818451876611602,5.722330678079839,2.375422486134884,1.4059853383255685,4.140053957006922,5.076325417094841,4.3160437273745185,1.7891506597633446,3.2327105845260533,1.3371744053757286,4.6957380198975995,5.505395479341468,2.0653485650983963,4.651092017217401,2.6365759441590724,5.517829341251241,1.5617711466106534,1.9326285680712376,5.647824550094093,5.391010326525312,1.5240640162576926,3.396588133860633,3.9979316988864646,5.1302997197031734,3.215304031928534,2.540756776471347,3.5202422330401983,2.5389471139618616,5.946883514799158,1.7535596368705244,1.3620585084815664,3.4250806984839324,3.414113747153946,5.649282963330569,3.9307309236918333,1.018173269031977,5.06263463038794,3.7287388680715328,2.590563470134504,3.685119594437274,3.4299749971926357,2.1619812854000653,5.552551557863075,3.95138911972592,2.440445179745514,5.633839430356455,3.716903995178704,3.687992216942434,2.5343921222311274,4.946420367117667,1.0697645897256716,4.645342897934327,3.7003320783671905,4.940142673322872,5.80102587492258,1.9460466969240422,3.0168239692836467,1.7169874193671055,5.378807565518079,3.0589020938669975,5.522916045377784,2.927599946644676,3.762122924090998,5.1345129493321044,1.3721965540846028,4.420208037088194,2.597851652650739,1.956291302482759,2.0680194952271895,4.65611784001244,4.246457193198792,4.98462093513229,5.336214890541969,5.1625838817714635,3.380821654813846,1.5984179124538402,1.5233924097186604,3.512465020697896,4.1572692556948105,5.497657457470147,4.733679202776113,4.832660799432782,2.776283346674916,4.778378347546994,2.5718291758986203,2.7135467496467003,5.32353651726439,4.029047486503467,5.799347822938591,5.234866106365135,3.953618524289654,5.47469218502026,2.243872160212498,2.182009815921284,5.806230754785847,1.7181181359870392,4.693675323927837,2.3849435662950835,2.2136698855462735,1.8832133226889949,4.804601737640133,1.9641676905994778,2.7928316290021042,2.52432142245712,1.9606047544146912,4.496485022584489,5.230750403978888,5.066769832425465,2.8180644719295813,3.9971001758519367,4.320889663981576,1.9753160351694756,1.9285070354011915,3.1315655886211857,2.8092140315645633,4.522142126344039,3.3432500848633553,5.3049731281821115,4.984846551167431,4.469297897647072,4.538968583234495,3.7541577182657075,2.7946578014927717,5.050317350470053,3.557482552084689,1.0724554751038176,1.789019823766588,4.528106083189771,3.39226339371596,1.7243786021511167,4.327164321441617,1.6490250486325355,2.031791669036658,2.982406930173547,5.347719647790393,4.633121991149238,1.2606736851641889,4.985215309483331,3.7793486903209716,1.236368286860834,1.9668809677894663,4.325050934832484,2.5041660228662956,2.8037151721894453,1.3223663183733572,1.5875333099214786,1.369521834719585,4.288743685745836,2.2976945406065155,3.7493610475031405,4.212100701113326,3.8076740184418556,2.6859756045795593,3.6542860469100313,1.5651915163603927,5.51809335468928,1.4943515471931148,3.4831403878005966,3.6693165700092267,3.7502994255013102,1.6307464747626923,1.648165054333254,2.3525970549861754,2.254806018621557,5.4586700765249985,3.428604096269341,2.7971844844641662,1.7573954359737667,2.8176969575702087,3.9028510968190058,5.510854024649484,5.736209823946079,5.3903377663925705,3.0540950029342433,1.3641075934531024,2.472194608529901,1.0725556826827956,5.688695883197807,1.4087050823477534,1.4329525487378971,2.1021862473628907,3.1339982717296624,2.9545769334730845,4.67466427843116,4.354070433864523,4.312653434904519,5.954665604275789,3.8586216256419217,1.1073516525714835,5.56875897219799,4.834465345811081,3.673529093763335,4.779528926371194,1.4678169720156222,5.46861227562298,2.4452591350142896,2.808380635649071,5.8668553059855215,3.8088859858961635,3.2279061237778777,3.6763182416800535,3.8845738684165703,3.043621620114479,5.739887162624475,4.10872482758702,3.3576847249506105,2.527378968104476,5.030260894160131,2.421132100359679,2.0141715815808796,2.0305576488435166,3.709945226758946,5.62291616256433,4.166763809689152,2.913546791733279,4.210430398174227,3.7153534578542615,4.65674454990664,4.143839292720983,1.2781705494605446,1.9445228303520647,5.222040441039983,4.123594279483931,4.523228069210599,4.349825814446734,5.0557432275632195,3.7673203289889647,3.1272474211433368,1.9991264284105217,2.061845071653157,4.499340336097319,3.3043843388833762,4.230596863969603,3.3825038850030547,1.087776093144788,1.5293567399783439,1.0053544329846789,1.8326536507917237,1.8966677794470446,5.832593732404345,4.479430816788426,2.3213208722326297,5.025012932223655,5.88941986032485,3.8101245465945315,2.792089181071331,1.5603727651333223,5.9319790170152755,3.37567131976385,3.9529403987454184,5.60150511114958,2.360421176849419,1.6159214024850468,5.8547246678027225,5.307607644390775,1.224860714821935,4.09900336719934,1.6386814608306768,1.0514186271150485,1.5711880252865176,4.667231871462748,3.475440694059249,4.966728779524114,3.0376238850827324,5.196502693522662,4.830941374002573,5.817629064543203,1.5207266422489343,3.5365178127775776,4.886574463120409,2.0389608837984046,1.4029346793516686,1.8358448424804443,4.637739004692183,5.448815403170904,3.7431598545222355,2.9038338073560745,1.1051141660327126,1.7582097842007718,5.203653871953348,5.658609083753452,3.335407597949203,4.6442090652947146,4.2315776135083585,1.6680025606137308,2.041690209114071,3.966530944403617,4.255309473296034,5.76371000090015,4.404331278950741,5.898810453609527,1.2563112349019125,1.8040453324294816,5.257252591436896,4.47491443335792,4.583529938769566,1.2995636794004242,5.429268035855606,5.195366470503635,1.1828767839650036,2.1461125292011998,5.405160544964754,4.180974885742128,2.492651376365642,5.852242911883646,5.3835341238861805,2.369931792355632,1.765483132821192,3.4311933161976973,1.7567004606382144,2.4193891748809384,2.0430130062661522,5.865825368720083,1.830908316251181,1.964254074739711,4.008425031186512,5.336218155390942,2.699764415344042,5.602244104425186,3.518218077185017,1.54793484428178,3.2607190936387433,3.8181155323309124,3.1226906973773527,2.2961872405583286,1.531722826503328,2.1978597224211986,5.424014865105129,2.457948236010931,3.788141623090751,5.122784121489106,4.344285296966553,1.769809913992795,5.124984754551884,5.173584398705804,1.7996758405234083,2.7159946097419243,3.5719843553488655,1.5478143863887042,4.154413772879172,5.889063013191011,4.603822848441424,2.1415299382514474,1.7919536425842244,4.091293173840606,1.7188705085720848,2.8549245958846097,3.373998037634135,4.2489151277427295,2.611687716018287,2.922111397854527,2.5323918092140665,2.6623253519361256,5.198687158232874,2.325125250106475,2.945836361322896,2.8841959840373557,1.4275489685535805,2.0243854593506985,1.4100690703312804,2.0890389706744252,2.669095118977233,4.369869113249212,3.3644870628863424,5.282091169070361,5.401722723029446,1.5674789746726794,1.8810784645035574,1.5114743222348384,1.2461949254325846,1.195908729553692,3.3110689455389286,5.4833781769198735,1.5655516141557537,4.818330452868306,4.710161941446161,3.210202724091287,1.5306930001754917,5.2962406001463735,4.044946152657301,2.4077200167244164,2.6977802880399784,5.309986477279479,1.007313402784016,3.2670946097346034,3.7957764302467245,5.143774981538493,3.866085299319031,3.2568898960051254,3.030516478367026,2.302456606671807,1.4864854225157778,1.3355656448137656,1.3969502524380053,3.668581477358345,5.491877786810427,2.1322214857765456,3.7325720092979546,3.7935344338138823,3.649176348475857,4.151006446790508,5.852635488744516,4.877632483365833,1.9386097112412217,1.5875043919436274,2.0589519526823263,2.8742883432561355,4.447780197719224,2.0956204373075975,1.1800130496969865,2.6079711589858716,5.579172734643078,3.989735796734143,4.861368285892418,5.872192644523288,3.885769530848743,2.971976889692714,3.593536729686389,3.4752855882906424,5.229612779783932,4.073509543137217,4.078963351045423,3.7431139198545873,1.374260428220966,5.954873882959275,1.7984573154388064,1.3374707723821646,2.970244801709767,5.06589128051392,3.7730782240977314,2.1206337993280977,5.627714311003109,3.146032741356161,1.1126776474147562,5.936974172424499,3.8012891962268895,1.656517637334556,2.0454211124478627,1.0233710065713588,5.526806536252126,5.306428563028478,2.6665669777568812,4.030301140999764,2.7276526394489267,3.057618188547462,1.964957171858979,5.0468771727924056,3.71362421248595,1.867691514482315,1.969872281721299,4.681593023334536,2.9537767044896617,2.9071535193960787,2.9850335800320873,5.807952550391952,1.5310325326141385,5.209995964249572,3.835879606935104,2.654203127291968,1.7370787942190804,5.30803030546068,3.8044947669101914,4.097195923279643,1.196028672316969,4.117698462634426,2.502310361025241,5.286769578974214,3.796437073415129,5.2639393310122955,5.229019966102775,2.3491143906979963,4.778746123415287,1.4991693072122405,5.003482315216365,3.826465739110108,5.952910993027308,2.514702314768701,4.173611188335616,4.2453616246561605,3.599527132018146,5.225414681659459,4.2707341271693195,3.515479328460012,2.558541734554767,3.8561824627487864,3.541436911539595,1.687404214914854,3.569523504522624,3.001786655947652,5.36131777368045,1.0171371881641813,4.372184454146225,4.608780050850539,1.5377825730502306,2.3137003483674903,1.3809572512352921,1.7620505454194748,2.513243482767075,1.993881903988706,4.951977634308022,5.663840127145168,4.093849265376319,3.2766724824730202,1.032522257624924,5.274280019145548,2.784055572026494,3.625223324392576,4.243457748873146,1.9279859685227476,3.6694317333897377,2.875002998051044,3.1531542880711863,1.094547033521627,2.1590789375016697,3.1131418363152097,1.9890273723719267,3.028350217164643,5.246609617475606,4.180529699233396,2.736375090022775,2.700316985610999,2.997097614818978,3.676108283796048,5.861440101161538,2.801926299545271,1.8990122354042007,3.759184431724865,3.884896054052181,5.469324663539375,3.1674914704740877,1.4067156804663974,3.387757280865348,5.8185596633641605,2.85098462126418,3.119949819037438,1.6213679650403936,2.844616622778096,4.271358369604304,5.2659224938832265,2.4679354604982664,2.7448219151000997,5.787187386676313,2.263751431407255,4.334951304795984,4.475123649191988,3.5468998979843094,4.588945067542295,5.795457432242638,4.2775198167096935,4.023102508621064,5.9718778372318715,1.1393587187429801,1.2512370232840289,4.382556223611779,3.4879351475341602,1.5619776134705134,3.105644550240926,1.6391838628113888,4.097043054002084,5.731423866881583,1.4230551311516018,4.216612665536024,5.095108845843831,4.968050501858659,5.738315976767157,1.2760861450507957,3.23123103339422,5.459404935321061,5.8885986845359,4.417269155049246,5.281960677673785,2.9122143789821564,4.6120439236310995,1.5472212362843587,4.091600207007975,5.466447443119868,4.3028483113150084,3.564219237124398,5.793384354795821,1.9157019164797942,2.4158364714256444,2.068063549390711,5.471792664934309,1.3476603703503844,3.5647036004145294,4.559890227982536,5.7584803279655095,1.6134555082979476,4.634528006467454,2.0092506949328195,4.596468279959446,5.71971086429866,4.102340664782913,5.933102936912821,1.214707780784249,5.726227194890743,4.436235082369449,3.7464230143659707,4.628299617680261,2.9810211138120373,2.2942211159342065,5.707507647631224,4.336833903295152,5.1818386561541265,5.643833491230319,3.3433672337348233,5.842104644537568,2.808687648165226,5.229851346175345,1.2057784852214462,5.21122753164907,2.625985509992258,5.649108253739574,2.0433390595502,4.637070144693628,3.5132535111493945,2.7165002642744334,5.267105682359943,5.804037901081251,2.771311108208269,3.2794918104730755,4.6990196892696625,1.84992785222193,3.157615874500669,1.4657957625103692,1.3188729610567098,2.980809914218148,3.7853356307553367,2.9660080301824188,1.670925640582385,3.8113637913323664,2.8008305715988957,1.5374461921852058,2.6744997900192327,1.0532328834973517,4.535704203856521,1.006181317074898,4.344525832834206,5.399390010001703,1.5037459870241234,4.514836161253508,1.0684321467401428,4.30875954407245,5.376597658301079,2.0197142287517003,3.2383376168048397,2.659513240089061,5.13921199824976,4.743177952840286,4.384936428597898,3.1080275877057097,5.054427089015364,5.87086194899009,3.6362531233870867,4.089262005490134,2.7033690228219767,5.060987405224365,4.79683972347979,3.6627470583688084,5.849056842481611,5.705821643449971,4.246180014426184,3.5549872011834927,2.215479744373434,5.1572648613712895,3.4857164564165366,3.5679922534093347,5.795995318657744,4.8459510052369525,3.7708238805997896,4.522638885467822,4.7369727678614435,2.486093719670498,3.093866505183495,1.3427125781146323,1.8362941508986765,3.514135846020106,3.168928649721602,4.324960318912543,5.629979836305002,4.183882774828714,1.937666974997241,5.684563177200061,5.691465632762334,5.455584250120732,1.8220483184451977,5.433043675322075,5.67908311974079,3.0840572722892725,1.2682691773767842,2.693419967656926,3.3543276312138817,4.706804411391239,1.3112855091628242,2.896466991939879,2.6758201840105458,2.0741406214171456,2.7589630053751346,3.302371497997023,5.749355774295415,3.8796645877346014,3.5551723715628083,1.0987863206469386,3.1485417004908767,2.8181358637003617,1.7360153070150033,5.154717514229546,4.232842586806635,2.958506276227161,2.600998615631597,4.277829197832414,2.7411473379540263,1.8169289362103371,1.0977428356476218,5.779116136883266,2.6444270101704372,3.6800471332245124,1.123267021691511,5.511317418417018,1.9477253333494151,2.217661066458633,1.86754655489507,1.1004500801658614,1.6885526846083023,2.0254926043372627,5.627921955564437,3.0918409178560617,2.3987548944469608,5.247429354134016,1.850004244889918,4.026726128747712,3.8533493971243584,4.963129553805498,4.482543733035021,4.77426633602644,2.643104934429477,2.7922111235437055,2.325700097239996,5.01062187767792,1.0799838164134403,2.7733466690306567,5.931056334945049,4.69264819303258,3.8470425531275865,3.7541081311374613,5.891351438844357,4.88712880833317,1.9558378696095138,2.877453585908353,4.700621436131685,1.770807251202189,4.123915967806684,5.052690723256759,3.38875954815837,2.8829417378562696,5.393392835659283,5.654278143845136,5.697768148499977,2.9023337243443517,1.917271940716824,4.352197800294695,4.86351550809432,3.4263640705895906,4.506545854426503,3.1980866272649644,2.8308764030105182,3.1419109031862704,5.077138846396869,1.8353431229505892,2.4173935937624558,1.437003880825344,2.628383537950225,5.93191195966257,5.456663806319744,5.285900006973508,4.989989198888555,1.5320829211530553,2.3018984089090715,1.4259211234040405,2.467668172065647,5.196605620291155,4.211450403415107,1.551524266008202,5.557800248040598,1.2880335465872574,4.274094573914811,2.7347917421392935,5.659956467783991,1.9590736803292543,3.8804785036868585,3.7763738934720528,1.9647565651441004,1.5948454797217306,1.8487574471703474,3.846034194469458,1.8500526179985401,4.240968068676105,3.4840739858680214,3.3840980728001524,5.846397920874005,4.158914554166641,2.878864865556087,1.2991909016972094,2.755730971209757,5.396832376855163,3.86466854812218,3.2895175970028703,4.082132105126326,2.87591402454287,2.3679227434459342,2.144021989256736,5.633831722623785,4.925755085057615],"x":[9.361969701154553,8.994423983048803,13.633766448915978,5.248330385627384,10.336898943775068,16.906414048246848,8.123972528356958,10.839367748372634,8.152192108872711,10.265315976696925,10.018161825481176,4.931074886481759,6.583033029368856,4.565104176634591,3.076330075079634,11.757458884277547,3.160208412749206,4.704589564704644,5.524912063001442,15.278750015560266,11.504344534301469,9.718624268993988,10.50673701721244,6.5412021661089925,9.888385738464462,10.319175473444705,5.569184779888921,7.940950137578479,18.114696065157034,12.275445555145046,9.165387191048476,9.522875046487638,3.176053465001032,14.52724397736874,10.800750744698254,4.5787973961274915,10.610909223203148,3.2233007312403417,4.647236483237838,13.007632108940506,10.76005652989953,6.687632107196359,14.174469419926485,8.094073528955168,13.164024535811524,13.696679137056966,10.459719280141787,7.77397826974648,17.065357233477034,4.3463315061168695,4.741901687689305,19.140258097079993,3.72437738436989,5.5068449681186316,18.391970033016293,14.955804705426885,6.353969051575843,3.3169571697161837,12.889885550029987,13.482296432337382,2.7531604775938168,15.530254064479612,12.900491690981472,9.076892235180757,6.657171048448811,2.8960020190282365,6.901715738377212,14.724167847092186,8.218804558520672,5.234940625927187,14.567000884717004,11.17594797340284,4.35398639874693,16.117781826100355,13.842611423031958,6.746146973304821,2.470312834301338,11.391192002955838,10.71937029964791,15.844858340733495,11.1156596302336,10.281147816858539,9.694224698288934,6.622837801354253,9.111843791001279,11.582164941777357,8.52489545204908,15.88324524809723,9.469203733206758,17.061022257013587,10.729531317837644,12.966685966517097,19.21717454030489,14.519807389277444,10.478900306766883,5.778172640223882,15.9716953150438,7.1224209343247695,16.523496486266048,17.073146238068524,2.5607063592081447,15.871329416833301,5.927428736500346,10.138868768360677,10.635196538139326,4.935350675205164,9.408635122479343,9.125986893537272,14.3688802977555,6.37613154171871,8.648653485025601,10.77626724885585,6.800941766425597,17.427136222756957,9.331497461380003,7.189548451959222,10.864974826888837,4.300209257150238,16.76123931481628,11.038612669410126,10.549746175642653,5.548904911746634,6.539699313098904,4.441866593972064,11.855233054167817,7.927078898629372,10.4999820341881,2.3978347053745197,5.462115901051085,12.621235736080354,13.801973976372352,8.064003120031854,7.353169988590189,3.717868495750738,15.812427586614644,7.24102775240022,11.177415762071703,9.939003180513907,11.019376801181071,8.340359630577511,17.474518555003613,4.980425941980708,10.554195155439986,5.831900386702515,8.751874546107974,7.895696250157435,4.614240431988197,12.391119993168896,13.368999978934886,10.392310719969291,9.528154813279155,6.0187307918064725,7.93821219080696,3.2159254532231762,7.113745095461848,1.559808298603067,10.619741028991983,15.584046786242528,15.772416270519606,6.844540849495811,5.449441519427298,12.719259111780419,17.43626442864546,18.37966375961524,8.41366293621111,12.08600635658814,9.791316077299555,11.378034099344658,10.746490842792895,14.330677047111234,8.633491076968717,8.210336604211834,14.748035405396923,6.891233562276861,9.207054128326615,13.717549062536786,6.850520424522513,3.860596266605083,5.759335843717155,9.328183760584908,7.1855267402230165,7.783364357738107,13.403301846562488,5.502908338338328,14.92553648975636,1.8965720261016594,10.229218238092468,12.01097646373442,8.172661479209577,9.14672227556255,9.795830266242671,13.538361522297087,4.675472238226503,11.288469388645968,10.43744075453586,15.39725827455046,8.464733293661501,14.284877950306772,7.328709102350068,17.970566219538654,8.162903151556783,14.586694978513954,11.352713023817751,7.41256176120576,16.885604121676153,14.220112481134858,15.649352080783181,4.598530213435657,7.092390189153495,5.891214365700872,6.561468859778203,1.9937584953466203,5.4008231880925255,16.304817652967415,14.401554001917654,13.213520484731921,18.311935420717013,12.953283044127772,12.298263634428581,10.532143423064198,9.901582078945427,3.687146312568119,18.646395873818953,4.680682421598885,11.967384457744501,4.635505249089105,15.751715879803726,11.385664087144425,12.081179755954107,1.6850425298892113,11.744880047358945,4.748611569134478,13.878112653274355,13.890451510352994,14.95259366701158,3.9036646986252066,11.021356654295696,16.543204150909666,16.71930587460391,7.856647870510947,12.026482096330927,10.3962706488312,15.62449453802598,11.754813720601566,11.146857065764571,7.261447525881211,0.5932364638241983,0.3441447094748584,13.750840213457893,7.377787179746862,11.027180818064036,11.24228974950071,13.041501898580988,12.516455503714397,8.514684866633226,9.955792833520272,4.091100946136903,10.402238687917919,9.084445443779616,10.455472773426258,6.481030839989998,9.47047638033344,1.83536574056816,4.150595742228105,10.27019744012308,7.257357884729007,9.070081957367051,16.46489321778197,9.080154839366651,14.208287448606514,8.670803899399997,6.848970799204448,8.938963842806238,10.625616334240403,12.080341906628224,5.903874445515953,6.398695543010458,14.190722718142636,3.3286721167560795,16.929086424188405,6.87682831440722,11.900583646027375,6.696914299875201,12.340816554680313,6.794368128704065,12.373357110708938,4.81120983986748,7.702338494736094,8.77891277078825,2.213637102163306,10.081302705768207,16.26914493006491,12.18620504237274,5.75383286265001,9.777309031252418,11.009484564993873,16.753026290708736,13.858771092472084,3.434064959112837,13.511989072296684,16.964343783296055,4.353618273458533,5.258300278409078,5.890063922859607,14.601995999524343,11.934145777454592,11.573474468635307,11.469081378399814,4.590989595621771,13.858640679522056,5.084739355256131,12.143049477198021,16.18116265076896,7.931038570502652,15.086492403139133,8.513576052448432,10.310516968670957,17.01129536508897,9.112966682751345,5.922106012173809,1.0281831132210817,13.554939518586368,10.032382236035314,15.489359786679145,8.555367519632318,7.214075865238742,11.43526646941165,4.011263971158869,12.293373755295688,10.745366146611993,9.298924756828054,6.7870515107667355,10.494250564077891,10.495201433280014,15.53504702665505,7.527519940801142,7.409320470948937,10.510068499249686,8.601080423008487,6.105848392364059,15.198101070401195,12.797426317353864,3.736582074324839,9.028221965393826,11.195912684549448,10.009305307653975,11.985828433779002,8.61781054332917,8.751294503186287,13.957483258052639,15.067477452967568,17.294821910369837,11.155079980112065,9.856814754137822,10.6788536541138,5.888816055012446,11.611596088792274,14.68621442012329,3.527723988996263,13.006212628121727,10.551872535820474,14.395531172490482,8.709134585305618,8.064785657396811,8.906231007227364,7.7922777049475815,9.25376687248577,12.64707878734625,6.467868187536598,14.946024052581294,12.605709187256542,8.48011823590561,11.83070114531259,12.99367171376661,10.719225732249846,14.868313610075363,3.142974829368519,8.254052978723237,9.025517664908696,4.837991727141027,5.040000150718333,13.16529380197199,5.603547841105092,7.384589878929358,9.594956228204364,9.117305520986784,10.702120847919094,8.413054567721874,13.579506141805794,7.805616993685607,11.565089314177337,12.921156917105375,12.429139130061515,12.129180561350193,13.981428067865913,12.478478038607467,8.514879183969025,9.528187466378881,4.0254102044782325,15.914396604817666,14.542448010863483,11.261918658694498,5.942158365038761,9.828642947813401,9.676115429408124,8.199793192987162,13.089314809963192,13.303976663785068,5.812044958470309,11.704757528357243,5.559288420627917,15.882529882848011,8.431442177938031,8.463004646682437,4.1018261630586546,10.371252054600998,6.043195737320458,15.084383107540308,13.62833621796975,7.874149074363867,16.383855709981326,9.053960776831666,6.440354162385485,17.50012092448319,9.518880249077139,6.86515646126815,16.573276153517142,0.6593313811092982,6.205294213677899,9.847841636596574,12.16192237622542,13.369142238476465,11.698031672631291,9.566421460514928,8.348883813434323,13.499345181233235,8.192808565345075,11.37069559408998,14.004550057768483,5.803630719769419,6.564228938449954,16.394508575849944,3.9280646795694496,9.534878457704476,9.115782791632487,17.048021507289597,4.187913970717769,9.97365853959781,11.933042692148655,15.26027659513727,9.817925231305217,9.951527121631702,9.973718885614591,15.790485209828603,9.325116867967854,14.208504637852318,8.248987995974863,8.32343489271412,3.7819759159433985,6.622569845834749,6.872442493393525,10.225721407000982,4.577337335199461,14.48360551452435,5.4660684588386514,7.276511519930849,4.0835385933110935,3.8609527282169376,7.204552342497921,7.05888535621205,13.056622572816863,15.668954414422505,11.057653397678095,7.310810190409887,14.871260096741363,9.467657655043592,6.79579708435657,10.201834468770908,8.024336259537428,10.561808886484236,15.799839028791343,14.744680608861074,13.791878460314837,10.04080027473998,9.823180301216794,6.202404644940738,3.2886398377343995,15.023230656334352,11.982096607983646,12.189208209669982,9.113261626810708,11.49713370057998,9.290604286909124,9.118203283110498,12.609539299725965,3.3532338686443874,18.46895523692529,6.696634450612811,18.10550320194195,12.267083935127443,9.798143345437305,8.357601748927463,16.53688343288119,7.581913614334274,12.723106243021878,8.322259082073266,7.825830882745384,13.737003810326506,5.731638014612532,0.9215396821965394,8.558943895440127,16.380635439393103,12.490705090227001,3.492428465434394,12.999859720335845,9.396640078740528,8.806231646457944,2.811590184882382,10.692112395710947,6.858585903599129,10.013474195538862,5.514408611535789,6.7005683563428065,19.56172677903286,13.708268241093219,3.240909200803437,18.546205610305243,11.828969167005955,8.18171271111413,13.178820608516991,10.470173241725188,7.468367334738236,4.169478596672837,13.534894518922393,14.7786458871049,14.411627635536025,7.003571486792477,13.930878593876507,7.962445421944171,6.502508337329322,9.78533332558747,5.3468887625188,11.430705658576127,16.896741937694582,8.376083967380183,14.973501574359283,14.533452036961972,17.727218969317434,11.154463243165656,7.602672316356771,9.389324589036235,11.549319153186117,15.948175693876513,14.704438477376788,15.697863553858344,3.9317932673883083,7.614776561776374,10.698460561277022,3.496933410244649,17.098809817596987,13.025117438823678,6.824361143907723,10.909788760990077,10.146380190453161,3.222697301539541,9.16634180890495,5.738326197144408,10.890651705462172,17.311442417909653,12.407113776473174,16.95599157592222,7.690714662412188,10.605195931651895,3.120101396593171,9.562108437919335,11.24205221650416,8.879957270666043,9.573891206116205,4.583127194710029,4.884508031528238,15.110933646045341,14.6406863930588,12.272340066586658,6.82980511551966,11.721299497785967,17.527521722903813,13.63038012306576,12.362629294774194,8.370493024483803,6.253760412643475,8.964758482986394,15.385180469683808,7.202083971065997,7.6446958125115945,13.554926726063993,8.290370809665683,5.15326967067415,15.927991923127955,7.732545079931388,7.700878806676572,6.635406503337453,11.111142359949573,15.800980155588853,16.160325066834893,10.190076677244464,3.7173754969084305,5.568654512074778,17.714734426543117,8.215347291787635,14.619698268446513,6.28342570534768,7.6100312053311825,11.633372226862193,9.722749079753774,12.751452756990439,11.604058208282577,11.14582727370265,13.67211050290777,4.2551132622451,13.54610764523199,14.742809993255195,6.841058574016268,9.717763387825794,6.611924915356999,5.148785510975989,12.47786011309982,10.773348764708501,18.52883825243112,12.846546328573083,9.659586235543113,11.51813663381111,14.24937386042811,18.148829166126717,2.398459886426565,7.014483637870823,9.79548292462808,18.514718097410515,10.286819256962998,11.973886950529597,16.43862888039918,8.480637135715817,17.196983125088828,10.560637328714787,12.46685357908315,8.382423916406776,15.017494389171127,8.36530238446878,3.0909636694910447,9.280850491784738,4.296139191090418,15.836113343291265,9.57472919287294,13.54185536072312,13.645965641257337,4.881303874435126,7.547615299806694,12.714591962592895,8.594818372992403,9.616972812261956,6.610376804284946,4.635940639648397,10.446985812784936,4.548721002003647,10.522076592828833,2.1098088451922203,8.926703880376387,15.7948534373034,7.225894942300999,15.088650013877476,5.5442333527010454,4.287123329198819,13.117528726532445,1.7399089234487097,2.729483703784328,10.142291771481492,7.404209635884726,7.207403400805914,3.019762011152385,6.060082873955103,11.765679097598198,7.56433315057035,15.148119554193984,14.187135215804929,7.974285513250486,7.786080801904012,10.954352875209805,3.5845349534097104,11.79184709752177,10.382325917605753,16.51860184938923,5.127238462578269,13.629129091527766,0.4941928237334614,11.551433804695332,14.170076680191583,3.634071378639736,9.666644129553866,11.083346453859155,9.792054037114513,10.868592591325038,8.127313697253937,14.294773293134314,10.093480843394094,6.496012495040244,6.560938769297104,8.885586756893066,4.203812207516629,7.732370737526422,2.754864455066328,6.366990811314741,2.920166223978782,4.008634216230405,14.423771570805089,4.849491902298251,12.451420148482239,16.870359328685385,8.556885853477414,14.162204334460409,5.929796601494102,12.380728215759813,5.980879912898598,5.913513657278419,11.382190221005182,16.913203347427213,11.904381670744435,10.699746678426036,17.754816542116494,8.004049726412337,8.451925364218972,3.9901186698503666,15.386617102502331,4.9406011175712905,4.0514433087626145,4.124443158936026,4.9358990872118635,17.448604560345025,11.378144637285539,8.431168058001337,15.6921663518573,14.28440059618555,15.705893770672006,7.8904531263583415,4.6214269489749515,9.494596515044426,6.462056070083551,8.933334531965905,3.109848865440028,7.117044182133152,8.23758776303718,8.374639323264482,11.967358052407814,1.8448199428013279,10.243515900440226,13.15188612327773,4.77941336750852,10.403141809012325,13.62607520808115,13.237295767064648,8.60727350673788,7.990692342023857,12.837026489346183,13.612010372219942,7.817491127710265,15.484480310805909,8.497313860459375,15.513777915052362,10.649066077629621,10.485622881902575,2.966415801042517,11.06127212156203,3.3876324751664244,13.799498106162204,9.990958099322603,17.02281779488444,12.103130226288307,7.152991191790948,13.979040149275466,5.926687082332702,10.75047408249841,10.34342668801813,15.321720787784535,10.528176754515277,9.712584866326534,2.339708253546875,7.837443232245529,16.27825896115818,8.362572947783612,10.41435688818081,5.627737957711931,2.8443493802206232,11.95275257318481,8.044003329924008,3.714248033756753,13.723917722914189,9.48827819056662,4.337950980637597,5.720298580674921,11.485031472196392,14.944303226187849,4.736525886792654,13.882925484156358,8.816602292441047,12.919653952679708,14.247479902290914,14.471987112261171,16.99313300620624,2.4172752133785536,10.666785582594033,8.580268356437049,7.346517391940204,12.531977060790032,9.283151750339941,12.611219807003396,6.9359863090542255,9.964559848639459,11.859665767384241,15.656213975755522,5.651084401742765,10.168090252014576,16.796126016736995,16.971323932172258,7.595563525777844,13.908419913752102,14.264644222698939,9.297196673201968,16.627227824663407,16.551161738669684,5.940910856263605,8.248658494223562,7.389040071166217,8.75615211322891,14.122199075969753,12.717200327755164,5.451619915262156,11.85425848395901,11.850921997291252,5.471015382200614,13.65174847597529,1.7640704887608782,6.454584280253346,11.437080859128233,14.335642875433322,1.2882126389343052,17.33765066714027,5.734696371447258,12.210964292753218,13.848627384685757,6.509592099644184,7.644163167559196,9.297464349668406,16.29308776003934,14.911440911414166,14.154448664328706,5.49777530219184,4.777425529981427,7.8482953766815715,12.512463480829712,18.280180722106827,4.779797926620013,8.131802411288726,11.558668046901076,11.47839650928025,6.891757398403463,8.59782457907733,3.3450236647463893,8.47027324601331,10.020079684669135,16.959407756804875,14.752010860852716,8.721358486264874,8.532056919007305,16.37983311590184,9.996686596166573,16.807949488557924,14.625365488340616,14.042100763874458,4.348887664839653,7.979407518135705,14.394218302035316,8.598721807819878,13.266340006568978,11.588207043898242,11.782888958713496,6.149451022604364,3.1425853612131838,10.792785279707061,13.119746858574532,16.304328597868142,2.4918602115563404,5.7264956832290554,15.541000649190151,15.533544761821986,11.275145587045495,10.634214237356494,8.783060107139674,10.131552227429488,14.070784101252553,10.759679770865336,7.6728038388649455,9.736028865049404,6.1528170943528115,13.078677231236435,11.546469328124118,12.502705529386626,17.014342982331648,5.8587519443286595,13.874118460654,6.978911883485344,7.823020450202884,15.313897081021423,9.44631126644332,8.382943322132094,10.339900225502419,9.781230937168214,12.252359586801582,8.53583693956676,11.174472582884524,5.75188347426751,10.268326233990143,10.166021741051026,10.22045617725438,13.848996262860954,10.036358140692721,11.650403326838157,6.905932340664318,13.567453879959869,2.192311663655968,12.14680985476729,11.867263979084795,5.510492186272009,9.732969280570753,3.8548526560033736,5.866490721345892,8.432119899942565,6.327785004965498,8.280923255890382,17.44057903114563,11.012380325872405,13.867971766296648,10.546100904471675,11.530975254803812,15.199218274145103,8.147754746704507,7.548331115122957,5.087730639622756,10.83649626336122,5.187431265278113,12.557632567713801,9.842924958106245,9.338171558094624,13.861014877784617,8.861271979634488,13.555408209612363,8.714581417431326,0.17730265354424457,6.545965996076239,10.592706395187657,14.092017414565433,3.3494518627105885,9.461583154484149,13.269315553786775,14.781335279817723,13.031358137591159,15.275024060292917,7.6208033466248,6.724858724839242,2.8013304850601517,9.026809743506163,4.933046142874209,6.2714805199950385,9.5820827278406,5.872550349054963,2.880980935678936,6.820466338662801,13.344400541111634,3.063391411402181,8.449246563916757,10.735740009983626,6.544064749236858,6.0394278446699134,7.174000477458198,12.397788919907978,7.965564699601917,17.572577816336633,8.051030443204624,6.6958848436893526,11.865963751318823,17.14343017796243,16.09692882186574,6.263054264933978,12.919354268620788,6.676323231595767,14.532295480779352,3.722827976588672,9.915377337960967,7.584257006362716,12.250410292741961,3.0737295546977195,9.423761115914088,8.163223523678209],"mu":[3.620610144247205,0.4068152513787493,8.126525693212642,2.8344728336391123,1.5162317310825069,8.263358949133721,3.947002397754704,7.550074220830043,2.0912987072748335,1.4310936722003698,2.8052472265945227,3.627774515000781,0.5047124512461632,2.2933758675347238,1.8435524504164058,3.303881279594685,2.032207082771189,0.20663576807774975,1.2301647473210986,6.299716449957509,5.315432331639613,2.401388838928722,5.869233931134263,3.7016580404253063,1.3361361734771648,2.136024414739439,4.347101802352567,2.3123527145789002,8.271816130884616,6.643717537068374,8.686490503026931,7.924633203175451,1.5492143971587802,8.148498197431962,2.605774048131735,1.1663750408375906,8.878930975932501,0.8281136874390294,0.6639477322048704,5.659677661703726,1.431225446341835,1.0438229921267639,4.643955804809514,3.1057021501661586,6.949104353845634,7.84474834511653,2.149092579809444,1.3328430374768097,8.434557278777838,3.388470093271525,2.8189981387347163,9.578716945729289,2.3606543384444545,0.3252154377300087,9.912606357530658,6.9774023045589555,2.827683679270543,3.0759813633994115,3.3783696022284726,9.606926862014397,1.880077340924513,5.833733204910841,4.523908489240349,9.01075445230923,2.4038192581144524,2.217159748353299,4.740231936219046,8.123606132689469,5.349814147184551,0.3367316555464561,6.362490902489566,4.861181680974489,3.8388047479336906,9.328096512124354,6.504974738412866,5.830170498106404,2.1284728794262575,4.4891204392448625,0.9305594523800931,7.713995043551581,4.738805597865177,1.9442414952734,1.0085225588670044,3.186645954520886,6.388471771245787,2.782987216387529,2.06426026415095,6.149130901971498,3.990535936558932,9.060100826393453,3.0829624968215708,6.681365206214984,9.948804401587243,8.25067996093554,8.022660068733545,3.302167767720283,6.204709615902311,0.24849432307771924,9.826136482354775,9.761541632452108,1.4364470040863075,9.323559774305451,1.9952985314355076,7.685660115953478,9.017243629979635,4.504727233154611,5.635642745627121,4.850335143855906,7.880129105695916,5.421739900694213,0.5299036406044366,3.185922274745352,6.68879620747269,8.906114101340815,0.44770507987519137,2.7481656464352944,5.762753890726748,0.7850656037727477,7.048955089846894,7.282703789411851,8.067482292822072,1.4525858595809749,4.750291767771058,0.3932104695443117,3.9868859084164487,0.11795838916131896,5.404898090311596,1.3518531976920367,0.4044147543308596,4.789870809275927,8.65274976809112,2.7046107376864037,5.88674296436992,2.0489372000583295,7.710189445454716,0.09387592424003,3.031012842229217,2.9211849149168057,1.6457390168909813,0.3265124534609498,8.241442646906027,0.1524360850411588,1.140708383327358,5.046362001957387,2.814975973428784,2.793895125033179,3.993343907394147,9.493910928872559,4.361573657258948,6.186453993210446,1.1071430443011265,0.6442914217453599,6.188128609618393,0.48528493598759104,6.4543895940764955,0.16224993260408382,1.7855273369143299,8.31598263739949,6.859094744826486,6.459998989279672,3.220328993665169,7.324211531721081,7.545561469017093,8.495222561925356,6.596180628629947,2.8414128613597422,1.3588526228465203,5.108798735538862,4.249065221783863,5.184828112103612,4.227924040867959,2.90525934015724,7.04432517617856,2.1295691594642308,5.089922008831849,8.373394121523967,0.30038264099318646,0.28412425936839014,2.6752622671959347,2.3150893323519095,4.946757457925662,6.527875742066005,7.354149167818214,2.662385560246019,7.0030556061403555,1.4294913492632877,3.762237617492006,8.829009078854783,5.125383272610346,1.390667122711553,1.849048842462242,7.7755166762912715,0.483746720723508,2.292804576397367,3.976558652216853,6.638609970046712,2.2093227153836015,9.995201182602251,2.5306593016376078,8.676835627573674,6.403973288212947,5.907678854718361,4.268346124337821,7.287320997029183,9.042415479253131,7.34123317255269,6.234650883715577,3.453130706309493,2.0581816661706687,4.799342842365153,4.435337852431671,0.9383610978788948,4.061077023355997,9.296764996590166,8.324523564293575,7.676473798613632,9.18827560532068,9.904622713517387,7.894533256715201,6.780995581724129,8.658902796852058,2.3660021957244592,8.777755001899132,3.6709131896096947,6.452857970077186,4.361467989115331,9.527839160810242,5.757710862589747,8.131928993985042,0.19750710601137866,6.291514413855232,1.8475486675984953,5.567726960850228,3.920745308410696,8.664119241566308,0.7758392794070068,3.9358936850808157,6.77193420593345,7.825688431328701,5.541202795663227,7.517014752369933,5.735677653669928,8.934419718215576,8.983825091038259,7.588362282206091,4.909633742953819,0.05926471696794611,0.3279561776760831,4.640689770395568,6.42559799926258,9.5932276863257,2.5200455889312745,8.881849885972404,3.6155925039371306,1.7295692013748365,7.4082544497198715,1.9328169957608088,4.361832784866884,3.4604553587874642,5.130175806777519,0.5668172965408491,7.166908141688753,0.5610127116168284,0.8127580919925137,5.277821920729315,3.463427499881624,3.7248461262110277,9.521006315750913,8.371456191712607,8.019013531763209,0.1922164265239501,0.93082381650746,6.71069563383861,9.304149105708508,2.1067579918100487,5.145338619256985,1.0194895449006203,9.780654562292296,0.9590434127790703,9.126271627998479,0.7064285272025383,9.102169812537923,4.1788863604415605,6.823594867746361,3.035689691390082,5.905800328092252,4.491474118583092,0.49338235215012016,0.9487351183876158,0.404438717488822,0.4695974052416463,9.130005465994746,7.391883442691187,3.7156664331639777,2.783675467919604,7.530367725851097,9.78624866063722,8.245352147779561,2.9109939752265945,8.63130341429402,8.742790356574517,3.576326295125556,4.951833890229782,0.9487986870889853,4.896815952961459,7.801369648091465,2.4079214437148133,4.44724061314634,3.5928449434594367,6.855191611542466,1.5586326042702314,2.8669812462806887,9.813117290614226,1.5480219298266396,9.335417893108161,4.806272187380762,9.37291250787732,8.18758739464002,4.224777396895543,3.834229138701395,0.08202286669406478,9.556231979686064,8.317988050600249,6.933213261702756,7.936890863773208,2.4952188124339014,7.788302740105633,1.2732756126218447,4.245507342001014,9.680124322572228,2.90830308372652,3.0520667125881773,1.6299344050151632,3.460065739783671,6.661749764471545,3.42434450385543,6.959893930198753,8.103214218788313,0.10915086018671305,2.3578348090154932,7.814156585281102,8.499441530579892,2.4282567985759207,0.36075476144034946,1.3366242097230918,4.912612393416531,9.052046724057574,3.7373258853297098,0.915956146534076,4.967287030059094,6.008967775718805,9.412087494079316,4.5903498495120605,9.221726760827636,6.8560376945462265,2.820334203742656,8.632379435299713,7.444104748008124,1.7514045955150048,7.123711345181556,1.9285555843057645,6.851665192017604,3.8788759492661873,2.2268837429176846,1.5260931845441394,5.115733173388717,6.440747810718062,4.1520956152892285,1.935948416244213,5.061837495365729,3.857805569940451,5.639100834681459,3.060977715783224,9.374281904521396,2.4808763817692103,9.147776049302905,1.925108860143232,6.9429517064532,0.6408623533292257,2.765332576740096,0.3295265517607704,5.414274412943447,3.10613633918551,0.3509318822466212,7.282387457752959,8.2515169922217,7.852007753289378,6.75498418375131,8.910700029539264,5.969359038405093,6.052114139877105,5.193709608532123,8.190384017636296,9.635396045771735,4.555087278580423,5.734216354007142,3.912333580457159,0.0534072930168894,2.586194515966036,8.160656152959733,4.943902945064435,6.808927482704183,0.11049126975788859,3.9942335074490765,4.083307066699757,7.880787846514721,7.555965183620663,3.5703473121537344,0.49010266122049284,3.243191745845586,0.5548915693242251,8.457056425781085,5.313710745836843,6.228150465140927,4.055091520884668,0.4652234801274391,5.899274753443578,8.267094482962376,8.8812139815003,5.278865820346947,8.570834493355264,2.670178089806119,4.302284902300791,8.282841871223194,2.1975391644128583,6.569797691422239,8.95658213985056,0.6458881543588957,3.122383639825188,4.464368425567351,7.965752877436132,5.523801427344923,2.768374197824648,0.8713749007980232,6.952656984169206,6.519930717951223,7.28215277177775,7.04280787598621,8.869939929659292,4.653231948058602,1.5101606989826322,8.498860889850182,1.369763929395178,5.461527490199494,0.6838772511138647,9.803111566867198,1.5139998936728105,3.229734576501664,2.1772940004613783,6.31687778308454,0.30551208813885733,7.276980739075556,8.408414994545057,7.916925593554069,1.742061118535989,8.230829663213893,7.631697797867756,5.69155978787305,1.3821025037288548,4.955709591460575,2.85338384666755,4.515802955351003,0.32011813340760753,7.242748855781391,1.0691867903788976,4.236407082177978,1.7850727487584583,1.4733863288390103,3.603465319945296,2.280376270347537,7.02114994478539,9.918245603321536,1.143395088400161,5.647178912378541,8.05036620904497,6.82188329640635,2.8194735985875963,3.6491279371330787,7.416020839729787,8.91324981872921,8.3624551175565,9.346113856107113,5.265286538995458,4.45025741074875,3.09804720696794,1.3879776076831174,2.4934715016635045,9.422802585335205,4.125223303848912,5.395864705329481,7.434509925211204,1.5410014616225287,7.904387841109635,4.63941664142598,2.9859615617351465,2.200627613888093,9.693676002096163,2.7592025093628214,9.838975597620914,7.873238886750647,2.2745617215106573,4.435289637541306,8.857419050335993,0.8653758063100248,2.793654476473444,0.05491877777785037,3.032176168804197,7.607492771325739,0.4227889032296872,0.7513730297334775,1.4495557976832907,7.3946325031508975,5.211183519712598,0.05955832132765737,4.246621933757773,4.6484728448895485,5.24842955308184,0.8780000665854604,8.669949228528985,2.8002084331374943,3.594322833984598,2.3960975354650427,6.017967211337318,9.785762872661063,3.737509252562128,2.2151293033166497,9.29548347875697,6.866543581736111,4.095159559434977,7.821181304490132,4.178695629135354,3.057334716037514,2.470547944649979,6.5733321607331385,5.8225529862127745,4.66054695090572,5.163698104030903,5.546333444990992,0.2918206800762424,5.35730182250102,2.012065621607584,2.919321815245588,2.9839449461328837,8.957784387512106,7.049137957034102,6.320461281555765,9.41483771611463,8.729608491800766,9.198802990550401,2.8844425814305286,7.4330869711742125,9.69247903949336,9.878153745741772,7.440213638155859,5.800702020574244,0.8464956327356865,1.4162471504806606,7.761737662332269,1.6017552130155188,8.199034147962863,5.964194015344497,0.6879735828231848,5.48139831611395,4.51631821920831,2.252563322747956,2.188726675816608,3.0485194140855287,5.766016026343992,8.310680113755947,6.918436953241793,9.981530649606984,1.6419491151965149,0.7910553784733709,2.057395664058288,6.069428123314122,9.816109872582322,5.891077052245935,2.8050065350909237,0.20567380049212547,1.5807815660638624,8.547048646245276,7.346126471864485,7.579766249586026,5.6766580569209335,7.20124517868393,9.039158241735771,4.012266275898925,4.435957812382325,4.401157000817973,2.3801892032339067,8.009534085214367,9.053180598943385,2.095854948409548,2.8868213510695484,5.036880329358069,0.011608926632791228,4.051330551061394,6.26439814248462,4.9114726791961445,6.521330254188545,3.5155781147679366,9.97761917271141,9.921916044616433,7.136212715241368,4.090491221602084,2.1381862315303213,4.7741982798712375,8.61078226193955,6.4781741078587896,6.270697863724295,5.308206762473602,6.586132807766305,6.870334579025357,8.625776237383782,5.775273480916616,6.265376268463257,6.772170393340948,8.062233644483317,0.3071763785082027,5.208246301253327,6.898807364928217,3.8282931858979596,3.303946027011011,6.424519711955421,3.5638623555012794,3.0173181921841974,4.7399410440216965,9.495116813357189,4.68351995838538,4.314037804378323,6.600078129507656,5.451587227447543,9.884999759017113,1.6030449557802706,1.998807776010827,9.577510087554097,8.937483726336385,0.3408117180625836,7.236696944812548,7.538790174550685,2.750123726163891,9.139414883536608,2.7961719070547497,5.622499982183708,0.3980723985456436,7.316909824245245,6.80842302218964,0.8511726112180007,3.7893159217135453,0.7369986097169168,7.565318350865695,7.085286986103647,8.508059183158778,4.769317815661789,3.042079921181635,6.34271620448277,8.565970092550044,8.499673506037883,2.6603138877794397,6.347118575266622,1.476719239873836,5.970427509827012,4.164029108866199,6.971294679812077,0.004392646612241258,1.4751121043709636,7.059758083868955,0.22840265254661762,5.5937103718461785,4.331198554477245,2.8002171163941925,8.318507940112463,0.040851516812825395,2.3101421230777452,0.5038190408966514,7.177413099470513,7.01782196213358,1.5639112099685826,1.672289992106677,8.4483173547301,0.8794266914221249,5.937271833290234,9.68188891780147,4.626206684032792,5.685548618856002,8.709893554561026,0.990544804683462,4.988745233529026,3.4050340069906215,9.651001854666546,4.983588922058717,6.662266396802076,0.206197136676618,6.025456707612909,4.638190196885194,0.5064770909925964,8.230725483562736,8.054873818420909,3.09589002968357,3.6085771348323115,7.9074474760079045,9.732148959383455,2.956808194894809,3.97590439047794,1.7774841887383452,7.804302237162057,3.6400224433061967,1.1333720141486703,2.577079395292192,1.9470724634692882,2.8436393773713853,1.2897065789014128,8.137905945651205,2.1314955024716986,6.948392261606164,9.504072958530394,7.448160604183151,4.570092929411739,0.48326711518080323,9.026677567899803,4.2220578619024955,4.624542838291605,7.9536332152802425,9.651236655769447,8.298994432600573,5.482637551983373,9.70511784376356,5.616168936360175,5.088446263014075,0.3142902006692072,8.098876267073239,2.4230634874365253,3.7067811436219933,3.828163493243173,1.5509560814190149,8.005679990227732,4.759015513792571,2.615561709636942,7.608644549671737,8.002095650840197,7.4131712972645,6.583370251700112,1.7496838140193116,4.363219975852683,1.128802358761667,2.938180151851002,2.353557693837476,4.087369804154775,2.223579439317531,3.2397611552618755,8.520708834413535,0.0971801877257028,2.521206295088365,8.114359451435627,1.5275013332830256,4.5146610580347835,6.917501982087937,8.658765516339102,5.212548461172643,5.850192667116003,5.315786526825407,6.704188166418962,6.4001625891386045,8.2999552145409,7.648824605066283,8.36181843991174,9.943534185465548,6.352024834277506,0.1441204322799683,6.685190063207336,0.14992044425942153,7.422886308698773,6.543074325643379,8.554653953619766,5.442073615922518,4.586923506136545,5.031714342913844,2.891057416687264,5.166166476838214,6.87014435037961,9.685313110481431,4.236110537461797,6.658256722409604,0.4471567745839411,3.3514751137723975,9.309608735654805,3.647446229680129,4.040843790525603,4.571162669066542,1.7071228347265022,6.200629989696953,2.724310530477061,1.9597185524313354,4.2507433697363854,5.685600995145677,0.1384761066716722,2.770580287009894,5.625245860107883,8.637384240051738,4.395549116679545,9.29568735503096,1.9380342644782567,7.847692892868787,4.999463069298525,9.12009002720237,9.381142135190984,0.23133528082706523,7.139830255460591,3.3867495706801054,0.6833303064786866,4.872177932918536,2.527157218363947,5.200220243618919,5.614746391743464,1.3902223388004131,3.299430630107769,6.899689768629942,0.591216753247803,4.633822809967992,8.40699647336521,7.676169373769513,1.3186973981940353,6.31976564302001,8.799351229151757,3.8560915412202457,7.53743475425537,8.38860710577842,0.2500784790719801,3.9252085151548943,6.869608458126524,5.336164603819533,8.224333768132183,3.834922507589116,2.566504907027465,8.885576183264888,7.751330921876873,0.06771365510415572,8.1668088020777,0.6728795508675578,2.46012701755955,9.65328409824335,6.412747822355427,1.0410406310772768,8.988517744652246,1.475042329801317,3.6909863386203368,9.796034463358357,2.5979072748625764,6.191813380662968,1.069040106296566,9.384120573016526,8.02259907762232,5.47268249183241,1.6519290649464025,4.200368885063874,1.0265927724898405,8.052182492744933,9.473616299611987,2.191806766512292,5.458100895390632,9.289897110372463,9.325310974443834,4.100543163666652,4.872194123062665,1.6939352223506954,3.821402909093532,8.959958534361263,9.988797315923206,6.895544555324678,2.867594800168336,3.014841118949372,9.053038836619994,9.179744708373523,9.51559957124557,7.282324610001137,4.120451372849903,2.955597298996513,7.264226889745393,9.87858279209663,1.7888675246317653,5.106955480068693,8.69265779877636,5.271983595573577,5.100522096244928,1.8951955610504156,5.065598454376808,8.572117669215357,6.805884859924989,0.23911634345257005,4.124983117564338,7.316726823448985,8.453754707208603,6.86118525895022,9.127073242069752,0.6335691716359437,6.074557736608268,6.987123098744372,4.9464217101055326,5.82430749109424,2.162557368234841,1.5150287149991337,9.71906999785288,6.366770429879507,4.784301178130246,9.794177045579747,4.744696006086615,4.361093184937392,4.578793352541728,3.672228635671868,7.747716390207973,5.862348288137684,4.1266724927533005,6.989397212943016,6.001822949885092,8.343229905312754,6.112161297144714,2.3455489237140004,5.458859319996328,9.753839046966945,2.001611580260747,5.555719769395218,9.853073204696566,3.528043356547419,9.194726171871224,2.9407322679335146,3.924655128285457,1.2783958897691683,9.819107802761085,9.487808415760204,0.8478296765501914,8.102182153677484,1.2744370006039119,3.8542150749306603,2.486281888027193,4.737468760975149,5.466569990343535,9.304282172199809,2.1724750130134196,4.903079080532806,4.6484153501050285,6.3942594230603795,5.820539418951814,2.802676547767513,7.107732947251517,0.9330454574650293,0.9686024370715396,4.599205553801491,7.821916823102216,8.36880764986109,3.339762838492797,9.720282041406417,1.0620065222101394,8.153915030566024,5.176266691108395,0.008047632443441977,3.4985172180016355,2.1608145306186466,5.026446034141636,0.48548994727842354,3.233489358873043,8.289890119474762,5.251423306462177,6.626393251023179,9.147591742207613,2.447994236656328,2.773376295573058,2.4956577912312072,4.118498553766161,3.323614503454082,6.091806341233839,1.2162620726355944,5.194949353038663,0.9499579328881635,3.5507252086818086,6.595074177553599,2.555701349746118,5.049868557010098,6.488025434909613,2.6010510087346117,4.968283148526669,0.4480141142538363,8.410488236828906,6.803270393245462,9.651332853924044,2.6522797638057183,5.936425313218175,8.198900322489548,9.335668300489669,9.58307993960123,4.789123481321558,8.841949283927594,2.1780798170008553,5.922388886510921,1.5996265723579128,3.860108661851074,4.736143663766985,6.92650011377109,2.756519859391733,8.699828325204113,4.580408775736268]}

},{}],72:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logpdf = factory( 0.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `c`, the function returns a function which returns `-infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a finite `mu` and `c`, the function returns a function which returns `-infinity` when provided `x <= μ`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );

	y = logpdf( 0.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -2.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a nonpositive `c`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 0.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var tol;
	var mu;
	var c;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], c[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var tol;
	var mu;
	var c;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], c[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large variance ( = large `c`)', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var tol;
	var mu;
	var c;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], c[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/logpdf/test/test.factory.js")
},{"./../lib/factory.js":66,"./fixtures/julia/large_variance.json":69,"./fixtures/julia/negative_mean.json":70,"./fixtures/julia/positive_mean.json":71,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":45,"@stdlib/constants/float64/pinf":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":52,"tape":227}],73:[function(require,module,exports){
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
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/logpdf/test/test.js")
},{"./../lib":67,"tape":227}],74:[function(require,module,exports){
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
var logpdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `c`, the function returns `-infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided `x <= μ` and a finite `mu` and `c`, the function returns `-infinity`', function test( t ) {
	var y;

	y = logpdf( 0.0, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -2.0, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a nonpositive `c`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var c;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], c[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var c;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], c[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large variance ( = large `c` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var c;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], c[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/logpdf/test/test.logpdf.js")
},{"./../lib":67,"./fixtures/julia/large_variance.json":69,"./fixtures/julia/negative_mean.json":70,"./fixtures/julia/positive_mean.json":71,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":45,"@stdlib/constants/float64/pinf":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":52,"tape":227}],75:[function(require,module,exports){
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

},{"./is_number.js":78}],76:[function(require,module,exports){
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

},{"./is_number.js":78,"./zero_pad.js":82}],77:[function(require,module,exports){
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

},{"./main.js":80}],78:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./format_double.js":75,"./format_integer.js":76,"./is_string.js":79,"./space_pad.js":81,"./zero_pad.js":82}],81:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{"./main.js":84}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{"./main.js":87}],86:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],87:[function(require,module,exports){
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

},{"./is_string.js":86,"@stdlib/string/base/format-interpolate":77,"@stdlib/string/base/format-tokenize":83}],88:[function(require,module,exports){
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

},{"./main.js":89}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{"./main.js":91}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./main.js":93}],93:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":97}],94:[function(require,module,exports){
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

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],96:[function(require,module,exports){
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

},{"./define_property.js":95}],97:[function(require,module,exports){
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

},{"./builtin.js":94,"./has_define_property_support.js":96,"./polyfill.js":98}],98:[function(require,module,exports){
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

},{"@stdlib/string/format":85}],99:[function(require,module,exports){
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

},{"./main.js":100,"./polyfill.js":101,"@stdlib/assert/has-tostringtag-support":20}],100:[function(require,module,exports){
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

},{"./tostring.js":102}],101:[function(require,module,exports){
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

},{"./tostring.js":102,"./tostringtag.js":103,"@stdlib/assert/has-own-property":16}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{"@stdlib/symbol/ctor":88}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){

},{}],106:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"dup":105}],107:[function(require,module,exports){
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
},{"base64-js":104,"buffer":107,"ieee754":210}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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
},{"_process":217}],110:[function(require,module,exports){
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

},{"events":108,"inherits":211,"readable-stream/lib/_stream_duplex.js":112,"readable-stream/lib/_stream_passthrough.js":113,"readable-stream/lib/_stream_readable.js":114,"readable-stream/lib/_stream_transform.js":115,"readable-stream/lib/_stream_writable.js":116,"readable-stream/lib/internal/streams/end-of-stream.js":120,"readable-stream/lib/internal/streams/pipeline.js":122}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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
},{"./_stream_readable":114,"./_stream_writable":116,"_process":217,"inherits":211}],113:[function(require,module,exports){
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
},{"./_stream_transform":115,"inherits":211}],114:[function(require,module,exports){
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
},{"../errors":111,"./_stream_duplex":112,"./internal/streams/async_iterator":117,"./internal/streams/buffer_list":118,"./internal/streams/destroy":119,"./internal/streams/from":121,"./internal/streams/state":123,"./internal/streams/stream":124,"_process":217,"buffer":107,"events":108,"inherits":211,"string_decoder/":226,"util":105}],115:[function(require,module,exports){
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
},{"../errors":111,"./_stream_duplex":112,"inherits":211}],116:[function(require,module,exports){
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
},{"../errors":111,"./_stream_duplex":112,"./internal/streams/destroy":119,"./internal/streams/state":123,"./internal/streams/stream":124,"_process":217,"buffer":107,"inherits":211,"util-deprecate":235}],117:[function(require,module,exports){
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
},{"./end-of-stream":120,"_process":217}],118:[function(require,module,exports){
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
},{"buffer":107,"util":105}],119:[function(require,module,exports){
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
},{"_process":217}],120:[function(require,module,exports){
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
},{"../../../errors":111}],121:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],122:[function(require,module,exports){
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
},{"../../../errors":111,"./end-of-stream":120}],123:[function(require,module,exports){
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
},{"../../../errors":111}],124:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":108}],125:[function(require,module,exports){
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

},{"./":126,"get-intrinsic":201}],126:[function(require,module,exports){
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

},{"es-define-property":186,"es-errors/type":192,"function-bind":200,"get-intrinsic":201,"set-function-length":221}],127:[function(require,module,exports){
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

},{"./lib/is_arguments.js":128,"./lib/keys.js":129}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],130:[function(require,module,exports){
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

},{"es-define-property":186,"es-errors/syntax":191,"es-errors/type":192,"gopd":202}],131:[function(require,module,exports){
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

},{"define-data-property":130,"has-property-descriptors":203,"object-keys":215}],132:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],133:[function(require,module,exports){
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

},{"./ToNumber":164,"./ToPrimitive":166,"./Type":171}],134:[function(require,module,exports){
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

},{"../helpers/isFinite":179,"../helpers/isNaN":180,"../helpers/isPrefixOf":181,"./ToNumber":164,"./ToPrimitive":166,"es-errors/type":192,"get-intrinsic":201}],135:[function(require,module,exports){
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

},{"call-bind/callBound":125,"es-errors/type":192}],136:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":194}],137:[function(require,module,exports){
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

},{"./DayWithinYear":140,"./InLeapYear":144,"./MonthFromTime":154,"es-errors/eval":187}],138:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":185,"./floor":175}],139:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":175}],140:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":138,"./DayFromYear":139,"./YearFromTime":173}],141:[function(require,module,exports){
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

},{"./modulo":176}],142:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":183,"./IsAccessorDescriptor":145,"./IsDataDescriptor":147,"es-errors/type":192}],143:[function(require,module,exports){
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

},{"../helpers/timeConstants":185,"./floor":175,"./modulo":176}],144:[function(require,module,exports){
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

},{"./DaysInYear":141,"./YearFromTime":173,"es-errors/eval":187}],145:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":183,"es-errors/type":192,"hasown":209}],146:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":212}],147:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":183,"es-errors/type":192,"hasown":209}],148:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":145,"./IsDataDescriptor":147,"./IsPropertyDescriptor":149,"es-errors/type":192}],149:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":183}],150:[function(require,module,exports){
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

},{"../helpers/isFinite":179,"../helpers/timeConstants":185}],151:[function(require,module,exports){
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

},{"../helpers/isFinite":179,"./DateFromTime":137,"./Day":138,"./MonthFromTime":154,"./ToInteger":163,"./YearFromTime":173,"./floor":175,"./modulo":176,"get-intrinsic":201}],152:[function(require,module,exports){
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

},{"../helpers/isFinite":179,"../helpers/timeConstants":185,"./ToInteger":163}],153:[function(require,module,exports){
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

},{"../helpers/timeConstants":185,"./floor":175,"./modulo":176}],154:[function(require,module,exports){
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

},{"./DayWithinYear":140,"./InLeapYear":144}],155:[function(require,module,exports){
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

},{"../helpers/isNaN":180}],156:[function(require,module,exports){
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

},{"../helpers/timeConstants":185,"./floor":175,"./modulo":176}],157:[function(require,module,exports){
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

},{"./Type":171}],158:[function(require,module,exports){
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


},{"../helpers/isFinite":179,"./ToNumber":164,"./abs":174,"get-intrinsic":201}],159:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":185,"./DayFromYear":139}],160:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":185,"./modulo":176}],161:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],162:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":164}],163:[function(require,module,exports){
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

},{"../helpers/isFinite":179,"../helpers/isNaN":180,"../helpers/sign":184,"./ToNumber":164,"./abs":174,"./floor":175}],164:[function(require,module,exports){
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

},{"./ToPrimitive":166,"call-bind/callBound":125,"safe-regex-test":220}],165:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":195}],166:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":197}],167:[function(require,module,exports){
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

},{"./IsCallable":146,"./ToBoolean":161,"./Type":171,"es-errors/type":192,"hasown":209}],168:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":201}],169:[function(require,module,exports){
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

},{"../helpers/isFinite":179,"../helpers/isNaN":180,"../helpers/sign":184,"./ToNumber":164,"./abs":174,"./floor":175,"./modulo":176}],170:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":164}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":138,"./modulo":176}],173:[function(require,module,exports){
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

},{"call-bind/callBound":125,"get-intrinsic":201}],174:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":201}],175:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],176:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":182}],177:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":185,"./modulo":176}],178:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":133,"./5/AbstractRelationalComparison":134,"./5/Canonicalize":135,"./5/CheckObjectCoercible":136,"./5/DateFromTime":137,"./5/Day":138,"./5/DayFromYear":139,"./5/DayWithinYear":140,"./5/DaysInYear":141,"./5/FromPropertyDescriptor":142,"./5/HourFromTime":143,"./5/InLeapYear":144,"./5/IsAccessorDescriptor":145,"./5/IsCallable":146,"./5/IsDataDescriptor":147,"./5/IsGenericDescriptor":148,"./5/IsPropertyDescriptor":149,"./5/MakeDate":150,"./5/MakeDay":151,"./5/MakeTime":152,"./5/MinFromTime":153,"./5/MonthFromTime":154,"./5/SameValue":155,"./5/SecFromTime":156,"./5/StrictEqualityComparison":157,"./5/TimeClip":158,"./5/TimeFromYear":159,"./5/TimeWithinDay":160,"./5/ToBoolean":161,"./5/ToInt32":162,"./5/ToInteger":163,"./5/ToNumber":164,"./5/ToObject":165,"./5/ToPrimitive":166,"./5/ToPropertyDescriptor":167,"./5/ToString":168,"./5/ToUint16":169,"./5/ToUint32":170,"./5/Type":171,"./5/WeekDay":172,"./5/YearFromTime":173,"./5/abs":174,"./5/floor":175,"./5/modulo":176,"./5/msFromTime":177}],179:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":180}],180:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],181:[function(require,module,exports){
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

},{"call-bind/callBound":125}],182:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],183:[function(require,module,exports){
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

},{"es-errors/type":192,"hasown":209}],184:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{"get-intrinsic":201}],187:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],188:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],189:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],190:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],191:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],192:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],193:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],194:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":192}],195:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":196,"./RequireObjectCoercible":194}],196:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],197:[function(require,module,exports){
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

},{"./helpers/isPrimitive":198,"is-callable":212}],198:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":199}],201:[function(require,module,exports){
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

},{"es-errors":188,"es-errors/eval":187,"es-errors/range":189,"es-errors/ref":190,"es-errors/syntax":191,"es-errors/type":192,"es-errors/uri":193,"function-bind":200,"has-proto":204,"has-symbols":205,"hasown":209}],202:[function(require,module,exports){
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

},{"get-intrinsic":201}],203:[function(require,module,exports){
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

},{"es-define-property":186}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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

},{"./shams":206}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":206}],208:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":200}],209:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":200}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{"call-bind/callBound":125,"has-tostringtag/shams":207}],214:[function(require,module,exports){
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

},{"./isArguments":216}],215:[function(require,module,exports){
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

},{"./implementation":214,"./isArguments":216}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){
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
},{"_process":217,"through":233,"timers":234}],219:[function(require,module,exports){
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

},{"buffer":107}],220:[function(require,module,exports){
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

},{"call-bind/callBound":125,"es-errors/type":192,"is-regex":213}],221:[function(require,module,exports){
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

},{"define-data-property":130,"es-errors/type":192,"get-intrinsic":201,"gopd":202,"has-property-descriptors":203}],222:[function(require,module,exports){
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

},{"es-abstract/es5":178,"function-bind":200}],223:[function(require,module,exports){
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

},{"./implementation":222,"./polyfill":224,"./shim":225,"define-properties":131,"function-bind":200}],224:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":222}],225:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":224,"define-properties":131}],226:[function(require,module,exports){
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
},{"safe-buffer":219}],227:[function(require,module,exports){
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
},{"./lib/default_stream":228,"./lib/results":230,"./lib/test":231,"_process":217,"defined":132,"through":233,"timers":234}],228:[function(require,module,exports){
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
},{"_process":217,"fs":106,"through":233}],229:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":217,"timers":234}],230:[function(require,module,exports){
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
},{"_process":217,"events":108,"function-bind":200,"has":208,"inherits":211,"object-inspect":232,"resumer":218,"through":233,"timers":234}],231:[function(require,module,exports){
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
},{"./next_tick":229,"deep-equal":127,"defined":132,"events":108,"has":208,"inherits":211,"path":109,"string.prototype.trim":223}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
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
},{"_process":217,"stream":110}],234:[function(require,module,exports){
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
},{"process/browser.js":217,"timers":234}],235:[function(require,module,exports){
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
},{}]},{},[72,73,74]);
