'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Post, { PostProps } from '@/components/Post';
import CommentThread from '@/components/CommentThread';
import { formatDistanceToNow } from 'date-fns';

// Create static dates for sample data to avoid hydration mismatches
const SAMPLE_POST: PostProps = {
  id: '1',
  title: "What's something you've gotten away with as a kid because \"they're young and don't know what they're doing!\" when really you knew exactly what you were going?",
  content: "I'm curious to hear your childhood stories where adults gave you a pass because they thought you were just an innocent kid, but you actually knew exactly what you were doing.",
  createdAt: new Date('2023-08-15T12:00:00Z'), // Use static date
  voteCount: 28200,
  commentCount: 3000,
  anonymous: false,
  author: 'coochieforbreakfast',
  subreddit: 'AskReddit'
};

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<PostProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, you would fetch the post data from your API
    // For now, we'll simulate loading the data
    const fetchPost = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use the sample post data
        setPost(SAMPLE_POST);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load post. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [postId]);
  
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-5/6"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center">
          <h2 className="text-xl font-semibold text-rose-500 mb-2">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {error || 'Post not found. It may have been removed or never existed.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 px-4 py-2 text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 rounded-full shadow-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto pb-14 px-4 sm:px-0">
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 mb-4 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to feed
      </button>
      
      {/* Post container with enhanced styling */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm mb-4">
        <div className="p-4">
          {/* Post header/metadata */}
          <div className="mb-2">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-black dark:text-white">r/{post.subreddit || 'campuswhisper'}</span>
              <span className="mx-1">•</span>
              <span>Posted by u/{post.author || 'Anonymous'}</span>
              <span className="mx-1">•</span>
              <span suppressHydrationWarning>{formatDistanceToNow(post.createdAt, { addSuffix: false })} ago</span>
            </div>
          </div>
          
          {/* Post content */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-3 text-black dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="text-gray-800 dark:text-gray-200 text-base mb-4">
              {post.content}
            </p>
          </div>
          
          {/* Media attachments if present */}
          {post.imageUrl && (
            <div className="mb-4 relative aspect-video max-h-96 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
              <img 
                src={post.imageUrl} 
                alt={`Image for ${post.title}`}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          
          {/* Action buttons row */}
          <div className="flex items-center space-x-6 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            {/* Vote buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                </svg>
              </button>
              
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {post.voteCount >= 1000 ? `${(post.voteCount / 1000).toFixed(1).replace(/\.0$/, '')}k` : post.voteCount}
              </span>
              
              <button className="p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Comment count */}
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-1.5" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
              </svg>
              <span>{post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}</span>
            </div>
            
            {/* Share button */}
            <button className="flex items-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-full text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935-2.186" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Comments section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="p-4">
          <CommentThread postId={postId} />
        </div>
      </div>
    </div>
  );
} 