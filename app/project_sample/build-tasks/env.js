import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const getEnv = () => {
  const activeEnvs = {};
  const envs = [
    'development',
    'production',
  ];
  envs.forEach(env => {
    activeEnvs[env] = args[env];
  });
  return activeEnvs;
};

export default getEnv;
