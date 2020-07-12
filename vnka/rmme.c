#include <stdio.h>
struct ch{
	int g;
	char a[4][8];
}c = {
	3,
	{
		"one",
		"two",
		"three",
		"four"
	}
};
int main(int argc, char *argv[])
{
	printf("%s",c.a[0]);
	return 0;
}
