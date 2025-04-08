import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
  blurIntensity?: number;
}

const randomTexts = [
  "Loading...",
  "Please wait...",
  "Almost there...",
  "Just a moment...",
  "Preparing...",
  "Getting ready...",
];

export const Loading = ({
  className,
  text = "Loading...",
  blurIntensity = 2,
}: LoadingProps) => {
  const [randomText, setRandomText] = useState(text);
  const [isBlurred, setIsBlurred] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
      setIsBlurred(true);
      
      setTimeout(() => {
        setIsBlurred(false);
      }, 100);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      const textLength = randomText.length;
      const newBlurredChars = Array.from({ length: textLength }, (_, i) => i)
        .filter(() => Math.random() > 0.5);
      setBlurredChars(newBlurredChars);
    }, 500);

    return () => clearInterval(blurInterval);
  }, [randomText, isClient]);

          className={cn(
            "text-2xl font-semibold transition-all duration-300",
            isBlurred ? `blur-[${blurIntensity}px]` : "blur-0"
          )}
          role="status"
          aria-live="polite"
        >
          {randomText}
              key={index}
              className={cn(
                "transition-all duration-300",
                isClient && blurredChars.includes(index) ? `blur-[${blurIntensity}px]` : "blur-0"
              )}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </div>
  );
}; 