import commander from 'commander'

import print from './commands/main';
import Cache from './utils/Cache';

commander
    .usage('<packageName>')
    .arguments('<packageName>')
    .action(async (packageName) => {
        await print(packageName);
    })
    // .command('cache <operate>', '操作缓存 目前只支持clean')
    // .usage('<operate>')
    // .action((operate) => {
    //     switch (operate) {
    //         case 'clean':
    //             Cache.clean()
    //     }
    // })
commander.parse(process.argv);