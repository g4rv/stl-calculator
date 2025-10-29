"use client";

import { useAppSelector } from "@/lib/hooks";
import FileCard from "./FileCard";

const FilesList = () => {
  const files = useAppSelector((state) => state.stlFiles);

  return (
    <ul className="flex flex-wrap gap-6 container mx-auto">
      {files.map((file) => (
        <li key={file.URL} className="h-auto max-w-[330px] w-full">
          <FileCard file={file} />
        </li>
      ))}

      {/* <li className="h-full">
        <FileCard
          file={{
            includePaint: false,
            modelWeight: 0,
            name: "test",
            price: 0,
            quantity: 1,
            URL: "/test.STL",
          }}
        />
      </li>
      <li className="h-full">
        <FileCard
          file={{
            includePaint: false,
            modelWeight: 0,
            name: "test2",
            price: 0,
            quantity: 1,
            URL: "/test2.STL",
          }}
        />
      </li> */}
    </ul>
  );
};

export default FilesList;
