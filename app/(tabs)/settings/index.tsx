import { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet, Platform, Alert } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Button from "@/components/ui/button";
import {
  loadReminder,
  resetReminder,
  saveReminder,
} from "@/src/securestore/reminder";
import * as Notifications from "expo-notifications";

export default function SettingsScreen() {
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(false);
  const [reminderTime, setReminderTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const toggleReminder = async () => {
    if (!reminderEnabled) {
      const existing = await Notifications.getPermissionsAsync();
      let status = existing.status;
      if (status !== "granted") {
        const request = await Notifications.requestPermissionsAsync();
        status = request.status;
      }

      if (status === "granted") {
        setReminderEnabled(true);
      } else {
        setReminderEnabled(false);
      }
    } else {
      setReminderEnabled(false);
    }
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setReminderTime(selectedDate);
  };

  async function scheduleDailyAt(date: Date) {
    const permission = await Notifications.getPermissionsAsync();
    if (permission.status !== "granted") return;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Dags att läsa?",
        body: "Din dagliga bokpåminnelse.",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: date.getHours(),
        minute: date.getMinutes(),
        channelId: Platform.OS === "android" ? "default" : undefined,
      },
    });
  }

  useEffect(() => {
    async function loadSecureStore() {
      const value = await loadReminder();
      if (value) {
        setReminderTime(new Date(value as string));
        setReminderEnabled(true);
      }
    }
    loadSecureStore();
  }, []);

  useEffect(() => {
    async function saveOrResetReminder() {
      if (!reminderEnabled) {
        await resetReminder();
        await Notifications.cancelAllScheduledNotificationsAsync();
        return;
      }
    }
    saveOrResetReminder();
  }, [reminderEnabled]);

  useEffect(() => {
    async function saveTimeChange() {
      if (reminderEnabled) {
        await saveReminder(reminderTime);
        await scheduleDailyAt(reminderTime);
      }
    }
    saveTimeChange();
  }, [reminderTime, reminderEnabled]);

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={{ fontSize: 18 }}>Slå på påminnelse</Text>
        <Switch value={reminderEnabled} onValueChange={toggleReminder} />
      </View>

      {reminderEnabled && (
        <View>
          <Text style={styles.text}>
            Påminnelsetid:{" "}
            {reminderTime
              ? reminderTime.toLocaleTimeString("sv-SE")
              : "Ingen tid vald"}
          </Text>

          <Button
            value="Ändra tid"
            onPress={() => setShowPicker(true)}
            variant={"blue"}
            padding={10}
            fontSize={16}
            borderRadius={10}
          />

          {showPicker && (
            <DateTimePicker
              value={reminderTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  text: { fontSize: 16, marginBottom: 10 },
});
