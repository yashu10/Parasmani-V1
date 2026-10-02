// Ambient WebGL background for the PEPL motion site.
// Four wireframe variants, one visible at a time, crossfaded on route change.
// Registers window.PEPLBackground. three comes from a full URL — no import map needed.
(function(){
const THREE = window.THREE;

const ACCENT = 0x3d8fd6;
const INK = 0xf3f2f2;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

const inkMats = [];
function track(m, color) { if (color === INK) inkMats.push(m); return m; }
function wire(geo, color, opacity) {
  return new THREE.LineSegments(
    new THREE.WireframeGeometry(geo),
    track(new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }), color)
  );
}

function variantKnot() {
  const g = new THREE.Group();
  g.add(wire(new THREE.TorusKnotGeometry(1.5, 0.42, 128, 12, 2, 3), ACCENT, 0.5));
  g.add(wire(new THREE.TorusKnotGeometry(1.62, 0.5, 64, 8, 2, 3), INK, 0.16));
  g.userData.spin = [0.0016, 0.0009, 0];
  return g;
}

function variantLattice() {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const r = wire(new THREE.TorusGeometry(1.1 + i * 0.34, 0.012, 3, 64), i % 2 ? ACCENT : INK, i % 2 ? 0.42 : 0.2);
    r.rotation.x = Math.PI / 2 + i * 0.22;
    r.rotation.z = i * 0.4;
    g.add(r);
  }
  g.userData.spin = [0.0011, 0.0018, 0.0004];
  return g;
}

function variantSolid() {
  const g = new THREE.Group();
  g.add(wire(new THREE.IcosahedronGeometry(1.85, 1), INK, 0.22));
  g.add(wire(new THREE.IcosahedronGeometry(1.35, 0), ACCENT, 0.5));
  g.userData.spin = [0.0013, 0.0007, 0.0006];
  return g;
}

function variantPlate() {
  const g = new THREE.Group();
  const grid = new THREE.GridHelper(9, 18, ACCENT, INK);
  grid.material.transparent = true;
  inkMats.push(grid.material);
  grid.material.opacity = 0.2;
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
}

function field(count, color, size, opacity, spread) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.75;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6 - 3;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, track(new THREE.PointsMaterial({
    color, size, transparent: true, opacity, sizeAttenuation: true, depthWrite: false
  }), color));
}

function mount(canvas, opts = {}) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const dust = field(900, INK, 0.028, 0.4, 26);
  const sparks = field(70, ACCENT, 0.06, 0.55, 16);
  scene.add(dust, sparks);

  const variants = [variantKnot(), variantLattice(), variantSolid(), variantPlate()];
  const holder = new THREE.Group();
  for (const v of variants) { v.userData.k = 0; holder.add(v); }
  scene.add(holder);

  let current = 0;
  let scrollN = 0, scrollTarget = 0;
  let mx = 0, my = 0, px = 0, py = 0;
  let dragYaw = 0, dragPitch = 0, yaw = 0, pitch = 0, velocity = 0, dragging = false, lastX = 0, lastY = 0;

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }

  function readScroll() {
    const doc = document.scrollingElement || document.documentElement;
    const span = doc.scrollHeight - window.innerHeight;
    return span > 0 ? clamp(window.scrollY / span, 0, 1) : 0;
  }

  const onDown = (e) => {
    if (e.target !== canvas) return;
    dragging = true; lastX = e.clientX; lastY = e.clientY; velocity = 0;
  };
  const onUp = () => { dragging = false; };
  const onMove = (e) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
    if (!dragging) return;
    const dx = e.clientX - lastX;
    dragYaw += dx * 0.006; velocity = dx * 0.006;
    dragPitch = clamp(dragPitch + (e.clientY - lastY) * 0.004, -0.5, 0.5);
    lastX = e.clientX; lastY = e.clientY;
  };
  window.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();
  let raf = 0;

  function frame() {
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();
    scrollTarget = readScroll();
    scrollN = lerp(scrollN, scrollTarget, 0.06);
    if (!dragging) { dragYaw += velocity; velocity *= 0.93; }
    yaw = lerp(yaw, dragYaw, 0.08);
    pitch = lerp(pitch, dragPitch, 0.08);
    px = lerp(px, mx, 0.04);
    py = lerp(py, my, 0.04);

    variants.forEach((v, i) => {
      const want = i === current ? 1 : 0;
      v.userData.k = lerp(v.userData.k, want, 0.045);
      const k = v.userData.k;
      v.visible = k > 0.004;
      if (!v.visible) return;
      const [sx, sy, sz] = v.userData.spin;
      v.rotation.x += reduced ? 0 : sy;
      v.rotation.y += reduced ? 0 : sx;
      v.rotation.z += reduced ? 0 : sz;
      v.scale.setScalar(0.72 + k * 0.42 + scrollN * 0.14);
      v.traverse((o) => {
        if (o.material && o.material.transparent && o.userData.baseOpacity === undefined && o.material.opacity !== undefined) {
          o.userData.baseOpacity = o.material.opacity;
        }
        if (o.material && o.userData.baseOpacity !== undefined) {
          o.material.opacity = o.userData.baseOpacity * k;
        }
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
  frame();

  return {
    setTheme(t) {
      const c = new THREE.Color(t === 'light' ? 0x0a1622 : INK);
      for (const m of inkMats) m.color.copy(c);
    },
    setVariant(i) { current = clamp(i | 0, 0, variants.length - 1); },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }
  };
}

window.PEPLBackground = { mount };
})();
