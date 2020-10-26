import 'phaser';
import { Boot } from './scene/Boot';
import { Preload } from './scene/Preload';
import { Main } from './scene/Main';

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
                }
            },
            scene: [Boot, Preload, Main]
        };

        super(GameApp.gameConfig);
    }
}

export { GameApp }

new GameApp(null);
