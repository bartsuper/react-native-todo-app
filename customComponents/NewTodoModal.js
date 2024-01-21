import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { useState } from "react";
import { useTodoItemsContext } from "../contexts/TodoItemsContext";

// Import functions
import { storeTodoItem } from "../localStorageFunctions";

const NewTodoModal = ({ modalVisible, toggleModal }) => {
    const { todoItems, setTodoItems } = useTodoItemsContext();
    const [itemTitle, setItemTitle] = useState("");

    const handleAddPress = async () => {
        const newTodo = {
            checked: false,
            title: itemTitle,
        };

        setTodoItems([...todoItems, newTodo]);
        setItemTitle("");
        toggleModal();
        await storeTodoItem(newTodo);
    };

    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={toggleModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationOutTiming={700}
            onSwipeComplete={toggleModal}
            swipeDirection="down"
            backdropOpacity={0.3}
            style={styles.modalContainer}
        >
            <View style={styles.container}>
                <Text style={styles.titleText}>New Todo Item</Text>
                <TextInput
                    style={styles.textInput}
                    value={itemTitle}
                    placeholder="Title"
                    onChangeText={(text) => setItemTitle(text)}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddPress}
                >
                    <Text style={styles.addButtonText}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default NewTodoModal;

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "flex-end",
        margin: 0,
    },
    container: {
        height: 200,
        width: "100%",
        backgroundColor: "#e6f2ff",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 15,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 10,
    },
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        fontSize: 18,
        padding: 10,
    },
    addButton: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: "#70a2ff",
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
    },
    addButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
