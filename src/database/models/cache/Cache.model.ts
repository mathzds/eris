import path from 'node:path'
import { QuickDB } from 'quick.db'

export default new QuickDB({
	filePath: path.resolve("src/database/models/cache/", 'cache.sqlite'),
})
