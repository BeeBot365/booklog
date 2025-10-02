// import React, { use, useEffect, useState } from "react";
// import { View, Text, Switch, StyleSheet } from "react-native";

// import DateTimePicker, {
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
// import Button from "@/components/ui/button";
// import {
//   loadReminder,
//   resetReminder,
//   saveReminder,
// } from "@/src/securestore/reminder";

// export default function SettingsScreen() {
//   const [reminderEnabled, setReminderEnabled] = useState<boolean>(false);
//   const [reminderTime, setReminderTime] = useState<Date>(new Date());
//   const [showPicker, setShowPicker] = useState<boolean>(false);

//   const toggleReminder = () => {
//     setReminderEnabled(!reminderEnabled);
//   };

//   const onChangeTime = (
//     event: DateTimePickerEvent,
//     selectedDate: Date | undefined
//   ) => {
//     setShowPicker(false);
//     if (selectedDate) {
//       setReminderTime(selectedDate);
//     }
//   };

//   useEffect(() => {
//     async function loadSecureStore() {
//       const value = await loadReminder();
//       if (value) {
//         setReminderEnabled(true);
//         setReminderTime(new Date(value as string));
//         console.log(
//           "UseEffect körs och sätter värden från SecureStore och value är: ",
//           value
//         );
//       }
//     }
//     loadSecureStore();
//   }, []);

//   useEffect(() => {
//     async function saveOrResetReminder() {
//       if (!reminderEnabled) {
//         await resetReminder();
//         console.log("Reminder är avstängd och värdet är raderat i SecureStore");
//         return;
//       }
//       setReminderTime(new Date());
//       await saveReminder(reminderTime);
//     }
//     saveOrResetReminder();
//   }, [reminderEnabled]);

//   useEffect(() => {
//     async function saveTimeChange() {
//       if (reminderEnabled) {
//         await saveReminder(reminderTime);
//         console.log("tiden har ändrats till: ", reminderTime);
//       }
//     }
//     saveTimeChange();
//   }, [reminderTime]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.view}>
//         <Text style={{ fontSize: 18 }}>Slå på påminnelse</Text>
//         <Switch value={reminderEnabled} onValueChange={toggleReminder} />
//       </View>

//       {reminderEnabled && (
//         <View>
//           <Text style={styles.text}>
//             Påminnelsetid:{" "}
//             {reminderTime
//               ? reminderTime.toLocaleTimeString("sv-SE")
//               : "Ingen tid vald"}
//           </Text>

//           <Button
//             value="Ändra tid"
//             onPress={() => setShowPicker(true)}
//             variant={"blue"}
//             padding={10}
//             fontSize={16}
//             borderRadius={10}
//           />

//           {showPicker && (
//             <DateTimePicker
//               value={reminderTime}
//               mode="time"
//               is24Hour={true}
//               display="default"
//               onChange={onChangeTime}
//             />
//           )}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },

//   view: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },

//   text: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

// App.tsx – minimal lokal notis (Expo Go-kompatibel)
// import React, { useEffect } from "react";
// import { Button, View, Platform } from "react-native";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//     shouldShowBanner: true, // krävs av nyare typer (iOS)
//     shouldShowList: true, // krävs av nyare typer (iOS)
//   }),
// });

// export default function settingscreen() {
//   useEffect(() => {
//     (async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status !== "granted") {
//         alert("Behörighet för notiser nekades.");
//         return;
//       }
//       if (Platform.OS === "android") {
//         await Notifications.setNotificationChannelAsync("default", {
//           name: "Default",
//           importance: Notifications.AndroidImportance.DEFAULT,
//         });
//       }
//     })();
//   }, []);

//   async function testaNotis() {
//     await Notifications.scheduleNotificationAsync({
//       content: { title: "Hej 👋", body: "Det här är en enkel lokal notis." },
//       trigger: {
//         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//         seconds: 3,
//         repeats: false,
//         channelId: "default", // ignoreras på iOS
//       },
//     });
//   }

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Testa notis" onPress={testaNotis} />
//     </View>
//   );
// }

export default function SettingsScreen() {
  return null;
}
