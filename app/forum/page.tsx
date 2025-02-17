/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/ui/Footer';
import MyNavbar from '@/components/ui/MyNavbar';
import { Dropdown, TextInput, Button, Card } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

export default function ForumPage() {
  const router = useRouter();
  const [category, setCategory] = useState('All Categories');
  const [language, setLanguage] = useState('All');
  const [sortOption, setSortOption] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const categories = [
    'All Categories',
    'Announcements',
    'General',
    'Academics',
    'Events',
    'Jobs',
    'Sell&Buy',
    'Sports',
  ];
  const languages = ['All', 'Korean', 'English', 'Mixed'];
  const sortOptions = ['Newest', 'Popular'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let postsQuery = query(collection(db, 'forums'));

        if (category !== 'All Categories') {
          postsQuery = query(postsQuery, where('category', '==', category));
        }

        if (language !== 'All') {
          postsQuery = query(postsQuery, where('language', '==', language));
        }

        if (sortOption === 'Newest') {
          postsQuery = query(postsQuery, orderBy('createdAt', 'desc'));
        } else {
          postsQuery = query(postsQuery, orderBy('views', 'desc'));
        }

        const snapshot = await getDocs(postsQuery);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [category, language, sortOption]);

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      <MyNavbar />
      <div className="pt-24 min-h-screen flex flex-col bg-gray-50">
        <div className="container mx-auto px-4 py-6 flex-grow">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <TextInput
              className="w-full md:w-1/3"
              placeholder="Search posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap">
              <Dropdown label={category}>
                {categories.map((item) => (
                  <Dropdown.Item key={item} onClick={() => setCategory(item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
              <Dropdown label={language}>
                {languages.map((item) => (
                  <Dropdown.Item key={item} onClick={() => setLanguage(item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
              <Dropdown label={sortOption}>
                {sortOptions.map((item) => (
                  <Dropdown.Item key={item} onClick={() => setSortOption(item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <Button
              className="bg-korean-red hover:bg-red-900"
              onClick={() => router.push('/forum/create')}
            >
              Create Post
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <Card
                  key={post.id}
                  className="p-0 rounded-lg shadow-md bg-white"
                >
                  <h5 className="text-lg font-bold">{post.title}</h5>
                  <p className="text-gray-600">
                    {truncate(post.content || 'No content available.', 300)}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>
                      {post.author} | {post.category} | {post.language} |{' '}
                      {new Date(
                        post.createdAt?.seconds * 1000
                      ).toLocaleDateString('en-US')}
                    </span>
                    <span>Views {post.views || 0}</span>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              className="bg-korean-red mx-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-lg font-bold mx-4">
              {currentPage} / {totalPages}
            </span>
            <Button
              className="bg-korean-red mx-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
