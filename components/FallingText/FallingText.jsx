import { useRef, useEffect } from "react";

const FallingText = ({
  text = "",
  highlightWords = [],
  fontSize = "1rem",
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");

    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span
          class="inline-block mx-[2px] select-none border rounded-2xl border-brand px-4 min-w-fit ${
            isHighlighted ? "text-cyan-500 font-bold" : ""
          }"
        >
          ${word}
        </span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords]);

  return (
    <div
      className="relative z-[1] w-full h-full text-center pt-8 overflow-hidden"
    >
      <div
        ref={textRef}
        className="inline-block"
        style={{
          fontSize,
          lineHeight: 1.4,
        }}
      />
    </div>
  );
};

export default FallingText;
