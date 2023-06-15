import './Test.css';
import { useState, useRef } from 'react';
import GenerateUrn from './generateUrn';
import { isIn, sample, shuffle } from './convenienceFunctions';
import { condition, color_palette, ballsList } from './gameParameters';
import { tStyle, buttonStyle } from './dimensions';
import Likert from 'react-likert-scale';
import { likertChoicesTest } from './likert';
import Data from './Data';
import farmer from './farmer.png';


function Test({ containsAlpha, urnDimensions, nalpha, nbeta, nalphaActual, nbetaActual, nwhiteActual,
    currentTest, setCurrentTest, setPhase, test_ids }) {

    const [epistemicResponse, setEpistemicResponse] = useState(0);
    const [showQuestion, setShowQuestion] = useState(0);
    const [showContentText, setShowContentText] = useState(0);
    const [showDrawButton, setShowDrawButton] = useState(0);
    const [drawButtonOpacity, setDrawButtonOpacity] = useState(1);
    const [showNextButton, setShowNextButton] = useState(0);
    // the balls that have been drawn (initialized as empty)
    const [drawnFrom, setDrawnFrom] = useState([NaN]);

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


    const [ballColors, setBallColors] = useState(initialBallColors);

    // assign colors to the balls, in function of their type
    const updatedBallColors = ids.map((i) => {
        return (updatedUrnContent.current[i] == "a" ? color_palette[0] :
            updatedUrnContent.current[i] == "ad" ? color_palette[0] :
                updatedUrnContent.current[i] == "b" ? color_palette[1] :
                    updatedUrnContent.current[i] == "bd" ? color_palette[1] :
                        updatedUrnContent.current[i] == "w" ? color_palette[2] :
                            updatedUrnContent.current[i] == "wd" ? color_palette[2] : NaN)
    });


    // add alpha to the urn
    const addAlpha = () => {
        setShowContentText(1);
        setBallColors(updatedBallColors)
        setShowDrawButton(1);
    };

    // the button that adds the alpha-compound
    const compoundButton = <button style={{
        ...buttonStyle, visibility: !showContentText ? "visible" : "hidden"
    }}
        onClick={() => addAlpha()}>Click to find out whether <br></br> the tree got sick</button>;



    // what happens when you draw a ball
    const handleClick = () => {

        // identify the balls that were marked as 'to be drawn'
        let prefilter = ids.map((i) => {
            return (isIn(updatedUrnContent.current[i], ["ad", "bd", "wd"]) ? i : "not")
        });
        // draw the balls
        setDrawnFrom(prefilter.filter(a => a != "not"));

        // hide the button
        //setShowDrawButton(0);
        setDrawButtonOpacity(.4);
        //display the question
        setTimeout(() => setShowQuestion(1), 500);
    };


    const update = () => {
        console.log(currentTest)
        console.log(test_ids.length)
        if (currentTest > (test_ids.length - 2)) {
            setPhase("demographics")
        }
    };

    // what happens when you click the next-page button
    const handleNext = () => {
        // record data
        Data.epistemicResponses.push(epistemicResponse);
        Data.nalphadrawn.push(nalphaActual);
        Data.nbetadrawn.push(nbetaActual);
        Data.nwhitedrawn.push(nwhiteActual);
        Data.containsAlpha.push(containsAlpha);
        Data.testNumber.push(currentTest);


        console.log(Data);

        // re-initialize settings
        setDrawnFrom([NaN]);
        setEpistemicResponse(0);
        setShowDrawButton(0);
        setDrawButtonOpacity(1);
        setShowQuestion(0);
        setShowNextButton(0);
        setShowContentText(0);
        window.scrollTo(0, 0);
        // go to the next page
        setCurrentTest((a) => a + 1);
        update();

    };


    //the likert scale for the knowledge / belief question
    const likertOptions = {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setEpistemicResponse(val.value);
            setShowNextButton(1);
        },
        id: 'epistemicQuestion',
    };




    // question prompt

    const questionPrompt = <span style={{ textAlign: "center", visibility: showQuestion ? " visible" : "hidden" }}>
        <h3>Please tell us how much you agree with the following statement. After seeing the test results...</h3>
    </span>

    // the word to be inserted, depending on the condition
    const word = condition === "belief" ? "believes" :
        condition === "knowledge" ? "knows" : NaN;
    //the question 

    const epistemicQuestion = <span
        style={{ textAlign: "center", visibility: showQuestion ? " visible" : "hidden" }}
        className="epistemicQuestion">

        {/* <h3 >Please tell us how much you agree with the following statement:</h3> */}
        <h3 >...The farmer {word} that the tree is {containsAlpha ? "" : "NOT"} sick</h3>
        <div //</span>style={{ marginLeft: "20vw", marginRight: "20vw" }}
        ><Likert {...likertOptions} className="lik" /></div>
    </span>




    const textTreeNumber = <h3>TREE #{currentTest + 1}/{ballsList.length}</h3>
    const textContent = !showContentText ? <p style={{ ...tStyle }}>
        This is how the tree was before the epidemic:</p> :
        <p style={{ ...tStyle }}>
            The tree is {containsAlpha ? "" : "NOT"} sick!</p>;

    const textDrawn = <p style={{ ...tStyle, visibility: Number.isNaN(drawnFrom[0]) ? "hidden" : "visible" }}>
        the berries that were sampled <br></br>({nalphaActual} <b><span style={{ color: color_palette[0] }}>infected</span></b>, {nbetaActual} <b><span style={{ color: color_palette[1] }}>sour</span></b>, {nwhiteActual} normal) :</p>;
    const textSeen = <p style={{ ...tStyle, visibility: Number.isNaN(drawnFrom[0]) ? "hidden" : "visible" }}>the test results that the farmer sees:<br></br><span style={{ visibility: "hidden" }}>""</span></p>
    const urn = <GenerateUrn drawnFrom={drawnFrom}
        ballColors={ballColors} urnDimensions={urnDimensions}
        mode="normal" />;

    // the 'draw' button  
    const drawButton = <button style={{
        ...buttonStyle,
        visibility: showDrawButton ? "visible" : "hidden",
        opacity: drawButtonOpacity,
        cursor: drawButtonOpacity > .5 ? "pointer" : "auto"
    }}
        onClick={() => handleClick(ndrawn)}> Click to sample some<br></br> berries from the tree</button >;

    // the next-page button
    const nextPageButton = <button style={{
        ...buttonStyle, visibility: (epistemicResponse > 0) ?
            "visible" : "hidden"
    }} onClick={() => handleNext()}>Next</button>

    // the colors of the drawn balls
    const drawnBallColors = drawnFrom.map((i) => {
        return (ballColors[i])
    });


    // the colors seen by the observer
    const observedColor = "purple";
    const seenBallColors = drawnFrom.map((i) => {
        let col = ballColors[i] === "white" ? "white" :
            ballColors[i] === color_palette[1] ? observedColor :
                ballColors[i] === color_palette[0] ? observedColor : NaN;
        return (col)
    });

    // the balls that have been drawn
    const drawnBalls = drawnFrom[0] === NaN ? "" : <GenerateUrn drawnFrom={drawnFrom}
        ballColors={drawnBallColors}
        urnDimensions={[ndrawn, 1]} mode="drawn" />;

    // what the agent sees
    const seenBalls = drawnFrom[0] === NaN ? "" : <GenerateUrn drawnFrom={drawnFrom}
        ballColors={seenBallColors}
        urnDimensions={[ndrawn, 1]} mode="seen" />;

    const farmerPic = isNaN(drawnFrom[0]) ? "" : <img src={farmer} style={{ height: "8vw" }} />
    const invisibleFarmerPic = isNaN(drawnFrom[0]) ? "" : <img src={farmer} style={{ height: "8vw", visibility: "hidden" }} />

    // order the questions
    const questions = <div class="horizontal">{epistemicQuestion}</div>;

    return (
        <div
            class="container1" >

            <div class="containerTreeButtonsSampled">
                <div class="containerTreeButtons">
                    <div class="containerTree">
                        <div class="contained">{textTreeNumber}</div>
                        <div class="contained">{textContent}</div>
                        <div class="contained" >
                            {urn}
                        </div>

                    </div>
                    <div class="containerButtons">
                        <div >{compoundButton}<br></br></div>

                        <div>{drawButton}</div>
                    </div>
                </div>
                <div class="containerSampled">


                </div>
            </div>

            <div class="containerQuestions">
                <div class="horizontal">
                    <div class="smallVertical">
                        <div class="contained">{textDrawn}</div>
                        <div class="contained" >{invisibleFarmerPic}{drawnBalls}{invisibleFarmerPic}</div>
                    </div>

                    <div class="smallVertical">
                        <div class="contained" >{textSeen}</div>
                        <div class="contained">{seenBalls}{farmerPic}</div>
                    </div>
                </div>


                {questionPrompt}
                {questions}

                {nextPageButton}</div>
        </div >




    );
}

export default Test;
