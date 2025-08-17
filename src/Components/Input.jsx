import React, { useRef, useEffect } from "react";
import IMask from "imask";

export function Input(props) {
    const tipo = props.valor;
    const inputRef = useRef(null);

    useEffect(() => {
        if (tipo === "telefone" && inputRef.current) {
            const maskOptions = {
                mask: "(00) 00000-0000"
            };
            const mask = IMask(inputRef.current, maskOptions);
            return () => mask.destroy();
        }
    }, [tipo]);

    function validar(e) {
        const valor = e.target.value;

        if (tipo === "nome") {
            if (valor.length < 3) {
                console.error("Nome deve ter pelo menos 3 caracteres");
            }
        } else if (tipo === "email") {
            if (!valor.includes("@") || !valor.includes(".")) {
                console.error("Email inválido");
            }
        } else if (tipo === "telefone") {
            const telefone = valor.replace(/\D/g, "");
            const regex = /^\d{10,11}$/;
            if (!regex.test(telefone)) {
                console.error("Telefone inválido");
            }
        } else if (tipo === "senha") {
            if (valor.length < 6) {
                console.error("Senha deve ter pelo menos 6 caracteres");
            }
        } else if (tipo === "confirmarSenha") {
            if (valor !== props.senha) {
                console.error("As senhas não coincidem");
            }
        } else if (tipo === null) {
            console.log("Para validação insira o VALOR do input");
        } else {
            console.error("Tipo de validação desconhecido/desnecessário");
        }
    }

    return (
        <div>
            <input
                ref={tipo === "telefone" ? inputRef : null}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    validar(e);
                    props.onChange && props.onChange(e); // Passa o evento completo
                }}
                className={props.className}
            />
        </div>
    );
}
