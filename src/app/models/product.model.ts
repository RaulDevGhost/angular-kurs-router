export interface Catergoy {
  id: number;
  name: string;
  typeImg: string;
}

export interface Product {
  id: number;
  images: string[];
  price: number;
  rating?: {
    count: number;
    rate: number;
  };
  title: string;
  description?: string;
  category: Catergoy;
  tax?: number;
}

export interface CreateProductDTO
  extends Omit<Product, 'id' | 'category' | 'tax'> {
  categoryId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
