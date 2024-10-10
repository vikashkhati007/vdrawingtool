'use client'

import * as React from "react"
import { ReactSketchCanvas } from "react-sketch-canvas"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eraser,
  Menu,
  Paintbrush,
  Redo,
  Trash2,
  Undo,
} from "lucide-react"

const colors = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
]

export default function DrawingArea() {
  const [activeColor, setActiveColor] = React.useState("#000000")
  const [strokeWidth, setStrokeWidth] = React.useState(4)
  const [eraserWidth, setEraserWidth] = React.useState(10)
  const [activeTool, setActiveTool] = React.useState<"pen" | "eraser">("pen")
  const [image, setImage] = React.useState("")

  const canvasRef = React.useRef<any>(null)

  const handleColorClick = (color: string) => {
    setActiveColor(color)
    setActiveTool("pen")
  }

  const handleToolChange = (tool: "pen" | "eraser") => {
    setActiveTool(tool)
    if (canvasRef.current) {
      canvasRef.current.eraseMode(tool === "eraser")
    }
  }

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas()
    }
  }

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo()
    }
  }

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo()
    }
  }

  const handleSave = () => {
    if (canvasRef.current) {
      canvasRef.current
        .exportImage("png")
        .then((data: any) => {
          setImage(data)
        })
        .catch((e:any) => {
          console.error("Error exporting image:", e)
        })
    }
  }

  return (
    <div className="relative h-screen w-full bg-gray-100">
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={activeTool === "pen" ? strokeWidth : eraserWidth}
        strokeColor={activeColor}
        canvasColor="white"
        className="h-full w-full"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
        <div className="flex items-center space-x-2 rounded-full bg-white p-2 shadow-lg">
          <TooltipProvider>
            {colors.map((color) => (
              <Tooltip key={color}>
                <TooltipTrigger asChild>
                  <button
                    className={`h-8 w-8 rounded-full ${
                      activeColor === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{color}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-4"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Drawing Tools</SheetTitle>
            <SheetDescription>
              Adjust your drawing settings here.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Tool</h3>
              <div className="flex space-x-2">
                <Button
                  variant={activeTool === "pen" ? "default" : "outline"}
                  onClick={() => handleToolChange("pen")}
                >
                  <Paintbrush className="mr-2 h-4 w-4" />
                  Pen
                </Button>
                <Button
                  variant={activeTool === "eraser" ? "default" : "outline"}
                  onClick={() => handleToolChange("eraser")}
                >
                  <Eraser className="mr-2 h-4 w-4" />
                  Eraser
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">
                {activeTool === "pen" ? "Stroke Width" : "Eraser Width"}
              </h3>
              <Slider
                min={1}
                max={50}
                step={1}
                value={[activeTool === "pen" ? strokeWidth : eraserWidth]}
                onValueChange={(value) =>
                  activeTool === "pen"
                    ? setStrokeWidth(value[0])
                    : setEraserWidth(value[0])
                }
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleUndo}>
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleRedo}>
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleClear}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleSave}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {image && (
        <div className="absolute bottom-4 right-4">
          <a
            href={image}
            download="drawing.png"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  )
}