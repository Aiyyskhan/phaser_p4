import mazeJSON from "../assets/maze_0.json"
import { Kitty } from "../entities/kitty";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";

export class Maze extends Phaser.Scene {
    private kitty0?: Kitty;
    
    constructor() {
        super("MazeScene");
    }

    preload() {
        this.load.image(TILES.MAZE, "src/assets/durotar.png");
        this.load.tilemapTiledJSON("map", "src/assets/maze_0.json");
        this.load.spritesheet("basecolor", "src/assets/characters/Sprite-0006_walking_basecolor.png", { frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT });
        this.load.spritesheet("contur", "src/assets/characters/Sprite-0006_walking_contur.png", { frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT });
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage(mazeJSON.tilesets[0].name, TILES.MAZE, SIZES.TILE, SIZES.TILE);
        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);

        this.kitty0 = new Kitty(this, 400, 250); //, SPRITES.PLAYER);
    }

    update(time: number, delta: number): void {
        this.kitty0.update();
    }
}