'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { SearchIcon, LogoIcon, TrendingIcon, ControversialIcon, TopIcon } from "@/components/Icons";
import { useRouter } from "next/navigation";

export default function AuthHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 py-2 sticky top-0 z-10">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 text-orange-500">
                <LogoIcon />
              </div>
            </div>
            <h1 className="text-xl font-semibold text-black dark:text-white">
              whisper
            </h1>
          </Link>
        </div>
        
        <div className="w-full max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
            <div className="absolute right-3 top-2.5">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="flex items-center group relative">
              <Link href="/profile" className="flex items-center space-x-2 p-1 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block mr-1">u/{user.username}</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img 
                    src={user.avatarUrl || "https://i.pravatar.cc/100?img=70"}
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400 hidden sm:block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </Link>
              
              <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 z-20">
                <div className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">u/{user.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{(user.karma / 1000).toFixed(1)}k karma</p>
                </div>
                <div className="py-1">
                  <Link href="/profile" className="block px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href="/signin" className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-2 px-6 sm:hidden">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
          />
          <div className="absolute right-3 top-2.5">
            <SearchIcon className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
      
      <div className="mt-2 px-6 flex items-center space-x-1 sm:hidden overflow-x-auto">
        <Link href="/?sort=trending" className="flex items-center px-3 py-1.5 text-xs text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 rounded-full whitespace-nowrap">
          <TrendingIcon className="w-3.5 h-3.5 mr-1" />
          Trending
        </Link>
        
        <Link href="/?sort=controversial" className="flex items-center px-3 py-1.5 text-xs text-gray-500 bg-transparent rounded-full whitespace-nowrap">
          <ControversialIcon className="w-3.5 h-3.5 mr-1" />
          Controversial
        </Link>
        
        <Link href="/?sort=top" className="flex items-center px-3 py-1.5 text-xs text-gray-500 bg-transparent rounded-full whitespace-nowrap">
          <TopIcon className="w-3.5 h-3.5 mr-1" />
          Top
        </Link>
      </div>
    </header>
  );
} 