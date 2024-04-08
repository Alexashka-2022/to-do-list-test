import TodoListItem from "./TodoListItem";


function TodoList({ listItems, onAddButtonClick, onDeleteButtonClick, onEditButtonClick }) {
    
    return (
        <section className="todolist">
        <button type='button' className="todolist__add-button" onClick={onAddButtonClick}></button>
        <ul className="todolist__elements">
            {listItems.map((item) => {
                return (
                    <TodoListItem
                        currentItem={item}
                        key={item._id}
                        onDeleteButtonClick={onDeleteButtonClick}
                        onEditButtonClick={onEditButtonClick}
                    />
    
                );
            })}
        </ul>
        </section>
    )
}

export default TodoList;