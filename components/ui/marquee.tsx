import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

interface MarqueeProps {
  className?: string;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  vertical?: boolean;
  fade?: boolean;
}

export function Marquee({
  className,
  pauseOnHover = false,
  children,
  vertical = false,
  fade = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full overflow-hidden [--duration:120s] [--gap:3rem]",
        {
          "flex-col": vertical,
          "[mask-image:linear-gradient(to_right,hsl(var(--background))_0%,transparent_10%,transparent_90%,hsl(var(--background))_100%)]":
            fade && !vertical,
          "[mask-image:linear-gradient(to_top,hsl(var(--background))_0%,transparent_10%,transparent_90%,hsl(var(--background))_100%)]":
            vertical && fade,
        },
        className,
      )}
    >
      <div
        className={cn(
          "flex gap-[var(--gap)]",
          {
            "animate-marquee-vertical": vertical,
            "animate-marquee": !vertical,
            "hover:[animation-play-state:paused]": pauseOnHover,
          },
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

const imageSources = [
  "/img/marquee1.png",
  "/img/marquee2.svg",
  "/img/marquee3.png",
  "/img/marquee4.png",
  "/img/marquee5.png",
  "/img/marquee6.png",
  "/img/marquee7.png",
  "/img/marquee8.png",
  "/img/marquee9.png",
];

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden mt-16">
      <Marquee className="[--duration:80s]">
        {imageSources.map((imgPath, index) => (
          <div key={index} className="relative w-[100px] h-[50px]">
            <Image src={imgPath} alt={`Marquee Image ${index + 1}`} fill={true} style={{ objectFit: "contain" }} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
