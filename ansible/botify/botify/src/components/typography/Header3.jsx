import { cn } from "@/lib/utils";

function Header3({ children, className }) {
  return (
    <p className={cn("font-bold text-3xl leading-9", className)}>{children}</p>
  );
}

export default Header3;
