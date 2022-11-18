import dayjs from 'dayjs';
import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppoints from '../AvailableAppoints/AvailableAppoints';

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  return (
    <div>
      <header>
        <AppointmentBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <AvailableAppoints selectedDate={selectedDate} />
      </header>
    </div>
  );
};

export default Appointment;