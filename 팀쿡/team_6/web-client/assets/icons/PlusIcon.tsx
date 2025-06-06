import { GoPlus } from "react-icons/go";

export default function PlusIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <GoPlus color={color} size={size} />;
}
