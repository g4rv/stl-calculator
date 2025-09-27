import DragDropOnly from "@/components/DragAndDrop";
import FilesList from "@/components/FilesList";

export default function Home() {
  return (
    <div className="p-4">
      <DragDropOnly />
      <FilesList />
    </div>
  );
}
