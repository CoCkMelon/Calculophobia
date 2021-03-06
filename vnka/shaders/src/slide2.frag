#version 460

#extension GL_ARB_separate_shader_objects: enable
#extension GL_ARB_shading_language_420pack: enable
#extension GL_GOOGLE_include_directive : enable

layout (location = 0) in vec2 frag_pos;

layout (set = 0, binding = 0) uniform sampler2D iChannel0;
layout (set = 0, binding = 1) uniform sampler2D iChannel1;

layout (push_constant) uniform push_constants {
	vec4 u_Mouse;
	vec4 u_Date;
	bvec2 u_Mouse_lr; //is mouse left[0], right[1] clicked
	vec2 u_Resolution;
	bool u_debugdraw;
	bool u_pause;
	float u_Time;
	float u_TimeDelta;
	int u_Frame;
} constants;

vec3 iResolution=vec3(constants.u_Resolution,1.);
float iTime=constants.u_Time;
float iTimeDelta=constants.u_TimeDelta;
int iFrame=constants.u_Frame;
vec4 iMouse=constants.u_Mouse;
vec4 iDate=constants.u_Date;
bool is_debugdraw=constants.u_debugdraw;
bool is_pause=constants.u_pause;

layout (location = 0) out vec4 out_color;

float saww(float f)
{
	f = f - floor(f);
	return f;
}

float triw(float f)
{
	f = 1.0 - abs(mod(f,2.0)-1.0);
	return f;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord/iResolution.xy;
	vec4 col;
	vec4 t1 = texture(iChannel0,uv+iMouse.xy/iResolution.xy*vec2(5.));
	vec4 t2 = texture(iChannel1,uv+vec2(sin(iTime),abs(sin(iMouse.y/iResolution.y))));
	if(t2.w==0)
		col = t1;
	else
		col = t2;
	fragColor = vec4(col);
}

/*
#define mainImage(c,f)\
for( vec3 L, i=c.xyw, o=3.*i; i.x++<32.;\
     L=length(o)-i,\
          o-=L.z*normalize(2.*f.xyx-iResolution),\
               c=L.z<.01?dot(o.zzz,o)*texture(iChannel1,iTime*.1-o.xy):c\
                  )
*/

void main()
{
	vec4 uFragColor=vec4(0.);
	vec2 fragCoord=(frag_pos.xy/2.+vec2(0.5,0.5)); // 0-1 range to fit shadertoy
	//fragCoord.y=1.-fragCoord.y; // shadertoy v(y)-flip main_image
	fragCoord=floor(iResolution.xy*fragCoord);
	mainImage(uFragColor,fragCoord);
	out_color=uFragColor;
}
