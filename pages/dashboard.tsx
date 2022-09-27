import { NextPageContext } from "next";
import React, { useState } from "react";
import Stats from "../components/Stats/Stats";

export default function App() {
    return (
        <div>
            <Stats />
        </div>
    );
}

export async function getServerSideProps({ req }: NextPageContext) {
    const headers = req ? req.headers : {};
    return { props: { headers } };
}
