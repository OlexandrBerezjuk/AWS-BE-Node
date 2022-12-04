import middy from '@middy/core'

import { requestLogger } from '@libs/request-logger';

export const lambdaWrapper = (handler) => {
  try {
    return middy(handler)
      .use(requestLogger(handler))
  } catch (error) {
    console.error('[Finish With Error]: ', error)
  }
}
