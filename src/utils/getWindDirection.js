export default function getWindDirection(deg) {
  if (typeof deg !== 'number') {
    return "Некорректные данные";
  }
  const degree = deg % 360;

  if (degree > 348.75 || degree <= 11.25) {
    return "Север";
  } else if (degree > 11.25 && degree <= 33.75) {
    return "Северо-северо-восток";
  } else if (degree > 33.75 && degree <= 56.25) {
    return "Северо-восток";
  } else if (degree > 56.25 && degree <= 78.75) {
    return "Востоко-северо-восток";
  } else if (degree > 78.75 && degree <= 101.25) {
    return "Восток";
  } else if (degree > 101.25 && degree <= 123.75) {
    return "Востоко-юго-восток";
  } else if (degree > 123.75 && degree <= 146.25) {
    return "Юго-восток";
  } else if (degree > 146.25 && degree <= 168.75) {
    return "Юго-юго-восток";
  } else if (degree > 168.75 && degree <= 191.25) {
    return "Юг";
  } else if (degree > 191.25 && degree <= 213.75) {
    return "Юго-юго-запад";
  } else if (degree > 213.75 && degree <= 236.25) {
    return "Юго-запад";
  } else if (degree > 236.25 && degree <= 258.75) {
    return "Западо-юго-запад";
  } else if (degree > 258.75 && degree <= 281.25) {
    return "Западный";
  } else if (degree > 281.25 && degree <= 303.75) {
    return "Западо-северо-запад";
  } else if (degree > 303.75 && degree <= 326.25) {
    return "Северо-запад";
  } else {
    return "Северо-северо-запад";
  }
}
