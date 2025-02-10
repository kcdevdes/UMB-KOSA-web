/**
 * Post Page
 * TODO: Show the list of posts
 */

import Footer from '@/components/Footer';
import MyNavbar from '@/components/ui/MyNavbar';

export default function PostPage() {
  return (
    <div>
      <MyNavbar />
      <div className="mt-20 w-full h-screen flex justify-center items-center bg-gray-50">
        <p className="text-2xl text-gray-500 text-center font-bold">
          This is the post page.
        </p>
      </div>
      <Footer />
    </div>
  );
}
