if [ "${1}" == "switch" ]; then
  if [ "${2}" == "" ]; then
    echo "Site name is required, Please check your babelrc file";
    exit 1
  fi

  if [ "${3}" == "" ]; then
    echo "Please specify the build name. eg: yarn switch m-fr web";
    exit 1
  fi

  echo "Removing the cache folder: ./node_modules/.cache. If you are managing caches in differen manner, please specify the npm command as last argument to remove the cache."
  if [ "${4}" == "" ]; then
    rm -rf ./node_modules/.cache # removing the cache, assuming your babel-loader is here.
  else 
    npm run-script $4
  fi

  if ! type "yarn" > /dev/null; then
    SITE=$2 npm run-script $3
  else
    SITE=$2 yarn $3
  fi
elif [ "${1}" == "init" ]; then
  react-native init $2 --template file:///Volumes/Extra/Packages/react-native-template-sphere
  if [ -d "${2}" ]; then
    cd ${2}
    node scripts/addDevDependencies.js
  fi
fi
 