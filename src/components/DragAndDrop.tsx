import { addStlFilesAsync } from "@/features/stlFiles/thunks";
import { useAppDispatch } from "@/lib/hooks";
import React, { useState } from "react";

export default function DragDropOnly() {
  const [highlight, setHighlight] = useState(false);

  const dispatch = useAppDispatch();

  const isValidSTL = (file: File) => file.name.toLowerCase().match(/\.stl$/i);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const files = Array.from(incoming).filter(isValidSTL);
    if (!files.length) return;

    dispatch(addStlFilesAsync(files));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setHighlight(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setHighlight(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setHighlight(false);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.currentTarget.value = "";
  };

  return (
    <div className="max-w-lg ">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
          highlight ? "border-sky-500 bg-sky-50" : "border-gray-300 bg-white"
        }`}
        aria-label="Drop STL files here"
        role="button"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-700">
              Перенесіть <code className="font-mono">.stl</code> файли сюди
              &nbsp;
            </span>
            <label className="mt-2 cursor-pointer text-sky-600 underline">
              <input
                accept=".stl"
                type="file"
                multiple
                className="hidden"
                onChange={onFileInputChange}
              />
              або оберіть з комп&apos;ютера
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
