import { LucideProps } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
const ToolsContainer = ({
  icon,
  label,
  onClick,
  value,
  className,
}: {
  icon: LucideProps | any;
  label: string;
  onClick: (e: any) => void;
  value: string;
  className?: string;
}) => {
  return (
    <>
      <button
        className={cn(
          `pencontainer flex flex-col justify-center items-center w-full h-20 ${className} `
        )}
        onClick={onClick}
        value={value}
      >
        {React.createElement(icon)}
        <label>{label}</label>
      </button>
    </>
  );
};

export default ToolsContainer;
