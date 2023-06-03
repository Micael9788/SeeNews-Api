import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const mongooseHandlerApi = async (): Promise<void> => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("Você precisa criar MONGO_URL no arquivo .env");
  }

  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    throw new Error(`Ocorreu um erro na conexão com o MongoDB: ${error}`);
  }
};

export default mongooseHandlerApi;
