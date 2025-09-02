// utils/currency.js
// Converte entradas como "12,50", "1.234,56" ou "12.50" para número (12.5, 1234.56)
export function parseCurrencyInput(raw) {
    if (raw == null) return NaN;
    const s = String(raw).trim();
    if (!s) return NaN;
    // Remove separadores de milhar (.) e troca vírgula por ponto para decimais
    const normalized = s.replace(/\./g, '').replace(/,/g, '.');
    const num = Number(normalized);
    return Number.isFinite(num) ? num : NaN;
}

// Formata número em BRL (ex.: 1234.56 -> "R$ 1.234,56")
export function formatCurrencyBRL(value) {
    if (!Number.isFinite(value)) return '';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);
}
