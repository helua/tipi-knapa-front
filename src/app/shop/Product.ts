export interface Image {
  indexOf: number;
  source: string;
}

export interface Product {
  title?: string;
  slug?: string;
  categories?: string[];
  statuses?: string[];
  vendor?: string;
  body?: string;
  images?: string[];
  sku?: string;
  weight?: number;
  length?: number;
  bladeLength?: number;
  bladeWidth?: number;
  steelThickness?: string
  handle?: string;
  blade?: string;
  sheath?: string;
}

export interface CartData {
  ord: any;
  cart: any;
}
