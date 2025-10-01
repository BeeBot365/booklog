import React, { useState } from "react";
import { View, Text, Switch } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Button from "@/components/ui/button";

export default function SettingsScreen() {
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(false);
  const [reminderTime, setReminderTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const toggleReminder = () => {
    setReminderEnabled(!reminderEnabled);
  };

  const onChangeTime = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setShowPicker(false);
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Settings</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18 }}>Slå på påminnelse</Text>
        <Switch value={reminderEnabled} onValueChange={toggleReminder} />
      </View>

      {reminderEnabled && (
        <View>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Påminnelsetid: {reminderTime.toLocaleTimeString("sv-SE")}
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
