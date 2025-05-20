"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button, Card } from "@heroui/react";
import { Spacer } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import Radio from "./main/page"
import CassetteCarousel from "./cassette/page";

export default function Home() {
  const t = useTranslations("base");
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <>
      <style jsx>{`
        @font-face {
          font-family: "HandwritingFont";
          src: url("/fonts/나눔손글씨 왼손잡이도 예뻐.ttf") format("truetype");
      }
        
          input::selection {
          background:rgb(232, 133, 224);
          color: #ffffff;
        }

          textarea::selection {
          background:rgb(232, 133, 224);
          color: #ffffff;
        }
          textarea::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
  }

  textarea::-webkit-scrollbar-track {
    background: #f0e6f6; /* Background color of the scrollbar track */
  }

  textarea::-webkit-scrollbar-thumb {
    background: rgba(255, 168, 246, 0.57); /* Color of the scrollbar thumb */
    border-radius: 6px; /* Rounded corners for the scrollbar thumb */
  }

  textarea::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 190, 251, 0.6); /* Color when hovering over the scrollbar thumb */
  }

  textarea {
    resize: none; /* Disable resizing */
  }
      `}</style>

      <section className="flex flex-col items-center h-full w-full gap-4 py-20 relative"
        style={{
          backgroundColor: "#FDF3D0",
          color: "#000"
        }}
          >
        {status === "authenticated" && (
          <div className="flex flex-col items-center gap-4">
            <Radio />
          </div>
        )}
        {status === "unauthenticated" && (
          <div className="flex flex-col items-center justify-center h-full relative">
            {/* Title positioned 30px above the center */}
            <h1
              className="text-6xl text-center lg:text-[140px] font-bold absolute"
              style={{
                top: "calc(40%)", // Move 30px above the center
                transform: "translateY(-50%)", // Center vertically
              }}
            >
              {t("title")}
            </h1>

            {/* Button positioned 30px below the center */}
            <Button
              className="bg-[#784B3C] hover:bg-[#784B3C] font-bold text-white py-2 px-4 lg:text-[30px] absolute"
              style={{
                top: "calc(80%)", // Move 30px below the center
                transform: "translateY(-50%)", // Center vertically
              }}
              onPress={() => {
                signIn();
              }}
            >
              Login
            </Button>
          </div>
        )}
      </section>

    </>
  );
}