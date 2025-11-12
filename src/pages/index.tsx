"use client";

import DragDropOnly from "@/components/DragAndDrop";
import FilesList from "@/components/FilesList";
import GetTableButton from "@/components/GetTableButton";
import PriceMultiplierInput from "@/components/PriceMultiplierInput";
import {
  selectTotalPrice,
  selectTotalWeight,
} from "@/features/stlFiles/stlFilesSelector";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalWeight = useAppSelector(selectTotalWeight);

  return (
    <div className="custom-container pb-16 pt-8">
      <div className="flex justify-between flex-col gap-8 xl:flex-row items-center mb-10">
        <DragDropOnly />
        <div className="flex grow text-black gap-8 flex-col md:flex-row">
          <PriceMultiplierInput />
          <div className="grow">
            Загальна вага: {totalWeight.toLocaleString("uk-UA")} г
          </div>
          <div className="grow">
            Загальна сумма: {totalPrice.toLocaleString("uk-UA")} грн
          </div>
        </div>
        <GetTableButton />
      </div>
      <FilesList />
    </div>
  );
}
