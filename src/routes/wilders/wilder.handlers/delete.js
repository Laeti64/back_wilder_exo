import WilderService from "../../../services/Wilder.service";

const deleteWilder = async (req, res) => {
  try {
    const { id } = req.params;
    let wilderToDelete = await new WilderService().deleteWilder(id);
    return res.status(200).json(`Wilder with id ${id} has been deleted`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default deleteWilder;
