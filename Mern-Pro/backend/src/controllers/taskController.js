import { StatusCodes } from "http-status-codes";
import { taskmodel } from "../models/taskModel.js";

export async function saveTask(request, response) {
  try {
    const currDate = new Date();
    request.body["deadline"] = new Date(request.body.deadline);
    const task = new taskmodel({ ...request.body, createdOn: currDate });
    const insertedTask = await task.save();
    response.status(StatusCodes.CREATED).json(insertedTask);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json("sorry! error");
    console.log(error);
  }
}

export async function fetchAllTasks(request, response) {
  try {
    const allTasks = await taskmodel.find().sort({"isCompleted":1}); 
    response.status(StatusCodes.OK).json(allTasks);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function fetchCompletedTasks(request, response) {
  try {
    const tasksCompleted = await taskmodel.find({ isCompleted: true });
    if (tasksCompleted.length > 0) {
      response.status(StatusCodes.OK).json(tasksCompleted);
    } else {
      response.status(StatusCodes.NO_CONTENT).json();
    }
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function fetchPendingTasks(request, response) {
  try {
    const tasksUncompleted = await taskmodel.find({ isCompleted: false });
    if (tasksUncompleted.length > 0) {
      response.status(StatusCodes.OK).json(tasksUncompleted);
    } else {
      response.status(StatusCodes.NO_CONTENT).json();
    }
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function deleteById(request, response) {
  try {
    await taskmodel.findByIdAndDelete(request.params.id);
    response.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function marksAsCompleted(request ,response){
  try {
    await taskmodel.findByIdAndUpdate(request.params.id ,{isCompleted:true , completedOn:new Date()});
    response.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();    
  }
}

export async function updateTask(request ,response){
  try {
    await taskmodel.findByIdAndUpdate(request.params.id ,request.body);
    response.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();    
  }
}


export async function countTotal(request , response){
  try {
    const result = await taskmodel.aggregate().group({_id:'null' , totalTasks:{$count:{}}})
      console.log("inside try block");
    response.status(StatusCodes.OK).json(result);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}
export async function countCompleted(request , response){
  try {
    const result = await taskmodel.aggregate().match({isCompleted:true}).group({'_id':'null' , 'completedTasks':{$count:{}}});
    response.status(StatusCodes.OK).json(result);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}


export async function countPending(request , response){
  try {
    const result = await taskmodel.aggregate().match({isCompleted:false}).group({_id:'null' , 'pendingTasks':{$count:{}}});    
    response.status(StatusCodes.OK).json(result);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}