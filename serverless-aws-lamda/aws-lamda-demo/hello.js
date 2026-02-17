exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello Krishna! Hope you like Serverless and AWS - Lamda",
    }),
  };
};
