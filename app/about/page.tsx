import SiteHeader from '@/components/layout/SiteHeader';
import Card from '@/components/ui/ProfileCard';

const AboutPage = () => {
  return (
    <div className="pt-[10vmin] bg-gradient-to-b from-white to-blue-300">
      <SiteHeader />
      <div className="container mx-auto w-[60vmax] flex flex-col items-center ">
        <p className="text-4xl font-semibold">Meet the KOSA E-board members</p>
        <p className="pt-2 text-gray-500">
          We love connecting with diverse people and will keep you updated with
          events and news through social media
        </p>
        <Card
          imageSrc="/images/profiles/wonjung_jin.jpg"
          name="WonJung Jin"
          position="President"
          description="Wonjeong is dedicated to support KOSA members, organize impactful events, and ensure that KOSA continues to grow as a network for cultural sharing."
          instagramLink="https://www.instagram.com/w0njungj1n"
          linkedInLink="https://www.linkedin.com/in/wonjung-jin-6653b2282/"
        />
        <Card
          imageSrc="/images/profiles/gibeom_choi.png"
          name="Gibeom Choi"
          position="Vice President/Webmaster"
          description="Gibeom manages KOSA’s website, ensuring seamless functionality, updates, and accessibility to keep members informed and engaged."
          instagramLink="https://www.instagram.com/g_choi001"
          linkedInLink="https://www.linkedin.com/in/g-choi001/"
        />
        <Card
          imageSrc="/images/profiles/jiyun.jpg"
          name="JiYun Lee"
          position="Secretary"
          description="Jiyun manages communications, organizes meetings, and creates new events for peopleinterested in Korean culture."
          instagramLink="https://www.instagram.com/ji_y99n_/"
          linkedInLink="https://www.linkedin.com/in/jiyun-lee-263bb0349/"
        />
        <Card
          imageSrc="/images/profiles/evelyn.jpg"
          name="Evelyn Gu"
          position="Treasurer"
          description="Evelyn oversees KOSA's financial matters, ensuring responsible budgeting and resource allocation to support our events and initiatives."
        />
        <Card
          imageSrc="/images/profiles/cindy.jpg"
          name="Dahye Lim"
          position="Event Planner"
          description="Dahye organizes engaging events that celebrate Korean culture, fostering community and cultural exchange among KOSA members."
        />
        <Card
          imageSrc="/images/profiles/jonathan.jpg"
          name="Jonathan Chow"
          position="Event Planner"
          description="Jonathan collaborates with Dahye to plan and execute events that highlight Korean culture and promote community engagement."
        />
        <Card
          imageSrc="/images/profiles/stevens."
          name="Stevens Charles"
          position="Social Media Manager"
          description="Stevens curates and manages KOSA's social media presence, sharing updates, events, and cultural content to engage our community."
        />
      </div>
    </div>
  );
};

export default AboutPage;
