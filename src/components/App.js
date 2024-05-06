import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import TodoList from "./TodoList.js"
import AddTaskPopup from "./AddTaskPopup.js";
import EditTaskPopup from "./EditTaskPopup.js";
import { addTask, changeTask } from "../store/taskSlice.js";
import { changeFilter } from '../store/filterSlice.js'


function App() {
  /* состояния */
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editNewValue, setEditNewValue] = useState("");
  const [editTask, setEditTask] = useState({})

  const isOpen = (isAddPopupOpen || isEditPopupOpen);
  const dispatch = useDispatch();

  /* обработчик добавления задания*/
  function handleAddTask(taskValue) {
    if (taskValue === '') return

    dispatch(addTask({ taskValue }))
  }

  function handleAddPopupOpen() {
    setIsAddPopupOpen(true)
  }

  /* обработчик открытия попапа редактирования*/
  function handleEditPopupOpen(currentTask) {
    setIsEditPopupOpen(true)
    setIsEditMode(true)
    setEditTask(currentTask);
    setEditNewValue(currentTask.task)
  }

  function handleEditInputChange(event) {
    setEditNewValue(event.target.value)
  }

  /* обработчик редактирования задания*/
  function handleEditTask(editValue) {
    dispatch(changeTask({ _id: editTask._id, task: editValue }))
    setEditNewValue("")
    setIsEditMode(false)
  }

  /* обработчик фильтров*/
  function handleFilterTasks(selectedValue) {
    dispatch(changeFilter(selectedValue));
  }

  /* обработчик закрытия попапов*/
  function closeAllPopups() {
    setIsAddPopupOpen(false);
    setIsEditPopupOpen(false);
  }

  function closeAllPopupsByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }

  }, [isOpen]);

  return (
    <div className="app">
      <Header />
      <TodoList
        onAddButtonClick={handleAddPopupOpen}
        onEditButtonClick={handleEditPopupOpen}
        onFilterTasks={handleFilterTasks}
      />
      {isEditMode
        ? (<EditTaskPopup
          title='Редактирование задания'
          isOpen={isOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByOverlay}
          handleChange={handleEditInputChange}
          editNewValue={editNewValue}
          onSubmit={handleEditTask}
          placeholderText='Отредактируйте задание'
          buttonText='Сохранить'
        />

        ) : (
          <AddTaskPopup
            title='Новое задание'
            isOpen={isOpen}
            onClose={closeAllPopups}
            onCloseByOverlay={closeAllPopupsByOverlay}
            onSubmit={handleAddTask}
            placeholderText='Введите текст нового задания'
            buttonText='Добавить'
          />
        )}
    </div>
  );
}

export default App;
