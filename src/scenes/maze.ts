import mazeJSON from "../assets/maze_0.json"
import { Kitty } from "../entities/kitty";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";

export class Maze extends Phaser.Scene {
    // private kitty0?: Kitty;
    private kitties: Set<Kitty> = new Set<Kitty>();
    
    constructor() {
        super("MazeScene");
    }

    preload() {
        this.load.image(TILES.MAZE, "src/assets/durotar.png");
        this.load.tilemapTiledJSON("map", "src/assets/maze_0.json");
        
        this.load.spritesheet("base", "src/assets/characters/Kitty20241118_1_base.png", { frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT });
        this.load.spritesheet("pattern0", "src/assets/characters/Kitty20241118_1_pattern0.png", { frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT });
        this.load.spritesheet("face", "src/assets/characters/Kitty20241118_1_face.png", { frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT });
        this.load.spritesheet("muzzle", "src/assets/characters/Kitty20241118_1_muzzle.png", { frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT });
    }

    create() {
        // const map = this.make.tilemap({ key: "map" });
        // const tileset = map.addTilesetImage(mazeJSON.tilesets[0].name, TILES.MAZE, SIZES.TILE, SIZES.TILE);
        // const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        // const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);

        // this.kitty0 = new Kitty(this, 400, 250); //, SPRITES.PLAYER);
        for (let i = 0; i < 10; i++) {
            this.kitties.add(new Kitty(this, Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)));          
        }
        this.kitties.forEach((k) => {
            k.speed = this.getRandomInt(1, 4);
        })
    }

    update(time: number, delta: number): void {
        // this.kitty0.update();
        this.kitties.forEach((k) => { k.update(); })
    }

    getRandomInt(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}