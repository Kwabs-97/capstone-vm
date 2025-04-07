import Hero from "@/components/landing-page/header/Hero";
import HowBotifyWorks from "@/components/landing-page/main/HowBotifyWorks";
import Navbar from "@/components/landing-page/header/Navbar";
import WhyChooseBotify from "@/components/landing-page/main/WhyChooseBotify";
import Container from "@/components/misc/Container";
import Header2 from "@/components/typography/Header2";
import CustomButton from "@/components/form-elements/CustomButton";
import Footer from "@/components/landing-page/footer/Footer";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <header>
        <Navbar />
        <Hero />
      </header>
      <main>
        <HowBotifyWorks />
        <WhyChooseBotify />
      </main>
      <aside className="bg-white">
        <Container className="">
          <div className="bg-blue-600 rounded-2xl py-16 w-full flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-6 w-[650px]">
              <Header2 className="text-center">
                Ready To Elevate Your Customer Experience?
              </Header2>
              <p>
                Join thousands of businesses already using Botify to
                revolutionize their online interactions.
              </p>
              <CustomButton className="bg-white text-blue-600 hover:bg-blue-100 ">
                Start building your chatbot
              </CustomButton>
            </div>
          </div>
        </Container>
      </aside>
      <Footer />
    </div>
  );
}
