/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TextInput, Textarea, Button, Dropdown } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import MyNavbar from '@/components/ui/MyNavbar';
import Footer from '@/components/ui/Footer';
import { CldUploadWidget } from 'next-cloudinary';
import { useAuth } from '@/lib/hook/useAuth';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('English');
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [category, setCategory] = useState('General');

  useEffect(() => {
    if (userInfo?.role === 'admin') {
      setIsAdmin(true);
      setCategory('Announcements');
    }
  }, [userInfo]);

  const categories = isAdmin
    ? [
        'Announcements',
        'General',
        'Academics',
        'Events',
        'Jobs',
        'Sell&Buy',
        'Sports',
      ]
    : ['General', 'Academics', 'Events', 'Jobs', 'Sell&Buy', 'Sports'];

  const languages = ['English', 'Korean', 'Mixed'];

  const handleUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      if (imageURLs.length < 3) {
        setImageURLs((prev) => [...prev, result.info.secure_url]);
        alert('Image uploaded successfully!');
      } else {
        alert('You can upload up to 3 images only.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Title and Content cannot be empty.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          language,
          thumbnails: imageURLs,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Post submitted successfully!');
        router.push('/forum');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit thread.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="pt-24 min-h-screen flex flex-col bg-gray-50">
        <div className="container mx-auto px-4 py-6 flex-grow">
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <TextInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter thread title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Dropdown label={category}>
                {categories.map((item) => (
                  <Dropdown.Item key={item} onClick={() => setCategory(item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <Dropdown label={language}>
                {languages.map((item) => (
                  <Dropdown.Item key={item} onClick={() => setLanguage(item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thread content here..."
                rows={6}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Images (Up to 3)
              </label>
              <CldUploadWidget
                uploadPreset="umass-kosa-assets"
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => (
                  <Button
                    onClick={() => open()}
                    className="bg-blue-500 hover:bg-blue-700 text-white"
                  >
                    Upload Images
                  </Button>
                )}
              </CldUploadWidget>
            </div>
            {imageURLs.length > 0 && (
              <div className="mt-4 flex gap-4">
                {imageURLs.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Uploaded Preview ${index + 1}`}
                    className="rounded-lg max-w-xs"
                    width={400}
                    height={400}
                  />
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button
                className="bg-korean-red hover:bg-red-900"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Post'}
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
