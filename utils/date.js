// utils/date.js
export function formatDate(input) {
    if (!input) return '';
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d)) return '';

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0'); // getMonth() é 0-11
    const yyyy = d.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}
