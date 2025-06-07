
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  uploadDate: string;
  duration?: string;
  channelAvatar?: string;
}

const VideoCard = ({ 
  id, 
  title, 
  thumbnail, 
  channel, 
  views, 
  uploadDate, 
  duration = "10:34",
  channelAvatar 
}: VideoCardProps) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/watch?v=${id}`);
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-3">
        <img 
          src={`https://images.unsplash.com/${thumbnail}?auto=format&fit=crop&w=400&q=80`}
          alt={title}
          className="w-full h-full object-cover video-thumbnail"
          loading="lazy"
        />
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="w-9 h-9 bg-primary/20 rounded-full overflow-hidden shrink-0">
          {channelAvatar ? (
            <img 
              src={channelAvatar}
              alt={channel}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary font-medium">
              {channel.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 leading-5 mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            {channel}
          </p>
          <div className="text-sm text-muted-foreground">
            {views} • {uploadDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
