import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const ToDoItem = (props) => {
  //
  const { index, tarefa, checkTodoItem, deleteTodoItem } = props;

  return (
    <li className={tarefa.check === true ? "todo-item checked" : "todo-item"}>
      <div>
        <label className="check-wrapper">
          <input
            type="checkbox"
            name={index}
            onChange={() => checkTodoItem(index)}
            checked={tarefa.check}
          />
          <div className="checkmark">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </label>
      </div>
      <div className="todo-main-content">
        <span className="todo-text">{tarefa.text}</span>
        <ul className="tag-list">
          {tarefa.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <button
        className="delete-todo-item-btn"
        onClick={() => deleteTodoItem(index)}
      >
        <FontAwesomeIcon icon={faTimes} className="icon" />
      </button>
    </li>
  );
};

export default ToDoItem;
