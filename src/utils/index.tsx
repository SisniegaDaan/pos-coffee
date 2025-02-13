export function formatCurrency(amount: number) {
  const formatedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formatedAmount;
}

export function validateImagePath(imagePath: string) {
  // Lista de servicios de cloud image en la aplicación
  const cloudServices = ["https://res.cloudinary.com"];
  const isCloudImage = cloudServices.some((url) => imagePath.startsWith(url));

  if (isCloudImage) {
    return imagePath;

  } else {
    return `/products/${imagePath}.jpg`;

  }
}
