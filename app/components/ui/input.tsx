import * as React from "react"

import { cn } from "~/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-2xl border border-beige-200 bg-beige-50 px-4 py-3 text-sm text-neutral-800 shadow-soft transition-all outline-none",
        "placeholder:text-neutral-400 placeholder:font-light",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-beige-50 focus-visible:border-rose-400",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20 aria-invalid:animate-shake",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-700",
        className
      )}
      {...props}
    />
  )
}

export { Input }
