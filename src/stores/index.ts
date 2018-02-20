import { storeInstruments } from './instruments'
import { storeMedia } from './media'

/** Store of the app */
export const stores = {
  storeInstruments,
  storeMedia
}

/** Type of the store */
export type Stores = typeof stores
