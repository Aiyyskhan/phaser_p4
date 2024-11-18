
export class Kitty {
    private scene: Phaser.Scene;
    private character: Phaser.GameObjects.Container;
    private x: number;
    private y: number;

    private speed: number = 3;
    private sprite_scale: number = 3;

    private base: Phaser.GameObjects.Sprite;
    private pattern0: Phaser.GameObjects.Sprite;
    private muzzle: Phaser.GameObjects.Sprite;
    private face: Phaser.GameObjects.Sprite;

    private anim_key_suf: string;
    
    constructor(scene: Phaser.Scene, x: number, y: number) { //, texture: string) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Idle Left
        this.animCreate("Base_il", "base", 0, 3);
        this.animCreate("Pattern0_il", "pattern0", 0, 3);
        this.animCreate("Face_il", "face", 0, 3);
        this.animCreate("Muzzle_il", "muzzle", 0, 3);

        // Walk Left
        this.animCreate("Base_wl", "base", 4, 7);
        this.animCreate("Pattern0_wl", "pattern0", 4, 7);
        this.animCreate("Face_wl", "face", 4, 7);
        this.animCreate("Muzzle_wl", "muzzle", 4, 7);

        // Idle Back
        this.animCreate("Base_ib", "base", 8, 11);
        this.animCreate("Pattern0_ib", "pattern0", 8, 11);
        this.animCreate("Face_ib", "face", 8, 11);
        this.animCreate("Muzzle_ib", "muzzle", 8, 11);

        // Walk Back
        this.animCreate("Base_wb", "base", 12, 15);
        this.animCreate("Pattern0_wb", "pattern0", 12, 15);
        this.animCreate("Face_wb", "face", 12, 15);
        this.animCreate("Muzzle_wb", "muzzle", 12, 15);

        // Idle Right
        this.animCreate("Base_ir", "base", 16, 19);
        this.animCreate("Pattern0_ir", "pattern0", 16, 19);
        this.animCreate("Face_ir", "face", 16, 19);
        this.animCreate("Muzzle_ir", "muzzle", 16, 19);

        // Walk Right
        this.animCreate("Base_wr", "base", 20, 23);
        this.animCreate("Pattern0_wr", "pattern0", 20, 23);
        this.animCreate("Face_wr", "face", 20, 23);
        this.animCreate("Muzzle_wr", "muzzle", 20, 23);

        // Idle Front
        this.animCreate("Base_if", "base", 24, 27);
        this.animCreate("Pattern0_if", "pattern0", 24, 27);
        this.animCreate("Face_if", "face", 24, 27);
        this.animCreate("Muzzle_if", "muzzle", 24, 27);

        // Walk Front
        this.animCreate("Base_wf", "base", 28, 31);
        this.animCreate("Pattern0_wf", "pattern0", 28, 31);
        this.animCreate("Face_wf", "face", 28, 31);
        this.animCreate("Muzzle_wf", "muzzle", 28, 31);

        this.character = this.scene.add.container(this.x, this.y);

        this.base = this.scene.add.sprite(0, 0, "base").setScale(this.sprite_scale);
        this.pattern0 = this.scene.add.sprite(0, 0, "pattern0").setScale(this.sprite_scale);
        this.muzzle = this.scene.add.sprite(0, 0, "muzzle").setScale(this.sprite_scale);
        this.face = this.scene.add.sprite(0, 0, "face").setScale(this.sprite_scale);

        // this.base.play({ key: "Base_ir", repeat: -1 });
        // this.pattern0.play({ key: "Pattern0_ir", repeat: -1 });
        // this.muzzle.play({ key: "Muzzle_ir", repeat: -1 });
        // this.face.play({ key: "Face_ir", repeat: -1 });
        this.animUpdate("ir");

        this.base.setTint(Math.random() * 16000000); //0xdf7126); //, 0x00ff00, 0x0000ff, 0xffffff);
        this.pattern0.setTint(Math.random() * 16000000); //0x696a6a);
        // this.muzzle.setTint(Math.random() * 16000000);
        this.muzzle.setAlpha(Math.random());

        this.character.add([
            this.base,
            this.pattern0,
            this.muzzle,
            this.face
        ]);
    }

    animCreate(anim_key: string, spritesheet_key: string, start_frame: number, end_frame: number): void {
        this.scene.anims.create({
            key: anim_key,
            frames: this.scene.anims.generateFrameNumbers(spritesheet_key, { start: start_frame, end: end_frame }),
            frameRate: 15,
            repeat: -1
        });
    }

    animUpdate(key_suffix: string): void {
        this.base.play(`Base_${key_suffix}`, true); //{ key: `Base_${key_suffix}`, repeat: -1 });
        this.pattern0.play(`Pattern0_${key_suffix}`, true); //{ key: `Pattern0_${key_suffix}`, repeat: -1 });
        this.muzzle.play(`Muzzle_${key_suffix}`, true); //{ key: `Muzzle_${key_suffix}`, repeat: -1 });
        this.face.play(`Face_${key_suffix}`, true); //{ key: `Face_${key_suffix}`, repeat: -1 });
    }

    update(): void {
        const keys = this.scene.input.keyboard.createCursorKeys();

        if (keys.up.isDown) {
            this.y -= this.speed;
            this.animUpdate("wb");
        } else if (keys.down.isDown) {
            this.y += this.speed;
            this.animUpdate("wf");
        } else if (keys.left.isDown) {
            this.x -= this.speed;
            this.animUpdate("wl");
        } else if (keys.right.isDown) {
            this.x += this.speed;
            this.animUpdate("wr");
        } else {
            if (this.base.anims.getName() === "Base_wl") {
                this.animUpdate("il");
            } else if (this.base.anims.getName() === "Base_wb") {
                this.animUpdate("ib");
            } else if (this.base.anims.getName() === "Base_wr") {
                this.animUpdate("ir");
            } else if (this.base.anims.getName() === "Base_wf") {
                this.animUpdate("if");
            }
        }
        this.character.setPosition(this.x, this.y);
    }
}