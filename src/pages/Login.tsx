import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <Button className="w-full mt-2">Login</Button>
          </form>
          <div className="text-sm text-center mt-4">
            Don&apos;t have an account? <a href="/register" className="underline">Register</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 