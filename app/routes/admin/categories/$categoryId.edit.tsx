import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { categoryService } from '../../../services/category.service';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Checkbox } from '../../../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';

const updateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  description: z.string().max(500).optional(),
  is_active: z.boolean().optional(),
});

type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export default function EditCategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
  });

  useEffect(() => {
    const loadCategory = async () => {
      if (!categoryId) return;

      try {
        const category = await categoryService.getCategory(categoryId);
        reset({
          name: category.name,
          description: category.description,
          is_active: category.is_active,
        });
      } catch (error) {
        toast.error('Failed to load category');
        navigate('/admin/categories');
      }
    };

    loadCategory();
  }, [categoryId, reset, navigate]);

  const onSubmit = async (data: UpdateCategoryInput) => {
    if (!categoryId) return;

    try {
      await categoryService.updateCategory(categoryId, data);
      toast.success('Category updated successfully');
      navigate('/admin/categories');
    } catch (error) {
      toast.error('Failed to update category');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/categories')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Category</h1>
          <p className="text-muted-foreground">Update category information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter category name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Category description (max 500 chars)"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={watch('is_active')}
                onCheckedChange={(checked) => setValue('is_active', !!checked)}
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Active (visible to customers)
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/categories')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Category'}
          </Button>
        </div>
      </form>
    </div>
  );
}
