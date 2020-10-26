import { Boot } from "./Boot";

class Preload extends Phaser.Scene {

    constructor() {
        super("preload");
    }

    create() {
        this.load.on("progress", this.onProgressUpdated, this);
        this.load.on("load", this.onFileLoaded, this);
        this.load.on("complete", this.onComplete, this);
        
        //// player
        this.load.atlas("player", "assets/images/Skeleton.png", "assets/images/Skeleton.json");

        //// level 1 
        this.load.image("background", "assets/images/Background.png");
        this.load.image("castle", "assets/images/Castle.png");
        this.load.image("chest", "assets/images/Chest.png");
        this.load.image("land", "assets/images/Land.png");
        this.load.image("portal", "assets/images/Portals.png");
        this.load.image("soul", "assets/images/Souls.png");
        this.load.image("decoration", "assets/images/Web_Decorations.png");
        this.load.tilemapTiledJSON("level1", "assets/images/Level1.json");

        //// level 2
        this.load.image("atlas", "assets/images/Tiles.png");
        this.load.image("soulV2", "assets/images/SoulsV2.png");
        this.load.tilemapTiledJSON("level2", "assets/images/Level2.json");
        
        this.load.start();

    }

    private onProgressUpdated(value: number): void {
        console.log("progress update:", value);
    }

    private onFileLoaded(file: Phaser.Loader.File): void {
        console.log("file loaded: ", file);
    }

    private onComplete(): void {
        console.log("load complete");

        this.scene.start("Level1");
    }
}

export { Preload }