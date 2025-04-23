export interface Blog {
    id?: string;
    title: string;
    content: string;
    image: string;
    finalWords?: string,
    createdAt?: string,
    updatedAt?: string
  }
  
  
export type BlogResponse = {
    data: Blog[];
    lastPage: number;
    page: number;
    total: number;
  };