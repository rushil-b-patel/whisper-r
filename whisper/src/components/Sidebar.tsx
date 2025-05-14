import Link from 'next/link';
import { HomeIcon } from './Icons';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active = false }: SidebarItemProps) => {
  return (
    <Link 
      href={href}
      className={`flex items-center p-2 rounded-md text-sm ${
        active 
          ? 'bg-gray-100 dark:bg-gray-800 font-medium text-black dark:text-white' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Link>
  );
};

interface SidebarCommunityProps {
  name: string;
  href: string;
  active?: boolean;
  emoji?: string;
}

const SidebarCommunity = ({ name, href, active = false, emoji }: SidebarCommunityProps) => {
  return (
    <Link 
      href={href}
      className={`flex items-center p-2 rounded-md text-sm ${
        active 
          ? 'bg-gray-100 dark:bg-gray-800 font-medium text-black dark:text-white' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {emoji && <span className="w-6 h-6 mr-2 flex items-center justify-center">{emoji}</span>}
      <span>r/{name}</span>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      {/* Create post button */}
      <Link 
        href="/create" 
        className="w-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm py-2.5 px-4 rounded-md mb-6 hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        Create Post
      </Link>
      
      {/* Main navigation */}
      <div className="mb-6">
        <SidebarItem 
          icon={<HomeIcon className="w-5 h-5" />}
          label="Home"
          href="/"
          active={true}
        />
        <SidebarItem 
          icon={<span className="w-5 h-5 flex items-center justify-center">🔥</span>}
          label="Popular"
          href="/popular"
        />
        <SidebarItem 
          icon={<span className="w-5 h-5 flex items-center justify-center">⭐</span>}
          label="All"
          href="/all"
        />
      </div>
      
      {/* Communities */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
          Your Communities
        </h3>
        <SidebarCommunity 
          name="ComputerScience"
          href="/r/ComputerScience"
          emoji="🖥️"
        />
        <SidebarCommunity 
          name="CivilEngineering"
          href="/r/CivilEngineering"
          emoji="🏗️"
        />
        <SidebarCommunity 
          name="InfoTech"
          href="/r/InfoTech"
          emoji="📱"
        />
        <SidebarCommunity 
          name="IoTandAI"
          href="/r/IoTandAI"
          emoji="🔌"
        />
        <SidebarCommunity 
          name="ElectricalEng"
          href="/r/ElectricalEng"
          emoji="⚡"
        />
      </div>
      
      {/* Campus Topics */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
          Campus Topics
        </h3>
        <SidebarCommunity 
          name="GamingClub"
          href="/r/GamingClub"
          emoji="🎮"
        />
        <SidebarCommunity 
          name="DramaSociety"
          href="/r/DramaSociety"
          emoji="🎭"
        />
        <SidebarCommunity 
          name="MusicClub"
          href="/r/MusicClub"
          emoji="🎵"
        />
        <SidebarCommunity 
          name="ArtDesign"
          href="/r/ArtDesign"
          emoji="🎨"
        />
      </div>
      
      {/* Sports */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
          Sports
        </h3>
        <SidebarCommunity 
          name="Football"
          href="/r/Football"
          emoji="⚽"
        />
        <SidebarCommunity 
          name="Cricket"
          href="/r/Cricket"
          emoji="🏏"
        />
        <SidebarCommunity 
          name="Badminton"
          href="/r/Badminton"
          emoji="🏸"
        />
        <SidebarCommunity 
          name="Basketball"
          href="/r/Basketball"
          emoji="🏀"
        />
      </div>
    </div>
  );
} 