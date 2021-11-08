interface IResultContainerProps {}
const ResultContainer: React.FC<IResultContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <div
      className="flex flex-col justify-start w-full bg-gray-100 h-full p-3 relative overflow-y-auto"
      {...props}>
      {children}
    </div>
  );
};

export default ResultContainer;
