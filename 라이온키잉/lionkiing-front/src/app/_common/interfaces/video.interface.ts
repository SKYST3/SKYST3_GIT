/* eslint-disable */

import { Band } from './band-info.interface';

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}
export interface VideoDetail {
  id: string;
  url: string;
  song_title: string;
  song_description: string;
  album_cover: string;
  vote_count: number;
  votes: any[];
  season: any;
  band: Band;
  comments: any[];
}
