
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDuration } from "@/utils/youtube";
import { VideoMetadata } from "@/services/youtubeService";
import { Clock, Calendar, User } from "lucide-react";

interface VideoDetailsCardProps {
  metadata: VideoMetadata | null;
  isLoading: boolean;
}

const VideoDetailsCard = ({ metadata, isLoading }: VideoDetailsCardProps) => {
  if (isLoading) {
    return (
      <Card className="ghibli-card">
        <CardHeader>
          <Skeleton className="h-8 w-full mb-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </CardContent>
      </Card>
    );
  }
  
  if (!metadata) {
    return (
      <Card className="ghibli-card">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Video Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No video information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="ghibli-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium line-clamp-2">{metadata.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{metadata.channelTitle}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(metadata.duration)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Published: {metadata.publishedAt}</span>
          </div>
        </div>
        
        <div className="pt-2">
          <img 
            src={metadata.thumbnail} 
            alt={metadata.title}
            className="w-full rounded-md border border-border shadow-md object-cover" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoDetailsCard;
