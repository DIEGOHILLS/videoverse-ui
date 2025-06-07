
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVideo, useIncrementViews } from '@/hooks/useVideos';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Share, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const RealWatch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const { data: video, isLoading, error } = useVideo(videoId || '');
  const incrementViews = useIncrementViews();

  useEffect(() => {
    if (videoId) {
      // Increment view count when video loads
      incrementViews.mutate(videoId);
    }
  }, [videoId]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="aspect-video bg-muted rounded-lg animate-pulse mb-6" />
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Video not found</h2>
          <p className="text-muted-foreground">The video you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Section */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
            {video.video_url ? (
              <video 
                src={video.video_url}
                controls
                className="w-full h-full"
                poster={video.thumbnail_url}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Video not available</p>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <h1 className="text-xl font-bold">{video.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-muted-foreground">
                {formatViews(video.views)} views • {formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  {video.likes}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4" />
                  {video.dislikes}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full overflow-hidden">
                  {video.channels.avatar_url ? (
                    <img 
                      src={video.channels.avatar_url}
                      alt={video.channels.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary font-medium">
                      {video.channels.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{video.channels.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {video.channels.subscribers_count} subscribers
                  </p>
                </div>
              </div>
              <Button className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Subscribe
              </Button>
            </div>

            {/* Description */}
            {video.description && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="whitespace-pre-wrap">{video.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="space-y-4">
          <h3 className="font-semibold">Up next</h3>
          <div className="space-y-4">
            {/* Placeholder for related videos */}
            <div className="text-sm text-muted-foreground">
              Related videos coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealWatch;
