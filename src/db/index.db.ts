import {
  Bucket,
  Cluster,
  Collection,
  connect,
  ConnectOptions,
  GetResult,
  QueryResult,
} from 'couchbase';

async function main() {
  const clusterConnStr = 'couchbase://localhost'
  const username = 'admin'
  const password = 'monpetitgazon'
  const bucketName = 'mpg'

  const cluster = await connect(clusterConnStr, {
    username: username,
    password: password,
  })

  const bucket: Bucket = cluster.bucket(bucketName);
}

main();
