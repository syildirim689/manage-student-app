export default function Content({className, children}) {
    return (
        <div className={`${className} w-full`}>
            {children}
        </div>
    );
};
