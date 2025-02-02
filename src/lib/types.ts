// types.ts
export type RootStackParamList = {
  Home: undefined; // No parameters
  Details: {id: string}; // Requires a parameter 'id' of type string
  Profile: {userId: number; userName: string}; // Requires multiple parameters
};
