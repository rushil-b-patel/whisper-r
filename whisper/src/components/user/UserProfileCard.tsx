import React from 'react';
import Link from 'next/link';
import { SettingsIcon, HelpIcon } from '../ui/Icons';

interface UserProfileCardProps {
  username: string;
  karma: string;
  membershipDuration: string;
  bio: string;
  avatarUrl: string;
  isOnline?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  karma,
  membershipDuration,
  bio,
  avatarUrl,
  isOnline = false
}) => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-28 relative">
        {/* Profile cover photo decoration */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5"></path>
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5"></path>
          </svg>
        </div>
      </div>
      
      <div className="p-4 pt-0 relative">
        {/* Profile picture */}
        <div className="w-20 h-20 rounded-full bg-white dark:bg-black border-4 border-white dark:border-black absolute -top-10 left-4 overflow-hidden shadow-md">
          <img 
            src={avatarUrl} 
            alt={`${username}'s avatar`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* User info - Increased top margin to fix overlap */}
        <div className="mt-14 pl-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black dark:text-white">{username}</h2>
            {isOnline && (
              <div className="flex items-center text-xs">
                <span className="inline-block mr-1.5 w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-gray-500 dark:text-gray-400">Online</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center mt-1 mb-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="mr-2">{karma} karma</span>
            <span className="mx-2">•</span>
            <span>{membershipDuration}</span>
          </div>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 mt-2">
            {bio}
          </p>
          
          {/* User action buttons */}
          <div className="flex items-center space-x-2 mt-3">
            <Link 
              href="/profile" 
              className="flex-1 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-center text-sm font-medium rounded-full transition-colors"
            >
              Edit Profile
            </Link>
            <button 
              className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 rounded-full transition-colors"
            >
              <HelpIcon />
            </button>
            <button 
              className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 rounded-full transition-colors"
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard; 