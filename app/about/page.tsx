/**
 * About Page
 * Show the information about the team members, and Social Media
 */

import Footer from '@/components/ui/Footer';
import MemberProfile from '@/components/MemberProfile';
import Reference from '@/components/Reference';
import MyNavbar from '@/components/ui/MyNavbar';

export default function AboutPage() {
  return (
    <div>
      <MyNavbar />
      <Reference />
      <MemberProfile />
      <Footer />
    </div>
  );
}
