import mongoose from 'mongoose';

const bd = () => {
  mongoose.connect('mongodb+srv://admin:admin@cluster0.rdvin0r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));
};

export default bd;

