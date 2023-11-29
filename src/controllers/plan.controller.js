const { planService } = require("../services");

const createPlan = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "++++++Plan");
    const plan = await planService.createPlan(reqBody);
    if (!plan) {
      throw new Error("no such Plan");
    }
    res.status(200).json({
      message: "Successfully created a new Plan",
      success: true,
      data: { plan },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPlanList = async (req, res) => {
  try {
    let plan = await planService.getPlanList(req, res);
    res.status(200).json({
      message: "successfully fetched all Plan",
      status: true,
      data: plan ,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPlanId = async (req, res) => {
  try {
   const  plan=await planService.getPlanById(req.params.planId)
    console.log(req.params.planId);
    if (!plan) {
      throw new Error("No Such Plan Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${plan._id}`,
      data: { plan },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deletePlan = async (req, res) => {
    try {
      const planId = req.params.planId;
      const plan = await  planService.getPlanById(planId);
      if (!plan) {
        throw new Error("pets not found!");
      }
  
      await planService.deletePlan(planId);
  
      res.status(200).json({
        success: true,
        message: "Plan delete successfully!",
        data: plan,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

const updatePlan = async (req, res) => {
  try {
    const planId = req.params.planId;
    const plan = await planService.getPlanById(planId);
    if (!plan) {
      throw new Error("Plan does not exist");
    }
    await planService.updatePlan(planId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { plan },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { createPlan, getPlanList, getPlanId, deletePlan,updatePlan };