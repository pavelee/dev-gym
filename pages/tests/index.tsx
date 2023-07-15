import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import { useTable, List, DeleteButton, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";

const TestList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: technologyData, isLoading: technologyIsLoading } = useMany({
        resource: "technologies",
        ids: tableProps?.dataSource?.map((item) => item?.technology) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["technology"]}
                    title="Technology"
                    render={(value) =>
                        technologyIsLoading ? (
                            <>Loading...</>
                        ) : (
                            technologyData?.data?.find(
                                (item) => item.id === value,
                            )?.name
                        )
                    }
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
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

export default TestList;