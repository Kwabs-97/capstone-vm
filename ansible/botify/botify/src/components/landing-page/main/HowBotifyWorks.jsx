"use client";
import Container from "../../misc/Container";
import Header2 from "../../typography/Header2";
import TabsContainer from "../../misc/TabsContainer";
import {
  connectData,
  customizeBot,
  shareBot,
  connectTools,
} from "@/assets/images";
import Header3 from "../../typography/Header3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HowBotifyWorks() {
  return (
    <Container className="bg-gray-50 gap-20">
      <Header2 className="text-basic">How Botify Works</Header2>
      <Tabs
        defaultValue="connectData"
        className="flex flex-row gap-20"
        orientation="horizontal"
      >
        <TabsList className="tabs flex flex-col gap-8 flex-1 min-w-[616px]">
          <TabsTrigger value="connectData">
            <TabsContainer>
              <Header3 className="text-basicLight text-left">
                Connect Your Data
              </Header3>
              <p className="text-gray-700 text-left">
                Easily integrate your data sources, upload files, or allow
                Botify to crawl your website. Our platform utilizes this data to
                train your chatbot effectively.
              </p>
            </TabsContainer>
          </TabsTrigger>

          <TabsTrigger value="customizeBot">
            <TabsContainer>
              <Header3 className="text-basicLight text-left">
                Customize Your Bot
              </Header3>
              <p className="text-gray-700 text-left">
                {`
                    Tailor your chatbot's appearance to seamlessly blend with your
                website's design. Add custom colors, logos, and personality
                traits to reflect your brand's identity.`}
              </p>
            </TabsContainer>
          </TabsTrigger>

          <TabsTrigger value="shareBot">
            <TabsContainer>
              <Header3 className="text-basicLight text-left">
                Share Your Chatbot
              </Header3>
              <p className="text-gray-700 text-left">
                Flexibility to share a link, allowing you to engage with
                customers across various channels effortlessly..
              </p>
            </TabsContainer>
          </TabsTrigger>
          <TabsTrigger value="connectTools">
            <TabsContainer>
              <Header3 className="text-basicLight text-left">
                Connect Your Tools
              </Header3>
              <p className="text-gray-700 text-left">
                Integrate your chatbot with your favorite tools and platforms,
                including Slack, WhatsApp, Zapier, and more, for enhanced
                functionality and productivity.
              </p>
            </TabsContainer>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="connectData">
          <div className="tabs-display flex-1 min-w-[616px] items-center flex justify-center">
            <div
              style={{
                backgroundImage: `url(${connectData.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "500px",
                width: "500px",
              }}
            ></div>
          </div>
        </TabsContent>
        <TabsContent value="customizeBot">
          <div className="tabs-display flex-1 min-w-[616px] items-center flex justify-center">
            <div
              style={{
                backgroundImage: `url(${customizeBot.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "500px",
                width: "500px",
              }}
            ></div>
          </div>
        </TabsContent>
        <TabsContent value="shareBot">
          <div className="tabs-display flex-1 min-w-[616px] items-center flex justify-center">
            <div
              style={{
                backgroundImage: `url(${shareBot.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "500px",
                width: "500px",
              }}
            ></div>
          </div>
        </TabsContent>
        <TabsContent value="connectTools">
          <div className="tabs-display flex-1 min-w-[616px] items-center flex justify-center">
            <div
              style={{
                backgroundImage: `url(${connectTools.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "500px",
                width: "500px",
              }}
            ></div>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
