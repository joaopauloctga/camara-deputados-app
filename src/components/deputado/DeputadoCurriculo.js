import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { faIdCardClip, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import 'react-vertical-timeline-component/style.min.css';


async function getData(path) {
  const resp = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${path}`);
  const {dados} = await resp.json();
  return dados;
}

function DeputadoCurriculo({id}) {
  const [timelineItems, setTimelineItems] = useState([]);
  useEffect(() => {
    if (id == undefined) {
      return;
    }
    const fetchData = async () => {
      const ocupacoes = await getData(`${id}/ocupacoes`);
      const professions = await getData(`${id}/profissoes`);
      const mapData = []
        .concat(ocupacoes)
        .concat(professions)
        .filter(item => item?.anoInicio != null || item?.dataHora != null)
        .map((item) => {
          const date = item?.anoInicio != undefined
            ? item.anoInicio
            : item.dataHora.slice(0,4)
          const desc = item?.entidade != undefined
            ? `Autuou como ${item.titulo} na entidade ${item.entidade} no estado ${item.entidadeUF}`
            : `Deputado ja atuou na profissão de ${item.titulo}`

          return {
            title: item.titulo,
            desc,
            date: parseInt(date),
            icon: item.entidade !== undefined ? faAddressCard : faIdCardClip
          }
        })
        .sort((current, last) => {
          return current.date - last.date
        })
        .reverse();
      setTimelineItems(mapData);
    }

    fetchData();
  }, [id]);
  
  return <VerticalTimeline lineColor="#A4D2AB">
    {timelineItems.map((item, index) => {
      const primaryColor = index % 2 ==0 ? '#5270BE' : '#A4D2AB';
      return <VerticalTimelineElement
        key={`deputado-timeline-${index}`}
        date={item.date}
        icon={<FontAwesomeIcon className="t-primary" icon={item.icon}/>}
        contentStyle={{ border: `2px solid ${primaryColor}`, color: primaryColor }}
        contentArrowStyle={{ borderRight: `7px solid ${primaryColor}` }}
        iconStyle={{ background: '#fff',  }}
      >
        <h3 className="vertical-timeline-element-title t3">{item.title}</h3>
        <h4 className="vertical-timeline-element-subtitle t-black">{item.desc}</h4>
      </VerticalTimelineElement>
    })}
  </VerticalTimeline>
}

export default DeputadoCurriculo;