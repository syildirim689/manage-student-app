import {StaticData} from "@/json/staticdata";

export default function StaticBlock() {
    return (
        <div
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-10 m-5 lg:m-10"}>
            {StaticData.map((item, index) => (
                <div key={index} style={{background: `${item.bgColor}`}}
                     className={`px-5 py-6 rounded-[8px] min-w-0 flex`}>
                    <div className={"flex flex-col justify-between items-stretch gap-5 w-full"}>
                        <div className={"order-1"}>
                            {item.icon}
                            <h3 {...(item.titleColor && {style: {color: `${item.titleColor}`}})}
                                className={"font-medium text-[14px] text-[#6C6C6C] leading-[17.07px] mt-5"}>
                                {item.title}
                            </h3>
                        </div>
                        <div className={"order-2 text-end"}>
                            <span className={"font-bold text-[30px] leading-[36.57px]"}>
                                {item.value}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
