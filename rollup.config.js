import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"
export default {
  input: "src/index.ts",
  output: {
    file: pkg.main,
    format: "esm",
    name: "copy",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
}
