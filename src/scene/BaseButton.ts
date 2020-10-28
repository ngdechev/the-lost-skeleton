class BaseButton extends Phaser.GameObjects.Container {
    private sprite: Phaser.GameObjects.Sprite;
    private text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame?: string, text?: string) {
        super(scene);

        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, key, frame);
        this.sprite.setInteractive();

        this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, {fontSize: "40px"});
        this.text.setOrigin(0.5);
        this.text.y = -this.text.height * 0.1;
        this.add(this.text);
    
        this.add(this.sprite);
    }
    
    public setOnClick(callback: Function, context: any): void {
        this.sprite.on("pointerdown", callback, context);
    }
}

export { BaseButton }
