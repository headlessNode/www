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

},{"./main.js":2,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":5}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

},{"./float64array.js":4,"@stdlib/assert/is-float64array":13}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":10}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":12}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/has-symbol-support":9}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":14}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":46}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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


// VARIABLES //

// Define a mask for the least significant 16 bits (low word): 65535 => 0x0000ffff => 00000000000000001111111111111111
var LOW_WORD_MASK = 0x0000ffff>>>0; // asm type annotation


// MAIN //

/**
* Performs multiplication of two unsigned 32-bit integers and returns an array of two unsigned 32-bit integers which represents the unsigned 64-bit integer product.
*
* @param {uinteger32} a - integer
* @param {uinteger32} b - integer
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var out = [ 0, 0 ];
* var v = umuldw( 0xAAAAAAAA, 0x55555555, out, 1, 0 );
* // returns [ 954437176, 1908874354 ]
*/
function umuldw(a, b, out, stride, offset ) {
	var w1;
	var w2;
	var w3;
	var ha;
	var hb;
	var la;
	var lb;
	var t;
	var k;

	if ( isnan( a ) || isnan( b ) ) {
		out[ offset ] = NaN;
		out[ offset + stride ] = NaN;
		return out;
	}
	a >>>= 0; // asm type annotation
	b >>>= 0; // asm type annotation

	ha = ( a >>> 16 ) >>> 0;
	la = ( a & LOW_WORD_MASK ) >>> 0;

	hb = ( b >>> 16 ) >>> 0;
	lb = ( b & LOW_WORD_MASK ) >>> 0;

	t = ( la*lb ) >>> 0;
	w3 = ( t & LOW_WORD_MASK ) >>> 0;
	k = ( t >>> 16 ) >>> 0;

	t = ( ( ha*lb ) + k ) >>> 0;
	w2 = ( t & LOW_WORD_MASK ) >>> 0;
	w1 = ( t >>> 16 ) >>> 0;

	t = ( ( la*hb ) + w2 ) >>> 0;
	k = ( t >>> 16 ) >>> 0;

	out[ offset ] = ( ( ha*hb ) + w1 + k ) >>> 0; // compute the higher 32 bits and cast to an unsigned 32-bit integer
	out[ offset + stride ] = ( ( t << 16 ) + w3) >>> 0; // compute the lower 32 bits and cast to an unsigned 32-bit integer

	return out;
}


// EXPORTS //

module.exports = umuldw;

},{"@stdlib/math/base/assert/is-nan":15}],18:[function(require,module,exports){
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
* Perform multiplication of two unsigned 32-bit integers and return an array of two unsigned 32-bit integers which represents the unsigned 64-bit integer product.
*
* @module @stdlib/math/base/ops/umuldw
*
* @example
* var umuldw = require( '@stdlib/math/base/ops/umuldw' );
*
* var v = umuldw( 0xAAAAAAAA, 0x55555555 );
* // returns [ 954437176, 1908874354 ]
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var assign = require( './assign.js' );


// MAIN //

setReadOnly( main, 'assign', assign );


// EXPORTS //

module.exports = main;

},{"./assign.js":17,"./main.js":19,"@stdlib/utils/define-nonenumerable-read-only-property":39}],19:[function(require,module,exports){
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

var fcn = require( './assign.js' );


// MAIN //

/**
* Performs multiplication of two unsigned 32-bit integers and returns an array of two unsigned 32-bit integers which represents the unsigned 64-bit integer product.
*
* @param {uinteger32} a - integer
* @param {uinteger32} b - integer
* @returns {Array<number>} output array
*
* @example
* var v = umuldw( 0xAAAAAAAA, 0x55555555 );
* // returns [ 954437176, 1908874354 ]
*/
function umuldw( a, b ) {
	return fcn( a, b, [ 0, 0 ], 1, 0 );
}


// EXPORTS //

module.exports = umuldw;

},{"./assign.js":17}],20:[function(require,module,exports){
module.exports={"a":[3608578765,1693861771,3363385553,3429273829,3915495585,848476669,1439770771,3299520983,1193033297,2379282841,2050404723,2700980053,1566737379,2205040117,4089795525,3935027851,2730361079,3080766851,608178343,2606911471,70010421,1043190735,589405133,3453912857,672931563,1722043059,557445723,467330245,4290348133,937406269,2203027857,3603959603,2631268043,1271446115,2738266137,2251796333,2119922785,4178036911,1256350021,3312956083,2262352457,3306754745,1718968841,3829089837,1216827567,1513797073,3469150395,3947188647,299596629,4077328739,2259132825,369607051,825552181,2848537959,3823519911,1498483745,275613723,85998339,1965813991,270994561,1023404609,4168841849,3874954167,3654672653,1145320671,2318253009,1611501691,3265243457,2201322625,2867851713,2283232247,168707789,1879639163,4002201089,3997797627,3096466733,1221030867,3171980727,2748688085,1520627499,2954342173,712853615,1890234551,3779894355,3561391575,1418787167,983410805,3837005301,1504785507,2949224797,4107999863,2528190119,2823099351,3687986735,1887895477,3968420023,1711272451,3499397171,2938696187,3912595077,2072281589,926961139,4081302867,3951920755,634194933,3784133201,2753420193,1855225803,2661146633,1207140983,3375853303,1320521511,1919994601,971120559,805448571,1186418881,2389907729,1788859377,728456887,3894693237,443116879,541489457,2127916061,3266216233,4229476193,4015811541,2939668961,1645781349,3220241417,1583397853,1263409133,997555711,2510358993,1049744705,654509171,3144553929,538910611,3407929365,704812437,3200057247,320103055,4080665741,225611463,2240097657,756819005,1031060037,3426516539,3146726735,2819919415,4154973429,2746452679,3263036297,401495591,579401445,2234285235,336004489,300245691,878986901,1981785841,3520487109,2462384757,3245194975,223075527,677776455,4294939681,877584699,3822330385,538882999,4285514067,232175527,3738940247,310649827,17873973,3964551711,2550747485,774692981,700644453,1682296729,3921419717,3520563871,1542302863,2372905101,2488632873,1943798455,2952306549,427950813,2279802947,3252552241,1306937715,4261588789,2478072057,3769322473,3211816469,2701147585,152131635,3211788855,3578732285,3974462021,3750671855,3569279057,4206637551,3194644807,3879928885,4224511525,2864229225,2135709075,704237211,3564873679,3818005807,330689635,2790470255,1065341375,2703594737,984135833,3009139833,1360933991,1412086647,993975485,318518939,2719024365,960596979,2796590997,2193379543,4172413449,1202771287,2345511179,3089235009,486536277,2025005907,2544939571,4055815337,1936676163,1444617083,3640776927,1866220393,13879013,1481518709,2570457607,3578752695,1004557221,2901147243,2074255655,2069898597,1309774685,3058391491,784071135,2670708679,175510843,1778046621,2989227619,2894535209,2738643601,1490851321,792947459,2616089755,2693622609,3138458639,1410357471,3180158887,868497251,3955297043,2941006929,2805173415,1104946831,2286816563,376426515,1118825847,3768335273,2946884123,402611247,477925199,1553064071,2476866903,2547823797,2862838757,1240291099,3331894935,1238580141,1415801945,814974261,4227807761,15369859,3553617865,1423691787,808317319,1874740325,4117314397,3946775961,3285097797,3002505991,520305917,2945427545,1648545625,3325479335,4050374379,3935362189,3701905851,874232931,3408730167,2353822679,1276844179,3886655367,3906886751,3753711083,2139511871,2474758213,699034889,1176439511,3713338357,2114836835,1991413773,3646178823,2130206695,1250064343,774903317,2938524017,3124804671,597250419,2590332683,2114935173,3599756411,3110638601,765395425,953334743,2141150641,520802509,593729637,1548089197,1395035441,4002459807,3901911877,2671879621,3594147879,3513831333,2130623409,1438692455,1693622253,2829658299,2615131967,1111993315,649527839,311578447,463204843,2779734537,1561642791,1238108161,1423291259,391480167,1835358583,4013623943,2506415343,1140147699,2829295249,3271810769,2093482443,675478597,3792613279,2687212083,2223567795,892681425,2394704595,1830512379,3564561047,1693885179,1049376417,1400217161,3132577637,2742998671,4229875463,1452742309,3854991987,584436007,1764320757,23229537,3364170545,3325963551,1261337699,492494509,3717443719,3096696283,211151157,1928891767,4236843985,3040446409,905735241,2035359133,3715925007,403381225,427603921,1644525507,1296062651,2822308517,3475037887,565656403,221226403,229447011,1965873567,3353804041,2972445683,1900781735,511579055,2532470377,2485217743,2275899815,2555699915,1554420995,1306896071,3817037615,2046915505,729372495,2618766605,2258066665,2658264265,2560643295,1003545779,3563999507,301035133,424503491,3967380735,728639057,2069028999,968476091,3550947575,1249099593,1534132497,3772173979,1478546605,3500006065,2831010725,156024993,1105820505,3342589783,2688495371,3591038249,1323522303,949227991,850491949,2630418375,471298313,2897407457,3359790871,3090064919,860506827,1723087841,1355740919,1864052607,992120055,1656776053,2288556099,664533495,2385415111,62617803,1633009587,1641395393,1311717397,3167142085,1118602077,2790264003,2372180855,3949612805,2946288999,3478001361,2997235293,1339817075,2774072317,25790301,2289045069,3624564267,2656208677,2760343383,2227004429,1721032253,1555441007,3087511257,3444120097,2911181927,656596569,141272857,272990685,2945152669,805806353,2658405799,3007770475,2438815941,4833897,24520577,1310990733,1123435975,2814784583,3683171589,778081485,1466106287,2866205657,3775316779,2805923363,1345310679,3801107081,800001137,674907651,2162348463,3560344521,2901912083,3883380719,820818233,1694456045,3032533521,3732000161,2351052617,3173806379,4004990849,1001237991,3979612733,2368429353,4009008467,2123461379,2373263251,4033529047,3434452113,3496699227,2553346335,2822656409,4274780715,4019452623,1393894771,3755130199,2530408691,2739205451,3261269987,3330409831,3414113103,1128651155,2595787057,2021057891,717064579,3416605293,3715513939,3749598101,2853638159,1771599261,2628437185,2563661713,2772837253,2313082623,637123771,2486878427,141576709,3010387023,2225440179,3576028823,2212118957,483819219,2103717937,2191932377,208304547,3497612709,1652095281,2738713239,1941850865,618397973,1774155775,1060996675,1747049131,74975539,3082054567,2464113711,3491580833,2502601211,1918744519,2050251697,4274200473,252214409,318946117,2752070433,2565297035,956069889,943981565,2706873745,3966456915,3169421745,1987935273,1883608577,3653240965,4091653213,4075540955,3861545513,3294298627,1432668941,2305291457,941182199,2051066917,4079447235,2002178875,3798116049,4154422775,789266147,1967262465,3351036313,3291867361,3886006985,1106320715,3271100539,4138221397,1425266833,1728203677,2408551137,2381336725,2672185243,820457587,2052826345,1546639693,2808392861,3936434923,904913363,2605078779,3717008583,471491581,1604410113,854710229,2776783041,2545592313,2905777147,2561262981,252803893,2408925901,2420718461,1042070041,81221073,1476787479,38970107,3967228059,2583108195,3310070649,3810482161,4008375031,743307031,1924066003,2094744461,3415492277,2744523591,4147570807,667164675,1257949159,3789038435,1572078041,3863027939,3211079723,2043569623,1172470757,4065789953,525385369,3718063071,2676599807,3086648351,3970866965,790558413,1212399517,717969713,871779487,2689186997,756939821,544040253,977327899,4067010471,59555119,690735635,515350209,1983621125,2785480097,3930842487,433177421,2638083609,303039867,1691126581,2132154749,1875117909,1259187227,1048267177,3918687535,2431657985,819089835,149105609,1854753763,3495689643,3235753963,1530653433,4286248059,153186185,2248623147,863060251,2842373185,3005562971,1407100505,3819701085,2777606147,1466655627,215469425,3292956357,3450276753,3000949523,2928831549,3883454175,1344065837,3231871419,1279613463,3476220587,812022033,2538800691,229520469,435742273,675491381,1048610305,584847885,2530245145,249332655,3820601849,4060898581,240613419,3973788035,2014554433,1103673671,2521193925,725150109,2510774179,2045927715,3502756259,3977429807,2261397141,2500745321,3132739265,967379369,1134609577,2721226145,2311445207,71513701,4000839609,1492698499,883535735,2244673005,1722218969,1319278011,2920164389,2770829277,1904125897,1155442239,3020161933,1429760451,921373525,3260775353,1108581191,2935927961,69481729,3629775119,3661078071,2580255909,1380735539,2868867035,2262718421,3642132683,1074645063,1100490391,314544757,2209254641,3821716539,2625989967,2280768343,3527588853,4118688467,3164304079,1477294565,1545940143,188614795,102491659,21802125,2092740693,1257933899,3041964059,3522501145,2179307427,2007772117,336115043,820268093,2077253847,3965890163,186378869,362542463,1051658407,3055245907,2625260885,398823795,4129890971,3725751279,713368555,2044178317,3252500523,3339358523,29979365,2485122081,3163079695,3194283445,3962416647,414052543,3382898243,4064908307,435854669,1180671641,1027874913,3477818729,408205493,3207182341,1190623551,744320537,4027450435,3267877401,415243405,4213829305,3630419865,1466901813,2974107917,1960713455,1865725611,2809031593,1391497439,2579094167,558242615,349030667,1623485395,588221981,2834152751,491597795,3782505429,2501602103,905650341,2870436377,2271543117,1341505011,4051108019,3299418031,524356447,164346217,2211633077,1714979999,908666755,1944116217,687890105,1323910161,1862978227,23342675,2790811977,542118851,1984056133,361570293,3351150445,3375553573,2940664461,3909393063,3724584243,269182561,202647749,2263769699,760780357,3985153179,470404507,1666430699,2560622261,2741947625,3007935713,2316762987,1746398361,3532292161,2481109205,3958031439,952304865,3389775963,1607180361,1640194973,418718829,3470158591,1663537649,3209530807,4012277443,3647593783,3571101101,3068460593,2728180063,2216798267,2682886361,2157797011,2485980829,2885534113,126599415,3246761189,2575719997,597003923,618224593,841374965,3338951551,3626160307,3158137953,790382617,2863485173,1344279863,453446763,3815790041,439088531,2060627125,1161017719,857807363,1235818421,2824555369,4067338171,953128569,2177181859,3343471979,4021589165,610394627,1265302951,2409508231,2768191639,3751283783,1000075049,2894791055,2703077677,3575795049,3491794979,3321302271,122202719,2535779235,2652495285,3280340673,3326161855,1221013163,329653241,3779608619,741835909,768741775,1545268449,1902853629,1626549139,2781086873,432441705,1398920015,3734215443,2609623565,447424699,3460837313,3220018193,1712727653,1575378251,1693242537,1169044141,2575453301,293066297,3872121819,1856281055,3784861277,2898456795,1978483775,2025673219,1255984785,963857153,1056867779,2476997951,1293510397,541509103,3218833861,2062252173,2086777553,826720197,3688801313,572897131,1259161903,792754033,12145281,3868785469,1240178735,3472982595,2793836367,2952906389,753393551,192111609,4121950531,3328846855,485177907,3699105055,890160615,4270039185,2302594555,2868644393,2000745109,3558579343,3832501547,3057612889,1740609999,831044649,3599121993,664476565,2893296823,1390932253,1491196763,2287130841,1963829385,2750358667,3079884877,1975974667,2324176841,25096317,1153989969,823045913,2978002707,1907383521,1015157523,2804985943,941263081,1500335431,2209123703,1831423699,1475407323,216750963,405100797,3476152433,3775330307,4237602345,2238798029,1220973011,773679701,1542952727,1885449579,3666976525,2933884981,3376646343,1659140073,602747073,1832037717,444057655,2578721741,4156214559,469153973,3732711711,684293179,3447156681,1345127939,1699450703,1957175329,2286391021,3199786137,4166299033,4117814721,380226165,88082701,227948223,3856378599,3863413011,170583275,1800209333,789418727,944262977,3343162063,2674868307,316272207,1982079749,1756547357,1975412281,2584826823,3588585075,2419469937,868581271,3449832339,2888623911,306325687,4134125519,2040813297,1651453627,1538608929,3997988627,3937844651,443427771,3869320365,3760692077,823653937,3957403069,3988640303,385065241,3525848785,4159223579,2185274577,20300217,808519261,1233469345,2695168527,1124791469,3215549095,156748589,3100203753,1505408625,3745333665,1224706395,2373989897,2900198709,4113330309,2680315585,2739356935,1859176311,36801919,4277965865,1562197645,3974646571,426426341,1136550715,3440371353,1250080279,798986489,3134044361,1635145521,29867979,2998300645,3820420099,50168199,3806819907,758922149,2745336727,636644083,3974471247,2902085317,3736847837,1184912577,2352451687,666586937,3558902475,957683101,484949951,1944250765,3697040037,2344126265,1981052685,3680038607,3906323911,1660731961,4106464949,747907331,806136021,1061577933,1546893823,3940180383,2696723457,1576761803,2643513735,2222176261,1626930003,2155366347,2981098413,77299435,2792010431,2660602365,2979384753,2233890973,3845514943,1036869145,2900477913,3109450123,1994552249,3385427865,758733593,1396624991,1434586835,2739786281,781696305,1045943451,105550947,593193959,1793850785,911686969,1654771895,3340744609,556900059,56528057,622539117,3200413795,2278704319,2249469123,1060812847,964835437,2326768559,3852823281,3625437803,1011186019,1791746959,3175985451,2048055165,397257577,1990468279,4042607415,3782685445,2749201875,1144265113,922304985,1194020861,1925961419,1968248439,1299571809,2519155379,3762099225,2211258781,4173927275,2807876539,2768158841,4230455333,3430415657,1673605341,2214192359,1384917485,2734418189,3179027797,3711686047,2292274175,2509498307,427904771,4084021137,1390516463,2475959937,186311419,3380984745,2223600059,3968996865,1835219325,3367865173,596334557,3029240187,998859297,2564582997,33844701,3518014677,2031714927,2245103483,3396974659,544624171,718295029,3332462697,3975039829,2391900371,1251687761,1064990021,831351267,135748265,481708773,3123625443,2645246573,909613545,2912679285,4035763037,3385573483,3098990707,3121780487,1314206247,2773020277,662032517,387104125,3369354835,3691272705,1385963423,1638970537,3725117409,609010807,3670685465,1675253597,4005985467,4215309637,2393548629,3043480869,3895382173,490481705,201337,665404899,1321832973,135949603,1147113673,150491123,2781196177,2056727219,3063170409,2521991919,1147333407,1867193821,1348805113,2461539657,345246805,2010837631,2848643783,3714601641,1407143043,4234607209,1058604885,837293157,548650721,434323055,2512546755,259668893,354665399,611128089,3303149763,4250047573,1101609797,3303351101,620485177,2423442771,3439300705,1767598851,2573933895,1925529587,3824326071,1342137011,152554213,676692183,3209330833,1501359327,3138231841,3554577639,3512196959,1691908331,2974211987,624372707,1631548245,4032816873,1461665865,2180198967,172172633,3974212623,2439867861,526838033,290373417,1448050329,481918311,1391983215,456434137,1102403489,3815425989,3895734843,2870002341,2094392589,1526297137,2399361117,3436529601,1678851351,3076053303,2350893141,3180210679,1919317849,1610503485,2397440343,3611226181,289748177,3021813053,947807131,27597755,188511623,3128006099,199770391,4162724247,1272906665,726608425,158130371,2720956997,1208526739,1550113587,3177391135,2310930229,1070572281,2778158683,885965277,3164964873,9488525,3285326395,2306527179,1688339877,2066412403,362453025,573583261,3985730255,1972956513,2971023607,3301989141,2262704691,1697869365,4249796275,2290302449,1886380989,3082835079,2490072841,1754137943,60774451,3216681267,1912268315,2781731449,130240711,3462381903,1664155289,2441170943,237986891,147346677,3327136221,3402951765,156835205,2317495321,1414511649,1845175083,88940431,1776964677,2418758347,4074670687,3749921191,1094814659,3081692533,1717658587,2792684025,3036521513,4007961037,384097719,1824389299,2203066583,2138235663,1885163751,1124780557,4050503979,371927905,1255021269,3217918589,2036083195,3696192213,3455905481,2183429873,2728361139,2563889951,2340265079,750889167,3978401601,4185440165,839829599,1460398983,2309231217,619532991,915352879,3404045877,3701225525,2633011469,1901762607,2442779745,2346005211,2285860327,4267169045,254104501,129128697,1857365501,1378885059,4179632677,2229293407,2633906329,3102583971,4265376603,2035131249,2263522157,2153839181,468525093,532444813,199136967,1219414261,215879121,89609837,2059243861,1676278105,2398841055,2678776853,2591630987,1507919637,2085035085,929675161,3409682245,232847535,3275680373,1400575277,205049285,3529784875,1529703975,2062414787,613702639,1414369359,4291708195,3247608971,221986035,4262117503,987772925,2485508195,2120989389,1456298019,3017953009,2320126357,2675712283,3233832131,2409736195,439988849,615142943,513609955,3118765705,3206773931,2021529593,908833495,4136449093,1136244543,1141681031,3117162171,2536819823,1346730317,2351979753,4066523799,3409145105,2965682393,1185925863,3405886005,1918324069,1407911901,3373036213,2906096995,3893420097,1199058307,67427721,2616405811,3519184667,2743140005,1555270649,1633953567,3183128855,2170413593,2147563525,2006927265,1082220229,4169093119,2915760761,923702027,1010370369,4057441793,4040864199,3547190193,1109204815,2097876657,3318746697,223382625,768591757,209705267,3629268631,2686915827,1617617169,2707337549,1298045529,1216069971,3906395859,1365473251,3832475783,3130613231,4108613257,1092779137,469599503,2996774817,3263192731,2617163029,708734789,50445665,2491288855,3624495551,974147693,3501659225,3386970051,720044599,2753882123,201207571,2817921257,1777661525,424590199,3586513015,1987366793,4053858831,1978461549,3604983963,2466229087,3276507079,526086639,2077657651,347013035,63595129,913303587,160658997,1156374267,1382903091,3157433815,124599705,4000066123,3866168605,175045371,2196387683,3195696863,1149193067,1403079613,2287699619,1869237667,4156961737,2488907191,392191629,1639655967,2913497391,3978704647,3627022763,2672388929,1662198901,2937039431,843650721,643738685,3463126073,2921308373,990751721,3526721203,3834611961,1151410719,388128175,922547757,13877239,512727881,627646585,3880045847,687773255,2824034269,2780775415,1836966323,4227113883,773507739,3706203991,4089108325,3262414931,4098395621,1433796999,1880945029,3782132973,765852467,258366663,1149364579,3702891899,1102017385,1793103265,2871050677,4023325759,2783854987,2102804585,3562970425,3935265707,2490932763,190550887,3949142949,3003660645,818197475,3534221501,3691433901,3642231745,2020029621,1233432929,3574378335,2793537361,644669625,3368519365,1760984997,448097953,507349069,3641930027,4230230927,1273201537,3900296691,1084628213,681126143,707346781,2877731479,3552176821,435705245,1366619173,1360014113,3998675671,1006917585,3850946877,4189226561,661093239,2559640227,712456741,4195314741,1956106835,59721191,1920377067,3189539765,3634099527,418947133,3834209393,2707651599,2179932133,4282307347,3215000669,1526894865,4217570979,193234913,1132224263,1007231897,874361057,1839571045,3884963379,131570583,2275276293,956615257,1491584697,1978984669,1963532843,1047564279,1873243935,2624626085,3607204509,2585700677,2524973531,1268344049,2645421871,150383305,162916519,1984554103,569330439,3997125913,397238407,2749262573,3984465965,3612239079,4276157441,3907069651,3805473993,1113414409,619334253,384867755,2952985455,209330337,516438339,933294453,1165945595,2008023039,2912279125,3129478441,3055587319,490555765,1459137231,2367824533,3076256445,3984110763,3636168583,1426711021,4134494069,3799085105,3411265125,408857215,3501243723,3808503535,3158119789,3190742395,3125775319,3139309935,2802844751,2636282017,4252724345,3422179005,3021149773,2910742507,3631509345,3537588113,3844036961,502487645,1250643857,2461348791,3631966087,11263883,2951904559,796136023,2379088417,1733193709,485279493,1720289707,3159904731,324806267,1224407517,2276202561,733663483,430683945,1789738801,3891783275,3621426341,620546825,2736125915,2129303797,3256828843,2693882967,1256515509,1983011321,1309658179,593057559,1225632141,858727845,1095545205,2476275999,3320076639,432543999,2487539883,1977013903,1228680023,571661007,3710207613,1713959517,2291950715,2575145049,2038765787,3516358233,556380315,2772429271,3947042179,2346119119,2369245251,3273501227,2966665945,810403873,1107837729,1928527495,3504286841,2364353239,3911538817,518977725,2957410799,842203663,1377705571,4052956007,3318479665,402814915,190532711,1511052253,2379828819,1419212735,2082713261,1795069137,3133172255,79696681,75246891,876970747,3596054915,631627209,3649400019,3248129801,2977746329,1723677977,2226663733,1649444979,2534081851,3334501463,3577972475,1743401397,1403887409,3194543999,2262379123,66330913,4036747663,3640084695,4119286921,3060260033,4042899613,14852337,276344993,2127761137,1434065075,2359058255,3922830277,272270035,2438754939,3998077169,1149240783,1739842559,334737083,503673507,693005065,3312483413,2227351485,2919668799,666961099,466466041,1959202969,4244933575,2209867439,3363090379,3144510279,177279267,3429421293,2886290649,3817363965,3253740921,1651583387,3565296283,3268593259,1927928381,1398090125,407691039,4286986639,1025953107,679961075,2430774283,729062983,1829201859,4170616843,1063800067,2332875369,568654615,81316187,265259559,3488323415,748277287,731725603,1152559089,698243567,2941593043,220682173,3842753849,3118872313,3650103469,2434077203,2641268983,2608877095,4085660591,1911597971,1582503059,1718621679,3309688097,1990194101,1710641023,40673911,2670155177,4141415307,769736895,204389743,4017064855,1833536963,2537265113,290752175,1914853151,2802524673,3779075593,2663130439,3534250277,636667387,3361374009,2180876027,857349563,2909160563,1004781045,212485737,1048270471,3646050029,2821362833,838963767,1262680705,108898597,2557585447,277401507,2099092699,4268226471,318075419,474280583,4114674483,1087812315,678670327,3836772045,2921349281,3215935441,4127524221,541235137,1723492819,3611632519,3204365579,962775803,4248299909,2270772293,3143651831,810682177,884965561,4148432877,1023167915,1933236033,3499515611,3844530749,2772199801,467229021,3953429347,1034817955,744630529,1757554753,1008077131,1062705951,2231835337,827784321,2150518267,2910505665,369589071,776900253,1831473811,202145997,1318135393,3554966631,3813778519,227533677,222775139,3767111133,2498305971,3366426971,282826015,3383271533,3219892553,1305993931,1021540271,2424440869,855557385,3793740073,2891669891,514019437,533590733,3636300423,2271574191,1541667867,404039079,208442233,2369452189,2554557347,3118947899,2739041261,3331457603,655454415,2941187259,354625701,4210421049,2459998483,582159379,138228893,1932142321,3080465351,3504655867,2214968337,2168769589,2429581125,3520962269,3190309861,559054701,81552359,2689082639,3450724593,595571799,3222673375,2792057721,2867145991,469373947,3196096801,3075588227,2838826137,1455686855,1899568831,1282900103,492177163,2555023249,4224087363,846802865,2470477003,2389118553,1428962245,2608705897,26293579,214460301,1818394469,2241261919,2383229891,4247975597,1467256893,1278572457,512063003,1548809255,3967655097,3962787597,2144381055,2895361177,2459878025,716559751,3364735125,1361007531,3792147979,1908593967,2816694387,1396749517,3191494071,3308871551,3951772767,3120614141,4155674417,2127282475,1214765399,1289669367,441021077,1241058979,1504129669,2259415549,3482320899,3887359561,2212423851,654610499,870964723,2724486855,2203419755,543652527,2392307157,52833515,3439013705,557217887,769393267,2508781537,1918225421,266573953,122408209,439952513,1663323471,3313902283,3748824067,1320128943,2139549129,3609531189,3447411419,3354314529,604233263,3888432497,300406213,2108362933,1852880751,3782727115,1700755201,4065304603,142370319,2571719925,2494824163,2345790075,3115372453,592164027,2398623591,2259418865,1149381915,3168016859,473233107,3067607337,3434590813,595641317,3507559853,802946989,3909543601,2961416625,2123075933,1754125435,2275980519,1275520057,813472669,2880213783,868985261,1113878885,693609423,2721866013,601638705,2394364625,2492203323,744009025,671117255,692060191,3089799101,3786489711,1284224219,1193455397,1750941281,2433606137,66504961,2224174389,1206246179,3501095777,2819815707,418838737,9075471,2434392015,3380255363,2132151407,4188517451,1361268589,3407671465,707022827,4241482373,4276656727,1820901713,640124501,2703555447,2422540419,3034489127,900791475,3166549445,3705606385,1592851667,1961381251,3197128801,2877075889,3154836649,653102787,1015714731,3221341611,2877277177,2221960911,2427470093,1402125589,2640799651,2436545567,3836517605,1726087719,273729679,3730067763,3087356309,3681401145,142123295,3033871389,3663090579,1963025009,3673995891,2071678731,90598133,2413517725,2972470207,3257147579,1824156815,270354579,923561535,726318321,3147430469,4078398185,1379421109,4163145201,3004772501,4256698287,2090138819,1137275301,1363856581,435971175,3573820869,905406893,2162058895,3847550549,340507361,954447911,3233984399,482630657,3988319301,2602107683,2445655667,3367347897,378819119,2536253801,1485898327,3351289327,1498434085,3310055143,3621643909,2421995621,4036373465,2474107083,2205426511,1120827279,2342284991,915231717,1082558271,137456515,2052507019,2446414855,573427691,1331360593,3351821749,2735486587,883943847,3692329111,3689934499,4117928249,4174959769,3383286505,2425068637,2325648141,2455667109,2803887759,566934647,3941565437,1860209791,2065368733,2956653287,1186886405,192397059,2698059457,3660993491,2397823571,3818886739,1708311187,3313055289,606477715,1845767703,1070595015,3052892571,2419195395,2401955609,2109747025,859714687,3285899459,1507108841,254681893,3108860413,1387101315,3637968399,1238961755,3712749457,1798668213,4042849515,4279684105,1445266357,1608092013,2050085543,106952349,2794978419,2242482603,2805011807,2161004615,345338879,2328931251,3869315803,3658394171,2935408969,1420116211,434021891,1693334245,3839311607,2835977501,3803081273,404059001,1826909665,1015222819,658740895,640802783,2402324137,1741999,1879764541,1820106299,1800410215,1627646761,1804823111,3245676573,3235738775,3854908655,3352628923,1735749901,1802423965,1862673435,3896754517,2147762845,4191604689,3471103027,1511189721,2832046363,596251943,1945211613,230413313,140596257,486221821,4033494587,544655259,2313131487,753750113,1203396155,2953934273,3156074251,1205138155,538731519,681213255,3005548371,2166378281,2486036367,1956257649,1107149763,2045977729,1013919277,2842899665,3848401695,2876592715,2444686887,1701197245,2773230109,1620822619,3212386969,1310309177,2217074565,862631287,1540722491,2357670823,1348853109,1279249785,2902326083,3661984599,2032999899,4105722239,2320951577,894106855,1015893099,2859683097,1575320111,4021441473,731094083,4061356481,1682731827,1838243847,1812366915,2696651107,386176217,1365801315,1278276527,2830863107,3066998561,4051506637,156718431,1984418235,1066848519,2373792997,2847049525,2607571011,436496525,4195902635,3886820797,3338822609,3562919939,1624853401,3149577553,1588904221,2518960257,4165470655,153620023,4094280371,3891944833,884714109,3860669557,1279709365,2722957957,1378069177,3976360473,3109134177,2743870493,959669705,1645029989,1515901759,716209047,1801748421,3500319997,1783057567,4175541421,2052402227,95661285,317070651,1953337567,3982482083,3655893263,1221290213,1312368191,2510503521,2810194435,3831328449,2381006881,2963814461,3630641525,1977984419,3848528571,3196343787,3257693787,2276519233,279445669,2939086965,1090686115,3023316163,3898756673,2735716105,244250629,319998425,242497233,3744570627,2103055995,123071359,1502005559,2198717281,440142011,3455343127,1886232069,4096035275,381666045,3198600261,2311571503,3191860483,2734961417,397611089,1860707649,2070635647,2375595511,1414268925,972012141,1338322003,3690788159,1251457811,4277408969,486506981,4274773977,3881198347,3222223087,224057311,4201196775,3464720321,3968627939,2009285475,3587791681,1175666203,4208002757,4027933695,336042035,1799267531,3829001675,717708083,702900499,1845605883,3909568567,3437861917,2243216975,1475308921,1213530269,323845191,2889577847,2185542411,1662167195,2285398711,3437000225,1644608869,2771905693,3416806907,1230839923,1699161487,3640864219,1137069403,868914513,3314524863,3146354879,161738901,195223771,3059390341,4189672597,531265807,563690577,3723706977,1248973891,1266591077,1274345567,863575163,409485699,3517562543,2338884085,1623015971,3841407735,933494637,3808558383,1208607635,3218893351,2950591313,2853216505,1695831749,2072430925,4084056429,3394993237,1418327849,926158537,4263907753,437885417,4072513417,130679359,633109189,2836936463,25384661,1164374999,3400627043,3749091639,2413348891,372250825,728469911,3276924057,781736527,4246032455,1320840847,2404752499,3792472895,2254335487,1918343587,706113235,1178261543,573967607,3559329743,2874093293,2646398533,3348418877,1974119237,4064726385,4274577417,1943059695,207644507,4052123539,2073739055,840753699,2594092709,2099123717,2005128699,1699752457,1553248061,123510295,2072003283,2281717975,3400434353,2853739811,2232783135,426307907,963525015,1730288737,2680643395,2881868605,2436401973,3858904939,3455836213,1700764421,2438030937,1807267451,754216005,117182879,1577026541,733826127,2060242575,1784671051,490982371,4133981631,2625424751,3085075081,1938138053,335586155,489860243,3491386117,459096451,2561863529,1478136797,3859530807,1120636045,3710919933,4285838715,2084161063,1146241375,2671514815,671062373,3582643351,2235452459,4126898587,988440477,378516101,1639198743,1742656483,495698983,3216225287,2476482611,2555941559,705929043,2967464985,2394955897,3331353795,1757572771,38126655,3666939951,2247433017,3529512773,4126036403,514329251,712682275,3690599915,1634965297,128634915,3681471335,3719126361,1274876291,2058018855,95221439,562552347,4293471315,4222120027,1550992827,377020123,1566351477,3293649311,872719107,487609469,1475164629,3428660667,1193538513,147662319,1528649269,229925013,1905235091,1566775927,3896864965,4152668109,801321405,3727934073,372030065,1514003683,3123566695,2006995365,1642638599,2510070735,1431154431,2917514891,273122297,1526375873,3480067241,271626317,1453528605,736092773,648646441,3019880083,4029742085,1521365549,3507489553,1209939419,655058923,406060771,1357601739,2183708193,635985785,3262836833,3750484121,237883455,3120537647,256838233,3965817531,3492567715,1770841917,2794416931,1204595785,3413480517,1009520371,2635750217,2036028113,1282642669,4162126091,1221128059,1554268989,1320687403,1957220833,2202915431,45600191,1691995625,3724280983,3553089747,2901935045,84372611,3959150519,4259536787,2268080805,300169011,3227406325,1723597633,538052467,2052976677,1980435867,208902703,1250577097,3751277785,3003319635,2455172883,2869791007,4012840009,795955807,610851825,1000515383,663114603,1831979887,2554784373,1983802007,3789200721,462732511,2029402201,1186229051,4187013495,1287524653,4088164099,4271386107,951707877,4052733591,2244499617,1251876889,2985172621,3968097251,1789929359,743182003,1653565823,1998832063,1993759103,1109876313,707184405,153964691,3979667321,425057119,949920499,295551853,1425572503,1613035105,2127531741,3980356879,3596837113,1621765167,148122095,1331272019,2807994221,40168295,2618796673,2601191025,16587107,3570504553,2358957321,2261086725,527414147,1049162647,1934216683,2317343507,1792344651,3587782507,21208277,3786103755,402691527,728392683,3940068449,87391553,1153449803,595021653,382943407,2579022307,2208056759,2510475149,2264411891,1509926579,4132240319,2412533987,2841198599,2645267245,2452702283,1165027979,951490975,2469289391,440565237,3310448297,435408823,967979385,64643649,2369625507,3285322895,1856988301,1662440719,3306531173,1348124763,2065132247,4034923857,993225917,2152523803,893406365,1588247571,2535467211,3472428673,3796304333,750975067,1441873271,1011263617,588248091,3854407259,3852462217,3233515337,2012142249,722522901,4185006313,186464345,1163088139,3200487315,621873169,2131067527,3265130965,2991498677,1121423127,827151971,358972103,132987005,2175276735,2424104351,4167910863,3168502653,281660859,766349933,461782931,2817128073,4238778607,4258087265,3568103141,1385684583,974383587,4156351233,945124549,531878509,3094899275,2957266799,1254401413,2984938293,3143731145,2417489553,1890458313,3765604317,253589785,860621983,2462135699,1375012913,1687773955,2821107803,1507999919,3863050693,950244861,1380943487,2736586051,1231905721,2147293421,3198368983,4049033795,2091104735,3161488953,3322169641,3476789319,4135872541,3183553579,126946573,372783757,1983485559,3084213373,1627185171,673456557,1932977225,4044674725,2563914871,1403614247,3297217,3424536855,3865749947,1378310131,817343517,2391890457,2886310053,385426915,3342135319,4267253541,3122012967,279073745,2119579669,2025414657,33140247,4210684405,891936315,3355309889,3392506429,732841563,2243896175,3519453005,1105625321,4227381735,2308699083,2732810493,605870999,4241676309,2482517923,3169785871,1350323261,2485815141,2299355433,921105915,3864125275,3116698951,3312996373,2455468033,3502125867,2360164397,2427754279,2329171539,2639238143,252366653,59618901,2672378391,168083763,951555219,1732720987,3560590195,1684396783,3976617163,2785075905,2790022105,3909031603,798807693,1227865303,219935307,745516709,3710383227,3389721181,2095839971,1901231075,1394109319,3016945887,1470389055,215840975,2034974965,3925857089,3717966843,100172067,2058644073,1752171087,2739410213,2311010729,1811789991,1116821309,2479094493,2763345211,2849542297,1744717393,152774699,2531192165,234826003,2942796805,2145256475,1033633699,4170662109,2365191783,1779150409,3586078041,1459945669,3874990381,1192341821,2854054989,2596968975,2662730877,3069895965,336976645,2293620671,2492895513,437148715,57297451,4245066603,3176558929,2368308181,1761889299,4293380239,552435379,230267215,2847955243,2297152775,383041915,1084180113,2531978779,3325838721,3229436589,3565612479,3201533535,1299661079,1049795593,2492644281,2759606749,629818681,3684986105,1318694445,3226787657,2052749687,93623115,3563764303,51403065,2586518631,4000913019,108700517,2536617939,2882504653,2477008699,3539943,2880917599,3029444079,233807159,1433905547,1031629559,616849075,2518085661,3563608341,3942687797,1452554957,2834253525,2849254037,2752216037,3884049121,1046931023,1216855491,218900507,436949833,2535549937,3445688165,2489699523,2629173055,2714485173,2541102589,920724391,2420430899,2649803107,3457342331,1007968257,831844511,3460882275,3888885857,3861288591,3694689435,1027824109,597950857,16571215,3545909773,4161559199,3959259013,703497435,2700845429,2513545755,3455713473,2289927255,3560476779,377601669,2508827763,3997426615,2913151609,1659548633,2192158843,1247357369,79066513,438294137,2168081761,2499497413,3088097245,1330456797,3507465671,3919941757,496371777,3101384235,3486263053,4191061213,4129208345,4084213911,4207632429,3380150823,3950805815,3871924147,4083648259,2356683951,2090502607,3244394437,351643911,1356012091,3621996109,2860471677,1058471411,2240180423,225053015,3250630255,3487537793,304119529,3688924393,1360652259,2803616943,2482054343,2691109057,2016115321,2107028805,3187480835,822532261,1298324565,3083574753,656773311,1087571181,2996239887,4036924137,743409703,2573196739,3825605101,3100093655,368732051,2775032245,3451737567,1724744143,2102061059,2017241949,2783215557,47274187,2242294967,1738878517,3534811981,2546414497,1132835617,600496945,1055064147,3614889961,3291606003,3071179469,1426951473,2184119543,3893711731,2725276039,972727001,255517747,3812847221,3968966889,4292441885,261289629,2247196333,3823079693,3361383285,2615928385,2303144643,2518153559,45705233,110238407,240428213,2828920791,157512595,2482723181,272832015,3692324577,734170385,1405667633,4292821523,1789234533,725590299,3289460231,565446707,2152541773,1178612479,164191143,582850517,2151339481,419708891,100730445,1825339075,417183483,362020075,4072535409,4240263177,3723403363,2393496499,2248440525,1946589627,2439201733,2358678933,2187017841,973155231,2516191529,374773729,1245987247,1913548811,1108944115,2651654881,1911403039,2898178649,3377245181,905895975,3463625357,1234819661,2084508455,3627816501,1817670179,4235847937,4047525393,1918400625,1766219717,169741581,2280420703,1543787831,115037463,1708856771,3937284331,2363477989,3655446399,2081518769,427189627,1547496945,3054674001,2943381157,1922270675,5693953,561962673,3031214791,2657348835,2473365713,1634426145,1739626723,3379261689,803084207,2974446385,1168802849,135933413,497149269,1109683491,4183458809,2415549897,2875903209,58233095,401003305,124723745,173270561,2109860077,4062008077,2536748551,1470339181,1848559553,2963938181,3017836127,608266259,1612352043,645139509,613960215,2174314719,3676354301,3271309051,352713137,1015813153,715968479,3731974829,1818897361,3690414865,605810383,1954830777,4187564137,1715493877,1843322291,2308146739,296429791,1901555387,2709150045,421153539,2074825949,524042827,188194321,316607207,1994382009,2036753875,3280545389,717250841,2645020137,597930137,1362390351,3258980353,2772244857,743777359,2235322109,3124957997,1759590513,2951290591,2561965531,3578487875,2346738161,3167775915,1238351357,2239335003,588302497,3081673649,252514447,884732291,688261743,2961664493,1305885831,2763087693,3485707321,1494080153,3079694901,1185122035,3530834031,2065272995,1902372879,1880886873,2663203135,3264763231,844899931,1140480697,4008540591,3080222041,4265438695,1473163809,1736545337,2532436931,756684391,4083283501,1405245553,1995035749,2027651209,1993548051,781742105,2280165659,2878280343,1470003849,946862857,4184166175,4233091543,137602885,1383279035,3017819151,1322724921,619145771,788124851,3225097801,2500032645,3451327987,2194893739,3344932577,296841391,1908467035,2130187323,267312791,3381630847,3866732663,2799749725,4138315239,3655048869,4204995279,1838383693,1387732783,1903576035,2620125799,3667898443,486889085,4090129649,319794007,376087965,4028253899,457396893,1759367001,2751105755,1780121815,2378512773,3539230607,710252323,583578123,2695591301,2905146063,3928510701,2992432693,518645803,1763730731,3259745485,3900276651,1335496099,1764527915,3743624595,695577673,1674555899,1287040995,2083310457,3578131937,3907166795,1456241607,4065021023,3702329151,1776035615,146141693,3435615755,2233432509,1905508697,1891754215,4013554325,4284021471,1136017527,428839353,572632301,3831608829,3333985417,206175707,2529074227,3852631223,1969906439,1493852419,3457940579,3305402539,3258380335,2906597881,4000980213,637968941,4193638877,1789323377,4216100879,3805838377,3245564985,3986154607,3213200233,726633305,4132296301,2353848693,2960065815,1742837703,4245602909,2678652845,1731891881,1086653143,3107492201,2304524183,623294677,2146510323,2510699891,3152368907,1704174251,185639037,351254031,867147537,3491041577,3609634367,3773745419,3197054497,4247603309,3672417001,691410579,4168736893,3183288083,3936975565,3859924205,2101521023,368641575,3697253213,160402421,3328707391,1145123621,111038037,1712392941,2877015503,1197691181,524917847,886572391,1820985859,2671428173,3397272285,678387471,80635129,3582911323,1029641503,947782667,2778985605,344308577,426560791,1681072807,296944591,4098977793,2372483387,170714191,2987298583,2014491657,4030638397,793852311,2383133233,3432924315,954254733,1416873329,283080643,1065292771,3129266273,3160096147,2262983953,3654184121,4046668541,4083969815,2030644999,3148973531,467389991,2111280131,2436917559,1497031497,3059062799,920935869,1841340075,3485623593,2602008679,2138284667,3289634091,679524771,2308998859,1981965379,2694016431,2044669963,2775817691,782182369,1182626983,3730072427,2199055701,1465707627,500397903,1033354679,330836481,2763381859,392571505,82537727,2552384379,2423216507,3231511259,3019774371,239529343,1373461523,221838573,3298592143,2294397393,2063178649,2489248441,601438777,4201463319,1483915239,1280963551,2215494883,3465880619,3974979983,4260164847,1946731017,462195057,1147824537,1381836149,2661250759,2613532165,1882234053,3694605439,2944368647,350648617,4087176947,3026906375,2903032997,2215426159,1963450339,1627840075,2454955503,3336911863,1849678649,1458580351,1336341963,3912857301,3947828795,1937780741,3819353325,1136776739,3218744293,1739880913,307690063,2898756981,1705078467,2254421081,3360952041,2852903005,3636257231,1727235505,1171467875,1223523991,1126873651,4115836525,1574172609,919083303,2847775605,182238313,3134509463,516258651,1810078389,1294497671,3853170515,3659757039,2753078023,894545183,3277647045,2405939523,2832325927,2802033075,3542716263,1756102925,246946695,3850406329,359892613,1952025163,1809860115,3720844655,509960873,1151150053,1153112865,1681428749,2374674045,2279986517,1502297979,3948846655,3199069821,55106291,4131084969,2038611989,571364943,1646196063,3333109661,129568163,1010985809,1791220391,1024113349,4288632855,4197159915,3856439277,2795698637,3444908885,1317574907,3042645333,3000347919,1677467521,699703201,515240739,1103344881,1209664075,1666390793,2256457749,2891092825,4041064839,241476971,98423511,3694944201,3440546795,153529803,3531061875,1184191489,724894747,882290645,222333857,854462911,1893276455,2013554249,1878576261,1886942015,1915746869,1440048243,387673357,1065688459,2757623153,3430318691,4066036379,140123379,4130021893,286309825,1243468263,1044718673,1952700619,3499926013,3935811501,1698798165,3741402985,4034235013,1098775071,2886982485,4187764817,334869651,4071173977,617692269,1217160297,4293507835,1472155181,3110436753,2012094789,3350731445,702411475,3927841659,495812393,1090084833,698562825,3253435547,225436231,469631909,3393558929,60490829,755941735,342059897,1105209505,2708642357,3841985911,746053711,112473227,3288421601,485321429,1211248299,1880436793,378118951,1546117951,1656643475,995811221,2763278251,1655184015,2467966403,1578747709,3667278805,1523730553,2281159185,3300153169,2019542949,3371244021,3998715995,978011201,3596680253,173380611,76602835,3657171083,929322347,418662733,467413293,3637964705,4260648645,1213467005,3750437933,3254102953,1698788435,666718937,839572451,2076907387,2212836891,2496215927,3072718609,681147847,4151399943,1245717719,2259895557,3523711453,2769448273,246087449,2528897327,494023927,3617331471,2232646029,1472035131,2919044429,2406026641,1548637967,2281248217,3335348989,1967300703,2748661513,2678346401,1932982053,3962128519,2133817039,892117711,1365949661,2800535979,1731690163,3442857049,718405575,4227906091,2220608365,1399553423,4084338739,3466326085,3659448981,3313082897,1940807063,3905536431,1547012931,2434830993,3227900607,3779658961,3906866125,1851977741,1890718307,1160536797,4133225961,931100001,3127837501,2586920179,3609446403,765852261,2254081403,1448296149,1657969973,3620031065,4248832129,3389660139,2767920821,672270409,3322598935,693561891,2071823833,3111970381,4159887977,1436305519,2130085983,1805727745,1046874657,3677098915,4240558739,4274775265,3161790581,3852457569,1831785713,757541593,718027073,1670044379,1688641597,3845864575,4256964559,1003120705,316749541,2216078667,2451416855,1974719517,1541142439,2405281689,1069412361,14095965,3077552099,97044001,707657857,854408637,3209014383,572578539,2290714159,1044133073,2378306285,3337588817,426264693,2323897731,3317396787,3588055277,1881388005,854215205,50629575,2599415079,2524259585,1739271173,2150312361,2486256849,2742391881,2467061903,407368223,898841441,146814125,1948510663,3304123133,1216226487,1962606629,2086707937,1313270491,2670264487,2941116577,227317579,3242843027,936863441,1271450653,1326182017,4274452259,1697715349,3650079749,3296881751,990803331,1236500461,4151096959,1041432907,3835915541,2380389249,2780704083,1691260607,571678805,1228128669,4158322513,979047029,2126970111,10169343,2927557693,1136125949,1226395833,595197027,3222833889,2539666325,3265461515,1868983171,2766983905,2213337247,2805846613,4038434561,3539519265,2785331577,1441182615,2894631721,1787246033,2431985947,4131132183,1643375697,3473418855,3672080429,4023764949,1959155643,1068373743,300476459,3187284313,931728961,1279523489,1019287131,941898305,4207081183,2155413081,2168294139,507310915,1083279675,412993169,3772772431,2952262847,3179977077,1691142383,1463142165,2923444343,935694353,4248473743,69659663,3830326075,1740752483,2501645611,3666490963,3384128181,1680097171,3043604099,3112925835,3639252817,4111977843,3413402295,2531569835,748739509,397958489,3550856967,1690637815,310072377,1411302755,3858931957,817383293,2494582431,4271925127,295188429,1151877985,3156934909,1986330813,2615020151,1785411957,2922025169,2568526601,1855071621,2457383949,14311789,61749937,1828907619,3398439971,1741847111,577544423,2216398513,1086132633,394554971,1334833513,3617702469,1143294481,1732792005,2873592143,2833932297,2042864383,4284894899,2397896959,2860247679,2484510035,2374854793,3155436109,3636388021,1236822407,846799629,1956440879,3022234367,3768824799,230000185,582338693,1931241453,244311975,644088633,3760149073,3642751947,2385935745,42726201,1564183165,3472068379,437281173,2899016681,2794803553,1580575655,336841391,1373428401,119540659,2379705775,1363356005,2517437619,944986159,3847866043,597325117,4100422271,3189286769,1834147527,652254605,850760353,561414599,126112109,1080760539,1143753293,2057353563,1325072515,1787841927,1522535343,672857169,4173777673,1565261545,2237040335,3350878757,2002542721,841089721,1850715017,3583118377,1177931113,3224143419,3702659037,3557636891,292532131,1925129363,207655755,4140398175,2522454481,13110731,3034717649,61634713,665365337,3885478005,623049313,791477447,671271249,1766802609,2848831013,1996343767,3554644537,76399061,2669200937,3433454917,1641660607,611273977,2489366379,3644203329,1452363701,45114101,2932354413,2630294815,3269257523,2340046155,1892964411,3561789655,4265175519,2100620169,3407220535,2492662707,2113730901,2146970889,2554297421,2779096241,1737481599,3177346737,3570573689,2408752851,649182051,2124437407,110129323,4203826589,2200836469,2779330261,3342314211,3842497079,3390604239,1536713297,3191733113,548000645,1581827399,1829120231,3178295463,556117627,4169166389,776292579,4117907283,4139374613,2876912749,3230160523,2337070025,695676357,1082164119,596400153,3474772599,2819645719,3773746891,2750378993,933431275,127961647,579849107,1043560599,36820941,2780685577,3822890861,3379135155,2328215361,2918527807,620881157,1224981181,3466528453,2202708557,3054101413,2349856621,2758826187,2928300507,3126149203,2581766175,2772707827,1708094657,1516959405,814810557,2403771015,2599123525,1411210711,1583576319,1123801949,889990307,38988019,2057233227,1017951955,618837127,3100793827,1054772899,3399522705,2628717395,138940759,1432770773,1252277907,759821917,2657751955,423839065,2962530475,1416886073,2773695689,1426389367,50219287,1604877597,4008155545,2822927115,3312972255,1230147655,3637737673,1421775977,3829271181,753981091,3005352297,658105835,1643971399,3044340317,2715339063,2661923357,3663177445,1521165597,3716696257,2767732857,4149882993,3855637017,4200503631,1107193605,320491639,2563288291,1531032671,3283022115,3980174365,9761065,414444189,4030393653,1614638663,127632439,2558353473,632643625,1357780095,1901123853,2054419603,892083981,2655104945,764804605,1550189817,4109049,3809144925,4265528883,2666032407,3177355075,1491727185,2087761369,1650120637,1346642883,1648431091,1555656973,2453836489,1968922731,4118945265,3984869161,956977553,3804152337,3994630229,1371421743,3539578695,1314301597,1499054183,1802964875,1946945223,2856834279,3704088729,4001364827,3748918261,2064226379,471202139,1004140783,2068335429,4280347065,974702371,439400543,3162734845,2466429557,2527161913,517888189,3813072441,4175593007,2073545163,1971941635,1849548443,1897523135,1661843503,2806525997,1406708177,1361506437,4177947741,651319577,2675808035,1382034629,2454284453,327785965,4238868909,1863405887,34183497,3692819875,3927632267,505385637,401993365,1701000403,490765407,1376695737,2140400947,3653500255,3843125297,372595565,4171388445,3361230443,253221277,1949966313,1038204785,2102769723,3847489449,2700048289,614328425,959230331,4061554727,497308873,1610549911,2442395467,1879343503,4064834365,2770181433,1823245119,1633272959,2804364933,1221097699,1265937931,3309750571,1623091065,2966938335,3800515981,2999786805,812371987,3159048941,2547944807,1184967555,3035470091,1614207955,1438188833,690469109,2652412741,3540958557,242991265,1057493735,4155286985,1202221597,824081167,357628563,2812771509,3266476637,2236972067,2582638581,1741690775,4060217187,4215911541,251088413,986347593,1186882177,3560838987,2609438659,4153820515,3066387673,1314258169,671225207,1930469319,3862202977,1856192763,670972115,1181443639,3294381599,1361441225,3833856381,2540372861,1604432491,596382823,2400692551,2806654091,1420463991,2758321115,1324458305,391973333,700325889,3907096887,2133664111,465575781,3828041133,2384752525,1451923375,719956017,1650624217,4061362037,578809237,422044595,1080652911,1250034445,2352513915,647888595,3106227211,3023486031,1829332235,2105641515,89959963,1368221321,351047081,1694392455,1964604145,2751739635,206079251,3385068139,1215093455,1530537559,3777041473,1915419345,1142667151,1615738289,2380995129,675740991,4000490817,3832918505,1395697009,1356147739,3599313247,1974506247,1778192337,384998865,3224540693,4130706253,1032887461,2035800609,2859224991,2862219697,4141442125,2949184955,4230441019,197521913,348610115,1900077871,2949261549,554689369,990178715,4164355005,2085226929,472252893,1784807057,3227894081,2087991185,4165802187,3903635073,1793514707,3703753397,1004364787,3149662447,3008099351,2978871035,632887489,3393098217,1908444435,468626449,131018383,3944245045,3327851441,2993238081,3790719877,1982069101,2928711805,3988241791,2330679217,533822381,2642536045,2885368587,1524001097,2511923755,675628221,1996253993,1763517,3903522305,4084245179,4167565705,3512190083,1582792591,3576351809,221587577,437487743,2289483865,3200458613,1070375235,1387614787,813935753,1539001685,1518633171,463213505,571885831,216903957,4253933383,2553954933,3145615763,3947207879,589666855,3679438147,2294776629,3475035445,908471949,511733089,4150663667,2904725943,513496609,3759218677,2694003827,386095019,2976441467,4276796419,3962446829,3198029045,419316869,1956963399,2103520363,1489692105,3344578187,2917456119,3028693791,568244063,3380669625,3600579623,785148021,3339635713,1859567261,3930763787,2991876297,2449234117,3315234639,991685631,1629302267,4223706589,1503418721,1484998641,2833465239,2016915331,949250023,1232501771,2403010353,3925691491,1214330897,2070489887,2828753241,1633647767,4027453289,637306311,3123339873,3077064181,3554762431,1857066369,3645308247,2640464761,1162678697,135488973,1685133179,3022245959,4066252761,382042181,1176512781,3086520105,1373727813,2805815051,3015259401,2877146535,4290813693,1553757345,599094573,945096421,2786259117,3002104927,575820619,4000590015,777627519,3404573861,1339270487,510113513,4041880173,167643065,3587177697,3301675309,2024709435,2937518649,1647172775,3187388133,3073007623,3332305955,1914666797,2844293091,3714348137,3091179581,1635845901,793108655,1602027337,356138007,3670255193,1597873735,1909895353,4269349767,2542970157,401187177,2976487399,3118790777,106809897,3754114919,2228397345,1446080387,4264228435,1975310223,1613723453,3556438837,982018239,3638432891,2198990191,2629191015,2530853729,977030519,1666529677,150553233,3821323611,1085910519,3241732815,1162202219,1879019177,548792857,1518340227,1254307075,2146666593,3428235583,1228689547,394669455,3829422761,4205176947,3513460235,3936232659,3664324571,1446890285,1087345751,3633585711,3422200509,2701069207,2895057253,109251453,2044534803,799080149,2738442471,280421237,1776110671,110004853,430974471,1302466987,1195915373,3672707287,2464669207,3074934551,4221500145,3983009437,34274331,2073199443,3116277725,1262963879,2467868901,2650733191,1173173531,1686361841,2291998555,542530809,3133252127,3379344309,4176116521,2260485341,1785446221,2776206481,2369736797,3829981025,3575286631,813211973,4110402263,1056430007,923216827,246409441,2358896997,2119132201,3919116729,528598909,899099459,3845649581,216641051,933373791,1623881729,3332918777,2196337673,4091750631,1688684673,3369511205,1483145177,3980683231,3912042015,321430009,3065060245,3793191243,2581915353,555539171,2274430429,656684855,90552901,1554749765,1469896829,4200955165,2611179775,2393113657,152397311,675109477,217278563,4071514043,1203708387,1116378023,3622196329,1420349441,2049751817,951110763,458300923,4246089491,747894101,2146985599,3320633401,2231039279,1832701535,2937708123,2552469291,602794485,2435932071,839417349,1158333657,415395205,1496102205,1248886559,1970144971,2965999035,1154874429,286357451,1064145397,1307271743,961466929,1281423961,1083818491,2165175319,2397801987,411047525,3585524761,152586509,1362158289,4043825685,103708705,2110052391,1895843989,3424342107,46124377,3728545525,2067082935,2598593669,36372715,208047711,3438011019,1194706373,623442917,639145929,2443592933,2593587891,3605144965,3598467365,2879945343,374323067,610771813,3841412275,1655747029,1694590305,1711620299,4053549017,2105637831,1002177765,4206135527,3467796121,751036155,14876937,1282881219,2646880147,3439219047,1329005597,2080458377,1211334687,3927599267,2116831095,1419382401,3070642991,3311537469,2042825319,3709788921,1460163109,341445915,3019966591,763663179,3221391261,3394289659,1374434993,2767836241,755069393,3069025299,184489245,513651117,879695835,1186667011,424819349,52524661,1937703167,439696289,1335405881,289616019,3878915337,2664411479,2370074399,795282729,2297043451,191938199,2214665131,1072719147,3503475669,4257490453,487540773,668671483,303969073,3507507365,1432334663,3525360335,2606829729,2806769657,1998229281,3361899125,1580827661,2182718527,3875550243,2460523497,3369385539,5402297,2513048161,1012121413,445098587,3848454043,1301737433,29046629,2217898229,3671811833,824329361,219974385,3863750033,3038994493,1292693535,3072258409,3001517651,1780234309,3740929893,3305486727,992774381,878297263,2535879767,3599604111,3685066921,239141755,2666535941,970927289,2421860283,2247118889,3431450787,1496278529,2252521189,1649531653,2508399943,2697619777,1203018403,3810137377,2726666409,3420916633,3186981917,3550995771,3640891019,2755764655,2295022969,638617259,1533055769,1001573327,2418851571,979018369,12092759,3411625953,1857315633,2547972527,2716262769,1247415259,2787114283,1087831417,2218342549,914007273,3334950307,1354826043,2410285803,1292504201,3004357697,623718451,3990123981,4207376101,138888533,2421823095,3333325439,3325870451,1677851571,2679249165,1786667813,3972874541,3317866425,3319723583,679480573,1441750701,3774657,691573333,558409359,1861090291,3239545863,3274672131,3108505553,1731692851,67536253,1031880807,2645700125,3402486561,2386706851,761018633,400023469,1096097255],"b":[1384737085,95180155,1008506061,1523625621,2517003251,46864207,554528777,4194854823,2726113373,2341196591,3872762069,1749012503,1365952881,257275349,3190763207,1369727539,948848683,3749172567,3230817833,4188394547,2728877403,2044356091,1625120105,2796413657,3076236899,4270820231,1903932925,1167976457,736871571,2303956395,2264073713,2121608657,2399136551,3272579775,3645234279,621172507,3319443983,4199763059,521060035,1750590061,2245992355,98854809,3499602567,3611945237,356130159,2395398479,686705483,1304978845,1849603751,3917523317,1198406097,283513861,1666912113,2823526203,3079927519,448181717,2799379141,688893149,1616158175,3536250713,2992849545,3880231889,1362892075,1097018801,2857844371,713159061,1718191309,1882321059,617954825,2239251345,3632911123,2863947181,2338106157,2837546395,2180925125,2694236317,937977579,2867630609,3999215163,2787581331,2490186631,902653967,3071095193,4157098745,3726180171,1856055419,310313167,2230592017,2544948569,1926471345,1471875435,1242830821,1511735939,2834767513,2339849623,74613015,3547926575,4058040935,1956934077,4165881401,2002324985,1294877905,2734861287,45463847,4132424301,620819117,2739700167,775434585,3488449727,2443948035,3563015917,1683669063,3346602003,2339143817,1545800513,2777814881,4195199237,1856113683,713439603,2445180511,3782585029,2185315041,3688011333,999353673,725115259,1732893663,1073966691,4273041835,1495967303,3030900769,4143955941,3498292289,30811379,2583849933,3543756139,4163235681,3204669053,1988489011,643702971,2398151485,137469751,4206718889,4081820551,3484071757,2250895411,1332653769,1966919343,2151127353,3188767453,2680358947,301340571,2676385187,570706693,3989351905,3675738863,1295821953,1427278273,454738259,1273896493,2923245577,3485639029,1122885139,2126570573,3516450409,3706735075,1375359417,3384718795,2616436833,3363848429,4028421767,719621023,3501318181,3940173361,506474279,2690422643,1896101479,1839128051,362374691,4047228833,732928209,3042733641,53602109,3409313399,3613440335,4042954017,2790084967,614294995,1175264995,3244823227,1888191489,4098510575,2435494961,3011076631,1930113853,1656978075,2422844411,3305473271,746729575,744313949,2374354405,480184047,1463934973,1580705291,125390113,1970409255,4271127937,2021491593,3809537307,338535333,1773753133,247498221,3381268975,1827355243,3656811621,2699742017,1575341965,2151929293,3314037013,2750606963,1101785225,907261207,2554150243,3537280187,3918337839,189296801,899290967,2046214955,3494770073,1646020543,2790528905,1574157183,2126204591,4254463881,3154862475,2251594707,1929905841,3131023117,4273086301,1444475853,3469558453,1751872139,1691974075,2555860133,3579227385,1053818403,960634855,859602055,3205747697,4274671869,3610209019,12565629,886965783,1869391967,3549845817,510336327,2058688769,154169491,2556551285,1258491547,1800190035,1052112895,2832648731,3926394629,1011609481,1692543913,1883022041,2941515323,528599735,1861141047,91023881,3998158189,3613013189,1782997959,2259051029,2897273279,2836816363,3219685885,3756875335,1747596765,3199390461,3072117061,1760162395,4086356245,646541733,1015040919,301725277,2705230505,1169210411,2858276563,3963722053,2969400447,3910389461,2501403491,2600827781,627031647,4193947405,188882527,3568546973,427579845,2050023577,3659570855,130770741,1368069471,1147601519,2389821771,4265342751,3984417883,1314540361,3727250791,1437047355,218963527,2504400557,3197209751,10352477,3150942293,4212250671,312077757,1561205503,1086493787,3170354321,1229960261,4055894237,2785776487,3731363753,2361754723,3412808137,3630343863,2550637253,2686387815,4057923711,305693535,2050991375,4188694453,1673763007,3198592897,2283548929,1644138463,2888043485,3598089291,1076421959,30123545,3817052821,3580822519,3227333299,3827405299,2436797517,3144616675,4139483057,3998003021,4231110465,3014870085,932995987,3992037407,1505679277,369392447,2058824835,623520119,3999736311,314494793,3309907935,3762692727,620188329,1065932017,3656419885,2293951337,4264524915,1645001519,3938089801,2857601105,948123517,719544467,2887724653,470209043,5399691,1820090657,2647047,2442197209,669740037,4142130107,2145232935,605883207,2862032897,3078228923,302953319,72744879,3447621371,2361778157,696265001,3152390389,2676272951,4006172937,2620115821,3296461283,777137659,1981568413,1295445325,746695279,3626569933,938567833,3604296387,279726155,1658112301,2197053745,749935199,1663511993,4017144403,752582249,4105709203,391917145,599745061,1955974843,997800355,3461777959,739236471,1300753675,3534522839,4186857845,3662531833,4230787841,3044280939,2043837491,3941993485,1369429465,1045331479,424163849,3350997879,2340776805,1170859131,2682600519,3279344639,480188223,2962326675,642489645,2677241969,3712261877,2306001639,2399419077,169876831,2116743547,2791336223,769621893,4072718391,3789136579,4231399853,516987569,794922961,3470955397,408878119,162487499,3406775945,3453159059,2206324991,3053802135,527621229,3251656471,3477965985,3878619111,1297465983,353857821,2266252335,281843327,834046045,933611715,924332975,3511288015,350906297,3230334615,1615739797,520783129,1052110869,112108727,1290405023,829861965,3901245307,1226837581,1346849535,401200973,402825685,1755727655,563688475,3809601631,913919419,2770013467,2568436471,1441540651,1726702645,1751435161,1025192467,3024168629,2105292985,3291444803,3306011957,2939339031,4225056519,4230344933,2155659753,280995523,3165712255,3771399551,801778653,4217823125,3883508279,2092183679,752717795,3489786293,3319021261,2099567333,3890987267,3721846947,3855294989,159708447,3236481283,474247115,2929721917,1509950459,1915787767,361457267,3261385623,2940980235,3385625897,1071711313,1937457743,2396670559,4011050345,1867546967,2332048199,1871742803,2148542491,1202793159,1348175061,2950321147,1125648989,936716045,747537531,1878366785,131535043,4066558793,3977934119,4022522313,3493438447,3538261815,4182230761,2434952435,4012508931,2816985383,3944902897,1633329403,3178442651,2911321225,279342343,2269101253,3983032539,2216800087,370804519,3699115589,4084347055,2702852719,1275891099,1937922253,3905645879,2624066161,593276105,736327573,3560782207,1340813637,2614694359,3692317253,1112405135,2297661185,3419872271,310876287,1540955705,3307135737,2745828725,1258497341,1829153827,2395764327,2891826745,712629183,1012118257,3171169089,2981730439,700183501,1093001881,3352534959,104331795,882381641,1760420383,1380222895,2820303895,1371098967,4004289057,3413580001,2107426541,3270103971,459426343,427153605,2667453929,1571831481,2724814791,1792358905,1882707769,4265770497,804527347,333569199,1229300543,2633681175,2729333527,4121127289,3346310361,3741451785,2997329083,2033073505,146667991,4090330965,1090641169,250999789,677745313,2851061553,1631222685,3498049209,4222160521,1340544449,2616661917,2034619767,315681125,3076088261,2461773373,2983135055,352952447,891620871,480526665,2235660219,862424073,1285054013,2569229419,2091724619,3918735191,1003595653,1917884613,2970078257,450080143,620246403,708184467,596748137,415610073,1798825637,847747927,1093355387,354919895,2478970613,296437303,282113121,3819515063,2913099221,2316732889,4135196189,1694220187,483538967,2823363949,2047172637,1375159839,3303890615,4282832857,2237583915,293977335,2557094981,34341239,4212712527,3560690635,1952225853,2887823489,4010770781,2572472257,3596007957,312551623,2988082333,1099866299,1160299551,4081437721,1454786195,3639270165,82907729,1736899317,3163817935,2996006951,4053632207,3004046829,395259845,242203879,1532443485,2442432483,1617363721,541366805,2430298045,3854947637,835344141,692425731,3889288877,753089373,4253116369,1546547435,3640912863,3968919855,4119019695,2941953525,4281471479,2812134733,4041819825,1146803735,2598605159,1201638725,491106605,2681512891,2938538043,3654924541,1382552547,2697202955,2364004077,1777812393,2939406837,3896447563,4220244877,261803263,142847073,2355575627,4116750901,978191217,3048001361,3711072483,1731280591,3006150435,962652623,1077226161,2680102995,786705023,4019179687,2666607179,3598839757,3766032219,3813410915,1902477623,672703649,9550225,289023219,3611241695,3664474769,1671575767,2013477355,1733511551,3449388163,657916897,1334991819,3374665745,919720161,1477838893,1435274079,741503767,2456030111,188308145,157608955,4187310705,3194458581,1120261581,969569571,1579594281,1906966605,693781963,4246201461,1210839069,164846887,3764645081,3113316693,837550539,3774195307,3402339913,153824939,3143702781,778948385,2167302295,582247037,4228336549,2825219195,1917238857,3308035001,3744939357,3395077753,448341785,191475831,1556140569,636649931,349084787,1448483979,3831108513,1469346369,2418053551,1115735499,3376312977,3111835517,1066969665,292184751,3276682405,536647451,3405501445,4114232945,15875463,2512874063,4268057885,3159578247,3291822449,2140392887,3741825285,3225191705,670644787,1364096849,2238259411,120616849,464207307,2686601197,312092681,2020347877,3323251129,661177471,3468831859,2859392347,2130523841,1591918115,3975127847,1211869523,408786337,747130217,1504054275,3685468745,1283777669,614588425,3504734395,1299653133,3127462489,3477824987,164264085,2124317645,1323250579,3906089373,1054542055,1993895367,975218927,3292801467,2114512217,1439426235,1684435369,2426604901,3459774113,712719203,3087782373,2633638677,3572111551,923338919,4225556795,3252272103,2135208445,339375837,3999402321,3639262721,4024844583,988212695,4253851149,3234611685,2287865829,3086346343,2417469377,2452129917,915696693,3740719957,2063251995,1970238749,1439648029,3038470923,968072921,3554160247,182929863,2652508291,1685797853,3642703977,3365227495,478612931,1981375361,2642371751,1401951853,1911964861,1599676559,3537160299,2251340699,1304111585,2881455725,1981217989,2292324281,2840339579,920862379,285222817,1631718629,3338331757,2737352735,2547415323,2784084419,505637435,222686779,4223732449,3544108359,1190759701,3482925401,3727038223,3843267995,873755961,3074774905,2913528195,1352368893,761182971,1260932653,2754320747,2673147833,2860609213,1996513751,629521239,4164720801,583002183,2610739229,2162077787,3423341763,3531601609,2447300605,760093097,2574966071,889686045,3307508423,1064083195,1395323481,3530195203,992848349,644464545,425987609,180806455,76535473,4269255605,1054562417,3151310381,2887816507,2406931313,3912493353,4148749161,866284765,2290673893,2714391079,2862798519,2920195133,2584144585,3445800703,1235967067,451255079,2574175171,472601381,2898555685,3334268271,3047567453,3788241733,2346809399,4111650649,888597919,1582037307,809531703,1533062467,2008024917,990338159,1609597941,1982313229,2044900579,465941027,575162441,156864597,83467087,428944307,1023149363,2374140981,3143335387,3885947883,999368819,1432512679,3036781291,2235335887,1883767759,1315989169,2707937269,487356149,355290145,1460537427,4275597883,2702099545,1277220781,869228509,4284136853,2086752485,2402290977,1997194475,3077090645,4011888919,3979507705,827023929,182862653,259702851,983888527,266329741,688647159,2007037893,2640470723,3831982549,1598018481,3639839543,969527933,339832479,1580208135,2853295693,1655821649,4288145405,3340651843,2011111795,1453715537,3321282433,418244045,2730936319,4190510943,407413603,522721509,2297834625,2404608079,3599812155,2014756249,2089148491,131868791,2197618903,2348851343,1115757319,2463948645,3037498505,3122795213,809452073,2574513759,425846401,154324321,3544041693,765678881,1734532457,2102370091,2421500531,1727710567,1148054639,137645031,3181426105,174369777,555889077,1617395129,69913425,963302681,2140116639,2367748051,3367910761,1444961501,87537007,1162091957,1576830293,2285155911,3510943303,2692587613,454137263,2253474513,1520415533,1263589337,533020977,1946261935,1417913661,4077062671,2711940817,3152446119,1884465467,838474053,585189393,3032520107,976119085,3766615499,3206889887,1532008163,1089043335,3276803313,2495310845,3229159975,1349584071,1568254311,379154181,1437121079,2730346271,1955984475,3722276991,1946322279,353604795,4176414255,4199796793,1874020329,1145036299,437850475,3820282265,2562949961,219945851,2237255787,1420428785,2104411319,3075729841,2005618179,841964131,4051848927,1477266385,4048854019,1288889795,2566309721,3030690039,3784200641,1500502401,85306815,1057487657,1879656585,1522427895,3787833929,3835641061,949737591,1439188913,4189245857,831184553,1344018411,1768298891,1976220853,1781868887,1293613861,244203519,2001814739,3530869649,1664632305,4106226059,2311632195,3670250487,653222897,2068513827,852549577,407109621,3357403623,3418859299,3437799661,2846636969,624394405,3523106477,3904124629,2504050991,750567077,3396991263,2044724759,1700304671,541212883,1939003321,2531489225,1885231295,3707302215,212742783,3667100185,705948781,456946303,1373947629,4236818433,2121578609,1185206395,2253483333,1496861801,1838429293,27029867,2349411379,2245538915,3384433491,1473303383,1388371283,1936103167,2097697791,616510465,1545260501,306781487,1367077545,647284469,2351506247,3067382217,1188497353,4290509571,1303904147,3073728651,3702844491,1516646931,2445861541,113825977,1973593235,3819809171,55677115,4095171845,710048271,2309160451,1297066353,2548477565,2336190319,3646477733,499049187,1425656515,824813823,1887420471,3361759683,2922511615,2503930937,612052889,3229293103,3871008483,1259337361,1285832057,2643423405,2447834715,1281374333,3947327553,1226596071,689251529,1169007189,3672457613,803077507,3142600425,3197299491,858754625,2942804977,3907347763,3167915077,4239871331,2160858035,1209138101,3591381769,2659907223,2634794617,121228297,252360399,1701587007,3043739913,2756291337,2313639897,1978065723,2332332527,3572977259,3263897781,680788637,1725844681,250304819,333148897,2952440753,939556349,1502156087,2329931073,1742633857,349789219,1232263269,2601388483,3292594197,844643737,1474336265,3237498233,3005501773,2683474367,2533912707,1370441701,1023301691,2655141007,1622802101,2724888699,1403913625,84126145,743561301,3381979349,2416458673,21571267,2350909835,3097247311,1747415949,2601214655,3430396209,404889407,3540771005,637585003,2734820481,988437569,987374223,3967083751,3589826053,4279968421,516760195,769195025,3222499359,3522261969,3452669393,1461444771,597736377,181003789,4116585779,2220538479,2905892489,1225532111,2304664625,3649453793,312544165,426156003,3671025061,2663454003,3523403317,1123473715,969701363,2658832231,1528363123,215505075,3296417235,4263183607,1203942645,4283791459,3935300063,498801403,4268792585,157092963,1267996429,3196324649,3679354935,425698529,362802127,4277091313,606702319,184420611,2202662497,3512594811,1409952723,212359829,2867081309,1722496891,638515833,2243139075,90983599,4161919151,3366612791,1060684963,2525784089,600008619,1276190039,1527234029,568224931,2480132685,1516058195,208557701,2978934091,1489883485,365650665,4246930521,391240841,4045005601,377661755,754042969,4027129619,984364077,938463581,1934824823,201991593,2348416307,2147184653,3069072903,4070913199,2785700487,1017244683,4161896799,2652652345,88890179,927614467,883469139,688898799,2203804509,2410703169,1257123733,388969899,3926761365,1465681435,3367903991,1121677557,1831332101,3319867219,1512918399,1581370409,3697528975,2266961369,1313532733,386925757,3205424951,3248357557,588917351,1258873963,1100574915,3657990255,1034819867,3886275405,380267643,901749371,2243960455,469157823,1829363841,3127429595,1158056625,4033168351,1243165469,2415180359,127170955,874959541,3880861795,3495074949,1996637099,1417226601,2519974873,3509555499,2998597011,1922536553,1481549573,17162451,2309462313,392007229,3265520009,2898379665,1650881195,71127631,2261402627,2685701063,3957403037,2641670271,3587450437,1906396197,3110828097,1121846983,738858497,4268884723,860048039,1982023967,2389097787,987218995,2856983509,1974992287,187326649,558653313,3392218889,2707301523,4068208813,2095848607,334870783,1254791091,2113011059,2644333097,1646798323,1083563773,1247745467,3297679519,1154691405,3509148095,1688413287,817127147,1855851073,980896429,2723523345,671711875,2102743413,3462381843,645629303,2962791453,1149438517,3034727091,3950010451,4006422027,714752083,4137337101,270108047,4106970973,2549671331,43349565,1907852285,2884542115,1298140659,4020863345,1233907917,2944938983,809459825,2481653385,1947651207,1964151231,1695834187,3636064495,2781278381,3551685261,321993631,1209834431,4223397137,2424737045,377248981,574059145,1092561205,1526687499,3608786237,747604361,1238142231,28571025,589974167,1508250279,4135541999,3139645499,1551599847,1748426991,1729220319,2849740507,1474323041,2963128237,1499712195,2283782867,1149814329,3447363403,4247934101,2845648517,2788460603,2734245187,2102366483,3110454235,3944079619,2030796325,1240223987,26361305,2604855471,2332785193,1553048805,1918674413,3080389555,2791191039,1947245439,3670363723,4474023,1787820143,2515041929,1556073871,3536247135,4244262249,110847083,715602883,2912423193,1610559279,2999385751,4062237523,762955387,2952352557,2612918745,3551415993,1391630449,420317933,2366902933,1040742775,2451114259,3607126921,1067104081,761002435,1644944819,2620152889,2679676849,430367079,1116376633,331954993,4100730805,1120850657,2119775137,2320805439,2676924531,1361054979,2270100393,2787771615,2076657863,887556291,103363601,781076319,654826519,866318989,3733428879,3267745265,122767687,830092033,3688063199,2489670623,1870834809,1844210163,1801830249,2937938893,2605212599,3446775071,1263124487,989922153,3877142151,2379501121,1321877147,3682905661,3500351779,3441652287,1708743805,1882309015,507739971,3978844201,375113337,2584397835,571433197,478476939,3365474155,1226259719,1344795929,2803935739,199037689,1467563619,3634027775,3887100891,3957234243,1209895289,1436343759,1464097197,4147834183,4041556361,615904973,1115991375,736511219,198079831,3495492497,2058388369,3880985493,2700876983,1205073361,1294762005,288218703,1712813333,978638911,663332041,2243873,1550072109,1141808981,3367718029,2776331829,2486604913,1876686475,2975369521,3954168533,1215746955,2567503117,3616435481,2425642245,4003846877,785565383,2278509135,3750435943,1401470359,3394500511,191979869,1599550191,2595025715,2250368239,1185568389,1000935403,3455441601,2480330395,1289154107,873287639,3458969307,1952486151,875531513,714074123,3094295133,4243249543,3490405953,1285932751,1824968723,2170808179,945133989,3040715679,443344001,266602175,1171390631,152223585,1052167561,3449899767,3902659529,2453637921,2549432983,4094639399,4053188113,849491403,2050040343,943789207,1850426807,1210514649,3424119605,3139580917,2083802289,2588121617,797099773,2959333803,3302195741,3891394907,2907616053,2497634401,882360365,437617481,373475285,1827494355,3478333163,816819289,2094096533,354756499,969042875,3146264095,3804656267,576735109,1304934721,2059121955,376407215,1063155539,2908613361,2426447559,2006944747,464072873,3636962211,1136097057,3603653791,1425797205,3724218677,105786269,90163715,2731447123,3997181179,2997779769,934114229,584574249,3435397251,1307589517,2412068605,2618763119,2124408807,211197843,2973519619,3093451683,3357461939,2483208591,3670186793,367429365,247363253,4046594009,1430584905,3155976615,2178074275,3437529655,3620049489,1520069191,278659417,2928735987,2945866397,4002878095,3034522257,3036030113,2439357925,2736736141,1738842587,3373472155,3321310391,879272545,386094377,1438411703,3498035665,2510503185,1649609547,2176587991,1308987573,712104193,364829287,684207073,1079533559,612192541,435833787,2510118467,3768169157,2613908063,1652680827,3093251353,4133977255,1931340245,1727020045,2784876359,1639251047,466575007,1525939177,4078608973,3203311151,3264781767,3157113833,2229654247,4144054313,3543208213,3668065951,3347122683,1758744103,1022708205,1228743379,3067731679,1734812399,1593572669,3751938753,2814345959,2205765211,4187772541,1029497131,1678967075,2506713311,2682177959,477251133,2345723271,318550911,2204271179,835632335,1957801959,2670846187,2361571515,1741443637,1579190043,1331385987,603590175,3808844293,1180473005,4146798389,3181942949,232628393,1610575199,4204651155,1461371775,383339583,1644496259,3054944445,4135278337,163874925,965742361,4028083583,1193372057,2644709437,2239829599,3875550019,3121960571,290585577,4194100931,1031264455,1126217913,1856935595,3702110645,3487789429,3598379233,986333393,524208121,4201969409,500210391,1704681127,4053800505,3682153343,1937309523,1369408409,3591837203,3398681299,1752747993,941366169,2158658449,1593059035,1105241095,3124400811,1326175323,2298613153,1474142955,3566004925,1879195877,301136231,3856590503,1778329513,1332400689,687841121,3635265109,739544039,4175630553,2938677047,1725877433,404871379,2845679163,2226087827,2109552509,2604512373,1613273875,4046862033,3973920783,910143783,3150576037,1431701481,1851509953,1014267191,3024760517,2956751049,4138668003,55968545,960396909,1317843663,3621973471,2839592787,1618979897,3183596679,322955007,2951380587,3871437803,3958220117,3690924627,3752101061,2601929871,1121834765,4156972441,1152641739,3347922593,1971557655,3757154113,666229173,1723452393,3436107601,1576372959,579061135,572841787,3427882913,1593328327,3597602305,2089666669,1437029037,3653570851,3050063579,2754872701,2980577029,1594689071,78885303,1869206413,1917644079,3030265891,1445676921,1580896903,2426223223,902810687,4182826775,3548057991,764815835,1040501219,2601013289,2736373491,502688037,3267242465,164858591,3938795639,548648129,743919727,216670131,3976531043,2337248057,3814272437,1771230417,3774277095,3172875993,526326701,2234182501,1858485727,2121015775,2313067807,3727692143,4038659855,1048366403,878401769,1324589463,3474589629,1781212459,1212448943,2727680325,2546028295,2252950163,1033726319,987434491,2755638201,6001489,1152293083,2399466545,554649619,1896212813,2616136677,236213369,4233460871,2135441819,2007443787,3712770671,1013350519,2533770491,1651985877,2871836247,359818971,3965053685,2304561095,103511531,718452795,3182962867,1428100997,4193042425,669208031,2640549941,2625755455,3215236327,598532811,3659481775,4202670819,3354171013,3665483267,1059996609,1458670265,4220132887,2956209423,4074806943,161378961,2894702999,1915281469,2168822751,2312506375,2928631989,407625947,3964492253,1505500941,767444919,3634578645,3810062039,870956451,58064145,2698057611,2299057449,4251106571,3367265643,644640097,2581894731,2287534675,1243172909,1946409211,2195238199,302376627,1316925183,3255234809,1761046893,1242090777,1916476937,1540886543,1403469739,516212641,3456168013,3572292491,2828719017,2089832707,3979918439,2498243977,3595333649,452396063,1837855327,3110428393,1323352517,1895919473,1513518709,3622409967,1852058749,585817057,4267050065,138986185,2873351733,1215255679,2085395397,773622639,1517632309,3402320583,4028857449,3278679203,349444065,1650367093,524598451,1752913805,2166579735,3980766465,1030239003,700331459,1775631877,715190147,3198575437,1075998233,1167586213,741463469,4186426627,2490938731,2637382943,1404978043,1818381403,194474397,1990795101,1790464175,333460583,569179541,3005719855,2418855981,1342802181,228384869,1526209269,1076692335,3507064075,1875653335,2727059429,4031662527,3628567143,598671871,3717461699,363838851,1299003331,1198126281,1079028999,202611473,2274124515,2246615213,944074943,2165583849,442586649,3581457887,3570561893,2260968055,3775932285,1266389699,4051432231,4109392869,1835569241,2762184791,2233281555,3178371423,2990569663,3759490827,4255063761,2202666443,1340176867,2687155895,1939361675,673776715,3285827767,1361856079,1037615567,289863803,2559982363,2116644569,492475277,539139583,68292487,1436550221,2704723433,510879139,723040813,1980318031,2771847195,204005803,3246707733,2528312131,18431377,787309679,995529627,2251712935,3965681105,3986099291,1716236467,3925777571,1893798439,3056413335,2317966171,3833160117,3730190053,1308826645,900048901,472838325,1598690449,3460031265,2589482895,2091165729,3999170851,2657775385,3527715951,2408926989,3168654525,4250756767,94277727,1645534425,159795275,3340985461,4173846557,178226655,4128295141,874408889,2429939591,3799008951,565540887,4146176059,3429819227,2459339327,2907622099,1452818105,1997532149,2342844857,2761644751,2897581053,2815683185,65367905,2062645023,1110198785,2156533635,1766848579,3767974171,1389282293,4175775571,2641661401,1345071765,4270053299,4287195827,1504867041,3316071465,4166075089,1683093697,3149399311,745516685,4113033289,2653440969,1311057573,3964242053,1788292901,3770396901,2576896859,3241111007,1472961757,624774421,1707788463,75575515,3440457607,1773156371,2138220539,255689099,3929690007,3905069121,4023663271,1024005005,3785877397,2370357379,2369076771,3760963401,2362585911,3873943815,2782067571,2233693707,1262070217,1636499587,2979210393,1080136213,4289940557,4290267967,749410971,1783266165,3765697573,3326307831,729409877,943692035,3951082255,2437198343,1019267551,3096572567,4210354715,3157488093,3352261667,3845077427,2767589919,3080957645,574115139,2258500021,1156347729,2943191911,1724496127,3518933641,2522168431,211596403,1457660053,3784238651,1848095991,141903151,569407569,1843069255,137203823,1318818541,3626335421,3902901399,350159079,60778003,551626139,6274039,2497976347,1570893693,3102846607,2413363767,433414491,2160140981,1963473901,3201004411,946131331,2537589041,1164537137,2102479061,1185813657,2889033265,1326445407,3707982091,3100629669,2784105463,3197253447,653758365,2926008615,3766661017,2496827621,3063212441,790512263,1828195747,2671146545,1140671343,1888973753,3222772685,1146945383,91982805,498699083,4249791993,2505346575,932113575,2114965679,173853181,4133117987,3061097011,2711442223,1002687829,868608777,3897255881,3891721095,2195054185,3310270677,2697383469,684192353,2212556829,3351141837,3610200971,1684250551,1553002163,2378446117,2474762817,3381197913,754625367,3615434161,975204371,3977398053,467412251,1067187177,181129843,422236949,3572533753,1113243419,2537202629,3746386935,951394113,1303332345,2162861863,1954081943,2171941123,1765150451,1550835745,72028013,780453833,4248219215,756220369,2993010665,3304393757,71454045,382293921,562428627,2449900163,2857056739,3943626541,3204525531,2177523607,623863617,2886956289,2644935859,1691050795,3068086133,3067172809,968617255,4181329555,1309408143,420036895,837756373,2612740489,2582898761,2791838317,489714317,53081917,47706767,561742331,833535751,958689,1317962701,3826546417,3305352447,1389416747,4208840341,3867781075,3839316911,2770929785,3516440321,2748875147,653486097,4140303939,1340864143,3298421957,1536387441,113982981,2070627471,2505004697,345241,3380035615,2925041593,838101615,1697808809,1212973059,3629939935,2187523127,1266054977,3677646703,2749265461,2099590731,3678605393,4067228163,1631169853,2688990547,1161677617,1545042899,2261804327,706027233,21005391,1483277355,3454902383,674491489,1328613999,500799231,3972913449,2865001441,614782213,1748573625,1075038843,615127457,833641947,4000080439,1453229073,2531450757,918086203,788201713,424006591,2184141183,170881123,3173272053,4283731915,3849486517,2945532921,1619934473,2243509769,4107210539,3164977375,210346803,518270479,3185982767,1693624159,3973172863,3860474257,3022238159,179004799,3538420411,1592272307,793787013,992026743,2667311151,1408914471,1825668691,2372424295,2862143547,62152153,3290510501,3650345261,486158745,1179684389,3821226385,3659430799,1168449009,3375745609,2309996427,2788383483,1324288083,2122239671,1658393563,1534634887,2640510151,549409035,3228259047,2318715719,114915999,1955529913,2497720519,3653336411,3547802221,3291507535,350395859,1920146077,405454711,2176064551,4292570375,3267598259,2238216707,3288113581,2622976227,2724375453,172830675,2149235317,2088838959,1341279685,1230013631,103868091,4129663169,2554301717,2226107763,1493089439,4088936605,571650621,2042498475,3022228359,2890366341,2157414475,682790977,1093119567,1515783593,4230593199,89659807,1866179453,1855771981,495114519,4042244007,1853375061,3762712781,1985493419,846521347,2090721713,414901577,1019352023,4239957031,2503740537,2360631709,1175003369,2607608629,2195327585,3729305087,538749099,3688417025,3523274397,1110399721,1435948205,2250535461,4000766063,3593362683,2933326439,798918335,814178981,2868952343,888578143,2680358435,429757031,1383692665,2427635147,2283132093,851438151,118161271,3129653443,2942159865,533062851,4149005467,2887149601,3036803389,2214669883,4062152971,1349444725,115030173,3496490763,1888193825,3803447199,2724797867,2998593547,944428109,680366033,2704392315,242823497,3613692475,3503310653,1057002479,2187677523,96921501,3737360917,2617434555,1480614167,1870028769,605599355,2332052319,1988190043,3735252799,979244889,2521252895,3589290971,3866394493,1263088989,1508993559,3633580169,2612533715,1624023733,2835103639,205760245,1132503637,1264934211,3204353793,2076931749,1945300245,1613778815,2319755247,1264025425,822122173,3376757729,3451702951,919043675,2819151351,1774170211,2399657845,394212825,2379769567,436742869,2382402869,1820055071,1415987761,608688469,1114378749,987414959,1871777461,2623372309,326027833,189343881,4247396045,3161131473,395104129,1084932387,131098389,3599457923,3161864137,2076398637,918269443,1186652091,3340424063,1740391617,268442525,2497159719,2659435295,3087593877,4271329933,764125845,3481806703,2356132205,1200868715,1569242279,4176187279,2616856477,2177930749,995598733,3604271437,4049708211,3618971043,3930299273,4239052095,3571399793,2796463451,339188929,361364887,2927561843,3938646853,3523229025,708993185,561949003,414913821,4049417249,2302340621,683356347,2251609675,666808621,3770950225,2227972313,1430934467,2957789635,289137223,2631803185,232064619,170357207,953692367,2409995369,1165955941,262996511,2164736287,489959691,4193295785,2108821087,4061359485,2694791941,2448010017,127757077,1327386489,2091689575,3650986105,2036379675,2653638579,4065899927,1790829631,661011907,454288981,4042439307,1327820529,4225239207,1975444325,2758754999,2888061547,2264581549,1095590889,3120126167,2434938759,2049283257,1235154243,3600894701,2312279769,3399890531,4090854393,2210608259,1213744323,3857246585,610432907,3661754341,3985003663,1937819397,1458476621,3341022473,3974199075,4112115203,3111955107,1470061411,478159815,3566244089,1217533423,1805980345,3496516001,3192977749,269768049,2089610255,1162592003,1365358939,914769127,3597530763,3414642199,2149923371,2903458171,1431954673,1254846607,2699345269,3642562935,2468590931,2261624559,4252995843,1835377977,1951660929,1895847945,3293854601,997716107,1575079725,3111002509,4109671215,3045141137,3589162325,3380948009,4262674561,1100175375,2582496717,3160685015,1369943427,377139677,28309725,2735302367,1291908805,3625840489,1854977271,3441832179,2234331365,3286931947,401711491,638709341,2634527587,2870302425,2900333901,2592556135,410713107,557027535,193436785,3704567709,1554743645,1768516513,2520602923,1369447565,518690355,1814797953,455428281,486397623,2914973331,3037924999,3647082639,4284916759,3415064677,3675392365,2725251831,412006187,3006265561,285261809,3853838367,945629631,3572193757,4255549861,1584338973,1911754049,2830884991,189705581,209342889,3241598099,746733117,402779675,2651198515,2301476763,2171296189,876834143,3670924331,2689986547,2691632099,4126352613,3176384171,1311638135,2869310317,2528499515,1301587599,1989407699,1908924587,4026839431,2401413887,620222853,17133945,1960284961,1565852485,3589327703,1920867527,3150191461,1206114457,456785223,3339897043,1415457347,3698383323,4086630161,1818237025,2054614543,2093139631,3989533215,2931448689,1469096667,2384552467,1328113493,1300481985,1265969343,2639751629,4169792303,3794468861,3941339229,1864232707,1408426153,3673211365,4265646595,2028649007,3690345313,1930964261,3594501493,2984705721,3851831789,2449725659,4190820181,13649717,1494655407,1311310233,3712033043,1286318275,3129547259,1471680291,3379457907,2824113181,108161685,553587279,913698353,1436275179,1854069265,2179667699,4076026809,1728894273,1679169265,3722398743,3593126981,3087595419,3100642815,3563806281,821277131,2496020833,1199803249,120811329,1185759259,756667743,2570536991,1081612145,770317463,4065192399,2392922381,187383211,1056543379,1227502345,1659063503,141033991,4051615527,1767225191,694621271,670346587,3203500371,2548690537,2850014287,2984559887,4277584811,234216257,2411991335,3575744497,3321811677,1217666855,2844583485,4143088809,3713687689,4044386735,4263900139,604479655,506087183,2539469835,1686091801,1276404647,2309694941,4079014183,1463787859,3366238321,1011549235,3122851365,3507272315,768197467,595109261,4201893587,1438544055,3798609633,2455616831,4288558343,2488202225,2438234347,227807305,605226267,1719011551,3549618983,1822893123,268627741,3397740497,1241613519,18047181,3366673343,1846093175,524134365,1611175883,3532184977,1800539015,3920870825,3316231867,3264326875,2992141853,32813807,2092210945,2204446873,801011275,2687320207,2111373165,2239555333,2190962547,272022701,2233146381,384197477,2710257051,2460953689,989423745,134301307,1715605377,2812316871,402929049,818378581,4053930391,420976231,4185051925,1605056271,945110597,1501260513,842273953,2745649613,1127164045,4158505821,1715009195,4119305899,4191319629,3807220141,2028785477,697363611,2199573055,4140158643,2936918945,95568307,117214051,875098031,479765785,2827471103,3336051721,1469189533,2961772411,756689805,4281506405,3364701461,1575068387,4040469501,3785677693,1465153017,1350558477,435820995,2966413531,2192832431,3181470611,4093577577,2056370959,601512511,3917916181,1952723293,113765357,1651734363,2650086905,2313338413,1496925713,1292038555,2408906721,1614139765,2167136589,2888672509,146643573,1208221015,62894747,3108415985,1964910821,49433857,2178150151,3539979209,4089903359,1668860549,710164931,1145494541,2104681545,3676578465,3338326973,991184861,3475188747,1099730637,1592697373,3098137635,3052453933,1706462733,454904703,1407573543,4019801147,1951830417,2699612101,2133740575,3565970183,571781395,727445789,3712613757,1780002411,790340537,2526062447,3744913235,839774395,409245303,2989925149,634710459,2078105853,3700090083,1780205001,4182787401,3081701253,823564679,879004967,2261922705,1923295319,2471702343,1065093045,680781957,4178165077,1519997751,2088355501,3902998929,3471828169,493000307,1741772209,2742831059,1064781703,2469217999,2160477521,2844784117,3259558537,391572675,2294730057,4099332933,800817979,989687911,439076097,2878923835,394810699,2219281099,2766743941,3476511953,3042845781,3645748909,1443467365,671173805,1822483957,2508560411,1351955763,1705681739,4028558163,3440311265,1313713375,3205419039,3933311575,3055485585,1653282803,703125983,1229736291,3813760325,3547910101,194327533,4205333001,1547672863,4293660469,711183687,2537360777,437769271,3590107523,2932171477,2657050373,2061884169,2113716137,1404928859,1412665783,3557183503,2076102665,3235149743,1770776619,3428058429,645864187,1504367489,2573402399,1959577563,414819233,2211746679,720095855,2068102037,2914872665,1949832147,1586895067,2167815471,2144159681,1497260775,3715488337,2142852855,2208444463,1957881819,2580622129,1503584691,595086001,942705207,3565468861,2708802139,2347634067,683167349,1971018347,128769437,3918317093,3741794969,3556827867,269213987,951195163,1835262971,2228791551,1366014397,4047009653,2948887407,3434116435,2666915023,603752259,726044207,539763199,2747911943,2223304983,4255251537,595797503,136782151,1918166061,3176419633,1640366843,2513252065,4119124841,910868409,927086909,2171791613,1594035761,2898105259,2300561051,1217385559,2344932933,1562421623,1486599547,3296128097,3397684597,3715391101,367175199,3149726955,2369311213,3801291635,1521674683,2973063475,232368547,2061437883,1426008123,2455673533,2021722127,2021805627,2592455685,3939888189,903257967,4232822531,2158172959,727415513,848723645,3085259871,2899207129,2442759407,1688397835,904800885,3660144969,4033330769,2467222511,851777221,3034491571,1569939813,272201027,3401666771,424699473,2641512243,2907991111,1946374157,1319608423,3140359659,4007812041,2745616547,1301065897,1734566873,472454879,3893521585,1379487769,1375712847,3831376821,3537660729,2103128363,385133171,2327953305,707368197,2827892581,4016351141,1612169083,2193070255,3754714615,4079391595,3044847477,2494238891,1354364113,3317048507,1600938367,1779063587,1663593455,213962183,3725437745,2983201879,3354321845,3438282493,1433851131,360420447,877882071,1906306011,4253942033,2257369841,3282018861,3790351559,1500063277,1090179929,4175484733,3828016583,1797548127,2708410019,3549400431,3409717211,606512979,3009147751,3194141513,3651360457,1208419349,253538331,2673441669,2809357717,2032601921,42067829,3023319903,1463072371,3025269709,2082674453,606387569,164153545,2443094901,1484269643,2070459559,2402069641,3741639485,1057511125,1897453905,946735467,2147691055,1777971343,479784757,3945239183,191414067,4029185189,3059989099,797927047,2743365645,1959163317,154320211,3951784995,2212701651,2827761881,2466175419,4245303573,2869829713,1194528027,1413408649,1600132127,3277202481,2019796221,1764285675,1425330087,3504065865,3834745235,3827399729,2950738055,597289065,1429886341,3897473525,2744980121,3207857685,82290987,2395252009,3399271755,4111476177,1160273813,4197198803,2559874527,3119437133,56551719,2216692229,1037171489,2884313603,387900353,987507767,1459176021,1582428381,2400916417,3059308149,564663567,125745343,528626529,1989993655,3629811209,68404469,1522426091,2285581971,665693535,2952312433,1888088201,3410673657,1865202823,1970379189,1510958371,969507283,1786888071,2671232187,871738793,51795303,1495702025,928290513,2268487533,2532873515,3812604117,2656387887,3520381283,976812843,4238816269,1626330405,4036120995,508512541,1752075751,269780229,2498506199,1086919665,338184701,4020932291,3372501637,1003878237,2678277429,965622543,119584601,248512957,2936001733,1630542973,1218020243,427922509,6807865,2089759037,479717815,1502509891,3018049551,2748205349,4035383407,2535686375,1109625943,3260797395,3512499219,1053474917,592160507,3253652919,1561987461,2344236259,3523433151,4060493661,3431155925,3861617853,3786458657,2508690269,570528795,2169768791,3474312813,690113397,2418281749,2115347253,2320656373,3636301993,2543269763,2327464239,1431093735,3022987579,3829974133,154175993,1476225635,3570390245,2689862369,2585851579,2536220347,1907394293,3639326497,3128380855,866079919,906346663,1177649819,94545775,671873029,313838449,3956163629,163364391,2822528719,231725129,2333133183,2001874239,921838529,456447639,4117221493,3242494903,4092749633,2365523961,1274991847,1228876075,1093544247,809998685,1383052069,2569769883,85421637,4072914439,860654167,2621641985,1685341437,205013369,1455055545,2551421357,1111360035,2632705365,2645967133,1783233065,2946543815,2307163467,1946597459,1474105241,2538888599,4279730643,3475979481,3460727129,441210987,3298233679,2408254737,238993327,1368790345,3683246585,1467869403,2462334593,198277977,2850921473,737137181,283699615,2628868617,1597791349,2905341601,19242759,1802804721,65429851,2570664119,2914164757,2698135217,921663957,402430527,1349711737,3228827427,2349027987,2823816979,1472748731,2333791337,2004829165,638508565,2775002325,1008095549,3046763303,3013995653,2376885897,2435042593,186897761,544253195,2633320571,3037819235,1281390379,2917020187,1371720557,2879181729,1527394493,1390963319,387019155,1592824345,3961627439,3301183913,4290959563,588324101,3703614443,1345704007,3817151529,1757675135,4169520987,994932965,4091466473,1879382859,1633441531,2571501505,2887478409,385237539,1290529863,969397011,2820280135,1477427627,1513650209,1158633411,220279567,2795040589,4075653601,1592000127,1379255023,1308080799,2982963447,1766274181,2900905147,2649623591,772490799,2896897415,3237947693,181137947,4242601423,2760131929,1938813085,4117155117,3755064895,1735312263,1701570681,1093539133,11846473,294081795,1478776673,1302376339,1263478809,4089513,2779803967,2777129019,1162722927,3000083535,1277202313,943409233,297116367,2656457337,2251490033,3280079815,127764223,857427885,1634736111,900255025,3754325303,577716511,1081392973,3701959431,3337848441,3020206059,3524147253,2797946041,460551029,930750639,3891485175,472397503,1224832437,1075294555,1774773843,2488311247,1079384069,259610515,970472971,2242106997,3259694053,2247675285,3185516231,3556810421,609165327,1142038971,2541922943,736929553,1999466857,4176659055,1637184579,1458824865,459408271,2718577553,865817003,3797256713,1443816319,94996961,2300235461,1904367349,1025747603,1896753341,2376764853,2250580041,2972047897,4151538699,443923993,4051431969,116181919,1414396965,1998571671,3375875973,3662072251,889120609,2637719101,4271237579,2031159581,884674749,713199837,4030626439,766366509,2350384417,1194484011,1225774783,773994677,2060301015,728064201,2217810997,2155297977,3028299663,4122178347,3181045581,630085711,2203975905,1136658327,3602133609,2060547309,1580582321,3358598283,2176729231,2994979287,1062202661,1257637909,2362084243,1951323271,3895357011,2338354529,3982482853,485064465,3051554367,3718141997,1251430977,1106971491,617658713,2477205761,1880966169,2677959729,3205269963,4098777167,538290413,1938602333,3925988219,3719335995,2568688045,1834996829,561027029,1875854359,3895544141,2141609351,939485349,1777306077,841621345,2001688011,3034943987,3203705589,3953011283,2635333705,1247092823,3640526841,3120398171,3679897,3063701543,76861853,1110651389,3681360259,2554067615,2991617559,2064352693,1464370285,2795427431,2602643107,3402972619,2426448355,2027011809,1676693369,4261445185,2588038839,3552547729,3862022031,434680895,197065783,1344360813,1276302241,2198753795,84337507,185040537,1856797783,2719671213,1432133361,1202357329,1545102089,1435813259,4266058875,1621963945,2546464649,3652451839,4176031561,1243114913,1421837237,1345434551,4038542345,4024480347,453439875,2170023405,1756524861,2130133245,2136501297,49596405,1387713681,1703556033,484277301,1584779465,3047916849,1760579545,3783533263,3132254357,1945620083,1345363751,1556958275,3377753445,2547721083,3102060365,518599411,2518812663,429057015,3065064061,1876297207,310121283,13211681,3298134445,1655555835,4051754027,3027647497,2108995713,1926810139,489205063,4239128959,4063311437,538801469,1331875345,1471900175,1023078773,2916654813,224849729,2783658319,2405220781,3357104087,434311107,3750584533,619095067,3812064553,2003338321,3721155435,35696669,227183689,4150212451,3100760733,2103480897,165366439,3113972415,1106648049,1820922277,2870759147,4134295547,3929917991,502601991,328533317,3874079655,270946133,867334787,910987707,1742846311,1890413561,3827642521,1967696041,379104585,1937896007,1029832835,813415693,1393513245,1648927903,330512953,3396851569,1075116043,366209623,3624035259,930361201,3466970357,1432548863,1095727641,2285975477,2539196913,2916649919,861767331,2378525165,2551600615,1364369323,2707058483,2130712977,1635315459,3574393273,3041700685,3378161771,1169839539,2574375911,1050890517,1548944127,217304623,2080723353,2362359821,1610817869,3729651259,2692872775,712702143,509800007,3059082401,41770109,1440161209,2231085463,1474318973,2535888853,222093647,4013515887,1157571477,1083860979,2097073757,3709172095,2448230303,509164947,1544917777,4083545763,4083558221,291651167,3166740239,958430465,2866027079,4217630759,2507374593,3083331703,2003386817,574767121,399182277,1438070781,3267639897,1111884423,1947870791,2031755003,1153654533,3388032001,4262840469,2627973507,1628953559,189966821,2346522099,2786525039,1273827801,148628561,2200729839,3722058105,657793509,3745647617,3510636575,446384435,4037298785,2382409519,1404814903,2608358569,2305072983,3912189497,1396722977,13492507,191989323,1795905255,1451563289,3459629223,2907789679,3399434081,1196416931,4061444213,2492498789,1164290105,2394450425,4121452349,1354256927,446005229,2613010093,2628084729,594633793,518772637,2055175541,1252427303,4264420255,1270844821,1698811741,4006751745,3653254341,3103626645,2320143019,1663360031,2720848847,3716865997,1676852539,2912838173,1217803959,3128415829,2077500101,4125593639,2232882617,3273917033,3892070559,430414111,143239845,1991553689,256899165,1497496773,2437558921,2869909261,4125581505,3032192715,3388681899,1885789751,4284620019,3358134861,3156634573,1688464465,3069919311,2514921619,497123815,1095095037,4178281651,3217972665,516993739,1560166895,1835843543,1734797699,393615431,3913343645,1565424045,2626498049,2892293383,1162527309,3056912161,3035533229,3154080999,3313811327,238062709,1296672625,1888753293,68676919,33898045,982467899,1954466671,23550771,45635465,816133949,1712015237,3115554777,3331055569,2209139055,4210649815,3214369927,1132144425,432676261,479569527,2967987969,2167473961,873184959,2586364319,3732898007,3499683009,1183690407,600458021,2261627875,4219223639,3754539023,1280471909,162319053,756244353,3169225203,230995973,790142401,4151693103,2185462645,813693173,4197328569,3001596595,2525708411,3017916053,2037684869,439880171,2933598573,957087501,1572024597,3366274835,1436657031,245045271,1238781503,2309841991,2831409591,676712215,1514557707,4015100001,1277170239,3776185583,3939356345,736741967,761690197,4101675399,1492986321,3930915403,37704077,2283128723,3787641211,2223166723,3096821897,3690002487,929796023,1327563015,2412951245,2967480893,1767443187,1051582523,3924568397,3339467787,122890065,1066258133,3584513059,1361671569,3376100125,2120955357,2038383785,595690537,1841088063,3315554025,76908827,1485477113,4052295993,838599025,1292185217,1250315021,474547133,1329889295,3533443745,4262188347,3553056019,2335298349,3657223539,187884747,3662861365,1775207489,3155365641,1135337257,2826790013,2784966743,179837749,2949680079,3851224877,3764350811,16384353,2932357709,1590338873,2054768141,3528048247,3431426937,1075354871,3604957075,621936755,832683571,148588807,1914121973,2082998593,623135941,3244011269,1321475043,590356993,2502099993,3656773393,4247580533,2689984741,3024667463,1727820727,1550383087,4160004723,259643447,40382537,44875177,3209323527,3891607415,3809225989,3225707883,2528997829,1104597567,985508729,1762078783,241057209,2060863601,1072068563,862993965,2893547173,1220657371,2777115939,681578471,1843793315,1726159913,2003053517,2434150309,4228259907,1364859615,2386763549,2623277353,94559785,4114584277,4173660443,4254564509,79260429,4214042981,4472391,3288583959,3810683101,3813698383,2219324547,2044713637,623328655,3204833277,3806792421,864385867,970729583,583893689,1727379833,3864276759,1804551063,209528479,250887935,3648344379,1935688393,2253941453,1787527393,1868981007,3618801071,4174290943,197291065,3713360857,3993907927,75984213,3672958071,4073168357,4290027195,3677430463,3066785021,3805743003,3196161551,991142273,1555489345,3819490209,4195975551,1067314471,388908781,871737841,1651208161,2116288615,441047305,3455759225,2325817095,691935241,2809136309,4261505491,2945876697,301696409,1835519203,2269710473,181020057,2032810269,1688104035,4174927985,2108794485,1066094811,3953129049,2103854385,448557979,2724946775,1614630093,3644719533,3716089051,3170119439,3169242447,3617097307,4237433911,3558151229,193867853,1593674779,1379472549,634915159,754466709,3705289647,1326850403,3563603021,3671827843,4272727101,3865299431,1212379751,2247470279,4046319489,3245190021,3935574315,3926280181,1059017211,706701831,3584441935,3162871599,1155259811,2014421415,482534397,505012049,1435543171,3652653839,3674254497,757673185,3595120455,2937438431,951541039,893827939,21943687,1586456201,1648294651,3727233335,2913306605,916930377,3104093883,2891066411,487262513,21506339,843569395,238614707,3266696361,484176415,4164894889,30746279,1190878247,3454369529,3193617879,2346138059,1173823651,3676152277,2851150111,2609366823,3033838821,2230437313,3367040009,2333991983,872908451,23613755,3227819923,894852139,1610069957,581147279,327118179,228409267,1498077657,3431212063,3119475679,1985340171,3452718403,3963045075,2223954881,2424447469,152254195,2093882475,2455193749,1343132443,1253284711,1353844333,3689270503,2427108363,735029317,2245453319,741507891,3768868139,180923339,4108547903,1807892827,1053831791,4132161659,740745457,1948683931,1447264321,1321892737,2275802111,1675673589,2819970397,1412046879,500181973,510343273,569797987,168259753,2734298155,2994245457,320513949,533213337,1154471913,1663646393,1786498049,2508316247,1057949601,4213606413,3243345565,3303402923,660147009,2717246411,3484326263,473727617,230171943,243190759,310921981,970917401,2191874691,1758186303,2292810141,172709507,3433859893,817813243,1584756387,3934041867,1328156517,2154554375,4102301621,4062454675,853832537,127848275,300700717,2008304451,1791494669,2087198767,221653405,2849444273,2005837885,3464998971,1857879901,2665984895,1887278087,1047238869,3139712515,2117450033,1290429629,3450634497,3088367435,3482304321,913853507,1086210281,3655013829,52746105,1904023525,944802921,3986787975,3232180045,3099357297,3794122301,2999667425,3953189835,3921970579,3300368143,1666526993,1418497953,1092599615,1888180399,4267942227,3098437501,1058212075,1830854833,1469455101,2945490165,2878093703,314200321,767972903,4168523333,3764834821,3856340339,3355860359,383721033,647583327,2715906893,436467139,2551606853,3660709815,128287819,1488819603,2465099817,3922410123,193519733,2123322359,3549413407,3493887877,3789849353,672944065,291520197,1383062457,645918999,3389957699,2441274533,2476773833,564445507,1091797403,1059900243,878645829,1859770307,933456281,348513355,1421143353,4289316643,732234389,2068726681,2710256241,1168701531,325366239,2075998763,1296989351,1814185845,246131285,924432179,2007705579,2369453645,178878291,1206626163,1864335703,851822359,1498146361,3247398161,1497741359,593136767,1393705401,3974515193,1157582275,2485502805,739448141,2036228105,50305819,1672904425,2384741463,1471449173,1667253773,3116975853,3540175855,82542719,4285677385,3865542095,2158541483,1287699443,1384760645,2404672771,2212131623,3392466227,479159121,2391009917,304125095,2343494827,3242832277,1802271457,1295925693,445606341,2395408225,2689631095,125154239,3552990501,880166607,864602383,1294251313,930472427,2537506809,3678992777,2401921601,4204760583,2501001335,1647130161,4287303303,2491711427,1217704961,2150877493,3779410871,2602465609,260582969,1696575199,1699964541,739742091,4087585117,2004089637,3083236919,3035450099,3806361095,84195319,3481056441,1906802027,2773826415,3606210683,1164825233,3653993023,175845771,2459076547,289498155,2713352581,1843102029,2691419757,2623145869,49136071,43582623,2615481877,2540847499,1261287587,471392075,2025291075,3863753197,731975045,3721866275,1268750443,1471717139,3514484099,3272840081,259986763,2254966903,2784233881,344182083,1441056051,396068613,3118008501,752299439,1560893849,2477034229,928145211,4019970397,2766532387,3641497793,1568105133,1162984849,1969676367,1617241205,1206567475,290190949,4158088705,2467855063,761583027,1888412485,2036640965,1493558073,1315311465,3305391409,2965275213,534828269,2283264195,3225261979,2789795175,772530781,3569444063,4230851227,1168599397,2392485269,688183371,2729493247,574552205,1616328583,2454496349,3341084593,962859081,4022601483,209102147,2932535449,1344875393,1415669623,3222726399,1207996803,3883524687,3984309427,3096409289,1625198357,1182900207,116753461,635622471,4148175421,651581731,2918886667,3078470105,3441376907,3691417451,2352946875,3377260839,565049553,450464849,4065444211,3294542801,1025017055,1386805499,1454071855,71134353,2349664581,1181706045,280236503,987232735,2526581439,1695906127,4209959137,3734578245,1284463521,3899301269,2536020239,2909661879,787234181,2652773701,3545284353,640442309,3304355435,2169203725,3718912415,2450765047,1565653881,1776891995,1533058593,2130703435,2227356847,1303535509,1130278941,3252373903,2690341011,2584350799,3323508259,745038297,3766056845,3603744763,1732271035,1997670989,1004683595,1647262877,1437281939,2289147117,1251596851,3973302181,903841703,2038831035,2331108587,154158761,2679273345,1340496727,2323362487,2103218465,3791261777,3889016371,3880110463,1029353075,1724752511,1812500015,2332888585,2855031455,769906623,728262301,1144414959,4093414883,1473300601,615504509,3402192351,3205571637,2613175499,111908653,557867219,4050457441,2401055771,1809464071,3728792327,3304897475,3848295107,1764933619,3459056237,2232601157,3105430349,1487451431,40852329,2601724831,1081500507,3920962793,3631077907,2806253019,1438495513,1668999197,1366317179,2208402137,2397261501,2510732139,2006849727,3870562103,3126236649,1114074783,2781166445,1444444855,1225983437,3339033665,1199935001,3627039211,853530441,633760033,2636969391,406858255,2398693653,1801058335,2639459413,1209156707,3288509767,2680311743,3810881539,75042979,2306307241,3146992151,2881295999,3744802755,521024055,4247613181,1658237599,2918285557,2463378025,3665087327,2493880365,1294647381,484194815,980079515,2739092237,1710178255,24145885,3939027239,1042250171,877676327,277819977,3679219563,1284534583,2676513631,1185310603,3923993999,3885670341,178853075,2309338447,3401584585,253896055,320678395,2253609443,3135192057,4065481151,2774633499,3087837943,1428751455,1397951761,1256248673,798871487,3891832127,2550896055,1283066305,576944347,995020997,2993244561,601090233,639080941,4035494733,1478766561,916900919,3419747001,2763301147,3593414553,310090311,2392327851,3184117599,488943387,406699003,2290734889,742839445,727377399,249377037,3878031503,497891257,3024010537,2670902151,1926642713,126995003,3927150825,2725514203,4018827131,2183079587,4008580509,300804183,3178100585,2706857775,901894417,3817181529,2447385213,2380660981,439115153,1572164919,848994833,4032529707,1882255231,3241322685,2921680011,2371198621,3648021689,917447607,3114038067,80431795,1166824645,2697102275,578323053,4190835185,1073037131,2504965767,22862893,705220661,935512675,4041690027,2888300249,649125889,47526915,1771433541,3355983665,949421335,1293647775,1508401583,3330082317,1732762929,3080566505,4179077151,1470325343,667854441,3125432541,97038059,3039053063,2478486935,1014485667,1858123835,2558918731,2181310315,260258815,3137241785,2077178205,1333295947,1347240259,2100041099,2038516611,2282752935,1846763831,631849565,2931878827,1894290749,2403283107,1992895197,2843712085,3696930883,3501296783,1878827107,1134726519,2286895993,1762936963,2605051863,2954750435,593402209,2702089923,1698836205,3071889145,3716575593,3556960041,1335840583,1602918613,3817218859],"expected":[[1163439089,1895966681],[37537428,276399817],[789760312,3961580381],[1216523690,3929930569],[2294619362,162761683],[9258088,1067196435],[185890664,2291252523],[3222611618,2107606081],[757245352,3497972589],[1296952570,3760844311],[1848845192,2326011055],[1099903109,1126879395],[498278401,17265203],[132085398,971032025],[3038339569,2325513251],[1254937614,3596416945],[603194235,1462870397],[2689269968,417209989],[457492060,329120959],[2542225129,1523767453],[44482260,3889247703],[496547048,1086674677],[223017793,4267401237],[2248810856,1992922673],[481981994,3111474913],[1712361428,2838467941],[247112304,1800919791],[127086118,3218445037],[736079078,1620793855],[502854391,4180643519],[1161316749,2788382337],[1780267779,4275527587],[1469806613,3160011245],[968787083,2679086557],[2324027378,4098680335],[325672787,4060842879],[1638421074,3185656751],[4085424607,617618077],[152418805,3144109455],[1350331118,848174135],[1183065195,1176603515],[76109685,742956945],[1400641111,3378508991],[3220155555,2039527089],[100896925,1769328353],[844278187,4287679615],[554668856,968382409],[1199310105,2821846635],[129019620,343007859],[3719010950,2390816063],[630356034,546569961],[24398025,2619843511],[320403587,2736377701],[1872638605,1774577597],[2741851888,3897475961],[156367434,2541251701],[179639856,561402567],[13793741,77985175],[739718403,2949678137],[223122702,1470218201],[713136051,1752964809],[3766285507,2723743689],[1229612232,1990961853],[933475003,2323047165],[762089209,3317784077],[384934977,1757352357],[644677365,768548479],[1431032205,1875293283],[316723700,4132300425],[1495201328,900034897],[1931278925,4189546581],[112496827,3850523017],[1023243158,482865823],[2644125202,3037630363],[2030026467,3610255143],[1942415983,4218250393],[266660837,2473944241],[2117843605,2385530663],[2559412985,356694295],[986939488,3526636721],[1712903236,2771519307],[149817239,1588024961],[1351602897,3424756831],[3658559657,2123107003],[3089752669,1847746301],[613124018,4015892645],[71051838,830879387],[1992749374,3142809413],[891648634,138515819],[1322849900,3367071565],[1407802124,3513728701],[731580099,1631415395],[993670138,2552468741],[2434147751,575988759],[1028504110,3870268611],[68940171,2876751729],[1413624036,2508758669],[3306357415,1429095045],[1338970547,618033487],[3795001437,730458525],[966103095,4020820045],[279466970,1222520675],[2598808429,356271845],[41832570,503813765],[610193832,39348561],[546980237,2981874365],[1756368615,1437457191],[334951619,1283344531],[2161431183,1856228023],[686894597,3456718693],[2800537983,3855219883],[517657309,2406347729],[1496043470,411428683],[528895913,1823372455],[289888776,1849447227],[767328781,3066621985],[2334392415,2745742933],[773073725,340657891],[121004412,52185909],[2217299304,3312342123],[390253791,3117585355],[275514334,815801873],[1827203330,3148423633],[759983712,728091057],[714058458,579339419],[1620262482,75376011],[735071149,1492434947],[1637379768,847668087],[1121632723,4189961343],[1117382610,3221526397],[1218987578,868760065],[812518748,1592347071],[18008896,3002316131],[631525829,3547066381],[540032259,1573049105],[3048106822,2837047337],[402105543,679699655],[1577807146,1101610799],[105632902,223077335],[1786794056,3770869219],[10245593,402062777],[3996820573,3344901141],[214415021,3248422897],[1817164239,1709845605],[396631757,442066983],[319920024,3957794349],[1569204418,3619800149],[1576032944,176283031],[2093628805,3196238715],[2592993016,2491014527],[192694742,3513182077],[2033343075,1261057339],[53349933,3514899395],[538173191,3441541189],[1912156368,3918446877],[101374926,1348326921],[99775882,1206616571],[93064497,2010855247],[587801922,1211012701],[2396117982,222250221],[1998381785,1916777593],[848430490,3105721485],[110451563,397583323],[554920940,3229741855],[3706711242,466469443],[281025278,1625452195],[3012249594,1189808251],[328280340,3041341527],[3356444593,3964320215],[217766721,1879339793],[626458787,3025182729],[253246139,2356334543],[16397459,2127332389],[467510770,1709163449],[1597820965,681142215],[342004119,842726675],[300019715,3209610463],[141938626,632510443],[3695227891,1825047525],[600777699,3271005135],[1092631557,1968154311],[29614362,1588552857],[1975458441,408619791],[1635355814,1954223481],[2779075787,3424495381],[278004242,2427458539],[326072690,259604025],[890020931,1855631219],[987383968,2719595777],[1873517334,2988507957],[2364722204,921462391],[2137423932,3747830681],[2251711094,4096454115],[1213867769,3282512381],[58691665,1986114785],[1811809995,1557915885],[2754247726,3879885339],[691006038,1246437827],[649988041,912098259],[1973177644,1483865461],[470308643,2790209569],[1088891238,3169182763],[1427955952,3254684743],[123333180,2877871045],[1314027182,636437503],[2123854750,2832672275],[331459939,3575112179],[3161961043,3981792725],[300940560,4028752971],[136569555,3777603175],[160801323,427383747],[838703880,3443032145],[1150283035,1135532731],[837910769,935704669],[1891493155,845604281],[499174098,1696933307],[707504949,2220302667],[766960798,2580564097],[203987679,1368826273],[697509588,2665573077],[202914787,568287701],[1663089165,552214431],[1806439366,848040205],[3806530846,2383984295],[53011057,822361015],[491108981,4105334717],[1471778115,4031832555],[395889491,3613351885],[776071409,1602707437],[1653499769,2555245131],[1486505112,4283298519],[958742981,386314957],[1430993713,3382469075],[2674327815,2629976085],[978347835,3536855691],[6236412,2671632981],[1080024364,3883796209],[2557362240,2947638667],[1203599817,299589003],[811500939,3964448169],[1183347549,3391605273],[817139352,67511933],[1231760555,3197124121],[1091505731,2690175349],[750410658,2114568105],[175369452,22968633],[534520174,2392505841],[131000643,3305807243],[1769644644,1037642025],[2512646957,3248777489],[8468435,4190429701],[565564997,41566471],[648895623,4166192999],[655381293,586735275],[310848848,509754877],[1291122895,3930936401],[112656171,761599133],[839506090,3451567595],[931835518,2345208861],[364021420,2731613465],[968905869,2238209261],[1939674733,2181525131],[2564447426,3088207939],[260252200,2528453511],[901179726,2864990123],[165034882,3672598043],[766255746,3276870765],[463784911,1575681999],[1276975265,1091963341],[8532600,286340007],[444897578,531695523],[1306468847,777204707],[1028238011,3014562721],[1340094946,3718651097],[1931196598,2185215195],[819209517,439496905],[2497726840,381067835],[1083405497,4222096123],[576081429,1574761941],[607087480,4192870241],[3024078987,3510501269],[6298871,2881529489],[3381014930,3348587645],[214315055,2959405591],[191031758,1213989793],[131702177,836691633],[2593333950,2583581285],[1074422975,3789704371],[2186214095,248794591],[2770940589,1877342179],[359722558,273081731],[2681689530,731492365],[960118552,324901483],[2013752013,1520238787],[591322993,1523135285],[3842800399,1530918441],[162801084,319616613],[726371370,716252343],[339351668,549634387],[1123499122,1952588671],[1087948154,2671231461],[118338689,3247702003],[1244454758,3735884353],[1002979590,3132446437],[1190475199,2224651637],[2457688563,2459028315],[648490877,4103161395],[360067286,1755124815],[3222502611,2859280531],[707600424,277587921],[101525099,3524295067],[2126091223,4145161403],[1585743766,2093606209],[3013122,1910569499],[568496909,2489197817],[2881931085,2957069247],[227052260,1605913987],[217098426,1128779661],[655273992,783174889],[1561151320,848201813],[1030871024,335952167],[2937489462,3551007685],[496446289,2746807431],[828234177,861295087],[1177394911,1814396787],[413832962,2688404981],[501853121,1873636915],[919358333,3294978273],[872557566,348189879],[3781560005,3813187297],[277717885,1349326235],[1275912406,1378594699],[3505215813,1771963539],[1369351730,941876251],[1586740115,1033046833],[764924244,2878106471],[648328449,2428613235],[1902733048,1024733807],[2190814894,3694758773],[278692232,437959413],[4555583,1087655687],[276908136,1967828731],[386185555,3811650237],[2088753933,2014072395],[1391638045,2274173189],[702454450,2822569037],[1042081375,1037431825],[377307999,2223829815],[1708457516,1626882507],[3953950076,1365148999],[1759388632,2801535083],[247674348,3036160905],[2629741204,1331714959],[1146993058,299702845],[180051802,1195440629],[323795739,1425404751],[550591080,973740521],[2502496294,2641844789],[162818583,4243929867],[687943150,1277384975],[2097929260,1898499605],[264323878,1983930803],[884658598,13130791],[1442049502,1099297823],[560474217,2527212297],[1390292534,4092098251],[1199798418,4147892875],[2515077379,707257287],[2814293093,1287500087],[320696073,1813152145],[645834522,3957393417],[392946010,3471091611],[193156202,4084435759],[29204,2096960683],[1425644237,3863224913],[2049836,3257620441],[717219758,3449247723],[76797625,2894484833],[3585157811,303998877],[1546725364,1709984861],[29786708,3449418931],[1285353603,3225691511],[3036571596,83053739],[214463409,3004509407],[15340652,1873263847],[1633807002,3025024751],[2043366086,1457148643],[65392867,3871328593],[313849768,1441927941],[1024734026,2845247461],[1208915169,2599362963],[1721730268,3541432129],[2667151356,3951575645],[102350696,782942561],[102067192,671855607],[69205662,2747143623],[341774083,2484400625],[2831873692,2721722421],[649560686,266189883],[1595118255,1458502965],[33318540,2383215685],[977683878,2185353589],[1271291856,4207456159],[397390076,491133689],[989864920,253924275],[1453872211,1161729529],[228999830,3682883999],[3648839533,1515758077],[186781697,669451913],[101848866,2900810859],[1192614808,1983198847],[524590658,53545307],[2142582238,573846687],[440729994,2289335721],[303929173,1729661617],[2932976385,2160935413],[293457719,2357910561],[361995200,3698149803],[3908096387,2474883583],[516460741,373108187],[984584688,3020037861],[888883704,2472922751],[1132202390,372259935],[304012355,2664045967],[151508381,3338593177],[2943106694,3479311117],[805814656,3938006849],[954143251,1016510219],[1768225533,3992397507],[119130062,4084110175],[123633533,2328975847],[2305452450,2530286325],[402175457,1429079023],[2238452041,2747621145],[1143957811,2537393675],[509647955,3832397569],[475134376,1140143777],[104039706,2993714649],[232275962,2317797459],[1883050051,1738282815],[602046169,3686049779],[2930165320,3721850609],[759162449,3858656929],[1697585367,3680329741],[163191277,4200158919],[345003376,886618031],[801776642,3287486803],[157724012,2820972755],[86580812,846582049],[527109188,1531662127],[1917876722,1275456837],[32166769,2767428149],[1161100380,3782895765],[201639499,742773293],[993081918,2019372259],[2564679002,2964060133],[1010166339,3931444203],[842910406,253827773],[195441476,666248059],[2084025005,1155913195],[193340679,490225689],[675398223,85152237],[651519275,3317627095],[288346107,3396631453],[2267902456,387301779],[2107112,1893416245],[1721638609,499832171],[1363538376,1215082503],[322076647,414673821],[676183792,2701263395],[58130042,2253445451],[517076967,1236335587],[300538104,2628751971],[2804477420,410464579],[983797006,1804249581],[912911264,1650331801],[61333920,1815781317],[13250004,1541062861],[111595097,3202945963],[386533470,4171392655],[714743788,2179804495],[565678040,1422930941],[1939843576,3119296329],[1458438068,3619160083],[1622424,1008001443],[9857990,508531125],[534605995,750823493],[268159922,3638889413],[1981943667,1022132275],[1805404971,2392174749],[596282132,3984617383],[1128521960,4037053499],[1961540002,107323775],[3713864546,1560144685],[2763705253,3634963791],[675216337,861487535],[248685030,1349819483],[589660695,2653203215],[592634643,1786229373],[403664269,4062013715],[3496395296,3432608509],[2623908128,1792053269],[1891689784,3177781137],[143853130,1662319755],[1376794995,3110507665],[2343450493,3664113053],[1824364444,1821117189],[2129915123,253210331],[2750293720,256093793],[3595003194,3895012237],[37231055,999432697],[2998845214,4046855095],[261520218,4188776067],[2734661095,2539922119],[746529894,3673476337],[1058603800,3715125717],[339455061,237049493],[2607952976,2794298503],[2394365918,1879760617],[2012745355,885127415],[704329648,2474063209],[1928351585,3139062085],[2242928316,347072721],[1301751961,2114378539],[1632813833,641150865],[1373941784,1692601445],[1193743219,3420853329],[1631438997,4158475505],[932671632,4046199057],[1071678041,2961577147],[775298888,1597307937],[680318352,3662719181],[440785045,1532672775],[124804835,245538289],[1494222762,4097601453],[113789058,2980817209],[3550192603,3451540605],[2642996747,4167060809],[1659220447,347309381],[2137916981,2645398319],[2111984962,4251586343],[2700054378,3811717645],[1311359499,3726092301],[595223349,3519304497],[1631095115,2566673501],[130037397,2109857461],[1144817480,2586403189],[1646912186,3928805473],[2423992523,1578140367],[143875016,4011619515],[255609582,824151135],[1950929173,1101625835],[1131341765,2757799359],[17983901,706346197],[3012380026,1352790905],[1571078434,2050852991],[1723491243,965057913],[576858928,4073331947],[279025918,540415441],[1613335728,2104449737],[648229725,2630941075],[241324888,2012451907],[12853778,526192559],[2555205734,1095014105],[769253183,3498573739],[2125607968,1360606519],[2151447727,2235457191],[496958674,3395179561],[1096814811,663859889],[3403336666,560109047],[18255663,3446022135],[114432032,3523922013],[2119101229,4246957337],[1640027921,1638458759],[280144487,3296967997],[402025760,887654295],[1509914071,1248672599],[2670638773,222623867],[525876513,3652265487],[468461211,2848023705],[1390753615,1938901313],[2536219494,4134565411],[667038390,1329745273],[1037161315,1306182115],[3014217672,3836834055],[80023912,4082963513],[294335366,143121845],[944892426,1750467935],[302456603,1081990617],[1346839595,1437856595],[1302297667,417407813],[1866673808,1659287707],[3018689571,2122266033],[2038465072,291585963],[600931784,2073633673],[210435176,1168111399],[333275469,1669796541],[2044463652,2645586377],[1422164057,47214913],[701872410,906992205],[1365082846,326345379],[1813997881,65633517],[1415577998,216872593],[323724727,3960926727],[187060440,1344259023],[681583427,647738283],[1638588488,3039812077],[521378219,228893525],[1969737622,1766818593],[1205023478,497583685],[2446460184,1523564421],[2747120074,2029665705],[428351429,3885881331],[88960321,1576000973],[3539909446,2844194579],[119728066,1192168653],[93762436,3619173101],[134873169,1715025653],[1843268836,861535217],[966812467,597141173],[2366619056,2983234147],[2517845351,3346332205],[78905107,1394359285],[1467611795,3272755897],[1146747179,507160603],[76592397,2634427613],[58171150,2380413653],[846459552,155185275],[27067282,1307191413],[326019444,1391006949],[536244637,142746293],[370335115,2392956545],[1983471071,49759243],[804876703,3649216175],[222397428,3103150715],[1150967315,2315412017],[1020177397,3354176847],[3116300744,488151683],[641306849,2327739619],[1852065844,2054654867],[461361206,3642852499],[131823573,2492581129],[547184017,2228591273],[259215303,540258459],[536733941,2529006107],[310725783,2075857011],[855891366,2948058515],[231424265,4039033299],[1035014481,741613435],[43415864,3992432511],[2145992845,3564535403],[184738083,3186666953],[202745199,604101567],[3531292589,3624424451],[536203174,723898769],[653976070,2625007893],[691261519,3926741133],[343887695,1966081349],[302755903,543263811],[497586234,204109865],[259313806,3196868585],[312920211,3736628805],[3128535516,649144929],[59386859,3238581719],[359858140,3893921585],[35274140,3338987575],[1180988648,2835817817],[22271843,434173655],[3855561229,368167865],[359120496,604853519],[1199109252,2194320885],[203756067,1899451131],[1579225314,1401898817],[1277054878,3226028605],[1569962809,485907449],[91633063,2642411773],[729297434,3770765477],[1003507607,2705662293],[656920407,4041055263],[778367777,2981445043],[50504873,3746634347],[1571595210,3607128735],[67478904,3740027163],[1308549858,3019299303],[1127531003,483642967],[2989924740,2672955069],[144578621,4287681479],[1572763834,2999777999],[79426230,741347015],[160288487,1382263463],[1072384275,3796523535],[800180244,1372403691],[1438391851,1065432389],[350108315,2367084095],[829903945,389966495],[193394569,1670483301],[640459311,4224961281],[556246471,1387919027],[2717496734,725544407],[513548011,2688180521],[3845613105,909876495],[483976111,3893212239],[2739709387,3289955045],[1182473097,11172153],[3333813758,452602597],[556216361,2366886469],[2530823170,2272943669],[150278788,3066832529],[410059410,2234906865],[180363664,424375491],[634445843,1585412967],[163627757,1817511553],[289320038,1691205477],[155667944,14196181],[2613985883,751959139],[3455737112,2595487169],[77453603,3438460705],[2495505109,389728161],[1108836124,3747022637],[456842763,3632325855],[1725464747,1781951113],[657865166,1874623231],[2467092561,528745927],[124711206,434415069],[116498786,3136877251],[2181422131,56886213],[2167562189,3929403097],[569551975,2958836057],[2223205180,2980346385],[835865493,627886299],[457355645,1106834087],[1904651326,4072088579],[518075840,1791599321],[17936441,2085498325],[2496564346,165900539],[273416146,1719499261],[826802309,1438328481],[1393645338,707636847],[1443082023,1666230725],[1156805896,4104259193],[2592752397,2866297423],[1227352930,1645991291],[298235667,2801551721],[2569224,300855471],[203237152,2604741335],[1202153636,3125716189],[786117751,3837019429],[1269074404,334979167],[519702007,526866733],[1184983419,2390112487],[55802393,583834499],[556020621,3674927],[1137961930,62259869],[2027373115,3721490165],[295669378,3288839891],[987137500,4013392255],[756145710,2276409099],[628795266,1008696125],[614524035,434532633],[48249797,3965895783],[11542595,2415525815],[2153878009,101638241],[2842469884,513257495],[684940179,3600171843],[514873206,2516219877],[1297369407,4022236221],[1828698758,3121826167],[511141748,4177253669],[1460521095,2087250345],[435832125,58662867],[7239301,756993069],[89836474,2079925075],[15803826,3883698129],[408099986,2041325671],[1105407303,2977449305],[2409749601,4003137971],[126158940,2359028915],[1595144816,1809916951],[364135682,2488525173],[169608486,3583849829],[111199604,4186739657],[2045027996,596535187],[2608753045,2153862465],[83198028,418820445],[279234525,4163653063],[916979498,3481726891],[2415105097,782099259],[274044962,1848016973],[17780139,2046864501],[1496330575,1890027299],[552274122,2281397637],[57980909,2127320721],[689402116,380485007],[2901228713,1651082251],[1142424140,1098327547],[16878291,2137603979],[645578588,2662595371],[2486525806,4083661439],[2314356312,4184943713],[984356357,1515312583],[28167813,3542528145],[2580853912,2949852463],[507902047,63820545],[345591387,145217153],[1130988393,2538817417],[3799328,643182631],[2034781612,1877564775],[405647948,2749453697],[2359352903,678475939],[912538108,3276180431],[370931435,659470559],[3508761495,1278181455],[2453925806,3081718129],[64838869,3034751511],[1338327135,999982985],[1891940233,1995979547],[41195441,2637149701],[321446598,1057490511],[1226471531,56955459],[135572466,239281155],[1321365361,3781244205],[1076677682,2634270759],[397031884,1558645993],[450864845,3772362165],[232368618,3161388521],[805331938,3428502547],[218022900,1916007415],[2623097860,244170537],[138709411,1442079129],[360011248,2651378165],[435165716,3501622415],[317149624,4017561071],[2463092923,650490657],[678970554,3398252289],[191962684,2007715211],[3305742892,1925153473],[998400845,3492076003],[381820164,1524460039],[133078400,4197517779],[84585483,547775577],[848239816,3812724819],[279954124,2711472441],[1768090691,893620405],[168897454,3633201391],[614611975,3987154487],[423009420,2759374109],[17896013,3919913377],[1373981596,590538593],[181687086,4141916529],[778123346,1182475661],[204282869,3561753769],[2699490533,3282821517],[560149050,1596893519],[2114132951,3642375457],[2397207723,2308670643],[3097725658,4002810125],[57869296,1124847943],[199372780,2965801575],[1714191175,3957594197],[378215835,902182705],[314895225,2654774223],[438032876,111837451],[1412019859,4293140715],[2399577441,2980692627],[630884303,3105344687],[2979140446,3102330221],[1744792943,649110967],[930280688,2893126621],[2538291037,1864991271],[1396519486,3483585429],[2259762795,2755908243],[203033540,1317203605],[2952339731,3226556215],[772070625,1580790195],[752409848,1371277769],[140352113,1615541593],[2454960713,1652307445],[374956464,757101385],[2655942646,1139524113],[170889627,3775341717],[2252699982,1217766181],[1401676463,753782105],[2602463030,2489811481],[2137605696,3255114169],[247030592,2253071345],[1237682283,3724734553],[1327530915,1904680421],[811467280,364951257],[1284535934,2205988829],[47152423,1846454777],[2673900401,3008549815],[1350143751,3030490607],[181272563,2527648307],[414761433,2458549757],[388116393,1175762057],[1782076366,2495383495],[2398045416,3728175617],[677120505,4183765707],[52488212,2563057337],[1087878388,2164188969],[1044862940,846099051],[288999578,807145717],[2263207458,3620904675],[284626041,33743353],[242593282,1557118903],[60196802,292249709],[843580065,3361667747],[1019768974,3266806835],[783094835,656868509],[3298333713,1603531523],[827095147,1050980375],[1948208864,1331990961],[680186453,1270475731],[2879063003,1753354437],[414066472,230908553],[398409634,2712173579],[427029243,800897373],[812696113,455367819],[2405661798,3754987693],[622437440,1465756577],[1928039351,3696924819],[1256524527,2064767435],[524110842,3787522479],[3385904985,3930287619],[450836139,1535947449],[74282156,1687393475],[1276506100,4084847345],[2114194884,1150573791],[2697309571,4202152841],[1895268894,3213331651],[216086319,3324412387],[197637339,3296720767],[782931466,2406685919],[571279907,74440035],[190456678,757168437],[502017641,1228082233],[1564026985,2470459127],[376002077,3280447719],[417305130,410389305],[42890852,1307257153],[58890732,763196153],[66542985,860690979],[2594001132,4089352753],[109858175,3179692683],[2539291174,4057600749],[2165050639,1896809707],[959825194,539842965],[1435088211,2378118147],[1635597682,1144853585],[235793443,2664571737],[1373589886,755002537],[185215971,3990480047],[2580952041,181334925],[1262105745,3422389795],[2277230092,3328663813],[2325397092,1472623653],[569350269,3170035301],[212829403,2955825013],[752770539,2303480691],[106059066,1680222757],[713251090,3727420975],[1922942622,1776822609],[917832410,1855445481],[477621188,447327851],[1758800251,572668243],[1974231676,2369842181],[431739303,4228877519],[304519709,2961952615],[695279242,2963856407],[204492148,1039290369],[588695629,1907987867],[182794073,4143408639],[4551610,3196319861],[1785611877,297494809],[590468340,3641578925],[376767729,2824234281],[374137830,551884167],[107848660,3071786873],[14641220,3993014817],[19186451,1417853467],[981933218,1944123225],[1840095906,154974579],[355084632,2311499937],[3346830945,3456073845],[207125852,2036727493],[1424198335,496674455],[1628062703,160109417],[1492999437,3852819239],[877524523,2588140923],[1090357981,3087546591],[2416356879,1851825959],[346951755,1700999981],[143987494,1170163631],[282603272,2389985611],[3582890698,876928211],[418043188,3174083277],[860397431,229462187],[281501088,1646782729],[1487436473,1030019831],[1111225217,471386653],[1098422708,3909201577],[1278938989,2666461081],[2206555787,729133713],[1845739518,4017211645],[2153469167,1332697473],[4832459,1324508629],[49132310,2639793997],[49766937,3272905611],[682199070,1780627869],[118276327,2779596269],[162768490,2782124117],[1310769719,1241228275],[578672068,852589435],[1338603717,2419354387],[821943512,1009771591],[1552069652,3153428565],[333052271,397724143],[17150076,1538012781],[149045040,2483371755],[2309328588,4112513021],[1455488068,2678192115],[4230871569,1497767301],[1741350805,3345344167],[571718724,1707914441],[261867000,1103582437],[1193159675,4103555991],[183605136,4066874799],[2331631112,666798323],[2862531020,3698325163],[320303172,4113340917],[201926613,3573881709],[322473490,1079819585],[1025696446,4137485627],[372185405,1466281645],[1209670617,3164767877],[2021656691,2622502933],[14404479,991437859],[1909927887,3159689481],[374229380,4197532917],[895510962,1565999487],[771676693,3130260527],[1201890169,444785991],[1423027773,2068188269],[430905248,3802267125],[1918034030,4098876103],[413088930,4003196953],[147958975,2047447841],[313747995,3818925825],[15702811,4236868525],[92057416,234706775],[1887682598,2471767501],[2178190429,593598857],[68619504,1223225741],[481200096,769685371],[25299276,2117417841],[699447208,1374305017],[135727790,4191814111],[346202886,1123966383],[119101518,2325924375],[32264269,3691383701],[393969653,3050095829],[984317784,301851495],[1424974452,3355250181],[2813999143,699464747],[813985455,3147215757],[17702813,1917392249],[933423269,469986799],[1060513241,878969587],[162981905,2524406977],[3379462357,3316372585],[1279420359,4206310797],[174619869,3550398677],[807274134,2539004913],[1415285283,4253038423],[1158523026,3433128691],[55030990,1410849227],[1753380275,2143319875],[1241531379,1029982713],[781865958,899176159],[2498795025,359664973],[2927606376,2798254761],[168951728,2843845059],[688324850,1249970005],[566694308,1856946379],[1542942853,836484251],[4613639,622791301],[709058060,1057420479],[920984979,3492767231],[961362427,456498509],[285205117,2412455483],[2453271748,1749398327],[91068552,1536072313],[2330880117,120732543],[473036314,2195625431],[1367562372,3289493703],[108115503,586097607],[794350850,11937263],[1843680332,58741867],[1873264607,1131660103],[2322922700,3028185535],[1241376491,1855416529],[153066045,916946925],[35786083,2986013777],[4183172090,300502305],[681632697,3146647893],[1059638941,2327807193],[43472036,3048827319],[1010937741,3900451139],[2052984113,454298785],[64016778,2877680141],[416193424,1359800339],[1036489108,2311119417],[801174608,2858932231],[21389181,1417436763],[1400114567,3801224623],[748936247,1055490857],[47328407,3050895001],[1309366683,402927027],[715433851,590429935],[823856445,3395178245],[380404735,2951484283],[2804536004,940283449],[2556963152,1911011205],[1305516146,120195421],[23534781,3283790079],[579210143,994844031],[291726208,2860936577],[1261516568,602379997],[844603530,3761578949],[433086870,1608534491],[429928311,2481490059],[1238831093,2464575253],[2286425149,4229207001],[383383685,1556209045],[1151589593,649842949],[1608288902,3098333709],[764143916,3914411597],[1703664224,2733923459],[225264413,3337477743],[45835332,1179555627],[494784292,162040055],[1271693140,3008728687],[1527124911,3417162159],[2578216635,3721797003],[848642864,797271841],[2259006158,3202330177],[337971470,4224002997],[783551299,2823333977],[427839501,2682925923],[282571149,1331988369],[60425466,2809293069],[2222482772,3265923357],[2129612934,3784191801],[1974689490,3459814617],[324758939,2832547121],[3154426487,3782416659],[942513897,2404159693],[1691036064,1184698839],[543392004,3809499287],[1577538569,1416361063],[1611716154,3509109951],[300369754,2084947719],[175990033,1691998285],[647657699,1120267131],[1614852680,696368945],[343117475,3560767375],[902830733,598335997],[5228259,793047837],[506476889,2354960271],[294848991,1363044749],[96995381,719765831],[529356748,1094173547],[3295514811,2627956641],[275091094,374376107],[15599051,759688419],[326633808,1172093793],[1115393162,4156914843],[975382693,2615808339],[14156766,4228171905],[580280500,3724658013],[504445172,3989435943],[1833493224,2367807165],[1321634644,757856999],[1171942272,2947874737],[455826626,2495998877],[875104134,1800865905],[455888981,3227479339],[736857473,1995334657],[28375366,1212046663],[633561166,270067919],[609251901,4172907939],[2071030543,3151353187],[1963426578,1710863787],[316639444,1327122465],[921347729,1224640651],[362491410,1231483207],[1378330121,1514192953],[1696897179,790841565],[458907241,3741377843],[1434587234,4010279775],[99703813,3735068177],[1016102119,514646311],[3712159973,2576796017],[36399454,445448601],[2639388234,1673836381],[699383089,108921899],[1844340042,2542314875],[505423447,515602061],[1313821308,857982667],[753307440,2437345475],[2321553192,3334276705],[369383775,4245228639],[1232044164,2932485661],[440212764,984154881],[1102797332,1515588325],[334929909,1703891529],[2778973246,759043439],[810659767,2665535799],[352835849,177713689],[140083530,328608277],[3047245701,116997339],[651986950,2551717099],[1188242669,82748281],[1129522388,453478777],[1919450537,3204242743],[177912366,1696743145],[2784049896,1047771195],[285263380,1335601607],[411561399,2928645309],[9211874,1213682785],[3008115986,749592145],[379892196,684224973],[1642728028,3362207987],[2528807462,989835817],[108894548,3360338667],[492157923,2543273125],[3031708920,2012416491],[2931940510,1697040873],[2361217003,2967029913],[629741595,212132515],[299820679,606376137],[695162402,1940046331],[84069974,1677647791],[295509510,955089981],[88166397,1199608059],[155427372,972436515],[360372147,3808905303],[2064145680,3743120925],[2589947240,2902447429],[1823761939,799504307],[1427253543,3127106433],[1695246941,1744959113],[1093286330,1652873293],[2107316332,501627065],[104937752,1942350737],[155549867,3462259493],[196361390,3874348425],[286321954,1640140001],[952737147,4183233007],[358537112,3420000261],[1302852246,2628871767],[330375787,2466843959],[1489338644,1057801881],[136435415,1880382903],[1149351882,2345860551],[2553141196,3080384655],[1834934653,1150597625],[598527736,2811245597],[1337170415,2084656005],[369719614,2436583521],[140890,768137061],[415741696,2239149917],[779845138,3161681063],[43378911,1104500047],[273306705,1597601363],[93033339,3424099517],[1050841761,2562719621],[1304865059,1880687617],[1001271110,1012304065],[49398620,499090735],[198630783,3825809739],[1470281496,1968447713],[758872324,76079145],[12362964,3110610075],[188975620,1735503655],[1450083555,279942961],[1158976363,3511870619],[2249720559,12410391],[1123887058,1720268819],[399199221,2946258647],[872713858,3683371457],[124295605,1506190391],[349353353,2823273313],[99954480,1956167215],[577611825,1811421165],[239845422,2475138731],[296436969,2247474323],[608993908,3782844701],[397427081,202340809],[761150254,892831141],[826534085,596335963],[2709046926,2807245773],[498800114,2567015817],[824622755,1233279961],[478652106,1388720409],[74492322,2669945127],[2467031513,1706680357],[995516902,3681241181],[2587465663,3097823471],[382967294,1174443197],[81860064,367348181],[574988511,3622063863],[233542552,2344360053],[148968140,415140541],[2682331887,3856199749],[2204313418,1124861189],[2881252769,933470379],[442567872,1567705553],[671506258,475499913],[386522681,3471078741],[580586067,775104303],[202351366,3406204139],[1121838704,4130158891],[2164065022,205213457],[48262527,83317293],[3963871414,1978110413],[2235549536,1397000587],[61184994,1778204075],[288603801,2574420849],[52963969,2034377003],[142275983,3426459451],[1035917145,1958076615],[391011870,475612575],[109265452,709109889],[322294576,622092107],[3879520496,265020043],[405413349,503294475],[89930640,3228902439],[782757406,3476576913],[1962292801,3818127791],[1128144624,3361836819],[83008917,2023400547],[2053402115,1056782587],[942825834,3591799767],[472789367,1655638975],[1002405040,291277835],[34116535,1189503155],[2323173190,2917714553],[2830661891,4270164435],[71556198,4164461843],[1777067624,1339489013],[132409028,2794513801],[8200290,2662046605],[67032260,1030650107],[413835758,3246483801],[115357589,4113920491],[1469378408,381009397],[61810595,3568676045],[503966260,3052883715],[54853928,1412684247],[231647802,1609169613],[1195010052,1572441627],[141204275,243016267],[2992470967,148251903],[203202936,1395510839],[187954283,2666213521],[2604910432,4142099905],[203054489,2587162585],[691554571,2610480197],[4274452,2155334283],[154508350,1842075635],[1261170497,407241841],[844052404,1652128097],[1476605029,3806284325],[343545061,1792651919],[372024059,2772573643],[944003208,4091898597],[1911828619,1859057663],[1834959894,3957281791],[68339148,103042431],[488692337,699553945],[349249501,1091707439],[681653514,8695581],[1175184469,2957816717],[1058798429,2512476157],[902336356,3724016531],[225511235,2260842499],[1603756356,3680838819],[20739618,3511484257],[2522364649,862717493],[499409728,2833450967],[1186103117,1716282717],[100671748,1736999301],[1219637059,4018710833],[612727815,3230904961],[2101599307,1809309553],[125613782,2608540307],[45063133,847979873],[299735623,2721358889],[2539694890,212171075],[118617160,420994825],[317770337,344315919],[414599637,3437823435],[472821623,2506201537],[75749873,2662346497],[428137916,3319242823],[2188598987,1360826383],[360763030,2690813861],[787314277,3894935869],[571999885,959548885],[336626581,3578340683],[731605689,2418405723],[2033524836,3044956419],[818740542,3285359193],[3763656505,4116879507],[111175938,3170341563],[1025905181,922617765],[65231249,156464061],[435595795,448190363],[1703402953,3529967957],[915302044,2951013569],[1882991407,2404491449],[122726457,1451250633],[736355330,2375286157],[2629464464,485101567],[1421522577,3933688353],[1654509603,603518301],[1192115081,3740518637],[8724864,2665250979],[1467076881,2161570731],[234009557,886007907],[1779334256,3665973935],[506723740,894782015],[1529201024,2159082091],[69313785,3891723755],[442190296,1482396957],[913207209,3920782065],[2127736488,825109581],[381051070,472603841],[764565329,2067277739],[1510945175,1652332969],[2680783243,153754997],[687743530,3316453147],[327158128,1078239791],[2427945177,3388404243],[469777076,3373824733],[1054869488,820192761],[2373634866,49061079],[58407147,3884531983],[85895545,1220561453],[854088584,2447941923],[60140601,3001852395],[543651553,1574498213],[1760723815,1635210583],[1660263774,3877503963],[2938778943,3536288295],[2081409006,1358074245],[158675479,1878263183],[661296638,3719952439],[1059632284,3194718615],[288462361,3572957165],[204152712,3708741847],[50239638,1133417643],[354256158,3541296119],[165752171,2215423183],[24091384,2191973321],[1682478858,647166827],[658968981,2715735759],[456384883,504833717],[1157496799,37927765],[591883803,3516938735],[956201537,3953491813],[326089287,3145176423],[455153249,1899319789],[2748710544,2837108511],[35002173,3403383897],[2259658140,444062529],[374828271,3780518993],[144883203,1554950847],[3246284822,2040547313],[1426935126,545818029],[343219205,4184131641],[591179052,2896026147],[88948883,1795401505],[4103854527,444674743],[1927915841,1121774465],[2240528,3567552487],[1893260194,988428931],[663397973,3951545367],[751237209,2013883641],[1985628271,3406020989],[418382150,3675350023],[2069325993,368524919],[437267374,3977306821],[1546039815,654137715],[1466455183,1142836949],[1102007532,3908832573],[173726149,3617957659],[520772164,1344960241],[332596773,1317747047],[2579035746,2675811189],[240411791,1921046325],[569437654,3855852999],[893688942,2105862983],[2335245104,729631401],[99802179,1139022699],[152595442,3609913663],[792949101,1540575159],[901737043,1712746949],[1131571324,3268827225],[409397836,3653331377],[1172287121,2691460753],[22678349,2741308321],[407378189,538034687],[416457889,326867633],[3279462600,2028694395],[1402305795,342935111],[508622240,3362816107],[1373120480,1361803003],[1170039636,1095097149],[2583311163,712043931],[411597846,1838507171],[46518860,1704455317],[913593848,2838770137],[1871272374,65419585],[734371525,1213485245],[1248340848,701751539],[1616060518,3543068939],[2108995315,308439795],[1409117317,3553911747],[1367173444,2068316751],[982381546,3490939379],[783753696,2056593799],[3828489035,1941442301],[1378663870,4191207805],[266730182,2179793777],[6201370,119776025],[2460798586,3847056047],[2194770651,2085375711],[1282654584,1884501],[495510850,1753736995],[1504616192,4229060803],[2156769866,1908945847],[101276859,436494111],[656817877,1546480719],[218447,3466869829],[1510716872,4104416121],[1573401029,1550962699],[586065419,2040354175],[2229077427,1912344723],[1282721207,2267288449],[31385060,2726246833],[650861332,3668663225],[925929277,2509585451],[1437130717,4261409225],[2186260353,277055993],[3885981380,115693931],[194120623,2111215611],[322801827,3393929379],[1823140562,4082184313],[2698263817,3119618051],[847998019,2475683397],[69358838,659109089],[27799977,401083253],[603681168,2508190897],[2068479714,2668728365],[818137630,3973394773],[870003097,235081513],[600119227,2417273993],[275772445,161023861],[1680010976,1702862451],[125535593,3433257251],[282363160,2431882943],[462061676,738197229],[32816277,45436615],[3424315807,903079203],[518639892,1093060969],[2000776389,1497710703],[1069070846,3094512595],[2246878576,2413245857],[781536423,798151965],[1731794329,1251917663],[341471610,1772485425],[1004567392,2303247781],[71710348,2828474177],[1530493,4157742601],[166092022,1246943741],[24494661,3829934787],[233247174,1678634559],[1202097706,2931142013],[2402274263,2909633127],[3561567,3796219503],[773096228,4254538571],[3319856280,3209448515],[101468832,2867517861],[956719399,1261482443],[1372195927,2442415277],[482110965,2343683043],[959765670,534560089],[1387657567,1834370949],[1500091001,2070896061],[1222537868,345188991],[573653812,3366169871],[354038247,3667083867],[908403473,3423019999],[896697309,2440817013],[3411712559,3625836203],[2955984226,2778672481],[2141444354,2612483839],[661302375,1369430305],[1287184608,3107190497],[99734215,897436451],[596357494,317099461],[302462088,1454861553],[1757830156,2605994279],[131816701,3502671541],[392891179,1225955633],[3004746383,1440077587],[328740241,760369625],[121526697,464298263],[602278073,153686815],[643100,112203071],[175195928,3450190651],[531059951,1013535879],[3511581958,2160904109],[633690477,1603930773],[795532427,1165151349],[929960378,2430087097],[626197374,2316615927],[4082305230,4201504509],[727869366,107923443],[531475401,3085861547],[1062501599,2487990571],[559446680,3258833609],[189014131,851960275],[1166906825,1371421303],[901453981,3177962325],[3417582065,238814449],[481603969,4015269237],[72492003,845230455],[346487757,2002625823],[248486804,3811425013],[439479497,3348264093],[408571359,1582869151],[443416625,2511145757],[2101955,4058160927],[1004705198,3318052975],[559026645,2573375965],[2793753458,1869382757],[2543815280,3251205223],[1442145008,978806251],[83261232,3967484653],[2735797214,1908744085],[2765324992,2818022153],[231601551,1572062529],[2112734299,643433113],[3108250101,3758944485],[2057000805,1431394245],[1883108469,312713793],[225599438,3068717159],[1896231828,1349293137],[2439362678,1714787735],[210359080,1768497695],[2662288189,1523828571],[78713909,4139705329],[166882566,3065297487],[306541072,1415528023],[1908206302,310113061],[1167698778,2132202315],[296717624,2310489707],[3137916196,2915316275],[626369454,3835057751],[204443131,3096675525],[143823493,1502255131],[2317592701,3405408557],[1614814635,2478529011],[88818760,2905612725],[227211831,4025681303],[979817717,110828797],[3950525707,3690081],[818295202,1800669713],[1152991017,898688595],[1780038570,3617244883],[334136795,3387545461],[563264586,2284396047],[504399273,1306766331],[433057458,3330325173],[121421724,3139427821],[16288096,3975453105],[68062609,1955089931],[781363406,191392989],[2919062765,805776769],[380679969,3652386533],[2190415180,957238673],[1607224413,1795492569],[2078254706,3899813091],[4041240838,603332163],[635887363,930068159],[728805566,1656769159],[926781904,1532012069],[83252569,1900529367],[319111639,3036770543],[803005528,4031828397],[639149753,2743671381],[892510254,2074468821],[2341055707,2764105571],[24418086,1041862203],[1567719049,268210775],[735495897,3483835925],[1351429404,232166595],[1339737230,4141661377],[1141845056,3550843467],[215212162,2087947883],[190866247,3357969623],[228228274,2261282121],[1534853567,3114101863],[2094062141,3013910615],[480200882,634884387],[618406309,2867011653],[218507042,1998291197],[33929913,3538076627],[119343957,1921855033],[1757998532,3823504029],[76450606,264301475],[1214441933,2956502105],[190446694,2861606261],[240942991,1861241859],[986295533,2220841367],[2446260035,468919159],[2415820906,351046343],[1825688619,953169073],[411182932,3444900017],[942835149,241611195],[163825187,1706509069],[322919838,899791157],[980300458,780831707],[181512895,2890822229],[12720023,2261999383],[19592534,2295604831],[741500114,1427001441],[1868799305,726653701],[2032698002,1371479533],[680631571,3016734973],[415886208,40894863],[392378756,1878038239],[444229819,2607008003],[1329778511,2529510209],[1875680620,2111048435],[1970650626,2468762445],[178802516,2851449733],[987749828,3697395911],[2977870785,2812720767],[2969820900,2582032195],[1972281109,2905077611],[349381554,2460103511],[299527253,1956408007],[219345982,4280594683],[2975489156,3249101925],[1062785253,1724461587],[2296844918,3714363457],[1592014499,2712597421],[2243291109,1361019641],[2222012581,1805188337],[1505118621,854536079],[222032518,2944408757],[2060120474,651962647],[1996443267,1606441247],[3384540138,4178970927],[2499411316,3524809505],[2717276096,2558450177],[285391513,4154377777],[796905309,2807761373],[996491429,952456333],[2852719384,3453541821],[8710392,2875568221],[604318602,2234592463],[71568331,733139695],[796771752,4267921559],[1411599435,58553725],[283656574,4166281301],[660728273,195472921],[1601365089,3987556077],[98991991,3224593655],[203006371,2471775965],[193348470,2015566887],[116875801,1281611163],[108251760,3015569295],[255104327,2777393549],[394920502,2316609833],[2116479243,4076502319],[544433809,1947566061],[1665200477,603152453],[819344902,1925875127],[2345580194,1723839155],[2592907034,611555521],[565023853,903448217],[797375175,1561652645],[849188328,4163169173],[226351019,500739649],[133144046,1539380371],[305093466,2372995629],[1040357282,1094674993],[1846878444,3882997425],[2523727173,3988306905],[317951348,1244923159],[1291361140,1087555661],[1907547235,1687887079],[1013621024,24597795],[488220312,2008156305],[2891412018,3540222351],[701848462,2266579499],[545754284,254220511],[736720959,3740623707],[1456212809,169971909],[1420318582,2343036695],[206435207,745620463],[2421900821,1465889047],[2586362465,3694260021],[1204895771,2018463893],[2310113097,3356177079],[784653267,1056923705],[1159714172,2731041963],[472983851,4153916607],[691837151,1169601415],[214295445,4053635115],[1913888191,2647175375],[175360329,138450345],[2007487295,692350923],[100972728,3606834387],[1348095167,1689296809],[523728421,1820263365],[757526194,3437058641],[1643317390,2433000019],[1220151326,3524941099],[124867570,3704605385],[26776379,265413241],[1340024813,2600326481],[654096640,127045655],[1370252362,1089530763],[1542986085,2369670529],[97226362,3565149689],[1174912212,1886884993],[78020790,358232715],[25602915,56633685],[78272447,415285189],[1376890310,3246761225],[449266758,655457637],[3513713563,1021452755],[123932731,980174549],[669559410,1548487409],[1616570856,3345626215],[618686498,3910739373],[1015677745,3723539303],[1321526136,1229259493],[3008876742,3700148165],[2600785575,2539728025],[117953703,4062753981],[1370917421,394414163],[767041853,2804016057],[593236622,4040316187],[28678270,1642690315],[3479534409,2409484571],[2955982675,3218092355],[3451191939,1071084649],[702784550,3427105169],[493442828,816604085],[14530742,4049545201],[32184328,795685175],[844512659,1544961335],[1353540859,2033115611],[2022463418,2313618737],[1769451529,3832632287],[86810643,2817992987],[2039505801,3602911521],[3163747048,2262620323],[468997628,1715424631],[381336762,2876450919],[168239472,2275256555],[186819031,2601075569],[178333762,1318498623],[2409686767,4132275911],[687748793,1255930927],[1562570478,3080025759],[228918158,3279346777],[387295195,3128309205],[857218667,1265244381],[297628179,2447821841],[1984311681,3170547241],[1392486243,2047146499],[975501644,4132947607],[28391361,2759408451],[2902666006,3523626161],[496986099,2517773007],[3711297550,1200297845],[2226255312,3841063935],[663667567,660116739],[336087872,3819550145],[2165643435,1336460457],[999248097,3066682375],[686697785,2191234265],[247228042,392611115],[1610276183,3660044957],[966687378,2390696643],[629134347,2418206013],[515103829,1949356205],[534804622,2463896259],[609753423,169198971],[1797903933,1379163211],[251219027,643760805],[1642943664,1182593229],[391474489,1946629391],[78356988,389800113],[3456648,1450787847],[780023407,2178826763],[229597203,2701709193],[617068894,3008587389],[762007775,2792964643],[263201607,3862927927],[2180423085,1145876037],[16593936,294073155],[2640632239,3289873619],[2811318304,952062355],[3363916878,2654863985],[2091749453,511089193],[2307423426,806414867],[1580481241,1211710409],[1067164374,3187933411],[1850179416,266138075],[424696849,729329297],[1339663832,1869655375],[1519276039,2201311991],[1740983210,2405387253],[265352184,1850989515],[16321323,733166415],[2136207301,4267772281],[1520015090,966986773],[103778373,2002986417],[27260506,3882178965],[3206084476,4234025719],[680197584,3651238037],[2125294604,379614681],[141462108,1553535107],[640679984,1096142323],[2384004754,2542581539],[2683703980,2252089267],[1708181888,1023710891],[2452662491,3392192697],[236389814,3673504533],[61738073,2743229119],[949135854,3235330367],[382794838,2832569429],[2052525529,4241157049],[338207177,2927279053],[78212014,1270678367],[592167060,4256878273],[766406983,4106831955],[2747697755,2844633095],[693065137,251052545],[224848789,2432759131],[26381836,97454287],[1548862488,3438812735],[176735718,1273172409],[245680284,3289349799],[3246900340,2617010375],[12209048,3532780421],[434949596,1754365121],[525617146,4255135091],[188417043,2708012277],[34237184,3069768373],[3552307174,4180911431],[1589748526,2801391321],[2856006359,2704704453],[1702177442,1760493325],[475619775,1632408615],[1273217841,1734266331],[442587451,1284587323],[1666866592,3973557847],[416605055,1603182501],[2097969670,3270152155],[1222931381,1318755675],[2728441318,881127705],[762303723,3509861327],[216012858,1338955115],[848432718,1068168885],[315550118,2029738717],[1563970435,435007997],[1451322065,1640011209],[1085292837,1457989555],[1760589623,1694645917],[276970283,262284427],[2073794438,1895933913],[249063259,3417079981],[171194287,3459137787],[1127641885,41126393],[1408616,4160225723],[285112465,3743292293],[1246857974,3993482361],[106899593,2366113171],[949446180,63825791],[1772837857,1897050533],[20326552,3526046807],[765774590,1587691723],[910601989,3985150465],[94481912,3641020687],[1139457902,3278685711],[838755462,1920160737],[2249898265,3149741389],[87516946,30081713],[148958926,3493379237],[315596827,832334351],[2306401100,612627535],[1806331944,1325189821],[6816292,2599292533],[565946309,680874271],[2386234335,2511521291],[434250392,3021869175],[997297860,2078210615],[377757311,3649517883],[525997486,2335646429],[2319327018,492644887],[2164720110,1791807797],[71632093,1757216879],[454640379,3476345891],[3558158333,2634578869],[1773994487,381828331],[1315716134,3410527825],[99716720,2379093991],[70791804,4242459761],[2328167461,2366684187],[1758291968,1415802253],[2959070390,2088497317],[102916646,4052300605],[2245321011,3178795141],[292290862,1614086483],[1485206615,3042666469],[190938402,2160842883],[2870981993,3920435533],[233473072,2514785089],[537365290,1501235047],[48452925,214347513],[345244260,1204596039],[2606816958,138823827],[3108977405,137385933],[449163131,3656928211],[29319839,2258301061],[1526239757,3678205303],[1884739504,1033130597],[3157730031,881130455],[438300354,979714959],[12240354,494876039],[1616526464,859153765],[1837884113,1189793827],[172387511,3897353035],[1460463074,1298829221],[1427072976,2026691583],[201854373,3285566949],[143919692,658014469],[2422380624,1004673305],[1261070159,439208647],[820979420,2685190129],[649548667,3176168703],[681499962,174898481],[419214245,428151597],[59154833,16775915],[2056031866,1661279901],[3513338875,282459233],[557714926,214523609],[1202077521,2808983905],[2213869472,2188911055],[831181258,1773509997],[2183757743,3257055225],[2769546,2127011861],[91769501,1057634131],[1316886811,273025261],[690570939,3191889179],[1052024764,3020449299],[1496959138,276593425],[1237496266,1960535795],[551340939,3266345349],[69843428,2315511483],[1538742015,814210135],[128394282,3144433473],[2651122074,3817163697],[606749964,2799584001],[1405825109,4117667005],[443080749,2876423271],[253197324,3431879155],[2665423688,2186870227],[1276681509,851518755],[2894838506,2974280961],[155285660,3025180495],[1082331809,4267088527],[170602610,2490955607],[1302551016,539977419],[1669147528,3155374697],[3662678531,1767536479],[748545490,2253246383],[677618553,3288741715],[879464338,4285165527],[202280526,493645957],[960450796,900370763],[110486964,2553427597],[337381696,2811242511],[259666052,981126369],[2202316516,4130762487],[2019630745,1318723649],[2387085882,3556052951],[723732386,3538455337],[277145662,3071880145],[39436933,1824153863],[1262848983,1901037387],[918550447,4223595813],[42209096,1689118825],[317034379,39605753],[36974145,1472378405],[1936796789,1327407061],[174211662,3084005595],[40912483,4010121055],[891491220,1094325333],[480874117,1584970403],[217671490,3075447435],[53456836,3074591559],[279344769,1725220453],[1561352728,4029887729],[2799722584,3053874605],[522545426,2896331261],[1142623085,1614225997],[181247269,3909096155],[1091694700,4142859359],[961691658,2577385971],[842707848,1315487463],[28504196,1833252383],[2058870081,1742492979],[157136742,315528737],[463438363,2998511371],[934248936,2045793543],[389801458,3866170067],[1418214088,1791254239],[3379634977,276581287],[74946960,1104539385],[2260934629,2836385441],[735609703,3834223849],[2212778087,44464573],[2980765267,3819529625],[253077147,3857908995],[1542605832,3335134209],[1174844446,2766297059],[850568207,666656773],[2205878289,186511973],[414232612,3322552337],[3039106915,3673962617],[1761423873,302530751],[185860487,789180687],[2194512667,631545003],[362564953,1712469487],[613313038,4210645467],[2265606302,3378926983],[673188796,2681031091],[423776884,245860981],[153604049,1803072253],[760263961,750335235],[400895370,3600965141],[330254919,4154013867],[109082169,2816941139],[17711324,1924577091],[231993563,3930816835],[1714074701,3151404133],[71563912,1985653043],[403081845,3192099005],[1149101922,2694274101],[480161823,2428194267],[31877265,3852505325],[523151171,3512053387],[1818867528,894829943],[16249301,2992201951],[235410909,2348283637],[276630792,1509968487],[917962084,1105164871],[2247026626,2601718089],[61722327,1992064859],[888763273,3948323855],[1102558848,547216201],[1543753248,4018314695],[2006656101,1003379949],[226044567,766885195],[8099650,1621143707],[2114275675,602301995],[1030081949,2843607231],[446811441,4062320171],[461119128,1444071687],[506697011,532054205],[2745224584,1293148361],[426271817,3669547333],[2065124590,2359786277],[3982121339,2642735333],[1126795017,4004970473],[525772900,2180537051],[1516348608,1841135115],[1787253110,3535455415],[3003253413,547791161],[19773042,4031542893],[1213202746,2724749309],[137867962,3376660123],[1239053500,482277487],[1906069084,1754025943],[132670060,2948032895],[2765426974,40713045],[642290620,1801009441],[369502305,3352122837],[898425782,3158331709],[424170957,3786926685],[2777599204,3808873059],[1774384699,1462431893],[1389992578,638518323],[949215923,2022337103],[893278407,362503883],[1133204927,1454866091],[2092766933,4278984317],[1109866678,4011750281],[184670540,1679512147],[2445347858,1736013187],[46988486,3249308789],[1767981739,470543591],[36737208,2522847007],[1523328408,1214924247],[1506909351,3672852345],[1722161548,3850308331],[1188418230,4100851983],[2014186567,2562567569],[55723262,3032324781],[755850818,2259686497],[2955227674,1515413389],[3251253978,2112049345],[639146535,3332315055],[208736188,3902280587],[895845402,260128623],[284626564,4137871793],[2307937329,1216414475],[707924807,899104853],[1320989090,943496861],[2572000966,1978731833],[917219962,2549837321],[3928919871,1708924395],[870269819,821384495],[998372973,2228951193],[818287427,2012391687],[328996911,797200569],[1225644132,2931199761],[131706490,122532913],[859689721,805163969],[67702637,2461248183],[272761364,2399593383],[394039180,2734633701],[1610017350,504785461],[28732092,2352444811],[3649121732,3802048435],[2365887715,466988003],[2291168756,4183902981],[802842224,4176318181],[333917033,3861200475],[1399737762,1450916027],[819612110,2707907557],[2934615245,1390893607],[824262215,1029655795],[2985579811,690929489],[2345921954,1540158655],[1259612938,2680781399],[1186082776,1596698209],[942702223,1871775713],[1529797348,3401397815],[281875518,1213095099],[2339543630,528155507],[914230318,1005829211],[188891087,3863300389],[57071808,3474723807],[1799576147,1987076375],[1894666089,966004161],[97384634,3397774343],[292527113,3798680307],[3083451519,1490441371],[1552264061,383976285],[209774654,1693493113],[2662084305,4288208657],[3617241307,600516913],[3027336069,3689639733],[3258594683,481387755],[3028893510,932573675],[1562665103,658798915],[1668283580,3040188265],[328252945,30576431],[1474418808,1615839771],[152637621,1215623847],[2701017891,3099687371],[746903144,3227400833],[1692188790,3915435013],[1736259456,993031721],[58473296,58273599],[65297239,1194888383],[2377224359,2715909243],[1575301260,746601621],[79222656,3644714045],[506290936,1959098435],[733075623,452430277],[105836394,504599223],[186225877,3861395223],[1558422297,1354509051],[972865797,293951073],[248895504,1145864925],[34233989,1808272441],[308496295,679895331],[3081894,1175245351],[500014739,1771532645],[1201824922,467461175],[1088792354,1111697703],[143107039,344774387],[313721865,3275317743],[697638465,3723849375],[1663122327,386836707],[923388181,3907372729],[817875514,591747123],[1062704423,3604303525],[1096177939,918255611],[2094997609,2603830141],[399029018,1668242221],[1081691896,1069579229],[633142551,2218438905],[92335370,268322239],[2017755296,2515313695],[1453633435,1997618429],[2088102900,2623690329],[328937276,1004528779],[235267108,363942617],[2042458987,1828453115],[2249380240,4233563623],[2609202298,131035203],[540278103,3784767359],[604486655,3102519737],[269928964,1975855251],[449721200,1074165835],[1688571380,1149662591],[2128004754,1334835001],[1015590156,1081574383],[8653495,2276378285],[212126917,3543030763],[1004544507,2355645195],[384257697,3249407313],[139069969,4221345401],[1182973640,3758216583],[70513,1038505971],[1808928473,3393679959],[1297221042,498129857],[1136611279,4101776361],[379984638,3973573021],[365005153,140568959],[2945128854,1512217029],[2931941498,881709217],[1970150828,1503150087],[2583979911,3403000215],[1090109136,1084970313],[287127842,2555884413],[959558139,3190515471],[3040436909,731099665],[1805335168,3618056767],[1643717407,91512167],[1255103971,402114985],[836859299,3404277853],[1631826869,83408347],[469397247,596360847],[341773505,738494491],[193958208,2818619825],[31923429,841461363],[450270651,3777884817],[438956726,1776752441],[135332604,27895059],[97550717,3862315309],[74100947,4053895925],[1000979305,3020110435],[765651438,3230427739],[1864414635,3447628919],[1051210295,518492605],[119336414,312231103],[206718051,546372879],[1513535610,2756264613],[985637465,2722135343],[1257174792,1765217709],[803984951,383387203],[399771944,2190335011],[34311718,3782547949],[184242889,3311680597],[2811956448,1233738367],[677592994,624401231],[2004595630,2301788995],[1880854388,2224469611],[28302293,1661296297],[246844490,457068349],[212247725,2689312513],[1832383535,2418304587],[871631238,2939401355],[2035711449,362257761],[643619332,1017522125],[781137402,715940045],[342462455,2999275111],[906661144,3930805877],[787790312,2818903963],[1142728335,2968853825],[2615918444,1468258243],[1451829916,2338119155],[925937994,2578789721],[2259543031,2584244059],[272586661,2328281609],[99351765,1481010165],[557796503,1063961293],[958308260,959009319],[2418406353,3472083465],[475229805,3691921031],[463077895,660916557],[20797045,3045632039],[20418472,1423720937],[237040970,1497261745],[523346268,114575029],[86199,1005351609],[419112665,632347975],[1138864193,806621631],[2178596402,71203837],[992170340,1317100427],[3970261797,961652305],[141130895,3045283405],[1773892549,3559194581],[688285179,3253732431],[1943507559,2924441573],[1822175383,3989380807],[396746071,2867240051],[420778124,365079271],[1309936724,1381338501],[2984976177,194932337],[1194357202,1862387777],[94555373,1015476751],[783350804,3983072887],[1836965457,2134072169],[127720,1659117141],[1982360934,1031538591],[2836849289,360100871],[29976756,2712465369],[1618476882,2877537067],[1099152543,4043020419],[747726083,2465861347],[1966325552,2513197347],[377228113,2204967157],[2331584075,2969254571],[882120335,1233231437],[1943840084,2791682899],[2662948740,1848409521],[2598377723,1814347351],[364469432,801707493],[1029919388,976179135],[410012235,2716361743],[257644267,1500015221],[948831991,4039651331],[575399315,2030676061],[8720397,1447207185],[1442033339,3887140111],[1650967017,147130909],[15022867,102145733],[98083285,4231395989],[227761909,1007482913],[3683859628,2637508379],[2438700633,3167693615],[174815650,284398969],[534293336,480822919],[628384016,2514125467],[402477513,766686947],[743650856,1658444827],[2217530051,2870288663],[1002825177,2882613261],[2139897606,2298191049],[422811183,1464799889],[706272388,3663819275],[315548580,1390660437],[1656651301,3119077925],[90574417,4196872227],[206464233,3240864489],[2931398486,4017074119],[977558431,2897538879],[2073421443,197773995],[1470495559,1613249865],[1429022710,2086837585],[233573084,580318167],[235808029,2471414791],[11876346,31915683],[451854526,785038637],[1560035198,2087153557],[48530433,4287642913],[1389469887,3652129865],[1976287798,1827681009],[309714577,1713723957],[144011108,2803942505],[1553977386,1238792103],[1518522281,1735307249],[70538732,2782764913],[738794216,2884819987],[1435559346,3748581537],[1047053007,1668290421],[1162554470,1641282027],[219629660,573407895],[1239965760,3079106043],[29964014,3352711847],[1820018974,3644486707],[1202004465,1332337785],[110024633,2103920677],[367592455,1912959487],[3283689053,1748164527],[1066276630,2883428509],[1163672253,1018123833],[382383308,2462301261],[2299135693,2601284051],[2519755942,230029769],[993523661,3084381565],[110711742,2808595049],[1622186435,2216529565],[1237979316,2959989191],[2439879430,438587509],[257026309,2492676161],[2696719242,2055678375],[634704647,3708920445],[112589178,3221886555],[1833947568,1014382407],[195423859,2802900901],[1530472558,96908073],[3162897342,2282392943],[550025506,2889053629],[57344656,2018263465],[825112894,692656367],[369072191,3259603601],[1741808245,638448747],[2241965087,4143320873],[1122410609,3408325275],[632401491,739365847],[247927329,829006587],[1764691900,730740869],[1386329088,1565331135],[66886068,3656674497],[1143631437,2514992035],[1671570346,3038361359],[513596568,2862686137],[793831838,3502931235],[82630946,38162521],[1183467520,2669670067],[1010524831,2763446203],[1887082146,9334881],[395287367,3242385285],[827232459,1226787501],[441155907,3251672451],[1496268678,4127154837],[113810387,3245589907],[131378932,338084039],[1536769095,1820068855],[666051787,3208399317],[135213380,3828125089],[198938168,2659149433],[3667895079,2500713039],[26073017,2692047005],[550338589,1768755537],[550619977,3610886035],[99551072,2927350285],[385390853,2922412405],[1517907411,4102909467],[2049037497,2014292273],[750293845,2687301729],[757126521,3579161829],[454410330,230385501],[367913599,3744611687],[286846570,630720885],[3177665522,994832369],[1720039890,3112717641],[1568205969,4098167221],[463940207,1967692109],[1258237465,259507185],[2087522702,2532740173],[2947860758,302926251],[177911215,718733411],[795363196,457854409],[3497795438,3006704293],[113208742,355467025],[1361574589,159925141],[68475150,1611555099],[589741803,555578219],[2373508554,3979960245],[17336918,1432918451],[216588502,2737076073],[644642640,4223681743],[2504318310,1606770417],[499293458,2759139845],[232310415,3779271035],[72891140,3656036801],[1055713692,353525073],[441859259,1799120805],[2257119157,3439988843],[261844668,2842976169],[66158504,689981045],[2763496212,161044733],[1544276110,3652530695],[238092081,352203561],[682116409,3616095681],[792047321,3166680327],[405830045,3104611803],[1835343517,3047610037],[2718299303,1966528815],[831477469,3888734601],[89679193,1631103593],[1607111114,1562980087],[1786973155,916633745],[3785390756,3996589207],[1232709016,3185329829],[144970016,1139599593],[891028757,261626679],[328501130,4278474335],[529393517,154003153],[146661573,3526666765],[1766157238,3413241127],[1635539515,3602029007],[418313443,3573180775],[791159894,56206279],[2787169,3476927771],[1802999547,712075599],[1390522223,383407117],[1172239723,3648179943],[1242518319,1024727235],[314827083,1030800357],[231473786,2376083677],[446026874,4037312941],[1504799781,1534462687],[611181916,2658739019],[1691728728,2902181987],[2036093641,3726921047],[3473844566,2802787391],[1016312434,1879600193],[597546472,1585184627],[2062595650,2469825953],[1099320861,1954048609],[285186034,2622502601],[77352301,3616048585],[75551068,1209790417],[193496411,614749243],[606773261,3993961069],[1331492665,490262603],[237425992,3668839247],[1872385730,3762713515],[986469640,1243556625],[1666280232,4127407335],[570401497,947555413],[64236302,2671335423],[385134332,1173261875],[2805895116,3903204931],[98238161,792314769],[1681568340,2568969039],[610590510,1322393207],[2156373434,2043516451],[102857384,664163461],[2056158688,1780811363],[435814609,3686346071],[1156076624,4199201043],[485736510,2235585665],[880759274,3891476111],[95103850,2951187337],[929558094,2138454075],[513931549,2812312677],[1798531915,3242095767],[603740889,2943585249],[28732880,4244746653],[72264171,612389967],[1723354741,1686259399],[364838553,2840429271],[295868117,4243808391],[625573143,75291129],[78016850,1476110851],[591613791,2694578553],[2184584996,722452129],[1157839587,26765637],[712247657,302960713],[485597970,3637825041],[29653123,2294433857],[1485904574,455978863],[140468262,2435888373],[2052112744,1246770563],[2554833618,2561686957],[369744339,2263458783],[708760026,1543927879],[656601688,2147907527],[1325419435,3459188031],[70566513,391178727],[1029335835,3444932365],[1358848606,3639427343],[1239618786,3395679533],[1253918737,3238248683],[48285746,29164995],[130402949,2662420447],[3603016032,1829640183],[3981020800,473684897],[1306877967,685741329],[345008893,3069107251],[1545959503,3757780427],[2738772534,2806944559],[568229492,952164625],[38508263,3349601853],[124115659,3138493859],[2337064626,3995657985],[1094519791,991994453],[121129715,3700808335],[252342297,963712853],[30083146,3589318823],[184054572,4090815399],[1477200878,3479278935],[2088935697,1409277953],[660715650,564255423],[420087722,841453663],[578774739,2640107589],[326639706,2473459649],[785374615,970437739],[1040664325,1859861365],[1382145585,2204253615],[110582439,3890555633],[1538082062,94046623],[77327785,113057429],[115721413,3929760189],[60646480,1688888919],[856481209,2989791273],[944734801,1035360685],[16632669,4266586963],[732603044,505940611],[83971719,712511319],[633291524,2586552081],[1482755597,2165754509],[3810560153,2442669937],[954550602,2793128417],[1999169951,1575929905],[35990570,2404119543],[202450054,2885657363],[197755424,2830548821],[1154044895,3072082675],[1035365038,2724380027],[392942785,3997440155],[3088817009,4124073527],[1563801917,3544682919],[36611174,1235133181],[330066743,1145530779],[241737106,4119939155],[1226061473,2509306891],[3435866451,2051815509],[814488068,367546897],[1794917433,3931216901],[810005414,3623838851],[1799805321,3807398817],[257515655,4294480939],[1914769695,2340733519],[1154282075,4273312567],[611994915,1052193093],[1196951535,3477654753],[1023792092,3852092127],[836771153,2477571253],[1045454432,972425121],[1864206381,3359653593],[1133834720,4177827509],[12886471,1448113277],[1519556237,4018365473],[529322695,2881924861],[3029252822,3234132415],[2692505201,1508163339],[38067549,4177458063],[1344440614,2437356555],[3313461348,3717139243],[2098689935,1986889615],[287389744,1916762009],[2338444719,3838941951],[589944973,2889637155],[59901519,2995290981],[1704649985,2504221693],[561412158,1993697973],[87840989,632076791],[1018089901,961751401],[2788786426,2624281869],[188639312,2677401763],[1194503725,289537565],[776815245,2710289501],[1275671407,3557684979],[169527670,282890169],[511658897,2749759963],[795443087,3046164465],[331933978,2699903225],[1238444115,169143637],[851772590,3745508389],[579600971,2268895833],[2381475884,1530049285],[392443568,3302527657],[1166426546,483799515],[624639157,3224854037],[4146096992,2135927653],[550200788,2267337733],[1857688218,884269443],[1885438937,237495763],[729874560,4082002317],[941445487,3488857085],[823118220,3865232205],[906780395,1459152581],[2856384495,1503328995],[2813389565,2054048147],[1495784851,2836966779],[585024178,1488199339],[1641133094,1527834879],[512009909,90112561],[1198816191,3726075315],[816762780,2312506815],[225566939,1242828991],[13519589,1222783463],[26231465,3147828085],[270702816,2055795137],[285732247,430499583],[249506876,2659248821],[615698423,243805105],[1292628266,1890455059],[1106786285,1213021105],[3046161072,3458012101],[336414854,3728750699],[241174493,1006944019],[90857908,2078757997],[889681583,1631836507],[1896200895,2307456201],[24246647,3732083313],[250426614,991077267],[337356474,1795999071],[747050,1332054195],[3079691871,4179228261],[853923592,2728127813],[931036009,434228261],[309525439,2774708737],[334524836,1903341099],[233589563,4180260817],[979171659,326377107],[190056032,1516945459],[406310167,3948482429],[14393954,161332303],[2677994604,3077800461],[341946556,1994267177],[726688190,4080240157],[3132873351,87147077],[74784794,2193595821],[731889434,4274388829],[57079038,937825863],[268041523,1021074519],[171292705,2727797683],[1981270931,1187399977],[552735218,4126109491],[1883347989,564396743],[1496069096,3507371103],[1524311812,1747152035],[1073854886,1977555107],[1872681656,2020205433],[116839529,3677950761],[119548240,685756547],[879297145,767042001],[165428459,326442211],[231568603,1722520437],[271952222,2530491343],[1773918008,512956243],[220118443,4105435419],[197616725,3470516455],[55251164,1512791275],[1484123229,3469135545],[2058893572,2076985293],[1784085419,266323489],[1229473944,4293323525],[1009780070,4270491635],[900632769,2518157247],[1215768485,2367893645],[1222781570,1878914623],[460057353,706807495],[956702421,1450420745],[837632449,3964990411],[888025335,1148974317],[366138924,2921743479],[13852585,2359544825],[1732687999,1482355309],[273789319,3735880071],[1204981393,592003185],[452274326,4141422663],[431457095,565585831],[1082396208,3571229795],[409723215,4054442751],[2514479754,2657323307],[663125312,1366357051],[622162280,2139185143],[3982003085,35098233],[78938057,2696589753],[556394878,508295589],[1559748043,2854279037],[577649023,891456527],[1454519831,2666175127],[1116840405,3673598775],[1660870749,429561455],[346772648,4023632803],[250455047,1159599523],[105809345,1004057209],[81735817,2157740313],[2111879220,3495981585],[2141620143,1044270883],[3824744044,2766359603],[1375290164,1048395127],[92363571,3305271411],[655410178,3487049857],[458630450,3549506745],[1330618762,1649265959],[3642066560,131897231],[1914383454,2000715781],[2986181543,398671785],[962955109,1710484079],[873851048,2351120935],[2370663048,2300709339],[922206564,971192425],[1690348,1747372945],[1077029839,177984581],[902892606,669640791],[1084147834,3182652895],[893972040,694800735],[2290693853,4084450067],[828358281,2582721747],[1487490789,1865494347],[2476035800,1345005577],[6386241,2205013389],[110927359,2679902993],[523787302,888728355],[459816520,2185856507],[728585248,3724943667],[1431693684,2926196833],[1431128032,3984986999],[1555030750,3912029189],[371509689,413266221],[1196847832,3434334569],[2289400709,3082129167],[885600797,372957187],[1550184077,4025474323],[2653889234,3334490959],[774250100,54912545],[1215245803,2058685567],[883164982,2824579625],[93447912,3573176937],[959875790,324390781],[728639154,3919037379],[1905356123,2131587381],[31969266,3175804349],[66860075,2406741291],[1877371784,3259889977],[1718356089,2893735769],[70991735,2122265521],[165667400,1329135703],[552445202,1096978833],[1562380282,2648804203],[84191362,445683009],[1324085816,246139633],[1356686,2941652391],[553847323,3544294097],[603355533,1071232121],[1028044385,3600125641],[485022479,2126351845],[1587188331,1151136183],[2005688195,2130373291],[383867024,3261740961],[182255735,3470238423],[2396427692,771306403],[2599209706,3597117623],[215841090,2202127725],[600922366,68228659],[1341444692,2046346813],[31968342,3075852591],[3640811619,2610977821],[839898223,1097266517],[3331039636,3795430315],[477466060,3137228235],[86352630,430398549],[1326740404,3822553541],[1381645178,1549213317],[328576494,1600926463],[2273349605,1155784555],[2192616533,1932189421],[931381904,2834992903],[474859535,1397585319],[998998159,3817365551],[1805027593,4164916367],[2588448633,3725554997],[241518697,3743846575],[344433731,1258859425],[2249527454,1772163787],[308512579,838968941],[3417558849,4123371771],[1781950332,2199302009],[3308052717,2798946707],[1422525621,3209882609],[1988141698,3712645241],[125184350,1416502485],[342107531,2112140317],[932224276,1844169293],[2181224947,466135257],[107110812,1640222967],[3728850,1894843041],[2114113486,5846471],[48590608,212436029],[3998374,3701610935],[1358218853,3343918053],[1530438023,621523317],[205554589,968026451],[1491752841,3139391993],[2290448935,2462649425],[1169634902,414761583],[3568550563,3998294827],[616775715,2239336191],[933221007,2457731053],[153220639,3449881727],[5695792,1039582731],[1807442027,2292870523],[1739817731,2151391637],[390874093,1078010497],[1189582209,2465395661],[685333508,1500070267],[1573147543,1635511643],[750079599,1921928781],[13670335,3255609315],[1058074873,2260998257],[351179481,2735111077],[2346151939,2172973049],[57397135,109308203],[474246062,1782925033],[54789443,1220654581],[1094245093,2988036773],[1513234912,4023271007],[169971682,2625236687],[212803165,3929690689],[2339965781,4179338587],[270852505,864003261],[2776617760,2735994765],[652011854,3223094719],[33618180,3327344023],[884751521,348223429],[46051066,3398062323],[1881245735,1221403905],[562997526,4024531679],[1000792662,706479927],[1665373301,2746528159],[2268456961,4099680461],[1736215323,1086001653],[3178834110,3033757221],[689624941,2375319577],[629172959,2251876927],[610631644,938518531],[2751182864,4110004183],[1775819664,1781022831],[59249038,1382053991],[83780601,871979319],[68658869,1597137771],[256207008,1348531367],[1641127752,2407862247],[339548737,2195583363],[19599873,1736026975],[2927361323,1762597225],[559647976,2363425949],[2360885647,2504598793],[1380273955,2219990159],[1574486374,3491779789],[519700883,3935553511],[202962537,526545043],[971530148,3824378323],[722342904,4062656091],[38868214,538076081],[748812816,1698643467],[1292723506,154521973],[2463594579,379440147],[3078009282,4099323381],[1707165956,2999022385],[448376516,3174135649],[1185565062,2659806947],[477293577,3533989957],[66025314,2163842373],[1061274040,1796220047],[388611629,1642187121],[1984792740,429520325],[459604808,2866405117],[970702167,220785203],[1151320179,1515080343],[35185551,2007927879],[1798189248,3424549059],[34572235,2069213525],[88311809,2175310099],[1125500348,2446275277],[1591791,1228417063],[1835837901,3873069219],[1318721236,3101852257],[28509668,2134304315],[1795247,226739281],[2374497336,743075735],[2884802761,699257105],[90848548,1179784083],[237093640,3956174817],[275142031,3268719243],[302277240,4077677835],[2155532016,56941629],[2769867388,251138945],[909886429,406615233],[1175306420,4286628559],[725713426,3529629329],[1056585325,3431013601],[1985287313,1381536847],[2760412407,3824001421],[415963301,639861763],[128884167,3490071741],[71739443,684230173],[408955719,1257692627],[1152270354,4278690945],[2165795645,1412258745],[1236883199,3106385821],[2182915974,1831032761],[361374607,254903663],[430390792,1645509289],[795883601,2714334091],[1003121220,2055276369],[487604832,3719074187],[2033417725,780822357],[878878325,3060922195],[162646575,527684645],[329769639,560978181],[2707233099,2580987389],[570621400,2527338869],[1787663376,3713811759],[885464668,1955713319],[247842424,342270353],[16138392,3471234183],[2544241629,802280385],[797983530,1767297241],[810299147,1724821059],[370493349,3795247371],[1209444219,3996985027],[1446515538,3005358717],[856969595,1413730165],[362969273,1058642227],[3463649129,1613361799],[133634006,2250378643],[1219875239,3217390519],[3632612479,754608551],[2354840239,2884050177],[190492250,1658974331],[889003591,1079434251],[796581277,44806779],[19601680,1815754359],[251979514,44597719],[1090600133,4082344113],[1655549402,2482632329],[2343634548,590188357],[121297903,514841687],[1873980951,1267394751],[3741389685,1245241521],[92550982,2387094011],[714650956,670348109],[356401962,3406309389],[2809275412,52785903],[379573468,1516780627],[2110381316,2645726653],[2710484324,990194785],[2736024264,4159817175],[2799018473,3288157507],[3286652088,3365891575],[1372446537,82113583],[368278598,348372547],[887063206,4069264923],[1894952599,2151631303],[110689320,2583830373],[538519830,3384426569],[3397330174,222198263],[2291266092,2022814173],[323757540,3552410285],[1671890956,181098521],[206102530,2915289745],[2312533065,1223731935],[1342475008,2922135411],[49787187,2852785655],[1056213909,4091926299],[1208205148,3976984367],[2315961958,3014315675],[112301552,4117082427],[2634946658,3877593289],[726498423,3609659815],[2106387700,2876150345],[527800147,2288146133],[485931778,2281394509],[132333160,3965106755],[2577520189,1943427875],[448378727,681938155],[672818024,2900757409],[1438404337,3692086151],[1986723321,2326188753],[243177112,2629589725],[846354986,435943781],[3168447724,604214499],[1498524262,1342555023],[277744466,1913528957],[1144120985,3174773095],[2755028675,2583089443],[259361805,3395177461],[736273898,4244071043],[1208664679,2784697667],[1269841277,2663870599],[4565865,1139087531],[1154697604,651105809],[291541035,1673255675],[1702073928,2183846609],[1728179401,2149154809],[514285476,3065386803],[221870290,265034475],[532526611,2269304381],[1804647339,3809437097],[1147480810,3308842565],[2656814525,1490578653],[711937210,4109021255],[1123060172,1088305497],[1774967509,3934333025],[1637476415,3480543191],[340532843,3327039163],[35403071,2123793731],[836884353,2063060259],[3294839489,2245191685],[2707209382,506820943],[142821211,3974075687],[357444202,3763313425],[1754462769,2041524847],[100779215,609107905],[2386522690,297438565],[2006510048,2801310859],[2085379965,2627804013],[2864861,3700108115],[24414211,1712581885],[102736287,3725130871],[1468014614,248973097],[50096882,2657259143],[2339390264,2773060049],[187324102,1417366913],[2952262878,3025285107],[455875422,657994943],[197597548,2397142739],[725681474,315992957],[224859210,2138954907],[464231299,1362443453],[1702800701,561756577],[560217995,1897647139],[298600414,754532275],[37535361,2134508473],[73329051,2127681627],[431057490,3057153221],[821656070,3459341763],[245597734,1502902651],[96606388,1199797397],[387114402,2730184683],[90050824,1682472143],[183058940,2082204735],[1511482307,2837129377],[2861192685,3178318083],[1994407911,1451535857],[678423809,916907477],[1227586119,835745601],[708129658,1894639853],[844270966,3387087015],[1810143679,497158517],[1730117209,828098213],[841834648,3349327523],[215108302,3194597879],[274841421,1475997579],[687346690,1008250371],[1693600110,3466493425],[392890578,1240803457],[1835529290,3606471635],[103411718,70639805],[1391026950,645732867],[1121307504,3029216079],[517951503,3159683787],[1630393793,3348780611],[581276914,3390227903],[1258215819,680461251],[3327892949,3605210785],[382267187,4061149741],[4174558582,697334275],[2033836174,1286682383],[324909196,3784241609],[349020686,4085623409],[121932683,2500860883],[1539339301,4014291591],[878028163,1535418969],[45222463,3843522557],[359996948,419229727],[3355329724,3755474435],[2219501998,71286133],[2099852925,4081747089],[412806466,1470825013],[301819136,3923157761],[565656708,2828349717],[193595280,3962436147],[2331193973,1487127039],[190079990,1961847235],[3501923,1802456371],[380487753,2134273815],[1373672423,1316477979],[816457882,3763810133],[1808455657,3977778395],[1525150794,2357778921],[1112080159,2836705417],[1023673019,2193933409],[324333846,135774295],[327194972,2761526703],[1059556175,1291142865],[43660048,2330135389],[159240941,2460693307],[989906398,552602303],[3445813884,105674097],[1182828913,2524199363],[257884553,1092667051],[31563436,596239919],[66044038,1543109837],[82120614,1702596101],[162030434,387373637],[791962068,3862871263],[2074118025,3819339235],[2217657598,1883857857],[1396538991,2836745359],[1310506344,2355771957],[1721263369,3912217047],[951636803,2768715663],[469770442,1256960481],[601000209,4205368917],[267230022,3997598271],[237808608,1237108857],[108317733,2994411609],[3188855265,2086077805],[2272188502,1295676237],[275465049,3811540261],[813196548,1238936221],[239022125,3479075749],[313175850,2413926963],[371778705,2886882951],[1637977557,1336277643],[600023719,2342234815],[1027429485,3237273897],[3199946246,3753217141],[1513940489,2796656499],[643800030,2390788727],[585870642,968077499],[288183350,3225159203],[1694817458,129129053],[1133845092,281604483],[265579778,3575966953],[1714655225,2340062419],[416030605,3912901417],[26575824,3316340355],[221821913,3023284209],[1483209982,1936490945],[1731543466,1744032939],[923004588,3822377713],[42340387,3670502819],[1646416971,3575508237],[391108832,1991058957],[644753976,3708495375],[31920668,3077889909],[1951442810,3193147111],[253366330,2870704509],[1574506113,3528615833],[1515324736,3110116785],[248428856,1710839521],[112798254,861893911],[1457316085,314101271],[1236666208,1277745057],[1131283691,2569361463],[1771659207,1190202243],[1078812483,652975177],[551371294,2591207351],[259903462,846722033],[679290327,2273463291],[126269417,2580185153],[366249275,1316026413],[76884751,2011548155],[2720503789,2284344675],[58199492,3165571045],[2592101695,612612257],[2483424359,569730515],[277573001,2917022895],[1967123055,52466865],[540597275,708671695],[126864540,2347816701],[1900250751,2475270729],[980073495,1479503709],[1238356391,1805099377],[1529214463,185536517],[3227012001,1468805067],[564548868,1441628875],[317193604,1138620035],[1319149961,172296103],[1147566886,755050951],[3254671179,768640311],[692785413,2351312541],[713337692,3913026643],[840415840,3343874357],[617343919,2591940191],[3645744162,3240941783],[1252264820,899328417],[1370633930,1521774915],[281979771,191160369],[663694722,2734259679],[709392865,2424527085],[1457289188,3267469091],[2149751809,3705147491],[28165073,203556355],[528054116,1738539377],[3311577694,3010791701],[4052243901,3894209415],[37173047,2901079593],[1351790761,387042849],[1798672222,2024014865],[960695844,3928773669],[8152275,3148631949],[406762173,2408588671],[778813727,1292923497],[1678913404,2921534351],[311706993,3606578483],[504654509,3068233149],[1136410377,4170105525],[109367594,2301712147],[1066846269,420194971],[1517333890,1487933687],[35143875,291073497],[99005254,2693222337],[475919215,2249624087],[1297212249,2912386171],[3497419655,2285111071],[58212707,4276365289],[1490533939,3698365445],[978302355,4176416823],[215090052,2915718513],[1308496854,442456371],[1151819854,2414102815],[2912712422,948465139],[211444426,1238394859],[1876406916,2493255525],[112502703,1775681509],[84894714,882875751],[1675924015,4076325389],[284475577,3089665199],[357094329,1253705409],[33177052,2847577373],[619918993,2337922447],[514078615,3227247509],[1869327507,313311459],[418857507,3644834273],[518037088,3265858343],[1667192224,2053464683],[2381210640,879109389],[893468900,1106638543],[2953310586,1175286961],[196390188,4129248567],[1657435352,841549153],[385945071,1593229369],[1591066863,74277453],[83886655,3620991791],[1026476718,20630557],[947392357,887804003],[54769620,651433253],[1567712958,3248213041],[1010612552,2756509423],[486939686,2202315253],[2231269610,1342475413],[878434706,2571684709],[40546076,1131563311],[235207936,1813233955],[2530879528,596502395],[674254817,3650518563],[41444678,3817040711],[342302330,1144929615],[3540168,1225537557],[927144200,1961761589],[211295717,4236968993],[1404063094,1127754751],[3010357980,3673287441],[726899468,1719353395],[402920695,1458224951],[338073802,306219483],[989915002,676476155],[2531206925,437863915],[168614091,3324504897],[620334470,144171039],[531174256,298578285],[1492302826,2010866945],[543282075,2434498959],[1887378675,2466441161],[2711630632,40359317],[3080496726,1789483539],[2322017806,3485922349],[3597293193,1962126561],[562435719,339326413],[2449504342,2129988681],[237687609,2825705451],[2129926371,628904473],[3078643474,544398197],[521495909,2829811981],[2244404734,3282788379],[1582557867,3422992317],[392614447,280177453],[3498577809,2826493429],[1393834177,1321894367],[1604074456,629898809],[580717836,4061199249],[2988242744,1283967087],[2388649412,1487228433],[62169542,824514401],[373494165,2128092965],[2583246641,267126509],[1443282905,2451294647],[375264213,2508566935],[1267535415,2291354241],[1115001422,1045627151],[2671149487,2171851627],[1241291430,3757291325],[37434101,2578037107],[74123479,691405769],[237765754,2455564619],[76848834,2688954311],[564664596,2709735227],[275752136,3297670875],[2944858446,4042907597],[161562843,850587291],[2413406608,156059751],[37303475,458586091],[2264561684,3699933955],[1483723150,3105291437],[845001955,1767480205],[410213435,2386380235],[2014550269,2383944715],[278306758,4105605857],[3523177404,2427641245],[88344274,2659046477],[988150663,3467923929],[327642779,188711991],[28271462,1859416387],[322944491,3144916249],[926447623,1727288299],[716603995,3360554303],[10439972,3470099827],[840735969,1096783825],[364901280,3727885573],[1630635992,928125773],[1333086694,1219414121],[32381736,3809393943],[27317691,2126006769],[2128425163,2670856063],[266428668,1034690877],[580966591,3851300519],[1712028070,3426121745],[142953926,2064694409],[292640193,2012429537],[903035925,689433069],[134583466,1252066333],[1406838336,3524853657],[1402448635,926363853],[170108572,908393501],[2417664178,907652735],[1623203495,2746163233],[414057156,1685697663],[609622902,1309569177],[1336259743,2128009793],[191024971,216697589],[304117488,99280437],[1215071848,966548457],[96747049,3001756625],[610739747,1973813091],[144463168,4068215993],[2097614566,1643630995],[388391691,879518957],[241373346,1070720999],[2476889623,4249308389],[1519297165,3403614595],[1373634997,3701245287],[14108358,2544152061],[196186099,3188129207],[32163398,1852358673],[1458566759,944651857],[1015746134,2107917565],[1921729433,2500869215],[197625112,4257436481],[172530174,1865280021],[1095372036,2663276385],[1956111981,2338465557],[1169482834,1692578465],[2162839425,3988586289],[233009747,1159081489],[1254659503,1276470595],[925153027,1079073543],[400504228,4274504027],[1321072667,778165543],[651527535,3864061999],[554864420,508796487],[829909133,995790531],[2064266369,1437193795],[1246760202,2770118901],[63781038,1451989899],[63409832,2794195813],[633568068,1499897581],[233999785,1775480675],[824446540,1025378721],[266623451,2534312939],[26360782,266968467],[1711020821,431741275],[861754535,3133808591],[1046553632,3254489549],[272111623,3708595097],[88831449,560963431],[1266864793,1538719869],[170508848,2631841141],[3295514150,2687275109],[314286277,2276871701],[1779109761,3436251251],[779934134,2908121423],[534528621,1254461217],[1719409508,1129422697],[1440573421,1257781277],[296736337,903523963],[2110522015,2984536219],[1516592834,3310952857],[1511745478,1239986485],[2550664431,1393146159],[1308774524,1300144849],[41456633,3359370355],[344892461,1850692975],[311887784,230438575],[1747504027,4268071473],[899030041,407583319],[663344740,3436744037],[996676576,3478463933],[151010288,2329994601],[228191985,4207392853],[3878473639,4061626003],[1121972532,1466796153],[932259215,3227361291],[674733058,2550149873],[1363665934,2037464069],[669437436,931510519],[1658125094,2901748117],[2058586197,1180546721],[332682332,1562236279],[983792740,4039461625],[1007459446,3538663343],[165022662,2018239095],[3899695366,2094624949],[1245301797,2870348477],[1724113757,1849566553],[1089714040,4068387623],[2814129390,3863464795],[702970820,2546233399],[121899971,1207494487],[738050834,964912609],[4702984,3548585627],[154363037,2560082443],[1157190994,2846807369],[865094682,4040478823],[1069701732,26961207],[1644611,1592117209],[758201593,427957597],[791131514,1383828685],[305064448,2517603869],[2874958652,3711870883],[468114599,3790890313],[201880855,4032818519],[197002836,3949575579],[112715247,4025790369],[1643159616,1460763943],[394268329,1560661181],[53845173,1857214539],[258427672,561540923],[1466580895,1747557245],[767110536,101840319],[2406526003,3023518081],[120325368,1615451585],[825250633,2698916417],[2073750483,3036287445],[2201151726,3136876911],[1970379909,782945361],[2906903109,614152275],[1144008996,2442475109],[26480191,153565619],[834411045,1430209911],[326083220,2407139155],[214700543,2175926261],[516133237,1990933103],[931556336,20766069],[210726917,1451938507],[666924664,3088757547],[289793046,1061724069],[101634437,401323383],[536571483,4156517727],[1190224132,981372377],[1140179063,811295239],[2066540771,3402796459],[2372704641,2735343915],[45635418,2242168783],[585921510,2532732903],[542070329,2998862935],[338155230,3616229169],[282453961,3736290383],[1551686389,3512671333],[125999106,1638428589],[385374384,86493747],[608404363,3257109767],[109543591,2140709643],[2714568053,2259909127],[846100137,1160915193],[3409546318,2857900373],[939815145,3046159283],[76195196,64588469],[705647404,917877543],[1349093957,2206201945],[716559515,3517666717],[740807066,3760024125],[387204339,2794097109],[269988207,4132812027],[763496810,3691439497],[1169267860,1188631865],[172236667,2789954017],[2128510982,4129533109],[78206116,1848448839],[1330783088,2619923587],[112366171,3817744925],[77361605,2522131123],[3150466975,2722416851],[712243155,4138539275],[94289075,450775903],[3511552739,2089976881],[560023330,1273990429],[149313378,2988357615],[146508576,1697094369],[208649952,2157075431],[152464899,3180104595],[1036079478,2838250247],[559994568,213964611],[536141779,1851966779],[340045214,2126332811],[918986093,3769957507],[244110723,1553333835],[200184582,1545076657],[534783159,1438379379],[1944347579,1049121055],[3292315041,2125684641],[3011489067,576638367],[20556556,3146544893],[2119333655,1757341285],[75771577,1506816983],[1042880774,3919984063],[501212722,983061245],[718609447,3135511387],[2736888243,1396934751],[1994705745,2014370211],[1184610956,2465313379],[925298828,1253213997],[1181291156,4089873641],[604288485,1385919693],[1311636554,2281770451],[3798128813,2489782339],[182316630,1673566899],[3774971830,1811044701],[69760850,705959485],[864786752,1795304407],[3716878545,1782982175],[428944033,2905097069],[801674278,4075196435],[289359101,2212785661],[1932599404,2668763061],[307618691,3709059739],[2449052823,3729073803],[370017385,3039610499],[1040290767,997652079],[87551230,2001122645],[1468490283,1700546383],[206069086,1955151133],[406689677,1208461063],[2029583382,730228733],[25844313,275993593],[98744348,359312307],[149396841,2605829087],[1002427286,1792221549],[1350616524,248681203],[840399757,2567570867],[308725469,1531439923],[22039718,561167787],[1532583053,2796290923],[342941692,1130892591],[903495341,3489675175],[1730720479,3874880635],[232008662,390825503],[448933010,4158724713],[1404214426,463600379],[723481064,3514393847],[2367556,3754571571],[1180681823,3937774537],[44166220,388383639],[408254176,1505989705],[3143347439,929655551],[906109544,1329868071],[1588919170,1582665095],[1586200688,1884934469],[688563725,3709932865],[2194211821,1206534035],[2423122204,845956081],[774894221,1023909003],[2031950020,346287895],[81827059,3615772835],[29904643,1807545787],[3628626955,1262521675],[559986179,2969633149],[346293519,2414328733],[420296666,60422947],[368187612,1615473823],[195491141,4062089299],[379825357,2883950393],[1114488658,746379085],[1665896553,3575325947],[33358014,2338821401],[28724323,2245808561],[362963477,2327227941],[1315145108,4136562463],[737858362,182491499],[698804742,1415261351],[1105401651,1685668505],[227708627,4079840781],[4123457840,1274843485],[470436463,2434727407],[1339880783,2808791725],[2996573778,54047779],[2692757033,1795951385],[71226381,746591161],[837184579,557837115],[154757141,989041041],[3401363809,81649031],[2092039227,3603971871],[155409664,1433900081],[1474841202,1781530953],[983999485,3788979341],[768062942,816368083],[1134790893,1165802121],[38515152,1034315553],[635639322,152404431],[1090229233,2267893961],[301995865,2517112661],[713241813,2833193997],[2811718329,2344748247],[874687598,4009072247],[785886550,3463652193],[996166322,2743317665],[1268642731,3953340881],[542437930,3803544133],[1248061836,3076915019],[564986119,2064491651],[2507941211,3449181097],[1603844853,3761025737],[168990246,917839037],[2395288119,172295733],[346277729,1658585491],[2611532238,66483393],[1447351692,3250303847],[140137406,716747653],[12013758,3748192143],[1187961696,1370814279],[938540012,172546603],[3045112659,127394325],[2664391648,889726809],[1918422968,1434667597],[830835078,181506911],[215356463,2923954293],[1145448802,315424931],[3910293876,3867536661],[116806022,3858844957],[969946768,3327413517],[886546509,1643161661],[859784893,160644191],[520080021,1594588977],[118005460,1159053627],[938671087,3173742779],[928478276,2867147217],[2829549155,229027775],[429645875,3416852803],[2960024142,4199570055],[398980017,1355165975],[596683983,3147692209],[1549788231,3928594759],[600901339,1075918241],[17219504,3059571093],[164608683,1091684341],[4019685759,1808663963],[1036943810,2166747667],[1043219858,1560202783],[69524805,3258372775],[759013649,4187963551],[947447107,1009954163],[1797854871,872829887],[2857262779,1485023371],[3043510187,1366998455],[3525019229,3651089095],[214357661,2797099927],[57946343,4205955453],[647663621,4244560999],[105354019,321273783],[341007858,2064322871],[815730390,3208454085],[1727425255,1201431369],[441519772,2774503993],[282284806,1711128285],[1015274138,415866499],[216379614,3825676431],[890996555,2365603339],[369529958,2591930997],[455531727,2162745285],[346973605,3369999365],[5411736,873625539],[236828539,2487377803],[76751240,1331440529],[177140886,2861235595],[72851000,2362817851],[2707722892,2859590165],[124030014,3358443195],[1849103273,1151624955],[348261475,965124399],[606751054,1494993701],[1776415432,3421728837],[252008902,195623717],[1578125201,1597007293],[665621872,3258667385],[1987041851,3927240809],[1117715330,2023775395],[271355970,4217799095],[31911120,3715703205],[1289557535,2299404823],[961115751,3663945219],[1447470667,4009712797],[1522853640,1023109845],[1955539416,2419780443],[746957597,3212635147],[1478741116,1558476297],[99674659,1832889227],[324159667,2693916575],[7428086,1642324419],[943967988,3142692591],[1817366046,605007577],[456143021,517054987],[1704282659,1226675847],[1308331031,2436752999],[217922658,4106969445],[316952554,350777425],[2094804765,2810095937],[2210745,2577650591],[1087369568,1135891515],[486667827,3050872391],[436446587,3335320617],[783021141,1287751765],[221032810,835716813],[1586463191,3162448027],[983762602,3599855081],[831988053,3988379541],[483772639,583670423],[1067852835,2129951635],[2366220896,2283131361],[123461040,1766563089],[1379794932,2234928485],[2263213608,1822538019],[2643830845,2871871223],[114845607,3578409697],[421506882,2348003323],[274059346,3076352669],[2774844161,2481770871],[961417999,527204307],[1241711624,248741119],[7300511,1681492873],[1365558823,2613880573],[152040235,3798968269],[113983517,3322191709],[199288002,2391585495],[2451953617,776159801],[657470763,1223988627],[1480965200,3689009165],[884131507,273859441],[743228831,2151980389],[1745963800,841356447],[2784858572,977720185],[2471008113,2575502979],[1342434553,1715435447],[123195486,1728780861],[787378953,2098387797],[1878003536,357803463],[530072414,1420590889],[84159563,944180619],[2116781162,402430585],[1424164472,1213766473],[531969679,3088594211],[3202427017,2474351661],[3288960177,1101038283],[203618915,4005612865],[1004278663,884197007],[166673673,1517815013],[1042509568,2673428511],[565844406,1015270633],[686709542,866659255],[928445814,1087364163],[306305243,3312521057],[13216415,2115831941],[96349115,282991123],[906654363,755087997],[171455065,3414445195],[872590118,689161597],[279605685,1465024991],[2986120800,3893264111],[822389790,2298754717],[3007077494,3586669177],[981420823,3255669579],[396632110,3924302765],[1629824412,1797765823],[897892678,1790026509],[1339596928,53301073],[7233716,299825891],[2330327567,4223826143],[1065164110,218185547],[346350255,224472043],[442861389,2996045287],[1619331879,3524791737],[489922139,4062093669],[3021957112,2022016093],[921088660,4150387175],[1439453431,3726931821],[3836041874,2925033331],[2903404354,4294105811],[1829361448,1861048967],[404469376,2702310375],[154121835,3675244999],[2249457194,2541939625],[1463078476,1914355659],[121059280,4168908323],[957142687,153502263],[1094169592,828554531],[595374692,1175272065],[1206643705,1456053851],[4103460146,2726081937],[153463592,3086951461],[878039969,3593364681],[2860793242,990430499],[199057350,2750876643],[87212557,985580723],[827886110,2085400813],[174778007,1900024813],[895550543,2262116845],[1052824402,3841723949],[1642030885,2970914729],[13747357,3280425773],[43594676,1423392859],[1442987970,3777059361],[1492151819,3428625797],[1737650717,441963877],[451568528,989569915],[1628967042,2029731517],[426987268,3228999017],[282016565,1118686741],[781612857,661292875],[418733352,339743043],[291507717,925967565],[1685715522,2141431743],[2153017783,841346327],[341126055,4260391203],[742080011,3070880529],[1831538191,1042785621],[968544307,3620313469],[262129498,1709437241],[2263752174,2827076071],[865583959,498492821],[1929641418,715585613],[2448796530,250482163],[334773171,3497397147],[602703561,142647213],[1382744242,656158659],[2219428306,1392812057],[2907862492,3999636641],[12748517,3524101133],[175811034,385435061],[849282055,2627181449],[3906570,3328270305],[5083471,3770258069],[860128961,1839648171],[1657669728,1802642949],[13082899,3009338291],[453980,797280385],[297227637,3028409033],[1383999820,4184004103],[317202286,2845874765],[2248395620,3499302969],[1437521930,3352261135],[1549546278,1670729537],[252093383,1876246089],[362032863,666565977],[12042560,4013478239],[265714333,2602464857],[942131555,3049278565],[1270435864,78835115],[192119670,933670161],[2317126709,2063810853],[519154998,815396411],[3341161215,2455268799],[878965517,3810592951],[256423045,2068727747],[343461799,2134788871],[835756816,372495031],[490772775,1635230377],[37598193,3635549953],[40845020,2105783647],[201388487,3600483277],[1518106265,3313738849],[71266296,4270926479],[328908141,3825089991],[1471745661,581936673],[342378441,1319486469],[790733471,342362013],[1529678004,195021921],[1563386212,856336573],[1970525519,757698503],[1407113351,214231317],[399042805,774026269],[189545759,2149730243],[2447383235,2553593461],[262489343,1557792085],[1180086461,2476297687],[2902040243,3477540967],[1190021646,2098041405],[16690142,1261506469],[555257928,4161849901],[111677679,3573622221],[2729511610,4251589865],[397436264,2949763271],[4623308,2021118649],[2836970341,1217649713],[18327967,2265739175],[584997002,1159289879],[3563771590,2890771085],[106875453,1017433583],[140364424,1924609555],[641061171,3898839735],[614163495,1722051969],[2607357154,4124157655],[17525232,814625387],[1889586225,3132638651],[67374723,63243863],[1381635363,1056731003],[2475641288,740600301],[1410425576,277967113],[132331650,3802275071],[769456554,422014701],[2047346197,38721293],[1003467834,2786308129],[18565126,1433960591],[717959518,2290800671],[2403457627,455194963],[2541947221,3112827185],[66954741,1183799739],[469942739,3710640919],[2972614376,3219157349],[1352226417,3214860879],[1651212576,2474506629],[1682565232,1362003323],[1183013255,2463497515],[293163930,3773350557],[920324231,1485048631],[1971822021,1516044309],[49764530,3164608427],[600933364,4117879943],[2997822466,32652905],[697160049,3753295721],[724698143,1811872339],[188984458,3166602503],[234727207,3183381859],[34100331,1295522309],[3458462833,3800226237],[2184039808,3302307575],[2299229640,2841037519],[1817313222,3709149927],[3271938945,2573799861],[148323089,3124945189],[1310549621,2682875589],[1319215755,993934777],[402597339,2017213101],[418142317,3639439711],[1203859877,885470411],[2060888140,1868517569],[23285612,211556471],[2863283046,1908401115],[696088488,993199335],[3609165460,3831060353],[15790801,985986293],[1964191272,1321891529],[1196062622,298900467],[1118084655,3271630645],[571454817,1636531347],[864585653,3965669215],[149324026,1416641567],[2916531186,3147094869],[408301434,2784599381],[731632354,4122532977],[95152187,2059854999],[415998816,3868184039],[62059594,4025924847],[84127490,683887647],[788206780,454923251],[11329062,3806919111],[382214127,181999369],[2227084524,540136869],[2877025754,2975189731],[2302527950,639244213],[1827905715,917696347],[437246410,2724287331],[492797203,4271465499],[1251335973,3792135403],[2133491914,3602070167],[184629442,3090161779],[22094038,1295646229],[28825088,3189538051],[2188110656,3692022013],[2832558336,1658960789],[2289780138,3590755227],[2082424586,1553360785],[1005774289,866847109],[390137934,541761171],[186963685,3790206293],[986185368,1368149817],[145877120,3148074205],[677144338,1259660263],[395277139,3849713453],[225807144,1159075161],[599592210,3930887951],[11080646,584484833],[1330202255,2651652673],[161541192,443503973],[265661570,2882391285],[1246218104,2282130267],[491916799,920230279],[1926661758,1764399477],[2587889406,3677116089],[44152753,673181897],[796207472,1998117665],[764865491,3411357835],[16728555,475470565],[2546129842,3449364303],[411868174,2195368291],[2934661930,1599670495],[26147579,1315528933],[2721434656,3939398733],[1485313,208142849],[38452060,1496787473],[1423917696,1545718281],[3559025079,830167351],[1458681989,2692160161],[1577213301,2189937339],[178531343,3746595497],[2714419445,3525473701],[1260173975,3708148717],[770661954,1065342543],[170411483,3708455085],[408572666,930422497],[264681584,225148691],[1479117309,513889377],[1279094152,3831253979],[132466867,2271093545],[155494654,533162211],[3111672783,1907026887],[685570433,1104256453],[1950472537,3701091469],[1151905930,975186521],[1805846694,2869594527],[3248635531,4238251031],[4082481438,184862385],[50859387,1632031773],[277092006,3505338847],[2383612428,12028069],[27086192,3770046091],[2807565632,3747169093],[3774631833,1685034737],[9749837,3245831923],[354854782,2322720035],[2877868452,223725921],[1430720974,1054258685],[94979511,657080633],[590386864,3498664385],[229121748,3407322217],[1207466185,3226704095],[1857306157,3636476531],[510530493,742218085],[80778099,162286857],[538899435,3224845985],[294030552,481554013],[763835632,1846542383],[421955,2062179265],[3064863317,705602293],[2309875561,2973001829],[429507758,2063072719],[2078158666,1398931039],[1480105237,2398143683],[1431975412,2617792241],[115911353,229581045],[575508193,3814726121],[871126845,1318854923],[65566299,4000149957],[1161402094,2050187717],[773870015,1024290145],[4003825563,3557953377],[1956538788,2347899837],[237540528,4262205195],[3501378258,1180487145],[1956736744,1373679941],[143228602,3954937205],[2245689637,1917847073],[494092449,138610617],[1272100969,2740546715],[1559960197,2148366313],[1437042117,2610884265],[2108048754,4247891529],[3119476457,3098002531],[3947764404,719516813],[3105778740,885605729],[93175828,2164973199],[174842533,3550351513],[322513432,2519145995],[305757279,3949920627],[751898475,3471085485],[840880583,346239469],[135744639,2445642685],[2624171657,2358837273],[2108585257,548000479],[2514075765,3948922773],[466078734,2372237195],[1076350877,828623599],[2185004106,3537021577],[1953501767,2425369675],[1489959032,1076606863],[1694782484,4005398281],[1734636602,1904919243],[409763509,1416328469],[461790957,2925458235],[1173993521,1535313279],[1002631625,2132646763],[1123783904,2184333367],[305481279,1072289871],[300623806,1487431319],[162502783,1286260053],[820316208,456886895],[278765490,624154595],[3626263502,3318303181],[328722566,2923838559],[28613440,262072895],[2525614346,1207187709],[870158730,472211333],[105176074,4168236239],[2053849,2291714451],[628308075,3305133803],[188342760,615560997],[1194716022,601576383],[1451849056,1994882359],[779983905,2805375255],[2777534938,3812870603],[250804825,1805064015],[473242536,1213759629],[16830806,28957601],[49734888,2009794567],[108333919,1283852267],[789645079,3379951001],[237047557,1140987173],[3730968838,16404113],[19328770,2985160711],[170336653,3901170687],[771492725,3722062499],[3020058803,1802257345],[271656381,1878981731],[440166698,3949436453],[2090497328,1211143271],[1247574211,1607575377],[2469551733,4006148427],[1956774846,3443374077],[946836998,3109907839],[1280404487,1254159479],[1523961609,13792875],[248175696,2971716233],[6960134,242063241],[2487394687,325269681],[338169399,2094062931],[1112226927,259522203],[514243617,3962416067],[228473170,3876379775],[43202491,4131269193],[1101871169,621322213],[2035530972,2901515129],[860653228,769763357],[1403140069,1469142137],[1297659592,3516792633],[1327043206,1391656499],[357528250,3994159029],[1497248969,836084705],[125525005,3319160135],[118463102,2488868683],[604510309,528808051],[1299451282,593880883],[350811971,4263803051],[259763937,3779772259],[307194075,2856205989],[1589511812,3556329415],[559016152,714801937],[1169512130,1730139893],[445881599,1819356367],[1528347579,1161941341],[171034608,2693047425],[4032923495,2714029003],[105691361,1840783695],[242014520,1922591143],[1141892053,2352552955],[614131638,2079821211],[1183937113,2867832081],[1399702445,1791106595],[943764018,1313475673],[696394479,2989235975],[261877279,2770490339],[1267498902,90840651],[1269767912,4187152831],[216167922,3031382487],[79727290,2112124555],[156737912,1172828741],[129060781,544266871],[866732147,3901575363],[2672781015,2805025677],[189576516,1301917353],[199187733,3517952499],[160305578,3672773311],[929903123,1439853135],[1167431952,3643926667],[829569275,1012331377],[679438170,3240036795],[1299368685,177584205],[295998754,3097068961],[538644052,1250250155],[600530375,2946644983],[1349880161,2880040965],[377702042,3132617971],[422226452,867956269],[127801467,1107582843],[82211184,930653161],[52119174,3213976173],[373138993,2999927089],[2072657612,543048415],[236941145,3691486891],[225302792,4032747463],[43455285,3583565517],[999412300,1833873585],[447946841,1587264409],[239057836,1518174809],[2845196960,2610022777],[934969325,2492918827],[917677714,349736781],[2011185651,2999926119],[85089884,3251743361],[272000180,4080808097],[10449617,478909643],[118628383,735527867],[918638717,2502150163],[1147791484,171198551],[100147062,2510999165],[174695597,3296167583],[806139103,3097757727],[714792455,2605071035],[3047158200,2631097083],[828555576,1223642349],[709279758,253889777],[709981533,2157628375],[580556375,1879157101],[493981048,337396157],[1972270992,2983369329],[1151606348,1868389637],[1121321750,2071631473],[975160513,2490896617],[2918276952,3150078495],[420121815,2653195989],[449710245,3093669177],[327633734,3127940821],[39600292,2917700333],[1831204136,4156665569],[227213625,1636465581],[1889724607,1947424103],[2151711368,4084083667],[2065450303,615788321],[3658500016,3627852889],[2059753527,3527937883],[3893798318,848033737],[180368109,2097434363],[267881368,3105825517],[737265465,178239263],[974051996,2694586381],[141107801,508516839],[435308562,3711218933],[4138151783,189207367],[1504306056,1213919853],[116355650,2371460575],[760825962,1543217729],[1104372884,3443955517],[1431945129,1302694341],[2791539077,1127302669],[285572231,212701057],[320694105,3112994341],[3594714788,2164938953],[880394951,975325631],[2828000660,833134173],[2350369786,3578008353],[266138340,4212250515],[95425030,2673477023],[2145613272,3072757269],[193941705,2179441785],[278407348,4139363989],[111670298,2748954937],[117811978,1837535367],[1153575829,2221509539],[1717971322,2254645865],[3461902499,3856442167],[89306729,2845335249],[1447880468,46573467],[3295931705,508572257],[1895970632,2835701237],[471041166,2210062357],[414037832,284580653],[195843917,264313207],[490757800,430606529],[377767551,358909149],[533263918,1493797751],[1134677798,603166061],[1016965,1343474021],[513001723,3454882627],[1038231020,3054748217],[1028460427,4252770923],[718508653,555101519],[685367421,3942531821],[777274383,4173183961],[17980632,3485179763],[144758447,2298672967],[2286471716,2575465259],[545635320,2067347737],[515560109,48949771],[875627537,1678605715],[221479674,4107996339],[116587427,3973325323],[734040649,3057152369],[139880688,2922405607],[241563464,1767788851],[12430094,2441788921],[915600197,4241374245],[1193859979,1690424423],[1735377762,1414134583],[164394685,3906033029],[165660738,2755702917],[1597150206,2862599365],[455123847,2998140099],[1212142339,2170820301],[686890011,3308605533],[178451606,475450575],[573208375,3930440589],[942575800,182881343],[475184077,3729534745],[1013186971,3165849759],[1559023295,2962074415],[66472507,400778607],[1411119887,2592614483],[50092988,1335141713],[1543386567,3710605493],[1775676492,2073787203],[143657312,3243730985],[759669256,309002651],[1526582561,3625869583],[1227895734,1077209511],[64277690,1050644213],[2911145731,2393155439],[2725874851,3941759249],[285585034,1196917365],[1013578472,3909867163],[1160879843,848722307],[439589858,3539952223],[1720086152,884967207],[1468816569,2099466823],[438527511,2896270971],[1665578665,1473897509],[173429390,294636675],[1808916038,2367819205],[748753122,1076013675],[683694372,2440234907],[1274424113,1809682729],[155980911,3710423205],[828220033,3138181457],[1774396797,173855793],[58772392,1831046077],[785262397,899463011],[252576289,902516453],[483740232,1378018527],[1182973237,1701420531],[263075674,709519515],[1223264771,434211367],[2423059833,2568118689],[913602733,211494999],[3942865142,2032511455],[371109679,80867201],[1197808260,4293544593],[3071573429,1926711859],[2062283961,2032659581],[526513655,1315129729],[1825534613,2968568323],[2323510409,3645232767],[704506254,2501962289],[8220346,1619296421],[665652369,3143503397],[1196216550,3296591019],[700349528,1427626963],[363595302,2052576785],[548976723,649899489],[2215726473,555329487],[970876362,2720446335],[2486618526,3094115149],[59108884,3451886255],[2331917518,583090607],[1904957985,1462697151],[1003465886,3039603919],[503021583,1112773791],[256316773,1347535285],[2370442117,4212135059],[122913032,2819012245],[329685159,3580362529],[269655936,1961653269],[491267451,100994043],[1461006931,3215135393],[839247146,3347474443],[311551185,3741982037],[46240657,1593466811],[1701136,1014411239],[2184463258,3658486901],[1953228714,3144564847],[594589132,1150256273],[322405950,17495475],[776724033,438258357],[2867374822,3094789889],[523721075,3779804835],[2887658111,3122029769],[565600196,2459951055],[974627884,2814304985],[3039375288,3406192315],[2355532820,3710931341],[99022472,1758732751],[416402185,949903705],[1038522177,3577881505],[28539523,3156288773],[1231451391,3628114107],[147350978,2426964067],[1386522768,2955000525],[747812314,2432797769],[924176181,3114687717],[231376469,2245923709],[643220852,1538439997],[2919101761,785620213],[68799834,2302405275],[3182934874,3078993063],[813594394,619133261],[391567493,3905347635],[1955579494,450667421],[743789851,151625819],[453336684,177404711],[240292018,2369642985],[950721778,3584918207],[2090615460,2228080973],[389924646,3530710941],[1156003479,1808599491],[1200111671,2411496869],[339758540,1383122047],[510366072,2692865493],[115865227,2246759105],[2638268327,2012320351],[135222366,3507919275],[1723350134,1158841261],[872743928,307552713],[1220516542,1610060543],[98710734,131276053],[1261856059,3214775837],[1235582546,720115409],[584077389,2051774277],[1909677668,1027581099],[196873143,3721191609],[250816254,3984441201],[512274748,1983096597],[1582537706,4051913125],[2007879158,1234165247],[3062022452,490592995],[821479640,788925811],[1355135581,4138333679],[52937849,889841093],[2480954608,266869271],[1071587497,48676925],[890302850,1685005361],[2172304651,2865828251],[30727918,3062935031],[1848675632,529050589],[741282145,705534703],[1974249888,1504850271],[106110268,2810512281],[489168260,1439583937],[2990348,450887225],[63780941,2491832305],[1257951730,1840704447],[181430161,865836007],[2495994868,2774205501],[1766581663,4165263487],[2463815909,1828301693],[3628274263,4148527547],[2182044463,881777327],[26950928,1512373021],[272751883,1139580611],[326841504,4178735341],[1195471079,2963822085],[1893029483,1752543733],[632611738,3253852057],[378806959,3669834105],[570921993,1841944127],[37960669,2397578891],[296804454,2771439645],[862074778,768547427],[220494259,226357763],[959913929,2675648951],[1329765726,1190488803],[704999357,3606867395],[2721258402,329345905],[2060543626,2800925969],[1145403579,208336641],[3245919872,1620528627],[480171763,3577458699],[2784626738,729271729],[193635423,2212343059],[570222111,785184871],[203398879,2260715489],[351745970,1802048953],[1630365384,1047380771],[1979377727,3360799333],[457701516,2685934499],[513038022,1799281061],[1401863105,2014659781],[89627632,1052363673],[333161258,3369317695],[805596443,1555110987],[1728441440,594669879],[666595098,926015549],[1076799717,1185706539],[1278760368,880363791],[2110641026,1569642559],[892432272,1077969911],[3080310671,1226489213],[678613111,2266230599],[281847008,3747411237],[2571776231,1423105559],[1529891817,31529673],[1200897944,1428154693],[129952349,2490221441],[872319753,1221086345],[219755173,544511637],[48263210,3710156257],[453069785,586238655],[1359811117,258454417],[884057597,3664898283],[1239533155,201618245],[1298870843,3086722131],[5469978,4023652183],[421144726,1630109669],[67814533,1120250533],[2202485453,2249159853],[589448424,2255024451],[985451351,2938709975],[3279834245,3881250539],[1283155923,2186606975],[491253644,794960651],[381942530,1421877013],[193405530,3596466965],[2306339727,3511792043],[497154235,2971048395],[384864032,1309024705],[563052511,714035445],[594471284,1813046497],[1746697290,2904117565],[1007720628,2413900035],[365790062,4202720767],[477494389,1313482091],[1818070829,4089661843],[510724459,1170039287],[30181268,267622693],[53955094,3616679071],[1410930023,3009229597],[698176743,1798485061],[830019484,863041677],[2575012492,3665942813],[888654399,3192631671],[256576570,466437537],[437289938,4089534095],[1052843051,4212150995],[499787781,3767226677],[926519943,4148408261],[375352652,575341629],[20594441,3900066415],[1452495569,2959127773],[103504421,3502179559],[3273298307,2644049601],[129000633,1837858295],[890009293,4291042763],[1354381698,4015702797],[40300596,3537601469],[671250938,4294001341],[974812059,3574782029],[1911316881,3176598831],[26963175,903927603],[1742185691,2549160139],[1862825097,2185984593],[1891473951,3106268685],[9434745,3349646325],[134719375,3029697395],[1156241010,3583848285],[341024767,3985323969],[484682826,1465942309],[178565636,4144320673],[2063579713,3689429815],[515418643,943790603],[531970707,2993185573],[2209341222,1822749003],[272814542,985138033],[209055460,1234157591],[256122011,3555959099],[2360728520,328012655],[466140365,2190170463],[1297489919,61319911],[1068151552,3955227765],[3596673513,3592466315],[36790346,2654814133],[538148413,1959395117],[3081903674,259003073],[2326384905,3901952999],[654832055,1751133745],[1804726,2893478639],[1268736826,580905143],[1021930058,1892663885],[2336833456,2500749203],[762251015,1984000485],[1775348007,2809909207],[703363630,3306876275],[1183910319,3137142303],[238641779,4165512841],[323892481,1856314139],[1958286012,1492297315],[1318594294,679327571],[11484563,2733810667],[3402344791,3698463983],[354334537,1784839687],[69774453,2815065117],[195346551,920992311],[654180652,1703613785],[963450521,1119317947],[2115234392,2861397797],[379311938,1644751131],[2528767287,3039071807],[683113640,2525455573],[127801814,479469481],[99197054,3746956531],[406808155,184132565],[52003027,1848425933],[88601017,2079587313],[222906679,110542623],[38341362,4089720525],[1834168960,3133173057],[284052466,1027233275],[960081105,1174600703],[96342831,188502669],[1262532669,2642465433],[779322205,1298109687],[440838015,2171203873],[720635725,3566184983],[1364275598,1178642797],[57339071,1051262679],[297496683,3674985289],[248518324,1112197655],[2441638962,400699557],[595845265,1737592109],[72544910,43444033],[628274923,571880831],[104657211,2194996497],[748791901,63098739],[1140456220,802814543],[2268150508,3028017877],[2181022401,1243248441],[202644634,104603663],[1113028163,2008047883],[2492378039,3201588331],[179963007,1277808735],[206685962,1428229829],[2067037428,2844573339],[425561775,2868228765],[570624808,939753893],[313671,2132150373],[2269092932,2389464111],[117329508,2839415773],[313386045,2794026899],[2393229906,3394192317],[583935282,358238257],[858860,1125152327],[2027959763,94478077],[2330070198,3790719491],[771330017,3428569259],[111810301,3405462899],[3606116649,915795693],[212840329,3283483835],[956540480,909075895],[1936258413,770918727],[630284662,1503440515],[1582195405,1250403581],[2131680143,3280268881],[1832200976,2563018291],[101500720,1286842173],[321499105,3674046617],[501272459,1501743047],[3379655655,1080366597],[1614968406,794063575],[180475319,2572044751],[1813928773,124367543],[536037014,4192574325],[2057058466,2681750051],[480006879,197519439],[2487951045,3431084409],[28020787,4134247603],[611948137,1446775353],[1035853189,3778503631],[337759385,688713019],[2632215590,2132109105],[300557216,2398513857],[2222197059,3279790695],[14514541,3444210101],[561704181,1728689837],[694175711,1926750519],[3341591030,3112920937],[2448443890,3118542291],[416496345,873120175],[25396086,2754307179],[263393864,607012375],[1197892734,1651986121],[221402171,1512331929],[728560134,4180026861],[343833318,1500509999],[9376062,3254374251],[1376387425,1972043537],[1332160161,3703578009],[2479221152,1569985585],[929876693,1760422639],[193969304,3386433235],[2028173225,3576233503],[24577847,153807891],[1569665204,1472509203],[527444082,1966735983],[787726437,1499145417],[586135909,2610802841],[1436035495,1439904473],[656431714,2134907971],[182052742,1020223423],[455592662,2965093083],[1929746607,1949069433],[1306104823,3035094039],[43566390,2916268607],[1184159897,3157652893],[1582093368,2491874301],[1767682967,488776453],[721448006,3574916725],[394154903,1488810937],[1219635254,2838442167],[1752232082,2761930937],[1856538544,241525451],[1540375217,3344427619],[449886339,4040655361],[1240999599,59684679],[3077135,220651471],[302527734,855750367],[147531253,1342189433],[990955142,2406067931],[1329722615,1039835029],[1986206214,3333752709],[2138516431,1823024979],[239254525,2797893459],[42489038,19977271],[408151297,1741234523],[1892283906,3895504949],[2944282840,149105033],[1976597332,287086619],[236695533,1036294271],[149292187,3383612145],[974173451,407673549]]}

},{}],21:[function(require,module,exports){
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
var Float64Array = require( '@stdlib/array/float64' );
var umuldw = require( './../lib/assign.js' );


// FIXTURES //

var data = require( './fixtures/c/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof umuldw, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var out;
	var v;

	out = [ 0, 0 ];
	v = umuldw( NaN, 1, out, 1, 0 );
	t.equal( v, out, 'returns output array' );
	t.strictEqual( isnan( v[0] ), true, 'returns expected value' );
	t.strictEqual( isnan( v[1] ), true, 'returns expected value' );

	out = [ 0, 0 ];
	v = umuldw( 1, NaN, out, 1, 0 );
	t.equal( v, out, 'returns output array' );
	t.strictEqual( isnan( v[0] ), true, 'returns expected value' );
	t.strictEqual( isnan( v[1] ), true, 'returns expected value' );

	out = [ 0, 0 ];
	v = umuldw( NaN, NaN, out, 1, 0 );
	t.equal( v, out, 'returns output array' );
	t.strictEqual( isnan( v[0] ), true, 'returns expected value' );
	t.strictEqual( isnan( v[1] ), true, 'returns expected value' );

	t.end();
});

tape( 'the function computes the double word product of two (unsigned) words', function test( t ) {
	var expected;
	var actual;
	var out;
	var a;
	var b;
	var i;

	a = data.a;
	b = data.b;
	expected = data.expected;
	for ( i = 0; i < expected.length; i++ ) {
		out = [ 0, 0 ];
		actual = umuldw( a[ i ], b[ i ], out, 1, 0 );
		t.equal( actual, out, 'returns output array' );
		t.deepEqual( actual, expected[ i ], 'returns expected value. a: '+a[i]+'. b: '+b[i]+'. expected: ['+expected[i].join(',')+']');
	}
	t.end();
});

tape( 'the function supports providing an output array', function test( t ) {
	var parts;
	var out;

	out = [ 0, 0 ];
	parts = umuldw( 3, 5, out, 1, 0 );

	t.strictEqual( parts, out, 'returns output array' );
	t.strictEqual( parts[ 0 ], 0, 'has expected first element' );
	t.strictEqual( parts[ 1 ], 15, 'has expected second element' );

	t.end();
});

tape( 'the function supports providing an output typed array', function test( t ) {
	var parts;
	var out;

	out = new Float64Array( 2 );
	parts = umuldw( 3, 5, out, 1, 0 );

	t.strictEqual( parts, out, 'returns output typed array' );
	t.strictEqual( parts[ 0 ], 0, 'has expected first element' );
	t.strictEqual( parts[ 1 ], 15, 'has expected second element' );

	t.end();
});

tape( 'the function supports specifying a stride', function test( t ) {
	var out;
	var val;

	out = new Float64Array( 4 );
	val = umuldw( 3, 5, out, 2, 0 );

	t.strictEqual( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], 0, 'returns expected value' );
	t.strictEqual( val[ 1 ], 0, 'returns expected value' );
	t.strictEqual( val[ 2 ], 15, 'returns expected value' );
	t.strictEqual( val[ 3 ], 0, 'returns expected value' );

	t.end();
});

tape( 'the function supports specifying an offset', function test( t ) {
	var out;
	var val;

	out = new Float64Array( 4 );
	val = umuldw( 3, 5, out, 2, 1 );

	t.strictEqual( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], 0, 'returns expected value' );
	t.strictEqual( val[ 1 ], 0, 'returns expected value' );
	t.strictEqual( val[ 2 ], 0, 'returns expected value' );
	t.strictEqual( val[ 3 ], 15, 'returns expected value' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/ops/umuldw/test/test.assign.js")
},{"./../lib/assign.js":17,"./fixtures/c/data.json":20,"@stdlib/array/float64":1,"@stdlib/math/base/assert/is-nan":15,"tape":174}],22:[function(require,module,exports){
(function (__filename){(function (){
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

var tape = require( 'tape' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var umuldw = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof umuldw, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is an `assign` method', function test( t ) {
	t.strictEqual( hasOwnProp( umuldw, 'assign' ), true, 'has property' );
	t.strictEqual( typeof umuldw.assign, 'function', 'has method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/ops/umuldw/test/test.js")
},{"./../lib":18,"@stdlib/assert/has-own-property":7,"tape":174}],23:[function(require,module,exports){
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
var umuldw = require( './../lib/main.js' );


// FIXTURES //

var data = require( './fixtures/c/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof umuldw, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v;

	v = umuldw( NaN, 1 );
	t.strictEqual( isnan( v[0] ), true, 'returns expected value' );
	t.strictEqual( isnan( v[1] ), true, 'returns expected value' );

	v = umuldw( 1, NaN );
	t.strictEqual( isnan( v[0] ), true, 'returns expected value' );
	t.strictEqual( isnan( v[1] ), true, 'returns expected value' );

	v = umuldw( NaN, NaN );
	t.strictEqual( isnan( v[0] ), true, 'returns expected value' );
	t.strictEqual( isnan( v[1] ), true, 'returns expected value' );

	t.end();
});

tape( 'the function computes the double word product of two (unsigned) words', function test( t ) {
	var expected;
	var actual;
	var a;
	var b;
	var i;

	a = data.a;
	b = data.b;
	expected = data.expected;
	for ( i = 0; i < expected.length; i++ ) {
		actual = umuldw( a[ i ], b[ i ] );
		t.deepEqual( actual, expected[ i ], 'returns expected value. a: '+a[i]+'. b: '+b[i]+'. expected: ['+expected[i].join(',')+']');
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/ops/umuldw/test/test.main.js")
},{"./../lib/main.js":19,"./fixtures/c/data.json":20,"@stdlib/math/base/assert/is-nan":15,"tape":174}],24:[function(require,module,exports){
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

},{"./is_number.js":27}],25:[function(require,module,exports){
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

},{"./is_number.js":27,"./zero_pad.js":31}],26:[function(require,module,exports){
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

},{"./main.js":29}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./format_double.js":24,"./format_integer.js":25,"./is_string.js":28,"./space_pad.js":30,"./zero_pad.js":31}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{"./main.js":33}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./main.js":36}],35:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],36:[function(require,module,exports){
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

},{"./is_string.js":35,"@stdlib/string/base/format-interpolate":26,"@stdlib/string/base/format-tokenize":32}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/utils/define-property":44}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"./define_property.js":42}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":41,"./has_define_property_support.js":43,"./polyfill.js":45}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":34}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":47,"./polyfill.js":48,"@stdlib/assert/has-tostringtag-support":11}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":49}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":49,"./tostringtag.js":50,"@stdlib/assert/has-own-property":7}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":37}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){

},{}],53:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],54:[function(require,module,exports){
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
},{"base64-js":51,"buffer":54,"ieee754":157}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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
},{"_process":164}],57:[function(require,module,exports){
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

},{"events":55,"inherits":158,"readable-stream/lib/_stream_duplex.js":59,"readable-stream/lib/_stream_passthrough.js":60,"readable-stream/lib/_stream_readable.js":61,"readable-stream/lib/_stream_transform.js":62,"readable-stream/lib/_stream_writable.js":63,"readable-stream/lib/internal/streams/end-of-stream.js":67,"readable-stream/lib/internal/streams/pipeline.js":69}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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
},{"./_stream_readable":61,"./_stream_writable":63,"_process":164,"inherits":158}],60:[function(require,module,exports){
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
},{"./_stream_transform":62,"inherits":158}],61:[function(require,module,exports){
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
},{"../errors":58,"./_stream_duplex":59,"./internal/streams/async_iterator":64,"./internal/streams/buffer_list":65,"./internal/streams/destroy":66,"./internal/streams/from":68,"./internal/streams/state":70,"./internal/streams/stream":71,"_process":164,"buffer":54,"events":55,"inherits":158,"string_decoder/":173,"util":52}],62:[function(require,module,exports){
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
},{"../errors":58,"./_stream_duplex":59,"inherits":158}],63:[function(require,module,exports){
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
},{"../errors":58,"./_stream_duplex":59,"./internal/streams/destroy":66,"./internal/streams/state":70,"./internal/streams/stream":71,"_process":164,"buffer":54,"inherits":158,"util-deprecate":182}],64:[function(require,module,exports){
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
},{"./end-of-stream":67,"_process":164}],65:[function(require,module,exports){
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
},{"buffer":54,"util":52}],66:[function(require,module,exports){
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
},{"_process":164}],67:[function(require,module,exports){
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
},{"../../../errors":58}],68:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],69:[function(require,module,exports){
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
},{"../../../errors":58,"./end-of-stream":67}],70:[function(require,module,exports){
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
},{"../../../errors":58}],71:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":55}],72:[function(require,module,exports){
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

},{"./":73,"get-intrinsic":148}],73:[function(require,module,exports){
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

},{"es-define-property":133,"es-errors/type":139,"function-bind":147,"get-intrinsic":148,"set-function-length":168}],74:[function(require,module,exports){
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

},{"./lib/is_arguments.js":75,"./lib/keys.js":76}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],77:[function(require,module,exports){
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

},{"es-define-property":133,"es-errors/syntax":138,"es-errors/type":139,"gopd":149}],78:[function(require,module,exports){
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

},{"define-data-property":77,"has-property-descriptors":150,"object-keys":162}],79:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],80:[function(require,module,exports){
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

},{"./ToNumber":111,"./ToPrimitive":113,"./Type":118}],81:[function(require,module,exports){
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

},{"../helpers/isFinite":126,"../helpers/isNaN":127,"../helpers/isPrefixOf":128,"./ToNumber":111,"./ToPrimitive":113,"es-errors/type":139,"get-intrinsic":148}],82:[function(require,module,exports){
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

},{"call-bind/callBound":72,"es-errors/type":139}],83:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":141}],84:[function(require,module,exports){
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

},{"./DayWithinYear":87,"./InLeapYear":91,"./MonthFromTime":101,"es-errors/eval":134}],85:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":132,"./floor":122}],86:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":122}],87:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":85,"./DayFromYear":86,"./YearFromTime":120}],88:[function(require,module,exports){
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

},{"./modulo":123}],89:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":130,"./IsAccessorDescriptor":92,"./IsDataDescriptor":94,"es-errors/type":139}],90:[function(require,module,exports){
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

},{"../helpers/timeConstants":132,"./floor":122,"./modulo":123}],91:[function(require,module,exports){
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

},{"./DaysInYear":88,"./YearFromTime":120,"es-errors/eval":134}],92:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":130,"es-errors/type":139,"hasown":156}],93:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":159}],94:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":130,"es-errors/type":139,"hasown":156}],95:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":92,"./IsDataDescriptor":94,"./IsPropertyDescriptor":96,"es-errors/type":139}],96:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":130}],97:[function(require,module,exports){
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

},{"../helpers/isFinite":126,"../helpers/timeConstants":132}],98:[function(require,module,exports){
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

},{"../helpers/isFinite":126,"./DateFromTime":84,"./Day":85,"./MonthFromTime":101,"./ToInteger":110,"./YearFromTime":120,"./floor":122,"./modulo":123,"get-intrinsic":148}],99:[function(require,module,exports){
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

},{"../helpers/isFinite":126,"../helpers/timeConstants":132,"./ToInteger":110}],100:[function(require,module,exports){
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

},{"../helpers/timeConstants":132,"./floor":122,"./modulo":123}],101:[function(require,module,exports){
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

},{"./DayWithinYear":87,"./InLeapYear":91}],102:[function(require,module,exports){
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

},{"../helpers/isNaN":127}],103:[function(require,module,exports){
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

},{"../helpers/timeConstants":132,"./floor":122,"./modulo":123}],104:[function(require,module,exports){
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

},{"./Type":118}],105:[function(require,module,exports){
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


},{"../helpers/isFinite":126,"./ToNumber":111,"./abs":121,"get-intrinsic":148}],106:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":132,"./DayFromYear":86}],107:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":132,"./modulo":123}],108:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],109:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":111}],110:[function(require,module,exports){
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

},{"../helpers/isFinite":126,"../helpers/isNaN":127,"../helpers/sign":131,"./ToNumber":111,"./abs":121,"./floor":122}],111:[function(require,module,exports){
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

},{"./ToPrimitive":113,"call-bind/callBound":72,"safe-regex-test":167}],112:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":142}],113:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":144}],114:[function(require,module,exports){
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

},{"./IsCallable":93,"./ToBoolean":108,"./Type":118,"es-errors/type":139,"hasown":156}],115:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":148}],116:[function(require,module,exports){
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

},{"../helpers/isFinite":126,"../helpers/isNaN":127,"../helpers/sign":131,"./ToNumber":111,"./abs":121,"./floor":122,"./modulo":123}],117:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":111}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":85,"./modulo":123}],120:[function(require,module,exports){
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

},{"call-bind/callBound":72,"get-intrinsic":148}],121:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":148}],122:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],123:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":129}],124:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":132,"./modulo":123}],125:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":80,"./5/AbstractRelationalComparison":81,"./5/Canonicalize":82,"./5/CheckObjectCoercible":83,"./5/DateFromTime":84,"./5/Day":85,"./5/DayFromYear":86,"./5/DayWithinYear":87,"./5/DaysInYear":88,"./5/FromPropertyDescriptor":89,"./5/HourFromTime":90,"./5/InLeapYear":91,"./5/IsAccessorDescriptor":92,"./5/IsCallable":93,"./5/IsDataDescriptor":94,"./5/IsGenericDescriptor":95,"./5/IsPropertyDescriptor":96,"./5/MakeDate":97,"./5/MakeDay":98,"./5/MakeTime":99,"./5/MinFromTime":100,"./5/MonthFromTime":101,"./5/SameValue":102,"./5/SecFromTime":103,"./5/StrictEqualityComparison":104,"./5/TimeClip":105,"./5/TimeFromYear":106,"./5/TimeWithinDay":107,"./5/ToBoolean":108,"./5/ToInt32":109,"./5/ToInteger":110,"./5/ToNumber":111,"./5/ToObject":112,"./5/ToPrimitive":113,"./5/ToPropertyDescriptor":114,"./5/ToString":115,"./5/ToUint16":116,"./5/ToUint32":117,"./5/Type":118,"./5/WeekDay":119,"./5/YearFromTime":120,"./5/abs":121,"./5/floor":122,"./5/modulo":123,"./5/msFromTime":124}],126:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":127}],127:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],128:[function(require,module,exports){
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

},{"call-bind/callBound":72}],129:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],130:[function(require,module,exports){
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

},{"es-errors/type":139,"hasown":156}],131:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{"get-intrinsic":148}],134:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],135:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],136:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],137:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],138:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],139:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],140:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],141:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":139}],142:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":143,"./RequireObjectCoercible":141}],143:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],144:[function(require,module,exports){
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

},{"./helpers/isPrimitive":145,"is-callable":159}],145:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":146}],148:[function(require,module,exports){
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

},{"es-errors":135,"es-errors/eval":134,"es-errors/range":136,"es-errors/ref":137,"es-errors/syntax":138,"es-errors/type":139,"es-errors/uri":140,"function-bind":147,"has-proto":151,"has-symbols":152,"hasown":156}],149:[function(require,module,exports){
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

},{"get-intrinsic":148}],150:[function(require,module,exports){
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

},{"es-define-property":133}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{"./shams":153}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":153}],155:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":147}],156:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":147}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{"call-bind/callBound":72,"has-tostringtag/shams":154}],161:[function(require,module,exports){
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

},{"./isArguments":163}],162:[function(require,module,exports){
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

},{"./implementation":161,"./isArguments":163}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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
},{"_process":164,"through":180,"timers":181}],166:[function(require,module,exports){
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

},{"buffer":54}],167:[function(require,module,exports){
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

},{"call-bind/callBound":72,"es-errors/type":139,"is-regex":160}],168:[function(require,module,exports){
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

},{"define-data-property":77,"es-errors/type":139,"get-intrinsic":148,"gopd":149,"has-property-descriptors":150}],169:[function(require,module,exports){
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

},{"es-abstract/es5":125,"function-bind":147}],170:[function(require,module,exports){
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

},{"./implementation":169,"./polyfill":171,"./shim":172,"define-properties":78,"function-bind":147}],171:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":169}],172:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":171,"define-properties":78}],173:[function(require,module,exports){
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
},{"safe-buffer":166}],174:[function(require,module,exports){
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
},{"./lib/default_stream":175,"./lib/results":177,"./lib/test":178,"_process":164,"defined":79,"through":180,"timers":181}],175:[function(require,module,exports){
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
},{"_process":164,"fs":53,"through":180}],176:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":164,"timers":181}],177:[function(require,module,exports){
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
},{"_process":164,"events":55,"function-bind":147,"has":155,"inherits":158,"object-inspect":179,"resumer":165,"through":180,"timers":181}],178:[function(require,module,exports){
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
},{"./next_tick":176,"deep-equal":74,"defined":79,"events":55,"has":155,"inherits":158,"path":56,"string.prototype.trim":170}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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
},{"_process":164,"stream":57}],181:[function(require,module,exports){
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
},{"process/browser.js":164,"timers":181}],182:[function(require,module,exports){
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
},{}]},{},[21,22,23]);
