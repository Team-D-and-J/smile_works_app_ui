import Link from "next/link";

interface QuickAccessLinkProps {
  href: string;
  text: string;
}

function QuickAccessLink({ href, text }: QuickAccessLinkProps) {
  return (
    <Link
      href={href}
      className="border p-2 rounded-md w-32 h-32 flex justify-center items-center hover:bg-gray-100 text-center bg-btnLight"
    >
      <p>{text}</p>
    </Link>
  );
}

export default QuickAccessLink;
