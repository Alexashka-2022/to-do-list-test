import TodoListItem from "./TodoListItem";

function TodoList({ listItems, onAddButtonClick, onDeleteButtonClick, onEditButtonClick, onFilterTasks }) {

    function handleChangeFilter(evt) {
        onFilterTasks(evt.target.value)
    }
    return (
        <section className="todolist">
            <div className="todolist__button-container">
                <button type='button' className="todolist__add-button" onClick={onAddButtonClick}></button>
                <select className="todolist__filter" onChange={handleChangeFilter}>
                    <option className="todolist__filter-item" value="filterReset">Без фильтров</option>
                    <option className="todolist__filter-item" value="filterComplete">Все выполненные</option>
                    <option className="todolist__filter-item" value="filterNoComplete">Все невыполненные</option>
                </select>
            </div>
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