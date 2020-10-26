import { Player } from "../Player";

class Level2 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

    private player: Player;

    private soulsLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private portalLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private chestLayer: Phaser.Tilemaps.StaticTilemapLayer;

    constructor() {
        super("Level2");
    }

    create() {
        this.cameras.main.fadeIn(2000);
        
        this.map = this.make.tilemap({ key: "level2" });

        let tile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("elements", "atlas");
        let soulV2tile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Souls", "soulV2");
        let chestTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Chest", "chest");

        let groundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Ground", tile, 0, 0).setDepth(0);
        let decorationsLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Decorations", tile, 0, 0).setDepth(0);
        let wallsLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Walls", tile, 0, 0).setDepth(1);
        
        this.soulsLayer = this.map.createStaticLayer("Souls", soulV2tile, 0, 0).setDepth(1);
        this.portalLayer = this.map.createStaticLayer("Portals", tile, 0, 0).setDepth(1);
        this.chestLayer = this.map.createStaticLayer("Chest", chestTile, 0, 0).setDepth(1); 

        this.player = new Player(this, 80, 1500);
        this.add.existing(this.player);
        this.player.setSize(20, 40);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Collions
        this.physics.add.collider(this.player, wallsLayer);
        wallsLayer.setCollisionByProperty({ collides: true});

        this.soulsLayer.setCollisionByProperty({ soulCollider: true });

        this.portalLayer.setCollisionByProperty({ portalCollider: true });

        this.chestLayer.setCollisionByProperty({ chestCollider: true });

        // //debug
        // wallsLayer.renderDebug(this.add.graphics(), {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });

    }

    private collisionCheck() {
        //// collide with soul check one time add one time and then destroy the specific soul from the map
        if(this.physics.overlap(this.player, this.soulsLayer)) {
            //console.log("Soul collected");
        }

        if(this.physics.collide(this.player, this.portalLayer)) {
            console.log("Portal reached");
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

export { Level2 }