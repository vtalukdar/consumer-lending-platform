import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const src = path.join(repoRoot, "resources", "api", "endpoints.json");
const dest = path.join(
    repoRoot,
    "backend",
    "src",
    "main",
    "resources",
    "application-generated.yml"
);

const raw = fs.readFileSync(src, "utf8");
const cfg = JSON.parse(raw);

function requireSlash(v, name) {
    if (typeof v !== "string" || !v.startsWith("/")) {
        throw new Error(`${name} must be a string starting with "/"`);
    }
    return v;
}

const basePath = requireSlash(cfg?.loan?.basePath, "loan.basePath");
const getPath = requireSlash(cfg?.loan?.getLoanPropositions, "loan.getLoanPropositions");
const submitPath = requireSlash(cfg?.loan?.submitLoanPropositions, "loan.submitLoanPropositions");

const yml = [
    "api:",
    "  loan:",
    `    base-path: ${basePath}`,
    `    get-loan-propositions-path: ${getPath}`,
    `    submit-loan-propositions-path: ${submitPath}`,
    ""
].join("\n");

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, yml, "utf8");

console.log(`Generated ${dest}`);