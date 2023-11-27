import flock from "./img/flock.gif";
import sdf from "./img/sdf.gif";
import { MainBadge, LanguageBadge } from "./Badges";

const unityBadge = MainBadge({ name: "Unity" });
const csharpBadge = LanguageBadge({ language: "C#" });

export const projects: Project[] = [
  {
    title: "Flock",
    cover: flock,
    anim: flock,
    badges: [unityBadge, csharpBadge],
    description: "Hola que tal",
    link: "ss",
  },
  {
    title: "SDF Visualizer",
    cover: sdf,
    anim: sdf,
    badges: [],
    description: "TFG",
    link: "https://github.com/Daniel2000815/SDF-Visualizer",
  },
];
