import { freezeChoices, getCourseSuggestion, getFrozenChoices, hasFreezedElectives } from '@/apis/electives'
import AvailableElectives from '@/components/availableElectives'
import ChosenElectives from '@/components/chosenElectives'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { RootState } from '@/store/store'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface Course {
  cid: string
  name: string
  credits: number
  preference: number
}

const ChooseElectives = () => {
  const data = [
    { cid: "DL01", name: "Deep Learning", credits: 3 },
    { cid: "DS01", name: "Data Science", credits: 3 },
    { cid: "BC01", name: "Blockchain", credits: 3 },
    { cid: "OR01", name: "Operations Research", credits: 3 },
    { cid: "MM01", name: "Marketing Management", credits: 3 },
    { cid: "CC01", name: "Cloud Computing", credits: 3 },
    { cid: "UX01", name: "UI/UX", credits: 3 },
    { cid: "PS01", name: "Product Strategy", credits: 3 },
    { cid: "BD01", name: "Backend Development", credits: 3 },
    { cid: "DM01", name: "Database Management", credits: 3 },
    { cid: "DO01", name: "DevOps", credits: 3 },
    { cid: "IOT01", name: "IOT", credits: 3 }
  ]

  const [selectedElective, setSelectedElectives] = useState<Course[]>([]);
  const [isChoiceFreezed, setIsChoiceFreezed] = useState<boolean>(false);
  const [frozenChoice, setFrozenChoice] = useState<Course[]>([]);
  const [careerGoal, setCareerGoal] = useState<string>("");
  const [giveSuggestion, setGiveSuggestion] = useState<boolean>(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string[] | null>(null);

  const studentData = useSelector((state: RootState) => state.studentReducer);
  const enroll = studentData?.enroll

  useEffect(() => {
    if (studentData && enroll) {
      const fetchData = async () => {
        const response = await hasFreezedElectives(enroll);
        setIsChoiceFreezed(response);
        if (response) {
          const response2 = await getFrozenChoices(enroll);
          setFrozenChoice(response2);
        }
      };
      fetchData();
    }
  }, [studentData]);

  useEffect(() => {
    if (selectedElective && selectedElective.length > 0) {
      setIsChoiceFreezed(true);
      setFrozenChoice(selectedElective);
      const FreezeChoicesInDatabase = async () => {
        if (enroll) {
          await freezeChoices(enroll, selectedElective.sort((a, b) => a.preference - b.preference));
        }
      }
      FreezeChoicesInDatabase();
    }
  }, [selectedElective]);

  const handleSuggestion = async () => {
    if (careerGoal.length > 0) {
      setLoadingSuggestion(true);
      setGiveSuggestion(true);
      const response = await getCourseSuggestion(careerGoal);
      setSuggestion(response.split("\n").map((line: string) => line.replace(/[^a-zA-Z ]/g, '').trim()).filter((line: string) => line.length > 0));
      setLoadingSuggestion(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative">
      <Header title="Choose Electives" />
      <div>
        {!isChoiceFreezed ? (
          <Card className="bg-mainbg m-5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Available Courses</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <div className='flex items-center justify-center gap-1'>
                        <p>Get AI Suggestion</p>
                        <img src='/sparkling.png' className='w-6' />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Elective Suggestion</DialogTitle>
                      <DialogDescription>
                        <p>This is just a suggestion, please choose the electives carefully!</p>
                      </DialogDescription>
                    </DialogHeader>
                    {!giveSuggestion ? (
                      <div className='w-full flex flex-col gap-4'>
                        <Input placeholder='Enter your career goal' onChange={(e) => setCareerGoal(e.target.value)} />
                        <Button onClick={handleSuggestion} disabled={careerGoal.length > 0 ? false : true} className='w-full'>Get Suggestion</Button>
                      </div>
                    ) : loadingSuggestion ? (
                      <div className='flex items-center justify-center'>
                        <Loader className='size-6 text-red-700 animate-spin' />
                      </div>
                    ) : (
                      <div>
                        {suggestion && suggestion.map((ele: string, idx: number) => (
                          <div>
                            {idx + 1} . {ele}
                          </div>
                        ))}
                      </div>
                    )}


                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <AvailableElectives data={data} selectedElectives={setSelectedElectives} />
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-mainbg m-5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Your Choices</h3>
              </div>
            </CardHeader>
            <CardContent>
              <ChosenElectives data={frozenChoice} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ChooseElectives
