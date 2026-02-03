export function BotaoMenu(props) {
  return (
    <div onClick={(e) => props.onClick(e.target.value)} style={{background: props.funcao === "Cliente" ? "linear-gradient(180deg, #ce2d50a4 0%, #ffe7b7 100%)" :  "linear-gradient(180deg, #c0f7f7 0%, #ffe7b7 100%)"}} className="botaoMenu">
      <span className="textoBotao">{props.texto}</span>
      {props.imagem}
    </div>
  )
}

export function Botao(props) {
  return (
    <div onClick={(e) => props.onClick(e.target.value)} className="botao">
      <button style={{backgroundColor: props.cor}} className="textoBotao">{props.children ?? props.texto}</button>
    </div>
  )
}
