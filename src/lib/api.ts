import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const downloadVideo = async (videoUrl: string) => {
  const res = await axios.post(`${BASE_URL}/download`, { videoUrl });
  return res.data;
};

export const extractFrames = async (videoId: string) => {
  const res = await axios.post(`${BASE_URL}/extract-frames`, { videoId });
  return res.data;
};

export const stylizeFrames = async (videoId: string) => {
  const res = await axios.post(`${BASE_URL}/stylize-frame`, { videoId });
  return res.data;
};

export const reassembleVideo = async (videoId: string) => {
  const res = await axios.post(`${BASE_URL}/reassemble`, { videoId });
  return res.data;
};