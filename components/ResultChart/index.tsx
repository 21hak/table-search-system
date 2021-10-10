import { useEffect, useState } from "react";
import Image from "next/image";
import tablePath from "../../public/table.png";
import pieChartPath from "../../public/pie-chart.png";
import barChartPath from "../../public/bar-chart.png";
import { IResultData } from "../../pages/result";
import ResultTable from "../ResultTable";

interface IResultChartProps {
  data: IResultData;
}
const ResultChart: React.FC<IResultChartProps> = function ResultChart(props) {
  const [activated, setActivated] = useState<"table" | "bar" | "pie">("table");
  useEffect(() => {}, [props.data]);
  return (
    <div className="w-full h-full bg-white border border-gray-400 mt-4 p-4 overflow-y-scroll">
      <ChartButtons activated={activated} setActivated={setActivated} />
      <div className="p-4">
        {activated === "table" && <ResultTable data={props.data} />}
      </div>
    </div>
  );
};

interface IChartButtonsProps {
  activated: "table" | "bar" | "pie";
  setActivated: (chart: "table" | "bar" | "pie") => void;
}

const ChartButtons: React.FC<IChartButtonsProps> = function ChartButtons({
  activated,
  setActivated,
}) {
  return (
    <div className="flex flex-row justify-between items-center rounded border border-gray-500 w-24">
      <button
        type="button"
        className={`flex items-center  p-2 border-r rounded-l border-gray-500 flex-1 ${
          activated === "table" ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setActivated("table");
        }}>
        <Image src={tablePath} />
      </button>
      <button
        type="button"
        className={`flex items-center  p-2 border-r border-gray-500 flex-1 ${
          activated === "bar" ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setActivated("bar");
        }}>
        <Image src={barChartPath} />
      </button>
      <button
        type="button"
        className={`flex items-center  p-2  flex-1 rounded-r ${
          activated === "pie" ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setActivated("pie");
        }}>
        <Image src={pieChartPath} />
      </button>
    </div>
  );
};
export default ResultChart;

const data: {
  plain: IResultData;
  aggOnly: IResultData;
  groupByOnly: IResultData;
  groupBy: IResultData;
} = {
  plain: [
    [
      {
        customer_name: "Wilman Kala",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "Wilman Kala",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Supremes delices",
        product_name: "Geitost",
      },
      {
        customer_name: "Supremes delices",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Hanari Carnes",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Richter Supermarkt",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Ernst Handel",
        product_name: "Mascarpone Fabioli",
      },
      {
        customer_name: "Wartian Herkku",
        product_name: "Queso Manchego La Pastora",
      },
      {
        customer_name: "Frankenversand",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "GROSELLA-Restaurante",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "White Clover Markets",
        product_name: "Geitost",
      },
      {
        customer_name: "White Clover Markets",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Split Rail Beer & Ale",
        product_name: "Geitost",
      },
      {
        customer_name: "Rattlesnake Canyon Grocery",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Rattlesnake Canyon Grocery",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "QUICK-Stop",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "QUICK-Stop",
        product_name: "Geitost",
      },
      {
        customer_name: "Vins et alcools Chevalier",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Vins et alcools Chevalier",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Magazzini Alimentari Riuniti",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Berglunds snabbkop",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "LILA-Supermercado",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "LILA-Supermercado",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Lehmanns Marktstand",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Rattlesnake Canyon Grocery",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "LILA-Supermercado",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "LILA-Supermercado",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Blondel pere et fils",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Hungry Owl All-Night Grocers",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Tortuga Restaurante",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Tortuga Restaurante",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Ana Trujillo Emparedados y helados",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Hungry Owl All-Night Grocers",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Du monde entier",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Rattlesnake Canyon Grocery",
        product_name: "Mascarpone Fabioli",
      },
      {
        customer_name: "Wartian Herkku",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Save-a-lot Markets",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Koniglich Essen",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Koniglich Essen",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Folk och fa HB",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "Furia Bacalhau e Frutos do Mar",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "LILA-Supermercado",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Wartian Herkku",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Hungry Owl All-Night Grocers",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Hungry Owl All-Night Grocers",
        product_name: "Mascarpone Fabioli",
      },
      {
        customer_name: "Frankenversand",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Simons bistro",
        product_name: "Geitost",
      },
      {
        customer_name: "Simons bistro",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Frankenversand",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "La maison dAsie",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Piccolo und mehr",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "Die Wandernde Kuh",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Die Wandernde Kuh",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "LILA-Supermercado",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Seven Seas Imports",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Seven Seas Imports",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "QUICK-Stop",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Drachenblut Delikatessend",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Eastern Connection",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Eastern Connection",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Antonio Moreno Taqueria",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "Queen Cozinha",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Queen Cozinha",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Hungry Owl All-Night Grocers",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Wolski",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Mere Paillarde",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Folk och fa HB",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Hungry Owl All-Night Grocers",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Ernst Handel",
        product_name: "Geitost",
      },
      {
        customer_name: "Berglunds snabbkop",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Split Rail Beer & Ale",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Sante Gourmet",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Sante Gourmet",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Ernst Handel",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Ernst Handel",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Piccolo und mehr",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Save-a-lot Markets",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "HILARION-Abastos",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Frankenversand",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Frankenversand",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Vaffeljernet",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Rattlesnake Canyon Grocery",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Ottilies Kaseladen",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "Ottilies Kaseladen",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Ottilies Kaseladen",
        product_name: "Fltemysost",
      },
      {
        customer_name: "Bottom-Dollar Marketse",
        product_name: "Geitost",
      },
      {
        customer_name: "Bottom-Dollar Marketse",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Bottom-Dollar Marketse",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Familia Arquibaldo",
        product_name: "Geitost",
      },
      {
        customer_name: "Hungry Coyote Import Store",
        product_name: "Geitost",
      },
      {
        customer_name: "Richter Supermarkt",
        product_name: "Camembert Pierrot",
      },
      {
        customer_name: "Richter Supermarkt",
        product_name: "Gudbrandsdalsost",
      },
      {
        customer_name: "Gourmet Lanchonetes",
        product_name: "Gorgonzola Telino",
      },
      {
        customer_name: "Gourmet Lanchonetes",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Ernst Handel",
        product_name: "Raclette Courdavault",
      },
      {
        customer_name: "Folk och fa HB",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "Consolidated Holdings",
        product_name: "Mozzarella di Giovanni",
      },
      {
        customer_name: "Mere Paillarde",
        product_name: "Queso Manchego La Pastora",
      },
      {
        customer_name: "Ernst Handel",
        product_name: "Queso Cabrales",
      },
      {
        customer_name: "Reggiani Caseifici",
        product_name: "Queso Cabrales",
      },
    ],
  ],
  aggOnly: [
    {
      avg: 28.73,
    },
  ],
  groupByOnly: [
    {
      country: "UK",
      city: "Cowes",
      customer_name: "Island Trading",
    },
    {
      country: "USA",
      city: "Boise",
      customer_name: "Save-a-lot Markets",
    },
    {
      country: "Spain",
      city: "Madrid",
      customer_name: "Bolido Comidas preparadas",
    },
    {
      country: "Spain",
      city: "Barcelona",
      customer_name: "Galeria del gastronomo",
    },
    {
      country: "Brazil",
      city: "Rio de Janeiro",
      customer_name: "Ricardo Adocicados",
    },
    {
      country: "Switzerland",
      city: "Bern",
      customer_name: "Chop-suey Chinese",
    },
    {
      country: "Germany",
      city: "Leipzig",
      customer_name: "Morgenstern Gesundkost",
    },
    {
      country: "Venezuela",
      city: "Caracas",
      customer_name: "GROSELLA-Restaurante",
    },
    {
      country: "Germany",
      city: "Berlin",
      customer_name: "Alfreds Futterkiste",
    },
    {
      country: "France",
      city: "Lyon",
      customer_name: "Victuailles en stock",
    },
    {
      country: "France",
      city: "Reims",
      customer_name: "Vins et alcools Chevalier",
    },
    {
      country: "Venezuela",
      city: "San Cristobal",
      customer_name: "HILARION-Abastos",
    },
    {
      country: "USA",
      city: "Elgin",
      customer_name: "Hungry Coyote Import Store",
    },
    {
      country: "Austria",
      city: "Salzburg",
      customer_name: "Piccolo und mehr",
    },
    {
      country: "USA",
      city: "Seattle",
      customer_name: "White Clover Markets",
    },
    {
      country: "Mexico",
      city: "Mexico D.F.",
      customer_name: "Ana Trujillo Emparedados y helados",
    },
    {
      country: "Brazil",
      city: "Sao Paulo",
      customer_name: "Comercio Mineiro",
    },
    {
      country: "Mexico",
      city: "Mexico D.F.",
      customer_name: "Tortuga Restaurante",
    },
    {
      country: "Austria",
      city: "Graz",
      customer_name: "Ernst Handel",
    },
    {
      country: "USA",
      city: "Lander",
      customer_name: "Split Rail Beer & Ale",
    },
    {
      country: "Brazil",
      city: "Sao Paulo",
      customer_name: "Tradicao Hipermercados",
    },
    {
      country: "Argentina",
      city: "Buenos Aires",
      customer_name: "Cactus Comidas para llevar",
    },
    {
      country: "France",
      city: "Paris",
      customer_name: "Paris specialites",
    },
    {
      country: "Germany",
      city: "Munchen",
      customer_name: "Frankenversand",
    },
    {
      country: "Italy",
      city: "Torino",
      customer_name: "Franchi S.p.A.",
    },
    {
      country: "Brazil",
      city: "Sao Paulo",
      customer_name: "Familia Arquibaldo",
    },
    {
      country: "Sweden",
      city: "Bracke",
      customer_name: "Folk och fa HB",
    },
    {
      country: "UK",
      city: "London",
      customer_name: "Consolidated Holdings",
    },
    {
      country: "Brazil",
      city: "Sao Paulo",
      customer_name: "Queen Cozinha",
    },
    {
      country: "Brazil",
      city: "Rio de Janeiro",
      customer_name: "Que Delicia",
    },
    {
      country: "USA",
      city: "Walla Walla",
      customer_name: "Lazy K Kountry Store",
    },
    {
      country: "USA",
      city: "Butte",
      customer_name: "The Cracker Box",
    },
    {
      country: "Germany",
      city: "Stuttgart",
      customer_name: "Die Wandernde Kuh",
    },
    {
      country: "Venezuela",
      city: "I. de Margarita",
      customer_name: "LINO-Delicateses",
    },
    {
      country: "USA",
      city: "Albuquerque",
      customer_name: "Rattlesnake Canyon Grocery",
    },
    {
      country: "Mexico",
      city: "Mexico D.F.",
      customer_name: "Centro comercial Moctezuma",
    },
    {
      country: "Portugal",
      city: "Lisboa",
      customer_name: "Furia Bacalhau e Frutos do Mar",
    },
    {
      country: "Italy",
      city: "Bergamo",
      customer_name: "Magazzini Alimentari Riuniti",
    },
    {
      country: "USA",
      city: "Anchorage",
      customer_name: "Old World Delicatessen",
    },
    {
      country: "UK",
      city: "London",
      customer_name: "Around the Horn",
    },
    {
      country: "USA",
      city: "San Francisco",
      customer_name: "Lets Stop N Shop",
    },
    {
      country: "Germany",
      city: "Aachen",
      customer_name: "Drachenblut Delikatessend",
    },
    {
      country: "Sweden",
      city: "Lulea",
      customer_name: "Berglunds snabbkop",
    },
    {
      country: "France",
      city: "Versailles",
      customer_name: "La corne dabondance",
    },
    {
      country: "UK",
      city: "London",
      customer_name: "Eastern Connection",
    },
    {
      country: "Spain",
      city: "Madrid",
      customer_name: "Romero y tomillo",
    },
    {
      country: "Germany",
      city: "Munster",
      customer_name: "Toms Spezialitaten",
    },
    {
      country: "France",
      city: "Paris",
      customer_name: "Specialites du monde",
    },
    {
      country: "UK",
      city: "London",
      customer_name: "Seven Seas Imports",
    },
    {
      country: "Poland",
      city: "Walla",
      customer_name: "Wolski",
    },
    {
      country: "Belgium",
      city: "Bruxelles",
      customer_name: "Maison Dewey",
    },
    {
      country: "Italy",
      city: "Reggio Emilia",
      customer_name: "Reggiani Caseifici",
    },
    {
      country: "Canada",
      city: "Tsawassen",
      customer_name: "Bottom-Dollar Marketse",
    },
    {
      country: "Norway",
      city: "Stavern",
      customer_name: "Sante Gourmet",
    },
    {
      country: "Denmark",
      city: "Arhus",
      customer_name: "Vaffeljernet",
    },
    {
      country: "France",
      city: "Nantes",
      customer_name: "France restauration",
    },
    {
      country: "Argentina",
      city: "Buenos Aires",
      customer_name: "Oceano Atlantico Ltda.",
    },
    {
      country: "France",
      city: "Nantes",
      customer_name: "Du monde entier",
    },
    {
      country: "Germany",
      city: "Cunewalde",
      customer_name: "QUICK-Stop",
    },
    {
      country: "Brazil",
      city: "Resende",
      customer_name: "Wellington Importadora",
    },
    {
      country: "Brazil",
      city: "Rio de Janeiro",
      customer_name: "Hanari Carnes",
    },
    {
      country: "UK",
      city: "London",
      customer_name: "Bs Beverages",
    },
    {
      country: "Germany",
      city: "Koln",
      customer_name: "Ottilies Kaseladen",
    },
    {
      country: "France",
      city: "Strasbourg",
      customer_name: "Blondel pere et fils",
    },
    {
      country: "Germany",
      city: "Brandenburg",
      customer_name: "Koniglich Essen",
    },
    {
      country: "Finland",
      city: "Oulu",
      customer_name: "Wartian Herkku",
    },
    {
      country: "Spain",
      city: "Sevilla",
      customer_name: "Godos Cocina Tipica",
    },
    {
      country: "Spain",
      city: "Madrid",
      customer_name: "FISSA Fabrica Inter. Salchichas S.A.",
    },
    {
      country: "USA",
      city: "Portland",
      customer_name: "Lonesome Pine Restaurant",
    },
    {
      country: "Mexico",
      city: "Mexico D.F.",
      customer_name: "Pericles Comidas clasicas",
    },
    {
      country: "UK",
      city: "London",
      customer_name: "North/South",
    },
    {
      country: "Argentina",
      city: "Buenos Aires",
      customer_name: "Rancho grande",
    },
    {
      country: "Brazil",
      city: "Campinas",
      customer_name: "Gourmet Lanchonetes",
    },
    {
      country: "France",
      city: "Lille",
      customer_name: "Folies gourmandes",
    },
    {
      country: "Venezuela",
      city: "Barquisimeto",
      customer_name: "LILA-Supermercado",
    },
    {
      country: "Portugal",
      city: "Lisboa",
      customer_name: "Princesa Isabel Vinhoss",
    },
    {
      country: "Denmark",
      city: "Kbenhavn",
      customer_name: "Simons bistro",
    },
    {
      country: "Belgium",
      city: "Charleroi",
      customer_name: "Supremes delices",
    },
    {
      country: "Germany",
      city: "Frankfurt a.M.",
      customer_name: "Lehmanns Marktstand",
    },
    {
      country: "Canada",
      city: "Vancouver",
      customer_name: "Laughing Bacchus Wine Cellars",
    },
    {
      country: "Switzerland",
      city: "Geneve",
      customer_name: "Richter Supermarkt",
    },
    {
      country: "USA",
      city: "Portland",
      customer_name: "The Big Cheese",
    },
    {
      country: "Finland",
      city: "Helsinki",
      customer_name: "Wilman Kala",
    },
    {
      country: "Germany",
      city: "Mannheim",
      customer_name: "Blauer See Delikatessen",
    },
    {
      country: "France",
      city: "Toulouse",
      customer_name: "La maison dAsie",
    },
    {
      country: "Mexico",
      city: "Mexico D.F.",
      customer_name: "Antonio Moreno Taqueria",
    },
    {
      country: "USA",
      city: "Eugene",
      customer_name: "Great Lakes Food Market",
    },
    {
      country: "USA",
      city: "Kirkland",
      customer_name: "Trails Head Gourmet Provisioners",
    },
    {
      country: "France",
      city: "Marseille",
      customer_name: "Bon app",
    },
    {
      country: "Canada",
      city: "Montreal",
      customer_name: "Mere Paillarde",
    },
    {
      country: "Ireland",
      city: "Cork",
      customer_name: "Hungry Owl All-Night Grocers",
    },
  ],
  groupBy:[
    {
        "country": "Austria",
        "max": 263.5,
        "min": 2.5
    },
    {
        "country": "Venezuela",
        "max": 123.79,
        "min": 9.2
    },
    {
        "country": "Germany",
        "max": 55,
        "min": 2.5
    },
    {
        "country": "Poland",
        "max": 13.25,
        "min": 12.5
    },
    {
        "country": "France",
        "max": 263.5,
        "min": 4.5
    },
    {
        "country": "Argentina",
        "max": 23.25,
        "min": 10
    },
    {
        "country": "Sweden",
        "max": 81,
        "min": 4.5
    },
    {
        "country": "Italy",
        "max": 55,
        "min": 4.5
    },
    {
        "country": "Spain",
        "max": 38,
        "min": 4.5
    },
    {
        "country": "Brazil",
        "max": 263.5,
        "min": 2.5
    },
    {
        "country": "UK",
        "max": 123.79,
        "min": 4.5
    },
    {
        "country": "Ireland",
        "max": 55,
        "min": 12.5
    },
    {
        "country": "Denmark",
        "max": 263.5,
        "min": 2.5
    },
    {
        "country": "Switzerland",
        "max": 55,
        "min": 4.5
    },
    {
        "country": "Belgium",
        "max": 81,
        "min": 2.5
    },
    {
        "country": "USA",
        "max": 263.5,
        "min": 2.5
    },
    {
        "country": "Portugal",
        "max": 55,
        "min": 4.5
    },
    {
        "country": "Finland",
        "max": 46,
        "min": 9.2
    },
    {
        "country": "Mexico",
        "max": 123.79,
        "min": 4.5
    },
    {
        "country": "Canada",
        "max": 263.5,
        "min": 2.5
    },
    {
        "country": "Norway",
        "max": 55,
        "min": 4.5
    }
]
};
