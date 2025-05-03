export type TService = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  products: TProduct[];
};

export type TProduct = {
  id: string;
  productName: string;
  productModel: string;
  brandName: string;
  slug: string;
  description: string;
  filters: TFilter[];
  keyApplications: string[];
  keyFeatures: string[];
  images: string[];
  price: number;
  available: boolean;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
  specs: TSpec[];
};

export type TFilter = {
  name: string;
  value: string | number;
};

export type TSpec = {
  id: string;
  title: string;
  description: string;
  data: Record<string, string>[];
  productId: string;
  createdAt: string;
  updatedAt: string;
};
