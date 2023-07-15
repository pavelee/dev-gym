import React from "react";
import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import { useTable, List, DeleteButton, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

const QuestionsList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <AntdListInferencer />
    );
};

export default QuestionsList;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const { authenticated, redirectTo } = await authProvider.check(context);

    if (!authenticated) {
        return {
            props: {},
            redirect: {
                destination: `${redirectTo}?to=${encodeURIComponent("/admin/tests")}`,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
