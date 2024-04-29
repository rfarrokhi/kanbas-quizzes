import useQuizStore, {TrueFalseQuestion} from "@/lib/QuizStore";

export default function TrueFalseQuestionPreview() {

    const currentQuestion = useQuizStore().currentQuestion as TrueFalseQuestion
    const currentQuiz = useQuizStore().currentQuiz;

    if (!currentQuestion || currentQuestion.type !== "True/False") {
        return null;
    }

    function handleAnswerChange(newAnswer: boolean) {
        if (currentQuestion) {
            currentQuestion.givenAnswer = newAnswer;
            currentQuiz?.updateQuestion(currentQuestion);
        }
    }

    return (
        <>
            <div className="flex items-center">
                <input onClick={() => handleAnswerChange(true)} className="accent-red-600" id="true" name={currentQuestion.title} type="radio"/>
                <label className="ml-2" htmlFor="true">
                    True
                </label>
            </div>
            <div className="flex items-center">
                <input onClick={() => handleAnswerChange(false)} className="accent-red-600" id="false" name={currentQuestion.title} type="radio"/>
                <label className="ml-2" htmlFor="false">
                    False
                </label>
            </div>
        </>
    )
}