import mongoose from "mongoose"

export const ConnectDb = async () => {
    await mongoose.connect('mongodb+srv://omprakash:omprakash@cluster0.l64tx.mongodb.net/todo-app')
console.log('db connected')
}