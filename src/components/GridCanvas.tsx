import { useEffect, useRef } from "react";

const CELL = 56;

interface Pulse {
  horizontal: boolean;
  line: number;
  pos: number;
  dir: 1 | -1;
  speed: number;
  len: number;
}

/**
 * Fixed full-screen purple grid.
 * - faint lines everywhere
 * - lines glow around the cursor
 * - light pulses travel along random grid lines
 */
export default function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let sinceSpawn = 0;
    const mouse = { x: -9999, y: -9999 };
    const pulses: Pulse[] = [];

    const gridPath = () => {
      ctx.beginPath();
      for (let x = 0; x <= w; x += CELL) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = 0; y <= h; y += CELL) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(139, 61, 255, 0.12)";
      gridPath();
      ctx.stroke();

      if (!reduce && mouse.x > -999) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
        g.addColorStop(0, "rgba(196, 161, 255, 0.65)");
        g.addColorStop(1, "rgba(139, 61, 255, 0)");
        ctx.strokeStyle = g;
        gridPath();
        ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.pos += p.dir * p.speed * dt;
        const max = p.horizontal ? w : h;
        if ((p.dir === 1 && p.pos - p.len > max) || (p.dir === -1 && p.pos + p.len < 0)) {
          pulses.splice(i, 1);
          continue;
        }
        const tail = p.pos - p.dir * p.len;
        const at = p.line * CELL + 0.5;
        const g = p.horizontal
          ? ctx.createLinearGradient(tail, at, p.pos, at)
          : ctx.createLinearGradient(at, tail, at, p.pos);
        g.addColorStop(0, "rgba(166, 107, 255, 0)");
        g.addColorStop(1, "rgba(228, 210, 255, 0.95)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(139, 61, 255, 0.95)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        if (p.horizontal) {
          ctx.moveTo(tail, at);
          ctx.lineTo(p.pos, at);
        } else {
          ctx.moveTo(at, tail);
          ctx.lineTo(at, p.pos);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const spawn = () => {
      const horizontal = Math.random() < 0.5;
      const lines = Math.floor((horizontal ? h : w) / CELL);
      const max = horizontal ? w : h;
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      pulses.push({
        horizontal,
        line: 1 + Math.floor(Math.random() * Math.max(lines, 1)),
        pos: dir === 1 ? -40 : max + 40,
        dir,
        speed: 150 + Math.random() * 190,
        len: 90 + Math.random() * 150,
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      sinceSpawn += dt;
      if (sinceSpawn > 0.65 && pulses.length < 9) {
        sinceSpawn = 0;
        spawn();
      }
      draw(dt);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="grid-canvas" aria-hidden="true" />;
}
