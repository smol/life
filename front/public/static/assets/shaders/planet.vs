#define USER_ENVMAP;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
	vUv = uv;

	vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
	vNormal = normalize(normalMatrix * normal);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
