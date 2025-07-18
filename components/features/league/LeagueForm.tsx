import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Control, FieldValues } from 'react-hook-form';
import { useTheme } from '@/context/ThemeContext';
import { FormField, FormSwitch, FormSelect } from '@/components/ui';
import { LEAGUE_FORMATS } from '@/lib/validations/league';

interface LeagueFormProps<T extends FieldValues> {
  control: Control<T>;
  onSubmit: (data: T) => void | Promise<void>;
  isSubmitting: boolean;
  handleSubmit: any;
}

export default function LeagueForm<T extends FieldValues>({
  control,
  onSubmit,
  handleSubmit,
  isSubmitting
}: LeagueFormProps<T>) {
  const { theme } = useTheme();

  const formatOptions = LEAGUE_FORMATS.map(format => ({
    label: format,
    value: format,
  }));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 24,
      textAlign: 'center',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    halfWidth: {
      flex: 1,
    },
    submitButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      marginTop: 24,
    },
    submitButtonDisabled: {
      backgroundColor: theme.textMuted,
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New League</Text>

      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <FormField
          control={control}
          name="name" as any
          label="League Name"
          placeholder="Enter league name"
          required
        />

        <FormSelect
          control={control}
          name="format" as any
          label="Game Format"
          options={formatOptions}
          required
        />

        <FormField
          control={control}
          name="description" as any
          label="Description"
          placeholder="Describe your league (optional)"
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Tournament Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tournament Settings</Text>
        
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <FormField
              control={control}
              name="rounds" as any
              label="Rounds"
              placeholder="Number of rounds"
              keyboardType="numeric"
              required
            />
          </View>
          
          <View style={styles.halfWidth}>
            <FormField
              control={control}
              name="games_per_pairing" as any
              label="Games per Pairing"
              placeholder="Games per pairing"
              keyboardType="numeric"
              required
            />
          </View>
        </View>

        <FormField
          control={control}
          name="max_participants" as any
          label="Max Participants"
          placeholder="Maximum number of participants (optional)"
          keyboardType="numeric"
        />
      </View>

      {/* Time Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time Control</Text>
        
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <FormField
              control={control}
              name="base_minutes" as any
              label="Base Time (minutes)"
              placeholder="Base time"
              keyboardType="numeric"
              required
            />
          </View>
          
          <View style={styles.halfWidth}>
            <FormField
              control={control}
              name="increment_seconds" as any
              label="Increment (seconds)"
              placeholder="Increment"
              keyboardType="numeric"
              required
            />
          </View>
        </View>
      </View>

      {/* Game Rules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Rules</Text>
        
        <FormSwitch
          control={control}
          name="allow_draws" as any
          label="Allow Draws"
          description="Players can agree to draws"
        />

        <FormSwitch
          control={control}
          name="auto_pairing" as any
          label="Automatic Pairing"
          description="Automatically pair players for rounds"
        />
      </View>

      {/* Privacy Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Access</Text>
        
        <FormSwitch
          control={control}
          name="is_private" as any
          label="Private League"
          description="Require password to join"
        />

        <FormField
          control={control}
          name="password" as any
          label="League Password"
          placeholder="Enter password for private league"
          secureTextEntry
        />
      </View>

      {/* Prize Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prize Information (Optional)</Text>
        
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <FormField
              control={control}
              name="entry_fee" as any
              label="Entry Fee ($)"
              placeholder="Entry fee"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.halfWidth}>
            <FormField
              control={control}
              name="prize_pool" as any
              label="Prize Pool ($)"
              placeholder="Total prize pool"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Creating League...' : 'Create League'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
