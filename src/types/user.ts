export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  college?: string;
  branch?: string;
  year?: string;
  stats: {
    eventsAttended: number;
    eventsInterested: number;
    loyaltyPoints: number;
  };
  likedEventIds?: string[];
  attendedEventIds?: string[];
  interests?: string[];
  language?: string;
}
