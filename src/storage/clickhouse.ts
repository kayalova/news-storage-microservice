import { createClient } from '@clickhouse/client'

const client = createClient({
    host: `https://localhost:8123`,
    password: '3520',
    database: 'newsmicroservice',
    log: {
        enable: true
    }
})