import WilderService from "../../../services/Wilder.service";

const getAllWilders = async (req, res) => {
  try {
    let wilders = await new WilderService().getAllWilders();
    return res.status(200).json(wilders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default getAllWilders;
