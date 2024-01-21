import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTodoItemsContext } from "../contexts/TodoItemsContext";
import ContextMenu from "react-native-context-menu-view";
import { useState, useRef, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

// Import functions
import {
    checkTodoItem,
    removeTodoItem,
    editTodoItem,
} from "../localStorageFunctions";

const TodoListItem = ({ todoItem }) => {
    const { todoItems, setTodoItems } = useTodoItemsContext();
    const [editTitle, setEditTitle] = useState(todoItem.title);
    const [editing, setEditing] = useState(false);
    const editRef = useRef(null);

    const handleCheckPress = async () => {
        const updatedTodos = todoItems.map((item) =>
            item.title === todoItem.title
                ? { ...item, checked: !item.checked }
                : item
        );
        setTodoItems(updatedTodos);
        await checkTodoItem(todoItem.title);
    };

    const handleSavePress = async () => {
        const updatedTodos = todoItems.map((item) =>
            item.title === todoItem.title ? { ...item, title: editTitle } : item
        );
        setTodoItems(updatedTodos);
        setEditing(false);
        await editTodoItem(todoItem.title, editTitle);
    };

    const handleEditPress = () => {
        setEditing(true);
    };

    const handleDeletePress = async () => {
        const updatedTodos = todoItems.filter(
            (item) => item.title !== todoItem.title
        );
        setTodoItems(updatedTodos);
        await removeTodoItem(todoItem.title);
    };

    const handleMenuPress = async (event) => {
        switch (event.nativeEvent.name) {
            case "Edit":
                handleEditPress();
                break;
            case "Delete":
                handleDeletePress();
                break;
        }
    };

    useEffect(() => {
        if (editing && editRef.current) {
            editRef.current.focus();
        }
    }, [editing]);

    return (
        <ContextMenu
            actions={[
                { title: "Edit", systemIcon: "pencil" },
                { title: "Delete", systemIcon: "trash.fill" },
            ]}
            onPress={(event) => {
                handleMenuPress(event);
            }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.checkButton,
                        !todoItem.checked
                            ? { borderWidth: 2, borderColor: "#6e66ff" }
                            : null,
                    ]}
                    onPress={handleCheckPress}
                >
                    {todoItem.checked ? (
                        <AntDesign
                            name="checkcircle"
                            size={24}
                            color="#6e66ff"
                        />
                    ) : null}
                </TouchableOpacity>
                {editing ? (
                    <>
                        <TextInput
                            style={styles.textInput}
                            value={editTitle}
                            onChangeText={(text) => setEditTitle(text)}
                            ref={editRef}
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSavePress}
                        >
                            <Feather name="save" size={25} color="black" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.text}>{todoItem.title}</Text>
                )}
            </View>
        </ContextMenu>
    );
};

export default TodoListItem;

const styles = StyleSheet.create({
    swipeable: {
        backgroundColor: "yellow",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 60,
        backgroundColor: "#c8d1f7",
        paddingHorizontal: 15,
        borderRadius: 15,
        alignSelf: "center",
        marginVertical: 5,
    },
    checkButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
    },
    text: {
        fontSize: 22,
        marginLeft: 15,
    },
    textInput: {
        fontSize: 22,
        marginLeft: 15,
        flex: 1,
    },
    saveButton: {
        // backgroundColor: "yellow",
    },
});
