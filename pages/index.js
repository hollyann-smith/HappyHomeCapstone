import Link from 'next/link';

function Home() {
  return (
    <div className="flex place-content-center">
      <div className="bg-white relative items-center  px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-lg rounded-3xl space-y-6">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <h2 className="font-bold text-gray-900 text-center text-3xl mb-5">Welcome to Happy Home!</h2>
        </div>
        <div className="mb-8">
          <div className="block text-lg font-medium text-center text-gray-600">Are you new here?</div>
          <Link href="/startmytem" passHref>
            <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-xl focus-visible:ring-black">Start my Team!</button>
          </Link>
        </div>
        <div className="mb-8">
          <div className="block text-lg font-medium text-center text-gray-600">Already have a team?</div>
          <Link href="/home" passHref>
            <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-xl focus-visible:ring-black">Enter</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
