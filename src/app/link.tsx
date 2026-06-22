import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function LinkScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [upi, setUpi] = useState("");

  const generatePayment = () => {
  if (!name.trim()) {
    alert("Please enter receiver name");
    return;
  }

  if (!upi.trim()) {
    alert("Please enter UPI ID");
    return;
  }

  router.push({
    pathname: "/success",
    params: {
      name,
      upi,
      amount: amount || "0",
      txn: Math.floor(
        100000000000 + Math.random() * 900000000000
      ).toString(),
    },
  });
};

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Create Payment</Text>

        <Text style={styles.subtitle}>
          Generate a page and share with anyone
        </Text>

        <Text style={styles.label}>Receiver Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Rahul Sharma"
          style={styles.input}
        />
        {/* UPI ID INPUT */}
<Text style={styles.label}>UPI ID</Text>
<TextInput
  value={upi}
  onChangeText={setUpi}
  placeholder="e.g. rahul@okaxis"
  autoCapitalize="none"
  autoCorrect={false}
  keyboardType="email-address"
  style={styles.input}
/>

        <Text style={styles.label}>Amount (optional)</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="₹ 0"
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={generatePayment}
        >
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});