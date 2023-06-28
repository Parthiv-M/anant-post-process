import Link from 'next/link';

export default function Home() {
  return (
    <main className='max-w-screen min-h-screen flex flex-col md:justify-center md:mt-auto mt-4 inter'>
      <div className='md:w-2/3 w-full flex md:flex-row flex-col gap-5 md:p-8 p-4 mx-auto'>
        <img className='rounded-lg' width={450} src='/postprocess/assets/images/postProcessingLogo.png' />
        <div className='flex flex-col justify-between'>
          <div>
            <p>
              The post processing utility contains two main functionalities—the ability to test out ML models and
              the power to visualise the datasets used to train the ML models.
            </p>
            <p className='mt-2'>
              Consisting of models that cater to a variety of materials, this tool can be used to predict and optimise
              various properties of materials. This cna eventually help in a better selection of materials for various 
              applications.
            </p>
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
