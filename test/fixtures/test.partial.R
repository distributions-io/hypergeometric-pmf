options( digits = 16 )
library( jsonlite )


m = 10
n = 5
k = 4
x = c( -5, 0, 1, 2, 3, 3.5, 4, 5 )
y = dhyper( x, m,n,k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/partial.json" )
