Probability Mass Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Hypergeometric](https://en.wikipedia.org/wiki/Hypergeometric_distribution) distribution probability mass function (PMF).

The [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function) (PMF) for a [hypergeometric](https://en.wikipedia.org/wiki/Hypergeometric_distribution) random variable is

<div class="equation" align="center" data-raw-text="f(x;m,n,k)=P(X=x;m,n,k)=\begin{cases} {{{m \choose x} {n \choose {k-x}}}\over {{m+n} \choose k}} & \text{ for } x = 0,1,2,\ldots \\
0 & \text{ otherwise}
\end{cases}" data-equation="eq:pmf_function">
	<img src="" alt="Probability mass function (PMF) for a Hypergeometric distribution.">
	<br>
</div>

where `m` is the number of white balls in urn and `n` is the number of black balls in urn and `k` is the number of draws.

## Installation

``` bash
$ npm install distributions-hypergeometric-pmf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var pmf = require( 'distributions-hypergeometric-pmf' );
```

#### pmf( x[, options] )

Evaluates the [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function) (PMF) for the [Hypergeometric](https://en.wikipedia.org/wiki/Hypergeometric_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = pmf( 1 );
// returns 0.5

out = pmf( -1 );
// returns 0

out = pmf( 0.5 );
// returns 0

x = [ 0, 1, 2, 3, 4, 5 ];
out = pmf( x );
// returns [ 0.5, 0.5, 0, 0, 0, 0 ]

x = new Int8Array( x );
out = pmf( x );
// returns Float64Array( [0.5,0.5,0,0,0,0] )

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

out = pmf( mat );
/*
	[ 0.5 0.5
	  0 0
	  0 0 ]
*/

```

The function accepts the following `options`:

*	__m__: number of white balls in urn. Default: `1`.
*	__n__: number of black balls in urn. Default: `1`.
*	__k__: number of draws. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [hypergeometric](https://en.wikipedia.org/wiki/Hypergeometric_distribution) distribution is a function of three parameters: `m`(number of white balls in urn) and `n`(number of black balls in urn) and `k`(number of draws). By default, `m` is equal to `1` and `n` is equal to `1` and `k` is equal to `1`. To adjust either parameter, set the corresponding option.

``` javascript
var x = [ 0, 1, 2, 3, 4, 5 ];

var out = pmf( x, {
	'm': 10,
	'n': 4,
	'k': 5
});
// returns [ 0, ~0.005, 0.09, 0.36, 0.42, ~0.126 ]

```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,1],
	[2,2],
	[3,3],
	[4,4],
	[5,5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = pmf( data, {
	'accessor': getValue
});
// returns [ 0.5, 0.5, 0, 0, 0, 0 ]

```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,1]},
	{'x':[2,2]},
	{'x':[3,3]},
	{'x':[4,4]},
	{'x':[5,5]}
];

var out = pmf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,0.5]},
		{'x':[1,0.5]},
		{'x':[2,0]},
		{'x':[3,0]},
		{'x':[4,0]},
		{'x':[5,0]}
	]
*/

var bool = ( data === out );
// returns true

```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Int8Array( [0,1,2,3,4] );

out = pmf( x, {
	'dtype': 'float32'
});
// returns Float32Array( [0.5,0.5,0,0,0] )

// Works for plain arrays, as well...
out = pmf( [0,1,2,3,4], {
	'dtype': 'float32'
});
// returns Float32Array( [0.5,0.5,0,0,0] )

```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ 0, 1, 2, 3, 4, 5 ];

out = pmf( x, {
	'copy': false
});
// returns [ 0.5, 0.5, 0, 0, 0, 0 ]

bool = ( x === out );
// returns true

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

out = pmf( mat, {
	'copy': false
});
/*
	[ 0.5 0.5
	  0 0
	  0 0 ]
*/

bool = ( mat === out );
// returns true

```


## Notes

*	If an element is __not__ a numeric value, the evaluated [PMF](https://en.wikipedia.org/wiki/Hypergeometric_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = pmf( null );
	// returns NaN

	out = pmf( true );
	// returns NaN

	out = pmf( {'a':'b'} );
	// returns NaN

	out = pmf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = pmf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = pmf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = pmf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var pmf = require( 'distributions-hypergeometric-pmf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = pmf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = pmf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = pmf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = pmf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = pmf( mat );

// Matrices (custom output data type)...
out = pmf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-hypergeometric-pmf.svg
[npm-url]: https://npmjs.org/package/distributions-hypergeometric-pmf

[travis-image]: http://img.shields.io/travis/distributions-io/hypergeometric-pmf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/hypergeometric-pmf

[codecov-image]: https://img.shields.io/codecov/github/distributions-io/hypergeometric-pmf/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/hypergeometric-pmf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/hypergeometric-pmf.svg
[dependencies-url]: https://david-dm.org/distributions-io/hypergeometric-pmf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/hypergeometric-pmf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/hypergeometric-pmf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/hypergeometric-pmf.svg
[github-issues-url]: https://github.com/distributions-io/hypergeometric-pmf/issues
