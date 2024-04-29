import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useQuizStore, {Quiz} from "@/lib/QuizStore";
import {RxRocket} from "react-icons/rx";
import {HiDotsVertical} from "react-icons/hi";
import {FaBan, FaCheck} from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {ConfirmationDialog} from "@/components/ui/confirmation-dialog";

export default function QuizListItem({ quiz }: { quiz: Quiz }) {

    const { courseId } = useParams() as { courseId: string };
    const navigate = useNavigate();
    const {setCurrentQuiz} = useQuizStore();

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    function handleQuizClick() {
        setCurrentQuiz(quiz);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`);
    }

    function handleDeleteQuiz() {
        quiz.delete();
        setDeleteConfirmationOpen(false);
    }

    function handleEditQuiz() {
        setCurrentQuiz(quiz);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/edit`);
    }

    function flipQuizPublished() {
        quiz.published = !quiz.published;
        quiz.updateInStore();
    }

    return (
        <div
            className={`${quiz.published && "border-green-500"} flex items-center justify-between bg-white p-4 shadow border-l-4 rounded-md`}>
            <RxRocket className={`text-${quiz.published ? "green" : "grey"}-500 w-6 h-6`}/>
            <div className="flex-1 ml-4">
                <p onClick={handleQuizClick} className="font-semibold cursor-pointer">{quiz.title}</p>
                <p className="text-sm text-gray-500">{quiz.getAvailabilityStatus()} | Due {quiz.dueDate.toLocaleDateString()} {quiz.getPoints() > 0 && `| ${quiz.getPoints()} points`} {quiz.questions.length > 0 && `| ${quiz.questions.length} Questions`}</p>
            </div>
            <div onClick={flipQuizPublished} className={"cursor-pointer"} title={quiz.published ? "Published" : "Unpublished"}>
                {quiz.published ?
                    <FaCheck className="text-green-500 w-6 h-6"/>
                    :
                    <FaBan className="text-red-500 w-6 h-6"/>
                }
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className={"cursor-pointer"}>
                        <HiDotsVertical className="w-6 h-6 ml-4"/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={handleEditQuiz}>
                        <MdOutlineEdit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteConfirmationOpen(true)}>
                        <FaTrash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={flipQuizPublished}>
                        {quiz.published ?
                            <>
                                <FaBan className="mr-2 h-4 w-4"/>
                                <span>Unpublish</span>
                            </>
                            :
                            <>
                                <FaCheck className="mr-2 h-4 w-4"/>
                                <span>Publish</span>
                            </>
                        }
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmationDialog
                open={deleteConfirmationOpen}
                onCancel={() => setDeleteConfirmationOpen(false)}
                onConfirm={handleDeleteQuiz}
                itemType={"quiz"}
            />
        </div>
    )
}