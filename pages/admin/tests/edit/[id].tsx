import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const TestEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const testsData = queryResult?.data?.data;

    const { selectProps: technologySelectProps } = useSelect({
        resource: "technologies",
        defaultValue: testsData?.technology,
        optionLabel: "name",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Id"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Technology"
                    name={"technology"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...technologySelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export default TestEdit;
