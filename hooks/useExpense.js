import { useState, useEffect, useMemo, useCallback } from 'react';
import * as ExpenseStorage from '../storage/expense';

export function useExpenses() {
    // Estado para armazenar todas as tarefas brutas, sem filtro
    const [expenses, setExpenses] = useState([]);

    // Estado para o filtro atual ('all', 'pending', 'completed')
    const [filter, setFilter] = useState('all'); // [cite: 35]

    // Estado para o termo da busca
    const [query, setQuery] = useState(''); // [cite: 36]

    // Estado para controlar o carregamento inicial
    const [loading, setLoading] = useState(true);

    // Efeito para carregar as tarefas do AsyncStorage uma única vez
    useEffect(() => {
        async function loadData() {
            const loadedExpenses = await ExpenseStorage.loadExpenses(); //
            setExpenses(loadedExpenses);
            setLoading(false);
        }
        loadData();
    }, []);

    // Função para adicionar uma nova tarefa
    const addExpense = useCallback(async (title, dueDate) => {
        const newExpense = ExpenseStorage.createExpense(title, dueDate);
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses); // [cite: 106]
    }, [expenses]);

    // Função para remover uma tarefa
    const removeExpense = useCallback(async (ExpenseId) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses); // [cite: 109]
    }, [expenses]);

    // Função para editar uma tarefa existente
    const editExpense = useCallback(async (expenseId, changes) => {
        const updatedExpenses = expenses.map(expense =>
            expense.id === expenseId
                ? { ...expense, ...changes, updatedAt: Date.now() }
                : expense
        );
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses); // [cite: 107]
    }, [expenses]);

    // Função para alternar o status 'done' de uma tarefa
    const toggleExpense = useCallback(async (expenseId) => {
        const updatedExpenses = expenses.map(expense =>
            expense.id === expenseId
                ? { ...expense, done: !expense.done, updatedAt: Date.now() }
                : expense
        );
        setExpenses(updatedExpenses);
        await ExpenseStorage.saveExpenses(updatedExpenses); // [cite: 108]
    }, [expenses]);

    // Lógica de filtragem e busca com useMemo para otimização [cite: 41, 135]
    const filteredExpenses = useMemo(() => {
        let items = [...expenses];

        // 1. Aplicar filtro de status
        if (filter === 'pending') {
            items = items.filter(expense => !expense.done);
        } else if (filter === 'completed') {
            items = items.filter(expense => expense.done);
        }

        // 2. Aplicar busca por título
        if (query.trim()) {
            items = items.filter(expense =>
                expense.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Retorna a lista processada
        return items;
    }, [expenses, filter, query]); // Recalcula apenas quando uma dessas dependências mudar

    const getTaskById = useCallback((id) => {
        return expenses.find(expense => expense.id === id);
    }, [expenses]);

    // O hook expõe o estado e as funções para os componentes
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