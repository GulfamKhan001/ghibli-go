
import React, { useState } from 'react';
import { useYoutubeApi } from "@/contexts/YoutubeApiContext";
import { VideoMetadata, fetchVideoMetadata } from "@/services/youtubeService";
import ApiKeyModal from "@/components/ApiKeyModal";
import YoutubeInput from "@/components/YoutubeInput";
import VideoPlayer from "@/components/VideoPlayer";
import VideoDetailsCard from "@/components/VideoDetailsCard";
import GhibliDecorator from "@/components/GhibliDecorator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Settings } from "lucide-react";

const Index = () => {
  const { apiKey, isApiKeySet } = useYoutubeApi();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  
  const handleVideoIdSubmit = async (id: string) => {
    if (!isApiKeySet) {
      toast.error("Please set your YouTube API key first");
      setIsApiModalOpen(true);
      return;
    }
    
    setIsLoading(true);
    setVideoId(id);
    
    try {
      const metadata = await fetchVideoMetadata(id, apiKey);
      setVideoMetadata(metadata);
    } catch (error) {
      console.error("Error fetching video metadata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GhibliDecorator />
      
      {/* Header */}
      <header className="py-8 text-center relative">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsApiModalOpen(true)}
            title="Set YouTube API Key"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ghibli-blue via-ghibli-green to-ghibli-purple animate-pulse">
          Ghibli-Style YouTube Stylizer
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Enter a YouTube URL below to preview the video and its details, styled with Ghibli-inspired magic
        </p>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-6xl flex-grow">
        <div className="space-y-6 pb-12">
          {/* Input Section */}
          <YoutubeInput onVideoIdSubmit={handleVideoIdSubmit} isLoading={isLoading} />
          
          {/* Video and Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VideoPlayer videoId={videoId} />
            </div>
            <div>
              <VideoDetailsCard metadata={videoMetadata} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>
          Ghibli-Style YouTube Stylizer &copy; {new Date().getFullYear()} 
          <span className="mx-2">|</span> 
          <button 
            onClick={() => setIsApiModalOpen(true)}
            className="text-ghibli-blue hover:underline"
          >
            Set API Key
          </button>
        </p>
      </footer>
      
      {/* API Key Modal */}
      <ApiKeyModal isOpen={isApiModalOpen} onOpenChange={setIsApiModalOpen} />
    </div>
  );
};

export default Index;
