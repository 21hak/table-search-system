import SideBar from "../SideBar";
import { createContext, useState } from "react";
import React from "react";

const schemaDataTemp = {
  supplier: [
    "supplier_id",
    "supplier_name",
    "contact_name",
    "address",
    "city",
    "postal_code",
    "country",
    "phone",
    "category_name",
  ],
  categories: ["category_id", "category_name", "description"],
  customers: [
    "customer_id",
    "customer_name",
    "contact_name",
    "address",
    "city",
    "postal_code",
    "country",
  ],
  employees: [
    "employee_id",
    "last_name",
    "first_name",
    "birth_date",
    "photo",
    "notes",
  ],
  orders: [
    "order_id",
    "order_date",
    "customer_id",
    "employee_id",
    "shipper_id",
  ],
  products: [
    "product_id",
    "product_name",
    "unit",
    "price",
    "supplier_id",
    "category_id",
  ],
};
interface ISideBarContext {
  schemaData: {
    [table: string]: string[];
  };
  setSchemaData: React.Dispatch<
    React.SetStateAction<{
      [table: string]: string[];
    }>
  >;
}
export const SideBarContext = React.createContext({} as ISideBarContext);

const Layout: React.FC = function Layout(props) {
  const [schemaData, setSchemaData] = useState<{
    [table: string]: string[];
  }>(schemaDataTemp);

  return (
    <main className="flex bg-white h-screen min-h-screen">
      <SideBarContext.Provider
        value={{
          schemaData: schemaData,
          setSchemaData: setSchemaData,
        }}>
        <SideBar />
        <>{props.children}</>
      </SideBarContext.Provider>
    </main>
  );
};
export default Layout;
