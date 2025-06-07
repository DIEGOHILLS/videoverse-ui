
import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  thumbnail: string;
  title: string;
}

const VideoPlayer = ({ thumbnail, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState([0]);
  const [duration] = useState(634); // Mock duration in seconds
  const videoRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate video progress
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev[0] + 1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return [0];
          }
          return [newTime];
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      {/* Video Area */}
      <div 
        ref={videoRef}
        className="relative aspect-video bg-black cursor-pointer group"
        onClick={togglePlay}
      >
        {/* Video Thumbnail/Placeholder */}
        <img 
          src={`https://images.unsplash.com/${thumbnail}?auto=format&fit=crop&w=1200&q=80`}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button 
              size="icon"
              className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black"
            >
              <Play className="w-8 h-8 ml-1" />
            </Button>
          </div>
        )}

        {/* Loading Indicator */}
        {isPlaying && (
          <div className="absolute top-4 left-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black p-4 space-y-3">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 text-white text-sm">
          <span>{formatTime(currentTime[0])}</span>
          <Slider
            value={currentTime}
            onValueChange={setCurrentTime}
            max={duration}
            className="flex-1"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              <Play className={`w-5 h-5 ${isPlaying ? 'hidden' : 'block'}`} />
              <div className={`w-5 h-5 ${isPlaying ? 'block' : 'hidden'}`}>
                <div className="flex gap-1">
                  <div className="w-1.5 h-5 bg-current"></div>
                  <div className="w-1.5 h-5 bg-current"></div>
                </div>
              </div>
            </Button>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={setVolume}
                max={100}
                className="w-20"
              />
            </div>
          </div>

          <Button 
            variant="ghost"
            className="text-white hover:bg-white/20 text-sm"
          >
            Fullscreen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
