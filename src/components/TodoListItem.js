import { useState } from "react";

function TodoListItem({ currentItem, onDeleteButtonClick, onEditButtonClick }) {

    const [isComplete, setIsComplete] = useState(false)

    function handleDeleteItem() {
        onDeleteButtonClick(currentItem)
    }

    function handleCompleteItem() {
        setIsComplete(true);
    }

    function handleEditButtonClick() {
        onEditButtonClick(currentItem);
    }

    return (
        <li className="element">
            <p className={isComplete ? "element__text_red" : "element__text"}>{currentItem.task}</p>
            <div className="element__button-container">
                <button type="button" className="element__edit-button" onClick={handleEditButtonClick}></button>
                <button type="button" className="element__complete-button" onClick={handleCompleteItem}></button>
                <button type="button" className="element__delete-button" onClick={handleDeleteItem}></button>
            </div>
        </li>
    )
}

export default TodoListItem;