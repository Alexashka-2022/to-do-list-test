import { useDispatch } from 'react-redux';
import { deleteTask, changeStatus } from "../store/taskSlice";

function TodoListItem({ _id, task, isComplete, onEditButtonClick }) {
    const dispatch = useDispatch();

    function handleDeleteItem() {
        dispatch(deleteTask({ _id }))
    }

    function handleCompleteItem() {
        dispatch(changeStatus({ _id }))
    }

    function handleEditButtonClick() {
        onEditButtonClick({ _id, task, isComplete });
    }

    return (
        <li className="element">
            <p className={`element__text ${isComplete ? "element__text_complete" : ""}`}>{task}</p>
            <div className="element__button-container">
                <button type="button" className="element__edit-button" onClick={handleEditButtonClick}></button>
                <button type="button" className="element__complete-button" onClick={handleCompleteItem}></button>
                <button type="button" className="element__delete-button" onClick={handleDeleteItem}></button>
            </div>
        </li>
    )
}

export default TodoListItem;