import "../Pages/Styles/Modal.css"
import "../Pages/Styles/HelpModal.css";
import React, { useState } from "react";


function showAlert(id) {
  const alert = document.getElementById(id);
  alert.classList.add("show");

  setTimeout(() => {
    alert.classList.remove("show");
  }, 3000);
}

function hideAlert(id) {
  const alert = document.getElementById(id);
  alert.classList.remove("show");
}

export function Sucesso(props) {
    return(
        <div className={`alert-wrapper ${props.show ? "show" : ""}`} id="successAlert">
            <div className="modal-icon success">✔</div>
            <div className="alert-success">
              <div className="modal-content">
                <h4>Sucesso!</h4>
                <p>{props.texto}</p>
              </div>
              <button className="close-btn" onClick={props.onClose}>&times;</button>
            </div>
        </div>
    )
}

export function Erro(props) {
    return(
        <div className={`alert-wrapper ${props.show ? "show" : ""}`} id="errorAlert">
            <div className="modal-icon error">✖</div>
            <div className="alert-error">
              <div className="modal-content">
                <h4>Erro!</h4>
                <p>{props.texto}</p>
              </div>
              <button className="close-btn" onClick={props.onClose}>&times;</button>
            </div>
        </div>
    )
}

export function HelpModal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Ícone de dúvida */}
      <i
        className="fas fa-question-circle help-icon"
        onClick={toggleModal}
        title="Clique para mais informações"
      ></i>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div
            className="modal-content-duvida"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={toggleModal}>
              &times;
            </button>
            <h2>{props.local}</h2>
            <p>{props.explicacao}</p>
          </div>
        </div>
      )}
    </>
  );
}