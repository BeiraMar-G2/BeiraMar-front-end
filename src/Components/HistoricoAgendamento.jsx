export default function HistoricoAgendamento() {
  return (
    <div className="agendamentos">
      {/* Primeiro agendamento */}
      <h3>14 de Maio de 2025 - Quarta Feira</h3>
      <div className="agendamento">
        <div className="hora">16:20</div>
        <div className="info">
          <p><strong>Serviço:</strong> Design de Sobrancelha</p>
          <p><strong>Preço:</strong> R$ 20,00</p>
          <button className="status cancelado">Cancelado</button>
        </div>
      </div>

      {/* Segundo agendamento */}
      <h3>15 de Maio de 2025 - Quinta Feira</h3>
      <div className="agendamento">
        <div className="hora">11:00</div>
        <div className="info">
          <p><strong>Serviço:</strong> Massagem Modeladora</p>
          <p><strong>Preço:</strong> R$ 80,00</p>
          <button className="status concluido">Concluído</button>
        </div>
      </div>

      {/* Mensagem final */}
      <p className="mensagem-final">
        <em>Sem mais agendamentos... <br/> Faça sua reserva hoje!</em>
      </p>
    </div>
  );
}
