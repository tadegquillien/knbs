import { buttonStyle, textStyle } from "./dimensions";
import { useState } from 'react';
import { shuffle } from "./convenienceFunctions";
import GenerateUrn from "./generateUrn";
import Data from "./Data";
import farmer from './farmer.png'
import { ballsList, chemical, color_palette, condition } from "./gameParameters";

const Instructions = ({ setPhase }) => {

    // initialize the current page
    const [currentPage, setCurrentPage] = useState(0);

    // handles next-page click
    const handleClick = () => {
        setCurrentPage((a) => a + 1)
    };
    // next-page button (exported as props to all the pages except the last one)
    const nextButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>;

    // the list of pages
    const pages = [
        <InstOne nextButton={nextButton} />,
        <InstTwo nextButton={nextButton} />,
        <InstThree nextButton={nextButton} />,
        <InstFour nextButton={nextButton} />,
        <InstFive nextButton={nextButton} />,
        <InstSix nextButton={nextButton} />,
        <InstSeven nextButton={nextButton} />,
        <InstEight nextButton={nextButton} />,
        <InstNine nextButton={nextButton} />,
        <InstTen setCurrentPage={setCurrentPage} />,
        <LastInst setPhase={setPhase} />
    ]

    return (
        pages[currentPage]
    )
}

const InstOne = ({ nextButton }) => {


    const textone = <div>
        <p style={{ color: "red" }}>(Please do not refresh the page during the study -- you would be unable to complete the experiment)</p>
        <br></br>
        <p>Welcome to the study!</p>
        <p>In a far away land, there is a farmer who grows berries from his trees.</p>
        <img src={farmer} style={{ height: "10vw" }} />

        <p>Here is one of the farmer's trees, covered with white berries:</p>

    </div>

    const ballColors = shuffle(Array.from(Array(49).keys()).map((i) => {
        return ("white")
    }));

    const exampleTree = <GenerateUrn key={1} drawnFrom={[NaN]}
        ballColors={ballColors} urnDimensions={[7, 7]} mode="normal" />;

    return (

        <div style={textStyle}>
            {textone}
            {exampleTree}
            {nextButton}
            <br></br>
        </div>
    )
};

const InstTwo = ({ nextButton }) => {
    const textone = <div>
        <p>Unfortunately, the farmer's orchard has just been <b>struck by an epidemic</b>! He thinks that <b>about half of his trees</b> might have gotten sick.</p>
        <p>In this study, you will watch the farmer perform tests on his trees, and we will ask you simple questions.</p>
    </div>
    return (
        <div style={textStyle}>
            {textone}
            {nextButton}<br></br>
        </div>
    )
}

const InstThree = ({ nextButton }) => {


    const textone = <div>

        <p>When a tree gets sick, some of the berries on that tree become <b><span style={{ color: color_palette[0] }}>infected</span></b>.
        </p>
        <p>If a berry is infected, we will <b>represent</b> it in <b><span style={{ color: color_palette[0] }}>{color_palette[0]}</span></b>, like this:</p>
    </div>

    const infectedBall = <GenerateUrn key={1} drawnFrom={[1]}
        ballColors={[color_palette[0]]} urnDimensions={[1, 1]} mode="seen" />;

    const texttwo = <div>
        <p>But in reality the berry's actual color is white.
            So the farmer can't find out if the tree is sick just by looking at it! He needs to perform chemical tests.</p>
    </div>

    return (

        <div style={textStyle}>

            {textone}
            {infectedBall}
            {texttwo}
            {nextButton}<br></br>
        </div>
    )
}

const InstFour = ({ nextButton }) => {
    const textone = <div>
        <p>
            For example, here is a sick tree:
        </p>
    </div>;

    const ballColors = shuffle(Array.from(Array(49).keys()).map((i) => {
        return (i < 10 ? color_palette[0] : color_palette[2])
    }));
    const sickTree = <GenerateUrn key={1} drawnFrom={[3, 6, 17]}
        ballColors={ballColors} urnDimensions={[7, 7]} mode="normal" />;

    const texttwo = <div>
        <p>The farmer randomly collected a few berries from the tree:</p>
    </div>;

    const sampledBerries = <GenerateUrn key={2} drawnFrom={[1]}
        ballColors={[color_palette[2], color_palette[0], color_palette[2]]} urnDimensions={[3, 1]}
        mode="drawn" />;

    const textthree = <div>
        <p>Then he conducted chemical tests. To represent the results of the tests, we will use the colors:</p>
        <p>-Purple for berries that test positive for infection,</p>
        <p>-White for berries that test negative.</p>
        <p> Here the farmer sees the following results from his tests:</p>
    </div>;

    const seenBerries = <GenerateUrn key={3} drawnFrom={[1]}
        ballColors={[color_palette[2], "purple", color_palette[2]]} urnDimensions={[3, 1]}
        mode="seen" />;

    const farmerPic = <img src={farmer} style={{ height: "8vw" }} />;

    const textfour = <div>
        <p>
            So, the farmer sees that one of the berries he has collected is infected.
            This means the tree is probably sick.
        </p>
    </div>

    return (
        <div style={textStyle}>
            {textone}
            {sickTree}
            {texttwo}
            {sampledBerries}
            {textthree}
            <div>{seenBerries}
                {farmerPic}</div>

            {textfour}
            {nextButton}<br></br>
        </div>
    )

}

const InstFive = ({ nextButton }) => {
    const textone = <div>
        <p>But the test is not completely reliable. Sometimes if produces false positives.</p>
        <p>This is because even in healthy trees, a small number of berries are naturally <b><span style={{ color: color_palette[1] }}>sour</span></b>.</p>
        <p>Having a few <b><span style={{ color: color_palette[1] }}>sour</span></b> berries is completely normal and is unrelated to a tree's health.</p>
        <p>If a berry is <b><span style={{ color: color_palette[1] }}>sour</span></b>, we will represent it in <b><span style={{ color: color_palette[1] }}>blue</span></b>, like this:</p>
    </div>;

    const blueBall = <GenerateUrn key={1} drawnFrom={[1]}
        ballColors={[color_palette[1]]} urnDimensions={[1, 1]} mode="seen" />;

    const texttwo = <div>
        <p>(Of course in reality the berry's actual color is white.)
            <p>Because <b><span style={{ color: color_palette[1] }}>sour</span></b> berries contain chemicals that are similar to the ones in <b><span style={{ color: color_palette[0] }}>infected</span></b> berries, they will also produce a positive test result.
                The farmer is aware of this, but he uses the test anyway because sour berries are relatively rare.</p>
        </p>
    </div>

    return (
        <div style={textStyle}>
            {textone}
            {blueBall}
            {texttwo}
            {nextButton}<br></br>
        </div>
    )
}

const InstSix = ({ nextButton }) => {
    const textone = <div>
        <p>
            For example, here is a healthy tree:
        </p>
    </div>;

    const ballColors = shuffle(Array.from(Array(49).keys()).map((i) => {
        return (i < 4 ? color_palette[1] : color_palette[2])
    }));
    const healthyTree = <GenerateUrn key={1} drawnFrom={[5, 18, 34]}
        ballColors={ballColors} urnDimensions={[7, 7]} mode="normal" />;

    const texttwo = <div>
        <p>The farmer randomly collected a few berries from the tree:</p>
    </div>;

    const sampledBerries = <GenerateUrn key={2} drawnFrom={[1]}
        ballColors={[color_palette[1], color_palette[2], color_palette[2]]} urnDimensions={[3, 1]}
        mode="drawn" />;

    const textthree = <div>
        <p> The farmer sees the following results from his tests:</p>
    </div>;

    const seenBerries = <GenerateUrn key={3} drawnFrom={[1]}
        ballColors={["purple", color_palette[2], color_palette[2]]} urnDimensions={[3, 1]}
        mode="seen" />;

    const farmerPic = <img src={farmer} style={{ height: "8vw" }} />;

    const textfour = <div>
        <p>
            The <b><span style={{ color: color_palette[1] }}>sour</span></b> berry produced a positive test.
            So, even berries from healthy trees can sometimes cause positive tests.
        </p>
    </div>

    return (
        <div style={textStyle}>
            {textone}
            {healthyTree}
            {texttwo}
            {sampledBerries}
            {textthree}
            <div>{seenBerries}
                {farmerPic}</div>

            {textfour}
            {nextButton}<br></br>
        </div>
    )

}

const InstSeven = ({ nextButton }) => {


    const [response, setResponse] = useState(0);
    // const [responseStore, setResponseStore] = useState([]);
    const textzero = <div><p><b>Question:</b></p></div>;

    const textone = <div>
        <p>Here is a set of berries collected from a tree:</p></div>;

    const berriesOne = <GenerateUrn key={1} drawnFrom={[1]}
        ballColors={[color_palette[0], color_palette[0], color_palette[2]]} urnDimensions={[3, 1]}
        mode="seen" />;

    const texttwo = <div>Here is a set of berries collected from another tree:</div>
    const berriesTwo = <GenerateUrn key={2} drawnFrom={[1]}
        ballColors={[color_palette[0], color_palette[1], color_palette[2]]} urnDimensions={[3, 1]}
        mode="seen" />;

    const textthree = <div><p>If these berries are tested, what will the test results look like?</p></div>

    const optionA = <div>
        <p><b>A:</b> Both tests will look like this:</p>
        <GenerateUrn key={2} drawnFrom={[1]}
            ballColors={[color_palette[2], color_palette[2], color_palette[2]]} urnDimensions={[3, 1]}
            mode="seen" />
    </div>;

    const optionB = <div>
        <p><b>B:</b> Both tests will look like this:</p>
        <GenerateUrn key={2} drawnFrom={[1]}
            ballColors={["purple", "purple", color_palette[2]]} urnDimensions={[3, 1]}
            mode="seen" />
    </div>;

    const optionC = <div>
        <p><b>C:</b> The two sets of berries would produce different test results.</p>
    </div>

    const handleChange = (e) => {
        setResponse(e.target.value);
        // setResponseStore((a)=>a.push(e.target.value));
        // console.log(responseStore);
        Data.precomprehension.push(e.target.value);
    }
    const question = <form>
        <select style={{ fontSize: "25px" }} onChange={(e) => handleChange(e)}>
            <option value="NA"> </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
    </form>;

    const feedbackText = response === 0 ? "" :
        response === "A" ? <p style={{ color: "red" }}>Incorrect, please try again</p> :
            response === "B" ? <p style={{ color: "green" }}>Correct!</p> :
                response === "C" ? <p style={{ color: "red" }}>Incorrect, please try again</p> : "";

    const nextPageButton = response === "B" ? nextButton : "";

    return (
        <div style={textStyle}>
            {textzero}
            {textone}
            {berriesOne}
            {texttwo}
            {berriesTwo}
            {textthree}
            {optionA}
            {optionB}
            {optionC}
            {question}<br></br>
            {feedbackText}
            {nextPageButton}<br></br>
        </div>
    )


}


const InstEight = ({ nextButton }) => {
    const textone = <div>
        <p>In summary:</p>
        <p>-All trees have a small number of berries that are naturally <b><span style={{ color: color_palette[1] }}>sour</span></b>,</p>
        <p>-When a tree gets sick, some of its berries become <b><span style={{ color: color_palette[0] }}>infected</span></b>,</p>
        <p>-Both <b><span style={{ color: color_palette[1] }}>sour</span></b> and <b><span style={{ color: color_palette[0] }}>infected</span></b> berries produce a positive test result (represented in <b><span style={{ color: "purple" }}>purple</span></b>).</p>
        <p>So, testing the berries gives the farmer some information about whether a tree is sick, although the test is not perfect.</p>
    </div>;

    return (
        <div style={textStyle}>
            {textone}
            {nextButton}<br></br>
        </div>
    )
}

const InstNine = ({ nextButton }) => {

    const textone = <div>

        <p>In a first part of the study, you will play as the farmer, testing four trees. </p>
        <br></br>

        <p>Then in the main part of the study, you will just be an external observer. </p>


    </div>


    return (
        <div style={textStyle}>
            {textone}
            {nextButton}<br></br>
        </div>
    )
}


const InstTen = ({ setCurrentPage }) => {

    const [posResponse, setPosResponse] = useState(0);
    const [lookResponse, setLookResponse] = useState(0);
    const [sourResponse, setSourResponse] = useState(0);

    const handlePos = (e) => {
        setPosResponse(e.target.value)
    };

    const handleLook = (e) => {
        setLookResponse(e.target.value)
    };

    const handleSour = (e) => {
        setSourResponse(e.target.value)
    };

    const handleClick = () => {
        Data.comprehension.push({
            "posQuestion": posResponse,
            "lookQuestion": lookResponse,
            "sourQuestion": sourResponse
        });
        setCurrentPage((i) => i + 1);

    };

    const textone = <div>
        <p>Before starting the task, please answer the following questions to make sure you understand:</p>
    </div>;

    const questions = <form>
        <label for="positiveQuestion">Both <b><span style={{ color: color_palette[1] }}>sour</span></b> and <b><span style={{ color: color_palette[0] }}>infected</span></b> berries cause a <b><span style={{ color: "purple" }}>positive</span></b> test</label>.
        <br></br>
        <select name="positiveQuestion"
            onChange={(e) => handlePos(e)} style={{ fontSize: "20px" }}>
            <option name="NA" value="NA"> </option>
            <option name="true" value="True">True</option>
            <option name="false" value="False">False</option>
        </select>
        <br></br>
        <br></br>

        <label for="lookQuestion">The farmer can see whether a tree is sick just by looking at the tree.</label>
        <br></br>
        <select name="lookQuestion"
            onChange={(e) => handleLook(e)} style={{ fontSize: "20px" }}>
            <option name="NA" value="NA"> </option>
            <option name="true" value="True">True</option>
            <option name="false" value="False">False</option>
        </select>
        <br></br>
        <br></br>

        <label for="sourQuestion">Only sick trees can have <b><span style={{ color: color_palette[1] }}>sour</span></b> berries.</label>
        <br></br>
        <select name="sourQuestion"
            onChange={(e) => handleSour(e)} style={{ fontSize: "20px" }}>
            <option name="NA" value="NA"> </option>
            <option name="true" value="True">True</option>
            <option name="false" value="False">False</option>
        </select>

    </form>

    const nextPageButton = (posResponse != 0 & lookResponse != 0 & sourResponse != 0) ?
        <button style={buttonStyle} onClick={() => handleClick()}>Click to start the first part of the study</button> :
        "";

    return (<div style={textStyle}>
        {textone}
        {questions}
        {nextPageButton}

    </div>
    )

}

const LastInst = ({ setPhase }) => {

    const handleClick = () => {
        setPhase("familiarization");
    };

    const textone = <div >
        <p>In the first part of the study, you will play as the farmer.</p>
        <p>You will make tests on four different trees.</p>
        <p>For each tree, you will collect samples and test them, and we will ask you whether you think the tree is sick.</p>

    </div>;

    const nextPhaseButton =
        <button style={buttonStyle} onClick={() => handleClick()}>Click to start</button>;

    return (
        <div style={textStyle}>
            {textone}
            {nextPhaseButton}
        </div>

    )
}

export default Instructions;