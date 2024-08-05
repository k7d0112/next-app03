import { Category } from './Category';

export type Post = {
  id: number,
  title: string,
  content: string,
  thumbnailUrl: string,
  postCategories: {category: Category}[],
  createdAt: string,
};