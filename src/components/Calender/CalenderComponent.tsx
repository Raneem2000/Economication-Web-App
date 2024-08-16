import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './style.css';
import moment from 'moment';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarComponentProps {
  onDateChange: (date: string) => void; // Function to send the selected date
}

export function CalendarComponent({ onDateChange }: CalendarComponentProps) {
  // Initialize the calendar with the current date
  const [value, onChange] = useState<Value>(new Date());

  const customNavigationLabel = ({ date }: any) => {
    // Display month only without the year
    const month = moment(date).format('MMMM');
    return <span style={{ textAlign: 'center', width: '100%' }}>{month}</span>;
  };

  const formatShortWeekday = (locale: string, date: Date) => {
    // Display the first two letters of the weekday
    return moment(date).format('dd');
  };

  const customTileClassName = ({
    date,
    view,
    value,
  }: {
    date: Date;
    view: string;
    value: Date;
  }) => {
    // Apply custom class 'custom-selected-date' if the date is selected
    return moment(date).isSame(value, 'day') ? 'custom-selected-date' : '';
  };

  const handleDateChange = (date: Date | Date[]) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    onChange(date); // Update the state with the new date
    onDateChange(formattedDate); // Call onDateChange with the selected date
  };

  // useEffect to send the default date on component load
  useEffect(() => {
    const currentDate = moment(value).format('YYYY-MM-DD');
    onDateChange(currentDate);
  }, [onDateChange, value]);

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        navigationLabel={customNavigationLabel}
        next2Label={null}
        prev2Label={null}
        className="custom-calendar"
        formatShortWeekday={formatShortWeekday}
        tileClassName={({ date }) => customTileClassName({ date, value })}
      />
      <div className="end-border"></div>
    </div>
  );
}
