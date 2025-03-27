import Link from "next/link";

interface QuickAccessLinkProps {
  href: string;
  text: string;
}

function QuickAccessLink({ href, text }: QuickAccessLinkProps) {
  return (
    <Link
      href={href}
      className=" p-2 rounded-md w-32 h-24 flex justify-center items-center hover:border border-btnDark text-center bg-btnLight"
    >
      <p>{text}</p>
    </Link>
  );
}

export default QuickAccessLink;
