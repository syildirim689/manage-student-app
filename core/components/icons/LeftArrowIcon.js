export default function LeftArrowIcon({className, onClick}) {
    return (
        <svg onClick={onClick} className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9.07071 12.0707C9.03166 12.0317 9.03166 11.9683 9.07071 11.9293L15 6" stroke="#9FA2B4"
                  strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
};
