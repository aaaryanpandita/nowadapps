import clsx from "clsx";
import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <div className="max-w-7xl w-full">{children}</div>
    </div>
  );
};

export default Container;
