import AsyncStorage from '@react-native-async-storage/async-storage';
import {generateUniqueId} from '../utils/id';

const STORAGE_KEY = "@meuBolso/expenses";

//Crud Despesas

//Criando a despesa
export function createExpense(title, dueDate, amount) {
    const now = Date.now();
    return {
        id: generateUniqueId(),
        title,
        amount,
        dueDate,
        done: false,
        createdAt: now,
        updatedAt: now,
    };
}

//Salvando a despesa
export async function saveExpenses(expenses) {
    try {
        const payload = { items: expenses, version: 1 }
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
        console.error("Erro ao salvar despesas:", e)
    }
}

//Carregando a despesa
export async function loadExpenses() {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            return parsed.items || [];
        }
        return [];
    } catch (e) {
        console.error("Erro ao carregar despesas:", e);
        return [];
    }
}

//Deletando a despesa
export async function deleteExpense(expenseId) {
    try {
        const expenses = await loadExpenses();
        const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
        await saveExpenses(updatedExpenses);
        return updatedExpenses;
    }
    catch (e) {
        console.error("Erro ao deletar task:", e);
        return [];
    }
}

//Editando a despesa
export async function updateExpense(expenseId, changes) {
    try {
        const expenses = await loadExpenses();
        const updatedExpenses = expenses.map(expense =>
            expense.id === expenseId
                ? { ...expense, ...changes, updatedAt: Date.now() }
                : expense
        );
        await saveExpenses(updatedExpenses);
        return updatedExpenses;
    } catch (e) {
        console.error("Erro ao editar despesa:", e);
        return [];
    }
}
