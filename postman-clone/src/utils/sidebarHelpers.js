// Helper functions
export const getMethodColor = (method) => {
  switch(method?.toUpperCase()) {
    case 'GET': return '#61affe';
    case 'POST': return '#fca130';
    case 'PUT': return '#50e3c2';
    case 'PATCH': return '#a78bfa';
    case 'DELETE': return '#f93e3e';
    default: return '#858585';
  }
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const groupHistoryByDate = (history) => {
  const groups = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  history.forEach((item) => {
    const itemDate = new Date(item.created_at);
    const itemDateString = itemDate.toDateString();
    const todayString = today.toDateString();
    const yesterdayString = yesterday.toDateString();

    let label;
    if (itemDateString === todayString) {
      label = 'Today';
    } else if (itemDateString === yesterdayString) {
      label = 'Yesterday';
    } else {
      label = itemDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: itemDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });

  return groups;
};
