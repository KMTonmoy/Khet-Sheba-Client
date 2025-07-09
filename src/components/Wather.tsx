'use client'
import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { MdLocationOn, MdRefresh } from 'react-icons/md';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  dt: number;
  timezone: number;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Replace with your actual OpenWeatherMap API key
  const API_KEY = 'ac32eebf90c22aae683058105b2fbba0';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=bn&appid=${API_KEY}`;

    const getWeatherIcon = (condition: string)  => {
    const iconClass = "text-5xl";
    switch (condition) {
      case 'Clear':
        return <WiDaySunny className={`text-yellow-500 ${iconClass}`} />;
      case 'Rain':
        return <WiRain className={`text-blue-500 ${iconClass}`} />;
      case 'Clouds':
        return <WiCloudy className={`text-gray-500 ${iconClass}`} />;
      case 'Snow':
        return <WiSnow className={`text-blue-200 ${iconClass}`} />;
      case 'Thunderstorm':
        return <WiThunderstorm className={`text-purple-500 ${iconClass}`} />;
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return <WiFog className={`text-gray-400 ${iconClass}`} />;
      default:
        return <WiDaySunny className={`text-yellow-500 ${iconClass}`} />;
    }
  };

  const fetchWeather = async (lat: number, lon: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}&lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data: WeatherData & { cod: number } = await response.json();
      
      if (data.cod === 200) {
        setWeatherData(data);
        setLastUpdated(new Date(data.dt * 1000).toLocaleTimeString('bn-BD'));
      } else {
        throw new Error('আবহাওয়া তথ্য পাওয়া যায়নি');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ডেটা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const getLocation = (): void => {
    setLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('অবস্থান সনাক্ত করতে ব্যর্থ হয়েছে. ঢাকার আবহাওয়া দেখানো হচ্ছে।');
          // Fallback to Dhaka coordinates if location access is denied
          fetchWeather(23.8103, 90.4125);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না. ঢাকার আবহাওয়া দেখানো হচ্ছে।');
      // Fallback to Dhaka coordinates if geolocation is not supported
      fetchWeather(23.8103, 90.4125);
    }
  };

  const refreshWeather = (): void => {
    getLocation();
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-3"></div>
        <span className="text-gray-600">আবহাওয়া তথ্য লোড হচ্ছে...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm">
        <p className="font-medium">{error}</p>
        <button 
          onClick={refreshWeather}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
        <p>কোনো আবহাওয়া তথ্য পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">আবহাওয়া তথ্য</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">আপডেট: {lastUpdated}</span>
            <button 
              onClick={refreshWeather}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="রিফ্রেশ করুন"
              aria-label="Refresh weather data"
            >
              <MdRefresh className="text-green-600 text-xl" />
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <MdLocationOn className="text-red-500 mr-2 text-xl" />
          <span className="text-lg font-semibold">
            {weatherData.name}, {weatherData.sys.country}
          </span>
        </div>

        {/* Current Weather */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {getWeatherIcon(weatherData.weather[0].main)}
            <div className="ml-3">
              <span className="text-4xl font-bold">
                {Math.round(weatherData.main.temp)}°C
              </span>
              <p className="text-gray-600 capitalize -mt-1">
                {weatherData.weather[0].description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p>অনুভূত হচ্ছে: {Math.round(weatherData.main.feels_like)}°C</p>
            <p>আর্দ্রতা: {weatherData.main.humidity}%</p>
            <p>দৃশ্যমানতা: {(weatherData.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">সর্বনিম্ন তাপমাত্রা</p>
            <p className="font-bold text-lg">{Math.round(weatherData.main.temp_min)}°C</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">সর্বোচ্চ তাপমাত্রা</p>
            <p className="font-bold text-lg">{Math.round(weatherData.main.temp_max)}°C</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">বাতাসের গতি</p>
            <p className="font-bold text-lg">{weatherData.wind.speed} m/s</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">বায়ুচাপ</p>
            <p className="font-bold text-lg">{weatherData.main.pressure} hPa</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p>সূর্যোদয়: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('bn-BD')}</p>
              <p>সূর্যাস্ত: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('bn-BD')}</p>
            </div>
            <div className="text-right">
              <p>মেঘ: {weatherData.clouds.all}%</p>
              {weatherData.wind.gust && <p>বাতাসের ঝড়ো গতি: {weatherData.wind.gust} m/s</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;