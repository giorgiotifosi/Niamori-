
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  category: string;
}

export interface NavItem {
  label: string;
  id: string;
  subItems?: string[];
  isRed?: boolean;
}

export interface CategoryCard {
  label: string;
  icon: string;
  id: string;
}
