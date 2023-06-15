//this object records the participant data

import { condition } from "./gameParameters";

const Data = {
  //the participant's Prolific ID
  prolificId: [],
  //the attention check during the instructions trial
  attnCheck: [],
  //the comprehension questions
  precomprehension: [],
  comprehension: [],
  //the participants' answers during the familiarization phase
  familiarization: [],
  //the participant's answers to the main question
  epistemicResponses: [],
  //the number of alpha balls drawn
  nalphadrawn: [],
  //the number of beta balls drawn
  nbetadrawn: [],
  //the number of white balls drawn
  nwhitedrawn: [],
  //whether the box contains alpha
  containsAlpha: [],
  //the test number
  testNumber: [],
  //the experimental condition (belief vs knowledge)
  condition: condition,
  //the free-form comment about how people made their guesses
  freeComment: [],
  //the answers to demographic questions
  demographics: []
};

export default Data;