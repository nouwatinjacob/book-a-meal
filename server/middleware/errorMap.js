const errorMap = errors =>
  Object.keys(errors).reduce(
    (a, b) => {
      a[b] = errors[b][0]; // this would return the first error in the field
      return a;
    }
    , {}
  );
export default errorMap;