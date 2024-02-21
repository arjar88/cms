const mongoose = require("mongoose");
const Filter = require("../models/Filter");
const Data = require("../models/Data");

const getMongoDBOperator = (operator, value) => {
  switch (operator) {
    case "=":
      return { $eq: value };
    case ">":
      return { $gt: value };
    case "<":
      return { $lt: value };
    case ">=":
      return { $gte: value };
    case "<=":
      return { $lte: value };
    case "!=":
      return { $ne: value };
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};

//function recives filters and builds the query out of it.
const buildQuery = (filters, objectId) => {
  return filters.map((andScope) => {
    return {
      $and: [
        //only filter over data of associated object
        { objectId: objectId },
        ...andScope.map((filter) => {
          return {
            //to query over data,must add values prefix property
            [`values.${filter.property}`]: getMongoDBOperator(
              filter.operator,
              filter.value
            ),
          };
        }),
      ],
    };
  });
};

const getFiltered = async (req, res) => {
  const { id } = req.params;
  try {
    const filter = await Filter.findById(id);

    if (!filter) {
      return res.status(404).json({ error: "Filter not found" });
    }

    const objectId = filter.objectId.toString();
    const query = buildQuery(filter.filters, objectId);
    const data = await Data.find({ $or: query });
    console.log(data, "filtered data");
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { getFiltered };
