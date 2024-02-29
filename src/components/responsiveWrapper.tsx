"use client";

import { cn } from "@/lib/utils";

const ResponsiveWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "py-3.5 lg:rounded-3xl lg:py-0 lg:shadow-custom",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
