import PropTypes from "prop-types";
const TodoItem = (props) => {
    return (
        <li
            className="todo-item"
            onClick={() => {
                props.handleTodoItemClick(props.id);
            }}
        >
            <input
                type="checkbox"
                name=""
                id=""
                checked={props.isCompleted}
                onChange={() => {
                    props.handleCheckboxItemChange(props.id);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            />
            <div className="todo-item__info">
                <p>{props.name}</p>
                {props.isImportant && <p>⭐</p>}
            </div>
        </li>
    );
};
export default TodoItem;

TodoItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
    handleCheckboxItemChange: PropTypes.func,
    handleTodoItemClick: PropTypes.func,
};
