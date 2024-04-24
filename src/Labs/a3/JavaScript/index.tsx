import ArrowFunctions from "./functions/ArrowFunctions";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import ES5Functions from "./functions/ES5Functions";
import FunctionParenthesisAndParameters from "./functions/FunctionParenthesisAndParameters";
import ImpliedReturn from "./functions/ImpliedReturn";
import BooleanVariable from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import VariablesAndConstants from "./variables/VariablesAndConstants";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import ArrayIndexAndLength from "./arrays/ArrayIndexAndLength";
import AddingAndRemovingDataToFromArrays from "./arrays/AddingAndRemovingDataToFromArrays";
import ForLoops from "./arrays/ForLoops";
import MapFunction from "./arrays/MapFunction";
import Spreading from "./json/Spreading";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./functions/FunctionDestructing";
import JsonStringify from "./json/JsonStringify";
import FindFunction from "./arrays/FindFunction";
import FindIndex from "./arrays/FindIndex";
import FilterFunction from "./arrays/FilterFunction";
import TemplateLiterals from "./string/TemplateLiterals";
import House from "./json/House";


function JavaScript() {
    return (
        <div>
            <h3>JavaScript</h3>
            <FunctionDestructing />
            <Destructing />
            <Spreading />
            <House />
            <TemplateLiterals />
            <FilterFunction />
            <FindIndex />
            <FindFunction />
            <JsonStringify />
            <MapFunction />
            <ForLoops />
            <AddingAndRemovingDataToFromArrays />
            <ArrayIndexAndLength />
            <WorkingWithArrays />
            <FunctionParenthesisAndParameters />
            <ImpliedReturn />
            <ArrowFunctions />
            <ES5Functions />
            <TernaryOperator />
            <IfElse />
            <BooleanVariable />
            <VariableTypes />
            <VariablesAndConstants />
        </div>
    );
}

export default JavaScript;