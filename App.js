import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Button,
  Pressable,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  // 1. TextInput states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // 2. Switch state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // 4. Pressable state
  const [pressableCount, setPressableCount] = useState(0);

  // 5. Picker / Dropdown state
  const [role, setRole] = useState('developer');

  // 6. Checkbox state
  const [agree, setAgree] = useState(false);

  // 7. Radio button state
  const [plan, setPlan] = useState('free');
  const planOptions = [
    { id: 'free', label: 'Free Plan' },
    { id: 'pro', label: 'Pro Plan' },
    { id: 'enterprise', label: 'Enterprise Plan' },
  ];

  // 8. Date and Time picker states
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showNativeDatePicker, setShowNativeDatePicker] = useState(false);
  const [showNativeTimePicker, setShowNativeTimePicker] = useState(false);
  const [showModalDatePicker, setShowModalDatePicker] = useState(false);
  const [showModalTimePicker, setShowModalTimePicker] = useState(false);

  // Temporary date modal values
  const [tempYear, setTempYear] = useState(date.getFullYear());
  const [tempMonth, setTempMonth] = useState(date.getMonth());
  const [tempDay, setTempDay] = useState(date.getDate());

  // Temporary time modal values
  const [tempHour, setTempHour] = useState(date.getHours());
  const [tempMinute, setTempMinute] = useState(date.getMinutes());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const daysInMonth = new Date(tempYear, tempMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Open Date Picker Handler
  const handleOpenDatePicker = () => {
    if (Platform.OS === 'web') {
      setTempYear(date.getFullYear());
      setTempMonth(date.getMonth());
      setTempDay(date.getDate());
      setShowModalDatePicker(true);
    } else {
      setShowNativeDatePicker(true);
    }
  };

  // Open Time Picker Handler
  const handleOpenTimePicker = () => {
    if (Platform.OS === 'web') {
      setTempHour(time.getHours());
      setTempMinute(time.getMinutes());
      setShowModalTimePicker(true);
    } else {
      setShowNativeTimePicker(true);
    }
  };

  const handleConfirmModalDate = () => {
    const validDay = Math.min(tempDay, new Date(tempYear, tempMonth + 1, 0).getDate());
    const newDate = new Date(date);
    newDate.setFullYear(tempYear, tempMonth, validDay);
    setDate(newDate);
    setShowModalDatePicker(false);
  };

  const handleConfirmModalTime = () => {
    const newTime = new Date(time);
    newTime.setHours(tempHour, tempMinute, 0, 0);
    setTime(newTime);
    setShowModalTimePicker(false);
  };

  const onNativeDateChange = (event, selectedDate) => {
    setShowNativeDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onNativeTimeChange = (event, selectedTime) => {
    setShowNativeTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // 3. Button action handler (console everything typed and selected)
  const handleSubmit = () => {
    const formData = {
      name,
      email,
      password,
      phone,
      notificationsEnabled,
      pressableCount,
      role,
      agree,
      plan,
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    console.log('--- FORM SUBMISSION DATA ---');
    console.log('Name (TextInput):', name);
    console.log('Email (TextInput):', email);
    console.log('Password (TextInput):', password);
    console.log('Phone (TextInput):', phone);
    console.log('Notifications (Switch):', notificationsEnabled);
    console.log('Pressable Count (Pressable):', pressableCount);
    console.log('Role (Picker):', role);
    console.log('Agreed (Checkbox):', agree);
    console.log('Plan (Radio button):', plan);
    console.log('Date (Date picker):', date.toLocaleDateString());
    console.log('Time (Time picker):', time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    console.log('Full Data Object:', formData);
    console.log('----------------------------');

    Alert.alert(
      'Form Submitted',
      JSON.stringify(formData, null, 2),
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>React Native Form</Text>

        {/* 1. TextInput */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Name (TextInput)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email (TextInput)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password (TextInput)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Phone (TextInput)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* 2. Switch */}
        <View style={styles.fieldGroup}>
          <View style={styles.row}>
            <Text style={styles.label}>Notifications (Switch)</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        {/* 4. Pressable */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Custom Interactive Item (Pressable)</Text>
          <Pressable
            style={styles.pressable}
            onPress={() => setPressableCount((c) => c + 1)}
          >
            <Text style={styles.pressableText}>
              Pressed {pressableCount} times (Pressable)
            </Text>
          </Pressable>
        </View>

        {/* 5. Picker / Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Role (Picker / dropdown)</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
            >
              <Picker.Item label="Developer" value="developer" />
              <Picker.Item label="Designer" value="designer" />
              <Picker.Item label="Product Manager" value="product_manager" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        {/* 6. Checkbox */}
        <View style={styles.fieldGroup}>
          <View style={styles.row}>
            <Checkbox
              value={agree}
              onValueChange={setAgree}
            />
            <Text style={styles.checkboxLabel}>I agree to the terms (Checkbox)</Text>
          </View>
        </View>

        {/* 7. Radio button */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Plan Selection (Radio button)</Text>
          {planOptions.map((item) => (
            <Pressable
              key={item.id}
              style={styles.radioRow}
              onPress={() => setPlan(item.id)}
            >
              <View style={styles.radioOuter}>
                {plan === item.id && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{item.label} (Radio button)</Text>
            </Pressable>
          ))}
        </View>

        {/* 8. Date and Time picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Date & Time Selection (Date and time picker)</Text>

          <View style={styles.dateDisplayRow}>
            <Text style={styles.dateDisplayText}>
              Current Date: {date.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.buttonSpacing}>
            <Button
              title="Open Date Picker (Date picker)"
              onPress={handleOpenDatePicker}
            />
          </View>

          <View style={styles.dateDisplayRow}>
            <Text style={styles.dateDisplayText}>
              Current Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <View style={styles.buttonSpacing}>
            <Button
              title="Open Time Picker (Time picker)"
              onPress={handleOpenTimePicker}
            />
          </View>

          {/* Native Mobile DateTimePickers */}
          {showNativeDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onNativeDateChange}
            />
          )}

          {showNativeTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onNativeTimeChange}
            />
          )}
        </View>

        {/* 3. Button */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Submit Form (Button)</Text>
          <Button title="Submit (Button)" onPress={handleSubmit} />
        </View>

        {/* Universal Date Picker Modal (Guaranteed to work on Web and all platforms) */}
        <Modal
          visible={showModalDatePicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModalDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalHeading}>Select Date (Date picker)</Text>

              <Text style={styles.modalSubLabel}>Month:</Text>
              <View style={styles.modalPickerWrap}>
                <Picker
                  selectedValue={tempMonth}
                  onValueChange={(val) => setTempMonth(Number(val))}
                >
                  {months.map((m, idx) => (
                    <Picker.Item key={m} label={m} value={idx} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.modalSubLabel}>Day:</Text>
              <View style={styles.modalPickerWrap}>
                <Picker
                  selectedValue={tempDay}
                  onValueChange={(val) => setTempDay(Number(val))}
                >
                  {days.map((d) => (
                    <Picker.Item key={d} label={String(d)} value={d} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.modalSubLabel}>Year:</Text>
              <View style={styles.modalPickerWrap}>
                <Picker
                  selectedValue={tempYear}
                  onValueChange={(val) => setTempYear(Number(val))}
                >
                  {years.map((y) => (
                    <Picker.Item key={y} label={String(y)} value={y} />
                  ))}
                </Picker>
              </View>

              <View style={styles.modalButtonRow}>
                <View style={{ flex: 1, marginRight: 6 }}>
                  <Button
                    title="Cancel"
                    color="#666"
                    onPress={() => setShowModalDatePicker(false)}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 6 }}>
                  <Button
                    title="Set Date"
                    onPress={handleConfirmModalDate}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Universal Time Picker Modal (Guaranteed to work on Web and all platforms) */}
        <Modal
          visible={showModalTimePicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModalTimePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalHeading}>Select Time (Time picker)</Text>

              <Text style={styles.modalSubLabel}>Hour (0 - 23):</Text>
              <View style={styles.modalPickerWrap}>
                <Picker
                  selectedValue={tempHour}
                  onValueChange={(val) => setTempHour(Number(val))}
                >
                  {hours.map((h) => (
                    <Picker.Item
                      key={h}
                      label={h < 10 ? `0${h}:00` : `${h}:00`}
                      value={h}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={styles.modalSubLabel}>Minute (0 - 59):</Text>
              <View style={styles.modalPickerWrap}>
                <Picker
                  selectedValue={tempMinute}
                  onValueChange={(val) => setTempMinute(Number(val))}
                >
                  {minutes.map((m) => (
                    <Picker.Item
                      key={m}
                      label={m < 10 ? `0${m}` : `${m}`}
                      value={m}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.modalButtonRow}>
                <View style={{ flex: 1, marginRight: 6 }}>
                  <Button
                    title="Cancel"
                    color="#666"
                    onPress={() => setShowModalTimePicker(false)}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 6 }}>
                  <Button
                    title="Set Time"
                    onPress={handleConfirmModalTime}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    fontSize: 16,
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
  },
  pressable: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  pressableText: {
    fontSize: 14,
    color: '#000000',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  radioLabel: {
    fontSize: 14,
    color: '#000000',
  },
  dateDisplayRow: {
    marginBottom: 6,
  },
  dateDisplayText: {
    fontSize: 14,
    color: '#333333',
  },
  buttonSpacing: {
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 16,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  modalSubLabel: {
    fontSize: 13,
    color: '#333333',
    marginTop: 8,
    marginBottom: 4,
  },
  modalPickerWrap: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    marginBottom: 6,
  },
  modalButtonRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
});
