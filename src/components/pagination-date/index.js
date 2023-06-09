import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

function DateItem({date, eventDate}) {
  const options = { weekday: 'short' };
  const dayOfWeek = date.toLocaleDateString('pt-BR', options);
  return <div className={`text-center ${date.getDate() == eventDate.getDate() ? 'bg-4-inverse' : 'bg-4'}`}>
    <h4>{date.getDate()}</h4>
    <h4>{dayOfWeek}</h4>
  </div>
}

function PaginationDate({startDate, numDates}) {
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [dates, setDates] = useState([]);
  const [regenerate, setRegenerate] = useState(true);


  useEffect(() => {
    if (regenerate) {
      setDates(generateDates(selectedDate, numDates))
    }
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
      <ul>
        <li className="p-1 t-primary t-icon-4 cursor-pointer" onClick={decreaseStartDate}><FontAwesomeIcon icon={faCircleChevronUp} /></li>
        {dates.map((date) => (
          <li
            key={date.toISOString()}
            onClick={() => handleDateSelection(date)}
            className={`p-1  cursor-pointer`}
          >
            <DateItem date={date} eventDate={selectedDate} />
          </li>
        ))}
        <li className="p-1 t-primary t-icon-4 cursor-pointer" onClick={increaseStartDate}><FontAwesomeIcon icon={faCircleChevronDown} /></li>
      </ul>
      {selectedDate.getDate()}
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