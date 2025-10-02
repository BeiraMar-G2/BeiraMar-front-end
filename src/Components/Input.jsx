import React, { useRef, useEffect } from "react";
import IMask from "imask";

export function Input(props) {
    const tipo = props.valor;
    const inputRef = useRef(null);

    useEffect(() => {
        let mask;

        if (tipo === "telefone" && inputRef.current) {
            const maskOptions = {
                mask: "(00) 00000-0000",
                lazy: false,
            };

            mask = IMask(inputRef.current, maskOptions);

            // Define o valor inicial da máscara se props.value existir
            if (props.value) {
                mask.value = props.value;
            }

            mask.on("accept", () => {
                props.onChange(mask.value);
            });

            return () => mask.destroy();
        }
    }, [tipo, props.value]); // Adiciona props.value como dependência

    return (
        <div>
            {tipo === "telefone" ? (
                <input
                    ref={inputRef}
                    type={props.type}
                    placeholder={props.placeholder}
                />
            ) : (
                <input
                    value={props.value}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            )}
        </div>
    );
}

export function InputPesquisa(props) {
    return (
        <input
            value={props.value}
            className="input-pesquisa"
            style={{ fontStyle: "italic" }}
            type="text"
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(e)}
        />
    );
}