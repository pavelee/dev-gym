import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const QuestionShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: testData, isLoading: testIsLoading } = useOne({
        resource: "tests",
        id: record?.test || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Title</Title>
            <TextField value={record?.title} />
            <Title level={5}>Content</Title>
            <TextField value={record?.content} />
            <Title level={5}>Test</Title>
            {testIsLoading ? <>Loading...</> : <>{testData?.data?.name}</>}
        </Show>
    );
};

export default QuestionShow;