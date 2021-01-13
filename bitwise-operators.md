# Bitwise Operators (With Python)

## Bitwise And (&)

Take and of every single bit of the two binary numbers under the operator.

and operator - iff both of the bits are 1, take 1, else 0

Example :

x = 0b101111 (47)

y = 0b100101 (37)

x & y = 0b100101 (37)

## Bitwise Or (|)

Take or of every single bit off the two binary numbers under the operator.

or operator - if either of the bits are 1, take 1, else 0


Example :

x = 0b1100 (12)

y = 0b1010 (10)

x | y = 0b1110 (14)

## Bitwise xor (^)

Take xor of every single bit off the two binary numbers under the operator.

xor operator - if both are the same we get 0, if either are 1 we get 1

Example :

x = 0b1100 (12)

y = 0b1010 (10)

x ^ y = 0b0110 (6)

## Bitwise not (~)

Its not like usual bitwise operators. The not operator reverses the sign of the number and reduces the number by 1.

~2 = -3

~-12 = 11


## Bitwise Left Shift (<<)

x << n

To the binary of x, add n number of 0.

x = 0b1011

x << 2 -> 0b101100 -> 44

Formula to calculate after left shift.

x << n = x * 2^n

## Bitwise Right Shift (>>)

x >> n

To the binary of x, truncate n number of bits.

x = 0b101111

x >> 2 -> 0b1011 -> 11

Formula to calculate after right shift.

x << n = x // 2^n

### Exceptions : 

- If there are no more bits to be truncated, it will show 0. For example, 2 >> 10 = 0
- While right shifting a negative number, if you exceed the number of bits that can be truncated, it shows -1. For example, -2 >> 213 = -1

