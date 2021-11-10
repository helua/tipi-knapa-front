export interface Image {
  indexOf: number;
  source: string;
}

export interface Product {
  title: string;
  slug: string;
  images: Image[];
  price: number;
  sku: string;
}