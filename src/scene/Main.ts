class Main extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

    private spikeLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private soulsLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private portalLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private chestLayer: Phaser.Tilemaps.StaticTilemapLayer;

    constructor() {
        super("Main");
    }

    create() {
        this.map = this.make.tilemap({ key: "level1" });

        let backgroundTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Background", "background");
        let castleTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Castle", "castle");
        let chestTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Chest", "chest");
        let landTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Land", "land");
        let portalTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Portals", "portal");
        let soulTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Souls", "soul");
        let decorationTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Web_Decorations", "decoration");

        let backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background", backgroundTile, 0, 0).setDepth(0);
        let mountainBackLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Mountain_Back", backgroundTile, 0, 0).setDepth(0);
        let mountainLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Mountain", backgroundTile, 0, 0).setDepth(0);
        let undergroundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Underground", [castleTile, landTile], 0, 0).setDepth(0);
        let overUndergroundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Over_Underground", [castleTile, landTile, decorationTile], 0, 0).setDepth(0);
        let landLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Land", castleTile, 0, 0).setDepth(0);
        
        this.soulsLayer = this.map.createStaticLayer("Souls", soulTile, 0, 0).setDepth(1);
        this.portalLayer = this.map.createStaticLayer("Portal", portalTile, 0, 0).setDepth(1);
        this.spikeLayer = this.map.createStaticLayer("Spikes", decorationTile, 0, 0).setDepth(1); 
        this.chestLayer = this.map.createStaticLayer("Chest", chestTile, 0, 0).setDepth(1); 
    }

}

export { Main }