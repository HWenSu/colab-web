import React from 'react'

const LightText = ({words}) => {
  const wordArray = words.split(" ");

  return (
    <div>
      {wordArray.map((word, index) => (
        <span
          key={`${word}-${index}`}
          style={{
            "--animation-index": index, //用於錯開動畫
          }}
          className="animate-fade-to-black whitespace-pre-wrap"
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
}

export default LightText