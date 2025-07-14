
/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function extractYoutubeVideoId(url: string): string | null {
  // Regular expressions for different YouTube URL formats
  const regexPatterns = [
    // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.*?&v=)([^&]+)/,
    // Short YouTube URL: https://youtu.be/VIDEO_ID
    /youtu\.be\/([^?&]+)/,
    // Embedded URL: https://www.youtube.com/embed/VIDEO_ID
    /youtube\.com\/embed\/([^?&]+)/,
    // Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
    /m\.youtube\.com\/watch\?v=([^&]+)/,
    // Shorts URL: https://www.youtube.com/shorts/VIDEO_ID
    /youtube\.com\/shorts\/([^?&]+)/,
    // Direct video ID (if the user directly pastes a video ID)
    /^([a-zA-Z0-9_-]{11})$/
    ];

  for (const pattern of regexPatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Formats video duration from ISO 8601 format to human-readable format
 */
export function formatDuration(isoDuration: string): string {
  // Handle non-ISO strings and empty values
  if (!isoDuration || !isoDuration.startsWith('PT')) {
    return '--:--';
  }
  
  const hourMatch = isoDuration.match(/(\d+)H/);
  const minuteMatch = isoDuration.match(/(\d+)M/);
  const secondMatch = isoDuration.match(/(\d+)S/);
  
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
  const seconds = secondMatch ? parseInt(secondMatch[1]) : 0;
  
  // Format based on whether hours are present or not
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
