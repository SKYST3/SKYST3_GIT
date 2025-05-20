import { MdArrowRight } from "react-icons/md";

export default function TriangleArrowRight({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <MdArrowRight color={color} size={size} />;
}
