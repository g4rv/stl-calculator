"use client";

import { removeStlFile } from "@/features/stlFiles/stlFilesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import dynamic from "next/dynamic";

const StlViewer = dynamic(
  () => import("react-stl-viewer").then((mod) => mod.StlViewer),
  { ssr: false } // 🚀 disable server-side rendering
);

const FilesList = () => {
  const files = useAppSelector((state) => state.stlFiles);
  const dispatch = useAppDispatch();

  const handleRemoveFile = (fileName: string) => {
    dispatch(removeStlFile(fileName));
  };

  return (
    <table className="w-full text-center">
      <thead>
        <tr>
          <td></td>
          <td>#</td>
          <td>Найменування продукції / Розмір, мм</td>
          <td>Од. вим.</td>
          <td>К-сть, шт</td>
          <td>Вага, грам/од</td>
          <td>Вага, грам</td>
          <td>Ціна за одиницю у грн (без ПДВ)</td>
          <td>Сума у грн (без ПДВ)</td>
          <td>Рендер</td>
        </tr>
      </thead>
      <tbody>
        {files.map((file, idx) => (
          <tr key={file.name} className="mb-6 border p-2 rounded shadow">
            <td>
              <button onClick={() => handleRemoveFile(file.name)}>X</button>
            </td>
            <td>{idx + 1}</td>
            <td>{file.name}</td>
            <td>шт</td>
            <td>{file.quantity}</td>
            <td>{file.modelWeight}</td>
            <td>{file.quantity * file.modelWeight}</td>
            <td>{(39.7 * file.modelWeight) / 1.2}</td>
            <td>{((39.7 * file.modelWeight) / 1.2) * 2}</td>
            <td>
              <StlViewer
                style={{
                  width: "200px",
                  height: "200px",
                }}
                shadows
                url={file.URL}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FilesList;
