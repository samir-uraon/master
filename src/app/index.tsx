import * as Device from "expo-device";
import { Platform, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";





function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <Text style={styles.hintText}>use browser devtools</Text>;
  }

  if (Device.isDevice) {
    return (
      <Text style={styles.hintText}>
        shake device or press <Text style={styles.code}>m</Text> in terminal
      </Text>
    );
  }

  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";

  return (
    <Text style={styles.hintText}>
      press <Text style={styles.code}>{shortcut}</Text>
    </Text>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* HERO */}
        <View style={styles.hero}>


          <Text style={styles.title}>Welcome to Pay</Text>

          <Text style={styles.subtitle}>
            Scan QR or create a link to continue
          </Text>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>

            <TouchableOpacity
              style={[styles.button, styles.scanButton]}
              onPress={() => router.push("/scan")}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>📷 Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.linkButton]}
              onPress={() => router.push("/link")}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>🔗 Link</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* INFO CARD */}
      {/* INFO STEPS */}
<View style={styles.card}>

  <Text style={styles.cardTitle}>How it works</Text>

  <View style={styles.step}>
    <Text style={styles.stepNumber}>1</Text>
    <Text style={styles.stepText}>Tap Scan to scan a QR code</Text>
  </View>

  <View style={styles.step}>
    <Text style={styles.stepNumber}>2</Text>
    <Text style={styles.stepText}>Or use Link to create/open payment link</Text>
  </View>

  <View style={styles.step}>
    <Text style={styles.stepNumber}>3</Text>
    <Text style={styles.stepText}>Enter amount after receiver is detected</Text>
  </View>

  <View style={styles.step}>
    <Text style={styles.stepNumber}>4</Text>
    <Text style={styles.stepText}>Confirm and complete payment</Text>
  </View>

</View>

    

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
step: {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 10,
  paddingVertical: 8,
},

stepNumber: {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#2563eb",
  color: "white",
  textAlign: "center",
  lineHeight: 24,
  fontSize: 12,
  fontWeight: "700",
  overflow: "hidden",
},

stepText: {
  flex: 1,
  fontSize: 13,
  color: "#475569",
  lineHeight: 18,
},


  container: {
    flex: 1,
    backgroundColor: "#f1f5f9", // soft modern background
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },

  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 15,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
    textAlign: "center",
  },

  buttonRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 25,
    gap: 12,
  },

  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  scanButton: {
    backgroundColor: "#16a34a",
  },

  linkButton: {
    backgroundColor: "#2563eb",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10,
  },

  hintText: {
    fontSize: 13,
    color: "#64748b",
  },

  code: {
    fontFamily: "monospace",
    color: "#0f172a",
  },
});