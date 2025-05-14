import React from 'react';
import Link from 'next/link';

export interface ProfileLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const ProfileLink = ({ icon, label, href }: ProfileLinkProps) => {
  return (
    <Link 
      href={href} 
      className="flex items-center py-2.5 px-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
    >
      <span className="mr-3 text-gray-500 dark:text-gray-400">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default ProfileLink; 