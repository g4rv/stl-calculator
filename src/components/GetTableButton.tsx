"use client";

import { useAppSelector } from "@/lib/hooks";
import cn from "@/utils/cn";
import * as XLSX from "xlsx-js-style";

const GetTableButton = () => {
  const files = useAppSelector((state) => state.stlFiles.files);

  const handleClick = () => {
    function exportToExcel() {
      // --- Headers ---
      const headers = [
        [
          "№ з/п",
          "Найменування продукції / Розмір, мм",
          "Од. вим.",
          "К-сть, шт",
          "Вага, грам/од",
          "Вага, грам",
          "Ціна за одиницю у грн (без ПДВ)",
          "Сума у грн (без ПДВ)",
        ],
      ];

      // --- Table Rows ---
      const rows = files.map((file, index) => {
        const totalWeight = (file.modelWeight ?? 0) * (file.quantity ?? 0);
        const totalPrice = (file.price ?? 0) * (file.quantity ?? 0);

        return [
          index + 1, // number
          file.name || "", // string
          "шт", // string
          file.quantity ?? 0, // number
          Number((file.modelWeight ?? 0).toFixed(2)), // number
          Number(totalWeight.toFixed(2)), // number
          Number((file.price ?? 0).toFixed(2)), // number
          Number(totalPrice.toFixed(2)), // number
        ];
      });

      // --- Totals ---
      const totalQuantity = files.reduce(
        (sum, f) => sum + (f.quantity ?? 0),
        0
      );
      const totalWeight = files.reduce(
        (sum, f) => sum + (f.modelWeight ?? 0) * (f.quantity ?? 0),
        0
      );
      const totalWithoutVAT = files.reduce(
        (sum, f) => sum + (f.price ?? 0) * (f.quantity ?? 0),
        0
      );

      const vatRate = 0.2;
      const vatAmount = totalWithoutVAT * vatRate;
      const totalWithVAT = totalWithoutVAT + vatAmount;

      // --- Summary Rows ---
      const summary = [
        [
          "",
          "ВСЬОГО",
          "шт",
          totalQuantity,
          "",
          Number(totalWeight.toFixed(2)),
          "Разом без ПДВ:",
          Number(totalWithoutVAT.toFixed(2)),
        ],
        ["", "", "", "", "", "", "ПДВ 20%:", Number(vatAmount.toFixed(2))],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "Разом з ПДВ:",
          Number(totalWithVAT.toFixed(2)),
        ],
      ];

      const worksheetData: (string | number)[][] = [
        ...headers,
        ...rows,
        ...summary,
      ];

      // --- Create Worksheet ---
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // --- Column Widths ---
      worksheet["!cols"] = [
        { wch: 6 },
        { wch: 40 },
        { wch: 10 },
        { wch: 10 },
        { wch: 12 },
        { wch: 12 },
        { wch: 25 },
        { wch: 20 },
      ];

      // --- Row Heights ---
      const headerHeight = 50;
      const itemRowHeight = 50;
      const totalRowsCount = 3; // 1 empty + 3 totals
      const totalRowStart = worksheetData.length - totalRowsCount;

      worksheet["!rows"] = worksheetData.map((_, index) => {
        if (index === 0) return { hpt: headerHeight }; // header
        if (index > 0 && index < totalRowStart) return { hpt: itemRowHeight }; // item rows
        return {}; // summary rows default height
      });

      // --- Border Style ---
      const borderStyle = {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      };

      // --- Styling ---
      const range = XLSX.utils.decode_range(worksheet["!ref"]!);
      const totalRowsStartIndex = worksheetData.length - 3; // last 3 totals

      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = worksheet[cellAddress] || {};

          const isHeader = R === 0;
          const isTotalRow = R >= totalRowsStartIndex;
          const isSummaryLabelCell = isTotalRow && C === 6; // total labels
          const isSummaryValueCell = isTotalRow && C === 7; // total values
          const isSummaryCellWithBorder =
            isSummaryLabelCell || isSummaryValueCell;

          const applyBorder =
            isHeader ||
            (R > 0 && R < totalRowsStartIndex) ||
            isSummaryCellWithBorder;

          // --- Alignment ---
          let horizontalAlign: "center" | "left" = "center";

          // File names column
          if (!isHeader && C === 1) horizontalAlign = "left";

          // Total label column
          if (isSummaryLabelCell) horizontalAlign = "left";

          cell.s = {
            font: {
              name: "Times New Roman",
              sz: isHeader ? 12 : 11,
              bold: isTotalRow,
            },
            alignment: {
              vertical: "center",
              horizontal: horizontalAlign,
              wrapText: true,
            },
            border: applyBorder ? borderStyle : undefined,
          };

          worksheet[cellAddress] = cell;
        }
      }

      // --- Export Workbook ---
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Таблиця");
      XLSX.writeFile(workbook, "Таблиця_продукції.xlsx");
    }

    console.log(files);

    if (files.length > 0) exportToExcel();
  };

  return (
    <button
      onClick={handleClick}
      disabled={files.length === 0}
      className={cn(
        "bg-[rgb(70,170,80)] py-2 px-4 h-min rounded-full text-white not-disabled:cursor-pointer disabled:bg-gray-300 duration-300"
      )}
    >
      Вивантижити .EXCEL
    </button>
  );
};

export default GetTableButton;
