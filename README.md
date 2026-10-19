# React Native Default Form Components

A straightforward, unstyled React Native mobile form demonstrating all 8 standard elements in their default native appearance, with the element name displayed beside each component.

---

## Elements Included

1. **TextInput**: Standard text fields for Name, Email, Password, and Phone with `(TextInput)` beside their labels.
2. **Switch**: Default native toggle switch with `Notifications (Switch)` beside it.
3. **Button**: Standard native button with `Submit (Button)` title.
4. **Pressable**: Simple custom interactive component with `(Pressable)` beside it.
5. **Picker / dropdown**: Default native select dropdown using `@react-native-picker/picker` with `Role (Picker / dropdown)` beside it.
6. **Checkbox**: Default native checkbox using `expo-checkbox` with `I agree to the terms (Checkbox)` beside it.
7. **Radio button**: Clean circular radio selectors with `(Radio button)` beside each option.
8. **Date and time picker**: Default buttons triggering `@react-native-community/datetimepicker` for Date and Time with `(Date picker)` and `(Time picker)` beside them.

---

## Console Output on Submit

When clicking the **Submit (Button)**, all typed inputs and selections are printed directly to the console:

```text
--- FORM SUBMISSION DATA ---
Name (TextInput): John Doe
Email (TextInput): john@example.com
Password (TextInput): secret123
Phone (TextInput): 1234567890
Notifications (Switch): false
Pressable Count (Pressable): 1
Role (Picker): developer
Agreed (Checkbox): true
Plan (Radio button): pro
Date (Date picker): 10/19/2026
Time (Time picker): 10:00 AM
Full Data Object: { ... }
----------------------------
```

---

## Running the Project

```bash
# Start development server
npx expo start

# Run on Android
npm run android

# Run on Web
npm run web
```
