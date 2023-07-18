import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const AnswerList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: questionData, isLoading: questionIsLoading } = useMany({
        resource: "questions",
        ids: tableProps?.dataSource?.map((item) => item?.question) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="content" title="Content" />
                <Table.Column
                    dataIndex={["correct"]}
                    title="Correct"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    dataIndex={["question"]}
                    title="Question"
                    render={(value) =>
                        questionIsLoading ? (
                            <>Loading...</>
                        ) : (
                            questionData?.data?.find(
                                (item) => item.id === value,
                            )?.title
                        )
                    }
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export default AnswerList;