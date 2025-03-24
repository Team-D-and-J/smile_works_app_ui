import Link from "next/link";

interface LeftNavLinksProps {
  href: string;
  text: string;
  icon: React.ElementType; // Type for the icon component
}

function LeftNavLinks({ href, text, icon: Icon }: LeftNavLinksProps) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm text-textLight">
        <Icon style={{ width: "32px", height: "32px" }} />
        <span className="whitespace-nowrap text-sm">{text}</span>
      </div>
    </Link>
  );
}

export default LeftNavLinks;
