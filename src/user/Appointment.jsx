import React ,{ useState, useEffect }from 'react';
import FullCalendar from '@fullcalendar/react'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import axios from 'axios'
import {useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';


function Appointment() {

    const [eventData,seteventData]=useState([]);
    const navigate=useNavigate();
    useEffect(() => {
             const token = localStorage.getItem('token');
            // Parse token to extract expiration time
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds
            const currentTime = Date.now();
            const timeUntilExpiry = expirationTime - currentTime;
            console.log("The time until expiry is"+timeUntilExpiry);
            const refreshTokenIfNeeded=()=>{           
                if (timeUntilExpiry <= 30000) {
                    const response = axios.post(
                        "https://hiring-test-task.vercel.app/api/refresh-token",
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                console.log("The token is refreshed with response:"+response)
                responseRefresh.then(response => {
                    console.log("Token refresh response:", response.data.newToken); // Log the entire response object
                    const newToken = response.data.newToken; // Using optional chaining to handle undefined data
                    localStorage.setItem('token', newToken);     
                }).catch(error => {
                    console.error("Failed to refresh token:", error);
                    navigate("/");
                });
            }
        }
        const fetchAppointments = async () => {         
          try {
            if(!token ) {
                //&& (Date.now()>expirationTime)
               // localStorage.removeItem('token');
                console.log("Token expired. Removed from local storage.");
                navigate("/");
            }else{
                const response = await axios.get('https://hiring-test-task.vercel.app/api/appointments', {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                      console.log(response.data);
                      seteventData(response.data);

            };

          } catch (error) {
            console.error("Failed to fetch appointments:", error);
          }
        };
        setTimeout(refreshTokenIfNeeded , timeUntilExpiry - 30000);
        fetchAppointments();
      }, []);

  // func to get the next occurrence of a specific weekday
  const getNextWeekday = (weekday) => {
    let today = moment();
    let nextWeekday = moment(today).day(weekday);   
    // If nextWeekday is same as current day
    if (nextWeekday.isSame(today, 'day')) {
        nextWeekday=today;
    } 
    // If nextWeekday is before today, add 7 days
    if (nextWeekday.isBefore(today, 'day')) {
        nextWeekday.add(7, 'days');
    }
    
    return nextWeekday;
};
  //Map over eventData
  const calendarEvents = Object.values(eventData).filter(event => typeof event === 'object').map((event) => {
    const start = getNextWeekday(event.weekDay).set({
      hour: moment(event.startTimeFormatted, 'h A').format('HH'),
      minute: 0,
    }); 
    const end = getNextWeekday(event.weekDay).set({
      hour: moment(event.endTimeFormatted, 'h A').add(1, 'hour').format('HH'),
      minute: 0,
    });
  
    return {
      title: `${event.name} (${event.reason})`, 
      start: start.toISOString(),
      end: end.toISOString(),
    };
  });

  return (
    <div>
      <Navbar />
      <div
        className="calendar-container"
        style={{
          margin: "50px",
        }}
      >
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          columnHeaderFormat={{ weekday: "long" }}
          slotDuration="0:30:00"
          slotLabelFormat={{ hour: "numeric", minute: "2-digit" }}
          businessHours={{
            startTime: `${eventData.MIN_HOUR}:00`,
            endTime: `${eventData.MAX_HOUR}:00`,
          }}
          events={calendarEvents}
        />
      </div>
    </div>
  );
}

export default Appointment;