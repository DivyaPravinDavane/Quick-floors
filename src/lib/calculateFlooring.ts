export interface FlooringCalculationInput {
  lengthFeet: number;
  widthFeet: number;
  wastePercentage?: number; // default 10%
  coveragePerBox?: number; // sq ft per box
}

export interface FlooringCalculationResult {
  baseAreaSqFt: number;
  totalAreaWithWasteSqFt: number;
  wasteSqFt: number;
  boxesNeeded: number;
  exactBoxes: number;
  actualCoverageSqFt: number;
  overageSqFt: number;
}

export function calculateFlooring(input: FlooringCalculationInput): FlooringCalculationResult {
  const { lengthFeet, widthFeet, wastePercentage = 10, coveragePerBox = 20 } = input;
  const baseAreaSqFt = Math.max(0, lengthFeet * widthFeet);
  const wasteMultiplier = 1 + wastePercentage / 100;
  const totalAreaWithWasteSqFt = Math.round(baseAreaSqFt * wasteMultiplier * 100) / 100;
  const wasteSqFt = Math.round((totalAreaWithWasteSqFt - baseAreaSqFt) * 100) / 100;

  const exactBoxes = totalAreaWithWasteSqFt > 0 ? totalAreaWithWasteSqFt / coveragePerBox : 0;
  const boxesNeeded = Math.ceil(exactBoxes);
  const actualCoverageSqFt = Math.round(boxesNeeded * coveragePerBox * 100) / 100;
  const overageSqFt = Math.round((actualCoverageSqFt - totalAreaWithWasteSqFt) * 100) / 100;

  return {
    baseAreaSqFt: Math.round(baseAreaSqFt * 100) / 100,
    totalAreaWithWasteSqFt,
    wasteSqFt,
    boxesNeeded,
    exactBoxes: Math.round(exactBoxes * 100) / 100,
    actualCoverageSqFt,
    overageSqFt,
  };
}
