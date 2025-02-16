import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = token;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    updateApiToken(null);
                    navigate("/login");
                }
                updateApiToken(token);
            } catch (error) {
                updateApiToken(null);
                console.error("Error in Auth Provider: ", error);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, [])

    if (loading) {
        return (
            <div className='h-screen w-full bg-black flex items-center justify-center'>
                <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
                    <CardContent className='flex flex-col items-center gap-4 pt-6'>
                        <Loader className='size-6 text-red-700 animate-spin' />
                        <h3 className='text-zinc-400 text-xl font-bold'>Logging you in</h3>
                        <p className='text-zinc-400 text-sm'>Redirecting...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider
