import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

// Import components
import NewTodoModal from "./NewTodoModal";

const NewTodoButton = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={toggleModal}>
                <AntDesign name="pluscircle" size={55} color="#edc42f" />
            </TouchableOpacity>
            <NewTodoModal
                modalVisible={modalVisible}
                toggleModal={toggleModal}
            />
        </>
    );
};

export default NewTodoButton;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 60,
        right: 40,
    },
});
