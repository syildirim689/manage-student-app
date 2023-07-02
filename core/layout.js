import dynamic from "next/dynamic";
import Head from "next/head";
import Side from "@/core/components/side";
import Header from "@/core/components/head";

const Content = dynamic(() => import("@/core/components/content"), {loading: () => <p>Loading...</p>});

export default function Layout({title, children,className}) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main className={"flex w-full"}>
                <Side className={"sticky top-0"}/>
                <Content className={className}>
                    <Header/>
                    {children}
                </Content>
            </main>
        </>
    );
};

Layout.defaultProps = {
    title: 'Manage Students',
}
