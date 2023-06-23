import * as couchbase from 'couchbase';

export default async function main() {
    const cluster = await couchbase.connect(process.env.CB_URL ?? 'couchbase://127.0.0.1', {
    username: process.env.CB_USER,
    password: process.env.CB_PASS
  })

  return cluster;
}
