#!/bin/busybox sh
cd $(dirname $0)/vnka
if ! test -f ./Calculophobia ; then
	./compile
fi
cd shaders/src
if ! test -f ../spv/main.vert.spv ; then
	glslangValidator -V100 main.vert -o ../spv/main.vert.spv
fi
if ! test -f ../spv/main.frag.spv ; then
	glslangValidator -V100 main.frag -o ../spv/main.frag.spv
fi
for n in slide*.frag
do 
	if ! test -f ../spv/"$n".spv ; then
		glslangValidator -V100 "$n" -o ../spv/"$n".spv
	fi
done
cd ../../
exec ./Calculophobia
