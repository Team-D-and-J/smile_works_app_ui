import Link from "next/link";

interface LeftNavLinksProps {
  href: string;
  text: string;
  icon: React.ElementType; // Type for the icon component
  isActive?: boolean;
}

function LeftNavLinks({ href, text, icon: Icon, isActive }: LeftNavLinksProps) {
  return (
    <Link
      href={href}
      className={`flex items-center py-1 pr-2 text-textLight w-full ${
        isActive
          ? "border-l-4 border-textLight  "
          : "border-l-4 border-transparent hover:bg-textDark "
      }hover:bg-white hover:bg-opacity-15`}
    >
      <div className="flex items-center gap-2 p-2 cursor-pointer ">
        <Icon style={{ width: "24px", height: "24px" }} />
        <span className="whitespace-nowrap text-lg">{text}</span>
      </div>
    </Link>
  );
}

export default LeftNavLinks;
