import React, { useState } from "react";
import { Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";

const QuestionScreen = ({ route, navigation }) => {
  const { data = [], index = 0, answers = [] } = route.params ?? {};

  const question = data[index];
  const [selected, setSelected] = useState(
    question.type === "multiple-answer" ? [] : null
  );

  const multiSelect = function (selectedAnswer) {
    if (question.type === "multiple-answer") {
      setSelected(function (previousSelections) {
        const currentlySelected = previousSelections.includes(selectedAnswer);

        if (currentlySelected) {
          const updatedSelections = previousSelections.filter(function (
            answer
          ) {
            return answer !== selectedAnswer;
          });
          return updatedSelections;
        } else {
          const updatedSelections = [...previousSelections, selectedAnswer];
          return updatedSelections;
        }
      });
    } else {
      setSelected(selectedAnswer);
    }
  };

  const handleNext = () => {
    const updatedAnswers = [...answers, selected];
    if (index + 1 < data.length) {
      navigation.push("Question", {
        data,
        index: index + 1,
        answers: updatedAnswers,
      });
    } else {
      navigation.navigate("Summary", {
        data,
        answers: updatedAnswers,
      });
    }
  };

  const selectedAnswers =
    question.type === "multiple-answer" ? selected : [selected];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.prompt}>{question.prompt}</Text>

      <ButtonGroup
        onPress={multiSelect}
        selectedAnswers={selectedAnswers}
        selectedIndex={question.type === "multiple-answer" ? null : selected}
        buttons={question.choices}
        vertical
        testID="choices"
        selectedButtonStyle={styles.selectedButton}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />

      <TouchableOpacity
        testID="next-question"
        onPress={handleNext}
        disabled={
          selected === null ||
          (Array.isArray(selected) && selected.length === 0)
        }
        style={styles.nextButton}
      >
        <Text style={styles.nextButtonText}>Next Question</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  prompt: {
    color: "black",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#462570",
  },
  button: {
    backgroundColor: "#7f58b0",
    marginBottom: 5,
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontSize: "14",
  },
  nextButton: {
    backgroundColor: "#256270",
    padding: 10,
    alignItems: "center",
    marginTop: 15,
  },
  nextButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default QuestionScreen;
