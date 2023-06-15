import Test from './Test';
import Instructions from './Instructions';
import Demographics from './Demographics';
import ConsentForm from './ConsentForm';
import { useState } from 'react';
import { textStyle } from './dimensions';
import { ballsList, famBallsList } from './gameParameters';
import Familiarization from './Familiarization';
import Transition from './Transition';
import ProlificId from './ProlificId';

function App() {

  // initialize the study
  const [phase, setPhase] = useState("prolificId");
  // initialize familiarization and test trial numbers
  const [currentFam, setCurrentFam] = useState(0);
  const [currentTest, setCurrentTest] = useState(0);

  // create ids for the familiarization and test trials
  const fam_ids = Array.from(Array(4).keys());
  const test_ids = Array.from(Array(ballsList.length).keys());

  // create the familiarization trials
  const famTrials = fam_ids.map((i) => {
    let b = famBallsList[i];
    return (
      <Familiarization key={i} containsAlpha={b.containsAlpha} urnDimensions={[7, 7]}
        nalpha={b.containsAlpha === 0 ? 0 : 10}
        nbeta={5} nalphaActual={b.alpha} nbetaActual={b.beta} nwhiteActual={b.white}
        setPhase={setPhase} setCurrentFam={setCurrentFam} currentFam={currentFam} />
    )
  });

  // create the test trials
  const tests = test_ids.map((i) => {
    let b = ballsList[i];
    return (<Test key={i} containsAlpha={b.containsAlpha} urnDimensions={[7, 7]} nalpha={b.containsAlpha === 0 ? 0 : 10}
      nbeta={5} nalphaActual={b.alpha} nbetaActual={b.beta} nwhiteActual={b.white} currentTest={currentTest}
      setCurrentTest={setCurrentTest} setPhase={setPhase} test_ids={test_ids} />)
  });

  //the end of the study
  const ending =
    <div style={textStyle}>Thank you for your participation!
      <br></br>
      Please click on this link to go back to Prolific: <a href="https://app.prolific.co/submissions/complete?cc=113C348D">https://app.prolific.co/submissions/complete?cc=113C348D</a>
      <br></br>
      After you have clicked the link, you can then close the present tab.</div>;

  // display the relevant part of the study, in function of the value of the 
  // 'phase' variable
  return (phase === "prolificId" ? <ProlificId setPhase={setPhase} /> :
    phase === "consentform" ? <ConsentForm setPhase={setPhase} /> :
      phase === "instructions" ? <Instructions setPhase={setPhase} /> :
        phase === "familiarization" ? famTrials[currentFam] :
          phase === "transition" ? <Transition setPhase={setPhase} /> :
            phase === "test" ? tests[currentTest] :
              phase === "demographics" ? <Demographics setPhase={setPhase} /> :
                phase === "ending" ? ending : "")
}

export default App;
