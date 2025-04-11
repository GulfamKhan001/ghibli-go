
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useYoutubeApi } from "@/contexts/YoutubeApiContext";
import { toast } from "sonner";

interface ApiKeyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiKeyModal = ({ isOpen, onOpenChange }: ApiKeyModalProps) => {
  const { apiKey, setApiKey } = useYoutubeApi();
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSave = () => {
    if (!inputKey.trim()) {
      toast.error("Please enter a valid YouTube API key");
      return;
    }
    
    setApiKey(inputKey.trim());
    toast.success("YouTube API key saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">YouTube API Key</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Enter your YouTube Data API v3 key to enable video metadata fetching.
            <a 
              href="https://developers.google.com/youtube/v3/getting-started" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mt-2 text-ghibli-blue hover:underline"
            >
              How to get a YouTube API key
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            id="apiKey"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Enter your YouTube API key"
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-ghibli-blue hover:bg-ghibli-blue/80">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
