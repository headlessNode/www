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

},{}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/ctor":10}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":5}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":9}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":11}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a triangular distribution with lower limit `a`, upper limit `b` and mode `c`.
*
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 2.0, 4.0, 2.5 );
* var y = quantile( 0.4 );
* // returns ~2.658
*
* y = quantile( 0.8 );
* // returns ~3.225
*/
function factory( a, b, c ) {
	var pInflection;
	var fact1;
	var fact2;

	if (
		isnan( a ) ||
		isnan( b ) ||
		isnan( c ) ||
		a > c ||
		c > b
	) {
		return constantFunction( NaN );
	}

	pInflection = ( c - a ) / ( b - a );
	fact1 = ( b - a ) * ( c - a);
	fact2 = ( b - a ) * ( b - c );
	return quantile;

	/**
	* Evaluates the quantile function for a triangular distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		if ( p < pInflection ) {
			return a + sqrt( fact1 * p );
		}
		if ( p > pInflection ) {
			return b - sqrt( fact2 * ( 1.0 - p ) );
		}
		// Case: p = pInflection
		return c;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/sqrt":8,"@stdlib/utils/constant-function":34}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Triangular distribution quantile function.
*
* @module @stdlib/stats/base/dists/triangular/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/triangular/quantile' );
*
* var y = quantile( 0.9, -1.0, 1.0, 0.0 );
* // returns ~0.553
*
* y = quantile( 0.1, -1.0, 1.0, 0.5 );
* // returns ~-0.452
*
* y = quantile( 0.1, -20.0, 0.0, -2.0 );
* // returns -14.0
*
* y = quantile( 0.8, 0.0, 20.0, 0.0 );
* // returns ~11.056
*
* var myquantile = quantile.factory( 2.0, 4.0, 2.5 );
* y = myquantile( 0.4 );
* // returns ~2.658
*
* y = myquantile( 0.8 );
* // returns ~3.225
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":12,"./main.js":14,"@stdlib/utils/define-nonenumerable-read-only-property":36}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Evaluates the quantile function for a triangular distribution with lower limit `a` and upper limit `b` and mode `c` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.9, -1.0, 1.0, 0.0 );
* // returns ~0.553
*
* @example
* var y = quantile( 0.1, -1.0, 1.0, 0.5 );
* // returns ~-0.452
*
* @example
* var y = quantile( 0.1, -20.0, 0.0, -2.0 );
* // returns -14.0
*
* @example
* var y = quantile( 0.8, 0.0, 20.0, 0.0 );
* // returns ~11.056
*
* @example
* var y = quantile( 1.1, -1.0, 1.0, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.1, -1.0, 1.0, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = quantile( 0.3, NaN, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = quantile( 0.3, 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = quantile( 0.3, 1.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = quantile( 0.3, 1.0, 0.0, 1.5 );
* // returns NaN
*/
function quantile( p, a, b, c ) {
	var pInflection;
	var fact1;
	var fact2;

	if (
		isnan( p ) ||
		isnan( a ) ||
		isnan( b ) ||
		isnan( c ) ||
		a > c ||
		c > b ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	pInflection = ( c - a ) / ( b - a );
	fact1 = ( b - a ) * ( c - a);
	fact2 = ( b - a ) * ( b - c );
	if ( p < pInflection ) {
		return a + sqrt( fact1 * p );
	}
	if ( p > pInflection ) {
		return b - sqrt( fact2 * ( 1.0 - p ) );
	}
	// Case: p = pInflection
	return c;
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/sqrt":8}],15:[function(require,module,exports){
module.exports={"expected":[48.530693999081386,42.56514595579094,42.72315507557392,30.282814319469445,69.17223542263801,37.842015778899345,27.94030752702511,55.380198440802374,42.92751619210146,12.715481650555404,24.641324835711774,57.04402145163864,8.503295499320508,14.232222689072644,10.505450094592868,73.73260226691391,33.44016389390383,38.168475466379824,27.392184045081517,23.734069176598354,19.932461269161955,38.01785523300443,7.600515233722829,61.67200759577585,35.44767499853883,33.51489055309008,18.19439629243311,32.68045869547247,53.301647176444064,53.3185346814914,15.895005563321256,40.09416558202091,63.68753921751149,45.26926161954172,32.961652107932224,17.808145781400228,16.632944751458343,21.025598464316445,22.003920209832838,10.707652895859495,16.90283811623719,18.45576262897612,23.64633345932896,63.87910907057389,43.99178827095558,39.96411815138115,28.141423262691784,9.338572966322156,23.189987257463233,56.32777870996557,17.665599863188596,22.913275612634912,12.846554034666802,5.267293220993322,3.1585889655556114,26.90109921844818,43.7981642994998,22.912155463188313,10.150100124369171,41.976064298049224,39.148993639173,34.79002165064401,29.863073021522894,50.63603527388823,36.94698989248362,56.24598256998647,40.1290246886164,20.135402529247603,75.33249473318769,33.705049428604575,62.0084499795384,36.488184372719054,12.471151814642313,66.97055998751246,48.427518840838516,64.50383559808648,10.198808595160322,38.741753500925746,53.524270372067534,11.103265083727383,45.20307227661461,15.317221123100346,50.659836678867215,30.776267219298354,67.3007060510508,75.25544583403664,21.289645519192288,4.068563932548791,53.36138341889337,26.47992498894523,19.722698465313357,34.247961337267405,42.080306299842384,18.523544385275446,45.73543789854509,7.0863172262695056,48.492904825159535,45.100611714600916,36.895310481122635,55.07335627082275,43.058784890213865,24.05837953460285,37.49296350144986,18.802451171953095,32.297063039376134,25.584875471087056,22.80934121979879,40.006239805749644,33.733775436728806,81.33035062392337,44.4099634057945,19.728413140020773,10.884663623492663,53.651524191148184,72.64344469726407,21.84530701515284,19.45384189928315,9.35594049764677,36.53786880119498,35.6848267704123,67.22580459467846,42.1279607015834,22.04584500259714,51.65780340351839,33.61763122997062,77.16050587668624,13.148179426801969,9.858575749453513,27.647604315146033,15.432475006351657,76.33219695071435,50.25388945683898,39.41091835637446,43.47966081454106,24.825931872318847,25.814541988446123,32.04696354526332,47.89808258541983,45.66855234644474,13.279440384977436,55.16513362702108,28.84903776676009,71.14441951096163,50.75715825672427,27.02362445314479,55.805596298121166,45.440463246349495,38.57628814897757,40.01465904157018,17.185099581346098,66.40178836044092,30.181471409439638,43.41338988751055,49.365124290884935,10.68759306533627,14.925027279576423,41.55394899462385,1.8506092202817708,13.286059402236447,35.19780336810937,18.699635494932224,33.139616881504175,18.545940559033053,25.584181615619883,30.346409819014358,69.74721973110718,10.591595007183042,56.50231207912704,38.89322141541898,24.467151237265057,39.59596135990358,29.715302398512193,19.31474687091173,77.98189282460373,34.15802161531974,10.55698549618758,41.9432981780403,79.84126495110397,67.55401106176905,73.53618388966404,56.96026018744703,57.783715154057,26.56462873538139,21.227617410155055,35.88343565932266,16.084780511568304,71.89565659136738,24.81181491456956,34.7811168670148,14.77946618322788,26.87273147909314,19.88162834507259,38.66220773714387,27.813474124337926,30.63248277401264,39.57268225292408,21.640879712999425,16.525619574319308,50.89619006182031,16.691233755797803,75.43574048689645,23.836019719528913,50.94340004009726,82.11063867663887,18.586326411408642,46.64546736473364,28.17122662159605,16.020606071268944,62.73828230012798,14.913802046586525,32.962965141679945,20.672295224047275,62.509427673803216,58.24315096055789,26.304165431847125,16.10839825493919,45.65750889712167,5.040459759138448,19.16694112069134,28.806242416990994,23.21067812644796,35.482800475898735,50.25320303851153,30.124127195162473,45.38841727897848,76.49882125446348,48.66751388191106,10.766256631278637,22.55680377701285,10.103388508370035,13.921376839990494,34.48550833049141,56.173698081236466,40.30635707120992,21.2575419370258,28.30295627903332,36.34712038300664,14.254741035682153,67.66143267200965,21.420676886029547,32.64068298315238,63.30995993904263,24.693407120503878,25.59524459173179,16.224571576865724,23.00158859969926,33.70294212552347,38.24364947878628,74.74655415469701,87.66180444792317,18.07920912899946,30.73663413622152,31.32014252273096,12.29890253352351,18.48981752843341,59.401293411585314,24.75628941733813,16.937408300205078,36.45286176687137,54.13378464965359,23.49247666650528,47.76025419302732,34.711974524404084,88.50397700497567,21.35329262977934,21.566489539891553,66.23857309179641,40.339665661677046,28.04068169578043,8.374287505779272,41.76674553107829,24.745251164108176,41.14745697560924,20.3382696249344,39.03668448707446,10.759609132173305,18.973179964530267,51.03720718412995,76.5402523621595,33.40758537290585,40.096094110460356,67.34207099455958,42.735957803266935,30.556465265022787,15.913359659380728,68.30847866437844,10.82458809161285,46.66092802853108,32.40758078675257,37.75717162802009,7.274197758253373,11.356813783184183,9.780279858362036,18.25843747760766,38.660364991152605,32.65836574211632,26.03099770733967,41.47272882480127,33.93272747885899,53.136315726465526,53.1482236825611,31.253972435524357,53.999652220478666,60.31293566968816,65.3499578928002,21.21975393323888,56.36561301256521,20.351703849265736,27.6184989393841,38.52784078741804,62.584390473143294,15.857394399835268,23.997513165381356,54.71413421946245,73.89972513046364,55.26226253480101,18.377721653024903,16.369741785670392,69.8025892737594,36.87969325462967,8.247996705859041,24.77456858278955,52.42636897560644,40.646602913651506,44.75656787370236,43.1185971949739,21.647833907175173,35.54798908997827,32.645388284454455,13.325059275137303,34.14199093260413,44.53381899722169,72.00970017960543,44.354925414985644,49.50931821519987,48.22402455069526,34.07346201604943,15.248596717670157,49.811189152132066,20.857118396228792,55.458476835561456,37.993311763014866,16.939559641566774,46.63136184885144,26.460745036597636,34.216726360987636,35.979937352419036,6.374478416968325,33.88363963218576,32.0694126974966,74.91177056584556,59.21572776601517,50.181417663115056,29.98880679669437,15.666612907643502,2.4298001926595814,13.188724921757162,56.74930491439467,40.95015238157219,10.25538740101253,18.47517648004036,31.77221072684093,25.185727343644956,22.74058644324404,31.979280054538528,17.21035676061484,12.49947263169327,40.79969449517435,46.92404233986166,34.356115993501675,41.43212923532833,73.98770499047401,10.122429475350682,44.951517995965794,9.048051115095232,10.463856153143631,42.02825098764425,48.5621487185415,72.01025690006668,18.938229993269932,24.649187496781707,26.87459719344597,58.16048274698397,39.064950769514724,26.294349264999326,50.78854485918743,41.130093707465804,18.053478204288695,28.56166643726032,36.183669600469,37.13323566857281,42.989357373013206,6.264867241850351,17.58320959927127,4.570084354108862,25.05178407615926,32.446075286134544,8.963789435040667,15.11817231198018,46.094534781725756,9.1487544486944,45.993972215338815,77.80067926423239,31.104809604482686,40.00936292600743,19.59349041759245,13.675109374085704,11.820262936323287,14.726369730969905,82.1562474668724,15.510041939216599,57.41353427319648,18.72047245156976,27.526372426373577,56.67134285902581,24.90494851284087,36.33657952805943,41.264742431854415,41.11884274599409,16.353198813014146,23.38220339627996,38.06143112903793,30.71954857762055,18.91181363524217,6.4697235824179335,70.64627133808047,54.21299640516402,71.68292863852639,41.82203056783525,27.366986480139786,51.215971543378096,42.30098451126278,29.72565066214734,47.02211551481017,53.4075358426328,14.287896175467502,63.65499941405253,12.928953742641959,26.678481247819153,11.726009554759171,73.51468498784972,65.48252949853375,42.10911348185833,76.13725072311298,46.31927150921322,12.763636610015258,47.75540369651542,43.55606124628289,51.742981428828784,15.862886253946174,46.920576564293064,28.401064027065956,6.332738195658839,55.632480020891364,28.453532884458983,19.642675669833714,7.572443660071411,51.951839844934014,13.350501444597969,75.99034098945094,31.410535454721543,13.035818855741141,1.2984613799636158,31.817504171335614,30.31193917672696,76.38754015335519,42.42821494039582,18.336068795946925,28.59824711604766,10.31239339815227,17.433300440320274,29.722632888762405,53.83455644750584,33.55417889198151,44.429998349898554,24.630026440254994,60.59943555677761,7.4029915439030445,43.363802196155916,65.0099528880715,15.514130592691757,16.883760887409647,64.07303072319115,29.484285187294454,47.08615136862622,33.47360757636039,79.30702432478174,17.003473120991686,62.916124244895954,49.01296568772924,39.99741864966255,34.08903945136534,2.990219141799698,24.606078467411727,20.234524029348854,61.451118775228885,47.87502213789818,16.085094241204466,17.76427121504686,14.777817097484043,9.12522383572951,19.22188932100466,7.5368537941106215,29.966216773321896,17.228740231617003,29.0828393458875,29.190918088744404,68.5349576720888,36.59474862295444,43.803550100569424,32.795164448406375,27.31459499713119,23.120275408535846,49.06919921738435,42.792623055161094,35.381515560169056,22.21448258655829,31.19345112943575,52.4032271165082,24.317087314182597,36.772697531275575,30.28511166652768,11.697303974487497,47.807801977605855,25.91290820578556,21.85009916721628,12.973290276024207,30.382724820509786,16.88216296061014,46.72425511991685,83.80717092268674,70.15676805004755,63.45469790712268,65.15993742492144,12.428543053852698,56.34079301206209,20.539437553210952,62.788538162903414,49.11328320460477,40.025951788225306,34.66595271800179,29.2336563482255,30.12983567122742,12.058220073483767,24.207425616289584,63.47083682376737,81.50487758634897,54.64569424901075,19.455097851584615,75.55132664494909,33.470798736999456,55.76479314638401,34.223327889440924,11.988822306838394,28.67834039386058,45.03458462687171,41.57470634933405,49.622574826348654,48.23666317081405,46.9350998497841,20.42002515745546,11.32854960365169,18.132083257805686,25.755936873700982,48.87203426651955,23.438501658218033,16.02738117065576,58.568318251275684,34.298807981515736,31.53201081875006,57.14601427005233,20.476352429578277,20.162237043857118,66.39055770062127,49.34270670010461,16.461767833961417,26.51327543649494,38.391609503140906,52.58574832035345,9.415434647973665,30.887421137534886,16.86507715554583,18.740015957331977,21.264195917593078,31.9823612079354,38.44876877939036,20.313300250010254,29.181579407489593,24.703384935056075,31.275232152663875,27.220058225139304,44.94500297449781,59.49838968437162,42.72283571735864,39.870919296613835,12.67919091389277,37.19231286000259,9.978970965401182,24.251368254672197,68.47528687313198,62.884046698939684,40.39142340822828,23.6933028857835,14.402727823336253,54.44717582082629,54.64330755380462,30.269151520195695,38.52787663687127,8.527996651912247,48.59703160661705,63.32755069418259,69.94655497616318,23.26897604502929,17.608995197838095,15.662582045879528,18.986773240342927,47.31268060860006,33.84999750491639,26.327174826678394,19.17694739377493,31.480056348499176,38.74192980644891,39.19194424670697,31.681663957047398,59.330182304643685,33.87655690919886,16.591809009291936,51.254553324391594,47.28471561493623,16.761552488948425,50.718975677485076,13.091359885964593,32.9843990431083,63.53738524356217,26.133117883542408,11.474362124319102,30.996382175746938,58.205161435154054,16.745752816443954,56.49152161769348,39.46923239296472,32.37411583705351,1.0614275955358714,53.485231425151824,45.565143008342766,6.381491814301926,9.30347276108685,50.03635019321494,31.025299774669513,6.745415761521506,58.36294832794697,13.016623813309316,39.01731199768179,41.584471334281005,29.681643643422582,55.01748870887698,32.570179567611575,38.54206595380763,17.980535984931137,14.452176181602225,31.035549252173894,56.31179691313129,41.7630529366066,57.95828451866197,40.44442395617178,61.87570967159793,39.37508878968447,25.810884575691162,31.29110492449277,19.7215049582001,67.99425535768663,24.881104895186702,33.344098047741326,31.07547249816245,14.70131218313152,75.80847664929331,45.51325621713522,41.43354921674552,18.406628418278277,10.89408243924291,40.67223816448016,21.800342471750454,61.86701919146162,31.971193695935575,2.304034033315659,41.95113338390911,26.752669886478344,23.110655175571317,20.786499639451584,22.08379618260078,32.99601039234583,33.628333765202385,7.101387425624109,36.42742219976904,35.57466947113189,70.07955277576488,25.220856170934045,30.773635271139682,40.73336462557397,32.39797216847384,24.769010649858572,51.83249064398465,50.16817131963479,49.46397468759902,4.478563642744117,32.312691703789966,22.852223652260637,13.310767861854687,32.3592928192524,19.02135006835033,15.428624225435614,57.167049069543,25.455859174942482,23.292812068294573,18.15794739230284,17.346733574596797,51.33563313927432,52.608199536798985,40.90020901846621,13.733795840591672,18.423715403975557,29.854165845232387,41.77327325068187,34.11866762170506,60.91295526955825,25.60004609769023,25.75983400571469,55.20272809371188,66.0488953921841,32.80719233525973,52.82740036565944,70.90220369820675,38.13678559936034,32.54503033658889,12.427549554397604,34.94976809799502,48.48626403261028,24.187619630632657,12.432004838136026,10.683259356910163,63.60008469962971,52.40098028786522,26.736803945999778,29.98460093501626,21.057222065914292,40.91504459137479,51.56616182675549,80.84074441763426,18.663877327590896,23.33390228731657,53.53628728236365,18.409127434620043,1.2306648950043457,13.729532057681322,68.58365931686848,44.034258787836194,13.285451867234379,28.32709994149631,37.190004606781166,11.136032052622891,54.818251886942875,44.77862867134649,14.768081801291023,49.48272431554811,69.62229342955601,67.08197965260001,25.860797422021122,20.487696776920068,68.39330336070707,11.627364264189161,52.32728973773099,43.67505199628425,34.90308574796779,50.413508548561104,37.90323477810298,10.745684931564492,0.7732304018249818,57.239700468679565,32.84448786554759,31.13021215665535,33.48091957294433,31.86467012512811,47.058651771681994,81.70148785708184,52.91308340284546,61.74892989193568,69.86569657868712,51.11132957242399,49.73666595711274,31.243032179054524,18.728878872538477,22.328274023141656,71.8741771718392,69.49842537269214,48.7651345756462,62.94433262923121,28.15336610397484,33.92175426144521,37.17386619749327,25.234278886899165,68.31790996823977,32.87611723059128,18.318074218650988,18.636576017607347,22.525636961208278,21.818197273810874,61.99316772274907,11.569203266274057,18.00916598554268,71.35861650803388,74.6647146990695,13.111029942874422,20.945503729170035,38.73071301750508,30.849537893463758,33.62175970765587,81.69441646331933,27.501076593270355,39.70288047856797,26.831818804363536,10.976452716515556,57.301509713569175,27.5537617931654,12.796486308167639,71.82529719902992,46.641148310855954,32.16934765643357,46.29406653387276,36.66247635813858,28.727390532269972,46.43536568192997,63.645559643008625,62.02243137239736,13.755625515795677,29.92740526520204,33.24633044578333,19.03857736081256,42.244294801513995,20.326145520004893,27.064665048615662,2.2899008011970907,51.85371027100591,21.32870964193562,31.895549227949402,36.34758212079936,33.325264806901444,73.60762305124798,45.09996769192822,48.79305094824659,15.392491018480733,20.48004957790539,10.449882118387631,31.961606961285156,37.351962871335516,40.438010879888566,20.00022612914602,16.16038765015366,33.70186941916161,44.11604211472569,37.63724052903202,43.18445694923589,21.894281583948015,81.37961222473072,33.18186432128496,17.002346036369275,72.09936853052449,12.542153576694496,23.904432089107033,49.14324407206474,17.762765245108522,61.81652356551569,51.28171742533596,18.75929616542507,59.356657883802974,28.300025900785407,1.4282475550328393,50.67777635964889,19.602979302369157,31.286604006072803,11.844210096924822,46.10832971957506,19.65456829428543,65.04591025420653,31.7481080575569,44.50456195886114,6.775698786403363,20.97090768660731,32.823605354804556,34.04690792116841,20.929532832239772,11.785747837679455,18.915480791610175,48.341456657161444,13.930256861936416,44.47469657728415,10.513465132356316,14.062953619062114,14.150661611304319,56.9427286260491,18.720793524708874,18.740899032093267,24.982589118795275,16.248325705112595,19.31164465083201,35.35803113439984,52.160979099767104,23.361208237551633,40.05449957812192,8.223792361958175,0.45275239153391933,32.88055354748101,55.01755372166398,66.49708424046783,4.831604048590594,23.090901994341863,40.83892488794158,13.874372840114521,19.370695405496612,1.2515596337249635,47.137949647031235,19.21686013672148,68.35605698225822,25.622347341018077,38.12573970499683,55.631410099910475,71.33725238715202,43.06444971485611,42.85972587869419,48.02025985396841,18.42289990647847,29.304515181898417,16.575901163448442,35.158844421249356,16.02270642485916,32.3853457332486,3.0455678520812026,18.92780740207826,62.88228393155208,50.97426331766964,11.028426186234466,67.76271479774688,24.766737840987,23.99456084094931,62.26889133681656,57.497937974912006,23.04173884215482,42.91272535914608,31.500535997380638,41.786087278574804,40.810678424037725,71.63078062493429,26.377937407069318,90.98602556283973,19.433543707835547,11.148445214035414,22.0117397221551,51.47860413764321,29.17239736555012,34.66190078706218,33.55549242924269,62.44700907065549,20.067537513767334,33.234459481330695,35.23564429183576,29.54144032895926,53.905936353629734,33.89717037273391,70.1420783831638,45.061068204403824,51.559341867590376,22.798470493285667,46.11824572179949,20.405520466226285,54.88500498897826,36.18703095908849,13.310237592497284,22.451845640655584,32.7303959019037,35.91336817729876,29.74091886968246,19.12783547481862,65.97877465524158,35.559812859701175,39.616324561724404,44.794547261007835,23.402107336939377,35.10977997888672,33.658994162122134,31.69741959441457,13.408748707226197,41.49109149081336,60.95723428283772,21.808684346227288,47.992480646612776,6.040510759106939,35.68255143682207,41.7694815377412,11.366488960338707,22.249232390741508,64.62121819978621],"c":[46.909619488297814,85.68868016324731,45.99677489802481,38.486302578557236,73.6125135144628,67.41609001712119,31.588052530482653,71.02183883221235,49.14438374175897,12.824464727533783,30.194208905110862,52.82070874142076,11.278077569221878,16.564632426495116,17.53443802295275,76.88752589160126,37.60688969848967,41.935643225986325,38.309841453053195,35.21922399492145,27.22728596362878,36.30053695534707,7.661324047971457,60.2090831950966,71.97058444404233,34.165285414981305,41.07694870238864,34.84327491581945,69.09189496147171,71.75933872121313,16.401562965942425,40.80139092165561,74.2969930930528,47.35517215074744,37.634017471205475,17.66482160340997,55.36126363614284,42.44574699480766,22.32380977532046,32.23243785232884,21.530903118367732,21.429423747466565,23.277673342085293,65.6831804553979,47.069522129614384,47.99241268119119,55.356686993078405,9.367071447892071,42.523787861247925,61.61273433565154,21.33539202709074,23.23511805053524,18.236331941223966,6.166185293907994,3.6062818440938402,27.428475256596748,51.37666570545081,43.56949942378375,26.967594899822593,73.25344417360624,71.969338013793,44.0657121571316,36.62209422553384,62.59633415852243,47.58163339428838,59.23216889810739,46.79748828380909,22.440595737374316,76.09053920371457,44.44189835467478,82.54467198761914,50.81341096734945,16.383227511196445,73.65257346252523,65.60289964180167,68.32570140255734,12.115381876556134,39.03319216479727,65.75590864652459,12.446184249544002,68.13968166440887,22.712719866807507,74.15456411633524,31.63954369084501,67.14697199671781,78.56290604309372,45.38740322141639,9.153101998206445,52.4317376410095,25.747311004866383,24.57881605134382,41.77043344384836,52.638105050651305,18.279267929301263,58.196035071519006,13.574067366115585,54.967258915811264,58.68195106893491,72.04758414411504,63.22810682018382,73.41135535919717,55.37647861314749,60.8104936863774,28.37903142115269,35.351625281538276,46.85921201416304,84.04254178384338,54.990397952004955,58.1747241152007,73.754393101366,47.06459306007764,20.269876526452347,14.471527693505053,51.326943767849954,76.12371774887802,37.375584857120884,21.907783961051216,11.057553515123768,37.999591850178525,80.24401802327661,79.88194479493501,48.839255144895645,28.666080141101595,51.11059827644594,72.28597268839522,85.03030933444089,13.188546215680585,9.086128658092296,32.533250769723175,25.228096125553,69.11181708712442,53.93348274720669,62.403640792590764,50.342013868028516,26.334825280236743,28.214485482644022,41.48935618975385,71.46373474382888,43.173578107031304,14.253043489564602,66.22875930424225,33.5350415779288,77.45527409359785,61.11304382851973,30.710517177090047,52.989143483166686,42.671410355734395,55.83879511686758,37.49658160528393,17.034968765916084,74.80223311626874,37.88276543749177,63.131765322468326,61.91275870006088,14.368795745378542,18.844297886265334,43.69668068924052,2.3455097536760725,15.491782289966855,61.73394918096639,18.757952617532617,70.58542372639525,21.934731634826836,36.1121080905067,55.44752149086504,74.03302241885517,38.2024914858482,60.98566474668063,56.420031974579146,26.87255368239113,50.44746599304592,49.310144355219975,20.67533389170965,85.16575486429053,35.23811990974097,12.112641807909634,60.26718622377032,81.90570655312965,76.03889151514751,83.82777337987342,60.17911302879025,54.67776324673436,69.50487196826792,72.21822249346052,37.3424644778423,33.14927437196669,68.33044197312334,23.546902964998445,46.484619522651045,18.26565436774353,42.58159973541431,22.905670645353958,70.36378276084675,32.0907709421955,30.84767883214684,49.29135561903033,68.83697237340829,17.479338094423778,51.79923883747849,60.56791615515494,79.0556607560075,23.54208578938954,48.30968702769153,77.71293545818912,28.14765669284499,45.38806306064702,42.63210076150562,25.89660257169748,58.53194708341838,31.03066813361046,51.373818291031824,25.720884169820668,61.336313105081345,79.407645863612,32.00299789709996,28.88702579390052,48.161710662978706,5.044296986884331,58.7847473312843,29.520394323161796,69.65328715740127,44.88050627894037,50.99269675859928,50.52671674752436,54.79170724927904,77.71860563415981,62.56968104600801,12.138010049435195,84.18950812048355,11.281176313610963,26.603173982272303,63.90924417739744,57.20239629435894,63.74067854342812,29.035333919454636,31.820647265236424,37.64834486872675,19.42470133196946,82.65889625034582,21.995187222902935,42.26398764909756,60.218617653180196,44.10301147257671,58.88185573518427,71.7762813878363,25.23577185429975,31.819895550426,53.35115880119946,76.90973230224833,79.94466554285178,39.53528791989815,42.373423774394425,42.68538123518809,63.05588508674513,19.377448952396755,58.842901208137725,28.61831257523672,34.64089486632178,49.24689047273347,67.0140955391562,43.20739718663283,66.93942150717344,48.87395836215884,81.19706758978256,34.1705503778409,51.90964828362244,74.72782286721764,72.03811533610266,44.451365367456745,55.324591915327446,46.65407260995225,29.28593370606567,56.60631968700365,27.54117806612082,68.82544566252452,37.20464335622637,25.65845071003046,73.50809083928468,76.29417330527025,56.99986518078306,40.75105027319855,78.99602179530989,73.25859053542868,57.10959305239769,29.33307934501743,82.22110817850262,40.839514857330684,66.94922352437767,39.23114266246791,80.92584400955111,10.405786863414239,11.878421950068631,10.166129758625253,56.418528396756216,37.53878274824268,65.83047493420634,39.536373294074345,57.68108112185752,70.14289370504659,64.24594924007245,49.038965302088805,38.12200217958768,55.440687794697695,66.4798769312294,65.24223824271772,22.363701029509073,70.51083333833247,22.51392564245176,54.25942148951866,81.39852124762511,69.51617463222323,23.470716657736276,25.388803970644194,52.70516856591152,81.38866881612724,66.9318862910118,19.67397174397623,17.19234720503002,78.40495065253863,77.22338125404042,9.137629763181668,26.266581590263378,73.61370200437537,47.095391332329655,78.03373075516932,45.00098527320437,44.14413772236826,49.363623804518255,31.13491625516889,14.643366934299696,37.722924834461374,55.592293698055,65.57380088501587,86.88651563503419,55.53663546966011,68.5068158247098,33.15831770995868,15.002017016367846,60.60532892555386,37.11837971740545,54.008241824876876,45.22523679818794,42.68491774302879,47.1714925708786,25.758945885345824,48.848336077125154,58.871483645117735,6.324807851938656,35.748818195263354,32.39816754542771,67.72367390472058,59.08267487699908,50.52080481822689,59.80782758225107,42.6939814943589,2.605139003594747,48.29519029782381,57.566660623303264,50.46641651484327,10.828118850821546,35.453662392234236,43.65050265130426,25.971471074535682,32.69491211282039,40.361844848738805,17.93036822746584,18.62245311467983,45.897678331769896,48.98207409351926,66.69859652800628,66.80071941004275,79.92225755858935,22.830700137629222,69.6783465727553,10.374760912189629,18.48562505972557,59.35131328253262,74.38792444262977,68.1509514834609,19.18772707096448,49.93861464312012,42.781665899129635,70.47921472591241,51.8911227421233,38.54558850976831,60.345385089165624,54.428501891395754,18.44382792445713,30.190559019400318,46.95430138638199,52.54187768378232,49.703406201450164,9.567319425769316,49.14301691068721,4.633974751528789,25.32351557298179,47.371540672652564,8.957051965310615,14.88017620968631,49.81717845194985,11.94456311399182,60.79667432846938,76.86443067985677,35.70101898226174,58.37320261152646,21.803524286316254,16.23134822330629,11.78465502785135,43.68009849172552,75.06119302287387,53.22291272804382,60.607694170962404,51.42570400002586,30.634318841267753,61.00415556295209,25.750806561641294,44.23584242514303,48.71048961818633,48.51245679343606,15.221198666393203,62.73116390579691,79.5269220375655,31.65405799044416,27.030073903566965,9.108940628137578,69.01770722089125,67.88376784670646,71.12285871128788,45.388840394710975,32.05988346695553,73.64115151407681,53.524608729585175,55.87353707865064,63.392860054612655,60.57129134428773,18.5623503534494,82.36368925311612,15.80527795420412,55.98699534004428,11.898542798062785,69.83323398503144,64.48642862483314,67.77970136159679,69.62934287529968,52.544469818602536,31.375376597911416,62.423454370666065,68.70270884630048,72.66840864963882,25.941213496952933,62.566433179849234,37.09170584284941,8.021049509039601,72.5410998525193,31.422337947887065,19.921573368304166,19.251107002370567,45.95598745146131,16.11609218759342,74.3806462680422,55.22722760439133,15.27416390490254,1.6745267739695788,47.33219125704616,44.41784164746863,70.08703348682408,61.307947577684914,23.472942450907247,30.089059339213215,15.123321113419184,18.657781256928395,31.752184533997294,51.28941813955633,37.113154107372196,61.04643212337463,27.675677632992212,80.09841389587588,8.701657963482672,42.609954096402454,60.2315581610045,16.288714703649877,59.499717775079695,70.85589059265999,43.4087066455048,62.89670863893841,34.59168065565285,79.82691744737242,16.41310647917653,67.90335884874109,53.084862643020344,49.333064760174764,76.82865244520939,3.3286328119461186,45.08304803953178,21.20824892604349,59.22567000876154,56.93518212565555,16.403303808818197,27.448342952472977,18.394641205728643,8.695570050047783,19.366562880825104,10.015556114335588,30.52731659398195,23.756290176992998,35.410338341884255,32.561381649167174,77.11028652750598,45.206884425164745,42.979790121843074,58.680915015680654,59.225580210861395,45.8601239673156,74.7169704096369,42.720003166203306,66.8600353515582,26.868659266571818,41.255399370992286,49.46770602002165,34.39593264371426,47.792786217527464,33.67877860559212,66.84158026772714,46.924791090199754,63.25928456754116,45.92135397794685,13.025723909842466,29.978839582539177,46.810047252025804,55.63404677454241,82.94407329069209,78.4043478632106,72.68804127560344,80.58297777630116,24.3401199810079,56.349236948059506,39.647586795199715,62.61241070814262,54.41739914047217,48.57387730478813,51.536255442305276,50.151457063101205,55.204841287356004,45.023335509726294,28.04640442502427,66.62637834067286,72.08873773797944,49.07895656645458,30.115123502448423,71.12300753953839,57.58281892157401,59.08214907280872,79.04120615487057,24.895702225787335,43.00140818698878,70.23762886179847,47.64445643583404,79.14925006068428,47.305934461103476,79.13544620891213,20.621564303091482,12.45562121015694,51.80235626689296,44.2970701810738,50.04867919304961,27.75934197158266,18.106173894793535,60.956569693280215,62.33297096711573,33.536628746969484,58.65350482562465,23.056516282064322,19.773961771098577,70.87234805866683,59.713285607137955,29.77157490414601,48.433118458507465,38.23398428068848,60.16327897064802,11.718397007751246,33.719795218111,18.568497125439272,26.73778114272713,38.71105540220972,29.51586270644883,45.97337835860144,27.366728582238338,33.8459702107573,25.19770571980377,40.65889048275116,33.35563138297997,49.452849247277136,65.78572967477605,54.61613356824263,37.35469447288882,33.65331919257312,53.6308490961752,10.337517024469399,63.77757868805031,68.84925040727619,61.95772347261738,41.010322354248636,62.66968006832728,30.224299440673242,57.81336890229746,57.006047885797415,41.87162975412555,49.21297686668461,11.219506568748955,72.70130711848134,65.55226492044719,78.6914576104445,63.2989526725168,19.715628597702832,23.415966000255892,49.81132861057289,49.84667592829236,66.14780218879902,25.73651945092282,35.43079114472803,44.01568316424901,41.76174656183716,51.14363112304403,32.06785734933758,78.59850482909543,39.338185762758684,18.38279999760332,64.24953730031251,48.62372920431643,35.17380372304325,48.57041262398894,63.03112074383188,42.216394038442914,60.88941885789772,47.990145636501566,12.222639804420663,34.44294070400859,70.32580720350272,25.693313827779395,51.746799825741085,63.37900823229682,34.65949717955341,3.233563410546654,49.856602346838926,54.931401323598394,12.640358906729581,16.25639784236593,73.6994117946162,46.90642886975552,16.44946970314548,85.74059383460714,13.819929583695291,68.45769687581398,40.36753314624865,52.79321699623552,76.38802434900549,54.208329892170575,38.54788356644252,18.11932117321507,16.723259974766048,44.1692702062974,65.1717104531641,50.79564706451792,67.37616619023478,73.7941691402401,66.16965231505117,63.90473978436761,70.5652696569244,57.6243021999388,37.22158632072998,71.5488788683979,58.828707895250396,32.22280867134268,37.23989976403048,19.0604764379666,66.78361897539095,48.532758252125646,46.963485500493476,52.87158665283462,15.87796388367195,42.804184546777336,21.87659198526735,61.662914209247454,52.2339306621798,4.413315926755141,37.649153856886265,27.76526671422998,24.407272909711807,60.50577101845539,28.961862127494733,32.06359002057746,31.560273916762767,7.542506772781902,39.521213481372115,35.217325914973735,82.05908953010676,33.82620684403595,50.4499997906228,45.306990294595515,45.160462568353466,27.348064661083917,69.36998632256949,49.945549416798144,70.22808584459345,7.712984859015626,43.86186273795457,32.30216156883712,14.142465457998886,46.09091033527295,22.353106936538435,15.768326159640731,56.769413625403246,32.20135805531446,28.997856042312762,17.520343121225576,55.471079474127656,70.0163107971038,55.51702693905534,69.42068938881982,14.66797504383343,17.5738626010886,48.732571855063014,47.70633558328571,72.60599993664732,60.71999140191215,33.848616232462724,24.23894427029665,72.73313274897787,74.60356645531748,48.42648565721527,58.00285400909184,66.7428865411768,41.957449692343,40.73300746196409,12.625508223759953,38.600499531215206,49.61976708089505,39.19223999473569,12.337591788554487,47.57752502981865,57.12449113100098,65.42549321313334,56.13034155577317,65.38749717259314,28.667538646883216,65.55646766757374,83.9168376431393,84.04004412014177,47.03873485259729,45.22107225217924,49.7402431969702,24.162335765557494,2.2437684514180063,25.648626209263924,69.5923997187032,48.4915944185162,16.676867828243314,32.009759530615696,41.287607675254606,16.43471804133459,71.59934008135882,44.17833303532529,30.921607677285124,54.06668938485345,75.72770244286694,69.73647767504897,30.32138527458048,32.31267067660217,66.43954672490413,19.414210038568843,61.39413218228292,47.453022466089834,55.55762890466793,74.60580278210642,66.00296863462086,11.357440856007376,1.3345367418907472,72.57418086216627,38.3789055397389,37.45528825749795,39.54108781180546,35.64254187791096,61.84360205857436,77.80859898461252,55.13964787070464,57.690736213104074,66.31967315592146,46.53019158157501,48.86445886180711,39.416353523493555,25.224631245736447,32.794485723606904,82.85517182533442,84.47240521400497,62.14889625257179,63.598477865276266,29.056685842640825,36.89466815778784,36.31225171449584,23.53789567715615,76.36638116533078,38.284547821801326,18.210613816232808,43.02489632388394,33.62301793856536,25.675338882685494,68.42780863423167,13.029786278677927,19.66723105935247,72.62247813467431,71.86617589037704,14.034974208734795,29.92009868087161,39.05690876852839,36.52907109634526,81.38056859061064,82.74233574969824,26.921112403014895,36.800062657297424,51.71349397967936,12.278297445544275,75.20772763072347,41.29314405362594,36.56003173547582,63.674513964834446,50.47946895465917,34.14020044298745,45.940512380708384,48.36811085115821,66.96842923861378,52.611830428506686,65.96175511425184,60.29054716523769,13.92199465963345,69.61922291381933,67.72267871762854,20.950158459883383,44.22454734247876,65.45668652543829,29.412125885537712,7.784451758551948,51.980376174730736,23.35501990968529,31.928624624109233,37.25487455752035,39.042947174270935,81.23767306853568,52.74706591852891,49.40860950569654,17.429067493049462,22.45266981975181,16.755370919869975,52.460561982195316,41.240520862451774,51.74499512805017,58.670542232365335,55.5257662132208,52.601410000326226,58.069739802917404,44.19540718813775,52.47526353301757,26.211525573767894,82.79712256900278,53.559078115842055,23.865512374646535,74.31517918081363,26.393423617844224,41.94165347507195,61.86354007433792,16.051511172759675,70.30330763006509,50.54211103708147,34.66430060887953,57.45743990686536,31.17271548254427,1.5929277844440466,53.217190593938156,26.621606378396507,39.25778442114579,12.281792141621096,74.16484387579526,24.244558842739515,60.647029637850466,36.38345823153317,68.36190650402204,7.445956378902093,53.56704651667686,30.43116059890179,37.746777900866824,22.89007943092267,44.561472072292865,29.374524528489157,80.88093462902323,14.675715345006427,67.13929185162966,12.332599751798714,15.073287901906669,13.85146007296118,67.92883521906143,29.84970865942387,22.303849373153888,38.101415792265044,19.38478223971067,21.092413163945626,39.80194213936035,52.92714801851667,54.336386873591934,64.77092349648319,8.244828285908437,0.8973019734982182,48.66912812006351,63.850827394396646,61.67568104319243,4.837568523124311,27.68315662752352,38.90740977354858,13.732479153440728,26.38154678156128,1.4271405768475207,53.17821933232405,20.980167545113723,82.38731333267596,33.14035663435139,49.66873082989221,71.4165339841255,77.2415369448193,62.274947236345156,51.84597876365481,60.19667675371686,29.697142892565488,46.8835605050109,15.916982366130416,40.13319434687887,15.827617964778497,52.358555322969266,4.818111354649295,19.394836725543612,68.82217523762564,55.21985102849849,17.708169932687788,86.08161689673074,45.29641767432858,30.77458224531189,62.28736908614691,65.19006381013585,33.92144264267404,62.95374413843548,47.31668473864539,45.29073536270606,38.17529457022846,74.90687350125835,69.45233458477838,84.58419072183865,20.070532652781484,30.883859248851635,36.221728868144076,74.22740484384859,39.90412155683937,42.38593729668963,34.64592789530687,65.89287171795742,21.411347912332566,33.67439599479749,80.07044465304605,30.26167145445202,78.37189746656537,38.58251128066702,73.06432695552897,49.50434039619239,50.11408106607297,22.520438561835803,43.28616621078336,28.181938548367537,56.65818091637845,54.16936925692147,23.295711387185612,26.003602205385818,57.85531489996684,59.1922497008946,29.86654214025435,44.253095816732184,77.3205329918749,56.57421957266767,55.70365179123609,48.54347066157637,22.52626024987176,62.33423170496578,47.47017372552554,60.46169480937118,15.471199002927111,56.03431992589424,61.14206156922216,28.37595029015114,67.57515947193406,7.357878915706439,56.155290463518384,43.03899165501612,18.751629963621546,45.29800974241072,57.73449223805441],"b":[54.42194344980881,97.61630767619425,53.90366603731867,44.34610099719998,84.27058579077037,77.8350116029556,35.205217857588345,81.8561506243607,57.20471902244715,13.445358001832272,34.13205402955228,61.758082808038154,12.968038524590696,18.805716410299908,20.234235084386498,87.9448540431711,40.99257200971104,47.803354431216704,44.095910748697214,39.77794083563788,31.2886780415447,39.80371901181761,8.24158854634355,70.3199789941877,82.71147355074415,37.60269295231626,47.127454664281935,37.7876677949133,80.53367306618244,82.77073576335783,16.72033814695694,44.689739126674986,85.22795783816545,55.41767121044003,43.52778612199993,18.744504315069626,62.57077920313921,48.90083607063418,23.62181739616481,37.44821141084132,24.978266232424478,22.591137329179674,24.041463297341906,77.06915363174888,55.170436552569534,56.249544117511306,62.27526123755048,9.379764874694292,46.71265377297624,71.09152134771257,24.74910471413842,25.325351232383994,20.585693363509083,7.057453215939353,3.8328216874548104,32.268890544616696,58.29461140043161,48.71484695769617,30.69969469850466,82.9969351673625,82.41439794978162,50.354127070754174,40.903540196285995,71.51713038171562,55.704044773847905,67.2482401026968,51.813220033954295,23.995621345547168,87.46650024206109,50.59375687839298,93.93382483331519,56.69615337305354,18.76863469010276,84.92790695253134,74.85260584550974,78.03298414772482,13.86522962541858,42.45462316522057,75.80404426187981,12.776103674098263,78.10055719567572,26.10362485403824,84.6196455681579,37.09770992363941,76.87350061524747,90.6005676761599,52.29865349959656,10.743801727880097,59.491602309399234,27.122138989540463,26.932121210794886,46.52907274379726,60.55320755776586,21.34318350208006,65.70219486585007,15.29387180966259,63.199681868446866,67.5589100425038,83.40879843571119,74.40365993789574,84.66887925190146,64.97089698611306,70.2869197983987,32.78357125174614,38.70860221904985,51.9788610720839,96.04932797698486,62.379731948538875,66.50579834685354,84.1308690868631,52.1227981271206,20.710261987350428,16.460232671992067,57.68825010264157,86.49188032052034,41.90459385991194,22.613920864869648,11.929826880615213,41.582741535418506,91.38884009636544,90.70350929415123,54.32611061390108,32.668703783336554,59.1668067320297,81.87273217859817,96.68861674686868,13.893266221683419,10.51863907213406,36.24636438791846,29.24556964205162,79.7498874145005,63.01729341811344,72.96995235357775,57.28814723083927,28.76341235289238,29.779858971691716,48.848745318730224,83.02516118839058,48.66772307705758,16.452652392809604,76.98523656197267,37.93740829933441,88.86749908806955,69.56648514452688,33.03339961390533,61.531887140444496,47.00615273718905,65.39625920614527,44.17132163132859,17.56247621651991,85.73564098383332,42.619918462277354,72.47566143711249,69.47355417163365,15.421897834716574,21.286591156610392,51.2540797261683,2.7089116900442756,16.70340901466168,71.08029146218203,18.862745390042356,81.29512360361815,22.951037901188176,39.27709674770429,63.62280260579095,85.09057737232075,44.38327557518945,70.19807579662633,63.142156487258475,29.572006818155675,57.89786224991983,56.39327730632053,21.430044992933567,97.2482600218749,40.14085753132346,13.18461170192251,70.67378833108219,93.02818954798416,87.24823650813185,95.45939987526955,68.8352128182636,62.69777007671574,79.2861090470171,83.16756445559952,40.74078358116867,37.892395173871044,77.52539393171013,26.99550854388032,53.32052774642675,19.9813897940947,50.0829889747177,25.364344208839626,81.32507251549447,34.908716847973,33.86522761010166,54.74796203500355,78.05861932200055,19.6452165068467,58.40628471313174,71.39030206705404,90.95118921502458,25.155760268799238,55.937524029495414,88.78906121438727,30.908729155423686,53.402981314343556,48.21665013763,28.043302305578006,68.42047481074519,36.48697880045718,58.017674887027354,28.451664029107334,71.85831562001489,91.1953425837549,34.44311798336804,32.591632742464945,56.29174743227454,5.045527063722237,68.68199069239913,32.14105692177895,81.73519569238482,50.02841323967177,57.169298224105944,58.380757062715496,62.104029539847545,88.57852719446021,70.92474393490201,12.79049363839491,96.09198072034648,11.918967954019163,30.457585564678848,73.31831131419328,64.58797656815325,72.89688303016757,32.73719832483921,36.721071900279405,42.84325395838032,22.27236724437826,93.94067454619679,23.1196517078301,46.51907484262,68.7225654146492,50.257501621529556,67.65893685524361,82.5710429378126,27.10717865999947,37.176582954036945,60.480143922178186,87.14425395129658,91.2307413850764,45.82451086272393,49.0643743654806,48.92476425772938,73.94949543132675,20.87538218607431,68.55205323044136,32.39841240140245,40.456047104052764,56.45348073601659,75.95437727669702,48.52201320500813,78.1099850174342,56.49044963489125,93.04239205343242,38.12876014240485,58.761680357252686,85.01351317192058,81.54705382662685,49.45779515347714,64.7845258092254,52.41582625591874,33.095767533653685,65.85184497420278,31.59048908893649,78.31703754651141,43.596226054067714,27.25286135044348,84.94660535884606,86.35997813001802,66.9453650612178,45.276460790222124,89.93556716616,84.95333852452927,66.50627801929036,32.303226147462944,93.76248978637025,46.38137623821139,77.1015879982615,44.979644284003776,91.9754025466582,11.104215751968557,12.094824210416695,10.523904274479845,64.96718739637771,42.12636684975543,75.25666012438055,43.70879602224954,64.47440700172481,81.39448690655551,73.61567551841435,57.42493921875657,41.568702501253725,62.529979734000364,77.42107864691587,73.74476781356381,23.67627240673395,79.99354720097718,23.57519997100486,61.69289072164757,93.43688802432372,80.60236352573828,25.642936688762,29.293886859400367,59.23926794706889,93.21188112784789,77.76292486090365,20.54597845468338,18.914808635874266,88.86074854430183,87.57326611342438,10.073507334339018,28.684797003415,85.3531752826888,52.72498077458522,89.56247772755528,52.542173523708314,49.129003451551924,56.70340318074776,36.014561850330324,16.55629109007744,41.307137495268584,62.260700347925244,77.25525338255053,98.90148688286507,65.29833185464805,77.52963459578565,37.26735209515304,15.841860484481858,68.73420081188382,41.58205631643793,60.89236997465599,51.606116842568014,49.59002814349234,53.94273220468193,27.166059893102837,54.418167347606776,66.11265299284253,6.770437147067163,38.64519859769014,36.4322617961259,76.4930754938107,67.07023448328141,57.79898739828673,67.63315789549355,48.02026017815753,2.700384568679328,56.50686640029618,66.12528869386587,58.33567757009633,12.56176226924049,40.28172516891466,50.01262776476213,29.75981992058994,35.627682305243994,44.08752739851255,18.57856549709218,21.413857113857283,52.504940112673054,55.63314507914975,77.9845834453451,77.46859059821739,90.85070271632866,26.125069156436545,80.22076980048264,11.003621914966848,21.63319295265166,67.54234810421252,85.72733123175871,79.80654554991436,19.70434149760846,55.72910546109533,47.50996830187454,79.8798814641755,59.210791498970266,42.50846425747361,69.98223491794909,63.9933767073876,18.75657884485479,34.25513302837552,52.187662461216206,58.815393751222985,56.1912048680519,10.570711268809966,56.4186422651224,4.72318465570031,29.570706124612066,53.325889813796955,9.10324844440451,17.25392566808381,55.93719228097066,12.91924240094447,69.68961710947114,87.97750399735038,38.961379320110154,68.48182125257607,22.81595031940141,18.407893553536812,12.159567074627882,49.61812762993444,86.68395878610369,62.65522475865775,70.21368531726935,58.3268841141181,33.08681886593149,69.82409737163715,27.25633045403688,48.93604727516338,55.672207211400384,55.227257256523444,16.784829094610778,72.97131966461262,90.91443107846037,34.38665713768397,30.0533135997355,9.697454365321843,79.28514977672752,76.5975366458994,80.30008020358572,52.752053262145445,36.5672925441531,84.60917811878814,60.40782721749858,62.55845013696954,74.67059638973514,69.16889933184372,20.43545589618617,93.8917729410432,16.639263151301847,65.77106131782455,12.97549451292614,79.31816466172972,75.59615192448426,78.37570600057006,79.66681132734497,61.055359325058014,36.9763563636768,71.56738529187234,80.3351510563597,84.68625629082727,30.36253792260738,70.7614736163774,40.25388180687113,8.638763822574509,83.92570248796736,34.90499665744997,23.001251528095608,22.676672722250146,52.93828203505643,17.157019637293963,85.42886081747154,64.24302441818979,16.18053338861923,1.8069126138203995,52.33153746541027,51.77479437674932,80.15145675567408,69.57040069477941,26.396852460168393,32.379357808854216,17.260366052731474,19.795646892099445,36.0746942642904,59.86261208136119,41.797595139984004,69.75300643779612,29.75700683192013,91.42095946525617,9.049949423045817,49.76362082342442,70.06830448553974,16.943561014789307,70.12049390370801,80.07972581314883,49.55828797176493,70.79448461415296,38.490567824215255,91.11143086772292,18.15991032799218,79.97268808011813,62.05177553177857,58.00401799177078,88.90258199801855,3.450623960232937,52.35455293382535,22.586429400572786,67.31221530641363,66.87735354965754,16.747707849629304,29.91120165820528,20.50572504709261,10.00897376915681,19.40996314979983,10.693533214343738,34.011001821854826,27.704364079741694,39.34972835929047,35.46202107256349,88.35334332268947,51.80184951402486,47.29513601443131,66.24437357387127,69.18441982910889,52.20019011764836,84.87664758876102,49.06029182640274,77.16894945353566,31.192562281431286,46.9486644674896,58.28510907126229,37.2476998722495,54.14037861887529,39.62456360797301,78.79103512857772,53.18081708255459,72.81002609231898,52.59167539884517,13.632890503532895,31.877352009409616,54.283450825981376,63.741390736658516,94.21708426211265,90.34899140911305,82.14587260488533,92.3764111085764,28.295808692627276,63.05074792922431,45.146443916112084,70.62262649420958,63.241037152266884,55.85373952717554,58.81036187781416,56.866769643230896,64.85227580008171,51.480973522151764,30.256450251540564,75.91508511594739,84.08031670130856,57.44132114476142,33.31008494745838,82.72559191881493,65.23559286908767,67.52577231032956,91.14721729626027,28.214131354301394,49.88991597782271,80.0782422566167,52.8057022489006,90.03528899941813,53.017880746284284,89.72362328668873,22.906121021472647,12.966042244739713,60.8051899637355,50.298313502743085,57.33076786996675,32.38903186205403,19.97749810429323,68.83444375459732,71.99162573262427,38.31611029655902,66.05889915605663,24.211392511412626,21.447987864744718,82.45069886754855,67.5523187950483,33.68929581630935,56.48299155575535,42.08824846872143,69.67186092304725,12.8004660300389,38.921472656928394,19.70045213472908,29.828002778444578,43.85100622486647,32.29626730295267,53.50416867670657,29.031146645089198,37.34538125473526,27.05892255737808,46.37915557192838,37.20733126861349,58.22284034065834,74.52476000675597,63.34521004948393,42.010499813871675,39.17233189308899,61.16992764759959,11.737877784388523,72.10424755415099,80.75366157322173,71.65988245500463,48.209241710910675,72.51526029311552,35.47851402933525,66.13934404794145,65.41322709649502,47.23562302446119,56.0653927655557,11.92358306654651,82.93660233044642,74.08746354176176,89.99354388134141,73.88611667785906,22.272814726157065,26.336229319157162,57.33693153384393,58.35495264042982,76.85771925260411,27.936023364074266,41.61566630679732,49.50090618411042,48.709858771800995,59.20943136498001,36.40999219522729,90.55799156421904,43.74139314248623,19.510758166156926,75.515718739079,55.99683110363058,39.98585280957825,53.68824391567432,72.68599256798137,48.56474519166318,70.46290698580832,56.528380089459326,13.452719218911566,37.15745645114298,82.089289296477,29.539067091067125,58.495760193862814,72.99948437246113,38.604943670578535,3.7005578594930633,56.45866074825743,61.78639351776563,14.29125912462891,18.28420223118888,85.75107255755199,55.23077410250576,19.0856116386487,97.62263910389824,15.109519693170018,79.605553309247,47.03435729138472,61.83945097728547,87.42387593334284,60.5183037230101,43.896884411139,21.291469239534745,17.991022349349414,51.255778829934435,74.99832695589045,59.40337226665311,77.98482814687493,83.86018350057624,75.48426203287983,74.20745980474739,81.05545171289468,65.9968246895504,41.786704900786646,80.78782697262987,67.5031374688688,36.05770647903623,43.400836766161724,21.609488438571475,77.85196673394684,54.993009973059614,53.484433361295444,59.90514211513198,17.831691404597258,47.439866636052784,23.362741104883508,72.1709910621559,60.46569930010053,4.981992016455896,43.79063436904817,29.247814111021373,25.62057173313349,69.74161244818124,31.841589936312687,36.05132618635529,35.4241705218974,8.537813649201297,45.211975756203316,40.55971086476877,93.79095770990567,37.062157469778185,57.95480304652828,51.820337655311675,49.87522894779069,29.525711141567697,79.95158032527567,55.69133506778037,79.78339995481423,8.47647176240252,51.54113673949151,34.98033014134653,14.313958919038253,53.608926689002516,24.048977266375793,16.439140233419725,65.92872474276268,35.56185284122615,34.01011144856578,19.13482474484843,65.22072643285568,81.29622719817252,64.92235188208068,80.3320127930118,16.46002153926315,19.97901113109366,54.185098090401425,53.7792560557111,83.797990991422,68.08887489045493,38.403422656013724,28.21102115053356,83.01679003727413,84.9517741410977,56.27707717876798,68.15782449171151,76.7385686050585,47.90870522268199,45.908645820946255,12.748898619354057,42.6204421708615,55.18430856319837,44.18290659289414,12.747927840156397,55.749181667473266,65.97947884987988,75.8671924331769,65.20592821103435,75.33361211791863,31.5166811287977,76.6514992723003,95.65429729915185,96.09316035788163,53.85745160454722,50.137716483720936,56.53599134243215,25.9412613361916,2.480929969660166,28.614214488565175,80.41912815661189,53.95209070121831,18.25887918412021,36.72074604556981,45.8457341836934,17.954206830947314,83.57707785991103,48.920166385402595,35.4196267973911,60.76222275845116,87.81814492098223,80.35461884946436,33.314622922940174,36.69556557972779,74.89116606020175,22.86964294848667,70.6506784998617,54.465020414915514,64.52651104327359,85.19886357694769,76.12615316707493,13.163125367336912,1.5372116586111284,82.483878114851,43.00480921590503,42.354592162167904,44.405897870633055,41.25970645702463,71.5389561460902,89.38554559502523,63.46540167455615,67.0900455108881,76.29229603036156,53.27520432045099,54.16903592651537,43.071349288739846,28.185670865536075,36.66181091304003,94.5656381087967,96.50379002158077,70.13840202638744,73.5612558365793,33.09557277078013,42.88197041626402,40.846431989118656,26.96986129896281,87.96692903311482,44.978179234684006,18.46233781430387,48.965645575950234,38.8484831505785,30.11632514434976,80.38200799083226,15.057690588542725,20.918638030811437,84.25937536648495,83.41912862161469,14.673332901133316,32.695460824243916,43.275437505836145,40.891703394975565,92.84954155803838,94.0651463792839,31.679824158140484,41.003309632451824,59.56989367593345,12.816628771339618,87.08366316606129,45.45547639183137,40.92009998774829,73.23654725666616,56.908393600952586,38.595762582445495,52.8031635855375,56.91118046103189,78.83405430355273,59.115173980766635,75.91008179297647,70.24979504119666,14.10941133925386,80.86181983995927,79.37039677246293,21.766758875141008,51.22698759287374,75.28684243462718,31.538378547368296,9.131996587560373,59.11060652808275,25.95013933177426,37.344702645424,43.44053614227555,43.09903524013964,93.17187868875651,58.84666983291891,55.88711733724648,18.05284111469345,23.6748659993185,19.051845119365964,61.79761028820493,46.91346689243505,57.52880604557172,67.43230094435089,62.78079010660626,58.82049922152392,67.699544758082,48.69889048902958,58.88336350193927,28.082161121354574,94.74477306209626,60.6855298986097,26.532799413317637,86.01750524461164,29.342308244410237,48.18129367241751,69.38491532476513,18.70463846304975,81.77966884582065,58.13235455345044,38.984962709208254,64.63776641954892,33.28243468164348,1.7020574262597554,59.94502719359103,30.3096074801543,44.12256738871196,12.8064156418825,86.24101732103796,27.74977199286605,69.1945536545287,39.93093817664938,78.06854043644498,8.369505428915494,62.10953673644824,35.541145642348745,41.61596199600114,25.7200109998777,51.41380608390481,34.51800956632809,92.22274308705055,14.88742026160146,76.07031764173462,13.235591800079213,17.011165168638733,14.902390940699192,78.57279569016822,33.98961764586493,23.989665112389794,41.71300919453042,20.53297792484265,24.563460287919185,44.32698645810347,59.480505863480296,61.491397921387865,74.00523488966195,8.598125063546469,0.9915693504640766,56.65726675268229,73.23759411188935,72.11904525534673,4.881216035620408,31.701646553615124,43.97675975790024,14.8154165208561,29.497975695240214,1.4896253098761525,59.98958109015028,23.004106513109353,93.91591319100469,38.80550852216118,57.836873383552415,81.52798603723168,88.33965465368692,70.99529524831712,59.75225868923515,67.50349338966704,33.63728142901647,54.61616776532146,17.384555452183662,45.768094079345744,16.30559572123122,59.099277151963435,5.289689700914546,22.448646109979652,77.79722201261913,61.942298844651035,19.05935418342017,97.92469848095885,52.409495107195546,36.16925686181063,73.41173799710673,74.5958106853967,37.5971482473809,73.98421319180714,53.39296571008437,51.35797433050027,44.296443219994465,84.83314186998479,80.07795284493764,96.63204819883484,22.354115007781125,34.940763988335206,40.62470878454679,86.14928021740407,44.25553219868832,47.00143068491914,40.28437753857081,74.88148630498804,23.60014515458947,36.18657165934782,90.99015395778261,32.914970229567416,89.49578721078817,43.14142542741068,83.9085083474944,57.13635213186028,58.57449192547203,23.010937454477965,49.46546421091339,31.387757833482382,64.34912053021763,61.040280498410716,25.53930828572163,28.97517037531104,65.12952661384101,67.07155459338169,32.79824325290022,49.77335453774114,89.37389693873274,66.5221664764894,62.17226745110379,54.21801647049531,25.796366759795582,72.78489686068335,55.91699094053218,70.93091517033612,16.77653494733262,65.39345514968717,69.99037789129031,30.280955226800423,76.54130107188575,8.410124752724663,64.1784097525694,48.000263104367264,21.042454828060386,53.11456627305465,67.49940490691685],"a":[4.895365799928273,18.980911595644983,1.7758211805554724,5.714145974964171,14.004999948754243,9.146077047868078,11.358293741535839,10.42866866191825,4.0652613515107605,9.351988344269259,8.170980821305776,2.8365622553855196,1.8266150569444095,4.030898323050236,2.4352544377739616,15.047089768800577,18.671748421213202,9.119232697139527,5.950030495595775,9.723640095637812,4.513095526190201,16.708253609849095,4.416072649620411,3.661769301801736,11.899900314913223,14.940859918446092,7.238220004265905,18.376137713765694,5.10134151885111,10.175781999974882,14.618745638931694,19.054984782703418,13.163270930275672,2.2639483707718266,4.671875190904751,11.626468680529399,15.04052965902211,6.344302035523812,15.064428823301089,3.0621258967783094,2.2507989625858826,14.932295909877702,19.006017179599276,2.004727825945194,1.76345234114482,1.8126663495397688,16.663103628150736,9.296080785538372,19.096673164969765,8.600621942317833,2.2434849704122595,11.545048822959254,5.097033462181528,1.1815817581201449,2.3393100656860177,0.3574334711426319,12.686597635912094,14.793059841012948,6.095040875860742,18.76091902168499,13.55314081712898,8.896427547961974,12.677206053798526,12.704902752773833,2.155337349212827,14.400602674502586,18.745952266048644,13.743787568768063,12.468081564392355,10.036334111879754,18.848436387784204,17.912935284606313,3.0423355477899783,10.59289657729102,13.871969908666028,14.035678505546088,2.328989860796744,19.898118815255085,9.559594296715431,10.601040393799579,12.431387709958104,3.7483696741655947,15.626392376269296,1.113599661696476,12.749312500162082,11.239748487908852,6.734780680245769,0.2567787929053589,12.947957827602261,18.058295991415257,11.417461391734705,15.156741091943346,8.371227529507577,1.1436748939094787,16.2162557861441,3.955698861805801,8.925699982239955,9.0356887128908,8.507600791341435,0.7264726786021125,10.451282397191024,1.7176734844811525,7.811585123670692,3.745714917339331,16.577024851467286,18.226496569920524,16.892061628140056,13.663991541807224,11.581437129890993,15.72176609012855,18.775516073600826,17.806928100687166,3.349276322882422,15.74999853642911,18.13758525524929,12.046148297265699,17.958564629224092,6.1791810366298705,17.96007270132722,17.914253720045625,19.36006654466901,18.152860520901694,6.280564555575534,6.054556024614737,18.670001474374555,19.828770142004203,9.247251183255344,1.074512511725172,11.76688095821433,2.7595294911437396,9.616168632794718,3.130358715288435,3.309318350142747,11.494300330435049,12.752440668281588,19.45980461120437,0.3304227571158558,6.8040227652284635,12.446415413566347,1.951267507909007,6.0708951579567705,8.913878644858446,13.630002643237503,13.835393156086212,17.71930800019163,5.212050662027368,18.42845078406921,2.3866646015018933,0.1666924531460623,14.084772266707004,13.65484727671019,11.389239603984276,10.874058678056082,19.627417884614864,8.479100550138213,5.185258477502104,1.4303351497626249,0.313107899916365,8.715504689619893,9.46256183489317,18.171876970171134,10.689171930907001,16.250824827991437,18.411242546688268,9.725540317525482,12.19131785869299,3.635154926205151,9.463316014517137,18.825135102784575,11.775293573940694,8.779556033499972,9.696231770953307,16.454453132212596,17.59180045515738,7.818527350097257,6.1174244418719725,2.0660725323713525,19.700878249052845,13.34826919526372,18.775452834362735,11.768052167987499,9.824186209367012,14.801243887511122,10.98172187461747,18.33664927968239,6.622372488237187,16.905736885893216,4.259850063045745,8.253363286151231,8.67004269894883,0.6285007836077527,9.155020997864941,9.060461596450837,16.33081506542247,13.971401860656467,18.774135193918028,17.262969933182543,5.366206985605508,14.847943476334592,0.04144398148820283,12.527412906877258,14.51727145820215,5.649402336925768,15.767369773133959,12.705777523483416,0.5629449576972201,11.399332389716296,13.890732261244167,3.2282734573915794,0.5151017477665487,14.216651224828896,10.448422763339543,2.489798333217985,13.482469721177388,18.35611247791297,8.168231323623655,2.6927680200599946,5.037417523140655,3.432329687973268,14.863786885298227,2.0826694857990224,16.08975256272425,16.448752403521667,6.601342393094747,13.896005021699548,16.98220744260972,15.84223244358251,8.488858179187918,17.622423701386467,7.714192259445958,5.04656555160413,11.287054867988417,15.896983369035675,12.532676851887157,8.331877699431619,4.413990569880042,8.594721848877365,3.498530059717604,19.563175431286975,15.706382802946933,18.46651648961015,12.658499048931716,9.682729311493357,9.794181307016947,11.40430427531841,14.769535215458776,1.8614932427416164,13.480808301409741,19.671014810126685,16.824909790727588,4.361484237255984,4.95287362366605,7.790317801950666,2.1310752749699313,10.999941910579807,4.542423985112944,7.4773082898005505,2.1184314310018015,8.942516872635027,17.013687291188887,13.484287960206354,4.465692795966247,6.277127050391456,14.949596156623507,12.033428755795953,13.588216021475631,17.202933893330403,18.857374450211918,16.45185254285758,2.4179195553814115,14.430252043668524,7.978635756335124,4.89877260985522,4.894553473340388,15.741719326515211,1.4583711888999495,16.741373454981584,9.535789683852634,19.999040181178266,1.3775627913918242,15.441739002761574,17.81431067620098,7.853249744348831,4.5566536355904175,12.721907903397923,17.673501170124744,9.845488088113981,10.169987334894701,7.0814368334033295,19.128861091746803,6.499676230093665,10.668146739417113,8.165200439101463,8.608352777916206,11.881752614132296,13.112549306585484,16.201220564397303,19.687975610589945,7.215989382426367,11.843781965904473,2.1386402676419225,18.845604829820658,15.792329771960457,5.288902354832641,17.690051168168218,15.022869203118216,17.476759206199482,16.578525478503593,12.686179480326029,14.071420028187864,7.514328732643358,11.322118711473568,3.5488055889300085,16.161841836196395,15.26486424897528,6.357022305457258,14.797090588515292,7.559118939756124,19.92869917702301,19.339470715109112,3.903537370825445,12.742202668132547,7.958225615190191,15.610726906233854,13.556785606304697,2.8253019704442295,16.26522642655445,8.314362043508702,3.8444707159682867,3.9449357724876988,17.677460770910578,18.2978252858452,0.24281793026261322,19.690258837384135,0.942292833612326,18.04480183617628,10.177677636621642,10.305015567995133,15.142901135921045,12.154328383167181,15.507305498125188,9.53882147409201,4.066633760914344,9.301909041611456,17.889364489062352,17.697881810459045,18.373719233668822,3.83253217900128,19.550200879363594,9.836645955038712,18.67894887064252,14.410565770855083,9.816036110754712,16.043019959427305,12.905646355646292,2.0724581241947027,2.3696624926301357,9.70073087595344,6.4559169664573135,1.1323529653504094,8.451704627619208,8.06897822777521,4.784332408307037,16.292777233457443,19.525180640631163,14.305188500697001,3.0109384397213956,8.945175475050835,11.78455903408777,3.5793381070315844,7.1384033662777435,18.80262671876844,4.406247676790911,10.717624664430305,6.857723329575807,0.8821888085332175,13.541226186779989,10.969904139594364,2.964587249757904,16.298452102087065,17.554075390948153,16.337639033135044,17.90400641424086,10.954333854873855,16.382371394449812,6.44927310868709,0.9349253263417445,16.69470254352568,7.458572962466574,17.685627542250014,17.455918009261072,13.419025967820648,3.955639250854275,8.452550026017551,4.135049576765217,1.5702080461389967,14.0705892431234,8.139417370148418,1.6044825030902388,15.589712370056766,6.49346395524478,11.061019163511308,14.712227977896175,17.466767231181816,1.838624204098962,16.141318501171472,4.058560130425906,9.687880457851739,10.470420115254093,10.058427987882634,0.4707214550831784,6.8841658704076325,12.829400972076638,16.918196009654686,11.676773708107643,17.330847162514527,17.948957039499934,9.775617990359171,10.958521211271592,6.4762662296970674,5.46093646837861,15.83987976223106,16.37142183298223,10.121969273581598,5.817553624617453,11.594872625123758,19.15018090519563,19.797314990432895,4.208521899549118,6.851249039461016,12.300153097064745,15.028759878372666,18.486753101297637,0.319744752077713,12.48735820282143,8.0866131700113,17.890453662261088,11.141040120115676,1.2675460457510068,5.875463549854647,16.786761853490507,2.352961603098249,8.519314127787872,13.49268688257622,4.945528043735172,0.05071781216862803,11.284095178917944,3.6458262447645273,5.456065016430087,1.214025610786722,16.733943839561483,19.4065708779096,4.566352133266074,8.870312261672453,11.944835741744821,2.6978247457828797,0.09290936358621771,6.9060346718570464,10.294486228242622,12.591179884340615,4.804485390604558,10.205101705325852,0.934131086997434,19.37229483213867,3.2725342931820256,13.799627005016468,15.098438625671434,7.120360011644071,17.28008286021864,3.1714472746805233,12.29402808223988,7.577638639885902,3.3420256900254763,10.914431190106807,12.35308185295166,16.035405804888008,16.774693514894498,6.753764633196213,2.6015665174013503,5.217482934137636,12.626348812074145,0.10079076903273698,19.269649781049758,9.01587810902277,18.726733396039794,12.78633314380755,16.715899868591663,6.643738115408642,0.4030935814886627,2.9355140739227936,0.838932896486031,9.302658911619147,2.646371626443811,4.415625695884269,13.5004844071149,13.999962579377598,1.3314948297657159,14.477151686509156,13.674287015668853,6.587960274114026,1.3500831763965415,19.123837737422093,6.2238264151656075,11.044073368028563,1.6758554965440542,13.378470118852412,16.33894486163724,14.231123854844068,8.32315340811494,18.84530949864608,16.38068032753571,3.5286725286908505,10.401968940206206,17.896836376199335,7.26060370580881,9.205262400981793,2.6863211351273275,9.414615439828262,0.1545227007927341,18.446823897376476,12.292539046750036,0.42572392552100435,0.011737660604391742,11.93664834362908,9.844751409768332,8.616176805553035,9.630016878421799,19.361009049440963,5.0134640268553055,10.292018434392741,19.89738557972003,11.60141354809458,19.793127951027625,14.625718422509394,2.2170978784349415,18.869625592025706,8.894070405626827,17.813592145649597,5.069345491396202,7.859714843902519,10.854283431582562,12.594657358536804,1.249532233023971,8.907635085761697,15.686257752182735,14.677329698371398,5.023307217316808,2.310671728409357,12.246628831165797,6.233111144070644,14.783069110742675,11.859408071785719,11.33578958145224,6.336688534873232,4.475977795380057,15.201926230052258,18.779102379058447,18.266784930487812,15.360672048371065,19.91883625941133,7.844699777106698,9.600984090576796,1.4521130144353833,10.733853172054806,9.322064816363142,1.8668263461488932,7.640399192594196,16.89790009476754,8.314910286352092,6.806371725020313,17.237277616141643,16.59762777737477,10.411618328543861,6.117983008700056,15.87184177220398,7.860895715231755,3.412508032259556,16.678200184092727,6.98453209930034,5.666698140178008,4.628318780294403,12.237800370642095,9.455065910860707,9.964798063567386,13.965864507179848,3.8558476823622634,18.05812007515055,14.274777046718068,14.788458623491994,8.667103406907852,11.8141886875399,0.4048272863142177,16.910862291619328,5.79693519140819,11.316122691118204,2.7870784797367065,11.46696472977462,2.505704588807842,17.208929637266177,2.2713241491417513,7.696356297908542,0.7488499147563044,7.606199394066486,0.8389979291584782,11.248599629249894,9.987127779110443,11.872367848325137,10.889397981053062,7.281810491470702,15.458263312851752,17.81736930175432,15.482160164519087,4.08800854393621,5.414026686002793,7.083778444744793,7.72280953229699,2.2623467558467336,6.250335731614958,13.435330648474103,0.8405743993616177,13.338418355851577,2.9029659048374334,6.033944786214369,7.78355386362553,11.712556852604127,14.712321270998366,12.074456416271948,1.2410451888607144,7.388104215950375,8.261405892704786,19.94786342020077,9.03421695922479,6.71190338804204,7.347670532160082,0.23827149006345305,5.343161650650119,19.26143976961082,4.536056462587408,4.1851288700387235,14.0018177813318,9.574469553367022,12.593756852444887,0.621798615841449,12.933200485607511,16.59341396401084,3.407351794100224,4.915474785945952,6.297961157720255,0.35077522779080716,1.7062908141316324,19.287753563288828,6.607625336557148,6.11096227338721,3.081915225006062,2.2002485151829676,14.667700450954971,18.918472498621504,8.632469958111027,0.3784151262640245,9.633031931458662,4.536478462526539,10.21428838788577,2.6551312700500462,8.04499024201526,17.49786414424658,14.07573601191396,6.284608539466365,11.896717502516307,10.79920710388437,11.690199346117648,19.878116072006407,10.315133856758699,10.775335134937624,2.7835622189784948,4.804590057559346,4.881553380028936,12.402440112936493,10.49371141779285,13.534946614651137,4.9513313099623435,16.878156287703785,13.564990082819367,2.8942816347037947,6.196031121436016,1.2328751441678154,3.3016308291055285,19.473808205124755,17.6216437451269,8.85238295343807,12.8563779480299,9.761335782119778,9.950618499146264,1.9760434762160495,7.694427107416173,5.33891309204352,16.446146255833884,15.728471548069468,8.477807232050697,8.879723609126371,18.792138763102063,15.169118153533653,10.190193606653848,17.811033224979695,16.78797953984285,3.4430235779272156,0.9139057946573814,17.323939862461607,13.183352164307106,4.04482074472587,12.868595003158676,12.016657193036355,5.54403744793055,13.407083317282659,0.965762209812544,8.491014666058948,0.9441257917880552,6.93100301668967,2.915766636333248,8.396815561184843,4.645577651749435,4.122562974559063,18.238170699349098,13.742249014999066,10.012433170566748,19.50795876409139,8.374902164626343,2.0242678837348205,15.219613847454493,16.729035862941647,4.520399407450184,1.2090431669843271,10.839929723571537,8.673799932690871,11.787160061395374,11.9354214530403,16.118123805658414,18.49889706853152,11.2808861176423,10.042701012036517,1.8758145088556288,7.601107643483562,7.02809152808642,5.37321206315335,9.761754903280986,12.733109348737091,3.5051670434590054,18.272622860697236,16.630453433912542,8.903625542436782,17.723704047906097,11.73359065528758,14.213319908377118,0.9173927195411791,9.062949268255478,9.041641053885417,17.95261909460045,7.829136182984966,5.662575413444131,15.795325333544884,7.936657013814412,4.611319301216432,17.658631497048177,5.765488562148002,16.62050905789403,8.109356897235829,10.352287205302346,13.581073414751108,7.800407987608136,19.17208586325851,0.0889738501086823,9.624947671944657,8.23694736154474,5.397266891117027,15.361879616515859,9.386927412250934,1.258769988131272,0.20103459115994315,17.152112207729246,12.507565115102404,10.05489948275439,12.333613133596298,4.2273661153447994,7.620292691398216,13.062087210277578,8.576116498241362,5.12311967315934,10.5456797110369,8.807287485008262,19.197494597750968,18.975020042969987,8.66439364084056,11.165655226315096,17.361923163102592,17.184352127139263,17.465902794676754,7.879544114310302,6.46836019442774,3.4094194803639466,10.95389372796304,4.343905239163117,11.487874389230267,0.8490046106526439,16.802794349368266,9.800005137867739,4.398503369958857,0.8381880382752005,1.5714314355383596,1.6883043927901564,12.66847405211391,7.540679885861961,7.25385493792285,10.464818796904973,14.39830146257278,15.463898473845026,12.130131289859367,17.237922151592766,19.41713296370242,0.3070148302766995,13.292518835466677,7.774924289820357,9.267566145051669,8.789057333117238,18.01442395467356,12.175431898179028,10.196829222009791,14.524354077204542,9.22153093264956,7.5596903911716185,0.5891950714878735,0.6074224178761645,16.240512148415526,10.323643260161642,4.5913562158454635,12.873827412940319,6.742632155621893,2.580362737423627,16.383148679096315,5.061925679052748,10.479469584195442,17.520610131236666,0.24802353840593927,12.103061450674337,8.841268065398369,1.638067780531336,2.660259577679356,16.358420541117063,14.493115050796508,18.63374658209704,13.176190223543935,13.940482160716128,15.617280317334433,3.9118553711857196,0.2411531495728081,9.513375589525236,19.397814625808472,9.66856159791984,14.950517337695679,17.819843924540347,4.213027761651027,19.00872849131696,16.636615048992734,15.749602358334451,15.977371268522585,13.702895843464251,8.948147937678407,8.867456411209155,9.901165372187094,7.045151737586193,19.798665146697903,1.213338110350466,6.11934085646805,8.092075829988726,10.500087974414964,17.29995186257508,19.373666600159567,0.9825972822376583,15.59034767290159,5.9956836032194305,12.050461256520979,9.347724741999839,6.626300901255036,4.640916178265795,12.843201650123568,16.54342961560308,14.075512228910561,2.2808138371644215,5.791371098160734,1.8524931906378805,16.10755108199559,7.063091208906771,6.238351158401763,0.6085013472108081,17.44948248693392,13.49171101845316,17.190649438800616,7.282426571114091,4.235301212494917,7.973907891731469,8.400244895580409,6.696395877088679,12.875569854992982,17.90281916631507,12.963256085329618,1.6798511953616435,14.49467890992028,16.276114274547396,14.320480897577404,13.12609248304826,6.268941660275988,0.37009181713747896,3.9937806872024684,11.353357875928376,3.26896753915471,4.593460618263876,5.208905508431538,10.556002490143271,7.675923882885924,8.952261829006986,1.0776815494459724,15.084244375603713,9.660862668644885,17.911190950155373,1.45680174280856,3.9866735636583117,14.866109123115967,15.172976633428576,13.504564661927091,7.628443387586814,19.33176605896246,7.661088419153748,3.637326081186738,7.709270843095601,8.618831004543633,13.15442670999623,14.659649043489775,2.180710148918421,2.3157646766043216,18.62733619693614,17.623146013949246,10.151387480166733,19.846689239039883,5.5150342701204025,0.6037284502636409,0.07199339911785785,12.586443762536863,13.364285023921116,1.26352317825571,13.333803871976531,11.358423805471748,3.941481764349084,19.392127390837874,10.026326938495975,17.20401076245008,7.299117459187814,8.194765196532781,11.597136512926731,7.551806327069679,15.567941228942397,16.572818599521064,3.1117109293042766,15.622151831361236,9.170038421455837,19.62452458071429,18.999670910725474,15.422539327046213,16.159201620415253,13.085823905877639,12.415958969932547,6.820707627183165,2.79745175458439,19.777220216232514,8.727140917992449,10.25271911987106,13.644981579754308,15.742351272977103,10.747923278940643,9.384481466826653,17.172754097816963,15.125577877761543,13.470386314673526,13.37988647190313,9.909556940241195,0.9382316896942644,19.526556562294694,16.807378288073203,4.237500979126212,3.886686136629076,0.22956973283036586,1.9103753483619013,8.170832858204879,3.691385354539376,11.655989273221365,17.72180902893201,17.430124497903886,1.4729724918729348,11.284306343387293,15.292036337612789,5.9397095108726905,1.582271346339028,3.1221618571583676],"p":[0.9067170659364145,0.10603495873241697,0.7273666502873759,0.4767728619543019,0.7266391023090915,0.20573537761113903,0.5699693071437064,0.4668742668132513,0.630468539957711,0.7959043323895676,0.4744623135562023,0.9578005704321717,0.4233323756714811,0.5619665866383403,0.24233689087193455,0.763967793544329,0.5160467395340218,0.6647308194750714,0.3724630424574351,0.2561717774998862,0.39092804649338886,0.9605808521226313,0.8168239987852159,0.8890352064857587,0.13035656919068161,0.7918882689339781,0.0889299976656297,0.6401129605188236,0.48131144263900927,0.4163365145457987,0.43473329878256783,0.7940374696860062,0.5794243232595362,0.7716467315727791,0.6248654623574934,0.8859151329699251,0.0013231651278222678,0.14029363893391777,0.7752012095882794,0.058276175174902134,0.4899319073949411,0.24949155975109205,0.959405447603578,0.8009309373899052,0.7369762475755255,0.5789984311413223,0.07465124605071582,0.3039302444156755,0.025898276810078613,0.6876053399236441,0.553538178476406,0.8022498167293706,0.2950962216772748,0.56994438370589,0.3547218921246118,0.8155868144993255,0.5485334412196592,0.06753043220162169,0.03201854224536249,0.1539668694740144,0.16286620616766823,0.45984973229127,0.436994126556971,0.49034079385178564,0.4976153812491464,0.7390699450112668,0.49293000488784955,0.4582049353034183,0.8282228037528243,0.4014674483655065,0.3894878792153367,0.2704103267402027,0.42374339943973793,0.6780613615681159,0.3785239468124455,0.7330830490926445,0.5485832924117044,0.822673341571245,0.5192188174986909,0.06284836595455023,0.2935730262452281,0.31569150175563143,0.30394436231421706,0.801014792732424,0.8530743132563772,0.7670123250237744,0.12028646361358564,0.15573780697916195,0.8856344556511164,0.9669022249034662,0.33780122341722807,0.4365313575843488,0.4919198239771998,0.8715395451943,0.4194562536083981,0.08987021233573289,0.6265114857412424,0.44766716087306846,0.16932646888824832,0.6413939821294525,0.2275427286537406,0.1470517266277338,0.2660679805731554,0.31693795171376715,0.594735855847053,0.05602702395953951,0.0065872518829646065,0.3446741609684312,0.1917568056392247,0.9889512512136058,0.6965763045137912,0.5163232882984876,0.3893893598259366,0.9389195969277726,0.7495427910090375,0.12696524653953523,0.1216128004586734,0.35973035383175644,0.7290748647755678,0.06895570944794982,0.5306193205153833,0.5178303065853405,0.42075330224354035,0.8682231284710662,0.06593479257122037,0.6558927331600581,0.8310293573841965,0.967795866654819,0.49610971085587785,0.2698750492147375,0.98434418327666,0.7298828205905998,0.3166064220188709,0.5750821781225228,0.6703043324341886,0.44696437533986977,0.5037345496569285,0.3426485519571758,0.9548000308560822,0.7193536351531349,0.5649819498826474,0.5561355065187032,0.6888528117065764,0.5173821841295707,0.43513912033188995,0.931846518658062,0.980211144440011,0.3888628236684777,0.941175692266558,0.9223701389152257,0.6312437670092355,0.4268109353356826,0.32890834055742135,0.4195595423427487,0.11927915638387421,0.43133561058970105,0.7644850913969754,0.4854786826740056,0.3859346574295588,0.20563014322597728,0.6878939613862576,0.11918152787849956,0.13831638087234244,0.13930400794376863,0.17255287568034094,0.7348101699156855,0.034355841932953046,0.7071037124991013,0.2417199298744599,0.5995321063899037,0.4640009354933117,0.21664600277169943,0.3895591761269819,0.6775339371647029,0.7828006983971387,0.4651880320879107,0.3982406757485979,0.792944107069028,0.6342255852377834,0.6011339037863339,0.7392583811112077,0.9430535670738269,0.039227504799462576,0.0237485693562709,0.7230702749008937,0.10794154123745225,0.9431391527658151,0.9391819696781909,0.40843424362724945,0.3438851854863487,0.33196930965184346,0.5162221886316418,0.19779940804746454,0.45033248922670244,0.8268207991829193,0.39403461919605043,0.006112660513638124,0.7199928246835263,0.8073601134531168,0.06419262277369753,0.7585119769816806,0.8985431791382434,0.9349792728459776,0.9448547614842302,0.12302511076529532,0.8921769290948276,0.24462543101147882,0.02669800351238627,0.9499153544104031,0.18886959493662503,0.21592598774462957,0.38016410491819785,0.8802545291986881,0.3910651474531921,0.28774828789164264,0.12459156360831436,0.7574483405261907,0.16589563693037856,0.06854837923902934,0.767661851292758,0.0829391707003142,0.38489689417414286,0.812385660275216,0.24327913486212727,0.5030542829537106,0.814585538351182,0.4186307391722941,0.33040948087850275,0.004661272151787799,0.3805919931744417,0.14378570892167253,0.16486883768588,0.8065893365806629,0.249545383103551,0.3306574945841567,0.6445266946024764,0.7740317716081542,0.38694941555744355,0.4929662689185834,0.7004019272576505,0.30094821793485216,0.9385520261695459,0.16133555561322854,0.08789942713530352,0.005407914061915209,0.5247997160634787,0.9362157865570411,0.32723456585378297,0.7854093441173282,0.9848320178529495,0.12902796324669175,0.4027453323109953,0.3857160712079899,0.02362796338694162,0.6780753280333429,0.8652627434653415,0.5666871525613362,0.1761277985659433,0.39522649715909797,0.4675514921259887,0.09617912701296105,0.40740857780823925,0.37801197032777734,0.9777335753144565,0.1503609879936656,0.036769922291649326,0.6164110823335345,0.13842379990932785,0.14532371973071734,0.01075227782260213,0.6105059281008647,0.5252818346444235,0.4169029420390873,0.39450725525728836,0.16336524262769636,0.057435225235121345,0.053140588069258365,0.3570263332385135,0.8556430498158967,0.2813033478863749,0.8049797855786103,0.5559202259395712,0.2412972072942412,0.20763698462233893,0.031313699611384305,0.5220345955844177,0.000846557440971285,0.35038811041989004,0.5264322293960277,0.07708515115104264,0.03335310284660564,0.2746683757486772,0.5526912700818585,0.03456049126544247,0.9134184225641309,0.11661363689183513,0.15053045795541964,0.2789035461545537,0.15291583708457157,0.5267480075831543,0.9605497550998292,0.35150855336984965,0.7877730678316728,0.6859436455579353,0.8521363503211596,0.6045254942030471,0.4561405042060025,0.3428254055968083,0.1094422701430493,0.11193458602099793,0.6692374299777659,0.11822610983424786,0.7436778729077376,0.9272509453219653,0.6670439747029024,0.5529479248735869,0.4572915119027272,0.7096232790178307,0.617086111985711,0.07789557826881577,0.5844495635214391,0.6714686421727334,0.3891476527267246,0.5363963094373834,0.19863352761567965,0.7742828706109608,0.03162220398930882,0.3733864932961344,0.9276886953286985,0.6521316142604432,0.572301374644508,0.41982135752619953,0.9694138448374501,0.11429274683326951,0.671345468912977,0.30342074861747736,0.9083576179647963,0.9243106210780156,0.493307681487404,0.10309680585789494,0.9054938036947662,0.5393294113839668,0.09425988996523116,0.8242909363563045,0.9618896023654435,0.23855520599899882,0.16033502037569014,0.880246457680923,0.6642066718030919,0.8237749586773591,0.995067951704117,0.8533285463522131,0.8342301391742104,0.08613791048855002,0.00728766100835232,0.38176174981639877,0.0470792218471936,0.8195930501610329,0.5211212518406181,0.7510566955397913,0.11689721857174185,0.37646480948997474,0.7865628726690208,0.1310937338739464,0.3030585947317441,0.5448059360545692,0.3133765573993921,0.6303949423114223,0.7570441726104389,0.2016883716883786,0.28027700109463316,0.6915764811795515,0.08165470601262759,0.2859863706596981,0.3290201843336438,0.2513307394458857,0.3280426315494551,0.2980777013891074,0.9321354486699889,0.7081338566195581,0.04071940406492924,0.13468947697158096,0.49735655590905115,0.400010638365512,0.16967325071809802,0.5741436592620293,0.47896388518606337,0.5119316365940763,0.731098373975362,0.33884709726540385,0.26682308939146293,0.5634187550515317,0.1436501679490123,0.04271469311405629,0.6449639661951436,0.8290192911541465,0.2582989981819097,0.8619757759325293,0.8772084653768626,0.6738230129303264,0.20128631610334358,0.41849786682713486,0.8727985035662711,0.4745549551029551,0.38671511665291636,0.31533477475024174,0.529439976923163,0.8757616967541557,0.013932272213374786,0.9769816347715246,0.06894991799814987,0.7504418055468656,0.019763119849856015,0.5074310874276067,0.7058337159546584,0.6864368100448504,0.41507944672666697,0.55488375559769,0.5471663174013153,0.988441763562514,0.08306879985778126,0.10327731182954358,0.7477427244195618,0.22926135345508936,0.03330596437507194,0.8926193195231769,0.4391320667146801,0.8662662490450084,0.7077284053771682,0.5618675607866097,0.3414357492434026,0.4257666736463017,0.07666012852567983,0.46510137670661544,0.6143747893237923,0.2972707982056595,0.4274228296092568,0.12464935243896913,0.1829431683992322,0.8004127118830884,0.9432135652873883,0.8742977716757208,0.272548743337963,0.9812444895002979,0.6409340941681845,0.13972566419521204,0.4314698578853291,0.3192569842978894,0.4023247549853932,0.29772586945140866,0.36799403932056896,0.2194294772098795,0.2217734604722199,0.4575801348070685,0.6094209936946422,0.8210667829669833,0.12929988904265444,0.9969725085075425,0.23376729226285242,0.8892969527155214,0.236192564126106,0.26454286131086,0.20540979085295485,0.16807055361901457,0.36636330723710797,0.9787852368531791,0.2967343218858811,0.3990608184068065,0.6623407312007532,0.3028292683473486,0.5532672318590313,0.7118571126283593,0.9250096818125428,0.633492177944126,0.3681325751724862,0.4624720744974955,0.4063162827536355,0.09423690625940928,0.8786013339323069,0.9598901468156587,0.5274285291142364,0.06772340378056119,0.6399000559624517,0.3004627494266283,0.34970242989060374,0.7635524260365101,0.8343984275974234,0.9335198759077779,0.7275929529488478,0.7161510718072561,0.553135758904788,0.11429904325797491,0.21547097983678154,0.2091015051226024,0.6475194132916327,0.9203166304737687,0.59438759455463,0.5911779481397492,0.07479592035881,0.40818336333447425,0.9313250591245998,0.1384324886137922,0.10172581037243855,0.8001593591413052,0.42088650782200165,0.43101926204059837,0.5324339966022265,0.6327116313381793,0.4984128957613636,0.9006997753269106,0.12774010158741733,0.15471633368856086,0.10914017288816735,0.2553249599532097,0.8517720842256227,0.17486494949489373,0.5532029277435857,0.39688085363872316,0.9325025739786712,0.11492133858115383,0.4033889814007243,0.6840014754860997,0.02593683544903347,0.8881141865903048,0.07676647213373045,0.1067572273246098,0.822321588902486,0.905989825753712,0.06840423659057215,0.5476815565203703,0.8706547875986872,0.6517791828233757,0.5780018262246807,0.4979712247617205,0.18073565953554693,0.8479351226183336,0.12163964498044799,0.8549143411575175,0.6757570073894907,0.5295022838984156,0.2906257062659183,0.16650817832715448,0.2430487935251664,0.0064557789203623095,0.4031896059503586,0.7483886759401048,0.993003419731153,0.9830474039403454,0.13806019214406118,0.9420062248384069,0.16172939365376648,0.7333166273026821,0.09694148631772759,0.0786816419625731,0.3347949224577964,0.2492603579154986,0.5290622367953854,0.22501391127930503,0.8937216570101314,0.17657199435364013,0.8217660912103073,0.3106887793210198,0.09309915338853103,0.16993840111696779,0.8000074337559988,0.588813271820464,0.5447873209829814,0.7588418844439593,0.1962858320363261,0.7258503940908718,0.7876861798829713,0.3059290092637852,0.9105201672692966,0.7349532655187128,0.49445014476360805,0.13071686859087572,0.2233512518407712,0.8604701575146054,0.6237850872707258,0.32551690476564565,0.6911726761019126,0.45321708042313813,0.24484629101380895,0.1310709108728001,0.9980666098995352,0.5722779405335099,0.049791051020132704,0.49214458951802187,0.7696595817272682,0.4236532757460645,0.4338915520305284,0.6995506929619404,0.6440980770656612,0.48533234709343787,0.9679665562215574,0.08713024698163707,0.3157909128722194,0.7724221226505186,0.01940069091851493,0.8388142081067103,0.8758987405320848,0.822437126592283,0.07240802887585818,0.18074084059244266,0.7300999012762273,0.7652021278149985,0.3190222682800845,0.44121928227211593,0.08496494810517885,0.2843057363857502,0.7710872343408701,0.6298277226062419,0.08902159712847024,0.6168084729853878,0.2340577728911457,0.06075940745277508,0.7603726021096808,0.18011461272073026,0.9188447104503445,0.23838484235366586,0.2966730233313286,0.721590635808935,0.45834802085126247,0.8215502768466691,0.42995601655626237,0.5137577288841368,0.4350063900097463,0.5344841111031924,0.7941182801386049,0.08462649970197056,0.9489421028436049,0.004789180814481542,0.464509306198164,0.9206219222859662,0.24946186825003758,0.6738114338874976,0.5068632901896426,0.5645345915178259,0.2893165226498311,0.98662292791006,0.2618850671605799,0.6816943067573609,0.024036035303143022,0.9692324789811126,0.4844495364777519,0.08802272642640352,0.12699726374585452,0.35722793547255005,0.36827238764373615,0.09910288978441839,0.2933145059288671,0.6698701005706644,0.236314477056204,0.8986385489540667,0.2502969536941113,0.3625638181860411,0.12694992530376337,0.8479874110553338,0.8350966471612111,0.3919022705887316,0.37923664422441905,0.5968435926896942,0.559843099645511,0.6003781674334621,0.14093982310598663,0.7142325415460284,0.27977956387868064,0.04771577928438542,0.16246707512355996,0.08394248521750769,0.7356142535258208,0.07647344900614472,0.9240508778228023,0.571932337412955,0.4088393010235991,0.9948297032845606,0.7124502345969848,0.6105598667125334,0.013011328453846671,0.2509347123195258,0.7145362361075307,0.8328240184690843,0.8541525509603864,0.265907238237455,0.09622579317723035,0.9863921384260876,0.6537676161457926,0.5550937808777974,0.04528363363484611,0.2784653576717391,0.9109579058373491,0.9672343559406755,0.7191933539000686,0.6914082445784999,0.8679303062774701,0.5668263865783312,0.23337832872063768,0.23937689740682866,0.6486692741164153,0.22586221676809215,0.5270740420535684,0.420030484022174,0.8598435828554285,0.3171621504029458,0.049893534798472805,0.4534182828491742,0.11556291377832784,0.014971467985973153,0.3847016501587437,0.35699950453769125,0.7016474730243574,0.8612015189501883,0.3486527082417832,0.538158176000713,0.9444671631447297,0.0767647190634968,0.42029903802476776,0.7570883356136566,0.240666808069524,0.6975455738133982,0.936572419616797,0.12309232083512689,0.5778250828305465,0.1258223196740682,0.8561573283892399,0.38788190009606494,0.9422364815774564,0.40998851405509895,0.6160657054196907,0.3521083342950506,0.7007525239371435,0.9482874449140619,0.6647371596241543,0.43626601747584526,0.4314269397404984,0.5951828604952116,0.7876468565679204,0.18139663027590425,0.910087694420189,0.031506001484562285,0.9890480149536962,0.5121110503855908,0.15028400982541523,0.11212210608975748,0.23150544623957692,0.3083394760807965,0.21821537248649125,0.769704863277882,0.05556871911002359,0.035312827389393675,0.9704458644598957,0.1508791413671855,0.04732262709735591,0.06715678253812918,0.8202878143488161,0.6187556743114773,0.3226215916322608,0.6277448336571829,0.5975200127493165,0.12023999454900713,0.4765312866964051,0.8842911287768234,0.10864413983680943,0.6533365549541454,0.702040511505815,0.774172092815566,0.45646602463039154,0.22726323337806575,0.9103403179799827,0.30241210640235017,0.577190370922285,0.692741260736673,0.29352990502393017,0.29695259553501563,0.21521171651775206,0.7486518675845271,0.2161737643920496,0.4438259884816298,0.5241926793184686,0.5018719669595622,0.5124977753718185,0.656554373433379,0.448770156631616,0.9331765078950225,0.769127738864779,0.9510212083961,0.9370088317904881,0.9843888578379301,0.894097437065825,0.3055542169905583,0.31333459035312017,0.22595629664361794,0.5876971003821907,0.5127663082329175,0.4162374676898768,0.8285156031287622,0.7818246228837136,0.7043721225026196,0.9004875102457692,0.9612081392012819,0.6508973436342782,0.6209056758685556,0.9501803981423589,0.06000656003622318,0.3263788390831781,0.6052936738067694,0.6928816471378354,0.6438899355061545,0.49398249433279084,0.815689295470748,0.9129028086546458,0.46605060924027963,0.1509335684814459,0.8250218994345173,0.4993448543606718,0.05534722520063484,0.8204733469528318,0.883036740247428,0.9854809043705679,0.15957717185291576,0.2733007437636821,0.45256862244018015,0.14245463927090585,0.0005502833451278555,0.99669597418459,0.6768638999780794,0.7194346977742354,0.863543687606189,0.4835674397484626,0.15232179524151945,0.5846636649820067,0.7791571623046194,0.8964847595509529,0.6003928140583812,0.11534162444765883,0.1879945647145711,0.286789822380207,0.7646962077706148,0.02721273061507512,0.5464491602033856,0.06227108985360408,0.8429367071108758,0.6279801076659848,0.8464657137780895,0.8044041848205221,0.47457082930388284,0.6654489903650502,0.5106157989803499,0.8197377664053183,0.1469596690297268,0.42933779936038063,0.21982844558422876,0.31302081422566186,0.6531166047385542,0.3589095741887174,0.03771131342576184,0.0007542469984103128,0.17687719691346548,0.4656826645261358,0.4640586415336554,0.46549340553111973,0.29264001502642567,0.8127067814457258,0.2026277171701074,0.24729694392439217,0.7918481103123682,0.02175359328516646,0.19800338498258996,0.4128334652257073,0.980883661517375,0.6388099650218475,0.8764375535737516,0.09910369897683147,0.9179463718991607,0.4855266377070071,0.45228953379507386,0.737676349571385,0.36921148745515864,0.4240554869405764,0.6141524775925762,0.28990378298998953,0.49757376830826394,0.9642671593492762,0.4982281091205025,0.26653430960906244,0.6424374837824534,0.08563704840245911,0.9571008473586515,0.5830269012097795,0.6511661731439229,0.017775222280306258,0.34358331876782167,0.2012057339688751,0.11638091149520435,0.25312121100781915,0.34724026156600885,0.6975264542721809,0.9223912510070706,0.5640935392091302,0.22880142086502953,0.3283055446516936,0.10422075967884092,0.2220092036762238,0.6998187980554622,0.5765489030462905,0.8132208541259263,0.04330118383061743,0.23063538630781233,0.8303505555734103,0.020853916785077198,0.3546667788009432,0.5868573215231545,0.9560427211032705,0.8073686065774879,0.537056388089004,0.9418845495991741,0.8854621898150188,0.30311264102530333,0.2100175076788322,0.6006233743105933,0.6046037991702848,0.5192714661083004,0.49349611445688435,0.47377299348967017,0.4408267058794102,0.6946008600273552,0.31163877734285084,0.5385501810175475,0.4180928315682675,0.2023305307699983,0.2988259844432499,0.9539465361479562,0.6016494654022542,0.946868307861829,0.18754585097119958,0.09122108843694621,0.8025569727665043,0.6594226605362181,0.6675434527538184,0.01142673132335248,0.44396197825904427,0.19867210956076176,0.5098876441617965,0.8478135016289714,0.6183609831080643,0.18799851473550389,0.3866687339119719,0.2424329094865323,0.6821323582433656,0.9508111922866076,0.7511480817743779,0.06422827988157365,0.9666879333434191,0.7658060267971745,0.014376425354161393,0.15174196078617697,0.3681998262359696,0.26510375218703297,0.41659153580204467,0.7906630155758079,0.736005483078962,0.6722893965000687,0.796023211017697,0.059958139914280784,0.7679679880439252,0.31229071435809663,0.56518571383393,0.7685370767128854,0.6808940554136649,0.8957137593901323,0.9715394859581259,0.9554932549925361,0.27202407820642116,0.7798169083702422,0.24012953998476583,0.03537437598524695,0.5244670854953035,0.12405929438364494,0.18877935005796154,0.8353679267347218,0.029404959921012663,0.5868756594034243,0.3285038951818804,0.2616018383086014,0.6597347670170599,0.9186880074315726,0.24209044401891222,0.4248007255771131,0.2195532058802825,0.43670290780658627,0.44240400203852226,0.8419923342781825,0.1248257574770395,0.3151201120972782,0.5110267109317099,0.2508096977449843,0.7724667964230152,0.15219984533096387,0.1895989551482915,0.9868223736678481]}

},{}],16:[function(require,module,exports){
module.exports={"expected":[44.98200352618093,41.16791530556956,33.01091235901998,38.29098771079309,10.790906023913575,14.145381056306526,23.745106377627938,32.4526741346038,39.88885996285113,12.015758095463623,12.02559609711176,8.859613255204238,3.0343334629091645,24.033900342149995,2.662653292521498,8.754326397527544,51.176488365431005,16.736294274364028,14.47151155879489,6.891432583669483,22.69020881172768,14.30068862402254,29.07871233671758,31.833881969553687,24.421265128546015,16.468707615375692,25.072094811258413,13.649706496305265,21.30453549262612,15.035469421958698,24.084187183639823,16.466996274192724,15.734795773255623,45.451112450871896,26.26782069834484,21.29179248856672,14.062381249833614,26.269004814274513,10.272942231288132,33.616374613614596,34.671326260883966,40.81833807291353,20.615463511646468,14.943940738587433,22.788470818520715,22.665150479308593,26.32221697127643,37.77790479794341,25.4172063231808,8.909362712360405,32.434791571809946,17.373654196750444,17.531311302168252,14.883298317333299,32.60699207798497,15.838475839323355,39.12061059280405,19.391449808731124,38.65354035815388,49.07410821232227,33.667479301271186,18.03576666944742,43.00644397068266,16.270518044122248,22.47265129509309,28.938878711520815,44.921754894879946,27.673445765293412,10.297826116077486,35.483317328176376,17.283576071682944,19.608630153801826,15.177922327972443,31.663073243130768,19.991842822858118,4.469729828255469,48.34176604154845,51.68861347894138,17.632526121641973,9.124933601278354,18.809548679843502,23.186505145407097,39.08605318453036,25.466165497383514,12.865754155292048,30.648515871425786,21.96150246426761,20.891386444863485,17.42170926289905,36.538905341992546,35.41501948055761,24.099910604913802,16.753086314603838,25.95235202726049,22.739202339894778,22.126182895855425,37.80554898017731,45.48735152964267,4.221306836908132,48.37180257158581,28.174664008418887,19.51807032412136,24.427670490461438,32.23128583863536,16.609705576300726,25.95184257587868,20.230363201185167,30.4335348402102,14.126196581878885,13.410317753366769,30.12046347905319,7.048840434884897,46.16937054392445,27.68893024930506,20.089873761728498,15.311268969922256,11.584095273316287,24.88572950215822,31.327148725631005,21.33206210254332,27.86292545006506,6.596903679902452,14.513954067942473,21.781915381413754,3.117366371981956,17.16422744956037,15.02986406955356,33.108927553459125,7.144785614984129,11.600284374226613,21.41459375104399,21.531712910776438,20.93409179409728,25.93773341716485,12.647215161176842,27.02486540400416,15.606441132771492,18.804075360658416,22.324065001082133,22.89097123174035,11.475276608981583,8.780202268960352,22.873598040297953,34.61865861091372,9.667669733206012,21.29442477305396,23.03743242983781,17.802005957520212,17.282845505208503,11.910344415975963,21.706696498197644,26.113663000449236,14.574277860673316,14.51157380069405,19.001974162123247,27.51292646687272,27.33985017359801,6.204869875982664,16.780797024152026,21.087628385999786,24.639205087098922,25.213751349871266,20.77782645541627,22.83497156378752,29.955685401837474,21.78203238664273,10.246811924921769,38.35893333722271,27.900062482557857,20.719404518150995,26.114680839375865,25.463797112955653,18.732577760979623,12.502298632713195,8.781805211149594,22.279933292930146,17.84734894693655,23.649208861881796,16.55930597020312,33.938181946450364,29.714717839497418,13.376533746162874,22.20965502629638,23.665241702702914,12.081261426284716,33.324499979967875,34.10534839092877,16.02340179230059,34.18171509577298,20.557931111323825,25.750182090521925,23.639552941124073,33.712478387183474,11.58555888028587,19.42619677527103,9.946268177550664,19.540448478910353,34.09713372906161,9.666234584444574,22.170302072248973,36.249050984501544,22.42741205272271,32.612620958822205,14.813616420792533,30.97657233379254,14.4836767106661,28.579330254576487,7.58872570414458,10.494302805949472,36.00710207804569,14.074599777431978,32.284533015595464,18.576338525512114,20.018717122853637,28.600436590760335,33.60340816746522,26.26994630009878,27.585030521985324,22.522309594466154,42.131301717455045,25.214967189837697,25.11276197184138,16.024102692850473,22.24679172056404,24.414272408461887,34.23081266429612,26.475826643299172,25.860579860623673,41.699439633476985,22.571652098225385,31.62950264508237,10.718122551716144,24.70928074458068,23.157529629723687,43.48240134452628,25.57240756301056,21.876989604291225,28.78805535507422,29.339496588262215,17.032722529514352,15.798555922073852,31.319178619911977,35.237196090547556,27.345142143224642,37.47746254718396,14.539964591481047,8.983804549353014,22.69002890299661,4.25573413604844,37.72935254741999,16.76866407897159,19.699856526479103,14.25064582247175,7.888403240691909,34.042202353754256,22.559360884797734,13.255709226398226,35.32239682018138,5.482199766713688,21.55501696608508,39.12246901859777,5.2993561948607955,10.807610326141818,44.999143077681836,8.25894516736331,32.92610489700337,11.718103459411264,26.77449029702247,17.835197612769015,36.50568423174863,13.844409671878525,38.14989312294071,11.244413781858333,23.403085475109464,39.46777233015465,10.767022632662833,13.477840261098464,39.60322889824746,15.614916888292367,21.832074994262605,16.07330468812053,24.949088812446846,35.004389648447315,22.417229170640592,9.375704048542346,44.90573303595984,36.36563874249504,25.04464117107124,11.245107128589822,21.703372729339698,13.399489760861677,7.042288005687064,9.681466534665475,18.093023756349684,44.93790102772674,6.69098176777986,18.35666415753544,40.92363230653353,40.586818273909415,29.76776369580814,27.43337347750365,19.91132266389772,18.253066468565653,13.847454643032007,24.864219482344446,26.99754510758271,45.30165896812104,31.318493322839654,42.539943839875896,7.81477178132454,14.793911593255071,20.453996043569077,13.630969659345665,24.362903195298372,39.058297757746516,32.74643712510927,16.472399335873348,25.34077391390413,37.00666155597761,34.350755201760286,23.763833964350923,8.238772743036094,35.433293301124195,22.891729342490883,18.02529475182403,10.145107673908685,14.891451383827722,23.045957495635392,26.377043784039095,20.266543132718393,7.155542731244871,15.899717220352606,21.524568159036733,18.254871524993703,33.37358154558668,30.97785658309607,3.174698397993291,21.015316007028595,23.89472517932089,16.86725519577726,14.574183711541883,19.81735592269217,22.014639993193043,16.070480886505578,20.134982981218005,32.41581564000195,9.93550399099696,9.852112792673298,19.946320300072582,39.508275074442665,20.71029902721566,12.836282844328249,19.674321969943403,15.574621054963764,36.635672352242814,16.838035498396728,36.16843986524585,15.467642290297263,27.90239445843411,15.536528006323731,7.709627785002958,10.954670497697945,6.542333449652241,27.732826386366604,6.00586234847286,26.459497229142215,14.851935169135622,30.459709603336695,18.67659821691535,31.588922012122097,11.498264691662085,31.255982111452962,15.272961747554302,23.966258649317506,22.335390168862904,6.571854723162382,21.228540245918754,32.87554729202121,40.38754159117154,12.64513716291006,15.585048859001153,24.288673374349226,7.279691077078618,11.22438216244088,14.9121395517179,12.628429081623835,19.405521916253605,15.1470138378912,39.04829316065888,27.13605140083784,16.686502340408893,23.732637236334366,8.3623311634969,26.191843538206278,29.76845275822686,32.06751116468684,34.77348705469004,13.034001507542436,8.732415023531551,16.953424914291443,12.857641577574054,20.780951997986563,35.3817349686105,17.423826046409513,27.707735517858712,10.213312478763555,11.779796257847824,22.1088099947097,32.570466143257974,21.57674468497627,18.88625498768584,25.35488966147875,10.496798531137504,17.69768310481039,17.14871410299866,3.627317257919276,17.390147161917273,17.3946025021991,14.633829411849097,9.297296028882823,14.208257090699401,28.482311247076943,24.057745758422815,13.274834822209918,31.768075304649173,19.16717307171022,20.406017870294903,18.046093385705582,35.557562813931064,19.50556731463955,24.713130135897252,14.602017485075333,9.588106577454395,17.82282495710364,23.823941501898155,24.829021172381648,18.585046395182456,35.00448625597105,24.293204103161848,2.394293858748192,18.719643802737416,33.22413280112846,44.42551288466788,21.180144129607154,15.40021770745151,6.526350060204323,17.780962422489758,30.033574925085247,38.84458201619934,6.745358911463725,37.46214264390693,29.619813614935673,20.949038222030488,50.938339905433644,18.951049715614,26.535086911298706,15.126043625647778,30.193138295324403,18.074977307887405,25.20347513608857,35.113469853488176,21.873831756795344,38.40135481001554,12.341669158395717,36.8816344129074,4.7697107561665355,16.51429699879349,45.656937857710645,17.691784492466457,17.628008385665588,22.110313566152584,10.361494203185455,11.21232417844436,23.570238272456372,25.976914064024243,15.717508774216785,18.42524172942084,16.611150443942577,29.02783051758521,16.972874733750405,30.970940806614944,38.05119794263918,36.48264201128724,17.09587618225573,26.03819231816131,13.853950392548331,19.564590643674833,33.071089238324305,8.580210393847347,28.176872390018097,25.438238937877735,8.051527412099531,28.07002896553511,19.782951145219357,19.342482670299002,8.699919628061407,23.18125340299925,26.020580111138578,38.27867534437558,21.410780589417442,44.144624938677595,4.051788099695028,17.861179679956976,15.965290446230245,7.495902078849932,10.310867913008476,33.75985440770032,12.379666877431864,15.727293471931095,16.418367699152597,20.940861587863797,17.516136607852868,39.2644031172891,27.742764264739154,15.899463757548755,20.146307372565854,43.41088388515561,45.64426853510246,35.377858810005684,37.75035941086141,27.669924588984177,35.51726787911906,34.147290387768635,19.79164473135373,3.4542290302998455,5.609230164026341,28.225564769483725,14.874596726383224,9.583201421382434,30.729351456428137,25.99766879876405,25.79812989830328,11.868302228310924,18.72001981009958,24.32868254494404,10.369960260194226,31.33217596606577,24.700141397885957,34.28858852625298,30.5018259608108,12.348184585687605,22.27288264864822,14.018235402372174,16.60023166539042,27.79675372296355,38.986163613772405,40.04570673004065,26.702779637475544,16.12709053970201,25.17115694312926,12.980407860971127,24.417715009809562,31.564574490042435,25.733199512184488,11.885825554770669,13.772175023343728,36.1724375453482,34.30731310265146,25.784767434541507,20.085712747252597,14.612475375895267,8.190547466692948,13.515326633275517,50.05631903746819,9.17505016457009,32.433685482318644,15.145758226504457,20.712897321920163,13.70706418860555,19.162435725884404,30.611507558500186,12.150159523853953,31.086387680738063,4.205171174512417,19.47017262810852,14.844835873531949,25.09492073304701,4.921930392248571,38.94472445115648,17.97208725362565,22.579940339748802,17.180045334758162,2.592983811051594,24.327638232850163,20.54916539195719,10.903270182432365,16.834408075739226,25.96229350416585,16.148837748654252,32.587652746920135,12.848266257729357,23.843147775569594,21.93496140725084,8.576461512121902,31.41588463822324,32.182024330666394,21.2210256294854,39.53796794724293,37.50232865138485,16.392795091302833,20.79887817516411,26.37734308231703,37.842877289610875,32.52931416946732,4.486317235532882,16.2064839061713,7.19121852544267,15.756584159285536,25.692968570710523,14.921979109648303,13.216297679033499,51.42503031266314,50.02728319692597,46.01580917270094,16.633289119726868,43.745446770366016,15.803800083687554,26.312201787428545,21.497385037756796,1.4422786714970508,1.6379278970203448,19.421712089948404,10.511314025624012,8.954719237589003,17.280826580197104,16.160514317696126,1.0785990844866198,43.36644085485504,32.041313445204835,23.385993142469985,34.58431876830628,16.973048946189667,25.886245762958737,21.8486521721698,12.409798441662971,25.78416339782868,27.608799067672997,18.79399129132585,14.142216392145093,14.567264773295193,29.038507379625116,8.344073004556645,32.372923336387274,36.06267140449506,7.487980889301568,18.653937552147724,32.62864999389306,18.799447741753447,21.52954879575707,15.657201505149022,10.687466098470917,29.201466471123194,26.36910363889755,35.808423164637304,44.282101620288174,34.6279537676165,27.470255867722265,6.222838313803203,14.527952825839192,21.408173255119664,3.851208966837338,35.48916318720215,43.143580091195346,29.101691441990816,28.316236615410944,23.15306267291172,40.750311294571866,31.35595368887821,18.2802135441265,47.632904916000875,6.984230099193768,14.458919360703668,24.858875491759914,27.541048089811007,40.66365792774604,15.979737299338225,42.045639281732974,13.580790424198629,27.99658411464359,26.620538513414598,31.51941317443821,29.397804582287712,19.618190767989336,16.669497944308766,36.94470876424066,28.85546132879032,14.212769181827294,17.32700418520998,11.783344733658677,19.563511488481623,39.05909343337885,27.951738292979606,24.550778848273822,18.21115572336784,16.870857034452634,36.85434835339936,19.198682636723447,11.166189793443033,35.20550234541985,21.033660880266712,32.22291012585113,19.121725018127144,3.5617783686260744,20.799178911193458,24.14869164309974,23.833932827186647,39.11188653036522,24.827135973595688,22.374821187091573,42.05310478859606,19.127510764696428,11.980142129819827,44.172280001281976,35.67639163369627,35.18014187173998,12.184681310018416,34.83583123201338,9.058608052492172,11.956023774034247,23.36428263187164,13.755238478905646,25.304304040919252,26.552435282736745,30.9047874567439,13.113393072955718,18.4474234627104,30.339727318319216,19.228087656115523,22.46409043139785,13.34708721588045,15.193670535075649,21.58956027400367,31.10263561411505,18.139722883390483,12.343142438288256,24.976634690819306,34.36432081119527,44.97785327025281,27.821709867864183,20.954020663440463,23.49936234180806,17.1187537367284,6.242674581770805,21.434803178446483,24.325487378570152,18.919605520260102,4.007623094176489,32.032096696244714,4.188053390748034,25.68993315635889,48.90463989557176,4.90297017046952,13.008085342893619,10.471859922077984,25.203630171064546,16.290278033591786,5.0686999398848815,29.74333559943471,14.082313941270176,29.36875308604225,19.791078369548053,25.54419897220003,13.917450180345183,33.3662064792563,5.098922725394727,5.496008195167898,34.12934066937554,20.585466591380666,18.066997286907338,19.198278152604814,20.093772847629854,18.252566545114398,33.51993742176414,30.238661942204487,32.333747974005284,29.532039064914315,18.642214745942688,22.211141752754354,34.79450532240962,11.926154564339107,26.718703860721888,15.205108075619997,38.05086065669518,32.531382732250535,27.44716245423603,15.245869434596845,14.662760412411023,14.46040973104378,26.125488506039282,7.70310389658158,6.438461077860994,25.092365197103163,16.37175961916243,24.42105044615213,44.94740616282018,30.931391264312964,18.48660325586979,16.220786753225024,17.433282648657134,23.04702939638124,12.749884246364012,23.22119341807716,3.6588832895354364,32.07812532792421,8.674475519244247,13.482250436902415,10.63892346444264,17.069632927315716,41.62768262887199,27.699249156401912,17.166305995393465,39.79098465033857,13.407643195487585,20.18834712874291,3.291661005917997,19.753769238346703,16.777075036020065,9.077489467944755,40.69714968960438,33.52056021827863,42.05574093505735,14.533546705795718,33.073521858643396,9.055078531477536,25.67375422802011,27.380453578691196,29.57280961811675,33.341902102917686,11.806878903025076,25.882016879885747,28.640452841568788,42.88375057684755,3.3990516956930685,10.566951622445053,28.323571145078258,24.557457643056964,25.977764881451606,25.42610163395352,21.267142331744832,8.356399993480428,32.55124026767169,35.27846393403579,22.65696978357243,26.841753362024257,30.4019196422906,13.310109078267159,24.195894624745968,25.989652713535058,18.578554385321436,11.303895248242839,21.210881156500427,29.007125613490338,21.212924324588364,7.317249547056022,24.657291765720455,4.647829492472217,11.036869761918732,21.780897586338128,27.378268757838107,39.611001270061394,26.29709145710649,15.923799906946673,21.333961108102407,10.92083521904561,8.65822548524454,23.133378162380946,9.497759737453567,2.8851363152990412,21.68124887231754,30.521963662680584,17.170040201270524,15.82386018383188,25.80468896885056,27.828614992336412,31.208992226519648,15.888252720025926,18.34350564754117,18.65420374488815,17.629940275425056,30.10005420205069,20.200854065083945,16.69010487877761,43.082488738110825,23.342234831018786,34.75809163662609,9.106283721165598,23.452299245893883,23.991203040754375,22.126814991913392,14.675656559020563,18.221335630742846,21.1373888317859,0.6544040980445175,21.299162194053558,26.417049405167106,50.40362272723928,25.114414960633646,25.887908722487722,35.58982397506326,11.150239745057263,9.993984330218707,15.297455191099852,27.757966851754226,28.512491987042882,7.142637257577128,26.547409552244233,22.697239924014593,4.975538829403622,15.113937033411084,17.486009900152037,35.235378719948415,37.42559569814426,19.067305596156057,33.4906992181094,27.11880717388798,19.139100040356304,12.72172526257597,32.975724482074696,33.61148027868602,13.826112322018327,13.195603556831948,10.326771178726014,10.31335272959745,32.45506399167004,33.49656583729937,23.25730167221207,12.550579157188457,45.73218006785983,16.594009263828234,33.73988416179445,16.76324043694937,28.72508509256377,29.201904611824904,21.526400933838662,27.86382859490628,13.165105971591737,24.19194139422907,33.693319671708274,31.667804942782773,37.104971072512555,16.130998780266943,15.445160411395857,31.22287680576422,13.898965366770149,37.44125100010649,27.297759164859908,24.356382634997765,14.662099761510671,27.07331159476268,10.760330941764776,10.105128168571156,12.675421862726372,13.74031365868586,9.23961540383419,19.330368492829038,8.812952590298524,38.663527033681696,19.808405342762967,19.80563638445183,20.225078424108084,35.37256237024289,20.414040129426738,9.601971768649566,22.6355274895208,28.942822816408224,33.40559329784075,28.937267087150573,13.99786643221466,14.785586339056184,8.130029314587329,28.084080744524144,4.671384172128982,14.608522724693476,7.898790102896747,25.597651936603512,21.8093809200268,29.06664597643444,22.19163587191843,18.924689003903385,20.8940808330219,15.77780409969936,9.390260523497467,32.634455429949014,13.474580156323377,32.4570046903993,25.602688210322484,19.249269690412852,8.732496901530826,16.47802037104745,15.217360571922857,22.69387415356698,28.318802321013912,16.757697431461956,14.953380466680514,26.891624605995133,19.863667196857115,24.39315140107464,44.06337730693441,17.252859856227154,10.537911846971987],"c":[45.97350007185001,35.915363773188105,34.2264770704972,36.72268391315938,18.221500730446124,14.478425732394005,27.746022300121975,50.58144801793131,40.653352522792886,17.84021708838732,31.42708395635328,12.171887435070897,6.555324599536561,22.648293692838386,7.843607346912204,12.252689221912249,46.19960611321478,17.5730384066941,20.912889674126895,20.03495832178061,23.231411046088574,14.131384681121274,41.25453024030914,51.45005345540231,31.70086236841947,21.260001598729616,24.80759438456765,13.288683710778582,19.626515353798375,30.710542478157755,30.642436576364894,17.205689707465083,19.021839681926288,42.57207142847634,30.100740675116782,26.70157148900899,15.989086121632214,24.555250016514172,10.28594408973118,31.474536434374418,34.408204301361025,38.16642496424855,36.341549396253114,15.182296604792414,27.59683246016822,23.92158256123502,27.393525690099338,45.60604385781134,29.976079956905263,12.847554814008216,32.349768313270715,22.7304524361033,18.077039683568632,22.876995858211444,39.5617365641118,29.231510550860307,38.14883246029848,22.534457239301386,35.76205361879677,46.818857092587976,34.899746886182214,36.336442728434044,40.05995308499939,35.423124582332534,23.653594950878112,27.486068751264547,44.14724766013923,28.30623326551073,30.878936452541872,33.97442241124712,31.302804103942037,23.196314838502893,16.952704057089512,49.65551990661782,30.12978519425228,9.871234972931108,47.1430380123704,48.41690482201737,25.793698489484896,10.820123177410158,22.459432360031894,26.287447134912334,42.74851916633911,34.209573399569955,13.876367140634702,40.92902831450098,27.41003462417379,22.827533794273528,22.510993456390818,39.84421790807565,34.21919698382548,27.358579877487827,28.717192331200675,35.97521238437957,33.17579431324418,33.423080162002556,40.970962165646725,50.48392999991264,4.403396580480291,50.044003786210524,40.205409167649584,19.32385251238786,25.45039895757684,30.83075130547763,17.860398428690676,30.74430935612547,20.74654932975461,34.84237052000319,23.22939800680721,23.02789810980464,28.28845771134629,7.45117324856586,44.123192075842624,29.125569478507636,30.980061390291798,15.812563929918106,18.90489631295104,27.540070435482626,44.911863879285704,22.067017820495117,46.521280454448345,7.103386614446368,24.751058446252777,24.253079193152008,4.652537891241301,38.61344246064506,15.042214792605456,36.011320010826,6.786322246766099,11.198903471025446,28.332926694335256,28.24936232368567,31.480100721032848,25.618158731298333,17.51977391634701,35.918917005578265,15.572518482086721,24.35182137798636,23.989001245960033,26.183051468555007,29.59156357749397,11.018107888400522,25.404587353454822,35.14970150552431,17.963518682738535,25.37753777276577,21.700855866882463,30.70559664477026,17.150507125367866,11.399265116618995,23.767381881349767,27.30215759508085,20.789827615888683,17.17627624469738,36.77240896490473,27.500931443700836,31.686691659421967,6.3664229116907265,25.759853526790437,25.238961593852352,24.80139554891369,28.708332890771622,20.48014233843771,25.072775611853302,30.085468045022957,44.447876856554714,20.25872564958791,43.246910534793386,42.44879917786845,21.336015150239092,34.056539543445744,26.88584647982386,20.698939030608024,15.090789736243863,11.645925844482,21.153988133729804,29.047653798344154,26.015972602147507,20.55448422248431,44.94082263292218,30.058280395921074,21.198692536256864,33.73565230905345,27.250501620937868,12.465849971445673,37.52441356637459,38.0138411549361,23.550157252082933,37.57668500179589,26.70014030828982,27.582260238241318,42.37812666986313,40.41473788425802,32.65705392982962,25.677726401220077,10.544544442388991,24.186778323199242,36.809059227312275,11.951484911452411,29.30107774930037,36.70642941849286,31.048432735206163,33.21566337321894,17.80925790353015,34.42334386184766,17.592774099011073,28.47055825641937,10.30277832996484,14.624847419310049,36.50312023066688,15.10722327295888,38.418989407916335,23.269042607888274,21.30963423921109,40.878504816953416,43.75811457204138,34.27675754345014,34.274088653273544,25.185505940452927,41.55355619827364,25.105759781135575,25.97684857799958,23.125698598741856,26.537473611676347,30.78121828222838,36.913258128976096,38.871124577825725,33.243001284379616,43.1397288548655,32.23738047911218,31.522119833568333,11.109289990532238,25.355551211905684,30.349697308158426,45.47259199050777,31.984858055256364,26.62151128089505,41.132129253802596,25.54174547032673,16.30383757723004,20.271508486075987,31.96499019225193,45.89584723949715,27.99393818610858,35.176723643305266,17.039036436909573,8.378821253521789,23.70355938387482,4.329500903485346,36.25069230855455,18.98943322224413,22.1387736554789,14.307400198517279,11.405545107723352,38.694086653875424,24.039220991212034,15.056054870698821,37.983925750678644,7.7049701960036225,32.81800544674789,37.50110132989974,6.3937783097345395,15.18906927452992,48.89976693312361,26.63543403847095,33.519428472607714,11.554877555360381,40.8403966041152,15.639444874164361,34.574218975774244,17.373514344841325,40.174544210665,11.475345507625342,23.95554092238688,40.632965757604,14.749205685305833,26.005041156740393,37.47909103672756,25.934753266383673,23.145978598139447,17.52788361036412,33.89478403852236,41.2834986451097,27.025929162885912,8.966528500447588,51.89728033815842,37.804061885316095,25.109500259366055,29.845067125672585,41.02886373301439,13.43952229546913,16.201681124500062,9.816545715292808,18.092161808969404,51.386214242659875,6.854756646632383,19.186170631361176,41.96908411906021,45.336197833868255,38.60625269151599,31.188635236875513,19.727721424275522,27.455321260063855,13.680135900878925,45.812780204201474,31.519671762835756,42.98877720433484,34.853382408969935,38.230702905938905,9.01418270739076,24.857214762685558,24.851449688524156,36.5479575303272,27.471008849668316,37.01210243523451,33.47059507835919,24.81599599818734,34.39557439141127,36.77843302724976,42.70045915961583,23.37703275216669,8.469288839701477,40.242032724815346,22.512930593723418,17.5452122075925,24.70368779147649,16.357419963206777,25.987767272595967,35.85779462060715,22.210514980321662,9.037778892574341,16.34177204526541,22.3884020335856,36.0506663778912,33.29794633787562,42.82696246014615,4.572716829863511,23.519079147903852,30.846866186950166,33.57334709844517,16.020719376170696,34.53124106070936,23.6149943510109,16.88976295557293,21.448901956339622,36.80719095290329,10.122039228549617,10.889693899676427,24.04741421563203,35.995530529955495,20.043190371610976,12.350380484204347,36.89585121853786,24.962818847378312,39.57631314912781,16.946892757745783,43.98820327742769,25.14081554280888,31.10724511409227,14.879381027744062,13.555273532598749,20.20473685959459,19.870813826274397,39.02527566224802,8.178002678145436,38.38828340396638,16.75438575846004,30.906380737937237,26.206797561031248,38.22911221636166,16.2181987979708,36.1406174934026,15.554332981918312,24.507341267936383,32.55577431522806,6.95802093379363,32.67634788247091,37.268850318789234,42.11797624955645,25.779920620329364,15.72545314439109,23.510147782162246,33.68810145587241,18.40574459889622,17.136940490461253,18.549115273725963,20.16980388272574,19.683980571168377,36.5387556963965,34.05013596866805,17.226954676647058,27.21314644858554,8.720620120833193,32.070407015808186,29.22489811034761,31.926906216948662,35.73804279245366,11.955249277207368,9.412784982054793,16.632582353882764,15.928357532067444,19.708387814059442,36.61504357575005,16.66546768023474,27.741263528896937,28.41714350776205,33.828459791904066,24.2454361978495,47.523773815726784,27.35039713374399,24.258433677845645,42.47546617201372,10.941379450748556,21.884770624378977,20.585361773178875,5.1509478459913485,20.195112192687027,18.798428169431432,15.526108884704165,21.944770833146166,19.420610993091955,37.43689382886051,35.77457585214948,15.3389780174315,30.644289875799775,19.13737397040916,24.402694991978095,18.30299805207963,42.71019876744064,19.536349838475616,26.645408106124577,19.85682520265719,9.545721165439243,32.01574857343344,30.3665553508857,27.96768096755889,18.797282838670753,40.97307701829381,35.980783300259965,2.38844521651748,21.501703043353174,32.9766897973113,44.30191220447158,34.62733042840064,13.833074005006736,6.945335779799318,20.040352286189353,31.61862697442291,36.07735381698089,6.905079889195524,36.57573448421146,29.90191737921252,21.44273763822178,48.12627626054363,20.839336814672635,26.771051934828122,15.534707776547261,44.79183058244324,16.01782286850794,24.59924251572657,36.97753343144243,30.091222575177397,36.450980920296935,11.650458549260645,37.42249569035306,5.731881053328344,16.55899823907529,43.48597395267487,21.0974640321241,23.12752352389521,36.93250366808492,10.56965517495371,25.67537591065636,33.07633464193519,27.965588491276584,32.35669979054831,19.60331948531191,16.750554358160844,26.95850409476396,16.237343607291955,32.48585763466119,40.21042464072751,39.35891084519558,18.22266289662574,25.113801070408506,20.00559795854454,38.25975806889957,38.20959038113401,15.951442420418083,26.45343939267795,34.476971088585394,10.65172764154985,36.137736350072714,52.0901514208423,24.72192577097976,11.997379391311195,26.571430645959317,39.942639716097744,37.82510568128757,26.759699350317565,43.61675127012724,7.499362812527142,32.80175155285971,18.51756402303698,13.565423338287278,13.671095540986435,31.99960848327342,18.532468936647483,15.734755248462942,20.983659276288485,34.04034943463107,17.41784989174688,39.521150335210024,26.886653700257007,15.958799302189979,31.90734909773484,41.28958423475325,47.58273317820618,32.63417675610207,37.392570670434026,26.722236132285946,43.13654556773563,41.54428414194112,19.670224127906113,9.437286552790532,7.2013547642383395,37.50758180383298,21.522690633135554,13.653417155427897,33.42679691121856,28.73572406216208,30.985132618453633,17.177943083078294,18.86329503533376,24.278963480282155,10.815150064201108,39.90082014798741,34.76365533644766,31.765771899770662,31.228051056196605,13.839318060063839,25.58077247976322,20.38229056371008,17.366722476832162,30.830776771085574,41.31333727684266,42.4706290959089,27.380289196514696,19.11578702509242,27.225401364238074,31.488873002587326,36.05202457715278,32.7572917011712,28.643855881371948,14.643656082877918,23.468501525753705,36.42175325298281,31.844947664186737,27.485338027613125,21.73522784176132,19.883309469938872,10.039909006474002,40.856646932577405,48.50845152345285,12.754262286104339,31.409149596765857,17.132875329297626,21.139900991209387,14.105247724670573,24.382613257616804,42.10515222156744,14.560087425394293,30.667038873528764,28.964064584682234,24.67748583458247,17.346467947553545,25.141652707302093,22.90734048295458,40.44126058165484,27.058370797095616,24.61683485351665,24.670406577483675,2.508327886938961,34.35297916121041,21.18073778741122,15.484110901294132,40.18864962527238,33.821027064584044,26.760472365023453,38.631112843530445,30.330068207131113,30.453539345255347,26.998743857917006,11.106893998849587,31.535968189135748,30.182679477172364,26.575896577781247,37.81330539986395,36.32333780135545,22.41057965069475,25.89781323154317,26.90246987854595,35.61831828885008,37.3639153683316,5.38576843154503,16.81622710238137,8.001874465152007,18.96422506756366,37.0184596567838,14.936253308786313,13.475633421795216,50.59961307374033,47.48106952895879,46.34083879111685,19.381018698691165,45.04148438349311,15.478156770484773,39.484716703624244,45.269270376790146,1.5018796473968368,1.6602923949275503,21.85019081997334,10.614886737064642,9.694316880987405,18.82940017667935,15.931294827494895,3.374923454530304,44.582792389709276,37.30507278291998,44.22189272673796,47.73167034159684,32.289056623287806,42.25573314326003,22.87806198253986,18.200722998216726,27.34024341658456,47.99578093503047,20.1464361875835,13.590809599126722,15.677208624965793,37.65948904176554,16.923617646502223,38.58887986357547,32.6194597882475,7.521134209164952,25.480774072097905,36.111900241119294,19.21764662600879,24.197707493501486,20.806261243530425,10.775797226370292,44.6799840105498,34.07433282746938,42.95364947368347,43.456006675094315,36.541412589922324,25.059440113985467,6.747294706016219,29.340277046211142,26.28916458802763,4.079453979850778,41.130353795404076,41.27553716146093,28.280822943854837,30.810787777374394,22.668911250719617,38.6424922198763,31.73815241092356,19.37009669559681,44.561729479888484,7.395808645430309,17.588566585160326,24.46341897847505,27.689721158750245,39.10024766243746,18.816864933373004,45.089587644550946,15.02403900355175,35.87199063705423,40.4127087720434,31.94662909974097,37.88540596570269,29.64470635153178,23.719937761502532,37.288672889084815,28.836490273385987,16.55504974704507,31.750369749106014,12.656288540001203,23.00063211414153,39.349033866249115,30.607021147517624,39.64906575302659,19.315083202300617,17.787355303147216,40.75369088626643,25.261025074528376,12.71544941697849,37.30016251981646,31.750364164626802,32.66825314701099,22.3425016230778,5.8578559517548685,26.829704139913865,26.001828320447906,23.688095800365833,41.80807592307723,28.972453420841344,24.032464469516565,42.95016483822574,18.66256123010364,14.014690899068292,42.70387420959618,40.55380656605966,39.1397006824033,29.67433030361196,41.28327312269908,22.550713860965324,33.7699036149305,34.417457415951176,21.74301147525913,23.502871819107465,34.091613256427365,29.04681018425674,15.685374983160267,18.620430398311264,30.547475880856904,20.44944967228392,26.014550189476118,14.960676986991519,15.20896836894589,26.45710558876557,30.303819052449562,20.100686857513498,33.940207345179246,35.666026740652825,37.56947651318568,41.71858532549928,34.148741658615606,20.628959780990765,32.96694796375241,37.7870886251869,6.307351451328888,26.563424104636894,26.09334513342715,23.057403151619486,4.986874830585876,31.924591825099792,5.729127478327204,27.792140546843978,49.88188793698625,8.471618195317195,13.709606073279446,10.635800683772683,34.08973479353466,16.178060582412424,5.284364296137319,33.482471442941005,14.013255803737785,36.73882114553457,22.339920852291563,28.83763069214085,14.600916425517937,35.96557849477129,17.39967356936767,5.850329225097741,46.914908939224446,23.257545605933394,19.755713595317374,20.29685494871739,27.96919196475296,18.380713633623596,46.50865127967386,39.387720312800994,31.824877006097232,37.53560535661023,17.75807781858084,23.518966678096913,42.40831427211493,23.621798349395778,43.51863119862195,15.348061997548925,39.792162069944865,44.42799880069322,31.016357649608743,24.422655915846782,14.670789011638487,18.513774000359263,26.53421866615437,7.725095784384725,7.912962300770786,32.099542638751714,21.05689051685309,24.622326508483315,46.79047974772191,34.51428237564077,36.31985564830212,32.15051842100567,19.031420195713903,24.27173969138115,20.743658334769954,33.80242193432974,5.053907126107537,34.19494079339192,8.881423376467296,27.929858652642885,11.766881059338548,24.035611239927903,42.090502579044,34.16773045951946,19.460252047794086,40.75494800513114,14.752707458749754,27.02809016805073,3.2256645065952974,26.600012056272504,18.946345061168856,9.863453661931286,39.253920389976656,42.45668517791357,46.57899751621433,14.059402125642707,38.831165284188025,13.102404113935798,47.15110409081402,30.257911511556642,32.238593542423246,44.353548081021,20.156157509135834,24.62642420993428,31.662804392522943,45.1465111815968,12.344529110513506,21.544570792278563,38.25619448812484,28.954397583243818,30.727168421580934,28.285262777299934,27.78772875122051,7.616859189580428,33.553386109583286,32.20479206949155,30.300523262568184,30.423086060200546,34.66133486560977,17.739401300939587,24.329682942890315,34.24509992602669,23.291715594772736,18.037584080284365,25.57059896841786,50.789230481802,22.718792210388322,8.916350307243512,26.758576478162116,20.505399423091678,11.324626434541859,28.65926906033711,31.110161829765982,50.82513198147925,30.187309565929368,16.986631595406656,23.842664820816612,16.309530759023726,8.50312681211425,22.38645341720577,12.551227815055212,6.930827245583134,22.034168834346094,40.322172897001806,42.25211158391158,17.47935592213613,43.7873779274168,47.08247542154705,30.27647791163426,31.79700917794272,16.49160320698015,20.22362815405404,16.203862384917542,31.368954649415404,33.44169526104247,18.27762614634888,50.577062390306814,28.588681215146664,33.867669354564974,8.983623589448278,26.861989490568128,31.843844220013573,24.556817771576434,16.381225913102437,18.369219924095628,21.067238259757005,0.6452153416677998,40.02207193245936,45.270198245515964,50.776658166947676,25.7387893185177,26.8227002788749,39.918474400710195,14.52131750866952,16.695336972804533,14.226149041355157,42.50252368746024,44.09080651578878,9.434589837091183,38.3172594626903,29.07520284534663,4.886666805986784,36.727442078165794,25.399773997043553,42.66229979806009,35.26088841013385,20.659497456210325,32.4388026973767,33.912795083898345,23.737056882149737,24.55682696388312,34.08436070386164,34.3409760619573,35.67844692914352,17.13107375687686,18.96064787183809,10.638691290109508,32.53398095485773,40.28357635258368,27.294042875159622,14.571554825111189,50.76173837386128,21.589353464215648,48.082135693811466,19.62954885123552,40.83458795574839,38.778712337376334,36.046529939288796,42.037128593847115,13.870593031043379,24.51713378667708,45.29371191294528,33.8886530519561,40.03021960419165,20.047364047348474,18.64433883177334,42.57708573951142,20.313836075005312,42.98473396710091,27.236961256543566,27.620915363554946,14.641711289870436,27.00804743292398,10.829114725040515,19.359362121566633,13.880964453418041,16.329567364833984,14.23205776675529,19.20242754661056,10.921432928767574,42.07579688130401,48.68084126315156,30.17329407015267,22.554736233590916,34.34818171110893,26.60635646506134,16.238455001114396,26.42669642960523,34.75052879564941,33.77286089566501,36.68281988059435,15.24988520392763,16.897216206831537,16.050590094446825,41.218205774735644,4.682227230896295,15.018650248245446,16.51609559693844,26.672318490464885,27.86517841894252,31.600006822920136,31.86320480447205,19.01017953302711,23.449288938810515,33.96885832215329,9.391151217313984,35.855652924488176,23.34838442819394,35.03143279197175,34.17555910106936,19.331098728471517,8.789145565939867,22.760518030523706,16.974337238499775,43.96670464988999,48.92302500442081,17.756600844848023,15.789279588363492,37.033174610772924,21.203307537650943,24.20612360430041,47.59778659869944,28.305966241753538,18.392207873064283],"b":[52.40791773657655,42.34418720177115,37.60921746068718,42.67761519250362,21.740223473646754,15.49086181543482,31.911848779471235,56.53756055183569,45.00278566017067,19.800182122469504,37.18861582050242,13.90036366451541,7.457936310427442,26.087999006649188,9.349344668418592,14.168895570309363,52.582432299054766,18.47589401669007,23.436401481562193,23.193818545597384,24.61144038524006,15.803636614719894,46.21949801137207,57.69519255362461,36.32352262871599,23.92236639331014,26.88691628884339,13.948452622651404,22.271346593885397,34.36581581671416,33.651522593716265,18.761937872184525,19.915744490284716,48.14602649053445,32.67995295916177,29.602746532702714,17.004665398108123,28.621755869003522,10.313972536347586,37.11187183244483,38.93904855308671,42.68951076977558,42.08492361984848,16.82740996428518,29.2775481100142,26.850327050041802,29.876971443316435,50.963069418513214,33.77683550559768,14.056347380358822,35.131337718649206,25.96513210877921,18.68099040957646,26.1044718311392,43.67718583496986,33.625146749615766,41.776439486379324,24.354827209700552,42.1567049056519,52.50512467114697,38.00963569994373,41.945837232626836,45.29983638209255,41.02129270596952,27.480943872606073,30.59351769696807,49.68019360297891,32.14349007761514,36.81951180980209,37.53869923813879,36.37864418267654,25.165675677385373,18.671241433063706,55.853294195769884,33.19385405231002,11.486092857969474,52.593334852262146,54.304455640308035,28.676886258314997,11.393413825107368,25.21275389285858,29.480368026302244,48.00622344935269,36.976803803343785,15.658787200018306,45.01677505085527,29.439679231947764,24.52087030761644,25.427083009089134,43.949337145459566,40.142745273150005,30.565856039994827,32.47967641269629,41.77741292265874,36.34034393474183,37.25427441165522,47.33184102623285,56.722354874167394,4.530610030360442,56.16955258047628,44.221952919540826,20.50330920328407,30.275003597171878,36.675728282278314,18.316806896245986,34.54410116324276,23.73990166641928,38.984908072839175,25.62461056657864,26.34166254619644,31.605195490832294,7.585922429304506,49.90882022488479,32.020381591926714,34.85194598938166,16.329901869616346,22.242560713429107,30.47329976192882,51.31160747944267,24.257211392236606,52.24691772338009,7.611066959395205,29.29099334280381,26.035064269617862,5.050512015395809,44.36692884778468,15.060336444512368,40.21657061817013,7.439235023236548,13.009708442321898,30.532559528420947,32.29463190365831,37.2679258074765,27.20376191547852,19.12413190318351,39.87030279280306,16.275417308927004,26.90286933237408,24.909973409413766,30.227053330182837,35.01394109035947,12.376329396472618,27.959065317324793,41.3848873083006,20.0255816694704,27.96406346388734,25.487033447228946,34.26086883286251,17.957669424805825,13.227258182362966,25.00167490050716,30.984047867674036,22.570394687780116,17.94152693370581,41.04168967150838,30.893547264156393,34.566689481509805,6.575242064877305,28.60024818735721,29.368377175922767,27.892850105836985,33.60505545171016,21.735143950560243,26.17732231373862,34.42174796801632,50.062805501552305,22.83972602868016,49.32375174783236,48.4232358935597,21.698015760635357,37.24463962090036,28.837782583898026,22.788813513897583,15.715280006229264,13.839443103151101,23.313326352517834,33.66379513463363,28.296665846352987,23.372413651615012,50.340602935453695,32.19337439313037,24.920445665806312,38.550067081904295,29.48786280683653,14.092081447839186,42.27453367283113,41.94366993517502,26.753497159342082,43.673692765607534,30.981998978678646,32.40256444158897,47.971151952732676,44.47299391958066,38.824674631529625,28.432515664179263,11.1901682372788,25.65837714300327,41.58929855943005,13.510713801190025,33.211313888409094,42.99941900608618,33.24914861166869,38.69112380163081,18.502581793222774,37.47232519544068,20.402649293255198,30.897782075332145,12.128854485472926,16.167406022755042,39.782268406067516,15.35484546889378,44.54515658656642,25.68426629584646,25.348568945613653,45.94422947114324,49.889589246686825,37.32650350805018,37.1480558862029,26.96214610633629,46.52113024263015,28.81585363681065,30.263356434376952,25.940042593742717,30.991428724205303,33.37722009796292,42.13152275414306,42.83350666010452,37.223968149418525,48.645398307350504,35.57597827007301,35.333658213589665,12.509964451088283,30.004247503683228,35.43632689563378,51.89609341813954,36.89400461719239,28.66055999400713,46.222122412576965,29.780511814822376,18.84580568110083,22.335800860410323,34.87596512991588,51.12046856027759,31.984612874846327,40.3564007476777,18.152091517245395,9.58771282422957,25.96027218257997,4.43151465623973,40.43787074921016,21.189362085866037,23.676111834197528,14.566228489229603,12.18024892425968,42.50225224282982,25.220859314095406,16.98970097358628,42.089407863794804,8.805519012785577,35.7380356426558,42.6071929534275,6.668765616021086,17.470084339523574,55.17429755828992,30.926164760702207,37.94963141578387,12.105514186941546,47.054521643315084,18.45746726901166,37.94339833973689,19.966620569183824,44.7349887948525,13.580948155393138,25.06912771258306,45.97855502914166,16.000691839428143,29.170761029226227,43.8175194354701,29.886641783124666,24.460333906245587,18.381712749101247,38.448913465924335,46.44371939897344,31.70672347932531,10.631573731819191,58.345344683893366,42.23850006647631,28.578663855933314,34.105174443173,46.75235459057926,13.790598895815105,19.191827046234643,10.212841554272782,18.095345994108573,57.54557182760519,7.052521739293418,20.584097927314133,47.148377822902674,50.662683563167846,44.300357734382146,36.5065624689818,21.180821076432245,29.782744554064237,14.771015680813528,52.24617437249837,35.33882858928185,47.90394300762024,41.09889446269418,43.98709702302468,9.431353491175528,29.55173939574665,27.73692462455317,41.63744484459011,30.05907664167367,42.65243402060237,37.362643787418925,28.097764856346508,39.87227603754521,42.2548719596377,48.53556317362795,24.63602338109618,9.603887783132215,44.7129233514147,24.852918568454506,18.751927303651918,29.261256657090044,17.531614545407955,27.442645995405925,42.286957741877785,23.389731040104728,10.471059802055,17.96413539093422,23.526871378589128,41.01613850569159,38.65576105792297,48.83476328878309,5.225792425442344,25.44299963427062,33.48090274119559,39.64220961736628,18.05607586605585,40.26854938098206,24.688074395771956,17.9077696610414,25.567892601879116,41.692627392096995,10.870513602726,11.493656836367997,25.807951019605078,40.62702365461814,22.934959015269122,13.134068544715824,41.80957934883348,29.079596491859125,45.27710154447949,17.233691815488875,49.77775623640901,28.422260210196498,33.27199145045392,16.918726733777056,15.082358577872563,23.660299124552594,23.337248198116164,45.45370755077329,9.364685212022232,43.388568764817386,17.967277280206588,35.02095393237728,30.63831100257195,44.551537467457685,17.228543278320135,40.60050897989559,16.00282118138744,27.5927025101063,38.34882787798699,7.62238064633602,37.84489936516996,41.64818320846383,47.13855991901243,29.98112128265238,17.876924179105647,24.677028268040754,39.85577609712743,21.70156398384761,17.84164296319778,21.60064987782262,23.000525220907775,21.58934071436294,41.62240955355774,37.40152592309019,18.221815918097587,29.725202011169536,9.344764832282898,35.894131896821364,32.14873274906209,37.71186847653976,41.443039310048974,13.98951234086384,9.586300437671067,19.53220558327599,17.26060580466687,22.085269719255788,40.6600528567448,18.310900925724297,29.61636290449838,32.57522137262502,39.77090786567585,27.95557709323906,53.61826823989774,29.354760679000947,26.33337184018213,47.812807320649284,11.98530147255969,24.412953526852004,21.822230777913568,5.803407395730162,23.01428823144583,21.11022246774305,16.655378611582318,24.763479822230213,22.430142317424405,42.499459747111494,39.63178344357374,17.57159589228651,32.82836781012324,19.406935410581013,26.903497239998828,18.477301326790197,47.48446004301848,19.57302568471492,29.59940654252542,21.766769894418367,10.39266721085134,36.71305654817733,33.57223921292494,29.735150541560156,18.875127533640523,45.229230838531194,40.425266802908034,2.451993945390125,23.615576199082554,35.66593820360991,50.1908137317788,38.011368314860405,15.90007430498638,7.259481423456919,23.578719671736113,34.359890149128034,40.53058621067699,7.613179830847701,40.074460460584284,32.02114237993092,22.386514921630237,54.56490946090658,23.899418491913025,28.24168141298523,16.370190345890524,49.68627834765756,18.129383597407486,27.04687574909353,42.926264930916474,35.283485186753275,42.782548367239364,12.923011477073576,41.724954626411375,6.758734021617663,17.855212590836164,49.27052850373324,22.823992881355657,25.196422799357023,41.77816341047098,12.514790681662923,29.464886933051833,39.18704911922577,32.77698420061712,38.60806743497228,21.61937042865602,16.92655983382498,31.521636716829214,18.245535424728068,36.8110850935597,45.924562006784214,43.48471549224473,18.767000297930274,26.401618074723267,23.560689488010276,44.11047160219532,43.07089571818821,18.167159818877245,29.019582216213642,37.819148302246454,11.72321651921548,40.27571969711891,58.409918592581356,27.630804371412786,13.12249472607721,28.907987565992038,45.679599921678395,43.95175366059815,28.390040209297226,48.48629232022083,8.66147661353763,36.32450037766991,19.706467456138267,15.266445562099129,15.72600899251427,37.082021499700616,20.342351538861276,15.7457564267311,22.74808168564838,37.21707670356762,18.257030662628125,44.73256701481034,28.347844020651035,17.270582558132514,37.3644639175281,46.827578483709864,53.46243402903741,37.99347134457273,41.46097518426646,28.051685952254047,47.99823788156684,46.05105094811103,19.952718134525323,11.037679730630149,8.27257648213536,42.587393832547704,23.605493431814516,15.99068829924545,37.1217404811795,32.67571598841758,33.43333064489282,19.54025656300519,20.82578255069435,27.356525023858254,11.25533195383228,44.90820963899399,41.07542711647639,36.46649432062944,36.12560003634536,14.788507783910752,28.201672001081846,22.839861635336206,20.14992234107705,35.30613383178972,45.769173462390185,47.3013378790138,32.0620290994668,20.43242969462323,29.060954044898004,36.0860611725836,40.668228398356376,36.83545955256011,30.743844873501942,17.38247706358518,27.795067774580026,41.82062097354684,34.665125537156584,29.006800293943073,24.704022830781756,21.168602565040857,10.547884086427967,47.25695089087792,54.39548636219869,14.968507544951507,35.05763713420062,18.61506247697126,22.023572565668875,14.242112262786053,26.38456919663094,48.498861192859,16.16983993534962,35.08994509137475,34.3053183854923,28.440421295498545,19.685557314815743,29.62138957619446,27.309592879198092,46.33013391838784,31.23185751429623,27.21825574091706,28.672071975993326,2.8737187943443088,37.81013344796433,21.718354817176973,17.549631832985195,46.61389722929759,37.42112134002741,29.326142026373567,43.06831107854326,34.44133572858567,35.73407183277079,31.294085212471245,13.076125639139358,34.749635693169836,35.13143477891142,28.066481664004215,41.40627480707632,39.783787948429755,25.990357110542945,27.276852053603342,29.430742915553047,40.294940231586025,43.80728039619016,6.028024920850816,17.397900914140656,9.119158996859472,20.770409825260025,40.81665325401194,16.69955664861113,13.934258046445821,57.060698515304715,53.452901236624854,51.885132146222446,21.508258402189185,51.436443453520795,16.139255272353452,45.85538534444084,51.244445151048474,1.54829334015961,1.6808418977085893,25.02861542738472,10.78319743150059,10.985985297732865,19.73439853509789,16.8494179545753,4.015832654108151,50.4452831490339,41.448636194622594,50.0814224067783,53.103882011838664,36.81625013188324,46.919937558733075,25.963676565653778,20.747863205232623,28.79567248585915,53.595607067685606,20.84146040826115,14.887076052509304,17.653117576549274,42.769363641845885,19.394332023910223,43.08374025222193,37.03888056804986,7.82362027927312,28.673100205504443,39.41708418591736,21.256937903628767,27.537230053906473,24.614415940754565,10.90284790357039,51.08706131460497,37.617360893032,48.80651139765267,49.31667110391291,40.59353919818811,28.673920855081988,6.922232090821598,33.51842910640761,29.344332130923583,4.143534997878331,46.438887886942716,47.59610657096696,33.53854507328,33.60359863127242,25.001448742734567,43.181798428171284,36.984680012123405,20.408746188585305,49.33357865649736,7.605352052525838,20.164380003882606,26.658746661155213,32.810612162817215,43.1393609488064,19.798577118385797,50.16881192462512,16.71672636775569,39.59296395049125,46.34393570887045,36.705047352595365,43.95792580220296,34.366967811563185,27.9708353007392,41.56726479974634,33.238381422737085,19.137729529687523,37.80839150174707,13.467566185581624,24.257346381554676,45.31440578401204,35.50408538564228,46.025538079372495,21.286249753559474,18.01174268786284,46.10297634297108,27.256534609004056,13.413472457999637,42.05944703968437,35.71622259214174,35.903352957389444,24.787040088914463,6.636496263229046,31.898203264206472,30.816860172782356,26.82552578667311,47.071201469580494,30.874331180426285,25.18804187684541,49.29895208022271,22.015029759116064,15.395016456723564,48.324167326599095,44.68583576600122,45.28116591701645,33.82473217097771,47.63457235119039,26.452182303821957,38.63394800937925,39.43350855339097,23.827864764501825,27.875232975104986,39.066950694688444,33.501564934003724,18.351964448594,18.921998815983763,34.50854709035533,20.739008106147097,27.859264106098365,16.85870339229354,15.425473609266485,28.525572330758116,32.76857778116245,22.197924119911505,38.579422408950066,38.76879764134924,42.08993287068276,46.5077944997633,37.12311495038196,21.254892634642616,39.03893346075614,42.20820970034756,6.655406048241885,29.52720154247703,28.984601535722984,25.49565365899268,5.867781578344191,37.22625712051274,6.627445047227458,32.01717807900982,56.18651017140446,9.953576567744609,15.737908642558152,11.502487006800898,39.126017965203076,17.10555689851695,5.372211877236102,38.229673021229075,14.529060642543948,40.12125352140558,25.35323300372308,32.51110343278306,16.06209460340461,41.8001332311675,20.214070622444353,6.887184803932529,52.77896931019427,23.888339658711107,20.675296888936494,23.41416271676095,31.137995809645897,19.07292398568304,52.23856533117283,44.34911155253598,36.79257969082458,43.6315049278702,21.14976473392081,25.146338435225488,48.82959993172423,26.723126808340457,48.546592818409536,16.5937465377717,44.06357256525672,49.25714648128606,33.59315191932871,27.489038751364713,15.283702533533452,20.854605049144865,31.13931877024537,8.702835753351078,8.752599640530963,36.60711444335833,24.528850475822782,28.084616534450348,52.058647241371766,37.87007433765408,42.148228973657666,36.112736193344276,22.27596568807913,28.55671853002617,24.352740634423625,40.130571126487474,6.010023249669212,37.765737275156035,9.35847652699918,32.305081343003124,12.571038444632103,27.652303538529146,46.789052587471645,40.48661547153145,22.41616180649606,44.919038343917364,16.202232239088843,30.236361854059588,3.40742759464566,28.99162441515034,19.960052759645272,10.34749365310201,44.128433566754374,47.397664665360935,52.342337148486564,14.971676411146486,44.262857117776626,14.359829035741111,53.3537351206621,32.369307475955445,35.04489301802184,49.731177336667784,23.370310728556312,29.22265386652008,35.530265937281186,50.556938094645076,14.495137369102453,24.59902688632385,42.69111368364304,33.74024196309123,33.75692701648206,33.40369103617022,32.63581072278778,8.723725130483015,38.3341891851569,38.1014311643444,35.47523309787986,35.2068072586135,39.36631873542174,20.51486157130926,27.419330498902205,38.68492085962524,24.61414791546349,21.337684282620945,28.633050500110638,57.09853014003562,24.985479347211964,9.773895160516544,30.27553622726286,24.27751250838111,11.401797112629266,33.07553455876583,33.4942798600143,57.105749871119464,35.12354898414219,18.336634697651878,25.433385580023284,19.05220123070451,9.274905040912312,24.084040814170326,14.66545439837077,8.138754272335165,23.508983686782756,44.41753844456924,47.86077636633395,18.70093509132183,50.083659948741385,52.80607302780827,35.70574840292336,35.31501339488552,19.58417959105208,23.25510050749918,17.97570698880176,35.49973307669068,39.74222444043395,18.927516729982766,56.58772734295336,33.223938807982655,39.41683600828761,10.312224223842495,28.73750437447399,34.22186050034195,26.55883976404712,17.56631727037427,18.413035914891672,23.122142366239423,0.7327068739017806,45.19287826174511,51.53343845608849,57.23188652542875,28.513935362335708,28.94386906459481,44.516149998684455,16.231671085610042,19.492234014366474,16.325987623445588,47.774871250528875,50.02028721791765,10.577030119747475,43.617656071243225,34.366643054028714,5.165547611541079,42.017792526176315,29.850438871056333,49.03864828419654,39.99923247676684,23.135344825931444,34.92060619297208,36.754814250385486,25.869612367439217,28.52923255827445,37.550922749568755,37.921630538358826,40.12467480162972,20.36481340243565,22.236258337063752,10.888530519065323,37.34839466773047,46.00622394221927,30.464143691527795,15.805706257295395,56.91589502758324,25.12638481146766,54.296846954388144,20.49539208907347,46.459497465781936,43.05470502951199,41.87106527768553,46.35889434765795,14.558018476297944,27.75267778445727,50.50798151773019,40.19951375352798,46.298446725546995,22.026433282959875,21.00898452825401,48.06777200700491,23.11618441251645,48.057343910777014,31.972559139939467,29.900789012230454,16.840350849513634,29.82946730271064,11.383098569095198,21.740279002743456,14.231600135716421,19.21907231288126,16.16580233671938,19.707005377834612,11.615751581656166,47.457844734400126,55.12487570731014,34.11231969391956,24.263551977657908,39.46974620386597,29.938112991447234,19.115604822571367,28.339900161829327,38.13435177572511,38.782427268634926,41.86573764462503,17.004721017515795,17.786966745112043,18.04290364877383,45.80207285447586,4.700020986519822,16.824350777825007,18.871310300470835,29.18187158982993,32.83072796377489,36.53783636582685,35.92083193041091,19.42751861912158,27.115405963623118,38.71729733921171,9.41452325980617,40.10479969574395,27.031575559302702,38.63242627309914,37.60583830210366,19.41381047035099,8.83029063506925,26.87021034506804,17.730884787961863,50.145513699530994,54.642286449261846,18.749920620725653,16.384165427130686,43.50870305843683,21.946926848955414,25.032180345813973,52.94021285516188,31.921335436487798,20.771138490884592],"a":[12.696917194954803,2.6677123509111,16.73211366255979,5.925838795437852,0.023883621002798172,9.242456452756201,6.20180846228402,19.778493860150924,18.1595885483311,7.703955768269144,1.630433728584757,3.2328061542323683,1.8873289908938418,4.8593274007369835,0.05645466569578428,2.3427326906121593,13.189836522675087,12.903781436230158,7.862159339773722,3.6984257073976856,16.0943765746446,5.483076013734225,15.577434017505691,19.1523538641891,7.794062207347707,7.491171635909315,14.054060610300908,9.876587073674745,5.94836287099743,11.806732914320971,15.080484359768258,9.157312413868382,14.398873161978042,13.745503549384592,16.761946739243673,11.697697508136894,10.736861332593094,3.5246881116564532,10.140990657215516,2.320187376942182,10.976244782882713,14.77458944632128,6.638804205773159,6.6743392570507964,18.904752379449423,8.775128944881065,14.550003131680747,17.901360336630884,10.319886715949703,6.596097710803459,17.964453329238268,6.0018078536905595,14.953615399544526,6.185606319561865,18.27805622608903,6.509143630181593,19.388103496441687,13.120133310863377,2.691128695410847,17.411447720420217,18.816477468286465,7.326594311031824,12.961088838612262,6.471335122622848,3.859869981659929,11.415417487158477,15.532764763012757,8.461268113819695,0.15633519897328974,15.541215335421006,5.052314650044636,13.011461665411579,8.065023089137018,17.60277472722565,14.283480740839769,1.5197484754858337,18.955987692246985,17.96852814594276,10.882848473471327,7.855262214898184,8.220205603566546,9.774764527414499,15.557490943998147,19.89841477282301,4.658307027336179,19.788615904261096,16.91341464697114,14.070182972359934,7.429986792994794,18.613960930632672,3.584653836963101,10.771656772412923,9.258925882746677,5.968237838903141,16.809838101682434,13.609468486629673,8.074696551036356,18.220954053006025,3.74549261331957,18.364783887837106,19.433233968145327,13.224110411486434,0.49921230740764155,0.6025518138117691,15.500011679229262,11.093100253295209,5.2659662683186514,13.418598955827626,10.84218701023882,5.890254480202559,11.135436979564739,6.754297087569268,14.20192419608929,14.154602372454166,10.956013300018501,13.137071022439525,1.6436503346808884,12.370422789898093,11.81460327263309,10.740094126057524,16.910264659323566,4.477839447020027,1.2720852566549112,15.03726866106919,2.5943533568604193,8.858400657514455,14.948495876152093,14.263218217476146,3.4096831708310082,1.8340464099783782,16.957186399536845,7.328627075911869,1.5474710408299153,17.41796742921825,9.222589261107101,15.48371626503695,11.937368840861623,11.158683614722293,19.226051726458458,5.268872421631667,1.548902361103952,3.993855977258276,12.193710767386271,2.9034769161008134,7.2992420611684095,12.000921424768158,2.1200548365537752,12.31895844664194,12.976142862445222,1.9455171754361444,17.38404525532893,8.260694453631396,11.581350513060729,13.218664336165418,14.693165642414545,9.955495725758002,16.79233894474521,5.28648246962252,11.070314667105912,3.883052324361538,8.81346173206444,3.384177292743762,13.989708031480488,19.360442067174993,7.6597279464373225,15.40940777684253,6.910684304526811,11.819589401449072,11.551078689138725,19.463873187901946,17.568788518386445,16.791108008974458,9.8908309671957,11.861142034182999,0.3018131907218091,9.986637653723145,5.174567257726008,14.221015900218177,5.981127770390322,17.015026373338955,19.016312645275192,1.9510724848376526,8.837164125612063,15.679643338571495,4.055543192965141,12.958435161796555,17.690125799230078,6.983591097831687,6.045069442274289,4.555848107077569,2.6533139570766817,13.452934203997744,19.426841180661953,0.7602526763944351,11.43090905211059,7.205601458360711,16.576178166295815,12.087314604075715,3.8876923389184492,9.07868875758226,4.161263644911122,19.667091319795137,4.898475675868621,14.223626525827449,18.655066867083022,3.0610713642662857,15.91779609837599,0.8589439855759373,6.647267802214012,19.544499931190764,13.826606913477239,6.736571439369801,10.778340977005417,0.4216607666830763,14.68032884047313,12.048248069756244,18.504526141557875,19.410924060099838,15.997337437413846,15.862981231351831,5.918437461940336,3.8085123947334276,8.570884771977493,3.5031581297111147,17.355594694964335,9.92619817716934,18.379054802234158,12.654817439731524,14.666310532526307,14.971307328069852,11.81016151812421,3.8654860911121203,1.3141017003397337,4.043408246507174,12.25246411658491,6.596449820797701,16.076256523208375,14.808444964653539,3.620311875543374,3.1576576606554774,9.595702242839405,16.910434548970343,18.875912656383154,7.355548834652987,8.389225003903334,11.282700501430881,2.126852134021484,12.03262125265332,3.8019210547720883,14.596053511222568,7.612161965063544,14.188192269631003,12.968829792373167,7.399044892895632,18.99957124738025,17.928196244170667,5.055905960555798,16.75179210544578,2.013312330447552,17.716619139507586,11.09416134855433,4.971639063489737,3.392448226782947,16.45006452934937,4.445258653448421,10.607950996062527,8.707175329514305,8.703091000234483,1.0656076355355193,17.149988505526544,3.962865754842868,16.589502009701018,0.5858968169747936,18.19645516739746,12.9874267688438,8.276952111336469,9.633032811788432,4.698931446483292,5.496952582649022,16.348587502493185,13.112174593889883,10.342401644413357,14.596621521736107,2.8184797685799667,0.3554904046059937,18.550121546668677,14.870681222636023,7.168185916728533,7.813265399090805,11.42894843516216,11.623875535142147,0.7376805321729618,7.76704069141489,18.075694304651215,19.532146971355843,5.8319839826555775,11.956574117186234,15.183568294603646,17.789455758776285,9.158310664467688,3.686154749388537,12.212792564674366,15.41869290175975,8.038482949948538,12.541490496873298,11.768313477253422,17.56923953531725,2.5537540208839404,8.460623329138821,6.856719688393027,0.5787569193178488,9.928771234753878,10.226889294049695,14.086417289221398,7.842258133304112,13.342265184896505,7.843822433823524,6.0719675452663235,8.45618484574194,12.523319217017672,16.865968629849245,2.6015354950457903,17.12013262107217,10.411322052061154,11.304499062259485,1.1335178124357537,10.284891668623413,18.46363767485176,2.6083864252295808,16.112017340317323,1.6253457159611528,7.95146990113508,16.50063231053878,10.370961796468778,5.589181557483887,11.756694317937564,1.195235709809368,13.569227762889465,17.224540086077656,2.1872890117193844,5.4945595200917285,4.859866624376572,18.065395474520912,11.624984343288629,0.14690685321687713,11.541403273336739,6.251188618392467,7.766206466218963,14.942526731191235,12.043049849148257,5.087963038604619,8.297416866656565,11.48374869701723,3.672268620384682,10.093807134401246,15.463667217954985,14.046637638028962,8.170318580997042,19.911925720343326,4.332590325382721,5.657717806974105,2.333763900142811,1.943614090039465,5.779649149739248,2.04089101634076,12.528536821047567,10.48173027553406,9.627231164165376,3.2885426401686146,5.531715371201544,10.99304656409149,13.075601138336577,13.234907119845651,8.550919967673893,2.596104763743643,3.522182263313618,5.946387110668163,14.620455166006892,16.15325383451885,4.052763741991923,4.5987890196180725,17.475445464245766,1.7910212457132069,1.3609065692104316,13.492463016435368,2.7676336469420004,5.5302921009841555,9.830116862114057,10.2478560828005,16.717906172257692,12.08187639961444,14.22166385056479,5.492759528010658,12.295424331825213,14.103836540643826,2.009082087144378,6.233773824824005,1.4347442434315782,8.515423054356157,1.6367338198919024,9.03843021218162,7.4159766234625435,15.695654504267885,8.155855992747401,18.043898044421837,6.913002824259005,3.0961734961997145,5.0578706055192235,16.00515637961111,16.984522068652854,13.527571100811278,14.872583622364527,5.542575784917414,8.809883001946597,14.18870304063355,1.776652701967909,5.615308706725171,6.842627571683009,9.685916404997176,7.367382766577246,3.8563558027945843,11.255053742235699,15.82643216961253,3.7926504993517574,19.348994143050376,17.74329542722291,11.469410645021627,17.4015617964854,18.0193705851719,19.346675045735168,11.368349806663169,9.97925179394095,5.165609127186577,7.722896249475828,13.78786707314735,18.826939594167875,18.39469699816979,18.96172141227519,12.99545170892818,2.0597931685404536,10.569482145805576,19.06882709213867,13.84655012849382,17.126256818483284,3.143263306844166,5.320683155227726,1.741139880453484,17.441761875888332,13.046775986873445,3.2430318809217606,18.481533737100847,18.942018590268827,16.56184792525854,14.827892091241681,5.013652681517113,19.16546487768453,11.213880871983232,19.479439441183484,5.097561042792367,11.940929924537267,6.212751431071886,3.2386360451029006,3.7063037999648207,5.0692549075162585,15.171666039513516,0.4213526291344749,9.85542589576131,13.570258350399591,12.168453928263162,12.42789198128233,11.872427307997174,0.5100870417508263,6.077335470891039,1.473832700643256,3.0827138601947723,0.02678831246638591,9.177001239294803,15.840314907925546,3.3595602915298084,5.851670042463493,10.117277057979525,10.658882366135174,18.02167608282556,15.407538111238663,18.453656903939276,1.6198940643533977,8.0018910909773,13.068600416309813,4.492518321380965,13.182236186604355,17.19238640124837,5.110357730986674,14.737517563211092,19.406501242843696,9.678211658857293,6.178671990849307,14.48756633259781,10.273065608559877,6.140201178005493,18.32814026629422,18.433169045710112,1.4893121402332765,14.58331294171559,12.368966638521105,4.7683246798616885,3.043793842889566,5.715126068820373,9.172382049502925,15.67786095911789,11.858676784588344,17.611414642044394,13.077897167817905,12.56950558957406,19.329882702616864,9.174709970812941,3.6850385434973587,12.648993244300941,17.174953818991693,4.917758608024108,16.352189545744725,19.846781441589837,17.993554292853183,18.236844844910753,18.209262823665085,1.1606065184892378,1.6613665116036236,11.236550798300788,10.751154876851142,1.5658591236590613,14.317826630147742,8.359448430090342,18.323899112823355,4.960874749617052,8.713988314420988,8.362879523691769,8.53868156394832,14.004333460803027,2.121354559241082,7.455261241362128,5.899621503823069,8.93043707699643,12.026386569864238,7.672582909955712,2.9729753234221423,7.685777814828172,18.269293535777425,17.487873926569428,3.167949555787577,12.306566487220989,17.732557709134245,7.713805683256734,12.178614886168614,11.666417971201671,17.783439076248158,0.47942116708959315,1.0929971905737768,8.500676551727263,17.25996303816064,19.61686137009898,6.381646889405066,13.236218089046972,7.412837571532571,7.756488347401191,18.062743315137247,1.3029515840143047,12.540433849522392,9.467516002529894,16.56985721791521,13.397431666898179,14.029189499364708,9.039100628384924,6.235004162230773,7.7932975368848245,1.340947151141858,5.2168850078713636,5.2495066929451095,1.9740028978122215,0.14041356870152732,9.986044297577523,5.47454085831435,11.163185701733589,3.9751770761252336,0.6186524809743466,16.473772815616496,18.400368439443096,4.801950984293981,6.959491130941955,15.20258453198867,13.491716190134788,15.683458136864385,9.068014430803132,3.144451544158522,4.784723877065433,0.9227089961976187,14.915991276070319,4.589428538776339,18.867106017187343,19.23171022168816,18.42708640602794,3.8972086619709767,18.765901371934106,13.82711611147557,11.432446968360704,4.041059823682027,2.0642399874451645,13.808011314581687,2.223665269896622,9.623262153397224,17.37551594277378,5.8170582577015395,11.103785474274787,17.185113677848783,16.596821240816887,17.667671002150822,8.379670638783647,11.968967711982742,12.059183953749022,6.537821731368703,14.36773290440235,1.26184408018303,1.5540174734034284,5.412477979803949,9.74444203417114,3.0142545414026767,14.149061652424022,11.18307953880275,0.06036272695539413,14.26401767181266,15.875995831470169,13.91843168683717,19.948449513854136,8.875977485702705,18.134080979285066,6.920330490530686,5.027794752900703,19.813267617257615,19.03541682608632,16.55201128607032,6.886967804244137,5.458490877590383,11.232984813998353,4.145937360737282,15.343016440249727,9.763743931757972,5.956780866633125,8.971167347198424,19.018631946554713,8.671137408576,6.926851754717087,1.1118021652973242,10.118735063217352,11.544796023630752,15.751016996545445,12.68467176219957,13.146677106954998,15.585215163257491,6.36659575646088,5.842579052312855,7.732319566921935,10.488894658192685,3.7480491164519547,13.67645138240038,8.58773808717823,1.0897024260451804,16.367335909352093,10.605834028983253,15.166770388512592,4.604926121569091,13.998560725380024,19.883375839284668,6.312122612621662,4.267350405269439,13.109943437848397,1.2062438994877933,18.211350636083637,13.739789028754284,18.821596271720157,6.2700453564825676,16.628403524876155,9.738454315888664,7.337735551831996,6.480433497307629,5.222803231604005,1.7357658229824535,15.161275239402876,6.071431603126531,3.1983231076288243,0.4203763563998475,8.460641130084937,16.5013405463276,8.498193377426428,5.281098513249112,6.672156126365518,9.120891509287956,16.626901351742664,13.089036506114704,14.940939891118571,9.105515653763593,12.686788938504199,11.240315933736419,15.9374357577015,9.70019409925789,1.8309975465097095,0.617179563587329,1.1001488153287076,7.462392962928477,14.589010800862505,19.136599395465158,18.056217764791597,10.116432893181667,1.3247534189275756,6.876124487967217,13.637661935926477,19.184380568835376,7.378166459109923,8.209887224490377,8.436550052254056,2.3736683620347154,8.614748192539846,8.476175688966151,10.960871290922697,0.8905320617919577,8.360888701130552,6.008359255147133,1.8946964837513214,17.06082283681492,10.062185485931941,18.95195359350528,16.474327790305665,5.144740834010606,14.089278142384165,15.75971095966796,17.556939322028583,9.254501046902739,9.947791465867235,19.619568707463998,14.191239591098554,16.950451780820963,18.766311653662978,17.391851535111517,1.5647389144369672,14.922579429136015,4.507333447624746,11.23579219171055,11.140766935592644,10.447614774339144,0.4311297847998752,4.506212450147271,1.0833396869698886,5.9417076214449915,17.27656213707173,0.8074420150030637,3.219926655042462,6.153598756685672,8.043819982585045,11.381370401720048,4.830046987984669,8.93158665670375,11.345691563863976,19.246050681130974,6.756112531802612,9.839700114814649,7.04420822472644,5.791279226039898,2.8445853445848357,0.4880707584749633,16.588016732734854,19.99529691937688,14.999946830272375,4.175217265053037,11.58123438107538,14.800841087452806,16.87551744419794,13.729120673114714,6.133636755666543,6.009720985707512,0.2174460766423847,15.102762762010409,9.19964558410097,7.582800126091516,17.515752576066575,8.905812364232325,17.701904216823987,19.453317113652982,17.690068847576264,8.564384371278333,11.501012246987878,6.407805371256545,2.7182335599565866,2.668562807403254,3.5706483605001926,8.787940168208145,3.1011143549668008,6.71655989582804,19.545339418576766,17.159286918363307,6.177524499688043,11.659298399599667,2.2517530058724233,2.111311059029788,2.0787328493856716,1.0754228455716275,0.10920519914797922,15.728016317329088,6.41426946642766,5.302720029239127,7.608057173148426,5.331329471835993,17.79122688642008,1.4886425065423392,4.173309050404725,19.219712885856744,7.256266599852363,10.436018559716995,2.2856486763165274,14.231420053628918,13.703799426274825,7.360166228443119,14.04462404591419,16.903648061839235,16.77299813691343,9.341435022815991,10.740333622291551,6.599437287378955,15.073241528201864,19.338501790856604,17.725383187883228,16.54230937518673,3.5336686440722564,0.8563139904694816,11.661630809579503,17.165654334454704,1.2223269654788282,5.747980229851106,15.320326185539756,4.203665591604588,15.058304783320695,1.8145219844765936,2.71512545951353,1.8925313427926094,8.828726000158706,1.709413970135505,3.538713620863474,5.683334428657227,10.328785466998784,3.38568065038376,8.351094309819969,11.283881529311767,16.452552983400487,0.9706071435643038,9.732658767627257,18.15971466355881,10.996270251952488,4.481424900235789,8.570076964487864,0.9973350971198336,10.92552637625384,5.819871227886635,18.78032790294857,18.343948351071298,4.658786448626033,10.004882436939791,15.616007190566513,2.1253876072319233,4.511756725280818,13.60711849533065,1.617179112261642,0.683846413843181,14.40693646890244,19.142358630064425,13.24603703513828,11.161770931199024,11.2251848252353,17.48200805635539,2.1981685947115004,13.603108037809108,0.4978676880919197,4.545901549292037,7.040494870036342,10.00599721585273,0.8575373261801289,14.916616806566466,19.491981989251887,4.616732006854116,5.169298550537782,2.112560592857151,17.16247514084236,19.545566433547176,14.203052407691077,10.252343266404607,18.14261877306204,10.439984891003128,0.1927393951076306,13.280449873928518,12.878885961333149,17.3924495791439,11.386693739014667,15.852748906143844,16.14088627244998,5.675960319026414,2.230752755355452,3.3665101049380386,15.235765484920346,13.425582981573548,3.5262837978170847,10.905441297413985,1.7097040827124799,3.4443917280606406,9.367579180841105,2.3824744907847872,9.686030630133317,10.755811610886505,7.855271109400834,19.603773327417716,19.214854841414322,12.708217437231767,4.01291905018641,16.156500682549996,15.823069446927928,12.684094060283421,0.40729066961403326,2.020323385901923,9.346609202584478,7.635498253256587,10.688022144825077,10.899377803557982,8.188950437949124,18.93456852014949,3.297050586483463,15.941798355709405,15.151707069179174,11.744501293861962,16.664756946994025,5.924047531892649,19.68645075867954,10.315466368050735,7.784019213744022,18.327312824912948,1.2510640574400789,7.6131167421180335,9.812302403936265,6.415209080871946,14.181155268149475,5.821059640188326,16.750949654612533,2.746086767255851,15.830197326256933,3.2711078669736127,12.416639628894664,7.9641018738845215,7.046083430658587,12.067597968745702,1.3860470826484184,4.231399618945866,16.592925507192547,7.3306569798451715,14.24170671759363,15.354523728909818,9.802015820365074,13.717332183724128,7.86122140126142,9.375663968411159,1.3588311607452708,16.532268390724386,17.250566607227,7.865116127821206,9.878561670192756,6.174481270121555,12.295734135009626,5.747033415065181,17.512030527230955,4.590204080620635,5.680191594433208,4.335739679942052,13.693777766758316,2.1850734634047297,6.063260130630241,10.878560602706301,16.851846112689437,4.489399579847362,9.411573930552759,9.270279096553601,13.88053535247803,4.300193696392047,16.40833987856078,16.435341404312283,18.90334220457765,8.576357498052193,1.5066106795643686,13.061734957799498,12.012041130292719,19.344982766472146,12.619494494656527,12.712735766138792,3.543980982317536,17.35756563358779,19.9340438214344,19.96860563000812,9.608527109278175,6.089201449304942],"p":[0.7887772057223266,0.9945756105244778,0.7255649769443282,0.9120762058879384,0.2933526939696487,0.7347576954030326,0.5556343266947998,0.1418674996559448,0.7819769557971656,0.15163169217414763,0.10198952330375266,0.33202147502488577,0.05059379282423371,0.9422172051188342,0.09386107777897656,0.35076510509375525,0.9921384462749478,0.5645463169103886,0.21491961520121272,0.032011633255691896,0.7157008063748076,0.8691170999982751,0.23167856590799007,0.12918969976808636,0.4053436602724738,0.35624446767262374,0.8765694165463074,0.9667784961209744,0.9783486119704652,0.024445247283431337,0.2805059274589847,0.6912074776737753,0.069975981399369,0.9621242425911394,0.42557770640386594,0.34263293383143245,0.3359389725766122,0.9457615126923988,0.6943845290303643,0.9377027907705042,0.856241856952904,0.9722695760701416,0.1855416746483276,0.7916741190064038,0.16729229136476076,0.7047122371547843,0.7040052087196691,0.4313236537229148,0.49434342859680425,0.11474034647630349,0.8477229935735802,0.38722942438930974,0.5707281459750841,0.22753643886828878,0.379806431831591,0.14126086868786292,0.9131523377762418,0.3718493756673842,0.9513720726004526,0.9410085003855573,0.7144810631715743,0.11419544757438693,0.9689606990444997,0.09599680944392941,0.7409610512004003,0.9540593728425051,0.880156489093656,0.7853810166464072,0.09130941008293592,0.9461183825579793,0.18192633877278874,0.35158755984253576,0.5367156918439848,0.1612450956535425,0.10874140179235692,0.10455357043471292,0.901404627647425,0.9680145730904925,0.1717074561809886,0.15367453024602606,0.46343957684386017,0.5527934874305878,0.6274330785836393,0.12683463648152826,0.664301157039088,0.22113252883396095,0.19381293027457613,0.5083986706132568,0.3678306840584973,0.5973557195374544,0.8967858806922591,0.5410566522019009,0.12429841003208253,0.3716663809110663,0.10999207194050498,0.15482631161969063,0.6844621177240044,0.5985143497596761,0.43830631066451553,0.7518386254072471,0.14839829520686076,0.8869377810558758,0.7706814668699387,0.9063155780226249,0.1852115015011253,0.4790859583837934,0.7830179252604998,0.5285628911755433,0.05889652230173259,0.16134988773899073,0.9675307477045743,0.14969769486123408,0.9323118303078544,0.6848596312803339,0.17435438699774464,0.5533736151252755,0.2779042948267081,0.5703742377723833,0.2912538330628771,0.7327524206616656,0.11464643551023679,0.5458539864215528,0.2665435977592079,0.4488272652715486,0.05411083866117905,0.06529388413337212,0.6316590501404609,0.6292310661643787,0.9670458999482223,0.9018391231487739,0.12865693649646892,0.38622415321867054,0.35151379800520366,0.8967009414519651,0.14275543643716415,0.26728105888595133,0.8532310845222375,0.28140459539323914,0.35452142374051143,0.5949240339855688,0.104995511340094,0.3890773685048623,0.5476435282904599,0.8105961786591667,0.04133189743976673,0.40447740889644,0.932175411592431,0.07451903989571784,0.8867449393869655,0.9159061945601281,0.3842667375011939,0.7366278598954314,0.0885206547284012,0.08943298250938825,0.0319134614351535,0.8391126233566433,0.4202276433980914,0.606010463054218,0.12663599196519648,0.5438507232477789,0.8210534811845016,0.6226564199834588,0.9057195074636053,0.31002219230964156,0.8282979339664518,0.0403568381628463,0.05234535127379947,0.5975765300794742,0.23461541312870704,0.37688204425508887,0.2251230088614693,0.6185079779790821,0.5607957117198819,0.0330252279382226,0.4682499279323207,0.9628902390909226,0.2361318966770254,0.535416950546854,0.4414997642894347,0.30773681652150375,0.7866345720896193,0.2952713457725473,0.24171664613258592,0.3991275181067777,0.7630834508672819,0.575935707411837,0.5466574084713516,0.24950632927990046,0.6672369522324892,0.43757985900456475,0.7193267973634805,0.10392869693324047,0.3882301776724393,0.09651926540664313,0.26391275155863014,0.564575904890964,0.12712345594748298,0.6642057161665114,0.4303143045056219,0.35119579833449177,0.8145813427217445,0.04929014382416064,0.8026581743471568,0.022687453937390245,0.5116664729200129,0.5177561033413927,0.8521657989414477,0.4255328857134508,0.19486680957812386,0.7896667024552804,0.03142448511189033,0.5448836341143379,0.32660318323561977,0.7375932979609683,0.23657615948475597,0.38720554831628395,0.2031288129350437,0.25344626683512184,0.4225978825140202,0.8734667006214869,0.8473673380835958,0.773916628143531,0.21973651029668084,0.5548618220647668,0.2316357917802443,0.6796639251691536,0.13082177708934317,0.34476151270988775,0.7553379633124062,0.16237057439025837,0.8469701120907127,0.7499113194642555,0.7935226770560035,0.442402320937225,0.7405723893191645,0.4681277179031955,0.25355927722021865,0.23633317096695294,0.9982460119419903,0.9175684114665235,0.2828847920507813,0.7676164371921672,0.30725152227023567,0.786111604830753,0.9499438170826897,0.26831291276655733,0.9595642334416872,0.6987462912326503,0.6200197391970355,0.9322016699058728,0.542763792039793,0.40271297975457454,0.7684168011559638,0.012501195732331327,0.4888604526360092,0.48126053539683156,0.5634064630426221,0.6410511841957189,0.3112653200740907,0.0541370052820338,0.9245328467234957,0.04449814833077115,0.3310960008820394,0.6486204659376038,0.024751208344118147,0.7951301787205238,0.9197931420600143,0.26496745354036144,0.9920992778999567,0.9704950268819779,0.4549649481840079,0.7002737511593835,0.8028042613536572,0.6849112293956245,0.7688206978930461,0.1240338256796285,0.04621395833737485,0.9283717753607725,0.20537418848174593,0.5453271133674515,0.37682696796956794,0.3223010064771721,0.49003082940491205,0.5492708453882849,0.9078202554186434,0.5234273507318261,0.7361476263398161,0.8319212063691694,0.020332106026465624,0.10096293095351117,0.8014241159786677,0.13928369611711156,0.7311508941759632,0.9138182793325513,0.5330430516907856,0.5910901979286365,0.6567074474809118,0.7738327573706878,0.5739269501224866,0.4104411787550424,0.6247548952535349,0.8763278402558494,0.04646568764203862,0.8838615994253525,0.11494826374015421,0.49818419290885685,0.954581637763982,0.6645898841447426,0.9897593768271817,0.16524161115378044,0.28726907654819844,0.41686659266840587,0.014015883544816976,0.4939772059841083,0.9342072222197289,0.7787582104426602,0.2165864648587792,0.3878291100246336,0.8511926455630889,0.43840670338246945,0.922236634399336,0.7734225312616942,0.525663066439251,0.8861822057651314,0.9412485450705419,0.12249131579456751,0.4822166591749615,0.31080368063123087,0.4282223731947934,0.3888884924864291,0.4664311192597743,0.7519958376549443,0.6101188343153361,0.07898254663163007,0.8425113177556955,0.32069868623029363,0.287830407936702,0.4693005496800611,0.2009097990377109,0.1833177234776635,0.6234817096635492,0.21294623533634383,0.4243583521389047,0.5974591546885757,0.7377841518718113,0.5719930158160536,0.7591518737655474,0.37371279728173357,0.2530914628453216,0.9905458744497013,0.9041044139396797,0.9766051838739931,0.08705130690109741,0.2618904936043249,0.6791441758088388,0.7194816964913273,0.4574249954748646,0.154940872298432,0.4268737314422404,0.925568342470134,0.056566473180542864,0.19500124203695823,0.05514127367396182,0.36538744231415565,0.34976789736588665,0.2431876298392177,0.40675099223312894,0.8031584645992655,0.37777419959854597,0.5321784090020878,0.007834077203252798,0.5206265586641257,0.6469914535417804,0.7821013686119602,0.3637614802406739,0.660189727296093,0.27390524272352845,0.5444037198006999,0.7299969509074211,0.1310534261026035,0.8169541239334202,0.982052530309095,0.024811912782207735,0.2806093156266538,0.12715579613557182,0.32715702019484283,0.7527574743402594,0.24396710986070502,0.958456523679261,0.3027609301971177,0.6711701481893071,0.44911793071891415,0.6622660549010737,0.41381047801518256,0.8926136956970829,0.8457495798141599,0.7840746019261915,0.9642516976954318,0.04899817852666555,0.8718424814260091,0.25748148198385445,0.951207845064872,0.7420760420397214,0.9529067737019645,0.8321844567912131,0.019737542940166275,0.06690214610121936,0.6617359965749918,0.23146892694470012,0.16446058062303082,0.2089656507813198,0.1208461137347705,0.7056411239542362,0.38720461077271073,0.17943542966168557,0.25206768585023975,0.5465557500608018,0.6527367556622845,0.6014751409562773,0.014687370277324696,0.3706904962802182,0.3627937964077155,0.14267937972500522,0.5651411553929695,0.9618131760163371,0.8718127545015053,0.40008805254937374,0.42839684687638147,0.42279148345730855,0.5880499131760379,0.6393980092848899,0.18354016770709025,0.853780771716864,0.1448463279125669,0.3070826704725802,0.36130072966172677,0.18733283776476561,0.4451360301636076,0.20244658318965914,0.8664211768404118,0.46574000369176694,0.8664146972115097,0.8446991675972626,0.044961610048962264,0.9905243677687474,0.4614891981435105,0.6438166666793745,0.6610647713850386,0.9767745038200109,0.7664665715013301,0.9096702965512129,0.7953860422790879,0.677022105846343,0.9485952712377692,0.6499295010853514,0.7867791440900433,0.6869545182369616,0.15012064350336085,0.9998924304176731,0.9080937193513949,0.7394988223610612,0.40357435399209485,0.9224180262761601,0.9661849069791635,0.7977262022950957,0.5618275452364507,0.8268305387227899,0.9367680633967799,0.3206441615504336,0.19793216698791283,0.13985684083142358,0.8036477966844191,0.057528305245835964,0.40966440002395466,0.7093780449728662,0.1973806764275583,0.6593016591474263,0.600952353744892,0.9516053184473565,0.9349251325121102,0.7283091627743314,0.7199877103412202,0.6272785887420209,0.3014056712215567,0.9870960843807497,0.3710293982489916,0.12236853391198865,0.5304338324706266,0.10663420938972301,0.9825259776864028,0.19071336258326332,0.23606617862281554,0.32524856869912977,0.0001111683511096917,0.34582465359799275,0.15732794289155394,0.43373475224403313,0.23606375050119954,0.8610718920431626,0.1120102658447728,0.8711941898769306,0.15233202848683014,0.027126150871958465,0.2866773342925619,0.08055697220756275,0.391833034097647,0.930768864742882,0.0983882401801095,0.6325806662874427,0.20923513926830606,0.034415436274000344,0.8737010934634721,0.8220795834682229,0.9722150198159598,0.8233747672636309,0.2850817232215115,0.9383254854376757,0.7345350254398206,0.9614050947980366,0.8652148220722669,0.9866390153482869,0.40704862928748886,0.3904841880737826,0.9473222021818106,0.06435161429750513,0.4255342253090395,0.35043704241357454,0.12279830922502155,0.36864776156304657,0.6180892517093151,0.6278961330857393,0.2920174901233765,0.2678715281207298,0.8144770839509894,0.8431619331419566,0.5422673909497058,0.3751761137141274,0.40092909710754143,0.9652185738291206,0.7906047409389478,0.4062027308953482,0.4788714627008497,0.20888600372885868,0.7510986916977205,0.6326738054545966,0.6772652556171461,0.6831907478959343,0.7917289269223478,0.26380253763954964,0.5145381243534226,0.04111927147164662,0.22024089665644775,0.7458722258381347,0.44899653571342735,0.5434244571929814,0.26906946407639887,0.8230707456735684,0.9973917076080538,0.5148990298896772,0.6675862776954753,0.03592227701979822,0.07343775269693076,0.025365154434548343,0.911972574255498,0.39600306272097185,0.9161922190839973,0.45982299633345414,0.6886926499271677,0.16035415253983643,0.2059890368760151,0.3566649422585899,0.4230415585674425,0.867237605069036,0.009009412669669148,0.4495163597819096,0.5272238774638298,0.8345917244725098,0.03696157277615564,0.7576385174184621,0.2809444051144918,0.6034385245078975,0.34115798841031064,0.9043519729169067,0.16169564759292943,0.5005110478043133,0.27337401755154156,0.0740041560228939,0.2798609123156821,0.03360394863650562,0.45471601296475805,0.02648859558447869,0.48139268630251286,0.4994751152661525,0.4732865511769109,0.8259035556393897,0.9424458178128592,0.07813374755277391,0.9561885328949153,0.9295698400609245,0.3817421989499572,0.06808960352043636,0.772012189530553,0.9554551890428722,0.6124563596753156,0.44558229065739696,0.5326960063243007,0.6193361566128683,0.36127351960524257,0.1502434061952631,0.8353476076491759,0.6647412943354709,0.8767240713808799,0.9466835565141967,0.8190786821732718,0.47165545657292895,0.7735795024492735,0.9582808837591963,0.30185937198578583,0.044607141998850075,0.4734959819261686,0.5223939452699204,0.6086587933207275,0.6504160842428564,0.6626858554740449,0.37519036162863273,0.9087750741393699,0.07908117851439589,0.7720810698730955,0.4768584123766426,0.0817936695435646,0.23254111691252333,0.10022285531924369,0.08654854746227647,0.7333436850035377,0.2631550791586599,0.527309791350661,0.07343857341046722,0.3260112109247515,0.9464993862701618,0.6658170770016545,0.38041523997152416,0.09045587774499642,0.4497395457634481,0.9920940607700646,0.8028271261739011,0.28823962725842156,0.5312452707111117,0.7728307960954819,0.5990544937859357,0.4570787988958376,0.627810870500868,0.23793955121202015,0.2813923511204184,0.4890451651360439,0.880428029508302,0.6919293341969037,0.9820312509268048,0.14803461712624277,0.08288201989304089,0.4002089291833748,0.08119542243638045,0.5289797474102331,0.9195920424741904,0.8846139351300735,0.5735110642188517,0.898251848968765,0.9535095863691228,0.8145278863751972,0.5324193308574023,0.979418974373899,0.3223282775767178,0.4904810529136132,0.8910862900599446,0.8285869068720146,0.9391271769071325,0.16310848666742328,0.6550128463665845,0.5844383675284983,0.2924406637677106,0.2538235917823817,0.8091267741165391,0.4462319408005304,0.29114920399428423,0.3866734762915385,0.8121193934360109,0.8393625037758223,0.569840273629949,0.24401766764142097,0.525548898127203,0.1860178902324663,0.8222922061815974,0.671467341263629,0.246306631612903,0.6663084401106778,0.0370334308739253,0.6183928087364379,0.14263304853652192,0.2730537017778272,0.7014112929711513,0.19105421943162115,0.7939522830590904,0.4653911797093895,0.15480298265110148,0.49675079133943867,0.7178894353055747,0.8526821617633449,0.6801806592262725,0.28048534992298313,0.4375800444252971,0.7928056013707081,0.8797960612046771,0.4283810181158403,0.9115757053000535,0.49910212027783785,0.6420609513785751,0.02873544412692297,0.5412875010223317,0.09198303471655889,0.0147842220593426,0.27600947582501534,0.05628399184947219,0.9439795610103012,0.4188544246107331,0.9449420178324262,0.5545509208330746,0.6623690219083196,0.8210587917401664,0.02849288797684535,0.33031638800033614,0.5851142220705017,0.8152277068578089,0.24887800560728546,0.9259765310347139,0.5623547442650203,0.008352533848650312,0.09339497611528658,0.6239486599204207,0.9834643868429389,0.29039765483801694,0.9625625390379267,0.40885363019623355,0.007731036785854295,0.7788322349507024,0.371017066849068,0.6515347444993911,0.37825375019561314,0.516444794234997,0.8444734552909381,0.37424178317575985,0.6844850357225878,0.7884903830962191,0.23928571139634935,0.7296346752724405,0.7777909159991603,0.36372539240052815,0.8748051685828957,0.23122934526296057,0.6021584060246934,0.8784513041801654,0.28061031869660824,0.5862738080421681,0.5726159820291863,0.6932435752513006,0.6998134053318608,0.020101850269225396,0.7308869295436469,0.2803475826470956,0.027425057029984323,0.34852074975460745,0.7276565364709799,0.22609783603083322,0.7790498621318669,0.2643687146004907,0.3469221307175263,0.8694642734456675,0.4665020681698169,0.9114341886748554,0.5977733421756144,0.4977720078078698,0.061450292913649784,0.10496373643323209,0.8011923368333915,0.711067136061984,0.22978146509437125,0.4492110125322626,0.14875178876178907,0.833729346736884,0.37076738914816887,0.8094532367992318,0.8306957430427719,0.36549970289397105,0.4099157568293048,0.45772391959094927,0.8192358012879051,0.7284301291908282,0.5276907649909659,0.13974147423858918,0.04152459458688895,0.6859497018966925,0.7479065113152592,0.27390372302630683,0.38370469859478784,0.4318427168907084,0.656870944936776,0.703285193545294,0.10950283441693753,0.4450618708542531,0.33003233042268665,0.8063518694751024,0.5390663026839664,0.6053482255240707,0.7646293094700136,0.5642379423028645,0.2894964991505715,0.9342715326017275,0.16704562042332216,0.28796948706527714,0.3943760645960701,0.9197122623936509,0.35435901827571437,0.602932772158064,0.9626274311597065,0.5296636290243879,0.1194908510433379,0.09151047087220432,0.4545194784241142,0.5584045578048908,0.3057628618048178,0.20757923905316034,0.9144039847224148,0.6038541395358066,0.7079189021275769,0.0320961800782853,0.07798478269892684,0.26934009496161737,0.5666859753258744,0.40696327779743746,0.6667235393851754,0.45878720370681747,0.982155282837299,0.7714160424474414,0.962863497723355,0.4276549385684414,0.6129197932046186,0.5702733032728426,0.40059905627500236,0.8239950484764269,0.3437269963564036,0.08097465880923016,0.3071791728098616,0.4401287773546778,0.09261019988383934,0.6365069661185534,0.34262101676801415,0.6555349771197876,0.02934289147693292,0.06522185653658719,0.40924202419532785,0.40747629237473904,0.35923514908730114,0.6020367305014453,0.6022599441997396,0.40482036120157927,0.3222089312096117,0.8965495287291074,0.9491855770019972,0.4352936367304743,0.10404998671933519,0.762215603638021,0.24190117398773947,0.015335879022979615,0.4563382514538745,0.167991034981537,0.1023827188248283,0.8888488040625102,0.01321915323263223,0.9739220846753607,0.6785958931004219,0.9938295971122564,0.7413792082426023,0.29530906304529725,0.23331625590466554,0.48261236361746773,0.5113145749322185,0.8857961762852053,0.8665061462118564,0.3523748586902058,0.10949825960129833,0.49078825908537005,0.43647631577308355,0.1011204906828096,0.8488429295155107,0.8702161389684269,0.07534625413926288,0.14638288861893534,0.8193465699245452,0.7666447387749571,0.7012406361211194,0.5606399788868486,0.32096011443527117,0.2413798799482656,0.9611257003773932,0.1767348705564762,0.20283185645088175,0.3139378434452722,0.2728569429742391,0.49288324946028084,0.9247842970456837,0.0369645476481153,0.3608081939083021,0.5030191293198465,0.9521986963676157,0.6425250404398624,0.9462127669324198,0.24232798078194162,0.2849111381194738,0.15058406874242447,0.7375354282586342,0.7732473073087105,0.002066957787120627,0.4899878919143812,0.2014721974575815,0.4691051788405034,0.8326653370070884,0.4977027643814571,0.4761171512931335,0.39131764220794674,0.5940514009508269,0.44278792015159407,0.2569647930296588,0.10853479971761515,0.2855243147968065,0.2693348286344901,0.22481567877775022,0.11216945911894438,0.5383907777073249,0.8057150929945116,0.2720846385806319,0.7278084801040063,0.6935593892079779,0.31937575389086414,0.4568857435254521,0.30181624694664966,0.2603288311851397,0.521242282978956,0.8421026471813817,0.43818440865716624,0.8409600531176888,0.845378288593041,0.7982156469512653,0.05171923972320114,0.09414825197470189,0.5727379951404001,0.2101535809423014,0.909720782605735,0.14279760488994442,0.6451042410915837,0.014966855841563653,0.20207181998469825,0.4544014306895481,0.8963035168582483,0.34390050120444005,0.2571753884969419,0.318838031614191,0.3740677948132647,0.814379227048369,0.42364989418615573,0.6227093538700674,0.24534632754826902,0.04482292094493334,0.16665691829738605,0.6521278882212627,0.7659811292143757,0.07170540159198135,0.7049410807770888,0.48935382059705,0.6799551764359633,0.24354881815168228,0.7729005124231345,0.6273239794096319,0.05631601120084939,0.8256645805967076,0.6103087555385021,0.1943902560643087,0.622303274856904,0.2237676629365224,0.5480305267782133,0.45118887494472437,0.41579160555712913,0.25435668528829236,0.0936377491055691,0.07713361907933214,0.5437688797994562,0.44447534317225545,0.40729082201184896,0.3558483523164546,0.9030339468722544,0.6372905840757077,0.14006924998539128,0.10956545881397184]}

},{}],17:[function(require,module,exports){
module.exports={"expected":[33.62952880648401,25.025875564779852,13.644353598577023,4.610798099376542,9.843687300271288,10.643747885909299,24.428239569301663,12.637300071249186,15.177305458756921,19.473122882160865,14.630886983060044,6.017815489792573,20.33854539360376,22.709864835265243,2.6779843078435066,13.056575626736908,19.680565866325765,9.226004350956776,13.62699036010215,24.512545041405275,25.040300973430888,9.90336093736864,19.538074610219518,23.659289366944627,12.965658659391059,5.023204233832278,6.334852283265629,15.127053460989043,10.394721245474047,24.100354572174354,12.264026685229753,28.901024607961197,18.15541169546234,7.939641782961807,17.351086526438397,19.850796949966327,21.911780525183453,13.725229244093114,3.952694604942013,17.910403496671062,9.558227558800905,12.052171363394255,5.586450747719394,15.442582629850875,5.321203146986528,11.392351819918268,16.735945106942932,18.344481035709848,5.920648158891597,26.132372245835036,8.953693320389586,5.748594671714228,27.149594094591897,17.49128652830304,11.13501487332128,36.61816796840169,16.651821778333225,20.1503614257151,6.2428057179398175,9.379443343906146,18.082290985352394,24.55533979903409,29.121693683374993,11.121485332312965,22.929331708219276,11.496147012339678,26.792001696116102,16.74923559290023,17.657640532053424,13.657820487671804,24.080582816222083,5.849197363123083,7.294419788498753,14.295208430595132,17.672446144581688,16.08855788939837,21.503612981851084,13.379194590741054,5.055750981181478,5.592894963419192,27.57727380222365,18.344464492199787,20.107952823419634,21.28170315439653,5.837678008987475,9.245366519397308,22.76688754444289,22.722821078874134,24.63801010667028,7.622739485558868,26.55173131992639,7.848964054038374,22.56791938275788,3.5120279329719923,16.422384374291045,22.197591580654667,17.744221926224938,9.299881267103688,17.648982307834597,6.188503680864353,14.914139932955738,5.476462239336398,24.397346562220413,17.32065516729068,13.855373226798793,16.00876699997281,9.217029329916063,10.624466629872575,16.490201599971353,18.807909862480255,17.951183233367736,16.761016779945873,26.12531042772717,22.079871877251392,22.124297450419462,27.516525170023925,17.046998898859908,29.490472055951393,7.425822472324991,21.460166201285826,12.938702810247985,14.524367761308115,18.83468376128664,20.312977630586083,22.831234764568016,24.878918109980948,14.96303652404417,28.648593724759223,16.054943684209814,13.857154279648427,20.64184969306331,19.80801146785008,19.087602307126325,14.574578333468608,13.67709414831883,10.78234889249904,12.188243248325502,26.95104846065312,9.793831458567675,14.907359338872604,11.987422444635952,12.117399066643442,13.102151660302876,22.965338969574045,30.725491326497977,13.174264545382421,13.291244441756328,5.7559331361979975,15.886030043689042,21.850509977528706,26.093535290105642,0.6758170163639386,24.9323786469888,19.592795179424577,16.03439583754758,21.942908977631614,20.558322603555364,21.90083602770324,16.938880058069568,15.726725911894889,19.58803249664407,10.13795682265145,10.221502722772438,31.211295143190323,27.45860938213806,18.29026550969157,18.188424050346434,25.00571923534485,5.78451200376618,19.02205635735721,18.987130609728467,10.25553211901627,24.72393951970499,11.931669421416565,10.248787284358132,20.827692355524196,12.545862791665265,4.2098437586600035,10.964587754140375,23.388816242129217,23.188658587462495,24.720442390841434,19.721036962637857,15.812060412593627,18.24836552215539,7.137599735628973,3.76971154648041,17.12913334466004,6.603748138885707,15.082422061580216,17.019582805452448,21.03272160400391,21.17540935581577,20.279309878292622,22.733753731359386,20.40207646906326,13.732282361372334,22.00355277086726,13.902830406789162,21.568394768077976,1.097677423499081,3.5541153165925223,16.97687832012502,20.587154809022316,16.39147175232885,8.665311706023989,21.692580649237627,7.235108181330456,17.40343914423005,2.6277605194558977,23.787171913650084,6.9689676515706624,11.365728518785769,11.442597483240105,27.084754503020083,14.572121265904217,25.580758401278445,14.858511274772795,10.256225936334111,14.199291191050321,11.731298295469792,26.911932000002082,7.826278720640508,14.886834125117195,28.8566866097094,24.356229431103234,7.474597942585201,19.02561475649824,16.552919124506182,13.041643806983027,15.796464212168447,5.08435387865796,0.4722500144585962,10.914937562686116,22.28105544740752,27.633391438523674,29.96378711662318,8.416009801186968,7.752105108844732,9.881171984825361,6.260520607009408,22.973551864514164,9.294665911151112,13.069049290487138,19.263489219802242,17.784554633061447,26.861616057534167,3.358532748738373,16.562829703259055,23.27396785371288,25.900210179910516,14.641219177940993,22.968877575177235,15.765014792096,5.952994813246815,14.403834716059176,10.660615977527666,6.099298598677689,5.867843318059049,22.590680781932342,18.59260158673037,13.86054886294583,8.737579942239485,14.907466384784216,6.904627229467334,9.875502128348725,23.801426119250653,12.377129069042404,7.664645100232249,18.928331196715742,9.460804785204347,17.801773750798414,11.031149542187894,23.492545178092954,18.77268835292916,24.874313626182214,3.033144055604647,18.283550118862845,20.467854694710397,14.888205373938534,19.727032029028692,16.481722678293067,27.710273678226887,12.936488608366535,20.748161695204427,23.31065815907616,9.457987460916753,21.685714120371138,12.616361148121415,29.26530007713048,3.0430341048476355,15.281080246934229,9.665953428051022,14.137268751344049,26.256472431712645,17.964160003709164,6.71572401331362,14.987526977162709,20.69862449720653,11.936209835610251,18.565308182341994,25.424499020679526,10.891699775016347,15.776509443040858,19.749321001587685,20.5255191898554,4.158185055150838,13.94913889547089,8.976059694241286,16.037349714627226,15.211568331132238,9.344211705183406,24.74465918223969,7.574181382625559,21.058412836677054,20.59396915738047,9.1809981291965,8.33583689715013,14.03147642143583,16.60077337181388,12.10744159318676,19.081168413909175,10.500256046069097,14.989145230443516,5.162065806342315,6.5476399610777065,4.971560942149106,4.2939057189369905,27.412694533553775,1.0771460941488324,21.23250163835497,20.441522028568585,13.126950524045396,30.060916165118464,16.342616490699086,14.44425709435438,12.879645733154012,19.438026870589702,1.658090202802686,11.95504455884177,18.6719655928783,13.96097514481803,18.037490818065436,14.876167112035631,10.428777528173347,28.43571259766397,10.015697926309791,24.221982862680935,4.693948558416743,11.61474138816152,18.91222670634994,16.965008234997033,4.450498940815878,12.562986457048956,8.947761086958398,3.326308675968569,15.098317516877133,9.326439566509713,5.865260031744714,3.21753721770723,19.295527934905003,25.0316250299908,8.294457686826043,22.775239522935795,24.458329723963182,13.831292601403234,15.070637897547003,18.721956780303294,7.727578739944953,21.519528096221634,15.720293447307197,13.12980424368088,22.29617214123082,19.433561763074728,4.175132545773608,11.343581070643022,7.375562069911767,11.267973150584904,20.86805482706396,8.056082932245417,16.631657553009394,20.067212254655438,4.726558954626817,6.324446856376369,3.6346246551696266,8.490990373249584,21.529238868585193,11.72899574272281,21.560323185066366,17.942555335048336,9.058026552758623,19.75880764045108,16.38244743663502,10.379657367424581,13.863394944967055,29.315928760751547,18.779267048028135,33.04976841468874,9.248825077520044,12.237438596088115,18.041366742597777,6.899206320715658,14.108703454542164,27.07795029398734,10.046004183552787,29.370342078691337,4.826855281404328,16.63596778367416,6.422865059378012,14.069767764195527,12.383634352406592,15.253866955074947,21.852942685965854,32.281532352434105,12.177219512966463,16.487070902005254,28.470978707653078,21.245721713954932,17.067550712883357,3.8503459503194026,11.374702620278267,3.7266373786836122,12.61082929018711,8.061271769381538,5.59124473038533,32.51867423055265,21.23580178473858,14.823070333501741,21.23732348608642,2.5988868155270417,13.370777639992104,8.296236572691964,26.303838386979333,13.458037204572399,2.000432224133525,19.458253890293758,24.469006715657436,32.73679199243639,25.27480725847095,22.70337163936315,21.5887755934043,21.03857620842433,20.252841799553885,15.580288989810724,5.190845694853136,11.68751445514637,11.436190019488722,11.513195053421082,10.758555557419864,11.715557844070293,10.009305976498611,7.030552001140567,8.44085512274274,5.306001224481309,21.2786718149408,19.525788384482166,4.744699117185712,19.322412133495643,10.942147289292773,25.409920694539352,10.232472264198785,11.717641923469326,17.778652962202866,3.3920936313425196,26.131184925071757,23.990086281568775,11.307084715590214,9.117058371787415,26.31266326046861,22.621238452495255,20.81485279726609,14.753932759442746,29.704839566653767,2.2669926337253927,26.66771484576067,23.72397229116316,10.17316210678354,16.4804746009928,14.690057906737445,21.33887062660598,5.8789731504397515,13.460447104788598,20.28661627450259,25.79023875462718,22.54619488590317,8.494353991580288,22.25467324405902,4.5839991113904865,6.910643625651224,10.071378722322326,13.850503453097314,7.948918976545174,11.217693388856727,12.351294549831803,8.933460888788911,9.728844578177897,12.204851177648063,29.12587451074708,7.046081009998657,5.840714416697286,24.23789051418225,19.345959014395973,22.964777991372817,8.412402124587018,15.302584853679996,17.954173013671422,22.270170002304347,13.662860840350703,14.472841183614308,17.10353173879972,28.7858328522834,26.35472411773148,15.963796584860644,19.180130413322942,11.369770744892913,12.860414402361963,9.769385885782306,20.973390729354037,5.911934605035032,14.672245378548304,22.14361138612643,13.970843284986984,16.276513720881674,32.31157813895462,12.444486833186428,12.651489299828796,15.48702652652917,5.073942750091353,10.49980781855776,15.924465615967662,15.354455723454976,13.390343740107868,25.399690305679233,9.025928358635369,18.53046038609539,8.040460506428138,9.50927937039797,12.58128967680113,21.51657098651915,21.323681023009083,8.771233722862728,6.7905832333999685,11.939134880954049,23.22611463308067,5.4476712525519,20.61629440196137,11.10394132527284,2.693076790078078,17.24432828084647,1.8426550818004181,16.958966116374956,19.600340957507196,18.21649528897408,16.395811372566154,28.915951139871083,7.8574736462170165,28.843276681857887,30.203984626289365,14.652557438297745,16.148524879486594,6.072281252662554,34.932227061943365,15.883163544926333,19.497161941200826,20.72672087311003,16.327845624341624,19.50783687048677,19.178553364486035,15.172886641673058,19.085986645733406,14.961551757114995,21.456202758468383,15.546719256889627,10.82373454012737,13.969425046461048,11.08874030535363,18.571103925583465,11.36530406042391,6.099340671207415,25.55781907399153,13.26977312196987,21.02481888474147,12.009494209595838,15.113180493678705,10.650308051829882,10.369022888631875,23.43936181581888,24.220409273497626,23.501620747494087,20.737080536622827,25.999282430614183,11.545654531190229,17.604179930419527,15.004474976365547,5.304402201970777,11.333121323589303,11.48704941360009,12.905635052330474,9.49523449963098,19.132651294761978,11.534966721212768,15.72737187205794,13.140378047677254,9.3077460405748,6.099690021644231,29.10559457490341,19.241133815717383,18.753105774392473,9.562965600763153,16.42741590340097,15.7588620749597,7.085981974147383,19.66049175055979,9.541993276623451,9.968781016037813,10.456212128812627,17.87091632546049,8.418240771308515,10.850986332220614,23.31221102907091,21.431598929946606,20.349302202205443,20.84405248834833,15.456656168641443,26.816597218430203,15.271216658755066,13.275579759484575,15.586572221598994,23.076475155487575,22.542781315944765,19.086335623059522,12.157351763148636,8.246332500432791,24.688071540254168,25.25040593306675,14.864895365808374,15.484220918982327,7.613648550993176,16.149771533961385,18.72411274996576,21.835650084663442,8.667648614729476,17.76258101368172,19.79170963710624,15.522581819556397,17.8440703666003,10.584510665523085,8.913594385424368,6.694802692887172,26.576945361752724,3.071224346004082,17.298595525671292,20.009766777789512,19.36523727064052,2.905312681763116,20.496764731641367,7.933567281776495,12.305000828804777,29.194587890173676,6.024086465075337,12.570335948624265,27.287908723890766,8.890687327004414,5.1247381782769015,11.004835914359308,5.775257460557691,14.129885967104965,11.732167965320617,13.964778014048566,17.433234591807828,7.630764214599615,16.21567795151232,23.132594834916723,20.40947200303685,16.212024036879523,14.805176784835421,27.677353665672307,17.491086311341434,15.552553472641305,11.544632690586836,6.82367792621825,17.987333851503283,15.04175520897667,16.734110858744096,19.349378987585524,13.310905126170722,22.708546922961276,5.8554139174060715,18.34548598782074,16.464808390762414,17.091483662472662,12.244192039872345,15.313904320692869,33.84281483579476,17.026766552727977,13.729592168567436,3.786949292740812,2.0847267411577577,26.76421481804969,17.41446693062568,7.698995720042163,7.372682866566475,7.392307929716203,15.78390604349999,17.409641877323228,7.317319536262163,17.52749715025893,6.322491160765679,19.649944856629993,14.175010030534306,17.608453412575468,21.768681103079597,15.908171080361708,16.842981655635796,22.71366802402168,27.808895363527725,16.345588719151017,18.300292199152196,36.512960625617474,12.89006957800368,13.038985496109436,5.573671599166671,13.575108335588752,10.844243396719529,23.46644383087036,6.912663327533481,19.996560860976597,19.005936322934815,5.856456218463597,5.039580935398343,17.520696539027583,12.550702929174626,10.060625215609129,17.015251058270636,20.231328702369815,6.895203623562328,16.894189893204164,20.01922023647484,17.953678247765808,9.178399872532493,11.736545814389837,10.37218237674601,8.504911839356847,18.750930739731594,5.694039181694137,20.398088293301072,18.359682800503276,15.15514170068586,11.039961469469425,23.352550196965066,5.580415384436438,16.32184804239875,6.074781552716843,7.750353708923473,21.09938079706169,14.193697682563277,21.83264538244219,4.546449884171391,18.032099676256987,9.565753457082879,20.649099125894427,18.55226180028768,22.89457227900189,13.405399803941734,20.812590562714902,8.728816951291035,19.278563163600506,15.62645479130797,14.192410666927612,31.125928789552674,25.382073890355805,13.834337723001559,2.930725890071173,20.40135214303659,5.46064448743505,9.222914982525035,23.421827480081888,6.743134721516407,22.43175028439098,24.912066406265467,14.616698452517408,11.538581863919756,7.285703757064532,14.255182096590401,16.67961471946289,12.251801385542887,13.53379603255026,9.425295027797784,8.564462715931025,12.945986212232409,16.144353376717046,3.4781650653448524,18.954194612399238,22.553646531876407,6.599049105034275,7.453190542579357,14.698084201845369,8.75495924526085,11.295463501689241,11.807151386787893,8.210684869859097,25.23216621891398,17.4208045741527,14.150806424714755,26.51876866456758,21.13837854379469,22.227017126264492,20.67784413054166,17.142475804271875,17.718145411393838,19.708328557043103,12.670346664593858,20.173793336201076,4.48215199489505,32.11824096095561,8.671195965518507,19.771874383761585,9.900569821387,15.205618874111739,17.171413767728996,10.968368537997675,20.530766845117903,5.915746206819154,14.493726941790024,13.272793139683877,10.464431971931177,22.618580297764,6.373212701579835,12.970685494237044,8.589850667903587,29.20492442751835,21.298220544755324,26.59692126992303,4.631672393179311,11.75947439170941,4.607842903005019,18.858497119093517,15.700507153591635,5.4500738342787685,12.964789649226446,14.827982839713993,8.519307325572175,13.146038530541233,12.744543112720601,6.026898659915146,11.226339376705877,17.70965317495166,8.753845188253953,1.0721622362493182,16.04789659653344,21.02351452670628,20.271354028398807,28.712063916165,11.592534693954049,6.7888966685291585,16.4436062976257,26.725724842533612,18.41667664094284,19.149715681634326,24.279577610184536,9.625705712487678,2.92076453187574,5.599787310875219,14.054872438833739,15.47164542618635,5.727092388500549,15.364515546818325,20.739844468334397,4.979779910340493,18.90094638045258,14.611604181792424,13.363410967790573,6.882454509306477,11.08135050778611,23.12464556350766,16.56234130074954,8.499354337860968,18.23145278863196,12.254317058843792,1.4475689188523937,4.53869213931597,17.39908905792584,5.424861750886572,4.300055753329092,12.232632170202516,18.21965532732979,20.454869307504328,4.7764287518622215,22.81367599765508,17.304625303376177,12.135905590705029,23.22800672436523,17.688012199163055,10.519366621561588,7.302549710108274,9.30523911091222,24.710659084855347,26.500660089546006,1.022423459214468,24.491290188013764,17.522929691651044,6.473862339772184,16.477261447978943,23.882801697242737,7.82148814737749,31.668021732046903,5.061788952063025,20.523153682896858,13.719717974548853,23.14542839594291,30.654806446483025,17.524476674396695,24.574577526241754,8.72977073438492,6.850274332389997,11.944317782820253,7.505970615008228,9.433669916394123,9.065095027218405,5.095717477664278,6.846192956998842,18.46448969895886,9.756641512508574,16.52251736841274,15.828619300436408,15.420525342659527,17.54994902974097,8.95542575813852,28.708809668118555,32.23761485217387,13.252715551563538,19.428421279273802,13.818064469198497,15.041916083784038,10.300174605868222,24.45779675300613,22.147769637305565,18.424668392166566,19.688906430810107,8.819746746947704,17.181477461367415,9.667828670316998,9.758834770292657,17.859085374128163,30.303941320794674,8.05640399609864,17.530259644201724,24.826572204074218,16.936042975262033,6.924183533122517,5.487472998671306,7.6326318239801845,16.23797694025364,21.58936393471655,9.689977717804386,6.6168855796539985,19.53164750169165,8.894044606048318,29.437724034484578,23.190673687052442,12.956944826059507,24.479853231930736,2.6853707761579186,6.5084004154542985,22.976705594402283,6.754881995065363,20.89990699633656,14.658302357554097,18.078657779530214,19.058135572551937,9.694575642433131,15.139180387561694,8.937982715013899,12.85853392475191,27.21431611943631,18.968514223766864,6.416373207321592,22.198310425073174,16.88029261618284,12.975814562919625,15.601135116027686,24.037668848357285,14.170931837727952,16.98962487682918,13.437478399063673,6.6493736180641925,6.378542762010222,20.996699253012764,7.110955696878416,16.516772126487844,9.376383469303736,21.55002613025267,24.04050385754981,21.61684958695163,15.59472461223367,16.87483545071384,14.849950697931533,15.269397509863683,9.344076114242423,4.419106626274455],"c":[30.57888488574797,25.68192390708129,21.712362347563495,6.534896363349413,16.425591861314487,11.388769779113522,23.146673777071577,13.678355643474685,15.674771489369087,20.778818018677892,14.339559993321915,9.501262542633922,20.877628281690278,22.540965084285,8.821897767013176,13.164024907783435,22.896044957038814,9.400871127242366,13.813568546889154,25.1400102470501,29.779442047809553,16.39895741200131,18.709058414782305,26.712285129852525,12.47373395804544,6.3203736138637945,5.966164010058884,15.00246550369507,11.061640481873127,25.997422096617132,13.963775011028519,31.021382327034623,19.046645738179276,7.9651124209587145,18.808311894974548,21.815565206655386,26.904436068017823,13.745950654410507,4.080701124409961,17.81424150121898,11.002421378799273,17.191106808323198,5.985962813708258,16.774648340311426,7.061574782987212,11.365714884503209,16.416021058224946,19.001100648908466,6.6737253732865245,27.037179675136194,10.189489890337907,5.960052318762386,31.787368914540792,20.45168482852403,18.102008779086653,33.90848446355815,16.58469098776237,20.30190754553605,5.390775754473729,12.421627525184718,19.577298723687928,29.718562880797915,31.494852265854167,11.311282195930227,24.02308973158903,12.364434256428204,29.620295936696515,18.16448059937572,16.348421436302445,19.448446763006714,25.12227002581905,5.722104373444534,8.36353842529472,12.547070896186888,17.88581917991293,16.254770293499732,24.158685707672156,13.926443530908134,5.281349844537924,5.944822895163848,29.7308176215648,18.890369850316024,25.527058892118,20.794350655007964,9.2526001539641,9.150241463945948,20.656721547775895,26.412175653272453,24.202137890135337,7.105487777426038,30.70853294924291,10.139199278474344,23.88803317860395,4.1679453963866795,19.014357491612188,22.3761272591938,17.132571708628607,11.261587512660956,17.548219764720926,6.261781948582464,17.353788080676196,8.08315292446288,25.300109589314495,19.496423100284844,23.933273195272086,17.949696634688443,16.60969837118272,11.044972412343947,21.585090707409478,16.951969033807497,18.06210791050376,14.132741234720863,32.12013006321216,22.822537999191,22.517358516731193,25.697403608329015,18.146359488211495,29.98557343043761,8.66374408448,20.182751732453887,17.11555968885127,17.322003530874277,22.407905524616314,22.46374536655104,25.34155444968881,26.383089923243972,19.15894317291226,29.257847245794828,20.7885695928163,15.436461179358442,28.046480326617488,19.627773215338777,19.1144538104432,23.63649416437645,17.323681409107316,10.23771893675699,12.122289042420133,26.40264158639608,14.08422693867103,17.850423507665894,22.38543780954958,11.557825365078356,12.92400363303625,26.145793678965227,26.779782645666195,18.83841596089876,16.394920955853838,7.58899721868606,14.655533117471471,20.663227865181554,26.98748162157259,0.6683577746613532,22.91538739442558,19.649273300540788,16.36435448495054,22.034981086817133,19.81419572073692,25.250451619156948,17.491097649754025,21.259184499174577,19.698914009332007,10.523969111985561,10.45365047142148,29.643568911476116,28.931592653978882,24.75748428756061,18.421256718834197,29.069723361438477,9.96925354085507,24.48143516492207,24.249478402075887,12.189104472725568,24.96286662282229,18.664023166375102,13.398506949346789,22.641816818112197,13.659007593265448,5.215847691578508,16.505183710739754,30.88573077190508,23.317310207043022,22.262067922572864,21.482403697347895,15.96933091052528,22.09885694455955,6.84745052304115,3.7031422148105215,18.55653361882588,6.040916718830804,15.09754112200817,21.07282637591209,20.447241994960883,25.69368141853785,20.60607383166006,22.649138595836522,22.64302587317507,14.044199844036982,27.349040960194948,16.169267945011555,21.010974530982253,6.517335167827983,5.300401627903311,19.471773955301998,19.892255983445345,13.852920765707207,7.837037527652674,20.794048867552842,8.182632132152037,17.48594556631414,3.0972746285790445,25.646398962058637,7.932151856060429,15.824761760819491,13.164331082524846,27.68775241944585,13.590636955007987,29.057534129110813,18.489094751331493,15.586057925847179,20.117346863446876,13.419536494582335,27.2768258404975,15.306756321816598,15.56162680006369,31.911861148737906,24.210649033599193,11.095256684907001,18.2035446675288,15.565207697995433,11.112985229337049,15.054370473091277,10.732588061027098,1.041789346308132,14.736147639389173,26.520406683883557,27.26187269225219,28.859826313314276,7.374873137637537,16.601858203326426,9.613577298629155,8.607817722938663,23.47047169219954,9.975481882480356,16.136999189739697,19.378321589062583,18.08693962608643,28.212956921631005,3.3179351663411234,21.469671642048816,22.642204591259866,26.08474669047363,16.734437263469108,22.572821928054466,20.501124570793685,11.438285990805195,15.006074232323611,11.16722540026676,8.879982277066794,9.469807751313354,27.861260959010245,18.847002176940208,15.851171301035176,8.853650201073734,15.732224517264278,16.02242529492395,13.227869846234938,23.216984811405293,17.78106566659472,15.316882026181691,19.170954576626496,9.739980465425235,14.624847147703505,10.914694790662592,30.678484627556493,26.212168855372653,32.464495932885,3.0640162026743365,17.508618153918736,20.691907824233873,15.260045515887331,25.23556212990574,17.711153775186556,30.690858615595886,13.125528734935553,23.076805571015676,28.71581711599584,10.261654113479839,22.675638164304168,12.581600264176117,27.80102973393289,3.0350777382291083,15.948666343303337,10.883177479598697,18.108551007595114,24.88903423606111,19.858015773707606,6.8298845951602285,16.259816200419802,24.933872303416088,11.22631506788439,22.826506961708116,24.86419048030311,11.887987301488362,14.354373993281307,19.379788913167772,25.712289938628253,8.129804368334202,16.571727386685858,10.430407696402217,22.430960237525312,18.465414256342083,9.372291285577301,27.172148854461888,8.479753923820748,21.588653151624506,21.740497221454874,8.320353753183916,19.976251285519172,15.872897166265123,17.804219259407226,16.251867714464275,19.35923248165224,12.015169532228283,15.186673823494893,4.844941716047217,6.544433300697242,6.977335600057674,4.316360896438503,30.055888672539588,1.2592970136779025,27.221138242916226,22.240921876607068,13.205719631449416,30.453855561303854,16.777772757018813,16.069220249920626,11.339151429546494,21.072014474568533,2.0676991822674244,13.902021159143604,21.12043933012005,13.73535965094418,24.081335337434304,21.22599086415907,10.079087713554001,30.698009736312514,11.815986592683412,25.749901030187342,7.115713339238608,11.223058659412096,17.463226718660064,17.00366746213615,5.653873732089419,11.731370431533534,21.407400246396126,4.802498920706869,14.524254969571858,8.972486808090927,5.995730530096861,3.2436166121536103,17.38613897115639,26.500658085667958,8.701613543404779,21.958023670005193,25.120551166949916,14.160034495619309,14.974627502816219,20.80109820226071,9.232838058186761,25.764314601568643,20.372325286887083,14.096754791151332,22.38682854709178,20.023711648552307,4.136435486885341,11.126507863495537,11.374657166795092,19.996974710125084,21.573007731971856,16.217834300645205,16.81847053581316,27.30312641711202,4.751759031892835,10.10740089035326,16.002908273122188,7.49441213199198,23.68883557830344,17.950303491496047,24.081306468731718,18.68899372146925,10.05226256718578,19.761263831849636,21.245366035019345,10.278038249327704,14.485262441674962,27.389674865489134,17.835242847908095,34.0703002970265,12.653689361654877,16.207641734950577,20.56917771644724,7.844662898991173,16.67491705324383,28.937862373791425,16.27397367190156,31.65115579876495,7.638392128835711,18.275389017934163,6.506255064457214,14.000900707744506,11.756190267398633,15.936914595693613,21.348185239377752,29.007986023270412,20.864653874336927,14.694964945269653,31.29653626794343,21.996971849627364,16.757720198600452,3.8223403473765707,13.554118568821348,11.900425452305033,19.27531539256962,7.536127245993616,5.530788619129608,30.320450851507285,23.022236856798216,14.828929795445498,21.684232629104713,2.932616575504987,13.395034349267341,8.267609908857287,25.223281392063008,21.266243643532015,4.527634575376412,19.278330078877175,20.62069193686332,31.115541481649565,25.54788971805161,20.356906274807145,23.80599953187651,23.19026607269849,29.82769873548184,15.315141919700249,6.029821703890541,17.562825733728783,16.34829580375796,11.862737085496892,12.495923725160656,12.039046247557028,10.548582544394314,10.452902229603536,8.611772729207228,5.602878852917501,22.32806905402422,21.99279646107296,7.383899023535784,23.109156991315228,12.593391334583954,26.14509563927463,17.560507867489388,13.1002035542809,18.94546278653609,4.018933784739202,26.50615603518792,23.906711557435628,14.154623650571974,11.314735946373247,26.798659312956215,25.514534965845193,22.013958413880978,16.013224773919326,31.839415176159335,2.3718191935888067,32.49397278138217,24.812701249551523,14.494902351387775,19.804590123559013,14.023847712578478,21.35063687230754,6.331255695530517,20.982099509859097,23.393226492255607,25.015600027845846,22.2517779070146,11.79706243422304,22.58901463046808,6.567588440421623,13.258203734824455,12.43827863569221,16.980916564327984,10.22115040566557,11.415091835703695,12.483631104296045,9.353441978247828,13.152969082006276,12.087000635452032,28.1174110607196,10.11397189747062,7.019909545105225,22.798488798906398,21.29216833760845,23.961762371655155,10.84915663283002,15.83759503219353,20.09280422795497,27.6706595401232,14.082943634812082,16.475070060252936,23.6656153901314,30.450132429978645,30.493879560624165,13.99851559919945,19.712539726262264,11.687402432925378,12.66628142116821,10.596571573118727,21.87185750887377,11.881552522084716,15.74232311788844,21.090681108335385,16.676275923604138,16.14154358867347,29.686468415156718,14.365913635425738,19.019628370295816,17.610613465364906,7.614476658423796,11.74427581286982,16.68318982814466,15.70428567733667,16.764510733245288,25.173166327062845,10.85371277804722,18.71521722778927,11.86552825988474,12.749950925745766,13.031091184922053,26.976242474112908,20.39209895138154,9.832424896371936,6.539930526790471,11.075096318460378,31.158417552564707,5.748609966768162,21.7478135999853,12.013897669200448,13.104532540388773,16.785750693412133,2.039234892802711,18.345661603159293,20.125034736380755,15.748706178363463,20.526109504902635,26.956415952276938,8.327264499053374,26.62631957341516,31.94899228447624,18.3879150411874,15.015454716011591,8.162201372581084,31.49780553642743,18.158302852597572,23.93091762093468,28.925205697593498,16.349959247201273,20.727819225339832,21.16496229796789,15.808729331537481,18.564526008650613,19.495543112924075,19.989003446610933,18.454662115430388,10.996035063133174,20.331433942128193,12.256459335353412,18.72975312340571,11.42013076270175,10.635183253960488,23.942816894603737,16.887744434686205,22.321697645285017,12.233780762318508,14.090917453726096,11.223379603622773,11.029114038380223,28.128086515082316,22.770158168063467,29.065977447605324,22.613936755264376,26.706029695468523,14.711774607863958,19.95280715347279,20.05552261992986,5.023747520069486,11.083253791623331,17.582372932624576,16.269357776259017,9.83698638516968,21.595510475905495,13.554577262386431,15.973461752271678,13.246312229977612,9.021727545915425,6.94890645873317,31.25604023776395,21.19914222888357,20.311684672368536,14.480088437460568,16.674947253969556,15.811448039781892,8.180220702559474,21.419886611445257,10.104945016095169,13.180147904893898,10.570433286812213,24.310951809932924,9.448789312969886,16.35376978090152,24.94811121727773,20.029175356055884,21.3325006501854,20.27771333574526,15.25381646915112,24.901049747762006,19.129890531843326,16.658657734263485,16.22794963277486,28.84939429225819,22.550324650566477,20.136539877877542,11.63034920338383,14.637752255871991,26.48550168637012,23.810557479829008,17.174236287099944,15.483396090341067,10.331066402868398,18.586294268680728,20.04816615626395,22.096351194111584,10.732876191386614,17.448056826616455,20.42525056590245,17.64238215097965,20.270668398507347,12.442099621009126,10.164230788786837,6.621231711802584,27.9353082107598,3.007219018240386,16.323532975721733,20.064595062022423,18.92413280371015,12.991574424079737,22.037089691147358,8.479689409906534,14.895975932417818,27.518840320267056,6.001648854397669,13.010079282515193,28.15700495531992,8.963976876194831,4.807004501010667,20.368152880287983,7.997218281117704,16.865092793863827,13.604104569891788,14.335796755298048,18.212498736674224,7.697646340611509,16.235974454121134,23.694766940746185,18.36931467271201,16.246827214680696,15.099657492826235,32.11372305871447,17.210347640697076,16.061459083589142,9.809251600711931,6.412147294613327,22.671509357087587,18.498463951529992,17.138286436233848,19.455559367837708,15.110734865182394,22.439694128127094,6.842986548624915,22.34953332370564,19.817820848913094,22.526578882007378,15.211784489184677,15.341380793569586,33.208241072506326,21.59495693756964,13.008348080413736,8.944641083239294,5.612636609754806,26.44288461014265,18.01393345159849,7.706932822666875,7.612176784475382,14.687123741720892,16.216508827665407,25.829352857884523,10.167566996899218,17.909564863735284,6.413824609902585,19.64823530890559,14.239311913388061,25.010000557089022,24.798172295110096,15.106241797119516,21.542282471459814,27.17436786475931,26.53009872013245,16.406841098828664,18.17662246963064,34.14802578246849,12.592527189422928,13.258835410100996,6.293500359777197,20.4954914138362,12.669514064173807,24.910725477644316,7.143757799838088,20.046884858500928,18.601978138472315,5.613060646869528,5.059189299120869,18.798430111145787,15.601816794921387,9.946648376102326,17.09665901941635,23.525795769607008,19.90654667697856,16.792301223071913,23.17502108438927,16.52928161134452,9.81898478274486,13.744441362581608,10.39593958646415,11.261775316969358,19.0005446571437,6.211363196245833,25.603914360468394,19.699769646892186,19.12771769041849,12.423248986730549,22.160961642272007,5.629456391104051,14.860051473030468,10.160773334975756,7.808572887845829,25.469010770186795,18.110156438942177,19.515105146039108,4.6931270965462515,17.078463280184486,12.015540663997196,23.112803167914336,24.52436322395181,31.584736896771936,17.880511483138005,20.644743958488068,12.09690092044223,21.93242726792743,17.924654529297722,20.871006452790805,33.71433423712315,24.37114777614727,15.397756099397137,4.855057146371174,20.668496952244553,8.644748889640795,9.523989146257808,23.683775589279733,7.407866123389374,24.452214515767,25.718653271862344,16.774614619244737,15.022800340919416,12.460341294586524,19.9750778812874,18.999891757753968,11.913016992856289,13.691227254073317,10.141781770461995,9.992311035275474,15.668116486315634,23.042109956158477,5.0120014318646575,21.08267317196939,22.400904622986655,7.042852632611533,10.156379466568133,20.783710176591097,10.05190251313008,11.930654382129028,13.761873215055491,8.585182085552745,26.359361121522845,16.714469833718383,16.018853805213563,28.385054749462498,20.038015997787422,28.138293473365774,25.418220991275067,18.12635539959973,15.378869285060016,20.130432543118793,14.721155645114017,19.466087294515763,4.822232135770816,30.709718859163054,12.489002245283068,20.128916257777288,10.263007381791972,19.661806008955576,20.69158792726883,10.978127992940635,21.02535847216963,12.937520071926844,16.917194672333725,21.732987601784842,11.256597046804211,20.0679450731769,6.070104954198946,13.675076016522183,9.728299238312255,32.61659352003589,25.770269719934724,25.878093758580384,8.135908390768098,14.419887626525874,4.727263879278043,23.147275592378705,15.640745495192679,7.9908681596254585,11.466344302033567,18.652746145509393,8.650993040978975,15.802642140242652,14.401135584749714,5.030286087570988,14.098969085301881,23.756731503742234,10.32743187604905,1.0597245818605496,20.83962325621237,22.20773115521512,23.3410050932779,28.94771345942737,14.08796505413163,6.293146467701946,20.12706674331927,28.042819263087956,20.076925674161178,21.38056041621188,25.890030072324386,12.668999362124644,3.301783272484536,7.925823855499468,15.933087579276613,15.810930002561415,6.009606530364172,18.187180136153273,19.28631044704399,9.371010917767553,21.58786942937008,14.83687561360193,13.165787289726874,7.706823930963852,12.241722750092512,24.92467511760784,17.066162597361995,9.726081009949047,22.488259319850854,13.612537152339044,1.65403492294468,10.212918484309878,17.373759574630323,5.486946726348559,4.305356543324624,13.417827968539086,18.971281250784042,21.063631712276262,5.032995037973398,23.82933217507704,16.12713998830191,12.316700690942836,28.34452474379055,17.688394767730667,11.210691363035892,9.618042629702131,10.335560405050575,22.51662954570252,27.14719232712354,1.0688111773396864,24.407013377896025,17.325247568401547,11.930002897760136,16.63984577012088,23.940201172981958,9.024741762223993,31.458043924197842,5.192192732967792,23.24615716881963,16.426901913380327,22.97096763089586,31.931957854556536,22.884614545048272,23.456226825357845,9.270185586328846,8.075425785952042,15.598543077716853,8.61201616149602,9.615346699005817,9.80306888105569,6.599074497177305,6.887297706173282,21.110463958384578,10.07252775690807,14.74505316879219,16.231497402168213,23.730483333206475,17.792976338719022,12.284407893724987,28.22873296206086,32.142473855555686,13.330776044304987,26.1094017074115,18.94497629390878,17.419626588129532,10.377276437442823,24.430181801430656,20.62370522648536,18.523182789893383,19.59361720304775,10.788933347372346,19.537540055678395,10.470357537762887,10.210810305409858,17.868305509061454,30.536314901903943,11.494029658498967,18.809529998526017,25.30854583059542,21.432786155090852,12.612283517964762,5.985254794173568,8.931784816577668,16.25976743490957,25.24008253487662,17.401507657997993,6.442973440890458,25.249397348019386,9.169706399473814,29.776166879751187,22.40545314443553,13.243156715130695,21.58743924301801,3.2033803914165704,13.137119841264898,23.21600015807533,11.626005437010011,26.63741536480711,17.099854963652568,16.999110848890744,22.122503198800405,9.298350587414333,18.04395281683818,10.790848520556604,12.57568346517767,28.946253909637292,20.247824174683302,6.814825022530889,25.891032418071013,17.13657912382349,13.366474021770662,20.63853731748174,32.98810800089086,16.90681485488824,19.00773897078255,18.043292857989414,7.930569808702138,7.0090284952989474,23.230776928088424,9.551537488013192,16.862308302627326,9.016972982553323,20.70719701020319,24.756428823198483,21.16896970933414,15.753941848861224,17.464689255822357,15.191907449923962,19.824193281703707,9.328246066469067,4.763868239376307],"b":[35.34028858471213,28.54155832279753,25.197795889219023,7.554112749311805,20.138977152914393,14.113327448830214,27.655576159022296,14.462455683534493,16.303075179273353,22.312071844859208,14.897257799590339,11.598558672627966,24.387854397449864,24.88691687153496,11.207276946776096,13.76858726111501,24.311413270735407,9.47866590236358,14.148715263621693,28.210965382698774,34.27083346190723,20.775848477379242,20.137248715261975,31.521666488247426,14.476844042809782,8.197158357221346,6.5768809128868,17.325903837254053,11.969122712159063,29.17716679925421,17.85945876551859,34.95529729346406,20.6279408832605,8.539850684242705,22.12656265400895,26.266955542986942,30.534919830262854,17.886060032620144,4.135481291976824,18.648955226160474,13.637059174431343,21.95988122228152,6.434582792638586,17.896427228222983,8.516269948800321,12.70154174226635,20.172539904207014,20.781301753923636,7.085804878269495,29.562943211009973,12.556039685134332,6.069961578535912,36.4969882310379,21.8805944623874,22.934284234118238,38.58106232752938,18.1110827852324,21.695711523456325,6.47874340033642,15.319325084130746,22.02908301586143,33.57967047526168,36.27938521447925,11.572573043246251,26.358708100287565,13.137460279101129,34.03537959581078,19.64501837401312,19.362764567131997,22.641036188804428,27.3027168909965,5.943696834147141,10.353690820178763,16.121376927565457,18.7829952110061,16.538397483112284,26.70049347213714,14.252223261829538,5.565952049097338,6.365398476264494,32.991489885241734,21.887062392075027,29.531868807936135,21.929644138723717,11.420209246031146,9.867045873613707,23.605921437159907,29.44923961040943,25.70591258700025,9.072851965023245,35.07106199622749,11.4404473314994,27.67866269817888,4.45298792380024,23.415525054591313,23.6826832383121,21.479326809231548,13.26823931237016,21.464368980736932,6.504929997825402,21.576841124831112,9.478155519396715,28.579101616990982,22.981045855582458,27.619160500150755,19.225164097560853,20.827619568710062,11.295308088559159,25.327438309995784,20.23403237559224,18.61426727514831,17.923183752850257,36.27255194063993,23.974521417972223,26.579686333947453,30.176300659633032,21.288472717070942,33.55027345009557,9.297209068899623,24.68381742923992,21.861601615873518,21.335243904113966,25.992809477032818,24.23762030255589,29.684393605836913,30.141061465913133,22.358020768239548,32.32190941163661,24.485006741542918,18.701056030647088,31.913112532665167,23.412876343894002,19.14460448967406,28.094446680904177,19.99945107947682,12.347351970915232,12.235051596822156,30.387571795443964,16.372159587787614,19.71974786883814,26.79121614034035,12.248996877926466,15.053297361597874,28.802173130226333,31.21892145671799,22.855842806107106,19.223642414091728,8.71146078462267,17.569752092256987,23.106484649837924,30.3847223738802,0.7131411119737674,27.366681914645703,19.85161978326849,18.934401445732128,24.486631079886706,21.50765177553687,27.349569194310646,21.233733806797087,24.885027988030927,22.171641071073402,11.086269373950323,11.062606318143114,33.111905911275386,32.76452498939523,28.728547279897988,20.147298564688906,32.60096832354491,12.165010783093955,28.94534652021795,26.660352048193044,14.645379095944062,29.449863934415298,23.49336452089395,14.64768148918477,24.38951178083943,15.435830706961614,6.2339354570688155,20.93667606020036,34.98850814207033,27.833406903437652,26.53425311160427,26.249779676100886,18.977142117450512,26.1337517599394,7.721688991205755,3.834285284210779,19.415089748140403,7.236209505420006,15.853081902971535,23.037866157934896,21.81467125382059,29.10106523455899,22.92700059544218,24.809339988537715,25.65171919390591,14.161564012493049,29.99279348685622,17.551867217032346,24.42643147500838,8.62006850842767,5.919347833024462,21.819097856664964,22.740960840885826,18.02853053323613,9.209394253982005,21.83603357840877,10.193357308462527,20.563878134130878,3.760185913289318,27.507482900398223,9.354835639932993,20.386550141454233,16.876829870670452,31.087646305696452,16.456615966265105,32.37476456311897,21.911953122902506,19.99884098000894,24.360179030511677,17.502971849347976,30.322903538806692,19.602646893071082,18.831778463165275,36.22469046710752,28.62752403917763,13.794404750059908,22.672734961672347,17.305164564474886,14.262214705881311,17.98120510829177,14.152014398019475,1.2639000004639778,18.088703687857723,29.068537192444523,30.567396553112665,32.806298648227525,9.524772552632623,21.15180911539225,10.511719678810486,11.3135290854776,28.154968020359057,10.752216323032071,17.899519122901207,20.54051803987103,22.45864274951974,32.74259376521018,3.5089719599806513,25.189520563176032,23.92119108489949,28.823560291493695,19.65476080934815,23.798562954330418,22.951821647211773,14.702309431564604,17.57873542662463,12.055781303447862,11.665479195658332,12.439935708994817,32.58721857020535,19.041056173002627,19.135747353933848,9.382780804449812,16.398860639956702,19.940308102959563,15.900320606549695,27.09291846987147,21.0918687356938,19.4265780230042,23.4684141035508,10.289650128264531,19.24749705500404,11.17812205173355,35.32849371447662,30.137368841196025,37.31244034791309,3.5535510831545514,21.539935870476196,23.514535595705095,17.10265318066491,29.560145993613347,19.211594490662378,35.49873628976141,13.760326802378522,24.28821832867069,32.01505027322129,11.552611970435356,25.471880824769247,12.69218852727278,30.50653973568077,3.07760450901736,20.74859918955579,12.080550243899516,21.45687578789851,28.9266645059906,21.78149003017501,8.0668256486494,19.487547600987764,29.700959022754933,13.127944486533622,26.112461487339047,26.59003873658286,13.185896487894212,17.445847032455855,22.879142871270822,28.485199829186715,10.234350626942941,17.751446094842635,13.308595052063946,26.656944213219113,21.06687645790724,9.41231515193851,30.213430509288642,10.647532708722194,24.244876545433602,22.43360509777345,10.068107112877072,24.722885306369598,17.852932944553334,19.054168214052197,17.9697099017419,20.445229379957265,14.126224890582982,18.88116774209008,5.3162828501060755,7.480134963515939,8.804510808763562,4.5548246005184545,33.381045559412236,1.523806750465595,30.568037784204634,24.113810998395945,13.40106017055464,34.19584192466152,18.946867123505598,18.637556988226407,14.519246635255133,23.611374848573835,2.366002105159497,16.684178425724728,24.23868704596,14.384819988954414,27.11361635732282,24.029103083694476,11.392210662570253,35.16241078665341,14.868172728716004,27.784704197322526,8.21333498090361,12.570709592419739,22.30829005842115,17.03245909918072,6.463045147967739,13.112120319422157,25.76052890798899,6.1096124642317085,15.559984759742282,10.262861684479141,6.29906819141941,3.3252117915842128,19.47192949934122,29.840489835914553,10.56343664796103,23.724289692897443,26.93444233769225,14.797501374964117,16.492272416745198,23.578475172335402,12.007249204838084,28.74958723182428,23.446165959363665,16.714307227712304,25.02920312305937,22.197490504262962,4.330349736148893,12.779404174833031,14.423855555818484,24.459832241773512,22.490764028452467,19.945993093673156,17.131783169819077,31.650946161505328,5.122239589354858,11.596523833809496,20.511668869141804,9.089228916513488,28.537500953828477,20.872391536253932,28.680950429172,21.493523908678945,10.758697162789845,20.512496439104048,23.31763368392581,12.58397922727335,18.68510904958416,32.033865568481666,20.20043553458074,38.816626849582306,14.867351724793698,19.67323442428871,22.10880410996868,8.334212716077118,18.487112559029597,32.059204693328596,18.869510446873857,36.345757418196065,9.193625452869432,21.211364317457388,7.545663677290024,14.18184530521874,14.898544699630751,16.65811448342972,25.654429632247584,32.60724528816749,24.461243577938507,18.855476414508026,35.38269489866632,22.784131632447057,18.086704538214356,4.151341449419261,17.445708749440563,14.924154194423322,23.321133035496878,8.4974678913039,5.710720216989049,34.054194761044315,24.66201687633807,15.520893244911496,24.31009094780844,3.58237383512114,13.558410188970232,8.58954104952684,28.26182686701233,24.67382256171014,5.6186649880443795,20.582562004725517,25.225312513345344,35.69087001689651,28.88433681450337,23.52173177608484,25.928215295230203,25.785575089109642,33.52039569462071,16.197545421067673,6.957415630466981,21.968140005868356,19.53739094000043,14.688699587514769,13.683732346978768,13.02462358462047,11.053482465727143,12.417317285393526,8.80288139857516,5.866921091031561,24.517565110749615,24.00124036362546,9.431013046967095,27.75794514951734,13.482228106515853,30.433343056216366,21.301263817150243,15.307010071098464,19.91815293425904,5.151387881892373,29.14549373353791,28.39966871380462,16.77269995585938,12.892388827140708,31.055541827701532,27.42957897758174,23.656399156713356,19.477356703417158,35.75645498551488,2.7364585369185646,37.058308035252836,26.468635556178914,16.773598173072088,21.559565724951966,17.277950295302567,23.250553086001027,6.539201259627205,25.56408885138682,28.15981530160869,26.966837414564466,26.7164403588695,14.228699681854637,23.525724080291308,8.208512515448536,17.453171231066165,15.530878866435494,18.59991272840348,13.085825386362458,13.665413903504051,13.168658061908639,10.148897688698074,15.928057580847867,13.188913541733166,31.691526592853172,12.505773716974524,8.145037603970344,26.969620391119513,24.42300893766218,26.403674897396748,13.672944407046463,18.730414965079838,22.199318849522417,32.10606635916794,14.332909256150938,17.514141398818474,27.343194864554285,34.655979344438606,34.67105009713732,17.46435376841845,22.984349763790156,11.908654798642754,14.181458937111232,13.110572029590116,25.85752408475477,14.929049426335936,17.461703604657917,23.36931166961547,18.513572213158348,16.494559279775995,33.6732815614357,19.008068431742473,22.753444490215646,21.76446122752162,8.68418614984619,12.934659632949455,21.121926903950676,18.663248924930116,20.49026104257915,27.250312167259633,13.59474200328981,19.025758952347907,13.751123914760072,14.915631342699836,14.312645327232318,30.115523861397726,23.704096019044215,11.08584748518124,7.640553109383719,13.037240337153456,35.85642266681316,6.0170605370281915,23.37076901666957,13.728023634462815,16.889963354858267,18.120605490831263,2.3316844768577383,19.47093024597235,20.83121394500958,18.629206845251737,23.666523182923846,31.6735453112474,8.853604317181336,30.496805652773695,36.15862602049093,20.41323914578845,18.1342455679679,10.708777728034697,35.95259197496509,21.975160402293298,28.215983537142016,32.49077523122385,16.362353850897197,22.770419317821187,22.845081435650687,19.534500397608923,22.0247917643813,21.57209321227945,24.370095961795446,20.433032179857822,11.12159754450127,24.402655144969003,14.329097478552049,18.81060366516806,13.03560951662564,13.724497841154303,28.278957629678104,21.079649749327285,24.058017091668127,12.426627172464944,16.891706822071768,12.206879997579843,11.545353224688782,32.27360262963677,25.583824452283242,33.645186018362445,25.199626295158627,29.086223282725804,16.901376253457116,21.677311873982692,24.58948138080477,6.117890021552448,13.94213891135871,20.593475891822976,20.02601388597003,10.69215332782293,24.206885784303054,16.265296105683102,20.796558003317234,14.144641946600869,9.467580039881046,8.676768042003973,36.16001027957297,22.784193418486275,21.23293395664334,16.841862658836924,18.178497574297324,15.848234770181453,8.644534445334774,23.7568600270981,12.176763562502348,16.86500354003681,11.045073113937423,29.161646508573675,11.702204582711703,21.053020238870598,28.87613599937754,21.87526604396838,23.52177986249376,21.630892145438455,20.106312854735876,29.046922294972426,22.406567508455417,18.894293304602826,16.671433196678638,31.892332974874634,24.94344835402085,21.37715779913431,12.450933241664735,17.817685074932516,30.98931730611158,27.745541488487678,18.90412771228175,20.38771426640689,12.386228523842174,20.87343321294255,20.754183113367557,26.02462799494112,12.789110006192747,18.398570640483406,20.92655537142201,20.536673383708024,24.27984884853898,15.735917694448407,12.256644370567106,6.918891652641217,31.12827033588647,3.3437926829795606,20.44425402392575,20.14990843441776,21.177656961342908,16.879553540928374,24.916984233035144,8.822621355343262,18.747584439742944,32.0031896123504,6.308656003800728,14.503973261325832,31.271557209184433,10.737418812078428,5.609972549236506,24.504005050211585,10.501748738490194,21.192550690991425,15.000560586981784,15.47081596520663,22.426339192342894,8.409628124461443,18.26982681873217,25.555708941877747,21.54013286387854,16.494509669086064,16.872802710802883,36.508556178534036,21.295728329719235,16.93260791054206,12.863593502740517,7.480557368555365,26.446315838033307,20.002145373869094,18.045999770238016,19.92948646190806,16.021424128376292,25.28928511882224,8.03423151805812,24.834455652517356,21.638451439304337,27.0518735777828,17.30156264546475,16.45478739982916,37.598393666135316,23.80154809141986,16.549820218596683,10.70557816108784,6.936807865184833,28.892578141342895,20.745645985162472,8.024331994118246,9.31257135553234,18.167050749329853,17.835475738638376,29.444683955893126,11.48430609139477,19.76718766491009,7.0644379800924195,22.503708064977268,17.932419437451507,29.47707378075684,26.41751451847447,18.175587476247866,25.99773194012823,31.616538465597355,29.171370576966474,17.965939896102526,18.509497440746138,39.017367874494255,13.174393855339321,15.2150977521636,8.255677960354246,25.398002473727615,14.722363220585933,29.12595684012633,8.950445691109849,20.075093736720426,19.62976703321158,6.001674038772404,5.217878274589114,20.268326074641873,19.37402454635805,10.160236286155484,19.973106040199475,27.361539542538264,24.581988785362864,17.09138279774467,25.587744160861966,18.724343133879046,11.268041521079244,16.55561437490987,11.435768010048504,13.074383612560144,22.081298754883996,6.587322150139703,30.144840825476713,22.477514425583234,23.725829730059587,13.56066089245731,27.020312903046126,5.965445306425385,18.66406643716833,11.746671518860428,8.980178588354391,30.276256539378593,21.269876554546336,22.994212607329374,6.148570397539301,19.726822995102786,15.741474807616497,25.59145075419668,26.954197738272228,36.29456215696773,19.524799998449094,22.278221103868383,15.768124789033685,22.936946237919376,20.112870685263616,25.790012591237826,38.587918867472474,28.670448404000698,19.377011105339406,5.994883582398431,21.077563300215555,10.256017062688896,11.597427218671474,28.582086226117394,8.403630712642869,28.73367207768432,29.430125598132527,21.698180337930182,17.821496592810394,16.173319973151585,23.15129860440631,23.60933531395969,12.391697916882789,14.256452729924973,11.963419428200774,11.664212912118863,16.641829422803198,27.121255084728368,6.278547014610556,23.31773969736578,24.440589986210323,8.06659873021573,11.367486430853816,24.322543193856525,11.282236113769098,14.821565234920342,15.988956802161063,8.768876697190112,29.88624242539921,21.065552211460997,17.456388434217462,31.868946824579773,22.3822224207345,32.90353227975064,28.374537560102304,20.479779743592005,18.18320024801659,21.112043385401805,16.15829472898546,20.62722473882442,5.224812741899418,35.40156900511798,15.415765096981314,24.099897520238834,11.114240824243748,22.247587424063042,24.940237812746886,10.999228158356802,22.375129571534146,15.874750304700257,20.830983501357593,26.120619375055576,12.624482945741091,24.83872749896514,6.772190129971607,14.934992561952134,11.889822319362375,37.16556839137844,28.124781950504467,28.890706989950942,10.378546892107249,15.523457009193784,5.310044927723276,25.830855021863577,16.953208854875015,9.329673677658974,13.703417091164948,21.843731763855082,11.310480729485178,17.892772594156185,15.059847882168459,6.390622756095343,16.408845716864988,28.549103338053236,12.266618405498622,1.365478929537236,22.68727152912046,24.557263664517784,24.94301462545655,33.04365150478294,18.098374856237395,7.651341506873801,24.49550217486281,31.418535696485023,21.353117649226416,23.81613335693541,28.436716119035648,14.456478034410472,4.087182746835296,10.381284488292795,18.702395615587672,18.735646756363693,6.533704950627532,20.477324451403362,21.742392172041704,11.98960692776006,23.914316062693516,14.979920178492332,14.246309539899014,8.966693954695382,12.699777559402872,26.95671810435404,18.39990964731349,11.00393214180599,26.728966312731387,17.31209782776745,2.030653135305127,12.138307255406966,18.037554926632907,6.021274951941367,4.342150547038934,16.190867839739237,19.605357490536626,24.400222280639777,5.7024201605898694,26.404578409597022,17.95957949180731,13.640044931798446,32.79400091227784,18.847404375445734,11.941396450013878,11.238773272292901,13.11971783106235,25.87902723700737,29.946880169612182,1.262779870884363,26.595726251318524,19.194877227174658,14.07999964484922,19.33612650173043,27.300441059301463,10.434381483637827,35.61285723645561,6.389065365017839,26.412653815921537,17.95531491198434,24.711524548276405,36.212427069637386,24.992876592350754,27.463660589314593,10.194629826534829,8.821406545823418,18.189209193323094,9.580552578915489,10.352508184634196,11.88287317270055,7.812997382921583,6.9558477460613455,24.920187220936285,10.953174479206599,18.58550072860912,18.825286701913715,27.458653773239373,21.624128779281897,14.085670645309607,31.143611683222293,36.38062952421575,15.327361888549449,29.61517178790705,20.997240117669786,20.14545463358558,10.482164926784625,28.815051410947007,24.806101507369895,18.61783858957163,23.51960677628986,13.55801472942668,21.175442977391516,12.102398181495149,10.953177679158856,18.980711705273325,34.75694738495291,15.20384489500655,19.47071540720322,29.409137154166515,25.24335913739182,16.08354543865799,6.417509020985532,11.61240297901526,18.75598095201768,28.69985351389839,20.938753663100435,7.585981440193983,29.75739996795989,9.627712688490032,33.69937063392291,26.146839938978157,13.785522473541771,25.19143915933278,4.23515040104212,16.171868691022205,27.49887254748875,14.923503592110254,31.138924999623,18.43449556175321,20.05760922816624,23.585099509731847,10.686802431834245,20.491459226035804,13.351247578854505,13.841116850871988,32.94437423287232,21.22821866413819,7.473684471742668,28.475237898956298,18.496948713221208,15.935054750572903,23.375876994843267,37.45839203907304,19.488933897250188,21.416543020229263,20.20258088770071,8.765580038533493,7.419774919281825,24.93177468848423,11.205897226672882,18.049865054241835,9.61289256774358,22.602942887267723,27.80105952106173,21.871609616896688,16.261670927498567,19.60698681363843,18.25053147147265,22.78634805682202,10.061164136498402,5.036129062479313],"a":[16.03672066944492,16.94809751866053,11.067235378222055,3.422030285676465,5.084260161043401,3.0674915269821934,9.375692986706774,11.283576232722314,13.755821529657686,16.095991202196373,12.636252818676814,3.0957513402913506,10.15678043112121,15.376015777184584,1.536530269649079,11.317585165012831,18.573261226517182,9.16327220337267,12.789971536549608,15.760773218016482,16.061942832670283,3.0311623973835733,14.347114081806538,12.02358870450627,6.355883500981081,0.5883429644787874,4.100927190814252,7.90627624328458,8.290030164716873,16.28592259874266,2.065671746879083,19.00651421844836,14.21709228544084,6.2097606939276995,8.67379054379227,8.220236317428746,15.816300217097528,1.1013285517984839,3.913392859259659,15.26487899613629,2.9557742350388505,2.6264311322462097,4.6157985057041895,13.348538345491914,2.618679930253225,7.2858647482155,4.942951897592174,13.56405341579805,5.4151620985659,19.323053666829576,2.961630645914921,5.624370111251471,17.40336330886751,16.08754352489562,3.343389756556072,19.637609967847034,11.922822013691526,16.044985088685234,2.0679312387688675,3.571549603721995,12.08911833530876,17.926061289781366,16.882047253677786,10.51325399875946,16.889700501934556,10.003476842203728,16.135854024425235,13.642657874723994,7.142087425526427,9.697717221782716,18.462801855701095,5.0453220301760915,2.2852630318075695,1.6305117145032488,15.145685807494576,15.388522978983733,16.395557803779997,12.931454942473017,4.412124662912333,4.6603111098969885,19.77215112070704,9.737943842517002,13.295665140822353,17.326964707984622,2.6323408005200566,6.960994742726649,11.649346452180591,17.136448243368257,19.609345518657086,1.0968115764275232,17.384602064440323,6.164958892734385,12.310784022264457,3.297375391331272,5.572417784161536,18.385675533736368,3.85681723001289,5.132920035324466,5.587611382104574,5.519165047240162,4.455841436156307,3.8225696804690967,15.285491307568385,8.853772415061822,12.675925182123544,14.0541947049367,3.7274252887275905,10.280403234243622,10.155303016200357,6.927970418666898,16.375716110544122,2.5560632136812877,19.437903422765604,19.304178055458593,10.110294979718656,12.018064374365682,8.54979312896059,19.09835269782002,6.72903062367598,6.435705556707272,2.6203130255129548,5.064861680069788,11.458978428378703,17.04601936609062,12.077759954079067,14.905583971463923,9.388397620963783,19.899662558719037,9.499000501306657,5.465814406125387,16.23710560028959,8.06740262902046,19.02236833390535,10.021123222834355,9.151410286626867,3.794528659582852,11.77789237134585,14.231963955535232,7.096478282422272,12.141178177425056,8.929416006372652,9.446866018435593,6.420766137710303,18.03274369552109,13.2218720691437,6.568487888487304,7.755508175789703,4.160796096773556,5.754995886650889,13.201091984369956,16.611710940098586,0.5315815871070617,9.32035114445306,19.031271558521368,8.514979109485697,14.547210871518622,14.64208312558958,18.8393774029854,6.0604286624900405,10.185220859201532,12.146770719788469,8.80660522827608,8.593792227217062,19.050657787486905,17.225143258871192,12.629159575161841,13.149621387410694,18.284680257843576,3.2630247867754303,10.847864881886661,16.886246321120403,4.6872098236849835,11.258787769459971,3.914365402788529,9.583308230300837,17.304049059937405,8.232277339682081,2.106428619301579,2.970626772590106,18.355127186904554,9.524356715205787,9.2140630674357,6.9219990883107,6.782946544028681,9.775578619403355,4.177372501506307,3.3026082186145134,15.934352217966836,2.3902823496165038,12.789986710842953,15.071249318297614,16.270872568263982,15.286932036767823,13.517555347021798,16.051503658941456,13.453947375991454,13.685749034421892,19.274555824994543,11.946566630388421,10.579568396579955,0.09521776813166127,3.4100310722859595,12.302633970406468,11.191810388023145,1.0998742311706033,3.6456187487806258,17.611644321716827,2.0415238463489915,8.085398232418498,1.072626988389569,19.962321332273515,3.5870253931547325,1.8922578301728477,1.8257069196998188,17.3038786003414,4.8374330560725065,18.926129029988587,8.035083355624373,2.108642465675188,7.1589912992899984,0.9480068260146046,17.97356887993618,2.1863510606451353,5.574008546357252,18.739721975102718,10.720736034207965,2.851583833535596,4.553851576921484,10.251073446549182,1.494684598224465,6.115302796828397,0.28905870246575205,0.36342434910626054,4.496851901496588,18.737968007632098,17.166221526189833,16.806605793094445,0.8087022523177501,2.7055079833747975,6.870492526157621,0.34409940715749876,9.163196110928315,7.603198307907877,10.753953364804048,15.828769249499825,4.734989498496387,14.378649439181004,2.734475203669531,10.108598880535645,18.73595492270365,17.719928317155954,7.815255599005679,18.829193280342334,13.016264730524568,1.4693844058141847,7.148714527962743,8.45341941438992,0.3725848423614364,0.39851465481891335,13.427355328148112,18.254327147477063,5.81949842427822,7.237592287765433,13.69620056684357,4.056522217417795,5.06573525871072,11.37920181367849,7.669290870193155,2.765147738690419,6.045757448929696,8.061192652606941,0.5064614117771615,10.110141610183865,16.476539145806047,14.223917830135736,17.658021151050207,1.5688905902209571,5.196264917619087,12.071106235164276,9.632397674717383,12.0275225077053,13.128543969170003,16.006754706317476,11.186743804148076,19.376937975378652,18.63937886509053,6.3188417961252075,14.135421344217761,12.243844261109786,19.537926409418034,2.9051935016695474,1.2888273356141955,7.226190492677316,7.882178306771248,12.557401351665213,13.983387140671176,3.052049094751035,6.401756888333208,10.374351143497588,5.418404411082465,12.79062398681464,19.59314640548536,7.9239444015619664,4.912471678690733,8.692146544011944,17.24333550103571,1.70214999822639,12.968658991793621,1.6399173667489064,9.524062012664851,10.52009121097714,9.250051359287777,17.88353985410721,1.8589762986190017,13.476079795082395,19.62362388025287,2.98240764040576,5.4791962635065605,9.825519698925667,13.986655341355515,11.005275582291333,16.04240697555554,5.5676352268344464,3.903039698534587,3.4053830046374722,3.686635874039732,1.396821193615021,3.588050808992449,19.90027479245783,0.4514377620008103,16.999118472680443,16.52078914055979,12.609115273287696,19.02517115822495,10.152977114303003,8.225068194649161,1.6265814336535334,13.316361331527649,1.1566295975053853,5.404823608974678,11.596762444515608,11.751793567401387,14.820215858993361,12.664793202621215,6.068579307189563,17.062943838494,2.4940733891116507,19.53525432615534,3.7633838226439353,7.10709571799744,2.665551247344018,16.915732739430442,3.1825219306446284,7.514317461274658,8.11217979169057,0.8103442955010198,11.360954051472415,5.031455015909256,5.0692839687810265,2.9944105852005354,11.01576790006408,16.30022459218474,3.015278370007417,16.56353662826088,19.58060854852087,12.213098543958004,10.339473049268491,12.318500518264507,0.75929852048227,16.646767011756687,10.984275320943123,6.102289338550695,14.31655191563026,13.384608751952985,3.544187268721193,6.078271857541955,2.0618690680015694,6.3666229898298266,18.770018609904632,4.831381729009405,15.861558653767172,14.024120329136913,3.6202462583104777,5.559357550378494,2.2323605219248144,2.623561214546437,8.880158856325986,9.025732737159569,10.033184940241968,10.123465337296512,7.894687081707228,17.466867340808182,14.916296215317661,3.235288989968912,1.6581923344320648,13.205499751449148,10.611528450350232,19.574184337255698,5.892775219630444,5.623112217712127,15.866887958657108,6.349491667517206,11.14015329378438,19.404734024292175,8.346747921370877,17.313016880877864,2.8884360606944126,9.30840414539234,3.3317183750051482,13.448264086931276,2.1588872306306106,13.734243311483997,8.196157586215143,18.015215278254544,9.880036438974905,1.9880312688332102,18.816689235698817,19.592847446413302,12.698768316035896,2.8175131250407848,1.6685177991515365,2.665426134140594,6.918676831242876,4.600023858047275,4.981245877281646,18.91694035187855,18.01406031256844,12.715551735105187,13.664399551803928,0.94814364116238,12.896055804252832,7.284375591847603,15.943029166226648,10.858898385464745,1.1954358312434366,15.294976420804055,6.557370947816117,17.141683537704782,15.35779355246827,10.69097264150984,17.324379386995638,15.26373593686615,18.54955284070657,12.620126450896901,3.196786729507979,4.108221247279951,6.6082384373261815,3.2317506429066656,8.868147311289803,9.028919740837749,9.00652939514805,4.453233195765707,8.028093245421335,4.7964474244019595,15.640963061567517,15.858655586501659,1.1316527994419667,8.910940440576788,9.878727526149827,13.048033915466032,6.135581364215725,6.360228372560788,15.974696022347521,0.5602198236001144,18.44515456202259,10.184430290055179,6.15855821075554,6.496306609361744,13.797391516150244,19.665653782722828,16.99765555281266,5.433156674116004,19.876086764868187,1.258146515176799,18.553690251991014,19.75518667173402,7.535364590465328,14.444586014557789,4.085246172666119,15.547958644717204,5.696153374380208,6.987898292192498,8.83522603699391,19.05617791271933,8.615913643003385,4.3704146628461515,19.728139245073706,1.5559177495457677,0.4460352926333533,2.9929336798277495,12.036217569644432,1.471929245382153,4.542212508827328,10.391438309897204,6.923980353164443,4.677360791596503,8.721564842076631,17.20143369723055,2.808988528880181,3.583570593222958,10.059119399296637,11.730030569085486,16.503732093964793,2.224812191383503,7.002414238475216,13.659138131223557,14.124147123482071,13.319504669380384,13.3015634657247,12.433640952173617,17.604736331342004,17.736066163139704,3.413236343235808,9.719856505423401,11.011658799549448,8.038662834975433,2.9183720779107913,9.69893088421033,2.573961057001082,10.491032748548758,14.131342664163853,11.064849956401615,15.063371588248163,17.510039962866976,0.18795653839930093,7.615897327459407,4.924031922206287,4.347395757178929,8.108634290645158,3.1265062217101702,6.667091568828218,5.385414094356671,18.829197653303076,2.4821274987239583,17.76676819047532,6.106587537276007,6.135582085265132,9.116999465790222,17.388325057026215,10.276677473395388,6.004251888724217,3.178435608868564,5.082363431291186,16.80988376298174,4.928714716648783,16.791022351577677,6.778655532580693,1.54316114366285,12.708869400357328,1.1460424341916209,14.908893283177541,17.96823924763582,6.95115058941548,10.934733872787291,12.549473356206772,6.719730134668129,14.80517444027058,19.092030566877565,12.202219061081209,5.490118997194244,0.3845093532260746,17.892104353839645,6.500948679922298,10.843572759853783,18.035329316395273,16.312103947853025,14.489359340167379,16.033582993068357,4.4295692979221,7.996265883420599,13.153393936458372,6.608376465435275,12.412372031146916,10.612545164165237,7.897208441466312,5.926257960929915,18.482821350840215,6.4861745571775975,1.1998732312950189,10.699480554908266,4.084928433605302,17.018672714473816,11.64479391260356,5.536814188208163,8.219596446392497,9.452428779824448,15.466951288868174,14.176726536987822,15.080269192886352,14.716786192353798,19.436499909532312,8.024346128436726,14.68586647316448,6.208015242025167,1.6820439094171658,2.3517158848960396,8.385934975812543,4.795869388059457,7.225156156381725,13.619911058998717,5.275565219777447,1.2428776329291757,10.502655299068273,7.660015623671392,1.6717133292298358,16.27845333931807,16.358117155654934,17.498027351316274,7.266814634073961,12.082840167893618,15.699094895987834,6.762124879936069,14.282358830099673,3.777246834403498,1.9259507925432917,9.120799786684067,9.49607717829219,2.56646280340731,2.001432492595039,12.95123276745624,14.39088974972266,14.646056938711647,16.14486728682467,0.43343916874658994,12.238825913535848,9.122342823162658,9.830633553336376,14.873472839529395,19.55572443763611,15.241304015930567,16.3474745767082,9.124141246147586,4.9256782173589775,12.73005676232819,11.792424328277558,11.890843663441274,0.5047459286535494,4.054239873576595,11.600969726635885,17.891866212209877,10.098703034770589,4.452776520667396,14.545020485857364,18.894177532571284,8.8027077488073,8.02592626714063,2.3821999882597655,3.773631747312751,5.712125907303767,18.183440380243905,1.9792638577517252,3.738126242493931,19.80403301988986,12.041473731380087,1.1170024781911758,13.241385314541354,7.43231494202806,3.1324862239906626,13.822848984156412,5.063995031183808,8.447464361554626,18.644614660456277,3.5475733342502203,2.354598875273699,7.736533040435565,0.34794182851050515,3.64827536818376,9.339082319040614,10.869248488714405,5.342688957476924,5.523128766725769,10.024231668201868,18.01112281215483,8.685078310645924,15.490361442571633,9.684160179548961,18.69112985462063,4.732876579211944,13.400817369645605,0.4807543086848076,3.1490350428633462,11.142586543292188,13.905956456856412,14.36597028768122,18.008102679797222,12.329329705550416,13.73654212591363,3.204714924836485,14.760143543922922,14.257294857711367,8.705533082541187,8.82923450064261,11.94084121922813,19.799943018495412,14.855639512224599,2.1920693825746396,3.5664295767834586,1.568384732695769,18.961089773447902,9.670802987054419,6.737539936621841,2.4188727405019828,4.0588146957127025,11.2718991771013,14.787495908223649,6.146014246321441,12.23605815551188,4.426736963316085,10.927119360890627,2.9599120811329938,11.366773372013345,19.85241637450184,5.731920331330969,7.934556278255123,13.607197669072306,18.463189986824233,11.645079195646728,17.159963769904802,19.27619873218073,10.815404067182786,7.28406619768724,0.3006649076287937,5.522360502736867,6.399751735401136,12.036667624440266,1.6258152636494572,19.960729983728413,15.462930111470833,4.426167008143702,4.574525261690452,14.30910934914207,4.080830958047863,9.294313338162631,8.311483978529992,11.810759749921651,5.6269242751363935,15.878853498841362,15.806140517895235,9.825177707588221,5.393310679080132,5.158624622318553,7.220120721150787,5.7257508248539635,9.591379874679578,5.063118436553737,11.735126388830253,11.216048610700401,5.084274917446341,8.949393006349148,7.319648347570755,4.603287158168952,3.2419208150899337,5.317161392261283,4.230283045029344,10.786836809822201,8.45981555130268,8.889299138610056,0.24794730740893556,8.989906981847092,0.6358825628725473,15.542577555265154,17.10322131712806,17.200102302826522,12.858565199978496,15.655817500337456,0.8843376203627296,18.864449683251628,11.241457578838311,5.847496671030159,18.829549728720963,11.24032760244496,3.2444115368372817,1.3738267658433,19.41913638891912,3.7236525385656716,3.191344647339558,8.723473508854646,4.3666259569959776,11.37589020323723,14.383164104113959,1.7371790776080687,6.475089821140436,1.120251462029045,10.274341236573058,4.921840540482441,10.45104127214195,11.96492925273791,4.578180018482425,4.8860286900311145,12.694225945376774,10.583683392852997,1.1437484929821595,14.256386954367816,16.171346833538728,3.916152019009198,6.457445817656531,9.975491818138384,6.2942473356830675,3.101304254743309,6.95996829483875,8.024146437879821,15.587645397536471,3.4254990897420345,11.628370249671981,17.744635690004465,12.878397340200166,13.584416164574623,16.389110305151977,10.938583590117098,6.813949366791023,17.132420408989404,10.331880153965795,15.919769347035619,3.5926801685863152,16.379983425134373,3.5501538084595774,8.000841162791957,7.663190754347489,11.764374842987069,7.715464027999319,10.913684377176693,16.902920169857865,3.9667024125518635,4.963795326678708,8.3323885764485,7.078832961008894,5.4971365758511315,3.925813361755486,9.827069323356152,3.1266276327732268,18.7232243000954,18.57917531353352,16.677043164964715,1.2864960270627002,11.04939266296455,2.9473480719955036,14.951152092169773,11.632251590646518,3.901920671057839,4.633930602172551,8.90691491428246,0.5284499543872867,9.419016172774475,12.389312390164138,0.8755786790302222,7.044199647688498,9.119985156168845,4.404815198233352,0.1258970354312705,15.196580511392504,15.031845693275612,18.448186259602245,16.437998375129396,1.839468265342017,2.1449799718213036,6.7850967214026126,17.7327876367395,16.179210956762972,13.94189234601841,18.112003036578685,7.209725158768436,0.9030351608947607,0.4264152763621487,7.475133837961994,6.878330708530065,4.408917789219862,11.192676662598844,11.78500494309191,1.3733582083887441,14.482492292452491,14.39999235723398,9.86568232177573,3.8589593232458963,10.842742810939745,18.718458489877072,12.992664559876985,5.823298935936911,9.536394411376596,2.313428260992363,0.5037766719613401,4.3324425869162075,15.346411837461918,3.8550143607592124,4.192981185548268,4.948476547208984,17.03470090870047,10.873097358244074,2.9884529913233004,15.96407730329358,10.530547499785637,8.274974661829244,14.755042059777509,14.148575607399398,8.978989528798738,4.6680462326151195,1.8322540162411327,12.247275699879534,18.596453315282503,0.47639667676665276,17.722299364973576,11.615069805599362,5.363534743108875,8.40493025962763,13.677437643046368,4.719454159939129,18.76851342123317,1.5367332378913456,13.575119562294757,11.758859835606703,17.65500071847535,18.85865212707172,16.4456115028274,11.216819380428408,6.44677030801176,5.797069360385332,7.686193177422984,5.653935620111166,7.363925887896285,3.450980829069854,2.891540528935508,6.677933829444407,9.474899153251721,7.382877800320626,3.015650956770566,8.309608748283512,12.343995189569377,6.091963055498368,6.783034688182261,19.326180749788122,19.19840113991548,7.232851765112791,15.402163372157691,12.677001673986666,9.094468385087481,10.056928545761163,11.03801890994224,7.849931486714108,18.234087331920342,7.602954638980619,2.3316718480161924,14.53509649830969,5.48581840826234,7.9434897964952,14.470821362933425,17.645761076670933,0.16360153429412883,16.79015348724657,12.784618816322059,9.794626156415745,2.010439171201579,4.665074371148696,0.7447055466866281,8.635892380450588,14.673333544724896,6.5981363137760685,2.9520260066210335,11.481164589061992,7.7708746498319226,17.794012697027,10.978599929955312,11.586676310868928,10.580189714902257,0.05217333945088942,3.8684631764228827,10.13535471356709,1.5548661877049774,12.889013324248308,13.023627872984589,7.657918944411608,17.65547685941414,5.0577744874764585,10.568837835357172,2.9709395359149626,8.71082737167682,16.735291350493,17.253526995993504,4.802552400491917,17.998414432353968,12.981771169146157,5.521576776615915,12.278220566215023,19.33507442364851,9.020569219333424,11.650827802008843,11.448447492285524,5.380301725543766,5.754536684382412,18.035630637799937,4.498831917665687,13.235301144651075,7.196929773565772,14.917255724054872,15.457591256462253,19.022983868451654,14.20324795568372,10.921735779156695,5.850331811847589,10.777251686886204,7.0897853928275545,3.9323358070200465],"p":[0.9681576237949006,0.6444157982728098,0.044152820109518265,0.10986634047869881,0.13266999634958165,0.6244831014049472,0.873629915797631,0.24072465828779022,0.4133786714029195,0.39180615386864526,0.9437305294615896,0.1567701444606735,0.6794841435551418,0.7875792824090599,0.01849291556099253,0.668214011379477,0.04943091840374558,0.05251493461187784,0.5037370434798374,0.6559162739984625,0.3227270876893953,0.1990963497891851,0.9565858472126201,0.47272658477345475,0.8596141710153635,0.4509563705975492,0.9612607667696051,0.7790843551947693,0.43441402635080895,0.4877684462260632,0.5534727388120486,0.5109072421276188,0.5009557595940657,0.7316369943262966,0.5522729797944088,0.5513321516219394,0.227661841987558,0.7508736886048879,0.041570030854214846,0.8068991671138652,0.5071917973582893,0.3155155393613147,0.3780710994784269,0.281423640398766,0.2787393310447077,0.7630796408723317,0.7935651910536499,0.5823696568400358,0.1215233447928028,0.5869827062391753,0.5177555681492905,0.10316912546618662,0.3458638340118112,0.07794155358669497,0.20996944986375854,0.9564710514708066,0.774559818422347,0.7006577461143129,0.9883999443073557,0.32444014863508386,0.4825612432441111,0.2380740717032499,0.5285207260558598,0.437615364964306,0.5400331925286854,0.3011222572423238,0.47046353083935344,0.3555730511542363,0.9210732910781141,0.12425968768550577,0.5360952576864835,0.9551413487485041,0.5116346580685223,0.9356133777753877,0.6405840999361123,0.4919795505434168,0.32615882462696133,0.1525479460384338,0.4130422202380317,0.39709192359376977,0.46275225791332675,0.6661533768904326,0.23368214057646042,0.9196562627349787,0.176599268158238,0.814463666497649,0.9800359794530862,0.2732469584354462,0.8756072521170075,0.8659918307715235,0.3566099233199356,0.13526020103184067,0.5913340272830743,0.04579901393315189,0.4908223972454575,0.687438717490096,0.8178736956157986,0.3482557209508752,0.7658705357474762,0.6120030463561483,0.4953046108110024,0.11351883698359067,0.6236433279274021,0.4768029485714742,0.008269455256748603,0.18965665483970673,0.13680075525238378,0.15255794364507635,0.2314165757068367,0.9534288275211831,0.657496101953223,0.9768124616270082,0.20946716172743307,0.46887171981742704,0.7063645217029713,0.9130148301327987,0.5906252175753117,0.6863816316593101,0.09771568325225788,0.8734789432478747,0.38173685906021904,0.448693681439138,0.3418656330547336,0.27393312726548547,0.49516909589307434,0.5688229920710519,0.24523774353412375,0.6584430715424772,0.2540429149662995,0.5335896758880647,0.10480427866428044,0.7762721936842083,0.3780566127444065,0.08425867393850628,0.23103317727043504,0.8642580840746679,0.9574975227646942,0.8165597759535304,0.11225159854968036,0.176846017698977,0.03890763949750675,0.9910582383464568,0.7928878056500945,0.27846724515318066,0.9969524467949424,0.2183510048773527,0.3092956343726101,0.1631003415041059,0.9176632250622636,0.9348190098504214,0.6291215167674826,0.8286661814007854,0.9262309619153841,0.6219394681280952,0.6913366294942604,0.7349279930843817,0.9224854539871317,0.1717855527226868,0.6823109027729084,0.18864301864243815,0.7313818516835457,0.4527436119253325,0.577013661907875,0.9259301934878867,0.5756872153771613,0.16413167007295426,0.6882646067254565,0.29256375026417425,0.10649967228437185,0.2708082353078807,0.06132799193028382,0.41504794077155416,0.7273011316083193,0.22257904498469006,0.022920596229756063,0.3282887374524237,0.4759833913664311,0.344733057637725,0.2628012448353072,0.12156827203017606,0.739352947935358,0.9555387973411571,0.5821021698722315,0.7277672218092961,0.356116018788897,0.8898977923267442,0.9401976046412923,0.15640214277829334,0.9309415503907557,0.7435013302914275,0.07939392515609067,0.9193424066276457,0.24119443213583303,0.6854871306209582,0.772285593918415,0.43070835003243624,0.012695813480040341,0.08605336891115534,0.1616834458179437,0.8272828783088786,0.01835560832886385,0.004376536497656458,0.3202433786844592,0.8590011135921376,0.9620871742549089,0.9612302520224174,0.9953248713629965,0.5388058748964029,0.7401749814235714,0.4444551312001155,0.3411146749632692,0.4563720005806704,0.3482982878842218,0.5419261206310555,0.6683872393777641,0.893354816245536,0.3250123322917984,0.32094508897010243,0.2753187955283489,0.22236887033461028,0.5631896911856611,0.6954043632050815,0.13920153504671284,0.6549837509094794,0.4444053708424458,0.769332582379965,0.23691927626735776,0.8357369516443058,0.9538958966492299,0.9629477296666795,0.8625638684927583,0.15882818159454937,0.019387743139863023,0.29597995627383256,0.15614345435888644,0.8056705787169192,0.8720371918533323,0.9343947810743425,0.09935442792210902,0.8784253798913102,0.38615229095586723,0.7019194940145783,0.38298840091588726,0.13933919083160862,0.7053861988020862,0.7196049341720292,0.6133554473683667,0.847037324285048,0.24313179710459654,0.9368354080146064,0.7204684409757705,0.4412344068324974,0.8869874053104327,0.10160021251329021,0.15238863420925042,0.6422844516162605,0.4983286850822326,0.3413571190929372,0.2738552692148224,0.30361970706889707,0.24541243374264976,0.4840277997185043,0.6490123867641353,0.26662730004569934,0.042678828633552435,0.26159654654935927,0.8221186374287335,0.16329757524419652,0.11478550231040252,0.7257466864958513,0.5236188085543712,0.9758739750332732,0.9232199830162708,0.18385510021864726,0.1084595645177946,0.17894368133251426,0.7225511808672413,0.8390559023137913,0.7146912148535822,0.6570774518710334,0.25600052223204495,0.4033472463958889,0.4785523855969782,0.6135947156963661,0.10347506929428185,0.16190081303208137,0.47753167576954314,0.5888182310046217,0.8840337979337822,0.9480829011518446,0.8370022842417191,0.6862910695925626,0.33530488861298213,0.2818482943199392,0.8921228841569009,0.3459118320097636,0.7084989853242627,0.5714353622815707,0.3788054880102041,0.9031265478332171,0.2494231484009306,0.8875015977637164,0.42225127040705557,0.9280791459615301,0.802684631897401,0.11315080020001012,0.10999059423120872,0.055785822107141225,0.5246875419318642,0.19184399502758365,0.2626561309483906,0.44699368581678667,0.41103616809920007,0.5613543501111626,0.658081823127808,0.15829029997476662,0.936453581222707,0.029251160517633323,0.3644071597116916,0.3532394560647305,0.03324534753162678,0.6323236434425279,0.44091979497381395,0.7271960017543306,0.973594677276435,0.7550284554178828,0.3091233762835559,0.7076030339596759,0.41222923291738955,0.45192246156946925,0.12920912350619185,0.3539270485857886,0.5675470041241397,0.7024287693678124,0.6576232787282135,0.4735512044979573,0.9344317684966426,0.4693468386055668,0.2282243616868016,0.44766374717374524,0.41577653926117586,0.894947605054409,0.09091610885407353,0.05026281072627237,0.8672208784018374,0.5240942462264382,0.49046119065035754,0.4284480454691999,0.05804853131871246,0.8758835115046537,0.8788146656014677,0.23655528824155692,0.19831020824710754,0.9609856986218093,0.0029756221983927578,0.2992166284492723,0.9509924938721555,0.8701000614374959,0.5560972206161092,0.6039169178673387,0.9982357468561613,0.5519783092549384,0.649320888620786,0.9287863033235777,0.5840027150429485,0.5204144311029137,0.7835622573107199,0.4293017041261533,0.5094633535125486,0.21517192993187417,0.19171998385328015,0.5821248610790797,0.736510695993303,0.6253642913224606,0.8419634259141331,0.8138735599354034,0.24525898871007512,0.09741117729285542,0.42206038792549117,0.060421782464269214,0.4879109527222911,0.15601944114023492,0.7201588922499749,0.02131898533484433,0.007811756139467052,0.965292398512378,0.5496381019974095,0.06911835362409069,0.5072218442701586,0.627762780655901,0.21901425655784013,0.7517286786237549,0.040426786072491394,0.7746014810941444,0.6820661652563464,0.9155195851425282,0.9109455758662419,0.6510035306604427,0.18562540890866885,0.2941843611656967,0.1610953600558418,0.10183198736798382,0.21671155230748607,0.4880625157807936,0.03461519340840291,0.5327308386145739,0.12546069407288307,0.5030576760954228,0.714282456351693,0.9053668353803481,0.8420090917399234,0.35856191670978443,0.8077762361966043,0.9979800474461169,0.03294676662127882,0.9200688435452351,0.45083078612477157,0.35608790295473214,0.8549435087426203,0.7935462790451737,0.5023961390427301,0.009947670863888147,0.15986147550214658,0.9492183967481351,0.8912472720064666,0.9582823709851982,0.3117551038428146,0.749169174163175,0.6717195489780838,0.5212668621227885,0.6818771366856211,0.7952571124227514,0.8975796629145345,0.04698621735533215,0.04396605841765844,0.8167016931327558,0.9933456662907671,0.8971754607534912,0.7135045033041159,0.9835074879204573,0.32609144261403955,0.3998574382609523,0.017182751227648563,0.8793036271764623,0.3732188562400347,0.2390600476558984,0.1850948090654907,0.693557974811716,0.20456043427030157,0.6001230394285773,0.3185672579807728,0.13901867812833202,0.37674002158105546,0.30077148245158347,0.535451716731769,0.2692385482552839,0.2515743556079886,0.405086817634281,0.11560292027867702,0.6711401666286008,0.09687092004834552,0.47597616513528274,0.27778364810628053,0.5050216030917498,0.6848849882714689,0.7624101989716048,0.312323514421492,0.22286005890724758,0.698072639917241,0.1923679288837714,0.43622762166108964,0.5846805952197687,0.5084921254039041,0.6181959861296535,0.2552236672294721,0.463908629215529,0.10822150657299812,0.10868490415076026,0.8439990064000942,0.7502887032378678,0.062423828672811155,0.16115578388907026,0.4661271814083692,0.9103120910747386,0.7847994403213403,0.2322899057001384,0.5875486977676689,0.27501823083242005,0.19179205504462837,0.4230888095566221,0.10141990066621753,0.4128564599814579,0.7106882446964138,0.6610533106925041,0.5153935478811038,0.2676009366858436,0.8032801782895294,0.8728970092719881,0.2534480068212601,0.3250258722299153,0.8942050008097362,0.47788915343839156,0.5653909136130744,0.3877772431699953,0.6648667497410423,0.33574365368383163,0.2724129246563807,0.15238159897480785,0.10262009428572649,0.13022449795004087,0.5707754018235762,0.34380980349915014,0.9537633929494838,0.6752034279384287,0.21157538848902813,0.8124982608799161,0.5997667129446367,0.6462386619365961,0.09689081584950388,0.4775995373546613,0.9286295961218793,0.20203853346518486,0.9058969090375413,0.9712253061374085,0.5629881153814429,0.14689215082214968,0.5222474667987234,0.0372562464867936,0.3258753684750326,0.6713762774615077,0.6961459304791837,0.37281289353804103,0.8042062550962352,0.46029493318961845,0.4884275600082286,0.08494975411790429,0.19598681802094808,0.590143996443651,0.13966063424104846,0.872584317461395,0.39356906860894236,0.8528949282058655,0.922745505648493,0.15063863508487563,0.3018121281962718,0.4486574179450016,0.514218299420728,0.007452546901901336,0.8937051074196174,0.45823058361554736,0.2680584641891848,0.4313879038477837,0.9949364545070978,0.24422287337453175,0.9157048574057873,0.3773632992691778,0.9549816042814432,0.5627242481163637,0.11821332649386385,0.9000089255941626,0.40287870758736477,0.9870593922937294,0.4879802253149794,0.32936762718353396,0.0460149896141564,0.13026869207606717,0.487506769888838,0.28298038732961706,0.6715028418339188,0.8220819202303355,0.06123380105230636,0.8908861626259648,0.20271343195779123,0.2284692373771886,0.17965879743978075,0.5010413440416834,0.09629139762916128,0.7366913438508416,0.20313130520586253,0.9028613664102461,0.387725248235403,0.4299299510167882,0.28883677935165,0.9005380164613412,0.4933114209014178,0.2545983387528816,0.29869329241123865,0.942082675231491,0.273140514358704,0.43781039717880676,0.6139808722117235,0.2088725082671512,0.23128021273596722,0.30399335073952205,0.8636510651498068,0.7945727642849589,0.08566190968747467,0.376371826155814,0.5690930209082579,0.3599149181804733,0.4306258013974926,0.7283802986990173,0.6962899625473673,0.9683004316005375,0.5303909832845366,0.5525448226871876,0.26718439952303075,0.14989625319509736,0.07633566592985419,0.6743140165399906,0.21318002730572005,0.03929046159352079,0.42771934841778925,0.6252595943650805,0.3847514138865904,0.6393016049404296,0.24074010419724923,0.5446237682136434,0.2864105058181563,0.5618966777682415,0.9857535771300332,0.548081531106398,0.9166012538275761,0.7735310061551586,0.9286158392168373,0.28439848765316844,0.19176363130375873,0.208808628039574,0.10811539225543743,0.75178656350401,0.39361104377036527,0.968427527489309,0.08806732676798279,0.5693251163556396,0.9008255585192082,0.23870565853082515,0.7534237054435511,0.24225174478976363,0.3194569268798142,0.11222176828952413,0.7209572338877761,0.3393338493002902,0.8895716416784252,0.25888067138608517,0.4353526460752941,0.4843407092615677,0.500814150036546,0.4873357158765659,0.8602030951701423,0.5580878254661137,0.8382337332770535,0.856261161795187,0.46965643355194087,0.8404523085187514,0.01708603294386135,0.5125903964727054,0.17254418074008893,0.45803211192930804,0.9032437859417699,0.7880774073201045,0.6151250883199313,0.6219718254566176,0.7330917115419915,0.9099250560024876,0.05043336603698423,0.3792459058280031,0.4737985394113813,0.23717304965751795,0.6007127572298334,0.6648734670567653,0.7077120682452613,0.7484257940954151,0.6116842678917207,0.9686368660775408,0.6856165346466296,0.6736388649047693,0.33765490420210686,0.7860757817932948,0.4927160151215586,0.9540033819022569,0.9067620300056458,0.2655393163406028,0.04607809158499809,0.5496938823970299,0.6468696998026977,0.0938232114803077,0.797688645310995,0.3998729662485163,0.16812760453403253,0.11873163706115286,0.27734110516228094,0.21566199735780334,0.7412158908277797,0.8194938720584828,0.07818619974048957,0.8435778633664957,0.0012665156203173211,0.012279762991366905,0.8138061041004154,0.6489726308967527,0.7410549838975906,0.6854608753435463,0.07410751733378951,0.6272879372611284,0.0424835648976265,0.06390636663243665,0.6552935575414442,0.6856799687762731,0.7536360013284369,0.7447758999172134,0.1576740558323686,0.11309336057407271,0.8653927731704936,0.3228659346751026,0.339400960248478,0.9343660669556106,0.7340843718440262,0.9025727921063578,0.9347520685087289,0.941105010441813,0.6989203142927369,0.5832347541497307,0.21789858628819192,0.378558926929524,0.5937942638449922,0.691561438562051,0.1303006637219426,0.909129466726827,0.9655569406964046,0.693617048777855,0.38554015434909394,0.4071607095691834,0.9463512880002487,0.7394437447150879,0.38921276296875584,0.0059427553456754545,0.8927738610692051,0.24625654104960737,0.9695956889926871,0.5510421649558035,0.4421865819056643,0.7421119346580851,0.18985536273456072,0.7139004658576709,0.22744276565208477,0.2939322563917668,0.5341424719940453,0.38741638228654973,0.2728328295249314,0.8594783337503482,0.6830564487781747,0.9064879110884734,0.01843129370163621,0.7290262882599254,0.37165703148309537,0.26595225051718074,0.9725052085891075,0.7044451401427303,0.8989954166547647,0.463898949137582,0.3427868495461186,0.02872175822379197,0.11805935421021307,0.008932217896991945,0.8014269507270781,0.3687312002394598,0.013725425860324103,0.32431092611584145,0.2324301051785922,0.5141156672749212,0.8557006629115582,0.5719863975536947,0.15067696903223693,0.46561789355564076,0.09385627873529723,0.6834111074836702,0.7271903964444295,0.46001168324374686,0.5385241176972224,0.6499457614713813,0.5526411412065706,0.2643577877255623,0.22268365983165062,0.12686203111056926,0.5254805001243072,0.9789322057310188,0.6222029349778933,0.5718024808435997,0.39093787623411247,0.005399031708283486,0.15007878529065555,0.2743585151173651,0.3567902124629889,0.7888997098840713,0.5546600500110825,0.054592678563462504,0.1438282383485665,0.32305699589363335,0.6488477130322643,0.38256848580982394,0.08328124073151666,0.6039249886660409,0.8269236483993632,0.2486606813056207,0.5122505292229089,0.930555563340268,0.2656580380928888,0.16996507451961884,0.5612177291079772,0.9932166033315599,0.5561416612545778,0.21382972925706967,0.9623856687764416,0.3942412578131964,0.8792081301544166,0.24725495943810127,0.709638015497158,0.5579370009257758,0.14303775998888502,0.40004772016941903,0.5424438144330532,0.5834195468913277,0.035560723913890424,0.4788375139666472,0.10239247960924902,0.4947373182741468,0.9465827241928402,0.9203447391371933,0.5027809883970658,0.5159189553562578,0.42878517695978124,0.10770462185649743,0.8570064829461579,0.179689570053571,0.03343649664714876,0.6556432473932388,0.17121349521479812,0.7752920821070268,0.1079931574620232,0.9731101695307836,0.2780697653135369,0.7291118675110779,0.25679146639990336,0.02348728801154909,0.9823660845483762,0.26474202402362423,0.2594508642399336,0.4062085039938239,0.7730000846050027,0.017145353950870357,0.5252137209159888,0.10459874041405937,0.7252262172585706,0.4776482993406599,0.9005428999528644,0.39479511033384496,0.5731582968605753,0.24824706660392493,0.3692441158977018,0.47367599776761415,0.1475395684818699,0.533025512784256,0.3584964408427651,0.4559089587175793,0.6971996921577648,0.5108854728648944,0.267998727342841,0.9589018869008517,0.15318611057215725,0.29131166903946415,0.17674230679978753,0.8353159202447991,0.465125826565975,0.021914793378920994,0.379719989074194,0.5785144522747889,0.3541873566349838,0.3395250712471125,0.5831140421534147,0.5071699960491141,0.0009267285392309255,0.7718059196420275,0.6971111286187004,0.68394620130273,0.5572493634532447,0.2820484439086528,0.6660229620450493,0.576132822037646,0.5713419481233863,0.9684891605213264,0.6874510485091663,0.2928575318917488,0.7531779171459105,0.35889980218815887,0.21339254516959283,0.5818406145224018,0.9702176694104512,0.6437255403824693,0.6399823350916147,0.7719703589283844,0.8027434058178438,0.02153922337131453,0.7238875453626739,0.7449374636959445,0.3910931625484515,0.7776422940702998,0.7005505456182155,0.3888384448976907,0.1329273303672014,0.8003093166861772,0.6133403157647066,0.021148936953981012,0.8718009615539695,0.49255408008808965,0.1609807424453804,0.21818114668992017,0.29530435013144496,0.636665593994864,0.5884653860561289,0.26626500531433517,0.4865698776018159,0.4496725117795213,0.5867794617744586,0.9288253748637125,0.6786648829888393,0.0549963936755804,0.7223723004993685,0.11746953744159372,0.8278988618631917,0.764290790778487,0.7341769258168078,0.1065220947981087,0.024966409448653026,0.3844746670509065,0.4343495198926224,0.7564377733428058,0.9003527188522367,0.32739225191972343,0.7651689634495742,0.44336728839879846,0.21082969952652264,0.5302877878704595,0.48292974764368535,0.7492574411966,0.7264251208367809,0.36556220103928316,0.10119169956390617,0.6964729989448826,0.28365573835311975,0.16182802213193392,0.2923409364540339,0.5332249303414149,0.7490405141166934,0.322717458405249,0.061703140002119516,0.8226903573647755,0.25756030046058775,0.48568137624061913,0.7113846824542955,0.8460109256318813,0.5155018276680614,0.9903842630518414,0.5260226254831177,0.06111461370403948,0.7260299463462516,0.2008369339776681,0.25576961179592894,0.12115386750443946,0.8967354667212164,0.07427770178654902,0.8740327435462252,0.28161332888065216,0.43863816998383043,0.8512841466807644,0.5547960894003063,0.24712884219597808,0.4845386676068617,0.2133174395122761,0.6632685474532938,0.6801793184120297,0.11901024225348578,0.0893733813504416,0.3213116490040724,0.39672289092590507,0.06852756277544825,0.18654870396345213,0.18639464643213843,0.24473317037023135,0.20134042377554762,0.6166401059355395,0.961147604201986,0.9239104086332848,0.6418056176093143,0.9675739256324547,0.6065842833139552,0.6236344529238056,0.6991967875993523,0.18573578045142547,0.763880695523103,0.25815595173212746]}

},{}],18:[function(require,module,exports){
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

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0, 0.5 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0, 0.5 );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN, 0.5 );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, 1.0, NaN );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN, 0.5 );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, NaN, NaN );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0, NaN );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided valid parameters, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0, 0.5 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0, 0.0, 0.5 );

	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, 2.0, 3.0 );
	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF, 0.0 );
	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` is equal to the inflection point `( c - a ) / ( b - a )`, the created function returns mode `c`', function test( t ) {
	var quantile;
	var pInflect;
	var y;
	var a;
	var b;
	var c;

	a = 0.0;
	b = 4.0;
	c = 3.0;

	pInflect = ( c - a ) / ( b - a );
	quantile = factory( a, b, c );
	y = quantile( pInflect );
	t.equal( y, c, 'returns c' );

	a = -10.0;
	b = 10.0;
	c = 0.0;
	pInflect = ( c - a ) / ( b - a );
	quantile = factory( a, b, c );
	y = quantile( pInflect );
	t.equal( y, c, 'returns c' );

	t.end();
});

tape( 'the created function evaluates the quantile for `p` given a small range `b - a`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var a;
	var b;
	var c;
	var i;
	var p;
	var y;

	expected = smallRange.expected;
	p = smallRange.p;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( a[i], b[i], c[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given a medium range `b - a`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var a;
	var b;
	var c;
	var i;
	var p;
	var y;

	expected = mediumRange.expected;
	p = mediumRange.p;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( a[i], b[i], c[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given a large range `b - a`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var a;
	var b;
	var c;
	var i;
	var p;
	var y;

	expected = largeRange.expected;
	p = largeRange.p;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( a[i], b[i], c[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/quantile/test/test.factory.js")
},{"./../lib/factory.js":12,"./fixtures/julia/large_range.json":15,"./fixtures/julia/medium_range.json":16,"./fixtures/julia/small_range.json":17,"@stdlib/constants/float64/eps":1,"@stdlib/constants/float64/ninf":2,"@stdlib/constants/float64/pinf":3,"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/abs":6,"tape":166}],19:[function(require,module,exports){
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
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/quantile/test/test.js")
},{"./../lib":13,"tape":166}],20:[function(require,module,exports){
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
var quantile = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.1, NaN, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.1, 0.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.1, 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and valid parameters, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, PINF, NINF, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 2.0, 1.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, -10.0, 10.0, 11.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, -10.0, 10.0, -11.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` is equal to the inflection point `( c - a ) / ( b - a )`, the function returns mode `c`', function test( t ) {
	var pInflect;
	var y;
	var a;
	var b;
	var c;

	a = 0.0;
	b = 4.0;
	c = 3.0;
	pInflect = ( c - a ) / ( b - a );
	y = quantile( pInflect, a, b, c );
	t.equal( y, c, 'returns c' );

	a = -10.0;
	b = 10.0;
	c = 0.0;
	pInflect = ( c - a ) / ( b - a );
	y = quantile( pInflect, a, b, c );
	t.equal( y, c, 'returns c' );

	t.end();
});

tape( 'the function evaluates the quantile for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var a;
	var b;
	var c;
	var i;
	var p;
	var y;

	expected = smallRange.expected;
	p = smallRange.p;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var a;
	var b;
	var c;
	var i;
	var p;
	var y;

	expected = mediumRange.expected;
	p = mediumRange.p;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var a;
	var b;
	var c;
	var i;
	var p;
	var y;

	expected = largeRange.expected;
	p = largeRange.p;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/quantile/test/test.quantile.js")
},{"./../lib":13,"./fixtures/julia/large_range.json":15,"./fixtures/julia/medium_range.json":16,"./fixtures/julia/small_range.json":17,"@stdlib/constants/float64/eps":1,"@stdlib/constants/float64/ninf":2,"@stdlib/constants/float64/pinf":3,"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/abs":6,"tape":166}],21:[function(require,module,exports){
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

},{"./is_number.js":24}],22:[function(require,module,exports){
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

},{"./is_number.js":24,"./zero_pad.js":28}],23:[function(require,module,exports){
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

},{"./main.js":26}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"./format_double.js":21,"./format_integer.js":22,"./is_string.js":25,"./space_pad.js":27,"./zero_pad.js":28}],27:[function(require,module,exports){
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

},{"./main.js":30}],30:[function(require,module,exports){
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

},{"./main.js":33}],32:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],33:[function(require,module,exports){
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

},{"./is_string.js":32,"@stdlib/string/base/format-interpolate":23,"@stdlib/string/base/format-tokenize":29}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":41}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{"./define_property.js":39}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":38,"./has_define_property_support.js":40,"./polyfill.js":42}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":31}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){

},{}],45:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],46:[function(require,module,exports){
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
},{"base64-js":43,"buffer":46,"ieee754":149}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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
},{"_process":156}],49:[function(require,module,exports){
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

},{"events":47,"inherits":150,"readable-stream/lib/_stream_duplex.js":51,"readable-stream/lib/_stream_passthrough.js":52,"readable-stream/lib/_stream_readable.js":53,"readable-stream/lib/_stream_transform.js":54,"readable-stream/lib/_stream_writable.js":55,"readable-stream/lib/internal/streams/end-of-stream.js":59,"readable-stream/lib/internal/streams/pipeline.js":61}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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
},{"./_stream_readable":53,"./_stream_writable":55,"_process":156,"inherits":150}],52:[function(require,module,exports){
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
},{"./_stream_transform":54,"inherits":150}],53:[function(require,module,exports){
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
},{"../errors":50,"./_stream_duplex":51,"./internal/streams/async_iterator":56,"./internal/streams/buffer_list":57,"./internal/streams/destroy":58,"./internal/streams/from":60,"./internal/streams/state":62,"./internal/streams/stream":63,"_process":156,"buffer":46,"events":47,"inherits":150,"string_decoder/":165,"util":44}],54:[function(require,module,exports){
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
},{"../errors":50,"./_stream_duplex":51,"inherits":150}],55:[function(require,module,exports){
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
},{"../errors":50,"./_stream_duplex":51,"./internal/streams/destroy":58,"./internal/streams/state":62,"./internal/streams/stream":63,"_process":156,"buffer":46,"inherits":150,"util-deprecate":174}],56:[function(require,module,exports){
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
},{"./end-of-stream":59,"_process":156}],57:[function(require,module,exports){
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
},{"buffer":46,"util":44}],58:[function(require,module,exports){
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
},{"_process":156}],59:[function(require,module,exports){
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
},{"../../../errors":50}],60:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],61:[function(require,module,exports){
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
},{"../../../errors":50,"./end-of-stream":59}],62:[function(require,module,exports){
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
},{"../../../errors":50}],63:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":47}],64:[function(require,module,exports){
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

},{"./":65,"get-intrinsic":140}],65:[function(require,module,exports){
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

},{"es-define-property":125,"es-errors/type":131,"function-bind":139,"get-intrinsic":140,"set-function-length":160}],66:[function(require,module,exports){
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

},{"./lib/is_arguments.js":67,"./lib/keys.js":68}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],69:[function(require,module,exports){
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

},{"es-define-property":125,"es-errors/syntax":130,"es-errors/type":131,"gopd":141}],70:[function(require,module,exports){
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

},{"define-data-property":69,"has-property-descriptors":142,"object-keys":154}],71:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],72:[function(require,module,exports){
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

},{"./ToNumber":103,"./ToPrimitive":105,"./Type":110}],73:[function(require,module,exports){
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

},{"../helpers/isFinite":118,"../helpers/isNaN":119,"../helpers/isPrefixOf":120,"./ToNumber":103,"./ToPrimitive":105,"es-errors/type":131,"get-intrinsic":140}],74:[function(require,module,exports){
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

},{"call-bind/callBound":64,"es-errors/type":131}],75:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":133}],76:[function(require,module,exports){
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

},{"./DayWithinYear":79,"./InLeapYear":83,"./MonthFromTime":93,"es-errors/eval":126}],77:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":124,"./floor":114}],78:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":114}],79:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":77,"./DayFromYear":78,"./YearFromTime":112}],80:[function(require,module,exports){
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

},{"./modulo":115}],81:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":122,"./IsAccessorDescriptor":84,"./IsDataDescriptor":86,"es-errors/type":131}],82:[function(require,module,exports){
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

},{"../helpers/timeConstants":124,"./floor":114,"./modulo":115}],83:[function(require,module,exports){
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

},{"./DaysInYear":80,"./YearFromTime":112,"es-errors/eval":126}],84:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":122,"es-errors/type":131,"hasown":148}],85:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":151}],86:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":122,"es-errors/type":131,"hasown":148}],87:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":84,"./IsDataDescriptor":86,"./IsPropertyDescriptor":88,"es-errors/type":131}],88:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":122}],89:[function(require,module,exports){
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

},{"../helpers/isFinite":118,"../helpers/timeConstants":124}],90:[function(require,module,exports){
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

},{"../helpers/isFinite":118,"./DateFromTime":76,"./Day":77,"./MonthFromTime":93,"./ToInteger":102,"./YearFromTime":112,"./floor":114,"./modulo":115,"get-intrinsic":140}],91:[function(require,module,exports){
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

},{"../helpers/isFinite":118,"../helpers/timeConstants":124,"./ToInteger":102}],92:[function(require,module,exports){
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

},{"../helpers/timeConstants":124,"./floor":114,"./modulo":115}],93:[function(require,module,exports){
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

},{"./DayWithinYear":79,"./InLeapYear":83}],94:[function(require,module,exports){
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

},{"../helpers/isNaN":119}],95:[function(require,module,exports){
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

},{"../helpers/timeConstants":124,"./floor":114,"./modulo":115}],96:[function(require,module,exports){
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

},{"./Type":110}],97:[function(require,module,exports){
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


},{"../helpers/isFinite":118,"./ToNumber":103,"./abs":113,"get-intrinsic":140}],98:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":124,"./DayFromYear":78}],99:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":124,"./modulo":115}],100:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],101:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":103}],102:[function(require,module,exports){
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

},{"../helpers/isFinite":118,"../helpers/isNaN":119,"../helpers/sign":123,"./ToNumber":103,"./abs":113,"./floor":114}],103:[function(require,module,exports){
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

},{"./ToPrimitive":105,"call-bind/callBound":64,"safe-regex-test":159}],104:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":134}],105:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":136}],106:[function(require,module,exports){
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

},{"./IsCallable":85,"./ToBoolean":100,"./Type":110,"es-errors/type":131,"hasown":148}],107:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":140}],108:[function(require,module,exports){
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

},{"../helpers/isFinite":118,"../helpers/isNaN":119,"../helpers/sign":123,"./ToNumber":103,"./abs":113,"./floor":114,"./modulo":115}],109:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":103}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":77,"./modulo":115}],112:[function(require,module,exports){
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

},{"call-bind/callBound":64,"get-intrinsic":140}],113:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":140}],114:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],115:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":121}],116:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":124,"./modulo":115}],117:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":72,"./5/AbstractRelationalComparison":73,"./5/Canonicalize":74,"./5/CheckObjectCoercible":75,"./5/DateFromTime":76,"./5/Day":77,"./5/DayFromYear":78,"./5/DayWithinYear":79,"./5/DaysInYear":80,"./5/FromPropertyDescriptor":81,"./5/HourFromTime":82,"./5/InLeapYear":83,"./5/IsAccessorDescriptor":84,"./5/IsCallable":85,"./5/IsDataDescriptor":86,"./5/IsGenericDescriptor":87,"./5/IsPropertyDescriptor":88,"./5/MakeDate":89,"./5/MakeDay":90,"./5/MakeTime":91,"./5/MinFromTime":92,"./5/MonthFromTime":93,"./5/SameValue":94,"./5/SecFromTime":95,"./5/StrictEqualityComparison":96,"./5/TimeClip":97,"./5/TimeFromYear":98,"./5/TimeWithinDay":99,"./5/ToBoolean":100,"./5/ToInt32":101,"./5/ToInteger":102,"./5/ToNumber":103,"./5/ToObject":104,"./5/ToPrimitive":105,"./5/ToPropertyDescriptor":106,"./5/ToString":107,"./5/ToUint16":108,"./5/ToUint32":109,"./5/Type":110,"./5/WeekDay":111,"./5/YearFromTime":112,"./5/abs":113,"./5/floor":114,"./5/modulo":115,"./5/msFromTime":116}],118:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":119}],119:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],120:[function(require,module,exports){
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

},{"call-bind/callBound":64}],121:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],122:[function(require,module,exports){
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

},{"es-errors/type":131,"hasown":148}],123:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{"get-intrinsic":140}],126:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],127:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],128:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],129:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],130:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],131:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],132:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],133:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":131}],134:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":135,"./RequireObjectCoercible":133}],135:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],136:[function(require,module,exports){
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

},{"./helpers/isPrimitive":137,"is-callable":151}],137:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":138}],140:[function(require,module,exports){
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

},{"es-errors":127,"es-errors/eval":126,"es-errors/range":128,"es-errors/ref":129,"es-errors/syntax":130,"es-errors/type":131,"es-errors/uri":132,"function-bind":139,"has-proto":143,"has-symbols":144,"hasown":148}],141:[function(require,module,exports){
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

},{"get-intrinsic":140}],142:[function(require,module,exports){
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

},{"es-define-property":125}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"./shams":145}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":145}],147:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":139}],148:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":139}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{"call-bind/callBound":64,"has-tostringtag/shams":146}],153:[function(require,module,exports){
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

},{"./isArguments":155}],154:[function(require,module,exports){
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

},{"./implementation":153,"./isArguments":155}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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
},{"_process":156,"through":172,"timers":173}],158:[function(require,module,exports){
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

},{"buffer":46}],159:[function(require,module,exports){
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

},{"call-bind/callBound":64,"es-errors/type":131,"is-regex":152}],160:[function(require,module,exports){
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

},{"define-data-property":69,"es-errors/type":131,"get-intrinsic":140,"gopd":141,"has-property-descriptors":142}],161:[function(require,module,exports){
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

},{"es-abstract/es5":117,"function-bind":139}],162:[function(require,module,exports){
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

},{"./implementation":161,"./polyfill":163,"./shim":164,"define-properties":70,"function-bind":139}],163:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":161}],164:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":163,"define-properties":70}],165:[function(require,module,exports){
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
},{"safe-buffer":158}],166:[function(require,module,exports){
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
},{"./lib/default_stream":167,"./lib/results":169,"./lib/test":170,"_process":156,"defined":71,"through":172,"timers":173}],167:[function(require,module,exports){
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
},{"_process":156,"fs":45,"through":172}],168:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":156,"timers":173}],169:[function(require,module,exports){
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
},{"_process":156,"events":47,"function-bind":139,"has":147,"inherits":150,"object-inspect":171,"resumer":157,"through":172,"timers":173}],170:[function(require,module,exports){
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
},{"./next_tick":168,"deep-equal":66,"defined":71,"events":47,"has":147,"inherits":150,"path":48,"string.prototype.trim":162}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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
},{"_process":156,"stream":49}],173:[function(require,module,exports){
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
},{"process/browser.js":156,"timers":173}],174:[function(require,module,exports){
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
},{}]},{},[18,19,20]);
