/* eslint import/no-extraneous-dependencies: 0 */
const shipitDeploy = require('shipit-deploy');
const shipitYarn = require('shipit-yarn');

module.exports = function shipitConfig(shipit) {
  shipitDeploy(shipit);
  shipitYarn(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/x-plane-map-api',
      deployTo: '/home/fouc/x-plane-map-api',
      repositoryUrl: 'https://github.com/foucdeg/x-plane-map-api',
      ignores: ['.git'],
      keepReleases: 3,
      deleteOnRollback: false,
      shallowClone: true,
      updateSubmodules: true,
      yarn: {
        remote: true,
      },
    },
    konstantin: {
      servers: [
        {
          host: 'konstantin',
          user: 'root',
        },
      ],
      deployTo: '/var/www/x-plane-map-api',
      branch: 'konstantin-icons'
    },
  });

  shipit.blTask('build-client', async () => {
    await shipit.remote(`cd ${shipit.releasePath}/client && yarn && yarn build`);
    shipit.emit('client_built');
  });

  shipit.task('chmod-release', async () => {
    await shipit.remote(`chmod a+x ${shipit.releasePath}`);
  });

  shipit.task('pm2-reload', async () => {
    await shipit.remote('pm2 reload ecosystem.config.js --only x-plane-map-api');
    shipit.emit('reloaded');
  });

  shipit.on('updated', () => {
    shipit.start('chmod-release');
  });

  shipit.on('yarn_installed', () => {
    shipit.start('build-client');
  });

  shipit.on('deployed', () => {
    shipit.start('pm2-reload');
  });
};
