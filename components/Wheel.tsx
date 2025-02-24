import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useaxios from "../axios";
import { WheelContext } from "../context/WheelContext";
interface ChildComponentProps {
  resData: (prop?: number) => void;
}

const SpinTheWheel: React.FC<ChildComponentProps> = ({ resData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [selectedSegment, setSelectedSegment] = useState<number | string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [name, setName] = useState<string>("");

  const [segments, setSegements] = useState<Array<string>>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);

  const router = useRouter();

  const colors = useMemo(
    () => [
      "#D45A5A",
      "#EFCB3B",
      "#474747",
      "#B4DAC7",
      "#9FB5AA",
      "#D45A5A",
      "#EFCB3B",
      "#474747",
    ],
    []
  );
  const remSize = 12;
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
      ctx.font = "10px Arial";
      ctx.fillText(segment.toString(), radius - 10, 10);
      ctx.restore();
    });
  }, [currentAngle, segments, colors, radius]);

  useEffect(() => {
    drawWheel();
  }, [currentAngle, drawWheel]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  useEffect(() => {
    if (id) {
      const formSubmitted = localStorage.getItem(`formSubmitted_${id}`);
      setHasSubmitted(!!formSubmitted);
      if (formSubmitted) {
        alert("You have already submitted this form.");
        router.push("/");
      }
    }
  }, [id, router]);

  useEffect(() => {
    let isMounted = true;
    if (id && !hasSubmitted) {
      setShowModal(true);

      const fetchdata = async () => {
        try {
          const response = await useaxios.get(`/giveaways/${id}`);
          if (isMounted) {
            setSegements(response.data.items);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchdata();
    } else {
      setShowModal(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id, hasSubmitted]);

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
    if (spinning) return;
    setSpinning(true);

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
        let segmentIndex = Math.floor(finalAngle / anglePerSegment);

        segmentIndex = segments.length - segmentIndex - 1;
        if (segmentIndex < 0) {
          segmentIndex += segments.length;
        }

        const res = segments[segmentIndex];

        setSelectedSegment(res);
        id && winner(name, segments[segmentIndex], id);
        resData(parseInt(res));
      }
    };

    requestAnimationFrame(animateSpin);
  };

  useEffect(() => {
    if (id && !spinning && selectedSegment) {
      localStorage.setItem(`formSubmitted_${id}`, "true");
      alert(`Congratulations you won ${selectedSegment}`);

      router.push("/");
      window.location.reload()
    }
  }, [id, spinning, selectedSegment, router]);

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
          width: "100%",
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
        <Image
          src={"/arrow.png"}
          alt="arrow"
          width={30}
          height={20}
          className="ml-[6%] absolute -rotate-90 drop-shadow-xl"
          property={"true"}
        />
        <button
          className="bg-[#F6F4E8] rounded-full font-century text-center font-thin cursor-pointer absolute drop-shadow-xl"
          style={{
            lineHeight: "4rem",
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
