class BaseButton extends Phaser.GameObjects.Container {
    private defaultStyle: any = {
        fontSize: '60px',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        color: '#000000',
        align: 'center'
    }

    private sprite: Phaser.GameObjects.Sprite;
    private text: Phaser.GameObjects.Text;

    private tween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, key: string, frame: string, text: string = "") {
        super(scene);

        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, key, frame);
        this.sprite.setInteractive();

        this.add(this.sprite);

        if (text != "") {
            this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, this.defaultStyle);
            this.text.setOrigin(0.5);
            this.text.y = -this.text.height * 0.1;
            this.add(this.text);
        }
    }

    public enable(status: boolean): void {
        if (status) {
            this.sprite.setInteractive();
            this.sprite.setTint(0xffffff);
        } else {
            this.sprite.disableInteractive();
            this.sprite.setTint(0xd8ceab);
        }
    }

    public setOnClick(callback: Function, context: any): void {
        this.sprite.on("pointerdown", callback, context);
    }

    public destroy(fromScene: boolean): void {
        if (this.sprite != null) {
            this.sprite.destroy(fromScene);
            this.sprite = null;
        }

        if (this.text != null) {
            this.text.destroy(fromScene);
            this.text = null;
        }

        super.destroy(fromScene);
    }
}

export { BaseButton }
