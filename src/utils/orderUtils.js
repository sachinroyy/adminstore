/**
 * Formats an order date for display
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatOrderDate = (date) => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Gets the color for an order status chip
 * @param {string} status - The order status
 * @returns {string} Material-UI color name
 */
export const getStatusColor = (status) => {
  if (!status) return 'default';
  
  switch (status.toLowerCase()) {
    case 'completed':
    case 'delivered':
      return 'success';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'secondary';
    case 'cancelled':
      return 'error';
    case 'pending':
      return 'warning';
    default:
      return 'default';
  }
};

/**
 * Calculates the total price of order items
 * @param {Array} items - Array of order items
 * @returns {number} Total price
 */
export const calculateOrderTotal = (items = []) => {
  return items.reduce((total, item) => {
    return total + (parseFloat(item.price || 0) * parseInt(item.quantity || 1));
  }, 0);
};

/**
 * Formats a price with currency symbol
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount, currency = 'INR') => {
  if (isNaN(amount)) return '₹0.00';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(amount);
};

/**
 * Gets the next status in the order workflow
 * @param {string} currentStatus - Current order status
 * @returns {string|null} Next status or null if no next status
 */
export const getNextStatus = (currentStatus) => {
  const statusFlow = ['pending', 'processing', 'shipped', 'delivered'];
  const currentIndex = statusFlow.indexOf(currentStatus?.toLowerCase());
  
  if (currentIndex === -1 || currentIndex >= statusFlow.length - 1) {
    return null;
  }
  
  return statusFlow[currentIndex + 1];
};

/**
 * Checks if an order can be cancelled
 * @param {string} status - Current order status
 * @returns {boolean} True if the order can be cancelled
 */
export const canCancelOrder = (status) => {
  const nonCancellableStatuses = ['cancelled', 'shipped', 'delivered'];
  return !nonCancellableStatuses.includes(status?.toLowerCase());
};

/**
 * Gets the status progress for the order timeline
 * @param {string} status - Current order status
 * @returns {Object} Progress status for each step
 */
export const getOrderProgress = (status) => {
  const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStatus = status?.toLowerCase();
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  return {
    isPending: true,
    isProcessing: currentIndex >= 1,
    isShipped: currentIndex >= 2,
    isDelivered: currentIndex >= 3,
    currentStatusIndex: Math.max(0, currentIndex)
  };
};
