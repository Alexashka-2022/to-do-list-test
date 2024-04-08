import { useState, useEffect } from "react";
import Header from "./Header";
import TodoList from "./TodoList.js"
import PopupWithForm from "./PopupWithForm";
import { defaultTasks } from "../utils/constants.js";


function App() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleAddTask(taskValue) {
    if (taskValue === '') return

    const newTask = { _id: (tasks.length + 1), task: taskValue }

    setTasks([...tasks, newTask])
  }

  function handlePopupOpen() {
    setIsPopupOpen(true)
  }

  function handleDeleteTask(currentTask) {
    setTasks((taskList) => taskList.filter((i) => i._id !== currentTask._id))
  }

  function handleEditTask(editTask) {
    console.log(editTask)
  }

  function closeAllPopups() {
    setIsPopupOpen(false)
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

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }

  }, [isPopupOpen]);

  return (
    <div className="app">
      <Header />
      <TodoList
        listItems={tasks}
        onAddButtonClick={handlePopupOpen}
        onDeleteButtonClick={handleDeleteTask}
        onEditButtonClick={handleEditTask}
      />
        <PopupWithForm
        title='Новое задание'
        isOpen={isPopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closeAllPopupsByOverlay}
        onSubmit={handleAddTask}
        placeholderText = 'Введите текст нового задания'
        buttonText='Добавить'
      />
    </div>
  );
}

export default App;
