"use client";
import Link from "next/link";
import CustomButton from "../../form-elements/CustomButton";
import { useRouter } from "next/navigation";
import Logo from "@/components/misc/Logo";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const links = ["Features", "Pricing", "contact"];
  const router = useRouter();
  return (
    <nav className="flex flex-row justify-between px-16 py-5">
      <Logo />
      <div>
        <section className="flex flex-row gap-8">
          {links.map((link) => {
            <Link href={link.toLowerCase()}>{Link}</Link>;
          })}
        </section>
      </div>
      <div>
        <section className="flex flex-row gap-8 justify-center items-center">
          <Link href="/signIn">Sign in</Link>
          <CustomButton
            onClick={() => {
              router.push("/signup");
            }}
          >
            Sign up
          </CustomButton>
          <ModeToggle />
        </section>
      </div>
    </nav>
  );
}
