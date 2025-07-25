import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { PackageSearch } from 'lucide-react';

const orders = [
  { id: 101, date: '2024-07-01', total: 899, status: 'Pending' },
  { id: 102, date: '2024-07-02', total: 1198, status: 'Shipped' },
  { id: 103, date: '2024-07-03', total: 499, status: 'Delivered' },
];

const statusColor = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Preparing: 'bg-blue-200 text-blue-800',
  Shipped: 'bg-purple-200 text-purple-800',
  Delivered: 'bg-green-200 text-green-800',
};

export default function Orders() {
  const [loading, setLoading] = useState(false);
  // Simulate loading state
  // useEffect(() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }, []);
  return (
    <div className="max-w-4xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="w-20 h-6" /></TableCell>
                    <TableCell><Skeleton className="w-24 h-6" /></TableCell>
                    <TableCell><Skeleton className="w-16 h-6" /></TableCell>
                    <TableCell><Skeleton className="w-20 h-6" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <PackageSearch className="w-12 h-12 mb-4" />
              <span>No orders found.</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>
                      <Badge className={statusColor[order.status as keyof typeof statusColor] || ''}>{order.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 