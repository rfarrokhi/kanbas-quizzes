import { Button } from "@/components/ui/button"
import {useNavigate, useParams} from "react-router-dom";
import useQuizStore from "@/lib/QuizStore";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

export default function QuizDetails() {

    const {courseId, quizId} = useParams() as { courseId: string, quizId: string };
    const navigate = useNavigate();

    const currentQuiz = useQuizStore().currentQuiz;
    const currentQuizPublishedColor = currentQuiz?.published ? "green" : "red";

    function handleQuizEdit() {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`)
    }

    function handleQuizPreview() {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`)
    }

    function flipQuizPublishedStatus() {
        if (currentQuiz) {
            currentQuiz.published = !currentQuiz.published;
            currentQuiz.updateInStore();
        }
    }

    function boolToYesNo(value: boolean | undefined) {
        return value ? "Yes" : "No";
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow m-8">
            <div className={"px-8"}>
                <div className="flex justify-between items-center mb-6">
                        <div className="flex">
                            <div
                                onClick={flipQuizPublishedStatus}
                                className={`inline-flex items-center px-3 py-1 rounded-md bg-${currentQuizPublishedColor}-100 text-${currentQuizPublishedColor}-800 text-md font-semibold shadow-md hover:shadow-lg cursor-pointer`}
                            >
                                {
                                    currentQuiz?.published ?
                                        <>
                                            <FaCheck className="h-5 w-5 text-green-600 mr-1"/>
                                            Published
                                        </>
                                        :
                                        <>
                                            <ImCross className="h-5 w-5 text-red-600 mr-1"/>
                                            Unpublished
                                        </>
                                }
                            </div>
                            <Button onClick={handleQuizPreview} className="text-base ml-3 bg-accent" size="lg" variant="ghost">
                                Preview
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button onClick={handleQuizEdit} className="text-base bg-accent font-semibold" size="lg" variant="ghost">
                                Edit
                            </Button>
                            <Button className={"bg-accent"} size="lg" variant="ghost">
                                <HiDotsVertical className="h-6 w-6 text-gray-400"/>
                            </Button>
                        </div>
                    </div>
            <div className="pb-2 border-b border-gray-200 mb-4">
                <h1 className="text-xl leading-6 font-medium text-gray-900">{currentQuiz?.title}</h1>
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Quiz Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentQuiz?.type}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Points</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentQuiz?.getPoints()}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Assignment Group</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentQuiz?.assignmentGroup}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Shuffle Answers</dt>
                    <dd className="mt-1 text-sm text-gray-900">{boolToYesNo(currentQuiz?.shuffleAnswers)}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Time Limit</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentQuiz?.timeLimit +  ` minutes`}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Multiple Attempts</dt>
                    <dd className="mt-1 text-sm text-gray-900">{boolToYesNo(currentQuiz?.multipleAttempts)}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">View Responses</dt>
                    <dd className="mt-1 text-sm text-gray-900">Always</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Show Correct Answers</dt>
                    <dd className="mt-1 text-sm text-gray-900">Immediately</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">One Question at a Time</dt>
                    <dd className="mt-1 text-sm text-gray-900">{boolToYesNo(currentQuiz?.oneQuestionAtATime)}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Require Respondus LockDown Browser</dt>
                    <dd className="mt-1 text-sm text-gray-900">No</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Required to View Quiz Results</dt>
                    <dd className="mt-1 text-sm text-gray-900">No</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Webcam Required</dt>
                    <dd className="mt-1 text-sm text-gray-900">{boolToYesNo(currentQuiz?.webcamRequired)}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Lock Questions After Answering</dt>
                    <dd className="mt-1 text-sm text-gray-900">{boolToYesNo(currentQuiz?.lockQuestionsAfterAnswering)}</dd>
                </div>
            </dl>
            <div className="mt-10 flex justify-between items-center">
                <div className="flex items-center space-x-14">
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Due</dt>
                        <dd className="mt-1 text-sm text-gray-900">{currentQuiz?.dueDate.toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">For</dt>
                        <dd className="mt-1 text-sm text-gray-900">Everyone</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Available from</dt>
                        <dd className="mt-1 text-sm text-gray-900">{currentQuiz?.availableDate.toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Until</dt>
                        <dd className="mt-1 text-sm text-gray-900">{currentQuiz?.untilDate.toLocaleString()}</dd>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}