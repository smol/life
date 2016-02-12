uniform int selected;
uniform vec3 color;

void main() {
	vec4 alpha_color = vec4(color.r, color.g, color.b, 1.0);
	
	if (selected == 1)
		gl_FragColor = alpha_color *  vec4(1.0, 1.0, 1.0, 0.5);
	else
		gl_FragColor = alpha_color * vec4(1.0, 1.0, 0.0, 0.0);
}
