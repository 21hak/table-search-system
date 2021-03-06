import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { SideBarContext } from "../components/Layout";
import _ from "lodash";
import schemaData from "../test/schema.json";

export interface ISchemaData {
  schema: { table_name: string; column_name: string }[];
}

/**
 * pseudo faqs
 */
const faqs = [
  "Average sale by region",
  "Total Quantity by Product Name",
  "Any recommendations",
];

/**
 * Root 페이지. 자연언어로 질의
 */
const Home = (props: ISchemaData) => {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const { setSchema } = useContext(SideBarContext);

  const onSubmit = (data: any) => {
    router.push({
      pathname: "/result",
      query: { nlQuery: data.query },
    });
  };

  useEffect(() => {
    setSchema(
      JSON.parse(
        JSON.stringify(_.groupBy(props.schema, (data) => data.table_name))
      )
    );
  }, []);

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
            className="bg-gray-400 p-2 m-2 cursor-pointer	"
            onClick={() => {
              setValue("query", faq);
              router.push({
                pathname: "/result",
                query: { nlQuery: faq },
              });
            }}>
            {faq}
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const env = process.env.NODE_ENV;
  if (env == "development") {
    return {
      props: {
        ...schemaData,
      },
    };
  } else {
    const data: ISchemaData = await fetch("http://localhost:40010/").then(
      function (response) {
        return response.json();
      }
    );

    return {
      props: {
        schema: data.schema,
      },
    };
  }
};

export default Home;
