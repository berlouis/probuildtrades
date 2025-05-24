export const getTranslation = async (id: string) => {
  return {
    title: "Sample Title",
    content: "Sample content for translation ID " + id,
  };
};

export const updateTranslation = async (id: string, data: { title: string; content: string }) => {
  console.log("Mock updateTranslation:", id, data);
  return true;
};
