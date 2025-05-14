import React from 'react';
import Link from 'next/link';
import UserStat from '../ui/UserStat';

interface UserStatsCardProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }>;
  detailsLink?: string;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({ 
  stats, 
  detailsLink = '/analytics' 
}) => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="font-bold text-black dark:text-white">Stats</h2>
        <Link href={detailsLink} className="text-blue-500 hover:text-blue-600 text-xs">View Details</Link>
      </div>
      <div className="p-3">
        {stats.map((stat, index) => (
          <UserStat 
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default UserStatsCard; 