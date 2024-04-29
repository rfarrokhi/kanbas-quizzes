import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FiTrash} from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import useQuizStore, {MultipleChoiceQuestion} from "@/lib/QuizStore";

export default function MultipleChoiceAnswer() {

    const currentQuiz = useQuizStore().currentQuiz;
    const currentQuestion = useQuizStore().currentQuestion as MultipleChoiceQuestion;

    function handleAddAnswer() {
        if (currentQuestion) {
            currentQuestion.choices.push("");
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    function handleAnswerChange(answerIndex: number, newAnswer: string) {
        if (currentQuestion) {
            currentQuestion.choices[answerIndex] = newAnswer;
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    function handleAnswerDelete(answerIndex: number) {
        if (currentQuestion) {
            currentQuestion.choices = currentQuestion.choices.filter((_, index) => index !== answerIndex);
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    return (
        <div className="border-t pt-4">
            <Label className="block text-lg font-medium mb-2" htmlFor="answers">
                Answers:
            </Label>
            {
                currentQuestion.choices.map((answer, index) => {
                    if (index === 0) {
                        return (
                            <CorrectAnswerComponent
                                key={index}
                                index={index}
                                value={answer}
                                onChange={handleAnswerChange}
                            />
                        )
                    } else {
                        return (
                            <PossibleAnswerComponent
                                key={index}
                                index={index}
                                value={answer}
                                onChange={handleAnswerChange}
                                onDelete={handleAnswerDelete}
                            />
                        )
                    }
                })
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
        </div>
    )
}

function PossibleAnswerComponent(props: any) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-gray-200 text-gray-800 flex-shrink-0" variant="secondary">
                Possible Answer
            </Badge>
            <Input value={props.value} onChange={(event) => props.onChange(props.index, event.target.value)}
                   className="flex-grow" placeholder="Enter a possibe answer"/>
            <Button onClick={() => props.onDelete(props.index)} className="hover:bg-gray-200 transition-colors duration-200" size="sm"
                    variant="ghost">
                <FiTrash className="w-4 h-4"/>
            </Button>
        </div>
    )
}