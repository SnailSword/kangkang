/**
 * 入口文件
 */

import commander from 'commander'

import print from './commands/main';
import Cache from './utils/Cache';

commander
    .usage('<packageName>')
    .arguments('<packageName>')
    .action(async (packageName) => {
        await print(packageName);
    })

commander.command('cache [operate]')
    .action((operate) => {
        switch (operate) {
            case 'clean':
                Cache.clean()
        }
    })

commander.parse(process.argv);

