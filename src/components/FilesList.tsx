"use client";

import { useAppSelector } from "@/lib/hooks";
import FileCard from "./FileCard";

const FilesList = () => {
  const files = useAppSelector((state) => state.stlFiles);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center  auto-rows-fr">
      {files.map((file) => (
        <li key={file.URL} className="h-full max-w-[330px] w-full">
          <FileCard file={file} />
        </li>
      ))}
    </ul>
  );
};

export default FilesList;
