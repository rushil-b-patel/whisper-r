'use client';

import { useState } from 'react';
import Link from 'next/link';
import Post, { PostProps } from '@/components/Post';
import { TrendingIcon, ControversialIcon, TopIcon } from '@/components/Icons';

const SAMPLE_POSTS: PostProps[] = [
  {
    id: '1',
    title: "What's something you've gotten away with as a kid because \"they're young and don't know what they're doing!\" when really you knew exactly what you were going?",
    content: "I'm curious to hear your childhood stories where adults gave you a pass because they thought you were just an innocent kid, but you actually knew exactly what you were doing.",
    createdAt: new Date(Date.now() - 86400000 * 0.3), // 7 hours ago
    voteCount: 28200,
    commentCount: 3000,
    anonymous: false,
    author: 'coochieforbreakfast',
    subreddit: 'AskReddit'
  },
  {
    id: '2',
    title: 'The cafeteria needs more vegetarian options',
    content: "As a vegetarian, I find it really difficult to find good food options on campus. The salad bar is always wilted by lunch time, and there are rarely hot vegetarian meals available. Anyone else feel the same?",
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 172800000),
    voteCount: 56,
    commentCount: 15,
    anonymous: false,
    author: 'foodlover23',
    subreddit: 'CampusFacilities'
  },
  {
    id: '3',
    title: "Study group for Professor Johnson's Organic Chemistry class?",
    content: 'Looking for fellow students struggling with OChem to form a study group. We could meet at the library twice a week. Anyone interested?',
    createdAt: new Date(Date.now() - 259200000),
    voteCount: 18,
    commentCount: 12,
    anonymous: false,
    author: 'chemistrywhiz',
    subreddit: 'StudyGroups'
  },
  {
    id: '4',
    title: 'Ukraine-Russian war Live Discussion',
    content: 'Get live updates of all happening in Kyiv and Kharkiv. Please keep discussions civil and respect different opinions.',
    imageUrl: 'https://images.unsplash.com/photo-1649861972512-c428803b31c2?q=80&w=1780&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 43200000),
    voteCount: 132,
    commentCount: 287,
    anonymous: false,
    author: 'newswatcher',
    subreddit: 'WorldNews'
  },
  {
    id: '5',
    title: "What's up with YouTube removing the dislike button? What is your opinion?",
    content: "I realize that the main intention was to stop toxic mobs disliking and to promote a sense of positivity, but without the dislike count, it becomes nearly impossible to know which videos are spam, clickbait, outdated or just plain low quality. The dislike count is especially useful for educational and DIY videos.",
    createdAt: new Date(Date.now() - 129600000),
    voteCount: 942,
    commentCount: 358,
    anonymous: false,
    author: 'techenthusiast',
    subreddit: 'YouTube'
  }
];

type SortOption = 'trending' | 'controversial' | 'top' | 'new';

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>(SAMPLE_POSTS);
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  
  const sortedPosts = [...posts].sort((a, b) => {
    switch(sortBy) {
      case 'new':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'controversial':
        return (b.commentCount / (b.voteCount || 1)) - (a.commentCount / (a.voteCount || 1));
      case 'trending':
        const aEngagement = a.voteCount + a.commentCount * 2;
        const bEngagement = b.voteCount + b.commentCount * 2;
        const aAge = (Date.now() - a.createdAt.getTime()) / 3600000;
        const bAge = (Date.now() - b.createdAt.getTime()) / 3600000;
        return (bEngagement / (bAge || 1)) - (aEngagement / (aAge || 1));
      case 'top':
      default:
        return b.voteCount - a.voteCount;
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto pb-4">
      <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-800 md:hidden flex items-center justify-between">
        <h1 className="text-lg font-semibold text-black dark:text-white">Campus Whisper</h1>
      </div>
      
      <div className="hidden md:flex items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <button 
          className={`flex items-center px-3 py-1.5 mr-2 rounded-full text-sm ${
            sortBy === 'trending' 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => setSortBy('trending')}
        >
          <TrendingIcon className="w-4 h-4 mr-1.5" />
          Trending
        </button>
        <button
          className={`flex items-center px-3 py-1.5 mr-2 rounded-full text-sm ${
            sortBy === 'new' 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => setSortBy('new')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          New
        </button>
        <button
          className={`flex items-center px-3 py-1.5 mr-2 rounded-full text-sm ${
            sortBy === 'top' 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => setSortBy('top')}
        >
          <TopIcon className="w-4 h-4 mr-1.5" />
          Top
        </button>
        <button
          className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
            sortBy === 'controversial' 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => setSortBy('controversial')}
        >
          <ControversialIcon className="w-4 h-4 mr-1.5" />
          Controversial
        </button>
      </div>
      
      <div className="space-y-3">
        {sortedPosts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      
      <div className="md:hidden fixed bottom-6 right-6">
        <Link 
          href="/create" 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
