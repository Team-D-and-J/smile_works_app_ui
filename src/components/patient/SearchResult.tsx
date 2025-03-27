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
      className="p-3 mb-[2px] border rounded-md grid grid-cols-4 gap-4 place-items-start cursor-pointer hover:bg-secondaryDark "
      key="patient._id"
    >
      <p>{patient.name}</p>
      <p>{patient.phoneNumber}</p>
      <p>
        {patient.address.street}, {patient.address.city}
      </p>
      <p>{patient.dob}</p>
    </div>
  );
};

export default SearchResult;
