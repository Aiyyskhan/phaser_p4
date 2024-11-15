import Phaser from "phaser";
import "./style.css";
import { scenes } from "./scenes";

new Phaser.Game({
  type: Phaser.AUTO, //WEBGL,
  parent: 'game-root',
  canvas: document.getElementById('game-canvas') as HTMLCanvasElement,
  width: window.innerWidth, //960,
  height: window.innerHeight, //640,
  title: "NeuroKitties",
  scene: scenes,
  backgroundColor: "#000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true
});