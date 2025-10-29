import { MATERIAL_DENSITIES } from "@/utils/getGrammsFromSTL";

export interface STLFile {
  name: string;
  URL: string;
  modelWeight: number;
  includePaint: boolean;
  quantity: number;
  price: number;
  totalPrice: number;
}

export type Material = keyof typeof MATERIAL_DENSITIES;
