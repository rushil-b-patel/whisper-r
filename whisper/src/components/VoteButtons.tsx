import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from './Icons';

interface VoteButtonsProps {
  initialCount: number;
  orientation?: 'vertical' | 'horizontal'; 
  onVote?: (direction: 'up' | 'down', newCount: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function VoteButtons({ 
  initialCount, 
  orientation = 'vertical',
  onVote,
  size = 'md',
  className = ''
}: VoteButtonsProps) {
  const [voteCount, setVoteCount] = useState(initialCount);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (e: React.MouseEvent, vote: 'up' | 'down') => {
    e.preventDefault();
    e.stopPropagation();
    
    let newCount = voteCount;
    
    if (userVote === vote) {
      // User is removing their vote
      setUserVote(null);
      newCount = vote === 'up' ? voteCount - 1 : voteCount + 1;
    } else {
      // User is changing vote or voting for the first time
      const voteChange = userVote ? 2 : 1;
      setUserVote(vote);
      newCount = vote === 'up' 
        ? voteCount + voteChange 
        : voteCount - voteChange;
    }
    
    setVoteCount(newCount);
    if (onVote) onVote(vote, newCount);
  };

  // Format vote count for display
  const formatVoteCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return count.toString();
  };

  // Size classes
  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];

  const countSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-bold'
  }[size];

  // Layout direction
  const flexDirection = orientation === 'vertical' ? 'flex-col' : 'flex-row items-center space-x-2';

  return (
    <div className={`flex ${flexDirection} ${className}`}>
      <button 
        onClick={(e) => handleVote(e, 'up')}
        className={`p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
          userVote === 'up' ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'
        }`}
        aria-label="Upvote"
      >
        <ArrowUpIcon className={iconSizeClasses} />
      </button>
      
      <span className={`font-semibold ${countSizeClasses} ${
        userVote === 'up' 
          ? 'text-orange-500' 
          : userVote === 'down' 
            ? 'text-blue-600' 
            : 'text-gray-900 dark:text-gray-100'
      } ${orientation === 'vertical' ? 'text-center my-1' : ''}`}>
        {formatVoteCount(voteCount)}
      </span>
      
      <button 
        onClick={(e) => handleVote(e, 'down')}
        className={`p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
          userVote === 'down' ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'
        }`}
        aria-label="Downvote"
      >
        <ArrowDownIcon className={iconSizeClasses} />
      </button>
    </div>
  );
} 