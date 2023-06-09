import React, { useEffect, useState } from "react";
import Panel from "@/components/panel/panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faChartPie, faCalendar, faHandPointer } from "@fortawesome/free-solid-svg-icons";
import CamaraPie from "@/components/charts/camara-pie";
import CamaraBar from "@/components/charts/camara-bar";

import DeputadoProposicoes from "@/components/deputado/DeputadoProposicoes";
import { deputadoExpenses } from "@/components/deputado/DeputadoExpenses";
import Events from "@/components/eventos/Events";
import DeputadoActivity from "@/components/deputado/DeputadoActivity";
import DeputadoCurriculo from "@/components/deputado/DeputadoCurriculo";
import DeputadoProfile from "@/components/deputado/DeputadoProfile";
import DeputadoVotos from "@/components/deputado/DeputadoVotos";
import GoToLink from "@/components/goto-link";

export const getServerSideProps = async ({query}) => {
  const {id} = query;
  const data = await (await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`)).json();
  return {
    props: {
      deputado: {
        ...data.dados,
        ...data.dados.ultimoStatus
      }
    }
  }
}

function DeputadoPage({deputado}) {
  const id = deputado.id
  const { expenses, loading } = deputadoExpenses(id);
  const [expenseByMonth, updateTotalExpenseByMonth] = useState(0);
  const [expenseByType, updateExpenseByType] = useState(0);
  const [dateEvent, updateDateEvent] = useState(new Date());
  const [eventsByDate, setEventsByDate] = useState([]);
  
  // Expenses.
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
  }, [loading]);

  // Events
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

  return <>
    
    {id !== undefined && <DeputadoProfile deputado={deputado} />}

    <Panel id="proposicoes" title={'Proposições'} icon={<FontAwesomeIcon icon={faBookOpen} />}>
      <DeputadoProposicoes deputadoId={id} />
    </Panel>

    <div className="m-8"></div>

    <Panel id="depesas" right title={'Despesas Parlamentares'} icon={<FontAwesomeIcon icon={faChartPie} />}>
      <div className="flex flex-wrap items-center p-2 justify-center">
        <div className="w-full lg:w-1/2 p-4">
          <CamaraPie labels={Object.keys(expenseByType)} values={Object.values(expenseByType)} height={400} width={600} />
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <CamaraBar labels={Object.keys(expenseByMonth)} values={Object.values(expenseByMonth)} height={400} width={600} />
        </div>
      </div>
    </Panel>

    <div className="m-8"></div>

    <div id="curriculo">
      {id !== undefined && <DeputadoCurriculo id={id} />}
    </div>

    <div className="m-8"></div>

    <Panel id="eventos" title={'Eventos'} icon={<FontAwesomeIcon icon={faCalendar} />}>
      <Events events={eventsByDate} dateEvent={dateEvent} callbackDateChange={updateDateEvent} />
    </Panel>

    <div className="m-8"></div>
    
    <Panel right id="atividade" title={'Atividade Parlamentar'} icon={<FontAwesomeIcon icon={faBookOpen} />}>
      <DeputadoActivity id={id} />
    </Panel>

    <div className="m-8"></div>

    <Panel id="votos" title={'Votos'} icon={<FontAwesomeIcon icon={faHandPointer} />} >
      <DeputadoVotos id={id} />
    </Panel>
  </>
}

export default DeputadoPage;