import { useEffect, useState } from "react";

const BlurText = ({ words, minBlur = 0, maxBlur = 10 }) => {
  const characters = words.split("");
  const [blurs, setBlurs] = useState([]); // 初始為空

  useEffect(() => {
    // 只在客戶端生成模糊值
    const newBlurs = characters.map(
      () => Math.random() * (maxBlur - minBlur) + minBlur
    );
    setBlurs(newBlurs);
  }, [words, minBlur, maxBlur]); // 當 props 改變時重新執行

  // 如果 blurs 為空（例如在 SSR 期間），渲染不帶模糊的內容
  if (blurs.length === 0) {
    return <div>{words}</div>; // 伺服器渲染的備用內容
  }

  return (
    <div className="blur-text-container">
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="animate-blur-text"
          style={{
            "--initial-blur": `${blurs[index]}px`,
          }}
          role="text"
          aria-label={words}
        >
          {character}
        </span>
      ))}
    </div>
  );
};

export default BlurText;
