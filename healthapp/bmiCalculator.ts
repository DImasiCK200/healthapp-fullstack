interface ValuesToCalculateBmi {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const heightMetres = height / 100;

  const bmi = weight / heightMetres ** 2;

  let result = "error";

  switch (true) {
    case bmi < 16.0:
      result = "Underweight (Severe thinness)";
      break;
    case bmi >= 16.0 && bmi < 17:
      result = "Underweight (Moderate thinness)";
      break;
    case bmi >= 17.0 && bmi < 18.5:
      result = "Underweight (Mild thinness)";
      break;
    case bmi >= 18.5 && bmi < 25.0:
      result = "Normal range";
      break;
    case bmi >= 25.0 && bmi < 30.0:
      result = "Overweight (Pre-obese)";
      break;
    case bmi >= 30.0 && bmi < 35.0:
      result = "Obese (Class I)";
      break;
    case bmi >= 35.0 && bmi < 40.0:
      result = "Obese (Class II)";
      break;
    case bmi >= 40.0:
      result = "Obese (Class III)";
      break;
  }

  return result;
};

const parseArgsBmi = (args: Array<string>): ValuesToCalculateBmi => {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length < 4) throw new Error("To many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) && isNaN(weight))
    throw new Error("Provided values were not numbers!");

  return {
    height,
    weight,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArgsBmi(process.argv);

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    console.log(errorMessage);
  }
}
