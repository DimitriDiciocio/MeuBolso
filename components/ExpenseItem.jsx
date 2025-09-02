import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { formatDate } from "../utils/date";
import { formatCurrencyBRL } from "../utils/currency";

const DeleteIcon = () => <Text style={styles.deleteText}>❌</Text>;

const Checkbox = ({ checked }) => (
    <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✔️</Text>}
    </View>
);

export default function ExpenseItem({ expense, onToggleStatus, onDelete, onEdit }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onToggleStatus} hitSlop={10} style={styles.checkbox}>
                <Checkbox checked={expense.done} />
            </Pressable>

            <Pressable onPress={onEdit} style={styles.content}>
                <View style={styles.mainInfo}>
                    <Text style={[styles.title, expense.done && styles.titleDone]}>
                        {expense.title}
                    </Text>
                    <Text style={[styles.amount, expense.done && styles.titleDone]}>
                        {formatCurrencyBRL(expense.amount)}
                    </Text>
                </View>
                <Text style={[styles.dueDate, expense.done && styles.titleDone]}>
                    Vencimento: {formatDate(expense.dueDate)}
                </Text>
            </Pressable>

            <Pressable onPress={onDelete} hitSlop={10} style={styles.deleteButton}>
                <DeleteIcon />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'white',
    },
    checkbox: {
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    mainInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E8B57',
    },
    dueDate: {
        fontSize: 14,
        color: '#666',
    },
    titleDone: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteButton: {
        marginLeft: 12,
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
        borderColor: '#FF6B6B',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#FF6B6B',
    },
    checkmark: {
        fontSize: 14,
        color: 'white',
    },
});
