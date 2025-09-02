import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { parseCurrencyInput } from '../utils/currency';

export default function ExpenseForm({ onAddExpense }) {
    const [title, setTitle] = useState('');
    const [amountText, setAmountText] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) setDueDate(selectedDate);
    };

    const handlePress = () => {
        if (title.trim() === '') {
            Alert.alert('Erro', 'O título é obrigatório!');
            return;
        }

        const amount = parseCurrencyInput(amountText);
        if (!Number.isFinite(amount) || amount <= 0) {
            Alert.alert('Erro', 'Informe um valor válido maior que zero (ex.: 12,50).');
            return;
        }

        onAddExpense(title, dueDate, amount);
        setTitle('');
        setAmountText('');
        setDueDate(new Date());
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Adicione uma nova despesa..."
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Valor (ex.: 12,50)"
                value={amountText}
                onChangeText={setAmountText}
                keyboardType="decimal-pad"
            />

            <Pressable style={styles.dateButton} onPress={() => setShowPicker(true)}>
                <Text style={styles.dateText}>
                    Vencimento: {dueDate.toLocaleDateString('pt-BR')}
                </Text>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <Pressable style={styles.addButton} onPress={handlePress}>
                <Text style={styles.addButtonText}>Adicionar Despesa</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        fontSize: 16,
        marginBottom: 12,
    },
    dateButton: {
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: 'white',
        marginBottom: 12,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        height: 48,
        backgroundColor: '#FF6B6B',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
