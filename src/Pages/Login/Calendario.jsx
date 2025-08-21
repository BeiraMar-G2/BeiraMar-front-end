import Calendar from "react-calendar";
import { useState } from "react";
import "../Styles/calendario.css";
import 'react-calendar/dist/Calendar.css';
import api from "../../Provider/api";
import { useEffect } from "react";
import { Header } from "../../Components/Header";
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from "../../Components/Fontes";

export function Calendario() {
    const [mesAtual, setMesAtual] = useState(null);
    const [diasAgendados, setDiasAgendados] = useState([]);

    function buscarInformacoes() {
        fetch("https://689ce666ce755fe697876044.mockapi.io/api/pessoas")
        .then((response)=>response.json())
        .then((json) => console.log(json))
    }

    function buscarAgendamentos() {
        api.get("/agendamentos")
        .then((response) => {
            const agendamentos = response.data.map(dataAgendamento =>
            dataAgendamento.dtHora.split("T")[0]
        );
        setDiasAgendados(agendamentos);
        console.log("Array novo:", agendamentos);
        }
        )
    }

    function salvarInformacoes() {
        fetch("https://689ce666ce755fe697876044.mockapi.io/api/pessoas",{
            method:"POST",
            'Content-type':'application/json',
            body:JSON.stringify({
                nome:"Pedro",
                endereco: "Rua Gasparino, 118",
                dataNascimento: "2003-08-19"
            })
        })
        .then((response)=>console.log(response.status))
    }

    function salvarAgendamentos() {
        api.post("/agendamentos",{
            nome:"Pedro",
            endereco: "Rua Gasparino, 118",
            dataNascimento: "2003-08-19"
        }).then((response)=>console.log(response.data))
    }

    useEffect(() => {
    buscarAgendamentos();
    }, []);

    return (
        <div className="agendamento-container">
            <Header alinhamento="flex-start" icone={<FaHouse size={28}/>} texto="Retornar ao Menu"/>

            <Subtitulo texto="Selecione o dia para vizualizar mais detalhes:" />

            <Titulo texto="Agendamentos"/>
            
            <Calendar 
            onActiveStartDateChange={({ activeStartDate, view }) => {
                  if (view === "month") {
                    const mes = activeStartDate.getMonth(); // Janeiro = 0
                    setMesAtual(mes);
                    console.log("Mês exibido:", mes + 1) // Exibe o mês atual (0 = Janeiro, 1 = Fevereiro, etc.)
                  }
            }}
            tileClassName={({ date, view }) => {
                if (view === "month") {
                    const dataFormatada = date.toISOString().split("T")[0]; // "YYYY-MM-DD"

                    if (diasAgendados.includes(dataFormatada)) {
                        return "dia-agendado";
                    } else if (date.getMonth() === mesAtual) {
                        return "dia-vago";
                    }
                }
            }}
            className={"calendario"}/>
        </div>
    );
}