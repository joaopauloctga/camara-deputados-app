import React, { useEffect, useState } from "react";
import PaginationDate from "../pagination-date";
import Orgao from "../orgao/orgao";
import InfoCardTime from "../apresentations/info-card-time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark, faEnvelopeOpenText, faVideo, faSitemap, faClock } from "@fortawesome/free-solid-svg-icons";
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoId }) => {
  const opts = {
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    // Access the player instance if needed
    const player = event.target;
    console.log('Player ready:', player);
  };

  const onError = (event) => {
    console.error('YouTube video error:', event.target);
  };

  return (
    <YouTube videoId={videoId} opts={opts} onReady={onReady} onError={onError} />
  );
};

function Events({events, dateEvent, callbackDateChange}) {
  const [displayEvent, setDisplayEvent] = useState(0)
  const [resourceActive, setResourceActive] = useState('text');

  const mapResources = (event) => {
    const resources = [];
    if (event.descricao) {
      resources.push({
        name: 'Texto',
        icon: <FontAwesomeIcon icon={faEnvelopeOpenText} />,
        id: 'text',
      });
    }

    if (event?.orgaos.length > 0) {
      resources.push({
        name: 'Orgãos',
        icon: <FontAwesomeIcon icon={faSitemap} />,
        id: 'orgaos',
      })
    }

    if (event.urlRegistro) {
      resources.push({
        name: 'Vídeo',
        icon: <FontAwesomeIcon icon={faVideo} />,
        id: 'video',
      })
    }
    
    return resources;
  }

  const handlerChangeDate = (value) => {
    setDisplayEvent(0);
    setResourceActive('text')
    callbackDateChange(value);
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/12 p-4">
        <PaginationDate setDate={handlerChangeDate} startDate={dateEvent} numDates={2} />
      </div>
      {events.length ==0 && <>
        <div className="lg:w-11/12 flex flex-col justify-center items-center">
          <FontAwesomeIcon className="t-primary" style={{fontSize: '10rem'}} icon={faCalendarXmark} />
          <h3 className="t1 mb-2 t-primary"> Sem agenda</h3>
        </div>
      </>}
      {events.length > 0 && <>
        <div className="w-full lg:w-11/12 p-4">
          <div className="hidden lg:flex">
            {events.map((ev, index) => {
              const styleActive = ev.id === events[displayEvent].id ? 'bg-4-inverse rounded-sm border border-color-1' : '';
              return <div onClick={() => {setDisplayEvent(index); setResourceActive('text')}} className={`p-1 rounded-sm cursor-pointer mr-1 ${styleActive}`}>
                <h1 style={{fontSize: '12px'}}><FontAwesomeIcon icon={faClock} /> {ev.dataHoraInicio.slice(-5)}</h1>
              </div>
            })}
          </div>
          <select className="md:hidden form-select w-full" onChange={(e) => {setDisplayEvent(e.target.value); setResourceActive('text')}}>
            <option>Selecione um horário.</option>
            {events.map((ev, index) => <option value={index}>{ev.dataHoraInicio.slice(-5)}</option>)}
          </select>
          <div className="flex flex-wrap justify-between mt-4">
            <div className="w-full lg:w-1/6 lg:order-2">
              <ul className="flex flex-row flex-wrap justify-around lg:flex-col lg:ml-4 lg:justify-start">
                {mapResources(events[displayEvent]).map((resource) => {
                  return <li onClick={() => setResourceActive(resource.id)} className={`py-1 px-2 mb-3 text-center rounded-sm t-4 cursor-pointer ${resource.id == resourceActive ? 'bg-4-inverse border border-color-1' : 'bg-4'}`}>
                    <h3>{resource.icon}</h3>
                    {resource.name}
                  </li>
                })}
              </ul>
            </div>
            <div className="w-full lg:w-5/6 lg:order-1">
              {resourceActive == 'text' && <>
                <p className="bg-white p-4 rounded-sm border border-color-1">
                  {events[displayEvent].descricao}
                </p>
              </>
              }
              {resourceActive == 'video' && <YouTubeVideo videoId={events[displayEvent].urlRegistro.split('v=')[1]} />}
              {resourceActive == 'orgaos' && events[displayEvent].orgaos.map(org => <Orgao {...org} />)}
            </div>
          </div>
        </div>
      </>}
    </div>
  );
}

export default Events