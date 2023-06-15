import { buttonStyle, textStyle } from "./dimensions";
import { ballsList, color_palette, condition } from "./gameParameters";


const Transition = ({ setPhase }) => {

    const handleClick = () => {
        setPhase("test")
    };

    const word = condition === "belief" ? "believes" :
        condition === "knowledge" ? "knows" : NaN;

    const textone = <div>
        <p>Thank you! You will now start the main part of the study.</p>
        <p>In this part, you will be observing the farmer. We will show you {ballsList.length} trees that the farmer is testing to find out whether they are sick.</p>
        <p>In reality about 50% of the farmer's trees are healthy; but here we will show you only the sick ones.</p>
        <p>We will show <b>you</b> which berries are <b><span style={{ color: color_palette[0] }}>infected</span></b> and which berries are <b><span style={{ color: color_palette[1] }}>sour</span></b>.
            But <b>the farmer</b> doesn't have that information! He has to rely on the chemical tests to find out whether the tree is sick.</p>
        <p>We will show you the berries that the farmer collects, and the results of the tests that he makes.
            Then we will ask you whether you think the farmer {word} that
            the tree is sick.</p>
    </div>;
    const nextButton = <button style={buttonStyle} onClick={() => handleClick()}>Click to start the main task</button>

    return (
        <div style={textStyle}>
            {textone}
            {nextButton}
        </div>
    )
}

export default Transition;