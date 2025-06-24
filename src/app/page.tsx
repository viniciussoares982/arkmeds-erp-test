import Card from '@/components/Card';
import { Company, listCompanies } from '@/services/companyService';
import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';
import Link from 'next/link';
import styles from './page.module.css';
import ArrowLeftIcon from '@/components/UI/Icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/UI/Icons/ArrowRightIcon';
import Button from '@/components/Button';

type HomeProps = {
  searchParams?: {
    page?: string;
    q?: string
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const pageSize = 9;

  const currentPage = Math.max(
    1,
    Number.parseInt(searchParams?.page || '1', 10) || 1,
  );

  const allCompanies = await listCompanies();

  const query = (searchParams?.q ?? '').trim().toLowerCase();

  const filtered = query ? allCompanies.filter(({ cnpj, nome_fantasia, razao_social }: Company) => {
    const haystack = `${cnpj} ${nome_fantasia} ${razao_social}`.toLowerCase();
    return haystack.includes(query);
  })
    : allCompanies;

  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const currentCompanies = filtered.slice(start, start + pageSize);


  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>Rendimento Empresas</h1>
      <Form method='GET'
        className={styles['search__form']}
      >
        <Field.Root name="q" className={styles.Field}>
          <Field.Control
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Buscar por CNPJ ou Nome..."
            className={styles['search__input']}
          />
        </Field.Root>
        <Button type="submit" title='Buscar' >
          Submit
        </Button>
      </Form>
      <div className={styles.cards}>
        {currentCompanies.length ? (
          <div className={styles.cards}>
            {currentCompanies.map((empresa, index) => (
              <Card key={index} empresa={empresa} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>Nenhuma empresa encontrada.</p>
        )}
      </div>
      <nav className={styles.pagination}>
        <Link
          href={`/?page=${currentPage - 1}`}
          className={styles.pageLink}
          aria-disabled={currentPage === 1}
        >
          <ArrowLeftIcon color={currentPage === 1 ? '#9dbac0' : '#D99F00'} />
        </Link>

        <span className={styles.pageInfo}>
          Página {currentPage} de {totalPages}
        </span>

        <Link
          href={`/?page=${currentPage + 1}`}
          className={styles.pageLink}
          aria-disabled={currentPage === totalPages}
        >
          <ArrowRightIcon color={currentPage === totalPages ? '#9dbac0' : '#D99F00'} />
        </Link>
      </nav>
    </div>
  );
}
