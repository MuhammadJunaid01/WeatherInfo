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
import {COLORS} from '../../config/constants';
import {authSchema, RootStackParamList} from '../../lib';
import ThemedInput from './ThemedInput';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';

// Define validation schema using Zod
type AuthFormData = z.infer<typeof authSchema>;

interface IAuthProps {
  onPressAction?: (email: string, password: string) => void;
  navigation?: StackNavigationProp<RootStackParamList>;
  isLoading?: boolean;
  errMessage?: string | null;
  isSignUp: boolean;
  isDarkMode: boolean;
}

const AuthForm: React.FC<IAuthProps> = ({
  onPressAction,
  navigation,
  isLoading,
  errMessage,
  isSignUp,
  isDarkMode,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{[key in keyof AuthFormData]?: string}>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(
    null,
  );

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

  const getInputStyles = (isFocused: boolean) => {
    const baseStyle = `h-full rounded-lg px-10 py-3 text-base ${
      isFocused ? 'border-2' : ''
    }`;
    return tw`${baseStyle} ${
      isFocused
        ? isDarkMode
          ? 'border-blue-500'
          : 'border-blue-700'
        : isDarkMode
        ? 'bg-gray-800 text-white'
        : 'bg-gray-50 text-gray-800'
    }`;
  };

  const getIconColor = () => (isDarkMode ? 'text-white' : 'text-gray-400');

  return (
    <ThemedView style={tw`flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}>
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center`}
          keyboardShouldPersistTaps="handled">
          <View style={tw`px-4`}>
            {/* Header */}
            <View style={tw`mb-8`}>
              <ThemedText size="h1" style={tw`mb-1`}>
                Create Account
              </ThemedText>
              <ThemedText size="h5">Sign up to get started!</ThemedText>
            </View>

            {/* Email Input */}
            <View style={tw`mb-4`}>
              <ThemedText size="h4" style={tw`mb-2`}>
                Email
              </ThemedText>
              <View style={tw`relative h-[${moderateScale(55)}px]`}>
                {/* <View
                  style={tw`absolute top-[${moderateScale(18)}px] left-3 z-10`}>
                  <Icon name="email" size={20} style={tw`${getIconColor()}`} />
                </View> */}
                <ThemedInput
                  value={formData.email}
                  onChangeText={(text: string) => handleChange('email', text)}
                  placeholder="Enter your email"
                  placeholderTextColor={
                    isDarkMode ? COLORS.light.primary : COLORS.dark.primary
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  isDarkMode={isDarkMode}
                  iconName="email"
                />
                {/* <TextInput
                  value={formData.email}
                  onChangeText={text => handleChange('email', text)}
                  placeholder="Enter your email"
                  placeholderTextColor={
                    isDarkMode ? COLORS.light.primary : COLORS.dark.primary
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyles(focusedField === 'email')}
                /> */}
              </View>
              {errors.email ? (
                <ThemedText size="h4" style={tw`text-red-400 my-1`}>
                  {errors.email}
                </ThemedText>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={tw`mb-6`}>
              <ThemedText size="h4" style={tw`mb-2`}>
                Password
              </ThemedText>
              <ThemedInput
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
                placeholder="Enter your password"
                placeholderTextColor={
                  isDarkMode ? COLORS.light.primary : COLORS.dark.primary
                }
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                iconName="lock"
                isPasswordField
              />
              {/* <View style={tw`relative h-[${moderateScale(55)}px]`}>
                <View
                  style={tw`absolute top-[${moderateScale(18)}px] left-3 z-10`}>
                  <Icon name="lock" size={20} style={tw`${getIconColor()}`} />
                </View>
                <TextInput
                  value={formData.password}
                  onChangeText={text => handleChange('password', text)}
                  placeholder="Enter your password"
                  placeholderTextColor={
                    isDarkMode ? COLORS.light.primary : COLORS.dark.primary
                  }
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyles(focusedField === 'password')}
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
                    style={tw`${getIconColor()}`}
                  />
                </TouchableOpacity>
              </View> */}
              {errors.password ? (
                <ThemedText size="h4" style={tw`my-1 text-red-400`}>
                  {errors.password}
                </ThemedText>
              ) : null}
            </View>

            {/* Password Requirements */}
            {isSignUp && (
              <View style={tw`mb-6`}>
                <ThemedText size="h5" style={tw``}>
                  Password must:
                </ThemedText>
                <ThemedText size="h5">
                  • Be at least 6 characters long
                </ThemedText>
                <ThemedText size="h5">
                  • Contain at least one uppercase letter
                </ThemedText>
                <ThemedText size="h5">• Contain at least one number</ThemedText>
              </View>
            )}
            {errMessage && (
              <ThemedText size="h4" style={tw`my-1 text-red-400`}>
                {errMessage}
              </ThemedText>
            )}
            {/* Sign Up Button */}
            <TouchableOpacity
              disabled={isLoading}
              onPress={handleSignUp}
              style={tw`${
                isDarkMode ? 'bg-blue-700' : 'bg-blue-500'
              } rounded-lg py-4 mb-4`}>
              {isLoading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <ThemedText
                  size="h2"
                  style={tw`${
                    isDarkMode ? 'text-white' : 'text-gray-50'
                  } text-center`}>
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
    </ThemedView>
  );
};

export default React.memo(AuthForm);
