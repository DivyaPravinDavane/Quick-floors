'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FlooringMaterial } from '@/data/flooringMaterials';

interface FlooringSceneProps {
  material: FlooringMaterial;
  className?: string;
}

export function FlooringScene({ material, className = '' }: FlooringSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const floorMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setWebGLFailed(true);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F5F0');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.2);
    camera.lookAt(0, 0.3, 0);

    // Lights
    const ambientLight = new THREE.AmbientLight(
      material.roomLighting.lightColor,
      material.roomLighting.ambientIntensity
    );
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(
      material.roomLighting.lightColor,
      material.roomLighting.directionalIntensity
    );
    dirLight.position.set(4, 6, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 15;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Fill Light from left
    const fillLight = new THREE.PointLight('#e8e5dc', 0.8, 10);
    fillLight.position.set(-3, 3, 2);
    scene.add(fillLight);

    // Procedural Floor Texture Canvas (Planks / Tiles)
    const createFloorCanvasTexture = (type: 'wood' | 'stone' | 'marble', baseColorHex: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = baseColorHex;
      ctx.fillRect(0, 0, 512, 512);

      if (type === 'wood') {
        // Draw wood planks
        ctx.strokeStyle = 'rgba(0,0,0,0.14)';
        ctx.lineWidth = 2;
        const plankHeight = 64;
        for (let y = 0; y < 512; y += plankHeight) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(512, y);
          ctx.stroke();

          // Staggered vertical plank joints
          const offset = (y / plankHeight) % 2 === 0 ? 0 : 128;
          for (let x = offset; x < 512; x += 256) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + plankHeight);
            ctx.stroke();
          }
        }
      } else {
        // Tile Grid for Stone / Marble (Large 24x48 proportion)
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.lineWidth = 1.5;
        const tileW = 128;
        const tileH = 256;
        for (let x = 0; x <= 512; x += tileW) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 512);
          ctx.stroke();
        }
        for (let y = 0; y <= 512; y += tileH) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(512, y);
          ctx.stroke();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      return texture;
    };

    // Floor Plane Geometry
    const floorGeometry = new THREE.PlaneGeometry(8, 8);
    const texture = createFloorCanvasTexture(material.category, material.color);

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.color),
      map: texture,
      roughness: material.roughness,
      metalness: material.metalness,
    });
    floorMaterialRef.current = floorMaterial;

    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Architectural Room Elements:
    // Back Wall
    const backWallGeo = new THREE.PlaneGeometry(8, 4);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EEEAE2'),
      roughness: 0.9,
    });
    const backWall = new THREE.Mesh(backWallGeo, wallMaterial);
    backWall.position.set(0, 2, -4);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left Wall
    const leftWallGeo = new THREE.PlaneGeometry(8, 4);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-4, 2, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Architectural Baseboard Trim
    const baseboardGeo = new THREE.BoxGeometry(8, 0.15, 0.04);
    const baseboardMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.4 });
    const baseboard = new THREE.Mesh(baseboardGeo, baseboardMat);
    baseboard.position.set(0, 0.075, -3.98);
    scene.add(baseboard);

    // Modern architectural column / pedestal to show scale and cast soft shadow
    const columnGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 32);
    const columnMat = new THREE.MeshStandardMaterial({ color: '#E4DFD5', roughness: 0.4 });
    const column = new THREE.Mesh(columnGeo, columnMat);
    column.position.set(-1.6, 0.6, -1.8);
    column.castShadow = true;
    column.receiveShadow = true;
    scene.add(column);

    // Minimalist sculptured bowl on pedestal
    const bowlGeo = new THREE.SphereGeometry(0.24, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const bowlMat = new THREE.MeshStandardMaterial({ color: '#35372F', roughness: 0.3, metalness: 0.2 });
    const bowl = new THREE.Mesh(bowlGeo, bowlMat);
    bowl.position.set(-1.6, 1.2, -1.8);
    bowl.rotation.x = Math.PI;
    bowl.castShadow = true;
    scene.add(bowl);

    // Architectural Window Frame on Right
    const windowFrameGeo = new THREE.BoxGeometry(0.06, 2.4, 1.8);
    const frameMat = new THREE.MeshStandardMaterial({ color: '#35372F', roughness: 0.5 });
    const windowFrame = new THREE.Mesh(windowFrameGeo, frameMat);
    windowFrame.position.set(3.96, 2.2, -0.8);
    scene.add(windowFrame);

    // Window Light Glass Panel
    const glassGeo = new THREE.PlaneGeometry(1.7, 2.3);
    const glassMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.35 });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.rotation.y = -Math.PI / 2;
    glass.position.set(3.94, 2.2, -0.8);
    scene.add(glass);

    // User interaction (Orbit / Pan drag)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetCameraY = 2.2;
    let targetCameraZ = 5.2;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      targetRotationY += deltaX * 0.005;
      targetCameraY = Math.max(1.2, Math.min(3.5, targetCameraY - deltaY * 0.005));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    let prevTouchX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        prevTouchX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevTouchX;
        targetRotationY += deltaX * 0.006;
        prevTouchX = e.touches[0].clientX;
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    domElement.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle subtle auto-sway when not dragging
      const currentRotation = isDragging ? targetRotationY : targetRotationY + Math.sin(elapsedTime * 0.3) * 0.08;

      camera.position.x += (Math.sin(currentRotation) * 5.2 - camera.position.x) * 0.05;
      camera.position.z += (Math.cos(currentRotation) * targetCameraZ - camera.position.z) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []); // Run once on mount

  // React to Material Changes dynamically without resetting camera
  useEffect(() => {
    if (!floorMaterialRef.current) return;

    floorMaterialRef.current.color.set(material.color);
    floorMaterialRef.current.roughness = material.roughness;
    floorMaterialRef.current.metalness = material.metalness;

    if (ambientLightRef.current) {
      ambientLightRef.current.color.set(material.roomLighting.lightColor);
      ambientLightRef.current.intensity = material.roomLighting.ambientIntensity;
    }

    if (dirLightRef.current) {
      dirLightRef.current.color.set(material.roomLighting.lightColor);
      dirLightRef.current.intensity = material.roomLighting.directionalIntensity;
    }
  }, [material]);

  if (webGLFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#EEEAE2] p-8 text-center text-xs text-[#77766F]">
        WebGL hardware acceleration is not supported on this device. Displaying static preview.
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[440px] relative cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
      title="Click and drag to rotate the room"
    />
  );
}
