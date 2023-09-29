

function formatDate(date) {
  const options = {
    weekday: 'long', // Nombre del día de la semana
    day: 'numeric',  // Día del mes
    month: 'long',   // Nombre del mes
    year: 'numeric'  // Año
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

module.exports = {
  formatDate,
}
