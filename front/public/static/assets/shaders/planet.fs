// precision highp float;

#define USER_ENVMAP;

uniform vec3 pointLightColor[MAX_POINT_LIGHTS];
uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];

uniform sampler2D texture;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vec4 addedLights = vec4(0.0,0.0,0.0,1.0);

	for (int i = 0; i < MAX_POINT_LIGHTS; ++i){
		vec3 light = normalize(pointLightPosition[i] - vPosition);
		vec4 diff = max(dot(vNormal, light), 0.0) * vec4(pointLightColor[i], 1.0);
		addedLights += clamp(diff, 0.0, 1.0);
	}

	gl_FragColor = texture2D(texture, vUv) * addedLights;
}
