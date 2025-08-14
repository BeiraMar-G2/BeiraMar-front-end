import Calendar from "react-calendar";
import { useState } from "react";
import "../Styles/calendario.css";
import 'react-calendar/dist/Calendar.css';
import api from "../../provider/api";

export function Calendario() {
    const [mesAtual, setMesAtual] = useState(null);

    function buscarInformacoes() {
        fetch("https://689ce666ce755fe697876044.mockapi.io/api/pessoas")
        .then((response)=>response.json())
        .then((json) => console.log(json))
    }

    function buscarAgendamentos() {
        api.get("/agendamentos")
        .then((response) => console.log(response.data))
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

    return (
        <div onLoad={buscarAgendamentos} className="calendario">
            <h1>Calendário</h1>
            <Calendar 
            onActiveStartDateChange={({ activeStartDate, view }) => {
                  if (view === "month") {
                    const mes = activeStartDate.getMonth(); // Janeiro = 0
                    setMesAtual(mes);
                    console.log("Mês exibido:", mes + 1) // Exibe o mês atual (0 = Janeiro, 1 = Fevereiro, etc.)
                  }
            }}
            tileClassName={({ date, view }) => {
                if (view === "month" && date.toDateString() === "1") { // Verifica se a data é igual ao valor retornado dos agendamentos MUDAR DIAESPECIAL POR DATA DO BANCO
                  return "dia-agendado";
                } else if (view === "month" && date.getMonth() === mesAtual) { // Verifica se é domingo
                  return "dia-vago";
                }
            }}
            className={"calendario"}/>


            <button onClick={buscarInformacoesAxios}>EXIBIR</button>
            <button onClick={salvarInformacoes}>SALVAR</button>
        </div>
    );
}