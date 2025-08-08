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
        if (tipo === "nome") {
            const nome = e.target.value;
            if (nome.length < 3) {
                console.error("Nome deve ter pelo menos 3 caracteres");
            }
            console.log("Nome validado")
        }
        else if (tipo === "email") {
            const email = e.target.value;
            if (!email.includes("@") || !email.includes(".")) {
                console.error("Email inválido");
            }
            console.log("Email validado")
        }
        else if (tipo === "telefone") {
            const telefone = e.target.value.replace(/\D/g, "");
            const regex = /^\d{10,11}$/;
            if (!regex.test(telefone)) {
                console.error("Telefone inválido");
            }
            console.log("Telefone validado")
        }
        else if (tipo === "senha") {
            const senha = e.target.value;
            if (senha.length < 6) {
                console.error("Senha deve ter pelo menos 6 caracteres");
            }
            console.log("Senha validada")
        } 
        else if (tipo === "confirmarSenha") {
            const senha = e.target.value;
            if (senha !== props.senha) {
                console.error("As senhas não coincidem");
            }
        }
        else if (tipo === null) {
            console.log("Para validação insira o VALOR do input")
        }
        else {
            console.error("Tipo de validação desconhecido/desnecessário");
        }
    }

    return (
        <div>
            {tipo === "telefone" ? (
                <input
                    ref={inputRef}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={validar}
                />
            ) : (
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={validar}
                />
            )}
        </div>
    );
}