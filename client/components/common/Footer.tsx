import ClickableLogo from "./ClickableLogo";

const Footer = () => {
    return (
        <footer className='grid md:grid-cols-4 grid-cols-2 inter py-10 md:px-0 px-4'>
            <div className='flex flex-col items-center justify-center mx-auto col-span-2'>
                <ClickableLogo height={100} width={200} />
                <h6 className='mt-3'>A functional materials database</h6>
            </div>
            <div className='flex flex-col gap-1 mt-6'>
                <h6 className='font-bold'>aNANt</h6>
                {
                    [
                        { name: 'Meet the team', link: 'https://anant.mrc.iisc.ac.in/team' },
                        { name: 'Privacy policy', link: 'https://anant.mrc.iisc.ac.in/privacypolicy' },
                        { name: 'Terms and conditions', link: 'https://anant.mrc.iisc.ac.in/termsandconditions' }
                    ].map((footerLink: { name: string, link: string }, index: number) => {
                        return <a key={index} href={footerLink.link} rel='noreferrer' className='hover:underline text-sm'>{footerLink.name}</a>
                    })
                }
            </div>
            <div className='flex flex-col gap-1 mt-6'>
                <h6 className='font-bold'>Important Links</h6>
                {
                    [
                        { name: 'Contact us', link: 'https://anant.mrc.iisc.ac.in/contact' },
                        { name: 'Material Research Center', link: 'https://mrc.iisc.ac.in' },
                        { name: 'Indian Institute of Science', link: 'https://iisc.ac.in' }
                    ].map((footerLink: { name: string, link: string }, index: number) => {
                        return <a key={index} href={footerLink.link} rel='noreferrer' className='hover:underline text-sm'>{footerLink.name}</a>
                    })
                }
            </div>
        </footer>
    );
}

export default Footer;