import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBlogPage() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // Sample data - replace with actual API calls
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting the Best Deal on Your New Car',
      content: 'Lorem ipsum dolor sit amet...',
      status: 'published',
      author: 'John Doe',
      createdAt: '2025-01-18T01:45:46-05:00',
      updatedAt: '2025-01-18T01:45:46-05:00',
    }
  ];

  const handleNewPost = () => {
    setCurrentPost({
      id: '',
      title: '',
      content: '',
      status: 'draft',
      author: 'Current User', // Replace with actual user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('blog.admin.title')}</h1>
          <p className="text-muted-foreground">{t('blog.admin.description')}</p>
        </div>
        <Button onClick={handleNewPost}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {t('blog.admin.newPost')}
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentPost?.id ? t('blog.admin.editPost') : t('blog.admin.newPost')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('blog.admin.postTitle')}</label>
              <Input 
                value={currentPost?.title}
                onChange={(e) => setCurrentPost(prev => prev ? {...prev, title: e.target.value} : null)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('blog.admin.postContent')}</label>
              <Textarea 
                rows={10}
                value={currentPost?.content}
                onChange={(e) => setCurrentPost(prev => prev ? {...prev, content: e.target.value} : null)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {t('common.cancel')}
              </Button>
              <Button>
                {t('common.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('blog.admin.posts')}</CardTitle>
            <CardDescription>{t('blog.admin.postsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('blog.admin.postTitle')}</TableHead>
                  <TableHead>{t('blog.admin.status')}</TableHead>
                  <TableHead>{t('blog.admin.author')}</TableHead>
                  <TableHead>{t('blog.admin.lastUpdated')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'published' ? 'success' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}