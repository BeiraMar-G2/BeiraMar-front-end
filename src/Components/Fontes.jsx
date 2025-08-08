export function Titulo(props) {
    return(
    <span className="titulo">{props.texto}</span>
)
}

export function Label(props) {
    return(
    <label className="label">{props.texto}</label>
)
}

export function TituloHome(props) {
    return(
    <span style={{ color: props.cor}} className="titulo-home">{props.texto}</span>
    )
}

export function SubtituloHome(props) {
    return(
    <span style={{ color: props.cor}} className="subtitulo-home">{props.texto}</span>
    )
}