import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import styles from './Tasks.module.scss';

function Tasks() {
  const [taskText, setTaskText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem('todos');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });


  useEffect(() => {
    const savedTasks = JSON.stringify(taskList);
    localStorage.setItem('todos', savedTasks);
  }, [taskList]);


  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  }

  const addTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (taskText.trim() !== "") {
      setTaskList((prevTaskList: any) => [...prevTaskList, taskText]);
      setTaskText("");
    }
  }


  const deleteTask = (indexToDelete: number) => {
    setTaskList(taskList.filter((_: any, index: number) => index !== indexToDelete));
  }

  const handleItemClick = (index: number) => {
    if (highlightedIndex === index) {
      setHighlightedIndex(-1);
    } else {
      setHighlightedIndex(index);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <input
          className={styles.inputText}
          type="text"
          value={taskText}
          onChange={onInput}
          placeholder='What are you planning ?'
        />
        <button className={styles.addButton} onClick={addTask}>Add Task</button>
      </div>
      <ul className={styles.taskItems}>
        {taskList.map((task: string, index: number) =>
          <li 
            onClick={() => handleItemClick(index)}
            className={`${styles.taskItem} ${highlightedIndex === index ? styles.highlighted : ''}`}
            key={index}
          >
            {task}
            <button onClick={() => deleteTask(index)} className={styles.delButton}>Del</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Tasks;
