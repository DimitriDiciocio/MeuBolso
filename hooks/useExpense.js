// useExpense.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import * as ExpenseStorage from '../storage/expense';

export function useExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const loadedExpenses = await ExpenseStorage.loadExpenses();
            setExpenses(loadedExpenses);
            setLoading(false);
        }
        loadData();
    }, []);

    const addExpense = useCallback(async (title, dueDate, amount) => {
        const newExpense = ExpenseStorage.createExpense(title, dueDate, amount);
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses);
    }, [expenses]);

    const removeExpense = useCallback(async (expenseId) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses);
    }, [expenses]);

    const editExpense = useCallback(async (expenseId, changes) => {
        const updatedExpenses = expenses.map(expense =>
            expense.id === expenseId
                ? { ...expense, ...changes, updatedAt: Date.now() }
                : expense
        );
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses);
    }, [expenses]);

    const toggleExpense = useCallback(async (expenseId) => {
        const updatedExpenses = expenses.map(expense =>
            expense.id === expenseId
                ? { ...expense, done: !expense.done, updatedAt: Date.now() }
                : expense
        );
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses);
    }, [expenses]);

    const filteredExpenses = useMemo(() => {
        let items = [...expenses];
        if (filter === 'pending') items = items.filter(expense => !expense.done);
        else if (filter === 'completed') items = items.filter(expense => expense.done);
        if (query.trim()) {
            items = items.filter(expense =>
                expense.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        return items;
    }, [expenses, filter, query]);

    const getTaskById = useCallback((id) => {
        return expenses.find(expense => expense.id === id);
    }, [expenses]);

    return {
        expenses,
        filteredExpenses,
        loading,
        filter,
        query,
        addExpense,
        removeExpense,
        editExpense,
        toggleExpense,
        setFilter,
        setQuery,
        getTaskById,
    };
}
