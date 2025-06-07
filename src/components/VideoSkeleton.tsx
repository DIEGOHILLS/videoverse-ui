
import React from 'react';

const VideoSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="aspect-video bg-muted rounded-lg mb-3" />
      
      {/* Content Skeleton */}
      <div className="flex gap-3">
        {/* Avatar Skeleton */}
        <div className="w-9 h-9 bg-muted rounded-full shrink-0" />
        
        {/* Text Skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
