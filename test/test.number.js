/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Check whether an element is `NaN`
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var	validationData = require( './fixtures/number.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}),
		m = validationData.m,
		n = validationData.n,
		k = validationData.k;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Hypergeometric probability density function', function test() {
		var actual;
		for ( var i = 0; i < data.length; i++ ) {
			actual =  pdf( data[ i ], m, n, k );
			if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-10 );
			}
		}
	});

	it( 'should return `NaN` if provided `NaN` as input', function test() {
		assert.isTrue( isnan( pdf( NaN, m, n, k ) ) );
	});

});
