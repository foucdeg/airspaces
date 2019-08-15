/* eslint import/no-extraneous-dependencies: 0 */
const shipitDeploy = require('shipit-deploy');

module.exports = function shipitConfig(shipit) {
  shipitDeploy(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/airspaces',
      dirToCopy: 'frontend/build',
      deployTo: '/home/fouc/airspaces',
      repositoryUrl: 'https://github.com/foucdeg/airspaces',
      ignores: ['.git'],
      keepReleases: 3,
      deleteOnRollback: false,
      shallowClone: true,
    },
    vps: {
      servers: [
        {
          host: 'vps',
          user: 'fouc',
        },
      ],
    },
    konstantin: {
      servers: [
        {
          host: 'konstantin',
          user: 'root',
        },
      ],
      deployTo: '/var/www/x-plane-map-api',
      branch: 'konstantin-icons',
    },
  });

  shipit.blTask('build-client', async () => {
    await shipit.local(`cd ${shipit.workspace}/frontend && yarn && yarn build`);
  });

  shipit.on('fetched', () => {
    shipit.start('build-client');
  });
};
