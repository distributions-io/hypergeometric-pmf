options( digits = 16 )
library( jsonlite )

m = 30
n = 30
k = 20
x = 0:24
y = dhyper( x, m,n,k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
