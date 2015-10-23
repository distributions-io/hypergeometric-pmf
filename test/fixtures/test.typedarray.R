options( digits = 16 )
library( jsonlite )


m = 1
n = 1
k = 1
x = c( -1, 0, 0.5, 1, 2 )
y = dhyper( x, m, n, k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/typedarray.json" )
