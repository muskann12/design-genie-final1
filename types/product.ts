export type ProductType = 'shirt' | 'cap' | 'mug';

export type Size = 'S' | 'M' | 'L' | 'XL';

export interface ProductColor {
  name: string;
  value: string;
}

export interface ProductOption {
  type: ProductType;
  name: string;
  sizes: Size[];
  colors: ProductColor[];
  image: string;
  description?: string;
  price?: number;
}
