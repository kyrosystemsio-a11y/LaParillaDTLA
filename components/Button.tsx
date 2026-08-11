import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-basalt text-plaster hover:bg-basalt-dark",
  secondary: "bg-ember text-plaster hover:bg-ember-dark",
  ghost: "border border-ink/30 text-ink hover:border-ink hover:bg-ink/5",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  external?: boolean;
}

export function Button({ href, variant = "primary", external, className = "", children, ...rest }: ButtonProps) {
  const classes = `inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-3 font-utility text-xs uppercase tracking-widest transition-colors ${variants[variant]} ${className}`;

  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
