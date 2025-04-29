import Admin from "../models/ADMIN.js";
import Loginmapping from "../models/LOGINMAPPING.js";
import bcryptjs from "bcryptjs";

//Get All Admin
export const getAllAdmin = async (req, res) => {
  try {
    const allAdmindata = await Admin.find();
    if (!allAdmindata) {
      return res
        .status(200)
        .json({ message: "Admins Not available create one !!", data: [] });
    }
    return res.status(200).json({ message: "Admins...", data: allAdmindata });
  } catch (e) {
    return res.status(404).json({
      Message: "Something Went Wrong from getAllAdmin",
      error: e,
    });
  }
};

// Get Specific Admin by Id
export const getSpecificAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const adminavailable = await Admin.findById(id);
    if (!adminavailable) {
      return res
        .status(200)
        .json({ message: "Admin Not available with this ID ", data: [] });
    }

    return res
      .status(200)
      .json({ message: "Admin with this Id", data: adminavailable });
  } catch (e) {
    return res.status(404).json({
      Message: "Something Went Wrong from getSpecificAdmin",
      error: e,
    });
  }
};

// Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedadmin = await Admin.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    // console.log(updatedadmin);
    if (!updatedadmin) {
      return res.status(404).json({
        message: "admin with this Id admin Not Found Or update Not Happen",
        data: [],
      });
    }

    return res
      .status(200)
      .json({ message: "Admin Get updated", data: updatedadmin });
  } catch (e) {
    return res
      .status(404)
      .json({ Message: "Something Went Wrong from updateAdmin ", error: e });
  }
};
export const disableAdmin = async (req, res) => {
  try {
    const { admins } = req.body;
    await Promise.all(
      admins.map(async (item) => {
        await Admin.findByIdAndUpdate(item, { $set: { status: false } });
      })
    );
    res.status(200).json({ message: "Admins Disable" });
  } catch (e) {
    return res
      .status(404)
      .json({ Message: "Something Went Wrong from disableAdmin", error: e });
  }
};

export const enableAdmin = async (req, res) => {
  try {
    const { admins } = req.body;
    await Promise.all(
      admins.map(async (item) => {
        await Admin.findByIdAndUpdate(item, { $set: { status: true } });
      })
    );
    res.status(200).json({ message: "Admins Enable" });
  } catch (e) {
    return res
      .status(404)
      .json({ Message: "Something Went Wrong from enableAdmin", error: e });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const { newpassword } = req.body;

    if (!newpassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Step 1: Find admin and login mapping
    const findadmin = await Admin.findById(adminId);
    const findloginmapping = await Loginmapping.findOne({ mongoid: adminId });

    if (!findadmin || !findloginmapping) {
      return res.status(404).json({
        message: "Admin not found, operation cannot proceed",
        status: 404,
      });
    }

    // Optional: prevent reusing the same password
    const isSamePassword = await bcryptjs.compare(
      newpassword,
      findloginmapping.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from the old password",
        status: 400,
      });
    }

    // Step 2: Hash new password
    const newpasswordhash = await bcryptjs.hash(newpassword, 10);

    // Step 3: Update password
    await Loginmapping.findOneAndUpdate(
      { mongoid: adminId },
      { password: newpasswordhash },
      { new: true }
    );

    return res.status(200).json({
      message: "Password changed successfully",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};



// Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({
        message: "Admin with this Id Not Found",
        data: [],
      });
    }
    await Loginmapping.findOneAndDelete({ mongoid: id });
    return res.status(200).json({
      message: "Admin Deleted Successfully",
      data: deletedAdmin,
    });
  } catch (e) {
    return res
      .status(404)
      .json({ Message: "Something Went Wrong from deleteAdmin", error: e });
  }
};

//For get admin by id
export const getAdminById = async (req, res, next) =>{
  try{
    const {id} = req.params
  
    if(!id) return res.status(400).json({message:"Please provide admin id."})

    const admin = await Admin.findById(id)

    return res.status(200).json({message:"Admin retrived successfully.",data:admin})

  }catch(err){
    next(err)
  }
}