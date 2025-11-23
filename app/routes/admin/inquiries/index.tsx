import { useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { useInquiries } from '../../../hooks/useInquiries';
import { inquiryService } from '../../../services/inquiry.service';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';
import { Label } from '../../../components/ui/label';
import type { Inquiry } from '../../../types/inquiry';

export default function InquiriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'received' | 'in_progress' | 'resolved'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { inquiries, isLoading, error, total, currentPage, totalPages, refetch, goToPage } = useInquiries({
    searchTerm,
    statusFilter,
  });

  const handleStatusUpdate = async (id: string, status: 'received' | 'in_progress' | 'resolved') => {
    try {
      await inquiryService.updateInquiryStatus(id, status);
      toast.success('Inquiry status updated successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to update inquiry status');
    }
  };

  const openInquiryDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'received':
        return 'secondary';
      case 'in_progress':
        return 'default';
      case 'resolved':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inquiries</h1>
          <p className="text-muted-foreground">Manage customer inquiries</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference ID, email, name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No inquiries found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-mono text-sm">
                      {inquiry.reference_id}
                    </TableCell>
                    <TableCell>
                      {inquiry.first_name} {inquiry.last_name}
                    </TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell className="max-w-xs truncate">{inquiry.subject}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(inquiry.status)}>
                        {inquiry.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(inquiry.submitted_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openInquiryDetails(inquiry)}
                        >
                          View
                        </Button>
                        {inquiry.status !== 'resolved' && (
                          <Select
                            value={inquiry.status}
                            onValueChange={(value: any) => handleStatusUpdate(inquiry.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="received">Received</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages} ({total} total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              Reference ID: {selectedInquiry?.reference_id}
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Customer Name</Label>
                  <p className="font-medium">
                    {selectedInquiry.first_name} {selectedInquiry.last_name}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
                {selectedInquiry.phone_number && (
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedInquiry.phone_number}</p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge variant={getStatusBadgeVariant(selectedInquiry.status)}>
                      {selectedInquiry.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Subject</Label>
                <p className="font-medium">{selectedInquiry.subject}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Message</Label>
                <p className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-4">
                  {selectedInquiry.message}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Submitted</Label>
                  <p className="font-medium">
                    {new Date(selectedInquiry.submitted_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Newsletter Subscription</Label>
                  <p className="font-medium">
                    {selectedInquiry.subscribe_newsletter ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>

              {selectedInquiry.status !== 'resolved' && (
                <div className="flex justify-end gap-2 pt-4">
                  <Select
                    value={selectedInquiry.status}
                    onValueChange={(value: any) => {
                      handleStatusUpdate(selectedInquiry.id, value);
                      setDialogOpen(false);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
