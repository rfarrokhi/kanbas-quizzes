import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import MultipleChoiceAnswer from "@/Kanbas/Courses/Quizzes/Editor/AnswerTypes/MultipleChoice";
import TrueFalseAnswer from "@/Kanbas/Courses/Quizzes/Editor/AnswerTypes/TrueFalse";
import FillInBlanks from "@/Kanbas/Courses/Quizzes/Editor/AnswerTypes/FillInBlanks";
import useQuizStore, {QuizQuestionType} from "@/lib/QuizStore";
import {useNavigate} from "react-router-dom";

export default function QuizQuestionEditor() {

    const navigate = useNavigate();

    const currentQuiz = useQuizStore().currentQuiz;
    const currentQuestion = useQuizStore().currentQuestion;
    const setCurrentQuestion = useQuizStore().setCurrentQuestion;

    function handleGoBack() {
        navigate(`/Kanbas/Courses/${currentQuiz?.courseId}/Quizzes/${currentQuiz?.id}/edit`,
            { state: { activeTab: "Questions" } });
    }

    function handleQuestionTypeChange(value: string) {
        if (currentQuestion) {
            currentQuestion.type = value as QuizQuestionType;
            setCurrentQuestion(currentQuestion);
        }
    }

    function handleQuestionPointsChange(event: any) {
        if (currentQuestion) {
            const points = parseInt(event.target.value);
            if (isNaN(points)) {
                return;
            }
            currentQuestion.points = points;
            setCurrentQuestion(currentQuestion);
        }
    }

    function handleQuestionTitleChange(event: any) {
        if (currentQuestion) {
            currentQuestion.title = event.target.value;
            setCurrentQuestion(currentQuestion);
        }
    }

    function handleQuestionTextChange(event: any) {
        if (currentQuestion) {
            currentQuestion.question = event.target.value;
            setCurrentQuestion(currentQuestion);
        }
    }

    function handleQuestionUpdate() {
        if (currentQuestion) {
            currentQuiz?.updateQuestion(currentQuestion);
            handleGoBack()
        }
    }

    return (
        <form className="p-4 bg-white rounded-lg shadow max-w-4xl mx-auto my-8">
            <div className={"px-5 md-10"}>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-4 gap-4">
                        <Input className="col-span-3" value={currentQuestion?.title} onChange={handleQuestionTitleChange} placeholder="Question Title"/>
                        <Select onValueChange={(value) => handleQuestionTypeChange(value)} value={currentQuestion?.type.toString()}>
                            <SelectTrigger id="question-type">
                                <SelectValue placeholder="Multiple Choice"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                                <SelectItem value="True/False">True/False</SelectItem>
                                <SelectItem value="Fill in Multiple Blanks">Fill in the Blanks</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex justify-end items-center col-span-4">
                            <label className="font-medium pr-2">pts:</label>
                            <Input className="w-12 text-right" onChange={handleQuestionPointsChange} value={currentQuestion?.points} type="text"/>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <Label className="block text-lg font-medium mb-2" htmlFor="question">
                            Question:
                        </Label>
                        <Textarea className="min-h-[100px]" id="question" onChange={handleQuestionTextChange} value={currentQuestion?.question} placeholder="Enter your question here"/>
                    </div>
                    {
                        currentQuestion?.type.toString() === "Multiple Choice" &&
                        <MultipleChoiceAnswer />
                    }
                    {
                        currentQuestion?.type.toString() === "True/False" &&
                        <TrueFalseAnswer />
                    }
                    {
                        currentQuestion?.type.toString() === "Fill in Multiple Blanks" &&
                        <FillInBlanks />
                    }
                </div>
                <div className="flex justify-between mt-6">
                    <Button onClick={handleGoBack} className="hover:bg-gray-200 transition-colors duration-200" variant="ghost">
                        Cancel
                    </Button>
                    <Button onClick={handleQuestionUpdate} className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white"
                            variant="secondary">
                        Update Question
                    </Button>
                </div>
            </div>
        </form>
)
}