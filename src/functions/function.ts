
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // ye "data:image/png;base64,...." string deta hai
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};