import React from 'react';

export interface UserStatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const UserStat = ({ label, value, icon }: UserStatProps) => {
  return (
    <div className="flex justify-between items-center py-2.5 text-sm border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-center">
        {icon && <span className="mr-2 text-gray-500 dark:text-gray-400">{icon}</span>}
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
      </div>
      <span className="text-black dark:text-white font-medium">{value}</span>
    </div>
  );
};

export default UserStat; 