export interface Blog {
    _id?: string;
    title: string;
    content: string;
    image: string;
    date?: string;
  }
  
export type BlogResponse = {
    data: Blog[];
    count: number;
  };