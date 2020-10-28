import { Player } from "../actors/Player";

class Level2 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

    private player: Player;

    private soulScore: number = 0;
    private scoreText: Phaser.GameObjects.Text;
    private readonly maxSouls: number = 11;
    private chestCollected: boolean = false;
    private chestCounter: number = 0;
    private readonly maxChest: number = 1;

    private soul: any;
    private portal: any;
    private chest: any;

    private soulsLayer: any;
    private portalLayer: any;
    private chestLayer: any;

    constructor() {
        super("Level2");
    }

    create() {
        this.cameras.main.fadeIn(2000);

        this.map = this.make.tilemap({ key: "level2" });

        let tile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("elements", "atlas");
        let newSoultile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Souls", "newSoul");
        let chestTile: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("Chest", "chest");

        let backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background", tile, 0, 0).setDepth(0);
        let decorationsLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Decorations", tile, 0, 0).setDepth(0);
        let wallsLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Walls", tile, 0, 0).setDepth(0);

        let welcomeText: Phaser.GameObjects.Text = this.add.text(150, 1200, `Welcome to level 2. \nControl the player with arrows.\nYou have to collect ${this.maxSouls} souls and to open ${this.maxChest} chest.\nHave fun!\n\nHint: you can use double jump - press space key while you are in the air!`, { textShadow: "2px 2px #fff" });
        setTimeout(() => {
            welcomeText.destroy();
        }, 7000);

        this.soulsLayer = this.map.getObjectLayer("Souls")['objects'];
        this.portalLayer = this.map.getObjectLayer("Portal")['objects'];
        this.chestLayer = this.map.getObjectLayer("Chest")['objects'];

        this.player = new Player(this, 80, 1500);
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

        this.physics.add.collider(this.player, wallsLayer);
        wallsLayer.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, this.soulsLayer);

        this.physics.add.overlap(this.player, this.soul, this.collectSouls, null, this);

        this.physics.add.overlap(this.player, this.chest, this.openChest, null, this);

        this.physics.add.overlap(this.player, this.portal, this.portalCollide, null, this);

        // Score
        this.scoreText = this.add.text(20, 20, `Souls: ${this.soulScore}`, {
            fontSize: '20px',
            fill: '#ffffff',
        });
        this.scoreText.setScrollFactor(0);

        // //debug
        // wallsLayer.renderDebug(this.add.graphics(), {
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
        if (this.soulScore == this.maxSouls && this.chestCollected == true) {
            let text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Congrats, you have collected souls ${this.soulScore} souls and opened ${this.chestCounter} chests.`);
            setTimeout(() => {
                text.destroy();
                this.scene.start("Level3");
            }, 1500);
        } else {
            let text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `You need to collect ${this.maxSouls - this.soulScore} more souls for reaching level 2!`);
            setTimeout(() => {
                text.destroy();
            }, 4000);
        }
    }

    public update() {
        this.player.update();
    }

}

export { Level2 }