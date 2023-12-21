import { LucideProps } from "lucide-react";
import React from "react";
const ToolsContainer = ({
  icon,
  label,
  onClick,
}: {
  icon: LucideProps | any;
  label: string;
  onClick: () => void;
}) => {
  return (
    <>
      <div
        className="pencontainer hover:bg-[#DBEA8D] hover:text-primary flex flex-col justify-center items-center w-full h-20"
        onClick={onClick}
        typeof="button"
      >
        {React.createElement(icon)}
        <label>{label}</label>
      </div>
    </>
  );
};

export default ToolsContainer;
