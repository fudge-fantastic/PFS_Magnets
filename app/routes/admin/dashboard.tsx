import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Package, FolderTree, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { adminService } from '../../services/admin.service';
import { productService } from '../../services/product.service';
import { inquiryService } from '../../services/inquiry.service';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Badge } from '../../components/ui/badge';
import type { DashboardStats } from '../../types/admin';
import type { Product } from '../../types/product';
import type { Inquiry } from '../../types/inquiry';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [dashboardStats, productsData, inquiriesData] = await Promise.all([
          adminService.getDashboardStats(),
          productService.getProducts({ limit: 5 }),
          inquiryService.getInquiries({ limit: 5 }),
        ]);

        setStats(dashboardStats);
        setRecentProducts(productsData.data);
        setRecentInquiries(inquiriesData.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin console</p>
      </div>

      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Active products in catalog
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <FolderTree className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                Product categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingInquiries}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered accounts
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>Latest products added to catalog</CardDescription>
              </div>
              <Link to="/admin/products">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentProducts.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No products yet
              </p>
            ) : (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <h3 className="font-medium hover:underline">{product.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          ₹{product.price.toLocaleString()}
                        </p>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">
                          {product.categories?.name}
                        </p>
                      </div>
                    </div>
                    <Badge variant={product.is_locked ? 'destructive' : 'default'}>
                      {product.is_locked ? 'Locked' : 'Active'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Inquiries</CardTitle>
                <CardDescription>Latest customer inquiries</CardDescription>
              </div>
              <Link to="/admin/inquiries">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No inquiries yet
              </p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{inquiry.subject}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          {inquiry.first_name} {inquiry.last_name}
                        </p>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">
                          {new Date(inquiry.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        inquiry.status === 'received'
                          ? 'secondary'
                          : inquiry.status === 'in_progress'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {inquiry.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/admin/products/create">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
            <Link to="/admin/categories/create">
              <Button variant="outline" className="w-full justify-start">
                <FolderTree className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </Link>
            <Link to="/admin/inquiries">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                View Inquiries
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
