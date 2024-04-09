import { useState } from "react";
import PopupWithForm from "./PopupWithForm";


function AddTaskPopup(props) {
    const [value, setValue] = useState("")

    function handleChange(evt) {
        setValue(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit(value)
        props.onClose();
    }

    return (
        <PopupWithForm
            title={props.title}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseByOverlay={props.onCloseByOverlay}
            onSubmit={handleSubmit}
            placeholderText={props.placeholderText}
            buttonText={props.buttonText}
        >
            <input className="popup__input" type="text" placeholder={props.placeholderText} onChange={handleChange} value={value || ""} required />
        </PopupWithForm>
    )
}

export default AddTaskPopup;