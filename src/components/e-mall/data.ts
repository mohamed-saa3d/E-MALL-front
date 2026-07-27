import { Baby, BookOpen, Car, Dumbbell, HeartPulse, Home, Laptop, Shirt, ShoppingBasket, Sparkles } from 'lucide-react'

export const categories = [
  { name: 'Fashion', icon: Shirt, children: ['Men', 'Women', 'Kids', 'Shoes', 'Bags & Accessories'] },
  { name: 'Electronics', icon: Laptop, children: ['Mobiles', 'Laptops', 'TV & Appliances'] },
  { name: 'Home & Living', icon: Home, children: ['Furniture', 'Kitchen & Dining', 'Decor'] },
  { name: 'Beauty & Personal Care', icon: Sparkles },
  { name: 'Health & Wellness', icon: HeartPulse },
  { name: 'Sports & Outdoors', icon: Dumbbell },
  { name: 'Toys & Baby', icon: Baby },
  { name: 'Books & Stationery', icon: BookOpen },
  { name: 'Automotive', icon: Car },
  { name: 'Grocery', icon: ShoppingBasket },
]

export const popular = categories.slice(0, 6)
