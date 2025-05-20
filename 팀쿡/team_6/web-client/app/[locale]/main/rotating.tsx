import { useRef, useState } from "react";

export default function RotatingKnob({ src, className, onDeltaRotate }: { src: string; className?: string, onDeltaRotate?: (delta:number) => void }) {
  const knobRef = useRef<HTMLImageElement>(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startAngle = useRef(0);

  const getAngle = (e: MouseEvent | TouchEvent) => {
    const rect = knobRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const centerX = (rect.left + rect.right) / 2;
    const centerY = (rect.top + rect.bottom) / 2;
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startAngle.current = getAngle(e.nativeEvent);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const angle = getAngle(e);
    let delta = angle - startAngle.current;

    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    setRotation((prev) => prev + delta);
    if (onDeltaRotate) onDeltaRotate(delta);

    startAngle.current = angle;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleMouseMove);
    window.removeEventListener("touchend", handleMouseUp);
  };

  return (
    <img
      src={src}
      alt="knob"
      ref={knobRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      draggable={false} 
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`${className} transition-transform`}
    />
  );
}
