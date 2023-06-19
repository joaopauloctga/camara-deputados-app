import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown, faCircleChevronUp, faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

function DateItem({date, eventDate}) {
  const options = { weekday: 'short' };
  const dayOfWeek = date.toLocaleDateString('pt-BR', options);
  return <div className={`text-center p-2 ${date.getDate() == eventDate.getDate() ? 'bg-4-inverse border rounded-sm border-color-1' : 'bg-4 rounded-sm'}`}>
    <h4>{date.getDate()}</h4>
    <h4>{dayOfWeek}</h4>
  </div>
}

function PaginationDate({startDate, numDates, setDate}) {
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [dates, setDates] = useState([]);
  const [regenerate, setRegenerate] = useState(true);


  useEffect(() => {
    if (regenerate) {
      setDates(generateDates(selectedDate, numDates))
    }
    setDate(selectedDate)
  }, [selectedDate, numDates]);

  const handleDateSelection = (date) => {
    setRegenerate(false);
    setSelectedDate(date);
  };

  const decreaseStartDate = () => {
    const newStartDate = new Date(selectedDate);
    newStartDate.setDate(newStartDate.getDate() - 1);
    setRegenerate(true)
    setSelectedDate(newStartDate);
  };

  const increaseStartDate = () => {
    setRegenerate(true)
    const newStartDate = new Date(selectedDate);
    newStartDate.setDate(newStartDate.getDate() + 1);
    setSelectedDate(newStartDate);
  };
  
  return (
    <div className="text-center">
      <ul className="flex flex-row flex-grow justify-center items-center md:flex-col">
        <li className="p-1 t-primary t-icon-4 cursor-pointer hidden lg:block" onClick={decreaseStartDate}>
          <FontAwesomeIcon className="hidden lg:show" icon={faCircleChevronUp} />
        </li>
        <li className="p-1 t-primary t-icon-4 cursor-pointer xs:block md:hidden" onClick={decreaseStartDate}>
          <FontAwesomeIcon className="hidden md:show" icon={faCircleChevronLeft} />
        </li>
        {dates.map((date) => (
          <li
            key={date.toISOString()}
            onClick={() => handleDateSelection(date)}
            className={`m-2 cursor-pointer`}
          >
            <DateItem date={date} eventDate={selectedDate} />
          </li>
        ))}
        <li className="p-1 t-primary t-icon-4 cursor-pointer hidden lg:block" onClick={increaseStartDate}>
          <FontAwesomeIcon icon={faCircleChevronDown} />
        </li>
        <li className="p-1 t-primary t-icon-4 cursor-pointer xs:block md:hidden" onClick={increaseStartDate}>
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </li>
      </ul>
    </div>
  );
}

const generateDates = (startDate, numDates) => {
  const currentDate = new Date(startDate);
  const dates = [];

  for (let i = -numDates; i <= numDates; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  return dates;
};

export default PaginationDate;