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
    return(
        <div className="botao">
            <button className="textoBotao">{props.texto}</button>
        </div>
    )
}