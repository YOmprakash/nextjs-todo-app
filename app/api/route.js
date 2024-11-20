import { ConnectDb } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";


const LoadDb = async() => {
    await ConnectDb();

}

LoadDb();

export async function GET(request){
    const todos = await TodoModel.find({})
    console.log(todos)
    return NextResponse.json({todos:todos})
}

export async function POST(request){
    const{title,description} = await request.json()

    await TodoModel.create({
        title,
        description
    })
    return NextResponse.json({msg:'post method hit'})
}

export async function DELETE(request){
    const mongoId = await request.nextUrl.searchParams.get('mongoId')
       await TodoModel.findByIdAndDelete(mongoId);
    return NextResponse.json({msg:'todo is deleted'})
}

export async function PUT(request){
    const mongoId = await request.nextUrl.searchParams.get('mongoId')
       await TodoModel.findByIdAndUpdate(mongoId,{
        $set:{
            isCompleted:true
        }
       });
    
    return NextResponse.json({msg:'todo completed'})
}
