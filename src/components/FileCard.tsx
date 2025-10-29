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
import cn from "@/utils/cn";
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
          width: "100%",
          height: "200px",
          margin: "0 auto",
        }}
        className="hover:cursor-grab active:cursor-grabbing"
        shadows
        orbitControls
        url={file.URL}
      />

      <button
        className="rounded-full size-6 absolute top-2 right-2 bg-[rgb(220,20,20)] cursor-pointer text-sm font-bold"
        onClick={removeFile}
      >
        X
      </button>

      <div className="bg-[rgb(70,170,80)] p-4 pb-6 flex flex-col grow gap-4 text-xl">
        <div className="flex flex-col gap-2">
          <p>
            <span>Назва: </span>
            <span className="font-bold">{file.name}</span>
          </p>
          <p>Ціна/од: {file.price.toLocaleString("uk-UA")} грн</p>
          <p>Вага/од: {file.modelWeight.toLocaleString("uk-UA")} г</p>
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

        <div className="flex justify-center gap-4 items-center mt-auto">
          <button
            className={cn(
              "border-2 border-white rounded-full w-16 h-8 text-3xl cursor-pointer relative",
              "before:absolute before:inset-0 before:bg-white before:m-auto before:w-0.5 before:h-4",
              "after:absolute after:inset-0 after:bg-white after:m-auto after:h-0.5 after:w-4"
            )}
            onClick={incrementModelQuantity}
          ></button>
          <input
            className="text-2xl w-[6ch] text-center border-b-3"
            value={file.quantity}
            onChange={(e) => {
              if (Number.isNaN(Number(e.target.value))) return;
              dispatch(
                setQuantity({
                  name: file.name,
                  quantity: Math.min(
                    99999,
                    Math.max(Number(e.target.value), 0)
                  ),
                })
              );
            }}
          />
          <button
            className={cn(
              "border-2 border-white rounded-full w-16 h-8 text-3xl cursor-pointer relative",
              "before:absolute before:inset-0 before:bg-white before:m-auto before:w-4 before:h-0.5"
            )}
            onClick={decrementModelQuantity}
          ></button>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="flex justify-center items-center  grow gap-2">
            Вага:{" "}
            <span>
              {roundTo(file.quantity * file.modelWeight).toLocaleString(
                "uk-UA"
              )}{" "}
              г
            </span>
          </p>
          <p className="flex justify-center items-center  grow gap-2">
            Ціна:{" "}
            <span>
              {roundTo(file.quantity * file.price).toLocaleString("uk-UA")} грн
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
