export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Merchant', 'Description', 'Category', 'Type', 'Amount', 'Payment Mode'];
  
  const rows = transactions.map((txn) => [
    txn.date,
    txn.merchant,
    txn.description,
    txn.category,
    txn.type,
    txn.amount,
    txn.paymentMode,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');

  downloadFile(csvContent, 'go-financy-transactions.csv', 'text/csv');
};

export const exportToJSON = (transactions) => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  downloadFile(jsonContent, 'go-financy-transactions.json', 'application/json');
};

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};