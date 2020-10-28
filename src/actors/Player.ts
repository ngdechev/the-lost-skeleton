class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors;
    private space: Phaser.Input.Keyboard.Key;

    private updatePlayer: boolean = true;
    public isAlive: boolean = true;

    private readonly speed: number = 200;
    
    private doublejump: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player");

        this.scene.physics.add.existing(this);

        this.setupPlayerEvents();

        this.scene.anims.create({
            key: "player_death",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "death_", start: 0, end: 9 }),
            frameRate: 10
        });

        this.scene.anims.create({
            key: "player_walk",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "walk_", start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    private setupPlayerEvents(): void {
        this.on('animationcomplete', (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) => {
            this.emit("customEventName_" + anim.key);

            this.updatePlayer = true;
            console.log("animation COMPLETE!");
        });
    }

    private playerMove() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
        }
        else {
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-this.speed);
            this.doublejump = true;
        }

        if (this.space.isDown && this.doublejump == true) {
            this.setVelocityY(-this.speed);
            this.doublejump = false;
        }

        if (this.updatePlayer) {
            if (this.cursors.left.isDown || this.cursors.right.isDown) {
                this.anims.play("player_walk", true);
            } else {
                if (this.anims.isPlaying) {
                    this.anims.stop();
                }
            }

            if (this.cursors.left.isDown) {
                this.flipX = true;
            } else {
                this.flipX = false;
            }

            if(this.isAlive == false) this.anims.play("player_death");
        }
    }

    public get isPlayerAlive() {
        return this.isAlive;
    }

    public update() {
        this.playerMove()
    }

}
export { Player }