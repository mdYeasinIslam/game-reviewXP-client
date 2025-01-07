type PropType = {
    header :JSX.Element
}
const CommonBanner = ({header}:PropType) => {
    return (
        <div>
            {header}
            
        </div>
    );
};

export default CommonBanner;