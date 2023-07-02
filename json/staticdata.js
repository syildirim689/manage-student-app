import StudentsIcon from "@/core/components/icons/StudentsIcon";
import CourseIcon from "@/core/components/icons/CourseIcon";
import PaymentIcon from "@/core/components/icons/PaymentIcon";
import UserIcon from "@/core/components/icons/UserIcon";

export const StaticData = [
    {
        title: "Students",
        icon: <StudentsIcon className={"w-12 h-8"} fill={"#74C1ED"}/>,
        value: "243",
        bgColor: "#F0F9FF",
    },
    {
        title: "Course",
        icon: <CourseIcon className={"w-8 h-8"} fill={"#EE95C5"}/>,
        value: "13",
        bgColor: "#FEF6FB",
    },
    {
        title: "Payments",
        icon: <PaymentIcon className={"w-8 h-8"} fill={"#F6C762"}/>,
        value: "555,000 ₺",
        bgColor: "#FEFBEC",
    },
    {
        title: "Users",
        icon: <UserIcon className={"w-8 h-8"} fill={"#FFFFFF"}/>,
        value: "3",
        titleColor: "#FFFFFF",
        bgColor: "linear-gradient(134deg, #FEAF00 0%, #F8D442 100%)",
    },
];
