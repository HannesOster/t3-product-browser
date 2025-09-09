export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  quantityIncrement: number;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Cheap Smartphone",
    price: 59.99,
    category: "Smartphones",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "2",
    name: "Super Headphones",
    price: 129.99,
    category: "Headphones",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "3",
    name: "Smartphone Case",
    price: 12.99,
    category: "Smartphone Accessories",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "4",
    name: "Smartphone Model A",
    price: 699.99,
    category: "Smartphones",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "5",
    name: "Smartphone Model B",
    price: 899.99,
    category: "Smartphones",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "6",
    name: "Wireless Headphones",
    price: 199.99,
    category: "Headphones",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "7",
    name: "Noise Cancelling Headphones",
    price: 299.99,
    category: "Headphones",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "8",
    name: "Screen Protector",
    price: 9.99,
    category: "Smartphone Accessories",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "9",
    name: "Wireless Charger",
    price: 29.99,
    category: "Smartphone Accessories",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
  {
    id: "10",
    name: "Phone Stand",
    price: 14.99,
    category: "Smartphone Accessories",
    quantityIncrement: 1,
    imageUrl: "/product.png",
  },
];
