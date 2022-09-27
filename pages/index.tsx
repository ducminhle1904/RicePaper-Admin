import { useRouter } from "next/router";

const redirectTo = "/dashboard";

const Index = () => {
    const router = useRouter();
    if (typeof window !== "undefined") {
        router.push(redirectTo);
    }
    return <></>;
};

Index.getInitialProps = async ({ ctx }: any) => {
    if (ctx && ctx.req) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader("Location", redirectTo);
    }
    return { props: "" };
};

export default Index;
