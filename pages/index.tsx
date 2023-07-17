import { NavigateToResource } from "@refinedev/nextjs-router";
import { ExtendedNextPage } from "./_app";
import { Avatar, Card, Checkbox } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useList } from "@refinedev/core";
import { ITechnology, ITest } from "src/interfaces";
import Link from "next/link";
import { AiAnswer } from "./test/[id]";

const TestCard = ({ test }: { test: ITest }) => {
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://picsum.photos/500"
                />
            }
            actions={[
                <Link href={`/test/${test.id}`}><EditOutlined key="edit" /></Link>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title={test.name}
                description={test.description}
            />
        </Card>
    )
}

const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];

const getTechnologyOptions = (technologies: ITechnology[]) => {
    let t: any[] = [];
    technologies.map(tech => {
        // t.push(tech.name);
        t.push({ label: tech.name, value: tech.id })
    });
    return t;
}

const Banner = () => {
    return (
        <div className="h-96 bg-[#202020] w-full rounded-xl">
            <div className="flex items-center justify-center h-full text-[#0F0] p-5">
                <AiAnswer prompt="As programmer, write motivation text for programmer to learn new things. Text should encourde to do tests. Text should have at least 30 words. Signature as superpower AI machine" />
            </div>
        </div>
    )
}


const Home: ExtendedNextPage = () => {
    const { data: technologies, isLoading: technologiesIsLoading } = useList({
        resource: 'technologies'
    });
    const { data: tests, isLoading: testsIsLoading, isError: testIsError } = useList({
        resource: 'tests'
    })

    return <div className="container mx-auto flex flex-col">
        <Banner />
        <div className="flex flex-col">
            <div className="flex justify-center p-10">
                <Checkbox.Group
                    options={technologies ? getTechnologyOptions(technologies.data as ITechnology[]) : []}
                    defaultValue={['Pear']}
                    onChange={() => { }}
                />
            </div>
            <div className="grow flex gap-3 flex-wrap justify-center">
                {
                    !testsIsLoading && tests && tests.data.map(test => (
                        <TestCard key={test.id} test={test as ITest} />
                    ))
                }
            </div>
        </div>
    </div>
};

export default Home;

Home.noLayout = true;
