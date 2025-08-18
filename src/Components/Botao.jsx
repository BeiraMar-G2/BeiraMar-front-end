export function BotaoMenu(props) {
  return (
    <div className="botaoMenu">
      <span className="textoBotao">{props.texto}</span>
      {props.imagem && (
        <img src={props.imagem} alt={props.texto} className="iconeBotao" />
      )}
    </div>
  )
}

export function Botao(props) {
  return (
    <div className="botao">
      <button className="textoBotao">{props.texto}</button>
    </div>
  )
}
