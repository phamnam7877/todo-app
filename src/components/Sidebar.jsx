import { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";

const Sidebar = (props) => {
    const data = props.todoItem;
    const [name, setName] = useState(data.name);
    const [isImportant, setIsImportant] = useState(data.isImportant);
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);

    return (
        <div className={`side-bar ${props.showSidebar ? "side-bar--active" : ""}`}>
            <form action="" className="sidebar-form">
                <input
                    type="text"
                    name=""
                    id="sb-name"
                    className="sidebar-form__input"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <div className="form-group">
                    <label htmlFor="isImportant">Is Important?</label>
                    <input
                        type="checkbox"
                        id="isImportant"
                        checked={isImportant}
                        onChange={() => {
                            setIsImportant(!isImportant);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isCompleted">Is Completed?</label>
                    <input
                        type="checkbox"
                        id="isCompleted"
                        checked={isCompleted}
                        onChange={() => {
                            setIsCompleted(!isCompleted);
                        }}
                    />
                </div>
            </form>
            <div className="sidebar-controls-group">
                <button
                    className="sidebar-btn save-btn"
                    onClick={() => {
                        props.handleUpdateTodoItem({ ...data, name, isImportant, isCompleted });
                        props.setShowSidebar(false);
                    }}
                >
                    Save
                </button>
                <button
                    className="sidebar-btn cancel-btn"
                    onClick={() => {
                        props.setShowSidebar(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
export default Sidebar;

Sidebar.propTypes = {
    todoItem: PropTypes.object,
    name: PropTypes.string,
    showSidebar: PropTypes.bool,
    handleUpdateTodoItem: PropTypes.func,
    setShowSidebar: PropTypes.func,
};
