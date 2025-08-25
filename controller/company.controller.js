import Company from "../model/company.model.js";

export const getCompany = async (req, res) => {
  try {
    const company = await Company.find();
    res.status(200).json(company); // ✅ fixed status
  } catch (err) {
    console.log("Error:", err);     // ✅ fixed error reference
    res.status(500).json(err);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = await Company.findOne({ id: id });
    
    if (!companyId) {
      return res.status(404).json({ message: "Company not found" });
    }
    
    res.status(200).json(companyId);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json(err);
  }
};