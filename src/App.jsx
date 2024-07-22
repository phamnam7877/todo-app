import { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

function App() {
    const [todoList, setTodoList] = useState([
        {
            id: "1",
            name: "Học HTML, CSS",
            isImportant: false,
            isCompleted: true,
            isDeleted: false,
        },
        {
            id: "2",
            name: "Học Javascript",
            isImportant: true,
            isCompleted: true,
            isDeleted: false,
        },
        {
            id: "3",
            name: "Học ReactJS",
            isImportant: true,
            isCompleted: false,
            isDeleted: false,
        },
    ]);

    const inputRef = useRef();

    const [showSidebar, setShowSidebar] = useState(false);

    const [activeTodoItemId, setActiveTodoItemId] = useState();

    const [filterItemActive, setFilterItemActive] = useState("all");

    const activeTodoItem = todoList.find((todo) => {
        return todo.id === activeTodoItemId;
    });

    const handleCheckboxItemChange = (todoId) => {
        const newTodos = todoList.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodoList(newTodos);
    };

    const handleTodoItemClick = (todoId) => {
        setActiveTodoItemId(todoId);
        setShowSidebar(true);
    };

    const handleUpdateTodoItem = (newTodo) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === newTodo.id) {
                return newTodo;
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    const filteredTodoItems = todoList.filter((todo) => {
        switch (filterItemActive) {
            case "all":
                return true;
            case "important":
                return todo.isImportant;
            case "completed":
                return todo.isCompleted;
            case "deleted":
                return todo.isDeleted;
            default:
                return true;
        }
    });

    const todos = filteredTodoItems.map((todo) => {
        return (
            <TodoItem
                key={todo.id}
                id={todo.id}
                name={todo.name}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                isDeleted={todo.isDeleted}
                handleCheckboxItemChange={handleCheckboxItemChange}
                handleTodoItemClick={handleTodoItemClick}
            />
        );
    });

    return (
        <div className="container">
            <FilterPanel
                filterItemActive={filterItemActive}
                setFilterItemActive={setFilterItemActive}
                todoList={todoList}
            />
            <section className="main-content">
                <h1 className="heading">Việc cần làm</h1>
                <input
                    ref={inputRef}
                    type="text"
                    name="add-new-todo"
                    id=""
                    placeholder="Add new task"
                    className="add-todo-input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const value = e.target.value;
                            setTodoList([
                                ...todoList,
                                {
                                    id: crypto.randomUUID(),
                                    name: value,
                                    isImportant: false,
                                    isCompleted: false,
                                    isDeleted: false,
                                },
                            ]);
                            inputRef.current.value = "";
                        }
                    }}
                />
                <ul className="todo-list">{todos}</ul>
                {showSidebar && (
                    <Sidebar
                        todoItem={activeTodoItem}
                        key={activeTodoItemId}
                        showSidebar={showSidebar}
                        handleUpdateTodoItem={handleUpdateTodoItem}
                        setShowSidebar={setShowSidebar}
                    />
                )}
            </section>
        </div>
    );
}

export default App;

App.propTypes = {
    todoList: PropTypes.array,
    setTodoList: PropTypes.func,
};
