import Button from './ui/Button';

export default function AboutUs() {
  return (
    <div className="bg-white flex justify-center items-center h-screen flex-col">
      <strong className="text-5xl">What is KOSA?</strong>
      <p className="indent-8 m-10 text-3xl font-normal text-gray-400">
        <span className="font-semibold text-gray-800">
          <span className="text-blue-600">K</span>
          <span className="text-blue-600">O</span>
          <span className="text-red-600">S</span>
          <span className="text-red-600">A</span>
        </span>{' '}
        is a vibrant community uniting Korean, Korean-American students, and
        anyone with a passion for Korean culture. It’s a place where you can{' '}
        <span className="font-normal text-gray-700">
          connect with our members and leadership team, discover our past and
          ongoing activities
        </span>
        , and stay informed about upcoming events. More than just a student
        organization, we are dedicated to fostering an inclusive and welcoming
        space where meaningful connections thrive and unforgettable memories are
        made.
      </p>
      <Button>See Who We Are ➜</Button>
    </div>
  );
}
