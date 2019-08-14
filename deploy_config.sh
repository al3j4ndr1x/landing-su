# !/bin/bash
# deploy_config.sh
# This script updates Firebase Environment Variables at deployment with CircleCI
# Note that sed on OSX and sed in Linux operate different ways
# with OSX you have to pass a dummy blank file with -i like 'sed -i "" <s command> <file>'

# Set Error Flags
# Exit script if you try to use an uninitialized variable.
set -o nounset

# Exit script if a statement returns a non-true return value.
set -o errexit

# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

cd src/environments
sed -i 's/\(FIREBASE_API_KEY\)/'$FIREBASE_API_KEY'/' environment.prod.ts
sed -i 's/\(FIREBASE_AUTH_DOMAIN\)/'$FIREBASE_AUTH_DOMAIN'/' environment.prod.ts
sed -i 's/\(FIREBASE_DATABASE_URL\)/'$FIREBASE_DATABASE_URL'/' environment.prod.ts
sed -i 's/\(FIREBASE_PROJECT_ID\)/'$FIREBASE_PROJECT_ID'/' environment.prod.ts
sed -i 's/\(FIREBASE_STORAGE_BUCKET\)/'$FIREBASE_STORAGE_BUCKET'/' environment.prod.ts
sed -i 's/\(FIREBASE_MESSAGING_SENDER_ID\)/'$FIREBASE_MESSAGING_SENDER_ID'/' environment.prod.ts
sed -i 's/\(FIREBASE_APP_ID\)/'$FIREBASE_APP_ID'/' environment.prod.ts
sed -i 's/\(FIREBASE_STAGING_API_KEY\)/'$FIREBASE_STAGING_API_KEY'/' environment.staging.ts
sed -i 's/\(FIREBASE_STAGING_PROJECT_ID\)/'$FIREBASE_STAGING_PROJECT_ID'/' environment.staging.ts
sed -i 's/\(FIREBASE_STAGING_MESSAGING_SENDER_ID\)/'$FIREBASE_STAGING_MESSAGING_SENDER_ID'/' environment.staging.ts
sed -i 's/\(FIREBASE_STAGING_APP_ID\)/'$FIREBASE_STAGING_APP_ID'/' environment.staging.ts

echo 'Updated Environment Variables'
