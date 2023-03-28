import WilderService from "../../../services/Wilder.service";

const updateWilder = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    let wilderToUpdate = new WilderService().updateWilder(id, {
      firstName,
      lastName,
      email,
    });
    return `Wilder with id ${id} has been updated`;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default updateWilder;
