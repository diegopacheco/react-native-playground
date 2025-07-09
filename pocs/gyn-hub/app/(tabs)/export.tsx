import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface CheckinData {
  timestamp: number;
  date: string;
}

export default function ExportScreen() {
  const [checkins, setCheckins] = useState<CheckinData[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadCheckins();
  }, []);

  const loadCheckins = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'gym-checkins.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      
      if (fileExists.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(content);
        setCheckins(data);
      }
    } catch (error) {
      console.error('Error loading checkins:', error);
    }
  };

  const generateStatsHTML = () => {
    const totalCheckins = checkins.length;
    const thisWeek = checkins.filter(c => {
      const checkinDate = new Date(c.timestamp);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return checkinDate >= weekAgo;
    }).length;
    
    const thisMonth = checkins.filter(c => {
      const checkinDate = new Date(c.timestamp);
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return checkinDate >= monthAgo;
    }).length;

    const recentCheckins = checkins
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
      .map(c => `<li>${new Date(c.timestamp).toLocaleDateString()} - ${new Date(c.timestamp).toLocaleTimeString()}</li>`)
      .join('');

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            .stats { display: flex; justify-content: space-around; margin: 20px 0; }
            .stat-card { text-align: center; padding: 20px; background: #f5f5f5; border-radius: 10px; }
            .stat-number { font-size: 24px; font-weight: bold; color: #007AFF; }
            .recent-checkins { margin-top: 30px; }
            ul { list-style-type: none; padding: 0; }
            li { background: #f9f9f9; margin: 5px 0; padding: 10px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>Gym Check-in Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          
          <div class="stats">
            <div class="stat-card">
              <div>Total Check-ins</div>
              <div class="stat-number">${totalCheckins}</div>
            </div>
            <div class="stat-card">
              <div>This Week</div>
              <div class="stat-number">${thisWeek}</div>
            </div>
            <div class="stat-card">
              <div>This Month</div>
              <div class="stat-number">${thisMonth}</div>
            </div>
          </div>
          
          <div class="recent-checkins">
            <h2>Recent Check-ins</h2>
            <ul>
              ${recentCheckins}
            </ul>
          </div>
        </body>
      </html>
    `;
  };

  const exportToPDF = async () => {
    if (checkins.length === 0) {
      Alert.alert('No Data', 'No check-ins to export');
      return;
    }

    setIsExporting(true);
    
    try {
      const html = generateStatsHTML();
      const { uri } = await Print.printToFileAsync({ html });
      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share your gym stats',
      });
      
      Alert.alert('Success', 'PDF exported successfully!');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      Alert.alert('Error', 'Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async () => {
    if (checkins.length === 0) {
      Alert.alert('No Data', 'No check-ins to export');
      return;
    }

    setIsExporting(true);
    
    try {
      const jsonData = JSON.stringify(checkins, null, 2);
      const fileUri = FileSystem.documentDirectory + 'gym-checkins-export.json';
      await FileSystem.writeAsStringAsync(fileUri, jsonData);
      
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Share your gym data',
      });
      
      Alert.alert('Success', 'JSON exported successfully!');
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      Alert.alert('Error', 'Failed to export JSON');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Export Data</ThemedText>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <ThemedText type="subtitle">Total Check-ins</ThemedText>
          <ThemedText style={styles.statNumber}>{checkins.length}</ThemedText>
        </View>
        
        <View style={styles.statCard}>
          <ThemedText type="subtitle">This Week</ThemedText>
          <ThemedText style={styles.statNumber}>
            {checkins.filter(c => {
              const checkinDate = new Date(c.timestamp);
              const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
              return checkinDate >= weekAgo;
            }).length}
          </ThemedText>
        </View>
      </View>

      <View style={styles.exportButtons}>
        <View style={styles.buttonContainer}>
          <Button
            title="Export to PDF"
            onPress={exportToPDF}
            disabled={isExporting || checkins.length === 0}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Export to JSON"
            onPress={exportToJSON}
            disabled={isExporting || checkins.length === 0}
          />
        </View>
      </View>

      {checkins.length === 0 && (
        <ThemedText style={styles.noDataText}>
          No check-ins to export. Start checking in first!
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  statCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  exportButtons: {
    gap: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    opacity: 0.7,
  },
});