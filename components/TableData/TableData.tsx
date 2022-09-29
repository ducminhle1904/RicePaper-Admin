import { IconPencil, IconTrashX } from "@tabler/icons";
import { Button, Space, Table, Tooltip, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FC, useEffect, useState } from "react";
import { generateCurrency } from "../../helpers/moneyHelper";
import { RowData } from "../../models";

interface Props {
    data: RowData[];
}

const TableData: FC<Props> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [initialValues, setInitialValues] = useState<RowData>({ id: "", name: "", stock: "", sold: "", price: "" });
    const [form] = Form.useForm();

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
                            onClick={() => editProduct(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa sản phẩm">
                        <Button
                            className="flex items-center justify-center"
                            type="primary"
                            icon={<IconTrashX />}
                            danger
                            ghost
                            onClick={() => deleteProduct(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [form, initialValues]);

    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

    const editProduct = (product: RowData) => {
        setOpen(true);
        setInitialValues(product);
    };

    const deleteProduct = (product: RowData) => {
        Modal.warning({
            title: `Xóa sản phẩm ${product.name}`,
            content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            closable: true,
        });
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onSelectChange = (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="id" />
            <Modal
                open={open}
                title={`Chỉnh sửa ${initialValues.name}`}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        form="myForm"
                        htmlType="submit"
                        type="ghost"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Cập nhật
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="myForm"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tồn kho"
                        name="stock"
                        rules={[{ required: true, message: "Vui lòng nhập tồn kho!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá niêm yết"
                        name="price"
                        rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TableData;
