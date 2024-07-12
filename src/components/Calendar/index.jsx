
import React, { useEffect, useState } from 'react';
import { events } from './events';
import { getMonthData } from './helpers';
import './style.css'; // We'll create this file for styling

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderCalendarView = () => {
    const monthData = getMonthData(currentDate);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekEnd = ['Sun', 'Sat']
    

    return (
      <div className="calendar-grid">
        {weekdays.map(day => <div key={day} className={`calendar-day-header ${weekEnd.includes(day) ? 'weekend-days' : ''}`}>{day}</div>)}
        {monthData.map((date, index) => (
          <div key={index} className={`calendar-day ${!date ? 'out-of-view-day' : ''}`}>
            {date && (
              <>
                <span className='date-of-day'>{date.getDate()}</span>
                <div className="events-wrapper">
                  {events?.filter(event => 
                    new Date(event.date_start_date).toDateString() === date.toDateString()
                  ).map((event, index) => (
                      <div className='event' style={{ top: index * 20, zIndx: index + 2}}>
                        <div className={`thumbnail`} style={{ background: `url(${event.event_img_image}) center`}} />
                        <div className="event-details">
                          <h2>{event.name_text}</h2>
                          <p>Doors: {formatDate(event.date_doorstime_date)}</p>
                          <p>Start: {formatDate(event.date_start_date)}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

const renderListView = () => {
  const monthEvents = events.slice(0, 2)?.filter(event => {
    return new Date(event.date_start_date).getMonth() === currentDate.getMonth() &&
    new Date(event.date_start_date).getFullYear() === currentDate.getFullYear()
  }).sort((a, b) => a.date - b.date);

  return (
    <div className="events-wrapper">
      {monthEvents.map(event => (
        <div className='event' key={event.id}>
          <div className={`thumbnail`} style={{ background: `url(${event.event_img_image}) center`}} />
            <div className="details">
              <h2>{event.name_text}</h2>
              <p>Doors: {formatDate(event.date_doorstime_date)}</p>
              <p>Start: {formatDate(event.date_start_date)}</p>
            </div>
          </div>
      ))}
    </div>
  );
};
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>Prev</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>Next</button>
      </div>
      {isMobile ? renderListView(currentDate) : renderCalendarView(currentDate)}
    </div>
  );
};

export default Calendar;

Calendar.defaultProps = {
  events: events
}