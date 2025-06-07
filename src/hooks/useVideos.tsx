
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  video_url?: string;
  duration?: string;
  views: number;
  likes: number;
  dislikes: number;
  channel_id: string;
  created_at: string;
  updated_at: string;
  channels?: {
    name: string;
    avatar_url?: string;
  };
}

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select(`
          id,
          title,
          description,
          thumbnail_url,
          video_url,
          duration,
          views,
          likes,
          dislikes,
          channel_id,
          created_at,
          updated_at,
          channels (
            name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Video[];
    }
  });
};

export const useVideo = (id: string) => {
  return useQuery({
    queryKey: ['video', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select(`
          id,
          title,
          description,
          thumbnail_url,
          video_url,
          duration,
          views,
          likes,
          dislikes,
          channel_id,
          created_at,
          updated_at,
          channels (
            name,
            avatar_url,
            subscribers_count
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Video & { channels: { name: string; avatar_url?: string; subscribers_count: number } };
    }
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ title, description, videoFile, thumbnailFile }: {
      title: string;
      description?: string;
      videoFile: File;
      thumbnailFile: File;
    }) => {
      if (!user) throw new Error('User not authenticated');

      // Upload video file
      const videoFileName = `${user.id}/${Date.now()}-${videoFile.name}`;
      const { data: videoData, error: videoError } = await supabase.storage
        .from('videos')
        .upload(videoFileName, videoFile);

      if (videoError) throw videoError;

      // Upload thumbnail file
      const thumbnailFileName = `${user.id}/${Date.now()}-${thumbnailFile.name}`;
      const { data: thumbnailData, error: thumbnailError } = await supabase.storage
        .from('thumbnails')
        .upload(thumbnailFileName, thumbnailFile);

      if (thumbnailError) throw thumbnailError;

      // Get public URLs
      const { data: { publicUrl: videoUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(videoData.path);

      const { data: { publicUrl: thumbnailUrl } } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(thumbnailData.path);

      // Create video record
      const { data, error } = await supabase
        .from('videos')
        .insert({
          title,
          description,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl,
          channel_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video uploaded successfully!');
    },
    onError: (error) => {
      toast.error('Failed to upload video: ' + error.message);
    }
  });
};

export const useIncrementViews = () => {
  return useMutation({
    mutationFn: async (videoId: string) => {
      const { error } = await supabase.rpc('increment_video_views', {
        video_id: videoId
      });
      if (error) throw error;
    }
  });
};
