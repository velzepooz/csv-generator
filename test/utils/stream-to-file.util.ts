export const streamToData = (stream): Promise<string> => {
  return new Promise((resolve) => {
    const chunks = [];

    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
  });
};
