import React, { useEffect, useMemo } from 'react';
import { Modal, StyleSheet, View, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ visible, onClose, message }: SuccessModalProps) {
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.5), []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onClose();
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, fadeAnim, scaleAnim, onClose]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <ThemedView style={styles.modal}>
            <ThemedText style={styles.successIcon}>✅</ThemedText>
            <ThemedText type="title" style={styles.title}>Success!</ThemedText>
            <ThemedText style={styles.message}>{message}</ThemedText>
          </ThemedView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxWidth: 400,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  title: {
    color: '#28a745',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
  },
});