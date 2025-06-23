'use client'

import React from 'react'
import Button from "../Button";
import CardDialog from "../CardDialog";
import BusinessCenterIcon from "../UI/Icons/BusinessCenterIcon";
import LocationOnIcon from "../UI/Icons/LocationOnIcon";
import './styles.css'
import { Company } from '@/services/companyService';

interface CompanyCardProps {
  empresa: Company
  onViewRevenue?: () => void;
}

export default function CompanyCard({
  empresa
}: CompanyCardProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { razao_social, nome_fantasia, municipio, estado } = empresa

  return (
    <>
      <CardDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} dadosEmpresa={empresa} />
      <div className="card">
        <div className="card__header">
          <div className="card__icon">
            <BusinessCenterIcon />
          </div>
          <div>
            <h2 className="card__title">{nome_fantasia}</h2>
            <p className="card__subtitle">{razao_social}</p>
          </div>
        </div>
        <hr className="card__divider" />
        <section className="card__location">
          <LocationOnIcon />
          <span>{municipio}</span>
          {estado && <span>{estado}</span>}
        </section>
        <Button title="Visualizar rendimento atual" onClick={() => setDialogOpen(true)} />
      </div>
    </>
  );
}
