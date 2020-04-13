import qs from 'qs';

export const queryStringMiddleware = async (ctx, next) => {
  const { query } = ctx;

  ctx.queryParsed = qs.parse(query);

  await next();
};
