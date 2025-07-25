import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden p-2"><Menu className="w-6 h-6" /></button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <nav className="flex flex-col gap-2 p-6">
          <Link to="/" className="py-2 px-4 rounded hover:bg-muted">Home</Link>
          <Link to="/products" className="py-2 px-4 rounded hover:bg-muted">Products</Link>
          <Link to="/cart" className="py-2 px-4 rounded hover:bg-muted">Cart</Link>
          <Link to="/checkout" className="py-2 px-4 rounded hover:bg-muted">Checkout</Link>
          <Link to="/orders" className="py-2 px-4 rounded hover:bg-muted">Orders</Link>
          <Link to="/profile" className="py-2 px-4 rounded hover:bg-muted">Profile</Link>
          <Link to="/admin" className="py-2 px-4 rounded hover:bg-muted">Admin</Link>
          <Link to="/login" className="py-2 px-4 rounded hover:bg-muted">Login</Link>
          <Link to="/register" className="py-2 px-4 rounded hover:bg-muted">Register</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
} 