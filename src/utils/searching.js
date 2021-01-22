export const searchArrayObject = (search, list, keywords = ['']) => {
  search = search.toLowerCase();

  const newList = list.filter((item) => {
    const itemLowerCases = keywords
      .map((keyword) => {
        const itemLowerCase = item[keyword]?.toLowerCase();

        return itemLowerCase;
      })
      .join('*');

    return itemLowerCases.includes(search);
  });

  return newList;
};
