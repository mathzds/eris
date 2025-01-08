import path from 'node:path'
import { QuickDB } from 'quick.db'

export interface ISettingsUser {
	ephemeral: boolean
}

export interface ISettingsGuild {
	language: 'pt-BR' | 'en-US'
}

type SettingsUnion = ISettingsUser | ISettingsGuild

export default new QuickDB<SettingsUnion>({
	filePath: path.resolve("src/database/models/settings/", 'settings.sqlite'),
})
