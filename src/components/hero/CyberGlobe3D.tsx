"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const CyberGlobe3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.8, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // 3. Central Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner Core Sphere
    const sphereGeo = new THREE.SphereGeometry(1.8, 36, 36);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0a1226,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.35,
      roughness: 0.4,
      metalness: 0.8,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(coreSphere);

    // Geodesic Cyber Wireframe Lattice
    const wireGeo = new THREE.IcosahedronGeometry(2.0, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Outer Halo Data Nodes (Particles)
    const count = 220;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cCyan = new THREE.Color("#06b6d4");
    const cBlue = new THREE.Color("#3b82f6");
    const cViolet = new THREE.Color("#8b5cf6");

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const picked =
        Math.random() > 0.6 ? cCyan : Math.random() > 0.3 ? cBlue : cViolet;
      colors[i * 3] = picked.r;
      colors[i * 3 + 1] = picked.g;
      colors[i * 3 + 2] = picked.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    globeGroup.add(particles);

    // Orbital Ring 1
    const ring1Group = new THREE.Group();
    ring1Group.rotation.x = Math.PI / 4;
    const ring1Geo = new THREE.RingGeometry(2.5, 2.53, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Group.add(ring1Mesh);

    const node1Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const node1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const node1Mesh = new THREE.Mesh(node1Geo, node1Mat);
    node1Mesh.position.set(2.515, 0, 0);
    ring1Group.add(node1Mesh);
    globeGroup.add(ring1Group);

    // Orbital Ring 2
    const ring2Group = new THREE.Group();
    ring2Group.rotation.x = -Math.PI / 3;
    ring2Group.rotation.y = Math.PI / 6;
    const ring2Geo = new THREE.RingGeometry(2.7, 2.73, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Group.add(ring2Mesh);

    const node2Geo = new THREE.SphereGeometry(0.07, 16, 16);
    const node2Mat = new THREE.MeshBasicMaterial({ color: 0xa78bfa });
    const node2Mesh = new THREE.Mesh(node2Geo, node2Mat);
    node2Mesh.position.set(-2.715, 0, 0);
    ring2Group.add(node2Mesh);
    globeGroup.add(ring2Group);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.35;
      targetY = y * 0.35;
    };

    window.addEventListener("mousemove", handlePointerMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Continuous subtle rotation
      globeGroup.rotation.y += delta * 0.2;
      wireMesh.rotation.y -= delta * 0.12;
      wireMesh.rotation.z += delta * 0.05;

      ring1Group.rotation.z += delta * 0.25;
      ring2Group.rotation.y -= delta * 0.2;

      particles.rotation.y += delta * 0.06;

      // Pointer smooth lerp parallax
      globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, targetY, 0.05);
      globeGroup.rotation.y = THREE.MathUtils.lerp(
        globeGroup.rotation.y,
        globeGroup.rotation.y + targetX * 0.02,
        0.05
      );

      renderer.render(scene, camera);
    };

    animate();

    // Clean unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      node1Geo.dispose();
      node1Mat.dispose();
      node2Geo.dispose();
      node2Mat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
};
