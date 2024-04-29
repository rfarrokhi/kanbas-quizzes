import { Button } from "@/components/ui/button"
import { IoInformationCircleOutline } from "react-icons/io5";
import MultipleChoiceQuestionPreview from "@/Kanbas/Courses/Quizzes/Preview/MultipleChoiceQuestionPreview";
import useQuizStore from "@/lib/QuizStore";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import FillInBlanksQuestionPreview from "@/Kanbas/Courses/Quizzes/Preview/FillInBlanksQuestionPreview";
import TrueFalseQuestionPreview from "@/Kanbas/Courses/Quizzes/Preview/TrueFalseQuestionPreview";
import {useSnackbar} from 'notistack';

export default function QuizPreview() {

    const navigate = useNavigate();
    const {courseId} = useParams();

    const {enqueueSnackbar} = useSnackbar();

    const currentQuiz = useQuizStore().currentQuiz;
    const currentQuestion = useQuizStore().currentQuestion;
    const setCurrentQuestion = useQuizStore().setCurrentQuestion;

    useEffect(() => {
        if (currentQuiz && (currentQuiz.questions == null || currentQuiz.questions.length === 0)) {
            enqueueSnackbar("This quiz has no questions. Please add questions to preview the quiz.", {variant: "error", anchorOrigin: {horizontal: "center", vertical: "top"}, autoHideDuration: 3500});
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${currentQuiz.id}/edit`, {state: {activeTab: "Questions"}});
        }
    }, []);

    useEffect(() => {
        if (currentQuiz && currentQuiz.questions.length > 0) {
            setCurrentQuestion(currentQuiz.questions[0]);
        }
    }, [currentQuiz]);

    function handleQuestionSelectionChange(selectedQuestionNumber: number) {
        const selectedQuestion = currentQuiz?.questions[selectedQuestionNumber - 1];
        if (selectedQuestion) {
            setCurrentQuestion(selectedQuestion);
        }
    }

    function handleQuestionUpdateNavigation() {
        navigate(`/Kanbas/Courses/${currentQuiz?.courseId}/Quizzes/${currentQuiz?.id}/${currentQuestion?.id}/edit`);
    }

    function navigateToQuizDetails() {
        navigate(`/Kanbas/Courses/${currentQuiz?.courseId}/Quizzes/${currentQuiz?.id}`);
    }

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg">
            <header className="bg-white shadow rounded-lg max-w-2xl mx-auto p-8 my-8">
                <h1 className="text-3xl font-bold mb-2">{currentQuiz?.title}</h1>
                <div className="bg-red-100 text-red-800 text-sm rounded-lg p-2 flex items-center">
                    <IoInformationCircleOutline className="h-4 w-4 mr-2"/>
                    <strong>Note: </strong>
                    This is a preview of the published version of the quiz{"\n"}
                </div>
                <div className="border-t pb-4 mt-4">
                    <h2 className="text-xl font-semibold mt-2">Quiz Instructions</h2>
                    <p className="text-sm text-gray-500">Started: {new Date().toLocaleString()}</p>
                </div>
                <p className="text-sm text-gray-500">
                    <div dangerouslySetInnerHTML={{__html: currentQuiz?.instructions || ""}}/>
                </p>
            </header>
            <div className="bg-white shadow rounded-lg max-w-2xl mx-auto p-8 my-8">

                <div className="pt-4">
                    <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Question {currentQuestion && currentQuiz && currentQuiz?.questions.indexOf(currentQuestion) + 1}</h3>
                            <span className="text-sm font-semibold text-gray-500">{currentQuestion?.points} pts</span>
                        </div>
                        <p className="text-gray-700 mb-4">{currentQuestion?.question}</p>
                        <div className="flex flex-col gap-4">
                            <MultipleChoiceQuestionPreview />
                            <FillInBlanksQuestionPreview />
                            <TrueFalseQuestionPreview />
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-t pt-4">
                        <Button onClick={handleQuestionUpdateNavigation} className="text-gray-500" variant="outline">
                            Keep Editing This Quiz
                        </Button>
                        <div className="flex gap-4">
                            {
                                currentQuiz && currentQuestion && currentQuiz?.questions[0] !== currentQuestion &&
                                    <Button onClick={() => handleQuestionSelectionChange(currentQuiz.questions.indexOf(currentQuestion))} className="text-gray-500" variant="ghost">
                                        Previous
                                    </Button>
                            }
                            {
                                currentQuiz && currentQuestion && currentQuiz?.questions[currentQuiz.questions.length - 1] !== currentQuestion &&
                                    <Button onClick={() => handleQuestionSelectionChange(currentQuiz.questions.indexOf(currentQuestion) + 2)}>
                                        Next
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-2xl mx-auto my-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center ml-auto">
                        <Button onClick={navigateToQuizDetails} className="ml-auto">Submit Quiz</Button>
                    </div>
                </div>
                <ul className="flex flex-col gap-4">
                    {
                        currentQuiz?.questions.map((question, index) =>
                            <QuestionSwitchButton key={index} questionNumber={index + 1} selected={question === currentQuestion} onClick={handleQuestionSelectionChange}/>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

function QuestionSwitchButton({questionNumber, selected, onClick}: {questionNumber: number, selected: boolean, onClick: (questionNumber : number) => void}) {
    return (
        <li>
            <Button onClick={() => onClick(questionNumber)} className={`text-gray-${selected ? "900" : "500"}`} size="sm" variant={selected ? "outline" : "ghost"}>
                Question {questionNumber}
            </Button>
        </li>
    )
}