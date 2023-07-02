import {useState} from "react";
import styles from '@/styles/Side.module.css';
import Image from "next/image";
import Link from "next/link";
import {NavbarData} from "@/json/navbardata";

export default function Side({className}) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={`${className} flex flex-col items-center justify-between h-screen p-5 bg-[#F2EAE1]`}>
            <div className={"flex flex-col items-center"}>
                <h1 className={styles.headText}>MANAGE COURSES</h1>
                <div className={"mt-10 text-center"}>
                    <Image priority={true} className={"rounded-full"} src={"/avatar/img.png"} alt={"avatar"} width={100} height={100}/>
                    <div className={"font-bold text-[17px] leading-[20.72px] mt-5"}>John Doe</div>
                    <div className={"font-medium text-[14px] leading-[17.07px] text-[#FEAF00] mt-2"}>Admin</div>
                </div>
                <div className={"flex flex-col gap-5 mt-20"}>
                    {NavbarData.map((item, index) => (
                        <Link className={"flex items-center gap-3"} href={item.slug} key={index}>
                        <span>
                            <Image priority={true} src={item.icon} alt={item.title} width={17} height={17}/>
                        </span>
                            <span className={"font-medium text-[14px] leading-[17.07px]"}>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <Link className={"flex items-center gap-3"} href={"/"}>
                    <span className={"font-medium text-[14px] leading-[17.07px]"}>Logout</span>
                    <Image priority={true} src={"/icons/logout.svg"} alt={"logout"} width={17} height={17} className={"w-auto h-auto"}/>
                </Link>
            </div>
        </div>
    );
};
