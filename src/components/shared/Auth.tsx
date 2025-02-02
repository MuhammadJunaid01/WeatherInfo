import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import {z} from 'zod';

// Define validation schema using Zod
const signUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpScreenProps {
  onSignUp: (email: string, password: string) => void;
  navigation?: any;
}

const Auth: React.FC<SignUpScreenProps> = ({onSignUp, navigation}) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    [key in keyof SignUpFormData]?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    try {
      signUpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: {[key in keyof SignUpFormData]?: string} = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof SignUpFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSignUp = () => {
    if (validateForm()) {
      onSignUp(formData.email, formData.password);
    }
  };

  const handleChange = (field: keyof SignUpFormData, value: string) => {
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
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}>
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center`}
          keyboardShouldPersistTaps="handled">
          <View style={tw`px-6`}>
            {/* Header */}
            <View style={tw`mb-8`}>
              <Text style={tw`text-3xl font-bold text-gray-800 mb-2`}>
                Create Account
              </Text>
              <Text style={tw`text-gray-500`}>Sign up to get started!</Text>
            </View>

            {/* Email Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>Email</Text>
              <View style={tw`relative`}>
                <View style={tw`absolute top-3 left-3 z-10`}>
                  <Icon name="email" size={20} style={tw`text-gray-400`} />
                </View>
                <TextInput
                  value={formData.email}
                  onChangeText={text => handleChange('email', text)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={tw`bg-gray-50 rounded-lg px-10 py-3 text-gray-800`}
                />
              </View>
              {errors.email ? (
                <Text style={tw`text-red-500 text-sm mt-1`}>
                  {errors.email}
                </Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>Password</Text>
              <View style={tw`relative`}>
                <View style={tw`absolute top-3 left-3 z-10`}>
                  <Icon name="lock" size={20} style={tw`text-gray-400`} />
                </View>
                <TextInput
                  value={formData.password}
                  onChangeText={text => handleChange('password', text)}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  style={tw`bg-gray-50 rounded-lg px-10 py-3 text-gray-800`}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={tw`absolute top-3 right-3 z-10`}>
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={20}
                    style={tw`text-gray-400`}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={tw`text-red-500 text-sm mt-1`}>
                  {errors.password}
                </Text>
              ) : null}
            </View>

            {/* Password Requirements */}
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

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              style={tw`bg-blue-500 rounded-lg py-4 mb-4`}>
              <Text style={tw`text-white text-center font-semibold text-lg`}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-gray-600`}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
                <Text style={tw`text-blue-500 font-semibold`}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(Auth);
