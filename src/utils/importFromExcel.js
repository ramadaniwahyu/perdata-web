import React, { useState } from 'react'
import * as XLSX from 'xlsx';

const importFromExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
    };
    reader.readAsArrayBuffer(file);
    console.log(data)
    return data;
}

export default importFromExcel