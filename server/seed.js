import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Classic Leather Jacket',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1551028711-21967db49a65?w=600&h=600&fit=crop',
    description:
      'Premium full-grain leather jacket with a timeless silhouette. Features YKK zippers, quilted lining, and multiple pockets for everyday wear.',
    category: 'Clothing',
    stock: 24,
    featured: true,
  },
  {
    name: 'Minimalist Sneakers',
    price: 129.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    description:
      'Lightweight everyday sneakers with breathable mesh upper and cushioned sole. Perfect for casual outings and light workouts.',
    category: 'Footwear',
    stock: 50,
    featured: true,
  },
  {
    name: 'Wireless Headphones Pro',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    description:
      'Active noise cancellation, 30-hour battery life, and studio-quality sound. Foldable design with premium carrying case included.',
    category: 'Electronics',
    stock: 35,
    featured: true,
  },
  {
    name: 'Ceramic Pour-Over Set',
    price: 45.5,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
    description:
      'Handcrafted ceramic dripper and carafe set for the perfect morning brew. Includes 40 paper filters and wooden stirrer.',
    category: 'Home',
    stock: 18,
    featured: true,
  },
  {
    name: 'Organic Cotton T-Shirt',
    price: 32.0,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
    description:
      'Soft GOTS-certified organic cotton tee with a relaxed fit. Available in neutral tones, pre-shrunk and sustainably dyed.',
    category: 'Clothing',
    stock: 100,
    featured: false,
  },
  {
    name: 'Smart Watch Series X',
    price: 399.0,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
    description:
      'Track fitness, heart rate, sleep, and notifications on a vibrant AMOLED display. Water-resistant to 50 meters.',
    category: 'Electronics',
    stock: 20,
    featured: false,
  },
  {
    name: 'Leather Crossbody Bag',
    price: 78.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    description:
      'Compact crossbody bag in vegetable-tanned leather. Adjustable strap, interior zip pocket, and magnetic flap closure.',
    category: 'Accessories',
    stock: 30,
    featured: false,
  },
  {
    name: 'Running Shoes Elite',
    price: 159.0,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
    description:
      'Engineered for performance with responsive foam midsole and breathable knit upper. Ideal for road running and training.',
    category: 'Footwear',
    stock: 42,
    featured: false,
  },
  {
    name: 'Scented Candle Collection',
    price: 28.0,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop',
    description:
      'Set of three soy wax candles in lavender, cedarwood, and vanilla scents. 45-hour burn time each, reusable glass jars.',
    category: 'Home',
    stock: 55,
    featured: false,
  },
  {
    name: 'Polarized Sunglasses',
    price: 89.0,
    image: 'https://images.unsplash.com/photo-1572635196233-8f3f75b7ecc6?w=600&h=600&fit=crop',
    description:
      'UV400 protection with polarized lenses and lightweight acetate frames. Includes hard case and microfiber cloth.',
    category: 'Accessories',
    stock: 40,
    featured: false,
  },
  {
    name: 'Bluetooth Speaker Mini',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
    description:
      'Pocket-sized speaker with 360° sound and 12-hour battery. IPX7 waterproof rating for poolside and outdoor use.',
    category: 'Electronics',
    stock: 65,
    featured: false,
  },
  {
    name: 'Linen Blend Blazer',
    price: 145.0,
    image: 'https://images.unsplash.com/photo-1594938298605-cdca02500e7f?w=600&h=600&fit=crop',
    description:
      'Breathable linen-cotton blend blazer for smart-casual occasions. Half-lined construction with notch lapels.',
    category: 'Clothing',
    stock: 15,
    featured: false,
  },
];

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce-fullstack';
    await mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 15000,
    });

    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products`);

    const adminEmail = 'admin@shop.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@shop.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    await mongoose.disconnect();
    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
