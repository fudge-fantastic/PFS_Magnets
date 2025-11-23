import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createProductSchema, type CreateProductInput } from '../../../types/product';
import { productService } from '../../../services/product.service';
import { useCategories } from '../../../hooks/useCategories';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { ImageUpload } from '../../../components/admin/ImageUpload';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { categories } = useCategories({ activeFilter: 'active' });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      description: '',
      short_description: '',
      price: 0,
      rating: 0,
      is_locked: false,
      images: [],
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await productService.createProduct(data);
      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to create product');
      console.error(error);
    }
  };

  const handleImagesChange = (urls: string[]) => {
    setValue('images', urls);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Product</h1>
          <p className="text-muted-foreground">Add a new product to your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter product title"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                {...register('short_description')}
                placeholder="Brief product description (max 500 chars)"
              />
              {errors.short_description && (
                <p className="text-sm text-destructive">{errors.short_description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Detailed product description"
                rows={6}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category *</Label>
                <Select
                  value={watch('category_id') || ''}
                  onValueChange={(value) => setValue('category_id', value, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category_id && (
                  <p className="text-sm text-destructive">{errors.category_id.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register('rating', { valueAsNumber: true })}
                  placeholder="0.0"
                />
                {errors.rating && (
                  <p className="text-sm text-destructive">{errors.rating.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_locked"
                onCheckedChange={(checked) => setValue('is_locked', !!checked)}
              />
              <Label htmlFor="is_locked" className="cursor-pointer">
                Lock product (prevent public viewing)
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUpload
              maxImages={5}
              onChange={handleImagesChange}
              disabled={isSubmitting}
            />
            {errors.images && (
              <p className="text-sm text-destructive">{errors.images.message}</p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
