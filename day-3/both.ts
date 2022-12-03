import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const lines = rawFile.split("\n");

const priority = (l: string): number => {
  if (l.length > 1) throw new Error("only chars here");
  const code = l.charCodeAt(0);

  if (code >= 97 && code <= 122) return code - 96;
  if (code >= 65 && code <= 90) return code - 64 + 26;

  throw new Error("Unsupported character");
};

// PART 1
(() => {
  let totalPriority = 0;

  lines.forEach((line) => {
    const mid = line.length / 2;
    const [c1, c2] = [line.substring(0, mid), line.substring(mid)];

    let commonChar = "";

    for (const c of c1.split("")) {
      if (c2.includes(c)) {
        commonChar = c;
        break;
      }
    }

    totalPriority += priority(commonChar);
  });

  console.log(
    "Part 1: Sum of all item types that appear in both sections:",
    totalPriority
  );
})();

(() => {
  let totalPriority = 0;

  const groups = new Array(lines.length / 3)
    .fill(0)
    .map((_, i) => [lines[i * 3], lines[i * 3 + 1], lines[i * 3 + 2]]);

  for (const group of groups) {
    const [g1, g2, g3] = group;

    let commonGroupMark = "";

    for (const c of g1.split("")) {
      if (g2.includes(c) && g3.includes(c)) {
        commonGroupMark = c;
        break;
      }
    }

    totalPriority += priority(commonGroupMark);
  }

  console.log(
    "Part 1: Sum of all item types that appear in both sections:",
    totalPriority
  );
})();
