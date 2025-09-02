import React, { useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useExpenses } from "../hooks/useExpense";
import EmptyState from "../components/EmptyState";
import ExpenseForm from "../components/ExpenseForm";
import SearchBar from "../components/SearchBar";
import ModalConfirm from "../components/ModalConfirm";

export default function Home() {
    const {
        expenses,
        loading,
        addExpense,
        toggleExpense,
        removeExpense,
        query,
        setQuery,
        filteredExpenses
    } = useExpenses();

    const [expenseToDelete, setExpenseToDelete] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <ExpenseForm onAddExpense={addExpense} />
            <SearchBar searchQuery={query} onSearch={setQuery} />
            <FlatList
                data={filteredExpenses}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<EmptyState />}
                renderItem={({ item }) => (
                    <ExpenseItem
                        expense={item}
                        onToggleStatus={() => toggleExpense(item.id)}
                        onDelete={() => setExpenseToDelete(item)}
                        onEdit={() => {}} // Placeholder for edit functionality
                    />
                )}
                style={styles.list}
            />

            <ModalConfirm
                visible={expenseToDelete != null}
                expense={expenseToDelete}
                onConfirm={() => {
                    removeExpense(expenseToDelete.id);
                    setExpenseToDelete(null);
                }}
                onCancel={() => setExpenseToDelete(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        flex: 1,
    },
});
