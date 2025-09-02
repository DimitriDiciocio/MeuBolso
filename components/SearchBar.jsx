import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ searchQuery, onSearch }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar despesas..."
                value={searchQuery}
                onChangeText={onSearch}
                clearButtonMode="while-editing" // iOS only
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        fontSize: 16,
    },
});
