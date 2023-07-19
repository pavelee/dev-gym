import { useRouter } from "next/router";
import { ExtendedNextPage } from "../_app";
import { useList, useOne } from "@refinedev/core";
import { IAnswer, IQuestion, ITest } from "src/interfaces";
import { Button, Card, Checkbox, Drawer, Radio, Result, Spin } from "antd";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Banner } from "pages";
import { Layout } from "@components/Layout";

const MagicCursor = () => {
    return (<span className="cursor"></span>);
}

export const FakeAiAnswer = ({
    text = "Show me example of classes in typescript",
}) => {
    const characters = text.trim().replace(/^ +/gm, '').split("");
    return (
        <pre>
            {characters}
            <MagicCursor />
        </pre>
    );
};

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
        // <Spin spinning={loading}>
        <pre dangerouslySetInnerHTML={{ __html: `${optimizedPost}<span class="cursor"></span>` }}></pre>
        // </Spin>
    )

}

const PrimaryButton = ({ text, onClick, isDisabled = false }: { text: string, onClick: any, isDisabled?: boolean }) => {
    let extraStyles = '';
    if (isDisabled) {
        extraStyles = ' opacity-20 cursor-not-allowed ';
    }
    return (
        <button className={`text-primary cursor-pointer border hover:bg-action border-minor rounded-md p-2 ${extraStyles}`} onClick={onClick} disabled={isDisabled}>{text}</button>
    )
}

const SecondaryButton = ({ text, onClick, isDisabled = false }: { text: string, onClick: any, isDisabled?: boolean }) => {
    let extraStyles = '';
    if (isDisabled) {
        extraStyles = ' opacity-20 cursor-not-allowed ';
    }
    return (
        <button className={`text-primary cursor-pointer hover:bg-action border border-minor rounded-md p-2 ${extraStyles}`} onClick={onClick} disabled={isDisabled}>{text}</button>
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

    // if (!questions && (questions && !questions.data)) {
    //     return <Spin />
    // }

    if (questions) {
        return (
            <div className="space-y-5 text-primary border-minor border p-5">
                <div className="text-2xl">{test.name}</div>
                <div className="text-secondary">{test.description}</div>
                <div className="flex justify-center gap-5">
                    <SecondaryButton
                        text="previous question"
                        onClick={previousQuestion}
                        isDisabled={isFirstQuestion(questions.data, questionsIndex)}
                    />
                    <SecondaryButton
                        text="next question"
                        onClick={nextQuestion}
                        isDisabled={isLastQuestion(questions.data, questionsIndex)}
                    />
                </div>
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
                            <QuestionView
                                key={questions.data[questionsIndex].id}
                                nextQuestionButton={<SecondaryButton
                                    text="next question"
                                    onClick={nextQuestion}
                                    isDisabled={isLastQuestion(questions.data, questionsIndex)}
                                />}
                                question={questions.data[questionsIndex]}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }

    return <Spin />
}

const AiHintDrawer = ({
    question,
    onClose,
    isOpen = false,
}: { question: IQuestion, onClose: () => void, isOpen: boolean }) => {
    return (
        <Drawer
            title={<div className="text-primary border-b pb-5 border-minor">AI Assistant</div>}
            placement={'bottom'}
            closable={false}
            open={isOpen}
            onClose={onClose}
            height={document.body.scrollHeight / 2}
            key={'bottom'}
            headerStyle={
                {
                    backgroundColor: '#202020',
                    color: '#0F0',
                    border: '1px',
                    borderTopColor: '#FFFF00'
                }
            }
            bodyStyle={
                {
                    backgroundColor: '#202020',
                    color: '#0F0'
                }
            }
        // rootClassName={'text-primary'}
        >
            <AiAnswer
                prompt=""
                endpoint={`/api/question/hint-ai/${question.id}`}
            />
        </Drawer>
    )
}

const QuestionView = ({ question, nextQuestionButton }: { question: IQuestion, nextQuestionButton?: ReactNode }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
    const [showQuestionHint, setShowQuestionHint] = useState(false);

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

    const toggleQuestionHint = () => {
        setShowQuestionHint(!showQuestionHint);
    }

    const getChoosenAnswer = (): IAnswer | null => {
        if (selectedAnswer && answers) {
            let choosenAnswer = answers.data.filter((answer) => answer.id === selectedAnswer);
            if (choosenAnswer) {
                return choosenAnswer[0];
            }
        }
        return null;
    }

    const isAnswerChosen = (): boolean => {
        return selectedAnswer !== null && answers !== undefined
    }

    const checkAnswer = () => {
        let answer = getChoosenAnswer();
        console.log(answer);
        if (answer) {
            setIsAnswerCorrect(answer.correct);
        } else {
            setIsAnswerCorrect(null);
        }
    }

    if (answers) {
        return (
            <div className="space-y-5">
                <AiHintDrawer
                    question={question}
                    onClose={toggleQuestionHint}
                    isOpen={showQuestionHint}
                />
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
                    <div className="space-y-10">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="md:w-1/2 space-y-5">
                                <div className="">
                                    {question.title}
                                </div>
                                {answers.data.map(answer => <AnswerView isSelected={selectedAnswer === answer.id} setSelectedAnswer={setSelectedAnswer} key={answer.id} answer={answer} />)}
                                <div className="flex justify-center">
                                    <PrimaryButton
                                        text="check answer"
                                        onClick={checkAnswer}
                                        isDisabled={!isAnswerChosen()}
                                    />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="w-full">
                                    {
                                        isAnswerCorrect === true &&
                                        <>
                                            <Result
                                                status={'success'}
                                                title={<span className="text-primary">Great, we have done all the operations!</span>}
                                                extra={
                                                    <>
                                                        {nextQuestionButton && nextQuestionButton}
                                                    </>
                                                }
                                            />
                                        </>
                                    }
                                    {
                                        isAnswerCorrect === false &&
                                        <Result
                                            style={{
                                                color: '#0F0'
                                            }}
                                            status={'error'}
                                            title={<span className="text-selected">Ops! Wrong answer! Try again!</span>}
                                            extra={
                                                <PrimaryButton
                                                    text="Not sure? Get a hint from AI"
                                                    onClick={toggleQuestionHint}
                                                />
                                            }
                                        />
                                    }
                                    {
                                        isAnswerCorrect === null &&
                                        <Result
                                            icon={null}
                                            title={
                                                <span className="text-primary">Waiting for your answer</span>
                                            }
                                            extra={
                                                <PrimaryButton
                                                    text="Not sure? Get a hint from AI"
                                                    onClick={toggleQuestionHint}
                                                />
                                            }
                                        />
                                    }
                                </div>
                                {/* <AiAnswer /> */}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

    return <Spin />
}

const AnswerView = ({ answer, isSelected, setSelectedAnswer }: { answer: IAnswer, isSelected: boolean, setSelectedAnswer: Function }) => {
    let selectedStyles = 'hover:bg-action';
    if (isSelected) {
        selectedStyles += ' bg-action';
    }
    const onSelect = () => {
        if (isSelected) {
            setSelectedAnswer(null);
        } else {
            setSelectedAnswer(answer.id);
        }
    }
    return (
        <div onClick={onSelect} className={`border border-minor p-2 rounded-xl cursor-pointer ${selectedStyles}`}>
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

    return <Layout>
        {/* <Banner /> */}
        <div className="text-primary">
            <Link href={`/`}>back to tests</Link>
        </div>
        <div className="flex flex-col">
            {
                test && <TestView test={test.data as ITest} />
            }
        </div>
    </Layout>
}

export default Test;

Test.noLayout = true;

// Napisz zadanie rekrutacyjne z TypeScript, cztery odpowiedzi, tylko jedna poprawna. Wynik wyświetl w tabelce: odpowiedź, czy poprawna