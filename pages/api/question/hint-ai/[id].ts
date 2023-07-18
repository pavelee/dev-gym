import { OpenAIStream, OpenAIStreamPayload } from "src/utils/OpenAIStream";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createClient,
  SupabaseClient,
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { supabaseClient } from "src/utils/supabaseClient";
import { IQuestion } from "src/interfaces";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const getIdParam = (u: string) => {
  const url = new URL(u);
  const path = url.pathname;
  const parts = path.split("/");
  const param = parts[parts.length - 1];
  return param;
};

async function fetchQuestionWithAnswers(questionId: string) {
  let { data: questionData, error }: PostgrestSingleResponse<IQuestion> =
    await supabaseClient
      .from("questions")
      .select("content, answers (*)")
      .eq("id", questionId)
      .single();

  if (error) {
    throw error;
  }

  return questionData;
}

async function fetchRecordById(table: string, id: string) {
  const { data, error }: PostgrestResponse<any> = await supabaseClient
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.url);
  const id = getIdParam(req.url!);
  console.log(id);
  //   const { id } = req.query;
  const question = await fetchQuestionWithAnswers(id);

  if (!question) {
    throw new Error("asdsad");
  }

  let answers = [];
  for (let answer of question.answers) {
    answers.push(`${answer.content}`);
  }
  const prompt = `
  As AI assistance for learning programming
  There is question:
  ${question.content}
  with possible answers
  Do not answer question, just give some tip that could help to answer for question.
  Provide some documentation sources that could help to find answer
  ${answers.join("\n")}
  `;

  //   console.log(prompt);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
