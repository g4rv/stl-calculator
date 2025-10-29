"use client";

import DragDropOnly from "@/components/DragAndDrop";
import FilesList from "@/components/FilesList";
import GetTableButton from "@/components/GetTableButton";

export default function Home() {

  return (
    <div className="p-4">
      <div className="flex justify-between flex-col gap-8 sm:flex-row items-center mb-10">
        <DragDropOnly />
        <GetTableButton />
      </div>
      <FilesList />
    </div>
  );
}
