import JavaScript from "./JavaScript";
import Classes from "./Classes";
import PathParameters from "./routing/PathParameters";
import Styles from "./Styles";
import ConditionalOutput from "./ConditionalOutput";
import Highlight from "./Highlight";


import Add from "./Add";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";
import { useSelector } from "react-redux";
import { LabState } from "../store";

function Assignment3() {
    const { todos } = useSelector((state: LabState) => state.todosReducer);
    return (
        <div>
            <h2>Assignment 3</h2>
            <ul className="list-group">
                {todos.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                        {todo.title}
                    </li>
                ))}
            </ul>
            <TodoList />
            <Add a = {3} b = {4} />
            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
            </Highlight>
            <ConditionalOutput />
            <Styles />
            <Classes />
            <PathParameters />
            <JavaScript />
        </div>
    );
}

export default Assignment3;
