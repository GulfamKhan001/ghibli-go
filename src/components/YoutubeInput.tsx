
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { extractYoutubeVideoId } from "@/utils/youtube";
import { toast } from "sonner";
import { Search } from "lucide-react";

interface YoutubeInputProps {
  onVideoIdSubmit: (videoId: string) => void;
  isLoading: boolean;
}

const YoutubeInput = ({ onVideoIdSubmit, isLoading }: YoutubeInputProps) => {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    const videoId = extractYoutubeVideoId(inputUrl.trim());
    
    if (!videoId) {
      toast.error("Invalid YouTube URL. Please enter a valid URL");
      return;
    }
    
    onVideoIdSubmit(videoId);
  };

  return (
    <Card className="p-4 ghibli-card">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="pl-9 bg-background/50"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className="bg-ghibli-blue hover:bg-ghibli-blue/80 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Preview Video"}
        </Button>
      </form>
    </Card>
  );
};

export default YoutubeInput;
