'use client'
import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog, WiDayCloudyHigh, WiHumidity } from 'react-icons/wi';
import { MdLocationOn, MdRefresh, MdArrowUpward, MdArrowDownward, MdWaterDrop, MdAir } from 'react-icons/md';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { IoMdThermometer } from 'react-icons/io';

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

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
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
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'current' | 'forecast'>('current');

  const API_KEY = 'ac32eebf90c22aae683058105b2fbba0';
  const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=bn&appid=${API_KEY}`;
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=bn&appid=${API_KEY}`;

  const getWeatherIcon = (condition: string, size = "text-5xl") => {
    const iconClass = `${size} transition-all duration-300`;
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
      case 'Drizzle':
        return <WiRain className={`text-blue-300 ${iconClass}`} />;
      case 'Smoke':
      case 'Dust':
      case 'Sand':
      case 'Ash':
        return <WiFog className={`text-gray-500 ${iconClass}`} />;
      case 'Squall':
      case 'Tornado':
        return <WiThunderstorm className={`text-red-500 ${iconClass}`} />;
      default:
        return <WiDaySunny className={`text-yellow-500 ${iconClass}`} />;
    }
  };

  const fetchWeather = async (lat: number, lon: number): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch current weather
      const currentResponse = await fetch(`${CURRENT_WEATHER_URL}&lat=${lat}&lon=${lon}`);
      if (!currentResponse.ok) throw new Error('Network response was not ok');
      
      const currentData: WeatherData & { cod: number } = await currentResponse.json();
      if (currentData.cod !== 200) throw new Error('আবহাওয়া তথ্য পাওয়া যায়নি');
      
      setWeatherData(currentData);
      setLastUpdated(new Date(currentData.dt * 1000).toLocaleTimeString('bn-BD'));
      
      // Fetch forecast
      const forecastResponse = await fetch(`${FORECAST_URL}&lat=${lat}&lon=${lon}`);
      if (!forecastResponse.ok) throw new Error('Forecast response was not ok');
      
      const forecastData: ForecastData = await forecastResponse.json();
      setForecastData(forecastData);
      
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
          fetchWeather(23.8103, 90.4125); // Fallback to Dhaka
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না. ঢাকার আবহাওয়া দেখানো হচ্ছে।');
      fetchWeather(23.8103, 90.4125); // Fallback to Dhaka
    }
  };

  const refreshWeather = (): void => {
    getLocation();
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getDayName = (date: Date): string => {
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    return days[date.getDay()];
  };

  const groupForecastByDay = () => {
    if (!forecastData) return [];
    
    const grouped: {[key: string]: ForecastData['list'][0][]} = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toLocaleDateString('bn-BD');
      
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      
      grouped[dateStr].push(item);
    });
    
    return Object.entries(grouped).map(([date, items]) => ({
      date: new Date(items[0].dt * 1000),
      items
    }));
  };

  const getMinMaxTemp = (items: ForecastData['list'][0][]) => {
    const temps = items.map(item => item.main.temp);
    return {
      min: Math.min(...temps),
      max: Math.max(...temps)
    };
  };

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
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm max-w-md mx-auto">
        <p className="font-medium">{error}</p>
        <button 
          onClick={refreshWeather}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
        >
          <MdRefresh className="mr-2" /> আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!weatherData || !forecastData) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md max-w-md mx-auto">
        <p>কোনো আবহাওয়া তথ্য পাওয়া যায়নি</p>
      </div>
    );
  }

  const dailyForecasts = groupForecastByDay();

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg overflow-hidden">
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

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'current' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('current')}
          >
            বর্তমান অবস্থা
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'forecast' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('forecast')}
          >
            ৫ দিনের পূর্বাভাস
          </button>
        </div>

        {activeTab === 'current' ? (
          <>
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
                <p className="flex items-center justify-end">
                  <IoMdThermometer className="mr-1 text-red-500" />
                  অনুভূত হচ্ছে: {Math.round(weatherData.main.feels_like)}°C
                </p>
                <p className="flex items-center justify-end">
                  <MdWaterDrop className="mr-1 text-blue-500" />
                  আর্দ্রতা: {weatherData.main.humidity}%
                </p>
                <p className="flex items-center justify-end">
                  <MdAir className="mr-1 text-gray-500" />
                  বাতাস: {weatherData.wind.speed} m/s
                </p>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                <MdArrowDownward className="text-blue-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">সর্বনিম্ন তাপমাত্রা</p>
                  <p className="font-bold text-lg">{Math.round(weatherData.main.temp_min)}°C</p>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg flex items-center">
                <MdArrowUpward className="text-red-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">সর্বোচ্চ তাপমাত্রা</p>
                  <p className="font-bold text-lg">{Math.round(weatherData.main.temp_max)}°C</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">বায়ুচাপ</p>
                <p className="font-bold text-lg">{weatherData.main.pressure} hPa</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">দৃশ্যমানতা</p>
                <p className="font-bold text-lg">{(weatherData.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <FiSunrise className="text-yellow-500 mr-2" />
                  <p>সূর্যোদয়: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('bn-BD')}</p>
                </div>
                <div className="flex items-center">
                  <FiSunset className="text-orange-500 mr-2" />
                  <p>সূর্যাস্ত: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('bn-BD')}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <div className="flex items-center">
                  <WiHumidity className="text-blue-500 text-xl mr-2" />
                  <p>মেঘ: {weatherData.clouds.all}%</p>
                </div>
                {weatherData.wind.gust && (
                  <div className="flex items-center">
                    <MdAir className="text-gray-500 mr-2" />
                    <p>বাতাসের ঝড়ো গতি: {weatherData.wind.gust} m/s</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="forecast-container">
            <h3 className="text-lg font-semibold mb-4">৫ দিনের আবহাওয়া পূর্বাভাস</h3>
            
            <div className="space-y-4">
              {dailyForecasts.slice(0, 5).map((day, index) => {
                const { min, max } = getMinMaxTemp(day.items);
                const dayName = getDayName(day.date);
                const dateStr = day.date.toLocaleDateString('bn-BD');
                const mainWeather = day.items[Math.floor(day.items.length / 2)].weather[0].main;
                
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">{dayName}</p>
                        <p className="text-sm text-gray-500">{dateStr}</p>
                      </div>
                      <div className="flex items-center">
                        {getWeatherIcon(mainWeather, "text-3xl")}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center">
                        <MdArrowUpward className="text-red-500 mr-1" />
                        <span className="font-medium">{Math.round(max)}°C</span>
                      </div>
                      <div className="flex items-center">
                        <MdArrowDownward className="text-blue-500 mr-1" />
                        <span className="font-medium">{Math.round(min)}°C</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <WiHumidity className="text-blue-500 text-xl mr-1" />
                        <span>{day.items[0].main.humidity}%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MdAir className="text-gray-500 mr-1" />
                        <span>{day.items[0].wind.speed} m/s</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                      {day.items.filter((_, i) => i % 2 === 0).slice(0, 4).map((item, i) => (
                        <div key={i} className="text-center">
                          <p>{new Date(item.dt * 1000).toLocaleTimeString('bn-BD', {hour: '2-digit'})}</p>
                          <div className="my-1 mx-auto">
                            {getWeatherIcon(item.weather[0].main, "text-2xl")}
                          </div>
                          <p className="font-medium">{Math.round(item.main.temp)}°C</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;