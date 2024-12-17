"use client";

import { useRouter } from "next/navigation";
import { animatePageOut } from "../animations";
import * as React from "react"

export default function TransitionLink({
  href,
  label,
  className,
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  const handleClick = () => {
    animatePageOut(href, router);
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      // style={{ fontFamily: "wonder" }}
    >
      {label}
    </button>
  );
}
