const fs = require('fs');
const fetch = require('node-fetch');
const baseFolderPath = `${process.cwd()}/src/pages/api/cached`;

export const fetchDataAndStore = async (endpointUrl, fileName, hoursThreshold) => {
  const [folder, file] = fileName.split('/');
  const folderName = `${baseFolderPath}/${folder}`
  const filePath = `${folderName}/${file}`;

  try {
    let jsonData = null;
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Read the stored data from the file
      const fileData = fs.readFileSync(filePath, 'utf8');
      jsonData = JSON.parse(fileData);
      const { updateDate, data } = jsonData;

      const lastModified = new Date(updateDate);
      const currentDateTime = new Date();

      // Calculate the threshold time in milliseconds
      const thresholdTime = hoursThreshold * 60 * 60 * 1000;

      // Check if the stored data is within the threshold time
      if (currentDateTime - lastModified < thresholdTime) {
        console.log(`Retrieved data from ${filePath}.`);
        return data;
      }
    }

    // Fetch data from the endpoint
    const response = await fetch(endpointUrl);
    jsonData = await response.json();
    const { dados } = jsonData;

    // Create an object with the extracted data and update date
    const updateDate = new Date().toISOString();
    const newData = {
      updateDate,
      data: dados
    };

    // Convert the object to JSON string
    const jsonString = JSON.stringify(newData, null, 2);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, {recursive: true});
    }
    // Write the JSON string to the file
    fs.writeFileSync(filePath, jsonString);
    console.log(`Data stored in ${filePath} successfully.`);

    return dados;
  } catch (error) {
    console.error('Error fetching data:', error);
    if (jsonData !== null) {
      return jsonData.data; // Return the stale data if available
    }
    throw error;
  }
};

// Example usage: Fetch data and consider data up to 6 hours old
// fetchDataAndStore(
//   'https://api.example.com/endpoint',
//   'data-folder',
//   'data.json',
//   6
// );
