'use strict';

// MODULES //

var fln = require( 'compute-factorialln' ),
	isnan = require( 'validate.io-nan' ),
	isInteger = require( 'validate.io-integer' );

// FUNCTIONS //

var exp = Math.exp,
	max = Math.max,
	min = Math.min;


// PARTIAL //

/**
* FUNCTION: partial( m, n, k )
*	Partially applies number of white balls in urn `m` and number of black balls in urn `n` and number of draws `k` and returns a function for evaluating the probability mass function (PMF) for a Hypergeometric distribution.
*
* @param {Number} m - number of white balls in urn
* @param {Number} n - number of black balls in urn
* @param {Number} k - number of draws
* @returns {Function} PMF
*/
function partial( m, n, k ) {
	var mins, maxs;
	mins = max( 0, k - n );
	maxs = min( m, k );
	/**
	* FUNCTION: pmf( x )
	*	Evaluates the probability mass function (PMF) for a Hypergeometric distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PMF
	*/
	return function pmf( x ) {
		var lnum, ldenom, lpmf;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( isInteger( x ) && mins <= x && x <= maxs ) {
			lnum = fln( k ) + fln( m ) + fln( m + n - k) + fln( n );
			ldenom = fln( m + n ) + fln( x ) + fln( k - x ) + fln( m - x ) + fln( n + x - k );
			lpmf = lnum - ldenom;
			return exp( lpmf );
		} else {
			return 0;
		}
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
