import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ShoppingCart } from 'lucide-react';
import { useParams } from '@tanstack/react-router';

const products = [
  {
    id: 1,
    name: 'Colt 1911',
    brand: 'Colt',
    price: 899,
    images: [
      '/assets/colt1911.jpg',
      '/assets/colt1911-2.jpg',
      '/assets/colt1911-3.jpg',
    ],
    description: 'Classic .45 ACP pistol. Legendary reliability and performance.',
    category: 'Pistol',
    caliber: '.45 ACP',
    stock: 12,
    sizes: ['Standard', 'Compact'],
  },
  {
    id: 2,
    name: 'Glock 17',
    brand: 'Glock',
    price: 599,
    images: [
      '/assets/glock17.jpg',
    ],
    description: 'Reliable 9mm handgun.',
    category: 'Pistol',
    caliber: '9mm',
    stock: 8,
    sizes: ['Standard'],
  },
  {
    id: 3,
    name: 'Remington 870',
    brand: 'Remington',
    price: 499,
    images: [
      '/assets/remington870.jpg',
    ],
    description: 'Legendary pump-action shotgun.',
    category: 'Shotgun',
    caliber: '12 Gauge',
    stock: 5,
    sizes: ['Standard'],
  },
];

export default function ProductDetail() {
  const { productId } = useParams({ strict: false });
  const product = products.find(p => String(p.id) === String(productId));
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="text-center py-24 text-2xl text-muted-foreground">Product not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-12 flex flex-col md:flex-row gap-12">
      {/* Gallery */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-card rounded-lg p-4 flex items-center justify-center border border-secondary">
          <img src={selectedImage} alt={product.name} className="h-80 object-contain rounded" />
        </div>
        <div className="flex gap-2 justify-center">
          {product.images.map(img => (
            <button
              key={img}
              className={`border-2 rounded p-1 transition-all ${selectedImage === img ? 'border-primary' : 'border-muted'}`}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt="thumb" className="h-16 w-16 object-contain rounded" />
            </button>
          ))}
        </div>
      </div>
      {/* Details */}
      <div className="flex-1 flex flex-col gap-6">
        <Card className="shadow-xl border-primary/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <span className="primary-text">{product.name}</span>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{product.brand}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground mb-4">{product.description}</div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-bold text-2xl accent-text">${product.price}</span>
              <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded">{product.caliber}</span>
              <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded">{product.category}</span>
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <span className="font-semibold">Size/Type:</span>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-3 py-1 rounded border transition-all ${selectedSize === size ? 'primary-bg border-primary' : 'border-muted bg-background'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <span className="font-semibold">Stock:</span>
              <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </div>
            <div className="mb-6 flex gap-4 items-center">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button className="px-3 py-1" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                <Input type="number" className="w-16 text-center" value={quantity} min={1} max={product.stock} onChange={e => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))} />
                <Button className="px-3 py-1" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</Button>
              </div>
            </div>
            <Button className="w-full primary-bg text-lg" leftIcon={<ShoppingCart className="w-5 h-5" />} disabled={product.stock === 0}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 