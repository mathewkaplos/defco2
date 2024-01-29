import QueryString from 'qs';

export function objectToQuery(object: unknown) {
  return QueryString.stringify(object, {
    skipNulls: true,
    arrayFormat: 'brackets',
  });
}
