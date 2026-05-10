import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_redIntensity;

const float PI = 3.14159265359;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float f = 0.0;
  float w = 0.5;
  const int octaves = 5;
  for (int i = 0; i < 5; i++) {
    f += w * snoise(p);
    p *= 2.0;
    w *= 0.5;
  }
  return f;
}

float warpedNoise(vec2 p, float t) {
  vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + t*0.12), fbm(p + vec2(5.2, 1.3) + t*0.09));
  return fbm(p + 4.0*q);
}

float metaballField(vec2 p, float t) {
  float field = 0.0;
  vec2 b1 = vec2(0.25*sin(t*0.15), 0.2*cos(t*0.13));
  float r1 = 0.28 + 0.04*sin(t*0.3);
  float d1 = length(p - b1);
  field += r1*r1 / (d1*d1 + 0.001);
  vec2 b2 = vec2(-0.2*cos(t*0.12), 0.15*sin(t*0.14));
  float r2 = 0.24 + 0.03*cos(t*0.25);
  float d2 = length(p - b2);
  field += r2*r2 / (d2*d2 + 0.001);
  vec2 b3 = vec2(0.15*sin(t*0.11 + 1.0), -0.2*cos(t*0.16 + 0.5));
  float r3 = 0.2 + 0.03*sin(t*0.2);
  float d3 = length(p - b3);
  field += r3*r3 / (d3*d3 + 0.001);
  return field;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x/u_resolution.y, 1.0);
  float t = u_time;

  float flow1 = warpedNoise(p * 1.8, t);
  float flow2 = fbm(p * 4.0 + vec2(t*0.06, -t*0.04)) * 0.3;
  float fluid = flow1 + flow2;

  float meta = metaballField(p * 0.9, t);

  float specular = smoothstep(0.5, 1.2, fluid) * 0.7 + smoothstep(1.5, 3.5, meta) * 0.6;
  float edge = smoothstep(0.3, 0.7, abs(fract(fluid*2.0)-0.5)*2.0) * 0.15;

  vec3 voidDeep = vec3(0.02, 0.02, 0.04);
  vec3 oceanMid = vec3(0.0, 0.10, 0.26);
  vec3 cyanGlow = vec3(0.29, 0.56, 0.88);
  vec3 liquidSilver = vec3(0.65, 0.70, 0.75);
  vec3 strikeRed = vec3(0.89, 0.09, 0.21) * u_redIntensity;

  vec3 color = mix(voidDeep, oceanMid, smoothstep(-0.5, 0.5, fluid));
  color = mix(color, cyanGlow, smoothstep(0.2, 0.8, fluid) * 0.6);
  color += strikeRed * specular * 0.8;
  color += liquidSilver * edge * 0.4;
  color = mix(color, mix(oceanMid, cyanGlow, 0.5)*1.3, smoothstep(0.8, 2.5, meta)*0.5);

  float vig = 1.0 - dot(p, p)*0.4;
  color *= max(vig, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
`

export default function FluidEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_redIntensity: { value: 1.0 },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const onMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.x = e.clientX / window.innerWidth
      uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize, { passive: true })

    const animate = () => {
      uniforms.u_time.value = performance.now() * 0.001
      renderer.render(scene, camera)
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
