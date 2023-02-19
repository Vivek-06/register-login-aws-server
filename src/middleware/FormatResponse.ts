const formatResponse = (
  statusCode: number,
  error: boolean = false,
  errorCode: any = '',
  message: string,
  data: any
) => {
  return { statusCode, error, errorCode, message, data };
};

export default formatResponse;
