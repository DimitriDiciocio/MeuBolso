import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert, StyleSheet } from 'react-native';

export default function ExpenseForm({ onAddExpense }) {
    const [title, setTitle] = useState('');

    const handlePress = () => {
        if (title.trim() === '') {
            Alert.alert("Erro", "O título é obrigatório!");
            return;
        }

        onAddExpense(title);

        setTitle('');
    };

    return (
        <View >
            <TextInput

                placeholder="Adicione uma nova despesa..."
                value={title}
                onChangeText={setTitle}
            />
            <Pressable onPress={handlePress}>
                <Text>+</Text>
            </Pressable>
        </View>
    );
}
