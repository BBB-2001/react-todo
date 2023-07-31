import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });
  const handelChange = (e) => {
    setInput(e.target.value);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      if (props.edit) {
        const postTodo = await axios.put(
          `http://192.168.1.37:4000/todos/${props.edit.id}`,
          {
            description: input,
          }
        );
        props.onSubmit({ id: props.edit.id, description: input });
      } else {
        const editTodo = await axios.post(`http://192.168.1.37:4000/todos`, {
          description: input,
        });
        props.onSubmit({ editTodo.data });
      }
    } catch (err) {
      console.log(err);
    }
    setInput("");
  };
  return (
    <form className="todo-form" onSubmit={handelSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            name="description"
            className="todo-input edit"
            onChange={handelChange}
            ref={inputRef}
          />
          <button className="todo-button edit ">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            name="description"
            className="todo-input"
            onChange={handelChange}
            ref={inputRef}
          />
          <button className="todo-button">Add todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
