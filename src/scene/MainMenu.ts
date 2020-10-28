import { Player } from "../actors/Player";
import { BaseButton } from "../actors/BaseButton";

class MainMenu extends Phaser.Scene {
    private defaultStyle: object = {
        fontSize: '80px',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        color: '#000000',
        align: 'center'
    }

    private text: Phaser.GameObjects.Text;

    private background: Phaser.GameObjects.Sprite;

    private startButton: BaseButton;
    private exitButton: BaseButton;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.cameras.main.fadeIn(2000);

        this.background = new Phaser.GameObjects.Sprite(this, 0, 0, "MainMenuBackground");
        this.background.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
        this.background.setScale(2);
        this.add.existing(this.background);

        this.text = this.add.text(this.cameras.main.centerX - 300, 50, "The lost skeleton", this.defaultStyle);
        this.text.setDepth(2);
        this.add.existing(this.text);

        this.startButton = new BaseButton(this, "button", "oval_button.png", "START");
        this.startButton.setPosition(this.cameras.main.centerX, this.cameras.main.height * 0.4);
        this.startButton.setScale(0.8);
        this.startButton.setOnClick(this.onStart, this);
        this.add.existing(this.startButton);

        this.exitButton = new BaseButton(this, "button", "oval_button.png", "EXIT");
        this.exitButton.setPosition(this.cameras.main.centerX, this.cameras.main.height * 0.7);
        this.exitButton.setScale(0.7);
        this.exitButton.setOnClick(this.onExit, this);
        this.add.existing(this.exitButton);
    }

    private onStart(): void {
        this.scene.start("Level1");
    }

    private onExit(): void {
        window.location.assign("https://google.com");
    }
}

export { MainMenu }