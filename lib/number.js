'use strict';

// MODULES //

var fln = require( 'compute-factorialln' ),
	isnan = require( 'validate.io-nan' ),
	isInteger = require( 'validate.io-integer' );

// FUNCTIONS //

var exp = Math.exp,
	min = Math.min,
	max = Math.max;


// PMF //

/**
* FUNCTION: pmf( x, m, n, k )
*	Evaluates the probability mass function (PMF) for a Hypergeometric distribution with number of white balls in urn `m` and number of black balls in urn `n` and number of draws `k` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} m - number of white balls in urn
* @param {Number} n - number of black balls in urn
* @param {Number} k - number of draws
* @returns {Number} evaluated PMF
*/
function pmf( x, m, n, k ) {
	var mins, maxs,
		lnum, ldenom, lpmf;
	if ( isnan( x ) ) {
		return NaN;
	}
	mins = max( 0, k - n );
	maxs = min( m, k );
	if ( isInteger( x ) && mins <= x && x <= maxs ) {
		lnum = fln( k ) + fln( m ) + fln( m + n - k) + fln( n );
		ldenom = fln( m + n ) + fln( x ) + fln( k - x ) + fln( m - x ) + fln( n + x - k );
		lpmf = lnum - ldenom;
		return exp( lpmf );
	} else {
		return 0;
	}
} // end FUNCTION pmf()


// EXPORTS //

module.exports = pmf;
