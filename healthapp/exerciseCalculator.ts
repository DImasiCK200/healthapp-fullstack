type RatingValue = 1 | 2 | 3;
type RatingDescription =
  | "Bad result."
  | "Normal result. You can do better!"
  | "Good!";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: RatingValue;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

interface Rating {
  rating: RatingValue;
  ratingDescription: RatingDescription;
}

interface ValuesToCalculateEx {
  timeArray: Array<number>;
  target: number;
}

const calculateRating = (value: number, target: number): Rating => {
  if (value === 0) {
    return {
      rating: 1,
      ratingDescription: "Bad result.",
    };
  } else if (value < target) {
    return {
      rating: 2,
      ratingDescription: "Normal result. You can do better!",
    };
  } else {
    return {
      rating: 3,
      ratingDescription: "Good!",
    };
  }
};

const calculateExercises = (
  dailyExsHours: Array<number>,
  target: number,
): Result => {
  const periodLength = dailyExsHours.length;
  const trainingDays = dailyExsHours.filter((time) => time > 0).length;
  const average =
    dailyExsHours.reduce((sum, time) => sum + time, 0) / periodLength;
  const success = average > target;
  const { rating, ratingDescription } = calculateRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgsEx = (args: Array<string>): ValuesToCalculateEx => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args.slice(2).shift());
  const timeArray = args.slice(3).map((time) => Number(time));

  if (isNaN(target) && timeArray.some((time) => isNaN(time)))
    throw new Error("Provided values were not numbers!");

  return {
    target,
    timeArray,
  };
};

try {
  const { target, timeArray } = parseArgsEx(process.argv);

  console.log(calculateExercises(timeArray, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";

  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }

  console.log(errorMessage);
}
