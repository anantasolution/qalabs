import Admin from "../models/ADMIN.js";

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
