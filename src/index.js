/**
 * 入口文件
 */

import commander from 'commander'

import print, {printPath} from './commands/main';
import Cache from './utils/Cache';

commander
    .usage('<rootPackageName> [targetPackageName]')
    .arguments('<rootPackageName> [targetPackageName]')
    .action(async (rootPackageName, targetPackageName) => {
        if (targetPackageName) {
            printPath(rootPackageName, targetPackageName);
        }
        else {
            await print(rootPackageName);
        }
    })

commander
    .command('cache <cmd>')
    .usage('<cmd>')
    .action((cmd, command) => {
        switch(cmd) {
            case 'clean': 
                Cache.clean();
        }
    });

commander.parse(process.argv);

