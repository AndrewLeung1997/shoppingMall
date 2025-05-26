export interface Product {
  id: string;
  name: string;
  price: Number;
  originalPrice: Number;
  sold: Number;
  type: string;
  brand: string;
  productStatus: string;
  sellingStatus: boolean;
  productInfo: ProductInfo[];
  options: Options[];
  categoryId: string,
  subCategoryId: string
}

export interface ProductInfo {
  title: string;
  value: string;
}

export interface Options {
  title: string;
  value: ProductOptions[];
}

export interface ProductOptions {
  item: string;
  available: boolean;
  additionalPrice: number;
}
