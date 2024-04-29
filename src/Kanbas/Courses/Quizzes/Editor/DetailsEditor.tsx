import {useState} from "react";
import { Button } from "@/components/ui/button"
import {TabsTrigger, TabsList, Tabs, TabsContent} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { IoBanOutline } from "react-icons/io5";
import Editor from "@/components/ui/rich-text/editor";
import {HiDotsVertical} from "react-icons/hi";
import {FaCheck, FaDotCircle} from "react-icons/fa";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useQuizStore, {QuizAssignmentGroup, QuizQuestionType, QuizType} from "@/lib/QuizStore";
import QuestionListItem from "@/Kanbas/Courses/Quizzes/Editor/QuestionListItem";
import { FiPlus } from "react-icons/fi";
import { SlMagnifier } from "react-icons/sl";


export default function QuizDetailsEditor() {

    const {courseId, quizId} = useParams() as { courseId: string, quizId: string };
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = location.state?.activeTab;

    const [currentQuiz, setCurrentQuiz] = useState(useQuizStore().currentQuiz);
    const currentQuizPublishedColor = currentQuiz?.published ? "green" : "grey";


    const [quizInstructions, setQuizInstructions] = useState<string>(`\n\n\n\n\n`);

    function navigateToQuizDetails() {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`)
    }

    function handleQuestionAdd() {
        const question = currentQuiz?.createQuestion();
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/${question?.id}/edit`)
    }

    function handleQuizSave(publish: boolean | null = null) {
        if (currentQuiz) {
            if (publish) {
                currentQuiz.published = true;
            }
            currentQuiz.updateInStore();
            navigateToQuizDetails();
        }
    }

    function handleQuizNameChange(event: any) {
        if (currentQuiz) {
            currentQuiz.title = event.target.value;
            setCurrentQuiz(currentQuiz)
            currentQuiz.updateInStore();
        }
    }

    function handleQuizTypeChange(value: string) {
        if (currentQuiz) {
            currentQuiz.type = value as QuizType;
            setCurrentQuiz(currentQuiz)
            currentQuiz.updateInStore();
        }
    }

    function handleAssignmentGroupChange(value: string) {
        if (currentQuiz) {
            currentQuiz.assignmentGroup = value as QuizAssignmentGroup;
            setCurrentQuiz(currentQuiz)
            currentQuiz.updateInStore();
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className={"px-5 md-10"}>
                <div className="flex justify-between pb-4 border-b">
                    <h2 className="text-lg font-semibold mt-2">Editing {currentQuiz?.title}</h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative group">
                            <div
                                className="flex items-center px-2 py-1 bg-gray-100 text-gray-500 rounded-md hover:shadow-md transition-shadow">
                                <span>{currentQuiz?.getPoints() + ` Points`}</span>
                            </div>
                        </div>
                        <div className={`flex items-center px-2 py-1 bg-${currentQuizPublishedColor}-100 text-${currentQuizPublishedColor}-500 rounded-md hover:shadow-md transition-shadow`}>
                            {
                                currentQuiz?.published ?
                                    <>
                                        <FaCheck className="h-4 w-4 mr-1 text-green-400"/>
                                        <span>Published</span>
                                    </>
                                    :
                                    <>
                                        <IoBanOutline className="h-4 w-4 mr-1 text-gray-400"/>
                                        <span>Not Published</span>
                                    </>
                            }

                        </div>
                        <Button className="p-1" variant="ghost">
                            <HiDotsVertical className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>
                <Tabs className="py-4" defaultValue={activeTab ? activeTab : "Details"} >
                    <TabsList>
                        <TabsTrigger value={"Details"}>Details</TabsTrigger>
                        <TabsTrigger value={"Questions"}>Questions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Details">
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <Label htmlFor="quiz-name">Quiz Name:</Label>
                                <Input id="quiz-name" placeholder="Enter quiz name" value={currentQuiz?.title} onChange={handleQuizNameChange}/>
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="quiz-instructions">Quiz Instructions:</Label>
                                <Editor
                                    content={quizInstructions}
                                    onChange={(content) => setQuizInstructions(content)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="quiz-type">Quiz Type</Label>
                                    <Select defaultValue={currentQuiz?.type.toString()} onValueChange={handleQuizTypeChange}>
                                        <SelectTrigger id="quiz-type">
                                            <SelectValue placeholder="Select Quiz Type"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Graded Quiz">Graded Quiz</SelectItem>
                                            <SelectItem value="Practice Quiz">Practice Quiz</SelectItem>
                                            <SelectItem value="Graded Survey">Graded Survey</SelectItem>
                                            <SelectItem value="Ungraded Survey">Ungraded Survey</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="assignment-group">Assignment Group</Label>
                                    <Select defaultValue={currentQuiz?.assignmentGroup.toString()} onValueChange={handleAssignmentGroupChange}>
                                        <SelectTrigger id="assignment-group">
                                            <SelectValue placeholder="Select Assignment Group"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Quizzes">Quizzes</SelectItem>
                                            <SelectItem value="Exams">Exams</SelectItem>
                                            <SelectItem value="Assignments">Assignments</SelectItem>
                                            <SelectItem value="Project">Project</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="font-semibold">Options</div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="shuffle-answers"/>
                                    <Label htmlFor="shuffle-answers">Shuffle Answers</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="time-limit"/>
                                    <Label htmlFor="time-limit">Time Limit</Label>
                                    <Input className="w-24" id="time-limit" placeholder="Minutes"/>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="multiple-attempts"/>
                                    <Label htmlFor="multiple-attempts">Allow Multiple Attempts</Label>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-2xl mx-auto p-6 mt-6">
                            <div className="mb-6 relative">
                                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="due">
                                    Due
                                </label>
                                <div className="relative">
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                        id="due"
                                        placeholder="Due date"
                                        type="text"
                                    />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CalendarDaysIcon className="h-4 w-4 text-gray-500"/>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700"
                                           htmlFor="available-from">
                                        Available from
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                            id="available-from"
                                            placeholder="Start date"
                                            type="text"
                                        />
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarDaysIcon className="h-4 w-4 text-gray-500"/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="until">
                                        Until
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                            id="until"
                                            placeholder="End date"
                                            type="text"
                                        />
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarDaysIcon className="h-4 w-4 text-gray-500"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Questions">
                        <div className="flex flex-col items-center">
                            <ul className="flex flex-col gap-4 mb-8 w-full">
                                {
                                    currentQuiz?.questions.map((question, index) => (
                                        <QuestionListItem question={question} key={index}/>
                                    ))
                                }
                            </ul>
                            <div className="flex space-x-4">
                                <Button
                                    onClick={handleQuestionAdd}
                                    className="bg-[#34D399] text-white hover:bg-[#059669] hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                                    <FiPlus className="mr-2"/>
                                    New Question{"\n"}
                                </Button>
                                <Button
                                    disabled
                                    className="bg-[#60A5FA] text-white hover:bg-[#2563EB] hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                                    <FiPlus className="mr-2"/>
                                    New Question Group{"\n"}
                                </Button>
                                <Button
                                    disabled
                                    className="bg-[#818CF8] text-white hover:bg-[#4F46E5] hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                                    <SlMagnifier className="mr-2"/>
                                    Find Questions{"\n"}
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
                <Separator className="my-4"/>
                <div className="flex items-center">
                    <Checkbox id="notify-change"/>
                    <label className="text-sm ml-2" htmlFor="notify-change">
                        Notify users this quiz has changed
                    </label>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Button className="text-gray-700 border-gray-300 hover:bg-gray-50" variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={() => handleQuizSave(true)} className="text-white bg-red-700 hover:bg-red-800" variant="destructive">
                        Save & Publish
                    </Button>
                    <Button onClick={() => handleQuizSave()} className="text-white bg-blue-700 hover:bg-blue-800">Save</Button>
                </div>
            </div>
        </div>
    )
}

function CalendarDaysIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
            <path d="M8 14h.01"/>
            <path d="M12 14h.01"/>
            <path d="M16 14h.01"/>
            <path d="M8 18h.01"/>
            <path d="M12 18h.01"/>
            <path d="M16 18h.01"/>
        </svg>
    )
}