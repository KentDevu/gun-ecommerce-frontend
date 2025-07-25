import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { ShoppingCart, Eye, PackageSearch } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { Link } from '@tanstack/react-router';

const products = [
  { id: 1, name: 'Colt 1911', price: 899, image: '/assets/colt1911.jpg', category: 'Pistol', caliber: '.45 ACP', brand: 'Colt', description: 'Classic .45 ACP pistol.' },
  { id: 2, name: 'Glock 17', price: 599, image: '/assets/glock17.jpg', category: 'Pistol', caliber: '9mm', brand: 'Glock', description: 'Reliable 9mm handgun.' },
  { id: 3, name: 'Remington 870', price: 499, image: '/assets/remington870.jpg', category: 'Shotgun', caliber: '12 Gauge', brand: 'Remington', description: 'Legendary pump-action shotgun.' },
  { id: 4, name: 'AR-15', price: 1099, image: '/assets/ar15.jpg', category: 'Rifle', caliber: '5.56 NATO', brand: 'Colt', description: 'Versatile semi-automatic rifle.' },
];

const categories = ['Pistol', 'Rifle', 'Shotgun'];
const calibers = ['9mm', '.45 ACP', '5.56 NATO', '12 Gauge'];
const brands = ['Colt', 'Glock', 'Remington'];
const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [caliber, setCaliber] = useState('');
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [loading, setLoading] = useState(false);

  // Filtering, searching, and sorting logic
  const filteredProducts = useMemo(() => {
    let result = products.filter(p =>
      (!category || p.category === category) &&
      (!caliber || p.caliber === caliber) &&
      (!brand || p.brand === brand) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    );
    switch (sort) {
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result = result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return result;
  }, [search, category, caliber, brand, sort]);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-72 p-6 border-r bg-muted hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <Input placeholder="Search products..." className="mb-4" value={search} onChange={e => setSearch(e.target.value)} />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={caliber} onValueChange={setCaliber}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Caliber" />
          </SelectTrigger>
          <SelectContent>
            {calibers.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button className="mt-6 w-full accent-bg" leftIcon={<PackageSearch className="w-4 h-4 mr-2" />}
          onClick={() => { setCategory(''); setCaliber(''); setBrand(''); setSearch(''); }}>
          Clear Filters
        </Button>
      </aside>
      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold">Product Catalog</h1>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
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
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <PackageSearch className="w-12 h-12 mb-4" />
            <span>No products found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-xl transition-shadow group border-primary/40">
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform border border-secondary" />
                  <CardTitle className="mt-2 flex items-center gap-2">
                    <span className="primary-text">{product.name}</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{product.brand}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">{product.description}</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg accent-text">${product.price}</span>
                    <span className="text-xs text-muted-foreground">{product.caliber}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/products/${product.id}`} className="w-full">
                      <Button className="w-full accent-bg" leftIcon={<Eye className="w-4 h-4" />}>View Details</Button>
                    </Link>
                    <Button className="w-full primary-bg" leftIcon={<ShoppingCart className="w-4 h-4" />}>Add to Cart</Button>
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
// TODO: Integrate with backend API for dynamic products, filters, and sorting. 