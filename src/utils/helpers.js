export const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    } catch (error) {
        return dateString;
    }
};