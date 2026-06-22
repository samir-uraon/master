import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btn}>
          <Text style={{ color: "#fff" }}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    try {
      // UPI QR
      if (data.startsWith("upi://pay")) {
        const url = new URL(data);

        const pa = url.searchParams.get("pa");
        const pn = url.searchParams.get("pn");
        const aid = url.searchParams.get("aid");

        router.push({
          pathname: "/payment",
          params: {
            pa: pa ?? "",
            pn: pn ?? "",
            aid: aid ?? "",
            raw: data,
          },
        });
      }

      // normal link
      else if (data.startsWith("http")) {
        Linking.openURL(data);
      }

      // plain text
      else {
        alert("Scanned: " + data);
      }
    } catch (e) {
      alert("Invalid QR code");
    }

    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code128"],
        }}
        onBarcodeScanned={handleScan}
        enableTorch={flash}
      />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Scan code</Text>

        <TouchableOpacity onPress={() => setFlash(!flash)}>
          <Ionicons
            name={flash ? "flash" : "flash-off"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Frame */}
      <View style={styles.frame}>
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>

      {/* Bottom text */}
      <View style={styles.bottom}>
        <Text style={{ color: "#fff", opacity: 0.7 }}>
          Align QR code inside frame
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    marginTop: 10,
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
  },

  topBar: {
    position: "absolute",
    top: 49,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  frame: {
    position: "absolute",
    top: "35%",
    left: "15%",
    width: "70%",
    height: "30%",
  },

  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#3b82f6",
  },

  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#facc15",
  },

  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#22c55e",
  },

  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#ef4444",
  },

  bottom: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
});