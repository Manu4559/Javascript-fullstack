import {config} from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    config()
}

export default {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI
}