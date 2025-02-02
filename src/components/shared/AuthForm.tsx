import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import {z} from 'zod';
import {authSchema, RootStackParamList} from '../../lib';
import ThemedText from './ThemedText';

// Define validation schema using Zod

type AuthFormData = z.infer<typeof authSchema>;

interface IAuthProps {
  onPressAction?: (email: string, password: string) => void;
  navigation?: StackNavigationProp<RootStackParamList>;
  isLoading?: boolean;
  errMessage?: string | null;
  isSignUp: boolean;
}

const AuthForm: React.FC<IAuthProps> = ({
  onPressAction,
  navigation,
  isLoading,
  errMessage,
  isSignUp,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    [key in keyof AuthFormData]?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    try {
      authSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: {[key in keyof AuthFormData]?: string} = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof AuthFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSignUp = () => {
    if (validateForm()) {
      onPressAction?.(formData.email, formData.password);
    }
  };

  const handleChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}>
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center`}
          keyboardShouldPersistTaps="handled">
          <View style={tw`px-4`}>
            {/* Header */}
            <View style={tw`mb-8`}>
              <ThemedText size="h1" color="text-gray-800" style={tw`  mb-1`}>
                Create Account
              </ThemedText>
              <ThemedText size="h5" style={tw``}>
                Sign up to get started!
              </ThemedText>
            </View>

            {/* Email Input */}
            <View style={tw`mb-4`}>
              <ThemedText size="h4" color="text-gray-700" style={tw` mb-2 `}>
                Email
              </ThemedText>
              <View style={tw`relative h-[${moderateScale(55)}px] `}>
                <View
                  style={tw`absolute top-[${moderateScale(18)}px] left-3 z-10`}>
                  <Icon name="email" size={20} style={tw`text-gray-400`} />
                </View>
                <TextInput
                  value={formData.email}
                  onChangeText={text => handleChange('email', text)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={tw`bg-gray-50 h-full rounded-lg px-10 py-3 text-gray-800`}
                />
              </View>
              {errors.email ? (
                <ThemedText size="h4" color="text-red-400" style={tw`  my-1`}>
                  {errors.email}
                </ThemedText>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={tw`mb-6`}>
              <ThemedText size="h4" color="text-gray-700" style={tw` mb-2 `}>
                Password
              </ThemedText>
              <View style={tw`relative h-[${moderateScale(55)}px] `}>
                <View
                  style={tw`absolute top-[${moderateScale(18)}px] left-3 z-10`}>
                  <Icon name="lock" size={20} style={tw`text-gray-400`} />
                </View>
                <TextInput
                  value={formData.password}
                  onChangeText={text => handleChange('password', text)}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  style={tw`bg-gray-50 h-full rounded-lg px-10 py-3 text-gray-800`}
                />
                <TouchableOpacity
                  hitSlop={{right: 20, top: 20, left: 20, bottom: 20}}
                  onPress={togglePasswordVisibility}
                  style={tw`absolute top-[${moderateScale(
                    18,
                  )}px] right-3 z-10`}>
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={20}
                    style={tw`text-gray-400`}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <ThemedText size="h4" color="text-red-400" style={tw`  my-1`}>
                  {errors.password}
                </ThemedText>
              ) : null}
            </View>

            {/* Password Requirements */}
            {isSignUp && (
              <View style={tw`mb-6`}>
                <Text style={tw`text-gray-500 text-sm`}>Password must:</Text>
                <Text style={tw`text-gray-500 text-sm`}>
                  • Be at least 6 characters long
                </Text>
                <Text style={tw`text-gray-500 text-sm`}>
                  • Contain at least one uppercase letter
                </Text>
                <Text style={tw`text-gray-500 text-sm`}>
                  • Contain at least one number
                </Text>
              </View>
            )}
            {errMessage && (
              <ThemedText size="h4" color="text-red-400" style={tw`  my-1`}>
                {errMessage}
              </ThemedText>
            )}
            {/* Sign Up Button */}
            <TouchableOpacity
              disabled={isLoading}
              onPress={handleSignUp}
              style={tw`bg-blue-500 rounded-lg py-4 mb-4`}>
              {isLoading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <ThemedText
                  size="h2"
                  color="text-white"
                  style={tw` text-center`}>
                  Sign Up
                </ThemedText>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-gray-600`}>
                {isSignUp
                  ? 'Already have an account?'
                  : 'Don’t have an account yet?'}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate(isSignUp ? 'SignIn' : 'SignUp')
                }>
                <Text style={tw`text-blue-500 font-semibold`}>
                  {isSignUp ? 'SignIn' : 'SignUp'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default React.memo(AuthForm);
