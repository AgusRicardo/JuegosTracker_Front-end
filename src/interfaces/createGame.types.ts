export interface CreateGame {
  name: number; 
  img_url: string;     
  platform_id: number; 
  category_id: number; 
  userId?: string;
}