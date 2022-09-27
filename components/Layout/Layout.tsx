import { Breadcrumb, Layout, Menu, Avatar, Typography } from "antd";
import { WithRouterProps } from "next/dist/client/with-router";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import React, { useState } from "react";
import type { MenuProps } from "antd";

import { AppstoreOutlined, ProfileOutlined, SettingOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
const { Sider, Content } = Layout;
const { Text } = Typography;

interface Router extends NextRouter {
    path: string;
    breadcrumbName: string;
}

interface Props extends WithRouterProps {
    router: Router;
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps["items"] = [
    getItem("Tổng quan", "dashboard", <AppstoreOutlined />),
    getItem("Danh sách hàng hóa", "product-list", <ProfileOutlined />),
    getItem("Cài đặt", "setting", <SettingOutlined />, [getItem("Hồ sơ", "profile"), getItem("Ứng dụng", "app")]),
];

function itemRender(route: Router, params: any, routes: Array<Router>, paths: Array<string>): React.ReactNode {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link href={"/"}>{route.breadcrumbName}</Link>;
}

function transfromRoute(route: string) {
    switch (route) {
        case "product-list":
            return "Danh sách sản phẩm";
        case "dashboard":
            return "Tổng quan";
        case "setting":
            return "Cài đặt";
        case "profile":
            return "Hồ sơ";
        case "app":
            return "Ứng dụng";
        default:
            break;
    }
}

function routesMaker(pathsplit: string[]) {
    let routes = [
        {
            path: "index",
            breadcrumbName: "Trang chủ",
        },
    ];
    for (let v of pathsplit) {
        const pathInfo = {
            path: v,
            breadcrumbName: transfromRoute(v)!,
        };
        if (v !== "") routes.push(pathInfo);
    }
    return routes;
}

const AppLayout = (props: React.PropsWithChildren<Props>) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const onChangeIsCollapsed = (isCollapsed: boolean) => {
        setIsCollapsed(isCollapsed);
    };

    const pathname = props.router.pathname;
    const pathsplit: string[] = pathname.split("/");
    const routes = routesMaker(pathsplit);

    const onClick: MenuProps["onClick"] = ({ key, keyPath, domEvent }) => {
        domEvent.preventDefault();
        if (keyPath.length > 1) {
            props.router.push(`/setting/${key}`);
        } else {
            props.router.push(`/${key}`);
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={isCollapsed} onCollapse={onChangeIsCollapsed} width={300}>
                <div className="flex flex-col items-center gap-1 p-3">
                    <Link href="/dashboard">
                        <a>
                            <Avatar size={64} src="/Ricepaperlogo.png" />
                        </a>
                    </Link>
                    {!isCollapsed && (
                        <Text strong style={{ color: "#ffffff" }}>
                            Bánh tráng Hương Gió
                        </Text>
                    )}
                </div>
                <Menu
                    onClick={onClick}
                    theme="dark"
                    defaultSelectedKeys={["dashboard"]}
                    defaultOpenKeys={["dashboard"]}
                    selectedKeys={[pathsplit.pop()!]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout style={{ padding: "0 16px 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }} itemRender={itemRender} routes={routes} />
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 16,
                        minHeight: 280,
                        backgroundColor: "#ffffff",
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default withRouter(AppLayout);
