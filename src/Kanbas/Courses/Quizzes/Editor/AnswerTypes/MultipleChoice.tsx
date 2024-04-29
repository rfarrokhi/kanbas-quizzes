import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FiTrash} from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

export default function MultipleChoiceAnswer() {
    return (
        <div className="border-t pt-4">
            <Label className="block text-lg font-medium mb-2" htmlFor="answers">
                Answers:
            </Label>
            <div className="flex items-center gap-2 mb-2">
                <Badge className="border-green-600 bg-white dark:bg-gray-950 flex-shrink-0"
                       variant="outline">
                    <FaCircle
                        className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300"/>
                    Correct Answer
                </Badge>
                <Input className="flex-grow" placeholder="4"/>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-gray-200 text-gray-800 flex-shrink-0" variant="secondary">
                    Possible Answer
                </Badge>
                <Input className="flex-grow" placeholder="3"/>
                <Button className="hover:bg-gray-200 transition-colors duration-200" size="sm"
                        variant="ghost">
                    <FiTrash className="w-4 h-4"/>
                </Button>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-gray-200 text-gray-800 flex-shrink-0" variant="secondary">
                    Possible Answer
                </Badge>
                <Input className="flex-grow" placeholder="3"/>
                <Button className="hover:bg-gray-200 transition-colors duration-200" size="sm"
                        variant="ghost">
                    <FiTrash className="w-4 h-4"/>
                </Button>
            </div>
            <Button className="self-start hover:bg-gray-200 transition-colors duration-200"
                    variant="outline">
                + Add Another Answer
            </Button>
        </div>
    )
}