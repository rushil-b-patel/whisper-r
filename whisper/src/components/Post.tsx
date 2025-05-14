import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import CommentThread from './CommentThread';
import VoteButtons from './VoteButtons';
import { ShareIcon, ChatBubbleIcon } from './Icons';

export interface PostProps {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: Date;
  voteCount: number;
  commentCount: number;
  anonymous: boolean;
  subreddit?: string;
  author?: string;
}

export default function Post({ 
  id, 
  title, 
  content, 
  imageUrl, 
  videoUrl, 
  createdAt, 
  voteCount: initialVoteCount, 
  commentCount,
  anonymous,
  subreddit = 'campuswhisper',
  author = 'Anonymous'
}: PostProps) {
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event from bubbling up
    setShowComments(!showComments);
  };

  return (
    <Link href={`/post/${id}`} className="block">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden mb-3 hover:border-gray-300 dark:hover:border-gray-700">
        <div className="p-3">
          {/* Post header/metadata */}
          <div className="mb-2">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              {!anonymous && (
                <>
                  <span className="font-medium text-black dark:text-white">r/{subreddit}</span>
                  <span className="mx-1">•</span>
                </>
              )}
              <span>Posted by {anonymous ? 'Anonymous' : `u/${author}`}</span>
              <span className="mx-1">•</span>
              <span>{formatDistanceToNow(createdAt, { addSuffix: false })} ago</span>
            </div>
          </div>
          
          {/* Post content */}
          <div>
            <h2 className="text-xl font-medium mb-2 text-black dark:text-white leading-tight">
              {title}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-sm mb-3">
              {content}
            </p>
          </div>
          
          {/* Media attachments */}
          {imageUrl && (
            <div className="mb-3 relative aspect-video max-h-96 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
              <Image 
                src={imageUrl} 
                alt={`Image for ${title}`} 
                fill
                className="object-contain"
              />
            </div>
          )}
          
          {videoUrl && (
            <div className="mb-3 relative aspect-video overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
              <video 
                src={videoUrl}
                controls
                className="w-full h-full"
                onClick={(e) => e.stopPropagation()} // Allow video controls to work
              />
            </div>
          )}
          
          {/* Action buttons row */}
          <div className="flex items-center space-x-6 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            {/* Vote buttons */}
            <VoteButtons 
              initialCount={initialVoteCount} 
              orientation="horizontal" 
              className="mr-1"
            />
            
            {/* Comment button */}
            <button 
              onClick={handleToggleComments}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-full text-sm"
            >
              <ChatBubbleIcon className="w-4 h-4 mr-1.5" />
              <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
            </button>
            
            {/* Share button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText(window.location.origin + `/post/${id}`);
                alert('Link copied to clipboard!');
              }}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-full text-sm"
            >
              <ShareIcon className="w-4 h-4 mr-1.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
        
        {/* Comments */}
        {showComments && (
          <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4" onClick={(e) => e.stopPropagation()}>
            <CommentThread postId={id} />
          </div>
        )}
      </div>
    </Link>
  );
} 