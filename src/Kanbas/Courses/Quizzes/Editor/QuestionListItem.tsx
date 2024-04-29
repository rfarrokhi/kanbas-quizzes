import {FaDotCircle} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import useQuizStore, {QuizQuestion} from "@/lib/QuizStore";
import { SlPencil } from "react-icons/sl";
import { FiTrash } from "react-icons/fi";
import {useNavigate} from "react-router-dom";


export default function QuestionListItem({question}: {question: QuizQuestion}) {

    const navigate = useNavigate();
    const currentQuiz = useQuizStore().currentQuiz;
    const setCurrentQuestion = useQuizStore().setCurrentQuestion;

    function handleEditQuestion() {
        setCurrentQuestion(question);
        navigate(`/Kanbas/Courses/${currentQuiz?.courseId}/Quizzes/${currentQuiz?.id}/${question.id}/edit`);
    }

    function handleDeleteQuestion() {
        if (currentQuiz) {
            console.log("Deleting question", question);
            console.log("Current Quiz", currentQuiz);
            currentQuiz.deleteQuestion(question);
        }
        //currentQuiz?.deleteQuestion(question);
        //currentQuiz?.updateInStore();
    }

    return (
        <li className="flex items-center justify-between rounded-lg p-4 bg-white shadow-md dark:bg-gray-800">
            <div className="flex items-center">
                <FaDotCircle className="mr-4 h-4 w-4"/>
                <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 rounded-md py-1 px-2 text-sm dark:bg-gray-700">
                        <span>{question.points} Points</span>
                    </div>
                    <span className="font-semibold">{question.title}</span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleEditQuestion} size="sm" variant="outline">
                    <SlPencil className="mr-2 h-4 w-4"/>
                    Edit
                </Button>
                <Button onClick={handleDeleteQuestion} className="bg-red-500 text-white hover:bg-red-600" size="sm"
                        variant="outline">
                    <FiTrash className="mr-2 h-4 w-4"/>
                    Delete
                </Button>
            </div>
        </li>
    )
}