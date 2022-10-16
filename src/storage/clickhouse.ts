import { createClient } from '@clickhouse/client'

const client = createClient({
    host: `http://localhost:8123`,
    password: '3520',
    database: 'newsmicroservice',
    log: {
        enable: true
    }
})

export default client