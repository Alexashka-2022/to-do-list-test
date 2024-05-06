import PopupWithForm from "./PopupWithForm";

function EditTaskPopup(props) {

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit(props.editNewValue);
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
            <input className="popup__input" type="text" placeholder={props.placeholderText} onChange={props.handleChange} value={props.editNewValue || ""} required />
        </PopupWithForm>
    )
}

export default EditTaskPopup;