import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
// import { toast } from 'sonner'; // Uncomment when Sonner is installed

const cartItems = [
  { id: 1, name: 'Colt 1911', price: 899, quantity: 1 },
  { id: 2, name: 'Glock 17', price: 599, quantity: 2 },
];

export default function Cart() {
  const [loading, setLoading] = useState(false);
  // Simulate loading state
  // useEffect(() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }, []);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const handleCheckout = () => toast.success('Proceeding to checkout!');
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      {loading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 2 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="w-32 h-6" /></TableCell>
                <TableCell><Skeleton className="w-16 h-6" /></TableCell>
                <TableCell><Skeleton className="w-24 h-6" /></TableCell>
                <TableCell><Skeleton className="w-16 h-6" /></TableCell>
                <TableCell><Skeleton className="w-16 h-6" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <ShoppingCart className="w-12 h-12 mb-4" />
          <span>Your cart is empty.</span>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button leftIcon={<Minus className="w-4 h-4" />}> </Button>
                      <span>{item.quantity}</span>
                      <Button leftIcon={<Plus className="w-4 h-4" />}> </Button>
                    </div>
                  </TableCell>
                  <TableCell>${item.price * item.quantity}</TableCell>
                  <TableCell><Button leftIcon={<Trash2 className="w-4 h-4" />}>Remove</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-8">
            <div className="bg-muted p-6 rounded-lg w-80">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$20</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal + 20}</span>
              </div>
              <Button className="w-full mt-6" leftIcon={<ShoppingCart className="w-4 h-4" />} /* onClick={handleCheckout} */>Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 