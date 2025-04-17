import React, { useEffect, useState, useRef } from "react";

const PixelEditor = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [gridSize, setGridSize] = useState(32);
  const [pixels, setPixels] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); // pen, eraser, fill
  const canvasRef = useRef(null);
  const gridCanvasRef = useRef(null);

  // Initialize canvas and pixels
  useEffect(() => {
    // Create empty pixel grid
    const initialPixels = Array(gridSize * gridSize).fill("#FFFFFF");
    setPixels(initialPixels);

    // Draw the grid
    drawGrid();
  }, [gridSize]);

  // Update canvas when pixels change
  useEffect(() => {
    drawCanvas();
  }, [pixels]);

  const drawGrid = () => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const cellSize = canvas.width / gridSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 0.5;

    // Draw vertical lines
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const cellSize = canvas.width / gridSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each pixel
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const index = y * gridSize + x;
        ctx.fillStyle = pixels[index];
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  };

  const getPixelIndex = (x, y) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Calculate relative position in canvas
    const relX = x - rect.left;
    const relY = y - rect.top;

    // Calculate grid coordinates
    const cellSize = canvas.width / gridSize;
    const gridX = Math.floor(relX / cellSize);
    const gridY = Math.floor(relY / cellSize);

    // Ensure coordinates are in bounds
    if (gridX < 0 || gridX >= gridSize || gridY < 0 || gridY >= gridSize) {
      return -1;
    }

    return gridY * gridSize + gridX;
  };

  const handleCanvasMouseDown = (e) => {
    setIsDrawing(true);
    const index = getPixelIndex(e.clientX, e.clientY);
    if (index >= 0) {
      handleDraw(index);
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing) return;

    const index = getPixelIndex(e.clientX, e.clientY);
    if (index >= 0) {
      handleDraw(index);
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCanvasMouseLeave = () => {
    setIsDrawing(false);
  };

  const handleDraw = (index) => {
    const newPixels = [...pixels];
    if (tool === "pen") {
      newPixels[index] = currentColor;
    } else if (tool === "eraser") {
      newPixels[index] = "#FFFFFF";
    } else if (tool === "fill") {
      const targetColor = pixels[index];
      if (targetColor === currentColor) return;

      const fill = (idx) => {
        if (
          idx < 0 ||
          idx >= pixels.length ||
          newPixels[idx] !== targetColor ||
          newPixels[idx] === currentColor
        ) {
          return;
        }

        newPixels[idx] = currentColor;

        // Check neighboring pixels (left, right, up, down)
        const x = idx % gridSize;
        const y = Math.floor(idx / gridSize);

        if (x > 0) fill(idx - 1); // left
        if (x < gridSize - 1) fill(idx + 1); // right
        if (y > 0) fill(idx - gridSize); // up
        if (y < gridSize - 1) fill(idx + gridSize); // down
      };

      fill(index);
    }

    setPixels(newPixels);
  };

  const clearCanvas = () => {
    setPixels(Array(gridSize * gridSize).fill("#FFFFFF"));
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "pixelart.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg pixel-borders overflow-hidden">
      <div className="h-12 bg-gray-800 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
          PixaBuilder - Pixel Art Editor
        </h2>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 text-sm bg-light-primary text-white rounded hover:bg-light-primary/80 transition"
            onClick={downloadImage}
          >
            Download
          </button>
          <button
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            onClick={clearCanvas}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-800 flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 lg:w-1/4">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-3">
              Tools
            </h3>
            <div className="flex gap-2">
              <button
                className={`p-2 rounded ${
                  tool === "pen"
                    ? "bg-light-primary text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
                onClick={() => setTool("pen")}
              >
                Pen
              </button>
              <button
                className={`p-2 rounded ${
                  tool === "eraser"
                    ? "bg-light-primary text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
                onClick={() => setTool("eraser")}
              >
                Eraser
              </button>
              <button
                className={`p-2 rounded ${
                  tool === "fill"
                    ? "bg-light-primary text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
                onClick={() => setTool("fill")}
              >
                Fill
              </button>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-3">
              Colors
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                "#000000",
                "#FFFFFF",
                "#FF0000",
                "#00FF00",
                "#0000FF",
                "#FFFF00",
                "#FF00FF",
                "#00FFFF",
                "#FFA500",
                "#800080",
                "#008000",
                "#800000",
                "#FF99CC",
                "#996633",
                "#CCCCCC",
                "#333333",
              ].map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer ${
                    currentColor === color ? "ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                Custom Color
              </label>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-full h-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-3">
              Canvas Size
            </h3>
            <select
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-600 text-white rounded"
            >
              <option value="16">16 x 16</option>
              <option value="32">32 x 32</option>
              <option value="48">48 x 48</option>
              <option value="64">64 x 64</option>
            </select>
          </div>
        </div>

        <div className="lg:w-3/4 flex justify-center items-center">
          <div className="bg-white relative aspect-square w-full max-w-[600px]">
            <canvas
              ref={canvasRef}
              width={512}
              height={512}
              className="absolute top-0 left-0 w-full h-full"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseLeave}
            />
            <canvas
              ref={gridCanvasRef}
              width={512}
              height={512}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-800">
        <div className="text-sm text-light-text dark:text-dark-text">
          <p>
            Create pixel art for your NFT collections and games. Use the tools
            panel to draw, erase, and fill areas with color.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PixelEditor;
