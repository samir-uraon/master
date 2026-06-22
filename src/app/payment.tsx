import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams ,router} from "expo-router";

export default function Payment() {
  const { pa, pn, aid } = useLocalSearchParams();
  const [amount, setAmount] = useState("");

  return (
    <View style={styles.container}>

      {/* TOP */}
      <View style={styles.top}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {pn ? String(pn).charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        <Text style={styles.name}>Paying {pn}</Text>
        <Text style={styles.upi}>{pa}</Text>
      </View>

      {/* AMOUNT */}
      <View style={styles.amountRow}>
        <Text style={styles.rupee}>₹</Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          style={styles.amount}
        />
      </View>

      <Text style={styles.note}>Add note</Text>

      {/* BUTTON */}
     <TouchableOpacity
  style={styles.payBtn}
  onPress={() => {
    router.push({
      pathname: "/success",
      params: {
        amount,
        name: pn,
        upi: pa,
        txn: Math.floor(Math.random() * 999999999999).toString(),
      },
    });
  }}
>
  <Text style={styles.payText}>Pay</Text>
</TouchableOpacity>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
				alignItems:"center"
  },

  top: {
    alignItems: "center",
    marginBottom: 40,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37,
    backgroundColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  avatarText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  upi: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 5,
  },

  amountRow: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
},

rupee: {
  fontSize: 30,
  fontWeight: "300",
  color: "#000",
  marginRight: 4,
},

amount: {
  fontSize: 42,
  fontWeight: "700",
  color: "#000",
  letterSpacing: 1,
},

  note: {
    textAlign: "center",
    color: "#6b7280",
    marginVertical: 30,
  },

  payBtn: { 
			width:"50%",
    backgroundColor: "#463aed",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },

  payText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});