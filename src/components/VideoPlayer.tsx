
import React from 'react';
import { Card } from "@/components/ui/card";

interface VideoPlayerProps {
  videoId: string | null;
}

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  if (!videoId) {
    return (
      <Card className="aspect-video w-full flex items-center justify-center bg-card/50 ghibli-card">
        <div className="text-center p-6">
          <p className="text-muted-foreground">Enter a YouTube URL above to preview the video</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden rounded-lg ghibli-card">
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Card>
  );
};

export default VideoPlayer;
