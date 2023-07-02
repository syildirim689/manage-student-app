import dynamic from "next/dynamic";
import styles from '@/styles/Home.module.css';
import Layout from "@/core/layout";

const StaticBlock = dynamic(() => import('@/core/components/static-block'), {loading: () => <p>Loading...</p>});

const Home = () => {
    const pageTitle = 'Dashboard';
    return (
        <Layout className={"bg-[#FDFDFD]"} title={pageTitle}>
            <StaticBlock/>
        </Layout>
    );
};

export default Home;
