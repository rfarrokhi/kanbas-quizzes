import useQuizStore, {MultipleChoiceQuestion} from "@/lib/QuizStore";

export default function MultipleChoiceQuestionPreview() {

    const currentQuestion = useQuizStore().currentQuestion as MultipleChoiceQuestion;

    return (
        <>
            {
                currentQuestion?.choices.map((choice, index) =>
                    <ChoiceItem key={index} label={choice} onSelect={() => {
                    }}/>
                )
            }
        </>
    )
}

function ChoiceItem({label, onSelect}: { label: string, onSelect: () => void }) {
    if (label === "") {
        return null;
    }
    return (
        <div className="flex items-center">
            <input onSelect={onSelect} className="accent-red-600" id={label} name={label} type="radio"/>
            <label className="ml-2" htmlFor={label}>
                {label}
            </label>
        </div>
    )
}