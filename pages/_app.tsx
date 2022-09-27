import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { Spin } from "antd";

const AppLayout = dynamic(() => import("../components/Layout/Layout"), {
    ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url: string) => url !== router.asPath && setLoading(true);
        const handleComplete = (url: string) => url === router.asPath && setLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    });
    return (
        <AppLayout>
            <Head>
                <title>Quản lý kho hàng</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {loading ? (
                <div className="absolute left-1/2 top-1/2 flex items-center justify-center">
                    <Spin />
                </div>
            ) : (
                <Component {...pageProps} />
            )}
        </AppLayout>
    );
}
