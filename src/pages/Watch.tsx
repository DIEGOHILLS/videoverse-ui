
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');

  // Mock video data
  const currentVideo = {
    id: videoId || '1',
    title: 'Building Amazing React Applications with Modern Tools',
    thumbnail: 'photo-1498050108023-c5249f4df085',
    channel: 'Tech Tutorials',
    views: '125,847',
    likes: '3.2K',
    uploadDate: '2 days ago',
    subscribers: '245K',
    description: `In this comprehensive tutorial, we'll explore the modern React ecosystem and learn how to build scalable applications using the latest tools and best practices.

🔥 What you'll learn:
• React 18 features and improvements
• State management with Context API
• Building reusable components
• Performance optimization techniques
• Testing strategies

⏰ Timestamps:
00:00 Introduction
02:15 Setting up the project
05:30 Component architecture
12:45 State management
18:20 Performance tips
22:15 Conclusion

📚 Resources:
- GitHub repository: github.com/example/react-tutorial
- Documentation: reactjs.org
- Community Discord: discord.gg/react

Don't forget to like and subscribe for more web development content!`
  };

  const relatedVideos = [
    {
      id: '2',
      title: 'Advanced React Patterns You Should Know',
      thumbnail: 'photo-1461749280684-dccba630e2f6',
      channel: 'React Masters',
      views: '89K views',
      uploadDate: '1 week ago',
      duration: '22:15'
    },
    {
      id: '3',
      title: 'TypeScript + React: Complete Guide',
      thumbnail: 'photo-1488590528505-98d2b5aba04b',
      channel: 'TypeScript Hub',
      views: '156K views',
      uploadDate: '3 days ago',
      duration: '35:20'
    },
    {
      id: '4',
      title: 'React Performance Optimization',
      thumbnail: 'photo-1581091226825-a6a2a5aee158',
      channel: 'Performance Pro',
      views: '67K views',
      uploadDate: '5 days ago',
      duration: '18:45'
    }
  ];

  const comments = [
    {
      id: '1',
      author: 'DevMaster',
      content: 'Excellent tutorial! The explanations are crystal clear and the examples are really helpful.',
      likes: 42,
      replies: 3,
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      author: 'ReactNinja',
      content: 'This is exactly what I was looking for. Thanks for covering the modern approaches!',
      likes: 28,
      replies: 1,
      timeAgo: '5 hours ago'
    },
    {
      id: '3',
      author: 'CodeNewbie',
      content: 'As a beginner, this helped me understand React so much better. Great work!',
      likes: 15,
      replies: 0,
      timeAgo: '1 day ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Video Player */}
          <VideoPlayer 
            thumbnail={currentVideo.thumbnail}
            title={currentVideo.title}
          />

          {/* Video Metadata */}
          <div className="space-y-4">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              {currentVideo.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-muted-foreground">
                {currentVideo.views} views • {currentVideo.uploadDate}
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" className="gap-2">
                  👍 {currentVideo.likes}
                </Button>
                <Button variant="outline">
                  👎
                </Button>
                <Button variant="outline">
                  Share
                </Button>
                <Button variant="outline">
                  Save
                </Button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-center justify-between py-4 border-t border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">TT</span>
                </div>
                <div>
                  <h3 className="font-medium">{currentVideo.channel}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentVideo.subscribers} subscribers
                  </p>
                </div>
              </div>
              
              <Button className="gap-2">
                <Bell className="w-4 h-4" />
                Subscribe
              </Button>
            </div>

            {/* Description */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="whitespace-pre-line text-sm">
                {currentVideo.description}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-medium">Comments ({comments.length})</h3>
              <Button variant="ghost" size="sm">
                Sort by
              </Button>
            </div>

            {/* Add Comment */}
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <input 
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full bg-transparent border-b border-muted-foreground/30 pb-2 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-primary">
                      {comment.author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm" className="h-6 px-0 gap-1">
                        👍 {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-0">
                        👎
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-0">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="space-y-4">
          <h3 className="font-medium">Up next</h3>
          <div className="space-y-4">
            {relatedVideos.map((video) => (
              <div key={video.id} className="flex gap-3 cursor-pointer group">
                <div className="relative w-40 aspect-video bg-muted rounded overflow-hidden shrink-0">
                  <img 
                    src={`https://images.unsplash.com/${video.thumbnail}?auto=format&fit=crop&w=300&q=80`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{video.channel}</p>
                  <p className="text-xs text-muted-foreground">
                    {video.views} • {video.uploadDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
