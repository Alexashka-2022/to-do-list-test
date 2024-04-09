import { useState, useEffect } from "react";
import Header from "./Header";
import TodoList from "./TodoList.js"
import AddTaskPopup from "./AddTaskPopup.js";
import EditTaskPopup from "./EditTaskPopup.js";
import { defaultTasks } from "../utils/constants.js";


function App() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editNewValue, setEditNewValue] = useState("");
  const [editTask, setEditTask] = useState({})

  const isOpen = (isAddPopupOpen || isEditPopupOpen);

  function handleAddTask(taskValue) {
    if (taskValue === '') return

    const newTask = { _id: (tasks.length + 1), task: taskValue }

    setTasks([...tasks, newTask])
  }

  function handleAddPopupOpen() {
    setIsAddPopupOpen(true)
  }

  function handleEditPopupOpen(currentTask) {
    setIsEditPopupOpen(true)
    setIsEditMode(true)
    setEditTask(currentTask)
  }

  function handleDeleteTask(currentTask) {
    setTasks((taskList) => taskList.filter((i) => i._id !== currentTask._id))
  }

  function handleEditInputChange(event) {
    setEditNewValue(event.target.value)
  }

  function handleEditTask(editValue) {
    const updatedTasks = [...tasks].filter((task) => task._id !== editTask._id)
    const newTask = { _id: editTask._id, task: editValue }
    setTasks([newTask, ...updatedTasks])
    setEditNewValue("")
    setIsEditMode(false)
  }

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
        listItems={tasks}
        onAddButtonClick={handleAddPopupOpen}
        onDeleteButtonClick={handleDeleteTask}
        onEditButtonClick={handleEditPopupOpen}
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
