options( digits = 16 )
library( jsonlite )


m = 200
n = 100
k = 80
x = 0:100
y = dhyper( x, m, n, k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/array.json" )
