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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":53}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":54}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":55}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":154}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":154}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":154}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":154}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

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
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

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
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

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
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

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

},{"@stdlib/number/ctor":92}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":57}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":61}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Round a double-precision floating-point number toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":63}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation (?)

/**
* Rounds a double-precision floating-point number toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = ceil;

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":96,"@stdlib/number/float64/base/get-high-word":100,"@stdlib/number/float64/base/to-words":112}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Infinity );
* // returns 0.0
*
* y = erfc( -Infinity );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalPP = require( './polyval_pp.js' );
var polyvalQQ = require( './polyval_qq.js' );
var polyvalPA = require( './polyval_pa.js' );
var polyvalQA = require( './polyval_qa.js' );
var polyvalRA = require( './polyval_ra.js' );
var polyvalSA = require( './polyval_sa.js' );
var polyvalRB = require( './polyval_rb.js' );
var polyvalSB = require( './polyval_sb.js' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1;  // 0x3FEB0AC1, 0x60000000

var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var QQC = 1.0;

var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var QAC = 1.0;

var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var SAC = 1.0;

var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var SBC = 1.0;


// MAIN //

/**
* Evaluates the complementary error function.
*
* ```tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ```tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* ## Method
*
* 1.  For \\(|x| \in [0, 0.84375)\\),
*
*     ```tex
*     \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*     0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*     \end{cases}
*     ```
*
*     where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*     ```tex
*     \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*     ```
*
*     <!-- <note> -->
*
*     The formula is derived by noting
*
*     ```tex
*     \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*     ```
*
*     and that
*
*     ```tex
*     \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*     ```
*
*     is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*
*     <!-- </note> -->
*
* 2.  For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*     ```tex
*     \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*     1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*     where
*
*     ```tex
*     \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*     ```
*
*     <!-- <note> -->
*
*     Here, we use the Taylor series expansion at \\(x = 1\\)
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*     &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*     \end{align*}
*     ```
*
*     using a rational approximation to approximate
*
*     ```tex
*     \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*     ```
*
*     <!-- </note> -->
*
*     Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*     -   \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*     -   \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3.  For \\(x \in [1.25,1/0.35)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*     \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*     \end{align*}
*     ```
*
*     where
*
*     -   \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4.  For \\(x \in [1/0.35,28)\\),
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*     2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*     2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*     \end{cases}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erf}(x) = \begin{cases}
*     \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*     \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*     \end{cases}
*     ```
*
*     where
*
*     -   \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5.  For \\(x \in [28, \infty)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*     \end{align*}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*     2 - \mathrm{tiny} & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
* ## Notes
*
* -   To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*     ```tex
*     -x^2 = -s^2 + (s-x)(s+x)
*     ```
*
*     and
*
*     ```tex
*     e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*     ```
*
* -   `#4` and `#5` make use of the asymptotic series
*
*     ```tex
*     \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*     ```
*
*     We use a rational approximation to approximate
*
*     ```tex
*     g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*     ```
*
* -   The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*     ```tex
*     |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*     ```
*
*     and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*     ```tex
*     |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*     ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* @example
* var y = erfc( -1.0 );
* // returns ~1.8427
*
* @example
* var y = erfc( 0.0 );
* // returns 1.0
*
* @example
* var y = erfc( Infinity );
* // returns 0.0
*
* @example
* var y = erfc( -Infinity );
* // returns 2.0
*
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
}


// EXPORTS //

module.exports = erfc;

},{"./polyval_pa.js":68,"./polyval_pp.js":69,"./polyval_qa.js":70,"./polyval_qq.js":71,"./polyval_ra.js":72,"./polyval_rb.js":73,"./polyval_sa.js":74,"./polyval_sb.js":75,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/exp":77,"@stdlib/number/float64/base/set-low-word":108}],68:[function(require,module,exports){
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
		return 0.41485611868374833;
	}
	return 0.41485611868374833 + (x * (-0.3722078760357013 + (x * (0.31834661990116175 + (x * (-0.11089469428239668 + (x * (0.035478304325618236 + (x * -0.002166375594868791))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return -0.3250421072470015;
	}
	return -0.3250421072470015 + (x * (-0.02848174957559851 + (x * (-0.005770270296489442 + (x * -0.000023763016656650163))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],70:[function(require,module,exports){
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
		return 0.10642088040084423;
	}
	return 0.10642088040084423 + (x * (0.540397917702171 + (x * (0.07182865441419627 + (x * (0.12617121980876164 + (x * (0.01363708391202905 + (x * 0.011984499846799107))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],71:[function(require,module,exports){
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
		return 0.39791722395915535;
	}
	return 0.39791722395915535 + (x * (0.0650222499887673 + (x * (0.005081306281875766 + (x * (0.00013249473800432164 + (x * -0.000003960228278775368))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],72:[function(require,module,exports){
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
		return -0.6938585727071818;
	}
	return -0.6938585727071818 + (x * (-10.558626225323291 + (x * (-62.375332450326006 + (x * (-162.39666946257347 + (x * (-184.60509290671104 + (x * (-81.2874355063066 + (x * -9.814329344169145))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],73:[function(require,module,exports){
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
		return -0.799283237680523;
	}
	return -0.799283237680523 + (x * (-17.757954917754752 + (x * (-160.63638485582192 + (x * (-637.5664433683896 + (x * (-1025.0951316110772 + (x * -483.5191916086514))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],74:[function(require,module,exports){
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
		return 19.651271667439257;
	}
	return 19.651271667439257 + (x * (137.65775414351904 + (x * (434.56587747522923 + (x * (645.3872717332679 + (x * (429.00814002756783 + (x * (108.63500554177944 + (x * (6.570249770319282 + (x * -0.0604244152148581))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],75:[function(require,module,exports){
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
		return 30.33806074348246;
	}
	return 30.33806074348246 + (x * (325.7925129965739 + (x * (1536.729586084437 + (x * (3199.8582195085955 + (x * (2553.0504064331644 + (x * (474.52854120695537 + (x * -22.44095244658582))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var ldexp = require( '@stdlib/math/base/special/ldexp' );
var polyvalP = require( './polyval_p.js' );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - ( t*polyvalP( t ) );
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi );

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":79,"@stdlib/math/base/special/ldexp":82}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":78}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* ## Method
*
* 1.  We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*     ```tex
*     \begin{align*}
*     x &= k \cdot \ln(2) + r \\
*     |r| &\leq 0.5 \cdot \ln(2)
*     \end{align*}
*     ```
*
*     <!-- <note> -->
*
*     \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*
*     <!-- </note> -->
*
* 2.  We approximate of \\( e^{r} \\) by a special rational function on the interval \\(\[0,0.34658]\\):
*
*     ```tex
*     \begin{align*}
*     R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*     &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*     ```tex
*     R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*     ```
*
*     where \\( z = r^2 \\) and
*
*     ```tex
*     \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*
*     <!-- </note> -->
*
*     The computation of \\( e^{r} \\) thus becomes
*
*     ```tex
*     \begin{align*}
*     e^{r} &= 1 + \frac{2r}{R-r} \\
*           &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*     \end{align*}
*     ```
*
*     where
*
*     ```tex
*     R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*     ```
*
* 3.  We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*     ```tex
*     e^{x} = 2^k e^{r}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   For an IEEE double,
*
*     -   if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*     -   if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
*
* -   The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
*
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
*
* @example
* var v = exp( 0.0 );
* // returns 1.0
*
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision...
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
}


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":76,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/trunc":90}],79:[function(require,module,exports){
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Round a double-precision floating-point number toward negative infinity.
*
* @module @stdlib/math/base/special/floor
*
* @example
* var floor = require( '@stdlib/math/base/special/floor' );
*
* var v = floor( -4.2 );
* // returns -5.0
*
* v = floor( 9.99999 );
* // returns 9.0
*
* v = floor( 0.0 );
* // returns 0.0
*
* v = floor( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation (?)

/**
* Rounds a double-precision floating-point number toward negative infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = floor( -4.2 );
* // returns -5.0
*
* @example
* var v = floor( 9.99999 );
* // returns 9.0
*
* @example
* var v = floor( 0.0 );
* // returns 0.0
*
* @example
* var v = floor( NaN );
* // returns NaN
*/
var floor = Math.floor; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = floor;

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/number/float64/base/normalize' ).assign;
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ];

// High/low words workspace:
var WORDS = [ 0, 0 ];


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		exp === 0 ||
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( frac, FRAC, 1, 0 );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	toWords.assign( frac, WORDS, 1, 0 );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":48,"@stdlib/constants/float64/max-base2-exponent-subnormal":47,"@stdlib/constants/float64/min-base2-exponent-subnormal":49,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/copysign":64,"@stdlib/number/float64/base/exponent":94,"@stdlib/number/float64/base/from-words":96,"@stdlib/number/float64/base/normalize":103,"@stdlib/number/float64/base/to-words":112}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":85}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":86,"./polyval_q.js":87,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58,"@stdlib/number/float64/base/get-high-word":100,"@stdlib/number/float64/base/set-high-word":106}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the principal square root of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
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

/**
* Compute the principal square root of a double-precision floating-point number.
*
* @type {Function}
* @param {number} x - input value
* @returns {number} principal square root
*
* @example
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/
var sqrt = Math.sqrt; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = sqrt;

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
* Round a double-precision floating-point number toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Infinity );
* // returns Infinity
*
* v = trunc( -Infinity );
* // returns -Infinity
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

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a double-precision floating-point number toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Infinity );
* // returns Infinity
*
* @example
* var v = trunc( -Infinity );
* // returns -Infinity
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
}


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":80}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/exponent
*
* @example
* var exponent = require( '@stdlib/number/float64/base/exponent' );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns -1023
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var EXP_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* @example
* var exp = exponent( -3.14 );
* // returns 1
*
* @example
* var exp = exponent( 0.0 );
* // returns -1023
*
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":100}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":98}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":97,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":99,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\) and assigns results to a provided output array.
*
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319, [ 0.0, 0 ], 1, 0 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( 0.0, [ 0.0, 0 ], 1, 0 );
* // returns [ 0.0, 0 ];
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
*
* var out = normalize( PINF, [ 0.0, 0 ], 1, 0 );
* // returns [ Infinity, 0 ]
*
* @example
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var out = normalize( NINF, [ 0.0, 0 ], 1, 0 );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( NaN, [ 0.0, 0 ], 1, 0 );
* // returns [ NaN, 0 ]
*/
function normalize( x, out, stride, offset ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ offset ] = x;
		out[ offset + stride ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ offset ] = x * SCALAR;
		out[ offset + stride ] = -52;
		return out;
	}
	out[ offset ] = x;
	out[ offset + stride ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number/float64/base/normalize
*
* @example
* var normalize = require( '@stdlib/number/float64/base/normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0, exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize.assign( 3.14e-319, out, 1, 0 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
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

},{"./assign.js":102,"./main.js":104,"@stdlib/utils/define-nonenumerable-read-only-property":147}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {number} x - input value
* @returns {NumberArray} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
*
* var out = normalize( PINF );
* // returns [ Infinity, 0 ]
*
* @example
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var out = normalize( NINF );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( NaN );
* // returns [ NaN, 0 ]
*/
function normalize( x ) {
	return fcn( x, [ 0.0, 0 ], 1, 0 );
}


// EXPORTS //

module.exports = normalize;

},{"./assign.js":102}],105:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":99}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":105,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-low-word
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":110}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":34}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
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
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":109,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":113,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./assign.js":111,"./main.js":114,"@stdlib/utils/define-nonenumerable-read-only-property":147}],113:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":97}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./assign.js":111}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - constant value of distribution
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*
* y = cdf( NaN );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated cumulative distribution function
	*
	* @example
	* var y = cdf( 10.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return (x < mu) ? 0.0 : 1.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/utils/constant-function":145}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Degenerate distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/degenerate/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/degenerate/cdf' );
*
* var y = cdf( 2.0, 5.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
*
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":115,"./main.js":117,"@stdlib/utils/define-nonenumerable-read-only-property":147}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a degenerate distribution with mean value `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 3.0 );
* // returns 0.0
*
* @example
* var y = cdf( 4.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( 3.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN );
* // returns NaN
*/
function cdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return (x < mu) ? 0.0 : 1.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":58}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var normalCDF = require( '@stdlib/stats/base/dists/normal/cdf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a lognormal distribution with location parameter `mu` and scale parameter `sigma`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 1.0 );
* // returns ~0.023
*
* y = cdf( 4.0 );
* // returns ~0.141
*/
function factory( mu, sigma ) {
	if ( isnan( mu ) || isnan( sigma ) || sigma <= 0.0 ) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a lognormal distribution.
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
		if ( x <= 0.0 ) {
			return 0.0;
		}
		return normalCDF( ln(x), mu, sigma );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/ln":84,"@stdlib/stats/base/dists/normal/cdf":128,"@stdlib/utils/constant-function":145}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the lognormal distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/lognormal/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/lognormal/cdf' );
*
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.756
*
* y = cdf( 5.0, 10.0, 3.0 );
* // returns ~0.003
*
* var mycdf = cdf.factory( 3.0, 1.5 );
*
* y = mycdf( 1.0 );
* // returns ~0.023
*
* y = mycdf( 4.0 );
* // returns ~0.141
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":118,"./main.js":120,"@stdlib/utils/define-nonenumerable-read-only-property":147}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var normalCDF = require( '@stdlib/stats/base/dists/normal/cdf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a lognormal distribution with location parameter `mu` and scale parameter `sigma` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.756
*
* @example
* var y = cdf( 5.0, 10.0, 3.0 );
* // returns ~0.003
*
* @example
* var y = cdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*/
function cdf( x, mu, sigma ) {
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	return normalCDF( ln(x), mu, sigma );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/ln":84,"@stdlib/stats/base/dists/normal/cdf":128}],121:[function(require,module,exports){
module.exports={"sigma":[4.774493403990205,13.60352650068958,17.060536959791477,2.0987337331667755,7.354857376005919,1.173128794027889,14.854087936256999,12.873174181273978,4.145248990581822,13.991437828380974,13.137059206066336,4.279173637414928,13.022616279091306,18.24011064167714,17.808775232033756,12.390456031344513,11.978726055738985,17.697296844667672,17.89236742799948,12.377113486516485,16.783325326992834,8.440320818519638,10.33748231911603,18.944740020132027,7.431183035776527,16.373044073786147,11.030572372879686,10.90957776377885,9.944301996150706,17.38217390861092,9.073353439877433,1.698907286943423,17.053227082504414,14.543189917785192,13.208996574461779,12.460987565900542,19.07227890939712,15.542773759287464,11.140957571483433,6.560089696662246,9.606659362037275,12.474896011712566,2.854068022666816,13.583654681452892,11.177193285083602,9.004589405616903,0.15090134508849662,6.885103754015889,1.6321680699200458,8.459773068033133,9.833668319426575,17.72645619115307,19.131984019136866,7.972862816098223,5.299993881432652,12.532987623322986,16.05153767024833,9.942783390618533,18.211561877466348,10.343972086916612,3.936779924449989,14.092675830971885,15.503129436844159,2.9630571568876984,1.3029420146353399,0.837808637744466,3.4703504202183977,15.64362387334096,16.37666767661983,2.150222589519548,11.811935480204054,5.419527242765874,13.722677531938427,18.963020425118255,1.8664456437545551,4.751552626802353,8.164775994844483,16.056953788117458,5.681712543014381,5.904816766035967,17.5378345330205,18.230172486942372,14.158506704244589,17.494281886199158,15.59882364315747,4.468886137751,7.446404854544348,12.233648644737482,13.351450576867926,1.124923819358492,2.2126926254216928,7.799862031293108,7.205097572528247,7.058419173255066,3.0923354280662396,15.945183282290536,11.620068669828566,2.1551666954700854,8.162347107210959,16.109233278831695,6.844098447352107,11.407023122426704,14.98252093079341,11.081757630817958,4.29412934899871,16.683121884990186,16.392123758650655,18.283738630144413,8.998020855477428,12.33123722696266,18.278474846040528,0.29908144457133634,1.004406624516605,17.07521685654616,3.364374559717991,9.063786244595482,0.2658235555829602,3.9272983001378448,12.458681265623923,13.200309178618554,15.829411751692092,8.448339721971344,13.242464045579819,4.105718085821026,9.999943241265395,13.598685177000135,0.15452351521209717,4.509134383158835,6.927719405402288,18.64364885866876,0.28051789556178264,0.11680505530175633,4.994784365002745,12.145122568844737,8.889265872390641,8.206378532679008,16.54793912826907,17.981151881646994,6.9610904613809055,1.0859769983589151,8.695755179284488,8.144807717417176,2.2601316247911907,12.17402215799968,8.727828508969125,13.512490573682028,19.948541700663235,15.879069984804657,0.23933543678190006,2.246532759935338,19.284368370442017,14.89821437635397,8.586508755994533,5.234458215385129,11.766278903007365,17.218206565805705,9.427308263369106,12.572733355455505,16.40924426513758,3.6555882937638584,0.4901875197889938,2.0447007972218234,12.339101272657018,4.445616694040577,11.715547233408277,14.499856614912412,6.381932218333959,16.468039032319002,9.626532572866742,11.026070652100248,16.102536340684264,4.11293283086235,19.476578266447817,11.93966460279443,11.334671540995632,8.964924938320147,16.55048339272721,7.908676812608042,12.236381099633537,12.750258037812241,9.147894792940136,17.04535207037901,9.145916801610557,10.96000187369592,9.354117936005757,18.382918659418188,13.133176420983425,14.341870897824638,10.379099792208839,5.539975811925677,3.8222723684768134,4.601832434663811,0.30384293491437564,9.379602316360973,0.06345451231241306,3.1335014710760856,12.247587992846324,14.995965954624486,11.379244954332375,8.96378392372947,6.723640431054387,8.817969739364312,17.828898908453677,3.1902476189200124,9.705905847777117,6.2333540172298285,13.56695307916375,16.695108458880796,5.783639760025605,8.0417272661622,18.748263506011313,4.2692285419347975,8.450136788612607,7.187033298141228,11.54822685875927,17.70234273436889,14.848240166423752,19.464703740455526,2.898652437009468,7.527045456379384,17.454638546501158,7.6541739353833504,18.429044763799748,15.966231578469685,14.044546694500081,8.524915708958538,12.332077394461635,15.441882495516337,8.678812502037161,7.3606047280692,15.813647560849011,11.941085860815965,9.663846326836406,7.169020635015744,16.95263371359665,14.567814287675294,16.349769179840557,15.646105056661192,7.663504505598859,8.283265691761521,0.32459188353803015,4.190570131616331,18.015779223210238,19.266403277119714,1.2468946682753312,12.367919623772558,3.596554612755023,18.534346759400727,3.606811905294398,1.4923798008337785,4.553781488783621,7.029592707838712,14.51655584147419,2.684949398143952,8.720649123094312,18.824889332576078,11.364472230696236,14.542403189396062,11.950557904035248,12.208373530731338,10.058172343829757,19.350187853968194,13.507055213249913,1.0167798817084162,8.455216679284243,19.78056723584705,3.441807109211119,4.2347167862836965,13.2394079204415,6.153292184321795,13.184871173283437,2.147930089970047,2.922719821808961,16.80079987093158,18.025818401606955,13.085795930896872,7.107037170270103,6.439705102848761,3.3798314115186434,16.935582562642164,10.94204286772744,2.5171780582393044,2.1413946391804073,1.8594490196414437,5.961489258829635,11.830816320628305,4.1958210865206125,0.193693163433295,8.988564226429885,9.333828875429177,10.340426065490437,7.659141027877641,5.000359010677928,19.806563971127783,17.333446355874614,3.022996229707955,8.16898576005487,13.46817926560497,10.056264175343777,16.338208032392796,0.5424416558034251,17.14051396634077,11.289456888490088,3.361310098046517,1.1181839693232876,6.052574607730881,4.840179551632753,17.7531719063021,10.76495977199341,4.411350891434713,5.366503986144653,14.239662733160149,4.077441886422233,13.384797894194342,4.383241799773843,5.815908545766768,9.180556027934967,1.7804454968500316,10.449120495433274,8.562054741230408,2.590137648473956,17.40899521975222,10.184250301957949,19.957250362390635,10.723757710156768,11.31372188430979,7.9383356229728586,10.59360226660393,7.368679655306272,3.9159723683241054,5.6023586137211945,16.384938388993536,6.967088324410944,4.635297097221325,13.225783236780458,12.741081846914032,6.326769757749475,16.161490655819073,3.5577246371188043,10.789380580633342,4.811399898717261,6.285867358964916,19.22078370009565,4.238094043126908,13.678126678408793,14.498941446053774,7.017552692492521,0.6977912346510085,8.172919426220538,11.369804153325859,5.72647873787131,11.288899837688668,12.723342507391141,8.994679869957963,11.500803098433776,3.599383392370039,1.9936513398391398,13.561839121439236,3.670902880903122,12.142887159191154,5.007821119193094,14.191472940891874,4.655379788446901,14.758285814005635,9.118463188792019,5.350274911099757,11.515235718655315,6.409647919076407,8.499565135384817,11.260169147901728,5.603887630072575,16.871175025984783,5.180245496778211,11.827844269653195,18.327440143846566,17.732972213905256,5.675167299108521,11.392199365936984,14.7855300867697,14.487899298059137,17.428063593649348,14.967272576879797,2.4796331914337078,18.02377493588011,11.236104266115587,17.745490585809797,17.85597248734684,7.628399873473768,4.700119520071824,0.28853899038848496,15.593568521494664,8.820162291028124,11.947077512270292,0.33997876057012544,6.214666866130689,3.0912620025021154,15.511168324068052,14.800394407581097,16.194155318047812,6.550785530576153,2.6230199233644758,3.331294891392078,14.486800211964471,12.889310488778953,15.062655000772128,17.688904695883174,14.943655805735151,18.016017845140297,12.130842826476794,10.377712480579806,7.365625412969936,16.56203586597991,16.498509111885035,4.345379007879671,3.9002133028412,5.174134426818342,13.023885535972234,16.169942186482245,14.913662124033792,16.623887827649323,10.459574373880006,0.8106649858022097,6.366344772246988,14.645231896722075,3.3766574874165123,16.53995424526677,14.462305545720389,16.331814677961745,2.387231440299189,12.65874955238447,16.425414106600243,13.632994049169014,4.1266882511634595,15.5215467922788,19.17916921180669,17.725102714113092,11.294450944835868,1.7805390619447747,18.181172450276026,6.442323814369262,8.004697536825208,11.389773763326314,11.160139322507883,19.143287945417878,7.687684114312487,13.431693711527242,17.949919965359523,7.796102759471606,19.341098246027197,16.00538053875722,12.389159864400963,15.409016054765967,18.54533127401678,8.920057554515761,12.712942913461864,19.62309997818767,4.47042919837219,11.652983801968722,4.383797836069556,6.967411586289445,2.590139785813803,2.4068443833655095,15.128485715867427,5.271409291946996,14.110844912373356,7.707222625807102,17.983839389812644,10.490800718626376,14.611812090471075,1.753107912857046,2.8447553213707,16.960121097483267,13.669467873762828,0.13156180015513108,1.508238291155144,9.476910383702188,11.056750920147307,10.719644139670734,13.117097514260593,16.66683873958997,5.378860626182895,11.928839022452964,9.08889273582728,10.806027702378419,18.703804747179184,19.184298240888246,12.043772544168473,2.8867208587113202,14.844441267226758,13.813562252311428,7.927824070566372,15.479184252850642,2.3253063124315165,18.090230681045828,5.62854501579376,5.969584355567621,9.045175695514018,0.18883387103080018,18.132115674559085,16.087572411792653,17.89202791068498,3.332651974235654,5.988179764787662,17.01391666644018,13.054432231174049,19.50328945457164,3.1218361931960725,17.705201114413306,14.44678203193735,13.04084780025776,3.710242602102003,17.630621691737662,12.50117287127222,19.287296297637546,18.02740489785065,4.651017808026325,3.318603502390687,10.531599165449283,16.93058440438051,16.362373873569695,3.9886827230732402,0.2994108312274957,18.69535159775598,1.8832187262715427,19.38620202972691,19.595302368205537,8.911786857243772,14.781880546127738,14.443280187884234,2.964013731884396,18.8424618042724,15.757196182640127,12.20549741685582,1.0158608333494978,14.846627566982882,12.880288713601944,16.44523021048282,7.111821868947623,8.65499982792552,9.372077722287703,5.823047415880547,2.4863676007061253,11.365348099913994,13.970761353080201,11.168747410558293,7.683590747255611,16.56299231547613,4.707327496099074,11.197441648149265,11.005105992705682,2.6589669990075038,11.255710289906178,17.902025436042607,0.35192284854284495,0.6986766541869605,14.387959710368644,4.650661339280662,1.7032234027511262,6.080937995482714,0.24849300549571574,13.043855084405003,13.282773424357783,7.814750344225079,4.579662685473758,5.865987075056314,2.2830937728661738,1.3311243006121876,9.400480470224156,16.56389714278296,15.007171578842225,11.868550129269689,14.61435695280057,17.695649961590696,6.564171918996329,3.128896635464935,11.639993170130275,1.419740522897368,1.388297453336147,7.381504188992474,11.387373152825404,14.421675963734524,11.144375470355875,19.12983790947068,8.860902347665736,3.7934125925447004,18.011183524827853,5.2361899446019855,17.575551779056084,2.614312114263555,4.279415122449617,6.332775665466088,6.967865620850877,14.998575502044993,8.828100640395316,2.5571136828872287,11.953835069789612,8.71394356629063,12.511299698425242,18.383573249911038,10.541857176098244,0.34662577267722927,10.599251175105731,17.093756624648368,16.542637366335153,14.080262014591218,0.01546585099551745,4.016096860923972,5.373824101045455,9.924579117493963,7.114784882796874,6.430815008392479,3.4602112029507692,14.107296483997356,12.074012288447964,4.604422449567482,0.6616160942645477,4.0825596080011906,11.550683536564694,0.9087598497124283,5.46325111876123,1.4129867642375205,0.20342517969483165,18.799761823803493,15.531243766333018,18.056522463742972,5.0542341126682455,8.798418154906882,2.2479714319294253,16.699196813300688,11.553364385652522,1.1136782687321878,17.294094600503733,15.963020498484903,3.96079878163182,15.721476387636294,6.160270727656223,14.638727892118407,3.161528998163843,0.9364469299609013,14.223051163290634,2.6716515163336263,19.74480866885341,10.068718829268093,18.09000723322518,0.002141902775734117,9.290670352499157,4.1616990557345535,9.20152229794244,6.932072826118705,6.561158170837427,8.489449151550033,13.130352349233556,0.6262073083952924,7.191728414461855,5.073887566329982,7.527444528288156,0.03143781537725321,5.3892184062068615,16.017165218745614,3.0536861499521217,11.629219085326161,15.470559915695677,18.148824156235715,17.660357508206737,13.398653987895743,18.51567613731217,7.778608541507657,5.187106370584265,6.822371142032413,2.621352134408781,1.832130894777273,15.695574596879522,7.032491835285195,3.478246677010244,16.590462518606245,8.936938833479005,2.8994499159509646,14.840445552766468,17.29064952385508,6.681569648820407,12.497521889971232,14.487601574917633,19.25633382887954,19.04937565856204,3.921109847703965,3.179563519450954,15.212424792191444,11.501996716616908,11.766575517218865,16.51439361806895,11.637145653183904,19.330104876997698,3.962413959529183,3.0342272140132565,13.543452197017443,14.750764773390399,7.383443886627159,18.705982067396505,7.0003266221670435,13.412165554124504,13.818244629110543,7.748598205002857,10.59974515182824,1.4520211131465643,3.5726933650664883,1.2307224156691232,6.765751397343971,13.865038199239361,1.132029515930837,16.14434795472507,18.395871420480784,16.474651352732145,5.389131448339448,6.453517312062993,2.5690138107469895,4.222475602887168,17.678150644090366,1.4539593998753286,2.488150659270074,3.649574032910494,5.027460210664438,5.841430278100317,0.2627690708656516,11.327075397736168,5.769894050392432,19.722931275776908,11.135517679395143,8.8562041002485,4.541923218456851,11.113905232747694,7.034067967018212,3.340284332456034,8.550048749396453,8.248909916588465,0.7373235149271196,19.989336536399826,10.777735831965419,18.377373410243454,17.283997009242853,1.7883863910483644,12.280580060035348,2.9655897401673803,18.152037529349847,10.127784769150455,19.69382672424429,8.983305763355034,19.05618284675136,5.610525024332924,0.17090934102372835,2.4963958295447464,5.402901432025162,12.733220584145775,17.13024308588867,6.003771510929843,8.87237612052514,16.191851604341995,5.070173480778988,14.22936159984773,18.89269545305889,2.7315416716721552,4.558920196876826,9.115313104871245,4.260135557532712,1.1309440672138082,9.497200554041694,18.829608401254887,5.580457282215661,8.287837323239913,16.277951749891887,11.084109929479906,3.070475011992624,15.407251020258418,6.040581727189855,11.144522238368616,15.625948179545013,7.891606411522316,16.53396443349973,3.827846028252999,0.655960114462335,1.6399508272153573,14.681448204182717,1.616248732072223,1.284629575997429,11.24484365072461,4.331171596326162,19.069286087623254,16.40188037970645,1.675178733947793,12.369501954529824,13.153078568197056,18.433149048852727,19.829944725331874,1.744316856262258,5.811351533111884,2.766516076937471,10.88514277517942,2.9386533226364664,4.540093785903148,6.444260471352297,11.92602129775242,18.270325591934892,6.048519398091394,4.189210018115022,1.782908507430534,12.320921524301088,19.34218639895928,19.71356394163923,6.386044546171044,8.249601698141849,3.0309254148060116,11.180257239627437,4.912696020884453,7.347360349712981,10.839998325475818,14.875813161247109,16.934538999036135,7.095203171484692,18.2865226278131,5.493898660680658,3.960031169670599,18.29337660241524,13.193859204255283,16.78572374246918,18.833352166013213,9.108085569639197,6.540285537603667,7.467615322447818,0.4860259406766332,6.015582112599374,18.84020079480763,18.10597531253904,15.574307181339861,5.919757489416018,18.70711658108886,2.697604037752681,15.14509504408628,1.9201889595749222,9.057032272219402,12.028275517976773,8.2654454785055,1.484927360543944,15.010218280707992,2.192567567367054,8.690710113637955,15.170122111723284,13.650855112957467,4.601127791321056,14.712616878079437,4.64264593346841,9.513647082660754,2.3441571615333734,18.133805120405356,11.31352877695135,9.03076905878443,13.883289768918555,19.533411248263832,15.770504366201825,16.489817007461724,11.92699709106536,10.202952543552573,1.242268979997263,7.678861651721083,15.013792355632134,11.737964824217064,17.53688777650133,2.792825020360814,7.937420744004302,11.155031969214818,7.096332176221578,18.758882007470845,10.220366718161284,5.08037307909575,0.7198303907393511,9.036647202129021,11.07420041006482,3.6603233161875304,13.751603900829856,2.2470960567497666,3.1217291790427515,5.312639286569283,8.511511676430814,2.19612258795709,11.690143922004852,15.222694010927462,19.64331055499608,4.0211717428864535,4.473255065240598,8.207345454878517,12.512830562715607,1.1824038105459111,18.45734215183887,12.169260129740284,14.733578660378019,0.2865556801942759,19.475160295832477,4.926730685919032,6.9966798132994334,19.107602164743,4.0290566637512,9.474501485560163,1.8779251641096284,9.900580988651168,13.700376463435063,4.909807447808965,14.097440455548629,4.434730909140794,19.09878808133398,17.18944120462708,2.0395111366512753,19.830296941770513,3.7433717229201635,13.056740931207894,16.75706016671786,5.755051992900131,12.295884191281491,1.9057884585887974,2.1714287383812714,9.835877995386312,15.544771589209137,1.5825931402839633,10.55887611160684,16.56970581571705,19.94520691179952,9.81652355403317,1.4839733901535768,13.339759934905775,11.029705165922582,19.59551515824606,1.3630450593002497,2.5448205805967783,6.720542433556376,5.127632803004505,4.426414980692783,3.527952477994183,16.574587164379786,0.23574244889624119,14.59976253498597,14.309831367952768,9.927842345804457,1.4139231309206313,7.138365690678952,17.513769292680518,8.345169962554602,7.754501392396467,1.9428376046307827,1.5459491179297569,16.39420540111148,17.2469052934386,2.836332655680618,10.94349845322586,11.979891479842708,3.5716391134972003,19.37553832754238,10.446810662187737,18.328031118287413,16.874792516733987,13.591780843342502,8.15339800788625,3.891027524327244,7.166474523264221,1.53185137875544,7.832090795984894,18.192731267557466,15.892492794501294,16.901844835950186,4.630711700090178,3.9734588358222167,12.332552246685967,7.446068271748794,6.432825926153551,1.3404377569884574,4.486818695073143,7.860522548999507,4.299831026775407,5.7769449252308425,9.440516358563901,0.26054857859641345,1.6277008718005792,3.1146125456432783,5.709167819621945,7.2595637704334015,13.735001900931882,8.534276374608192,18.359711782594637,16.14799887298566,15.254218163067502,17.931748485254584,10.645637476846632,0.2771360810473844,18.451214706496728,5.992223011159874,13.298180578981654,1.999031522016086,2.731994397251203,8.220328966274835,5.690838430920597,19.305334525057848,12.844216086735232,6.357007983326448,10.202289260111002],"expected":[0.5011576304848444,0.5662933106783331,0.5364587406739304,0.809280740364458,0.481536938279692,0.9721832814950233,0.5296706233140737,0.5150026713982201,0.35482040683353483,0.38994699771623875,0.5584393616326417,0.6131442062845567,0.5516864519924641,0.545075124847618,0.5456709403978444,0.5718165913041795,0.5790180521778636,0.5478047888450251,0.5338295219891388,0.4241816755767589,0.5629510650132694,0.5757381596714977,0.5862198772448346,0.5446813900440809,0.6177298564506387,0.5391779712428365,0.5997859375583479,0.5836960501910522,0.540285941717849,0.554364795951399,0.5735324674849637,0.9008348876432457,0.5281134832024698,0.5412465093406904,0.5322530067002998,0.5678387986412065,0.5338823514862954,0.5185496265680275,0.5361604462221695,0.6487954169822955,0.5547710118002729,0.5411588780034692,0.784981844448902,0.5531522283276525,0.5940073489914258,0.5544649786642176,1.0,0.46523231994446074,0.8462272371018449,0.5660553905768695,0.5740303590445546,0.519111512823187,0.5329080263856316,0.6324747263224468,0.6631181694137347,0.4800953612258861,0.4839881482171875,0.5891264643964915,0.5575509864709403,0.5871328468515722,0.33534172754559577,0.5520370642296996,0.5496960257297243,0.7814917212898189,0.670286201967136,0.9994828411284435,0.7088803813373868,0.5519566844087037,0.5514363085904693,0.34862621932990795,0.5841016606556357,0.5269698585720779,0.5754121125217504,0.5453817316820311,0.8877605853728705,0.5698114925263464,0.5540900063321372,0.5445698045567913,0.6759277123263389,0.46789498930094087,0.5087020137809144,0.5506003796720407,0.541860390767645,0.5514058455151122,0.5112469898078893,0.654768781025123,0.6038462444361693,0.5270069535289634,0.5392020600550526,0.9834197756056553,0.5693884596203254,0.6080562172153775,0.6345852641381726,0.5907808797463298,0.73216218299307,0.5598089341550792,0.54003791580321,0.7200010092552761,0.5940695513583693,0.5430371894605084,0.6374023046448499,0.5072684104883427,0.5506269248373407,0.5657281367347023,0.34354776986812235,0.5231604697623149,0.5407143407680159,0.523189733764552,0.5828276221974368,0.5618891939892633,0.5025305261456721,0.9991059193588595,0.8584317011353484,0.5452609711875348,0.6347600456955601,0.5651422588995826,0.995514805486937,0.6280285804211274,0.5201590366291938,0.5487825660952239,0.5451798461362044,0.554708391209615,0.5809101646820636,0.7036773895878986,0.593579794268948,0.5706466570223947,0.9999999999987085,0.6552825365369395,0.6188040554921619,0.5098171989149957,0.9999999999999987,9.280594830676403e-16,0.6589207822058853,0.5296074352843261,0.604240505075313,0.6276768888563896,0.5577457782066935,0.5491652941650064,0.6326146713616021,0.9743482464292541,0.38418276552443964,0.6232293974368777,0.8683970130794239,0.5307130371886124,0.6164237414074986,0.5594493029790704,0.5539401381379534,0.5207042640079752,0.9766259797448349,0.7207007291849318,0.5153882678451557,0.5461057185564391,0.5939092366040202,0.5780288805642351,0.5852072413809135,0.5370316339860172,0.5726111574489134,0.5690006612968092,0.5358161674498725,0.6850252780520761,0.9850489737821441,0.44054835367726675,0.572045434007167,0.6338043483105875,0.5780564441068899,0.5440033018680952,0.6540184713613268,0.5503472765747298,0.5006957837955219,0.5795506125575747,0.5295941394228573,0.5657316605903842,0.5204974583414003,0.4818809886720046,0.5771147987505238,0.5966127637605215,0.5619068958313342,0.5726392368526764,0.5347194136777343,0.5436111526230663,0.5887263437472365,0.4558441207910695,0.6055374277012814,0.5677159205377278,0.5916073122700013,0.5169788625103425,0.5577954043351803,0.5351313755704592,0.45883606859424464,0.5987103462519023,0.6934850962861948,0.5994378401829846,0.9999999996716852,0.4958791887165501,1.0,0.6398931352016977,0.5583938351706178,0.5509896765782075,0.5910195824419793,0.5713710515471423,0.6280262766782269,0.5737072401726173,0.5249120981707375,0.5915539235968467,0.6038609043331005,0.5850009463397374,0.5794156183168127,0.5125680717491228,0.6031779101327724,0.5025395509143022,0.4887255435328141,0.6510574261091724,0.522625482809365,0.5651893537156155,0.49193528160722433,0.5444023446698129,0.5694060116029016,0.544461546446383,0.361054167348388,0.5695652838696948,0.524101548650851,0.6203299757889754,0.5536902329156046,0.5584396513979323,0.5148962573544925,0.5910843951286563,0.5838724142500544,0.5483705982246709,0.6173293061617244,0.600562264268085,0.5676135736260272,0.5251257179240622,0.5534327918000266,0.6517811250981028,0.5181835745207842,0.4897554305713374,0.5464534875531629,0.5551411173110122,0.5922583678229137,0.5664905172059148,0.9999999999842494,0.7234463974682681,0.550438868979154,0.5470270973426224,0.9289142881805575,0.553642970580972,0.7022269912216257,0.5427594738438929,0.7265074590160601,0.8666955951439359,0.7117697295743467,0.610918902597899,0.46987206022947814,0.6536328137781792,0.625984908641928,0.42857726972711707,0.5636265420967124,0.5689054175138666,0.5512227755210899,0.5709813035008479,0.5632577878383267,0.5279424648913791,0.5444270781811097,0.3437465226758193,0.6022066237806605,0.5375740950174284,0.7496835331844296,0.6801973196831103,0.5091314421033716,0.6408720253723411,0.5765177509406465,0.795203558162521,0.6901514226290124,0.5627947626506811,0.5600034286023013,0.5575604706152242,0.6129535566107709,0.5602654313932423,0.32678487090326264,0.5639363939537833,0.5925208712611068,0.8492120556936196,0.8358763213784566,0.9133299241357591,0.6706094892626691,0.5488121301069362,0.5391088580717687,1.0,0.5283820524941271,0.591907426012823,0.5931913587370263,0.6282397377245725,0.5259795258343893,0.5446040433097625,0.5390315562312267,0.7477396736915671,0.5982691124579536,0.5511468924565008,0.5976506700521562,0.5419805705619268,0.9983329750914496,0.5629134585838688,0.4227475856919781,0.7810721519640236,0.9632686853492414,0.6568359336422965,0.6651298715640137,0.5502610570775835,0.46832768145030534,0.6974153948504476,0.6027160088444325,0.5614141377594688,0.6835875162287878,0.583663471646581,0.5875635935360951,0.6288605970378838,0.5862448256922009,0.8059575225224692,0.5754215020186488,0.5953110248480495,0.662818916387878,0.4849182835087136,0.562732109168397,0.5234112195063785,0.5620111952700569,0.5757023988419757,0.5413642390651342,0.5334394282068248,0.5884754318860608,0.5147374953279341,0.5892906840163592,0.5526718160807336,0.46687317383252774,0.7013368054297787,0.53856804386197,0.5055321874002442,0.6177416377327982,0.533248806353239,0.37186912041067355,0.5316733609413395,0.7041492990338887,0.6241583597955045,0.5292741888068782,0.6499149908291029,0.5451124072933093,0.5301917765382552,0.6258586196280921,0.9986138127693542,0.6130923152639428,0.5765185423021187,0.6507707889671915,0.5001101109450187,0.5280965659777336,0.5576198763357587,0.5314945054128546,0.7098636689482289,0.811334572219867,0.45196903434246194,0.5382015814130638,0.5157590257832789,0.5809945862815251,0.5349612063773679,0.6219282609409292,0.5448616074815145,0.5798341465812772,0.6804343511516884,0.5855009884153396,0.5914267918533405,0.48280006401044495,0.5818695379705009,0.4840046116974818,0.5377041796246567,0.6485667765699185,0.5448146817060041,0.5491795506314976,0.5351068637388673,0.620583842800563,0.571046359296796,0.5153757232452457,0.5447489448382878,0.5476231567626682,0.5242876245807777,0.8582840393904179,0.5592659446850516,0.5639223749944818,0.5459592873209638,0.5382175821399613,0.46669062937984085,0.6954634734168437,1.2779672545894368e-12,0.5282015036826078,0.5935367078101247,0.48574889476725425,0.999864772354732,0.5222058552194182,0.795574815992161,0.5570549118024197,0.5580324478402724,0.5515922902739718,0.6557239947056629,0.7221454394145956,0.2665124874223931,0.4839336078613356,0.4921839211523774,0.5459736720224234,0.4990331538911355,0.5317932871364933,0.5259003908108641,0.5804622221251171,0.5383731798309581,0.5708448033844952,0.5111731398848406,0.5029611080169394,0.7100723270109486,0.5916558439166938,0.6865771786522044,0.5365355211629367,0.5523251963116813,0.5424078320157516,0.5230275136542668,0.5689229862645384,0.5871874815223451,0.4526671617573987,0.5174669324466752,0.4657500841818311,0.5526034736672574,0.5585529539308418,0.5549895693240303,0.8108281060589557,0.5157470074652624,0.5525634442581766,0.5626154483897023,0.7181475019826731,0.5345504558476178,0.5483241894343301,0.5262901881072751,0.5715391547853468,0.8386004224954335,0.5311001492008259,0.6361218247258669,0.5430340845566338,0.5816398270475371,0.5707433098521888,0.5388843210326948,0.6065775028074583,0.5418511381814389,0.5255373949769884,0.5732817278251412,0.44036146153473116,0.5358093549910872,0.5439615434274525,0.5577398456556069,0.5524872081932481,0.5857072582758363,0.4888598406202799,0.5356008557507258,0.5114702741409258,0.582851884032618,0.5581638378361968,0.5831690995052956,0.7992317928545725,0.8636265821961844,0.5718950016764187,0.6751739968223278,0.47380592149944,0.6093355995121932,0.5630973904143654,0.5827372322809956,0.5645083060966171,0.4798274357504562,0.7392429840342891,0.5344450265824432,0.5316693801806968,1.0,0.9367471498525488,0.6009331357758362,0.5873675360578908,0.5371913565104716,0.5491055341865478,0.5523941051110717,0.6525073263053168,0.5607747624841076,0.551002124218502,0.5868634553827502,0.5624670575447495,0.54486034092637,0.5559332861059294,0.8028373565351735,0.5611971403787815,0.5446984280774492,0.6107158217600113,0.5717111830279997,0.5740643401105631,0.5350606184952312,0.6207620287004908,0.6317067485032007,0.47648624154641905,1.0,0.5439128645447049,0.5577465974588649,0.5421477584366324,0.7215185914342458,0.5992869167261966,0.522424318294437,0.5155311410944041,0.5079593085877873,0.6818989396282186,0.5364313121748588,0.555498186359624,0.48386782039769477,0.7146453607162837,0.5493304439293439,0.5426496244548529,0.5068017239263959,0.5005679833424164,0.604185716436709,0.47869514022810356,0.47717145798227806,0.5617665563054153,0.5537631675875112,0.6096537936195805,0.9999999997850667,0.5445240253013905,0.8740935323035468,0.5245853241029977,0.4985302193157423,0.5665024387228264,0.5398467899152138,0.5490642500014495,0.786232165366669,0.5456822106220639,0.5571734642614377,0.5883666586112216,0.9797486182674553,0.5499171884766412,0.5026665825348418,0.5283704987375217,0.6179295743842317,0.573592069280879,0.5888028157822279,0.6174300202297608,0.8163449229367241,0.4906123696656184,0.5205696270640003,0.5118583130516882,0.6237725717733833,0.5325994823584106,0.6537396141554525,0.587553013600462,0.5461389583289639,0.7993895004599301,0.5679323669440496,0.5284483441090551,4.796817167465646e-6,0.07919672056393319,0.5697279972112949,0.5916088226153526,0.9334065521090162,0.6513246170961297,0.00015883327465005133,0.5550495926704153,0.570102916169477,0.5884276608992587,0.6768286430885785,0.5886297283335415,0.8739437440564024,0.8981848676316577,0.6214902487918893,0.5515029651868072,0.567463279450934,0.5421302897067021,0.5347533553138034,0.5617147299407417,0.5870133328012234,0.7657906685117677,0.5205783528445612,0.9045659573976306,0.9107351070178848,0.6316306134106014,0.5874529490192287,0.5534077151410973,0.5724707448315405,0.5301603890799873,0.5550278908113917,0.7244026436936308,0.506525156135159,0.5652030511097833,0.44893213227629825,0.7831763344385865,0.6006373647083136,0.6578513268258597,0.645651815003193,0.5444138922862851,0.6141573854601611,0.6415767283667881,0.57942252909579,0.5849640760506859,0.578057847358567,0.5358455685112486,0.569010722668338,0.9998573553988228,0.5306644170279952,0.5624643788430342,0.5530425615121498,0.5464380818366209,0.9999999879573364,0.6977540825912641,0.6562105924759811,0.43826416507632737,0.4094766810273942,0.6430059111978857,0.7313494483454638,0.5706371583905804,0.5539115854525362,0.6846331931586882,0.119850535818982,0.6947339081818622,0.5584694231330064,0.9673025890903942,0.5986027219993794,0.6503497100723863,0.9520695310143936,0.5044353628672862,0.5514360408309203,0.5354949239740315,0.6892056933514108,0.5776834135323353,0.8203011284920589,0.467639027136069,0.5032299894469702,0.8619889782630605,0.5542197084173462,0.5188591231180661,0.6533316576466461,0.5686195428840324,0.6078658833359306,0.5133699179280868,0.7856269031228518,0.9082552916565505,0.5644293055039765,0.7548329533062943,0.5432904675292548,0.5883051136758125,0.5544558768605037,1.0,0.5679254964556613,0.5589808664552824,0.5711016873900285,0.5975880106238298,0.608700577430695,0.5762095272350051,0.5714082384774437,0.9999989751891484,0.5465293871051565,0.6927594377523975,0.6287739202339406,1.0,0.6214388880734056,0.518879205858904,0.6021184904272342,0.5666858073623979,0.5557126981503561,0.5417894750010369,0.5457521837644508,0.5588435815673385,0.5010963837075969,0.6330890767672421,0.599581899550865,0.49878820962381154,0.8318584913088136,0.9337079839430884,0.5652238330114558,0.5033367950265031,0.7631259663293897,0.5280324329705802,0.598011823392412,0.17216213234401107,0.5584814827744548,0.5517458665230012,0.5463819489726761,0.5663485446889402,0.5468912145588287,0.5085203632228377,0.5491940382169412,0.647319717085807,0.5713592899968373,0.5492004443043528,0.5633253830633402,0.5372908450605925,0.5226717819567932,0.5486921344521346,0.5441931419506942,0.7092639355531258,0.7945133135267494,0.5663812702870734,0.5424741031507816,0.5286793975830045,0.561752268132947,0.6154473183532113,0.5564042817586525,0.5173895443802988,0.5627814515962096,0.5528463227373313,0.8749860425419083,0.6860081840326142,0.970939021729214,0.25713418395539756,0.558745592755421,0.9896307815305723,0.5600968973741541,0.5451872590649715,0.5609217105801662,0.5844233892931512,0.6218760967226499,0.6862085624510773,0.5861172323970492,0.5328147362337334,0.6122867135455482,0.8423244252921129,0.7090915126458088,0.6663384733888902,0.5840924697409877,0.9999021801980214,0.5888404914758504,0.6705208737679655,0.5371358220843624,0.5353232656951252,0.5837231702143112,0.6912831551753212,0.582732475135616,0.6462508458052408,0.6521719945288206,0.5793269355248984,0.6155607774075444,0.9996860159946354,0.5428571579794049,0.4137005099540566,0.552665233083318,0.5470190876428598,0.8399598616344522,0.5778519515730697,0.7994796086165024,0.528918683219411,0.5824965973286265,0.5471856256842564,0.47638537026189876,0.5323851362894235,0.5924076238521737,1.0,0.5274988202825708,0.5438162380262075,0.5488325046060938,0.5539883668921979,0.5243934115944076,0.5953971627435335,0.5530704881016043,0.6734431508177035,0.5591233421453251,0.5206595025678914,0.6956441502649022,0.6778376278074768,0.5565041154642654,0.7307652066752286,0.9218748874776115,0.6100635243476434,0.5258587741309685,0.5762115945688177,0.5972464467929172,0.4670723794881872,0.535650706768188,0.4204818069615802,0.5488009832305237,0.6364893897253331,0.4466308609601036,0.5632129207482068,0.6030917479156441,0.5388226536513709,0.6510193975713998,0.9999938238690306,0.8757556624351628,0.5506046041952939,0.665913984505734,0.9862023167089237,0.5802721591115388,0.6984975853714102,0.5614377671216787,0.559461445300628,0.8437070204547261,0.5796903007789684,0.546252259871115,0.5622791748019057,0.5483068539717517,0.5998289586669959,0.6633144787374605,0.6815793232031976,0.5687150762826179,0.7556126653033544,0.6148518663370485,0.6466461156156943,0.5598649093011067,0.4934034153687066,0.5965783487989376,0.7254312916459755,0.7693051673670352,0.5238239867440599,0.5540040032064963,0.5164748687522589,0.6065233403144219,0.6135944519130873,0.7243137593142606,0.47407390853731785,0.6999314429074122,0.4746576990766115,0.5807574182023838,0.5182342643507253,0.544675470417737,0.5512407532441581,0.532459438286241,0.6276825942629827,0.6677172343608465,0.5541325754003782,0.5861121468537026,0.541127417797202,0.5451008107195063,0.5920348913972142,0.5855683788449976,0.5779082230023198,0.060392484536450235,0.6251525270156778,0.5278562961433222,0.5082202684694176,0.5295632682475728,0.6448602942001045,0.508744466751635,0.5702853924598399,0.5493876677216516,0.4327408662364431,0.5298026963670062,0.5618752602490344,0.5500345276980622,0.8252053632666443,0.5666411453943558,0.7686816651347408,0.43766760816282385,0.5025540676149548,0.534973553045583,0.602233179792031,0.5100641253466291,0.5414403615726123,0.487510703590568,0.8793898527470776,0.5026931256727817,0.5393895003989411,0.5808148546419181,0.5317158619676372,0.5407932826216347,0.569245811081218,0.5046023935278003,0.55468559756434,0.604030436768773,0.9843253444668492,0.5992488203664942,0.5444781818713608,0.5486470139250821,0.5476693607869592,0.7616183943669019,0.5572604756828097,0.5558375841471912,0.5833819423883849,0.5390411839984787,0.3893335683586192,0.6367957835563817,0.9987345890725784,0.5199190042200504,0.5164966650821703,0.660867475482349,0.5178500421426565,0.861167169164772,0.7059450554232141,0.5127462476397314,0.5838469974611158,0.7473873815356749,0.5625036255503455,0.5541917016605127,0.5557275304881311,0.7113781265512946,0.6164652390825048,0.6029435681623907,0.5553385651026056,0.9170001098119844,0.47596312506798194,0.5555396763567251,0.5334759784261788,0.999045465118863,0.5356423723506569,0.6826657805087974,0.3983516586634979,0.536431739118886,0.6942877599777189,0.5514291754825099,0.4833582283272231,0.5401674807288074,0.5532621080904256,0.6029952780705947,0.5416124830383515,0.6996669788426568,0.5518571784980306,0.5574255328575478,0.8008818199766992,0.5077514625751766,0.6334457428400155,0.5643709202309994,0.5137812768291021,0.6331888078233925,0.5511525310304985,0.9228349994944035,0.8954683610295817,0.5552434081923471,0.5444793147350944,0.9545178440822044,0.5735144315096956,0.546569086183117,0.536941810349352,0.4914149657223696,0.9130899461988976,0.5326890411821484,0.5600015220911951,0.5329952005765719,0.9115195072717035,0.7918199699783943,0.6373683217047443,0.5921512445600153,0.7092270837112178,0.7020855918503911,0.5335209681533482,1.0,0.5565264868223755,0.5398877306394941,0.6009729157590021,0.943949949100408,0.5953383749006076,0.5529576157541151,0.5732408257151316,0.5428293218060765,0.8918948837610943,0.7658169864772884,0.5629859571280115,0.5398050594733972,0.7295785743759253,0.5877754531001851,0.5784041625059925,0.6666757945536361,0.5402264978328308,0.5199081745012432,0.4934782727405779,0.5502286066398885,0.5714514092943078,0.6013499892167863,0.654529383911774,0.597785635537559,0.47125104571927856,0.5733462024310587,0.5217769859026028,0.5259882670148045,0.5287564154377447,0.6375858528764478,0.6259384642403789,0.5576248453300309,0.5770320567749085,0.5831122405939542,0.6326256344852601,0.11802370686348349,0.6046567524999199,0.7031336270038226,0.5145306208816984,0.5517677049599192,0.8737663186264077,0.930378441952245,0.7215853893112152,0.49597091086990214,0.6400482649865247,0.5511902981599076,0.5710865247989718,0.555503698546054,0.5643285786571937,0.5321002779368645,0.5483323699254038,0.580259320137063,0.9999999210597812,0.5564464999734122,0.589601430968109,0.5613893109041274,0.8632316571601437,0.7227124517208784,0.601854290945951,0.6805949890774967,0.4966593629311947,0.5589133254745295,0.6432996403302708,0.5699796246295559],"x":[2.52965143661974,19.93051200501849,6.708796316375505,16.07022815075817,1.8785609252727742,12.076278430921189,8.157413036665982,2.290789222788585,0.363461799855771,0.04739005993016576,8.881850304057636,5.820025207504247,12.51509287211431,18.423827052250456,13.102488190514809,19.500465053055063,15.542279765748601,13.910770433110518,5.857924250441386,0.23433156315983084,14.809390073385593,5.068548179812558,17.66873917518943,11.256489897342469,10.34580890530513,10.277776790148788,17.375011557817764,18.67749722734583,4.325909391528233,17.16852044252667,12.77248207569964,9.485552891050153,8.95092805026354,7.303570902878258,7.384004355503362,14.26358699566984,8.834636127354196,4.783022487003459,4.313422515708942,16.867085836958683,4.384578202883405,5.2374408276266715,13.78286119718731,15.261610911678911,16.61725950536704,4.449282085601771,18.12655964980498,0.6263912484474421,7.095545392058034,4.363165359821237,16.05898459090247,3.574695336760283,6.922133216673587,16.058557399477298,18.93817860221484,0.5951643188017242,0.7977516943495955,17.87361744089217,18.33250134502379,19.218509729748515,0.38535246149104196,11.362288357242448,15.511973959800187,13.351912148304429,4.573843745239001,16.391884649083607,13.335699295097667,18.28491063551339,18.84688780562582,0.49748680084253927,14.669213273447426,3.1153663474146143,13.86875850868481,19.52242424912395,17.470036600458382,5.561083370852047,6.572418746383075,10.581947409140962,14.708683514742775,0.8571541716568776,1.5493483274637532,10.91727300249902,11.931426759128803,14.942181700636379,4.210672153339212,13.199315209890372,12.852989052731596,5.068249373325129,8.784354042400558,18.753052391717556,3.4786404606305066,11.781874795724136,12.451651122263936,8.03660700124806,9.892464973653357,16.772332911762284,6.556567053525293,8.014924920852247,12.754091579948298,13.76332461571478,17.177127807449935,2.503202450104909,14.082065889295027,12.998348720379894,0.25515784777683237,4.9324445014831175,5.625463091955942,3.156490109014509,16.84219862247689,13.43956596584193,2.8154229755686977,5.552917699355842,3.2770190520323927,9.41376655343515,3.373746164954796,10.758960191171422,5.171777171774692,6.984909541384923,3.211764103587127,13.249965102089782,15.186973545537064,8.577286507221045,18.39226013714223,11.40111993178584,14.346592325146602,18.267313523623947,6.549878113949723,9.46237462231327,12.567991423529424,2.051728953005658,17.6408613713274,0.7007085226459164,11.892890710296943,5.9453727007117285,18.668047237262904,17.54034274771937,11.090750454160641,19.690703348187093,12.685260028340517,16.507484995859116,0.17160948750140292,15.158355024156833,15.029256037482138,5.503549588218135,15.68758413219081,8.026109731447185,17.882939505127176,2.411512786172887,2.168602221017868,5.244676028275279,3.857056468346438,14.602685048924094,14.632870717202437,6.111391665416774,15.385954432934428,6.715125095234171,14.8308518376558,12.751552832284432,9.859941594318457,9.849073594386816,5.947853554723337,1.5967804414118714,12.364488974250264,5.3065555673404985,19.748892405565304,5.989263198956429,12.809342147009248,12.338947056525807,1.3943287226787149,19.866470411680663,4.614139036207048,3.8456299094327617,4.299635602193637,0.6755040412898383,16.74796145126229,13.004419836349888,14.585753484466526,6.99844465127188,4.21085939811952,7.8068422277982386,14.71917699245759,0.26869569368922264,13.920458346717641,17.04920581887489,11.895731535558705,3.825245878852974,16.699797155789962,4.360845930064929,0.8789362838246051,9.016487912674368,18.08337525246189,5.857202265012269,6.602674257750216,1.7890325953511343,17.251903928294624,7.742380602723462,10.735492916775291,7.9970843245732715,17.118842387632874,11.94059398022048,10.544428943623236,8.880931882770792,3.053769368439818,2.6790475804807956,18.768341317193567,8.590412120423277,15.981494800606013,3.0505365235904947,4.656886150187347,1.3767322200253806,1.2135185809125337,8.174698314294012,3.4738599201731546,5.923564215844541,1.7482426684329644,14.122826630013115,13.996340036714706,11.288669854612085,0.8930027663959361,5.764054403477639,4.898380585884494,18.30495857511368,17.71872832097708,19.58242885338954,3.458591795764434,18.682017424580852,17.017455699798,15.721730672648677,19.819368213642132,6.832736381674094,19.387688571451392,2.3463236901955264,9.0144587673406,17.13918555364861,4.581229147840125,1.0100780140145016,7.06638970937064,11.771834887051607,10.376301543505765,4.371042352814283,17.891852380241872,19.250030659474426,15.692546201384161,12.30090282613551,15.381697077683638,6.781543977354514,7.882854739436715,8.480088336356552,11.522225160385755,7.462944763155281,15.14418065135307,17.22775155200013,0.3888328874511604,3.165099032747891,17.497902041358696,0.055718501612469495,11.286647508871233,13.531734285106701,4.7665022863442985,12.764834136757322,10.90488450815393,7.8092607527808555,7.7609063174296455,0.7877687999584282,15.4444723961383,15.643558614773742,10.237521480347409,16.012575093887243,1.4693954504974727,15.487918959561892,16.267175003263965,10.01739886844506,10.698920244660917,15.836502274570057,18.25817893005343,8.77176346548547,12.33047870981347,6.200728468931271,0.45305898744380624,19.579763275361707,13.886490918389377,17.662758001829857,9.872508727999163,18.017234799335924,19.69478140698433,9.690774892477778,3.6262458163356914,8.132858131825147,4.937753614312008,17.820361478011137,11.821683714188023,14.829141946050397,2.251798504838205,13.956166966534314,8.626046762637847,13.972967570300462,14.935737776637463,6.606370682205531,14.47542703643343,8.061095588158063,12.72245569845753,18.29785028135484,0.12763984909874626,15.461244117296351,19.262906478990864,15.715481321018245,17.296624012663724,15.928423870269182,1.031032924506654,10.892872382671769,9.968417127419379,10.695677928270149,11.019920867367773,19.810984100597942,3.8962475550817377,12.490891463178762,7.534178663522106,5.017389077714953,10.708568467610347,17.445125341661726,4.274927569685167,1.3563545467244031,5.5042388628410555,5.741763013380905,13.414296345371874,17.883621110805045,3.8255597357835303,2.665789558252345,8.939241924053007,2.589170572708692,7.119850837596351,18.386545618685787,0.7584403905929449,18.309813993670655,5.263064276568081,2.7655948569671773,16.50479188965003,4.715878328462342,0.4098707441452776,5.183530643067891,15.891759623112115,9.878729502706168,9.097795386739946,10.432221851848542,11.719301219491566,5.980678038550664,16.377329647023426,19.894678466541095,12.267794897311068,13.197290413927497,19.76197187428266,2.5436379931489395,2.6420449250670908,4.6521610650530265,3.2020023423154065,7.783909207853372,9.350635394368346,0.4062950750518679,3.501097686303196,3.7660142269826657,6.398653051673149,6.093001620929002,10.442942099910045,12.818251937536708,13.40191027143426,14.709172485605645,19.20917756903514,4.405274573049844,1.1004665093123123,13.779445818810153,1.595529514456615,10.966700472230798,8.843989440875326,6.721708747629398,12.88656289763443,6.322607351934266,7.7847270301020455,12.226475717318074,2.9980228629102346,5.625162483552941,12.266051024376253,5.777416552544197,19.85426367712535,16.970603096317397,6.297081154781061,12.62576766746134,9.228169560462089,0.6988386804872482,19.668571365007793,0.17426357039211915,3.0220500216553647,13.407927407594439,1.3439590964864134,4.186304767114053,3.0955591326658727,13.044831823719708,14.200695183547465,16.505315630298792,17.47702756084845,17.479076897480894,9.44782367926052,0.19381819671222544,1.3765977546784747,1.3385538000534813,9.440398327262303,1.6165688388288713,5.172523444326553,4.706678970893665,14.692199240525813,2.945592770930938,5.558007930482538,2.768395346138406,2.9862191499858026,13.710291651479825,4.374435845981317,19.978905588587033,3.802874847974631,14.837421477621602,11.35319492645904,3.7266505733606436,7.4071207599932265,2.2298170973162312,0.772698405935146,3.954552895787926,1.450252092840576,13.00052644222998,18.034004050844832,18.004292030042,10.769134077781818,2.828478819321645,17.764403353884532,9.721532840982645,15.060412009924793,7.126249031897274,16.119964242426796,5.67125026552143,18.28956617410445,9.085727750223057,7.679421589936961,19.772108556065042,6.379077579194359,16.881809940840824,9.483498383472453,12.504769492406806,13.513657903314868,9.571948451794778,7.193744468655723,11.346120209890284,0.12433768313070193,10.516916083368063,3.9955749653653427,14.291412982284948,17.691873202052427,14.409184034049417,0.7176725008692575,7.228080471840275,1.4765373313757024,12.463701390863594,4.119120529699591,7.887751082787475,12.906976602586786,15.567204033595981,16.00934604316082,19.687465634694796,1.0301350692741273,13.702617405923307,18.187405302475966,19.347401885285972,16.99061189335759,1.73018195095056,9.372818327305188,6.789330330013508,6.800115516144998,16.92076503077701,14.869811928658265,18.597359212533334,16.849008684921756,4.662568360958099,9.968130373292077,19.020828751576275,12.121842537293222,11.144261467412274,6.989786213251921,14.388503998908696,19.053415701900718,9.438144193065096,14.738911129124158,13.455269414597137,18.493754355439176,7.408506387788227,13.74724866542445,16.800056384482517,2.690196747343001,8.454285500924033,12.999397262165386,19.469152441023393,1.3076803473780396,16.41287594897267,17.871320228815254,13.687424495969381,7.337165222358646,15.676029220377439,5.617097140883844,2.929292906176366,3.85668558655643,2.423249352590373,9.9444969635893,10.730958205977924,17.26876774860528,0.7944043052146066,16.537073409697726,19.069178892352667,7.98694949304168,2.0860373365061635,2.191389637982679,7.393675906584063,1.916191859306564,1.2141243425416892,17.532447032867534,18.1524131649668,8.21938355624864,17.52418208970849,9.47355254239465,19.448540467519123,6.711952712231968,2.249111166110045,12.068586381670347,6.160473278810628,9.89962593392248,14.866727587895268,13.39037483554156,15.475666580214241,18.290142289090316,16.39993906960706,13.688202525683781,2.245268574274988,8.20190832985094,15.279305359009712,12.355575112265242,13.288572336822156,6.770597483008576,16.01690951605839,1.5668931952398513,5.587544579620007,2.027545141421969,19.90417472927112,5.494605697367354,8.404475030557537,15.302678723422902,5.122992230402752,18.514360130375657,14.84616430483522,4.6220294279336915,0.5159192754703312,0.9207858310835926,19.974836414016938,3.630904056655555,16.768904442500133,16.9782840427283,0.4602583240443048,11.280098778413246,15.755036312736692,7.4129342208297055,12.285191039518466,5.904579475053819,18.140546615960037,8.049586902136433,19.7977209423024,12.247009071636764,16.98919955103321,7.239715313378303,9.46105521026292,16.80877047351779,4.431557945192437,16.33778229610094,3.5579097139328475,14.762347836145203,10.815638881836884,19.813183322246978,18.570747453902115,11.020527252259384,15.831395243165014,8.335888430821319,4.353556125439844,19.672246563429713,2.1472456689019515,2.887301901888115,0.24297319303832055,16.409285621802656,5.323753646028502,13.137056532667177,16.890174243888087,12.070988489569512,16.22444868335223,6.357013809870398,17.705601930436732,15.482716236109253,15.856782627749348,11.093758625186885,12.450130479916584,9.522287040826933,4.425897830281995,15.834706967887637,17.050241971457897,10.094283429961632,2.0549069599631364,10.707988341758142,18.66654459125707,0.5056139382053582,0.40820508773081965,14.946390435234523,17.023285771368112,16.242271541462465,7.8121944858710135,13.751929228380817,0.5167471024252857,16.674860683736547,13.849551862247083,7.814299121506969,7.789372569028021,2.8540629097025905,3.6911417411192815,1.3866502313467022,16.46827149564232,8.5585200806668,14.135158767456035,11.73177408847231,15.179715344002291,0.6344231509633191,1.1559899772885007,3.523155532358917,19.42373278575591,4.790925398839168,9.987633217246618,18.02877487032619,10.962836838030654,3.73120477711951,18.08448506151204,4.1041838798579455,15.428675323123645,15.547157672645673,12.936390894658434,19.755068192850707,19.50924496364253,19.96677095805058,11.870811391382382,2.7151146370846213,7.2838131076796975,11.364394175499486,10.537840763704388,7.281470902525347,17.54797391270301,19.923356488460225,4.943726299498268,18.543762606532614,12.950821341031338,4.212933240771313,14.267064082012526,5.770050882608149,5.662326398871214,12.18343451300537,16.851635642865915,11.737213413920946,19.17206508077513,8.552835774434588,2.2162140654578932,15.164202156175147,6.096094042068216,1.8837817131927936,19.023403763973356,16.85205695207013,17.303677414354848,2.794645546143162,19.205463913071583,4.413102355615015,18.60211274196217,0.08081590828722174,19.811561247788163,13.936774263864589,3.815821815060869,19.46649796578781,10.92688929935977,3.2930288257955187,13.358353634237194,9.88701845198936,1.9885011304059663,16.916300758112413,11.120584133584543,4.78660729090528,4.29614447814918,4.762594125339246,14.224188475340217,13.741928822907767,19.170789446291785,18.485270983699813,5.580822168969384,3.8011701343472515,19.17453649059295,15.490919314661733,18.109715746237924,4.490329925617691,4.287903482444317,4.666268096013524,6.170405649016133,9.121665364462071,13.444313271599926,0.024420325683931488,15.736274265466541,17.99599282337073,16.812858845216123,9.898659641705745,18.549375544250704,8.553750091765995,13.416406016743538,4.764428145777306,3.5101824367845236,7.608254263910883,3.796122712889032,15.149781442334277,13.590129932509033,14.465150441978354,4.364975318816184,3.124547526918535,14.34678576633968,19.14356196396327,7.926057469411254,3.771022309622394,12.002357403338436,9.780289300667091,14.22983318222959,16.36721412534658,3.867865922143987,13.400033493262761,18.377602217865658,14.562979715411846,11.648917444868697,0.20598400287315854,13.271124524790823,16.335796556544175,7.550160267464157,15.728887002063168,18.03937382091184,4.156708458298501,19.784919548882527,13.479741802113768,0.8509896040009002,9.022132108506277,6.944191341672359,12.55174512022133,2.2388572335538814,3.939266901940548,8.471162975396043,14.911722967971045,3.199123027295556,17.512014280398823,10.986527491630738,14.445714169980462,18.29175082305566,3.655584813390824,10.91334347095529,8.402713086428726,8.028904988454135,14.801988842728559,5.925352963644732,15.840481262650181,3.4801585761059783,7.376081550122167,18.38305408757327,0.5721160089660371,5.622705436534066,1.454636621023222,11.86637975921569,10.31209996290615,0.22941690823298888,17.524687911306923,14.686915179089745,13.023330494722938,7.06673678216001,19.841725902156142,6.898767052495596,8.129313712297645,4.829163852591658,17.591113717138814,14.366399077952385,15.29138832141955,19.11617243211243,12.31788627264958,11.363234616581362,19.9302770599079,9.19387815474841,19.754303122912503,17.871152156904984,1.8545965405693554,13.855295622039945,6.69722621621184,10.940434462655695,19.425823428840747,7.044921752730184,19.977271666023007,8.216939115526568,0.863074084284654,5.907487429527194,17.223960200238764,8.256015943537886,2.6366808992959445,14.659413540453187,2.369701212276385,6.434562806550885,19.535975178584536,11.892353609831474,1.2224535199425235,19.696656976340655,0.9652568975069364,14.909603360369221,3.909476090960764,7.1662363444686505,4.7551333548926955,4.503047835123333,6.099361514005768,14.575459083499025,17.732406934661135,19.144012418217855,7.529760166600052,12.948902941914016,8.468242621528903,8.677905650512368,10.416985426163441,0.7199422135333711,7.757723596234101,7.373126428753034,2.7761675797147056,5.782980761570498,17.03701757593525,4.013723099040525,2.4779321980152247,11.528799360209963,0.8568180285961535,2.9187584837173652,14.958891467371709,3.9516175717534097,4.964373604605412,16.274408929161126,13.487555133242077,0.44353253809624515,1.5117652821768157,4.859662496221913,5.941109322408913,3.104535611531669,2.3726540589208422,1.8544968369914194,16.97988767659419,1.3785360938255353,4.825149632388137,10.927096423429607,5.900831506758175,19.079284791792453,17.406127225733513,2.20456754784502,6.5726960600505935,19.58206131852583,17.631687020374976,18.729566198965998,10.545278349743876,7.699276355146365,11.90803781617829,11.735162663028476,4.043855326171069,7.263052148761804,5.8198321077672865,9.350023237347882,0.12178036202365128,6.626525741154348,12.080666661147852,2.6100117789941724,3.01130482934973,12.402389349045922,3.9754137821273083,14.046777506925023,5.956737053345451,1.6873307670331084,8.98037812052042,10.345395268513066,11.64194868204914,17.23987565648986,19.478054917268402,17.61109361027092,9.507778251233372,17.46823933215445,8.953777515406042,5.861383707387824,0.6774835888501451,11.200277346800318,6.510694901099914,2.7473603796345136,6.027079411727838,17.93371828763929,0.267336011160344,10.442747255635222,13.872759916753656,5.713232349495785,2.4361929885066846,5.160602396528313,11.980125043317994,5.14128050667825,8.79964415636433,19.719911012248332,14.123517497859313,17.50227989975385,12.637132709677065,1.5824709727272035,7.419332081495087,9.433233283482725,2.6802120658696316,11.855322729494073,10.092173845255964,18.39299925939698,17.88884047877155,7.9253792770152165,12.890344933105506,19.536672916691728,12.573732905586091,8.385701471033752,13.292865444798437,0.8591207353586539,18.481864723890602,4.334754199566011,8.875590207363132,11.526185240189385,15.849347820809214,17.68810694819863,12.565687034600131,4.556989136409784,18.958262780216227,11.418252780709484,6.548920370847964,14.344231612991805,15.298801170068579,6.7003821849057,14.510568324635953,14.481546857775562,10.619402169371593,19.77071884967347,6.564286502779866,3.913951213800977,16.5431615434732,6.172372711210756,15.525908464934908,8.919352876467336,13.779672074102916,12.962696234818946,12.750938844027155,8.750773380962006,11.875748560712953,3.380238495993302,1.9681054102629192,13.916001278653445,19.386103791318412,17.494350776454283,10.48296743677116,10.526565139815368,2.3298038905194085,11.37417750535295,4.0808350650384995,7.468876483814451,7.6714506221808465,12.967671087570762,6.229828638267194,10.981844619586628,7.751017724234739,7.484079317286523,2.8190504638707115,0.007234304466448016,19.894380410622894,18.622614216887,2.9964234691513925,6.2754144287487,1.4991295311141561,18.801602727457993,9.535858145670236,1.1216823513723817,14.240044547727525,8.458094142659105,12.215335171086924,19.17921952393943,19.618535925042192,6.789334305591175,14.589529362085658,15.81328232454199,7.868117868429514,18.63999242733574,5.272734692183985,10.474988476188084,14.646813815434676,5.844063438201363,8.803347348073203,14.792143948646931,0.9791807904235306,14.866161025797853,18.979907809995456,11.996498445090204],"mu":[0.9142271188019939,0.7212120183501138,0.3421058424753882,0.9400540928505503,0.9710106560841567,0.24599648283401332,0.9931602517220064,0.3446720968693193,0.5313548443344467,0.860664970715662,0.25268338615722996,0.5309420397380209,0.8349938372612244,0.8483524390763151,0.5295785598535361,0.7277537971704278,0.35522100362953535,0.5069162138049972,0.24873476833458796,0.9155735896600656,0.0358509506979654,0.01093254163517332,0.6199655951405392,0.2946853249898087,0.1107640707439912,0.7194823116796154,0.06658082733042336,0.6214925150486603,0.45871526217046843,0.4669888300103229,0.8653218526863824,0.06442572188971751,0.9890190424168541,0.4820589714064909,0.930251618349818,0.5284441915700402,0.556910222245123,0.8421194238539991,0.45051966710614,0.3189482160912509,0.15501889342911235,0.3665061177375757,0.3711965546903344,0.910163387981233,0.15177159282099995,0.25956111169807206,0.09995832646291114,0.13301585129961424,0.29402605603541154,0.06599731197985559,0.9408672211483877,0.42436087377140574,0.3547672784650464,0.07810630719783829,0.709944761630473,0.10665691858590987,0.418455843440827,0.6432316160132325,0.27231589501686226,0.6783823745056077,0.7203620681319438,0.5868415288785014,0.8053737919882189,0.2886499005319909,0.9461427079244427,0.047918025703448386,0.681346391458143,0.8629178091762759,0.8189918536330105,0.1383192456247151,0.17692150016838326,0.7696887112329729,0.019994618471759207,0.8097493730746235,0.5933073633992834,0.8800221072762515,0.7724590188466383,0.5615196186573594,0.09563799203821421,0.3215686624317453,0.05525630273505877,0.07186296234653322,0.9908091341500385,0.4436818455356144,0.9978016324106127,0.800531239831137,0.5928235178327321,0.7941880001622268,0.8588734221044725,0.5351166512057819,0.8598242751812293,0.3274000067618634,0.04313857580215874,0.4637175847534043,0.3764876181125707,0.42022275233575646,0.7123104516490029,0.825178351909549,0.6030009666195844,0.8807872108849015,0.4377149545562691,0.709732520521464,0.7384447595266403,0.7306967728518516,0.36380134498307837,0.626756573701831,0.05147868656171317,0.08606353409559575,0.942108402156604,0.6774803146844903,0.9191697490431876,0.7801929588055094,0.1089046934715947,0.3007736542809829,0.05703972326932183,0.8890976481114645,0.9485714219334778,0.6609531006267417,0.5369999403089771,0.9658205942708264,0.9239225157058095,0.9869110535536083,0.20752151657175943,0.2371248853585728,0.29589271633194336,0.48426528749331643,0.7979783216685095,0.44537392672468923,0.4366174484108205,0.25985233032803956,0.6532536205778421,0.573006871016283,0.43047904421410155,0.8804359463783475,0.5770369239058528,0.19163048986340359,0.00241753485454832,0.7585259839867176,0.18211800657401822,0.6873182378852827,0.798483693621115,0.16129850349125463,0.18126016656249488,0.7672342223078361,0.16854588024886774,0.06159418153224472,0.1783762216205922,0.055793696572776996,0.29814615543108003,0.34316161346425744,0.605870242493552,0.9555694768115901,0.6430071909381607,0.7797334678298669,0.20096132868093353,0.30378816931984254,0.9712678770023397,0.3601285877339817,0.8133095033903346,0.5261222377914854,0.7186443889890135,0.77383385978399,0.2742440387759111,0.1487807655169875,0.676026477682065,0.18737855004873194,0.021701369756093714,0.4289149756555657,0.3156237290511683,0.7756161892510323,0.33351722688954655,0.6661750658918852,0.45739256459331057,0.15016164780667385,0.6134803490718237,0.37256483413625174,0.1013862596741193,0.49762906938074747,0.37140300808681315,0.6583935195620436,0.6375539444088898,0.5763129038402794,0.18493699926946938,0.9667434951728764,0.30900325513382976,0.5590149637190205,0.9060677168921532,0.20806549073791536,0.9438078458430708,0.814003333948448,0.9618659477789291,0.6085059529874133,0.01088015044542412,0.6785618680383787,0.6466165208111898,0.9243730785871977,0.5744060486941149,0.1571616626223986,0.2210359646122957,0.8676653674833714,0.1594522852369722,0.5453468553050635,0.002319954943583946,0.24677843398813337,0.3760880064011267,0.8123206991651817,0.05263149668628597,0.5892763731134094,0.025454387997239758,0.26852108419282517,0.7234368696162401,0.4438280338712186,0.7657708370878957,0.5992619650100444,0.7920773026566723,0.6734329948828524,0.04240114049899968,0.24997577823016592,0.9177183089627357,0.4323945291373832,0.5337644267965811,0.5623346488812677,0.38687967595822426,0.627367589882232,0.7163249280914106,0.9639721591849277,0.2221808061326609,0.8781491438903684,0.3962594329868101,0.04622310186895118,0.271546756995632,0.10029228193046769,0.9005971588860895,0.044491483903901674,0.7490076727320523,0.3841603658411059,0.04723332029060057,0.29619983741462064,0.5511828477803014,0.08800003268679202,0.7292575750042303,0.47204151464947364,0.4693214375406576,0.23327413405180364,0.9030453480055824,0.24613408851340335,0.1555799601090564,0.14735159233920792,0.27195254293102145,0.3520563916800701,0.1740461180158399,0.8661811469789098,0.15272221888610304,0.09123452934987974,0.060678783437164485,0.5009897896570341,0.6033693389659729,0.0806491076903677,0.02296300704628962,0.3629451807737649,0.7876066047309167,0.6988865338097319,0.5418015574530111,0.1704587500397856,0.5468186849888454,0.8842776233940017,0.008022401219826447,0.7904655018701274,0.0817860504622232,0.5200099810340786,0.24456223785305586,0.5331182368429559,0.9196565906907024,0.10680348018926167,0.18311278372802797,0.27688493234513856,0.4721740942064012,0.8481356470885115,0.7251644222138094,0.24859478220372067,0.07010183792010838,0.27106275461826024,0.1962190889934583,0.3595971999589467,0.34777929410912267,0.8199974943490098,0.8762147794317057,0.31829214644230297,0.9568943803991656,0.7106526836634584,0.03205493093561307,0.19056288381208786,0.48587028965790835,0.4167996196280819,0.4562088617358111,0.6195957642015439,0.6707459387368866,0.15657205414085706,0.185832094764383,0.364599647815645,0.9512303104737843,0.19241073431086875,0.141427301534913,0.13056731923556386,0.9566926327452674,0.31035607191071923,0.786152893989196,0.5255079166433028,0.8860989123450551,0.10752273110484789,0.9020728083199101,0.16902099778855617,0.45168851893028994,0.15836965651464396,0.39008112217814683,0.6125130923347604,0.019045800153111303,0.07621517552053558,0.38368263328139873,0.7936478320285223,0.3644722093083448,0.9630915914786353,0.09742774792220454,0.575937499439175,0.9226609581036704,0.7239695863137869,0.5171399389345259,0.09149991247453926,0.5426300588268398,0.8066430742743882,0.6983182852225602,0.7420141305660646,0.3026989643824387,0.45884524261489523,0.38010267909218864,0.8405677549420232,0.9084361629791957,0.20243469776373946,0.27113159338946113,0.7879795345446299,0.18509999038046532,0.30140596748264215,0.7963523109324413,0.7128475273821377,0.9112029232225278,0.6902109013560911,0.5439337750493141,0.9027232972354988,0.15817985139152202,0.3856966415228058,0.765308605007698,0.9304795192953801,0.07473608708214652,0.23366577374840536,0.2549000929081078,0.061648297166876365,0.47539914474140854,0.7360772764899355,0.9010223641658082,0.8462238265547484,0.8322959456199068,0.5618785219023328,0.900202660592005,0.8877673374397221,0.7583077279683201,0.1796538814890285,0.46824904763015085,0.0007846156432647078,0.4622967305368222,0.29594281414641754,0.6919509294646458,0.7979813950213135,0.20371304332932816,0.5738695322253482,0.29111967628034874,0.281613099959247,0.30980493323452607,0.4639586977221837,0.5279594666279959,0.09873421103378854,0.4214196437477489,0.8421847570726704,0.32866089345911953,0.1439866691371925,0.03195577233995284,0.4868656218292826,0.5090824998402279,0.2793337174852597,0.575394695382698,0.27264490772948835,0.0026956622510005968,0.5085349087199491,0.722486785525055,0.1935922381716486,0.7838700322166716,0.015261782324288875,0.4273374088953066,0.6430820542915845,0.760743544163635,0.23531298919932553,0.7002307015905234,0.4358779298873878,0.9031921223216204,0.5441333606265413,0.5053344139845848,0.523175425766149,0.4511782447663437,0.3785120196353442,0.2238324972343324,0.08056172456319466,0.40028870346216316,0.5543557778175681,0.9715484786343069,0.212562213669913,0.5716827865032201,0.4791607858632976,0.1413450656025561,0.5701881455507976,0.8411693768219377,0.3554220454640096,0.18631627895967728,0.6233170718765848,0.4992547144314845,0.7334487944641512,0.6619865782161527,0.3777167997448454,0.7619405877576144,0.6322825935127447,0.27364771874996796,0.5399444053871387,0.7067331533813783,0.1257332676424936,0.32953804838116807,0.6178542983630089,0.45116021251877036,0.5664833976453763,0.870007919837029,0.44624658474152,0.619764774932646,0.7416244425139185,0.9878717403018578,0.47891438235296224,0.26006994774691394,0.6572776407240888,0.5248756752808967,0.8471871774458763,0.8234021316435114,0.9886593491835294,0.8174326495388278,0.9143955427566322,0.01718615531823664,0.4216323617605171,0.42608981140571633,0.7365297860541598,0.023303457329650445,0.2245144516136368,0.26114949220874006,0.08507781559588734,0.7742220714168739,0.6021022071973903,0.38495042640256893,0.10543858725546462,0.031879542360027546,0.5854672597092587,0.9568580339312678,0.47815591900651655,0.04441106718447552,0.7710195405093418,0.45956380908441696,0.6369104981536777,0.4142877932232676,0.44917641408409437,0.8306690423921834,0.5362570057417522,0.39470346647593413,0.49917512531077524,0.3831992648064946,0.5387766905576865,0.6807195946494735,0.7503055632398856,0.38596516682331905,0.5866019289829179,0.7793119399316935,0.2946800229794493,0.006501733484423733,0.08295311675925077,0.9963359371669405,0.14046291882603912,0.6313135031092185,0.45167247765385987,0.39165191919666564,0.0237922785884066,0.5554068781259653,0.5427806712734473,0.8342224298476275,0.9607997105103467,0.8016888244037035,0.3399397003647857,0.8832891780495016,0.279621378692281,0.09915171157085867,0.794670573239147,0.21977698567041348,0.11791435065692024,0.8414602568946883,0.4959728567207342,0.820342420714643,0.7540443938467256,0.8326331493603798,0.2973187366817509,0.7018704027516016,0.76240705633141,0.7387930971536776,0.4064136179431692,0.7588698389277626,0.7718427589060657,0.8276487228809817,0.7969985881419486,0.23220077496193037,0.6870227672031579,0.9959788715548574,0.9944263816211221,0.15765542294676815,0.8096843035276753,0.708433420628988,0.8827281560997107,0.9980908785716376,0.33925978321635886,0.5116762601279847,0.3474306521757409,0.4321805578197222,0.473277698651998,0.18032034068857938,0.7162008818159524,0.7539933326362172,0.7227309657686971,0.9338884274260144,0.592614270857408,0.9083729616005416,0.4831874101695235,0.17302379159235137,0.532126698578741,0.7165608999694177,0.9998823075490113,0.3747927461349003,0.5674934931117253,0.34881573162320123,0.2673151668759035,0.2505391831103132,0.3581120398291584,0.686496540724592,0.7717482200197068,0.25316692047779377,0.8958531902476394,0.9029524274214387,0.46677194523443344,0.21199123295310263,0.26187668722332713,0.46706362250224176,0.11871934278396101,0.6173828735087883,0.41094162597355455,0.2566125192686268,0.40702160995059744,0.4616207790210818,0.28347447552325544,0.39339360138697743,0.0770857561384446,0.36092790954065856,0.2825666495079613,0.7238651045848585,0.9724580614843377,0.07344591670268685,0.04549458885697866,0.5248601123267214,0.6684893073656542,0.835037402891722,0.5133226416441574,0.5048690886539011,0.4050025668930566,0.4632790473170296,0.7262740146952766,0.6729570250553536,0.24486749150269782,0.7184455806874226,0.46957934541029034,0.20067442028501126,0.8411896715207696,0.7509309982023784,0.5809398016900431,0.0004920233431791043,0.22348534951192156,0.8175624469211655,0.2248582784250539,0.9221536545859186,0.47813660609593245,0.8696299336676969,0.29977887713713147,0.7523618770315308,0.6889649333837253,0.9959713738530498,0.6719652997183267,0.07471889326356562,0.6301679450454043,0.6692654635472066,0.6339348642150424,0.29084506756191697,0.765687310855981,0.8600163969496637,0.7325271680372993,0.3475430709109377,0.6999800517135306,0.27656705902164,0.4190504024253445,0.40785839964267967,0.11768304108025096,0.7345976902983191,0.9292653346309852,0.3815203245372911,0.6884113058919126,0.5029565362479862,0.9671800541029132,0.1178745228442104,0.7933958714580855,0.5382664167007645,0.15389463924969227,0.738069557711897,0.6596643391333212,0.9010374072827299,0.051415616516620855,0.04622839601452022,0.608795557605776,0.8118254523497193,0.7394819360394456,0.17434348843622316,0.7080687027304438,0.8260455541656524,0.39321318431132024,0.1664504796477022,0.42912300651646795,0.9010326179935619,0.41325149909665226,0.7362003825587413,0.49387229722895043,0.014006735283319083,0.884494607042912,0.38129692730353804,0.3369287611916505,0.7175085515577821,0.5445267775598417,0.3536109016954434,0.5019927986634676,0.018366666971089796,0.7574238006951786,0.3644806855262339,0.08758230242043763,0.7818711275716859,0.9912731308152809,0.9944150308018334,0.9434358274205388,0.5470351618020091,0.6568974145954027,0.5581726429890481,0.9236385721068676,0.16275394149190348,0.7449150301027145,0.07385239236227381,0.49912259819637295,0.654004344880972,0.4251470330780407,0.0689668233128431,0.27327966860558783,0.9688840971614165,0.4633995905662367,0.31785676204213,0.7050886734870909,0.22629966365489773,0.8029342522101546,0.38547548049729463,0.5605830197594188,0.880542396108758,0.684430707864786,0.7805115826636286,0.2371562809434835,0.808673469129314,0.11558157235523803,0.9473902768221905,0.5753137675960056,0.46434302306140607,0.5187037196752591,0.13689803715492688,0.5092381624423146,0.4362277319054755,0.4587010118364794,0.6529354988875542,0.1458908151968641,0.8040655781365746,0.04642391868838125,0.6853408768045484,0.9938131418649638,0.8994101412819373,0.23132566113626574,0.13212108386010324,0.14953144068373603,0.4794436155591637,0.26661173143528116,0.7003233634182913,0.7068600129770062,0.2720900047219681,0.38087820948913076,0.20426650619016784,0.39476506746586026,0.9972843463796834,0.5932302320473313,0.314867293640567,0.3369914417474913,0.5734854457579017,0.919188859378069,0.2197410674594218,0.5994042929199053,0.510814996522158,0.23304306644757333,0.16058469569915368,0.1198804837668015,0.405412719333331,0.23157341553156496,0.34008999518755956,0.6126575313893474,0.011720352382993848,0.33377039194777813,0.15597093953636332,0.04601352228760214,0.8837775500777483,0.4872543651621102,0.15739817749336327,0.3036723981546676,0.7699782254650676,0.15246396884457725,0.7515385381736011,0.2433888459416369,0.34357735256122357,0.40216162267211186,0.1077571061109599,0.8754590570137804,0.266406955110837,0.3707052445947152,0.6510445081154523,0.6264863818875401,0.3864880462850211,0.6337542151371025,0.7763903672130177,0.5741461022512249,0.3768113722815236,0.7955457677106279,0.7206440632125826,0.2363077543045926,0.3916549038327781,0.789876101785729,0.31744704871348306,0.9916737399518594,0.023880899778854214,0.7876554240498008,0.0742289820157771,0.17579186694167714,0.10824742780859631,0.02571810705902955,0.9256164202782167,0.8707462692619683,0.7866538691899672,0.7349808289197484,0.9908808795127642,0.5842778289702364,0.22460707436873673,0.023136745341916676,0.3772063240647523,0.6244231331388641,0.9552088574880382,0.46991094755078966,0.12040448493563627,0.038793476077639166,0.22815742298419361,0.881855168592941,0.03736617884471727,0.3868017249564597,0.4747155214183232,0.002127885859509071,0.057266652148436625,0.738769582489061,0.5047176333836996,0.6901740722525138,0.0939698682584944,0.47613483731878214,0.17652175119798375,0.1790318513258793,0.5955667098292949,0.5082060610941921,0.9322939649870836,0.6266569150870562,0.5697404060369025,0.30982028406963025,0.1548622450238213,0.29735526951341273,0.33674183235557753,0.7977221639253862,0.23330372046303594,0.058722116695403725,0.048433678815918535,0.1357340814901058,0.5905990753275536,0.6703589594078916,0.927944306532551,0.40519723467125845,0.4316850643444361,0.49247223369705684,0.6832447735687643,0.06898850290825864,0.6453857776617056,0.015249051040366668,0.01870126304885411,0.9621966336550207,0.3854945705512032,0.08159753685297999,0.28532704227656924,0.427326760035589,0.016119073225251412,0.7470338594992318,0.8757146565985754,0.4254787035417016,0.12946782662388423,0.6812468359099673,0.6479685339009957,0.5997405320709528,0.6363118969503492,0.9796427490691193,0.42967659334382047,0.5651231965785022,0.17075100198065418,0.3939287101578104,0.8321979206715517,0.3347569627576603,0.2133064720108535,0.2704420729725878,0.9912999430082856,0.5504608694885011,0.31615675566448087,0.3827202832796923,0.589597884907137,0.7616692693347942,0.38088107473336597,0.9154965379184847,0.08481304982671123,0.19860596196533864,0.4549812032626295,0.5491627787989068,0.670208248081017,0.9477481819795877,0.10558867045203835,0.6002925414526759,0.24285957673422276,0.2831424452987146,0.19557656509222987,0.9996126198235333,0.6783035361546474,0.6062334091110368,0.37673049384291923,0.4754440148960899,0.25399461925878963,0.41636361113084974,0.2671176090628975,0.39666203227287267,0.7669633724529219,0.11342213269108226,0.31798366983168824,0.5079714713682233,0.6443135619806823,0.9994706860664031,0.7646296008579732,0.2029945827834383,0.0938659036346643,0.3533795820293777,0.3927722320291527,0.8732852157277429,0.6155227355626185,0.7729971814371952,0.21636456436620666,0.6270665603645313,0.9270862274420861,0.7184838210594264,0.450776607019175,0.13055266597781134,0.7233865034981168,0.7162566963231607,0.6356701365221153,0.12116449465712087,0.05398809261429549,0.5456662101138456,0.48320738720198286,0.5985532572549968,0.5830005890717775,0.5179878864650194,0.968796454761403,0.6425236461006325,0.6486669823408944,0.3553135804115224,0.7015725590604245,0.6603002086110703,0.15822061732359316,0.37939904733676366,0.8137110786740804,0.07365991649657855,0.7276238067762029,0.1282560867683984,0.4069158389487373,0.5142698267830834,0.7308323104365149,0.19736033854227752,0.15654697762996328,0.7036677294851252,0.81973728912711,0.2971843376238006,0.5747459314831886,0.187909566115539,0.7376661484605018,0.05941707057065804,0.8985401215391555,0.37238863686820434,0.5181163351951268,0.8220888579748176,0.9227837929479248,0.8045835820736684,0.16914791570695464,0.3215017596786789,0.5027179873460865,0.5639576333941305,0.48498423658322,0.1506752837905394,0.6521502371748937,0.4690223049513613,0.13467811820329278,0.4264000069394067,0.6402009687787198,0.6524654186640184,0.3408654583645383,0.5304402742015157,0.40332703694267225,0.6990534737616416,0.14330586085303554,0.4645225206784416,0.8886666193337602,0.13451978338301362,0.17583122934291096,0.6306499497631637,0.5174846639645063,0.6964088570704947,0.9767030365234743,0.5027833965493145,0.5170770416646799,0.7677353133656852,0.8027645977397695,0.5793423779518763,0.9562695310153813,0.983193306468801,0.41272480076784834,0.974727808209888,0.8181360305392293,0.9323873517216485,0.553410691061168,0.6086393529429956,0.601004595047893,0.6627734250024038,0.5822390371402326,0.38761904525618496,0.9041031637285908,0.6306978570644668,0.8869599697361201,0.6081572418141128,0.10671885165639261,0.5271984302981327,0.42504470112798254,0.17248997148023748,0.05286698640882337,0.367852094643226,0.9738529163752268,0.391196448971763,0.3612574960449746,0.6866182001901733,0.5025078421738014,0.6045026330615373,0.6097600692493228,0.30586748793326346,0.30519180828848924,0.29452042387374155,0.49537478915226085,0.1510405901870333,0.053057021338171806,0.023025882263125963,0.14062066603976153,0.7953862174102897,0.6084984856139939,0.6857237958364073]}

},{}],122:[function(require,module,exports){
module.exports={"sigma":[3.9966024088655603,1.0463040501952936,2.870732005318283,0.34111223653351286,1.8638413616251615,3.212062045787726,4.411717112894716,4.191366609526882,2.2962377100741236,2.67533822548382,3.991707293924145,1.066724467687341,1.5756159731476171,2.6677337930263834,3.4432070599317175,0.8990932594298184,1.0792878287589547,4.578133291209614,4.509439601472152,2.09947405835608,1.1386284282991366,2.094845140797368,0.2839036534792194,1.812288102539592,3.545319944807167,4.1971661941536285,3.1698466233952525,2.5207499641508733,1.7195499256677893,1.7200015701493543,4.186261850485194,2.9006870428941167,1.6883314089464863,2.7938827838371916,2.844411206899995,2.263892675978838,4.891935668913224,3.7507205286523293,0.12763104873183218,0.7454202280047073,1.008271467080759,2.9689668183969378,0.9592171935011229,3.7055912771980015,2.9138591796280577,1.834061530371539,0.19800512446569218,3.8024051758761424,0.5467652901750253,1.1731058402975414,0.44314807267203715,1.4465711879462728,3.8768898880258753,2.868009228986618,0.7752664228374972,2.5874164873619296,1.6820281471309972,3.8341743544703686,2.7823999192140625,2.3285758900605202,4.897815220984806,4.474596722966414,0.5049628987395516,1.3781883804920803,2.454330608969626,4.757606887739429,1.9663088105465565,0.6818268385599746,1.976190289076818,2.87460876861339,1.7391883055947077,3.0183870172428073,3.5916582165708744,4.29731750630817,0.040553480625786786,0.9349008317518304,4.243188274798144,0.2084885717996421,1.6363002298654616,1.6973150506204016,3.1143396137939483,2.8255257020769253,2.25163549290075,3.659029937175262,2.8515639761084897,3.1052797160215895,4.722474376674189,0.8025121395493129,4.888841897279754,0.7334190211100045,1.920903448317981,1.7808637899650137,0.44581531794164686,3.4086154616586306,3.404321533316488,3.275907950818835,1.8359013833253623,4.821056276556179,0.7810747683126107,4.828336483354207,0.34596663060902366,3.848075997444398,0.39337414857177677,4.122761504389578,3.298912393803789,2.2924559143356738,2.9126962543628645,2.3189492389735324,4.144300659602981,1.3946126191402264,1.4683432923376039,1.1184532094612654,4.086951566211688,3.031213053404509,0.34102271336047263,1.4708044519565533,3.2479210754638377,4.189999606220464,2.3485955592045746,1.416182033713278,0.9721544420543804,4.852893390969718,1.3282106209002897,3.0691290734394725,0.643161507577642,3.602057918587107,1.9916329516838427,1.4733662946548765,4.3830393984371145,3.9816353043962724,2.5303765432116654,4.516448387964673,3.4092147080704596,3.05932820292501,3.5357075830349807,1.0917121920324746,2.6905255342383194,3.755165368164539,1.3512248933566429,3.340632993848205,1.1903980342576248,4.58885670495171,1.3790111407171246,4.695681018350399,0.29681117671133017,1.954769879452668,3.1424354436956747,4.59297569753793,3.989120644449203,2.092633839843425,1.523974820598949,1.6766073615725618,0.2907486013156313,4.83410164843197,0.09604163249728348,1.637395117513899,3.1938017150466336,1.733716364249397,4.995460958552646,0.7069242756489036,0.8560418717396057,3.255219554346599,1.3691856918682133,1.9215402217891264,2.5099161362566393,2.52078322381926,0.8459454209659489,1.5175232557562601,2.732878389871783,4.93475462800785,3.7521390210182917,1.2891934774146707,1.5527779869073899,0.24185533885446087,3.433474880414835,0.06805148896662394,2.838087444672973,3.6398188513458662,0.6690027850943325,2.56678952237925,3.1689048729286906,0.9973413575904344,1.0791787173356393,1.6237600617986447,4.757371875045905,1.9261539315524168,2.497941100347072,2.959505559325523,0.3092956962882387,3.191940719368537,2.7905084868495935,0.3123035514222128,1.8096031424451453,4.592686666773805,4.903850232533013,1.290897815413945,3.444947834665978,1.386836997970431,0.2645810053303044,1.9814180459830477,2.778517533695868,2.748135773941333,2.0416978250307705,0.1386486407402332,2.309637439398766,4.527269643735456,0.6905002129592819,2.2486668996607717,2.930434356333329,4.509415647652208,0.18736877423619847,3.767325248533374,2.611479571126545,0.3281224615038192,2.8008897286500822,4.958510286449611,2.8708668088386613,2.486726004184426,3.446814913928149,2.247146483484268,4.90834244600621,0.2045031764156524,4.0153578582553315,3.2376990069320777,0.40340821313828545,1.185032145640934,0.8751020699872447,1.53792486108689,3.4189252974316044,4.082412221865388,1.6594184167990589,2.9524247416768845,1.2489228301499011,1.8243460994190708,4.604270017381454,0.1899957396643892,0.9226690218781031,3.663073389141389,2.120123650186181,0.2831516115452881,3.5689998411204837,3.3206374332163726,3.371801806099448,0.565786459321238,3.571761042883029,2.414501345069989,1.8776419356216567,3.749006872269497,4.882983162963377,2.32327524396211,4.509693186996751,1.6896381064812704,4.746274469160036,4.992444894729249,1.1964414673711954,3.770409962456495,4.36863587850771,0.3055194306494968,0.10725925757372079,1.050650315196343,2.1670880725506434,2.8855358978539414,1.2565275541720633,0.34256309938628937,0.11111868566766936,1.108517824515961,4.507342619010131,0.15775904442181576,1.2090574260537335,1.1887174343007534,0.27444224211157997,4.390871915518718,3.043690779751962,1.5144640835486767,1.8966326571096026,4.247416133056724,2.988708079772804,2.6581495955370738,0.06002555556595679,0.29231452787080836,0.2967936445793684,1.953147206743343,4.1166620004732195,2.1817655428201963,2.7504284042051843,3.573537159659864,4.411714610316972,0.2664159009866651,1.2395333133301656,2.254837227368227,4.901461017776953,3.2435773145359525,4.650986334937777,3.8373851967493247,2.560389786797214,0.4651261743315904,3.0353572527850536,1.7482473539242194,3.6206739989803394,0.8989954702857339,4.462168924370605,2.6767284172523818,1.1545525547774216,2.865827948182791,0.3187241801346963,3.9107872029218194,1.4114847232454597,0.7640335875271465,2.05918927943339,2.457173703108928,2.648077866118462,1.224278134918878,3.1321863371879077,0.7439719589322846,3.1287316395427824,2.917480717460789,3.8951668906488326,4.5894315215032915,2.558953801831789,1.5396814847021034,3.7303254102280423,2.225001949391938,0.9798385917609986,1.6973965457923645,0.13287710911532025,0.3187871284633459,1.567251135611446,3.588464748550577,0.3265328031365389,3.516592706776197,4.406036513443018,1.6439091877173273,0.506413601588831,0.1729296123717372,1.8133498414725013,1.5479150659767804,2.374400545421065,2.447582914719757,0.26201061195326725,3.5134216767756286,4.140498898024299,2.1722563051335975,3.355169363286489,4.694612847881397,3.7310960685674877,0.527661068727624,2.3034729466781956,4.170039798364567,4.835882973921258,0.7344445600140681,4.869491564447842,2.940241201298469,0.3141834067484761,0.3293273971635813,0.5852327301618077,0.8270601801537647,2.173018034656573,1.6786052359257342,3.4562678818644232,0.052134051890772026,4.819049903340982,4.106167899990809,3.0624109872816287,1.6137324158096178,0.0954013291755329,0.2067629102331403,2.9779036911938572,4.6049515336357665,4.140543750661553,2.1459827843620296,4.605742371001024,4.432952311402434,1.2135122599160897,0.35958019991283785,0.555379323923979,1.8296780590291628,3.125682783660099,0.6369615664167849,0.36253639953935823,3.9204147418610313,0.8280063937519067,2.256123460896393,0.3868742092357491,2.5275849155816035,2.5743233243565635,1.9219324569606522,2.201625756956634,1.8902229177773855,1.3639683682543347,4.39133393830919,2.1327192643274504,2.1635868394033944,0.5894712353942033,4.760140120949683,2.5735910423677777,2.3561267582234766,3.9434553919062476,2.656254032401791,0.12184893079286718,4.021175600043509,1.8179416239947932,0.8565302012879794,3.572698197959455,0.9425850324385965,4.047492293724621,3.9053916221855056,3.8733507113335164,2.2140001572405588,4.6101466396117186,0.10439102838510128,4.9438416755315595,0.20185390985821727,4.446436797670393,3.555142737453365,4.695599104570064,0.22517841144570894,1.5764640524218598,1.1040810210504681,3.111041811416376,0.7681650304465149,0.4722793113927992,2.9884313983058677,4.694404208169248,3.2861978215231344,0.49085527522627515,1.3354808326373213,3.7088428265817788,0.8432731065987487,1.9479702053299996,3.4840320189398923,3.135703271960807,3.1617668246209965,3.172303026204879,1.597531825091194,4.120835602415564,3.2452321383122285,2.6322035076805186,2.802927963455226,2.388248128735629,0.3789376380927101,2.4769947052286545,4.483980305990598,1.6619874993940298,0.011334034029344409,3.1204593062459307,3.047617525211482,0.14856120984651944,4.6920831967080145,4.863081562432057,0.09023171429520582,4.4051706389056555,2.8804159868439525,1.439575924075246,4.70475822853601,2.8194049625357733,3.7488275211540834,3.659180151889372,4.500756939596414,0.29105251534848,4.276081203251874,1.1625483971780748,3.0890195180726443,4.1641903280679005,0.7697130396717133,3.3704150743670205,2.665802521555347,4.321187299454813,4.697723878962252,1.7733725369854725,1.585237624034569,1.046335800806456,1.0828105902902752,2.9062606907805555,0.9208435453515262,4.182774771324683,2.9787039960648376,3.5664079269203075,4.540346528887261,1.7890175352804016,3.209162348885355,3.2070867071831533,3.3645182837292387,1.3103201993504243,3.008404715847872,1.5995505825315603,2.5603767285698376,0.6627527441502157,2.8866870066468753,1.3221038655109618,2.5426328970372025,3.104848916088195,2.3657523126591053,1.6731754666618026,4.259544765394248,1.1007215027780082,1.8592920904021804,0.07849392754515905,3.9154127272072548,2.561469232124357,0.6062351360439788,4.017034406216328,4.0653166265841945,2.336031383297017,4.620531894902405,0.1724310065192447,1.6950459245727578,1.2872139593119558,3.103402185452022,4.711589029100887,0.6678736336751068,4.397624162524374,0.0024443236372828636,3.9601763509077728,3.442038859958342,3.9558337911645483,2.863283458855764,0.9569894221059205,3.484642778563151,3.8721578395916745,4.846965440394612,3.503056347212233,1.4454103180100752,0.5457361574509589,1.4563756961754404,2.443628678688162,4.92034439997402,4.785935098369477,1.8242838732641253,0.6462706207954161,2.910419581350973,4.873636973823997,4.945119799458589,1.7409294815423326,2.0419448504480453,3.357124096779204,1.7181203039616877,0.9121488030651159,0.6777283159407299,0.6590234671861739,3.662319714627319,0.6820010603675875,1.9506491027745287,3.5568412018949447,0.7457209591787806,2.0492222924104473,2.7198779118959493,0.6016493390360778,3.1677520715460137,3.1506077788170064,2.5347804333146895,2.1183936966665806,4.0812899100456494,0.4555543957836339,3.8129722919163966,2.020843232197378,2.281566839106733,4.473725450347152,4.421116672125378,0.07438461363640125,2.6798085159101626,1.2726229343625628,4.148580588644135,4.092534301741324,2.12915033351155,2.785350206018602,1.3120972027537925,4.832983254483889,0.7701918562768284,2.5468811831579963,4.833079765748587,0.7543328250762327,3.2643055887026096,4.758242223518413,0.958260157503541,4.003015452735358,1.0546646312394026,2.5467247389399574,1.6346616674718883,1.155361081879629,3.634036588301325,4.735525077157123,0.4211342883804736,0.4153918535903811,2.5574676666552207,0.4616964870643492,4.615615254425839,3.827540124186588,1.6556904487757584,0.5365934572909337,4.862248807296861,4.899918284727515,3.211985314789577,2.475377026435459,1.1606018754762337,3.170648398650532,4.351610250847717,0.0047536093103428545,4.876605637006338,1.8932384615259257,4.763500916234669,2.126016411947149,2.3292201869562756,2.760377983332395,0.642846041549936,3.7572501370938385,4.9660389462841845,4.088341320608384,4.663267182040363,4.811743042668657,3.5476859221656087,1.7844420245888393,4.875091472385861,1.8326481877170664,0.40429260308890047,3.1254256764224886,4.7476774798493,3.5806923633850287,3.1738874510100565,3.172910129912246,3.690113034130571,1.3116976448857764,1.5199192424909058,2.7211040628130156,1.5294329861132594,0.7351829065770821,0.48044149843120887,2.6006989932526894,3.9061967650272833,1.4256496577240985,0.8981332628246808,1.9788931416934685,3.941140385902427,2.418875507441202,3.671650372328866,4.726887180219894,2.271554321276026,1.3677229575957672,1.9952014318586941,3.216976878476517,3.9162435439918433,4.240766637617708,4.371830086394034,4.3468897214604985,2.325154190397268,3.791197008078538,1.0663323442424522,4.513185924938837,4.078349619602557,1.505382539175869,1.5967910369726235,2.5844197306082695,0.8523618209828943,2.090965173703702,0.14319931191047797,1.3337282877329393,2.4733571891208705,0.1033729307020026,2.550191893744087,0.3334035520054168,1.065944278758073,3.6472210106330283,0.4162335553901131,2.7884140660418066,1.9406960414461294,1.9588557530419115,3.1752371696557855,2.5146874051576784,3.921289589898289,4.431936805452434,4.096747439519623,3.6012536146191163,0.17565495843461232,4.137823787970747,3.3617762727143363,0.6447822965244177,1.9067109674477556,0.5190348126071531,2.7812190021546868,1.2397991051327673,3.2028182879154454,2.3230510678724627,2.634443571127246,3.753348257740481,2.5741989339510707,0.018397769454370216,3.0315162004064966,4.766282628202979,4.536206013923628,4.541609880359919,0.5278673982026061,2.0476779322314176,3.241384997379857,3.230468580457778,0.5583876007525446,3.613948123064845,0.5502987005008431,1.7123945421983922,3.27984181328685,0.9189833673825432,0.5161282122303523,1.1004973140951146,3.2976043939829305,3.916182394741967,0.4276962260289374,2.0812884250904915,0.5861302476151553,1.8950605655296193,2.3277987283943946,1.5021285921571204,1.3341799881923289,4.157083707492194,2.4190973206755406,1.1665259651658066,2.1276148729080866,1.3652095900666683,3.083930870610737,0.2924098929931396,3.2963030421943227,1.2985472858314528,2.7014264035341604,0.40320369964496283,1.5316040730253078,0.5167595840847183,1.184267718012667,1.671476292695666,4.607959639128937,3.4790432370381277,2.0536092548327964,4.456290468097577,0.19969207481039253,4.68327552616085,2.7655823762100065,2.2327223243697683,1.061597742465783,3.541180444270624,3.8456582853330614,2.37256335099714,1.5970892899993094,0.8671287869914235,4.540757081942621,4.1887893484860825,3.8338371793220083,1.7850128074235494,1.7067104134275746,0.5499398793929822,2.144510927896989,3.674583206104989,0.22086858556798372,3.5077272941422075,4.930490709830831,3.197714560301168,2.658430217673028,2.214988666422281,0.38078481220650606,1.0791564133677123,3.0366455260490266,3.3695108159484874,3.81079660984044,2.4379576743850806,4.066429708280665,0.32995749089727133,1.5666606008278838,2.138006430146435,1.7970196342146616,0.5050450084415503,2.6167708139044743,4.466244366754321,2.289018611916048,4.747555645544624,0.20059614101774925,0.4509986637528829,0.7730445054677471,2.0486576866109973,0.1564208711190218,0.3743582532217715,3.210511228525328,2.0892582641614323,2.7071997849467753,3.985469084993732,1.876614151332755,4.77630793693046,4.9101572710261046,2.4047638425703823,1.3201797925583536,0.982018262855745,4.78338043045185,0.3014700378509272,0.33526409522547596,4.365638878606842,1.6137494417748333,2.6669183996937953,0.5135509780823311,1.0877536857932402,0.8696856867818548,3.5654064113527575,0.8731647397695463,0.5777333444521315,1.261499464978565,3.3339252582959142,4.766604649049504,2.147234662528944,3.191981952122015,2.0907883433789696,4.083686099739121,2.8370895518288517,0.19571958299668624,2.227584090915966,3.3392154429808496,3.735009029736478,0.954344259372164,0.40337057690320033,1.3832638948185794,0.8264027265270912,3.165583463517132,0.7100165273232495,1.2969851983026859,3.5791514498753587,4.422291708861058,2.394214299394518,0.966107333871844,1.171343874787536,1.0469248830959332,3.3513821944300592,2.2913305825671926,4.453946090325439,2.6176003478175014,2.990478808175727,3.13865350497456,4.641689825638378,0.48118211237197395,4.351790257061649,4.293513972259079,0.43010048235663567,0.07990641561478329,3.533248826666976,3.1287784508419616,1.3014971245221307,2.2957115384897397,1.7800412463947168,1.5735102796827938,2.8621660175437857,1.586490124694434,2.7418863535564597,1.341134020398893,0.713113212567521,4.817243772041667,1.8985399269243275,4.293577935944865,0.385374071283493,3.758864084243955,4.264286759731491,2.4621647374552023,0.2309212043817077,2.3502452656251216,1.9877574114382057,3.243643582518537,1.6269196757416848,2.9735961122638233,0.4567492992048139,2.5855858575755586,3.7013322672935534,1.5217285455932716,3.4010262266671107,3.6932834950949855,3.8672923821853056,4.360071955042408,4.220421947252645,4.5173792620629225,0.9332270102266571,4.269988099448929,1.0144605822335784,0.10692123488723726,0.45639401568704496,1.1551989416826824,0.45332000708091735,4.097178709341715,0.7449629742847652,4.66150117837069,3.644681359219656,2.632302340897401,3.8044056082375386,4.499231196247107,3.421940532370261,3.3106541660484923,2.648749122379497,2.0492945595658885,3.0009018812314228,0.08334853318702096,1.3692668243415829,1.0887346181551127,4.057086477326017,1.6378346187157944,4.576105968043263,0.2593892037278167,0.8167719796921391,4.708021961352945,2.6679321321232727,2.9329307599913146,3.0862222920698743,0.8168285539882991,1.6264148723507899,2.2422841371767923,3.873437252014061,4.20713005129919,2.246272947036406,3.0690698803493333,2.5406151617311536,3.883539078743489,4.118922359358352,2.336809329113766,4.267995740183461,4.540456884567109,4.593440979258957,0.9268451323230864,0.11340755888038845,2.099798197855404,1.91649206555631,3.7247781049346096,3.7607815657617074,3.2306011842781746,2.2648752076305723,3.073657071585978,2.6692573058811053,4.73325628278221,3.5040657521261553,3.4220035266149185,4.62531796576081,4.126373531034209,3.936567067756498,2.1896393309571383,0.7506628601688414,4.715071680871777,4.880320890277789,1.6050171948561587,1.6719487925055265,2.9569861280438268,2.7171577707391537,1.3699471284889997,0.606121733566396,2.118318168088055,0.10717956890295754,3.992849646701837,4.480011141478391,4.823094269911369,4.012867878539677,0.052882883395842795,0.42085195649328,3.45006781387497,1.5670983110447834,0.3604773690300922,3.701401042673904,3.0613135162370764,0.06887272082427565,0.08955647166088654,0.811145229889767,2.665486312089768,0.8684175979859821,4.884926634446028,1.2798679320393502,1.2304161777366829,1.073385675426991,0.4324173071274662,0.15564757372151683,3.509747541252085,3.6088055751786188,0.9334780735269321,0.37307600854028733,1.1685251400079222,1.5854788002453801,0.6053098012369296,0.8828489106727255,4.58319962221148,3.4839430715275546,2.512976775334753,3.1176297677077924,2.0235612958407145,1.5983574543375223,3.11326315256641,3.91428014809023,2.5659764098064275,3.032889767643331,3.0762389974978177,1.743354365001173,4.715508923790538,0.979377009291239,3.9893726823024513,3.712167035037112,4.159594212358108,3.5822346030759036,1.1315636974122945,0.489926803894013,4.799536055306484,1.49344900985652,2.835672968611159,1.844493416756432,4.4462481937555856,1.2165489367431248,1.604554872528946,4.591094026536578,3.0341469080818086],"expected":[0.8850575273110481,0.9999999999999997,0.9999876992786936,0.9999997841308994,0.9998929717638502,0.6741584347945005,0.9162694713681591,0.9936541743639019,0.9634189895278475,0.8336649286414068,0.8108825854816523,0.9999999696118576,0.9999999060899226,0.9965187664245927,0.9845538006386906,0.999912063870664,0.9999999698615836,0.9958254683283666,0.657560776560048,0.9999421309768979,1.0,0.9953739551567345,1.0,0.7030202495502498,0.9977685199016237,0.8249633497597386,0.9712523315869293,0.9737301306593344,0.9999678774662338,0.5357951287624693,0.9972150307552504,0.9961060412966907,0.9997667110744861,0.9999541837742033,0.8935743247174357,0.9976131241886095,0.7690510701835815,0.9775768374322729,1.0,1.0,0.9999999753385929,0.8701369859041075,0.9999999998035902,0.9193626754191511,0.8367912493275131,0.9718628981939805,1.0,0.9842328596914413,1.0,0.9966284314668441,0.9999999766877703,0.9998708245733525,0.9967248303096895,0.999424977898173,1.0,0.9999987914058523,0.9996772469618802,0.9829820785885298,0.9959478629940737,0.9522845099105801,0.9685315975688542,0.9942058689254788,1.0,0.9998643688424743,0.9997677495837547,0.9123133405908539,0.9999589521798284,1.0,0.9999999405216247,0.992878615595044,0.9999587854651711,0.9994471893082242,0.8817071202538294,0.9584664472097568,1.0,0.9999989495449739,0.7784167386459873,1.0,0.9996191824274541,0.9999767781072854,0.9985489736992794,0.9997516472032981,0.9999999212618764,0.7436723944801259,0.9971988642205556,0.8245850699432502,0.9862914647142764,1.0,0.8811626963589532,1.0,0.9999974693272083,0.952490113689383,1.0,0.9763102646747985,0.8596123194776841,0.8141989744791516,0.8908524627128851,0.9785206247521383,1.0,0.7961188580546057,1.0,0.9892888083527587,1.0,0.9804286301569913,0.9997251926990817,0.9999685503612059,0.9775808902842293,0.9999743190559884,0.9740863542672467,0.9999997150955391,0.9929754024804116,0.9999999056399735,0.8040260146836443,0.9993163364024773,1.0,0.9996648108953041,0.9820143545088569,0.828355907554791,0.9997416124659608,0.8778111915343547,1.0,0.7521326418484408,0.8131699189906054,0.49509043551259063,1.0,0.9968220941652441,0.9999570717846666,0.9999999999999913,0.9399742297229843,0.9587139633336651,0.8776477776342739,0.8900371642354747,0.972870495702731,0.9974426109759916,0.9994404105023499,1.0,0.9080370685501213,0.9977854435632327,1.0,0.8296566565437911,0.9999997220896124,0.8622683571320269,0.9818709353291919,0.9635369276486792,1.0,0.9999945709037029,0.9857973068141366,0.9909534126478271,0.9959251252499717,0.9802841333333526,0.9812409641378889,0.9999999999687699,1.0,0.7481116580353735,1.0,0.9902113253533243,0.998960903021673,0.9999999999523461,0.8951267286539134,0.999383068203835,0.9999999999998082,0.8994333111184706,0.9999998694018047,0.9999999998657503,0.9999605922451532,0.993393303642811,1.0,0.9998460888826276,0.6092203426487179,0.8941109255293688,0.513226038204764,0.9980029366838085,0.9999999959818376,1.0,0.9858112382389087,1.0,0.9437775949762672,0.7863737281423587,1.0,0.9958637671228616,0.9981031689367916,0.9999993320403827,0.9999999414668722,0.8636439478694289,0.993696907744779,0.9697338847908293,0.8483717888219146,0.8305115759574299,1.0,0.9964669922586088,0.482582943758383,1.0,0.9670347293882067,0.5593950701806798,0.9099002697969232,0.9198175964465904,0.9985123776069297,0.9999995513961192,1.0,0.9999837980669352,0.9814023281387125,0.9999965245805419,0.9957528602098308,1.0,0.8714334086393152,0.967367365296349,1.0,0.999781065549301,0.9950111030904372,0.9395781380416817,1.0,0.9143367519924999,0.9951500650127268,1.0,0.9291347422794047,0.7919619629856675,0.9999622580599661,0.9995698360319659,0.8287703570781572,0.8460151405107188,0.9518678640344284,1.0,0.9855813466176151,0.9431785347999528,1.0,0.9988703865571905,0.9999999999999999,0.9618792010700261,0.6370142992928951,0.9891506808453301,0.9992116812206833,0.9940807047224216,1.0,0.9999999441077356,0.5615375341674855,1.0,0.9999999999999902,0.923570670263083,0.9916609030036599,1.0,0.9204923466879509,0.9998139767315191,0.987705821250678,1.0,0.7633617973214037,0.9855003343326393,0.999618166747231,0.9802117522040634,0.9891152916336657,0.9999973235337161,0.8027184041479336,0.9999999934541904,0.53373451028217,0.9847708561312626,0.9999999463527668,0.9949986209525201,0.9322792398517884,1.0,1.0,0.999999998336831,0.99999944748469,0.9998549353901482,0.9999999999997486,1.0,1.0,0.899486555073582,0.9485594096002554,1.0,0.9999999999999992,1.0,1.0,0.8694219670853083,0.9959727462951886,0.9999999963572093,0.9926487330484156,0.9740871332066032,0.9984732443086979,0.9999963370704854,1.0,1.0,1.0,0.9928382626715061,0.9653632019030345,0.9975404596736845,0.9999828022057942,0.9034218328172143,0.9607064994181763,1.0,0.9999958792851542,0.9867769254442328,0.9304439615407534,0.9992747111499586,0.8621809505566879,0.8514934880020635,0.9998432536205987,1.0,0.9990365182982172,0.9999969773392874,0.8549080013473935,1.0,0.9770167204390912,0.9991115766516605,0.9999988156253623,0.9849713270687984,1.0,0.9682832078826086,0.9999999974776158,0.999999999998194,0.8177791720368672,0.9999987770613896,0.9999989831111956,0.9999280039351591,0.8428692768002798,0.9999999247905154,0.9970263523713215,0.9991549368583706,0.7803485071939686,0.9678450451234626,0.9974049039948744,0.999999993566697,0.7871137479798629,0.9999919085138512,0.9999999998575109,0.9999997836252413,1.0,1.0,0.999999924021437,0.9779474624712804,0.9998727385070703,0.8678879666662082,0.9227942783864679,0.8176261071952877,1.0,1.0,0.7737339932438582,0.9885682195630158,0.9842004078541835,0.9962096596191095,1.0,0.9995116535663343,0.9439676912633466,0.827485382277011,0.9419575005673361,0.8936759521604329,0.9976872632471684,0.9999999762629469,0.7092377118552313,0.994254615180372,0.9891683778437822,0.9996062200024701,0.7114453959565322,0.9999923466201958,1.0,1.0,1.0,1.0,0.9999994908265286,0.9996690296509739,0.9955920370387322,1.0,0.7360781509508554,0.9927769769591172,0.8526454698041512,0.9996531714030797,1.0,1.0,0.9999278409241146,0.6625283725185984,0.32510721657913105,0.7696172369723121,0.9746759938801268,0.8605615749944076,0.9999983367549394,1.0,0.9999999707771444,0.9804564745028695,0.9994821798767993,0.9999738078380918,1.0,0.963112723646708,0.9999967118345838,0.9977438150163394,1.0,0.9999997051640608,0.9404895808205231,0.9999999937305317,0.9999960511755994,0.9977200373596055,0.9996949953944847,0.9723806416173627,0.9419794272944748,0.9824089722582406,1.0,0.9939506595770865,0.9999867569172655,0.8891435781293587,0.9991848093451908,0.9631370973378715,1.0,0.9358176665034275,0.9978923520060146,0.999916341447456,0.8058186906929186,1.0,0.9979832122597436,0.8812495417356685,0.9940610432197449,0.9981061238275947,0.9391884212939168,1.0,0.8851995117999764,1.0,0.6548987738173602,0.9513652501912856,0.9598806844450445,1.0,0.9999968762368028,0.9999999974894896,0.9999501535136427,1.0,1.0,0.9756300901215993,0.9439335596416758,0.7910667535085762,1.0,0.9999998869703329,0.9990944343273956,1.0,0.8628673830602214,0.9997515899107667,0.9997162687278901,0.9356819153758883,0.991937826122609,0.9972262870352128,0.9983212163459645,0.9996243363018678,0.999983897575862,0.9905235430167662,0.9999994715204555,0.9993936157804407,0.9998083740292877,0.868950632941341,0.9977551105294481,1.0,0.9023831822429669,0.8785147594997873,1.0,0.8494678982331461,0.8851483642517896,6.169879146846202e-5,0.8654711000140329,0.7141507605435956,0.9942442679141067,0.8170247619910856,0.9996297018221222,0.7399355747657732,0.8708699326936286,0.9900175740298992,1.0,0.8751210838379611,0.9999999999999941,0.9808177491250234,0.9871022348866851,0.9999999998979366,0.9973752599244566,0.9805443036133275,0.953849792977427,0.8992945035852873,0.9999999998772275,0.999999999999999,0.9999979752117844,0.9999528293587897,0.9918114491938728,0.9999917468378452,0.9308827182659376,0.9991595915006869,0.8290363869768083,0.9745051094416181,0.9964929077932272,0.9490537341455475,0.8631959450912523,0.9018486677685887,0.961944195800943,0.8956184878709545,0.9999999999999877,0.999997487789409,1.0,0.9997548918761734,0.9999999999541753,0.8413747842580314,0.9921461109937748,0.9999942332796586,0.9999999989524836,0.957248827602103,0.9998892541177362,0.9588453195989741,1.0,0.5403621354270883,0.9752749281740083,1.0,0.9989426600401408,0.9768193903378968,0.7892420267271613,0.890779591186911,1.0,0.9999998687576643,0.9996103697128981,0.8361368112584866,0.9134350598657952,1.0,0.9007049351375022,1.0,0.9947781721264262,0.7667080814818659,0.845722860776621,0.9999265599594239,0.9996831024618138,0.9403046216047535,0.9287033943259149,0.7321214820681547,0.9967703192534151,0.999999999998778,1.0,0.9999999999994212,0.9828979740324798,0.9765555471216353,0.8796361941973674,0.860672787642623,1.0,0.987350191577052,0.7814513189140375,0.7889341489528497,0.9999999995880593,0.9999734757801075,0.9697184933976064,0.9999995107378522,0.9999999999896368,1.0,1.0,0.9991719069356461,1.0,0.9999676832648402,0.8742874055547715,0.9999999943044666,0.99999888573025,0.9966143830253246,1.0,0.9721079700367351,0.9938759851613709,0.9618710833494315,0.9999999018082444,0.9229658443843325,1.0,0.9992085425556598,0.9998111947911867,0.999889704043448,0.8128547704532569,0.8648791592681735,1.0,0.9997460291831438,0.9999999776753657,0.7913032362077117,0.9984096237976265,0.9987795212658284,0.9833237113147076,0.9999999118863003,0.806489572115455,1.0,0.8324738400712208,0.9204177890901903,1.0,0.9181047234134074,0.9312214288985697,1.0,0.9415483786538794,0.9999998971319193,0.8107588493037539,0.9999999999993906,1.0,0.8330674271008167,0.990215518858801,1.0,1.0,0.9999973731559094,1.0,0.991949053202444,0.9965622842423043,0.9983695426812413,1.0,0.8677528015563234,0.6976969567539587,0.986593781239114,0.9960253422167784,0.9996291248731295,0.996876630660707,0.9240592038460765,1.0,0.9800860396643238,0.9999984957397221,0.5990539336016263,0.9999999866919084,0.9123627038349771,0.7428708858448971,1.0,0.9478290304258632,0.9222001361080061,0.9865805342111704,0.9878825372745057,0.9224299439152954,0.9956549028626711,0.9916920762743924,0.7301168258510295,0.9999986131326897,0.9866008867139431,0.9860073277884109,0.7472326232695379,0.9456288503575142,0.9665092142873173,0.8819379050810523,0.7833330415800246,0.9999953719556193,0.9999999999999997,0.9956586374618547,0.9999999999996992,0.9989126892741442,1.0,0.8328398849521202,0.9904785493225678,0.9994945129196936,1.0,0.970466142211148,0.9917958186840218,0.9275701540578647,0.9716786966591524,0.8449630663326436,0.9580164920479617,1.0,0.9999962149877022,0.9990640030031558,0.958899727637954,0.9966601438418219,0.9685572266119739,0.7610329160533659,0.9892733856246797,0.7070292128776793,1.0,0.5437650581460092,0.8627220901776993,0.9999993419043655,0.9999999972990042,0.9861627990818186,1.0,0.9875388708181188,1.0,0.5627639402535624,0.9987981763003783,1.0,0.997748026636448,1.0,1.0,0.9961158093664612,1.0,0.9407200454045552,0.9999999991681012,0.9999999955323047,0.9996696644656525,0.9999998011330299,0.8801468466284095,0.9903229019746621,0.8621461781246864,0.9501773118108279,1.0,0.92106792375875,0.7646530433689092,0.9999999988569145,0.9997528451737169,1.0,0.7964505840320595,0.9999001204913288,0.9907133848102629,0.9999999665699221,0.9999732894718609,0.8157478584759142,0.9012682738466384,3.7664627324059057e-122,0.9999617478537421,0.9921141394678172,0.9522098898632482,0.9955829294968146,1.0,0.9999998841604025,0.9994567833592164,0.9630476041616143,1.0,0.9114232303409535,1.0,0.9998259921540702,0.8158861800426723,1.0,1.0,1.0,0.9995089768874498,0.5772748285073135,1.0,0.9999999916501284,0.9999999999990248,0.9951011756361277,0.9999061348162323,0.9995083941948044,1.0,0.9804745851551254,0.9957587019946377,1.0,0.9999999954795106,0.9927696161646914,0.8780305121650821,1.0,0.980123735073428,0.9995275155195442,0.9795307577029685,1.0,0.32467750442358495,0.9999999999991438,1.0,0.9999877435435308,0.9249295333601999,0.9971208010292572,0.9999999932067493,0.829826905863164,1.0,0.9078461130712869,0.9088222500883337,0.9922725836718179,0.9999999756694137,0.9987200182748155,0.6342262650208256,0.76258382690138,0.9978544861108054,1.0,0.9795671235342324,0.978818109943251,0.9289989761964434,0.9997570106036189,0.9999999997831389,1.0,0.9986718011167054,0.968197431530355,1.0,0.9066500823946841,0.9385049621971449,0.9995601122445826,0.9918931205238569,0.9986140490518509,1.0,0.9999999999999194,0.9903701157379574,0.8147578241217701,0.9975651070554563,0.9944504434174495,0.6801877579977736,1.0,0.9999999999999235,0.9966009716518939,0.9999999993733754,1.0,0.9999653229819689,0.9114553743710334,0.9843524846045177,0.9242947041856812,1.0,1.0,1.0,0.9999999539103321,1.0,0.9999999999999959,0.890870127355112,0.9999999850537118,0.9999891479790523,0.751960509983843,0.9999982539679867,0.9070229418095583,0.9744537306094122,0.9831471265109695,0.9999994074578512,0.9999228681434439,0.6758550237485885,1.0,1.0,0.8822984619058265,0.9850114231645011,0.9130115904971146,1.0,0.9999999983550344,1.0,0.9937444340882221,0.9971251284867566,1.0,0.9999999622888945,0.9704587047608543,0.9585777664373775,0.9992615577336569,0.9968672723900315,0.9884465648402213,0.9772043505796996,0.9306787198802554,1.0,0.9971240734621323,0.9997698521622542,0.7679109323949528,0.9980341536641624,1.0,0.9999999856133537,1.0,0.9998007962520219,0.9999996759289879,0.9870677915839682,0.9993249677877747,0.8027110465935465,0.9665732740456134,0.9999999999999999,0.9999993802799101,1.0,0.9976331526676777,0.9999978002701151,0.8817362507208506,0.9999669200460188,0.995589884302049,0.9983526519903282,0.9915120586300856,1.0,0.9000385038846369,0.9843964773334999,1.0,1.0,0.8318540144772364,0.9997929177653395,0.9999999999997594,0.9999197151136727,0.9999603278580497,0.9974859014710538,0.999921614456606,0.9999994302349434,0.9673786047272067,0.9999817446640843,1.0,0.9900289194100269,0.8979472306209382,0.9883582045161797,1.0,0.9858017571255469,0.9929021549281128,0.9999944199331712,1.0,0.9893587750534529,0.9984211651635184,0.9994793968542065,0.9954348060418451,0.8153204210318609,1.0,0.9995168292989112,0.9636345090269318,0.9997918602564365,0.893298187165561,0.8469218158257572,0.9820513226642068,0.9728743207283427,0.9578701687418535,0.7569460836623365,1.0,0.8841835689026589,1.0,1.0,1.0,0.9999999999693032,1.0,0.9226440142145106,1.0,0.9170695834029536,0.9817503320567142,0.999737042739101,0.9927096236247432,0.9577255569148238,0.9967525279097337,0.982207527199179,0.7151795407459565,0.9881669659209186,0.7455947024429239,1.0,1.0,1.0,0.9691823202711644,0.9994320747903839,0.7814063244850189,1.0,0.9999878811560744,0.9116466317708443,0.8966675975034923,0.9445604551212405,0.9766711199491671,1.0,0.9855708578047775,0.9889002788039992,0.9602313903283334,0.9941493426491308,0.9996075615827729,0.9988319295973077,0.9682324668111358,0.9849719215319704,0.8258085858033295,0.9972105131171618,0.9921748413596293,0.9945383010042929,0.8991012905125078,0.9999999999999308,1.0,0.9999999647313184,0.7790913178921763,0.9658968857533907,0.9510178246785808,0.9934732299291975,0.9477576699421884,0.9701056837200855,0.9999927385727362,0.9137422600737846,0.8723586309604853,0.9893024561795655,0.8990283204857115,0.9951007661359031,0.9916156223204785,0.9999788227560049,1.0,0.9854040638641863,0.9272308305333838,0.9937483589861639,0.9999999999974482,0.9927582914817703,0.9990145734421769,0.9999983009661686,0.9999965563678647,0.9999995200605184,1.0,0.9351395322704363,0.9493738443243626,0.8029197836172179,0.8415194725766695,1.0,1.0,0.9928825089308991,0.9991989533766342,1.0,0.8666327420247207,0.9886934768766789,1.0,1.0,1.0,0.9996657742487667,1.0,0.74384312566874,0.9999535768283024,0.9999661127150202,1.0,1.0,1.0,0.9955569213111862,0.9852901346429298,0.9997697055059438,1.0,1.0,0.9994850915418209,1.0,1.0,0.8396766919902079,0.9358654838560607,0.9775597151302952,0.8169595490478947,0.9899659423970681,0.999964739199011,0.9051491214879652,0.9577215338686856,0.9975850827906731,0.9880428480223611,0.8918866107294914,0.9998424742747092,0.8238705053277254,1.0,0.9282187400440765,0.9610225539786025,0.6178419097916064,0.8746016995852135,0.999999999999997,1.0,0.9686121100210158,0.9999999942663517,0.9996450332057533,0.9999959639264097,0.9976406702899961,0.9999999990415184,0.5394929954223333,0.9660312637622043,0.9466585285072495],"x":[7.649600639244802,17.71441490598876,13.655771241702755,4.175392550519317,2.588581212287413,1.311128217865063,12.120094398307785,9.475754438168472,15.955845033970725,12.381487342546539,6.7267160413900795,0.34601736816017414,4.836643104382503,5.851506059987246,12.832078771349774,2.220728929928244,11.571162197158952,17.69753436096353,3.9346491131752837,14.250534313451112,6.701065444622154,19.66848564248675,12.445136217245167,2.596384095828359,13.026151150153154,9.148334315568398,8.145242020396179,0.21926384671547616,16.924626287651595,0.6492939193078584,10.388350037657421,15.112171805972272,12.34677066145268,11.428946941209755,10.589228979663613,5.013692854173857,2.037045172618357,8.87936194253118,3.711732641394647,8.705895946584988,2.5935552930671335,16.183352889865567,11.129325668358199,5.594896850992495,17.163857994324438,10.14633758843219,17.324923486900595,1.8100047062309477,1.8015103040667757,7.668790864302868,5.822820005154332,8.601834460150677,13.594404482204144,16.374352008455308,5.315910511797153,10.256302253296798,3.414437937089132,1.3105595279211535,16.3369850496617,19.186401749994843,13.586380780159132,18.296082998596617,19.951994284074424,8.8526138181807,17.68549400390586,16.512961084442097,5.695141313502283,17.203737524549005,7.861001416599378,10.577806359239252,6.880452245891169,10.559519717856158,12.283590707232692,9.156698279008637,19.902311033309886,12.80310236330247,11.176363064640933,1.4589999144474364,12.575989785588275,6.037692597135154,17.950439816529887,0.9444840793369513,11.30905837972989,2.0766934307012974,2.7855985834523667,12.041331919406137,1.8422903817193825,9.813408227732218,4.4045558939758855,19.96529749460526,0.8827868845020337,1.7733871808638124,12.97802908735067,11.101465704795629,18.77372702814908,15.739045417193367,3.868017726314652,6.775108269188763,13.886767050124798,17.722282392315556,19.901740902577366,16.55148510265361,19.07383406982926,12.82375611049579,16.021306363739637,13.444780255874198,6.467576874486025,9.723020511671487,18.77247725413243,4.4321557342067,10.191159142135295,18.29495968899831,3.6787464586530705,16.93240178243712,17.8943141454398,1.826233977460232,13.93623575462204,11.401745377231244,13.332023136398758,1.9662848826121815,4.077395239722725,16.59087858361719,2.3438832545631794,0.27985718832041595,19.594763367699706,5.8594184103636415,5.576654386436504,8.861975656846113,4.235985520987637,4.658562635496812,18.694002096588214,5.790153208162221,4.178677143041791,4.579098080584334,14.980711294144582,6.305100776663832,19.122077219680893,7.897340653496858,15.894696856104842,13.56597423338583,6.62891033635665,7.755058363904124,9.249315789170073,18.088489473979973,1.7646439947626913,15.468183424642593,9.997383045699785,14.712120593753323,5.787515814895539,14.188658647843226,5.0328281415318665,13.029268755649355,12.439574778703193,8.610696881449238,18.414009438543623,7.803459378000501,1.9059677582841061,15.422601876904913,1.2613544835662305,6.656811904148534,5.156302077973831,3.246323159505886,3.5494952371190758,16.06863326871791,2.7392098664161635,10.067929870688378,6.6157712220714116,4.412118734748556,0.25026675284520294,1.472779463677747,0.2995082196014609,19.56584840239469,17.564231343796408,15.033576973867145,10.413687266422773,15.945745313806432,7.864703467966789,16.89086082893683,17.690422446697994,14.553080967013297,16.88674521645417,8.476874584527012,17.968622430764633,0.5621207142582119,8.865649579586169,17.49435647266038,9.74055668279699,1.0138526754148636,16.133847684757466,15.194401055722055,0.24081096075480257,12.057209868012864,13.810308801042236,1.7183423831378608,8.878921276702041,2.6074584893017994,4.528110706725128,0.32183810553053416,12.288520869504222,14.90283748328026,11.465481035081954,19.233883279140787,9.451844482602887,3.437113729243091,13.490049494934663,6.865164428594279,13.544533289698407,12.386284624757256,17.829281425351667,12.719035517823531,15.269527809341223,15.313129532469052,11.588676251812725,6.196005044491231,5.8918910526034995,12.64103838872594,6.414773124819693,1.935688724440312,11.802449877287696,7.555712898375324,0.753666708304177,16.044059828992854,18.28078325014303,13.373281045576304,4.116142566922223,14.50472210910521,5.958775150027034,11.748540435058818,3.1791107484384007,0.9016947970458533,3.8649900942566084,5.56288046064489,8.177447718683354,8.720673052733506,1.5673684263858867,15.944532623617867,18.77333361608882,1.5779336893324958,7.206713971165244,13.641781986731862,17.671497497529607,17.880966466221007,1.094385106525162,19.531691563027568,6.466129361592654,16.404120860328728,8.99177861403102,1.8746538217259534,7.733174667434519,2.1991092988508187,16.468038961097783,19.733849839453093,1.331928320519955,7.031815254840161,2.9698260889848704,6.600243647311488,18.893524992141103,6.055129628182354,2.8111685774185036,6.40989902978947,10.805184461997776,16.38161135664772,12.629203695106206,12.902999664618031,9.795268420937763,3.700179636952119,0.2711333703089469,6.882076364724412,9.772696509153143,11.005453601809826,8.55936414970515,15.019298996862144,16.785866365511893,11.048989955519982,3.0313408971037603,19.454104039182592,5.315745964837428,15.561138780903704,10.978073779744765,7.833654185944887,14.857651410106811,9.5267378151149,5.257833056170096,7.668771478219529,18.664361484371458,7.684408619939731,1.017051187535536,1.203346183263272,16.25572200880265,13.653514072255103,3.2901851861409837,3.3564278385789237,14.548592763450872,19.44735449362419,9.081727941896203,5.00400403737125,15.244396517268797,13.809101940546679,0.4137689493441421,1.9696446304947912,10.814298691037031,1.8890070670052417,2.820387474106818,11.95413528384885,12.447259635460384,12.877593658962287,6.138115070915391,9.172005072569913,4.364541128031263,15.643349394128059,15.33871783751415,1.8065592225094251,16.201721375602904,14.542432513474388,14.407855229012366,10.874904357206487,11.202348451865959,4.40786198371621,16.306098804798836,11.708049969683781,8.37431554440824,18.97848757552747,3.519518307561147,9.729861091824837,9.35891942309147,1.2096082832433996,9.507526113979242,14.080900289767758,2.6207442840388406,18.234853003462476,17.990084205264903,0.277847802786213,18.311007054949368,14.447642952294974,2.569307564309531,0.39722428275523747,8.36648302494934,11.913886592277333,1.0937767507454854,16.421926026646695,19.354539161414813,4.665779089737061,1.3695763535514516,11.63907548855355,17.73041494633283,11.986146132977993,2.091815484465629,17.255577456958527,5.109974639954742,2.834967173006273,5.7193419277810476,16.84286463997656,16.923958157151127,15.29564375195648,8.27393564153061,3.3359989862297956,14.074709586268934,8.63392477564708,14.116667540697039,11.930729725565833,0.07344265850884213,10.640412159522734,4.284834195966409,16.164037038432916,3.6437271472173283,6.553932544920791,13.56240234559369,6.44885032648149,0.08990602814009652,0.20939065418629,10.30344567202009,3.6277287448928774,8.632692265462566,3.2561823594971084,3.6261485002292826,11.885992549623602,2.6596314609776073,6.733505017750314,19.53388594295579,13.002775542847203,17.23321800006394,5.207461033029253,8.066104971179296,15.243480048463361,8.321714241332607,14.076285643375389,5.75010551173635,0.051754251104889626,19.391817881820167,7.476754820677036,3.9877566922428676,19.523003237687423,11.938166954861838,11.456781527684843,14.289755936201267,13.831298440669864,15.744126132531422,7.737877085236531,8.307941169340607,6.84147071493213,12.262000405701382,10.62415920206886,1.5744253941711417,13.477586999990114,13.936947218265484,3.369941437794499,2.1914812116861304,14.756439979971647,14.027283811716437,15.328405025748175,10.364122474851566,11.073154116329999,2.3171884020554145,18.943858756072363,16.21616614380795,17.87322307926364,18.77374615406493,14.415424164464818,11.831999949773566,7.022336369549622,17.51336446571656,18.457642090936815,16.064626391832427,0.07852284360085449,17.572174409786065,7.197615643550388,19.707897544893747,18.985605128405464,8.053775852356164,8.946865674330091,15.828085582336563,3.891310782091688,16.238730978071416,12.213324691956267,16.486560501723776,13.50364488720623,16.094199932086163,8.638355020785525,7.009984746357385,1.595064461917195,10.183448283212698,15.447951520995273,9.256038152482668,13.599080810362674,3.954486008101643,8.80232355938604,0.213514497828875,17.079498141190776,13.010349227473185,0.6695429321883006,8.640529530890962,4.464373496816081,7.526497349995518,16.6975163999169,5.402097657407521,10.838142246324022,17.611349860028362,3.3169284523743148,10.762560187574532,17.09053372851486,10.512929848772927,16.00259588157688,12.151828848345655,16.510153342522223,19.369567643011077,12.0460017148232,10.727537139022289,3.4086042966028574,9.265503328905718,15.291705289419646,1.085069185581129,3.17813540735457,7.414252293674286,11.471990282334449,19.736346739044382,17.82024373659305,0.9514866184110682,10.389782744409452,8.534093328890254,5.210453911623265,1.7068340080692757,2.977446042986003,9.378241483678721,3.455116346352445,17.748835134281737,16.43396950761307,11.834049578673046,6.70175744776262,1.3423585738639554,1.0909440918764446,11.053441130793873,4.257301767580235,6.3265223078314525,18.689480515313633,9.684107786151506,18.737399180876064,16.259945126874094,0.0891621351318328,10.394057345336268,2.5278915758099307,13.622382024474762,15.253778139160588,1.238089558539266,8.267291519694687,8.360798310202702,12.674472374293728,14.648821926104617,19.20835301799615,7.3936503484489435,1.6900768346417072,19.221348989783014,15.580037440153841,10.570759745807035,8.769304265633103,9.071010819755863,10.230996293454071,7.632327139405399,10.501268660726911,13.262567243005456,16.190061959610162,3.668628682341817,5.8794577606154474,9.43933439495298,1.7724239398644759,19.43798799839528,11.45083986175511,15.495294534051745,1.3210384562673028,9.888601991172585,12.449334928083218,12.600460630686335,4.928245248601213,12.301140749935113,11.437604752558826,12.433540415291775,10.448626556465118,10.951058354597443,12.556784611195324,6.907476069766667,17.032886004809153,18.62776077553885,12.930355756939989,16.387691366701567,12.63601000833534,15.002198592896217,12.792119263249887,5.332341179195272,0.7659956377911081,1.865782640855409,16.769267526769266,14.24482004322249,1.0746582215462164,7.179476555146831,18.04421002833871,19.086573325659938,9.246397195877837,13.461060623633534,5.147345996923001,7.479432442278893,17.27696600611686,1.9094502087378373,17.528082511565,11.876488247738003,3.4317814547009506,19.481971281446825,8.997319759603606,7.15560745637736,4.040542517155403,5.095282979834477,7.112384115911965,13.072210963805194,2.103194309547205,3.891329788858582,12.611863445378866,6.96520082080196,9.121061084967707,4.7396994113050805,10.360928696706866,7.758728153908119,13.393449640268514,16.92133964415325,11.340059209515378,5.876526063341898,11.211677843963006,8.645474072334673,9.48373542599979,6.264205908192881,14.261109612658247,11.033476940964242,13.868259636167434,2.243269650100159,8.088364478494103,19.187820780861035,10.599504991630804,8.06093469003466,1.3416809451636036,2.726002283135016,9.487597400028505,3.7733306853340176,0.665912800796904,11.42902051542153,3.996913083845728,0.7718645979562266,10.933851874417142,16.51670769064296,16.685665268856027,0.8197309748577952,6.639370328594643,13.899135671740215,6.18930245618484,9.979602276815381,6.18558628641205,6.320539122162425,1.8940982787720229,7.0316780851300065,1.5974141667749198,0.8931924622390852,3.074938531188991,17.18215701665159,12.738176269122516,1.6065281491068095,12.060899225888871,15.062261326321948,7.883462392347487,9.417746197702787,19.93495304276225,6.070498484433466,8.047579285241092,6.851140952775205,18.49378872559051,3.5382142849022946,16.786890386548773,18.63814183921204,3.0926976384530613,19.574875825151963,7.1553801190299815,11.600887431291692,9.325702716969095,16.04343992413524,6.519176900422039,5.112425023418008,0.6403232528234915,0.5115151182634392,1.7261251935665367,7.634312637683309,16.21055697089634,1.266776516757906,8.99943169392845,16.360541818073816,10.768864026196528,10.561301727011756,13.712445660050086,6.216449418186527,12.879591212269155,0.0971977820351011,17.451657072346777,8.506878672146346,10.564761580703813,19.59876198718433,18.33474021596285,14.91138391251074,19.708881855676033,15.339884233091734,5.967844062031262,12.83066916320545,12.561657866827037,17.37698032307089,14.316287113897651,8.547331404585865,9.003896560114848,5.777041475547562,13.96639577297596,16.843111406763466,0.6880207526620863,19.74567080855177,4.394108151651093,9.164919423885486,0.38497735590810045,11.90247851066491,7.181451990087231,16.428654072541185,8.392346535566237,6.043217499315814,3.5128236193417006,0.09405430360325706,14.703274056667755,17.31517632486377,10.305936311420156,19.485506112490288,15.641778252268557,9.723912178014551,16.831782109387177,18.949190361035868,3.621965028648173,12.701674034383785,6.756200056057553,11.655502403639337,13.49845120786787,6.9801866962858705,17.859612029450126,3.3314888726582126,16.270065620241034,1.1039306375413327,4.8932653410339055,10.8585244806532,0.5810416432818455,0.20692003243075519,5.391959899472223,3.293216432305215,16.488911307125335,9.135706332147286,9.206941285470824,6.310836924161309,10.34542876442539,15.137938346070513,15.249950690049614,7.868403692999784,14.005376882363706,7.987505905858274,6.524898080247445,0.10560393472708096,0.33005406552224503,2.963931487671836,16.629768858259865,4.089289112591623,4.35750193189238,18.186298444859762,7.622093010462652,19.445027118588293,14.912337847619472,15.783924296345777,14.05919165889577,2.2792433621976205,1.318579018013768,9.872778468888876,0.8703908015165451,0.7881427845060429,15.284139742964218,15.891818256647747,1.7214689807260886,0.3228959116359498,8.725194403532054,13.012202877233477,9.284583642236107,0.5239733898688215,19.19900319392035,7.5662433268126605,6.581461893663274,3.601804029644753,2.404585842166771,3.9474973514805,3.024402003844906,7.418378664815841,10.617219658277953,7.189446176072547,3.3173527111174073,15.62017119166434,2.977009794122525,4.183045820387088,5.766718283730494,9.233611143516093,14.620238908175223,9.987433005591168,9.4939312634948,15.59740022302854,14.594347487208479,0.45777169647518434,10.355992912091105,13.85260972951665,13.177498389591054,9.381412540649956,15.902158090692273,19.051726960070788,2.1134921394068495,3.4727435411193497,11.597989834226738,10.380314041032044,5.051310207345305,9.339052197466003,2.27361668385639,9.375100476746105,11.319882318180174,16.040033522185283,3.0540965523494634,4.656937803002488,0.8077483882357672,13.644125661435647,18.022524278822132,5.614517232337444,5.433272282995527,9.228472808021376,9.79255409593426,4.566411778342596,11.045575898243136,8.07869172856857,1.2121855325004338,9.310415570726063,15.687306375797082,10.626212357306862,0.17797368208986253,2.0318948298903994,1.9303814301095956,12.31633164231885,10.306439824580966,4.906564484453151,19.506881581316904,14.824427023914296,12.807393376281603,4.447311925542223,11.0332012727144,10.171422001117554,7.005553346542914,13.440547016252843,10.45445623012563,19.87085626965174,14.915712628321822,7.874835498639681,12.22304274257703,2.8534695018499656,8.507710185349469,13.632788427068236,1.8192385746525375,14.21116828324184,4.179318360894375,6.456095066710055,5.217108138281268,12.564236521753184,14.066129842051796,16.378795417930313,16.740319503842088,9.91497400661158,16.890790774627558,17.411237693075236,1.2723755134466685,11.652949969431656,11.549100677141645,18.074262227990214,16.883037927783423,2.159019861813052,14.133141141726039,13.209252977833309,0.45987551124026194,0.6914896191944608,16.496013722205024,16.4319748732945,11.378503523225053,7.710903781401948,1.8310758318186293,14.958215174492121,10.573003174154124,13.23142490337137,2.317928259299773,10.755368238693341,14.521208580060954,3.1072257046374263,10.987274044025792,5.599108802138368,12.37459310027444,9.642613362281187,11.77104354058602,3.062929742124254,16.3921726319346,8.738985778518717,16.482324008350545,10.657684959546629,14.080604251097197,8.600316473190489,19.482490587086087,13.05252080367139,6.790660972384752,14.503520554969182,10.964550969221825,1.3392334825981589,3.608667420155891,18.73014276374621,11.257399742736954,2.710187454227828,13.65166226313903,10.952623742538133,15.96430050054944,9.655670295709346,5.851847639307257,19.265304758342488,6.042895667742667,4.257643513775173,4.9331426389080635,5.652513269030193,9.250467116395074,15.62366803155177,4.454033124153072,14.777983437305648,15.045995624557689,11.525119169687251,18.022725335191623,15.286384623626287,1.7571301052980504,2.800088716345148,1.2246441690979903,12.0234743630487,7.346115647230298,8.684513357213483,5.9206970062152475,5.6552197718134645,9.751482339155238,8.76861549382452,7.252155176822819,4.5370745430657955,11.166383214694267,7.36635361416905,8.302053981776783,5.010625554959414,15.907414427680507,9.023002913882344,10.0079060968249,1.1010429320394977,11.643044369974017,0.47503255860410043,14.341641532806818,11.160606693900942,8.654963525640529,10.688357970654913,16.665351473240907,13.901460197119388,4.009043335363653,13.707783138873744,13.495408242235118,14.964513869806568,3.0634151982279434,4.167661864338461,19.362548727621423,11.211697251202729,9.677153781208192,3.387101203978702,4.663581473859213,13.052347612464224,14.22285654626159,5.312061296494095,2.9305291359067986,4.367844527480691,1.687693216938455,9.395156279616836,3.550547125308663,4.1417339366762285,7.410647601854574,9.596554605211631,11.660957743515507,4.178145143434198,8.070744281940012,19.341171254216746,2.1333918942433883,0.379708894200359,15.226990319231026,13.48425329808637,8.65092847420363,10.546854550153956,9.45153633866842,0.6809202198956177,17.39151383760496,14.814392499917446,3.0923355872065184,14.90653384717616,9.838406672727391,19.1630702604947,2.8256995390303707,2.5273485337284685,14.286572496352754,13.480494471801897,17.214244367245,17.426573466232895,15.157791039143472,8.735608985405626,2.408786610114473,2.235921680847852,5.209909492417322,14.64092552328578,11.39507098323092,6.806766928403829,14.496066521735944,9.967158413923801,10.661498898361113,10.824537436560133,5.94937561010747,17.484792026097647,1.861679438176962,4.3586208922212055,5.052262376081935,12.834169224198085,0.17700712413434072,9.02521550570588,0.6545532976781754,4.188688444652056,7.095199698019354,14.224127989379358,12.449165796193382,18.077790033831647,13.273694286880167,10.591117533025098,0.1410000385670207,19.58427920576735,0.6422290148032017],"mu":[-2.763888368993974,-5.5778248066748715,-9.495806344109381,-0.29491047127853776,-5.948499692879925,-1.1791177227718075,-3.5951048432732513,-8.197433297862846,-1.3446163233773811,-0.07553041297946095,-1.6112191561287381,-6.8391816035297985,-6.6343221729286235,-5.432538425950182,-4.880062619621808,-2.574994296768478,-3.399041719980991,-9.20194031590462,-0.46017707402248753,-5.4366407385508175,-9.834293851394722,-2.4730180304645732,-3.9426843321221594,-0.012023762368535973,-7.513940757411559,-1.7084580478040867,-3.92377247425018,-6.404418968114833,-4.043670179244117,-0.5864047226270452,-9.263966805602315,-5.003601150213197,-3.3944905045529783,-8.492801657293805,-1.1836254021187442,-4.776344703771773,-2.8876207648375884,-5.340564546802753,-7.040977198438543,-5.637739098276937,-4.545815299966652,-0.5621580263922654,-3.5920988548320842,-3.4689279340289048,-0.016725609191645674,-1.18393846519397,-2.7471491845153873,-7.582848291453526,-5.199641137577893,-1.141101901795667,-0.6594546991862194,-3.133559064295721,-7.9311395860812794,-6.528149443956515,-9.567150004371282,-9.871758755973852,-4.510623013985602,-7.856641223806218,-4.5735132314552835,-0.9285115161996949,-6.499093846251043,-8.38916617455502,-1.385612699307457,-2.837687856839086,-5.718478135413074,-3.6430723949813126,-6.004101151873655,-8.019825026386203,-8.40219464246243,-4.687142398089838,-4.918892517643181,-7.4894690382387825,-1.7426925255525805,-5.233456260903107,-1.3199307028875173,-1.8849838886068015,-0.8401176615660599,-8.51221180030883,-2.9766082589179277,-5.114866841474912,-6.386660863163245,-9.897085288180698,-9.381064325705886,-1.6648224362203745,-6.874925915764065,-0.40882142527755017,-9.804539535051147,-4.606491718678043,-4.290198299582057,-4.0888712016814015,-8.88827243136169,-2.4002477472664907,-8.54959097423913,-4.351839911450533,-0.7393719773853347,-0.1708021780498603,-0.9073888598285151,-7.84509682979489,-4.930960832151657,-1.1222573976691197,-9.223900368557425,-6.0458547748964815,-9.752384608909592,-5.952651383757958,-8.624919676193896,-6.575041307919765,-3.9765594291671613,-7.115721721494648,-5.126472383111906,-5.4858207144351585,-1.28473506576265,-2.920648166616684,-2.1962265218605093,-6.875080450823583,-3.1980764427983766,-4.4005613246130775,-4.177215992895196,-1.5370469434504108,-5.563936782627974,-0.9724521111077089,-9.410968213717663,-0.4970163995362409,-0.3298179048530159,-1.2357048010330973,-7.77313422816051,-8.061378474140025,-6.103420960256312,-9.116430774296418,-5.370069872690291,-5.373226418926478,-0.015405272351101118,-3.784284958836215,-5.131935775624202,-7.043744276819615,-8.815101111687193,-9.291399063877975,-0.624229763219939,-8.620163262178014,-9.788052458274912,-0.5754215167943322,-4.067653673221576,-2.9561121514753808,-0.6631284020772155,-5.525454383497692,-2.8668494411480006,-5.8609068981264905,-4.584769284221341,-8.167771576305222,-8.798720372178,-1.6576564378721703,-1.5540095243019736,-8.39400551433978,-2.438778403374333,-1.0788780462771452,-9.999481795271489,-1.767687815993002,-9.188163570833208,-8.488613847039044,-6.0334341369270845,-0.3883851120656079,-4.5756982280303955,-2.9837191739027014,-5.783801941407831,-9.359491136359864,-8.90141301094223,-3.9370587086095776,-6.0431850958535716,-3.9918198446049624,-2.143021085512802,-5.774831811809127,-1.330029982565688,-0.7373192567618925,-6.090084746550904,-9.059242256893313,-5.183150214796839,-3.680440788688093,-2.4425101793915616,-0.06288640411181046,-5.073758559280879,-4.100426506677239,-6.346905881007883,-2.6841397186632965,-2.8288815228604425,-2.3570408098548357,-9.686055729094534,-0.7533139371188158,-0.2952701721194795,-2.8160885196939978,-8.328006974100155,-5.8772576308104885,-1.3018760628179749,-1.476779547482685,-0.7022559517085791,-0.1449511573057527,-4.388171411795905,-0.8538453373224608,-8.722168911086904,-7.94715348896143,-4.930820164505048,-5.532982903314847,-3.3500155972313106,-9.39671447094124,-3.127057325833258,-3.887645732699674,-0.01531280698135129,-6.419275221204181,-4.466887539388827,-5.390039385503471,-4.6697089558328875,-4.452094775905633,-5.944516388550413,-2.4248167934927456,-4.304168779619147,-3.488701281146631,-2.341986421860869,-1.495548394226569,-9.505159635567473,-7.626846137411418,-0.8038137078268037,-0.26864263286986434,-8.44655976194898,-2.4507235824482954,-5.870531197170024,-2.528875240311357,-1.9671817947332504,-0.9444398163335488,-5.455751405843159,-0.26289212864754496,-0.04169575074110865,-9.475073553936443,-3.892126124839721,-5.714899087636542,-8.752528779929863,-7.515093853662174,-0.26365866489534096,-0.214531930285371,-4.129235446262607,-4.780271639700926,-3.099982430256669,-6.580923808284595,-2.154594418866007,-8.93493442741094,-7.488974539677389,-4.232919201678604,-0.6949405125325603,-2.474520530546236,-4.123153775990891,-7.0875648281518,-9.157836833874732,-9.783913512130091,-1.0380013746040184,-6.623028761402015,-0.1151961238870669,-8.85360021282142,-5.269285301986722,-7.824466357559361,-3.5834817758962467,-6.048110470177834,-1.9074170681620317,-4.356358440719632,-8.177915093149121,-7.66090021828957,-6.54183116147758,-1.0921324123222553,-3.884281219551693,-0.10900432050640729,-8.656815470796182,-9.163905144101193,-7.354260742258871,-8.391671731512362,-9.898026240994833,-2.224523846173414,-5.244562549485536,-6.3576325375522025,-3.518066510346942,-5.2913758798598565,-7.182773496630066,-9.174351161050438,-5.570198695703108,-2.663187046220592,-2.735924529926552,-2.529247003212962,-5.818737831614513,-4.098591364946039,-8.466271487182116,-2.6110447701364814,-7.743052003360107,-5.849823162183549,-2.738403845477735,-2.3908325841704747,-6.058834897601571,-9.117948649081926,-2.3928732631525795,-1.0341454235504566,-7.021092339122017,-2.608103457746269,-6.68923249153393,-5.285138214633498,-4.712099846704405,-8.69528849782678,-6.52428245686854,-7.72925827101401,-4.411589981947164,-3.735860355922176,-1.4965398325287405,-4.7034802691980815,-6.436582526600136,-3.0950924943273384,-0.3940358834634572,-8.829606917308183,-9.84809203731018,-4.062312273172015,-0.3668656695558181,-1.2303041152421068,-5.938344533049715,-6.774103946352246,-0.5962847651731673,-7.007174457578675,-4.360701533486033,-6.2971652970459076,-0.8458356271201728,-6.650764637594174,-4.921260787194813,-6.303369205706099,-6.937506598776042,-3.0752482325965547,-5.976254567001826,-4.579086179136944,-0.23088938926955738,-1.0228103278162592,-3.3849084751848246,-2.7706477120924466,-6.61535043094696,-6.572303248862714,-0.41855283254944364,-4.445855138587909,-2.979408490219835,-4.057823336953557,-9.61766427806485,-8.785681460596368,-3.616248295252462,-0.510952079607605,-4.957880579606446,-3.396607063553345,-7.691262847931998,-0.39755251079833354,-0.531547863367734,-7.691259442479046,-9.473061943725472,-1.4235956990069831,-0.9714342651495245,-9.890343399594743,-6.502739616706785,-2.452398240012734,-2.7402411892411327,-9.124917105490011,-7.977462166224587,-3.5597437314086977,-6.40499299208158,-2.2453292698976335,-5.6535216154040775,-7.6789305099230365,-1.7538565997189282,-2.6911108304673514,-9.236295978552212,-9.39043417112904,-8.71066247324209,-0.06729234912192572,-0.5314014471041428,-3.1464023751681047,-6.669215206330952,-3.5115972559012043,-3.4867377986739134,-9.98395200311565,-1.723924460198658,-1.299757922650162,-9.276119009828543,-0.6692392813038683,-4.101533563935249,-4.444574079658043,-0.8849521384315606,-4.757136057341738,-8.068125874080412,-9.900046374478697,-1.8942357885395489,-8.295593797090993,-8.08751334620619,-8.323021200168856,-1.7096382605500637,-6.406361171277732,-1.9685729842483402,-1.5854759739253854,-7.683118932901911,-9.505813871543776,-8.154038592566105,-0.25222036889464894,-9.667057621270466,-2.7040816057353245,-5.041766217576904,-4.191526107459418,-2.6956878362647174,-0.8607208312477699,-2.6278853874280017,-8.434218687540165,-9.004117627342186,-3.3983731422569274,-8.959807464250321,-3.7185537537027247,-4.495486236781305,-6.592488483985419,-3.601118825904097,-1.189808818277247,-0.9319077221570571,-2.9537918872708,-5.428017667808769,-0.42454461085021933,-4.189744380573659,-3.78668220452248,-9.635307263517518,-6.8417785730326575,-6.110978027992065,-2.9743032893905585,-4.681281681663219,-5.206607250976272,-6.497383001926771,-4.939397282952225,-8.588987958180411,-9.949938884551447,-0.04356089843263744,-9.94171626537577,-8.04606614186091,-3.4455651486338335,-4.845443379046166,-1.9280637315176086,-9.283663927586034,-8.333894423818776,-8.164368005539973,-4.42073440595093,-9.709049660338525,-0.7592750004990267,-6.475925821226783,-2.2910583195168988,-2.497309316569689,-7.823596651358931,-2.666927594981199,-1.3833648931518616,-8.982273019342113,-2.0144575139995835,-3.275416750117257,-0.05473552248917546,-2.7122846448790594,-0.1328956521768676,-1.6190572462185693,-1.438240071254815,-7.826144144029447,-0.02797481708958216,-1.2682070641014165,-9.27425715980573,-7.525044267072034,-2.082978694380746,-6.621824375432565,-3.6244198818299767,-6.785650895425219,-2.0900167851997,-6.444177757654927,-3.016476484845656,-4.901411703755933,-4.775236243465919,-8.998722014903963,-9.85748970986929,-4.740731273272347,-3.071758782775642,-4.972788134135899,-1.5266829591310693,-3.2180728426337146,-6.477279637339759,-3.4391160861820835,-6.519961952375395,-2.679426415953474,-3.598710966398746,-2.976450201079528,-3.256421069944504,-0.08573199446886948,-2.5416305960098584,-9.317722207304973,-8.885608334407458,-7.681607169965625,-8.160754609297978,-8.27296428420648,-2.4559050977931984,-5.097441385949422,-8.928088204562457,-8.17800869087449,-4.396818655966779,-1.794645369076986,-0.2998888135845257,-5.504510984816524,-2.8141105983215997,-2.691258407048074,-9.698988336404128,-9.735183331535284,-5.373648069170203,-1.6641185330084585,-3.5741108984780223,-2.53595679296277,-6.18746681092591,-1.640753889149118,-0.08196612662600522,-4.417578113645972,-9.34088313934999,-2.6974704241010006,-7.2371762498791465,-7.783060712690009,-0.3347140980011587,-1.8229847258862564,-8.54442074354019,-1.2373758937727297,-3.0752632142559966,-3.0924207419974126,-0.2170463250414567,-8.24076678585172,-8.355768575438724,-5.66202903308138,-9.78297672644921,-2.207540246542854,-7.340148718286617,-2.874179417720726,-1.6979143504323213,-4.771437075914598,-3.988350313618192,-1.2535898456732664,-2.3746053878336104,-8.180062192488023,-5.8161721833308615,-3.7798243067496196,-6.065289820810664,-3.718701791103527,-5.9071460144033106,-7.7389002163134375,-8.685873934770607,-6.770725386825658,-5.233699856471816,-1.2827914052799194,-1.720470405723662,-6.987722527223516,-4.81630252257049,-5.864210548266642,-6.32559777417643,-7.268328870520138,-1.6741723306525746,-8.365034241171989,-5.7450907498228565,-9.131568998781646,-9.152495016826972,-4.23563106275415,-6.2042992923552776,-1.374949156337384,-3.2358271286166174,-9.316980848204835,-6.467068684268346,-6.316214565702493,-0.5004933120168698,-9.597217117163542,-5.219451333059897,-2.9572153502918175,-4.655908748898443,-2.2127921161996777,-6.779133582941386,-0.8268457735687984,-4.842594482131075,-8.08316916821033,-3.8018777768275425,-5.706999538279273,-7.426612163708899,-4.335422567926357,-3.267424895824349,-0.6869169532769304,-9.273319895038767,-8.20508254635534,-0.9170140439071117,-8.226561530327704,-3.8774960600533803,-6.505702476823412,-9.230758736819721,-2.0870195952791537,-8.858351084930636,-8.510293744017963,-2.213518382072839,-5.723978000879226,-2.7958461611677166,-1.7291851610055553,-5.021672160465047,-3.6159071278139687,-1.5546726953753898,-6.583237332048726,-5.941572525139076,-0.14563938568215473,-7.774019754374155,-7.51391472078037,-1.6017545622292073,-9.389497118524163,-1.7716165073873502,-2.0593242775491283,-4.010419670067995,-3.297998104711395,-4.237360988803866,-9.249763464948849,-8.615116157375649,-4.208585231825039,-7.486331085624347,-1.9733732824644434,-1.1670202796056617,-6.74563556535764,-0.2565405896313666,-4.917671785398852,-2.692648618860971,-5.8559249423569115,-4.690634707175638,-0.9151705736902804,-0.3465977894243344,-5.34180786163589,-9.797822868172616,-4.428801227018573,-8.94732825634861,-0.010949859210922508,-5.511492608350245,-0.7074001605991498,-7.073449454415666,-2.762343612591398,-9.893551706495426,-2.471912631394808,-6.636969593975628,-0.6013423378353999,-5.869336937975673,-1.8238605241354655,-1.95765007091673,-9.750088583544578,-6.6997368803325275,-7.228929080964585,-4.931911401482189,-9.870998606835379,-8.577385465115604,-3.7550575871684755,-4.801769971229337,-0.032512911401818556,-9.5992637877065,-0.2596306138137461,-2.2589700386583367,-4.487104453987993,-6.9394838562527,-3.333363054170062,-7.071882663062226,-2.8620113118349244,-7.7132046690183165,-2.541710524267351,-4.647734788119515,-4.646074946724321,-4.8863574927938425,-2.8202791370460623,-5.935830640697928,-7.006683604303625,-4.990609324563824,-1.6218308395092307,-9.911415050255581,-8.711172586257028,-8.28230479857127,-9.894417159293212,-1.9489454283490604,-8.21907502804052,-2.2678484286143497,-4.175843457783374,-4.100917113262328,-3.0198715487688843,-2.798955165976864,-0.8703150211050548,-5.162375443483187,-3.269943234114956,-3.260228717960838,-2.134464247610939,-5.56789296251141,-9.744079773551853,-8.516180419835624,-1.5763691983198935,-2.061238318809566,-1.9320150800804803,-9.301863929722899,-8.654965012395849,-5.227634327954731,-8.922111456012548,-9.900938763468762,-8.315874075535861,-7.7667610794166775,-2.8317397923573506,-5.46323841825302,-2.3355468232241505,-3.3710540440833836,-3.668870374098554,-0.3486208836189575,-5.866585607840181,-2.4907610073836506,-9.653428903496295,-8.07832526062783,-0.6644913359269844,-6.837486504236732,-9.360006540555197,-4.668106763885376,-6.470156319008544,-7.009371941906615,-3.7580802981662953,-9.05642396937322,-6.366578945150431,-4.147667271384603,-9.17224052102549,-9.892569173911026,-0.6215649757573494,-0.8688128935813011,-5.503171223432113,-4.138783530689492,-2.2156619771162767,-3.646502187679057,-9.148112799164416,-0.4121421362706945,-2.559786013530947,-8.780045776982785,-5.643985563091123,-5.159110943263454,-6.705772612166641,-9.63041056875616,-1.281398954584938,-6.007073625330868,-3.4585601900767804,-1.0447312296929168,-4.582786426947585,-5.515665283166131,-8.390993005223935,-1.45813441999465,-1.9336015140720142,-1.8343677581136375,-5.174460468783524,-8.742168512398456,-9.633369275469105,-3.463300734057857,-3.660893877173792,-8.423875899377988,-6.712825495726234,-3.489252265491727,-4.792425891017292,-9.20008929439996,-3.3501858176262234,-6.727133994465433,-9.2637759557776,-5.284333512194941,-4.623202797389363,-3.058479102292395,-5.98897579544132,-5.907994011122941,-0.26905779365201443,-9.638467441902545,-4.760306859362742,-0.15189640467515364,-7.176757484797256,-8.886624501256403,-3.485354019842093,-8.663147686385233,-2.598872590772683,-7.730164836846887,-6.809794587109885,-2.591380673042676,-4.182211889693043,-7.143406645483859,-8.834695910154062,-4.933532614337823,-7.995752438873554,-5.79244766550111,-1.6611549382057156,-1.5018494001978366,-9.238893396219929,-9.876742798168648,-0.4785929301274905,-7.8852314394120215,-4.079293126235881,-7.151691551959649,-2.331607273806622,-5.297101752363154,-2.1777004931074906,-2.3953915309603357,-6.050662290390088,-7.17518147134119,-3.454716345872413,-1.8099274802976129,-1.4034778619929478,-3.1157967050623436,-4.916896947763925,-6.99296448376129,-6.814979929814912,-2.219013228545459,-6.5618399759247765,-4.0311775773905385,-3.929721036448479,-9.993390420285944,-6.117493121380049,-8.067742389672336,-2.238640441038171,-5.831163391825022,-2.610772524979992,-7.903449807691503,-3.4554245904992786,-9.146773178848154,-1.241668211761635,-0.35102931257212866,-3.0399964609543995,-5.728670867214845,-9.874832547684523,-8.862734639341623,-0.5439946719921229,-0.18758101267222216,-9.4079356138582,-1.2615716423256096,-3.3392402864940296,-5.834813201163113,-3.067633604890112,-9.719214124266003,-6.812347855740811,-9.090632758632399,-3.4071601505493088,-8.79146877850423,-5.301043416495328,-6.580152429869641,-8.284792098024564,-2.9843138808213387,-3.283952382411397,-6.423275012742218,-2.102483545034608,-7.736561537568997,-0.9417216338098844,-8.600763932435518,-6.516015975775373,-5.83799453132878,-6.255050710453958,-1.7655228196844641,-8.238330269577109,-8.496457996763828,-5.423823732518576,-2.733778995519074,-6.696950222360051,-8.780092538989333,-0.3683988685457762,-9.13614718021934,-9.96892884790502,-5.880242535776247,-7.874600764575213,-9.976553755323128,-8.674951519606184,-2.7368539547783177,-4.73404400272104,-8.239653054868555,-2.5189885878132623,-0.153675698016158,-7.3557269769427975,-6.067171260825226,-5.5227249561887355,-2.574201004315644,-2.063969174691309,-0.9771239113285968,-5.747639291931474,-5.747573637262806,-5.134708699849968,-0.17689569538005934,-9.653131419749826,-3.1920545256432997,-8.572080026797968,-1.0334603237136109,-5.616915977617667,-6.272014923566722,-7.283055201442659,-3.4096014586267143,-9.761766971686164,-3.845240542299737,-5.22861810780487,-6.356358157314766,-7.025202820964635,-5.993881810263724,-6.35514848417521,-5.158915284402643,-0.057311035683431655,-3.0405680015694125,-0.2505681317696906,-7.732426823715417,-9.045276746408508,-8.295478005516848,-4.889190360600441,-2.619250035531908,-1.1108837321858522,-8.720027048074668,-0.7212719128884681,-5.7966896834582755,-2.339385835905843,-4.473187137566674,-3.652850371343024,-8.63062661234297,-1.392853370738063,-3.3495106135826114,-5.059019005624394,-8.328865679287745,-5.371971179862336,-7.360321623728994,-3.2016472469592827,-6.011845941058787,-1.8655170784267217,-4.3600859315472835,-8.70405586896393,-8.789312442675623,-3.66350847628951,-4.5533958457813135,-5.658687785307537,-8.862776823934338,-2.2183995239356546,-4.129494100830097,-3.8109644229231954,-5.861205294770279,-1.3078475577746196,-2.9723638081213344,-8.941381662079467,-5.0683923382653395,-1.3683017494130634,-5.2714713689800075,-3.196383179278399,-9.538320552551449,-7.987886403572491,-6.001580821354386,-5.058968857870223,-8.013264537316605,-5.8832011999619755,-2.4689271379841116,-8.97193119281792,-4.575113118240887,-6.738508571904191,-5.288445783224837,-1.251546515139097,-9.855740096764762,-3.066439526385789,-4.782877126403551,-5.9207838134099795,-2.1068247987586974,-1.75436246947563,-4.338525608262918,-7.874121302912935,-6.368830877519402,-1.982782450742473,-9.405877023906456,-5.0791783606657575,-4.256448765737599,-5.457639955232231,-5.356216507444113,-7.367048151946689,-6.8223462160236075,-9.106274742529564,-0.3448131248394892,-2.3068465800485227,-3.773009574861763,-8.978119484666792,-6.449604876700059,-7.194675133511328,-8.144158506236368,-6.932144143289114,-0.6103621385922864,-3.2312136370120315,-7.487781118609044,-2.3459439983873276,-7.614873915199856,-9.878652393522124,-3.672589805210802,-4.494296231913191,-3.3898961947084727,-0.1340139206964408,-2.271744641564326,-4.43478498240951,-1.4090486774157185,-4.452197949100829,-4.864716778727263,-4.467975768860297,-2.0208640954617674,-3.419275072970853,-3.764965304329373,-7.639239725347011,-4.215229350087157,-3.991242348136035,-2.978685447525984,-1.9138755026021381,-9.257018798328092,-6.227403280074344,-6.971444273365741,-5.868864339751683,-7.0791237502896776,-5.3377721775584135,-9.97770253919401,-4.944985084706497,-2.118097167173034,-5.405953814463238,-5.33774927447821]}

},{}],123:[function(require,module,exports){
module.exports={"sigma":[0.9904660499537199,1.2342326393432934,0.5090377650913014,2.6969646929564406,1.5987019186203488,2.1907792761839096,2.2557250719141377,2.364724866459651,0.9925207024942528,4.462700641638383,3.104348452631104,2.50412762772274,0.5568757818900616,3.6105938688978356,4.235304271090921,0.34268668966158433,1.5657150577468715,1.5525987314192846,2.768521175362352,1.9534206295188439,0.8147648023421217,2.9489869395625323,3.278729370372245,4.715749932035719,4.117358910031868,3.5395343943306257,0.9462088532297508,2.886098555158264,3.200168929615539,2.244739180585337,3.656601217833523,2.469828195099919,4.421883609416897,2.6788733081818137,0.8179442922633429,0.47862642050579773,3.032813130193772,3.0356964063342495,4.854609337628808,1.9480755075499312,2.6987600045200266,1.547213505427213,3.42855961527012,0.6495132699139561,4.6663195162134885,3.8152139119943165,4.90452679517417,4.7656409508018545,2.0281383994167457,4.28490763131589,4.7721347231037194,3.013896555760691,4.397338150404345,1.8859600524767373,3.154499720071078,3.847539748915506,1.3714312243375437,4.155165190245771,1.6925991670750362,3.035875547796393,3.445658384885877,2.40012443299047,1.0036280841604983,4.343590560437995,2.191124707065244,1.0273558684967732,2.327749476872565,3.702750228158104,0.41964404874412,3.0553764298989714,1.2434852271784802,1.925060628477927,2.3066219586333423,2.9497007334987435,1.0054674907468408,4.072997196242742,0.18760486144377309,1.3323599789100038,3.5411807811101648,4.81162938319454,0.8276875261753569,3.934997451428177,4.863682513476586,0.18192153526611965,3.9456304455581623,1.1194275634530693,3.628917762997701,1.3139624817565154,3.205230329789417,1.2665914541524992,3.444649428082215,3.830884283597362,0.10413683845250543,1.9073844750092195,1.5545395314825339,0.25619422456446106,1.771132172219061,1.7869492930387632,4.1401784207966745,2.5439821845814103,1.1531010608671877,1.0915404755507851,0.33113997216086655,0.9140765781673188,0.6019579567242772,3.7071085460115905,0.2571886422005387,2.2491012451987813,3.130036256618106,3.616541810652109,3.927570899652645,1.2996530018672936,4.439459553788513,1.218182390665894,2.696405398603172,2.5461533649641286,2.455843087403611,2.019153306614391,2.727332199019088,2.9215047954301654,1.4285828671330536,2.5482241498742333,1.0032724723131647,2.833764237379408,4.7183272118665265,0.28876518729187284,1.9758525088302958,1.690231763176987,2.13142837390167,4.457052679240139,0.3166489703101627,1.6100602176766943,2.375256408062474,4.331582891708518,4.926669691781526,4.762630030512517,2.1296420718373477,3.2029210052188093,3.162797091413619,3.2764345058773356,4.538503470860807,4.9677534643720245,4.085580278250582,0.020619258308590682,4.4793877222903244,2.4535832963828472,4.938280667350446,2.494679160561095,3.1326920272662964,1.4438881003812343,0.9790905832615249,0.7065694297146285,3.017282492448871,0.05089016100426891,1.7855769476008687,0.07843710156527406,0.8532462958068887,4.588845964289721,4.669878025584389,4.193946468147525,3.5368067601199185,2.051798990771394,0.8589363010703321,4.596779090129011,0.6581468718599304,0.8072586369431212,4.865925584505128,4.934233480242267,2.7417894379137597,3.8226127769070963,0.8685297502276057,3.071567886616763,2.9953281023922553,0.38235388053009634,1.8281355377080655,4.423085473969582,0.3875322450007679,2.581694269236544,0.9602225007282317,2.5679673657231863,0.09947225263257864,2.5484468187036557,3.5290506351848783,4.074486277598918,4.022302781936041,3.6777911813036313,3.5359409114808784,0.4283385379822713,0.6194645457488568,2.4771570460047068,4.697633250250394,3.4082416734561107,3.68591861622821,0.6568326867426544,4.364715850158439,2.038059987209062,4.888982798462877,2.743056917681641,3.2356337882496113,0.4321820668583487,2.482759296113316,3.7015751574071585,0.2100897764189713,1.4873640021155787,2.7193927828219366,4.046416833319202,1.3048956219931274,0.7906281476916599,3.9787326668022747,2.2820276043973218,3.292675075328897,0.4880060364786276,3.4834052077988065,0.3423128472174297,2.773686435882581,4.702929463706398,3.4667770783203897,3.067306680759204,3.4671974586250665,0.9414166196502793,4.830686066582542,1.7477529491639276,0.5160469045094163,4.402409197412949,3.6073669999065974,2.8911733201244516,4.058202430073447,2.866310498006839,1.2565342609562402,4.672418345051671,2.5993353392812093,4.621367470892279,1.2336617427027408,2.3740443455437834,0.984554860017598,2.195034578625,3.2539492915607293,0.6340531829054574,1.958440022886948,4.270932414624948,2.7524225070539643,3.706571660178992,1.4215529680288297,4.359513896615733,3.2583414856586748,3.0802639971281454,0.668488067006261,4.310492652423248,2.670920792518986,3.467505925574985,0.34968571504479296,4.807618126591873,0.7913977060154043,0.06148317778395751,1.7776750618867243,4.9565183038289,2.181477950537861,3.324058905934244,2.9346700830466266,0.3174503192318756,0.5777691578887878,4.929457491857315,3.1832775662357227,4.978780394987269,2.3328420467663733,0.6461646076196303,3.6005239892925687,4.658667264719114,4.939738883681073,1.0012552467522606,0.06126346670117688,3.4726649086051067,0.9588049860477821,3.3117868684688023,3.1523757660623266,2.2702853085107186,1.4495284146598097,4.92255463397314,0.13931981980166874,4.648818557893971,0.5730812439125654,4.223698515199593,3.597089221082037,0.37520834777540424,4.730280466777399,1.015649673319018,2.3915261747290795,0.022184536174065794,0.3949715316614222,0.3225799526553641,1.7091467229082913,3.6610119864947945,3.2672949000920957,2.746720645809453,4.817671519116013,0.5842479658333621,2.6758683200973032,4.493553480105977,4.241803914406849,3.6630822557646137,3.0662666768145117,3.8001490626904766,4.537428103642547,1.8388973000035802,2.3136501196823978,1.1414080474344357,2.2818493917412264,3.2873673018033447,4.81567983203314,0.5004284131436543,0.1374192085010495,4.03437059632373,0.2553440124737161,3.530334935703258,4.535783629032085,1.4953357500513342,1.5131155215089964,1.000726262287751,4.891867435462279,4.3857708916329,4.337749074473249,4.471176876873884,0.3433606756653085,0.19027715432308412,1.5403239442432826,2.713120227084407,4.83147140826787,4.405926981297653,4.632901040356562,1.8749463591112048,0.1567324066414455,4.636504423664681,1.4642005305363703,1.2176826140450536,3.026171875071999,0.6122833467102096,3.7402104396757228,4.748160753929369,2.2426928377588506,1.5797405068964765,0.49369378604183334,1.8316001211915744,4.065408749006125,0.5482886450799307,3.505024583649672,3.3878799399555937,3.162225295289256,0.8087927417007135,2.5626709338572775,1.8913758968744754,1.9487468360838467,4.761153181785641,3.60236667082805,2.062755695620414,1.672759455189855,2.41099921081136,1.4153653209888484,2.9525422252629188,3.933480412416981,4.903830089602989,1.9068482456352254,3.2867909603819747,0.02327656715751303,0.3577667397723039,0.55960942501036,2.158163898827028,2.261756814446161,4.204677428566806,2.8257379314365916,1.563361640136539,3.622158485967023,3.098521481459101,1.3215737264396132,3.6873575256493965,1.6152199787240618,1.4295650755442246,1.8727381694038936,0.160573042988017,1.4045670393838794,1.3373616639613906,1.4984098036229765,3.224255930049101,2.093647069558352,1.7805585820879322,0.5966641457687927,1.3727337566191367,2.2946252869826287,1.9532862143763796,1.3926170938699678,3.5676251726141714,1.3290248816707861,1.9656860909886287,0.6104794668140323,0.021777424095973386,3.535128260571337,0.542834527011985,0.6437116712413038,2.165186779381064,0.3663086499056234,1.817647480988016,1.7335539073260031,1.9660146497198994,0.6433843838626707,1.2705556153062247,4.869929033417496,2.015072942256367,4.413094567240519,3.9268759767025285,1.5511742536025186,0.590051516818334,4.059547070847939,0.7962978734065063,3.960719906009993,4.546855658364196,0.21055951859838884,0.23853046490293184,3.0703468676379386,0.6283429682227082,4.348108127902268,3.6097672554336913,2.197959094510622,3.16822105607403,4.25189901767804,3.743238201573212,3.201192672065135,3.3805327162151775,1.2844525097546888,3.0213169364277026,4.581384364071418,3.775634962712666,4.304356761109844,0.9411511527944283,3.258843459139469,4.597906222693538,2.503759952229202,1.309572364252135,0.6250810740495627,0.4282122152084311,4.666278437404191,0.8527657036435887,4.093513710759091,4.916409524946996,3.56702247428891,1.2618084289344644,3.1146000339367506,1.0230181161966379,4.638974553240011,0.030339953219697957,2.4101263486617452,0.07695957380360108,2.1425621759094824,3.2910084864658637,0.11677707637897439,0.21011472152500432,0.07531173679305447,0.013628410156035775,2.148036393088918,0.5000600212528605,1.4222253416122077,2.7149534254720473,4.271368684516185,3.286112821444024,3.3596221962408332,1.8883189305884607,0.7609060387814193,3.6730029180730606,4.176916719170343,4.384377639945928,0.7913018066624533,2.7499183326559375,2.3052975399513564,4.564126025768312,0.4160938673431869,4.389656600108484,1.5880605096425837,0.8269898713192503,4.7191555287029985,2.6137898217555833,0.35412334789802213,2.641521554230958,2.3464810444053077,3.5727646848153984,1.680314455193812,2.8718683385195676,1.4657460763924557,0.5010638958804503,4.677760924435093,4.520315607125789,1.145766347224214,3.0076166175872467,1.04577286924472,2.7642923745162626,1.3693188421488056,4.54196419147009,4.850304285710756,0.1274280698914998,0.45110176259572476,4.619973066841493,1.3998661176624905,3.956048037832478,2.04068014013668,3.901781175509542,4.406821488739992,4.498059908471177,2.5758497410641823,2.4865362784615974,0.528712773042147,1.8874081786114028,0.5755154489535486,3.3645207534470045,2.841820587337188,1.0317930060216962,1.7224686618539575,2.0683520794721835,0.42407886475323786,4.275766237839537,1.328259751142944,4.780294128730066,2.3917796808298117,4.231613768262248,0.17130748948238073,1.2674775835040386,4.303392214328463,3.2733615693574425,2.149422427549884,4.289001578911105,3.84149366778489,1.5201029543076439,2.973051785215212,3.39365903890822,0.0780866170290162,4.093937244001662,1.708496289610072,1.182483561696459,4.949211896371036,0.14528247204470435,0.936169798097275,2.687395435712212,3.2718018404890126,0.9394057279909374,1.4100640213129823,2.270292135446268,0.7998067559383915,0.5742561886418052,0.9140197719548393,3.4810112860280586,2.2250863398748733,0.4820491303503982,4.525997468940165,0.37979946518829744,3.129023423756837,1.2790597842662998,0.12529850206921878,1.3223576143881433,0.929665265305486,3.4452862826370434,4.47239157102034,4.376793609767904,2.0929400862834724,4.204318368173398,0.21444229095202716,1.214782844005673,4.090484426012903,1.3491701214110963,3.578236373416347,4.33806592721756,3.126066129170032,3.548145373535535,0.5304610321778636,2.87647119285817,0.9353441059150769,1.2263099970794644,4.649881032982446,1.933070687749191,4.515623202224504,2.4752631713248974,0.671810621635367,1.124420696969547,0.2998094152086206,3.2283110786224665,0.28196431891880924,4.671107652277195,3.650039268021421,3.097915999785865,1.3128234819208884,0.9802011730510363,3.6342415764137224,0.13714334457924138,3.4761813885595028,3.5474310484335927,2.2976351231197145,2.0372737585863785,2.473467940043471,3.01610424617506,0.7429515190742109,0.11055907649910934,3.17950987792707,0.33956408586374387,3.6534758196869053,1.0760469341752255,2.9386705397684274,0.3116228793042264,3.8028777007827888,0.7159258097094301,3.048155262218609,4.298722265569039,2.3447932298024146,0.6233013937235499,4.135525520908031,1.7997685508578831,2.260414821822365,4.483326585146532,0.7260648780437262,3.9753712575787326,0.7444563136637117,2.249600240675147,4.3052852155077606,1.1872719114527086,0.18017646103339113,1.8851998181383955,2.9768890759204405,2.078451710323529,3.9083233569755835,1.911309583477182,2.568474062307531,1.306190341646315,0.33875606738114183,1.1810299066374708,4.270868859088105,3.8859785799112934,4.2389271630059335,2.8647166414128034,1.9518465525267936,1.6374158654353044,0.28358712560804467,3.5839008068736233,4.49689265014352,0.94939162365835,1.2936494883100103,1.767841210891603,2.9577726770272363,4.401652968852982,1.9159709482589304,2.5498687186858504,3.998511388612185,3.442493631052188,4.36457634653494,2.3414967313111634,3.7987282964012605,3.131618897980546,1.0762933441061073,4.686814816175509,1.5304258585293062,3.155965497417342,0.020383850350297328,1.5694748320440288,0.7012215687080803,4.453319665597238,1.6249033323271644,3.5174382603656404,2.8960390033679753,0.5823805960037753,0.7437334641742188,2.343017114763557,3.182313126856131,0.9673486278705246,2.423332449336,1.4961738883425557,1.028253322385202,2.7823642915352464,0.5807940170543235,4.728170520584515,3.7295425197128673,2.6386633872132883,0.254524446835791,4.097523574044421,4.199378859539564,4.08053086054456,3.178497036772124,1.4439877405164436,3.659444436674132,2.2863181673182886,4.2757786797700685,4.8396896340745945,3.4018019850398975,3.8195486001412107,0.02476552498907658,2.366512952693387,0.12947179482884708,4.618601142336333,3.7479590733747745,3.8745195858454693,1.1105351124872753,1.84042144557936,3.4187500459747433,0.3636136205506346,4.852134216914123,4.231470452252063,3.5518491310533995,3.7626326910890473,1.7142038715783825,4.610655871696726,2.463236997805105,3.817052306346007,2.2505876837337437,0.10118708146870548,2.5793586081534867,2.3022050416290862,4.908461887645097,3.5541913910673104,4.486639763897697,2.524321614405065,0.7239291769047673,1.0289892122593736,0.3641037235995459,0.5142337210235481,0.2270397887815545,0.8271001725038951,2.9133479235556425,1.6188211573334321,0.3412910810429104,3.4872945200661443,1.7847561832704106,0.6948697804602899,3.1160085537482374,2.9086402274111856,1.5149311981724944,1.81946344984527,1.7351276061224907,3.497652121904494,3.5744223290580757,0.8472342010562328,1.6651064198951693,1.635980488457317,4.410349112483605,1.747830705030755,1.8309519206182634,1.6826410044562845,3.072936862623724,0.35016653903894746,0.07271931781685725,2.836966972711632,0.13447096923222324,3.7823970070076287,2.0814672775892262,0.9030823981660374,0.0182874318588111,3.560716987355393,3.805286808872949,3.5675832380720207,0.5252357950728126,4.011644239374061,4.827184340452676,3.371395850015304,2.3360879042888696,4.394331079202258,1.4796445719085316,1.475018837107116,1.3988283810631907,1.6119439456495166,4.082003371095153,3.349721826932085,2.1299561806228695,1.1700049858983008,1.9210952561428463,4.355117161193489,2.2770159153631586,3.537189213646027,1.4670271544323354,2.814171304440758,3.26353333895411,4.147896379890907,2.8702686711168934,3.375292350455675,2.0715544894646056,4.096080024379848,3.9227668344647606,2.4981209887714737,4.841632025599557,1.916407315880938,3.7240261227650118,2.4463178765800064,1.9162447989952358,0.6758130928969142,2.8774598160214513,3.149004831571993,0.8432998470302078,1.5243336548209951,4.477200218361814,3.0825663585609595,3.158042853849853,4.182485582644549,3.8641403615610814,3.124112216313135,0.03346131036803812,3.5838796814372675,1.5037633290653796,2.220833988185481,2.5354183339688428,2.6802805129173892,1.9289488545113198,1.0950856206719983,2.5185417728768886,1.0136930375113151,1.2030419291313421,0.45304941658371956,0.12693252971221036,1.1193356817921796,4.532646216264226,4.133293707057055,3.372247216716473,0.2930384889480331,2.2706919125833047,4.190781666534202,4.2673504204509385,1.7696134008920794,4.7553443011817755,1.6568848079649445,0.3097457294325989,3.96131669323459,2.593387176205273,1.2089417103372857,2.7870954771438186,0.9277160938016926,1.1040716671654993,2.1650770951898735,4.626878002263083,4.486518202306883,0.8937795080830258,2.7227977246815027,3.0135204721184317,0.9753766454673751,4.287550018670705,3.830915436110055,2.319576684140885,0.07241840971837887,2.416980313326217,2.5317424362482677,1.6213643980811376,1.8229830712148754,3.8432153220940766,4.0122747997816735,4.044781925092352,2.193832184407727,1.8083339155434286,0.4726505030894179,1.405555808423099,2.2936715113330397,0.9487168300280724,3.892108538993001,0.4577193707918792,0.014279853955674326,0.900722905049467,4.001627325445244,1.5134877865112817,3.7391688517933943,0.25380684243670015,4.388590008411503,2.0631348418621744,2.451340081121961,3.2778344371973613,0.2773836603428481,2.7707178653711217,0.5923889441693919,3.279087492753512,4.235595959222007,1.7233991621440714,4.971652999924859,4.73880094220601,0.14292977473462698,3.769317832893658,0.20165652378422272,3.3930794358816962,4.411105148894113,4.954463354468476,0.9391837547114479,3.707873105808588,3.2584328772074844,1.7991716937557845,0.3920624727198496,0.9393206296229306,1.1409116111211626,3.2172803240054835,0.17480488872361533,1.7240255851379183,1.9578441780804157,3.2489626429896123,1.8698949517041286,2.625108912070738,2.4878554543538667,1.4393854627027969,0.6142527894132199,0.06350306696575103,4.71146376440402,3.031232278283449,4.601134220793552,4.402531877048023,4.273193081882939,4.451072304423073,0.057921631156796494,4.68853264222968,2.3393348037125916,1.2286669167883157,0.017091092600333146,3.6607311590620073,1.1950191471158633,3.273723737103068,4.674372137447875,0.7277046780802265,1.8746174455010989,3.320807670271276,0.712165618449283,1.7263060646563821,3.967404489144608,0.13191673035745088,3.951773737000309,4.220924956202449,3.5665911955134524,2.419685125797831,2.191387255880324,1.5427816772867509,1.8203551940601281,1.4008677898391364,4.4274075385503675,3.883997744634925,1.226282786515983,4.184935765473401,1.3731498321609947,4.27304099735127,2.6621183742447965,3.762344896636244,4.658388584396748,3.340339155080062,0.5031419191661723,1.3946868291258407,4.362411512358145,1.280200048470952,0.9840128494880229,1.761092759337014,0.9114794289866102,1.0750316177951336,1.279535948369005,3.6874828561995097,0.521013167381762,2.4460022056501374,0.34382902828602346,4.508536721289033,2.4153594018443325,0.3709840855750268,2.4878878372426905,2.440142278217634,4.4519175846260195,2.9147155495847032,0.6084182700368068,2.9921825262574497,3.4270768204542126,1.5794837845352439,1.299310122752746,4.637400762131907,4.808733248051941,2.3613457520318626,2.674361514053498,0.9632466554374253,2.2191856963824708,2.0800284241299294,2.5438461918935964,3.8674492040959754,0.3317064557301208,4.695173225728414,0.40125944931834856,2.7258587575190796,2.8703906522519027,4.710774848826893,0.4676599872039444,2.743542258120036,2.527928305841778,3.0508024265003977,1.7605359203760884,1.5509425220774165,2.5369473165720136,0.4209267829762131,1.9409218341568002,1.2769307054518064,4.278178674722141,3.5147646173640257,1.1002704704068023,4.228503114970188,4.621462808610812,4.782727061101879,4.111574697444662,3.5559185769751522,1.787110612962305,2.599062431314975,0.5282622946141768,0.178567978719556,0.8853842111463606,1.6905827575601873,1.1763120905268787,3.1788637353519897,2.2824654195390472],"expected":[0.22295613533593256,0.006319967938538509,4.799883129002304e-10,0.642070878687947,0.08187773009003964,0.8195799219416435,0.026552365857975407,0.003030414804781275,4.396223282515185e-6,0.15161009100628678,0.13709467218964244,0.1037253347383818,1.7717984846084417e-6,0.02505891402185219,0.709054628669797,0.6893664369339105,2.9629934029887327e-13,0.6828632238976388,0.2119238252463708,9.146769208528823e-6,0.0011165719728823053,0.1732269741403824,0.7679688326942994,0.05045652314199714,0.37862790529990537,0.6557066832249046,0.9415661013465857,0.42945480575702344,0.014327710120276475,0.12278728598240304,0.14233662002547878,0.02231280445850056,0.31592583433041643,0.7862817964166811,0.3549446150698824,0.9476307277528293,0.01843601294068221,0.37689304081973174,0.19439425482313735,0.13623363232712232,0.4272115510524297,0.23528742493549368,0.5817394840381852,0.0054819338362809816,0.28364316179739685,0.4519734644386451,0.17969607877969898,0.4859428690757515,0.37568527149960873,0.07804088894126672,0.18636161701122284,0.7573842501539083,0.06456726594231799,0.01526783138120091,0.5758016807076705,0.18929571934524292,0.0015485468127503631,0.055341468279121155,0.45314258854555034,0.1267033600578563,0.092451492936747,0.6240474786088304,5.806855137700066e-13,0.03278669784396439,0.21301492007485637,3.9068567637008395e-10,0.8340516714083963,0.18179057548416505,2.9678593011522537e-32,0.01645475469226275,1.8694188554661444e-10,0.751425890648552,0.0033141136099403227,0.008651243177954723,5.0927176972698404e-8,0.22913360396710072,2.7733520523361596e-115,0.18814968150988226,0.6665479577308592,0.21869969493391736,2.5431951765297928e-6,0.15194602828742515,0.6731442821208381,1.9490450924010034e-210,0.3461238453351017,0.906914965219205,0.029985653071621425,0.9096583337407335,0.02702396652208109,0.004018124965112693,0.00260742365024192,0.036417895278388616,0.0,0.0003233784513858551,0.9217157293976022,4.142025539584084e-157,0.19984826044338885,0.638335365919831,0.033020264702813246,0.2456552788837345,5.892504279300015e-9,0.575523277093972,0.9999993074978805,0.0001925126124329223,0.9999817395560814,0.44009217246663623,0.698922659162414,0.3818253504164135,0.015997962808604754,0.28855682715436803,0.08635137317876761,8.34635096581217e-8,0.14125507365762519,0.17623734122791146,0.3654810869316809,0.5078642691582933,0.0005752001154156952,0.627658776692211,0.25535294057073815,0.09355482587588973,0.8539146954112364,0.8579749314673739,3.71504927282698e-12,0.0013006430898311445,0.31680591223260157,0.9999999655285196,0.8203614006172666,0.23752241258976092,0.000125169386263588,0.6544671988209252,0.3973239467266731,0.0015667277493209878,0.08029137318594412,0.21646844643869315,0.10338540071445645,0.11720788770405594,0.6275320628530967,0.3982394283125022,0.026905524640644354,0.24818463707001465,0.39487196431611327,0.04399131326585271,0.42837503596990245,0.0,0.4734164777946978,0.7340651190852798,0.34676316401205304,0.00025215842483015526,0.18400138052758414,0.0011645847876430122,0.9868820652447472,0.989631167969571,0.684902026715958,0.0,4.79714743721285e-5,3.6301260335693794e-11,2.6264960089722396e-8,0.1046052999907311,0.12098750762987148,0.2358208319367925,0.16144953994986894,0.008469348439868277,1.317390500204035e-10,0.2105818273415213,1.0955016582634499e-33,1.6323413528076752e-9,0.5291589180465079,0.17412141390473013,0.010300502863682668,0.44158112178241427,4.8014780889170186e-9,0.03649053125448495,0.06104266713901127,0.9999998478430234,0.02855045140175226,0.07220121867737811,0.9931313418183025,0.0015235832925000216,1.1029676020694912e-5,0.37513019509976475,0.0,0.013330443916484818,0.7387774021683368,0.05743249283039566,0.13297551500145582,0.08361985575614331,0.4102288397310345,6.061935292941145e-16,2.8379987562003135e-6,0.005528020345990396,0.4028834171416778,0.324673503654365,0.05369992295657927,2.4117271845831866e-18,0.1252993408862941,0.12749782006381333,0.16758692060482933,0.519174278079593,0.27071653547322505,2.1156720009505244e-66,0.010194060748767952,0.37876417500331355,6.413198044151507e-157,0.762298145943624,0.6817292788168225,0.27748011197293093,0.007576991377200622,0.0010979351311987608,0.6890449281151616,0.252167045578563,0.7182891007130796,1.0298809589002027e-9,0.20315253863546828,5.230326912840141e-68,0.5766954037149209,0.5597619147275035,0.08058048991605905,0.005741874286978225,0.100273803865868,0.25636748351736494,0.48666622997690345,0.16261242099002984,0.9999962507768031,0.4559545020654107,0.05640449215585606,0.4815175414671474,0.054241310634293396,0.0002205574513236519,0.06699196992861459,0.2257734882238126,0.09150729521641418,0.40633813808788866,0.00355100718109599,0.40210878703750824,5.751642357111938e-10,0.0010695643653174725,0.2008011050470184,2.640962555853608e-12,0.009983763048748122,0.1714808102630584,0.013871690334941247,0.6361065090232576,7.683538342115277e-8,0.3919044454462703,0.48624637254506203,0.1232643218965096,2.173596611650737e-6,0.694223589882866,0.2579898729200293,0.15491248673792973,2.6432966709752403e-5,0.39253723708880306,1.456695339734965e-7,0.0,0.11159074275253608,0.2685893451571985,0.012320928455615263,0.025015079524760394,0.568215008737665,2.9274678582777626e-70,2.5922570829155402e-21,0.12258321738641792,0.5576274170235033,0.1156402425595603,0.7201959900298925,0.05050405746988755,0.1813540402106706,0.35343525479432575,0.6521068946151662,9.830026994309173e-6,4.687039306810398e-20,0.6192173065043205,0.9632571667881754,0.048232944397646034,0.0029564182669799466,0.0021269353176235624,0.0008397272568412966,0.6131877422618107,1.9475714306147273e-141,0.5240648361733927,4.264260595277718e-12,0.4992733030766727,0.07033806005378342,4.961447339276807e-96,0.24670274037341003,1.1180172029279158e-11,0.8595962150384531,0.0,1.739418370185635e-7,5.780639069508024e-32,0.1452066242766152,0.08319113422315307,0.09279103192582147,0.15281026022616986,0.30847400910873035,5.441505480475246e-15,0.0012568615647138436,0.24940789449089362,0.12284362081262098,0.0445284133619644,0.009384028228025604,0.5710271677634184,0.05625475926321638,0.14115743702285855,0.8072903037628087,0.22679505552014761,0.003809040958606251,0.47728715199450833,0.09000391540845047,3.313489640761309e-24,0.04169283344669496,0.017890835509667018,0.9646988677024402,0.11192488939279034,0.13738198107098543,0.6738308662888788,0.010372572248935015,3.439025664494314e-14,0.5049244357751644,0.07178848159882721,0.18161305005935519,0.2530351241798363,7.0054297228125335e-68,4.291939685987516e-58,2.295631349395255e-6,0.4177827981066829,0.5082486809965424,0.6669777114316457,0.22453544154364885,0.8280923598415676,1.4571937240532214e-40,0.17484378611890802,0.02509513110180324,6.95597237024791e-5,0.5779252374432068,0.9999532525907535,0.1801872855239806,0.03239624806570619,0.7697885706356944,0.014297033811145958,2.484542206850322e-11,0.2865266570968663,0.5572011884859749,1.6290398291475555e-24,0.42237375900680996,0.08339972043433891,0.5373128786322159,4.466097157668271e-15,0.3732005452687999,0.005375678246418209,0.051779777516626393,0.25482889593691344,0.05147868576216065,7.08406779781604e-5,0.06791614021211066,0.14139174882480432,1.6670116407025325e-8,0.6378529219728934,0.11060210576120133,0.47034410849281205,0.005635373805908876,0.6212811667177832,0.0,0.16183816859591194,0.032747753334472544,0.04118082660821767,0.0043928623532504835,0.058369751330916576,0.008090006111133717,0.5130893741967543,0.22723113045212723,0.5755483884344913,0.7945845896295067,0.06260981618934759,0.2658556015442231,0.028538724725344928,0.8082208255550714,0.9999964888841629,0.007231080815278826,0.838944401445213,0.6726262359821642,0.010970941134541085,0.0649652936435448,0.07814485462197675,1.0509648412558963e-19,0.04462656197828545,0.8676426926812093,0.4415916241045331,0.00010773535195339806,0.17262139730601764,7.719100036544825e-5,0.5439598659050864,0.031007704340535285,6.709526732320329e-34,0.04960107018312519,1.1812011287189933e-10,0.36384187117292166,0.47978957277020257,8.667925662367774e-5,0.7487874859993123,0.4791942314003169,0.05720040235979902,4.929905606613497e-31,0.004184473324096155,0.4654214025760193,0.2438015412698592,0.10858989237141259,0.22174454934126964,1.7167399853260972e-5,0.2417908586364085,0.6231954563459746,0.017711194382277504,0.7527589865219475,0.040287140185478014,2.143190083966803e-70,2.311121890068343e-48,0.35412342817692744,4.1385379025263544e-23,0.07611483696591238,0.15895337968135956,0.6243814993117673,0.005106731040064199,0.3360793103238211,0.3006870241336815,0.425869144319579,0.01682872148117333,4.300457694891069e-11,0.16315326435868757,0.31231210283398997,0.16529928455371073,0.36311706469606,0.00019296876669178378,0.7500326632098463,0.25754668715816825,0.1462587420369795,0.0736161928225455,7.056649913077006e-39,0.0025215500009309814,0.2945680265817549,0.20373751651315322,0.1498635252953878,0.6698824408138504,0.08240817363320752,0.9689126260644394,0.4857159365259986,0.001383408305304697,0.15331480218387533,1.0,0.002859902265723704,0.0,0.08332043642772244,0.07740491832635153,0.0,0.08465227231052655,0.0,0.0,0.005938657847791372,0.027410620657832393,0.048306087412051335,0.7723469113746813,0.1285463816761992,0.546230820275204,0.13025063156588468,0.2936285788490373,4.596289559938036e-14,0.7654224383192765,0.6075836417363294,0.697610518591556,1.9548455329841344e-6,0.7580489622991221,0.02979637479985645,0.027255409006697883,0.00023047678556638423,0.5870877125502326,0.0007462991232593609,0.01457836737480167,0.1609582847033344,0.0006992476854562537,2.215203650907678e-77,0.00485926081389529,0.011714319402329542,0.10518649050569634,0.4126937106708299,0.1289145177573535,0.06180106956832328,0.21726886193068928,0.3703463068956289,0.29129596509577327,8.875488410637253e-13,0.012243202537023911,4.782196903276403e-18,0.013992071762162456,0.29264928105986054,0.31747436468600565,0.6707865281758789,3.651798391614399e-288,5.185949201055434e-7,0.0581328057556023,0.266731449845183,0.623168398224527,0.006092105840874153,0.05272833627653363,0.3776618431975566,0.05340101744512632,0.4291744903632515,0.13713790091832145,0.8888328760048718,0.2814053878185042,8.675531909316458e-32,0.01671595267404412,0.7798155830294186,5.503262233784964e-11,2.3482161069297084e-5,0.6211381651216912,7.386610869027116e-29,0.6389391859880619,0.9108580765629468,0.2354505435299792,0.0007363216079182333,0.5801709915667577,2.0324446330984943e-24,4.046725704894161e-9,0.15284839822588908,0.06422116522452483,0.1397762714422357,0.20012198556047514,0.1840204354746707,0.7107131940287219,0.0005385793445829719,0.11698195492439006,0.34979465339741656,0.3441370615980717,0.763837352795189,0.6626685444705784,0.2729850994021589,1.6051610062024294e-245,1.5325373729407077e-14,0.019284788783358302,0.33435184729947487,0.23663306046373941,1.5748910120272022e-5,0.02586217038759082,0.5619498394980837,9.586205888940162e-8,5.358074519899523e-13,0.3549956512956931,0.37131567899498324,8.849622601149123e-9,0.134643515079259,3.285979759569513e-95,0.2823666915372385,0.8062496339422295,1.3034915435859127e-52,0.4576299023910197,0.00018629413935307852,0.48573721413659854,0.05042940812881494,0.4926604398956021,0.011834508875148909,0.05234556792024314,3.75504624025778e-25,0.13012080333515452,0.06126172151037817,0.9761176808108752,0.09192950292591215,0.5207512986574077,0.11319747318625933,0.748956182202081,0.07267912272901378,0.02213830748967925,0.007626488391286733,0.863383772578241,0.08734082682275737,0.3415450257293569,0.07670137977356628,0.5003720653532685,0.9991185581195301,5.4852522009018346e-15,0.6992576466864094,0.16469410106117885,0.9999999999998502,0.06944448392299268,0.03134012348166632,0.012086574515798752,1.5857050191463027e-5,1.750201420239836e-5,0.6475603779076838,0.02418717422062386,0.09764287938407626,0.6141549252870886,0.5273163124525155,0.16000044025016652,0.49415633965029543,0.04377488346565121,0.002121160280811796,1.6516530282076712e-199,0.23132109144548718,5.5974520630622484e-123,0.029464656260020452,8.457748788008044e-6,0.06626622583534936,6.488979266616585e-16,0.3500152182290558,0.27530937071906003,0.016460814954133485,0.7139788577473535,0.6992033528752233,0.7005116936880507,0.19211165150269183,3.70532508727956e-5,0.04053444551145555,0.3426590103486459,0.10977370017950625,0.450092908870568,0.48816251553587026,0.0026361169809910445,0.4847245504969344,0.0011814982896741675,1.0,0.00012612372128036886,0.21882498058498795,0.0003114183231028233,0.09572481743212059,0.0011126387040008348,0.4361710288520193,0.4933309413264525,3.281380839426327e-60,8.39583494188206e-8,0.2016245943394399,0.32149064051520276,0.23975485234766208,0.7047200809981718,0.009950201272943356,0.47227183614208873,1.5356509032817423e-173,0.6283183305209026,0.13791801513242005,0.9225050421309132,1.110954596225455e-11,0.03675649743537111,0.016378892698257593,0.18838434649174665,5.3896966307183914e-5,0.005611168641583494,0.19711038572660566,0.4451808730938259,0.6493961608863006,0.004168239283258861,0.10913439627305659,0.3324782276695515,0.22406374320069541,0.05633687078149102,0.003173801237946635,0.6426198339372782,1.0,9.347246525250224e-8,0.15957715270394152,0.13269223967612334,0.0005233809107232604,0.5048544172484847,0.04963462083700301,7.009092715296802e-30,1.6638341469272474e-21,0.0004400038019003372,0.0050842758126092204,0.48841705745061426,0.014466740366676846,0.0059434728491111226,0.9598117622750673,0.12182200246344632,4.54165490618782e-32,0.11485906898737139,0.5117228668689721,0.16941070056040985,0.5316730270018195,0.03402362486519374,0.05521704716979972,0.13373340945415818,0.015549379474896648,0.03507811537567496,0.22418235881777035,0.46006705666692044,0.46645714694741003,0.3949901752753705,0.14981309035074206,0.08537507996059127,0.0,0.000907791840907022,1.5333023895816702e-154,0.07845319821539536,0.49766167373571546,0.3726565327906398,2.3247801692137526e-7,0.8946056659601445,0.6097588859163217,0.7170565649504037,0.34460912794574244,0.4928647264824966,0.3453454787013889,0.1734383101459389,0.0023837436245589035,0.5678131320451931,0.014480811951436242,0.6102494176594857,0.31119965485647644,1.0,0.10613390849863617,0.6051494520840881,0.11340734778957162,0.05662081637151202,0.6004968888060077,0.006576525120698195,0.11459376061526763,1.165404489325618e-9,1.9373880705014077e-165,7.420768055958017e-7,3.590509745266287e-59,0.00026144153368269575,0.008541133278611938,0.014863883150129513,0.82843622036205,0.5545187478561928,0.001909666700193565,5.454419821464374e-20,0.09914531405504004,0.24215543686383528,0.6607711721301862,9.402296655199328e-5,0.0006151990603240343,0.3933212923615607,0.20848972081379202,0.5586201072449466,0.007534029371668206,0.3541147134725774,0.297284907479,0.005134824184450095,0.2155662578118082,0.12561879207115995,0.04508984015445556,1.2825736487182893e-42,0.0,0.12597790574949444,0.0,0.061429129316786305,0.22908745112306744,6.05955531293995e-16,0.0,0.4262374866952099,0.21410481415791627,0.4955685008789391,0.0075073759762048315,0.17753238048666312,0.2955194972503732,0.6289320227718809,0.0009726467811503308,0.05574696503885317,0.6328587097754313,0.9407156512469044,0.2242541411693404,0.00026330160479021863,0.6744145958147859,0.5724350646014271,0.005318379816472123,0.0009517048827413204,0.7227143395646056,0.11206618421878177,0.015117248380875687,0.24026580394517233,0.0646841097078578,0.30386692307857527,0.12883431178804422,0.12395657107790897,0.008215618044392763,0.18118115272369995,0.0352577542294171,0.6113040856648366,0.040099917524303225,0.6201239660767089,0.2541859805129763,2.96773737593326e-6,0.45861163612036243,0.6369171663058796,0.042050558770054,0.17796951875070247,0.0034652218643251914,0.4779364772770069,4.1927808183002197e-10,7.722782572095682e-7,0.32099236816718385,0.6838097313894032,0.028378834486884084,0.6397221855438889,0.2172753196528664,0.14133026715931002,0.0,0.7000385981765505,0.00011165610988653066,0.11838378370819638,0.008828206621122305,0.642988568669723,8.770662560635871e-5,0.7079768840058118,0.056554710438612245,0.3459616322843911,0.03744930125286497,2.866060102277471e-34,1.0,0.9927970371156015,0.6969349027829348,0.23752177833228502,0.1407183291476295,1.1659973141784397e-12,0.2502678385491809,0.547390803701604,0.1172239358579194,0.1470917574356764,0.05273713567849716,0.7967819772041822,1.1443007943602214e-40,0.5367041758488323,0.7749136581378204,0.30884735236051364,0.003488275778631873,0.4869517527365274,1.766812714510838e-9,0.0008659293012708717,0.2717959151557578,0.12386738111782292,1.0762943397666688e-8,0.04067005495158301,0.18723646058476837,2.2724411635496693e-7,0.08139574837878447,0.013199034373775077,0.015477421781496121,4.222430996932893e-289,0.24381441152606073,0.005999259709225677,0.0012101223278054441,0.0002887692101423876,0.12532234392597172,0.05914582192038295,0.10174377304249747,0.0012227312044099704,0.00015137120315026383,0.9920123218323296,0.5768176430565265,0.5215859267152075,2.7603257158542415e-7,0.023017343714907074,1.9026770303271773e-9,0.0,0.5886678899826342,0.07108957764706902,0.0189264736435653,0.032922449275046804,1.4994117228095699e-28,0.2095502542868519,0.017715845320966473,0.6279861037234598,0.5096377160940967,8.064769125757731e-80,0.0029681339971588065,1.5309257594380954e-10,0.138674315271011,0.385931525310985,0.8984473989736942,0.20659098128771944,0.6516383082908311,0.9836787397706385,0.5071202341643416,0.00013382607100690565,0.6421669745682194,0.16862949967083757,0.1036047740422314,0.9923144329820358,0.14655366327587893,0.43876212666402703,4.542976197147603e-5,1.1701264838048666e-5,0.03465017260996781,0.45642496730273163,0.3722086569339105,0.0,9.796201326581455e-6,1.9411205395150135e-5,0.7859943302690283,0.0009517040434282598,0.1516859287370728,0.10800964858588016,3.8397090296276396e-7,1.7065697507010764e-37,0.0,0.09021244996631783,0.037476351337926844,0.5400292486884054,0.4490864901018771,0.04965584400890331,0.06074258788134478,0.0,0.11205993282298538,0.16213893130439078,0.0017453975808094913,0.0,0.008195839951313037,0.4610303994155517,0.5438697378940835,0.6797488848086224,2.8793556018881834e-19,0.21116105236051952,0.21381748853842575,0.5131606155568313,0.8678347328451019,0.19345114524804127,1.178146545874613e-86,0.018304397381642894,0.5525600004668639,0.12629578554313117,0.40548347820717334,0.0005019001666911529,0.7105514798860088,0.49971500230150084,0.4385520639694716,0.5124243456572319,0.03367497653085855,4.804419023258009e-6,0.29183480788257976,0.6815384684212624,0.568731314369413,0.22887400883196216,0.07044960105897077,0.08199530331264993,0.35854840904967133,9.448086200591605e-21,0.28274692683884844,0.07016868643166216,1.1269235978357359e-9,0.01066737398153731,0.4903601526041428,1.3225421142639954e-8,0.0007788305193255754,1.95362570291034e-5,0.3658451427759952,2.4489668474001295e-20,0.776996799694951,2.3073661600171064e-35,0.2092435539991377,0.01568235018698343,4.6784151158313815e-7,0.07794646024023995,0.029929450475511873,0.08501874410937747,0.45280280829195835,3.1994138076298667e-25,0.7895474335322676,0.4575180877617174,0.7624405441060683,0.44138387192411777,0.24590651301962219,0.08265202954900477,0.47347150609680755,0.198486748460593,0.9411748535923715,0.7080501441231385,0.0005288033703088909,0.0010350858243287167,0.013958277739854433,6.54631056524681e-54,0.30602865994380735,8.414684215241468e-33,0.09008299405381506,0.11056106707525545,0.6291343566461566,7.5501649913193e-71,0.6207821787016127,0.018054831428996578,0.1849732671492389,0.026900616113102516,0.11310548540944926,0.034685217261423165,0.9999989047469552,0.13414239295955419,0.004438763636216285,0.11695877990682049,0.024951113967073304,0.8387720728550822,0.40253622866987593,0.19980847688455577,0.33546879397783747,0.48257884472365675,0.5891793488605981,0.6884560991949142,0.004111787120991427,5.296819580859296e-6,0.992824801420422,0.001099962375568469,0.0011796579166744288,0.013454907464811046,0.01974532471603512,0.4823757968775746],"x":[6.000505055454477,13.52177141606266,8.220385720848057,15.407740777112586,19.52356388263074,10.244964864551864,1.956212604316372,16.892514703818126,10.541264673755691,3.0139146250384785,18.395812650367972,13.51311996796193,2.745129321995625,1.2580797978843616,12.16581618246435,5.072442726789617,0.2426415751974087,7.511894007652673,0.5142106399937285,0.7013234455315764,18.939303977664895,8.829595495079406,16.754329578121375,7.400395139564568,16.953471767472625,9.702937773074405,16.93712586013313,4.732012049017822,11.903676185263766,14.219888803014818,13.101125297111693,0.30588528583826324,0.8095790792968804,14.941102548717119,18.367279756803605,19.51233796166603,5.4234105340429295,18.544124818672714,17.130203393297446,1.9194114939637075,15.198137886007835,5.278705725066035,8.790590892377171,5.385029155446839,16.097628779938617,11.069453535627618,4.295600846331515,2.121426042087333,3.209596034904525,11.410881513568274,12.019286105126152,13.714580164027549,18.864763448813363,1.7842458341766898,5.855015378008277,11.640013314088016,15.802167576158022,4.893612412093735,18.062604197793778,13.925708130346353,15.865289088776207,5.915401247325818,11.776003244899162,7.235835754272291,1.8881319398103003,8.966161295732524,17.450450822871595,12.493927923527718,10.186598099811608,7.066359719012736,4.818168226740163,13.220093480915986,4.937867824947202,18.14875886517441,9.668189050601228,7.533614644480506,8.394738796194536,18.757151858373938,19.73914031648857,17.655767900640868,14.492236732266903,16.825188568183545,10.514111008051263,8.437140465850476,6.60435634805316,9.15865900225915,12.070692969367695,5.938517380080284,12.401409685470481,5.658648160369406,0.1755573517990605,10.561677254918397,19.33078343105524,18.303475315090417,19.825822457226447,10.242005105830025,13.858063121749641,11.78151720212481,10.171145580456997,9.109756429854471,5.4492874040116845,15.192135586083921,18.29180096899988,12.921468219546458,18.364928123536465,4.121147743436997,18.180517389014028,7.076380928815307,17.763179882024836,14.840235263412293,10.07739119682852,13.280611485421975,13.284935545414855,14.549685944075893,17.59145152088706,14.385911363924047,2.897612951918176,10.251841448698862,14.561497513391256,0.02264002785019592,5.413091138599224,18.026670648871807,11.571911967492795,0.5114495961162469,8.590936803755568,12.617877009969774,10.0111085597025,3.4521734863248987,8.454399013672628,6.385818370379055,2.28486865679832,7.973038878059322,6.268688609801414,18.04569873217791,5.214308385623254,17.4406846834877,9.710273223428295,12.98743758780648,18.74005093596044,13.42916587536688,16.032043933078036,4.274123869967732,12.873492269746269,19.190402493098382,9.177499563794868,19.51450952188654,18.225462509998934,2.7149959399708212,7.3300730852258145,2.7363500694857645,8.934542201171505,16.981586217849905,19.33781678205761,6.935188697862897,14.378448833188884,11.830355596294662,4.311239394058597,19.265005281948937,14.47382741841289,6.663227018028568,19.162617412140275,19.556955262592062,3.256539653947952,12.614164782065789,7.064762530941224,1.5904763618078688,9.494470225480654,11.84695038631741,14.590062365198357,2.871454872372783,0.1587609897986253,15.158823068171747,5.6491233448134,18.034339005027604,3.911500350708952,13.471822571411675,6.2799439154496595,9.204087635334211,14.213099755753147,1.1590141043023605,8.802263820401684,13.829768156867438,15.231019067259105,9.90838492438038,10.07898249736575,18.62334105198908,5.264634203564196,13.147025638517835,10.896484256707456,3.740019715621812,17.092745849993186,13.253342849336946,7.502810299579625,0.2547649444655731,13.518955734959292,1.7130859729560832,0.8702688327754515,13.235840135516973,16.549356365356303,3.0346180026503333,3.3797365145561375,1.0397071541010527,4.149130314945717,10.788971312034885,6.258309390224048,12.376423725099395,18.69446470610647,2.51325442464418,15.28871343527532,10.261575390146378,12.294869919671175,1.3960399006865742,12.837856483742351,3.2557583897107945,16.896756888446852,13.786132829416879,5.897745612538334,4.227723440182323,9.928111625954168,9.17812669484022,12.948376202841727,5.540817985530611,13.553361038144898,10.33674226931943,1.7347865361426784,3.895307401891932,16.31880449866682,0.6840957949459758,1.1690148212261553,16.709322697034594,17.64627572647344,3.1300027320170143,11.004101562470705,11.57637772284453,17.46790747309227,12.12471883036998,7.270993355984676,13.044534468328681,10.37302191217357,4.193239692016011,1.7261409846332176,4.883999620133239,6.392102238565798,12.32297574997974,8.71620850151286,0.22995010197061294,12.820736723338154,14.297888913206297,0.1837758295717773,10.854738054531602,3.2049981267679906,13.369348723109367,9.198508535109928,0.19526738557814394,4.054999806428965,7.93369499275427,13.40517307995932,4.4040819791327745,17.73189072308493,9.072519434613993,13.308478655996542,9.09293447144794,2.4891747639350514,12.330015044917806,13.062026971950203,16.319087724730323,10.04790117295817,14.646333799679345,13.647555646617642,7.427620944954367,11.468595364968493,3.3151644778215505,15.100090977488417,18.44495512318119,2.0992084339428985,9.43974462617029,3.9835935231648323,16.554309585390435,17.855130552911135,15.902522021235663,8.56008331619623,19.93347561954525,19.0235494163542,3.725596286078461,4.455813449068007,6.91817869982581,19.17319811446593,4.913675804059059,2.4446254324866246,5.261778531305379,16.876662803539734,15.634655283610869,14.071703752211121,5.536560231858676,3.082792326367718,14.436577688778783,0.8508490328413698,17.853468188360587,2.9032777718251657,12.024619625801547,6.652153068362581,10.898697536514007,6.253123964517973,11.29854689131685,16.43626920611622,10.909582186620149,8.412530060866894,9.450052444867456,7.40727656886806,3.2565873318869265,4.870928969169075,3.188141611752049,6.484626782840808,8.006414470514361,5.923486565564993,18.118940475549294,1.2727560146610761,3.915175897462051,2.9719329079479273,16.584937283654654,16.38313062490691,9.109672286838656,19.578635961361893,13.290305491667196,15.036932619088912,4.611915907367594,12.363192327168257,10.21082171046773,8.305734406171275,12.609757853682954,6.452726456366222,0.9009346067601065,4.3510841174734605,17.02049933399346,19.17408456320125,17.55826679794521,16.793667511880443,0.5504442440889212,12.868712442348315,15.223205946848037,17.719753411079488,11.95694975529317,6.964687293475547,2.6292332445498,8.204635107537293,8.776182454049103,17.914992240362526,14.695241167493243,7.573767915787335,9.691469714820474,13.494982769285047,0.7805000035313059,4.482095776053128,4.952053328406434,12.40575929331217,2.9328273034331342,1.3865494004501544,3.922004932869143,12.360285774139172,12.430540587124108,8.540258011221926,13.207579640599514,11.619384530102955,15.02304482313383,10.698718486747163,2.5171772298733686,6.485703679151853,7.793806238966359,6.423808152522343,13.13390665728431,8.072978148180937,12.08251515877782,4.720778422857488,2.545697204051125,19.243519852686735,8.814787705355638,5.597968930915145,7.844689101051321,11.901357111405453,15.956526987282512,13.983633569097513,4.612316490734765,19.168557724640007,0.37694265102523605,13.730006336736725,4.746510478813408,14.044723772078251,11.478678222404906,7.346219045661906,2.8594518996654994,4.9662464436999665,5.417882397926843,4.825232942489599,17.008030224709074,14.741515510233668,12.794187484084546,4.7362059392422795,18.01892093518894,0.6329910932157734,5.500653223908714,11.632687733591776,4.942333896439175,0.3571269325938742,4.37852716251383,13.955158253665196,10.404755701439017,2.2435443198153227,16.919204554317105,13.175947291334644,6.464920828313607,8.789561280444671,13.635931001117179,17.672683264973692,3.5150530355860354,10.847887766630603,19.80608960781829,15.64994787356229,7.286020247898608,1.058114252434379,17.027972171356176,12.088161742987808,1.5384090782423465,2.8811815838250743,1.1230015869302301,19.861076115242607,5.611602794545543,4.711081614543002,12.314878316467915,17.275517766569365,3.6652457230155067,1.4897180212471595,0.6771207577810889,10.859270298700476,5.778461243124924,18.92895692993011,2.59702879457675,4.2688094160473256,10.8619202803738,15.612601066960812,9.335661062913108,1.4053186390403338,17.562372118692956,5.135519536478785,17.985022226986644,14.919103189765384,17.55730669843771,5.111880649907645,16.208830146549175,17.6937627102946,0.6459694642606317,12.037298270959242,12.510724162754272,1.291877703136115,16.580624891119097,8.926586404041723,2.030692606429443,14.603328799261215,18.996374738413774,10.464869108303754,17.599098629250012,2.270208908445115,13.02641378080497,6.754097791282088,15.76324394506801,16.420958406284466,18.045972564600028,15.986903362842968,14.964183240462505,15.551409278409682,10.214821149145008,9.031426420085126,0.7238055190996695,2.611225288078023,14.909019667594322,18.42148075623045,8.433202726377488,10.492367917102374,1.4650704587632157,16.583918884365573,3.833278370320947,1.7132553165764497,15.576622563089465,17.32455315879182,13.460985436070626,7.851114520949833,6.063398698881617,4.554650176280455,13.63234871110266,0.22688739406824254,0.3480011050496046,0.6853502019999835,16.883937915348422,3.692452272750275,4.564389314795201,18.40660382152228,4.606597627990938,10.9505110587786,0.8110311372427237,0.8612018954132283,19.983574433479877,16.8989179040152,13.228404394699034,15.494437534019605,4.06640956223193,5.412528724079779,9.734039834961216,2.7042313093964188,12.34727126198468,18.050420170924188,0.4519536515004452,18.91806303674807,14.190933736555298,18.4037929211685,16.09964990421421,13.725713088059575,15.815578477817184,14.197803166957614,19.472917136283343,7.428877294250151,5.352080652656044,3.827335645596759,10.26182860035371,2.788520201790834,2.3557364262838165,18.244629109033646,1.3199268477783654,15.281717711555793,9.673031649613444,0.9045800103399992,1.8970841967095975,15.354673830107085,18.667631730111907,8.596120720759618,10.350929309799199,15.456916334307387,15.04397839527092,3.610518597735979,11.076018511474523,16.787999804382135,18.912138737335418,4.27960501850241,0.9009989961403164,15.364791823578763,12.812263267534112,8.31594999945857,1.3367754398736365,17.252669925425472,11.359725396554046,5.708352995345551,2.8504139250162686,19.39054344233055,16.80427834797831,6.760367466164068,12.223717722971035,18.398792365613993,3.814402872739815,0.05109280892037216,6.465818820885749,11.14975530426927,13.779066235804457,5.827095583420148,16.19394035413484,12.904317614025334,14.522348226692392,17.842818036087387,13.195591846018413,1.982727445142456,15.951016336264395,5.527500873837159,7.153570927850477,0.5142863713094847,15.374128771899658,16.162823065960502,1.9224250469476933,17.77561681048067,6.2208482126298525,16.653492113673188,1.7717925797139555,9.022429863827949,15.969992028618808,10.520995051889003,10.805215969585378,9.954796132555842,9.81807779649749,1.8725566670247273,15.939986858313567,10.400361348325706,2.627638554860212,15.067660733672149,10.737490312361198,5.1459797998399415,7.868502164032942,1.878910315654072,3.186082514218933,11.463828859041953,10.492865852063925,7.051234898959926,4.363406587321821,5.106995265683385,19.075032085389623,0.33503353584042994,2.661649112198541,17.496396012473248,18.66300057266372,14.85319631981788,17.68163109359311,14.971696246191808,17.795659426335284,14.794906638168719,1.8358662946656379,15.628513419290941,8.994262415259936,12.262575094799967,11.948233863225886,19.689502000212954,0.07389065442421128,2.9093004792924937,7.663237018040108,13.31227600639024,14.389241925306354,3.711454850399729,13.252929891238189,1.1330750300775927,14.849026173877773,15.209701994529667,4.819353336480212,16.38015931506121,5.300191860447194,11.480881145341142,14.722064673920524,14.393661963553605,12.66788940941288,9.059876247539824,19.219929544892427,4.057783341819863,18.047301472483905,15.823236578562302,5.7011740738788985,0.9475879458994951,0.826321145301101,17.499924832679522,18.450568786118676,8.39107408061861,19.53539546777246,16.07199502708776,6.305507255881491,12.216318859285265,1.538180050160367,2.0001117635462595,11.258526395043038,7.154297580812723,6.148997250122585,1.3338316008942686,4.357158447365039,19.06960348879258,4.076040238262548,11.698727095987076,3.759670926923384,4.211523834355471,8.320443062949053,14.43302259814633,8.800687108552623,0.9035106713504026,1.7408254446589932,5.142658978895573,10.00516538225519,10.600943452471533,3.2720360301976115,12.401127571496339,3.3750446784953825,19.121969645206832,2.892525827117902,12.523045393556345,16.224182782802178,11.027496813944708,4.163477115455478,0.0910641395716949,17.3643591487836,2.932667628859096,10.62833835702608,2.2286997194698355,6.642521304455857,6.41209599993128,0.6307515872125746,11.910108920737077,19.06635532939309,1.0545805209896386,12.996234400248303,13.79294023395512,5.133137829809229,11.558777929310779,9.517231736720966,11.75255814020006,19.36319053190244,6.184745365769344,6.267594662655163,19.841282725481463,17.008661206847258,19.405603154934177,2.6963964308214594,5.556245837736351,19.365523352655607,10.959388208617419,19.00098550770588,7.6260629943064995,13.210926087923625,6.270712539756045,19.951543188224434,6.564295300346266,4.878098818265206,16.9260349103557,11.176785755632853,4.420344132337997,11.764432305507855,0.7323125641323269,13.575146817643553,0.8178665751270797,5.667720832801044,0.5917080876760572,4.303979714128707,9.024820209298365,16.406320747708246,4.967021476988789,13.814820428918125,6.597816037007229,13.959112485364917,13.353212310641442,7.416062412081921,18.78555847147326,9.800776081441022,7.304869277671728,14.363249746465394,19.598773778443746,8.539893301765712,6.065563479749114,4.96879665697203,9.677619977446476,1.0695783677036008,15.445314450768478,8.278459044177149,2.8186851217498043,5.493102837112214,8.575820697108995,18.46190606737298,17.039635645788653,11.412498085392189,3.1565335990900856,16.818725307575995,17.050321005091913,15.006139815617034,4.345632329159259,10.638678595352955,13.84889217361387,15.648606106634562,4.771741023945064,13.34286259949678,16.98811810056975,13.494063509462597,17.869869385735953,13.843003254615006,13.036087430553787,8.138447315503505,14.670641061155454,1.7524022426000263,3.5847946940665665,19.832285604124035,5.071034517332356,9.25293927921642,19.54769835749607,3.1855453926198196,3.595352895871833,15.479121339894863,19.07597112302547,12.69518970619075,16.001715227616987,8.506806727048177,4.256574895575405,4.917296502412314,4.937262189923803,2.192495144060671,5.958164112927857,15.612364554823145,15.191767903263248,6.429007209557311,1.45465776324611,12.315885669427917,0.9156468470713985,10.497575481175803,16.977008354231693,16.538270701325434,0.70552313421123,14.957403010684951,12.725506767741685,17.255093542874867,10.990815510303173,13.215616669684533,6.193599904704543,4.910343464219662,15.850167700407138,10.260030606904769,0.14089723608066151,5.307344448481568,10.090706735473415,16.14534226002213,19.370449758454612,7.350141108311656,18.801768277579196,19.122260494913593,10.52299499419497,4.436474992446389,8.336220985340287,12.600922685482123,15.305981168822417,19.16687403563583,4.347973272743193,19.45858031447103,5.002471106175181,3.9921674710870647,3.566921482650809,14.706068386034277,19.864821509461322,10.13380880569188,6.978109835675994,16.602545935834684,3.927072012574504,16.779872697130674,5.684192869365736,14.214626971545016,9.911403240661162,9.299795610936123,7.153474941992313,19.89133661659684,18.255775335356333,0.40608402933962395,14.217697330676934,6.451097466964697,14.998224324281445,5.4075733551246685,10.701181791947727,14.903818183840766,16.588185069155067,4.694465383869244,16.113733845624903,5.8929927927622705,9.240810928027706,15.850630228872049,13.240367578451075,10.815542524761565,15.59304318497718,5.547292025746278,8.962161761445682,2.6513204337632157,8.331242279359103,11.770337976267044,18.743558723258715,13.536013375622131,19.178951312015585,3.506415038743045,7.79259304805946,9.91284395470279,16.853356343980774,10.860931963927456,9.764669176419293,1.4884034564861182,4.547499643680473,12.487433642485728,18.2328824950139,0.46788857985576193,11.428629753082387,19.165808929944802,16.801206619582366,17.813585507477484,15.960416728638593,18.821545885743728,14.715535377688713,18.036404661153323,1.9727577246081562,2.268631818364444,7.193852812753634,14.042391026617938,15.618220490736864,12.471248096602373,1.5005368723121393,2.076289598449126,5.687131981975551,2.2572458599094425,19.441545850006374,1.2435033319094702,10.67487824783601,4.390768470466617,3.8173970376474875,1.3472192039341557,2.270697489176561,1.4405567815588283,10.281980868548036,1.5984519240811368,5.582483152471345,9.337865834253037,16.15554207013517,17.788699495291453,8.290891194520729,14.461022528019054,16.872375262641302,18.16292697566057,2.9831970857684054,4.244618710348678,18.22557348640582,9.627288932415205,18.653306608815644,6.217501653554662,12.84983064631907,5.496400342292231,14.280682489520142,17.058161476263574,14.413228379087272,5.179806417548818,16.53600842968022,15.95064533604861,19.03257408409521,10.656163204338377,11.47285394073345,14.36899929938161,17.303073304449555,12.895387042302016,4.008542284689254,0.45384457741142636,5.7757964145241125,4.8211380939930315,12.472081303105934,19.054859920578643,0.2717663502481704,0.4833673298266561,11.361751986937323,15.874780285057867,4.1581962005004725,16.5808895142704,2.973645384611099,12.508817816274247,3.776831167954273,2.832971201650789,5.755988188923582,16.41340204997467,16.79846065473886,8.881102254636692,14.079540287588097,4.791180923131546,2.2776331573301434,9.980921746797694,3.0715907220737204,9.858438179858432,15.084174895780947,12.897704578007723,6.3295523091523265,7.643287435830888,17.68227260908011,13.676133699489359,17.510518415368285,2.294345605389463,10.56731600823463,9.42090647957739,17.097206630067525,9.414944384016968,4.742276859021546,11.939298532114279,0.18602144152931377,3.861923194377974,2.669352920648338,9.558499359679598,16.231973586881246,5.979150922005756,10.188023960665138,12.843098772837592,15.835761274006321,4.091915093282168,12.541619569622169,5.071976241681577,3.1195587585359164,13.017318221169894,5.198931324455183,11.7736814170987,8.998088967425382,12.69007004938365,2.198192858237644,10.296131927535397,7.808638305514446,11.438364391013934,9.846807758338084,18.592430363075778,9.144728628007952,13.537286936435326,13.819033774164486,14.926746531853258,19.132695962540083,16.48894933643583,18.30303714855924,14.147804631226833,3.5116043339598413,12.504535800266602,6.838978814635905,16.76629100624588],"mu":[2.5468239627539435,5.682176277174791,5.21985460854415,1.7531757251571123,5.197896883214963,0.3249281559600603,5.033736598325951,9.316792155481565,6.766972920717691,5.697823813449077,6.306621877225062,5.760380531005341,3.591782260393428,7.302584559848871,0.16656549922839936,1.4545163268645767,9.86038283500621,1.2778846700940982,1.5490407708117004,8.01515527577206,5.432248452859431,4.954550129412065,0.41805611050576896,9.737453373796953,4.103092245510651,0.8538758774197674,1.3457984586088023,2.067390172966157,9.47944008826154,5.261155463031457,6.484823340705821,3.7752809412802013,1.9073819599953667,0.5781992626530763,3.2148500602547325,2.1945700329336026,8.020746432340877,3.872302385450872,7.024625561389833,2.7898336057622797,3.216335578224825,2.7800636358240483,1.4662140520900313,3.335885977519313,5.448052305281347,2.8645977012962187,5.95270765630506,0.9200454203157094,1.808725668430724,8.512166417331084,6.740316755805811,0.5150214233240891,9.61036037022338,4.658462704561101,1.1642699517963906,5.842186491072672,6.816748890314555,8.21596371858131,3.093105783886525,6.10105199484982,7.332418391054616,1.0188118073213337,9.60174717950691,9.977024086444326,2.3797314910995815,8.510326123949381,0.6007486707008503,5.889422468002145,7.258047172929563,8.473030255379005,9.36227946471815,1.2746532046792902,7.859337305783676,9.919527446679197,7.621330678189349,5.04032982924655,6.40343218984639,4.110361139078924,1.4584763005854606,6.60773649394711,6.4488553114599885,6.868537767050878,0.17081097720869298,7.760600842331405,3.4494361457159384,0.7348229818604968,9.316791103323629,0.02251834923357343,8.692533218039616,5.090340122785035,7.882679633010694,9.22929562123686,8.242565613517137,9.413576476835955,0.7846578529454074,9.161464184578854,4.120449855630097,1.8339289884357801,9.929817508910759,3.960180316202637,8.271398164606016,2.512889731807475,1.3079904274372334,5.803990648895791,0.42528642354564106,1.9749246727586889,2.7662769565893996,2.633045434669934,9.58937007247526,4.713946466710164,7.665814678160667,9.387178819001367,7.35770716903658,3.810235310667769,3.79456103544098,2.6160542883955307,9.04758933354709,1.6699021066222741,4.472253540999425,0.06594870478591197,0.1839913539302307,0.16202813942457261,9.32012334347062,7.862818219575782,4.3996954602903955,0.9775428436775901,0.49234588976957205,2.4463280116543484,9.939792408166246,0.08280512685032715,0.9087258972039902,6.8327199692342155,5.168323501294267,6.289630355642782,7.871301255788319,8.521861952475634,1.5803607590289137,3.390037575352285,9.029656945328357,4.8261039413586175,3.9847503299933074,9.928245758447956,3.292669529523775,8.852244471648627,2.5154600606448563,1.4372900040930348,4.8488681930833195,9.676414692269606,4.8120999981080725,5.40282274993994,0.013697856798176034,1.1980275306079835,1.5093887091939617,5.8820858498660655,9.630604317490139,2.9817005753926473,6.10504164532837,8.720683276011385,8.136400486840676,4.9154507126666935,6.4491581080957445,7.873100203652075,6.608174370059324,6.232488154534892,9.879171875868094,5.241150642498525,1.8947390235543082,7.100396679880038,9.028180842521342,1.6165965335818222,3.1429178448629957,8.225747635863005,6.362516179121713,0.9343369159249915,4.842017694586542,9.056497273677325,0.8824583971308075,9.869051087897397,6.728347029163495,0.9649435691110231,6.212917870658574,8.275321284627255,0.46622119736661416,8.717616524810964,6.785003955041837,8.003914826491869,2.4635159305294296,6.004269355707306,5.199639999941301,7.61335508596283,3.9937585364406036,4.133873439435813,7.949573036827584,4.319096110617766,7.618699373360989,2.858218107168524,4.572779089671974,2.4510385502529597,4.782178397684955,8.531939148714219,6.975633229388021,1.1817194370146233,7.024413085836829,1.3169711097251358,0.5488883880708673,4.90457017655777,6.097398815089705,3.3427796000386967,0.7650227916333474,3.8520841051247245,0.6067848550063593,3.258270799893601,5.445064796522805,7.132012386502174,2.2905613848867756,1.9165043532469572,6.632140461648373,9.194659553230897,6.733358669976064,2.8330603432552603,2.7224555402763584,3.4315424610080014,0.2952471536978285,2.822747467169149,6.27106071055435,1.4937647153867473,9.30593922821596,9.693071792379413,2.0391721063006663,6.333543163673914,6.33161845059716,2.236181890790403,5.719313300159932,3.037474433831615,8.85336876090749,9.23444937230826,4.713185811606946,6.941932367069603,6.896415134818086,5.4837258135252664,6.603684211295757,0.29581496214354575,9.31552404860609,3.7075365282588746,2.277538676530506,2.0995855316156886,5.622133387897799,0.4709930395357542,0.040871219684706084,5.906163797225277,2.5783445004334538,3.9040606793987576,6.278092709979872,6.7884195283975135,3.5653576318758518,5.1297117629247,7.49735918137082,7.996710141452046,2.3710959250205543,7.81814879160744,8.02253675081432,7.936365090079692,0.45051425541897006,8.471969686612198,1.208673675533567,3.8520362438146183,5.584621918496728,4.436139624392923,0.6820488493574217,6.279280870513018,2.996863478237055,0.14481111369768707,0.9986292034114164,8.419755243437876,9.418715175128,8.734983042321998,5.936229879049337,1.3907369508296252,6.405991419513453,2.4858832665614883,6.060896796770496,3.000094230898378,8.24518967070619,9.10461348510439,4.7339903110538035,8.728560859807153,0.3742357076280256,8.98152316145133,2.906456092334664,5.437322692513639,4.632868171336703,7.816045823551252,6.969287143089337,4.525264498261777,3.5355409255379344,7.185119405942446,7.924109536151953,5.9214315514668625,5.990101795527605,8.715639524843075,9.100992835038326,1.7084551452179308,9.034042202958254,4.401734579436651,0.7913480346175361,3.245062021964129,8.218937574251044,2.433280101081179,8.458993703406144,6.226066974927118,1.8212082651532446,9.629195062760452,1.4077653408728374,6.374383019171379,6.732714476854619,2.2232848290732665,3.7404017655312227,8.860477625754804,1.0288271278011463,9.223121796147943,6.740285405478228,5.1825312624694835,8.938489391312256,5.636178219562613,9.769270576505242,2.0918027271138318,2.414819254248197,0.42192529462818706,5.623889705372385,0.7595460747224791,3.946342151668847,4.231715334827866,4.337825854205192,7.4734586883916005,2.3586488391376847,0.4734061514327581,6.241991270912424,8.171337807347514,0.8993536161253135,6.180933200106111,6.119166074889981,3.5135300542832204,1.3559340234402417,6.532726641928292,2.7910690056992227,6.8559930015660475,2.5894439803496305,8.958580774699271,2.8534288173542643,7.09553723526672,5.774559233478492,2.8915440788548707,7.374406342305542,9.449030181549777,5.013068740525024,3.6655908546147065,8.14377454390387,0.3251657209483838,7.326442219518292,2.885025339332148,6.977107720984977,1.5656742794961098,3.9822874824183607,3.062676523796677,3.4008466573422447,4.672180858565254,7.796039542882653,8.648816473551573,8.65542907809443,2.52389377322521,4.797884370198799,1.9014351988610234,0.46506859669277034,6.587965193954508,3.9673264466942437,4.896488865678887,0.09057721358928239,1.3383798982714534,5.911625596496137,1.4457077409601893,1.967833756895201,8.916701394389179,6.123839494623004,1.5485665563597362,7.994226915999263,3.890165790374942,0.08301226420894148,2.7274975485878383,7.147080142870122,4.417957491480367,6.631578425934903,1.472663834167467,2.713126977323992,3.096763929462538,8.519153873376048,5.9882368475479275,1.7793821379094532,3.0011577527640965,0.918181036790624,0.4858088136796379,2.5442689374221272,4.701619951648137,6.385405100666062,4.826927319626632,3.0584835829591084,3.7409778619015244,6.254089414039363,5.837671961789304,9.00433153822567,2.27975341087834,0.8993376295207778,4.287718103530144,0.16606603303271017,9.202064867145033,6.110612864487912,6.460422337692786,3.8994271570952987,8.163213840280418,6.281675064868571,6.4401799065023475,1.7954544517270743,8.56837933575826,2.8575500968416567,2.071568484237749,3.5870678169911407,8.905601409131265,9.885625170894436,5.476474119616695,5.090994818005116,4.972244329401255,1.9057114832941568,2.9507270161214105,0.18662763249234438,4.7470404180919346,5.576188119951546,2.8524318152454398,9.570556308477435,3.5860848418785496,5.268281318465449,2.9402259653508067,4.585315138077551,0.7045612178727056,6.590967648870134,0.5362066698605106,2.8141840708345023,5.926875618598455,6.374082520669351,0.9935737375422904,9.5334182119835,6.635269233853773,5.451341170885056,7.208854958882509,6.145727675354431,3.097025309539394,8.957702229086316,8.066770841043478,8.085211876604156,3.9045085644053623,4.7110575900921114,0.8408685346646849,5.660568490560127,2.1853165959257526,5.690420324328896,3.7826888108626466,8.468841117224049,0.23420318477640478,1.6313601958312551,0.436566930960649,6.396900325920294,0.39878579306279915,6.543417626766828,8.45246388200952,2.4171787722246707,1.735979381305437,7.957386219168152,3.9361399731251145,7.025099380030233,8.732860958808747,9.389025997558472,8.173867628081242,5.856393334954824,7.2208036945868574,3.222837682423021,5.849421527451401,4.317653224193398,2.1938269931005183,3.064189547177245,5.096823056727642,6.59561083155989,5.709814118636372,8.59393247069905,8.900918994692269,2.053475540729488,3.6746870147199107,0.7684576741499716,6.147838474355554,4.5967692512901115,7.046879217277131,0.722310324030988,1.7534520492873718,7.942752599670088,8.89917946140619,4.11376754043687,8.656940290017294,2.1484443723692825,4.994081511715689,0.3496058907976196,3.6056246176951,9.611617274804217,6.361681349284076,0.7474521637734344,9.310183227552255,9.923421109377589,2.140770093247504,7.320343641856153,1.240427260273036,0.8651727245559027,6.41568218192522,9.61128462948096,0.8212990190031788,3.0775203889268465,9.637341051695149,5.433446556238031,5.833257205559999,5.2280950814928655,3.885422646635679,6.184574538374856,1.4249710444619201,9.620279035176837,4.679484600668584,2.7615515787251566,4.569271813570515,0.9234133837708569,1.840720439410104,5.726438496092108,7.569717355995776,8.394568170448588,7.964330869197747,4.22075926117923,3.613522283253905,7.3230517883169055,4.312422644375524,2.6073770801740936,5.540662550896867,8.626892875292898,1.5847362311610347,3.578620174403484,5.145508155381768,6.741826813224547,8.897580389469608,4.766555828255877,1.716322913727184,3.81811518805216,2.6440856378245448,6.220754707490381,1.4619845434356926,4.3637604707454924,1.9470564759423659,7.146610093126499,9.444759189842797,3.9699584272968846,4.15226425760048,8.874365792263209,0.0050652224665292955,7.636957524822325,2.3541330377746683,4.466068127093563,0.3879767737482287,2.482153021120592,7.7535259394758675,1.604465475361987,1.3890809521360459,9.094059533776619,1.4427637846255448,9.324398218994192,1.8255977621698194,0.7115193925924856,9.260918944410452,2.0431332339914743,5.919434741029255,0.29654886034624406,9.292993143046273,9.092430616566777,9.268062025872567,6.089694706775806,6.8250999206486895,0.9653995649614178,1.236815436321732,7.2145530499132615,1.3444016976862416,1.4807693468829042,4.088846985310417,0.6669243572945915,6.311705993460157,4.563709598238086,5.679929063402773,4.288562566891665,9.471635786197606,8.531005290145707,7.577686780529054,3.3267941960616865,3.470309908978093,4.327165282976395,3.3538312856650943,9.200045312670667,0.4435492746948677,1.4819199928513749,2.551177347445439,6.292773673734519,7.739461494590305,6.6924302634557,4.013306948517239,3.397965399757814,2.9792008389333557,3.002178479462523,3.6710181963340505,1.2328017959053805,5.6461622484271246,0.1630336637939278,9.566250515486969,3.6219891583468633,9.695578201479071,5.230388607033783,8.543469598503483,3.1346469630207463,1.5944761629663295,8.326236208635232,7.8465910938978904,6.010413770156797,4.490632562028331,5.664096742014875,0.9977814301868393,6.7481844566598825,3.069846802768148,9.357909069223439,1.7196174380646778,7.661838215603121,0.3905184029594211,8.601512383217965,2.9730144691908955,9.177158023902635,6.805565460322043,9.546465991869555,9.437925733598574,6.1837619016550915,2.3159590619108594,0.8281251501914744,6.607771098157635,5.3699868354610825,3.7773681032104944,2.7841253111281294,9.250932322019796,4.464990633647792,0.3184082828613155,0.48747816693877066,9.585027285198926,3.1580350533603774,6.284236689067148,6.763684195065975,2.0759134889519815,7.443368919321129,8.752350083583615,6.928219575373367,8.347984650095974,9.816255910065818,2.3311915721074294,7.6544501873775905,4.949012202238339,0.719880463721041,4.4604419146917085,9.762802137099216,6.741065932613399,2.4179626815910815,5.310375452912776,2.3801632553173624,8.903076422313863,4.307046504753831,7.37938197542531,7.928137798371151,4.978442212961172,3.5758045629361934,2.1227288075518946,2.2181160152129342,0.8281410284934965,6.005856848347362,8.179932948869954,7.159792549727479,9.945458564464477,6.0495353421726605,8.173592216212333,2.4694132357067256,3.5116471855117903,8.061430936615434,0.6602709296822362,0.8693121165440076,1.6266349478534181,4.928211725772265,2.9094086056511292,4.378904977813718,4.5312926675966825,6.552985733538527,2.1759515518648653,7.773926985858452,1.8758339130644486,3.139879837613253,1.2299098664249053,5.053262623621803,2.379311224718008,7.814035960715513,7.213846513334909,1.686404408672455,8.67314228423618,2.3567093789151317,8.61112458844737,9.660306594799675,5.083431474376992,3.472049678434175,4.603791943413082,6.4233955817202855,4.978369642364131,1.8764333674189881,2.319606029716723,6.765603040290813,8.934802674835804,5.8952870680325775,4.670394592007721,1.9637139010987648,8.798538124974847,8.54056623181295,3.229181385499502,4.889802307609534,2.5397298505871913,7.022906349174695,2.7569898028669892,4.149927762016549,6.089186677285672,3.711242339581682,1.9978402871174694,7.944245573840396,6.8873142377420615,4.346900987166702,4.953556123414846,8.05205123042442,8.751519665335628,4.379690044572914,9.662290860794018,3.3861704599499687,3.4846490476763337,5.850942043540764,2.748089399676541,2.746556836319798,6.07450489309759,5.22200103983584,1.6411045916456102,8.80098570479587,9.584621374154949,2.330272039857524,0.3000263864365471,3.943294049914241,8.216141584978057,0.7220996460426887,1.4850169897160792,8.126631942662723,4.193740380488751,0.14147984368853006,8.281448361053725,6.557849003874614,4.720243599720764,5.197747945958633,2.6031683750779155,4.973696505392635,7.532108590887352,9.834758985322132,5.615685750070765,6.519278189416584,0.982824733190768,8.311454284643744,0.8288175429909783,4.798944540869794,9.46382588475872,2.171808069795138,1.8912878992188031,6.030818727089729,2.484684018102654,8.144396022356382,2.685134691690727,5.087587690995985,9.67615113800887,4.9134249811709445,1.3310423781678415,5.667800260950024,1.2090630683761416,5.563156970868026,6.2045343565740545,5.837249527708526,0.7016130023987155,7.374012959151814,4.218823513697412,8.779083151107072,1.3460438456895285,5.277736310251077,1.069549706020032,6.301918275147653,3.1833038197274655,5.10646836058664,7.499298598943847,1.8487025507428756,0.21186229094359188,0.016507011568764884,4.4422593703263225,5.752849430065423,4.588859855656871,4.25788878582551,2.454179141285926,6.543500497604211,4.824591828786817,9.308237575875316,0.008818819765130659,5.3915835298362325,2.3232886360776206,1.0306132914620236,2.9192844737913592,9.462254284801233,2.839904373346569,7.887068221295122,9.602792418732832,4.548010614520823,7.840098614937481,7.2981968853878865,6.975727617209384,4.643984447982961,7.910662286110314,8.88880515906758,7.604605638874635,7.659328389286935,4.4943343197801,4.3855219118210975,8.04801308117533,7.288177017075254,8.976232794078015,7.223718423470247,7.813495224673172,7.9233321800477,8.421095816391414,8.75703525071205,1.6243682418607808,2.310931444089226,2.2568178679122597,7.497309314739857,9.478358796773627,4.890095172690887,3.1821111311636807,1.9181428958753433,8.338867888543962,6.073522105358906,9.483472944959095,5.751230546735558,4.800499212547571,6.392750897406227,1.4934094581433977,2.745355635488309,7.6226484709626074,9.90179437412079,4.127156255408995,5.0766329215377155,3.7527864794940924,0.709762803743268,3.3088129053936832,0.5891865045183264,2.647765182482682,2.7541731779344314,3.6149489554332415,1.5341585140582414,7.167877480102359,8.937847792741348,0.61626662505335,4.5776284488828995,1.321328852714132,9.014802947962927,4.300378982399442,4.454673458389882,2.6482923509345913,1.4546862863432675,8.708300106514779,9.098909017103189,8.869457262212224,0.39228692525209885,6.0237769281374876,5.0697326058997705,4.557435758913229,8.454944900389279,8.125425273623648,4.98864022760817,6.675790005809912,7.72827090838248,0.006587543296872056,2.283024212064364,9.277153500344719,9.675059202058389,5.552138219272136,7.8147526473256335,4.977351096427061,6.414427624128032,4.190118051527849,9.879027612921746,1.562570479295693,2.54210168577508,0.08168524350044004,9.400115909789562,3.3315596071680664,5.187545379750436,1.6805956634159158,0.7319807155609381,6.269420419929492,5.26631322139302,9.904370980839893,2.247821682075486,6.849955397122018,3.52488927273779,9.57461786067492,1.5837452548456943,2.6663734909298165,3.0675161157514585,2.4189636475102327,8.493547320098099,4.637273990771584,4.047156789926802,0.9248761315863208,1.783636516250413,4.924105223331161,4.237054907952849,5.756449391410452,3.6405962663650593,7.428051514386144,2.226608624746862,9.24078296124691,8.743295062375712,4.7916388025744165,1.3714436742224345,6.112286816620395,5.151340713076231,8.060697462158608,4.08564379304015,6.959658820399324,0.7806493293856143,5.8145609391891195,4.470762795313772,7.499530729474411,2.941762729368911,5.8186926152666985,7.30558271425614,8.665451404170987,2.190865655634462,8.30617347240895,0.4642987211440741,2.9812816338531567,1.734773762579973,1.0220459197585319,5.54564520912227,8.914816596933985,2.99605357725214,4.507586214277913,0.04931310986559856,1.2643931662363972,5.129651097602133,9.186150921554368,9.484256872572631,7.370495816168634,5.168088244510285,6.551461583533564,5.974529113572682,6.064872307180071,1.2097805383516946,9.713450562753618,1.685315449022784,6.921485648295597,3.8729602324833667,5.961357033351183,3.525368102330728,7.0729619471013505,0.2039221505358979,4.689461314941101,4.129024665894279,7.424203495256232,8.946984977027011,1.3483392569301178,3.3306902729445165,6.815438230743198,4.245174554604256,2.7850507006141045,1.8244202982923308,1.824827589397462,9.820070812050268,5.129520839912849,2.469866423704057,5.36045043521286,6.396837878529944,5.129062505812978,8.468037957827852,2.9202364223204103]}

},{}],124:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `sigma`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `sigma`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `sigma`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	sigma = positiveMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1500.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	sigma = negativeMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 550.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large variance ( = large `sigma` )', function test( t ) {
	var expected;
	var sigma;
	var delta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/cdf/test/test.cdf.js")
},{"./../lib":119,"./fixtures/julia/large_variance.json":121,"./fixtures/julia/negative_mean.json":122,"./fixtures/julia/positive_mean.json":123,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":282}],125:[function(require,module,exports){
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

tape( 'if provided a finite `mu` and `sigma`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `mu` and `sigma`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `sigma`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

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

tape( 'the created function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var cdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	sigma = positiveMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], sigma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1500.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var cdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	sigma = negativeMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], sigma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 550.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large variance ( = large `sigma`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var cdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], sigma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/cdf/test/test.factory.js")
},{"./../lib/factory.js":118,"./fixtures/julia/large_variance.json":121,"./fixtures/julia/negative_mean.json":122,"./fixtures/julia/positive_mean.json":123,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":282}],126:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/cdf/test/test.js")
},{"./../lib":119,"tape":282}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var erfc = require( '@stdlib/math/base/special/erfc' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Normal distribution.
*
* @param {number} mu - mean
* @param {NonNegativeNumber} sigma - standard deviation
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 10.0, 2.0 );
* var y = cdf( 10.0 );
* // returns 0.5
*
* y = cdf( 12.0 );
* // returns ~0.841
*/
function factory( mu, sigma ) {
	var denom;
	if (
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma < 0.0
	) {
		return constantFunction( NaN );
	}
	if ( sigma === 0.0 ) {
		return degenerate( mu );
	}
	denom = sigma * sqrt( 2.0 );
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Normal distribution.
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
		var xc;
		if ( isnan( x ) ) {
			return NaN;
		}
		xc = x - mu;
		return 0.5 * erfc( -xc / denom );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/erfc":66,"@stdlib/math/base/special/sqrt":88,"@stdlib/stats/base/dists/degenerate/cdf":116,"@stdlib/utils/constant-function":145}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Normal distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/normal/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/normal/cdf' );
*
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.977
*
* var myCDF = cdf.factory( 10.0, 2.0 );
* y = myCDF( 10.0 );
* // returns 0.5
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":127,"./main.js":129,"@stdlib/utils/define-nonenumerable-read-only-property":147}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - mean
* @param {NonNegativeNumber} sigma - standard deviation
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.977
*
* @example
* var y = cdf( -1.0, -1.0, 2.0 );
* // returns 0.5
*
* @example
* var y = cdf( -1.0, 4.0, 2.0 );
* // returns ~0.006
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative standard deviation:
* var y = cdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function cdf( x, mu, sigma ) {
	var denom;
	var xc;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma < 0.0
	) {
		return NaN;
	}
	if ( sigma === 0.0 ) {
		return (x < mu) ? 0.0 : 1.0;
	}
	denom = sigma * sqrt( 2.0 );
	xc = x - mu;
	return 0.5 * erfc( -xc/denom );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/erfc":66,"@stdlib/math/base/special/sqrt":88}],130:[function(require,module,exports){
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

},{"./is_number.js":133}],131:[function(require,module,exports){
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

},{"./is_number.js":133,"./zero_pad.js":137}],132:[function(require,module,exports){
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

},{"./main.js":135}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{"./format_double.js":130,"./format_integer.js":131,"./is_string.js":134,"./space_pad.js":136,"./zero_pad.js":137}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{"./main.js":139}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"./main.js":142}],141:[function(require,module,exports){
arguments[4][134][0].apply(exports,arguments)
},{"dup":134}],142:[function(require,module,exports){
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

},{"./is_string.js":141,"@stdlib/string/base/format-interpolate":132,"@stdlib/string/base/format-tokenize":138}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":144}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":146}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":148}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":152}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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

},{"./define_property.js":150}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":149,"./has_define_property_support.js":151,"./polyfill.js":153}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":140}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":155,"./polyfill.js":156,"@stdlib/assert/has-tostringtag-support":20}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":157}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":157,"./tostringtag.js":158,"@stdlib/assert/has-own-property":16}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/symbol/ctor":143}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){

},{}],161:[function(require,module,exports){
arguments[4][160][0].apply(exports,arguments)
},{"dup":160}],162:[function(require,module,exports){
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
},{"base64-js":159,"buffer":162,"ieee754":265}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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
},{"_process":272}],165:[function(require,module,exports){
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

},{"events":163,"inherits":266,"readable-stream/lib/_stream_duplex.js":167,"readable-stream/lib/_stream_passthrough.js":168,"readable-stream/lib/_stream_readable.js":169,"readable-stream/lib/_stream_transform.js":170,"readable-stream/lib/_stream_writable.js":171,"readable-stream/lib/internal/streams/end-of-stream.js":175,"readable-stream/lib/internal/streams/pipeline.js":177}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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
},{"./_stream_readable":169,"./_stream_writable":171,"_process":272,"inherits":266}],168:[function(require,module,exports){
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
},{"./_stream_transform":170,"inherits":266}],169:[function(require,module,exports){
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
},{"../errors":166,"./_stream_duplex":167,"./internal/streams/async_iterator":172,"./internal/streams/buffer_list":173,"./internal/streams/destroy":174,"./internal/streams/from":176,"./internal/streams/state":178,"./internal/streams/stream":179,"_process":272,"buffer":162,"events":163,"inherits":266,"string_decoder/":281,"util":160}],170:[function(require,module,exports){
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
},{"../errors":166,"./_stream_duplex":167,"inherits":266}],171:[function(require,module,exports){
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
},{"../errors":166,"./_stream_duplex":167,"./internal/streams/destroy":174,"./internal/streams/state":178,"./internal/streams/stream":179,"_process":272,"buffer":162,"inherits":266,"util-deprecate":290}],172:[function(require,module,exports){
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
},{"./end-of-stream":175,"_process":272}],173:[function(require,module,exports){
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
},{"buffer":162,"util":160}],174:[function(require,module,exports){
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
},{"_process":272}],175:[function(require,module,exports){
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
},{"../../../errors":166}],176:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],177:[function(require,module,exports){
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
},{"../../../errors":166,"./end-of-stream":175}],178:[function(require,module,exports){
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
},{"../../../errors":166}],179:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":163}],180:[function(require,module,exports){
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

},{"./":181,"get-intrinsic":256}],181:[function(require,module,exports){
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

},{"es-define-property":241,"es-errors/type":247,"function-bind":255,"get-intrinsic":256,"set-function-length":276}],182:[function(require,module,exports){
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

},{"./lib/is_arguments.js":183,"./lib/keys.js":184}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],185:[function(require,module,exports){
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

},{"es-define-property":241,"es-errors/syntax":246,"es-errors/type":247,"gopd":257}],186:[function(require,module,exports){
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

},{"define-data-property":185,"has-property-descriptors":258,"object-keys":270}],187:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],188:[function(require,module,exports){
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

},{"./ToNumber":219,"./ToPrimitive":221,"./Type":226}],189:[function(require,module,exports){
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

},{"../helpers/isFinite":234,"../helpers/isNaN":235,"../helpers/isPrefixOf":236,"./ToNumber":219,"./ToPrimitive":221,"es-errors/type":247,"get-intrinsic":256}],190:[function(require,module,exports){
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

},{"call-bind/callBound":180,"es-errors/type":247}],191:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":249}],192:[function(require,module,exports){
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

},{"./DayWithinYear":195,"./InLeapYear":199,"./MonthFromTime":209,"es-errors/eval":242}],193:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":240,"./floor":230}],194:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":230}],195:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":193,"./DayFromYear":194,"./YearFromTime":228}],196:[function(require,module,exports){
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

},{"./modulo":231}],197:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":238,"./IsAccessorDescriptor":200,"./IsDataDescriptor":202,"es-errors/type":247}],198:[function(require,module,exports){
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

},{"../helpers/timeConstants":240,"./floor":230,"./modulo":231}],199:[function(require,module,exports){
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

},{"./DaysInYear":196,"./YearFromTime":228,"es-errors/eval":242}],200:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":238,"es-errors/type":247,"hasown":264}],201:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":267}],202:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":238,"es-errors/type":247,"hasown":264}],203:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":200,"./IsDataDescriptor":202,"./IsPropertyDescriptor":204,"es-errors/type":247}],204:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":238}],205:[function(require,module,exports){
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

},{"../helpers/isFinite":234,"../helpers/timeConstants":240}],206:[function(require,module,exports){
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

},{"../helpers/isFinite":234,"./DateFromTime":192,"./Day":193,"./MonthFromTime":209,"./ToInteger":218,"./YearFromTime":228,"./floor":230,"./modulo":231,"get-intrinsic":256}],207:[function(require,module,exports){
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

},{"../helpers/isFinite":234,"../helpers/timeConstants":240,"./ToInteger":218}],208:[function(require,module,exports){
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

},{"../helpers/timeConstants":240,"./floor":230,"./modulo":231}],209:[function(require,module,exports){
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

},{"./DayWithinYear":195,"./InLeapYear":199}],210:[function(require,module,exports){
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

},{"../helpers/isNaN":235}],211:[function(require,module,exports){
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

},{"../helpers/timeConstants":240,"./floor":230,"./modulo":231}],212:[function(require,module,exports){
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

},{"./Type":226}],213:[function(require,module,exports){
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


},{"../helpers/isFinite":234,"./ToNumber":219,"./abs":229,"get-intrinsic":256}],214:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":240,"./DayFromYear":194}],215:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":240,"./modulo":231}],216:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],217:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":219}],218:[function(require,module,exports){
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

},{"../helpers/isFinite":234,"../helpers/isNaN":235,"../helpers/sign":239,"./ToNumber":219,"./abs":229,"./floor":230}],219:[function(require,module,exports){
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

},{"./ToPrimitive":221,"call-bind/callBound":180,"safe-regex-test":275}],220:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":250}],221:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":252}],222:[function(require,module,exports){
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

},{"./IsCallable":201,"./ToBoolean":216,"./Type":226,"es-errors/type":247,"hasown":264}],223:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":256}],224:[function(require,module,exports){
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

},{"../helpers/isFinite":234,"../helpers/isNaN":235,"../helpers/sign":239,"./ToNumber":219,"./abs":229,"./floor":230,"./modulo":231}],225:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":219}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":193,"./modulo":231}],228:[function(require,module,exports){
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

},{"call-bind/callBound":180,"get-intrinsic":256}],229:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":256}],230:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],231:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":237}],232:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":240,"./modulo":231}],233:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":188,"./5/AbstractRelationalComparison":189,"./5/Canonicalize":190,"./5/CheckObjectCoercible":191,"./5/DateFromTime":192,"./5/Day":193,"./5/DayFromYear":194,"./5/DayWithinYear":195,"./5/DaysInYear":196,"./5/FromPropertyDescriptor":197,"./5/HourFromTime":198,"./5/InLeapYear":199,"./5/IsAccessorDescriptor":200,"./5/IsCallable":201,"./5/IsDataDescriptor":202,"./5/IsGenericDescriptor":203,"./5/IsPropertyDescriptor":204,"./5/MakeDate":205,"./5/MakeDay":206,"./5/MakeTime":207,"./5/MinFromTime":208,"./5/MonthFromTime":209,"./5/SameValue":210,"./5/SecFromTime":211,"./5/StrictEqualityComparison":212,"./5/TimeClip":213,"./5/TimeFromYear":214,"./5/TimeWithinDay":215,"./5/ToBoolean":216,"./5/ToInt32":217,"./5/ToInteger":218,"./5/ToNumber":219,"./5/ToObject":220,"./5/ToPrimitive":221,"./5/ToPropertyDescriptor":222,"./5/ToString":223,"./5/ToUint16":224,"./5/ToUint32":225,"./5/Type":226,"./5/WeekDay":227,"./5/YearFromTime":228,"./5/abs":229,"./5/floor":230,"./5/modulo":231,"./5/msFromTime":232}],234:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":235}],235:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],236:[function(require,module,exports){
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

},{"call-bind/callBound":180}],237:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],238:[function(require,module,exports){
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

},{"es-errors/type":247,"hasown":264}],239:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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

},{"get-intrinsic":256}],242:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],243:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],244:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],245:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],246:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],247:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],248:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],249:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":247}],250:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":251,"./RequireObjectCoercible":249}],251:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],252:[function(require,module,exports){
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

},{"./helpers/isPrimitive":253,"is-callable":267}],253:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],254:[function(require,module,exports){
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

},{}],255:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":254}],256:[function(require,module,exports){
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

},{"es-errors":243,"es-errors/eval":242,"es-errors/range":244,"es-errors/ref":245,"es-errors/syntax":246,"es-errors/type":247,"es-errors/uri":248,"function-bind":255,"has-proto":259,"has-symbols":260,"hasown":264}],257:[function(require,module,exports){
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

},{"get-intrinsic":256}],258:[function(require,module,exports){
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

},{"es-define-property":241}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
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

},{"./shams":261}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":261}],263:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":255}],264:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":255}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{"call-bind/callBound":180,"has-tostringtag/shams":262}],269:[function(require,module,exports){
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

},{"./isArguments":271}],270:[function(require,module,exports){
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

},{"./implementation":269,"./isArguments":271}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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
},{"_process":272,"through":288,"timers":289}],274:[function(require,module,exports){
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

},{"buffer":162}],275:[function(require,module,exports){
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

},{"call-bind/callBound":180,"es-errors/type":247,"is-regex":268}],276:[function(require,module,exports){
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

},{"define-data-property":185,"es-errors/type":247,"get-intrinsic":256,"gopd":257,"has-property-descriptors":258}],277:[function(require,module,exports){
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

},{"es-abstract/es5":233,"function-bind":255}],278:[function(require,module,exports){
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

},{"./implementation":277,"./polyfill":279,"./shim":280,"define-properties":186,"function-bind":255}],279:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":277}],280:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":279,"define-properties":186}],281:[function(require,module,exports){
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
},{"safe-buffer":274}],282:[function(require,module,exports){
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
},{"./lib/default_stream":283,"./lib/results":285,"./lib/test":286,"_process":272,"defined":187,"through":288,"timers":289}],283:[function(require,module,exports){
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
},{"_process":272,"fs":161,"through":288}],284:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":272,"timers":289}],285:[function(require,module,exports){
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
},{"_process":272,"events":163,"function-bind":255,"has":263,"inherits":266,"object-inspect":287,"resumer":273,"through":288,"timers":289}],286:[function(require,module,exports){
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
},{"./next_tick":284,"deep-equal":182,"defined":187,"events":163,"has":263,"inherits":266,"path":164,"string.prototype.trim":278}],287:[function(require,module,exports){
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

},{}],288:[function(require,module,exports){
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
},{"_process":272,"stream":165}],289:[function(require,module,exports){
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
},{"process/browser.js":272,"timers":289}],290:[function(require,module,exports){
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
},{}]},{},[124,125,126]);
