import { Button } from "@/components/ui/button"
import { IoInformationCircleOutline } from "react-icons/io5";

export default function QuizPreview() {
    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg">
            <header className="bg-white shadow rounded-lg max-w-2xl mx-auto p-8 my-8">
                <h1 className="text-3xl font-bold mb-4">Quiz Title</h1>
                <div className="bg-red-100 text-red-800 text-sm rounded-lg p-2 flex items-center">
                    <IoInformationCircleOutline className="h-4 w-4 mr-2"/>
                    <strong>Note: </strong>
                    This is a preview of the published version of the quiz{"\n"}
                </div>
            </header>
            <div className="bg-white shadow rounded-lg max-w-2xl mx-auto p-8 my-8">
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold">Quiz Instructions</h2>
                    <p className="text-sm text-gray-500">Started: Nov 29 at 8:19am</p>
                </div>
                <div className="pt-4">
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Question 2</h3>
                            <span className="text-sm font-semibold text-gray-500">1 pts</span>
                        </div>
                        <p className="text-gray-700 mb-4">Which of the following is not a valid HTML element?</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <input className="accent-red-600" id="option1" name="question2" type="radio"/>
                                <label className="ml-2" htmlFor="option1">
                                    div
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input className="accent-red-600" id="option2" name="question2" type="radio"/>
                                <label className="ml-2" htmlFor="option2">
                                    span
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input className="accent-red-600" id="option3" name="question2" type="radio"/>
                                <label className="ml-2" htmlFor="option3">
                                    invalidElement
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input className="accent-red-600" id="option4" name="question2" type="radio"/>
                                <label className="ml-2" htmlFor="option4">
                                    p
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-t pt-4">
                        <Button className="text-gray-500" variant="outline">
                            Keep Editing This Quiz
                        </Button>
                        <div className="flex gap-4">
                            <Button className="text-gray-500" variant="ghost">
                                Previous
                            </Button>
                            <Button>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-2xl mx-auto my-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center ml-auto">
                        <p className="text-gray-500 mr-2">Quiz saved at 6:19 PM</p>
                        <Button className="ml-auto">Submit Quiz</Button>
                    </div>
                </div>
                <ul className="flex flex-col gap-4">
                    <li>
                        <Button className="text-gray-500" size="sm" variant="ghost">
                            Question 1
                        </Button>
                    </li>
                    <li>
                        <Button className="text-gray-900" size="sm" variant="outline">
                            Question 2
                        </Button>
                    </li>
                    <li>
                        <Button className="text-gray-500" size="sm" variant="ghost">
                            Question 3
                        </Button>
                    </li>
                    <li>
                        <Button className="text-gray-500" size="sm" variant="ghost">
                            Question 4
                        </Button>
                    </li>
                    <li>
                        <Button className="text-gray-500" size="sm" variant="ghost">
                            Question 5
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}