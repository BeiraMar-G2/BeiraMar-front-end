export function BotaoMenu(props) {
  return (
    <div onClick={(e) => props.onClick(e.target.value)} className="botaoMenu">
      <span className="textoBotao">{props.texto}</span>
      {props.imagem && (
        <img src={props.imagem} alt={props.texto} className="iconeBotao" />
      )}
    </div>
  )
}

export function Botao(props) {
  return (
    <div onClick={(e) => props.onClick(e.target.value)} className="botao">
      <button style={{backgroundColor: props.cor}} className="textoBotao">{props.texto}</button>
    </div>
  )
}
