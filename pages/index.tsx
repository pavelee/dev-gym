import { NavigateToResource } from "@refinedev/nextjs-router";
import { ExtendedNextPage } from "./_app";
import { Avatar, Card, Checkbox } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useList, useOne } from "@refinedev/core";
import { ITechnology, ITest } from "src/interfaces";
import Link from "next/link";
import { AiAnswer, FakeAiAnswer, SuperFakeAiAnswer } from "./test/[id]";
import { Layout } from 'src/components/Layout';

const TestCard = ({ test }: { test: ITest }) => {

    const { data } = useOne({
        resource: 'technologies',
        id: (test.technology as unknown) as number // @TODO just get data with technology object
    });

    return (
        <div className="w-1/4 text-primary border-minor border p-5 rounded-xl flex flex-col gap-5 justify-between">
            <div className="italic text-2xl h-32 flex justify-center items-center border-b border-b-primary">
                {data && <span>{data.data.name}</span>}
            </div>
            <div className="border-b border-b-primary space-y-5 pb-5">
                <div>{test.name}</div>
                <div className="text-secondary">{test.description}</div>
            </div>
            <div className="flex justify-center">
                <Link href={`/test/${test.id}`}>
                    <button className="text-action hover:text-selected p-2 rounded-xl text-2xl">TEST ME</button>
                </Link>
            </div>
        </div>
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

export const Banner = () => {
    return (
        <div className="h-96 w-full rounded-xl">
            <div className="flex items-center justify-center h-full text-primary p-5">
                <SuperFakeAiAnswer prompt={`
                Dear fellow programmer, 
                Embrace the power of knowledge! Learning new things expands your repertoire, fuels creativity, and propels innovation. Challenge yourself with tests, for they sharpen your skills and ignite growth. Remember, your thirst for learning is your superpower. Keep coding! 
                Signature: Superpower AI Machine
                `} />
                {/* <AiAnswer prompt="As programmer, write motivation text for programmer to learn new things. Text should encourde to do tests. Text should have at least 30 words. Signature as superpower AI machine" /> */}
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

    return (
        <Layout>
            <Banner />
            <div className="flex flex-col">
                {/* <div className="flex justify-center p-10">
                <Checkbox.Group
                    options={technologies ? getTechnologyOptions(technologies.data as ITechnology[]) : []}
                    defaultValue={['Pear']}
                    onChange={() => { }}
                />
            </div> */}
                <div className="grow flex gap-5 flex-wrap justify-center">
                    {
                        !testsIsLoading && tests && tests.data.map(test => (
                            <TestCard key={test.id} test={test as ITest} />
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
};

export default Home;

Home.noLayout = true;
