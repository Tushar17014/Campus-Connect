import { freezeChoices, getFrozenChoices, hasFreezedElectives } from '@/apis/electives'
import AvailableElectives from '@/components/availableElectives'
import ChosenElectives from '@/components/chosenElectives'
import Header from '@/components/header'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RootState } from '@/store/store'
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
    { cid: "ML01", name: "Machine Learning", credits: 3 },
    { cid: "ML01", name: "Machine Learning", credits: 3 }
  ]

  const [selectedElective, setSelectedElectives] = useState<Course[]>([]);
  const [isChoiceFreezed, setIsChoiceFreezed] = useState<boolean>(false);
  const [frozenChoice, setFrozenChoice] = useState<Course[]>([]);

  const studentData = useSelector((state: RootState) => state.studentReducer);
  const enroll = studentData?.enroll

  useEffect(() => {
    if (studentData && enroll) {
      const fetchData = async () => {
        const response = await hasFreezedElectives(enroll);
        setIsChoiceFreezed(response);
        if(response){
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
        if(enroll){
          await freezeChoices(enroll, selectedElective.sort((a, b) => a.preference - b.preference));
        }
      }
      FreezeChoicesInDatabase();
    }
  }, [selectedElective]);

  return (
    <div className="flex-1 overflow-auto relative">
      <Header title="Choose Electives" />
      <div>
        {!isChoiceFreezed ? (
          <Card className="bg-mainbg m-5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Available Courses</h3>
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
