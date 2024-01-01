"use client";
import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useState, useRef } from "react";
import ToolsContainer from "./Tools/ToolsContainer";
import {
  ChevronDownSquare,
  ChevronLeft,
  ChevronRight,
  ChevronUpSquare,
  Download,
  EraserIcon,
  LucideRemoveFormatting,
  PenBoxIcon,
} from "lucide-react";
import { Colors } from "@/constant/Colors";

const DrawingArea = () => {
  const [activeColor, setActiveColor] = useState("white");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [earserWidth, setEraserWidth] = useState(10);
  const [activeTool, setActiveTool] = useState("pen");
  const [draweropen, setDrawerOpen] = useState(true);
  const [image, setImage] = useState("");

  const canvasRef = useRef<any>(null);
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: `0.5rem`,
  };

  const handleColorClick = (color: string) => {
    setActiveColor(color);
  };

  const EraseCanvasFunction = () => {
    canvasRef.current?.eraseMode(earserWidth);
    setActiveTool("eraser");
  };

  const StrokeFunction = () => {
    canvasRef.current?.eraseMode(false);
    setActiveTool("pen");
  };
  const ResetCanvas = () => {
    canvasRef.current?.clearCanvas();
    setActiveTool("reset");
  };

  const undoFunction = () => {
    canvasRef.current?.undo();
  };
  const redoFunction = () => {
    canvasRef.current?.redo();
  };

  const GetImageFunction = () => {
    canvasRef.current
      ?.exportImage("png")
      .then((dataUrl: any) => {
        setImage(dataUrl);
        console.log(dataUrl);
        // Use the data URL as needed
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  // New state variables for canvas dimensions
  const [canvasWidth, setCanvasWidth] = useState(800);//default
  const [canvasHeight, setCanvasHeight] = useState(600);//default

  // Create a new key whenever canvas dimensions change
  const canvasKey = `${canvasWidth}-${canvasHeight}`;


  return (
    <section className="custom-coursor">
      <section className="absolute top-10 left-10 w-20 z-10 rounded-md border border-[#BCB59F] flex flex-1 flex-col justify-center items-center bg-toolscolor text-[#BCB59F] overflow-hidden select-none">
        <ToolsContainer
          icon={PenBoxIcon}
          label="Pen"
          onClick={StrokeFunction}
          value="pen"
          className={activeTool === "pen" ? "bg-[#DBEA8D] text-black" : ""}
        />
        <hr className="w-full opacity-25 bg-[#BCB59F]" />
        <ToolsContainer
          icon={EraserIcon}
          label="Erase"
          onClick={EraseCanvasFunction}
          value="eraser"
          className={activeTool === "eraser" ? "bg-[#DBEA8D] text-black" : ""}
        />
        <hr className="w-full opacity-25 bg-[#BCB59F]" />

        <ToolsContainer
          icon={LucideRemoveFormatting}
          label="Reset"
          onClick={ResetCanvas}
          value="reset"
          className={activeTool === "reset" ? "bg-[#DBEA8D] text-black" : ""}
        />
        <hr className="w-full opacity-25 bg-[#BCB59F]" />
        <div className="actioncontainer flex my-2 ">
          <div
            className="left cursor-pointer hover:bg-[#DBEA8D] hover:text-primary rounded-md"
            onClick={undoFunction}
          >
            <ChevronLeft size={30} />
          </div>
          <div
            className="right cursor-pointer hover:bg-[#DBEA8D] hover:text-primary rounded-md"
            onClick={redoFunction}
          >
            <ChevronRight size={30} />
          </div>
        </div>
        <hr className="w-full opacity-25 bg-[#BCB59F]" />
        <div
          className="downloadcontainer flex flex-col justify-center items-center p-3"
          typeof="button"
        >
          <Download />
          {image === "" ? (
            <>
              <label
                className="text-sm text-center cursor-pointer"
                onClick={GetImageFunction}
              >
                Save Image
              </label>
            </>
          ) : (
            <a
              className="cursor-pointer text-sm"
              download="save.png"
              href={image}
              onClick={() => setImage("")}
            >
              Download
            </a>
          )}
        </div>
      </section>

      <section
        className={`absolute ${
          draweropen ? "h-fit" : "h-10"
        } flex flex-col flex-1 items-center gap-2 top-2 left-0 right-0 z-40 w-max space-y-2 m-auto px-5 py-2 rounded-md border border-[#BCB59F] bg-toolscolor text-[#BCB59F] overflow-hidden select-none`}
      >
        <div className="colorpickercontainer flex justify-center items-center gap-5">
          {Colors.map((color: any) => {
            return (
              <button
                key={color.value}
                className={`w-6 h-6 rounded-full ${
                  activeColor === color.name ? "border-2 border-[#BCB59F]" : ""
                }`}
                style={{ backgroundColor: color.name }}
                onClick={() => handleColorClick(color.name)}
              />
            );
          })}
          {!draweropen ? (
            <ChevronDownSquare
              onClick={() => {
                setDrawerOpen(true);
              }}
              className="cursor-pointer"
            />
          ) : null}
        </div>

        <hr className="w-full opacity-25 bg-[#BCB59F]" />
        <div className="ChangerWidthContainer flex justify-center items-center gap-2 flex-col">
          <div className="penstrokecontainer space-x-5">
            <input
              type="range"
              min="1"
              max="100"
              value={strokeWidth}
              onChange={(e: any) => setStrokeWidth(e.target.value)}
            />
            <label>stroke width</label>
          </div>
          <div className="strokecontainer space-x-5">
            <input
              type="range"
              min="1"
              max="100"
              value={earserWidth}
              onChange={(e: any) => setEraserWidth(e.target.value)}
            />
            <label>erase width</label>
          </div>
        </div>
        <ChevronUpSquare
          onClick={() => {
            setDrawerOpen(false);
          }}
          className="cursor-pointer"
        />
      </section>
{/* Section for canvas dimensions */}
<section
className={`absolute ${
          draweropen ? "h-fit" : "h-10"
        } flex flex-col flex-1 items-center gap-2 top-2 left0 right-0 z-20 w-max space-y-2 m-auto px-5 py-2 rounded-md border border-[#BCB59F] bg-toolscolor text-[#BCB59F] overflow-hidden select-none`}>
           <label>
          Canvas Width (px):
          <input
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(parseInt(e.target.value))}
          />
        </label>
        <label>
          Canvas Height (px):
          <input
            type="number"
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(parseInt(e.target.value))}
          />
        </label>

      </section>

<section
        className={`absolute h-screen w-screen flex items-center justify-center`}// styles for canvas to be always be on center
      >
      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        width={`${canvasWidth}px`}
        height={`${canvasHeight}px`}//key for react size
        strokeWidth={strokeWidth}
        eraserWidth={earserWidth}
        strokeColor={activeColor}
        canvasColor="bg-background"

      />
      </section>

    </section>
  );
};

export default DrawingArea;
