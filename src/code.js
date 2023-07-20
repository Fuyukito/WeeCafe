// Array to store the order items
const orderList = [];
let totalAmount = 0.0;

function addToOrder(item, price) {
  orderList.push({ item, price });
  totalAmount += price;
  updateOrderList();
  updateTotalAmount();
}

function removeItem(index) {
  totalAmount -= orderList[index].price;
  orderList.splice(index, 1);
  updateOrderList();
  updateTotalAmount();
}

function updateOrderList() {
  const orderListElement = document.getElementById("orderList");
  orderListElement.innerHTML = "";

  orderList.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.item} - €${item.price.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeItem(index);

    listItem.appendChild(removeButton);
    orderListElement.appendChild(listItem);
  });
}

function updateTotalAmount() {
  const totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.textContent = `€${totalAmount.toFixed(2)}`;
}

function completeOrder() {
  alert("Your Order:\n" + orderList.map(item => `${item.item} - €${item.price.toFixed(2)}`).join("\n"));
  orderList.length = 0;
  totalAmount = 0.0;
  updateOrderList();
  updateTotalAmount();
}