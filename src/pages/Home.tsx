
import React, { useState, useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import VideoSkeleton from '@/components/VideoSkeleton';

const Home = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock video data
  const mockVideos = [
    {
      id: '1',
      title: 'Building Amazing React Applications with Modern Tools',
      thumbnail: 'photo-1498050108023-c5249f4df085',
      channel: 'Tech Tutorials',
      views: '125K views',
      uploadDate: '2 days ago',
      duration: '15:32'
    },
    {
      id: '2',
      title: 'The Future of Web Development: Trends to Watch',
      thumbnail: 'photo-1461749280684-dccba630e2f6',
      channel: 'CodeMaster',
      views: '89K views',
      uploadDate: '1 week ago',
      duration: '22:15'
    },
    {
      id: '3',
      title: 'Creative Coding: Building Interactive Experiences',
      thumbnail: 'photo-1488590528505-98d2b5aba04b',
      channel: 'Creative Dev',
      views: '203K views',
      uploadDate: '3 days ago',
      duration: '18:45'
    },
    {
      id: '4',
      title: 'Mastering JavaScript: Advanced Concepts Explained',
      thumbnail: 'photo-1581091226825-a6a2a5aee158',
      channel: 'JS Academy',
      views: '67K views',
      uploadDate: '5 days ago',
      duration: '28:12'
    },
    {
      id: '5',
      title: 'UI/UX Design Principles for Developers',
      thumbnail: 'photo-1531297484001-80022131f5a1',
      channel: 'Design Code',
      views: '156K views',
      uploadDate: '1 day ago',
      duration: '12:33'
    },
    {
      id: '6',
      title: 'Building Responsive Layouts with CSS Grid',
      thumbnail: 'photo-1605810230434-7631ac76ec81',
      channel: 'CSS Wizards',
      views: '94K views',
      uploadDate: '4 days ago',
      duration: '16:27'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Featured Video Section */}
      <section className="mb-8">
        <div className="relative aspect-video max-w-4xl mx-auto bg-muted rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
            alt="Featured Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Featured: The Complete Guide to Modern Web Development
            </h2>
            <p className="text-lg opacity-90 mb-4">
              Learn the latest technologies and best practices • 2.5M views
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
              Watch Now
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Videos */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommended for you</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <VideoSkeleton key={index} />
            ))
          ) : (
            videos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                channel={video.channel}
                views={video.views}
                uploadDate={video.uploadDate}
                duration={video.duration}
              />
            ))
          )}
        </div>

        {/* Load More */}
        {!loading && (
          <div className="flex justify-center mt-8">
            <button className="bg-muted hover:bg-muted/80 px-8 py-3 rounded-lg transition-colors">
              Load More Videos
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
