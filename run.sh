#!/bin/busybox sh
cd $(dirname $0)/vnka
if ! test -f ./Calculophobia ; then
	./compile
fi
if ! test -f shaders/spv/slide0.frag.spv ; then
	./shaders/build_shaders.sh
fi
exec ./Calculophobia
