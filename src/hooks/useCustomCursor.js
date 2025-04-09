import { useState } from "react";

export const useCustomCursor = () => {
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorText, setCursorText] = useState("Click");

  const handleCursor = (text) => {
    setCursorActive(true);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorActive(false);
    setCursorText("Click");
  };

  return {
    cursorActive,
    cursorText,
    handleCursor,
    resetCursor,
  };
};
