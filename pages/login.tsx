import { Avatar, Form, Input, Typography } from "antd";
import Head from "next/head";
import { useAuth } from "../contexts/auth";

const { Title } = Typography;

export default function LoginPage() {
    const { login } = useAuth();

    const onFinish = (values: any) => {
        login(values.username, values.password);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <Head>
                <title>Đăng nhập</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="h-full w-full py-16 px-4">
                <div className="flex flex-col items-center justify-center">
                    <Avatar src="/Ricepaperlogo.png" size={120} />
                    <div className="bg-white shadow-2xl rounded lg:w-1/3  md:w-1/2 w-full p-5 mt-16">
                        <Title level={2} className="text-gray-800">
                            Login to your account
                        </Title>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: "Please input your username!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Form>

                        <div className="mt-8">
                            <button
                                role="button"
                                aria-label="create my account"
                                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                                html-type="submit"
                                form="basic"
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
