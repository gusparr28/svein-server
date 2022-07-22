const { SWAGGER_USERNAME, SWAGGER_PASSWORD } = process.env;

const validate = async (
  username: string,
  password: string,
) => {
  if (username !== SWAGGER_USERNAME && password !== SWAGGER_PASSWORD) {
    return new Error('Unauthorized');
  }
};

export default validate;
