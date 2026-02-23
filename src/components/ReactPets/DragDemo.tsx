import { useState, useEffect, useRef, RefObject, ReactElement } from 'react';
import '../../assets/styles/DragDemo.css';

interface DragDemoProps {
  containerRef: RefObject<HTMLDivElement>;
  onComplete: () => void;
}

interface AnimKeyframe {
  time: number;
  x: number;
  y: number;
  opacity: number;
}

const TOTAL_DURATION = 3500;
const DRAG_RATIO = 0.6;
const LIFT_HEIGHT = 80;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolate(keyframes: AnimKeyframe[], progress: number) {
  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].time <= progress) i++;

  if (i >= keyframes.length - 1) {
    const last = keyframes[keyframes.length - 1];
    return { x: last.x, y: last.y, opacity: last.opacity };
  }

  const from = keyframes[i];
  const to = keyframes[i + 1];
  const t = easeInOut((progress - from.time) / (to.time - from.time));

  return {
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    opacity: lerp(from.opacity, to.opacity, t),
  };
}

const DragDemo = ({
  containerRef,
  onComplete,
}: DragDemoProps): ReactElement | null => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLSpanElement>(null);
  const grabRef = useRef<HTMLSpanElement>(null);
  const petElRef = useRef<HTMLElement | null>(null);
  const [catPos, setCatPos] = useState<{
    x: number;
    y: number;
    dragX: number;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const petEl = container.querySelector('.pet') as HTMLElement;
      if (!petEl) return;

      petElRef.current = petEl;

      const containerRect = container.getBoundingClientRect();
      const petRect = petEl.getBoundingClientRect();

      const x = petRect.left - containerRect.left + petRect.width / 2;
      const y = petRect.top - containerRect.top + petRect.height / 2;

      const containerWidth = containerRect.width;
      const halfPet = petRect.width / 2;
      const spaceRight = containerWidth - x - halfPet;
      const spaceLeft = x - halfPet;
      const dragDistance = containerWidth * DRAG_RATIO;
      const dragX = spaceRight >= spaceLeft ? dragDistance : -dragDistance;

      setCatPos({ x, y, dragX });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!catPos || !cursorRef.current || !petElRef.current) return;

    const el = cursorRef.current;
    const petEl = petElRef.current;

    const petRect = petEl.getBoundingClientRect();
    const startClientX = petRect.left + petRect.width / 2;
    const startClientY = petRect.top + petRect.height / 2;

    const dropX = catPos.x + catPos.dragX;

    const keyframes: AnimKeyframe[] = [
      { time: 0, x: catPos.x + 50, y: catPos.y - 60, opacity: 0 },
      { time: 0.15, x: catPos.x + 50, y: catPos.y - 60, opacity: 1 },
      { time: 0.3, x: catPos.x, y: catPos.y, opacity: 1 },
      { time: 0.35, x: catPos.x, y: catPos.y + 4, opacity: 1 },
      { time: 0.4, x: catPos.x, y: catPos.y - LIFT_HEIGHT, opacity: 1 },
      { time: 0.65, x: dropX, y: catPos.y - LIFT_HEIGHT, opacity: 1 },
      { time: 0.72, x: dropX, y: catPos.y, opacity: 1 },
      { time: 0.8, x: dropX, y: catPos.y, opacity: 1 },
      { time: 1, x: dropX + 20, y: catPos.y - 30, opacity: 0 },
    ];

    let hasStartedDrag = false;
    let hasEndedDrag = false;
    let animFrame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / TOTAL_DURATION, 1);
      const { x, y, opacity } = interpolate(keyframes, progress);

      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.opacity = String(opacity);

      // Swap hand icons
      const isGrabbing = progress >= 0.32 && progress <= 0.75;
      if (openRef.current)
        openRef.current.style.opacity = isGrabbing ? '0' : '1';
      if (grabRef.current)
        grabRef.current.style.opacity = isGrabbing ? '1' : '0';

      // Dispatch mousedown once at grab start
      if (progress >= 0.32 && !hasStartedDrag) {
        hasStartedDrag = true;
        petEl.dispatchEvent(
          new MouseEvent('mousedown', {
            clientX: startClientX,
            clientY: startClientY,
            button: 0,
            bubbles: true,
          }),
        );
      }

      // Dispatch mousemove during drag, synced to cursor position
      if (hasStartedDrag && !hasEndedDrag) {
        if (progress < 0.72) {
          const deltaX = x - catPos.x;
          const deltaY = y - catPos.y;
          document.dispatchEvent(
            new MouseEvent('mousemove', {
              clientX: startClientX + deltaX,
              clientY: startClientY + deltaY,
              bubbles: true,
            }),
          );
        } else {
          hasEndedDrag = true;
          document.dispatchEvent(
            new MouseEvent('mouseup', {
              clientX: startClientX + catPos.dragX,
              clientY: startClientY,
              button: 0,
              bubbles: true,
            }),
          );
        }
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [catPos, onComplete]);

  if (!catPos) return null;

  return (
    <div ref={cursorRef} className="drag-demo-cursor" aria-hidden="true">
      <span ref={openRef} className="drag-demo-hand-open" />
      <span
        ref={grabRef}
        className="drag-demo-hand-grab"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default DragDemo;
