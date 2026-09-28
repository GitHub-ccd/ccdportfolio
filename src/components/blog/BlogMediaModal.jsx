"use client";

import { useState, useEffect } from "react";
import MediaModal from "@/components/MediaModal";

export default function BlogMediaModal() {
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  useEffect(() => {
    const figureElements = document.querySelectorAll("[data-expand-figure]");

    const handleClick = (e) => {
      const figure = e.currentTarget;
      const src = figure.getAttribute("data-expand-figure");
      const title = figure.getAttribute("data-figure-caption") || "Blog Figure";

      if (src) {
        setActiveMediaModal({ type: "image", src, title });
      }
    };

    figureElements.forEach((el) => el.addEventListener("click", handleClick));

    return () => {
      figureElements.forEach((el) => el.removeEventListener("click", handleClick));
    };
  }, []);

  if (!activeMediaModal) return null;

  return (
    <MediaModal
      activeMedia={activeMediaModal}
      onClose={() => setActiveMediaModal(null)}
    />
  );
}
