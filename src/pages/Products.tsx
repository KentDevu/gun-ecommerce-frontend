import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { ShoppingCart, Eye, PackageSearch } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';

const products = [
  { id: 1, name: 'Colt 1911', price: '$899', image: '/assets/colt1911.jpg', category: 'Pistol', caliber: '.45 ACP' },
  { id: 2, name: 'Glock 17', price: '$599', image: '/assets/glock17.jpg', category: 'Pistol', caliber: '9mm' },
  { id: 3, name: 'Remington 870', price: '$499', image: '/assets/remington870.jpg', category: 'Shotgun', caliber: '12 Gauge' },
  { id: 4, name: 'AR-15', price: '$1099', image: '/assets/ar15.jpg', category: 'Rifle', caliber: '5.56 NATO' },
];

export default function Products() {
  const [loading, setLoading] = useState(false);
  // Simulate loading state
  // useEffect(() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }, []);
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 p-6 border-r bg-muted hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <Input placeholder="Search products..." className="mb-4" />
        <Select>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pistol">Pistol</SelectItem>
            <SelectItem value="Rifle">Rifle</SelectItem>
            <SelectItem value="Shotgun">Shotgun</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Caliber" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9mm">9mm</SelectItem>
            <SelectItem value=".45 ACP">.45 ACP</SelectItem>
            <SelectItem value="5.56 NATO">5.56 NATO</SelectItem>
            <SelectItem value="12 Gauge">12 Gauge</SelectItem>
          </SelectContent>
        </Select>
        <Button className="mt-6 w-full" leftIcon={<PackageSearch className="w-4 h-4 mr-2" />}>Apply Filters</Button>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Product Catalog</h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Skeleton className="w-full h-32 rounded" />
                  <CardTitle className="mt-2"><Skeleton className="w-1/2 h-6" /></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="w-16 h-6" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                  <Skeleton className="w-full h-10" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <PackageSearch className="w-12 h-12 mb-4" />
            <span>No products found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform" />
                  <CardTitle className="mt-2">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{product.price}</span>
                    <span className="text-xs text-muted-foreground">{product.caliber}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="w-full" leftIcon={<Eye className="w-4 h-4" />}>View Details</Button>
                    <Button className="w-full" leftIcon={<ShoppingCart className="w-4 h-4" />}>Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 