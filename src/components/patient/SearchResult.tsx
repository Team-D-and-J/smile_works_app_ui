import { Patient } from "@/app/patient/page";
import { useRouter } from "next/navigation";

interface SearchResultProps {
  patient: Patient;
}

const SearchResult: React.FC<SearchResultProps> = ({ patient }) => {
  const router = useRouter();

  function handleClick() {
    router.replace(`/patient/${patient._id}`);
  }
  return (
    <div
      onClick={handleClick}
      className="p-3 w-52  border border-gray-300 rounded-md"
      id="patient._id"
    >
      {patient.name}
    </div>
  );
};

export default SearchResult;
