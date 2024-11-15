
export class Kitty {
    private scene: Phaser.Scene;
    private character: Phaser.GameObjects.Container;
    private x: number;
    private y: number;
    
    constructor(scene: Phaser.Scene, x: number, y: number) { //, texture: string) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.scene.anims.create({
            key: "Right",
            frames: this.scene.anims.generateFrameNumbers("basecolor", { start: 8, end: 11 }),
            frameRate: 15,
            repeat: -1
          });
        this.scene.anims.create({
            key: "ConturRight",
            frames: this.scene.anims.generateFrameNumbers("contur", { start: 8, end: 11 }),
            frameRate: 15,
            repeat: -1
        });

        this.character = this.scene.add.container(this.x, this.y);

        const basecolor = this.scene.add.sprite(0, 0, "basecolor").play({ key: "Right", repeat: -1 }).setScale(2);
        const contur = this.scene.add.sprite(0, 0, "contur").play({ key: "ConturRight", repeat: -1 }).setScale(2);

        // contur.setTint(0xffffff);

        this.character.add([
            basecolor,
            contur
        ]);
    }

    update(): void {
        const keys = this.scene.input.keyboard.createCursorKeys();

        if (keys.up.isDown) {
            this.y -= 2;
            // this.character.setPosition(this.x, this.y);
        } else if (keys.down.isDown) {
            this.y += 2;
            // this.character.setPosition(this.x, this.y);
        } else if (keys.left.isDown) {
            this.x -= 2;
            // this.character.setPosition(this.x, this.y);
        } else if (keys.right.isDown) {
            this.x += 2;
            // this.character.setPosition(this.x, this.y);
        }
        this.character.setPosition(this.x, this.y);
    }
}