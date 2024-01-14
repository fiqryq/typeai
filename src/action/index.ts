"use server"
import { z } from "zod";
import { cookies } from 'next/headers'
import { KEY } from "@/constant";

type StateType = {
    message: string;
    content: string;
    error: boolean;
};

export async function generateType(state: StateType, form: FormData): Promise<any> {
    const cookieStore = cookies()
    const OPENAPIKEY = cookieStore.get(KEY)

    const schema = z.object({
        payload: z.string().min(1, {
            message: 'Object empty.'
        }),
        type: z.string().optional(),
    })

    const parse = schema.safeParse({
        payload: form.get('payload'),
        type: form.get('type'),
    })

    // config : not validated yet
    const isEnum = form.get('enum')
    const isJavascriptly = form.get('javascriply')
    const isOptional = form.get('optional')

    if (!parse.success) {
        state.message = parse.error.issues[0].message
        state.error = true
        return state
    }

    const data = parse.data

    try {
        const prompt = `Your task is to generate a TypeScript type definition for a provided JSON structure. If the JSON structure is invalid, silently correct it without generating any additional messages. The output should be strictly the TypeScript code.
        with this criteria : 
        - ${data.type ? `using ${data.type}` : ''}
        - ${isEnum === 'on' ? 'use union type instead of enum' : ''}
        - ${isJavascriptly === 'on' ? 'using javascript convention using camelCase' : ''}
        - ${isOptional === 'on' ? 'make all property optional' : ''}
        `
        const response = await fetch('https://api.openai.com/v1/chat/completions',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAPIKEY?.value}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: prompt
                        },
                        {
                            role: 'user',
                            content: data.payload
                        }
                    ]
                })
            }
        )
        const content = await response.json()
        state.content = content.choices[0].message.content
        state.message = ""
        return state
    } catch (error) {
        state.message = "error generate type."
        state.error = true
        return state;
    }
}