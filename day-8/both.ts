import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const lines = rawFile.split("\n");

const grid = lines.map((line) => line.trim().split("").map(Number));

type C = { x: number; y: number };

const allLessThen = (arr: number[], value: number) => {
  for (const a of arr) {
    if (a >= value) return false;
  }
  return true;
};

const allToLeft = (c: C): number[] => grid[c.y].slice(0, c.x);
const allToRight = (c: C): number[] => grid[c.y].slice(c.x + 1);
const allToTop = (c: C): number[] =>
  grid.map((line) => line[c.x]).slice(0, c.y);
const allToBottom = (c: C): number[] =>
  grid.map((line) => line[c.x]).slice(c.y + 1);

const isVisible = (c: C): boolean => {
  const cell = grid[c.y][c.x];

  const leftVisible = allLessThen(allToLeft(c), cell);
  if (leftVisible) return true;

  const rightVisible = allLessThen(allToRight(c), cell);
  if (rightVisible) return true;

  const topVisible = allLessThen(allToTop(c), cell);
  if (topVisible) return true;

  const bottomVisible = allLessThen(allToBottom(c), cell);
  if (bottomVisible) return true;

  return false;
};

const scenicScore = (c: C): number => {
  const cell = grid[c.y][c.x];

  let distToLeft = allToLeft(c)
    .reverse()
    .findIndex((v) => v >= cell);
  distToLeft = distToLeft < 0 ? allToLeft(c).length : distToLeft + 1;

  let distToRight = allToRight(c).findIndex((v) => v >= cell);
  distToRight = distToRight < 0 ? allToRight(c).length : distToRight + 1;

  let distToTop = allToTop(c)
    .reverse()
    .findIndex((v) => v >= cell);
  distToTop = distToTop < 0 ? allToTop(c).length : distToTop + 1;

  let distToBottom = allToBottom(c).findIndex((v) => v >= cell);
  distToBottom = distToBottom < 0 ? allToBottom(c).length : distToBottom + 1;

  return distToLeft * distToRight * distToTop * distToBottom;
};

// PART 1
(() => {
  let treecount = 0;

  for (let x = 1; x < grid[0].length - 1; x++) {
    for (let y = 1; y < grid.length - 1; y++) {
      if (isVisible({ x, y })) treecount++;
    }
  }

  console.log(
    "Part 1: Number of trees visible from outside of grid:",
    treecount + grid[0].length * 2 + grid.length * 2 - 4
  );
})();

// PART 2
(() => {
  let scores: number[] = [];

  for (let x = 1; x < grid[0].length - 1; x++) {
    for (let y = 1; y < grid.length - 1; y++) {
      const s = scenicScore({ x, y });
      scores.push(s);
      // console.log(`x: ${x}; y: ${y}; v: ${grid[y][x]}: s: ${s}`);
    }
  }

  console.log("Part 2: Highest scenic score possible:", Math.max(...scores));
})();
