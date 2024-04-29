import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HiDotsVertical } from "react-icons/hi";
import React, {useEffect, useState} from "react";
import useQuizStore, {Quiz} from "@/lib/QuizStore";
import QuizListItem from "@/Kanbas/Courses/Quizzes/List/QuizListItem";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export default function QuizList() {

    const { courseId } = useParams() as { courseId: string };
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("")
    const quizzes = useQuizStore(state => state.quizzes.filter(quiz => quiz.courseId === courseId).filter(quiz => quiz.title.toLowerCase().includes(searchTerm.toLowerCase())));
    const { setCurrentQuiz } = useQuizStore();

    useEffect(() => {
        setCurrentQuiz(null);
    }, [location]);

    function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
    }

    function handleCreateQuiz() {
        const newQuiz = new Quiz(courseId)
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz.id}`)
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between p-4">
                <Input className="flex-1" placeholder="Search for Quiz" value={searchTerm} onInput={handleSearchTermChange} />
                <Button className="ml-4 danger" variant="destructive" onClick={handleCreateQuiz}>
                    + Quiz
                </Button>
                <HiDotsVertical className="w-6 h-6 ml-4 cursor-pointer" />
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-2">Assignment Quizzes</h2>
                <div className="space-y-4 mb-12">
                    {quizzes.length === 0 &&
                        <div className="text-gray-500 text-center mt-10">Use the "+ Quiz" button to create a new quiz</div>
                    }
                    {quizzes.map(quiz => (
                        <QuizListItem key={quiz.id} quiz={quiz} />
                    ))}
                </div>
            </div>
        </div>
    )
}