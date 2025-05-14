import React from 'react';

interface ActivityData {
  day: string;
  posts: number;
}

interface ActivityGraphCardProps {
  activityData: ActivityData[];
  title?: string;
}

const ActivityGraphCard: React.FC<ActivityGraphCardProps> = ({ 
  activityData,
  title = "Weekly Activity"
}) => {
  // Find max value for scaling
  const maxPosts = Math.max(...activityData.map(d => d.posts));
  
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="font-bold text-black dark:text-white">{title}</h2>
      </div>
      <div className="p-3">
        <div className="flex items-end justify-between h-20 mb-1">
          {activityData.map((day, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <div 
                className="w-5/6 bg-blue-100 dark:bg-blue-900/30 rounded-t" 
                style={{ 
                  height: `${(day.posts / maxPosts) * 100}%`,
                  backgroundColor: day.posts > 0 
                    ? `rgba(${59 + (day.posts / maxPosts) * 100}, ${130 + (day.posts / maxPosts) * 40}, ${246}, ${0.3 + (day.posts / maxPosts) * 0.7})` 
                    : '' 
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
          {activityData.map((day, index) => (
            <div key={index} className="text-center">
              <div>{day.day}</div>
              <div className="font-medium text-gray-700 dark:text-gray-300">{day.posts}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityGraphCard; 