import "../Pages/Styles/Modal.css"

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