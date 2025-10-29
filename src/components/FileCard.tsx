"use client";

import {
  decrementQuantity,
  incrementQuantity,
  removeStlFile,
  setIncludePaint,
  setQuantity,
} from "@/features/stlFiles/stlFilesSlice";
import { STLFile } from "@/features/stlFiles/types";
import { useAppDispatch } from "@/lib/hooks";
import { roundTo } from "@/utils/roundTo";
import dynamic from "next/dynamic";
import { FC } from "react";

interface Props {
  file: STLFile;
}

const StlViewer = dynamic(
  () => import("react-stl-viewer").then((mod) => mod.StlViewer),
  { ssr: false } // 🚀 disable server-side rendering
);

const FileCard: FC<Props> = ({ file }) => {
  const dispatch = useAppDispatch();

  const removeFile = () => dispatch(removeStlFile(file.name));

  const incrementModelQuantity = () => dispatch(incrementQuantity(file.name));

  const decrementModelQuantity = () => dispatch(decrementQuantity(file.name));

  return (
    <div className="shadow-[0px_4px_8px_2px_#00000029] rounded-2xl overflow-clip  flex flex-col h-full relative">
      <StlViewer
        style={{
          width: "200px",
          height: "200px",
          margin: "0 auto",
        }}
        shadows
        orbitControls
        url={file.URL}
      />

      <button
        className="rounded-full size-6 absolute top-2 right-2 bg-red-500 cursor-pointer text-sm font-bold"
        onClick={removeFile}
      >
        X
      </button>

      <div className="bg-green-500 p-2 flex flex-col grow gap-6">
        <div className="flex flex-col">
          <p>Назва: {file.name}</p>
          <p>Ціна/од: {file.price} грн</p>
          <p>Вага/од: {file.modelWeight} г</p>
          <p>
            Фарбувати:
            <input
              type="checkbox"
              checked={file.includePaint}
              onChange={(e) =>
                dispatch(
                  setIncludePaint({
                    name: file.name,
                    includePaint: e.target.checked,
                  })
                )
              }
            />
          </p>
        </div>

        <div className="flex justify-center mt-auto gap-4 items-center">
          <button
            className="border-2 border-white rounded-full w-16 text-3xl cursor-pointer"
            onClick={incrementModelQuantity}
          >
            +
          </button>
          <input
            className="text-4xl w-16 text-center border-b-3"
            value={file.quantity}
            onChange={(e) => {
              if (Number.isNaN(Number(e.target.value))) return;
              dispatch(
                setQuantity({
                  name: file.name,
                  quantity: Number(e.target.value),
                })
              );
            }}
          />
          <button
            className="border-2 border-white rounded-full w-16 text-3xl cursor-pointer"
            onClick={decrementModelQuantity}
          >
            -
          </button>
        </div>

        <div className="flex justify-around">
          <p className="flex flex-col justify-center items-center text-xl">
            Вага:{" "}
            <span className="text-3xl">
              {roundTo(file.quantity * file.modelWeight)}
            </span>
          </p>
          <p className="flex flex-col justify-center items-center text-xl">
            Ціна:{" "}
            <span className="text-3xl">
              {roundTo(file.quantity * file.price)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
