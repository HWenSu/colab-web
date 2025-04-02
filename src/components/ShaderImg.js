import { useEffect, useRef } from "react";
import * as THREE from "three";

const ShaderImg = ({ imgUrl }) => {
  const imageContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    const imageElement = imageRef.current;

    if (!imageContainer || !imageElement) return;

    let scene, camera, renderer, planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let prevPosition = { x: 0.5, y: 0.5 };
    let easeFactor = 0.02;
    let aberrationIntensity = 0.0;

    const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        }
      `;

    const fragmentShader = `
        varying vec2 vUv;
        uniform sampler2D u_texture;
        uniform vec2 u_mouse;
        uniform vec2 u_prevMouse;
        uniform float u_aberrationIntensity;
        void main() {
          vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
          vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
          vec2 mouseDirection = u_mouse - u_prevMouse;
          vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
          float pixelDistanceToMouse = length(pixelToMouseDirection);
          float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
          vec2 uvOffset = strength * -mouseDirection * 0.2;
          vec2 uv = vUv - uvOffset;
          vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
          vec4 colorG = texture2D(u_texture, uv);
          vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));
          gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, colorG.a);
        }
      `;

    function initializeScene(texture) {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        80,
        imageElement.offsetWidth / imageElement.offsetHeight,
        0.01,
        10
      );
      camera.position.z = 1;

      // 獲取圖片的寬高比
      const aspectRatio = texture.image.width / texture.image.height;
      const planeWidth = 2 * aspectRatio; // 根據圖片比例調整寬度
      const planeHeight = 2; // 高度保持為 2

      const shaderUniforms = {
        u_mouse: { value: new THREE.Vector2() },
        u_prevMouse: { value: new THREE.Vector2() },
        u_aberrationIntensity: { value: 0.0 },
        u_texture: { value: texture },
      };

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
        })
      );
      scene.add(planeMesh);
      scene.background = null;

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        premultipliedAlpha: false,
      });
      renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    function animateScene() {
      requestAnimationFrame(animateScene);
      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );
      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevPosition.x,
        1.0 - prevPosition.y
      );
      planeMesh.material.uniforms.u_aberrationIntensity.value = Math.max(
        0.0,
        aberrationIntensity - 0.05
      );
      renderer.setClearColor(0x000000, 0); // 確保每次渲染都設定透明背景
      renderer.render(scene, camera);
    }

    const handleMouseMove = (event) => {
      easeFactor = 0.02;
      const rect = imageContainer.getBoundingClientRect();
      prevPosition = { ...targetMousePosition };
      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;
      aberrationIntensity = 1;
    };

    const handleMouseEnter = (event) => {
      easeFactor = 0.02;
      const rect = imageContainer.getBoundingClientRect();
      mousePosition.x = targetMousePosition.x =
        (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y =
        (event.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      easeFactor = 0.05;
      targetMousePosition = { ...prevPosition };
    };

    let cleanup;
    const textureLoader = new THREE.TextureLoader();

    if (imageElement.complete) {
      textureLoader.load(imageElement.src, (texture) => {
      initializeScene(texture);
      animateScene();
      imageContainer.addEventListener("mousemove", handleMouseMove);
      imageContainer.addEventListener("mouseenter", handleMouseEnter);
      imageContainer.addEventListener("mouseleave", handleMouseLeave);
      cleanup = () => {
        imageContainer.removeEventListener("mousemove", handleMouseMove);
        imageContainer.removeEventListener("mouseenter", handleMouseEnter);
        imageContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    })
    } else {
      imageElement.addEventListener("load", () => {
      textureLoader.load(imageElement.src, (texture) => {
        initializeScene(texture);
        animateScene();
        imageContainer.addEventListener("mousemove", handleMouseMove);
        imageContainer.addEventListener("mouseenter", handleMouseEnter);
        imageContainer.addEventListener("mouseleave", handleMouseLeave);
        cleanup = () => {
          imageContainer.removeEventListener("mousemove", handleMouseMove);
          imageContainer.removeEventListener("mouseenter", handleMouseEnter);
          imageContainer.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    })
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div ref={imageContainerRef} className="image-container">
      <img
        ref={imageRef}
        src={imgUrl}
        alt="colab"
        className="w-full h-full opacity-0 object-cover"
      />
      {/* three.js 畫布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full  object-cover"
      ></canvas>
    </div>
  );
};

export default ShaderImg;
