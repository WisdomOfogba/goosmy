"use client";

import { Home } from "@/components/Home";
import { Suspense } from "react";


export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
