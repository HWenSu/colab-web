import { useEffect, useState, useRef } from "react";

const AnimatedBlurText = ({
  text,
  className = "",
  minBlur = 0,
  maxBlur = 18,
  threshold = 0.1,
  animationDuration = "2s",
  animationDelay = "0s",
}) => {
  const [blurs, setBlurs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const newBlurs = text
      .split("")
      .map(() => Math.random() * (maxBlur - minBlur) + minBlur);
    setBlurs(newBlurs);
  }, [text, minBlur, maxBlur]);

  useEffect(() => {
    const container = containerRef.current; // 存儲到局部變數
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px",
      }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [threshold]);

  if (blurs.length === 0) {
    return <div className={className}>{text}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`blur-text-container ${className}`}
      style={{
        "--animation-duration": animationDuration,
        "--animation-delay": animationDelay,
      }}
    >
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={isVisible ? "animate-blur-text" : ""}
          style={{
            "--initial-blur": `${blurs[index]}px`,
            filter: isVisible ? "none" : `blur(${blurs[index]}px)`,
            animationDelay: `${index * 0.1}s`,
          }}
          role="text"
          aria-label={text}
        >
          {character}
        </span>
      ))}
    </div>
  );
};

export default AnimatedBlurText;
