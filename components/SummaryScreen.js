import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Resources
// https://www.w3schools.com/jsref/jsref_isarray.asp

const correctAnswer = (correct, selected) => {
  if (Array.isArray(correct)) {
    return (
      Array.isArray(selected) &&
      correct.sort().join() === selected.sort().join()
    );
  }
  return correct === selected;
};

const SummaryScreen = ({ route }) => {
  const { data, answers } = route.params;

  let quizScore = 0;

  return (
    <ScrollView style={styles.scrollView}>
      {data.map((question, i) => {
        const correct = question.correct;
        const selected = answers[i];

        const correctAnswers = Array.isArray(correct) ? correct : [correct];
        const selectedAnswers = Array.isArray(selected) ? selected : [selected];

        const questionCorrect = correctAnswer(correct, selected);
        if (questionCorrect) quizScore += 1;

        return (
          <View key={i} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.prompt}</Text>
            {question.choices.map((choice, index) => {
              const isSelected = selectedAnswers.includes(index);
              const isAnswer = correctAnswers.includes(index);

              let style = {};
              if (isAnswer && isSelected) {
                style.color = "green";
              } else if (!isAnswer && isSelected) {
                style.color = "red";
              }

              return (
                <Text key={index} style={[styles.choiceText, style]}>
                  {index + 1}. {choice}
                </Text>
              );
            })}
          </View>
        );
      })}

      <Text testID="total" style={styles.totalScore}>
        Total Score: {quizScore} / {data.length}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  choiceText: {
    fontSize: 14,
  },
  totalScore: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SummaryScreen;
