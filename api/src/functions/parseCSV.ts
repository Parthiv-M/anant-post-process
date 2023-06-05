import fs from "fs";
import { parse } from "csv-parse/sync";

const parseCSV = (fileName: string, columnToFind: string) => {
    const fileContent = fs.readFileSync(process.env.TRAIN_DATA_DIR_PATH + "/" + fileName, { encoding: 'utf-8' });
    let columnData: string[] = [];
    const rows = parse(fileContent);
    const headers = rows[0];
    if (headers.includes(columnToFind)) {
        const requiredColumnIndex: number = headers.indexOf(columnToFind);
        // skip the header row while sending back column data
        rows.slice(1,).forEach((row: any) => { columnData.push(row[requiredColumnIndex]) });
        return columnData;
    }
    return null;
}

export default parseCSV;