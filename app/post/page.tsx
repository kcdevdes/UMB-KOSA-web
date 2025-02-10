/**
 * Post Page
 * TODO: Show the list of posts
 */

import MyNavbar from '@/components/ui/MyNavbar';

export default function PostPage() {
  return (
    <div>
      <MyNavbar />
      <div className="mt-20 w-full h-screen flex justify-center items-center bg-gray-50">
        <p className="text-2xl text-gray-500 text-center">
          This is the posts page.
        </p>
      </div>
    </div>
  );
}
