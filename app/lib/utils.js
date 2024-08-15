export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount. It should be a number.');
  }
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (dateStr, locale = 'en-US') => {
  const date = new Date(dateStr);
  
  // Check for invalid date
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided.');
  }

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const generateYAxis = (revenue) => {
  if (!Array.isArray(revenue) || revenue.length === 0) {
    throw new Error('Revenue data should be a non-empty array.');
  }

  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map(month => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage, totalPages) => {
  if (totalPages <= 0) {
    throw new Error('Total pages must be greater than 0.');
  }
  if (currentPage < 1 || currentPage > totalPages) {
    throw new Error('Current page must be within the range of total pages.');
  }

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
