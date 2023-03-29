export const compare = (selected) => {
  const similarities = [];
  const { first, second } = selected;

  const actors = findSimilarActors(first.people?.actors, second.people?.actors);

  const duration = findSimilarDuration(
    first.duration?.milliseconds,
    second.duration?.milliseconds
  );

  if (actors.length >= 1) {
    similarities.push({ key: "Actors:", value: actors });
  }
  if (duration) {
    similarities.push({ key: "Duration:", value: duration });
  }

  if (first.production.year === second.production.year) {
    similarities.push({
      key: "Production year:",
      value: first.production.year,
    });
  }

  if (first.parentalRating === second.parentalRating) {
    similarities.push({ key: "Parental Rating:", value: first.parentalRating });
  }

  if (Math.round(first.imdb?.rating) === Math.round(second.imdb?.rating)) {
    similarities.push({
      key: "Imdb Rating:",
      value: Math.round(first.imdb.rating),
    });
  }

  return similarities;
};

const findSimilarDuration = (firstMovieDuration, secondMovieDuration) => {
  const oneHour = 3600000;
  const twoHours = 7200000;

  if (firstMovieDuration < oneHour && secondMovieDuration < oneHour) {
    return "Under one hour";
  }

  if (
    firstMovieDuration >= oneHour &&
    firstMovieDuration < twoHours &&
    secondMovieDuration >= oneHour &&
    secondMovieDuration < twoHours
  ) {
    return "From 1 hour, but less than 2";
  }

  if (firstMovieDuration >= twoHours && secondMovieDuration >= twoHours) {
    return "2 hours or longer";
  }
};

const findSimilarActors = (firstMovieActors, secondMovieActors) => {
  let arr = [];
  for (let i = 0; i < firstMovieActors?.length; i++) {
    for (let j = 0; j < secondMovieActors?.length; j++) {
      if (firstMovieActors[i] === secondMovieActors[j]) {
        arr.push(firstMovieActors[i]);
      }
    }
  }
  return arr.join(", ");
};
