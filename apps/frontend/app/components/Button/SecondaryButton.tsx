import React from "react";

const SecondaryButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
    return (
    <button
      onClick={() => onClick()}
      className="relative overflow-hidden 
      px-4 py-2 rounded-xl font-semibold text-white
      transition-[--gradient-glow-x,--gradient-glow-y,--bg-color-1,--bg-color-2,--bg-stop-1,--bg-stop-2]
      duration-450
      [--gradient-glow-x:100%] [--gradient-glow-y:50%]
      [--bg-color-1:hsla(0,0%,100%,0)] [--bg-color-2:#ff9b26] [--bg-color-3:#ff0c00] [--bg-color-4:#fd8925]
      [--bg-stop-1:100%] [--bg-stop-2:150%]
      [background:radial-gradient(5rem_80%_at_var(--gradient-glow-x)_var(--gradient-glow-y),_#ffd9a1,_#ff9b26_60%,_#ff0c00_100%),radial-gradient(5rem_80%_at_100%_50%,_#ffd9a1,_#ff9b26_60%,_#ff0c00_100%)]
      hover:[--gradient-glow-y:0%] hover:[--gradient-glow-x:50%]
      text-md border border-white cursor-pointer hover:text-white hover:font-semibold"
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
