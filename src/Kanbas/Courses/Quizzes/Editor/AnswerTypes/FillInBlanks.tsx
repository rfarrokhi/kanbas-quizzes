import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FiTrash} from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import useQuizStore, {FillInMultipleBlanksQuestion} from "@/lib/QuizStore";

export default function FillInBlanks() {
    const currentQuiz = useQuizStore().currentQuiz;
    const currentQuestion = useQuizStore().currentQuestion as FillInMultipleBlanksQuestion;

    function handleAddAnswer() {
        if (currentQuestion) {
            currentQuestion.correctAnswers.push("");
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    function handleAnswerChange(answerIndex: number, newAnswer: string) {
        if (currentQuestion) {
            currentQuestion.correctAnswers[answerIndex] = newAnswer;
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    function handleAnswerDelete(answerIndex: number) {
        if (currentQuestion) {
            currentQuestion.correctAnswers = currentQuestion.correctAnswers.filter((_, index) => index !== answerIndex);
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    return (
        <div className="border-t pt-4">
            <Label className="block text-lg font-medium mb-2" htmlFor="answers">
                Answers:
            </Label>
            {
                currentQuestion?.correctAnswers.map((answer, index) =>
                    <CorrectAnswerComponent
                        key={index}
                        index={index}
                        value={answer}
                        onChange={handleAnswerChange}
                        onDelete={handleAnswerDelete}
                    />
                )
            }
            <Button onClick={handleAddAnswer} className="self-start hover:bg-gray-200 transition-colors duration-200"
                    variant="outline">
                + Add Another Answer
            </Button>
        </div>
    )
}

function CorrectAnswerComponent(props: any) {
    return (
        <div className="flex items-center gap-2 mb-2">
            <Badge className="border-green-600 bg-white dark:bg-gray-950 flex-shrink-0"
                   variant="outline">
                <FaCircle
                    className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300"/>
                Correct Answer
            </Badge>
            <Input value={props.value} onChange={(event) => props.onChange(props.index, event.target.value)}
                   className="flex-grow" placeholder="Enter the correct answer"/>
            <Button onClick={() => props.onDelete(props.index)} className="hover:bg-gray-200 transition-colors duration-200" size="sm"
                    variant="ghost">
                <FiTrash className="w-4 h-4"/>
            </Button>
        </div>
    )
}