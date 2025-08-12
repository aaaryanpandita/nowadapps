import React from "react";

const AboutCard = ({ children }) => {
  return (
    <div className="bg-[linear-gradient(90deg,rgb(58,58,58)_0%,rgb(13,13,13)_10%,rgb(166,165,165)_50.16188063063063%,rgb(13,13,13)_90%,rgb(58,58,58)_100%)] h-full w-full p-[1px] rounded-2xl overflow-clip">
      <div className="h-full w-full bg-brand-background rounded-2xl overflow-clip">
        {children}
      </div>
    </div>
  );
};

export default AboutCard;
