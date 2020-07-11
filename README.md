# Calculophobia
A visual novel about scary calculators.

**Dependencies** - vulkan library(sdk), win32/X11, SDL2.

# Compiling
on Linux
```
./compile
```
  
on Windows

In Windows VS press *open Cmake*.
```
cd vnka
mkdir build
cd build
cmake ..
make
```

Build with **mingw64** (*vulkan-1.dll* from VulkanSDK, *vulkan.h* in system(cygwin or native) path):
```
x86_64-w64-mingw32-gcc -DVK_USE_PLATFORM_WIN32_KHR -O3 -s -lm -mwindows ../vk_utils/vk_utils.c ../vk_utils/vk_error_print.c ../vk_utils/vk_render_helper.c main.c -o VKexample.exe <path to>/vulkan-1.dll
```

Graphical output is based on https://github.com/danilw/vulkan-shader-launcher/
# [**Discord server**](https://discord.gg/BvfPC4c)
