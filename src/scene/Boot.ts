class Boot extends Phaser.Scene {
    constructor() {
        super("boot");
    }

    create() {
        this.game.events.on('hidden', this.onHidden, this);
        this.game.events.on('visible', this.onVisible, this);

        window.addEventListener('resize', () => {
            console.log("resize");
        });

        this.scene.start("preload");
    }

    private onHidden(): void {
        console.log("hidden");
    }

    private onVisible(): void {
        console.log("visible");
    }
}

export { Boot }