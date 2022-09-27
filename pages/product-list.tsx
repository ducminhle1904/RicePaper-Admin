import { NextPageContext } from "next";
import TableData from "../components/TableData/TableData";
import { sampleProductList } from "../helpers/mockData";

export default function App() {
    return (
        <div>
            <TableData data={sampleProductList} />
        </div>
    );
}

export async function getServerSideProps({ req }: NextPageContext) {
    const headers = req ? req.headers : {};
    return { props: { headers } };
}
