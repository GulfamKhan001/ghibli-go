
import { toast } from "sonner";

export interface VideoMetadata {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
}

export async function fetchVideoMetadata(videoId: string, apiKey: string): Promise<VideoMetadata | null> {
  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch video data');
    }

    const data = await response.json();
    
    // Check if video exists
    if (!data.items || data.items.length === 0) {
      toast.error("Video not found or unavailable");
      return null;
    }

    const videoData = data.items[0];
    const snippet = videoData.snippet;
    const contentDetails = videoData.contentDetails;

    return {
      id: videoId,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
      duration: contentDetails.duration, // ISO 8601 format
      publishedAt: new Date(snippet.publishedAt).toLocaleDateString()
    };
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An error occurred while fetching video data");
    }
    console.error("YouTube API Error:", error);
    return null;
  }
}
