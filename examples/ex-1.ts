import { match } from 'ts-pattern';

/**
 * example 1
 */
type Weather = '맑음' | '구름' | '비' | '눈';

const getWeatherDescription = (weather: Weather): string => {
  return (
    match<Weather, string>(weather)
      .with('맑음', () => '오늘은 맑은 날이네요! 선크림을 꼭 챙기세요.🕶️')
      .with('구름', () => '오늘은 구름이 낀 날이에요.🌥️')
      .with('비', () => '오늘은 비가 오네요! 꼭 우산을 챙기세요.🌧️')
      // .with('눈', () => '오늘은 눈이 오네요! 눈사람 만들 준비가 되셨나요?☃️')
      .with('눈', (selections, value) => `${selections}, ${value}`)
      .exhaustive()
  );
};

const currentWeather = '눈';
const weatherDescription = getWeatherDescription(currentWeather);
console.log(weatherDescription);
