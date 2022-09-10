export const numberTransformer = {
  to: (value) =>
    typeof value === 'string'
      ? +value.replace(/(\(|\)| |%|,)/g, '').replace('%', '')
      : +value,
  from: (value) => value,
};
