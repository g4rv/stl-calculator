"use client";

import { setPriceMultiplier } from "@/features/stlFiles/stlFilesSlice";
import { selectPriceMultiplier } from "@/features/stlFiles/stlFilesSelector";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function PriceMultiplierInput() {
  const priceMultiplier = useAppSelector(selectPriceMultiplier);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      dispatch(setPriceMultiplier(value));
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="price-multiplier" className="text-sm text-gray-600 mb-1">
        Множник ціни (грн/г)
      </label>
      <input
        id="price-multiplier"
        type="number"
        value={priceMultiplier}
        onChange={handleChange}
        min="0.1"
        step="0.1"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}