import { type IIconBox } from "./../../interface/IconBox";

const IconBox: React.FC<IIconBox> = ({ icon: Icon }) => {
  return (
    <div className="bg-blue-500 rounded-md p-1 mr-1">
      <Icon className="text-white" />
    </div>
  );
};

export default IconBox;
