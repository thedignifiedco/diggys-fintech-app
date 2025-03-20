import { getInitials } from "../utils/getInitials";

export function createTenantsDropdown(items, selected, onSelect) {
  const container = document.createElement("div");
  container.className = "dropdown";

  const button = document.createElement("button");
  button.className = "dropdown-button";
  button.innerHTML = '<img src="/icons/unfold-more.svg" alt="Other tenants" />';

  const menu = document.createElement("div");
  menu.className = "dropdown-menu";

  button.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("mousedown", (event) => {
    if (!container.contains(event.target)) {
      menu.classList.remove("show");
    }
  });

  items.forEach((item) => {
    const itemButton = document.createElement("button");
    itemButton.className = `dropdown-item ${
      selected?.id === item.id ? "active" : ""
    }`;

    itemButton.innerHTML = `
      <div class="dropdown-item-content">
        <div class="initials">${getInitials(item.name)}</div>
        ${item.name}
      </div>
      ${
        selected?.id === item.id
          ? '<img src="/icons/checkmark.svg" alt="Selected tenant" />'
          : ""
      }
    `;

    itemButton.addEventListener("click", () => {
      onSelect(item);
      menu.classList.remove("show");
    });

    menu.appendChild(itemButton);
  });

  container.appendChild(button);
  container.appendChild(menu);

  return container;
}
