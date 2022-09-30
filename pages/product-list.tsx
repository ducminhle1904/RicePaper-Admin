import { NextPageContext } from "next";
import TableData from "../components/TableData/TableData";

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
