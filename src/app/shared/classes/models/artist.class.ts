import { Response } from './response.class';

export class Artist extends Response {
  alternate_names: string;
  description: string;
  fb_name: string;
  genius_followers_count: number;
  genius_header_img_url: string;
  genius_id: number;
  genius_iq: number;
  genius_profile_img_url: string;
  genius_url: string;
  hidden: boolean;
  instagram_name: string;
  name: string;
  twitter_name: string;
}
