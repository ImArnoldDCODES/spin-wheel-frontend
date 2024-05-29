import { useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
} from "react";
import { WheelContext } from "../context/WheelContext";

interface ChildComponentProps {
  resData: (prop?: number) => void;
}

const SpinTheWheel: React.FC<ChildComponentProps> = ({ resData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [selectedSegment, setSelectedSegment] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const segments = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8], []);
  const colors = useMemo(
    () => [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F3FF33",
      "#FF33A6",
      "#33FFF5",
      "#8D33FF",
      "#FF8D33",
    ],
    []
  );
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

  const searchParams = useSearchParams();
  const id = searchParams.get("id") || '';

  useEffect(() => {
    if (id) {
      setShowModal(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
  };

  const wheelContext = useContext(WheelContext);

  if (!wheelContext) {
    throw new Error("AuthContext must be within an AuthProvider");
  }

  const { winner } = wheelContext;

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
        winner(name, segmentIndex.toString(), id);
      }
    };

    requestAnimationFrame(animateSpin);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[2] flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Enter Your Name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 mr-2"
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div
        className="relative"
        style={{
          width: `${remSize * 3}rem`,
          height: `${remSize * 2}rem`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
        ></canvas>
        <button
          className="bg-[#FFD700] text-center uppercase bold cursor-pointer absolute"
          style={{
            lineHeight: "4rem",
            fontFamily: "samurai",
            borderRadius: "50%",
            width: "4rem",
            height: "4rem",
          }}
          onClick={spinWheel}
          disabled={spinning}
        >
          Spin
        </button>
      </div>
    </>
  );
};

export default SpinTheWheel;
