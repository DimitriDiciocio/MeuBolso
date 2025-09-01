import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState() {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>📋</Text>
            <Text style={styles.title}>
                Você ainda não tem despesas cadastradas
            </Text>
            <Text style={styles.subtitle}>
                Crie despesas e organize seus itens a pagar
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        opacity: 0.5, // Deixa o componente um pouco transparente
    },
    icon: {
        fontSize: 64,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
    },
});