import Link from 'next/link';

export default function Home() {
  return (
    <main className='max-w-screen min-h-screen flex flex-col md:justify-center md:mt-auto mt-4 inter'>
      <div className='md:w-2/3 w-full flex md:flex-row flex-col gap-5 md:p-8 p-4 mx-auto'>
        <img className='rounded-lg' width={450} src='/assets/images/postProcessingLogo.png' />
        <div className='flex flex-col justify-between'>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
          </div>
          <Link href='/materials'>
            <button className='bg-neutral-900 px-3 py-3 w-full rounded-lg mt-4 md:mt-auto'>
              Try It Out
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
