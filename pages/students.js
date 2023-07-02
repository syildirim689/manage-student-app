import dynamic from "next/dynamic";
import styles from '@/styles/Students.module.css';
import Layout from "@/core/layout";
import useSWR from "swr";
import {useForm} from "react-hook-form";
import PenIcon from "@/core/components/icons/PenIcon";
import TrashIcon from "@/core/components/icons/TrashIcon";
import Image from "next/image";
import SearchIcon from "@/core/components/icons/SearchIcon";
import LeftArrowIcon from "@/core/components/icons/LeftArrowIcon";
import RightArrowIcon from "@/core/components/icons/RightArrowIcon";
import {useEffect, useState} from "react";
import Link from "next/link";

const Students = () => {
    const [addData, setAddData] = useState([]);
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const [addVisible, setAddVisible] = useState(false);
    const {register: searchForm, handleSubmit: handleSearchForm} = useForm();
    const {register: addFrom, handleSubmit: handleAddForm} = useForm();
    const changeLimit = (e) => {
        setLimit(parseInt(e.target.value));
    };
    useEffect(() => {
        fetch("https://dummyjson.com/users").then((res) => res.json()).then((data) => {
            setAddData(data);
        });
    }, [addData]);
    const data = addData?.users;
    const totalPages = Math.ceil(data?.length / limit);
    const leftArrow = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };
    const rightArrow = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    const onSubmit = async (data) => {
        console.log(data);
    };
    const addStudent = async (data) => {
        setAddVisible(false);
        console.log(addData);
        // const newStudent = {
        //     id: Math.floor(Math.random() * 1000),
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     email: data.email,
        //     phone: data.phone,
        //     domain: data.website,
        //     company: {
        //         name: data.company
        //     },
        //     image: "https://robohash.org/hicveldicta.png",
        // };
        // setAddData((prevData) => [newStudent, ...prevData]);
    };
    const pageTitle = 'Students';
    return (
        <Layout className={"bg-[#F8F8F8]"} title={pageTitle}>
            <div className={"py-5 px-5"}>
                <div className={"flex items-center justify-between mb-3"}>
                    <h2 className={"font-bold text-[22px] leading-[26.82px]"}>Students List</h2>
                    <div className={"flex items-center gap-5"}>
                        <form onSubmit={handleSearchForm(onSubmit)}>
                            <div className="relative">
                                <input
                                    className={"border border-[#E5E5E5] rounded-[8px] px-4 py-2 text-sm outline-none"}  {...searchForm("search")}
                                    placeholder={"Search..."} id={"search"}/>
                                <SearchIcon onClick={handleSearchForm(onSubmit)}
                                            className={"absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"}/>
                            </div>
                        </form>
                        <button className={"rounded-[4px] bg-[#FEAF00] text-white px-4 py-3"}
                                onClick={() => setAddVisible(!addVisible)} type={"submit"}>
                            {addVisible ? "CANCEL" : "ADD NEW STUDENT"}
                        </button>
                    </div>
                </div>
                {addVisible && (
                    <div className={"my-10 w-full"}>
                        <form className={"flex items-center gap-5"} onSubmit={handleAddForm(addStudent)}>
                            <input className={styles.addInput} id={"firstName"} {...addFrom("firstName")}
                                   placeholder={"First Name"}/>
                            <input className={styles.addInput} id={"lastName"} {...addFrom("lastName")}
                                   placeholder={"Last Name"}/>
                            <input className={styles.addInput} id={"email"} {...addFrom("email")}
                                   placeholder={"Email"}/>
                            <input className={styles.addInput} id={"phone"} {...addFrom("phone")}
                                   placeholder={"Phone"}/>
                            <input className={styles.addInput} id={"website"} {...addFrom("website")}
                                   placeholder={"Website"}/>
                            <input className={styles.addInput} id={"company"} {...addFrom("company")}
                                   placeholder={"Company"}/>
                            <button className={styles.addButton} type={"submit"}>Submit</button>
                        </form>
                    </div>
                )}
                <div className="w-full overflow-x-auto">
                    <table className={styles.table}>
                        <thead className={"h-20"}>
                        <tr className={"font-semibold text-xs leading-[14.63px] text-[#ACACAC]"}>
                            <th className={"p-3 text-left w-[75px]"}></th>
                            <th className={"p-3 text-left"}>Name</th>
                            <th className={"p-3 text-left"}>Email</th>
                            <th className={"p-3 text-left"}>Phone</th>
                            <th className={"p-3 text-left"}>Website</th>
                            <th className={"p-3 text-left"}>Company Name</th>
                            <th className={"p-3 text-left"}></th>
                        </tr>
                        </thead>
                        <tbody className={"bg-white"}>
                        {data?.slice((page - 1) * limit, page * limit).map((item) => (
                            <tr className={""} key={item.id}>
                                <td className={"p-3"}>
                                    <Image priority={true} className={"rounded-[8px]"} src={item.image}
                                           alt={item.firstName + " " + item.lastName} width={75} height={65}/>
                                </td>
                                <td className={"p-3"}>{item.firstName} {item.lastName}</td>
                                <td className={"p-3"}><Link href={`mailto:${item.email}`}>{item.email}</Link></td>
                                <td className={"p-3"}>{item.phone}</td>
                                <td className={"p-3"}>{item.domain}</td>
                                <td className={"p-3"}>{item.company.name}</td>
                                <td className={"p-3"}>
                                    <div className={"flex items-center justify-center gap-5"}>
                                        <PenIcon onClick={() => alert("Edit")} className={"w-5 h-5 cursor-pointer"}/>
                                        <TrashIcon onClick={() => alert("Delete")}
                                                   className={"w-5 h-5 cursor-pointer"}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={"mt-7 font-normal text-[#9FA2B4] text-sm flex items-center justify-end gap-20"}>
                    <div>
                        <span>Rows per page: </span>
                        <select onChange={changeLimit} className={"outline-none bg-transparent"}>
                            <option value={"6"}>6</option>
                            <option value={"12"}>12</option>
                            <option value={"18"}>18</option>
                            <option value={"24"}>24</option>
                            <option value={"30"}>30</option>
                        </select>
                    </div>
                    <div className={"flex items-center gap-5"}>
                        <span>
                            {((page - 1) * limit) + 1}-{Math.min(page * limit, data?.length)} of {data?.length}
                        </span>
                        <div className={"flex items-center gap-2"}>
                            <LeftArrowIcon onClick={leftArrow} className={"w-6 h-6 cursor-pointer"}/>
                            <RightArrowIcon onClick={rightArrow} className={"w-6 h-6 cursor-pointer"}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Students;
