let DATA_STORE = []; // Replace with your database logic

// GET all items
exports.GET_ALL_ITEMS = async (req, res) => {
  try {
    const items = await fetchItemsFromDatabase(); // Replace with your DB fetch logic
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// CREATE a new item
exports.CREATE_ITEM = async (req, res) => {
  const NEW_ITEM = {
    ID: DATA_STORE.length + 1, // Simple ID generation logic; replace as needed
    ...req.body,
  };
  try {
    await saveItemToDatabase(NEW_ITEM); // Replace with your DB save logic
    DATA_STORE.push(NEW_ITEM);
    res.status(201).json(NEW_ITEM);
  } catch (error) {
    res.status(400).json({ message: "Error creating item", error });
  }
};

// READ an item by ID
exports.GET_ITEM_BY_ID = async (req, res) => {
  const ITEM = DATA_STORE.find((item) => item.ID === parseInt(req.params.id));
  try {
    if (!ITEM) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(ITEM);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// UPDATE an item by ID
exports.UPDATE_ITEM = async (req, res) => {
  const ITEM_INDEX = DATA_STORE.findIndex(
    (item) => item.ID === parseInt(req.params.id)
  );
  if (ITEM_INDEX === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  const UPDATED_ITEM = {
    ...DATA_STORE[ITEM_INDEX],
    ...req.body,
  };
  try {
    DATA_STORE[ITEM_INDEX] = UPDATED_ITEM; // Update in memory, replace with DB update logic
    res.status(200).json(UPDATED_ITEM);
  } catch (error) {
    res.status(400).json({ message: "Error updating item", error });
  }
};

// DELETE an item by ID
exports.DELETE_ITEM = async (req, res) => {
  const ITEM_INDEX = DATA_STORE.findIndex(
    (item) => item.ID === parseInt(req.params.id)
  );
  if (ITEM_INDEX === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  try {
    DATA_STORE.splice(ITEM_INDEX, 1); // Remove from memory, replace with DB delete logic
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};
