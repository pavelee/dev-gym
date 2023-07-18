import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const AnswerShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: questionData, isLoading: questionIsLoading } = useOne({
        resource: "questions",
        id: record?.question || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Content</Title>
            <TextField value={record?.content} />
            <Title level={5}>Correct</Title>
            <BooleanField value={record?.correct} />
            <Title level={5}>Question</Title>
            {questionIsLoading ? (
                <>Loading...</>
            ) : (
                <>{questionData?.data?.title}</>
            )}
        </Show>
    );
};

export default AnswerShow;