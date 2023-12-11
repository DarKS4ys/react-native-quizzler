import React, { useLayoutEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, ActivityIndicator, View } from 'react-native';
import RippleButton from '../components/RippleButton';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Test',
    });
  }, []);

  const handleStartQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('Quiz', { userName });
      setLoading(false);
    }, 50);
  };

  const inputEmpty = userName.length <= 0;

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4 gap-y-4">
      <Text className="text-3xl">
      <Text className="font-bold text-purple-600">Quizzler</Text>'a Hoşgeldin!
      </Text>
      <TextInput
        placeholder="Enter your name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
        className="border-2 border-purple-500 p-2 rounded-lg w-3/4"
      />
      <View className='w-3/4'>
        <RippleButton onPress={handleStartQuiz} disabled={inputEmpty || loading}>
          {loading ? <ActivityIndicator size="small" color="#ffffff" /> : 'Start Quiz'}
        </RippleButton>
      </View>
    </SafeAreaView>
  );
}
