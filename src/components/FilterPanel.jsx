import { useState } from "react";
import "./FilterPanel.css";
import PropsTypes from "prop-types";

const FilterPanel = (props) => {
    const FILTER_ITEM = [
        {
            id: "all",
            label: "All",
            iconPath: "./public/inbox.png",
        },
        {
            id: "important",
            label: "Important",
            iconPath: "./public/flag.png",
        },
        {
            id: "completed",
            label: "Completed",
            iconPath: "./public/check.png",
        },
        {
            id: "deleted",
            label: "Deleted",
            iconPath: "./public/delete.png",
        },
    ];

    const todoList = props.todoList;
    const totalTodoItems = todoList.length;

    const countFilterType = todoList.reduce(
        (acc, curr) => {
            let newAcc = { ...acc };
            if (curr.isImportant) {
                newAcc = { ...newAcc, important: newAcc.important + 1 };
            }
            if (curr.isCompleted) {
                newAcc = { ...newAcc, completed: newAcc.completed + 1 };
            }
            if (curr.isDeleted) {
                newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
            }
            return newAcc;
        },
        { all: totalTodoItems, important: 0, completed: 0, deleted: 0 }
    );

    return (
        <aside className="filter-panel">
            <ul className="filter-panel__list">
                {FILTER_ITEM.map((filterItem) => {
                    return (
                        <li
                            className={`filter-panel__item ${
                                props.filterItemActive === filterItem.id ? "filter-panel__item--active" : ""
                            }`}
                            key={filterItem.id}
                            onClick={() => {
                                props.setFilterItemActive(filterItem.id);
                            }}
                        >
                            <div>
                                <img src={filterItem.iconPath} alt="" />
                                <p className="filter-panel__item-label">{filterItem.label}</p>
                            </div>
                            <span className="filter-panel__item-num">{countFilterType[filterItem.id]}</span>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};
export default FilterPanel;

FilterPanel.propTypes = {
    todoList: PropsTypes.array,
    filterItemActive: PropsTypes.string,
    setFilterItemActive: PropsTypes.func,
};
