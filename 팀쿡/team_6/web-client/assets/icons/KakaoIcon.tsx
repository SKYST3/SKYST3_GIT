import { RiKakaoTalkFill } from "react-icons/ri";

import { ReactIconProps } from "@/types";

export default function KakaoIcon({ size, color }: ReactIconProps) {
  return (
    <RiKakaoTalkFill className="flex-shrink-0" color={color} size={size} />
  );
}
