import SideBar from "../SideBar";
import { createContext, useState } from "react";
import React from "react";
import { ISchemaData } from "../../pages";

interface ISideBarContext {
  schema: { [tableName: string]: { table_name: string; column_name: string }[] };
  setSchema: React.Dispatch<
    React.SetStateAction<{
      [tableName: string]: { table_name: string; column_name: string }[];
    }>
  >;
}
export const SideBarContext = React.createContext({} as ISideBarContext);

const Layout: React.FC = function Layout(props) {
  const [schemaData, setSchemaData] = useState<{
    [tableName: string]: { table_name: string; column_name: string }[];
  }>({});

  return (
    <main className="flex bg-white h-screen overflow-hidden">
      <SideBarContext.Provider
        value={{
          schema: schemaData,
          setSchema: setSchemaData,
        }}>
        <SideBar />
        <>{props.children}</>
      </SideBarContext.Provider>
    </main>
  );
};
export default Layout;
