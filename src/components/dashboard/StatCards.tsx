interface StatCardProps {
  text: string;
  number: number;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ text, number, textColor }) => {
  return (
    <div
      className={`flex flex-col w-1/3 h-24 items-center ${textColor} p-4 rounded-md`}
    >
      <div className="flex flex-col gap-2 items-center">
        {" "}
        <p className={`text-4xl ${textColor}`}>{number}</p>
        <span className={`${textColor}`}>{text}</span>
      </div>
    </div>
  );
};

export default StatCard;
