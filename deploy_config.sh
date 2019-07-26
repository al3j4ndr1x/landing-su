# !/bin/bash
# deploy_config.sh
# This script updates Firebase Environment Variables at deployment with CircleCI
# Note that sed on OSX and sed in Linux operate different ways
# with OSX you have to pass a dummy blank file with -i like 'sed -i "" <s command> <file>'

cd src/environments
sed 's/\(FIREBASE_API_KEY\)/'$FIREBASE_API_KEY'/' environment.prod.ts
sed 's/\(FIREBASE_AUTH_DOMAIN\)/'$FIREBASE_AUTH_DOMAIN'/' environment.prod.ts
sed 's/\(FIREBASE_DATABASE_URL\)/'$FIREBASE_DATABASE_URL'/' environment.prod.ts
sed 's/\(FIREBASE_PROJECT_ID\)/'$FIREBASE_PROJECT_ID'/' environment.prod.ts
sed 's/\(FIREBASE_STORAGE_BUCKET\)/'$FIREBASE_STORAGE_BUCKET'/' environment.prod.ts
sed 's/\(FIREBASE_MESSAGING_SENDER_ID\)/'$FIREBASE_MESSAGING_SENDER_ID'/' environment.prod.ts
sed 's/\(FIREBASE_APP_ID\)/'$FIREBASE_APP_ID'/' environment.prod.ts
cat environment.prod.ts
