import portal from './portal'
import assessment from './assessment'

// @TODO: dynamic import of route?

import { isPortal } from '../util/env-util'
export default isPortal() ? portal : assessment
