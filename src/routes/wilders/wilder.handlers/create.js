import WilderService from "../../../services/Wilder.service";

const createWilder = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    let wilder = await new WilderService().createWilder({
      firstName,
      lastName,
      email,
    });
    return res.status(200).json(wilder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default createWilder;
