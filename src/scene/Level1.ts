import { Player } from "../actors/Player";

class Level1 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

    private soulScore: number = 0;
    private scoreText: Phaser.GameObjects.Text;
    private readonly maxSouls: number = 7;
    private chestCollected: boolean = false;
    private chestCounter: number = 0;
    private readonly maxChest: number = 1;
    private player: Player;

    private soul: any;
    private portal: any;
    private chest: any;

    private spikeLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private soulsLayer: any;
    private portalLayer: any;
    private chestLayer: any;

    constructor() {
        super("Level1");
    }

    create() {
        this.cameras.main.fadeIn(2000);

        this.map = this.make.tilemap({ key: "level1" });

        let backgroundTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Background", "background");
        let castleTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Castle", "castle");
        let landTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Decorations", "land");
        let decorationTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Web_Decorations", "decoration");
        let portalTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Portals", "portal");

        let backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background", backgroundTile, 0, 0).setDepth(0);
        let mountainBackLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Mountain_Back", backgroundTile, 0, 0).setDepth(0);
        let mountainLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Mountain", backgroundTile, 0, 0).setDepth(0);
        let undergroundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Underground", [castleTile, landTile], 0, 0).setDepth(0);
        let overUndergroundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Over_Underground", [castleTile, landTile, decorationTile], 0, 0).setDepth(0);
        let landLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Land", [castleTile, portalTile], 0, 0).setDepth(0);
        this.spikeLayer = this.map.createStaticLayer("Spikes", decorationTile, 0, 0).setDepth(0);

        let welcomeText: Phaser.GameObjects.Text = this.add.text(150, 450, `Welcome to level 1. \nControl the player with arrows.\nYou have to collect ${this.maxSouls} souls and to open ${this.maxChest} chest.\nHave fun!`, {textShadow: "2px 2px #fff"});
        setTimeout(() => {
            welcomeText.destroy();
        }, 5000);
        
        this.soulsLayer = this.map.getObjectLayer("Souls")['objects'];
        this.portalLayer = this.map.getObjectLayer("Portal")['objects'];
        this.chestLayer = this.map.getObjectLayer("Chest")['objects'];

        this.player = new Player(this, 80, 700);
        this.add.existing(this.player);
        this.player.setSize(20, 40);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.soul = this.physics.add.staticGroup();

        this.soulsLayer.forEach(object => {
            let obj = this.soul.create(object.x, object.y, "newSoul");
            obj.body.width = object.width;
            obj.body.height = object.height;
            obj.setPositionY += 20;
        });

        this.chest = this.physics.add.staticGroup();

        this.chestLayer.forEach(object => {
            let obj = this.chest.create(object.x, object.y, "chest");
            obj.body.width = object.width;
            obj.body.height = object.height;
            obj.setPositionY += 20;
        });

        this.portal = this.physics.add.staticGroup();

        this.portalLayer.forEach(object => {
            let obj = this.portal.create(object.x, object.y, "greenPortal");
            obj.body.width = object.width;
            obj.body.height = object.height;
            obj.setPositionY += 20;
            obj.setScale(0.5);
        });

        // Collions
        this.physics.add.collider(this.player, landLayer);
        landLayer.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, overUndergroundLayer);
        overUndergroundLayer.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, undergroundLayer);
        undergroundLayer.setCollisionByProperty({ collides: true });

        this.physics.add.overlap(this.player, this.soul, this.collectSouls, null, this);

        this.physics.add.overlap(this.player, this.chest, this.openChest, null, this);

        this.physics.add.overlap(this.player, this.portal, this.portalCollide, null, this);

        this.spikeLayer.setCollisionByProperty({ collider: true });

        this.scoreText = this.add.text(20, 20, `Souls: ${this.soulScore}`, {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: ""
        });
        this.scoreText.setScrollFactor(0);

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

    private collectSouls(player, soul) {
        soul.destroy(soul.x, soul.y); // remove the tile/coin
        this.soulScore++; // increment the score
        this.scoreText.text = `Souls: ${this.soulScore}` // set the text to show the current score
        return false;
    }

    private openChest() {
        this.chestCollected = true;
        this.chestCounter++;
        console.log("Chest collected");
    }

    private portalCollide() {
        if (this.soulScore == this.maxSouls && this.chestCollected == true){
            let text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Congrats, you have collected souls ${this.soulScore} souls and opened ${this.chestCounter} chests.`);
            setTimeout(() => {
                text.destroy();
                this.scene.start("Level2");
            }, 1500);
        } 
        else {
            let text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `You need to collect ${this.maxSouls - this.soulScore} more souls for reaching level 2!`);
            setTimeout(() => {
                text.destroy();
            }, 4000);
        }
    }

    private collisionCheck() {
        if (this.physics.collide(this.player, this.spikeLayer)) {
            let text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `You died. Collected souls: ${this.soulScore}, Opened chests: ${this.chestCounter}.`);
            setTimeout(() => {
                text.destroy();
            }, 1500);

            setTimeout(() => {
                this.scene.restart();
                this.soulScore = 0;
                this.chestCounter = 0;
            }, 1500);
        }
    }

    public update() {
        this.player.update();

        this.collisionCheck();
    }

}

export { Level1 }