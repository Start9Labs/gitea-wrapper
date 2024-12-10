import { sdk } from '../sdk'
import { setPrimaryUrl } from './set-primary-url'
import { registrations } from './registrations'
import { manageSmtp } from './manage-smtp'

export const actions = sdk.Actions.of()
  .addAction(setPrimaryUrl)
  .addAction(registrations)
  .addAction(manageSmtp)
