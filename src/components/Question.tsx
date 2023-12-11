import {
  View,
  Text,
  Pressable,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

export default function Question({
  questions,
  questionIndex,
  onAnswer,
  showAnswer,
  correctCount,
  incorrectCount,
}: {
  questions: Question[];
  questionIndex: number;
  onAnswer: (option: string) => void;
  showAnswer: boolean;
  correctCount: number;
  incorrectCount: number;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timer, setTimer] = useState(20);
  const [timeout, setTimeout] = useState(false);

  const currentQuestion = questions[questionIndex];

  const totalQuestions = questions.length;

  const correctProgress = (correctCount / totalQuestions) * 50;
  const incorrectProgress = (incorrectCount / totalQuestions) * 50;

  useEffect(() => {
    setTimer(20);
    setTimeout(false);
  }, [questionIndex]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timer > 0 && !showAnswer && !timeout) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer, showAnswer, timeout]);

  useEffect(() => {
    if (timer === 0 && !showAnswer && !timeout) {
      onAnswer('');
      setTimeout(true);
    }
  }, [timer, onAnswer, showAnswer, questionIndex, timeout]);

  return (
    <View className="w-full gap-y-8">
      <View className="bg-white border-2 border-purple-500 rounded-xl items-center pt-4 pb-8 px-4">
        <View className="w-12 h-12 border-2 border-purple-500 rounded-full items-center justify-center mb-2">
          <Text className="text-purple-500 font-medium">
            {timer > 0 ? `${timer}` : showAnswer || timeout ? '!' : ''}
          </Text>
        </View>
        <View className="flex-row justify-between w-full">
          <View className="flex-row gap-2 items-center justify-start">
            <Text className="text-green-600 font-bold">{correctCount}</Text>
            <View
              style={{ width: `${correctProgress}%` }}
              className="bg-green-500 h-5 rounded"
            ></View>
          </View>
          <View className="flex-row gap-2 items-center justify-end">
            <View
              style={{ width: `${incorrectProgress}%` }}
              className="bg-red-500 h-5 rounded"
            ></View>
            <Text className="text-red-500 font-bold">{incorrectCount}</Text>
          </View>
        </View>
        <Text className="text-purple-500 font-medium">
          Soru {questionIndex + 1} / {totalQuestions}
        </Text>
        <Text className="text-xl font-bold pt-4">{currentQuestion.text}</Text>
      </View>

      <View className="gap-y-4 items-center">
        {currentQuestion.options.map((option, index) => (
          <View className="w-full" key={index}>
            {Platform.OS === 'android' ? (
              <TouchableNativeFeedback
                disabled={showAnswer || timeout}
                onPress={() => {
                  setSelectedOption(option);
                  onAnswer(option);
                }}
              >
                <View
                  className={`border-2 my-2 p-4 rounded-xl w-full justify-between border-purple-500 ${
                    showAnswer || timeout
                      ? currentQuestion.correctAnswer === option
                        ? 'bg-green-500 border-green-500'
                        : selectedOption === option
                        ? 'bg-red-500 border-red-500'
                        : 'bg-gray-300 border-gray-400 opacity-50'
                      : ''
                  }`}
                >
                  <Text className="text-lg font-semibold">{option}</Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              <TouchableOpacity
                disabled={showAnswer || timeout}
                onPress={() => {
                  setSelectedOption(option);
                  onAnswer(option);
                }}
              >
                <View
                  className={`border-2 my-2 p-4 rounded-xl w-full justify-between border-purple-500 ${
                    showAnswer || timeout
                      ? currentQuestion.correctAnswer === option
                        ? 'bg-green-500 border-green-500'
                        : selectedOption === option
                        ? 'bg-red-500 border-red-500'
                        : 'bg-gray-300 border-gray-400 opacity-50'
                      : ''
                  }`}
                >
                  <Text className="text-lg font-semibold">{option}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
