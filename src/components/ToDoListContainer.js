import { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faUndo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/ToDoListContainer.css";

const ToDoListContainer = () => {
  //
  // data
  //

  const [tarefaAtual, setTarefaAtual] = useState({
    id: null,
    text: "",
    check: false,
  });

  const getTarefasFromLocalStorage = () =>
    JSON.parse(localStorage.getItem("todo-app-tarefas")) || [
      {
        id: 0,
        text: "Esta é uma tarefa teste",
        check: false,
        tags: ["com", "algumas", "tags"],
      },
      // {
      //   id: 1,
      //   text: "Tarefa teste 2",
      //   check: true,
      //   tags: [],
      // },
      // {
      //   id: 2,
      //   text: "Tarefa teste 3",
      //   check: true,
      //   tags: ["agora", "com", "tags"],
      // },
    ];

  const [tarefas, setTarefas] = useState(getTarefasFromLocalStorage);

  const tarefasCompletas = tarefas.filter((tarefa) => tarefa.check).length;

  useEffect(() => {
    localStorage.setItem("todo-app-tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  //
  // help
  //

  const setIds = () => {
    setTarefas((prevTarefas) => {
      return prevTarefas.map((tarefa, index) => ({
        ...tarefa,
        id: index,
      }));
    });
  };

  const atualizarTarefaAtual = (event) => {
    setTarefaAtual({
      ...tarefaAtual,
      text: event.target.value,
    });
  };

  const getTextAndTags = (string, char) => {
    let newStringArray = string.trim().split(" ");
    let tagsArray = newStringArray
      .filter((word) => word[0] === char && word.length > 1)
      .map((tag) => tag.substring(1));
    return {
      text: newStringArray.filter((word) => word[0] !== char).join(" "),
      tags: tagsArray,
    };
  };

  //
  // main form actions
  //

  const adicionarTarefa = (event) => {
    event.preventDefault();
    if (!tarefaAtual.text) return;
    const textAndTags = getTextAndTags(tarefaAtual.text, "#");
    const tempTarefa = {
      ...tarefaAtual,
      text: textAndTags.text,
      tags: textAndTags.tags,
    };
    if (!tempTarefa.text) return alert("Sem texto? 😑");
    setTarefas((prevTarefas) => [...prevTarefas, tempTarefa]);
    setIds();
    setTarefaAtual({ id: null, text: "", check: false, tags: [] });
  };

  const handleKeyDown = (event) => {
    if (event.key === "enter") adicionarTarefa();
  };

  //
  // todo item actions
  //

  const checkTodoItem = (id) => {
    const listaTarefasTemporaria = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, check: !tarefa.check } : tarefa
    );
    setTarefas(listaTarefasTemporaria);
  };

  const deleteTodoItem = (id) => {
    const getConfirmation = window.confirm("Remover tarefa? 🤔");
    if (!getConfirmation) return;
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    setIds();
  };

  //
  // actions
  //

  const checarTodasTarefas = () => {
    setTarefas(
      tarefas.map((tarefa) => ({
        ...tarefa,
        check: true,
      }))
    );
  };

  const deschecarTodasTarefas = () => {
    setTarefas(
      tarefas.map((tarefa) => ({
        ...tarefa,
        check: false,
      }))
    );
  };

  const deletarTodasTarefas = () => {
    const getConfirmation = window.confirm("Remover tudo mesmo? 🔥");
    if (!getConfirmation) return;
    setTarefas([]);
  };

  //
  // main app
  //

  return (
    <div id="todo-list-container">
      {/**/}

      <header className="header">
        <h1>To Do App</h1>
      </header>

      <form className="main-form" onSubmit={adicionarTarefa}>
        <input
          type="text"
          name="todo"
          value={tarefaAtual.text}
          placeholder="Digite sua tarefa com #tags"
          onChange={atualizarTarefaAtual}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoFocus
        />
        <button type="submit" disabled={!tarefaAtual.text}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
        </button>
      </form>

      <div id="todo-list-box">
        {/**/}

        <div className="todo-list-top">
          <h3>
            {tarefasCompletas === tarefas.length ? (
              <span>🤙</span>
            ) : (
              <span>
                {tarefasCompletas} de {tarefas.length}
              </span>
            )}
          </h3>
          {tarefasCompletas === tarefas.length ? (
            <button onClick={deschecarTodasTarefas}>
              <FontAwesomeIcon icon={faUndo} className="icon" />
              Desticar tudo
            </button>
          ) : (
            <button onClick={checarTodasTarefas}>
              <FontAwesomeIcon icon={faCheck} className="icon" />
              Ticar tudo
            </button>
          )}
        </div>

        <ul className="todo-list">
          {tarefas.map((tarefa, index) => (
            <ToDoItem
              key={index}
              index={index}
              tarefa={tarefa}
              checkTodoItem={checkTodoItem}
              deleteTodoItem={deleteTodoItem}
            />
          ))}
        </ul>

        <div className="todo-list-bottom">
          <button onClick={deletarTodasTarefas}>
            <FontAwesomeIcon icon={faTrash} className="icon" />
            Remover tudo
          </button>
        </div>

        {/**/}
      </div>

      {/**/}
    </div>
  );
};

export default ToDoListContainer;
