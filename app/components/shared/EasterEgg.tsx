"use client";

import { BiCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";

export default function EasterEgg({ isMet }: { isMet: boolean }) {
  return (
    <button>
      {isMet !== true ? (
        <BiCheckbox
          className="text-3xl dark:text-zinc-300 text-zinc-600"
          aria-hidden="true"
        />
      ) : (
        <BiSolidCheckboxChecked
          className="text-3xl dark:text-primary-color text-secondary-color"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
