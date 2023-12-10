import React, { ReactNode } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import clsx from 'clsx';

interface RippleButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
}

const RippleButton: React.FC<RippleButtonProps> = ({ onPress, disabled, loading, children }) => {
  const rippleEffect = () => {
    if (Platform.OS === 'android') {
      return TouchableNativeFeedback.Ripple('#adacac', false);
    } else {
      return {};
    }
  };

  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled} style={rippleEffect()}>
      <View
        className={clsx('bg-purple-500 px-4 py-2 rounded w-full h-12 justify-center items-center', disabled && 'opacity-50')}
      >
        {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text className="text-lg text-white">{children}</Text>}
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={rippleEffect()}>
      <View
        className={clsx('bg-purple-500 px-4 py-2 rounded w-full h-12 justify-center items-center', disabled && 'opacity-50')}
      >
        {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text className="text-lg text-white">{children}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default RippleButton;
