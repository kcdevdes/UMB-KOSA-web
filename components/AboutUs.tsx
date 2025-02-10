/**
 * AboutUs Component
 * Show the information about the team members, and Social Media
 */

export default function AboutUs() {
  return (
    <div className="bg-gray-100 h-[80vh] flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center ">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-korean-black sm:text-5xl lg:text-balance">
            What is KOSA?
          </p>
        </div>
        <div className="md:text-xl lg:text-2xl text-gray-500 mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl lg:text-center lindent-4">
          <span className="text-korean-blue font-bold">KO</span>
          <span className="text-korean-red font-bold">SA</span> is a vibrant
          community uniting Korean, Korean-American students, and anyone with a
          passion for Korean culture. It’s a place where you can{' '}
          <span className="text-korean-black font-bold">
            connect with our members and leadership team, discover our past and
            ongoing activities, and stay informed about upcoming events.
          </span>{' '}
          More than just a student organization, we are dedicated to fostering
          an inclusive and welcoming space where meaningful connections thrive
          and unforgettable memories are made.
        </div>
      </div>
    </div>
  );
}
