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
        text: 'Türkiyenin başkenti nedir?',
        options: ['Ankra', 'İstanbul', 'Ankara', 'Trabzon'],
        correctAnswer: 'Ankara',
      },
      {
        text: 'Siviller hangi dili konuşur?',
        options: ['Türkçe', 'Sivilce', 'İngilizce', 'Almanca'],
        correctAnswer: 'Sivilce',
      },
      {
        text: 'İneklerin sevmediği element/molekül?',
        options: ['AZ-OT', 'CO₂', 'CN', 'C₁₀H₁₅N'],
        correctAnswer: 'AZ-OT',
      },
      {
        text: 'İshal olmuş böceğe ne denir?',
        options: ['İshal Böcek', 'Osuruk Böceği', 'Memati', 'Cırcır Böceği'],
        correctAnswer: 'Cırcır Böceği',
      },
      {
        text: 'Dünyanın en tehlikeli bombası?',
        options: ['Haktan', 'Çar Bombası', 'Megaton', 'Araplar'],
        correctAnswer: 'Araplar',
      },
      {
        text: 'Zenci kutuplara giderse ne olur?',
        options: ['Beyazlar', 'Çikolatalı Dondurma', 'Michael Jackson', 'Bilmiyom'],
        correctAnswer: 'Çikolatalı Dondurma',
      },
      {
        text: 'Küçük su birikintisine ne denir?',
        options: ['Batak', 'Su birikintisi', 'Gölcük', 'Sucuk',],
        correctAnswer: 'Sucuk',
      },
      {
        text: 'Örümcek adam ağ atamıyormuş neden?',
        options: ['Yorulmuş', 'Ağı bitmiş', 'Ağ bağlantısı kopmuş', 'Canı istemiyomuş'],
        correctAnswer: 'Ağ bağlantısı kopmuş',
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
          'Yarıda bırakmak mı istiyorsun?',
          'Erkenden bitirmek istediğine emin misin? Geriye dönüp kaldığın yerden devam edemezsin!',
          [
            {
              text: 'İptal',
              style: 'cancel',
            },
            {
              text: 'Yarıda bırak',
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
        <View className="w-full px-6 py-[25%] gap-y-8">
            <Question
              questions={questions}
              questionIndex={currentQuestionIndex}
              onAnswer={handleAnswer}
              showAnswer={showAnswer}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
            />
          {showAnswer && (
          <View>
            <RippleButton onPress={handleNextQuestion}>SONRAKİ SORU</RippleButton>
          </View>
        )}
        </View>
      </View>
    );
  }
