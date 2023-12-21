"use client";
import * as React from "react";
import { Canvas, ReactSketchCanvas } from "react-sketch-canvas";
import { useState, useRef } from "react";
import { EventValueType } from "@/types/Types";
import ToolsContainer from "./Tools/toolscontainer";
import {
  EraserIcon,
  LucideRemoveFormatting,
  PenBoxIcon,
  RemoveFormattingIcon,
} from "lucide-react";

const DrawingArea = () => {
  const [color, setColor] = useState("red");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [earserWidth, setEraserWidth] = useState(10);
  const canvasRef = useRef(null);
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: `${strokeWidth}px`,
  };

  const ColorFunction = (e: EventValueType) => {
    setColor(e.target.value);
  };

  const EraseCanvasFunction = () => {
    canvasRef.current?.eraseMode(earserWidth);
  };
  const StrokeFunction = () => {
    canvasRef.current?.eraseMode(false);
  };
  const ResetCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <section>
      <section className="absolute top-10 left-10 w-24 z-10 group rounded-md border border-[#BCB59F] flex flex-1 flex-col justify-center items-center bg-toolscolor text-[#BCB59F] overflow-hidden">
        <ToolsContainer
          icon={PenBoxIcon}
          label="Pen"
          onClick={StrokeFunction}
        />
        <hr className="w-full opacity-25 bg-[#BCB59F]" />
        <ToolsContainer
          icon={EraserIcon}
          label="Erase"
          onClick={EraseCanvasFunction}
        />
        <hr className="w-full opacity-25 bg-[#BCB59F]" />

        <ToolsContainer
          icon={LucideRemoveFormatting}
          label="Reset"
          onClick={ResetCanvas}
        />
      </section>
      <section className="absolute top-10 w-full flex justify-center"></section>
      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        width="100vw"
        height="100vh"
        strokeWidth={4}
        strokeColor={color}
        canvasColor="bg-background"
      />
    </section>
  );
};

export default DrawingArea;
