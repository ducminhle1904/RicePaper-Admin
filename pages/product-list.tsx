import { NextPageContext } from "next";
import TableData from "../components/TableData/TableData";
import { getAllProduct } from "../helpers/apiCall";
import { sampleProductList } from "../helpers/mockData";

export default function App() {
    return (
        <div>
            <TableData />
        </div>
    );
}

export async function getServerSideProps({ req }: NextPageContext) {
    const headers = req ? req.headers : {};
    return { props: { headers } };
}
