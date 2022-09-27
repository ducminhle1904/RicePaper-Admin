import { IconUserPlus, IconDiscount2, IconReceipt2, IconCoin } from "@tabler/icons";
import { RowData } from "../models";

export const sampleProductList: RowData[] = [
    {
        id: "1",
        name: "Bánh tráng muối ớt",
        stock: "50",
        sold: "10",
        price: "25000",
    },
    {
        id: "2",
        name: "Bánh tráng trộn",
        stock: "50",
        sold: "15",
        price: "35000",
    },
    {
        id: "3",
        name: "Bánh tráng bơ tỏi",
        stock: "100",
        sold: "20",
        price: "45000",
    },
    {
        id: "4",
        name: "Bánh tráng cháy đen",
        stock: "100",
        sold: "25",
        price: "55000",
    },
    {
        id: "5",
        name: "Bánh tráng",
        stock: "200",
        sold: "30",
        price: "65000",
    },
];

export const stats = {
    data: [
        {
            title: "Doanh thu",
            icon: IconReceipt2,
            value: "13,456",
            diff: 34,
        },
        {
            title: "Lợi nhuận",
            icon: IconCoin,
            value: "4,145",
            diff: -13,
        },
        {
            title: "Số lượng hàng bán",
            icon: IconDiscount2,
            value: "745",
            diff: 18,
        },
        {
            title: "Khách hàng mới",
            icon: IconUserPlus,
            value: "188",
            diff: -30,
        },
    ],
};
