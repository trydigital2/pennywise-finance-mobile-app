import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { FormField } from '../common/FormField';
import { CurrencyInput } from '../common/CurrencyInput';
import { PrimaryButton } from '../common/PrimaryButton';
import { parseCurrencyInput } from '../../utils/currency';
import { validateGoal } from '../../utils/validators';
import { SavingsGoal, CurrencyCode } from '../../types';

interface AddGoalModalProps {
  visible: boolean;
  currency?: CurrencyCode;
  onClose: () => void;
  onSave: (goalData: Omit<SavingsGoal, 'id' | 'currentAmountPaise' | 'isCompleted' | 'contributions'>) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  visible,
  currency = 'INR',
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [targetStr, setTargetStr] = useState('');
  const [targetDate, setTargetDate] = useState('2027-06-30');
  const [selectedIcon, setSelectedIcon] = useState('airplane-outline');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const icons = [
    { icon: 'airplane-outline', label: 'Travel', color: '#3B82F6' },
    { icon: 'shield-outline', label: 'Emergency', color: '#10B981' },
    { icon: 'laptop-outline', label: 'Gadget', color: '#8B5CF6' },
    { icon: 'car-outline', label: 'Vehicle', color: '#F59E0B' },
    { icon: 'home-outline', label: 'Home', color: '#EC4899' },
    { icon: 'heart-outline', label: 'Health', color: '#EF4444' },
  ];

  const handleSave = () => {
    const targetAmountPaise = parseCurrencyInput(targetStr);
    const candidate = {
      name,
      targetAmountPaise,
      targetDate,
      icon: selectedIcon,
      color: selectedColor,
      notes: notes.trim() || undefined,
    };

    const validation = validateGoal(candidate);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(candidate);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Savings Goal</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <FormField
            label="Goal Name"
            placeholder="e.g. New Car Downpayment, Vacation"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
          />

          <CurrencyInput
            label="Target Amount"
            value={targetStr}
            onChangeText={(text) => {
              setTargetStr(text);
              if (errors.targetAmount) setErrors((prev) => ({ ...prev, targetAmount: '' }));
            }}
            currency={currency}
            error={errors.targetAmount}
          />

          <FormField
            label="Target Date (YYYY-MM-DD)"
            placeholder="2027-12-31"
            value={targetDate}
            onChangeText={(text) => {
              setTargetDate(text);
              if (errors.targetDate) setErrors((prev) => ({ ...prev, targetDate: '' }));
            }}
            error={errors.targetDate}
          />

          <Text style={styles.sectionLabel}>Select Goal Icon & Theme</Text>
          <View style={styles.iconsRow}>
            {icons.map((item) => {
              const isSelected = selectedIcon === item.icon;
              return (
                <TouchableOpacity
                  key={item.icon}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedIcon(item.icon);
                    setSelectedColor(item.color);
                  }}
                  style={[
                    styles.iconBox,
                    isSelected ? { borderColor: item.color, backgroundColor: `${item.color}20` } : null,
                  ]}
                >
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                  <Text style={styles.iconLabel}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <FormField
            label="Notes / Strategy"
            placeholder="Monthly contribution target or milestones..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={2}
          />

          <PrimaryButton
            title="Create Savings Goal"
            onPress={handleSave}
            size="lg"
            style={styles.saveBtn}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.surface,
  },
  closeBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: 10,
    marginTop: 6,
  },
  iconsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  iconBox: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 6,
  },
  iconLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  saveBtn: {
    marginTop: 10,
  },
});
