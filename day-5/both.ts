import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const [header, lines] = rawFile.split("\n\n");

// Parse the stacks

const tstacks = header.split("\n").map((line) => {
  return [
    line.at(1), // 1
    line.at(5), // 2
    line.at(9), // 3
    line.at(13), // 4
    line.at(17), // 5
    line.at(21), // 6
    line.at(25), // 7
    line.at(29), // 8
    line.at(33), // 9
  ];
});

const stacks = tstacks
  .map((_, colIndex) => tstacks.map((row) => row[colIndex]))
  .map((line) =>
    line
      .reverse()
      .splice(1)
      .filter((s) => s != " ")
  );

// PART 1
(() => {
  // 2 layer clone
  const myStacks = [...stacks.map((a) => [...a])];

  lines.split("\n").map((line, i) => {
    const [move, num, from, index1, to, index2] = line.split(" ");

    const n = parseInt(num);
    const i1 = parseInt(index1) - 1;
    const i2 = parseInt(index2) - 1;

    const movedItems = new Array(n)
      .fill(0)
      .map(() => myStacks[i1].pop()) // Naturally reverses it
      .filter(Boolean) as string[];

    myStacks[i2].push(...movedItems);
  });

  console.log(
    "Part 1: The items on the top of the stacks: ",
    myStacks.map((n) => n.at(-1)).join("")
  );
})();

// PART 2
(() => {
  // 2 layer clone
  const myStacks = [...stacks.map((a) => [...a])];

  lines.split("\n").map((line, i) => {
    const [move, num, from, index1, to, index2] = line.split(" ");

    const n = parseInt(num);
    const i1 = parseInt(index1) - 1;
    const i2 = parseInt(index2) - 1;

    const movedItems = new Array(n)
      .fill(0)
      .map(() => myStacks[i1].pop())
      .reverse()
      .filter(Boolean) as string[];

    myStacks[i2].push(...movedItems);
  });

  console.log(
    "Part 2: The items on the top of the stacks (when items are lifted all together): ",
    myStacks.map((n) => n.at(-1)).join("")
  );
})();
