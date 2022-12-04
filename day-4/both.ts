import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const lines = rawFile.split("\n");

// PART 1
(() => {
  let fullyContainsCounter = 0;

  lines.forEach((line) => {
    const [p1, p2] = line.split(",");

    const [p1s, p1e] = p1.split("-").map(Number);
    const [p2s, p2e] = p2.split("-").map(Number);

    const is_p1s_inside = p1s >= p2s && p1s <= p2e;
    const is_p1e_inside = p1e >= p2s && p1e <= p2e;
    const is_p1_inside = is_p1s_inside && is_p1e_inside;

    const is_p2s_inside = p2s >= p1s && p2s <= p1e;
    const is_p2e_inside = p2e >= p1s && p2e <= p1e;
    const is_p2_inside = is_p2s_inside && is_p2e_inside;

    if (is_p1_inside || is_p2_inside) fullyContainsCounter++;
  });

  console.log(
    "Part 1: Number of pairs where one fully contains other:",
    fullyContainsCounter
  );
})();

// PART 2
(() => {
  let overlapsCounter = 0;

  lines.forEach((line) => {
    const [p1, p2] = line.split(",");

    const [p1s, p1e] = p1.split("-").map(Number);
    const [p2s, p2e] = p2.split("-").map(Number);

    const is_p1s_inside = p1s >= p2s && p1s <= p2e;
    const is_p1e_inside = p1e >= p2s && p1e <= p2e;
    const is_p1_inside = is_p1s_inside || is_p1e_inside;

    const is_p2s_inside = p2s >= p1s && p2s <= p1e;
    const is_p2e_inside = p2e >= p1s && p2e <= p1e;
    const is_p2_inside = is_p2s_inside || is_p2e_inside;

    if (is_p1_inside || is_p2_inside) overlapsCounter++;
  });

  console.log("Part 1: Number of pairs that overlap:", overlapsCounter);
})();
