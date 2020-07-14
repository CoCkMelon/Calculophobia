cd $(dirname $0)
mkdir winpackage
cp -r shaders winpackage
cp -r sounds winpackage
cp -r textures winpackage
cp Calculophobia.exe winpackage
cp /mingw64/bin/SDL2.dll winpackage
cp /mingw64/bin/libwinpthread-1.dll winpackage
cp /mingw64/bin/libvulkan-1.dll winpackage
cp /mingw64/bin/libgcc_s_seh-1.dll winpackage
zip -r -u calcpack.zip winpackage/
