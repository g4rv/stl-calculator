// app/wrapper.ts
import { makeStore } from "@/lib/store";
import { createWrapper } from "next-redux-wrapper";

export const wrapper = createWrapper(makeStore);
