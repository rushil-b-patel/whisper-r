import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Comment, { CommentData } from './Comment';

interface CommentThreadProps {
  postId: string;
}

// Enhanced sample data for testing with more realistic comments and nested threads - using static dates
const DUMMY_COMMENTS: CommentData[] = [
  {
    id: '1',
    content: "When I was about 7, I broke my mom's favorite ceramic figurine. I told her that our dog must have knocked it over. She believed me and the poor dog got in trouble. I still feel guilty about it 20 years later.",
    author: 'MemoryLane',
    isAnonymous: false,
    createdAt: new Date('2023-08-15T09:00:00Z'), // Static date
    voteCount: 1542,
    replies: [
      {
        id: '2',
        content: "I did something similar! I spilled juice on our new couch and blamed my little brother. My parents made him sit in time-out. I confessed years later and my mom still brings it up at family gatherings.",
        author: 'GuiltyConscience',
        isAnonymous: false,
        createdAt: new Date('2023-08-15T10:00:00Z'), // Static date
        voteCount: 732,
        replies: [
          {
            id: '6',
            content: "The worst is when you forget you lied about something and then get called out years later when the truth somehow emerges. The shame never goes away!",
            author: 'TruthSeeker',
            isAnonymous: false,
            createdAt: new Date('2023-08-15T10:30:00Z'), // Static date
            voteCount: 201,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: '3',
    content: "I once convinced my teacher I didn't know how to read yet so I wouldn't have to do the reading assignments. This worked for about 2 months until my mom mentioned during a parent-teacher conference how much I loved reading at home.",
    author: 'SlickRick',
    isAnonymous: false,
    createdAt: new Date('2023-08-15T08:00:00Z'), // Static date
    voteCount: 3854,
    replies: [
      {
        id: '4',
        content: "That's genius level laziness. I'm impressed.",
        author: 'LazyGenius',
        isAnonymous: false,
        createdAt: new Date('2023-08-15T08:30:00Z'), // Static date
        voteCount: 1204,
        replies: []
      }
    ]
  },
  {
    id: '5',
    content: "I told my parents I didn't know how to tie my shoes until I was 8 because I just didn't want to do it. My dad would always tie them for me before school, and I just liked the extra attention.",
    author: 'Nostalgic90sKid',
    isAnonymous: false,
    createdAt: new Date('2023-08-15T07:00:00Z'), // Static date
    voteCount: 925,
    replies: []
  }
];

export default function CommentThread({ postId }: CommentThreadProps) {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState<CommentData[]>(DUMMY_COMMENTS);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [sortBy, setSortBy] = useState<'best' | 'new' | 'controversial'>('best');
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit this to your backend
    if (commentContent.trim()) {
      const newComment: CommentData = {
        id: Date.now().toString(),
        content: commentContent,
        author: 'CurrentUser', // This would come from auth
        isAnonymous: isAnonymous,
        createdAt: new Date(),
        voteCount: 1, // Auto upvote own comment
        replies: []
      };
      
      setComments([newComment, ...comments]);
      setCommentContent('');
    }
  };
  
  const handleReply = (parentId: string, content: string, isAnonymous: boolean) => {
    // This is a simplified version - in a real app you would have proper nested updates
    const addReply = (items: CommentData[]): CommentData[] => {
      return items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            replies: [
              ...item.replies,
              {
                id: Date.now().toString(),
                content: content,
                author: 'CurrentUser',
                isAnonymous: isAnonymous,
                createdAt: new Date(),
                voteCount: 1,
                replies: []
              }
            ]
          };
        } else if (item.replies.length > 0) {
          return {
            ...item,
            replies: addReply(item.replies)
          };
        }
        return item;
      });
    };
    
    setComments(addReply(comments));
  };
  
  // Sort comments based on the selected sort option
  const sortedComments = [...comments].sort((a, b) => {
    switch(sortBy) {
      case 'new':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'controversial':
        // Simplified controversy score - in a real app this would be more complex
        return b.replies.length - a.replies.length;
      case 'best':
      default:
        return b.voteCount - a.voteCount;
    }
  });
  
  const commentCount = sortedComments.length;
  
  return (
    <div>
      {/* Comment input section with improved styling */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          {commentCount > 0 ? `${commentCount} Comments` : 'No comments yet'}
        </h3>
        
        <div className="mb-4 flex items-center space-x-4">
          <button 
            onClick={() => setSortBy('best')}
            className={`text-sm font-medium ${sortBy === 'best' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Best
          </button>
          <button 
            onClick={() => setSortBy('new')}
            className={`text-sm font-medium ${sortBy === 'new' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            New
          </button>
          <button 
            onClick={() => setSortBy('controversial')}
            className={`text-sm font-medium ${sortBy === 'controversial' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Controversial
          </button>
        </div>
        
        <form onSubmit={handleSubmitComment}>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-2">
            <textarea
              className="w-full p-3 mb-2 bg-gray-50 dark:bg-gray-800 border-none focus:outline-none focus:ring-0 dark:text-white resize-none"
              placeholder="What are your thoughts?"
              rows={4}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
            />
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-full hover:bg-blue-600 transition duration-150"
                disabled={!commentContent.trim()}
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Comments list with improved styling */}
      {commentCount > 0 ? (
        <div className="space-y-4">
          {sortedComments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onReply={handleReply}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">Be the first to comment!</p>
        </div>
      )}
    </div>
  );
} 