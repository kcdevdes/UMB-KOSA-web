/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/ui/Footer';
import MyNavbar from '@/components/ui/MyNavbar';
import { Dropdown, TextInput, Button, Card } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Firestore,
} from 'firebase/firestore';
import { useTranslations } from 'next-intl';

export default function ForumPage() {
  const router = useRouter();
  const [category, setCategory] = useState('All Categories');
  const [language, setLanguage] = useState('English');
  const [sortOption, setSortOption] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [threads, setThreads] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;
  const t = useTranslations('forum');

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
    const fetchThreads = async (db: Firestore) => {
      try {
        const forumsRef = collection(db, 'forums');

        let threadsQuery = query(forumsRef);

        if (category !== 'All Categories') {
          threadsQuery = query(threadsQuery, where('category', '==', category));
        }

        if (language !== 'All') {
          threadsQuery = query(threadsQuery, where('language', '==', language));
        }

        if (sortOption === 'Newest') {
          threadsQuery = query(threadsQuery, orderBy('createdAt', 'desc'));
        } else {
          threadsQuery = query(threadsQuery, orderBy('view', 'desc'));
        }

        const snapshot = await getDocs(threadsQuery);
        const threadsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          view: 0,
          ...doc.data(),
        }));

        setThreads(threadsData);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads(db);
  }, [category, language, sortOption]);

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  };

  const filteredThreads = threads.filter((threads) => {
    if (searchQuery.startsWith('@')) {
      const emailSearch = searchQuery.slice(1).toLowerCase();
      return threads.author.toLowerCase().includes(emailSearch);
    }
    return threads.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);
  const currentThreads = filteredThreads.slice(
    (currentPage - 1) * threadsPerPage,
    currentPage * threadsPerPage
  );

  return (
    <>
      <MyNavbar />
      <div className="bg-gray-100 pt-24 sm:pt-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl font-Shilla">
              {t('title')}
            </h2>
            <p className="text-lg/8 text-black">{t('description')}</p>
          </div>
        </div>
      </div>
      <div className="pt-0 min-h-screen flex flex-col bg-gray-100">
        <div className="container mx-auto px-4 py-6 flex-grow">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <TextInput
              className="w-full md:w-1/3"
              placeholder="Search threads (@your.email to search your threads)"
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
              Create Thread
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {currentThreads.length > 0 ? (
              currentThreads.map((thead) => (
                <Card
                  key={thead.id}
                  className="p-0 rounded-lg shadow-md bg-white"
                  onClick={() => router.push(`/forum/${thead.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <h5 className="text-lg font-bold">{thead.title}</h5>
                  <p className="text-gray-600">
                    {truncate(thead.content || 'No content available.', 300)}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>
                      {thead.author} | {thead.category} | {thead.language} |{' '}
                      {new Date(
                        thead.createdAt?.seconds * 1000
                      ).toLocaleDateString('en-US')}
                    </span>
                    <span>Views {thead.view || 0}</span>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No Threads found.</p>
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
