import Container from "@/components/misc/Container";
import Logo from "@/components/misc/Logo";
import { Separator } from "@radix-ui/react-separator";
import { siFacebook, siX, siInstagram, siLinkedin } from "simple-icons";
import Link from "next/link";
import Image from "next/image";
function Footer() {
  const links = [
    "Features",
    "Pricing",
    "FAQs",
    "Contact",
    "Terms and Conditions",
    "Privacy Policy",
  ];

  const icons = [siFacebook, siX, siInstagram, siLinkedin];
  return (
    <footer>
      <Container className="items-start">
        <div className="content flex flex-row justify-between w-full">
          <div className="newsletter flex flex-col gap-6">
            <Logo />
            <p className="text-base leading-6 text-white">
              Enhance Customer Satisfaction with Personalized Chat Experiences
            </p>
          </div>
          <div className="links flex flex-row gap-10">
            <div className="flex flex-col gap-3">
              {links.slice(0, 4).map((link, i) => (
                <Link
                  key={i}
                  href={link.toLowerCase()}
                  className="text-base leading-6"
                >
                  {link}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {links.slice(4).map((link, i) => (
                <Link
                  key={i}
                  href={link.toLowerCase()}
                  className="text-base leading-6"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="credits w-full flex flex-col gap-6">
          <Separator
            orientation="horizontal"
            className="w-full h-[1px] bg-gray-700"
          />
          <div className="flex flex-row justify-between w-full">
            <section>
              <p>Copyright © Botify. All Rights reserved</p>
            </section>
            <section className="flex flex-row gap-3">
              {icons.map((icon, i) => (
                <svg
                  key={i}
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  fill="#374151"
                  className="hover:cursor-pointer"
                >
                  <title>{icon.title}</title>
                  <path d={icon.path} />
                </svg>
              ))}
            </section>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
