options( digits = 16 )
library( jsonlite )


m = 5
n = 5
k = 3
x = c( -1, 0.5, 0, 1, 2, 3, 4, 5)
y = dhyper( x, m,n,k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/number.json" )
