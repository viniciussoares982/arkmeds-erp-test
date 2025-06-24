'use client'

import React from 'react'
import Button from "../Button";
import CardDialog from "../CardDialog";
import BusinessCenterIcon from "../UI/Icons/BusinessCenterIcon";
import LocationOnIcon from "../UI/Icons/LocationOnIcon";
import { Company } from '@/services/companyService';
import styles from './styles.module.css'

interface CompanyCardProps {
  empresa: Company
  onViewRevenue?: () => void;
}

export default function CompanyCard({
  empresa
}: CompanyCardProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { razao_social, nome_fantasia, municipio, estado } = empresa;

  return (
    <>
      <CardDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} dadosEmpresa={empresa} />
      <div className={styles.card}>
        <div className={styles['card__header']}>
          <div className={styles['card__icon']}>
            <BusinessCenterIcon />
          </div>
          <div>
            <h2 className={styles['card__title']}>{nome_fantasia}</h2>
            <p className={styles['card__subtitle']}>{razao_social}</p>
          </div>
        </div>

        <hr className={styles['card__divider']} />

        <section className={styles['card__location']}>
          <LocationOnIcon />
          <span>{municipio}</span>
          {estado && <span>{estado}</span>}
        </section>

        <Button title="Visualizar rendimento atual" onClick={() => setDialogOpen(true)} />
      </div>
    </>
  );
}
