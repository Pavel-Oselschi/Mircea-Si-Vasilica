export function getAlphabeticalOrderKey(str) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const alphabeticalPosition = [];
    const lowerCaseStr = str.toLowerCase();
    const uniqueLetters = new Set();

    for (const char of lowerCaseStr) {
        if (uniqueLetters.has(char)) {
            throw new Error("Cheia conține litere duplicate.");
        }
        uniqueLetters.add(char);
    }

    for (const char of lowerCaseStr) {
        const position = alphabet.indexOf(char) + 1;
        if (position > 0) {
            alphabeticalPosition.push(position);
        } else {
            throw new Error("Cheia conține simboluri neacceptate.");
        }
    }

    const sortedArr = [...alphabeticalPosition].sort((a, b) => a - b);
    const orderArr = alphabeticalPosition.map((num) => sortedArr.indexOf(num) + 1);
    return orderArr;
}

export function divideString(str, groupSize) {
    const result = [];
    let currentIndex = 0;

    while (currentIndex < str.length) {
        let slice = str.slice(currentIndex, currentIndex + groupSize).replaceAll(" ", "*");
        if (slice.length < groupSize) {
            slice = slice.padEnd(groupSize, "*");
        }
        result.push(slice.split(""));
        currentIndex += groupSize;
    }

    return result;
}

export function encrypt(message, key) {
    const groupLength = key.length;
    const matrix = divideString(message, groupLength);
    const alphabeticalOrderKey = getAlphabeticalOrderKey(key);
    let encryptedMessage = "";

    for (let i = 0; i < groupLength; i++) {
        const currentColumn = alphabeticalOrderKey.indexOf(i + 1);
        matrix.forEach((charGroup) => {
            encryptedMessage += charGroup[currentColumn];
        });
        encryptedMessage += "_";
    }

    return encryptedMessage;
}

export function decrypt(encryptedMessage, key) {
    const groupLength = key.length;
    const alphabeticalOrderKey = getAlphabeticalOrderKey(key);
    const columns = encryptedMessage.split("_").filter((col) => col.length > 0);
    const numRows = columns[0].length;
    const matrix = [];

    for (let i = 0; i < numRows; i++) {
        matrix.push(Array(groupLength).fill(""));
    }

    for (let i = 0; i < groupLength; i++) {
        const originalColumnIndex = alphabeticalOrderKey.indexOf(i + 1);
        const column = columns[i];
        for (let j = 0; j < numRows; j++) {
            matrix[j][originalColumnIndex] = column[j] || "";
        }
    }

    let decryptedMessage = "";
    for (const row of matrix) {
        decryptedMessage += row.join("");
    }

    return decryptedMessage.replaceAll("*", " ");
}