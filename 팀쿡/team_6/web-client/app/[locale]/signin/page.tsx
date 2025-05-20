import { Button } from "@heroui/button";
import { getLocale, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import GoogleIcon from "@/assets/icons/GoogleIcon";
import KakaoIcon from "@/assets/icons/KakaoIcon";
import NaverIcon from "@/assets/icons/NaverIcon";
import { redirect } from "@/i18n/routing";
import { signIn, auth, providerMap } from "@/lib/auth";

const IconMap: {
  [key: string]: (size: number, color: string) => JSX.Element;
} = {
  google: (size: number, color: string) => (
    <GoogleIcon color={color} size={size} />
  ),
  naver: (size: number, color: string) => (
    <NaverIcon color={color} size={size} />
  ),
  kakao: (size: number, color: string) => (
    <KakaoIcon color={color} size={size} />
  ),
};

export default async function SignInPage() {
  const session = await auth();
  const locale = await getLocale();
  const t = await getTranslations("signin");

  const msgMap: { [key: string]: string } = {
    // google: t("google"),
    naver: t("naver"),
    // kakao: t("kakao"),
  };

  if (session) {
    redirect({
      href: "/",
      locale,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-32 mb-72">
      <div className="flex flex-col items-center gap-5 w-3/4 md:w-1/4">
        {providerMap.map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id);
            }}
            className="w-full"
          >
            <div className="flex w-full relative">
              <Button
                className="flex items-center justify-center gap-2 w-full px-10 py-6 h-14"
                type="submit"
              >
                {IconMap[provider.id](24, "white")}
                <p>{msgMap[provider.id]}</p>
              </Button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
