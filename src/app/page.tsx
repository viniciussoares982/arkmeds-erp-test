import Card from "@/components/Card";
import "./page.css";
import { listCompanies } from "@/services/companyService";

export default async function Home() {
  const companies = await listCompanies();
  console.log(companies);

  return (
    <div className="container">
      <h1 className="title">Rendimento Empresas</h1>
      <div className="cards">
        {companies.map((empresa, index) => (
          <Card key={index} empresa={empresa} />
        ))}
      </div>
    </div>
  );
}
