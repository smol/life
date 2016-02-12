varying vec3 vNormal;

void main(){

	// float test = dot(vNormal * vec4(viewMatrix).xyz, vec3(0.0,0.0,1.0));

	float intensity = pow(0.7 - dot(vNormal, vec3( 0.0, 0.0, 1.0 )), 4.0);

	gl_FragColor = vec4(0.24, 0.60, 0.90, 1.0) * intensity;
}
