import { StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface WeatherData {
  city: string;
  temperature: number | null;
  condition: string;
  icon: string;
  latitude: number;
  longitude: number;
}

interface WeatherApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
  };
}

const citiesData: WeatherData[] = [
  {
    city: 'San Francisco',
    temperature: null,
    condition: 'Loading...',
    icon: 'cloud.sun.fill',
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    city: 'Porto Alegre',
    temperature: null,
    condition: 'Loading...',
    icon: 'sun.max.fill',
    latitude: -30.0346,
    longitude: -51.2177
  },
  {
    city: 'Gramado',
    temperature: null,
    condition: 'Loading...',
    icon: 'cloud.fill',
    latitude: -29.3788,
    longitude: -50.8743
  },
  {
    city: 'Las Vegas',
    temperature: null,
    condition: 'Loading...',
    icon: 'sun.max.fill',
    latitude: 36.1699,
    longitude: -115.1398
  }
];

function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32);
}

async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherApiResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  return response.json();
}

function getWeatherCondition(temperature: number): string {
  if (temperature < 5) return 'Very Cold';
  if (temperature < 15) return 'Cold';
  if (temperature < 25) return 'Mild';
  if (temperature < 30) return 'Warm';
  return 'Hot';
}

function WeatherCard({ city, temperature, condition, icon }: WeatherData) {
  const isLoading = temperature === null;
  const fahrenheit = temperature !== null ? celsiusToFahrenheit(temperature) : null;
  
  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.cardHeader}>
        <ThemedText type="subtitle" style={styles.cityName}>
          {city}
        </ThemedText>
        <IconSymbol name={icon} size={40} color="#007AFF" />
      </ThemedView>
      
      <ThemedView style={styles.temperatureContainer}>
        {isLoading ? (
          <ThemedText type="title" style={styles.temperature}>
            --°C
          </ThemedText>
        ) : (
          <>
            <ThemedText type="title" style={styles.temperature}>
              {Math.round(temperature!)}°C
            </ThemedText>
            <ThemedText style={styles.fahrenheit}>
              {fahrenheit}°F
            </ThemedText>
          </>
        )}
      </ThemedView>
      
      <ThemedText style={styles.condition}>
        {condition}
      </ThemedText>
    </ThemedView>
  );
}

export default function TabTwoScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>(citiesData);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const updatedData = await Promise.all(
          citiesData.map(async (city) => {
            try {
              const data = await fetchWeatherData(city.latitude, city.longitude);
              const temperature = data.current.temperature_2m;
              return {
                ...city,
                temperature,
                condition: getWeatherCondition(temperature)
              };
            } catch (error) {
              console.error(`Failed to fetch weather for ${city.city}:`, error);
              return {
                ...city,
                temperature: null,
                condition: 'Error loading'
              };
            }
          })
        );
        setWeatherData(updatedData);
      } catch (error) {
        console.error('Failed to load weather data:', error);
      }
    };

    loadWeatherData();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Weather App
        </ThemedText>
      </ThemedView>
      
      {weatherData.map((weather, index) => (
        <WeatherCard
          key={index}
          city={weather.city}
          temperature={weather.temperature}
          condition={weather.condition}
          icon={weather.icon}
          latitude={weather.latitude}
          longitude={weather.longitude}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cityName: {
    fontSize: 20,
    fontWeight: '600',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 12,
  },
  fahrenheit: {
    fontSize: 18,
    opacity: 0.7,
  },
  condition: {
    fontSize: 16,
    opacity: 0.8,
  },
});
