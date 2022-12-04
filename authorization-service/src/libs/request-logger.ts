import middy from '@middy/core'

export const requestLogger = (handler: Function): middy.MiddlewareObj => {

  const logger = async (event) => {
    const handlerName = handler?.name || ''
    const handlerNameStr = handlerName
      ? `[${handlerName}] `
      : ''

    console.log(`${handlerNameStr}Request Event: `, event);
  };

  return {
    before: logger
  };
};