import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ReplyIcon } from './Icons';
import VoteButtons from './VoteButtons';

export interface CommentData {
  id: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  createdAt: Date;
  voteCount: number;
  replies: CommentData[];
}

interface CommentProps {
  comment: CommentData;
  level?: number;
  onReply?: (parentId: string, content: string, isAnonymous: boolean) => void;
}

export default function Comment({ comment, level = 0, onReply }: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  
  const MAX_REPLIES_SHOWN = 3;
  const hasMultipleReplies = comment.replies.length > MAX_REPLIES_SHOWN;
  const visibleReplies = showAllReplies 
    ? comment.replies 
    : comment.replies.slice(0, MAX_REPLIES_SHOWN);
  
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (onReply && replyContent.trim()) {
      onReply(comment.id, replyContent, isAnonymous);
      setReplyContent('');
      setShowReplyForm(false);
    }
  };
  
  // Format vote count
  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return count.toString();
  };
  
  if (collapsed) {
    return (
      <div className={`${level > 0 ? 'ml-5 pl-4 border-l border-gray-200 dark:border-gray-700' : ''} mb-3`}>
        <div 
          className="text-xs text-gray-500 dark:text-gray-400 py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
          onClick={() => setCollapsed(false)}
        >
          <span className="mr-2">+</span>
          <span className="font-medium">{comment.isAnonymous ? 'Anonymous' : comment.author}</span>
          <span className="mx-1">•</span>
          <span>{formatCount(comment.voteCount)} points</span>
          <span className="mx-1">•</span>
          <span suppressHydrationWarning>{formatDistanceToNow(comment.createdAt)} ago</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${level > 0 ? 'ml-5 pl-4 border-l border-gray-200 dark:border-gray-700' : ''} mb-4`}>
      <div className="group">
        <div className="flex">
          <div className="mr-2">
            <VoteButtons 
              initialCount={comment.voteCount} 
              orientation="vertical"
              size="sm"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-200">
                {comment.isAnonymous ? 'Anonymous' : comment.author}
              </span>
              <span className="mx-1">•</span>
              <span suppressHydrationWarning>
                {formatDistanceToNow(comment.createdAt)} ago
              </span>
            </div>
            
            <div className="text-sm text-gray-800 dark:text-gray-300 mb-2">
              {comment.content}
            </div>
            
            <div className="flex items-center space-x-3 mb-2">
              <button 
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ReplyIcon className="w-3.5 h-3.5 mr-1" />
                Reply
              </button>
              
              <button 
                onClick={() => setCollapsed(true)}
                className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Collapse
              </button>
              
              {level === 0 && (
                <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  Share
                </button>
              )}
              
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                Report
              </button>
            </div>
            
            {showReplyForm && (
              <form onSubmit={handleSubmitReply} className="mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-2 border border-gray-200 dark:border-gray-700">
                  <textarea
                    className="w-full p-2 mb-2 text-sm bg-gray-50 dark:bg-gray-800 border-none focus:outline-none focus:ring-0 dark:text-white resize-none"
                    placeholder={`Replying to ${comment.isAnonymous ? 'Anonymous' : comment.author}`}
                    rows={3}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    required
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowReplyForm(false)}
                        className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!replyContent.trim()}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            
            {/* Render replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3">
                {visibleReplies.map(reply => (
                  <Comment key={reply.id} comment={reply} level={level + 1} onReply={onReply} />
                ))}
                
                {hasMultipleReplies && !showAllReplies && (
                  <div 
                    className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 
                              ml-5 pl-4 border-l border-gray-200 dark:border-gray-700 py-2 cursor-pointer"
                    onClick={() => setShowAllReplies(true)}
                  >
                    Show {comment.replies.length - MAX_REPLIES_SHOWN} more {comment.replies.length - MAX_REPLIES_SHOWN === 1 ? 'reply' : 'replies'}
                  </div>
                )}
                
                {hasMultipleReplies && showAllReplies && (
                  <div 
                    className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 
                              ml-5 pl-4 border-l border-gray-200 dark:border-gray-700 py-2 cursor-pointer"
                    onClick={() => setShowAllReplies(false)}
                  >
                    Show less
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 