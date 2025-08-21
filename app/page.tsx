/**
 * Main page of the application
 * Show the main content of the application
 */

import SiteHeader from '@/components/layout/SiteHeader';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div>
      <SiteHeader />
      {/* 첫번째 섹션 */}
      <div className="container mx-auto w-[60vmax] h-screen overflow-hidden flex flex-col items-start space-y-2">
        <div className="mt-[20vmin] text-3xl space-y-1">
          <div className="w-40 relative aspect-[16/9] overflow-hidden">
            <Image
              src="/images/umass-boston.png"
              alt="UMass Boston"
              fill
              priority
              className="object-cover"
              sizes="100vw, 200px"
            />
          </div>
          <p className="font-bold">KOSA - Korean Student Association</p>
          <p className="font-thin">University of Massachusetts, Boston</p>
        </div>
        <div className="space-x-4">
          <Button type="primary" text="Join Us" />
          <Button type="default" text="Learn More" />
        </div>
        <Image
          className="w-[100vw] mt-4 opacity-30"
          src="/images/main-taeguek.png"
          alt="Taeguek Image"
          width={200}
          height={200}
        />
      </div>
      {/* 두번째 섹션 */}
      <div className="bg-gray-50 flex flex-col items-center">
        <p className="py-28 text-end font-thin text-5xl ">
          KOSA, The Association Dedicated to Sharing
          <br /> Korean Culture and <br />
          Building Connections
        </p>
      </div>
      {/* 세번째 섹션 */}
      <div className="container mx-auto w-[60vmax] h-screen overflow-hidden flex flex-col items-center">
        <div className="mt-[20vmin] flex items-start space-y-2">
          <div>
            <p className="font-bold text-4xl text-korean-blue">Connection</p>
            <p className="mt-8 text-2xl">
              Network,
              <br /> Interact,
              <br /> and Bond
            </p>
          </div>
          <Image
            className="w-[400px] h-[400px] object-cover rounded-3xl ml-28"
            src={'/images/1.jpg'}
            alt="KOSA Connection"
            width={`800`}
            height={`800`}
          />
        </div>
        <div>
          <p className="max-w-[600px] mt-20 text-center text-gray-600">
            KOSA is a place where you can connect with our members and
            leadership team, discover our past and ongoing activities, and stay
            informed about upcoming events. 
          </p>
        </div>
      </div>
      {/* 네번째 섹션 */}
      <div className="container mx-auto w-[60vmax] h-screen overflow-hidden flex flex-col items-center">
        <div className="mt-[20vmin] flex items-start space-y-2">
          <Image
            className="w-[400px] h-[400px] object-cover rounded-3xl mr-28"
            src={'/images/1.jpg'}
            alt="KOSA Connection"
            width={`800`}
            height={`800`}
          />
          <div>
            <p className="font-bold text-4xl text-korean-blue">Embrace</p>
            <p className="mt-8 text-2xl">
              Korean,
              <br />
              Korean-American,
              <br /> and anyone who loves Korean culture
            </p>
          </div>
        </div>
        <div>
          <p className="max-w-[600px] mt-20 text-center text-gray-600">
            KOSA is a community uniting Korean, Korean-American students,
            exchange students and anyone with a passion for Korean culture. We
            deliver every participant an amazing experience about Korean
            culture.
          </p>
        </div>
      </div>
      {/* 다섯번째 섹션 */}
      <div className="bg-gray-50 flex flex-col items-center">
        <div className="py-28">
          <p className="text-center font-bold text-5xl ">60</p>
          <p className="text-center mb-10">Members are with the association.</p>
          <p className="text-center font-bold text-5xl ">100</p>
          <p>Events have taken place to promote Korean culture.</p>
        </div>
      </div>
    </div>
  );
}
