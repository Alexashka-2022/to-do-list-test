import { useState } from "react";

function PopupWithForm(props) {
   const [value, setValue] = useState("")

    function handleChange(evt) {
        setValue(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit(value)
        setValue("")
        props.onClose();
    }

    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={props.onCloseByOverlay}>
            <div className="popup__container">
                <button className={"popup__closed"} type="button" onClick={props.onClose} />
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={`popup-form`} onSubmit={handleSubmit}>
                    <input className="popup__input" type="text" placeholder={props.placeholderText} onChange={handleChange} value={value || ""}
                        minlength="5" maxlength="100" required />
                    <button className="popup__save-button" type="submit" >{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;