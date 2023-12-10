import { View, Text, SafeAreaView, BackHandler, Button } from 'react-native';
import React, { useEffect } from 'react';
import RippleButton from '../components/RippleButton';

export default function ResultsScreen({ navigation, route }: { route: any, navigation: any }) {
  const { params } = route;
  const correctCount = params?.correctCount || 0;
  const incorrectCount = params?.incorrectCount || 0;
  const userName = params?.userName || 'Anonymous';
  const Totalquestions = params?.questions.length || 0;

  const completion = ((correctCount + incorrectCount) / Totalquestions) * 100;

  return (
    <SafeAreaView className='p-8 flex-1 justify-center items-center w-full gap-y-8'>
      <Text className='text-3xl font-bold'>Result Screen</Text>
      <View className="flex flex-wrap flex-row justify-between items-center w-full bg-white rounded-xl pb-6 pt-2 px-8">
        <View className="w-1/2 p-2 gap-y-4">
          <View>
            <Text className='text-xl font-semibold text-purple-500'>{completion}%</Text>
            <Text className='font-medium' >Completion</Text>
          </View>
          <View>
            <Text className='text-xl font-semibold text-red-600'>{incorrectCount}</Text>
            <Text className='font-medium'>Wrong</Text>
          </View>
        </View>
        <View className="w-1/2 p-2 items-end gap-y-4">
          <View  className='items-end'>
            <Text className='text-xl font-semibold text-purple-500'>{Totalquestions}</Text>
            <Text className='font-medium'>Total Question</Text>
          </View>
          <View className='items-end'> 
            <Text className='text-xl font-semibold text-green-600'>{correctCount}</Text>
            <Text className='font-medium'>Correct</Text>
          </View>
        </View>
      </View>

      <View className='w-full'>
      <RippleButton onPress={() => navigation.navigate('Home')}>Return</RippleButton>
      </View>
    </SafeAreaView>
  );
}
