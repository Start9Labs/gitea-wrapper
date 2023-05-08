import { setupMigrations } from '@start9labs/start-sdk/lib/inits/migrations/setupMigrations'
import { manifest } from '../../manifest'
import { v1_19_2 } from './v1_19_2'

/**
 * Add each new migration as the next argument to this function
 */
export const migrations = setupMigrations(manifest, v1_19_2)
