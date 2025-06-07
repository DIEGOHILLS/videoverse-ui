
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Video } from '@/hooks/useVideos';

interface RealVideoCardProps {
  video: Video;
}

const RealVideoCard = ({ video }: RealVideoCardProps) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/watch?v=${video.id}`);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-3">
        {video.thumbnail_url ? (
          <img 
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-full object-cover video-thumbnail"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No thumbnail</span>
          </div>
        )}
        {/* Duration */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="w-9 h-9 bg-primary/20 rounded-full overflow-hidden shrink-0">
          {video.channels?.avatar_url ? (
            <img 
              src={video.channels.avatar_url}
              alt={video.channels.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary font-medium">
              {video.channels?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 leading-5 mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            {video.channels?.name || 'Unknown Channel'}
          </p>
          <div className="text-sm text-muted-foreground">
            {formatViews(video.views)} views • {formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealVideoCard;
