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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
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
          <View style={styles.buttonSpacing}>
            <Button
              title={`Select Date: ${date.toLocaleDateString()} (Date picker)`}
              onPress={() => setShowDatePicker(true)}
            />
          </View>
          <View style={styles.buttonSpacing}>
            <Button
              title={`Select Time: ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Time picker)`}
              onPress={() => setShowTimePicker(true)}
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
            />
          )}
        </View>

        {/* 3. Button */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Submit Form (Button)</Text>
          <Button title="Submit (Button)" onPress={handleSubmit} />
        </View>
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
  buttonSpacing: {
    marginBottom: 10,
  },
});
