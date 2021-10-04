import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";

const faqs = [
  "asdfasdfsdfsdfsadsdafsd",
  "asdfasdfsdfsdfsadsdafsadfsdafsd",
  "asdfasdfsdfsdfsadsdafsadafsd",
  "asdfasdfsdfsdfsadsdafsadfsdafsd",
  "asdfasdfsdfsdfsadsdafsadfsdfadsfsdfssdafsd",
];

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = (data: any) => {
    router.push({
      pathname: "/result",
      query: { nlQuery: data.query },
    });
  };
  // background-color: #979797;
  // padding: 10px;
  // margin: 10px;

  return (
    <div className="w-full min-h-screen bg-white h-screen pt-10 pr-10 pl-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border border-gray-400 w-full p-2"
          placeholder="Type a Query"
          {...register("query", {
            validate: (value) => value !== "",
          })}
        />
      </form>
      <div className="flex flex-col justify-between items-start p-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-400 p-2 m-2"
            onClick={() => {
              setValue("query", faq);
            }}>
            {faq}
          </div>
        ))}
      </div>
    </div>
  );
};

// export const getStaticProps = async () => {
//   return {
//     props: {
//       schemaData,
//     },
//   };
// };

export default Home;
