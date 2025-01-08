import CacheModel from './models/cache/Cache.model'
import SettingsModel from './models/settings/Settings.model'

const database = {
	cache: CacheModel,
	settings: SettingsModel,
}
global.database = database

export default database
