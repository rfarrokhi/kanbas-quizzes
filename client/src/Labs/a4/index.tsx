import HelloWorld from "./HelloWorld";
import LifeIsGood from "./LifeIsGood";

import React, { useState } from "react";

import ClickEvent from './ClickEvent';
import PassingDataOnEvent from './PassingDataOnEvent';
import PassingFunctions from './PassingFunctions';
import ParentStateComponent from "./ParentStateComponent";
import EventObject from './EventObject';
import Counter from './Counter';
import BooleanStateVariables from './BooleanStateVariables';
import StringStateVariables from './StringStateVariables';
import DateStateVariable from './DateStateVariable';
import ObjectStateVariable from './ObjectStateVariable';
import ArrayStateVariable from './ArrayStateVariable';
import ReduxExamples from "./ReduxExamples";
import HelloRedux from "./ReduxExamples/HelloRedux";


function Assignment4() {
    function sayHello() {
        alert("Hello")
    }

    return (
        <div>
            <h1>Assignment 4</h1>
            <ReduxExamples />
            <Counter />
            <HelloWorld />
            <LifeIsGood />
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions theFunction={sayHello} />
            <ParentStateComponent/>
            <EventObject />
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
        </div>
    );
};

export default Assignment4;