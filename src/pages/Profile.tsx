import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Profile() {
  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="text" placeholder="Full Name" defaultValue="John Doe" />
            <Input type="email" placeholder="Email" defaultValue="john@example.com" />
            <Button className="w-full mt-2">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 