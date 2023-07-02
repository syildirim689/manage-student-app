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
import {useState} from "react";
import Link from "next/link";
import {ProgressBar} from 'react-loader-spinner';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Students = () => {
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const [addVisible, setAddVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const {register: searchForm, handleSubmit: handleSearchForm} = useForm();
    const {register: addFrom, handleSubmit: handleAddForm, reset: resetAddForm} = useForm();
    const changeLimit = (e) => {
        setLimit(parseInt(e.target.value));
    };
    const {data: users} = useSWR('https://dummyjson.com/users?limit=100');
    const data = users?.users;
    const MySwal = withReactContent(Swal);
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
        console.log(data.image);

        await axios.post('https://dummyjson.com/users/add', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            website: data.website,
            company: {
                name: data.company,
            },
            image: data.image[0].name,
        }).then((response) => {
            console.log(response);
            resetAddForm();
            MySwal.fire({
                title: "Kullanıcı eklendi!",
                icon: "success",
                confirmButtonText: "Tamam",
                confirmButtonColor: "#FEAF00",
            });
        });
    };
    const showUpdateModal = (id) => {
        setSelectedId(id)
        setModal(true);
    };
    const deleteStudent = async (id) => {
        MySwal.fire({
            title: "Kullanıcıyı silmek istediğinize emin misiniz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Evet",
            cancelButtonText: "Hayır",
            confirmButtonColor: "red",
            cancelButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://dummyjson.com/users/${id}`).then((response) => {
                    console.log(response);
                    MySwal.fire({
                        title: "Kullanıcı silindi!",
                        icon: "success",
                        confirmButtonText: "Tamam",
                        confirmButtonColor: "#FEAF00",
                    });
                });
            }
        });
    };
    const editStudent = async () => {
        await axios.put(`https://dummyjson.com/users/${selectedId}`, {
            firstName: "John",
            lastName: "Doe",
            email: "",
            phone: "",
            website: "",
            company: {
                name: "",
            },
            image: "",
        }).then((response) => {
            console.log(response);
            MySwal.fire({
                title: "Kullanıcı güncellendi!",
                icon: "success",
                confirmButtonText: "Tamam",
                confirmButtonColor: "#FEAF00",
            });
        });
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
                        <form className={"grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 items-center gap-5"}
                              onSubmit={handleAddForm(addStudent)}>
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
                                   placeholder={"Company Name"}/>
                            <input type={"file"} className={styles.addInput} id={"image"} {...addFrom("image")}
                                   placeholder={"Image"}/>
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
                        {!data && (
                            <tr>
                                <td className={"p-3 text-left w-[75px]"}>
                                    <ProgressBar
                                        height="80"
                                        width="80"
                                        ariaLabel="progress-bar-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="progress-bar-wrapper"
                                        borderColor='#FEAF00'
                                        barColor='#F8D442'
                                    />
                                </td>
                            </tr>
                        )}
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
                                        <PenIcon onClick={() => editStudent(item.id)}
                                                 className={"w-5 h-5 cursor-pointer"}/>
                                        <TrashIcon onClick={() => showUpdateModal(item.id)}
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
