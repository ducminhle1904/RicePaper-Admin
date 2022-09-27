import { IconPencil, IconTrashX } from "@tabler/icons";
import { Button, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { generateCurrency } from "../../helpers/moneyHelper";
import { RowData } from "../../models";

const columns: ColumnsType<RowData> = [
    {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
        render: (name) => <span className="font-bold text-[#002358]">{name}</span>,
    },
    {
        title: "Tồn kho",
        dataIndex: "stock",
        key: "stock",
        render: (stock) => <span className="font-bold text-[#002358]">{stock}</span>,
    },
    {
        title: "Đã bán",
        dataIndex: "sold",
        key: "sold",
        render: (sold) => <span className="font-bold text-[#002358]">{sold}</span>,
    },
    {
        title: "Giá niêm yết",
        dataIndex: "price",
        key: "price",
        render: (price) => <span className="font-bold text-[#002358]">{generateCurrency(price)}</span>,
    },
    {
        title: "",
        dataIndex: "tools",
        key: "tools",
        render: (_, record) => (
            <Space size="middle">
                <Tooltip title="Sửa sản phẩm">
                    <Button
                        className="flex items-center justify-center"
                        type="primary"
                        icon={<IconPencil color="#1890ff" />}
                    />
                </Tooltip>
                <Tooltip title="Xóa sản phẩm">
                    <Button
                        className="flex items-center justify-center"
                        type="primary"
                        icon={<IconTrashX />}
                        danger
                        ghost
                    />
                </Tooltip>
            </Space>
        ),
    },
];

interface Props {
    data: RowData[];
}

const TableData: FC<Props> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: any) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};

export default TableData;
