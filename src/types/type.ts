// types.ts
export interface SpecificationItem {
    [key: string]: {
      [key: string]: string;
    };
  }
  
  export interface Product {
    id: string;
    productName: string;
    productModel: string;
    brandName: string;
    slug: string;
    description: string;
    keyApplications: string[];
    keyFeatures: string[];
    specifications: SpecificationItem[];
    images: string[];
    price: number;
    available: boolean;
    serviceName: string;
    createdAt: string;
    updatedAt: string;
  }
  