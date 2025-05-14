import React from 'react';
import Link from 'next/link';
import { GiftIcon } from '../ui/Icons';

interface GiftCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  icon?: React.ReactNode;
}

const GiftCard: React.FC<GiftCardProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  icon
}) => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden relative">
      <div className="p-3 flex items-center">
        {icon ? (
          <div className="w-14 h-14 flex-shrink-0 mr-3 text-orange-500">
            {icon}
          </div>
        ) : (
          <div className="w-14 h-14 flex-shrink-0 mr-3 text-orange-500">
            <GiftIcon />
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium text-black dark:text-white">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <Link 
        href={buttonHref} 
        className="block w-full p-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white text-center text-sm font-medium transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default GiftCard; 