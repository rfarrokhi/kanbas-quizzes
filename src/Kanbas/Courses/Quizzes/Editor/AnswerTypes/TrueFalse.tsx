import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";

import { FaCircle, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";


export default function TrueFalseAnswer() {
    return (
        <div className="border-t pt-4">
            <Label className="block text-lg font-medium mb-2" htmlFor="answers">
                Answer:
            </Label>
            <div className="flex items-center gap-2 mb-2">
                <Badge className="border-green-600 bg-white dark:bg-gray-950 flex-shrink-0" variant="outline">
                    <FaCircle className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300"/>
                    Correct Answer
                </Badge>
                <div className="flex items-center gap-2">
                    <div
                        className="flex items-center justify-center gap-2 p-1 rounded-md border-2 border-green-500 bg-green-600 text-white hover:bg-green-700 cursor-pointer">
                        <span className="text-base">True</span>
                        <FaCheck className="h-4 w-4 text-white"/>
                    </div>
                    <div
                        className="flex items-center justify-center gap-2 p-1 rounded-md border-2 border-red-500 bg-red-100 hover:bg-red-200 cursor-pointer opacity-50">
                        <span className="text-base">False</span>
                        <ImCross className="h-4 w-4 text-red-600 fill-current"/>
                    </div>
                </div>
            </div>
        </div>
    )
}