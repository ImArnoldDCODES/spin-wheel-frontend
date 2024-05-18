import React, { useCallback, useEffect, useRef, useState } from "react";

interface ChildComponentProps {
  resData: (prop?: number) => void;
}

const SpinTheWheel: React.FC<ChildComponentProps> = ({ resData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [selectedSegment, setSelectedSegment] = useState<number>(0);

  const segments = [1, 2, 3, 4, 5, 6, 7, 8];
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3FF33",
    "#FF33A6",
    "#33FFF5",
    "#8D33FF",
    "#FF8D33",
  ];
  const remSize = 13;
  const radius = remSize + 50;

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const anglePerSegment = (2 * Math.PI) / segments.length;

    segments.forEach((segment, index) => {
      const startAngle = currentAngle + index * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = colors[index];
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText(segment.toString(), radius - 10, 10);
      ctx.restore();
    });
  }, [currentAngle, segments, colors, radius]);

  useEffect(() => {
    drawWheel();
  }, [currentAngle, drawWheel]);

  const spinWheel = () => {
    resData(selectedSegment);

    if (spinning) return;
    setSpinning(true);
    setSelectedSegment(0);

    let spinAngle = Math.random() * 2 * Math.PI + 10 * Math.PI;
    const spinDuration = 3000;
    const startTime = performance.now();

    const animateSpin = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < spinDuration) {
        setCurrentAngle(
          (prevAngle) =>
            prevAngle + (spinAngle / spinDuration) * (currentTime - startTime)
        );
        requestAnimationFrame(animateSpin);
      } else {
        const finalAngle = (currentAngle + spinAngle) % (2 * Math.PI);
        setCurrentAngle(finalAngle);
        setSpinning(false);

        const anglePerSegment = (2 * Math.PI) / segments.length;
        const segmentIndex = Math.floor(
          (segments.length - finalAngle / anglePerSegment) % segments.length
        );
        setSelectedSegment(segments[segmentIndex]);
      }
    };

    requestAnimationFrame(animateSpin);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ width: `${remSize * 3}rem`, height: `${remSize * 2}rem` }}
      ></canvas>
      <button onClick={spinWheel} disabled={spinning}>
        Spin
      </button>
    </div>
  );
};

export default SpinTheWheel;
