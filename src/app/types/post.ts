import { Category } from './Category';

export type post = {
  id: number,
  title: string,
  content: string,
  thumbnailUrl: string,
  postCategories: {category: Category}[],
  createdAt: string,
};