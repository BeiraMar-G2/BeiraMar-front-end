export default function VisuAtendPorDia() {
  return (
    <div className="agenda">
      <h3>21 de Maio de 2025 - Quarta Feira</h3>

      <div className="consulta">
        <div className="hora destaque">11:30</div>
        <div className="info">
          <p><strong>Cliente:</strong> Gisele</p>
          <p><strong>Serviço:</strong> Massagem Modeladora</p>
          <div className="status">
            <span>✔ Consulta Realizada</span>
          </div>
        </div>
      </div>

      <div className="consulta">
        <div className="hora">14:40</div>
        <div className="info">
          <p><strong>Cliente:</strong> Roberta</p>
          <p><strong>Serviço:</strong> Design de Sobrancelha</p>
        </div>
      </div>

      <div className="consulta">
        <div className="hora">16:30</div>
        <div className="info">
          <p><strong>Cliente:</strong> Maria</p>
          <p><strong>Serviço:</strong> Drenagem</p>
        </div>
      </div>

      <div className="consulta">
        <div className="hora">17:30</div>
        <div className="info">
          <p><strong>Cliente:</strong> Cristina</p>
          <p><strong>Serviço:</strong> Massagem Modeladora</p>
        </div>
      </div>

      <div className="acoes">
        <button className="confirmar">Confirmar</button>
        <button className="cancelar">Cancelar</button>
      </div>
    </div>
  );
}
