import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { LineChart, ContributionGraph } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const screenWidth = Dimensions.get('window').width;

interface CheckinData {
  timestamp: number;
  date: string;
}

export default function StatsScreen() {
  const [checkins, setCheckins] = useState<CheckinData[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [contributionData, setContributionData] = useState<any[]>([]);

  const prepareChartData = useCallback((data: CheckinData[]) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const checkinCounts = last30Days.map(date => {
      return data.filter(checkin => checkin.date === date).length;
    });

    setChartData({
      labels: last30Days.map(date => {
        const d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}`;
      }),
      datasets: [{
        data: checkinCounts,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }]
    });
  }, []);

  const prepareContributionData = useCallback((data: CheckinData[]) => {
    const today = new Date();
    const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
    
    const contributions = [];
    const currentDate = new Date(oneYearAgo);
    
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = data.filter(checkin => checkin.date === dateStr).length;
      
      contributions.push({
        date: dateStr,
        count: count
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    setContributionData(contributions);
  }, []);

  const loadCheckins = useCallback(async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'gym-checkins.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      
      if (fileExists.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(content);
        setCheckins(data);
        prepareChartData(data);
        prepareContributionData(data);
      }
    } catch (error) {
      console.error('Error loading checkins:', error);
    }
  }, [prepareChartData, prepareContributionData]);

  useEffect(() => {
    loadCheckins();
  }, [loadCheckins]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>Gym Stats</ThemedText>
        
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

        {chartData && (
          <View style={styles.chartContainer}>
            <ThemedText type="subtitle" style={styles.chartTitle}>Last 30 Days</ThemedText>
            <LineChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        )}

        {contributionData.length > 0 && (
          <View style={styles.chartContainer}>
            <ThemedText type="subtitle" style={styles.chartTitle}>Year Overview</ThemedText>
            <ContributionGraph
              values={contributionData}
              endDate={new Date()}
              numDays={365}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        )}
      </ScrollView>
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
    marginBottom: 30,
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
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});