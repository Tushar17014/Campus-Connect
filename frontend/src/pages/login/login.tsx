import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { StudentLogin, TeacherLogin } from "@/apis/auth"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setTeacherData } from "@/features/teacher/teacherSlice"
import { setStudentData } from "@/features/student/studentSlice"
import { websiteTitle } from "@/constants"

const Login = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [enroll, setEnroll] = useState(0);
    const [studentPassword, setStudentPassword] = useState("");
    const [uid, setUid] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");

    const handleStudentSubmit = async (e:any) => {
        e.preventDefault();
        const res = await StudentLogin(enroll, studentPassword);
        if(res?.statusCode == 200){
            localStorage.setItem("token", res.data?.token);
            localStorage.setItem("enroll", res.data?.user.enroll);
            dispatch(setStudentData(res.data?.user));
            navigate("/student");
        }
        else{
            toast({
                title: "Invalid Credentials",
                description: "Please enter valid enroll or password",
                variant: "destructive",
            })
        }
    }
    const handleTeacherSubmit = async (e:any) => {
        e.preventDefault();
        const res = await TeacherLogin(uid, teacherPassword);
        if(res?.statusCode == 200){
            localStorage.setItem("token", res.data?.token);
            localStorage.setItem("teacherid", res.data?.user.uid);
            dispatch(setTeacherData(res.data?.user));
            navigate("/teacher");
        }
        else{
            toast({
                title: "Invalid Credentials",
                description: "Please enter valid user id or password",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-10 border p-10 rounded-lg">
                <div className="flex items-center gap-5">
                    <img src="/vite.svg" width={70} />
                    <h1 className="font-medium text-5xl">{websiteTitle}</h1>
                </div>
                <Separator />
                <Tabs defaultValue="Student" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Student">Student</TabsTrigger>
                        <TabsTrigger value="Teacher">Teacher</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Student">
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Login</CardTitle>
                                <CardDescription>
                                    Log in to your account
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleStudentSubmit}>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="enroll" className="font-medium">Enroll</Label>
                                        <Input id="enroll" placeholder="Enrollment Number" className="h-[40px]" required onChange={(e) => setEnroll(Number(e.target.value))}/>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password" className="font-medium">Password</Label>
                                        <Input id="password" type="password" placeholder="Password" className="h-[40px]" required onChange={(e) => setStudentPassword(e.target.value)}/>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit">Log In</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="Teacher">
                        <Card>
                            <CardHeader>
                                <CardTitle>Teacher Login</CardTitle>
                                <CardDescription>
                                    Log in to your account
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleTeacherSubmit}>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="userid" className="font-medium">User ID</Label>
                                        <Input id="uid" placeholder="User ID" className="h-[40px]" required onChange={(e) => setUid(e.target.value)}/>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">Password</Label>
                                        <Input id="password" type="password" placeholder="password" className="h-[40px]" required onChange={(e) => setTeacherPassword(e.target.value)}/>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit">Log In</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>

    )
}

export default Login
