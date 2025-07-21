export const formatTime = (timestamp: number): string => {
    if (!timestamp) return '';
  
    try {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      console.error("Invalid timestamp in formatTime:", error);
      return '';
    }
  };