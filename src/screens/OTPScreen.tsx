import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";
import { sendOTP } from "@services/authService";
import { useAuthStore } from "@store/authStore";

type OTPScreenRouteProp = RouteProp<RootStackParamList, "OTPScreen">;
type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, "OTPScreen">;

interface Props {
  route: OTPScreenRouteProp;
  navigation: OTPScreenNavigationProp;
}

export const OTPScreen: React.FC<Props> = ({ route, navigation }) => {
  const { setUser } = useAuthStore();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerifyOTP = async () => {
    setLoading(true);
    // TODO: Implement actual OTP verification
    setTimeout(() => {
      // Mock verification for development
      setUser({
        _id: "user-1",
        name: "John Citizen",
        email: "john@example.com",
        phone: route.params.phone,
        phoneVerified: true,
        emailVerified: false,
        civicInterests: [],
        badges: [],
        trustScore: 50,
        createdAt: Date.now(),
        lastActiveAt: Date.now(),
        isActive: true,
      });
      setLoading(false);
      navigation.navigate("ProfileSetup");
    }, 1000);
  };

  const handleResendOTP = async () => {
    setResending(true);
    await sendOTP(route.params.phone);
    setResending(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Verify Phone</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to {route.params.phone}
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor={colors.text.secondary}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />

          <Button
            title="Verify"
            onPress={handleVerifyOTP}
            loading={loading}
            disabled={otp.length !== 6}
            style={styles.button}
          />

          <TouchableOpacity onPress={handleResendOTP} disabled={resending}>
            <Text style={styles.linkText}>
              {resending ? "Resending..." : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 48,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
    textAlign: "center",
    letterSpacing: 8,
  },
  button: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary.blue,
    textAlign: "center",
    marginTop: 16,
  },
});

