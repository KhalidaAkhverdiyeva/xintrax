


export const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-[#E8FAF5] text-green-500';
      case 'Medium':
        return 'bg-[#FFF9EE] text-[#FFC85D]';
      case 'High':
        return 'bg-[#FFECEC] text-[#FB4242]';
      default:
        return 'bg-gray-500 text-white';
    }
  };
