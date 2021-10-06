import Image from "next/image";
import leftPath from "../../public/left.png";
import { useContext, useState } from "react";
import { SideBarContext } from "../Layout";

interface ISideBarProps {}

const SideBar: React.FC<ISideBarProps> = function SideBar(props) {
  const { schema } = useContext(SideBarContext);
  const [isShow, setIsShow] = useState(true);
  const onClick = () => {
    setIsShow((isShow) => !isShow);
  };

  return (
    <div
      className={`overflow-hidden h-full bg-white border-r transition-all duration-300 ease-in-out ${
        isShow ? "w-48" : "w-8"
      }`}>
      <div className="flex flex-row justify-between items-center h-8 p-1 border-solid border-b border-gray-300">
        <span className={`font-bold ${isShow ? "block" : "hidden"}`}>
          Schema
        </span>
        <Image
          className="cursor-pointer w-4"
          src={leftPath}
          alt="left"
          width={15}
          height={15}
          onClick={onClick}
        />
      </div>
      <div
        className={`h-full p-2 overflow-scroll pb-24 ${
          isShow ? "" : "hidden"
        }`}>
        {Object.entries(schema).map(([key, value]) => {
          return (
            <div key={key} className="pb-2">
              <span className="block font-bold">{key}</span>
              {value.map((data, index) => (
                <div
                  key={index}
                  className="pt-1 font-light">{`┗ ${data.column_name}`}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
