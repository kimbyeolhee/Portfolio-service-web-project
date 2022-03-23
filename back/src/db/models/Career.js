import { CareerModel } from "../schemas/career";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = await CareerModel.create(newCareer);
    return createdNewCareer;
  }
  static async findById({ id }) {
    const career = await CareerModel.findOne({ id });
    return career;
  }
}

export { Career };