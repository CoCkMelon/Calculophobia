#version 450

#extension GL_ARB_separate_shader_objects: enable
#extension GL_ARB_shading_language_420pack: enable
#extension GL_GOOGLE_include_directive : enable

layout (location = 0) in vec2 frag_pos;

layout (set = 0, binding = 0) uniform sampler2D iChannel0;
layout (set = 0, binding = 1) uniform sampler2D iChannel1;

layout (push_constant) uniform push_constants
{
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

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    //vec2 ouv=uv*2.;
    //uv=fract(uv*2.);
    vec3 col=vec3(0.);
    //if(ouv.x<1.)
    //	col = texture(iChannel0,uv).rgb;
    //else
        col = texture(iChannel0,uv/vec2(2.,1)).rgb;
	//col += vec3(sin(iTime),0.,0.);
    fragColor = vec4(col,1.0);
}

void main()
{
    vec4 uFragColor=vec4(0.);
    vec2 fragCoord=(frag_pos.xy/2.+vec2(0.5,0.5)); // 0-1 range to fit shadertoy
    //fragCoord.y=1.-fragCoord.y; // shadertoy v(y)-flip main_image
    fragCoord=floor(iResolution.xy*fragCoord);
    mainImage(uFragColor,fragCoord);
    out_color=uFragColor;
}
