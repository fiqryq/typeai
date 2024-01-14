"use client"
import { useEffect, useMemo, useState } from "react"
import { Button } from "../ui/button"
import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer } from "../ui/drawer"
import { Input } from "../ui/input"
import Cookie from 'universal-cookie'
import { KEY } from "@/constant"


export const TokenDrawer = () => {
    const [key, setKey] = useState<string>('')
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const cookies = useMemo(() => new Cookie(), []);

    useEffect(() => {
        const openaiKey = cookies.get(KEY);
        if (openaiKey) {
            setKey(openaiKey);
        } else {
            setOpenDrawer(true)
        }
    }, [cookies]);

    const onSubmitCookies = () => {
        cookies.set(KEY, key)
        setOpenDrawer(false)
    }

    return (
        <Drawer open={openDrawer}>
            <DrawerTrigger></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Input OpenAI Token</DrawerTitle>
                    <DrawerDescription>You should use your openAI key for use this tools.</DrawerDescription>
                    <Input className="mt-3" onChange={(value) => setKey(value.target.value)} placeholder='Input your OpenAPI token here.' />
                    <div className="mt-3 space-y-2">
                        <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">YOUR KEY :</h1>
                        <p className="text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-muted p-3">{key}</p>
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    <Button onClick={() => onSubmitCookies()} disabled={key === ''}>{key ? 'Change Key' : 'Submit'}</Button>
                    <DrawerClose>
                        <Button variant="outline" className="w-full" onClick={() => setOpenDrawer(false)}>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}