import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { globalColors } from "@/src/styles/global";
import { action } from "@/src/types/area";

export type ActionEditorModalProps = {
  action: action;
  onClose: () => void;
  onSave: (updatedAction: action) => void;
};

export function ActionEditorModal({
  action,
  onClose,
  onSave,
}: ActionEditorModalProps) {
  const [step, setStep] = React.useState(0);

  // local editable copy
  const [formData, setFormData] = React.useState(
    action.datas_form.map((f) => ({ ...f })),
  );

  const isLastStep = step === formData.length - 1;

  function updateField(value: string) {
    const updated = [...formData];
    updated[step].response = value;
    setFormData(updated);
  }

  function handleNext() {
    if (!isLastStep) setStep((s) => s + 1);
    else onSave({ ...action, datas_form: formData });
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  const current = formData[step];

  return (
    <Modal transparent animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>
            Step {step + 1} / {formData.length}
          </Text>

          <Text style={styles.label}>{current.fieldName}</Text>

          <TextInput
            value={current.response}
            onChangeText={updateField}
            placeholder="Enter value..."
            style={styles.input}
          />

          <View style={styles.navRow}>
            <Pressable
              style={[styles.navButton, step === 0 && styles.disabledBtn]}
              disabled={step === 0}
              onPress={handleBack}
            >
              <Text style={styles.navText}>Back</Text>
            </Pressable>

            <Pressable style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navText}>{isLastStep ? "Save" : "Next"}</Text>
            </Pressable>
          </View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: "white" }}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  navButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: globalColors.blueText,
    borderRadius: 8,
    alignItems: "center",
  },

  navText: {
    color: "white",
    fontWeight: "bold",
  },

  disabledBtn: {
    opacity: 0.4,
  },

  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "red",
    borderRadius: 8,
    alignItems: "center",
  },
});
