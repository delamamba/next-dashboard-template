// Format amount in cents to USD currency string
export const formatCurrency = (amount) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

// Format a date string to local date format
export const formatDateToLocal = (dateStr, locale = 'en-US') => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Handle invalid date input
  }
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

// Generate Y-axis labels based on the highest revenue record
export const generateYAxis = (revenue) => {
  if (!revenue.length) {
    return { yAxisLabels: [], topLabel: 0 };
  }

  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  const yAxisLabels = [];
  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

// Generate pagination array with ellipses for large page sets
export const generatePagination = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
