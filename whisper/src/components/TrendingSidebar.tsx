import React from 'react';
import UserProfileCard from './user/UserProfileCard';
import UserStatsCard from './user/UserStatsCard';
import ActivityGraphCard from './cards/ActivityGraphCard';
import QuickLinksCard from './cards/QuickLinksCard';
import GiftCard from './cards/GiftCard';
import { 
  PostIcon, 
  CommentIcon, 
  AwardIcon, 
  CakeIcon, 
  ProfileIcon, 
  SavedIcon, 
  HistoryIcon, 
  AnalyticsIcon 
} from './ui/Icons';

export default function TrendingSidebar() {
  // User Activity Card - Data that would come from API in a real app
  const activityData = [
    { day: 'Mon', posts: 3 },
    { day: 'Tue', posts: 5 },
    { day: 'Wed', posts: 2 },
    { day: 'Thu', posts: 7 },
    { day: 'Fri', posts: 4 },
    { day: 'Sat', posts: 1 },
    { day: 'Sun', posts: 2 }
  ];
  
  // User stats data
  const userStats = [
    { label: "Post Karma", value: "10.2k", icon: <PostIcon /> },
    { label: "Comment Karma", value: "2.3k", icon: <CommentIcon /> },
    { label: "Award Karma", value: "243", icon: <AwardIcon /> },
    { label: "Cake Day", value: "March 12, 2021", icon: <CakeIcon /> }
  ];

  // Quick links data
  const quickLinks = [
    { icon: <ProfileIcon />, label: "View profile", href: "/profile" },
    { icon: <SavedIcon />, label: "Saved posts", href: "/saved" },
    { icon: <HistoryIcon />, label: "History", href: "/history" },
    { icon: <AnalyticsIcon />, label: "Whisper Analytics", href: "/analytics" }
  ];
  
  return (
    <div className="flex flex-col space-y-5">
      {/* User Profile Card */}
      <UserProfileCard
        username="u/goodSamaritan"
        karma="12.5k"
        membershipDuration="2 years on Campus Whisper"
        bio="Computer Science student passionate about AI and web development. Join me on this coding journey!"
        avatarUrl="https://i.pravatar.cc/100?u=goodSamaritan"
        isOnline={true}
      />

      {/* User Stats Card */}
      <UserStatsCard stats={userStats} />

      {/* Activity Graph Card */}
      <ActivityGraphCard activityData={activityData} />

      {/* Quick Links */}
      <QuickLinksCard links={quickLinks} />

      {/* Gift Card */}
      <GiftCard
        title="You have a free award!"
        description="Claim it within 24 hours before it expires"
        buttonText="Open gift box"
        buttonHref="/claim-gift"
      />
    </div>
  );
} 