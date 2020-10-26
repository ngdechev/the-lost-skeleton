import { Player } from "../Player";

class Level1 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

    private player: Player;

    private spikeLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private soulsLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private portalLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private chestLayer: Phaser.Tilemaps.StaticTilemapLayer;

    constructor() {
        super("Level1");
    }

    create() {
        this.cameras.main.fadeIn(2000);
        
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

        this.player = new Player(this, 80, 600);
        this.add.existing(this.player);
        this.player.setSize(20, 40);
        this.player.setCollideWorldBounds(true);


        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Collions
        this.physics.add.collider(this.player, landLayer);
        landLayer.setCollisionByProperty({ collides: true});

        this.physics.add.collider(this.player, overUndergroundLayer);
        overUndergroundLayer.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, undergroundLayer);
        undergroundLayer.setCollisionByProperty({ collides: true });

        this.spikeLayer.setCollisionByProperty({ collider: true});

        this.soulsLayer.setCollisionByProperty({ soulCollides: true });

        this.portalLayer.setCollisionByProperty({ portalCollides: true });

        this.chestLayer.setCollisionByProperty({ chestCollides: true });

        // //debug
        // landLayer.renderDebug(this.add.graphics(), {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });
        // overUndergroundLayer.renderDebug(this.add.graphics(), {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });
        // undergroundLayer.renderDebug(this.add.graphics(), {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });

    }

    private collisionCheck() {
        if(this.physics.collide(this.player, this.spikeLayer)) {
            this.player.destroy();
            this.scene.restart();
        }

        //// collide with soul check one time add one time and then destroy the specific soul from the map
        if(this.physics.overlap(this.player, this.soulsLayer)) {
            //console.log("Soul collected");
        }

        if(this.physics.collide(this.player, this.portalLayer)) {
            console.log("Portal reached");
            this.scene.start("Level2");
        }

        //// same as soul level
        if(this.physics.collide(this.player, this.chestLayer)) {
            console.log("Chest collected");
        }
    }

    public update() {
        this.player.update();

       this.collisionCheck();
    }

}

export { Level1 }