const { importFromCsvBuffer } = require("../services/csvTomongo");

const health = (req, res) => res.json({ status: "ok" });

const importCSV = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res
      .status(400)
      .json({ error: 'CSV file is required in form field "file"' });
  }

  try {
    const { insertedCount, errors } = await importFromCsvBuffer(
      req.file.buffer,
      { batchSize: 500 }
    );
    return res.json({ insertedCount, errors });
  } catch (err) {
    console.error("Import failed", err);
    return res
      .status(500)
      .json({ error: "Import failed", details: err.message });
  }
};

module.exports = { health, importCSV };