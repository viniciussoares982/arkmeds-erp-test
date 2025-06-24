import * as React from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import Button from '../Button';
import BusinessCenterIcon from '../UI/Icons/BusinessCenterIcon';
import LocationOnIcon from '../UI/Icons/LocationOnIcon';
import { Company, getCompanyYield } from '@/services/companyService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import './styles.css';

type CardDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (state: boolean) => void;
  dadosEmpresa: Company
}

const CardDialog = ({ dialogOpen, setDialogOpen, dadosEmpresa }: CardDialogProps) => {
  const { razao_social, nome_fantasia, municipio, estado, cnpj } = dadosEmpresa

  const [yieldValue, setYieldValue] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!dialogOpen) return;

    const fetchYield = async () => {
      setLoading(true);
      setError(null);

      try {
        const { valor_rendimento } = await getCompanyYield(cnpj);
        setYieldValue(valor_rendimento);
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Erro ao buscar rendimento'));
      } finally {
        setLoading(false);
      }
    };

    fetchYield();
  }, [dialogOpen]);

  const formatBRL = (v: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(v);

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className='backdrop' />
        <Dialog.Popup className='dialog'>
          <div className="dialog__header">
            <div className="dialog__icon">
              <BusinessCenterIcon />
            </div>
            <div>
              <Dialog.Title className='dialog__title'>{nome_fantasia}</Dialog.Title>
              <Dialog.Description className='dialog__subtitle'>
                {razao_social}
              </Dialog.Description>
            </div>
          </div>
          <hr className="dialog__divider" />
          <section className="dialog__location">
            <LocationOnIcon />
            <span>{municipio}</span>
            <span>{estado}</span>
          </section>
          <span className='dialog__cnpj'><strong>CNPJ:</strong> {cnpj}</span>
          <hr className="dialog__divider" />
          <div className="dialog__current-yield">
            {loading ? (
              <span className="current-yield__loading">Carregando...</span>
            ) : error ? (
              <span className="current-yield__error">{error}</span>
            ) : yieldValue !== null ? (
              <>
                <span className="current-yield__numbers">
                  {formatBRL(yieldValue)}
                </span>
                <span className="current-yield__title">Rendimento Atual</span>
              </>
            ) : (
              <span className="current-yield__numbers">—</span>
            )}
          </div>
          <Button title='Fechar' onClick={() => setDialogOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root >
  );
}

export default CardDialog
