import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function CheckOutlineIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <IoIosCheckmarkCircleOutline color={color} size={size} />;
}
