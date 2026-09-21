import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* Action principale : bleu marque, léger relief, halo au survol */
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(15_23_42/0.18)] hover:bg-brand-lt hover:shadow-glow hover:-translate-y-px dark:bg-brand-lt dark:hover:bg-brand-glow/90",
        /* Action secondaire : contour fin, surface translucide */
        outline:
          "border-border bg-background/70 text-foreground shadow-xs backdrop-blur-sm hover:border-foreground/20 hover:bg-muted/70 aria-expanded:bg-muted dark:border-white/12 dark:bg-white/5 dark:hover:bg-white/10",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/70 aria-expanded:bg-secondary",
        /* Action discrète */
        ghost:
          "text-foreground/80 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-white/8",
        /* Suppression / annulation */
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/18 focus-visible:ring-destructive/25 dark:bg-destructive/15 dark:hover:bg-destructive/25",
        link: "h-auto px-0 text-primary underline-offset-4 hover:underline",
        /* Verre sombre : boutons posés sur les surfaces encre */
        glass:
          "border-white/12 bg-white/6 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.10)] backdrop-blur-md hover:border-white/25 hover:bg-white/12",
        /* Bouton blanc sur fond sombre */
        inverse:
          "bg-white text-ink shadow-[0_1px_2px_rgb(0_0_0/0.25),0_8px_24px_-8px_rgb(255_255_255/0.35)] hover:bg-white/92 hover:-translate-y-px",
      },
      size: {
        default:
          "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 text-[0.8125rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 rounded-xl px-6 text-[0.9375rem] has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        xl: "h-14 gap-2.5 rounded-xl px-7 text-base has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        icon: "size-10",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
