// printed-books/:book-id
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ResultChart from "../components/ResultChart";

export default function Result() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    router.push({
      pathname: "/result",
      query: { nlQuery: data.query },
    });
  };

  return (
    <div className="flex flex-col justify-start w-full bg-gray-100 h-full p-3">
      <div className="flex flex-col mb-2">
        <div className="flex items-start">
          <span className="font-normal w-28 block">Tables</span>
          <div className="flex flex-wrap items-center">
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsd
            </span>
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsd
            </span>
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsd
            </span>
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">Outputs</span>
          <div className="flex flex-wrap items-center">
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsd
            </span>
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsd
            </span>
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsd
            </span>
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">Conditions</span>
          <div className="flex flex-wrap items-center">
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsdasfdsfdsaf
            </span>
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsdasfd
            </span>
            <span className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
              asdfsd
            </span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border border-gray-400 w-full p-1"
          placeholder="Modify Your Query"
          {...register("query", {
            validate: (value) => value !== "",
          })}
        />
      </form>
      <ResultChart></ResultChart>
    </div>
  );
}
