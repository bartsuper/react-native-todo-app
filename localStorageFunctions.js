import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTodoItem = async (todoItem) => {
    try {
        const storedTodos = await getTodoItems();
        storedTodos.push(todoItem);
        await AsyncStorage.setItem("@todoItems", JSON.stringify(storedTodos));
    } catch (error) {
        console.error("Error stroing todo item: ", error);
    }
};

export const getTodoItems = async () => {
    try {
        const todoItems = await AsyncStorage.getItem("@todoItems");
        return todoItems ? JSON.parse(todoItems) : [];
    } catch (error) {
        console.error("Error getting todo items: ", error);
    }
};

export const checkTodoItem = async (title) => {
    try {
        const storedTodos = await getTodoItems();
        const updatedTodos = storedTodos.map((item) =>
            item.title === title ? { ...item, checked: !item.checked } : item
        );
        await AsyncStorage.setItem("@todoItems", JSON.stringify(updatedTodos));
    } catch (error) {
        console.error("Error checking todo item: ", error);
    }
};

export const removeTodoItem = async (title) => {
    try {
        const storedTodos = await getTodoItems();
        const updatedTodos = storedTodos.filter((item) => item.title !== title);
        await AsyncStorage.setItem("@todoItems", JSON.stringify(updatedTodos));
    } catch (error) {
        console.error("Error removing todo item: ", error);
    }
};

export const editTodoItem = async (title, newTitle) => {
    try {
        const storedTodos = await getTodoItems();
        const updatedTodos = storedTodos.map((item) =>
            item.title === title ? { ...item, title: newTitle } : item
        );
        await AsyncStorage.setItem("@todoItems", JSON.stringify(updatedTodos));
    } catch (error) {
        console.error("Error editing todo item: ", error);
    }
};
