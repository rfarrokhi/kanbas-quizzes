import useQuizStore, {FillInMultipleBlanksQuestion} from "@/lib/QuizStore";
import {Input} from "@/components/ui/input";

export default function FillInBlanksQuestionPreview() {

    const currentQuiz = useQuizStore().currentQuiz;
    const currentQuestion = useQuizStore().currentQuestion as FillInMultipleBlanksQuestion;

    function handleAnswerChange(answerIndex: number, newAnswer: string) {
        if (currentQuestion) {
            currentQuestion.givenAnswers[answerIndex] = newAnswer;
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    return (
        <>
            {
                currentQuestion?.correctAnswers.map((answer, index) => {
                    if (answer === "") {
                        return;
                    } else {
                        return (
                            <AnswerInput
                                key={index}
                                index={index}
                                value={currentQuestion.givenAnswers[index]}
                                onChange={handleAnswerChange}
                            />
                        )
                    }
                })
            }
        </>
    )
}

function AnswerInput({index, value, onChange}: { index: number, value: string, onChange: (answerIndex: number, newAnswer: string) => void}) {
    return (
        <div className="flex items-center">
            <span className="mr-2 w-4 text-right">{index+1}. </span>
            <Input className="w-20" value={value} onChange={(event) => onChange(index, event.target.value)}/>
        </div>
    )
}


