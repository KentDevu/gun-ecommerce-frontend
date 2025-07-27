import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from '@tanstack/react-router';

const featuredProducts = [
  { id: 1, name: 'Colt 1911', price: '$899', image: '/assets/colt1911.jpg', description: 'Classic .45 ACP pistol.' },
  { id: 2, name: 'Glock 17', price: '$599', image: '/assets/glock17.jpg', description: 'Reliable 9mm handgun.' },
  { id: 3, name: 'Remington 870', price: '$499', image: '/assets/remington870.jpg', description: 'Legendary pump-action shotgun.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 text-center bg-gradient-to-b from-background to-muted">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to GunShop</h1>
        <p className="text-lg md:text-2xl mb-8 text-muted-foreground">Your trusted source for premium firearms and accessories.</p>
        <Link to="/products">
          <Button className="text-lg">Shop Now</Button>
        </Link>
      </section>
      <section className="py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                <CardTitle className="mt-4">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">{product.price}</span>
                  <Link to={`/products/${product.id}`} className="w-full">
                    <Button className="w-full">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
} 