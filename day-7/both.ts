import fs from "fs";
import { resolve } from "path";

const rawFile = fs.readFileSync(resolve(__dirname, "raw.txt"), "utf-8");

const commandsWithOutput = rawFile.split("$");

type Step = {
  command: { cmd: "cd" | "ls"; params: string[] };
  outputLines: string[];
};

const steps: Step[] = commandsWithOutput.map((str) => {
  const [command, ...output] = str.split("\n");
  const [cmd, ...params] = command.split(" ");

  return {
    command: { cmd: cmd as "cd" | "ls", params },
    outputLines: output.map((s) => s.trim()),
  };
});

type File = { filename: string; size: number };
type Directory = {
  name: string;
  items: (Directory | File)[];
};

const isFile = (str: string): boolean => !isNaN(Number(str.split(" ").at(0)));
const parseFile = (str: string): File => ({
  filename: str.split(" ").at(1) || "",
  size: parseInt(str.split(" ").at(0) || ""),
});

const parseFilesystem = (cwd: Directory, step: Step): Directory | null => {
  if (step.command.cmd === "cd" && step.command.params.at(0) === "..") {
    // Go back
    return null;
  }

  if (step.command.cmd === "cd") {
    // Go into folder
    return {
      ...cwd,
      items: [
        ...cwd.items,
        {
          name: step.command.params.at(0) || "<>",
          items: new Array(),
        },
      ],
    };
  }

  if (step.command.cmd === "ls") {
    // List files
    return {
      ...cwd,
      items: [...step.outputLines.filter(isFile).map(parseFile)],
    };
  }

  throw new Error("ooooopsie");
};

let dir: Directory = { name: "/", items: [] };

for (const step of steps) {
  const tempDir = parseFilesystem(dir, step);

  if (!tempDir) {
    // Go back
  }
}

// PART 1
(() => {
  console.log("Part 1:");
})();

// PART 2
(() => {
  console.log("Part 2:");
})();
