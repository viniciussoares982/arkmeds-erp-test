'use client'

import { Field } from '@base-ui-components/react/field';
import "./page.css";
import Button from '@/components/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { empresaSchema, EmpresaFormData } from "@/schemas/formEmpresasSchema";
import { useEffect, useState } from "react";
import { getCompanyByCnpj } from '@/services/cnpjService';
import { createCompany } from '@/services/companyService';
import { formatCEP } from '@/utils/formatCEP';
import { getAddressByCep } from '@/services/cepService';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema), mode: 'onBlur',
  });

  const [viaCepLoading, setViaCepLoading] = useState(false);
  const [arkLoading, setArkLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const cep = watch("cep");
  const cnpj = watch('cnpj');

  useEffect(() => {
    const rawCep = cep || '';
    if (rawCep.replace(/\D/g, '').length !== 8) return;

    (async () => {
      setViaCepLoading(true);
      try {
        const address = await getAddressByCep(rawCep);

        clearErrors('cep');
        setValue('logradouro', address.logradouro || '');
        setValue('municipio', address.localidade || '');
        setValue('estado', address.uf || '');
      } catch (err: unknown) {
        setError('cep', {
          message: getErrorMessage(err, 'Erro ao buscar CEP'),
        });
      } finally {
        setViaCepLoading(false);
      }
    })();
  }, [cep, setValue, setError, clearErrors]);

  useEffect(() => {
    const rawCnpj = cnpj || '';
    const digits = rawCnpj.replace(/\D/g, '');

    if (digits.length !== 14) return;

    const fetchCompany = async () => {
      setArkLoading(true);
      try {
        const company = await getCompanyByCnpj(rawCnpj);

        setValue('razaoSocial', company.razaoSocial || '');
        setValue('nomeFantasia', company.nomeFantasia || '');

        if (company.cep) {
          setValue('cep', formatCEP(company.cep));
          setValue('logradouro', company.logradouro || '');
          setValue('municipio', company.municipio || '');
          setValue('estado', company.uf || '');
          setValue('complemento', company.complemento || '');
          setValue('numero', +company.numero);
        }
      } catch (err: unknown) {
        setError('cnpj', {
          message: getErrorMessage(err, 'Erro ao buscar CNPJ'),
        });
      } finally {
        setArkLoading(false);
      }
    };

    fetchCompany();
  }, [cnpj, setValue, setError]);

  const onSubmit = async (data: EmpresaFormData) => {
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await createCompany({
        cnpj: data.cnpj,
        razaoSocial: data.razaoSocial,
        nomeFantasia: data.nomeFantasia,
        cep: data.cep,
        estado: data.estado,
        municipio: data.municipio,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
      });
      setSubmitSuccess(true);
      reset();
    } catch (err: unknown) {
      setSubmitError(getErrorMessage(err, 'Falha ao cadastrar empresa'));
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Cadastrar Empresa</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='forms-grid'>
        <div className='form__dados-container'>
          <span className='form__category-title'>DADOS</span>
          <Field.Root>
            <Field.Label className='form__label'>CNPJ</Field.Label>
            <Field.Control {...register("cnpj")} aria-busy={arkLoading} className='form__input' placeholder='As informações do seu CNPJ serão buscadas automaticamente' required />
            {errors.cnpj && <Field.Error className='form__error-message' match>
              {errors.cnpj.message}
            </Field.Error>}
          </Field.Root>
          <Field.Root>
            <Field.Label className='form__label'>Razão Social</Field.Label>
            <Field.Control {...register("razaoSocial")} className='form__input' required />
            {errors.razaoSocial && <Field.Error className='form__error-message' match>
              {errors.razaoSocial.message}
            </Field.Error>}
          </Field.Root>
          <Field.Root>
            <Field.Label className='form__label'>Nome Fantasia</Field.Label>
            <Field.Control {...register("nomeFantasia")} className='form__input' required />
            {errors.nomeFantasia && <Field.Error className='form__error-message' match>
              {errors.nomeFantasia.message}
            </Field.Error>}
          </Field.Root>
        </div>
        <div className='form__endereco-container'>
          <span className='form__category-title'>ENDEREÇO</span>
          <Field.Root>
            <Field.Label className='form__label'>CEP</Field.Label>
            <Field.Control {...register("cep")} aria-busy={viaCepLoading} className='form__input' placeholder='As informações do seu CEP serão buscadas automaticamente' required />
            {errors.cep && <Field.Error className='form__error-message' match>
              {errors.cep.message}
            </Field.Error>}
          </Field.Root>
          <Field.Root>
            <Field.Label className='form__label'>Estado</Field.Label>
            <Field.Control {...register("estado")} className='form__input' required />
            {errors.estado && <Field.Error className='form__error-message' match>
              {errors.estado.message}
            </Field.Error>}
          </Field.Root>
          <Field.Root>
            <Field.Label className='form__label'>Municipio</Field.Label>
            <Field.Control {...register("municipio")} className='form__input' required />
            {errors.municipio && <Field.Error className='form__error-message' match>
              {errors.municipio.message}
            </Field.Error>}
          </Field.Root>
          <Field.Root>
            <Field.Label className='form__label'>Logradouro</Field.Label>
            <Field.Control {...register("logradouro")} className='form__input' required />
            {errors.logradouro && <Field.Error className='form__error-message' match>
              {errors.logradouro.message}
            </Field.Error>}
          </Field.Root>
          <Field.Root>
            <Field.Label className='form__label'>Número</Field.Label>
            <Field.Control {...register("numero", { valueAsNumber: true })} className='form__input' required />
            {errors.numero && <Field.Error className='form__error-message' match>
              {errors.numero.message}
            </Field.Error>}
          </Field.Root>
          <Field.Root>
            <Field.Label className='form__label'>Complemento</Field.Label>
            <Field.Control {...register("complemento")} className='form__input' required />
            {errors.complemento && <Field.Error className='form__error-message' match>
              {errors.complemento.message}
            </Field.Error>}
          </Field.Root>
          {submitError && <div className="form__error-alert">
            <p className="form__error-message">{submitError}</p>
          </div>}
          {submitSuccess && <div className="form__success-alert">
            <p className="form__success-message">Empresa cadastrada com sucesso!</p>
          </div>}
          <Button type="submit" title='Enviar' />
        </div>
      </form>
    </div>
  );
}
