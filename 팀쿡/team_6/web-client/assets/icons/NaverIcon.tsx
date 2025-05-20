import { SiNaver } from "react-icons/si";

import { ReactIconProps } from "@/types";

export default function NaverIcon({ size, color }: ReactIconProps) {
  return <SiNaver className="flex-shrink-0" color={color} size={size} />;
}
