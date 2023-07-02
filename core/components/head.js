import BellIcon from "@/core/components/icons/BellIcon";
import CaretIcon from "@/core/components/icons/CaretIcon";

export default function Head() {
    return (
        <div className={"flex justify-between items-center bg-white w-full py-5 px-10 lg:px-20"}>
            <CaretIcon onClick={() => alert("Caret")} className={"w-6 h-6 cursor-pointer"}/>
            <BellIcon onClick={() => alert("Bell")} className={"w-6 h-6 cursor-pointer"}/>
        </div>
    );
};
