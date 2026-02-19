
import { NavItem, Product, CategoryCard } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'ფასდაკლებები', id: 'sales', isRed: true },
  { label: 'ღვინო', id: 'wine', subItems: ['თეთრი', 'წითელი', 'ვარდისფერი', 'ღვინის ნაკრები', '0.75 ლიტრი', '1.5 ლიტრი', '3 და 5 ლიტრი'] },
  { label: 'ჭაჭა', id: 'chacha', subItems: ['Extra Strong', 'Single Cask', 'Triple Distilled', 'Three Woods', 'ჭაჭის ნაკრები'] },
  { label: 'ბრენდი', id: 'brandy', subItems: ['VS', 'VSOP', 'ბრენდის ნაკრები'] },
  { label: 'ნაკრებები', id: 'sets', subItems: ['შერეული ნაკრები', 'ღვინის ნაკრები', 'ჭაჭის ნაკრები', 'ბრენდის ნაკრები'] },
  { label: 'ეტიკეტიანი', id: 'labeled' },
  { label: 'სხვა', id: 'other' },
  { label: 'გალერეა', id: 'gallery' },
];

export const CATEGORIES: CategoryCard[] = [
  { label: 'ღვინო', id: 'wine', icon: 'https://niamori.ge/wp-content/uploads/2022/10/vino-300x300.png' },
  { label: 'ბრენდი', id: 'brandy', icon: 'https://niamori.ge/wp-content/uploads/2022/10/brendi-300x300.png' },
  { label: 'ჭაჭა', id: 'chacha', icon: 'https://niamori.ge/wp-content/uploads/2022/10/chacha-300x300.png' },
  { label: 'ნაკრებები', id: 'sets', icon: 'https://niamori.ge/wp-content/uploads/2022/10/nakrebi-300x300.png' },
  { label: 'ეტიკეტიანი', id: 'labeled', icon: 'https://niamori.ge/wp-content/uploads/2022/10/etiketiani-300x300.png' },
  { label: 'აქსესუარები', id: 'accs', icon: 'https://niamori.ge/wp-content/uploads/2022/10/aksesuarebi-300x300.png' },
  { label: 'ფასდაკლება', id: 'promo', icon: 'https://niamori.ge/wp-content/uploads/2022/10/sale-300x300.png' },
  { label: 'ნამუშევრები', id: 'works', icon: 'https://niamori.ge/wp-content/uploads/2022/10/namushevrebi-300x300.png' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'საფერავი | წითელი მშრალი | ხის ყუთით | 0.75 ლ | წარწერის გრავირებით',
    description: 'Saperavi Red Dry',
    price: 110,
    imageUrl: 'https://picsum.photos/seed/wine1/400/600',
    category: 'popular'
  },
  {
    id: '2',
    name: 'რქაწითელი | თეთრი მშრალი | ხის ყუთით | 0.75 ლ | წარწერის გრავირებით',
    description: 'Rkatsiteli White Dry',
    price: 110,
    imageUrl: 'https://picsum.photos/seed/wine2/400/600',
    category: 'popular'
  },
  {
    id: '3',
    name: 'საფერავი, ბრენდი VS და ჭაჭა Single Cask | ხის ყუთით | წარწერის გრავირებით',
    description: 'Mixed Premium Set',
    price: 265,
    imageUrl: 'https://picsum.photos/seed/set1/400/600',
    category: 'popular'
  },
  {
    id: '4',
    name: 'ჭაჭა | Triple Distilled & Single Cask | ხის ყუთით | 0.50 ლ | წარწერის გრავირებით',
    description: 'Chacha Triple Distilled',
    price: 195,
    imageUrl: 'https://picsum.photos/seed/chacha1/400/600',
    category: 'popular'
  }
];
