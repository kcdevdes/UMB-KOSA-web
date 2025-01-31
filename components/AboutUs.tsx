export default function AboutUs() {
  return (
    <div className="bg-white h-[80vh] flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center ">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            What is KOSA?
          </p>
        </div>
        <div className="md:text-xl lg:text-2xl text-gray-500 mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl lg:text-center lindent-4">
          <span className="text-blue-600 font-bold">KO</span>
          <span className="text-red-600 font-bold">SA</span> is a vibrant
          community uniting Korean, Korean-American students, and anyone with a
          passion for Korean culture. It’s a place where you can{' '}
          <span className="text-gray-900 font-bold">
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
