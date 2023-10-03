import express from 'express';
import { updateTask,deleteById, fetchAllTasks, fetchCompletedTasks, fetchPendingTasks, marksAsCompleted, saveTask, countTotal, countCompleted, countPending } from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/tasks' , saveTask);
taskRouter.get('/tasks/all' , fetchAllTasks);
taskRouter.get('/tasks/completed' , fetchCompletedTasks);
taskRouter.get('/tasks/pending' , fetchPendingTasks);
taskRouter.get('/tasks/totalTasks' , countTotal);
taskRouter.get('/tasks/completedTasks' , countCompleted);
taskRouter.get('/tasks/pendingTasks' , countPending);
taskRouter.delete('/tasks/:id',deleteById);
taskRouter.put('/tasks/:id/completed',marksAsCompleted);
taskRouter.put('/tasks/:id',updateTask);


export default taskRouter;