import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const elves = rawFile.split('\n\n');

const elvesCalories = elves.map(elve => elve.split('\n').map(Number));

const caloriesSum = elvesCalories.map(calories => calories.reduce((p, c) => p + c, 0))

const mostCalories = Math.max(...caloriesSum);

console.log('Part 1: Most calories:', mostCalories);

const sortedCaloriesSum = caloriesSum.sort((a, b) =>  b - a);

const [a, b, c] = sortedCaloriesSum;

console.log('Part 2: Sum of calories of three top calorie owners:', a + b + c)