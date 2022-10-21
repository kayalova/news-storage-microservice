import { createClient } from "redis"

export default createClient({
    // url: 'redis://127.0.0.1:6379', ??? excuse me
    url: process.env.REDIS_URL,
    legacyMode: true // what was that
})

