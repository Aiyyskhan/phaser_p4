import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Player extends Entity {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, SPRITES.PLAYER);
    }

    update(...args: any[]): void {
        const keys = this.scene.input.keyboard.createCursorKeys();

        if (keys.up.isDown) {
            this.setPosition(this.x, this.y - 1);
        } else if (keys.down.isDown) {
            this.setPosition(this.x, this.y + 1);
        } else if (keys.left.isDown) {
            this.setPosition(this.x - 1, this.y);
        } else if (keys.right.isDown) {
            this.setPosition(this.x + 1, this.y);
        }
    }
}