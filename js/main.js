// Function to read a directory and its contents
function readDirectory(directoryPath) {
    return new Promise(async (resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const files = reader.result;
            resolve(files);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        // Access the directory
        const directory = new FileSystemDirectoryHandle(directoryPath);
        const entries = directory.entries();

        // Read directory contents
        const filesPromises = [];
        for await (const entry of entries) {
            if (entry.kind === 'file') {
                const file = await entry.getFile();
                filesPromises.push(file);
            }
        }

        // Resolve promise after reading all files
        Promise.all(filesPromises)
            .then(files => {
                resolve(files);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Example usage
const directoryPath = '../img/';
readDirectory(directoryPath)
    .then(files => {
        console.log(files);
    })
    .catch(error => {
        console.error('Error reading directory:', error);
    });
