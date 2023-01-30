uniform float uTime;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main()
{
    //  Position
    vec3 originalPosition = vec3(position);

    float angle = atan(position.x, position.z);
    float distanceToCenter = length(position.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime;
    angle += angleOffset;
    originalPosition.x = cos(angle) * distanceToCenter ;
    originalPosition.z = sin(angle) * distanceToCenter;

    vec4 modelPosition = modelMatrix * vec4(originalPosition, 1.0);

    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}