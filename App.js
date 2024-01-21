import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import components
import AppNavigator from "./navigation";
import Loading from "./customComponents/Loading";

// Import contexts
import { TodoItemsProvider } from "./contexts/TodoItemsContext";

// Import functions
import { getTodoItems } from "./localStorageFunctions";

const App = () => {
    const [todoItems, setTodoItems] = useState(null);

    useEffect(() => {
        const getCurrentTodos = async () => {
            const currentTodos = await getTodoItems();
            setTodoItems(currentTodos);
        };

        getCurrentTodos();
    }, []);

    if (!todoItems) {
        return (
            <>
                <Loading />
            </>
        );
    }

    return (
        <TodoItemsProvider currentTodos={todoItems}>
            <AppNavigator />
        </TodoItemsProvider>
    );
};

export default App;
