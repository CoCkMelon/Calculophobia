cmake_minimum_required(VERSION 2.8)

project("example_minimal")

find_package(Vulkan REQUIRED)
if(NOT Vulkan_FOUND)
    message("ERROR: Vulkan not found")
endif(NOT Vulkan_FOUND)
set(Vulkan_LIBRARY)

if (Vulkan_FOUND)
    MESSAGE(STATUS "  [Found Vulkan library]")
    MESSAGE(STATUS "  Vulkan include directory:" ${Vulkan_INCLUDE_DIR})
    FOREACH(item ${Vulkan_LIBRARIES})
        MESSAGE(STATUS "  using lib: " ${item})
    ENDFOREACH()
    include_directories(${Vulkan_INCLUDE_DIR})
endif()

set(SOURCES
	"vnka/main.c" 
	"../vk_utils/vk_utils.c"
	"../vk_utils/vk_error_print.c"
	"../vk_utils/vk_render_helper.c"
)

add_executable(
		Vkexample_img
		${SOURCES} 
)


add_custom_command(TARGET Vkexample_img POST_BUILD
                    COMMAND ${CMAKE_COMMAND} -E copy_directory
                    ${CMAKE_SOURCE_DIR}/shaders/spv $<TARGET_FILE_DIR:Vkexample_img>/shaders/spv)
add_custom_command(TARGET Vkexample_img POST_BUILD
                    COMMAND ${CMAKE_COMMAND} -E copy_directory
                    ${CMAKE_SOURCE_DIR}/textures $<TARGET_FILE_DIR:Vkexample_img>/textures)

if("${CMAKE_C_COMPILER_ID}" STREQUAL "MSVC")

  add_definitions(-DVK_USE_PLATFORM_WIN32_KHR )
  target_link_libraries(Vkexample_img ${Vulkan_LIBRARY} SDL2)
elseif("${CMAKE_C_COMPILER_ID}" STREQUAL "GNU")

  add_definitions(-DVK_USE_PLATFORM_XCB_KHR -flto -O2 -s -fdata-sections -ffunction-sections -Wl,--gc-sections)
  target_link_libraries(Vkexample_img m xcb ${Vulkan_LIBRARY} SDL2)
else()
  add_definitions(-DVK_USE_PLATFORM_XCB_KHR -flto -O2 -s -fdata-sections -ffunction-sections -Wl,--gc-sections)
  target_link_libraries(Vkexample_img m xcb ${Vulkan_LIBRARY} SDL2)
	#message(WARNING "Unknown compiler '${CMAKE_C_COMPILER_ID}'!")
endif()
