import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect,useState } from "react";
import { useAudioPlayer } from "expo-audio";


export default function Success() {

  const router = useRouter();
  const { amount, name, upi, txn } = useLocalSearchParams();
  const [editAmount, setEditAmount] = useState(false);
const [currentAmount, setCurrentAmount] = useState(String(amount));
const [editName, setEditName] = useState(false);
const [currentName, setCurrentName] = useState(String(name ?? ""));
const [editTime, setEditTime] = useState(false);
const [delayMinutes, setDelayMinutes] = useState("");
const [formattedTime, setFormattedTime] = useState(
  new Date().toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
);

const applyDelay = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + Number(delayMinutes || 0));

  setFormattedTime(
    date.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );

  setEditTime(false);
};

const updateTime = () => {
  setFormattedTime(
    new Date().toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
};

const player = useAudioPlayer(
  require("@/assets/sounds/success.mp3")
);



  return (

    <View style={styles.container}>

      {/* SUCCESS IMAGE */}
      
<TouchableOpacity
  onPress={() => {
    player.seekTo(0);
    player.play();
  }}
>
  <Image
    source={require("@/assets/images/suc.png")}
    style={styles.successImg}
  />
</TouchableOpacity>

      {/* AMOUNT */}
    {editAmount ? (
  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 36 }}>
    <Text style={{ fontSize: 40 }}>₹</Text>

    <TextInput
      value={currentAmount}
      onChangeText={setCurrentAmount}
      keyboardType="numeric"
      autoFocus
      style={styles.amountInput}
      onBlur={() => setEditAmount(false)}
    />

    <Text style={{ fontSize: 40 }}></Text>
  </View>
) : (
  <TouchableOpacity onPress={() => setEditAmount(true)}>
    <Text style={styles.amount}>
      ₹<Text style={styles.amountBold}>{currentAmount}</Text>
    </Text>
  </TouchableOpacity>
)}

      {/* PAID TO */}
      <View style={{ alignItems: "center", marginTop: 18 }}>
  <Text style={styles.text}>Paid to</Text>

  {editName ? (
    <TextInput
      value={currentName}
      onChangeText={setCurrentName}
      autoFocus
      style={styles.name}
      onBlur={() => setEditName(false)}
      onSubmitEditing={() => setEditName(false)}
    />
  ) : (
    <TouchableOpacity onPress={() => setEditName(true)}>
      <Text style={styles.name}>{currentName}</Text>
    </TouchableOpacity>
  )}
</View>

      {/* UPI ID */}
      <View style={styles.upiContainer}>
      <Text style={styles.upiValue}>
        UPI ID: <Text
    style={[
      styles.upi,
      upi?.toString().length > 25 && styles.longUpi,
    ]}
  >
    {upi}
  </Text>
      </Text>
      </View>

      {/* TIME (static like your HTML) */}
  {editTime ? (
  <TextInput
    value={delayMinutes}
    onChangeText={setDelayMinutes}
    keyboardType="numeric"
    placeholder="Minutes"
    autoFocus
    style={styles.timeInput}
    onSubmitEditing={() => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - Number(delayMinutes || 0));

      setFormattedTime(
        date.toLocaleString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );

      setEditTime(false);
    }}
  />
) : (
  <TouchableOpacity onPress={() => setEditTime(true)}>
    <Text style={styles.time}>{formattedTime}</Text>
  </TouchableOpacity>
)}

    {/* POWERED BY */}
      <Text style={styles.powered}>POWERED BY</Text>

      <Image
        source={require("@/assets/images/upi.jpg")}
        style={styles.upiLogo}
      />

      <Text style={styles.footer}>
        Unified Payments Interface
      </Text>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
      <TouchableOpacity
  style={styles.shareBtn}
  onPress={() => {
    updateTime();

  }}
>
  <Image
    source={require("@/assets/images/share1.png")}
    style={styles.shareIcon}
  />
  <Text style={styles.shareText}>Share screenshot</Text>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

    

    </View>
 
  );
}

const styles = StyleSheet.create({


upiContainer: {

  width: "90%",
  flexDirection: "row",
  justifyContent: "center",

},
upiValue: {
  fontSize: 17,
  color: "rgb(96,92,92)000",
  textAlign: "center",
},

longUpi: {
  fontSize: 14,
  width: "90%",
},

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  amountInput: {
  fontSize: 40,
  fontWeight: "400",
  minWidth: 80,
  textAlign: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#4285F4",
  padding: 0,
},

  successImg: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  amount: {
    marginTop: 46,
    fontSize: 40,
    color: "#000",
    fontWeight: "400",
  },
bottomInput: {
  position: "absolute",
  left: 20,
  right: 20,
  bottom: 15,
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 12,
  elevation: 8,
},

timeInput: {
  fontSize: 18,
  textAlign: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#4285F4",
},
  amountBold: {
    fontSize: 40,
    fontWeight: "400",
    color: "#000",
  },

  shareIcon: {
  width: 16,
  height: 16,
  marginRight: 6,
  transform: [{ rotate: "15deg" }],
},

  text: {
    marginTop: 30,
    width: "90%",
    textAlign: "center",
    fontSize: 30,
    color: "#111",
    lineHeight: 38,
    fontWeight: "300",
  },

  name: {
  fontSize: 28,
  fontWeight: "400",
  color: "#111",

},

  upi: {
    marginTop: 0,
    fontSize: 17,
    color: "rgb(96,92,92)",
  },

  bold: {
    fontWeight: "700",
    color: "#444",
  },

  time: {

    fontSize: 15,
        color: "black",
  },

  txn: {
    marginTop: 1,
    fontSize: 17,
    color: "rgb(96,92,92)",
  },

  buttonRow: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  shareBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "rgb(16,77,197)",
  borderRadius: 30,
  paddingVertical: 8,
  paddingHorizontal: 18,
  backgroundColor: "#fff",
},


shareText: {
  color: "rgb(28,83,194)",
  fontSize: 15,
  fontWeight: "600",
},

  doneBtn: {
    backgroundColor: "rgb(52,105,212)",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 9,
  },

  doneText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  powered: {
    marginTop: 90,
    fontSize: 8,
    fontWeight: "600",
    color: "rgb(114,110,110)",
    letterSpacing: 0.4,
  },

  upiLogo: {
    width: 70,
    height: 20,
    resizeMode: "contain",
    marginTop: 1,
  },

  footer: {
    marginTop: 2,
    fontSize: 4,
    fontStyle: "italic",
    fontWeight: "700",
    color: "rgb(80,77,77)",
    textTransform: "uppercase",
  },
  
});