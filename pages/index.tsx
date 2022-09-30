import { useRouter } from "next/router";

const redirectTo = "/dashboard";

const Index = () => {
    const router = useRouter();
    if (typeof window !== "undefined") {
        router.push(redirectTo);
    }
    return <></>;
};

export default Index;
