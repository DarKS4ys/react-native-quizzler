  import { View, Text, Alert, BackHandler, Pressable } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import Question from '../components/Question';
  import { useNavigation } from '@react-navigation/native';
  import { Button } from 'react-native';
import RippleButton from '../components/RippleButton';

  export default function QuizScreen({navigation, route}: {route:any, navigation: any}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const { params } = route;
    const userName = params?.userName || 'Anonymous';

    const questions = [
      {
        text: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris',
      },
      {
        text: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
        correctAnswer: 'Mars',
      },
    ];

    useEffect(() => {
      const backHandler = () => {
        if (currentQuestionIndex > 0) {
          backButtonHandler();
          return true; // Prevent default back button behavior
        } else {
          navigation.navigate('Home');
          return true; // Prevent default back button behavior
        }
      };
    
      const backButtonHandler = () => {
        Alert.alert(
          'Leave Quiz',
          'Are you sure you want to quit? You won\'t be able to go back and try again!',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'End early',
              onPress: () => {
                // Navigate to the 'Results' screen when the user chooses to end early
                navigation.navigate('Results', {
                  correctCount,
                  incorrectCount,
                  questions,
                  userName,
                });
              },
            },
          ],
          { cancelable: false }
        );
      };
    
      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', backHandler);
    
      return () => {
        // Cleanup the event listener when the component unmounts
        backHandlerSubscription.remove();
      };
    }, [currentQuestionIndex, navigation, correctCount, incorrectCount]);

    const handleAnswer = (selectedOption: string) => {
      const currentQuestion = questions[currentQuestionIndex];

      if (selectedOption === currentQuestion.correctAnswer) {
        setCorrectCount(correctCount + 1);
      } else {
        setIncorrectCount(incorrectCount + 1);
      }

      // Show the correct answer and a button to move to the next question
      setShowAnswer(true);
    };

    
    const handleNextQuestion = () => {
      // Move to the next question
      setShowAnswer(false);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz completed, navigate to the results screen or handle as needed
        navigation.navigate('Results', {
          correctCount,
          incorrectCount,
          questions,
          userName
        });
      }
    };

    return (
      <View className="flex-1 items-center p-3 w-full relative">
        <View className="absolute top-0 bg-purple-500 h-1/4 w-full rounded-xl" />
        <View className="w-full px-6 py-[30%] gap-y-8">
          {currentQuestionIndex < questions.length ? (
            <Question
              questions={questions}
              questionIndex={currentQuestionIndex}
              onAnswer={handleAnswer}
              showAnswer={showAnswer}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
            />
          ) : (
            <View>
              <Text>Quiz Completed!</Text>
              <Text>Correct Answers: {correctCount}</Text>
              <Text>Incorrect Answers: {incorrectCount}</Text>
            </View>
          )}
          {showAnswer && (
          <View>
            <RippleButton onPress={handleNextQuestion}>NEXT QUESTION</RippleButton>
          </View>
        )}
        </View>
      </View>
    );
  }
