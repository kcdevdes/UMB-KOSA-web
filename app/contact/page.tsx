/* eslint-disable @next/next/no-img-element */
import MyNavbar from '@/components/ui/MyNavbar';

export default function ContactPage() {
  return (
    <div className="w-full h-screen">
      <MyNavbar />
      <div className="py-10 flex flex-col justify-center items-center ">
        <div className="pt-20">
          <a
            data-flickr-embed="true"
            href="https://www.flickr.com/photos/202198983@N02/albums/72177720323590507"
            title="Sloth-album"
          >
            <img
              src="https://live.staticflickr.com/65535/54306082840_06a3e1a6be_w.jpg"
              width="500"
              height="375"
              alt="Sloth-album"
            />
          </a>
          <script
            async
            src="//embedr.flickr.com/assets/client-code.js"
            charSet="utf-8"
          ></script>
        </div>
      </div>
    </div>
  );
}
