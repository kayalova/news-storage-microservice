import { createClient } from '@clickhouse/client'

export default createClient({
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
    database: process.env.CLICKHOUSE_DB,
    host: process.env.CLICKHOUSE_URL,
    log: {
        enable: true
    }
})
