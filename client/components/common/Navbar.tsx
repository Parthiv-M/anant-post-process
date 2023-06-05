import ClickableLogo from "./ClickableLogo";

const Navbar = () => {
    return (
        <nav className='flex items-center p-3'>
            <ClickableLogo height={100} width={200}/>
            <div className='flex grow px-6 py-3 justify-between items-center rounded-full bg-black/50'>
                <h5 className="tracking-widest">POST PROCESSING UTILITY</h5>
                <a href='https://anant.mrc.iisc.ac.in' rel='no-referrer'>
                    <i className='fa-solid fa-house hover:scale-105'></i>
                </a>
            </div>
        </nav>
    )
}

export default Navbar;