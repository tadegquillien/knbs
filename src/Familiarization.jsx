import { sample } from "./convenienceFunctions";
import { textStyle, buttonStyle } from "./dimensions";
import { useState, useRef } from 'react';
import GenerateUrn from "./generateUrn";
import { shuffle, isIn } from "./convenienceFunctions";
import { color_palette, famBallsList } from "./gameParameters";
import Likert from 'react-likert-scale';
import Data from "./Data";

import { likertChoicesTest } from './likert';

const Familiarization = ({ containsAlpha, urnDimensions, nalpha, nbeta, nalphaActual, nbetaActual, nwhiteActual,
    currentFam, setCurrentFam, setPhase }) => {

    // the dimensions of the urn, width and height, expressed in number of balls
    const nballs = urnDimensions[0] * urnDimensions[1];


    // the balls being drawn in the actual world
    const ndrawn = nalphaActual + nbetaActual + nwhiteActual;

    // the number of white balls
    const nwhite = nballs - (nalpha + nbeta);

    // populate the urn
    let urnContent =
        Array.from(Array(nballs).keys()).map((i) => {
            let c = i < nalpha ? "a" :
                i < nalpha + nbeta ? "b" :
                    i >= nalpha + nbeta ? "w" : NaN;
            return (c)
        });

    // an array with the number 1 to nballs
    const ids = Array.from(Array(nballs).keys());

    // determine what balls will be drawn
    const alphaDrawnIds = sample(nalphaActual, Array.from(Array(nalpha).keys()));
    const betaDrawnIds = sample(nbetaActual, Array.from(Array(nbeta).keys()).map((a) => a + nalpha));
    const whiteDrawnIds = sample(
        nwhiteActual,
        Array.from(Array(nwhite).keys()).map((a) => a + nalpha + nbeta));

    // mark which balls will be drawn, then shuffle the urn
    const updatedUrnContent = useRef(shuffle(ids.map((i) => {
        return (isIn(i, alphaDrawnIds) ? "ad" :
            isIn(i, betaDrawnIds) ? "bd" :
                isIn(i, whiteDrawnIds) ? "wd" :
                    urnContent[i]);
    })));

    const initialBallColors = ids.map((i) => {
        return (updatedUrnContent.current[i] == "a" ? color_palette[2] :
            updatedUrnContent.current[i] == "ad" ? color_palette[2] :
                updatedUrnContent.current[i] == "b" ? color_palette[1] :
                    updatedUrnContent.current[i] == "bd" ? color_palette[1] :
                        updatedUrnContent.current[i] == "w" ? color_palette[2] :
                            updatedUrnContent.current[i] == "wd" ? color_palette[2] : NaN)
    });



    // assign colors to the balls, in function of their type
    const updatedBallColors = ids.map((i) => {
        return (updatedUrnContent.current[i] == "a" ? color_palette[0] :
            updatedUrnContent.current[i] == "ad" ? color_palette[0] :
                updatedUrnContent.current[i] == "b" ? color_palette[1] :
                    updatedUrnContent.current[i] == "bd" ? color_palette[1] :
                        updatedUrnContent.current[i] == "w" ? color_palette[2] :
                            updatedUrnContent.current[i] == "wd" ? color_palette[2] : NaN)
    });

    const ballColors = containsAlpha ? updatedBallColors : initialBallColors;

    // identify the balls that were marked as 'to be drawn'
    const prefilter = ids.map((i) => {
        return (isIn(updatedUrnContent.current[i], ["ad", "bd", "wd"]) ? i : "not")
    });

    // the balls that have been drawn (initialized as empty)
    const [drawnFrom, setDrawnFrom] = useState(prefilter.filter(a => a != "not"));

    // the colors of the drawn balls
    const drawnBallColors = drawnFrom.map((i) => {
        return (ballColors[i])
    });

    // the colors as shown on the test
    const observedColor = "purple";
    const seenBallColors = drawnFrom.map((i) => {
        let col = ballColors[i] === "white" ? "white" :
            ballColors[i] === color_palette[1] ? observedColor :
                ballColors[i] === color_palette[0] ? observedColor : NaN;
        return (col)
    });




    const [showSamples, setShowSamples] = useState(0);
    const [showRevealButton, setshowRevealButton] = useState(0);
    const [showActual, setShowActual] = useState(0);

    const [beliefResponse, setBeliefResponse] = useState(0);
    const [showNextButton, setShowNextButton] = useState(0);

    const handleSample = () => {
        setShowSamples(1);
    };

    const handleReveal = () => {
        setShowActual(1);
        setShowNextButton(1);
    };

    const handleClick = () => {
        Data.familiarization.push({
            response: beliefResponse,
            nalpha: nalphaActual,
            nbeta: nbetaActual,
            nwhite: nwhiteActual
        });
        setCurrentFam((a) => a + 1)
        if (currentFam > 4 - 2) {
            setPhase("transition");
        }
    }
    const textone = <div>
        <p>Tree #{currentFam + 1}/{famBallsList.length}</p>
    </div>;

    const sampleButton = <button style={{
        ...buttonStyle,
        opacity: showSamples ? .4 : 1,
        cursor: showSamples ? "auto" : "pointer"
    }}
        onClick={() => handleSample()}> Click to sample some berries{<br></br>} from Tree #{currentFam + 1}</button >;

    const texttwo = showSamples ? <div>
        <p>You've collected the following berries:</p>
        <p>There were {nalphaActual + nbetaActual} <span style={{ color: "purple" }}> positive tests</span>, and {nwhiteActual} negative tests:</p>
    </div> : "";

    const samples = showSamples ? <GenerateUrn drawnFrom={drawnFrom}
        ballColors={seenBallColors}
        urnDimensions={[ndrawn, 1]} mode="seen" /> : "";

    //machinery for the Likert Scale
    const likertOptions = {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setBeliefResponse(val.value);
            setshowRevealButton(1);
        },
        id: 'beliefQuestion',
    };

    //the question 
    const question = <span
        style={{
            textAlign: "center", visibility: showSamples ? " visible" : "hidden",
            opacity: showActual ? .4 : 1
        }}
        className="Question">

        <h4>Based on these test results, how much do you agree with the following statement?</h4>
        <h4 >The tree is probably sick.</h4>
        <div //</span>style={{ marginLeft: "20vw", marginRight: "20vw" }}
        ><Likert {...likertOptions} className="lik" /></div>
    </span>



    const revealButton = showRevealButton ?
        <button style={{
            ...buttonStyle,
            opacity: showActual ? .4 : 1,
            cursor: showActual ? "auto" : "pointer"
        }}
            onClick={() => handleReveal()}>click to reveal whether the tree{<br></br>} is sick or healthy</button> :
        "";

    const textthree = showActual ? <div style={{
        textAlign: "center"
    }}>
        <p>The tree is <b>{containsAlpha ? "" : "NOT"} sick.</b></p>
        <p>Here are the berries left on the tree:</p>
    </div> : "";

    const urn = showActual ? <GenerateUrn drawnFrom={drawnFrom}
        ballColors={updatedBallColors} urnDimensions={urnDimensions}
        mode="normal" /> : "";

    const textfour = showActual ? <p>And here are the berries that you sampled:</p> : "";

    const actuals = showActual ? <GenerateUrn drawnFrom={drawnFrom}
        ballColors={drawnBallColors}
        urnDimensions={[ndrawn, 1]} mode="seen" /> : "";


    const nextButton = showNextButton ? <button style={buttonStyle} onClick={() => handleClick()}>Next</button> :
        "";

    return (
        <div style={textStyle}>
            {textone}
            {sampleButton}
            {texttwo}
            {samples}
            {question}
            {revealButton}
            {textthree}
            {urn}
            {textfour}
            {actuals}
            {nextButton}
            <br></br>
        </div>

    )
}

export default Familiarization;