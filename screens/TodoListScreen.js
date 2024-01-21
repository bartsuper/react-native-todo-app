import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useTodoItemsContext } from "../contexts/TodoItemsContext";
import { Feather } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

// Import components
import TodoList from "../customComponents/TodoList";
import NewTodoButton from "../customComponents/NewTodoButton";

const TodoListScreen = () => {
    const { todoItems, setTodoItems } = useTodoItemsContext();
    const [editing, setEditing] = useState(false);
    const [listTitle, setListTitle] = useState("Todo");
    const editRef = useRef(null);

    const handleEditPress = () => {
        setEditing(true);
    };

    const handleSavePress = () => {
        setEditing(false);
    };

    useEffect(() => {
        if (editing && editRef.current) {
            editRef.current.focus();
        }
    }, [editing]);

    return (
        <View style={styles.container}>
            {editing ? (
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSavePress}
                    >
                        <Feather name="save" size={15} color="gray" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        value={listTitle}
                        onChangeText={(text) => setListTitle(text)}
                        ref={editRef}
                    />
                </View>
            ) : (
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleEditPress}
                    >
                        <Feather name="edit" size={15} color="gray" />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{listTitle}</Text>
                </View>
            )}
            <TodoList todoItems={todoItems} />
            <NewTodoButton />
        </View>
    );
};

export default TodoListScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e6f2ff",
        flex: 1,
        paddingTop: 70,
        padding: 15,
    },
    titleText: {
        fontSize: 50,
        fontWeight: "bold",
        alignSelf: "center",
    },
    button: {
        width: 20,
        height: 20,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    textInput: {
        fontSize: 50,
        fontWeight: "bold",
        alignSelf: "center",
    },
});
