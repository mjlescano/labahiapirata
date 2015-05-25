module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/Users/tout/Sites/labahiapirata',
      repositoryUrl: 'git@github.com:mjlescano/labahiapirata.git',
      ignores: [ '.git', 'node_modules' ],
      rsync: [ '--del' ],
      keepReleases: 2,
      key: '/Users/tout/.ssh/id_rsa.pub',
      shallowClone: true
    },
    production: {
      servers: 'user@myserver.com',
      deployTo: '/home/lbp/Sites/labahiapirata',
      branch: 'master'
    }
  });
};