import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Panel from "@/components/panel/panel";
import InfoCardRounded from "@/components/apresentations/info-card-rounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faSitemap, faFlag, faBuilding, faChartPie, faCalendar, faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import InfoCardTitle from "@/components/apresentations/info-card-title";
import InfoCarList from "@/components/apresentations/info-card-list";
import CamaraPie from "@/components/charts/camara-pie";
import CamaraBar from "@/components/charts/camara-bar";
import PaginationDate from "@/components/pagination-date";
import InfoCardTime from "@/components/apresentations/info-card-time";
import DeputadoProposicoes from "@/components/deputado/DeputadoProposicoes";
import { deputadoExpenses } from "@/components/deputado/DeputadoExpenses";

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
  const [activityDisplayId, setActivityDisplayId] = useState(1);
  const [orgaos, setOrgaos] = useState([]);
  const [ocupacoes, setOcupacoes] = useState([]);
  const [frentes, setFrentes] = useState([]);
  const { expenses, loading } = deputadoExpenses(id);
  const [expenseByMonth, updateTotalExpenseByMonth] = useState(0);
  const [expenseByType, updateExpenseByType] = useState(0);
  const [dateEvent, updateDateEvent] = useState(new Date);
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
  }, [dateEvent])
  

  const { name, birthdate, email, address, partido, profilePhotoUrl } = person;


  useEffect(() => {
    if (id == undefined) {
      return;
    }

    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/orgaos`)
      .then(resp => resp.json())
      .then(({dados}) => setOrgaos(dados))

    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/ocupacoes`)
      .then(resp => resp.json())
      .then(({dados}) => setOcupacoes(dados))

      fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/frentes`)
        .then(resp => resp.json())
        .then(({dados}) => setFrentes(dados))

  }, [id]);

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
      <div className="flex flex-wrap justify-center items-center p-2">
        <div className="w-1/3">
          <InfoCardTitle active={activityDisplayId == 1} onClick={() => setActivityDisplayId(1)} title={'Orgãos Atuantes'} icon={faSitemap} />
        </div>
        <div className="w-1/3">
          <InfoCardTitle active={activityDisplayId == 2}  onClick={() => setActivityDisplayId(2)} title={'Ocupações'} icon={faBuilding} />
        </div>
        <div className="w-1/3">
          <InfoCardTitle active={activityDisplayId == 3}  onClick={() => setActivityDisplayId(3)} title={'Frentes'} icon={faFlag} />
        </div>
      </div>
      <div className="rounded-lg bg-white m-6 grid grid-gap-4 grid-cols-2 grid-rows-2">
        {activityDisplayId == 1 && orgaos.map((orgao) => {
          return <div className="p-4">
            <InfoCarList 
              text={orgao.nomeOrgao}
              smTitle={orgao.siglaOrgao}
              subText={`${orgao.dataInicio} - ${orgao.titulo}`} />
          </div>
        })}

        {activityDisplayId == 2 && ocupacoes.map((ocupacao) => {
          return <div className="p-4">
            <InfoCarList 
              text={ocupacao.titulo}
              smTitle={`${ocupacao.entidade} - ${ocupacao.entidadeUF}`}
              subText={`${ocupacao.anoInicio}`} />
          </div>
        })}

        {activityDisplayId == 3 && frentes.map((frente) => {
          return <div className="p-4">
            <InfoCarList 
              text={frente.titulo} />
          </div>
        })}
      </div>
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
      <div className="flex">
        <div className="w-1/12 p-4">
          <PaginationDate setDate={updateDateEvent} startDate={dateEvent} numDates={2} />
        </div>
        {eventsByDate.length ==0 && <>
          <div className="w-11/12 flex justify-center items-stretch  content-center items-center h-full">
            <div className="bg-4 p-4 rounded-md text-center">
              <FontAwesomeIcon style={{fontSize: '12rem'}} icon={faCalendarXmark} />
              <h3 className="t1 mb-2"> Sem agenda</h3>
            </div>
          </div>
        </>}
        {eventsByDate.length > 0 && <>
          <div className="w-10/12 p-4">
            <div className="grid grid-cols-3 gap-3">
              {eventsByDate.map((ev) => <InfoCardTime time={ev.dataHoraInicio.slice(-5)} title={ev.descricaoTipo} description={ev.localCamara.nome}/>)}
            </div>
            <p className="p-4 mt-4 bg-white rounded-md">
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.

              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
            </p>
          </div>
          <div className="w-1/12 p-4">Resources</div>
        </>}
      </div>
    </Panel>
  </>
}

export default DeputadoPage;