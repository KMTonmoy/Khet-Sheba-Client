'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
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
    pop: number;
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

  const API_KEY = 'ac32eebf90c22aae683058105b2fbba0';
  const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=bn&appid=${API_KEY}`;
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=bn&appid=${API_KEY}`;

  const getWeatherIcon = (condition: string, size = "text-4xl") => {
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
      default:
        return <WiDaySunny className={`text-yellow-500 ${iconClass}`} />;
    }
  };

  const fetchWeather = async (lat: number, lon: number): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const currentResponse = await fetch(`${CURRENT_WEATHER_URL}&lat=${lat}&lon=${lon}`);
      if (!currentResponse.ok) throw new Error('Network response was not ok');
      
      const currentData: WeatherData & { cod: number } = await currentResponse.json();
      if (currentData.cod !== 200) throw new Error('আবহাওয়া তথ্য পাওয়া যায়নি');
      
      setWeatherData(currentData);
      setLastUpdated(new Date(currentData.dt * 1000).toLocaleTimeString('bn-BD'));
      
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

  const getLocation = useCallback((): void => {
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
          fetchWeather(23.8103, 90.4125);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না. ঢাকার আবহাওয়া দেখানো হচ্ছে।');
      fetchWeather(23.8103, 90.4125);
    }
  }, []);

  const refreshWeather = (): void => {
    getLocation();
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const getDayName = (date: Date): string => {
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    return days[date.getDay()];
  };

  // const groupForecastByDay = () => {
  //   if (!forecastData) return [];
    
  //   const grouped: {[key: string]: ForecastData['list'][0][]} = {};
    
  //   forecastData.list.forEach(item => {
  //     const dateObj = new Date(item.dt * 1000);
  //     const dateStr = dateObj.toLocaleDateString('bn-BD');
      
  //     if (!grouped[dateStr]) {
  //       grouped[dateStr] = [];
  //     }
      
  //     grouped[dateStr].push(item);
  //   });
    
  //   return Object.entries(grouped).map(([_, items]) => ({
  //     date: new Date(items[0].dt * 1000),
  //     items
  //   }));
  // };




const groupForecastByDay = () => {
  if (!forecastData) return [];
  
  const grouped: {[key: string]: ForecastData['list'][0][]} = {};
  
  forecastData.list.forEach(item => {
    const dateObj = new Date(item.dt * 1000);
    const dateStr = dateObj.toLocaleDateString('bn-BD');
    
    if (!grouped[dateStr]) {
      grouped[dateStr] = [];
    }
    
    grouped[dateStr].push(item);
  });
  
  return Object.values(grouped).map((items) => ({
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

  const getRainProbability = (items: ForecastData['list'][0][]) => {
    const pops = items.map(item => item.pop * 100);
    return Math.max(...pops);
  };

  const getRainProbabilityColor = (percent: number) => {
    if (percent < 20) return 'bg-blue-100 text-blue-800';
    if (percent < 40) return 'bg-blue-200 text-blue-800';
    if (percent < 60) return 'bg-blue-300 text-blue-900';
    if (percent < 80) return 'bg-blue-400 text-white';
    return 'bg-blue-600 text-white';
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
    <div className="max-w-6xl my-10 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MdLocationOn className="text-white mr-2 text-xl" />
            <h1 className="text-xl font-bold">
              {weatherData.name}, {weatherData.sys.country}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">আপডেট: {lastUpdated}</span>
            <button 
              onClick={refreshWeather}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
              title="রিফ্রেশ করুন"
            >
              <MdRefresh className="text-white text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row p-4">
        <div className="w-full lg:w-1/2 lg:pr-4 mb-6 lg:mb-0">
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">বর্তমান আবহাওয়া</h2>
                <p className="text-gray-600 capitalize">
                  {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end">
                  {getWeatherIcon(weatherData.weather[0].main, "text-5xl")}
                  <span className="text-4xl font-bold ml-2">
                    {Math.round(weatherData.main.temp)}°C
                  </span>
                </div>
                <p className="text-gray-600 capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-xs">
                <p className="text-sm text-gray-500">অনুভূত হচ্ছে</p>
                <p className="text-xl font-semibold flex items-center">
                  <IoMdThermometer className="text-red-500 mr-2" />
                  {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-xs">
                <p className="text-sm text-gray-500">আর্দ্রতা</p>
                <p className="text-xl font-semibold flex items-center">
                  <MdWaterDrop className="text-blue-500 mr-2" />
                  {weatherData.main.humidity}%
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-xs">
                <p className="text-sm text-gray-500">বাতাস</p>
                <p className="text-xl font-semibold flex items-center">
                  <MdAir className="text-gray-500 mr-2" />
                  {weatherData.wind.speed} m/s
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-xs">
                <p className="text-sm text-gray-500">চাপ</p>
                <p className="text-xl font-semibold">
                  {weatherData.main.pressure} hPa
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-xs">
                <p className="text-sm text-gray-500">সর্বনিম্ন তাপমাত্রা</p>
                <p className="text-xl font-semibold flex items-center">
                  <MdArrowDownward className="text-blue-500 mr-2" />
                  {Math.round(weatherData.main.temp_min)}°C
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-xs">
                <p className="text-sm text-gray-500">সর্বোচ্চ তাপমাত্রা</p>
                <p className="text-xl font-semibold flex items-center">
                  <MdArrowUpward className="text-red-500 mr-2" />
                  {Math.round(weatherData.main.temp_max)}°C
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center">
                <FiSunrise className="text-yellow-500 mr-2 text-xl" />
                <div>
                  <p className="text-sm text-gray-600">সূর্যোদয়</p>
                  <p className="font-medium">
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('bn-BD', {hour: '2-digit', minute: '2-digit'})}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FiSunset className="text-orange-500 mr-2 text-xl" />
                <div>
                  <p className="text-sm text-gray-600">সূর্যাস্ত</p>
                  <p className="font-medium">
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('bn-BD', {hour: '2-digit', minute: '2-digit'})}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-4">
          <div className="mt-6 bg-blue-50 p-3 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">বৃষ্টি সম্ভাবনা নির্দেশিকা</h3>
            <div className="grid grid-cols-5 gap-2 text-xs">
              <div className="bg-blue-100 text-blue-800 p-1 rounded text-center">0-20%</div>
              <div className="bg-blue-200 text-blue-800 p-1 rounded text-center">20-40%</div>
              <div className="bg-blue-300 text-blue-900 p-1 rounded text-center">40-60%</div>
              <div className="bg-blue-400 text-white p-1 rounded text-center">60-80%</div>
              <div className="bg-blue-600 text-white p-1 rounded text-center">80-100%</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-sm mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">৫ দিনের পূর্বাভাস</h2>
            
            <div className="h-[500px] overflow-y-auto pr-2">
              {dailyForecasts.slice(0, 5).map((day, index) => {
                const { min, max } = getMinMaxTemp(day.items);
                const dayName = getDayName(day.date);
                const dateStr = day.date.toLocaleDateString('bn-BD', {day: 'numeric', month: 'short'});
                const mainWeather = day.items[Math.floor(day.items.length / 2)].weather[0].main;
                const rainProbability = getRainProbability(day.items);
                const rainColor = getRainProbabilityColor(rainProbability);
                
                return (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{index === 0 ? 'আজ' : dayName}</p>
                        <p className="text-sm text-gray-500">{dateStr}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          {getWeatherIcon(mainWeather, "text-3xl")}
                        </div>
                        
                        <div className="text-center min-w-[70px]">
                          <p className="flex items-center justify-center text-red-500 font-medium">
                            <MdArrowUpward className="mr-1" />
                            {Math.round(max)}°C
                          </p>
                          <p className="flex items-center justify-center text-blue-500 font-medium">
                            <MdArrowDownward className="mr-1" />
                            {Math.round(min)}°C
                          </p>
                        </div>
                        
                        <div className={`text-center rounded-full w-12 h-12 flex items-center justify-center ${rainColor}`}>
                          <span className="font-bold text-sm">{Math.round(rainProbability)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex overflow-x-auto pb-2 space-x-2">
                      {day.items.filter((_, i) => i % 2 === 0).slice(0, 6).map((item, i) => (
                        <div key={i} className="flex-shrink-0 text-center bg-gray-50 rounded p-2 w-16">
                          <p className="text-xs font-medium">
                            {new Date(item.dt * 1000).toLocaleTimeString('bn-BD', {hour: '2-digit'})}
                          </p>
                          <div className="my-1">
                            {getWeatherIcon(item.weather[0].main, "text-xl")}
                          </div>
                          <p className="text-sm font-semibold">{Math.round(item.main.temp)}°C</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;