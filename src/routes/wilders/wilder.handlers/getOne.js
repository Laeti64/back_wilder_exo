import WilderService from "../../../services/Wilder.service";

const getOneWilder = async (req, res) => {
  try {
    const { id } = req.params;
    let wilder = await new WilderService().getWilderById(id);
    return res.status(200).json(wilder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default getOneWilder;
