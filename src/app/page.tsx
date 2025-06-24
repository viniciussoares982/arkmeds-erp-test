import Card from "@/components/Card";
import { listCompanies } from "@/services/companyService";
import styles from "./page.module.css";

export default async function Home() {
  const companies = await listCompanies();

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>Rendimento Empresas</h1>
      <div className={styles.cards}>
        {companies.map((empresa, index) => (
          <Card key={index} empresa={empresa} />
        ))}
      </div>
    </div>
  );
}
