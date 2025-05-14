import React from 'react';
import ProfileLink from '../ui/ProfileLink';

interface QuickLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface QuickLinksCardProps {
  links: QuickLink[];
  title?: string;
}

const QuickLinksCard: React.FC<QuickLinksCardProps> = ({
  links,
  title = "Quick Links"
}) => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="font-bold text-black dark:text-white">{title}</h2>
      </div>
      <div className="p-2">
        {links.map((link, index) => (
          <ProfileLink 
            key={index}
            icon={link.icon}
            label={link.label}
            href={link.href}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickLinksCard; 