import Calendar from "react-calendar";
import "../Styles/calendario.css";
import 'react-calendar/dist/Calendar.css';

export function Calendario() {
    return (
        <div className="calendario">
            <h1>Calendário</h1>
            <Calendar className={"calendario"}/>
        </div>
    );
}