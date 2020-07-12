#!/bin/sh

cd $(dirname $0)/src
glslangValidator -V100 main.vert -o ../spv/main.vert.spv
glslangValidator -V100 main.frag -o ../spv/main.frag.spv
for n in slide*.frag
do 
	glslangValidator -V100 "$n" -o ../spv/"$n".spv
done
