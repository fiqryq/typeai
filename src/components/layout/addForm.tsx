"use client"
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { generateType } from "@/action"
import { UseGenerateTypeStore } from "@/store"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch";
import Link from "next/link";

const initialState = {
    message: "",
    content: "",
    error: false
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full mt-3" type='submit' disabled={pending}>
            Generate Type
        </Button >
    )
}

export const AddForm = () => {
    const [state, formAction] = useFormState(generateType, initialState)
    const { setContent } = UseGenerateTypeStore()

    useEffect(() => {
        setContent(state.content)
    }, [state, setContent])

    return (
        <div>
            <form action={formAction} className="space-y-3">
                <Textarea placeholder="Input your JOSN here." className="h-[400px] resize-none" name="payload"></Textarea>
                {state.error ? <p className='text-sm text-destructive'>{state.message}</p> : null}
                <Select name="type">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Object Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="type">Type</SelectItem>
                        <SelectItem value="interface">Interface</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Using union type instead of enum</span>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Suggests replacing an enum with a union type for improved flexibility and maintainability in TypeScript code.</p>
                    </div>
                    <div>
                        <Switch name="enum" />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Suggests JavaScript-style property name transformation.</span>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Proposes transforming property names to align with JavaScript naming conventions.</p>
                    </div>
                    <div>
                        <Switch name="javascriply" />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Make all property optional</span>
                    </div>
                    <div>
                        <Switch name="optional" />
                    </div>
                </div>
                <SubmitButton />
            </form>
            <div className="pt-5 w-full">
                <p className="text-sm text-muted-foreground w-full">made with ❤️ by <Link href='https://github.com/fiqryq'>fiqryq</Link>.</p>
            </div>
        </div>

    )
}