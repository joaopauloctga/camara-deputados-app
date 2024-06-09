import React from "react";
import useCamaraAPI, { fetchAPI } from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import PanelSeeMore from "@/components/panel-see-more/panel-see-more";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';

function ProposicaoTramitacoes({id}) {
  const {
    isLoading, result
  } = useCamaraAPI({
    url: `proposicoes/${id}/tramitacoes`,
  });

  if (isLoading) {
    return <LoadingAPI />
  }

  return <PanelSeeMore theme="green" maxHeight={500}>
    <VerticalTimeline animate={false}>
      {result.reverse().map((t,index) => {
        return <VerticalTimelineElement date={t.dataHora} key={`tramitacao-id-${index}`}>
          <h3 className="vertical-timeline-element-title t5">{t.descricaoTramitacao}</h3>
          <h4 className="vertical-timeline-element-subtitle text-sm t-black">{t.descricaoSituacao}</h4>
          <p style={{fontSize: '14px'}}>{t.despacho}</p>
        </VerticalTimelineElement>
      })}
    </VerticalTimeline>
  </PanelSeeMore>
}

export default ProposicaoTramitacoes;