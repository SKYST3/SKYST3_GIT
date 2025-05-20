import { MdArrowLeft } from "react-icons/md";

export default function TriangleArrowLeft({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <MdArrowLeft color={color} size={size} />;
}
