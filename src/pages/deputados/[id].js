import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Panel from "@/components/panel/panel";
import InfoCardRounded from "@/components/apresentations/info-card-rounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faSitemap, faFlag, faBuilding, faChartPie, faCalendar, faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import CamaraPie from "@/components/charts/camara-pie";
import CamaraBar from "@/components/charts/camara-bar";

import DeputadoProposicoes from "@/components/deputado/DeputadoProposicoes";
import { deputadoExpenses } from "@/components/deputado/DeputadoExpenses";
import Events from "@/components/eventos/Events";
import DeputadoActivity from "@/components/deputado/DeputadoActivity";

const person = {
  name: 'Joao Paulo Constino',
  birthdate: '18/05/1992',
  email: 'joaopauloctga@gmail.com',
  address: 'Rua pedro vieira da silva',
  partido: 'PT',
  profilePhotoUrl: '123',
};

function DeputadoPage() {
  const router = useRouter();
  const { id } = router.query;
  const { expenses, loading } = deputadoExpenses(id);
  const [expenseByMonth, updateTotalExpenseByMonth] = useState(0);
  const [expenseByType, updateExpenseByType] = useState(0);
  const [dateEvent, updateDateEvent] = useState(new Date());
  const [eventsByDate, setEventsByDate] = useState([]);
  
  useEffect(() => {
    if (!loading) {
      updateTotalExpenseByMonth(expenses.reduce((result, expense) => {
        const { mes, valorDocumento } = expense;
        result[mes] = (result[mes] || 0) + parseFloat(valorDocumento);
        return result;
      }, {}));

      updateExpenseByType(expenses.reduce((result, expense) => {
        const { tipoDespesa, valorDocumento } = expense;
        result[tipoDespesa] = (result[tipoDespesa] || 0) + parseFloat(valorDocumento);
        return result;
      }, {}));
    }
  }, [loading])

  useEffect(() => {
    if (id == undefined) {
      return;
    }
    const data = [
      dateEvent.getFullYear(),
      (dateEvent.getMonth()+1).toString().padStart(2, '0'),
      dateEvent.getDate().toString().padStart(2, '0')
    ];
    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/eventos?dataInicio=${data.join('-')}&dataFim=${data.join('-')}`)
      .then((resp) => resp.json())
      .then(({dados}) => setEventsByDate(dados))
  }, [dateEvent, id])
  
  const { name, birthdate, email, address, partido, profilePhotoUrl } = person;

  return <>
    <div className="flex">
      <div className="w-1/2">
        <img
            className="h-48 w-full object-cover"
            src={profilePhotoUrl}
            alt={`${name}'s profile`}
          />
      </div>
      <div className="w-1/2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {name}
        </div>
        <p className="text-gray-500 text-sm">{`Birthdate: ${birthdate}`}</p>
        <p className="text-gray-500 text-sm">{`Email: ${email}`}</p>
        <p className="text-gray-500 text-sm">{`Address: ${address}`}</p>
        <p className="text-gray-500 text-sm">{`Partido: ${partido}`}</p>
      </div>
    </div>

    
    <Panel title={'Proposições'} icon={<FontAwesomeIcon icon={faBookOpen} />}>
      <div className="flex">
        <div className="w-1/5">
          <div className="flex flex-col justify-evenly h-full">
            <InfoCardRounded title={'Projetos de sua autoria'} value='20' color={'bg-blue-500'} />
            <InfoCardRounded title={'Aprovadas'} value='6' color={'bg-blue-500'} />
          </div>
        </div>
        <div className="w-4/5">
          <div className="flex flex-col rounded-sm border-1 border-solid p-2">
            <DeputadoProposicoes deputadoId={id} />
          </div>
        </div>
      </div>
    </Panel>

    <div className="m-8"></div>

    <Panel right title={'Atividade Parlamentar'} icon={<FontAwesomeIcon icon={faBookOpen} />}>
      <DeputadoActivity id={id} />
    </Panel>

    <div className="m-8"></div>

    <Panel title={'Despesas Parlamentares'} icon={<FontAwesomeIcon icon={faChartPie} />}>
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-1/2 p-4">
          <CamaraPie labels={Object.keys(expenseByType)} values={Object.values(expenseByType)} height={400} width={600} />
        </div>
        <div className="w-1/2 p-4">
          <CamaraBar labels={Object.keys(expenseByMonth)} values={Object.values(expenseByMonth)} height={400} width={600} />
        </div>
      </div>
    </Panel>

    <div className="m-8"></div>

    <Panel right title={'Eventos'} icon={<FontAwesomeIcon icon={faCalendar} />}>
      <Events events={eventsByDate} dateEvent={dateEvent} callbackDateChange={updateDateEvent} />
    </Panel>
  </>
}

export default DeputadoPage;