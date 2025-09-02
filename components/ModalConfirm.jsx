import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

export default function ModalConfirm({
                                         visible,
                                         expense,      // Changed from 'task' to 'expense'
                                         onConfirm,
                                         onCancel,
                                     }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        Tem certeza que deseja deletar a despesa: "{expense?.title}"?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onCancel} color="#666" />
                        <Button title="Confirmar" onPress={onConfirm} color="#ff4444" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
});
