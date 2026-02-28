import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js';

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();
    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "leave add error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ userId: id });
    const leaves = await Leave.find({ employeeId: employee._id });
    return res.status(200).json({ success: true, leaves });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "leave get error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" }
      ]
    });

    return res.status(200).json({ success: true, leaves });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "leave get error" });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name profileImage" },
      ],
    });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true, leave });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "leave get error" });
  }
};


const updateLeave = async (req,res) =>{
  try{
    const {id} =req.params;
    
    const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
    if(!leave){
      return res.status(400).json({success:false,error:"leave not found"})
    }
    return res.status(200).json({success: true})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "leave update error" });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail,updateLeave };
