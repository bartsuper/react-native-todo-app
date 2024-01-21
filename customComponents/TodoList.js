import { FlatList, StyleSheet } from "react-native";

// Import components
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoItems }) => {
    return (
        <FlatList
            data={todoItems}
            renderItem={({ item }) => (
                <TodoListItem todoItem={item} style={styles.container} />
            )}
        />
    );
};

export default TodoList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "yellow",
    },
});
