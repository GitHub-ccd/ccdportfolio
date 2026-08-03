"use client";

import { useEffect } from "react";

export default function CodeCopyButton() {
  useEffect(() => {
    const copyButtons = document.querySelectorAll(".blog-copy-btn");

    const handleCopy = async (e) => {
      const btn = e.currentTarget;
      const encodedCode = btn.getAttribute("data-code");
      if (!encodedCode) return;

      const codeToCopy = decodeURIComponent(encodedCode);

      try {
        await navigator.clipboard.writeText(codeToCopy);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-teal-400 font-semibold">Copied!</span>`;
        btn.classList.add("border-teal-500/50");

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("border-teal-500/50");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code snippet:", err);
      }
    };

    copyButtons.forEach((btn) => btn.addEventListener("click", handleCopy));

    return () => {
      copyButtons.forEach((btn) => btn.removeEventListener("click", handleCopy));
    };
  }, []);

  return null;
}
