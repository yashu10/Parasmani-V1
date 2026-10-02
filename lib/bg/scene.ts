import * as THREE from "three";

// Port of design/pepl-bg.js. Only imported when NEXT_PUBLIC_BG_MODE=3d.
const ACCENT = 0x3d8fd6;
const INK = 0xf3f2f2;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type BgHandle = {
  setTheme: (t: "dark" | "light") => void;
  setVariant: (i: number) => void;
  dispose: () => void;
};

export function mountBackground(canvas: HTMLCanvasElement): BgHandle {
  const inkMats: THREE.Material[] = [];
  const wire = (geo: THREE.BufferGeometry, color: number, opacity: number) => {
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    if (color === INK) inkMats.push(m);
    return new THREE.LineSegments(new THREE.WireframeGeometry(geo), m);
  };

  const variantKnot = () => {
    const g = new THREE.Group();
    g.add(wire(new THREE.TorusKnotGeometry(1.5, 0.42, 128, 12, 2, 3), ACCENT, 0.5));
    g.add(wire(new THREE.TorusKnotGeometry(1.62, 0.5, 64, 8, 2, 3), INK, 0.16));
    g.userData.spin = [0.0016, 0.0009, 0];
    return g;
  };
  const variantLattice = () => {
    const g = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const r = wire(new THREE.TorusGeometry(1.1 + i * 0.34, 0.012, 3, 64), i % 2 ? ACCENT : INK, i % 2 ? 0.42 : 0.2);
      r.rotation.x = Math.PI / 2 + i * 0.22;
      r.rotation.z = i * 0.4;
      g.add(r);
    }
    g.userData.spin = [0.0011, 0.0018, 0.0004];
    return g;
  };
  const variantSolid = () => {
    const g = new THREE.Group();
    g.add(wire(new THREE.IcosahedronGeometry(1.85, 1), INK, 0.22));
    g.add(wire(new THREE.IcosahedronGeometry(1.35, 0), ACCENT, 0.5));
    g.userData.spin = [0.0013, 0.0007, 0.0006];
    return g;
  };
  const variantPlate = () => {
    const g = new THREE.Group();
    const grid = new THREE.GridHelper(9, 18, ACCENT, INK);
    const gm = grid.material as THREE.LineBasicMaterial;
    gm.transparent = true;
    gm.opacity = 0.2;
    inkMats.push(gm);
    grid.position.y = -1.4;
    g.add(grid);
    const beams = new THREE.Group();
    for (let i = -2; i <= 2; i++) {
      const b = wire(new THREE.BoxGeometry(6, 0.24, 0.24), INK, 0.24);
      b.position.set(0, i * 0.62, i * 0.5);
      beams.add(b);
    }
    g.add(beams);
    g.userData.spin = [0.0006, 0.0003, 0];
    return g;
  };
  const field = (count: number, color: number, size: number, opacity: number, spread: number) => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.75;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6 - 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true, depthWrite: false });
    if (color === INK) inkMats.push(m);
    return new THREE.Points(geo, m);
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const dust = field(900, INK, 0.028, 0.4, 26);
  const sparks = field(70, ACCENT, 0.06, 0.55, 16);
  scene.add(dust, sparks);

  const variants = [variantKnot(), variantLattice(), variantSolid(), variantPlate()];
  const holder = new THREE.Group();
  for (const v of variants) {
    v.userData.k = 0;
    holder.add(v);
  }
  scene.add(holder);

  let current = 0;
  let scrollN = 0;
  let mx = 0,
    my = 0,
    px = 0,
    py = 0;
  let dragYaw = 0,
    dragPitch = 0,
    yaw = 0,
    pitch = 0,
    velocity = 0,
    dragging = false,
    lastX = 0,
    lastY = 0;

  const resize = () => {
    const w = window.innerWidth,
      h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    if (reduced) frame();
  };
  const readScroll = () => {
    const doc = document.scrollingElement || document.documentElement;
    const span = doc.scrollHeight - window.innerHeight;
    return span > 0 ? clamp(window.scrollY / span, 0, 1) : 0;
  };
  const onDown = (e: PointerEvent) => {
    if (e.target !== canvas) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    velocity = 0;
  };
  const onUp = () => {
    dragging = false;
  };
  const onMove = (e: PointerEvent) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
    if (!dragging) return;
    const dx = e.clientX - lastX;
    dragYaw += dx * 0.006;
    velocity = dx * 0.006;
    dragPitch = clamp(dragPitch + (e.clientY - lastY) * 0.004, -0.5, 0.5);
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const clock = new THREE.Clock();
  let raf = 0;

  function frame() {
    const t = clock.getElapsedTime();
    scrollN = lerp(scrollN, readScroll(), reduced ? 1 : 0.06);
    if (!dragging) {
      dragYaw += velocity;
      velocity *= 0.93;
    }
    yaw = lerp(yaw, dragYaw, 0.08);
    pitch = lerp(pitch, dragPitch, 0.08);
    px = lerp(px, mx, 0.04);
    py = lerp(py, my, 0.04);

    variants.forEach((v, i) => {
      v.userData.k = lerp(v.userData.k, i === current ? 1 : 0, reduced ? 1 : 0.045);
      const k = v.userData.k as number;
      v.visible = k > 0.004;
      if (!v.visible) return;
      const [sx, sy, sz] = v.userData.spin as number[];
      if (!reduced) {
        v.rotation.x += sy;
        v.rotation.y += sx;
        v.rotation.z += sz;
      }
      v.scale.setScalar(0.72 + k * 0.42 + scrollN * 0.14);
      v.traverse((o) => {
        const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (mat && mat.transparent && o.userData.baseOpacity === undefined) o.userData.baseOpacity = mat.opacity;
        if (mat && o.userData.baseOpacity !== undefined) mat.opacity = o.userData.baseOpacity * k;
      });
    });

    holder.rotation.y = yaw + px * 0.22 + scrollN * 0.9;
    holder.rotation.x = pitch + py * 0.1 - scrollN * 0.25;
    holder.position.y = -scrollN * 0.9 + Math.sin(t * 0.3) * 0.06;
    dust.rotation.y = t * 0.01 + scrollN * 0.5;
    dust.position.y = scrollN * 2.2;
    sparks.rotation.y = -t * 0.024 - scrollN * 0.7;
    sparks.rotation.x = scrollN * 0.5;
    camera.position.x = px * 0.32;
    camera.position.y = -py * 0.22;
    camera.position.z = lerp(7.2, 6.1, scrollN);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  const loop = () => {
    raf = requestAnimationFrame(loop);
    frame();
  };
  // pause when the tab is hidden
  const onVis = () => {
    cancelAnimationFrame(raf);
    if (!document.hidden && !reduced) loop();
  };

  window.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVis);
  resize();
  if (reduced) frame();
  else loop();

  return {
    setTheme(t) {
      const c = new THREE.Color(t === "light" ? 0x0a1622 : INK);
      for (const m of inkMats) (m as THREE.LineBasicMaterial).color.copy(c);
      if (reduced) frame();
    },
    setVariant(i) {
      current = clamp(i | 0, 0, variants.length - 1);
      if (reduced) frame();
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      renderer.dispose();
    },
  };
}
