import { View, FlatList } from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { useExpenses } from "../hooks/useExpense";
import EmptyState from "../components/EmptyState";
import ExpenseForm from "../components/ExpenseForm";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import ModalConfirm from "../components/ModalConfirm";

export default function Home() {
    const {
        expenses,
        loading,
        addExpenses,
        toggleExpenses,
        removeExpenses,
        query,
        setQuery,
        filteredExpenses
    } = useExpenses();
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    return (
        <View>
            <ExpenseForm onAddExpense={addExpenses} />
            <SearchBar searchQuery={query} onSearch={setQuery} />
            <FlatList
                data={filteredExpenses}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<EmptyState />}
                renderItem={({ item }) => (
                    <ExpenseItem
                        expense={item}
                        onToggleStatus={() => toggleExpenses(item.id)}
                        onDelete={() => setExpenseToDelete(item)}
                        // A função onEdit foi removida pois dependia do router
                    />
                )}
            />
            <ModalConfirm visible={expenseToDelete != null} expense={expenseToDelete} onConfirm={() => {
                removeExpenses(expenseToDelete.id)
                setExpenseToDelete(null)
            }} onCancel={() => { setExpenseToDelete(null); }} />
        </View>
    );
}