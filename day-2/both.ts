import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const lines = rawFile.split("\n");

// PART 1
(() => {
  type P1 = "A" | "B" | "C";
  type P2 = "X" | "Y" | "Z";
  type RESULT = "LOSE" | "WIN" | "DRAW";

  const scores: Record<P1 | P2 | RESULT, number> = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
  };

  const beats = (a: P1, b: P2): RESULT => {
    if (a === "A" && b === "X") return "DRAW";
    if (a === "B" && b === "Y") return "DRAW";
    if (a === "C" && b === "Z") return "DRAW";

    if (a === "A" && b === "Y") return "WIN";
    if (a === "B" && b === "Z") return "WIN";
    if (a === "C" && b === "X") return "WIN";

    return "LOSE";
  };

  let totalScore = 0;

  lines.forEach((line) => {
    const [their, mine] = line.split(" ") as [P1, P2];

    const result = beats(their, mine);

    totalScore += scores[result] + scores[mine];
  });

  console.log("Part 1: Total score according to the guide:", totalScore);
})();

(() => {
  type P = "A" | "B" | "C";
  type RESULT = "X" | "Y" | "Z";

  const scores: Record<P | RESULT, number> = {
    A: 1, // ROCK
    B: 2, // PAPER
    C: 3, // SCISSORS
    X: 0, // LOSE
    Y: 3, // DRAW
    Z: 6, // WIN
  };

  const whatINeed = (a: P, b: RESULT): P => {
    if (a === "A" && b === "Z") return "B";
    if (a === "B" && b === "Z") return "C";
    if (a === "C" && b === "Z") return "A";

    if (a === "A" && b === "Y") return "A";
    if (a === "B" && b === "Y") return "B";
    if (a === "C" && b === "Y") return "C";

    if (a === "A" && b === "X") return "C";
    if (a === "B" && b === "X") return "A";
    if (a === "C" && b === "X") return "B";

    return "A";
  };

  let totalScore = 0;

  lines.forEach((line) => {
    const [theirs, result] = line.split(" ") as [P, RESULT];

    const myCall = whatINeed(theirs, result);

    totalScore += scores[myCall] + scores[result];
  });

  console.log("Part 2: Total result with adjusted info:", totalScore);
})();
