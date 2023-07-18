import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select } from "antd";

export const AnswerCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const { selectProps: questionSelectProps } = useSelect({
        resource: "questions",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
        </Create>
    );
};

export default AnswerCreate;