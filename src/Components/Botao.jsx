export function BotaoMenu(props) {
    return(
        <div className='botaoMenu'>
            <span className='textoBotao'>
                {props.texto}
            </span>
        </div>
    )
}

export function Botao(props) {
  // Se o texto for "Voltar", aplica cor cinza
  const estiloBotao = props.texto === 'Voltar'
    ? {
        backgroundColor: '#ccc',
        color: '#000',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }
    : {
        backgroundColor: '#f8c7ccbb',
        color: '#000',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      };

  return (
    <div className="botao">
      <button className="textoBotao" style={estiloBotao}>
        {props.texto}
      </button>
    </div>
  );
}
