import Link from "next/link";

interface LeftNavLinksProps {
  href: string;
  text: string;
  icon: React.ElementType; // Type for the icon component
  isActive?: boolean;
}

function LeftNavLinks({ href, text, icon: Icon, isActive }: LeftNavLinksProps) {
  return (
    <Link href={href}
    className={`flex items-center gap-4 p-3 rounded-md ${
      isActive ? "bg-btnDark text-white" : "hover:bg-btnDark"
    }`
  }>
      <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-btnDark hover:rounded-sm text-textLight">
        <Icon style={{ width: "32px", height: "32px" }} />
        <span className="whitespace-nowrap text-sm">{text}</span>
      </div>
    </Link>
  );
}

export default LeftNavLinks;
