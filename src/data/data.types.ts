export type VideoData = {
  videos: Video[];
};

export type Video = {
  _id: string;
  url: string;
  thumbnail: string;
  title: string;
  statistics: string;
  description: string;
  channelName: string;
  channelLogo: string;
};
