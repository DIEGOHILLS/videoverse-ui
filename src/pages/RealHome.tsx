
import React from 'react';
import { useVideos } from '@/hooks/useVideos';
import RealVideoCard from '@/components/RealVideoCard';
import VideoSkeleton from '@/components/VideoSkeleton';

const RealHome = () => {
  const { data: videos, isLoading, error } = useVideos();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground">Failed to load videos. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Featured Section */}
      {videos && videos.length > 0 && (
        <section className="mb-8">
          <div className="relative aspect-video max-w-4xl mx-auto bg-muted rounded-xl overflow-hidden">
            <img 
              src={videos[0].thumbnail_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"}
              alt="Featured Video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {videos[0].title}
              </h2>
              <p className="text-lg opacity-90 mb-4">
                {videos[0].channels?.name} • {videos[0].views} views
              </p>
              <button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={() => window.location.href = `/watch?v=${videos[0].id}`}
              >
                Watch Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Videos Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {videos && videos.length > 0 ? 'Latest Videos' : 'Recommended for you'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <VideoSkeleton key={index} />
            ))
          ) : videos && videos.length > 0 ? (
            videos.map((video) => (
              <RealVideoCard key={video.id} video={video} />
            ))
          ) : (
            // No videos message
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to upload a video!</p>
              <button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={() => window.location.href = '/upload'}
              >
                Upload Video
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RealHome;
