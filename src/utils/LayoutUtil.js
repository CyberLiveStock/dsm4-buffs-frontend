export const applyLayout = (Component) => {
  const getLayout = Component.getLayout || ((page) => page); // Verifica se a página tem getLayout

  return getLayout;
};
