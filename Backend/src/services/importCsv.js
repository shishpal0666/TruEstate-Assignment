const path = require("path");
const fs = require("fs");
const csvParseModule = require("csv-parse");
const { connectDB } = require("../utils/connectDB");
const Transaction = require("../models/transactionsSchema");
const { normalizeRow } = require("../utils/normalizeCSV");

const parse =
  (csvParseModule && (csvParseModule.parse || csvParseModule)) ||
  (() => {
    throw new Error(
      "csv-parse module not found or has unexpected export shape. Install csv-parse@^5.0.0"
    );
  })();

async function importCsvFile(filePath, options = {}) {
  const batchSize = options.batchSize || 500;
  let insertedCount = 0;
  const errors = [];

  return new Promise((resolve, reject) => {
    const parser = fs.createReadStream(filePath).pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      })
    );

    let bufferDocs = [];
    let reading = true;

    const flushBatch = async () => {
      if (bufferDocs.length === 0) return;
      const docs = bufferDocs.splice(0, bufferDocs.length);
      try {
        const res = await Transaction.insertMany(docs, { ordered: false });
        insertedCount += Array.isArray(res) ? res.length : 0;
      } catch (err) {
        if (err && Array.isArray(err.insertedDocs)) {
          insertedCount += err.insertedDocs.length;
        }
        errors.push({ message: err.message });
      }
    };

    parser.on("data", async (record) => {
      try {
        const doc = normalizeRow(record);
        bufferDocs.push(doc);
      } catch (errRow) {
        errors.push({ row: record, error: errRow.message });
      }

      if (bufferDocs.length >= batchSize) {
        if (parser.pause) parser.pause();
        try {
          await flushBatch();
        } catch (err) {
          errors.push({ message: "Flush batch error: " + err.message });
        } finally {
          if (parser.resume) parser.resume();
        }
      }
    });

    parser.on("end", async () => {
      try {
        await flushBatch();
        resolve({ insertedCount, errors });
      } catch (err) {
        reject(err);
      }
    });

    parser.on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      "Usage: node src/services/importCsv.js /full/path/to/file.csv"
    );
    process.exit(1);
  }
  const filePath = path.resolve(arg);
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }

  try {
    await connectDB();
    console.log("Connected to MongoDB. Starting import for", filePath);

    const { insertedCount, errors } = await importCsvFile(filePath, {
      batchSize: 500,
    });
    console.log("Import finished. insertedCount =", insertedCount);
    if (errors.length) {
      console.warn("Some errors occurred during import. Sample:");
      console.warn(JSON.stringify(errors.slice(0, 10), null, 2));
    } else {
      console.log("No errors.");
    }
    process.exit(0);
  } catch (err) {
    console.error("Import failed:", err && err.message ? err.message : err);
    if (err && err.message && /csv-parse/i.test(err.message)) {
      console.error(
        "Hint: try installing csv-parse@^5.0.0: npm install csv-parse@^5"
      );
    }
    process.exit(2);
  }
}

if (require.main === module) {
  main();
}

module.exports = { importCsvFile };
