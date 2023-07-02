import {SWRConfig} from "swr";
import '@/styles/globals.css'
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
    async: true,
    subsets: ['latin-ext'],
    variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    fontFace: true
});

const swrConfig = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    // refreshInterval: 1000,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    keepPreviousData: true,
    focusThrottleInterval: 5000,
    dedupingInterval: 2000,
    fetcher: (url) => fetch(url).then((res) => res.json())
};

export default function App({Component, pageProps}) {
    return (
        <SWRConfig value={swrConfig}>
            <main className={montserrat.className}>
                <Component {...pageProps} />
            </main>
        </SWRConfig>
    );
};
