const task = require("../models/task");
const wrapper = require("../middleware/async-wrapper");
const {createCustomError} = require("../error/custom-error");


// to avoid try catch block in every function we will wrap them in another function which handles the 
// error, getAll -> wrapper(with anonymous function), which handles the error from the function

//the parameters to wrapper will be req, res (and next by defualt) and additional anonymous function
// so req, res, next can be used in wrapper to call the function


const getAll = wrapper(async (req, res, next) => {
    const tasks = await task.find({});
    res.status(200).json({tasks});
});

const getOne = wrapper(async (req, res, next) => {
    const {id:taskID} = req.params;
    const task1 = await task.findOne({_id:taskID});
    if(!task1){
        const error = createCustomError(`No task with id ${taskID}`, 404);
        return next(createCustomError(`No task with id ${taskID}`, 404));
        // return res.status(404).json({msg:`No task with id ${taskID}`});
    }
    res.status(200).json(task1);
});

const create = wrapper (async (req, res, next) => {
    const task1 = await task.create(req.body); //only the keys that are in schema will be used
    res.status(200).json({task1});
});

const update = wrapper(async (req, res, next) => {
    const {id:taskID} = req.params;
    const task1 = await task.findOneAndUpdate({_id:taskID},req.body, {new: true})
    if(!task1){
            // return res.status(404).json({msg:`No task with id ${taskID}`});
            return next(createCustomError(`No task with id ${taskID}`, 404));
    }
        // if(!task1.acknowledged){
        //     return res.status(500).json({msg:"Request not acknowleged."});
        // }
        // if(!task1.matchedCount){
        //     return res.status(404).json({msg:`No task with id ${taskID}`});
        // }
        // if(task1.modifiedCount){
        // //    return res.status(200).json(task1);
        //    return res.status(200).json(task1);
        // }
    return res.status(200).json(task1);
});

const deleteOne = wrapper (async (req, res, next) => {
    const {id:taskID} = req.params;
    const task1 = await task.deleteOne({_id:taskID})
    if(!task1){
        return next(createCustomError(`No task with id ${taskID}`, 404));
        // return res.status(404).json({msg:`No task with id ${taskID}`});
    }
    // if(!task1.acknowledged){
    //     return res.status(500).json({msg:"some error occured"});
    // }
    // if(task1.deletedCount){
    // //    return res.status(200).json(task1);
    //    return res.status(200).json(task1);
    // }
    //     res.status(500).json({msg:"task not deleted!"});
    return res.status(200).json(task1);
})

module.exports = {getAll, getOne, create, update, deleteOne};