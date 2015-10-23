'use strict';

// MODULES //

var partial = require( './partial.js' );


// PMF //

/**
* FUNCTION: pmf( out, matrix, m, n, k )
*	Evaluates the probability mass function (PMF) for a Hypergeometric distribution with number of white balls in urn `m` and number of black balls in urn `n` and number of draws `k` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} m - number of white balls in urn
* @param {Number} n - number of black balls in urn
* @param {Number} k - number of draws
* @returns {Matrix} output matrix
*/
function pmf( y, x, m, n, k ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'pmf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( m, n, k );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION pmf()


// EXPORTS //

module.exports = pmf;
