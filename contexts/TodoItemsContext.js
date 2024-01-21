import { createContext, useContext, useState } from "react";

const TodoItemsContext = createContext();

export const useTodoItemsContext = () => {
    return useContext(TodoItemsContext);
};

export const TodoItemsProvider = ({ children, currentTodos }) => {
    const [todoItems, setTodoItems] = useState(currentTodos);

    return (
        <TodoItemsContext.Provider value={{ todoItems, setTodoItems }}>
            {children}
        </TodoItemsContext.Provider>
    );
};
