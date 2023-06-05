const GoBack = () => {
    return (
        <p onClick={() => history.back()} className='hover:bg-black/10 p-3 rounded-lg inline hover:cursor-pointer'>
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Go Back
        </p>
    );
}

export default GoBack;