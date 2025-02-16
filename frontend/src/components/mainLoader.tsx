import { Loader } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const MainLoader = () => {
    return (
        <div className='h-screen w-full bg-black flex items-center justify-center'>
            <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
                <CardContent className='flex flex-col items-center gap-4 pt-6'>
                    <Loader className='size-6 text-red-700 animate-spin' />
                    <h3 className='text-zinc-400 text-xl font-bold'>Loading...</h3>
                </CardContent>
            </Card>
        </div>
    )
}

export default MainLoader
