import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const hasRepeats = (str: string): boolean => /(.).*\1/.test(str);

// PART 1
(() => {
  for (let i = 0; i < rawFile.length; i++) {
    const str = rawFile.slice(i, i + 4);

    if (!hasRepeats(str)) {
      console.log("Part 1: Characters before start-of-packet:", i + 4);
      break;
    }
  }
})();

// PART 2
(() => {
  for (let i = 0; i < rawFile.length; i++) {
    const str = rawFile.slice(i, i + 14);

    if (!hasRepeats(str)) {
      console.log("Part 1: Characters before start-of-message:", i + 14);
      break;
    }
  }
  //
})();
