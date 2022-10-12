const stockJson = async () => {
  try {
    const respone = await fetch("./json/stock.json");
    const data = await respone.json();

    return data;
  } catch (error) {
    console.log("hubo un error", error);
  }
};

export { stockJson };
