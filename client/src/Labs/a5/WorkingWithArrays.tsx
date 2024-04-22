import React, { useState, useEffect } from "react";
import axios from "axios";
import {BASE_API_URL} from "./client";

function WorkingWithArrays() {
    const [errorMessage, setErrorMessage] = useState(null);

    const API = `${BASE_API_URL}/todos`;

    const [todo, setTodo] = useState({
      _id: 123,
      title: "NodeJS HTTP Server with ExpressJS",
      description: "Create a NodeJS server with ExpressJS",
      due: "2021-10-15", 
      completed: false, 
      score: 0,
    });
    const [todos, setTodos] = useState<any[]>([]);

    const postTodo = async () => {
      const response = await axios.post(API, todo);
      setTodos([...todos, response.data]);
    };
  

    const fetchTodos = async () => {
      const response = await axios.get(API);
      setTodos(response.data);
    };

    const removeTodo = async (todo: any) => {
      const response = await axios
        .get(`${API}/${todo._id}/delete`);
      setTodos(response.data);
    };

    const fetchTodoById = async (id?: string) => {
      const response = await axios.get(`${API}/${id}`);
      setTodo(response.data);
    };
  

    useEffect(() => {
      fetchTodos();
    }, []);
  

    const createTodo = async () => {
      const response = await axios.get(`${API}/create`);
      setTodos(response.data);
    };

    const updateTitle = async () => {
      const response = await axios.get(`${API}/${todo._id}/title/${todo.title}`);
      setTodos(response.data);
    };

    const deleteTodo = async (todo:any) => {
      try{
      const response = await axios.delete(`${API}/${todo._id}`);
      setTodos(todos.filter((t:any) => t._id !== todo._id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  
    const updateTodo = async () => {
      try {
      const response = await axios.put(`${API}/${todo._id}`, todo);
      setTodos(todos.map((t) => (t._id === todo._id ? todo : t)));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }

    };
  
  
    return (
      <div>
        <h3>Working with Arrays</h3>
        <button onClick={updateTodo}>Update Todo</button>
  
        <button onClick={createTodo} className="btn btn-primary mb-2 w-100">
          Create Todo
        </button>

        <button className="btn btn-primary mb-2 w-100" onClick={updateTitle}>
          Update Title
        </button>

        <input
          className="form-control"
          value={todo._id}
          onChange={(e) => setTodo({ ...todo, _id: Number(e.target.value) })}
        />
        <input
          className="form-control"
          type="text"
          value={todo.title}
          onChange={(e) =>
            setTodo({
              ...todo,
              title: e.target.value,
            })
          }
        />

        <textarea
          className="form-control"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <input
          className="form-control"
          value={todo.due}
          type="date"
          onChange={(e) =>
            setTodo({
              ...todo,
              due: e.target.value,
            })
          }
        />
        <label>
          <input
            value={todo.completed.toString()}
            type="checkbox"
            onChange={(e) =>
              setTodo({
                ...todo,
                completed: e.target.checked,
              })
            }
          />
          Completed
        </label>
        <button onClick={postTodo} className="btn btn-primary w-100">
          Post Todo
        </button>
  
        <ul className="list-group">
          {todos.map((todo) => (
            <li key={todo._id} className="list-group-item">
              <input checked={todo.completed} type="checkbox" readOnly />
              {todo.title}
              <p>{todo.description}</p>
              <p>{todo.due}</p>
              <button onClick={() => fetchTodoById(todo._id)}>
              Edit
              </button>
  
              <button
                onClick={() => removeTodo(todo)}
                className="btn btn-danger float-end"
              >
                Remove
              </button>
              <button
                onClick={() => deleteTodo(todo)}
                className="btn btn-danger float-end ms-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
  
        <h4>Retrieving Arrays</h4>
        <a href={API} className="btn btn-primary me-2">
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <h3>Updating an Item in an Array</h3>
        <a href={`${API}/${todo._id}/title/${todo.title}`}>
          Update Title to {todo.title}
        </a>
  
        <a href={`${API}/${todo._id}`} className="btn btn-primary me-2">
          Get Todo by ID
        </a>
        <h3>Filtering Array Items</h3>
        <a href={`${API}?completed=true`} className="btn btn-primary me-2">
          Get Completed Todos
        </a>
        <h4>Creating new Items in an Array</h4>
        <a href={`${API}/create`} className="btn btn-primary me-2">
          Create Todo
        </a>
        <h3>Deleting from an Array</h3>
        <a href={`${API}/${todo._id}/delete`} className="btn btn-primary me-2">
          Delete Todo with ID = {todo._id}
        </a>

        {errorMessage && (
          <div className="alert alert-danger mb-2 mt-2">
            {errorMessage}
          </div>
        )}

      </div>
    );
  }


  export default WorkingWithArrays;