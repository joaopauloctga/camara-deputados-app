import React from "react";
import theme from './deputado-profile.module.scss'
import Image from "next/image";
import ContentLabel from "@/components/content-label";
import { formatDate } from "@/utils/common";

const DeputadoProfile = ({ultimoStatus, nomeCivil, municipioNascimento, dataNascimento}) => {
  return <div className="flex border rounded-md p-4">
    <div className="mr-6">
      <Image src={ultimoStatus.urlFoto} alt={`Foto de perfil deputado ${nomeCivil}`} height={100} width={180} />
    </div>
    <div>
      <div>
        <ContentLabel label={'Nome completo'}>
          <h2 className="t3 t-primary">{nomeCivil}</h2>
        </ContentLabel>

        <ContentLabel label={'Nome eleitoral'}>
          <h3 className="t3 t-primary">{ultimoStatus.nomeEleitoral}</h3>
        </ContentLabel>

        <ContentLabel label={'Local / Nascimento'}>
          <p className="t-primary">{municipioNascimento} - {formatDate(dataNascimento)}</p>
        </ContentLabel>
      </div>
    </div>
  </div>
}

export default DeputadoProfile;