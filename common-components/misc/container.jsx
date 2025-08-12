import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-7xl w-full">{children}</div>
    </div>
  );
};

export default Container;
