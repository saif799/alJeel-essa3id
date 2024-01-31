import { QuestionMarkIcon } from "@radix-ui/react-icons";

const InfoBlock = ({
  name,
  content,
}: {
  name: string;
  content: string | number | null;
}) => {
  return (
    <div>
      <p className=" pb-1.5 text-xl font-light text-darkgreen"> {name}</p>
      <p className="text-2xl/10 font-normal text-darkgreen ">
        {" "}
        {content ? content : <QuestionMarkIcon className="h-5 w-5" />}{" "}
      </p>
    </div>
  );
};

export default InfoBlock;
