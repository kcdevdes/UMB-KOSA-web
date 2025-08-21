import SiteHeader from '@/components/layout/SiteHeader';
import Card from '@/components/ui/Card';

const AboutPage = () => {
  return (
    <div className="pt-[20vmin] bg-gradient-to-b from-white to-blue-300">
      <SiteHeader />
      <div className="container mx-auto w-[60vmax] flex flex-col items-center ">
        <p className="text-2xl font-bold">Meet Our KOSA Members</p>
        <p className="pt-2 text-gray-500">
          We love connecting with diverse people and will keep you updated with
          events and news through social media
        </p>
        <Card
          imageSrc="/images/no-image.jpg"
          name="WonJung Jin"
          position="President"
          description="Wonjeong is dedicated to support KOSA members, organize impactful events, and ensure that KOSA continues to grow as a network for cultural sharing."
          instagramLink="https://www.instagram.com/w0njungj1n"
          linkedInLink="https://www.linkedin.com/in/wonjung-jin-6653b2282/"
        />
        <Card
          imageSrc="/images/no-image.jpg"
          name="HyunSoo Oh"
          position="Treasurer"
          description="HyunSoo manages KOSA’s finances, ensuring transparency and efficiency in budgeting. HyunSoo helps sustain KOSA’s growth and impact."
          instagramLink="https://www.instagram.com/hyunsoointhestates/"
          linkedInLink="https://www.linkedin.com/in/hyunsoo-oh/"
        />
        <Card
          imageSrc="/images/no-image.jpg"
          name="JiYun Lee"
          position="Secretary"
          description="Jiyun manages communications, organizes meetings, and creates new events for peopleinterested in Korean culture."
          instagramLink="https://www.instagram.com/ji_y99n_/"
          linkedInLink="https://www.linkedin.com/in/jiyun-lee-263bb0349/"
        />
        <Card
          imageSrc="/images/no-image.jpg"
          name="GiBeom Choi"
          position="Webmaster"
          description="Gibeom manages KOSA’s website, ensuring seamless functionality, updates, and accessibility to keep members informed and engaged."
          instagramLink="https://www.instagram.com/g_choi001"
          linkedInLink="https://www.linkedin.com/in/g-choi001/"
        />
      </div>
    </div>
  );
};

export default AboutPage;
