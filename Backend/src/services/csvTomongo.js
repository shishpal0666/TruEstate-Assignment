const parse = require("csv-parse");
const Transaction = require("../models/transactionsSchema");
const { normalizeRow } = require("../utils/normalizeCSV");

async function importFromCsvBuffer(buffer, options = {}) {
  const batchSize = options.batchSize || 500;
  const errors = [];
  let insertedCount = 0;

  return new Promise((resolve, reject) => {
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    let bufferDocs = [];

    parser.on("readable", async () => {
      let record;
      while ((record = parser.read()) !== null) {
        try {
          const doc = normalizeRow(record);
          bufferDocs.push(doc);
        } catch (errRow) {
          errors.push({ row: record, error: errRow.message });
        }

        if (bufferDocs.length >= batchSize) {
          try {
            const docsToInsert = bufferDocs.splice(0, bufferDocs.length);
            const res = await Transaction.insertMany(docsToInsert, {
              ordered: false,
            });
            insertedCount += res.length;
          } catch (err) {
            if (err && err.insertedDocs) {
              insertedCount += err.insertedDocs.length;
            }
            errors.push({ message: err.message });
          }
        }
      }
    });

    parser.on("error", (err) => {
      reject(err);
    });

    parser.on("end", async () => {
      if (bufferDocs.length > 0) {
        try {
          const res = await Transaction.insertMany(bufferDocs, {
            ordered: false,
          });
          insertedCount += res.length;
        } catch (err) {
          if (err && err.insertedDocs) {
            insertedCount += err.insertedDocs.length;
          }
          errors.push({ message: err.message });
        }
      }
      resolve({ insertedCount, errors });
    });

    parser.write(buffer);
    parser.end();
  });
}

module.exports = { importFromCsvBuffer };
