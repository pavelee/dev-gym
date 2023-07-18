import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select } from "antd";

export const AnswerEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const answersData = queryResult?.data?.data;

    const { selectProps: questionSelectProps } = useSelect({
        resource: "questions",
        defaultValue: answersData?.question,
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
                    label="Content"
                    name={["content"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Correct"
                    valuePropName="checked"
                    name={["correct"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Checkbox>Correct</Checkbox>
                </Form.Item>
                <Form.Item
                    label="Question"
                    name={"question"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...questionSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export default AnswerEdit;