export const getAgeFromUri = uri => {
  try {
    const nameImg = uri.split('/').reverse()[0];
    return nameImg.split('.')[0] || null;
  } catch (error) {
    return null;
  }
};
