import Card from "@/components/Card";
import { listCompanies } from "@/services/companyService";
import "./page.css";

export default async function Home() {
  const companies = await listCompanies();

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
