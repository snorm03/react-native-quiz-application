import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QuestionScreen from "./components/QuestionScreen";
import SummaryScreen from "./components/SummaryScreen";

const quizData = [
  {
    prompt: "In what year was Coca-Cola invented? ",
    type: "multiple-choice",
    choices: ["1898", "1886", "1921", "1877"],
    correct: 1,
  },

  {
    prompt: "C# was developed before php.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1,
  },

  {
    prompt: "Who directed 1917?",
    type: "multiple-choice",
    choices: [
      "Christopher Nolan",
      "Matt Reeves",
      "Sam Mendes",
      "Steven Spielberg",
    ],
    correct: 2,
  },

  {
    prompt: "Which paintings were made by Claude Monet",
    type: "multiple-answer",
    choices: ["Impression, Sunrise", "Water Lilies", "Irises", "Poppies"],
    correct: [0, 1, 3],
  },

  {
    prompt:
      "The shortest term served by a U.S. President was less than two months.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 0,
  },
];

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Question"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          initialParams={{ data: quizData, index: 0, answers: [] }}
        />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { QuestionScreen, SummaryScreen };
export default App;
