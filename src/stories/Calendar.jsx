import PropTypes from 'prop-types';
import React from 'react';
import Calendar from '../components/Calendar';
import './button.css';
/**
 * Primary UI component for user interaction
 */
export const CalendarComponent = ({ events }) => {
  return (
    <Calendar
      events={events}
    />
  );
};

CalendarComponent.propTypes = {
  events: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
  }),
};

