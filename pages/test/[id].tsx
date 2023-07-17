import { useRouter } from "next/router";
import { ExtendedNextPage } from "../_app";
import { useList, useOne } from "@refinedev/core";
import { IAnswer, IQuestion, ITest } from "src/interfaces";
import { Button, Card, Checkbox, Radio, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";

export const FakeAiAnswer = ({ prompt }: { prompt?: string }) => {
    return (
        <AiAnswer endpoint="/api/fake-ai" />
    )
}

export const AiAnswer = ({
    prompt = 'Show me example of classes in typescript',
    endpoint = '/api/ai'
}: { prompt?: string, endpoint?: string }) => {
    const [optimizedPost, setOptimizedPost] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            await new Promise((resolve) => { setTimeout(resolve, 1000) });
            optimizePost();
        }
        run();
    }, [])

    const optimizePost = async () => {

        setOptimizedPost("");
        setLoading(true)
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),

        });


        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            const formattedChunk = chunkValue.replace(/\n/g, "<br>");
            setOptimizedPost((prev) => prev + formattedChunk);
        }
        setLoading(false);
    };

    return (
        <Spin spinning={loading}>
            <pre dangerouslySetInnerHTML={{ __html: optimizedPost }}></pre>
        </Spin>
    )

}

const TestView = ({ test }: { test: ITest }) => {
    const [questionsIndex, setQuestionIndex] = useState<number>(0);

    const isLastQuestion = (questions: IQuestion[], questionIndex: number): boolean => {
        return questionIndex + 1 === questions.length;
    }

    const isFirstQuestion = (questions: IQuestion[], questionIndex: number): boolean => {
        return questionIndex === 0;
    }

    const previousQuestion = () => {
        setQuestionIndex(questionsIndex - 1);
    }

    const nextQuestion = () => {
        setQuestionIndex(questionsIndex + 1);
    }

    const { data: questions, isLoading: questionsLoading } = useList<IQuestion>({
        resource: 'questions',
        filters: [
            {
                field: 'test',
                operator: 'eq',
                value: test.id
            }
        ]
    })

    console.log(questions);

    // if (!questions && (questions && !questions.data)) {
    //     return <Spin />
    // }

    if (questions) {
        return (
            <div className="space-y-5">
                <div className="text-2xl">{test.name}</div>
                <div className="text-gray-500">{test.description}</div>
                <div>
                    {
                        questions.total === 0 &&
                        <Result
                            status="404"
                            title="No questions yet"
                            subTitle="Sorry, questions are not provided yet."
                        />
                    }
                    {
                        questions && questions.total > 0 &&
                        <div className="space-y-5">
                            <QuestionView key={questions.data[questionsIndex].id} question={questions.data[questionsIndex]} />
                            <div className="space-x-5">
                                <Button onClick={nextQuestion}>Check answer</Button>
                                <Button onClick={previousQuestion} disabled={isFirstQuestion(questions.data, questionsIndex)}>previous question</Button>
                                <Button onClick={nextQuestion} disabled={isLastQuestion(questions.data, questionsIndex)}>Next question</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

    return <Spin />
}

const QuestionView = ({ question }: { question: IQuestion }) => {
    const { data: answers } = useList<IAnswer>({
        resource: 'answers',
        filters: [
            {
                field: 'question',
                operator: 'eq',
                value: question.id
            }
        ]
    })

    if (answers) {
        return (
            <div className="space-y-5">
                <div className="">
                    {question.title}
                </div>
                {
                    answers.total === 0 &&
                    <Result
                        status="404"
                        title="No answers yet"
                        subTitle="Sorry, answers are not provided yet."
                    />
                }
                {
                    answers.total > 0 &&
                    <div className="flex gap-5">
                        <div className="w-1/2 space-y-5">
                            {answers.data.map(answer => <AnswerView key={answer.id} answer={answer} />)}
                        </div>
                        <div className="w-1/2">
                            <AiAnswer />
                        </div>
                    </div>
                }
            </div>
        )
    }

    return <Spin />
}

const AnswerView = ({ answer }: { answer: IAnswer }) => {
    return (
        <div className="border border-gray-400 p-2 rounded-xl">
            {answer.content}
        </div>
    )
}

const Test: ExtendedNextPage = () => {
    const router = useRouter();
    const id = router.query.id

    const { data: test } = useOne({
        resource: 'tests',
        id: (id as string)
    })

    return <div className="container mx-auto flex flex-col gap-5">
        <div className="h-96 bg-blue-400 w-full rounded-xl">
            <div className="flex items-center justify-center h-full text-white">
                <FakeAiAnswer prompt="Write motivation text for programmer to learn new things. Text should have max 20 words" />
            </div>
        </div>
        <div>
            <Link href={`/`}>back to tests</Link>
        </div>
        <div className="flex flex-col">
            {
                test && <TestView test={test.data as ITest} />
            }
        </div>
    </div>
}

export default Test;

Test.noLayout = true;

// Napisz zadanie rekrutacyjne z TypeScript, cztery odpowiedzi, tylko jedna poprawna. Wynik wyświetl w tabelce: odpowiedź, czy poprawna