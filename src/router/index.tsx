import React from 'react';
import {
  RouterProvider,
  createRouter,
  Route,
  RootRoute,
  Link,
} from '@tanstack/react-router';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import AdminDashboard from '../pages/AdminDashboard';
import { Button } from '../components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../components/ui/navigation-menu';
import Logo from '../components/Logo';
import MobileMenu from '../components/MobileMenu';

function MainLayout({ children }: { children: React.ReactNode }) {
  // Simulate user state for demo (replace with real auth logic later)
  const isLoggedIn = true;
  const isAdmin = true;
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'px-4 py-2 font-semibold text-primary' : 'px-4 py-2';
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background sticky top-0 z-10">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navLinkClass}>Home</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/products" className={navLinkClass}>Products</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/cart" className={navLinkClass}>Cart</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/checkout" className={navLinkClass}>Checkout</Link>
              </NavigationMenuItem>
              {isLoggedIn && (
                <NavigationMenuItem>
                  <Link to="/orders" className={navLinkClass}>Orders</Link>
                </NavigationMenuItem>
              )}
              {isLoggedIn && (
                <NavigationMenuItem>
                  <Link to="/profile" className={navLinkClass}>Profile</Link>
                </NavigationMenuItem>
              )}
              {isAdmin && (
                <NavigationMenuItem>
                  <Link to="/admin" className={navLinkClass}>Admin</Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          {!isLoggedIn ? (
            <div className="hidden md:flex gap-2">
              <Button><Link to="/login">Login</Link></Button>
              <Button><Link to="/register">Register</Link></Button>
            </div>
          ) : (
            <Button>Logout</Button>
          )}
        </nav>
      </header>
      <main className="flex-1 container mx-auto py-8">{children}</main>
      <footer className="border-t py-6 text-center text-muted-foreground bg-background text-sm">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
        </div>
        <div>© {new Date().getFullYear()} GunShop. All rights reserved.</div>
      </footer>
    </div>
  );
}

const rootRoute = new RootRoute({
  component: MainLayout,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
});
const cartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: Cart,
});
const checkoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: Checkout,
});
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});
const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});
const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});
const ordersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: Orders,
});
const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  cartRoute,
  checkoutRoute,
  loginRoute,
  registerRoute,
  profileRoute,
  ordersRoute,
  adminRoute,
]);

const router = createRouter({
  routeTree,
});

export default function AppRouter() {
  return <RouterProvider router={router} />;
} 