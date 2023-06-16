import InfoCardRounded from "./info-card-rounded";
import InfoCarList from "./info-card-list";
import InfoCardTime from "./info-card-time";
import InfoCardTitle from "./info-card-title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

const CardAvailables = () => {
  return <div className="">
    <InfoCarList smTitle="Info Card" text="Info card list for example" subText="some of description here" />
    <hr className="mb-4" />
    <InfoCardTime time="08:30" title="Card time title" description="Some description here" onClick={() => alert('Card time event')} />
    <hr className="mb-4" />
    <InfoCardTime time="08:30" title="Card time title active" description="Some description here active" active={true} onClick={() => alert('Card time event')} />
    <hr className="mb-4" />
    <InfoCardTitle title="Card title" icon={faCalculator} active onClick={() => alert('click card title')} />
    <hr className="mb-4" />
    <InfoCardTitle title="Card title active" icon={faCalculator} onClick={() => alert('click card title')} />
  </div>
}

export default {
  component: <CardAvailables />
}

export const AllCards = {
  render: () => <CardAvailables />
}