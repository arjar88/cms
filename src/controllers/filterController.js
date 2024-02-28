const Filter = require("../models/Filter");
const Data = require("../models/Data");
const Published = require("../models/Published");

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
    case "in":
      return { $in: value };
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

const executeQuery = async (
  objectId,
  filters,
  selectedProperties = undefined
) => {
  try {
    // Check if selectedProperties is provided
    const selection = selectedProperties
      ? selectedProperties.map((prop) => `values.${prop}`).join(" ")
      : undefined;
    const query = buildQuery(filters, objectId);
    const data = await Data.find({ $or: query }).select(selection);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getFiltered = async (req, res) => {
  const { id } = req.params;
  try {
    const filter = await Filter.findById(id);

    if (!filter) {
      return res.status(404).json({ error: "Filter not found" });
    }
    const data = await executeQuery(filter.objectId.toString(), filter.filters);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPublished = async (req, res) => {
  const { uuid } = req.params;
  try {
    const published = await Published.findOne({ uuid });
    if (!published) {
      return res.status(404).json({ error: "Published document not found" });
    }

    const filter = await Filter.findById(published.filtersId);
    if (!filter) {
      return res.status(404).json({ error: "Filter not found" });
    }

    const data = await executeQuery(
      filter.objectId.toString(),
      filter.filters,
      published.propertiesToShow
    );
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getFiltered, getPublished };
