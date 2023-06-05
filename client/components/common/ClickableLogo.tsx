const ClickableLogo = (props: { height: number, width: number }) => {
    return (
        <a href='https://anant.mrc.iisc.ac.in' rel='noreferrer'>
            <img height={props.height} width={props.width} src='/postprocess/assets/images/anantLogo.png' />
        </a>
    )
}

export default ClickableLogo;