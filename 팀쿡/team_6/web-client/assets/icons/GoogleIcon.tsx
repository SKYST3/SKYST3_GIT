import { FaGoogle } from "react-icons/fa";

import { ReactIconProps } from "@/types";

export default function GoogleIcon({ size, color }: ReactIconProps) {
  return <FaGoogle className="flex-shrink-0" color={color} size={size} />;
}
