import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const DeleteIcon = () => <Text style={styles.deleteText}>❌</Text>;
const Checkbox = ({ checked }) => (
    <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Text>✔️</Text>}
    </View>
);

export default function ExpenseItem({ expense, onToggleStatus, onDelete, onEdit }) {
    return (
        <Pressable onPress={onEdit} style={styles.container}>
            <View style={styles.expenseInfo}>
                <Pressable onPress={onToggleStatus} hitSlop={10}>
                    <Checkbox checked={expense.done} />
                </Pressable>
                <Text style={[styles.title, expense.done && styles.titleDone]}>
                    {expense.title}
                </Text>
            </View>

            <Pressable onPress={onDelete} hitSlop={10}>
                <DeleteIcon />
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    expenseInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
    },
    titleDone: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteText: {
        fontSize: 16,
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'coral',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: 'coral',
    },
});