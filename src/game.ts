import 'phaser';
import { Boot } from './scene/Boot';
import { Preload } from './scene/Preload';
import { Level1 } from './scene/Level1';
import { Level2 } from './scene/Level2';
import { MainMenu } from './scene/MainMenu';
import { Level3 } from './scene/Level3';

class GameApp extends Phaser.Game {
    public static gameConfig: Phaser.Types.Core.GameConfig = null;

    constructor(config: Phaser.Types.Core.GameConfig) {
        GameApp.gameConfig = {
            type: Phaser.AUTO,
            parent: "content",
            backgroundColor: '#fff',
            width: 1600,
            height: 940,
            physics: {
                default: "arcade",
                arcade: {
                    debug: true,
                    gravity: {y: 200}
                }
            },
            scene: [Boot, Preload, Level1, Level2, Level3, MainMenu]
        };

        super(GameApp.gameConfig);
    }
}

export { GameApp }

new GameApp(null);
