import getAll from "./wilder.handlers/getAll";
import getOne from "./wilder.handlers/getOne";
import delete_ from "./wilder.handlers/delete";
import create from "./wilder.handlers/create";
import update from "./wilder.handlers/update";

const WilderController = {
  getAll: getAll,
  getOne: getOne,
  delete: delete_,
  create: create,
  update: update,
};

export default WilderController;
