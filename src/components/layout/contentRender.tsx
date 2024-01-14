"use client"
import { UseGenerateTypeStore } from '@/store';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Lucide from '../ui/icons';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { toast } from 'sonner';

export const ContentRender = (): JSX.Element => {
    const { data } = UseGenerateTypeStore()
    const [_, copy] = useCopyToClipboard()

    const onCopyData = () => {
        copy(data)
        toast('Code success copy to clipboard.')
    }

    return (
        <div className='rounded-2xl relative h-full'>
            <div className='w-full h-10 bg-gray-800 inline-flex items-center justify-between flex-row-reverse px-5 rounded-t-xl absolute top-0'>
                <button onClick={() => onCopyData()} className='inline-flex items-center space-x-2 cursor-pointer'>
                    <Lucide name='clipboard' size={18} color='white' />
                    <span className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'>Copy code</span>
                </button>
            </div>
            <SyntaxHighlighter customStyle={{
                height: '100%',
                padding: '50px 25px 25px 25px',
                borderRadius: '12px'
            }} language='typescript' style={nightOwl} showLineNumbers>
                {data}
            </SyntaxHighlighter>
        </div>
    )
}