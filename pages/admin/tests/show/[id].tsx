import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const TestShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: technologyData, isLoading: technologyIsLoading } = useOne({
        resource: "technologies",
        id: record?.technology || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Name</Title>
            <TextField value={record?.name} />
            <Title level={5}>Description</Title>
            <TextField value={record?.description} />
            <Title level={5}>Technology</Title>
            {technologyIsLoading ? (
                <>Loading...</>
            ) : (
                <>{technologyData?.data?.name}</>
            )}
        </Show>
    );
};

export default TestShow;
