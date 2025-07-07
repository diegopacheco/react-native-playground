import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import PizzaFlavorSize from '@/components/PizzaFlavorSize';
import PizzaToppings from '@/components/PizzaToppings';
import DeliveryPayment from '@/components/DeliveryPayment';
import SuccessModal from '@/components/SuccessModal';

interface DeliveryInfo {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

export default function HomeScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderData, setOrderData] = useState({
    flavor: '',
    size: '',
    toppings: [] as string[],
    deliveryInfo: null as DeliveryInfo | null,
  });

  const handleFlavorSizeNext = (flavor: string, size: string) => {
    setOrderData(prev => ({ ...prev, flavor, size }));
    setCurrentStep(1);
  };

  const handleToppingsNext = (toppings: string[]) => {
    setOrderData(prev => ({ ...prev, toppings }));
    setCurrentStep(2);
  };

  const handleDeliveryComplete = (deliveryInfo: DeliveryInfo) => {
    setOrderData(prev => ({ ...prev, deliveryInfo }));
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setCurrentStep(0);
    setOrderData({
      flavor: '',
      size: '',
      toppings: [],
      deliveryInfo: null,
    });
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PizzaFlavorSize 
            onNext={handleFlavorSizeNext} 
            initialFlavor={orderData.flavor}
            initialSize={orderData.size}
          />
        );
      case 1:
        return (
          <PizzaToppings 
            onNext={handleToppingsNext} 
            onBack={handleBack}
            initialToppings={orderData.toppings}
          />
        );
      case 2:
        return (
          <DeliveryPayment
            onComplete={handleDeliveryComplete}
            onBack={handleBack}
            flavor={orderData.flavor}
            size={orderData.size}
            toppings={orderData.toppings}
            initialDeliveryInfo={orderData.deliveryInfo || undefined}
          />
        );
      default:
        return (
          <PizzaFlavorSize 
            onNext={handleFlavorSizeNext} 
            initialFlavor={orderData.flavor}
            initialSize={orderData.size}
          />
        );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {renderCurrentStep()}
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleSuccessModalClose}
        message={orderData.deliveryInfo ? 
          `Thank you ${orderData.deliveryInfo.name}! Your ${orderData.flavor} pizza (${orderData.size} inches) with ${orderData.toppings.join(', ')} will be delivered to ${orderData.deliveryInfo.address}, ${orderData.deliveryInfo.city} ${orderData.deliveryInfo.zipCode}` : 
          "Order placed successfully!"
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
